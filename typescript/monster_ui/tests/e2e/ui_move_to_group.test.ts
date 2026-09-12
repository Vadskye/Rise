import '../setup-env';

import { test, describe, beforeAll, afterAll, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer';
import { captureFailure } from '../helpers';
import { createServer, ViteDevServer } from 'vite';
import { paths } from '../../server/db';

const { app } = await import('../../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Monster UI Move Monster to Group E2E Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    // Start Express Server
    await new Promise<void>((resolve) => {
      expressServer = app.listen(0, () => {
        const addr = expressServer.address();
        if (addr && typeof addr !== 'string') {
          expressPort = addr.port;
          console.log(`Express API server running at port ${expressPort}`);
        }
        resolve();
      });
    });

    // Start Vite server proxying to Express
    viteServer = await createServer({
      configFile: path.resolve(__dirname, '../../vite.config.ts'),
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
    console.log(`Vite Dev Server running at ${baseUrl}`);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  beforeEach(async (context) => {
    page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    page.on('pageerror', (err: any) => {
      throw new Error(`Browser console error: ${err.message}`);
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

  test('Move a standalone monster into an existing monster group via IdentityTab', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Create a new monster group: "Undead Horde"
    const addGroupBtn = await page.waitForSelector('[data-testid="add-group-btn"]', {
      timeout: 5000,
    });
    await addGroupBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    const groupNameInput = await page.waitForSelector('#group-name', { timeout: 5000 });
    await page.$eval('#group-name', (el) => (el as HTMLInputElement).select());
    await groupNameInput!.type('Undead Horde', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 2. Create a standalone monster: "Death Knight"
    const addMonsterBtn = await page.waitForSelector('[data-testid="add-individual-btn"]', {
      timeout: 5000,
    });
    await addMonsterBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    const nameInput = await page.waitForSelector('[data-testid="monster-name-input"]', {
      timeout: 5000,
    });
    await page.$eval('[data-testid="monster-name-input"]', (el) =>
      (el as HTMLInputElement).select(),
    );
    await nameInput!.type('Death Knight', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. Find the monster group combobox trigger and add button in Identity Tab
    const addBtn = await page.waitForSelector('[data-testid="add-to-group-btn"]', {
      timeout: 5000,
    });
    expect(addBtn).toBeDefined();

    // Button should initially be disabled because no group is selected
    const isDisabledInitially = await page.$eval(
      '[data-testid="add-to-group-btn"]',
      (el) => (el as HTMLButtonElement).disabled,
    );
    expect(isDisabledInitially).toBe(true);

    const groupTrigger = (await page.evaluateHandle(() => {
      const label = document.querySelector('label[for="monster-group-select"]');
      const formGroup = label?.closest('.form-group');
      return formGroup?.querySelector('.combobox-trigger');
    })) as ElementHandle<Element>;
    expect(groupTrigger).toBeDefined();

    // 4. Click the combobox trigger to open options and select "Undead Horde"
    await groupTrigger.click();
    await page.waitForSelector('[data-testid="monster-group-select-combobox-search"]', {
      timeout: 2000,
    });

    // Find and click the option for "Undead Horde"
    const option = await page.waitForSelector('.combobox-option-btn', { timeout: 2000 });
    await option!.click();
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Button should now be enabled
    const isEnabledNow = await page.$eval(
      '[data-testid="add-to-group-btn"]',
      (el) => !(el as HTMLButtonElement).disabled,
    );
    expect(isEnabledNow).toBe(true);

    // 5. Click "Add to monster group"
    await addBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 6. Verify selection is now the group-monster "Death Knight"
    const headerText = await page.$eval('.editor-header h3', (el) => el.textContent);
    expect(headerText).toContain('Death Knight');

    // As a group monster, folder-select should no longer be visible
    const folderSelect = await page.$('[data-testid="folder-select"]');
    expect(folderSelect).toBeNull();

    // 7. Verify the database file reflects that "Death Knight" is now in "Undead Horde"
    const dbContent = JSON.parse(fs.readFileSync(paths.dbPath, 'utf8'));
    expect(dbContent.monsters.some((m: any) => m.name === 'Death Knight')).toBe(false);

    const savedGroup = dbContent.monsterGroups.find((g: any) => g.name === 'Undead Horde');
    expect(savedGroup).toBeDefined();
    expect(savedGroup.monsters.some((m: any) => m.name === 'Death Knight')).toBe(true);
  });
});
