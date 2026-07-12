import './setup-env';

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import { getDb, paths, saveAndValidateAll } from '../server/db';
import { validateMonster } from '../server/validate';
import { generatePreview } from '../server/preview';
import { getCharacterSheet } from '@src/character_sheet/current_character_sheet';

describe('Monster UI Integration Tests (Serverless)', () => {
  before(() => {
    // setup-env.ts already configured isolated temp-file paths before this module loaded.
    // No copy needed — getDb() creates an empty database if none exists.
    console.log('Test database paths configured. Starting tests...');
  });

  after(() => {
    console.log('Cleaning up test database and generated source files...');
    if (fs.existsSync(paths.dbPath)) {
      fs.unlinkSync(paths.dbPath);
    }
    if (fs.existsSync(paths.generatedTsPath)) {
      fs.unlinkSync(paths.generatedTsPath);
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
          weapons: [
            {
              name: 'fists',
              addStandard: true,
            },
          ],
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

    const previewResult = generatePreview(updatedDb.monsters[updatedDb.monsters.length - 1]);
    assert.strictEqual(previewResult.success, true);
    assert.ok(previewResult.computedStats);
    assert.strictEqual(previewResult.computedStats.name, newMonsterName);
    assert.strictEqual(previewResult.computedStats.level, 1);

    // 4. Verify backend saved it by calling getDb() again
    const finalDb = getDb();
    const savedMonster = finalDb.monsters.find((m: any) => m.name === newMonsterName);
    assert.ok(savedMonster);
    assert.strictEqual(savedMonster.freeformCode, '// integration test dummy');

    // 5. Verify that the generated TypeScript file contains the new monster
    assert.ok(fs.existsSync(paths.generatedTsPath));
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
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
          weapons: [
            {
              name: 'fists',
              addStandard: true,
            },
          ],
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
          equippedShield: 'standard shield',
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

    const previewResult = generatePreview(updatedDb.monsters[updatedDb.monsters.length - 1]);
    assert.strictEqual(previewResult.success, true);
    const stats = previewResult.computedStats;
    assert.ok(stats);
    assert.strictEqual(stats.name, newMonsterName);
    assert.ok(stats.skills.includes('stealth'));
    assert.ok(stats.traits.includes('quadrupedal'));
    assert.ok(stats.equipment.includes('breastplate'));
    assert.ok(stats.equipment.includes('standard shield'));

    assert.ok(fs.existsSync(paths.generatedTsPath));
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    assert.ok(generatedContent.includes(`creature.setBaseAttributes([2,3,1,-1,0,-2])`));
    assert.ok(generatedContent.includes(`creature.setTrainedSkills(["stealth","jump"])`));
    assert.ok(generatedContent.includes(`"easy": "Easy text"`));
    assert.ok(generatedContent.includes(`creature.addTrait("quadrupedal")`));
    assert.ok(generatedContent.includes(`creature.addCustomSense("Darkvision (60 ft.)")`));
    assert.ok(generatedContent.includes(`creature.addCustomMovementSpeed("Fly 40 ft.")`));
    assert.ok(generatedContent.includes(`creature.addImmunity("Fire")`));
    assert.ok(generatedContent.includes(`creature.addResistant("Cold")`));
    assert.ok(generatedContent.includes(`creature.addVulnerability("Acid")`));
    assert.ok(
      generatedContent.includes(
        `creature.setEquippedArmorName({ bodyArmor: "breastplate", shield: "standard shield" })`,
      ),
    );
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
              weapons: [
                {
                  name: 'fists',
                  addStandard: true,
                },
              ],
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

    const targetGroup = updatedDb.monsterGroups[updatedDb.monsterGroups.length - 1];
    const targetMonster = targetGroup.monsters[0];
    const previewResult = generatePreview(
      targetMonster,
      targetGroup.sharedFreeformCode,
      targetGroup.name,
    );
    assert.strictEqual(previewResult.success, true);
    assert.ok(previewResult.computedStats);
    assert.strictEqual(previewResult.computedStats.name, testGroupMonsterName);
    assert.strictEqual(previewResult.computedStats.level, 1);

    // 4. Verify backend saved it by calling getDb() again
    const finalDb = getDb();
    const savedGroup = finalDb.monsterGroups.find((g: any) => g.name === testGroupName);
    assert.ok(savedGroup);
    assert.strictEqual(savedGroup.sharedFreeformCode, '// shared group code test');
    const savedMonster = savedGroup.monsters.find((m: any) => m.name === testGroupMonsterName);
    assert.ok(savedMonster);
    assert.strictEqual(savedMonster.freeformCode, '// group monster specific test');

    // 5. Verify that the generated TypeScript file contains the new monster group
    assert.ok(fs.existsSync(paths.generatedTsPath));
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
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
      weapons: [
        {
          name: 'fists',
          addStandard: true,
        },
      ],
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

  test('saveAndValidateAll generates code and computes stats for structured complex entities (spells, custom abilities, passives, weapons, rituals)', () => {
    const testMonsterName = `ComplexStructMonster_${Date.now()}`;
    const initialDb = getDb();

    const complexMonster = {
      name: testMonsterName,
      requiredProperties: {
        alignment: 'neutral',
        base_class: 'warrior',
        elite: false,
        creature_origin: 'natural',
        creature_type: 'beast',
        size: 'medium',
        level: 3,
      },
      freeformCode: '// freeform code block',
      standardAbilities: [
        {
          type: 'spell' as const,
          name: 'Word of Power',
          options: { displayName: 'Echoing Word', isMagical: true },
        },
      ],
      customAbilities: [
        {
          type: 'maneuver' as const,
          name: 'Double Slash',
          usageTime: 'Standard',
          cost: '1 Stamina',
          effect: 'Deal double slash damage.',
          isMagical: false,
          attack: {
            targeting: 'Reflex Defense',
            hit: 'Target takes damage.',
          },
        },
      ],
      passiveAbilities: [
        {
          name: 'Regeneration',
          effect: 'Heals 5 HP per round.',
          isMagical: true,
        },
      ],
      weapons: [
        {
          name: 'claws',
          addStandard: true,
          addMult: true,
          options: { displayName: 'Vicious Claws' },
        },
      ],
      rituals: ['Creation', 'Universal'],
    };

    const updatedDb = {
      ...initialDb,
      monsters: [...initialDb.monsters, complexMonster],
    };

    console.log(`Saving database and validating complex structured monster ${testMonsterName}...`);
    const result = saveAndValidateAll(updatedDb);

    assert.strictEqual(result.success, true);
    const validation = result.validations[testMonsterName];
    assert.strictEqual(validation.success, true);

    // Assert computed stats serialization contains our fields
    const previewResult = generatePreview(complexMonster);
    assert.strictEqual(previewResult.success, true);
    assert.ok(previewResult.computedStats);
    assert.ok(
      previewResult.computedStats.activeAbilities.some((a: any) => a.name === 'Echoing Word'),
    );
    assert.ok(
      previewResult.computedStats.activeAbilities.some((a: any) => a.name === 'Double Slash'),
    );
    assert.ok(
      previewResult.computedStats.passiveAbilities.some((p: any) => p.name === 'Regeneration'),
    );

    // Assert codegen outputs the correct builder methods
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    assert.ok(
      generatedContent.includes(
        `creature.addSpell("Word of Power", {"displayName":"Echoing Word","isMagical":true})`,
      ),
    );
    assert.ok(generatedContent.includes(`creature.addCustomManeuver(`));
    assert.ok(generatedContent.includes(`creature.addPassiveAbility(`));
    assert.ok(generatedContent.includes(`creature.addWeapon("claws")`));
    assert.ok(
      generatedContent.includes(`creature.addWeaponMult("claws", {"displayName":"Vicious Claws"})`),
    );
    assert.ok(generatedContent.includes(`creature.addRituals(["Creation","Universal"])`));
  });

  test('saveAndValidateAll handles group shared structured properties and monster overrides', () => {
    const initialDb = getDb();
    const testGroupName = `OverrideGroup_${Date.now()}`;
    const m1Name = `MemberOne_${Date.now()}`;
    const m2Name = `MemberTwo_${Date.now()}`;

    const updatedDb = {
      ...initialDb,
      monsterGroups: [
        ...initialDb.monsterGroups,
        {
          name: testGroupName,
          hasArt: false,
          sharedFreeformCode: '// group shared code',
          traits: ['ensouled'],
          customSenses: ['Darkvision (90 ft.)'],
          equippedArmor: 'scale',
          standardAbilities: [
            {
              type: 'spell' as const,
              name: 'Word of Power',
              options: { isMagical: true },
            },
          ],
          monsters: [
            {
              name: m1Name,
              requiredProperties: {
                alignment: 'neutral',
                base_class: 'warrior',
                elite: false,
                creature_origin: 'natural',
                creature_type: 'beast',
                size: 'medium',
                level: 1,
              },
              weapons: [
                {
                  name: 'fists',
                  addStandard: true,
                },
              ],
              freeformCode: '// member one specific',
            },
            {
              name: m2Name,
              requiredProperties: {
                alignment: 'neutral',
                base_class: 'warrior',
                elite: false,
                creature_origin: 'natural',
                creature_type: 'beast',
                size: 'medium',
                level: 1,
              },
              weapons: [
                {
                  name: 'fists',
                  addStandard: true,
                },
              ],
              equippedArmor: 'breastplate', // override!
              freeformCode: '// member two specific',
            },
          ],
        },
      ],
    };

    console.log(`Saving database and validating override group ${testGroupName}...`);
    const result = saveAndValidateAll(updatedDb);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.validations[`${testGroupName}.${m1Name}`].success, true);
    assert.strictEqual(result.validations[`${testGroupName}.${m2Name}`].success, true);

    // Verify preview logic applies group fields
    const group = updatedDb.monsterGroups[updatedDb.monsterGroups.length - 1];
    const preview1 = generatePreview(group.monsters[0], group, group.name);
    assert.strictEqual(preview1.success, true);
    assert.ok(preview1.computedStats);
    assert.ok(preview1.computedStats.traits.includes('ensouled'));
    assert.ok(
      preview1.computedStats.sensesComponents.some((s: string) =>
        s.includes('Darkvision (90 ft.)'),
      ),
    );
    assert.ok(preview1.computedStats.equipment.includes('scale'));
    assert.ok(preview1.computedStats.activeAbilities.some((a: any) => a.name === 'Word of Power'));

    // Verify preview logic applies monster overrides
    const preview2 = generatePreview(group.monsters[1], group, group.name);
    assert.strictEqual(preview2.success, true);
    assert.ok(preview2.computedStats);
    assert.ok(preview2.computedStats.traits.includes('ensouled'));
    assert.ok(preview2.computedStats.equipment.includes('breastplate'));
    assert.ok(!preview2.computedStats.equipment.includes('scale'));

    // Verify codegen output
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    assert.ok(generatedContent.includes(`creature.addTrait("ensouled")`));
    assert.ok(generatedContent.includes(`creature.addCustomSense("Darkvision (90 ft.)")`));
    assert.ok(generatedContent.includes(`creature.addSpell("Word of Power", {"isMagical":true})`));
    assert.ok(generatedContent.includes(`creature.setEquippedArmorName({ bodyArmor: "scale" })`));
    assert.ok(
      generatedContent.includes(`creature.setEquippedArmorName({ bodyArmor: "breastplate" })`),
    );
  });
});
