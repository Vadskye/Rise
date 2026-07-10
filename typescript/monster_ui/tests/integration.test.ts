import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getDb, dbPath, saveAndValidateAll } from '../server/db';
import { validateMonster } from '../server/validate';
import { getCharacterSheet } from '@src/character_sheet/current_character_sheet';

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

  test('saveAndValidateAll saves database with structured fields and outputs correct codegen', () => {
    const initialDb = getDb();
    const newMonsterName = `StructMonster_${Date.now()}`;
    const updatedDb = {
      ...initialDb,
      monsters: [
        ...initialDb.monsters,
        {
          name: newMonsterName,
          requiredProperties: {
            alignment: 'lawful evil',
            base_class: 'warrior',
            elite: true,
            creature_origin: 'natural',
            creature_type: 'humanoid',
            size: 'medium',
            level: 5,
          },
          freeformCode: '// struct test dummy',
          baseAttributes: [2, 3, 1, -1, 0, -2] as [number, number, number, number, number, number],
          trainedSkills: ['stealth', 'jump'],
          knowledge: {
            easy: 'Easy text',
            normal: 'Normal text',
          },
          traits: ['quadrupedal'],
          customSenses: ['Darkvision (60 ft.)'],
          customMovementSpeeds: ['Fly 40 ft.'],
          immunities: ['Fire'],
          resistances: ['Cold'],
          vulnerabilities: ['Acid'],
          equippedArmor: 'breastplate',
          properties: {
            has_art: true,
          },
        },
      ],
    };

    const result = saveAndValidateAll(updatedDb);
    assert.strictEqual(result.success, true);
    
    const validation = result.validations[newMonsterName];
    assert.strictEqual(validation.success, true);
    
    const stats = validation.computedStats;
    assert.ok(stats);
    assert.strictEqual(stats.name, newMonsterName);
    assert.ok(stats.skills.includes('stealth'));
    assert.ok(stats.traits.includes('quadrupedal'));
    assert.ok(stats.equipment.includes('breastplate'));

    assert.ok(fs.existsSync(generatedTsPath));
    const generatedContent = fs.readFileSync(generatedTsPath, 'utf8');
    assert.ok(generatedContent.includes(`creature.setBaseAttributes([2,3,1,-1,0,-2])`));
    assert.ok(generatedContent.includes(`creature.setTrainedSkills(["stealth","jump"])`));
    assert.ok(generatedContent.includes(`"easy": "Easy text"`));
    assert.ok(generatedContent.includes(`creature.addTrait('quadrupedal')`));
    assert.ok(generatedContent.includes(`creature.addCustomSense('Darkvision (60 ft.)')`));
    assert.ok(generatedContent.includes(`creature.addCustomMovementSpeed('Fly 40 ft.')`));
    assert.ok(generatedContent.includes(`creature.addImmunity('Fire')`));
    assert.ok(generatedContent.includes(`creature.addResistant('Cold')`));
    assert.ok(generatedContent.includes(`creature.addVulnerability('Acid')`));
    assert.ok(generatedContent.includes(`creature.setEquippedArmorName({ bodyArmor: 'breastplate' })`));
    assert.ok(generatedContent.includes(`"has_art":true`));
  });

  test('saveAndValidateAll saves database with monster groups, triggers codegen, and runs validation successfully', () => {
    // 1. Fetch initial monsters
    const initialDb = getDb();
    assert.ok(initialDb.monsters);
    assert.ok(initialDb.monsterGroups);

    // 2. Prepare payload adding a new test group and group monster
    const testGroupName = `TestGroup_${Date.now()}`;
    const testGroupMonsterName = `TestGroupMonster_${Date.now()}`;
    const updatedDb = {
      ...initialDb,
      monsterGroups: [
        ...initialDb.monsterGroups,
        {
          name: testGroupName,
          hasArt: false,
          sharedFreeformCode: '// shared group code test',
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
              freeformCode: '// group monster specific test',
            },
          ],
        },
      ],
    };

    // 3. Save database and run full validation
    console.log(
      `Saving database and validating for group ${testGroupName} and monster ${testGroupMonsterName}...`,
    );
    const result = saveAndValidateAll(updatedDb);

    assert.strictEqual(result.success, true);
    assert.ok(result.validations);

    // Key format for group monsters is `${groupName}.${monsterName}`
    const validationKey = `${testGroupName}.${testGroupMonsterName}`;
    assert.ok(result.validations[validationKey]);

    // Validate returned computed stats for our new group monster
    const validation = result.validations[validationKey];
    assert.strictEqual(validation.success, true);
    assert.strictEqual(validation.computedStats.name, testGroupMonsterName);
    assert.strictEqual(validation.computedStats.level, 1);

    // 4. Verify backend saved it by calling getDb() again
    const finalDb = getDb();
    const savedGroup = finalDb.monsterGroups.find((g: any) => g.name === testGroupName);
    assert.ok(savedGroup);
    assert.strictEqual(savedGroup.sharedFreeformCode, '// shared group code test');
    const savedMonster = savedGroup.monsters.find((m: any) => m.name === testGroupMonsterName);
    assert.ok(savedMonster);
    assert.strictEqual(savedMonster.freeformCode, '// group monster specific test');

    // 5. Verify that the generated TypeScript file contains the new monster group
    assert.ok(fs.existsSync(generatedTsPath));
    const generatedContent = fs.readFileSync(generatedTsPath, 'utf8');
    assert.ok(generatedContent.includes(`name: '${testGroupName}'`));
    assert.ok(generatedContent.includes(`'${testGroupMonsterName}'`));
  });

  test('validateMonster caches character sheets and reuse them on unchanged stats, invalidating them on changes', () => {
    const monsterName = `CacheTestMonster_${Date.now()}`;
    const monsterData1 = {
      name: monsterName,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 1,
      },
      freeformCode: '// cache test 1',
    };

    // First validation - should create sheet
    const result1 = validateMonster(monsterData1);
    assert.strictEqual(result1.success, true);
    const sheet1 = getCharacterSheet(monsterName);
    assert.ok(sheet1);

    // Second validation with identical stats - should hit cache and reuse sheet instance
    const result2 = validateMonster(monsterData1);
    assert.strictEqual(result2.success, true);
    const sheet2 = getCharacterSheet(monsterName);
    assert.strictEqual(sheet1, sheet2); // Assert exact object reference identity!

    // Third validation with modified stats - should invalidate cache and recreate sheet
    const monsterData2 = {
      ...monsterData1,
      requiredProperties: {
        ...monsterData1.requiredProperties,
        level: 2, // change level
      },
    };
    const result3 = validateMonster(monsterData2);
    assert.strictEqual(result3.success, true);
    const sheet3 = getCharacterSheet(monsterName);
    assert.ok(sheet3);
    assert.notStrictEqual(sheet1, sheet3); // Assert sheet was recreated!
  });
});
