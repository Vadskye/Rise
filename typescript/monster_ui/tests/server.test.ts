process.env.NODE_ENV = 'test';

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { dbPath, getDb } from '../server/db';

// Dynamically import the Express app to ensure process.env.NODE_ENV is set first
const { app } = await import('../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatedTsPath = path.resolve(
  __dirname,
  '../../src/monsters/individual_monsters/monsters_from_ui.ts',
);

describe('Monster UI Integration Tests (Full Server)', () => {
  let dbBackup: string | null = null;
  let tsBackup: string | null = null;
  let server: http.Server;
  let baseUrl: string;

  before(async () => {
    console.log('Backing up database and generated source files...');
    // 1. Back up monsters_from_ui.json
    if (fs.existsSync(dbPath)) {
      dbBackup = fs.readFileSync(dbPath, 'utf8');
    }
    // 2. Back up monsters_from_ui.ts
    if (fs.existsSync(generatedTsPath)) {
      tsBackup = fs.readFileSync(generatedTsPath, 'utf8');
    }

    // 3. Start the Express Server on a random port
    console.log('Starting full Express server for tests...');
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const addr = server.address();
        if (addr && typeof addr !== 'string') {
          baseUrl = `http://localhost:${addr.port}`;
          console.log(`Test server running at ${baseUrl}`);
        }
        resolve();
      });
    });
  });

  after(() => {
    console.log('Stopping test server and restoring backups...');
    // 1. Close Server
    if (server) {
      server.close();
    }

    // 2. Restore monsters_from_ui.json
    if (dbBackup !== null) {
      fs.writeFileSync(dbPath, dbBackup, 'utf8');
    } else if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }

    // 3. Restore monsters_from_ui.ts
    if (tsBackup !== null) {
      fs.writeFileSync(generatedTsPath, tsBackup, 'utf8');
    } else if (fs.existsSync(generatedTsPath)) {
      fs.unlinkSync(generatedTsPath);
    }
  });

  test('GET /api/monsters retrieves the current database', async () => {
    const res = await fetch(`${baseUrl}/api/monsters`);
    assert.strictEqual(res.status, 200);
    const db = await res.json();
    assert.ok(db.monsters);
    assert.ok(db.monsterGroups);
  });

  test('POST /api/save saves a new individual monster', async () => {
    // 1. Get initial DB state
    const resGet = await fetch(`${baseUrl}/api/monsters`);
    const initialDb = await resGet.json();

    // 2. Prepare payload
    const newMonsterName = `TestServerMonster_${Date.now()}`;
    const updatedDb = {
      ...initialDb,
      monsters: [
        ...initialDb.monsters,
        {
          name: newMonsterName,
          requiredProperties: {
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_origin: 'natural',
            creature_type: 'beast',
            size: 'medium',
            level: 1,
          },
          freeformCode: '// full server test individual',
        },
      ],
    };

    // 3. Save via HTTP
    const resPost = await fetch(`${baseUrl}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDb),
    });

    assert.strictEqual(resPost.status, 200);
    const result = await resPost.json();
    assert.strictEqual(result.success, true);
    assert.ok(result.validations);
    assert.ok(result.validations[newMonsterName]);

    // Verify database file has new monster
    const finalDb = getDb();
    const savedMonster = finalDb.monsters.find((m: any) => m.name === newMonsterName);
    assert.ok(savedMonster);
    assert.strictEqual(savedMonster.freeformCode, '// full server test individual');

    // Verify generated TS
    assert.ok(fs.existsSync(generatedTsPath));
    const generatedContent = fs.readFileSync(generatedTsPath, 'utf8');
    assert.ok(generatedContent.includes(`grimoire.addMonster('${newMonsterName}'`));
  });

  test('POST /api/save saves a new monster group and validates', async () => {
    // 1. Get initial DB state
    const resGet = await fetch(`${baseUrl}/api/monsters`);
    const initialDb = await resGet.json();

    // 2. Prepare payload adding a new group
    const testGroupName = `TestServerGroup_${Date.now()}`;
    const testGroupMonsterName = `TestServerGroupMonster_${Date.now()}`;
    const updatedDb = {
      ...initialDb,
      monsterGroups: [
        ...initialDb.monsterGroups,
        {
          name: testGroupName,
          hasArt: false,
          sharedFreeformCode: '// server group shared code',
          monsters: [
            {
              name: testGroupMonsterName,
              requiredProperties: {
                alignment: 'neutral',
                base_class: 'warrior',
                elite: false,
                creature_origin: 'natural',
                creature_type: 'beast',
                size: 'medium',
                level: 1,
              },
              freeformCode: '// server group member code',
            },
          ],
        },
      ],
    };

    // 3. Save via HTTP
    const resPost = await fetch(`${baseUrl}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDb),
    });

    assert.strictEqual(resPost.status, 200);
    const result = await resPost.json();
    assert.strictEqual(result.success, true);

    const validationKey = `${testGroupName}.${testGroupMonsterName}`;
    assert.ok(result.validations[validationKey]);
    assert.strictEqual(result.validations[validationKey].success, true);

    // Verify database file has new group and monster
    const finalDb = getDb();
    const savedGroup = finalDb.monsterGroups.find((g: any) => g.name === testGroupName);
    assert.ok(savedGroup);
    const savedMonster = savedGroup.monsters.find((m: any) => m.name === testGroupMonsterName);
    assert.ok(savedMonster);

    // Verify generated TS
    assert.ok(fs.existsSync(generatedTsPath));
    const generatedContent = fs.readFileSync(generatedTsPath, 'utf8');
    assert.ok(generatedContent.includes(`name: '${testGroupName}'`));
    assert.ok(generatedContent.includes(`'${testGroupMonsterName}'`));
  });

  test('POST /api/save rejects malformed JSON payloads with 400 status', async () => {
    const resPost = await fetch(`${baseUrl}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"invalid": circular structure or bad json',
    });
    assert.strictEqual(resPost.status, 400);
  });
});
