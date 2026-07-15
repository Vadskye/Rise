import './setup-env';

import { test, describe, beforeAll, afterAll, expect } from 'vitest';
import * as fs from 'fs';
import { getDb, paths, saveAndValidateAll } from '../server/db';
import { validateMonster } from '../server/validate';
import { generatePreview } from '../server/preview';
import { getCharacterSheet } from '@src/character_sheet/current_character_sheet';

describe('Monster UI Integration Tests (Serverless)', () => {
  beforeAll(() => {
    // setup-env.ts already configured isolated temp-file paths before this module loaded.
    // No copy needed — getDb() creates an empty database if none exists.
    console.log('Test database paths configured. Starting tests...');
  });

  afterAll(() => {
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
    expect(initialDb.monsters).toBeDefined();
    expect(initialDb.monsterGroups).toBeDefined();

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
            creature_types: ['beast'],
            size: 'medium',
            level: 1,
          },
          weapons: [
            {
              name: 'fists',
            },
          ],
          freeformCode: '// integration test dummy',
        },
      ],
    };

    // 3. Save database and run full validation
    console.log(`Saving database and validating for ${newMonsterName}...`);
    const result = saveAndValidateAll(updatedDb);

    expect(result.success).toBe(true);
    expect(result.validations).toBeDefined();
    expect(result.validations[newMonsterName]).toBeDefined();

    // Validate returned computed stats for our new monster
    const validation = result.validations[newMonsterName];
    expect(validation.success).toBe(true);

    const previewResult = generatePreview(updatedDb.monsters[updatedDb.monsters.length - 1]);
    expect(previewResult.success).toBe(true);
    expect(previewResult.computedStats).toBeDefined();
    expect(previewResult.computedStats!.name).toBe(newMonsterName);
    expect(previewResult.computedStats!.level).toBe(1);

    // 4. Verify backend saved it by calling getDb() again
    const finalDb = getDb();
    const savedMonster = finalDb.monsters.find((m: any) => m.name === newMonsterName);
    expect(savedMonster).toBeDefined();
    expect(savedMonster!.freeformCode).toBe('// integration test dummy');

    // 5. Verify that the generated TypeScript file contains the new monster
    expect(fs.existsSync(paths.generatedTsPath)).toBe(true);
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    expect(generatedContent).toContain(`grimoire.addMonster('${newMonsterName}'`);
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
            creature_types: ['humanoid'],
            size: 'medium',
            level: 5,
          },
          freeformCode: '// struct test dummy',
          weapons: [
            {
              name: 'fists',
            },
          ],
          baseAttributes: [2, 3, 1, -1, 0, -2] as [number, number, number, number, number, number],
          trainedSkills: ['stealth', 'jump'],
          knowledge: {
            easy: 'Easy text',
            normal: 'Normal text',
          },
          traits: ['quadrupedal'],
          customSenses: [{ type: 'Darkvision', range: 60 }],
          customMovementSpeeds: [
            { mode: 'Fly', category: 'average', limitType: 'limit', limitValue: 40 },
          ],
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
    expect(result.success).toBe(true);

    const validation = result.validations[newMonsterName];
    expect(validation.success).toBe(true);

    const previewResult = generatePreview(updatedDb.monsters[updatedDb.monsters.length - 1]);
    expect(previewResult.success).toBe(true);
    const stats = previewResult.computedStats;
    expect(stats).toBeDefined();
    expect(stats!.name).toBe(newMonsterName);
    expect(stats!.skills).toContain('stealth');
    expect(stats!.traits).toContain('quadrupedal');
    expect(stats!.equipment).toContain('breastplate');
    expect(stats!.equipment).toContain('standard shield');

    expect(fs.existsSync(paths.generatedTsPath)).toBe(true);
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    expect(generatedContent).toContain(`creature.setBaseAttributes([2, 3, 1, -1, 0, -2])`);
    expect(generatedContent).toContain(`creature.setTrainedSkills(['stealth', 'jump'])`);
    expect(generatedContent).toContain(`easy: 'Easy text'`);
    expect(generatedContent).toContain(`creature.addTrait('quadrupedal')`);
    expect(generatedContent).toContain(`creature.addCustomSense('Darkvision (60 ft.)')`);
    expect(generatedContent).toContain(`creature.addCustomMovementSpeed('Fly (average, 40 ft. limit)')`);
    expect(generatedContent).toContain(`creature.addImmunity('Fire')`);
    expect(generatedContent).toContain(`creature.addResistant('Cold')`);
    expect(generatedContent).toContain(`creature.addVulnerability('Acid')`);
    expect(generatedContent).toContain(
      `creature.setEquippedArmorName({ bodyArmor: 'breastplate', shield: 'standard shield' })`,
    );
    expect(generatedContent).toContain(`has_art: true`);
  });

  test('saveAndValidateAll saves database with monster groups, triggers codegen, and runs validation successfully', () => {
    // 1. Fetch initial monsters
    const initialDb = getDb();
    expect(initialDb.monsters).toBeDefined();
    expect(initialDb.monsterGroups).toBeDefined();

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
                creature_types: ['beast'],
                size: 'medium',
                level: 1,
              },
              weapons: [
                {
                  name: 'fists',
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

    expect(result.success).toBe(true);
    expect(result.validations).toBeDefined();

    // Key format for group monsters is `${groupName}.${monsterName}`
    const validationKey = `${testGroupName}.${testGroupMonsterName}`;
    expect(result.validations[validationKey]).toBeDefined();

    // Validate returned computed stats for our new group monster
    const validation = result.validations[validationKey];
    expect(validation.success).toBe(true);

    const targetGroup = updatedDb.monsterGroups[updatedDb.monsterGroups.length - 1];
    const targetMonster = targetGroup.monsters[0];
    const previewResult = generatePreview(
      targetMonster,
      targetGroup.sharedFreeformCode,
      targetGroup.name,
    );
    expect(previewResult.success).toBe(true);
    expect(previewResult.computedStats).toBeDefined();
    expect(previewResult.computedStats!.name).toBe(testGroupMonsterName);
    expect(previewResult.computedStats!.level).toBe(1);

    // 4. Verify backend saved it by calling getDb() again
    const finalDb = getDb();
    const savedGroup = finalDb.monsterGroups.find((g: any) => g.name === testGroupName);
    expect(savedGroup).toBeDefined();
    expect(savedGroup!.sharedFreeformCode).toBe('// shared group code test');
    const savedMonster = savedGroup.monsters.find((m: any) => m.name === testGroupMonsterName);
    expect(savedMonster).toBeDefined();
    expect(savedMonster!.freeformCode).toBe('// group monster specific test');

    // 5. Verify that the generated TypeScript file contains the new monster group
    expect(fs.existsSync(paths.generatedTsPath)).toBe(true);
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    expect(generatedContent).toContain(`name: '${testGroupName}'`);
    expect(generatedContent).toContain(`'${testGroupMonsterName}'`);
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
        creature_types: ['beast'],
        size: 'medium',
        level: 1,
      },
      freeformCode: '// cache test 1',
      weapons: [
        {
          name: 'fists',
        },
      ],
    };

    // First validation - should create sheet
    const result1 = validateMonster(monsterData1);
    expect(result1.success).toBe(true);
    const sheet1 = getCharacterSheet(monsterName);
    expect(sheet1).toBeDefined();

    // Second validation with identical stats - should hit cache and reuse sheet instance
    const result2 = validateMonster(monsterData1);
    expect(result2.success).toBe(true);
    const sheet2 = getCharacterSheet(monsterName);
    expect(sheet1).toBe(sheet2); // Assert exact object reference identity!

    // Third validation with modified stats - should invalidate cache and recreate sheet
    const monsterData2 = {
      ...monsterData1,
      requiredProperties: {
        ...monsterData1.requiredProperties,
        level: 2, // change level
      },
    };
    const result3 = validateMonster(monsterData2);
    expect(result3.success).toBe(true);
    const sheet3 = getCharacterSheet(monsterName);
    expect(sheet3).toBeDefined();
    expect(sheet1).not.toBe(sheet3); // Assert sheet was recreated!
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
        creature_types: ['beast'],
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
        {
          type: 'maneuver' as const,
          name: 'Weapon Multiplier',
          options: { weapon: 'claws', displayName: 'Vicious Claws' },
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

    expect(result.success).toBe(true);
    const validation = result.validations[testMonsterName];
    expect(validation.success).toBe(true);

    // Assert computed stats serialization contains our fields
    const previewResult = generatePreview(complexMonster);
    expect(previewResult.success).toBe(true);
    expect(previewResult.computedStats).toBeDefined();
    expect(
      previewResult.computedStats!.activeAbilities.some((a: any) => a.name === 'Echoing Word'),
    ).toBe(true);
    expect(
      previewResult.computedStats!.activeAbilities.some((a: any) => a.name === 'Double Slash'),
    ).toBe(true);
    expect(
      previewResult.computedStats!.passiveAbilities.some((p: any) => p.name === 'Regeneration'),
    ).toBe(true);

    // Assert codegen outputs the correct builder methods
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    expect(generatedContent).toContain(
      `creature.addSpell('Word of Power', { displayName: 'Echoing Word', isMagical: true })`,
    );
    expect(generatedContent).toContain(`creature.addCustomManeuver(`);
    expect(generatedContent).toContain(`creature.addPassiveAbility(`);
    expect(generatedContent).toContain(`creature.addWeapon('claws')`);
    expect(generatedContent).toContain(
      `creature.addWeaponMult('claws', { displayName: 'Vicious Claws' })`,
    );
    expect(generatedContent).toContain(`creature.addRituals(['Creation', 'Universal'])`);
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
          traits: ['amphibious'],
          customSenses: [{ type: 'Darkvision', range: 90 }],
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
                creature_types: ['beast'],
                size: 'medium',
                level: 1,
              },
              weapons: [
                {
                  name: 'fists',
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
                creature_types: ['beast'],
                size: 'medium',
                level: 1,
              },
              weapons: [
                {
                  name: 'fists',
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

    expect(result.success).toBe(true);
    expect(result.validations[`${testGroupName}.${m1Name}`].success).toBe(true);
    expect(result.validations[`${testGroupName}.${m2Name}`].success).toBe(true);

    // Verify preview logic applies group fields
    const group = updatedDb.monsterGroups[updatedDb.monsterGroups.length - 1];
    const preview1 = generatePreview(group.monsters[0], group, group.name);
    expect(preview1.success).toBe(true);
    expect(preview1.computedStats).toBeDefined();
    expect(preview1.computedStats!.traits).toContain('amphibious');
    expect(
      preview1.computedStats!.sensesComponents.some((s: string) =>
        s.includes('Darkvision (90 ft.)'),
      ),
    ).toBe(true);
    expect(preview1.computedStats!.equipment).toContain('scale');
    expect(preview1.computedStats!.activeAbilities.some((a: any) => a.name === 'Word of Power')).toBe(true);

    // Verify preview logic applies monster overrides
    const preview2 = generatePreview(group.monsters[1], group, group.name);
    expect(preview2.success).toBe(true);
    expect(preview2.computedStats).toBeDefined();
    expect(preview2.computedStats!.traits).toContain('amphibious');
    expect(preview2.computedStats!.equipment).toContain('breastplate');
    expect(preview2.computedStats!.equipment).not.toContain('scale');

    // Verify codegen output
    const generatedContent = fs.readFileSync(paths.generatedTsPath, 'utf8');
    expect(generatedContent).toContain(`creature.addTrait('amphibious')`);
    expect(generatedContent).toContain(`creature.addCustomSense('Darkvision (90 ft.)')`);
    expect(generatedContent).toContain(`creature.addSpell('Word of Power', { isMagical: true })`);
    expect(generatedContent).toContain(`creature.setEquippedArmorName({ bodyArmor: 'scale' })`);
    expect(generatedContent).toContain(`creature.setEquippedArmorName({ bodyArmor: 'breastplate' })`);
  });
});
