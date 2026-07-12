import './setup-env';

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { dbPath, generatedTsPath, getDb } from '../server/db';
import {
  formatMissingWeaponWarning,
  formatFreeformCodeWarning,
  formatSharedFreeformCodeWarning,
  formatNoStandardActionWarning,
} from '../src/utils/validation';

// Dynamically import the Express app to ensure process.env.NODE_ENV is set first
const { app } = await import('../server/index');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Monster UI Integration Tests (Full Server)', () => {
  let server: http.Server;
  let baseUrl: string;

  before(async () => {
    console.log('Initializing test database and generated source files...');
    // Initialize temporary test JSON file from original
    const originalDbPath = path.resolve(__dirname, '../monsters_from_ui.json');
    if (fs.existsSync(originalDbPath)) {
      fs.copyFileSync(originalDbPath, dbPath);
    }
    // Initialize temporary test TS file from original
    const originalTsPath = path.resolve(__dirname, '../../src/monsters/individual_monsters/monsters_from_ui.ts');
    if (fs.existsSync(originalTsPath)) {
      fs.copyFileSync(originalTsPath, generatedTsPath);
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
    console.log('Stopping test server and cleaning up test files...');
    // 1. Close Server
    if (server) {
      server.close();
    }

    // 2. Clean up temporary test files
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(generatedTsPath)) {
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
          weapons: [{ name: 'spear', addStandard: true }],
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
              weapons: [{ name: 'spear', addStandard: true }],
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

  test('POST /api/preview cache hits under concurrent/rapid switching requests', async () => {
    const monsterA = {
      name: `RapidMonsterA_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 1,
      },
      weapons: [{ name: 'spear', addStandard: true }],
      freeformCode: '// rapid switch A',
    };

    const monsterB = {
      name: `RapidMonsterB_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 2,
      },
      weapons: [{ name: 'spear', addStandard: true }],
      freeformCode: '// rapid switch B',
    };

    // 1. Initial request for Monster A (cold start/miss)
    const resA1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterA }),
    });
    assert.strictEqual(resA1.status, 200);
    const resultA1 = await resA1.json();
    assert.strictEqual(resultA1.cacheHit, false);

    // 2. Initial request for Monster B (cold start/miss)
    const resB1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterB }),
    });
    assert.strictEqual(resB1.status, 200);
    const resultB1 = await resB1.json();
    assert.strictEqual(resultB1.cacheHit, false);

    // 3. Send rapid concurrent requests for A and B to verify cache hits
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(
        fetch(`${baseUrl}/api/preview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ monster: monsterA }),
        }).then((res) => res.json()),
      );
      promises.push(
        fetch(`${baseUrl}/api/preview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ monster: monsterB }),
        }).then((res) => res.json()),
      );
    }

    const results = await Promise.all(promises);

    // Verify all subsequent requests successfully hit the cache and return correct stats
    for (let i = 0; i < results.length; i++) {
      const res = results[i];
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.cacheHit, true);

      const expectedName = i % 2 === 0 ? monsterA.name : monsterB.name;
      assert.strictEqual(res.computedStats.name, expectedName);
    }
  });

  test('POST /api/preview validates strike maneuvers requiring a weapon override', async () => {
    const monsterWithStrikeWarn = {
      name: `StrikeWarnMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      standardAbilities: [
        {
          type: 'maneuver',
          name: 'Basic Strike',
          options: {},
        },
      ],
    };

    const res1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithStrikeWarn }),
    });
     assert.strictEqual(res1.status, 200);
    const result1 = await res1.json();
    assert.ok(
      result1.warnings.includes(formatMissingWeaponWarning('Basic Strike')),
    );

    const monsterWithStrikeOk = {
      name: `StrikeOkMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      standardAbilities: [
        {
          type: 'maneuver',
          name: 'Basic Strike',
          options: {
            weapon: 'Shortsword',
          },
        },
      ],
    };

    const res2 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithStrikeOk }),
    });
    assert.strictEqual(res2.status, 200);
    const result2 = await res2.json();
    assert.ok(
      !result2.warnings.includes(formatMissingWeaponWarning('Basic Strike')),
    );

    const monsterWithDisplayNameStrikeNonWarn = {
      name: `DisplayNameStrikeNonWarn_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      standardAbilities: [
        {
          type: 'maneuver',
          name: 'Ostentatious Flex',
          options: {
            displayName: 'Make Strike',
          },
        },
      ],
    };

    const res3 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithDisplayNameStrikeNonWarn }),
    });
    assert.strictEqual(res3.status, 200);
    const result3 = await res3.json();
    assert.ok(
      !result3.warnings.includes(formatMissingWeaponWarning('Make Strike')),
    );
  });

  test('POST /api/preview validates presence of freeform and shared freeform code warnings', async () => {
    const monsterWithFreeform = {
      name: `FreeformMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 1,
      },
      weapons: [{ name: 'spear', addStandard: true }],
      freeformCode: 'creature.addCustomSense("Infravision");',
    };

    const res1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithFreeform }),
    });
    assert.strictEqual(res1.status, 200);
    const result1 = await res1.json();
    assert.ok(
      result1.warnings.includes(formatFreeformCodeWarning(monsterWithFreeform.name)),
    );

    const monsterWithSharedFreeform = {
      name: `SharedFreeformMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 1,
      },
      weapons: [{ name: 'spear', addStandard: true }],
      freeformCode: '',
    };

    const res2 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        monster: monsterWithSharedFreeform,
        sharedFreeformCode: 'creature.addCustomSense("Shared Sense");',
      }),
    });
    assert.strictEqual(res2.status, 200);
    const result2 = await res2.json();
    assert.ok(
      result2.warnings.includes(formatSharedFreeformCodeWarning(monsterWithSharedFreeform.name)),
    );
  });

  test('POST /api/save rejects malformed JSON payloads with 400 status', async () => {
    const resPost = await fetch(`${baseUrl}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"invalid": circular structure or bad json',
    });
    assert.strictEqual(resPost.status, 400);
  });

  test('POST /api/preview validates that a monster has at least one standard action ability', async () => {
    const monsterWithNoError = {
      name: `NoErrorMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 1,
      },
      weapons: [{ name: 'spear', addStandard: true }],
    };

    const res1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithNoError }),
    });
    assert.strictEqual(res1.status, 200);
    const result1 = await res1.json();
    assert.strictEqual(result1.success, true);
    assert.ok(
      !result1.warnings.includes(formatNoStandardActionWarning(monsterWithNoError.name)),
    );

    const monsterWithError = {
      name: `ErrorMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 1,
      },
      weapons: [],
    };

    const res2 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithError }),
    });
    assert.strictEqual(res2.status, 200);
    const result2 = await res2.json();
    assert.strictEqual(result2.success, true);
    assert.ok(
      result2.warnings.includes(formatNoStandardActionWarning(monsterWithError.name)),
    );
  });
});
