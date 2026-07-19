import './setup-env';

import { test, describe, beforeAll, afterAll, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import puppeteer, { Browser, Page } from 'puppeteer';
import { createServer, ViteDevServer } from 'vite';
import { paths } from '../server/db';

const { app } = await import('../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { captureFailure } from './helpers';

describe('Monster UI Folders E2E Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;
  let page: Page;
  let promptInput = '';

  beforeAll(async () => {
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

  beforeEach(async (context) => {
    page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    page.on('pageerror', (err: any) => {
      throw new Error(`Browser console error: ${err.message}`);
    });

    promptInput = '';
    page.on('dialog', async (dialog) => {
      if (dialog.type() === 'prompt') {
        await dialog.accept(promptInput);
      } else if (dialog.type() === 'confirm') {
        await dialog.accept();
      }
    });

    context.onTestFinished(async () => {
      if (context.task.result?.state === 'fail') {
        await captureFailure(page, context.task.name);
      }
      await page.close();
    });

    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });
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

  test('Create, rename, delete folders and verify items update', async () => {
    // 1. Create a new folder
    promptInput = 'Magic Circle';
    const addFolderBtn = await page.waitForSelector('[data-testid="add-folder-btn"]', {
      timeout: 5000,
    });
    expect(addFolderBtn).toBeDefined();
    await addFolderBtn!.click();

    // Wait for save and verify empty folder exists in sidebar
    await page.waitForSelector('[data-testid="folder-container-Magic Circle"]', {
      timeout: 5000,
    });
    let folderExists = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="folder-container-Magic Circle"]');
    });
    expect(folderExists).toBe(true);

    // 2. Create a new monster and assign it to the folder
    const addMonsterBtn = await page.waitForSelector('[data-testid="add-individual-btn"]', {
      timeout: 5000,
    });
    await addMonsterBtn!.click();

    // Wait for the new monster name input to render
    const nameInput = await page.waitForSelector('[data-testid="monster-name-input"]', {
      timeout: 5000,
    });

    // Clear and type new monster name
    await page.$eval('[data-testid="monster-name-input"]', (el) =>
      (el as HTMLInputElement).select(),
    );
    await nameInput!.type('Pixie', { delay: 10 });
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Assign folder inside IdentityTab
    const folderSelect = await page.waitForSelector('[data-testid="folder-select"]', {
      timeout: 5000,
    });
    expect(folderSelect).toBeDefined();
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

    // Expand the folder since folders are collapsed by default
    await page.click('[data-testid="folder-container-Magic Circle"] .folder-header');
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Verify Pixie is inside the "Magic Circle" folder in the sidebar
    const pixieInFolder = await page.evaluate(() => {
      const folderEl = document.querySelector('[data-testid="folder-container-Magic Circle"]');
      if (!folderEl) {
        return false;
      }
      const monsterEl = folderEl.querySelector('[data-testid="monster-item-Pixie"]');
      return !!monsterEl;
    });
    expect(pixieInFolder).toBe(true);

    // 3. Rename the folder
    promptInput = 'Fey Folk';
    // Hover folder header to make rename button visible
    await page.hover('[data-testid="folder-container-Magic Circle"] .folder-header');
    const renameBtn = await page.waitForSelector('[data-testid="rename-folder-Magic Circle"]', {
      timeout: 2000,
    });
    expect(renameBtn).toBeDefined();
    await renameBtn!.click();

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

    // Expand the folder since it starts collapsed by default
    await page.click('[data-testid="folder-container-Fey Folk"] .folder-header');
    await new Promise((resolve) => setTimeout(resolve, 300));

    const feyFolkExists = await page.evaluate(() => {
      const folderEl = document.querySelector('[data-testid="folder-container-Fey Folk"]');
      if (!folderEl) {
        return false;
      }
      const monsterEl = folderEl.querySelector('[data-testid="monster-item-Pixie"]');
      return !!monsterEl;
    });
    expect(feyFolkExists).toBe(true);

    // Verify old folder container is gone
    const oldFolderGone = await page.evaluate(() => {
      return !document.querySelector('[data-testid="folder-container-Magic Circle"]');
    });
    expect(oldFolderGone).toBe(true);

    // 4. Delete the folder
    // Hover Fey Folk folder header to make delete button visible
    await page.hover('[data-testid="folder-container-Fey Folk"] .folder-header');
    const deleteBtn = await page.waitForSelector('[data-testid="delete-folder-Fey Folk"]', {
      timeout: 2000,
    });
    expect(deleteBtn).toBeDefined();
    await deleteBtn!.click();

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
    expect(folderGone).toBe(true);

    // Verify Pixie is still present in Individual Monsters section (not deleted)
    const pixieInIndividual = await page.evaluate(() => {
      const section = document.querySelector('[data-testid="folderless-monsters-section"]');
      if (!section) {
        return false;
      }
      const monsterEl = section.querySelector('[data-testid="monster-item-Pixie"]');
      return !!monsterEl;
    });
    expect(pixieInIndividual).toBe(true);
  });

  test('Create monster and group directly inside a folder', async () => {
    // 1. Create a new folder named "Undead"
    promptInput = 'Undead';
    const addFolderBtn = await page.waitForSelector('[data-testid="add-folder-btn"]', {
      timeout: 5000,
    });
    await addFolderBtn!.click();
    await page.waitForSelector('[data-testid="folder-container-Undead"]', { timeout: 5000 });

    // Expand the folder since folders are collapsed by default
    await page.click('[data-testid="folder-container-Undead"] .folder-header');
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 2. Click the add monster to folder button
    await page.hover('[data-testid="folder-container-Undead"] .folder-header');
    const addMonsterToFolderBtn = await page.waitForSelector(
      '[data-testid="add-monster-to-folder-Undead"]',
      { timeout: 2000 },
    );
    await addMonsterToFolderBtn!.click();

    // Wait for save
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify the new monster is inside the Undead folder
    const monsterInFolder = await page.evaluate(() => {
      const folderEl = document.querySelector('[data-testid="folder-container-Undead"]');
      if (!folderEl) {
        return false;
      }
      const monsters = Array.from(
        folderEl.querySelectorAll('[data-testid^="monster-item-New Monster"]'),
      );
      return monsters.length > 0;
    });
    expect(monsterInFolder).toBe(true);

    // 3. Click the add group to folder button
    await page.hover('[data-testid="folder-container-Undead"] .folder-header');
    const addGroupToFolderBtn = await page.waitForSelector(
      '[data-testid="add-group-to-folder-Undead"]',
      { timeout: 2000 },
    );
    await addGroupToFolderBtn!.click();

    // Wait for save
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify the new group is inside the Undead folder
    const groupInFolder = await page.evaluate(() => {
      const folderEl = document.querySelector('[data-testid="folder-container-Undead"]');
      if (!folderEl) {
        return false;
      }
      const groups = Array.from(folderEl.querySelectorAll('[data-testid^="group-item-New Group"]'));
      return groups.length > 0;
    });
    expect(groupInFolder).toBe(true);
  });

  test('Monster Group expand and collapse behavior', async () => {
    // 1. Create a new group
    const addGroupBtn = await page.waitForSelector('[data-testid="add-group-btn"]', {
      timeout: 5000,
    });
    await addGroupBtn!.click();

    // Wait for the group input to appear in the form
    await page.waitForSelector('#group-name', { timeout: 5000 });

    // Find the created group name
    const groupName = await page.$eval('#group-name', (el) => (el as HTMLInputElement).value);
    console.log('DEBUG: Newly created groupName =', groupName);
    expect(groupName).toBeTruthy();

    // 2. Locate the group item (it is already selected and collapsed upon creation)
    const groupItem = await page.waitForSelector(`[data-testid="group-item-${groupName}"]`, {
      timeout: 5000,
    });

    // Expand the group since groups are collapsed by default
    const groupArrowInitial = await page.waitForSelector(
      `[data-testid="group-arrow-${groupName}"]`,
      {
        timeout: 2000,
      },
    );
    await groupArrowInitial!.click();
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 3. Add a monster to the group
    await page.hover(`[data-testid="group-item-${groupName}"]`);
    // Find the ➕ button inside group actions
    const addMonsterToGroupBtn = await page.waitForSelector(
      `[data-testid="group-item-${groupName}"] button[title="Add monster to group"]`,
      { visible: true, timeout: 2000 },
    );
    await addMonsterToGroupBtn!.click();

    // Wait for save
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify the monster exists in the group in sidebar and is visible
    const childMonsterTestId = `group-monster-item-${groupName}-New Member 1`;
    await page.waitForSelector(`[data-testid="${childMonsterTestId}"]`, { timeout: 5000 });
    let isMonsterVisible = await page.evaluate((selector) => {
      const el = document.querySelector(`[data-testid="${selector}"]`);
      return !!el;
    }, childMonsterTestId);
    expect(isMonsterVisible).toBe(true);

    // 4. Click the group collapse arrow
    const groupArrow = await page.waitForSelector(`[data-testid="group-arrow-${groupName}"]`, {
      timeout: 2000,
    });
    await groupArrow!.click();
    await new Promise((resolve) => setTimeout(resolve, 300)); // wait for collapse

    // Verify the child monster is no longer in DOM / visible
    isMonsterVisible = await page.evaluate((selector) => {
      const el = document.querySelector(`[data-testid="${selector}"]`);
      return !!el;
    }, childMonsterTestId);
    expect(isMonsterVisible).toBe(false);

    // 5. Click the group arrow again to expand
    await groupArrow!.click();
    await page.waitForSelector(`[data-testid="${childMonsterTestId}"]`, { timeout: 5000 });

    isMonsterVisible = await page.evaluate((selector) => {
      const el = document.querySelector(`[data-testid="${selector}"]`);
      return !!el;
    }, childMonsterTestId);
    expect(isMonsterVisible).toBe(true);

    // 6. Test that clicking the group header toggles collapse if already selected
    // Click header to select the group (since the child monster was selected)
    await groupItem!.click();
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Click header again to collapse the group now that it is selected
    await groupItem!.click();
    await new Promise((resolve) => setTimeout(resolve, 300)); // wait for collapse

    isMonsterVisible = await page.evaluate((selector) => {
      const el = document.querySelector(`[data-testid="${selector}"]`);
      return !!el;
    }, childMonsterTestId);
    expect(isMonsterVisible).toBe(false);

    // Click again to expand
    await groupItem!.click();
    await page.waitForSelector(`[data-testid="${childMonsterTestId}"]`, { timeout: 5000 });

    isMonsterVisible = await page.evaluate((selector) => {
      const el = document.querySelector(`[data-testid="${selector}"]`);
      return !!el;
    }, childMonsterTestId);
    expect(isMonsterVisible).toBe(true);
  });
});
