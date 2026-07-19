import '../setup-env';

import { test, describe, beforeAll, afterAll, expect } from 'vitest';
import * as fs from 'fs';
import { getDb, paths, saveAndValidateAll } from '../../server/db';
import { generatePreview } from '../../server/preview';

describe('Monster UI Integration Tests - Structured Fields', () => {
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
    expect(generatedContent).toContain('easy: `Easy text`');
    expect(generatedContent).toContain(`creature.addTrait('quadrupedal')`);
    expect(generatedContent).toContain(`creature.addCustomSense('Darkvision (60 ft.)')`);
    expect(generatedContent).toContain(
      `creature.addCustomMovementSpeed('Fly (average, 40 ft. limit)')`,
    );
    expect(generatedContent).toContain(`creature.addImmunity('Fire')`);
    expect(generatedContent).toContain(`creature.addResistant('Cold')`);
    expect(generatedContent).toContain(`creature.addVulnerability('Acid')`);
    expect(generatedContent).toContain(
      `creature.setEquippedArmorName({ bodyArmor: 'breastplate', shield: 'standard shield' })`,
    );
    expect(generatedContent).toContain(`has_art: true`);
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
});
