import '../setup-env';

import { test, describe, beforeAll, afterAll, expect } from 'vitest';
import * as fs from 'fs';
import { getDb, paths, saveAndValidateAll } from '../../server/db';
import { generatePreview } from '../../server/preview';

describe('Monster UI Integration Tests - Save and Validate', () => {
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
          id: 'test_monster_save_and_validate',
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
});
