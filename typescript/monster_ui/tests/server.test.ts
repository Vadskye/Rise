import './setup-env';

import { test, describe, beforeAll, afterAll, expect } from 'vitest';
import * as fs from 'fs';
import http from 'http';
import { paths, getDb } from '../server/db';
import {
  formatMissingWeaponWarning,
  formatMissingPoisonWarning,
  formatFreeformCodeWarning,
  formatSharedFreeformCodeWarning,
  formatNoStandardActionWarning,
} from '@src/monsters/monster_validation';

// Dynamically import the Express app to ensure process.env.NODE_ENV is set first
const { app } = await import('../server/index');

describe('Monster UI Integration Tests (Full Server)', () => {
  let server: http.Server;
  let baseUrl: string;

  beforeAll(async () => {
    // Start the Express Server on a random port.
    // setup-env.ts already configured isolated temp-file paths before this module loaded.
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

  afterAll(() => {
    console.log('Stopping test server and cleaning up test files...');
    if (server) {
      server.close();
    }

    // Clean up temp files created during this test run
    if (fs.existsSync(paths.dbPath)) {
      fs.unlinkSync(paths.dbPath);
    }
    if (fs.existsSync(paths.generatedTsPath)) {
      fs.unlinkSync(paths.generatedTsPath);
    }
    if (fs.existsSync(paths.settingsPath)) {
      fs.unlinkSync(paths.settingsPath);
    }
  });

  test('GET /api/monsters retrieves the current database', async () => {
    const res = await fetch(`${baseUrl}/api/monsters`);
    expect(res.status).toBe(200);
    const db = await res.json();
    expect(db.monsters).toBeDefined();
    expect(db.monsterGroups).toBeDefined();
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
            creature_types: ['beast'],
            size: 'medium',
            level: 1,
          },
          weapons: [{ name: 'spear' }],
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

    expect(resPost.status).toBe(200);
    const result = await resPost.json();
    expect(result.success).toBe(true);
    expect(result.validations).toBeDefined();
    expect(result.validations[newMonsterName]).toBeDefined();

    // Verify database file has new monster
    const finalDb = getDb();
    const savedMonster = finalDb.monsters.find((m: any) => m.name === newMonsterName);
    expect(savedMonster).toBeDefined();
    expect(savedMonster!.freeformCode).toBe('// full server test individual');

    // Verify generated TS
    expect(fs.existsSync(paths.generatedTsPath)).toBe(true);
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    expect(generatedContent).toContain(`grimoire.addMonster('${newMonsterName}'`);
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
                creature_types: ['beast'],
                size: 'medium',
                level: 1,
              },
              weapons: [{ name: 'spear' }],
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

    expect(resPost.status).toBe(200);
    const result = await resPost.json();
    expect(result.success).toBe(true);

    const validationKey = `${testGroupName}.${testGroupMonsterName}`;
    expect(result.validations[validationKey]).toBeDefined();
    expect(result.validations[validationKey].success).toBe(true);

    // Verify database file has new group and monster
    const finalDb = getDb();
    const savedGroup = finalDb.monsterGroups.find((g: any) => g.name === testGroupName);
    expect(savedGroup).toBeDefined();
    const savedMonster = savedGroup!.monsters.find((m: any) => m.name === testGroupMonsterName);
    expect(savedMonster).toBeDefined();

    // Verify generated TS
    expect(fs.existsSync(paths.generatedTsPath)).toBe(true);
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    expect(generatedContent).toContain(`name: '${testGroupName}'`);
    expect(generatedContent).toContain(`'${testGroupMonsterName}'`);
  });

  test('POST /api/save saves a monster incrementally', async () => {
    const testMonsterName = `IncMonster_${Date.now()}`;
    const payload = {
      monster: {
        data: {
          name: testMonsterName,
          requiredProperties: {
            alignment: 'neutral',
            base_class: 'warrior',
            elite: false,
            creature_origin: 'natural',
            creature_types: ['beast'],
            size: 'medium',
            level: 1,
          },
          weapons: [{ name: 'spear' }],
          freeformCode: '// incremental save test',
        },
      },
    };

    const res = await fetch(`${baseUrl}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    expect(res.status).toBe(200);
    const result = await res.json();
    expect(result.success).toBe(true);
    expect(result.validations[testMonsterName]).toBeDefined();

    // Verify database file has new monster
    let db = getDb();
    let savedMonster = db.monsters.find((m: any) => m.name === testMonsterName);
    expect(savedMonster).toBeDefined();

    // Now modify the monster name (rename)
    const renamedMonsterName = `${testMonsterName}_Renamed`;
    const renamePayload = {
      monster: {
        data: {
          ...savedMonster,
          name: renamedMonsterName,
        },
        oldName: testMonsterName,
      },
    };

    const resRename = await fetch(`${baseUrl}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(renamePayload),
    });

    expect(resRename.status).toBe(200);
    const renameResult = await resRename.json();
    expect(renameResult.success).toBe(true);

    db = getDb();
    expect(db.monsters.find((m: any) => m.name === testMonsterName)).toBeUndefined();
    expect(db.monsters.find((m: any) => m.name === renamedMonsterName)).toBeDefined();

    // Delete the monster
    const deletePayload = {
      deleteMonster: renamedMonsterName,
    };
    const resDelete = await fetch(`${baseUrl}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deletePayload),
    });
    expect(resDelete.status).toBe(200);
    expect((await resDelete.json()).success).toBe(true);

    db = getDb();
    expect(db.monsters.find((m: any) => m.name === renamedMonsterName)).toBeUndefined();
  });

  test('POST /api/preview cache hits under concurrent/rapid switching requests', async () => {
    const monsterA = {
      name: `RapidMonsterA_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      weapons: [{ name: 'spear' }],
      freeformCode: '// rapid switch A',
    };

    const monsterB = {
      name: `RapidMonsterB_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 2,
      },
      weapons: [{ name: 'spear' }],
      freeformCode: '// rapid switch B',
    };

    // 1. Initial request for Monster A (cold start/miss)
    const resA1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterA }),
    });
    expect(resA1.status).toBe(200);
    const resultA1 = await resA1.json();
    expect(resultA1.cacheHit).toBe(false);

    // 2. Initial request for Monster B (cold start/miss)
    const resB1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterB }),
    });
    expect(resB1.status).toBe(200);
    const resultB1 = await resB1.json();
    expect(resultB1.cacheHit).toBe(false);

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
      expect(res.success).toBe(true);
      expect(res.cacheHit).toBe(true);

      const expectedName = i % 2 === 0 ? monsterA.name : monsterB.name;
      expect(res.computedStats.name).toBe(expectedName);
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
        creature_types: ['beast'],
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
    expect(res1.status).toBe(200);
    const result1 = await res1.json();
    expect(result1.requirements).toContain(formatMissingWeaponWarning('Basic Strike'));

    const monsterWithStrikeOk = {
      name: `StrikeOkMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      standardAbilities: [
        {
          type: 'maneuver',
          name: 'Basic Strike',
          options: {
            weapon: 'broadsword',
          },
        },
      ],
    };

    const res2 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithStrikeOk }),
    });
    expect(res2.status).toBe(200);
    const result2 = await res2.json();
    expect(result2.requirements).not.toContain(formatMissingWeaponWarning('Basic Strike'));

    const monsterWithDisplayNameStrikeNonWarn = {
      name: `DisplayNameStrikeNonWarn_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
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
    expect(res3.status).toBe(200);
    const result3 = await res3.json();
    expect(result3.requirements).not.toContain(formatMissingWeaponWarning('Make Strike'));
  });

  test('POST /api/preview validates "Throw Item" missing item warning and compiles with item', async () => {
    const monsterWithThrowItemWarn = {
      name: `ThrowItemWarnMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      standardAbilities: [
        {
          type: 'maneuver',
          name: 'Throw Item',
        },
      ],
    };

    const res1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithThrowItemWarn }),
    });
    expect(res1.status).toBe(200);
    const result1 = await res1.json();
    expect(result1.requirements).toContain(formatMissingWeaponWarning('Throw Item', true));

    const monsterWithThrowItemOk = {
      name: `ThrowItemOkMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      standardAbilities: [
        {
          type: 'maneuver',
          name: 'Throw Item',
          options: {
            weapon: 'Acid Flask',
          },
        },
      ],
    };

    const res2 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithThrowItemOk }),
    });
    expect(res2.status).toBe(200);
    const result2 = await res2.json();
    expect(result2.requirements).not.toContain(formatMissingWeaponWarning('Throw Item', true));
    expect(result2.computedStats.activeAbilities.some((a: any) => a.name === 'Acid Flask')).toBe(
      true,
    );
  });

  test('POST /api/preview validates "Poisonous Strike" missing weapon/poison warning and compiles cleanly', async () => {
    const monsterWithPoisonWarn = {
      name: `PoisonWarnMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      standardAbilities: [
        {
          type: 'maneuver',
          name: 'Poisonous Strike',
        },
      ],
    };

    const res1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithPoisonWarn }),
    });
    expect(res1.status).toBe(200);
    const result1 = await res1.json();
    expect(result1.requirements).toContain(formatMissingWeaponWarning('Poisonous Strike'));
    expect(result1.requirements).toContain(formatMissingPoisonWarning('Poisonous Strike'));

    const monsterWithPoisonOk = {
      name: `PoisonOkMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      weapons: [{ name: 'stinger' }],
      standardAbilities: [
        {
          type: 'maneuver',
          name: 'Poisonous Strike',
          options: {
            weapon: 'stinger',
            poison: 'Poison, Asp Venom',
          },
        },
      ],
    };

    const res2 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithPoisonOk }),
    });
    expect(res2.status).toBe(200);
    const result2 = await res2.json();
    expect(result2.requirements).not.toContain(formatMissingWeaponWarning('Poisonous Strike'));
    expect(result2.requirements).not.toContain(formatMissingPoisonWarning('Poisonous Strike'));
    expect(result2.computedStats.activeAbilities.some((a: any) => a.name === 'Asp Venom')).toBe(
      true,
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
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      weapons: [{ name: 'spear' }],
      freeformCode: 'creature.addCustomSense("Infravision");',
    };

    const res1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithFreeform }),
    });
    expect(res1.status).toBe(200);
    const result1 = await res1.json();
    expect(result1.guidelines).toContain(formatFreeformCodeWarning(monsterWithFreeform.name));

    const monsterWithSharedFreeform = {
      name: `SharedFreeformMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      weapons: [{ name: 'spear' }],
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
    expect(res2.status).toBe(200);
    const result2 = await res2.json();
    expect(result2.guidelines).toContain(
      formatSharedFreeformCodeWarning(monsterWithSharedFreeform.name),
    );
  });

  test('POST /api/save rejects malformed JSON payloads with 400 status', async () => {
    const resPost = await fetch(`${baseUrl}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"invalid": circular structure or bad json',
    });
    expect(resPost.status).toBe(400);
  });

  test('POST /api/preview validates that a monster has at least one standard action ability', async () => {
    const monsterWithNoError = {
      name: `NoErrorMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      weapons: [{ name: 'spear' }],
      standardAbilities: [
        {
          type: 'maneuver' as const,
          name: 'Charge',
        },
      ],
    };

    const res1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithNoError }),
    });
    expect(res1.status).toBe(200);
    const result1 = await res1.json();
    expect(result1.success).toBe(true);
    expect(result1.guidelines).not.toContain(
      formatNoStandardActionWarning(monsterWithNoError.name),
    );

    const monsterWithError = {
      name: `ErrorMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
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
    expect(res2.status).toBe(200);
    const result2 = await res2.json();
    expect(result2.success).toBe(true);
    expect(result2.requirements).toContain(formatNoStandardActionWarning(monsterWithError.name));
  });

  test('GET /api/settings returns empty object when no settings file exists', async () => {
    // Ensure settings file is deleted first
    if (fs.existsSync(paths.settingsPath)) {
      fs.unlinkSync(paths.settingsPath);
    }
    const res = await fetch(`${baseUrl}/api/settings`);
    expect(res.status).toBe(200);
    const settings = await res.json();
    expect(settings).toEqual({});
  });

  test('POST /api/settings stores settings persistently', async () => {
    const settingsPayload = {
      lastActiveSelection: {
        type: 'monster' as const,
        name: 'Troll',
      },
    };

    const postRes = await fetch(`${baseUrl}/api/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settingsPayload),
    });
    expect(postRes.status).toBe(200);
    const postResult = await postRes.json();
    expect(postResult.success).toBe(true);

    // Retrieve settings and assert correctness
    const getRes = await fetch(`${baseUrl}/api/settings`);
    expect(getRes.status).toBe(200);
    const retrievedSettings = await getRes.json();
    expect(retrievedSettings).toEqual(settingsPayload);
  });

  test('POST /api/preview validates custom maneuvers with weapons and generates appropriate code', async () => {
    const monsterWithCustomManeuverWarn = {
      name: `CustomWarnMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      customAbilities: [
        {
          type: 'maneuver',
          name: 'Custom Strike',
          effect: 'Make a strike against Reflex defense.',
        },
      ],
    };

    const res1 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithCustomManeuverWarn }),
    });
    expect(res1.status).toBe(200);
    const result1 = await res1.json();
    expect(result1.requirements).toContain(formatMissingWeaponWarning('Custom Strike'));

    const monsterWithCustomManeuverOk = {
      name: `CustomOkMonster_${Date.now()}`,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      freeformCode: '',
      customAbilities: [
        {
          type: 'maneuver',
          name: 'Custom Strike',
          effect: 'Make a strike against Reflex defense.',
          weapon: 'broadsword',
        },
      ],
    };

    const res2 = await fetch(`${baseUrl}/api/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monster: monsterWithCustomManeuverOk }),
    });
    expect(res2.status).toBe(200);
    const result2 = await res2.json();
    expect(result2.requirements).not.toContain(formatMissingWeaponWarning('Custom Strike'));

    expect(result2.computedStats).toBeDefined();
    const customStrike = result2.computedStats.activeAbilities.find(
      (a: any) => a.name === 'Custom Strike',
    );
    expect(customStrike).toBeDefined();
    expect(customStrike.weapon).toBe('broadsword');
  });
});
