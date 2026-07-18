import './setup-env';

import { test, describe, beforeAll, afterAll, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import puppeteer, { Browser, Page } from 'puppeteer';
import { captureFailure } from './helpers';
import { createServer, ViteDevServer } from 'vite';
import { paths, saveDb } from '../server/db';

const { app } = await import('../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Combobox Tab Navigation Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
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

  beforeEach(async (context) => {
    page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    page.on('pageerror', (err: any) => {
      console.warn(`Browser console page error (ignored): ${err.message}`);
    });

    context.onTestFinished(async () => {
      if (context.task.result?.state === 'fail') {
        await captureFailure(page, context.task.name);
      }
      await page.close();
    });
  });

  afterAll(async () => {
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

  test('Tabbing out of a combobox dropdown moves focus and opens the next/previous combobox dropdown', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // Open Seed Monster
    await page.waitForSelector('.list-item', { timeout: 5000 });
    const listItems = await page.$$('.list-item');
    expect(listItems.length).toBeGreaterThan(0);
    await listItems[0].click();

    // Wait for the Identity tab form to load
    await page.waitForSelector('#alignment', { timeout: 5000 });

    // Find and focus alignment combobox trigger
    const alignmentTrigger = await page.evaluateHandle(() => {
      const label = document.querySelector('label[for="alignment"]');
      const formGroup = label?.closest('.form-group');
      return formGroup?.querySelector('.combobox-trigger') as HTMLElement;
    });
    expect(alignmentTrigger).toBeDefined();

    // 1. Focus Alignment trigger. It should IMMEDIATELY open the dropdown and focus its search input.
    await alignmentTrigger.asElement()!.focus();
    await page.waitForSelector('[data-testid="alignment-combobox-search"]', { timeout: 2000 });

    let activeTestId = await page.evaluate(() =>
      document.activeElement?.getAttribute('data-testid'),
    );
    expect(activeTestId).toBe('alignment-combobox-search');

    // 2. Press Tab to cycle focus.
    // Alignment dropdown should close, and Base Class dropdown should immediately open and focus its search input.
    await page.keyboard.press('Tab');
    await page.waitForSelector('[data-testid="base_class-combobox-search"]', { timeout: 2000 });

    activeTestId = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
    expect(activeTestId).toBe('base_class-combobox-search');

    // Alignment dropdown should no longer exist
    let alignmentSearchExists = await page.$('[data-testid="alignment-combobox-search"]');
    expect(alignmentSearchExists).toBeNull();

    // 3. Press Shift + Tab to cycle focus backwards.
    // Base Class dropdown should close, and Alignment dropdown should immediately open and focus its search input.
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    await page.waitForSelector('[data-testid="alignment-combobox-search"]', { timeout: 2000 });

    activeTestId = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
    expect(activeTestId).toBe('alignment-combobox-search');

    // Base Class dropdown should no longer exist
    let baseClassSearchExists = await page.$('[data-testid="base_class-combobox-search"]');
    expect(baseClassSearchExists).toBeNull();

    // 4. Press Escape.
    // Alignment dropdown should close, and focus should remain on the Alignment trigger without auto-reopening.
    await page.keyboard.press('Escape');

    // Wait a brief moment to verify it does not reopen
    await new Promise((resolve) => setTimeout(resolve, 200));

    alignmentSearchExists = await page.$('[data-testid="alignment-combobox-search"]');
    expect(alignmentSearchExists).toBeNull();

    // Verify focus is back on the Alignment trigger button
    const getFocusedSelectId = async () => {
      return await page.evaluate(() => {
        const active = document.activeElement;
        if (!active) {
          return null;
        }
        const select = active.parentElement?.querySelector('select');
        return select ? select.id : null;
      });
    };
    const focusedSelectId = await getFocusedSelectId();
    expect(focusedSelectId).toBe('alignment');
  });

  test('Using up/down arrows to navigate options and Enter to select', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // Open Seed Monster
    await page.waitForSelector('.list-item', { timeout: 5000 });
    const listItems = await page.$$('.list-item');
    await listItems[0].click();

    // Wait for the Identity tab form to load
    await page.waitForSelector('#alignment', { timeout: 5000 });

    // Find and focus alignment combobox trigger
    const alignmentTrigger = await page.evaluateHandle(() => {
      const label = document.querySelector('label[for="alignment"]');
      const formGroup = label?.closest('.form-group');
      return formGroup?.querySelector('.combobox-trigger') as HTMLElement;
    });
    expect(alignmentTrigger).toBeDefined();

    // Focus alignment trigger to open dropdown and focus its search
    await alignmentTrigger.asElement()!.focus();
    await page.waitForSelector('[data-testid="alignment-combobox-search"]', { timeout: 2000 });

    // Let's get the list of options inside the dropdown
    const getOptionsState = async () => {
      return await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.combobox-option-btn'));
        return btns.map((btn) => ({
          text: btn.textContent?.trim(),
          selected: btn.classList.contains('selected'),
          highlighted: btn.classList.contains('highlighted'),
        }));
      });
    };

    let options = await getOptionsState();
    // By default, neutral should be selected and highlighted since seed monster alignment is neutral
    const neutralIdx = options.findIndex((o) => o.text === 'Neutral');
    expect(neutralIdx).toBeGreaterThan(-1);
    expect(options[neutralIdx].selected).toBe(true);
    expect(options[neutralIdx].highlighted).toBe(true);

    // Let's press ArrowDown. It should move the highlight to the next option (index 5).
    await page.keyboard.press('ArrowDown');
    options = await getOptionsState();
    expect(options[5].highlighted).toBe(true);

    // Let's press ArrowUp. It should move the highlight back to the neutral option (index 4).
    await page.keyboard.press('ArrowUp');
    options = await getOptionsState();
    expect(options[4].highlighted).toBe(true);

    // Let's press ArrowUp 4 more times to reach index 0
    await page.keyboard.press('ArrowUp'); // index 3
    await page.keyboard.press('ArrowUp'); // index 2
    await page.keyboard.press('ArrowUp'); // index 1
    await page.keyboard.press('ArrowUp'); // index 0
    options = await getOptionsState();
    expect(options[0].highlighted).toBe(true);

    // Let's press ArrowUp again. It should wrap around to the last option (index 8).
    await page.keyboard.press('ArrowUp');
    options = await getOptionsState();
    const lastIdx = options.length - 1;
    expect(options[lastIdx].highlighted).toBe(true);

    // Let's press Enter to select the last option.
    await page.keyboard.press('Enter');

    // Wait for the dropdown to close
    await new Promise((resolve) => setTimeout(resolve, 200));
    const searchExists = await page.$('[data-testid="alignment-combobox-search"]');
    expect(searchExists).toBeNull();

    // Verify the value in the select element has changed
    const selectVal = await page.evaluate(() => {
      const select = document.querySelector('#alignment') as HTMLSelectElement;
      return select ? select.value : null;
    });
    expect(selectVal).toBe('chaotic evil');
  });
});
