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

describe('Monster UI Delete Undo Integration Tests', () => {
  let expressServer: http.Server;
  let expressPort: number;
  let viteServer: ViteDevServer;
  let baseUrl: string;
  let browser: Browser;

  before(async () => {
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

  test('Delete individual monster, undo deletion, and verify restoration', async () => {
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

    // 1. Create a new individual monster
    const addMonsterBtn = await page.waitForSelector('[data-testid="add-individual-btn"]', { timeout: 5000 });
    assert.ok(addMonsterBtn, 'Add Monster button should exist');
    await addMonsterBtn.click();

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
    assert.ok(monsterItem, 'New Monster 1 should exist in sidebar');

    // 2. Click Delete button on the monster (should delete immediately without prompt)
    // We hover the item first to make the delete button visible (it has opacity: 0 on hover off)
    await page.hover('[data-testid="monster-item-New Monster 1"]');
    const deleteBtn = await page.waitForSelector('[data-testid="monster-item-New Monster 1"] .delete-btn', { timeout: 2000 });
    assert.ok(deleteBtn, 'Delete button should be visible on hover');
    await deleteBtn.click();

    // Verify toast is visible
    const toast = await page.waitForSelector('[data-testid="undo-toast"]', { timeout: 2000 });
    assert.ok(toast, 'Undo toast should be visible');

    // Verify message content
    const toastText = await page.evaluate((el) => el.textContent, toast);
    assert.ok(toastText?.includes('Deleted individual monster "New Monster 1"'), 'Toast text should describe deletion');

    // Verify monster is removed from sidebar
    let deletedMonsterItem = await page.$('[data-testid="monster-item-New Monster 1"]');
    assert.strictEqual(deletedMonsterItem, null, 'Monster should be removed from sidebar');

    // 3. Click Undo button in toast
    const undoBtn = await page.waitForSelector('[data-testid="undo-btn"]', { timeout: 2000 });
    assert.ok(undoBtn, 'Undo button should exist');
    await undoBtn.click();

    // Wait for autosave to complete again
    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify monster is restored and selected
    let restoredMonsterItem = await page.waitForSelector('[data-testid="monster-item-New Monster 1"]', { timeout: 5000 });
    assert.ok(restoredMonsterItem, 'Monster should be restored to sidebar');

    // Verify name input is visible again (meaning it selected the restored monster)
    await page.waitForSelector('[data-testid="monster-name-input"]', { timeout: 2000 });
    
    await page.close();
  });

  test('Delete group and group monster, verify undo', async () => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    page.on('pageerror', (err: any) => {
      throw new Error(`Browser console error: ${err.message}`);
    });

    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Create a new group
    const addGroupBtn = await page.waitForSelector('[data-testid="add-group-btn"]', { timeout: 5000 });
    assert.ok(addGroupBtn, 'Add Group button should exist');
    await addGroupBtn.click();

    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify group exists
    let groupHeader = await page.waitForSelector('[data-testid="group-item-New Group 1"]', { timeout: 5000 });
    assert.ok(groupHeader, 'Group header should exist in sidebar');

    // 2. Add monster to group
    await page.hover('[data-testid="group-item-New Group 1"]');
    // Find the "+" button inside group header
    const addMonsterToGroupBtn = await page.waitForSelector('[data-testid="group-item-New Group 1"] button[title="Add monster to group"]', { timeout: 2000 });
    assert.ok(addMonsterToGroupBtn, 'Add monster to group button should exist');
    await addMonsterToGroupBtn.click();

    await page.waitForFunction(
      () => {
        const statusEl = document.querySelector('[data-testid="save-status"]');
        return statusEl && statusEl.textContent === 'Saved';
      },
      { timeout: 10000 },
    );

    // Verify group monster exists in sidebar
    let groupMonsterItem = await page.waitForSelector('[data-testid="group-monster-item-New Group 1-New Member 1"]', { timeout: 5000 });
    assert.ok(groupMonsterItem, 'Group monster should exist');

    // 3. Delete group monster and undo
    await page.hover('[data-testid="group-monster-item-New Group 1-New Member 1"]');
    const deleteGroupMonsterBtn = await page.waitForSelector('[data-testid="group-monster-item-New Group 1-New Member 1"] .delete-btn', { timeout: 2000 });
    assert.ok(deleteGroupMonsterBtn, 'Delete group monster button should exist');
    await deleteGroupMonsterBtn.click();

    // Verify toast shows delete of member
    let toast = await page.waitForSelector('[data-testid="undo-toast"]', { timeout: 2000 });
    let toastText = await page.evaluate((el) => el.textContent, toast);
    assert.ok(toastText?.includes('Deleted monster "New Member 1" from group "New Group 1"'), 'Toast should describe member delete');

    // Verify member is gone from sidebar
    let deletedGroupMonsterItem = await page.$('[data-testid="group-monster-item-New Group 1-New Member 1"]');
    assert.strictEqual(deletedGroupMonsterItem, null, 'Group monster should be deleted from sidebar');

    // Click Undo
    const undoMemberBtn = await page.waitForSelector('[data-testid="undo-btn"]', { timeout: 2000 });
    await undoMemberBtn.click();

    // Verify member is back
    groupMonsterItem = await page.waitForSelector('[data-testid="group-monster-item-New Group 1-New Member 1"]', { timeout: 5000 });
    assert.ok(groupMonsterItem, 'Group monster should be restored');

    // 4. Delete whole group and undo
    await page.hover('[data-testid="group-item-New Group 1"]');
    const deleteGroupBtn = await page.waitForSelector('[data-testid="group-item-New Group 1"] button.delete', { timeout: 2000 });
    assert.ok(deleteGroupBtn, 'Delete group button should exist');
    await deleteGroupBtn.click();

    // Verify toast shows delete of group
    toast = await page.waitForSelector('[data-testid="undo-toast"]', { timeout: 2000 });
    toastText = await page.evaluate((el) => el.textContent, toast);
    assert.ok(toastText?.includes('Deleted group "New Group 1" and all its monsters'), 'Toast should describe group delete');

    // Verify group is gone from sidebar
    let deletedGroupHeader = await page.$('[data-testid="group-item-New Group 1"]');
    assert.strictEqual(deletedGroupHeader, null, 'Group header should be deleted from sidebar');

    // Click Undo
    const undoGroupBtn = await page.waitForSelector('[data-testid="undo-btn"]', { timeout: 2000 });
    await undoGroupBtn.click();

    // Verify group is back
    groupHeader = await page.waitForSelector('[data-testid="group-item-New Group 1"]', { timeout: 5000 });
    assert.ok(groupHeader, 'Group header should be restored');

    // Verify child monster is also back!
    groupMonsterItem = await page.waitForSelector('[data-testid="group-monster-item-New Group 1-New Member 1"]', { timeout: 5000 });
    assert.ok(groupMonsterItem, 'Group child monster should be restored together with the group');

    await page.close();
  });
});
