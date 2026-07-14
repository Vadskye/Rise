import './setup-env';

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import puppeteer, { Browser } from 'puppeteer';
import { createServer, ViteDevServer } from 'vite';
import { paths } from '../server/db';

const { app } = await import('../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Monster UI Folders E2E Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;

  before(async () => {
    // Start Express API server
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

    // Start Vite dev server proxying to Express
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
    console.log(`Vite Dev Server running at ${baseUrl}`);

    // Launch Puppeteer browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  after(async () => {
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

  test('Create, rename, delete folders and verify items update', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    // Handle console errors or uncaught page exceptions
    page.on('pageerror', (err: any) => {
      throw new Error(`Browser console error: ${err.message}`);
    });

    // Setup dialog handler to auto-respond to prompts & confirms
    let promptInput = '';
    page.on('dialog', async (dialog) => {
      if (dialog.type() === 'prompt') {
        await dialog.accept(promptInput);
      } else if (dialog.type() === 'confirm') {
        await dialog.accept();
      }
    });

    // Navigate to UI
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });

    // Wait for the sidebar to load
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Create a new folder
    promptInput = 'Magic Circle';
    const addFolderBtn = await page.waitForSelector('[data-testid="add-folder-btn"]', {
      timeout: 5000,
    });
    assert.ok(addFolderBtn, 'Add Folder button should exist');
    await addFolderBtn.click();

    // Wait for save and verify empty folder exists in sidebar
    await page.waitForSelector('[data-testid="folder-container-Magic Circle"]', { timeout: 5000 });
    let folderExists = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="folder-container-Magic Circle"]');
    });
    assert.ok(folderExists, 'Folder "Magic Circle" should render in sidebar');

    // 2. Create a new monster and assign it to the folder
    const addMonsterBtn = await page.waitForSelector('[data-testid="add-individual-btn"]', {
      timeout: 5000,
    });
    await addMonsterBtn.click();

    // Wait for the new monster name input to render
    const nameInput = await page.waitForSelector('[data-testid="monster-name-input"]', {
      timeout: 5000,
    });

    // Clear and type new monster name
    await page.$eval('[data-testid="monster-name-input"]', (el) =>
      (el as HTMLInputElement).select(),
    );
    await nameInput.type('Pixie', { delay: 10 });
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Assign folder inside IdentityTab
    const folderSelect = await page.waitForSelector('[data-testid="folder-select"]', {
      timeout: 5000,
    });
    assert.ok(folderSelect, 'Folder select should exist');
    await page.select('[data-testid="folder-select"]', 'Magic Circle');
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Wait for autosave to finish
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify Pixie is inside the "Magic Circle" folder in the sidebar
    const pixieInFolder = await page.evaluate(() => {
      const folderEl = document.querySelector('[data-testid="folder-container-Magic Circle"]');
      if (!folderEl) {
        return false;
      }
      const monsterEl = folderEl.querySelector('[data-testid="monster-item-Pixie"]');
      return !!monsterEl;
    });
    assert.ok(pixieInFolder, 'Pixie should be nested under Magic Circle folder');

    // 3. Rename the folder
    promptInput = 'Fey Folk';
    // Hover folder header to make rename button visible
    await page.hover('[data-testid="folder-container-Magic Circle"] .folder-header');
    const renameBtn = await page.waitForSelector('[data-testid="rename-folder-Magic Circle"]', {
      timeout: 2000,
    });
    assert.ok(renameBtn, 'Rename folder button should be visible on hover');
    await renameBtn.click();

    // Wait for save
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify the folder container testid has updated to the new name and contains Pixie
    await page.waitForSelector('[data-testid="folder-container-Fey Folk"]', { timeout: 5000 });
    const feyFolkExists = await page.evaluate(() => {
      const folderEl = document.querySelector('[data-testid="folder-container-Fey Folk"]');
      if (!folderEl) {
        return false;
      }
      const monsterEl = folderEl.querySelector('[data-testid="monster-item-Pixie"]');
      return !!monsterEl;
    });
    assert.ok(feyFolkExists, 'Fey Folk folder should exist and contain Pixie');

    // Verify old folder container is gone
    const oldFolderGone = await page.evaluate(() => {
      return !document.querySelector('[data-testid="folder-container-Magic Circle"]');
    });
    assert.ok(oldFolderGone, 'Magic Circle folder should no longer exist');

    // 4. Delete the folder
    // Hover Fey Folk folder header to make delete button visible
    await page.hover('[data-testid="folder-container-Fey Folk"] .folder-header');
    const deleteBtn = await page.waitForSelector('[data-testid="delete-folder-Fey Folk"]', {
      timeout: 2000,
    });
    assert.ok(deleteBtn, 'Delete folder button should be visible on hover');
    await deleteBtn.click();

    // Wait for save
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify folder is gone
    const folderGone = await page.evaluate(() => {
      return !document.querySelector('[data-testid="folder-container-Fey Folk"]');
    });
    assert.ok(folderGone, 'Fey Folk folder should be deleted');

    // Verify Pixie is still present in Individual Monsters section (not deleted)
    const pixieInIndividual = await page.evaluate(() => {
      const section = document.querySelector('[data-testid="folderless-monsters-section"]');
      if (!section) {
        return false;
      }
      const monsterEl = section.querySelector('[data-testid="monster-item-Pixie"]');
      return !!monsterEl;
    });
    assert.ok(pixieInIndividual, 'Pixie should be moved to individual monsters section');
  });
});
