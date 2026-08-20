import t from 'tap';
import { buildSpellProfile, parseMaxTargets } from './spell_profile';
import { SpellDefinition } from './active_abilities';

t.test('buildSpellProfile', (t) => {
  t.test('should parse double action, defense, range, area, conditions, damage, and cost', (t) => {
    const mockSpell: SpellDefinition = {
      name: 'Test Spell',
      rank: 2,
      roles: ['burst', 'maim'],
      cost: 'One ice crystal.',
      attack: {
        hit: '\\damagerankfive, and the target is \\slowed.',
        targeting:
          'During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against something within \\shortrange.',
      },
    };

    const profile = buildSpellProfile(mockSpell, 'Cryomancy');
    t.equal(profile.name, 'Test Spell');
    t.equal(profile.sphereName, 'Cryomancy');
    t.equal(profile.rank, 2);
    t.equal(profile.isDoubleAction, true);
    t.equal(profile.isNonAction, false);
    t.equal(profile.range, 'short');
    t.same(profile.defenses, ['fortitude']);
    t.equal(profile.area, 'single');
    t.equal(profile.areaSize, 'none');
    t.equal(profile.maxDamageRank, 5);
    t.equal(profile.unconditionalDamageRank, 5);
    t.equal(profile.isLowPower, false);
    t.same(profile.appliedEffects, ['slowed']);
    t.equal(profile.accuracyModifier, 0);
    t.same(profile.specialRequirements, []);
    t.equal(profile.isDelayed, true);
    t.equal(profile.hasCost, true);
    t.same(profile.roles, ['burst', 'maim']);
    t.equal(profile.healingRank, null);
    t.equal(profile.areaGrows, false);
    t.end();
  });

  t.test(
    'should parse isNonAction correctly for standard, reactive, and minor action spells',
    (t) => {
      const standardSpell: SpellDefinition = {
        name: 'Standard Attack',
        rank: 1,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankone.',
          targeting: 'Make an attack vs. Armor against something within \\shortrange.',
        },
      };
      const reactiveSpell: SpellDefinition = {
        name: 'Reactive Attack',
        rank: 1,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankone.',
          targeting: 'Make a reactive attack vs. Armor against something that moves.',
        },
      };
      const minorActionSpell: SpellDefinition = {
        name: 'Minor Action Attack',
        rank: 1,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankone.',
          targeting: 'As a \\glossterm{minor action}, you can make an attack vs. Armor.',
        },
      };

      t.equal(buildSpellProfile(standardSpell, 'Cryomancy').isNonAction, false);
      t.equal(buildSpellProfile(reactiveSpell, 'Cryomancy').isNonAction, true);
      t.equal(buildSpellProfile(minorActionSpell, 'Cryomancy').isNonAction, true);
      t.end();
    },
  );

  t.test('should resolve functionsLike spells recursively and set hasAttack accurately', (t) => {
    // Utility / non-attack spells
    const fabricateTrinket = buildSpellProfile(
      {
        name: 'Greater Fabricate Trinket',
        rank: 4,
        roles: ['narrative'],
        functionsLike: {
          name: 'fabricate trinket',
          exceptThat: 'the maximum size of the object increases to Small.',
        },
      },
      'Fabrication',
    );
    t.equal(
      fabricateTrinket.hasAttack,
      false,
      'Non-attack functionsLike spell should have hasAttack = false',
    );

    const restorativeWater = buildSpellProfile(
      {
        name: 'Greater Restorative Water',
        rank: 4,
        roles: ['healing'],
        functionsLike: {
          name: 'restorative water',
          exceptThat: 'the healing increases to 7d8.',
        },
      },
      'Aquamancy',
    );
    t.equal(
      restorativeWater.hasAttack,
      false,
      'Greater Restorative Water should have hasAttack = false',
    );

    // Attack spell with functionsLike
    const mightyElectrocute = buildSpellProfile(
      {
        name: 'Mighty Electrocute',
        rank: 7,
        roles: ['burst'],
        functionsLike: {
          name: 'electrocute',
          exceptThat: 'the damage increases to \\damageranknine.',
        },
      },
      'Electromancy',
    );
    t.equal(
      mightyElectrocute.hasAttack,
      true,
      'Attack functionsLike spell should have hasAttack = true',
    );
    t.equal(
      mightyElectrocute.maxDamageRank,
      9,
      'Max damage rank should be updated from exceptThat',
    );
    t.equal(
      mightyElectrocute.unconditionalDamageRank,
      9,
      'Unconditional damage rank should be updated from exceptThat',
    );
    t.same(mightyElectrocute.defenses, ['fortitude'], 'Defenses should be inherited from base');
    t.equal(mightyElectrocute.range, 'medium', 'Range should be inherited from base');

    t.end();
  });

  t.test('should parse unconditionalDamageRank, maxDamageRank, and hasDoT accurately', (t) => {
    // Unconditional burst attack
    const fleshspike = buildSpellProfile(
      {
        name: 'Fleshspike',
        rank: 1,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankthree.',
          targeting: 'Make an attack vs. Armor against an adjacent creature.',
        },
      },
      'Polymorph',
    );
    t.equal(fleshspike.unconditionalDamageRank, 3);
    t.equal(fleshspike.maxDamageRank, 3);
    t.equal(fleshspike.hasDoT, false);

    // Conditional injury execute attack
    const bleed = buildSpellProfile(
      {
        name: 'Bleed',
        rank: 1,
        roles: ['burn', 'execute'],
        attack: {
          hit: '\\damagerankone.',
          injury: 'The target \\briefly \\debuff{bleeds} for \\damagerankone.',
          targeting: 'Make an attack vs. Fortitude against one creature within \\shortrange.',
        },
      },
      'Polymorph',
    );
    t.equal(bleed.unconditionalDamageRank, 1);
    t.equal(bleed.maxDamageRank, 3);
    t.equal(bleed.hasDoT, true);
    t.same(bleed.appliedEffects, []);

    // Split hit + DoT attack
    const causticGrasp = buildSpellProfile(
      {
        name: 'Caustic Grasp',
        rank: 1,
        roles: ['burn'],
        attack: {
          hit: '\\damagerankone. The target also \\briefly \\debuff{corrodes} for \\damagerankone.',
          targeting: 'Make an attack vs. Fortitude against something you touch.',
        },
      },
      'Toxicology',
    );
    t.equal(causticGrasp.unconditionalDamageRank, 3);
    t.equal(causticGrasp.maxDamageRank, 3);
    t.equal(causticGrasp.hasDoT, true);
    t.same(causticGrasp.appliedEffects, []);

    t.end();
  });

  t.end();
});

