import './setup-env';

import { test, describe, beforeAll, afterAll, expect } from 'vitest';
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

describe('Monster UI Tab Layout Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;

  beforeAll(async () => {
    // setup-env.ts already configured isolated temp-file paths before this module loaded.
    // Seed one minimal monster so the sidebar has a .list-item to interact with.
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

  afterAll(async () => {
    console.log('Cleaning up servers and files...');
    if (browser) {
      await browser.close();
    }
    if (viteServer) {
      await viteServer.close();
    }
    if (expressServer) {
      await expressServer.close();
    }

    // Clean up temp files created during this test run
    if (fs.existsSync(paths.dbPath)) {
      fs.unlinkSync(paths.dbPath);
    }
    if (fs.existsSync(paths.generatedTsPath)) {
      fs.unlinkSync(paths.generatedTsPath);
    }
  });

  test('Form tabs do not collapse when switching tabs', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    // Handle console errors or uncaught page exceptions
    page.on('pageerror', (err: any) => {
      throw new Error(`Browser console error: ${err.message}`);
    });

    // Navigate to UI
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });

    // Wait for the workspace/sidebar to load
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // Select the first monster from the sidebar to open the form
    await page.waitForSelector('.list-item', { timeout: 5000 });
    const listItems = await page.$$('.list-item');
    expect(listItems.length).toBeGreaterThan(0);
    await listItems[0].click();

    // Wait for form tabs to render
    await page.waitForSelector('.form-tabs', { timeout: 5000 });

    const tabsToTest = [
      'Identity',
      'Attributes & Skills',
      'Traits & Senses',
      'Combat & Gear',
      'Spells & Abilities',
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

      expect(targetButton).toBeDefined();
      await targetButton!.click();

      // Allow minor delay for animations or render updates
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Assert computed height of the .form-tabs bar
      const tabsHeight = await page.evaluate(() => {
        const el = document.querySelector('.form-tabs');
        if (!el) {
          return 0;
        }
        return el.getBoundingClientRect().height;
      });

      console.log(`Tab: "${tabName}", Bounding Height: ${tabsHeight}px`);

      // Ensure height is not collapsed (should be around 36px, definitely > 30px)
      expect(tabsHeight).toBeGreaterThan(30);
    }

    await page.close();
  });
});
