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

describe('Monster UI Duplication E2E Integration Tests', () => {
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
          console.log(`Express API server for Duplication E2E test running at port ${expressPort}`);
        }
        resolve();
      });
    });

    // Start Vite server proxying to Express
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
    console.log(`Vite Dev Server for Duplication E2E test running at ${baseUrl}`);

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

  test('Duplicate an individual monster and verify it preserves details under copy name', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Add a new monster
    const addMonsterBtn = await page.waitForSelector('[data-testid="add-individual-btn"]', {
      timeout: 5000,
    });
    await addMonsterBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 2. Set monster name to "Copyable Beast"
    const nameInput = await page.waitForSelector('[data-testid="monster-name-input"]', {
      timeout: 5000,
    });
    await page.$eval('[data-testid="monster-name-input"]', (el) =>
      (el as HTMLInputElement).select(),
    );
    await nameInput!.type('Copyable Beast', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. Set a specific trait/stat to check duplication correctness (e.g., Level = 10, Alignment = Neutral Good)
    await page.select('[data-testid="alignment-select"]', 'neutral good');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const levelInput = await page.waitForSelector('[data-testid="level-input"]');
    await page.$eval('[data-testid="level-input"]', (el) => (el as HTMLInputElement).select());
    await levelInput!.type('10');
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 4. Click Duplicate button
    const dupBtn = await page.waitForSelector('[data-testid="duplicate-monster-btn"]', {
      timeout: 5000,
    });
    expect(dupBtn).toBeDefined();
    await dupBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for duplication to save and update selection

    // 5. Verify active monster in UI has changed to "Copyable Beast (Copy)"
    const editorHeader = await page.waitForSelector('.editor-header h3', { timeout: 5000 });
    const headerText = await page.$eval('.editor-header h3', (el) => el.textContent);
    expect(headerText).toContain('Copyable Beast (Copy)');

    // 6. Verify duplicate inherits level 10 and neutral good alignment
    const newNameVal = await page.$eval('[data-testid="monster-name-input"]', (el) => (el as HTMLInputElement).value);
    expect(newNameVal).toBe('Copyable Beast (Copy)');

    const newAlignmentVal = await page.$eval('[data-testid="alignment-select"]', (el) => (el as HTMLSelectElement).value);
    expect(newAlignmentVal).toBe('neutral good');

    const newLevelVal = await page.$eval('[data-testid="level-input"]', (el) => (el as HTMLInputElement).value);
    expect(newLevelVal).toBe('10');

    // 7. Verify the DB file has both monsters saved
    const dbRaw = fs.readFileSync(paths.dbPath, 'utf8');
    const dbJson = JSON.parse(dbRaw);
    const m1 = dbJson.monsters.find((m: any) => m.name === 'Copyable Beast');
    const m2 = dbJson.monsters.find((m: any) => m.name === 'Copyable Beast (Copy)');
    expect(m1).toBeDefined();
    expect(m2).toBeDefined();
    expect(m2.requiredProperties.level).toBe(10);
    expect(m2.requiredProperties.alignment).toBe('neutral good');
  });

  test('Duplicate a group monster and verify it stays in the same group', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.sidebar', { timeout: 5000 });

    // 1. Add group
    const addGroupBtn = await page.waitForSelector('[data-testid="add-group-btn"]', {
      timeout: 5000,
    });
    await addGroupBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Name group "Squad"
    const groupNameInput = await page.waitForSelector('#group-name', { timeout: 5000 });
    await page.$eval('#group-name', (el) => (el as HTMLInputElement).select());
    await groupNameInput!.type('Squad', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 2. Add monster member to group
    const addMemberBtn = await page.waitForSelector(
      '[data-testid="group-item-Squad"] button[title="Add monster to group"]',
      { timeout: 5000 }
    );
    await addMemberBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Rename member to "Warrior Elite"
    const nameInput = await page.waitForSelector('[data-testid="monster-name-input"]', {
      timeout: 5000,
    });
    await page.$eval('[data-testid="monster-name-input"]', (el) =>
      (el as HTMLInputElement).select(),
    );
    await nameInput!.type('Warrior Elite', { delay: 30 });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. Duplicate group monster
    const dupBtn = await page.waitForSelector('[data-testid="duplicate-monster-btn"]', {
      timeout: 5000,
    });
    await dupBtn!.click();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 4. Verify selection switched to copy
    const editorHeader = await page.waitForSelector('.editor-header h3', { timeout: 5000 });
    const headerText = await page.$eval('.editor-header h3', (el) => el.textContent);
    expect(headerText).toContain('Warrior Elite (Copy)');

    // 5. Verify DB group contains both members
    const dbRaw = fs.readFileSync(paths.dbPath, 'utf8');
    const dbJson = JSON.parse(dbRaw);
    const squad = dbJson.monsterGroups.find((g: any) => g.name === 'Squad');
    expect(squad).toBeDefined();
    expect(squad.monsters.length).toBe(2);
    expect(squad.monsters[0].name).toBe('Warrior Elite');
    expect(squad.monsters[1].name).toBe('Warrior Elite (Copy)');
  });
});