t.test('parseMaxTargets', (t) => {
  const testCases = [
    // Standard single target
    { input: 'Make an attack vs. Fortitude against one creature within range.', expected: 1 },
    { input: 'Make an attack against a creature.', expected: 1 },
    { input: 'against one creature', expected: 1 },
    { input: 'against a creature', expected: 1 },

    // Simple multi-target (numbers as words)
    { input: 'against up to two creatures', expected: 2 },
    { input: 'against up to three targets', expected: 3 },
    { input: 'against up to four enemies', expected: 4 },
    { input: 'against up to five allies', expected: 5 },
    { input: 'against up to ten targets', expected: 10 },

    // Simple multi-target (digits)
    { input: 'against up to 2 creatures', expected: 2 },
    { input: 'against up to 3 targets', expected: 3 },
    { input: 'against up to 5 enemies', expected: 5 },
    { input: 'against up to 10 targets', expected: 10 },

    // Non-matching / Default case
    { input: 'against all enemies', expected: 1 },
    { input: 'against each target', expected: 1 },
    { input: 'against a given target', expected: 1 },
    { input: 'no target description', expected: 1 },

    // Modified targets (sizes, keywords)
    { input: 'up to two Huge or smaller creatures', expected: 2 },
    { input: 'up to three Large or smaller creatures', expected: 3 },
    { input: 'against two Large or smaller creatures', expected: 2 },
    { input: 'against one Large or smaller creature', expected: 1 },
    { input: 'up to two Huge or smaller creature', expected: 2 },
    { input: 'against up to two grounded creatures', expected: 2 },
    { input: 'against up to three different targets', expected: 3 },

    // Other modifier words
    { input: 'against up to three humanoid creatures', expected: 3 },
    { input: 'up to 8 additional targets', expected: 8 },
    { input: 'against up to two Huge or smaller humanoid creatures', expected: 2 },
  ];

  for (const { input, expected } of testCases) {
    t.test(`should parse "${input}" as ${expected} targets`, (t) => {
      t.equal(parseMaxTargets(input), expected);
      t.end();
    });
  }

  t.end();
});
