process.env.NODE_ENV = 'test';

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import puppeteer, { Browser } from 'puppeteer';
import { createServer, ViteDevServer } from 'vite';
import { dbPath } from '../server/db';

const { app } = await import('../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatedTsPath = path.resolve(
  __dirname,
  '../../src/monsters/individual_monsters/monsters_from_ui.ts',
);

describe('Monster UI Tab Layout Tests', () => {
  let dbBackup: string | null = null;
  let tsBackup: string | null = null;
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;

  before(async () => {
    console.log('Backing up database and generated source files for UI tests...');
    if (fs.existsSync(dbPath)) {
      dbBackup = fs.readFileSync(dbPath, 'utf8');
    }
    if (fs.existsSync(generatedTsPath)) {
      tsBackup = fs.readFileSync(generatedTsPath, 'utf8');
    }

    // 1. Start Express Server on random port
    await new Promise<void>((resolve) => {
      expressServer = app.listen(0, () => {
        const addr = expressServer.address();
        if (addr && typeof addr !== 'string') {
          expressPort = addr.port;
          console.log(`Express API server for UI test running at port ${expressPort}`);
        }
        resolve();
      });
    });

    // 2. Start Vite server on a random port, proxying to our test Express server
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
    console.log(`Vite Dev Server for UI test running at ${baseUrl}`);

    // 3. Launch Puppeteer browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  after(async () => {
    console.log('Cleaning up servers and restoring backups...');
    if (browser) {
      await browser.close();
    }
    if (viteServer) {
      await viteServer.close();
    }
    if (expressServer) {
      await expressServer.close();
    }

    if (dbBackup !== null) {
      fs.writeFileSync(dbPath, dbBackup, 'utf8');
    } else if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }

    if (tsBackup !== null) {
      fs.writeFileSync(generatedTsPath, tsBackup, 'utf8');
    } else if (fs.existsSync(generatedTsPath)) {
      fs.unlinkSync(generatedTsPath);
    }
  });

  test('Form tabs do not collapse when switching tabs', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    // Handle console errors or uncaught page exceptions
    page.on('pageerror', (err) => {
      throw new Error(`Browser console error: ${err.message}`);
    });

    // Navigate to UI
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });

    // Wait for the workspace/sidebar to load
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // Select the first monster from the sidebar to open the form
    await page.waitForSelector('.list-item', { timeout: 5000 });
    const listItems = await page.$$('.list-item');
    assert.ok(listItems.length > 0, 'Should have at least one monster in the sidebar list');
    await listItems[0].click();

    // Wait for form tabs to render
    await page.waitForSelector('.form-tabs', { timeout: 5000 });

    const tabsToTest = [
      'Identity',
      'Attributes & Skills',
      'Traits & Senses',
      'Combat & Gear',
      'Spells & Abilities',
      'Knowledge & Script',
    ];

    for (const tabName of tabsToTest) {
      // Find the tab button by text and click it
      const buttons = await page.$$('.form-tabs .tab-btn');
      let targetButton = null;
      for (const btn of buttons) {
        const text = await page.evaluate((el) => el.textContent?.trim(), btn);
        if (text === tabName) {
          targetButton = btn;
          break;
        }
      }

      assert.ok(targetButton, `Should find tab button for "${tabName}"`);
      await targetButton.click();

      // Allow minor delay for animations or render updates
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Assert computed height of the .form-tabs bar
      const tabsHeight = await page.evaluate(() => {
        const el = document.querySelector('.form-tabs');
        if (!el) return 0;
        return el.getBoundingClientRect().height;
      });

      console.log(`Tab: "${tabName}", Bounding Height: ${tabsHeight}px`);

      // Ensure height is not collapsed (should be around 36px, definitely > 30px)
      assert.ok(tabsHeight > 30, `Tab bar collapsed to ${tabsHeight}px on "${tabName}" tab`);
    }

    await page.close();
  });
});
