import t from 'tap';
import { validateSpellScaling } from './validate_spells';
import { MysticSphere, allMysticSpheres } from './mystic_spheres';

t.test('validateSpellScaling', (t) => {
  t.test('unit tests on mock spheres', (t) => {
    t.test('flags missing damage scaling on damaging spells', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Pyromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Unscaled Firebolt',
            rank: 1,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankone.',
              targeting: 'Make an attack vs. Armor against one creature.',
            },
          },
        ],
      };

      const issues = validateSpellScaling([mockSphere]);
      t.equal(issues.length, 1);
      t.equal(issues[0].type, 'missing_damage_scaling');
      t.equal(issues[0].spellName, 'Unscaled Firebolt');
      t.equal(issues[0].expectedScaling, 'damage');
      t.end();
    });

    t.test('flags missing damage scaling on functionsLike spells with damage overrides', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Pyromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Mighty Blast',
            rank: 5,
            roles: ['burst'],
            functionsLike: {
              name: 'firebolt',
              exceptThat: 'the damage increases to \\damageranksix.',
            },
          },
        ],
      };

      const issues = validateSpellScaling([mockSphere]);
      t.equal(issues.length, 1);
      t.equal(issues[0].type, 'missing_damage_scaling');
      t.equal(issues[0].spellName, 'Mighty Blast');
      t.end();
    });

    t.test('accepts damaging spell with scaling: damage', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Pyromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Firebolt',
            rank: 1,
            roles: ['burst'],
            scaling: 'damage',
            attack: {
              hit: '\\damagerankone.',
              targeting: 'Make an attack vs. Armor against one creature.',
            },
          },
        ],
      };

      const issues = validateSpellScaling([mockSphere]);
      t.equal(issues.length, 0);
      t.end();
    });

    t.test('flags inconsistent scaling when a damaging spell has accuracy scaling', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Pyromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Miscalibrated Firebolt',
            rank: 1,
            roles: ['burst'],
            scaling: 'accuracy',
            attack: {
              hit: '\\damagerankone.',
              targeting: 'Make an attack vs. Armor against one creature.',
            },
          },
        ],
      };

      const issues = validateSpellScaling([mockSphere]);
      t.equal(issues.length, 1);
      t.equal(issues[0].type, 'inconsistent_scaling');
      t.equal(issues[0].spellName, 'Miscalibrated Firebolt');
      t.end();
    });

    t.test('flags missing healing scaling on healing spells', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Vivimancy',
        shortDescription: 'Test',
        sources: ['divine'],
        spells: [
          {
            name: 'Unscaled Heal',
            rank: 2,
            roles: ['healing'],
            effect: 'The target regains \\hpranktwo hit points.',
          },
        ],
      };

      const issues = validateSpellScaling([mockSphere]);
      t.equal(issues.length, 1);
      t.equal(issues[0].type, 'missing_healing_scaling');
      t.equal(issues[0].spellName, 'Unscaled Heal');
      t.end();
    });

    t.test('flags missing accuracy scaling on non-damaging attack spells', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Enchantment',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Unscaled Charm',
            rank: 2,
            roles: ['softener'],
            attack: {
              hit: 'The target is charmed.',
              targeting: 'Make an attack vs. Mental against one creature.',
            },
          },
        ],
      };

      const issues = validateSpellScaling([mockSphere]);
      t.equal(issues.length, 1);
      t.equal(issues[0].type, 'missing_accuracy_scaling');
      t.equal(issues[0].spellName, 'Unscaled Charm');
      t.end();
    });

    t.test('does not flag utility spells without attacks or damage', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Fabrication',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Iron Wall',
            rank: 2,
            roles: ['barrier'],
            effect: 'A non-damaging iron wall appears.',
          },
        ],
      };

      const issues = validateSpellScaling([mockSphere]);
      t.equal(issues.length, 0);
      t.end();
    });

    t.test('does not flag rank 7 spells missing scaling (rank 7 spells do not scale)', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Pyromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Ultimate Fireball',
            rank: 7,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankseven.',
              targeting: 'Make an attack vs. Armor against one creature.',
            },
          },
        ],
      };

      const issues = validateSpellScaling([mockSphere]);
      t.equal(issues.length, 0);
      t.end();
    });

    t.end();
  });

  t.test('all live mystic spheres have valid scaling with 0 issues', (t) => {
    const issues = validateSpellScaling(allMysticSpheres);
    t.equal(
      issues.length,
      0,
      `Expected 0 scaling issues, but found: ${JSON.stringify(issues, null, 2)}`,
    );
    t.end();
  });

  t.end();
});
