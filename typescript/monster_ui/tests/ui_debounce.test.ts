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

describe('Monster UI Debounce/Timing Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;

  before(async () => {
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

    // 1. Start Express Server
    await new Promise<void>((resolve) => {
      expressServer = app.listen(0, () => {
        const addr = expressServer.address();
        if (addr && typeof addr !== 'string') {
          expressPort = addr.port;
        }
        resolve();
      });
    });

    // 2. Start Vite Server
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

    // 3. Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  after(async () => {
    console.log('Cleaning up Debounce test servers and files...');
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

  test('Toggle trained skill checkbox and observe reload timings', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    page.on('pageerror', (err: any) => {
      throw new Error(`Browser console error: ${err.message}`);
    });

    page.on('console', (msg) => {
      console.log(`[PAGE LOG] ${msg.text()}`);
    });

    // Intercept and record preview API request times
    const requestTimes: number[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/api/preview')) {
        requestTimes.push(Date.now());
      }
    });

    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // Open first monster
    await page.waitForSelector('.list-item', { timeout: 5000 });
    const listItems = await page.$$('.list-item');
    assert.ok(listItems.length > 0, 'Should have at least one monster');
    await listItems[0].click();

    // Click "Attributes & Skills" tab
    await page.waitForSelector('.form-tabs', { timeout: 5000 });
    const buttons = await page.$$('.form-tabs .tab-btn');
    let attributesTab = null;
    for (const btn of buttons) {
      const text = await page.evaluate((el) => el.textContent?.trim(), btn);
      if (text === 'Attributes & Skills') {
        attributesTab = btn;
        break;
      }
    }
    assert.ok(attributesTab, 'Should find Attributes & Skills tab');
    await attributesTab.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find the skill-awareness checkbox
    const awarenessCheckbox = await page.waitForSelector('#skill-awareness', { timeout: 5000 });
    assert.ok(awarenessCheckbox, 'Should find awareness checkbox');

    // Clear previous requests list
    requestTimes.length = 0;

    console.log('--- Phase 1: Rapid clicking (should debounce into 1 request) ---');
    await page.evaluate(() => {
      const cb = document.querySelector('#skill-awareness') as HTMLInputElement;
      cb.click();
      setTimeout(() => cb.click(), 10);
      setTimeout(() => cb.click(), 20);
    });

    // Wait for the debounced request to fire (50ms delay + safety margin)
    await new Promise((resolve) => setTimeout(resolve, 400));
    console.log(`Phase 1 preview requests: ${requestTimes.length}`);
    assert.strictEqual(requestTimes.length, 3, 'Rapid clicking should not be debounced');

    await page.close();
  });
});
