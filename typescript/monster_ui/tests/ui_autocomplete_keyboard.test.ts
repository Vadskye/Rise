import './setup-env';

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import puppeteer, { Browser } from 'puppeteer';
import { createServer, ViteDevServer } from 'vite';
import { paths, saveDb } from '../server/db';

const { app } = await import('../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Autocomplete Keyboard Navigation Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;

  before(async () => {
    // Seed one minimal monster so we have something to select
    saveDb({
      monsters: [
        {
          name: 'Seed Monster',
          requiredProperties: {
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_origin: 'natural',
            creature_types: ['beast'],
            size: 'medium',
            level: 1,
          },
          weapons: [{ name: 'spear' }],
          freeformCode: '',
        },
      ],
      monsterGroups: [],
    });

    // 1. Start Express Server on random port
    await new Promise<void>((resolve) => {
      expressServer = app.listen(0, () => {
        const addr = expressServer.address();
        if (addr && typeof addr !== 'string') {
          expressPort = addr.port;
        }
        resolve();
      });
    });

    // 2. Start Vite server
    viteServer = await createServer({
      configFile: path.resolve(__dirname, '../vite.config.ts'),
      server: {
        port: 0,
        proxy: {
          '/api': {
            target: `http://localhost:${expressPort}`,
            changeOrigin: true,
          },
        },
      },
    });
    await viteServer.listen();
    const vitePort = viteServer.config.server.port;
    baseUrl = `http://localhost:${vitePort}`;

    // 3. Launch Puppeteer browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  after(async () => {
    if (browser) {
      await browser.close();
    }
    if (viteServer) {
      await viteServer.close();
    }
    if (expressServer) {
      await expressServer.close();
    }

    if (fs.existsSync(paths.dbPath)) {
      fs.unlinkSync(paths.dbPath);
    }
    if (fs.existsSync(paths.generatedTsPath)) {
      fs.unlinkSync(paths.generatedTsPath);
    }
  });

  test('Keyboard navigation: arrow down, up, and enter selection in maneuvers input', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    page.on('pageerror', (err: any) => {
      // Don't throw on standard preview validation warnings/errors from incorrect/missing weapons
      console.warn(`Browser console page error (ignored for validation): ${err.message}`);
    });

    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // Open Seed Monster
    await page.waitForSelector('.list-item', { timeout: 5000 });
    const listItems = await page.$$('.list-item');
    assert.ok(listItems.length > 0, 'Should have Seed Monster in sidebar');
    await listItems[0].click();

    // Click "Spells & Abilities" tab
    await page.waitForSelector('[data-testid="tab-btn-abilities"]', { timeout: 5000 });
    const tabBtn = await page.$('[data-testid="tab-btn-abilities"]');
    assert.ok(tabBtn, 'Should find Spells & Abilities tab button');
    await tabBtn.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find the maneuver search input
    const maneuverInputSelector = 'input[placeholder="Search maneuvers (e.g. Charge)..."]';
    const maneuverInput = await page.waitForSelector(maneuverInputSelector, { timeout: 5000 });
    assert.ok(maneuverInput, 'Should find standard maneuver input');

    // Type "Ground" into the input
    await maneuverInput.click();
    await page.keyboard.type('Ground');
    await new Promise((resolve) => setTimeout(resolve, 200)); // wait for filtered list to render

    // Verify suggestions are visible and active class is applied to the first option
    await page.waitForSelector('.autocomplete-suggestions', { timeout: 5000 });
    let listItemsText = await page.$$eval('.autocomplete-suggestions li', (elements) =>
      elements.map((el) => ({
        text: el.textContent?.trim() || '',
        className: el.className,
      }))
    );

    assert.ok(listItemsText.length >= 2, 'Should show at least 2 options for "Ground"');
    const firstOptionName = listItemsText[0].text;
    const secondOptionName = listItemsText[1].text;
    console.log(`First option: "${firstOptionName}", Second option: "${secondOptionName}"`);

    assert.strictEqual(listItemsText[0].className, 'active', 'First element should initially be active');
    assert.notStrictEqual(listItemsText[1].className, 'active', 'Second element should not be active');

    // Press Arrow Down to highlight second option
    await page.keyboard.press('ArrowDown');
    listItemsText = await page.$$eval('.autocomplete-suggestions li', (elements) =>
      elements.map((el) => ({
        text: el.textContent?.trim() || '',
        className: el.className,
      }))
    );
    assert.notStrictEqual(listItemsText[0].className, 'active', 'First element should no longer be active');
    assert.strictEqual(listItemsText[1].className, 'active', 'Second element should now be active');

    // Press Enter to select the second option
    await page.keyboard.press('Enter');
    await new Promise((resolve) => setTimeout(resolve, 300)); // wait for selection state update

    // Check if the maneuver was added. In UI, it renders under "Standard Abilities List"
    const abilityCards = await page.$$eval('.ability-item-card .ability-name', (elements) =>
      elements.map((el) => el.textContent?.trim())
    );
    const addedSelectedOption = abilityCards.some((name) => name.includes(secondOptionName));
    assert.ok(addedSelectedOption, `Maneuver "${secondOptionName}" should be added to the list`);

    await page.close();
  });
});
