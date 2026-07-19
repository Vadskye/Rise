import '../setup-env';

import { test, describe, beforeAll, afterAll, expect } from 'vitest';
import * as fs from 'fs';
import { getDb, paths, saveAndValidateAll } from '../../server/db';
import { generatePreview } from '../../server/preview';

describe('Monster UI Integration Tests - Monster Groups', () => {
  beforeAll(() => {
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
    expect(
      preview1.computedStats!.activeAbilities.some((a: any) => a.name === 'Word of Power'),
    ).toBe(true);

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
    expect(generatedContent).toContain(
      `creature.setEquippedArmorName({ bodyArmor: 'breastplate' })`,
    );
  });
});
