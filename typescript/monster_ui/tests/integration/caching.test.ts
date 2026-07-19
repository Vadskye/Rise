import '../setup-env';

import { test, describe, beforeAll, afterAll, expect } from 'vitest';
import * as fs from 'fs';
import { paths } from '../../server/db';
import { validateMonster } from '../../server/validate';
import { getCharacterSheet } from '@src/character_sheet/current_character_sheet';

describe('Monster UI Integration Tests - Caching', () => {
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
});
