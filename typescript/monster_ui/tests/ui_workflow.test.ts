import './setup-env';

import { test, describe, beforeAll, afterAll, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import puppeteer, { Browser, Page } from 'puppeteer';
import { captureFailure } from './helpers';
import { createServer, ViteDevServer } from 'vite';
import { paths } from '../server/db';

const { app } = await import('../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Monster UI Full Workflow E2E Integration Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    // setup-env.ts already configured isolated temp-file paths before this module loaded.
    // No copy needed — getDb() creates an empty database if none exists.

    // 1. Start Express Server on random port
    await new Promise<void>((resolve) => {
      expressServer = app.listen(0, () => {
        const addr = expressServer.address();
        if (addr && typeof addr !== 'string') {
          expressPort = addr.port;
          console.log(`Express API server for E2E test running at port ${expressPort}`);
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
    console.log(`Vite Dev Server for E2E test running at ${baseUrl}`);

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
    console.log('Cleaning up E2E test servers and files...');
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

  test('Create, edit, save, and preview a new monster', async () => {

    // Navigate to UI
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });

    // Wait for the workspace/sidebar to load
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Add a new individual monster
    const addMonsterBtn = await page.waitForSelector('[data-testid="add-individual-btn"]', {
      timeout: 5000,
    });
    expect(addMonsterBtn).toBeDefined();
    await addMonsterBtn!.click();

    // Allow database saving to complete for the initial "New Monster X" creation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 2. Select the name input, clear it, and type "Integration Gargoyle"
    const nameInput = await page.waitForSelector('[data-testid="monster-name-input"]', {
      timeout: 5000,
    });
    expect(nameInput).toBeDefined();
    await page.$eval('[data-testid="monster-name-input"]', (el) =>
      (el as HTMLInputElement).select(),
    );
    await nameInput!.type('Integration Gargoyle', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 500)); // wait for React name state to propagate

    // 3. Set required properties
    await page.select('[data-testid="alignment-select"]', 'neutral');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await page.select('[data-testid="base-class-select"]', 'brute');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const levelInput = await page.waitForSelector('[data-testid="level-input"]');
    if (!levelInput) {
      throw new Error('Level input not found');
    }
    await page.$eval('[data-testid="level-input"]', (el) => (el as HTMLInputElement).select());
    await levelInput.type('5');
    await new Promise((resolve) => setTimeout(resolve, 200));

    await page.select('[data-testid="origin-select"]', 'natural');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await page.select('[data-testid="type-select"]', 'beast');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await page.select('[data-testid="type-select"]', 'aberration');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await page.select('[data-testid="size-select"]', 'large');
    await new Promise((resolve) => setTimeout(resolve, 200));

    // 4. Fill in freeform code on the Identity tab
    const codeArea = await page.waitForSelector('[data-testid="freeform-code-textarea"]', {
      timeout: 5000,
    });
    expect(codeArea).toBeDefined();
    await page.$eval('[data-testid="freeform-code-textarea"]', (el) =>
      (el as HTMLTextAreaElement).select(),
    );
    await codeArea!.type("// Gargoyle custom script\ncreature.addTrait('scent');", { delay: 10 });
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // 5. Wait for autosave to complete (save-status becomes 'Saved')
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // 6. Verify that the UI Book Preview displays the updated details
    // We should wait until the preview is no longer loading and displays the correct title
    await page.waitForFunction(
      () => {
        const titleEl = document.querySelector('.monster-title');
        return titleEl && titleEl.textContent?.includes('Integration Gargoyle');
      },
      { timeout: 5000 },
    );

    const previewTitleText = await page.$eval('.monster-title', (el) => el.textContent);
    console.log('Book Preview Title Text:', previewTitleText);
    expect(previewTitleText).toContain('Integration Gargoyle');
    expect(previewTitleText).toContain('Level 5');

    const previewOriginTypeText = await page.$eval('.monster-origin-type', (el) => el.textContent);
    console.log('Book Preview Origin/Type Text:', previewOriginTypeText);
    expect(previewOriginTypeText).toContain('Large natural brute');

    const firstStatLineText = await page.$eval('.stat-block .stat-line', (el) => el.textContent);
    console.log('Book Preview First Stat Line Text:', firstStatLineText);
    expect(firstStatLineText).toContain('aberration, beast');

    // 7. Verify the actual files saved to disk
    // Verify JSON database contains the new monster with the custom freeform code
    const dbRaw = fs.readFileSync(paths.dbPath, 'utf8');
    const dbJson = JSON.parse(dbRaw);
    const savedMonster = dbJson.monsters.find((m: any) => m.name === 'Integration Gargoyle');
    expect(savedMonster).toBeDefined();
    expect(savedMonster.requiredProperties.alignment).toBe('neutral');
    expect(savedMonster.requiredProperties.base_class).toBe('brute');
    expect(savedMonster.requiredProperties.level).toBe(5);
    expect(savedMonster.requiredProperties.creature_origin).toBe('natural');
    expect(savedMonster.requiredProperties.creature_types).toEqual(['aberration', 'beast']);
    expect(savedMonster.requiredProperties.size).toBe('large');
    expect(savedMonster.freeformCode).toContain('// Gargoyle custom script');

    // Verify generated TypeScript file
    const generatedTs = fs.readFileSync(paths.generatedTsPath, 'utf8');
    expect(generatedTs).toContain("grimoire.addMonster('Integration Gargoyle'");
    expect(generatedTs).toContain("creature.addTrait('scent')");

  });

  test('Verify Folder System and Sorting in Sidebar', async () => {

    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Add a new individual monster named "Troll" in folder "Test Folder"
    const addMonsterBtn = await page.waitForSelector('[data-testid="add-individual-btn"]', {
      timeout: 5000,
    });
    await addMonsterBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    let nameInput = await page.waitForSelector('[data-testid="monster-name-input"]', {
      timeout: 5000,
    });
    await page.$eval('[data-testid="monster-name-input"]', (el) =>
      (el as HTMLInputElement).select(),
    );
    await nameInput!.type('Troll', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 300));

    await page.select('[data-testid="folder-select"]', '__new_folder__');
    let folderInput = await page.waitForSelector('[data-testid="folder-input"]', { timeout: 5000 });
    await folderInput!.type('Test Folder', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 2. Add a new group named "Orcs" in folder "Test Folder"
    const addGroupBtn = await page.waitForSelector('[data-testid="add-group-btn"]', {
      timeout: 5000,
    });
    await addGroupBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    let groupNameInput = await page.waitForSelector('#group-name', { timeout: 5000 });
    await page.$eval('#group-name', (el) => (el as HTMLInputElement).select());
    await groupNameInput!.type('Orcs', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 300));

    let groupFolderInput = await page.waitForSelector('[data-testid="group-folder-input"]', {
      timeout: 5000,
    });
    await groupFolderInput!.type('Test Folder', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 1200)); // wait for autosave

    // 3. Verify they are rendered inside folder "Test Folder" in the sidebar
    // Folder header should exist
    const folderHeader = await page.waitForSelector('.folder-header', { timeout: 5000 });
    expect(folderHeader).toBeDefined();
    const folderText = await page.$eval('.folder-header', (el) => el.textContent);
    expect(folderText).toContain('Test Folder');

    // Verify children elements are rendered and alphabetized: Orcs (starts with O) should be before Troll (starts with T)
    const childrenNames = await page.$$eval(
      '.folder-children .item-name, .folder-children .group-title',
      (els) => els.map((el) => el.textContent?.trim() || ''),
    );
    console.log('Folder children in UI:', childrenNames);

    // Clean up unicode zero-width spaces or other noise if any, and assert
    expect(
      childrenNames.map((n) => n.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/^▶\s*/, '')),
    ).toEqual(['👥 Orcs', '👤 Troll']);

  });
});
