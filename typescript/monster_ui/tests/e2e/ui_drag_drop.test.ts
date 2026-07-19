import '../setup-env';

import { test, describe, beforeAll, afterAll, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import puppeteer, { Browser, Page } from 'puppeteer';
import { captureFailure } from '../helpers';
import { createServer, ViteDevServer } from 'vite';
import { paths } from '../../server/db';

const { app } = await import('../../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to simulate HTML5 Drag and Drop in Puppeteer
const dragAndDrop = async (page: any, srcSelector: string, targetSelector: string) => {
  await page.evaluate(
    (srcSel: string, targetSel: string) => {
      const source = document.querySelector(srcSel);
      const target = document.querySelector(targetSel);

      if (!source) {
        throw new Error(`Source element not found: ${srcSel}`);
      }
      if (!target) {
        throw new Error(`Target element not found: ${targetSel}`);
      }

      const dataTransfer = new DataTransfer();

      // Dispatch dragstart
      const dragStartEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });
      source.dispatchEvent(dragStartEvent);

      // Dispatch dragover
      const dragOverEvent = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });
      target.dispatchEvent(dragOverEvent);

      // Dispatch drop
      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });
      target.dispatchEvent(dropEvent);

      // Dispatch dragend
      const dragEndEvent = new DragEvent('dragend', {
        bubbles: true,
        cancelable: true,
        dataTransfer,
      });
      source.dispatchEvent(dragEndEvent);
    },
    srcSelector,
    targetSelector,
  );
};

describe('Monster UI Drag and Drop E2E Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;
  let page: Page;

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
      throw new Error(`Browser page error: ${err.message}`);
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

    // Clean up temp database and generated files
    if (fs.existsSync(paths.dbPath)) {
      fs.unlinkSync(paths.dbPath);
    }
    if (fs.existsSync(paths.generatedTsPath)) {
      fs.unlinkSync(paths.generatedTsPath);
    }
  });

  test('Drag and drop individual monster and group to and from folders', async () => {
    // Go to Monster UI
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Create a monster "Drag Monster" inside folder "Drag Folder"
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
    await nameInput!.type('Drag Monster', { delay: 10 });
    await new Promise((resolve) => setTimeout(resolve, 200));

    await page.select('[data-testid="folder-select"]', '__new_folder__');
    const folderInput = await page.waitForSelector('[data-testid="folder-input"]', {
      timeout: 5000,
    });
    await folderInput!.type('Drag Folder', { delay: 10 });
    await new Promise((resolve) => setTimeout(resolve, 1200)); // wait for autosave

    // 2. Create a folderless group "Drag Group"
    const addGroupBtn = await page.waitForSelector('[data-testid="add-group-btn"]', {
      timeout: 5000,
    });
    await addGroupBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    const groupNameInput = await page.waitForSelector('#group-name', { timeout: 5000 });
    await page.$eval('#group-name', (el) => (el as HTMLInputElement).select());
    await groupNameInput!.type('Drag Group', { delay: 10 });
    await new Promise((resolve) => setTimeout(resolve, 1200)); // wait for autosave

    // 3. Verify starting layout in the sidebar
    // "Drag Folder" is collapsed, "Drag Group" is in folderless "Monster Groups"
    await page.waitForSelector('[data-testid="folder-container-Drag Folder"]', { timeout: 5000 });
    const hasMonsterInFolder = await page.$(
      '[data-testid="folder-container-Drag Folder"] [data-testid="monster-item-Drag Monster"]',
    );
    expect(hasMonsterInFolder).toBeFalsy();

    const hasGroupInFolderless = await page.$(
      '[data-testid="folderless-groups-section"] [data-testid="group-item-Drag Group"]',
    );
    expect(hasGroupInFolderless).toBeTruthy();

    // 4. Drag "Drag Group" into "Drag Folder"
    await dragAndDrop(
      page,
      '[data-testid="group-item-Drag Group"]',
      '[data-testid="folder-container-Drag Folder"]',
    );
    await new Promise((resolve) => setTimeout(resolve, 1500)); // wait for save operation

    // Verify UI updated: group is now inside "Drag Folder"
    const hasGroupInFolder = await page.$(
      '[data-testid="folder-container-Drag Folder"] [data-testid="group-item-Drag Group"]',
    );
    expect(hasGroupInFolder).toBeTruthy();

    // 5. Drag "Drag Monster" out of "Drag Folder" and drop it into folderless Individual Monsters section
    await dragAndDrop(
      page,
      '[data-testid="monster-item-Drag Monster"]',
      '[data-testid="folderless-monsters-section"]',
    );
    await new Promise((resolve) => setTimeout(resolve, 1500)); // wait for save operation

    // Verify UI updated: monster is now folderless
    const hasMonsterInFolderless = await page.$(
      '[data-testid="folderless-monsters-section"] [data-testid="monster-item-Drag Monster"]',
    );
    expect(hasMonsterInFolderless).toBeTruthy();

    // 6. Verify the physical JSON database state on disk
    const dbRaw = fs.readFileSync(paths.dbPath, 'utf8');
    const dbJson = JSON.parse(dbRaw);

    const savedMonster = dbJson.monsters.find((m: any) => m.name === 'Drag Monster');
    expect(savedMonster).toBeDefined();
    expect(savedMonster.folder).toBeUndefined();

    const savedGroup = dbJson.monsterGroups.find((g: any) => g.name === 'Drag Group');
    expect(savedGroup).toBeDefined();
    expect(savedGroup.folder).toBe('Drag Folder');
  });
});
