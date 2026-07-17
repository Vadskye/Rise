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

describe('Monster UI Delete Undo Integration Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
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

  test('Delete individual monster, undo deletion, and verify restoration', async () => {

    // Navigate to UI
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });

    // Wait for the workspace/sidebar to load
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Create a new individual monster
    const addMonsterBtn = await page.waitForSelector('[data-testid="add-individual-btn"]', {
      timeout: 5000,
    });
    expect(addMonsterBtn).toBeDefined();
    await addMonsterBtn!.click();

    // Wait for the new monster name input to render (verifies it selected the monster)
    await page.waitForSelector('[data-testid="monster-name-input"]', { timeout: 5000 });

    // Wait for autosave to finish
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify it exists in sidebar
    let monsterItem = await page.$('[data-testid="monster-item-New Monster 1"]');
    expect(monsterItem).toBeTruthy();

    // 2. Click Delete button on the monster (should delete immediately without prompt)
    // We hover the item first to make the delete button visible (it has opacity: 0 on hover off)
    await page.hover('[data-testid="monster-item-New Monster 1"]');
    const deleteBtn = await page.waitForSelector(
      '[data-testid="monster-item-New Monster 1"] .delete-btn',
      { timeout: 2000 },
    );
    expect(deleteBtn).toBeDefined();
    await deleteBtn!.click();

    // Verify toast is visible
    const toast = await page.waitForSelector('[data-testid="undo-toast"]', { timeout: 2000 });
    expect(toast).toBeDefined();

    // Verify message content
    const toastText = await page.evaluate((el) => el.textContent, toast);
    expect(toastText).toContain('Deleted individual monster "New Monster 1"');

    // Verify monster is removed from sidebar
    let deletedMonsterItem = await page.$('[data-testid="monster-item-New Monster 1"]');
    expect(deletedMonsterItem).toBeNull();

    // 3. Click Undo button in toast
    const undoBtn = await page.waitForSelector('[data-testid="undo-btn"]', { timeout: 2000 });
    expect(undoBtn).toBeDefined();
    await undoBtn!.click();

    // Wait for autosave to complete again
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify monster is restored and selected
    let restoredMonsterItem = await page.waitForSelector(
      '[data-testid="monster-item-New Monster 1"]',
      { timeout: 5000 },
    );
    expect(restoredMonsterItem).toBeTruthy();

    // Verify name input is visible again (meaning it selected the restored monster)
    await page.waitForSelector('[data-testid="monster-name-input"]', { timeout: 2000 });

  });

  test('Delete group and group monster, verify undo', async () => {

    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Create a new group
    const addGroupBtn = await page.waitForSelector('[data-testid="add-group-btn"]', {
      timeout: 5000,
    });
    expect(addGroupBtn).toBeDefined();
    await addGroupBtn!.click();

    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify group exists
    let groupHeader = await page.waitForSelector('[data-testid="group-item-New Group 1"]', {
      timeout: 5000,
    });
    expect(groupHeader).toBeDefined();

    // 2. Add monster to group
    await page.hover('[data-testid="group-item-New Group 1"]');
    // Find the "+" button inside group header
    const addMonsterToGroupBtn = await page.waitForSelector(
      '[data-testid="group-item-New Group 1"] button[title="Add monster to group"]',
      { timeout: 2000 },
    );
    expect(addMonsterToGroupBtn).toBeDefined();
    await addMonsterToGroupBtn!.click();

    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify group monster exists in sidebar
    let groupMonsterItem = await page.waitForSelector(
      '[data-testid="group-monster-item-New Group 1-New Member 1"]',
      { timeout: 5000 },
    );
    expect(groupMonsterItem).toBeTruthy();

    // 3. Delete group monster and undo
    await page.hover('[data-testid="group-monster-item-New Group 1-New Member 1"]');
    const deleteGroupMonsterBtn = await page.waitForSelector(
      '[data-testid="group-monster-item-New Group 1-New Member 1"] .delete-btn',
      { timeout: 2000 },
    );
    expect(deleteGroupMonsterBtn).toBeDefined();
    await deleteGroupMonsterBtn!.click();

    // Verify toast shows delete of member
    let toast = await page.waitForSelector('[data-testid="undo-toast"]', { timeout: 2000 });
    let toastText = await page.evaluate((el) => el.textContent, toast);
    expect(toastText).toContain('Deleted monster "New Member 1" from group "New Group 1"');

    // Verify member is gone from sidebar
    let deletedGroupMonsterItem = await page.$(
      '[data-testid="group-monster-item-New Group 1-New Member 1"]',
    );
    expect(deletedGroupMonsterItem).toBeNull();

    // Click Undo
    const undoMemberBtn = await page.waitForSelector('[data-testid="undo-btn"]', { timeout: 2000 });
    await undoMemberBtn.click();

    // Verify member is back
    groupMonsterItem = await page.waitForSelector(
      '[data-testid="group-monster-item-New Group 1-New Member 1"]',
      { timeout: 5000 },
    );
    expect(groupMonsterItem).toBeTruthy();

    // 4. Delete whole group and undo
    await page.hover('[data-testid="group-item-New Group 1"]');
    const deleteGroupBtn = await page.waitForSelector(
      '[data-testid="group-item-New Group 1"] button.delete',
      { timeout: 2000 },
    );
    expect(deleteGroupBtn).toBeDefined();
    await deleteGroupBtn!.click();

    // Verify toast shows delete of group
    toast = await page.waitForSelector('[data-testid="undo-toast"]', { timeout: 2000 });
    toastText = await page.evaluate((el) => el.textContent, toast);
    expect(toastText).toContain('Deleted group "New Group 1" and all its monsters');

    // Verify group is gone from sidebar
    let deletedGroupHeader = await page.$('[data-testid="group-item-New Group 1"]');
    expect(deletedGroupHeader).toBeNull();

    // Click Undo
    const undoGroupBtn = await page.waitForSelector('[data-testid="undo-btn"]', { timeout: 2000 });
    await undoGroupBtn.click();

    // Verify group is back
    groupHeader = await page.waitForSelector('[data-testid="group-item-New Group 1"]', {
      timeout: 5000,
    });
    expect(groupHeader).toBeTruthy();

    // Verify child monster is also back!
    groupMonsterItem = await page.waitForSelector(
      '[data-testid="group-monster-item-New Group 1-New Member 1"]',
      { timeout: 5000 },
    );
    expect(groupMonsterItem).toBeTruthy();

  });
});
