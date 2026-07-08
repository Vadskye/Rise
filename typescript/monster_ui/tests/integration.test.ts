import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getDb, dbPath, saveAndValidateAll } from '../server/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the generated TypeScript file in the main src directory
const generatedTsPath = path.resolve(
  __dirname,
  '../../src/monsters/individual_monsters/monsters_from_ui.ts',
);

describe('Monster UI Integration Tests (Serverless)', () => {
  let dbBackup: string | null = null;
  let tsBackup: string | null = null;

  before(() => {
    console.log('Backing up database and generated source files...');
    // 1. Back up monsters_from_ui.json
    if (fs.existsSync(dbPath)) {
      dbBackup = fs.readFileSync(dbPath, 'utf8');
    }
    // 2. Back up monsters_from_ui.ts
    if (fs.existsSync(generatedTsPath)) {
      tsBackup = fs.readFileSync(generatedTsPath, 'utf8');
    }
  });

  after(() => {
    console.log('Restoring original database and generated source files...');
    // 1. Restore monsters_from_ui.json
    if (dbBackup !== null) {
      fs.writeFileSync(dbPath, dbBackup, 'utf8');
    } else if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }

    // 2. Restore monsters_from_ui.ts
    if (tsBackup !== null) {
      fs.writeFileSync(generatedTsPath, tsBackup, 'utf8');
    } else if (fs.existsSync(generatedTsPath)) {
      fs.unlinkSync(generatedTsPath);
    }
  });

  test('saveAndValidateAll saves database, triggers codegen, and runs validation successfully', () => {
    // 1. Fetch initial monsters
    const initialDb = getDb();
    assert.ok(initialDb.monsters);
    assert.ok(initialDb.monsterGroups);

    // 2. Prepare payload adding a new test monster
    const newMonsterName = `TestMonster_${Date.now()}`;
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
          freeformCode: '// integration test dummy',
        },
      ],
    };

    // 3. Save database and run full validation
    console.log(`Saving database and validating for ${newMonsterName}...`);
    const result = saveAndValidateAll(updatedDb);

    assert.strictEqual(result.success, true);
    assert.ok(result.validations);
    assert.ok(result.validations[newMonsterName]);

    // Validate returned computed stats for our new monster
    const validation = result.validations[newMonsterName];
    assert.strictEqual(validation.success, true);
    assert.strictEqual(validation.computedStats.name, newMonsterName);
    assert.strictEqual(validation.computedStats.level, 1);

    // 4. Verify backend saved it by calling getDb() again
    const finalDb = getDb();
    const savedMonster = finalDb.monsters.find((m: any) => m.name === newMonsterName);
    assert.ok(savedMonster);
    assert.strictEqual(savedMonster.freeformCode, '// integration test dummy');

    // 5. Verify that the generated TypeScript file contains the new monster
    assert.ok(fs.existsSync(generatedTsPath));
    const generatedContent = fs.readFileSync(generatedTsPath, 'utf8');
    assert.ok(generatedContent.includes(`grimoire.addMonster('${newMonsterName}'`));
  });
});
