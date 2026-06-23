import t from 'tap';
import { validateSpells, buildSpellProfile } from './validate_spells';
import { makeMockSpell, makeMockSphere } from './validate_spells_test_helpers';
import { SpellDefinition } from './active_abilities';

t.test('validateSpells: Redundancy & Inconsistency Checks', (t) => {
  t.test('should flag duplicate spells and damage inconsistencies', (t) => {
    const sphere1 = makeMockSphere('Cryomancy', [
      makeMockSpell({
        name: 'Bonechill',
        rank: 2,
        roles: ['burst', 'maim'],
        cost: 'One ice crystal.',
        attack: {
          hit: '\\damagerankfive. The target is \\slowed.',
          targeting:
            'During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against something within \\shortrange.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Polymorph', [
      makeMockSpell({
        name: 'Cripple',
        rank: 2,
        roles: ['burst', 'maim'],
        attack: {
          hit: '\\damagerankfour. The target is \\slowed.',
          targeting:
            'During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against a creature within \\shortrange.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);

    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.ok(redundancy, 'Should find a redundancy issue');
    t.equal(redundancy?.spells.includes('Bonechill'), true);
    t.equal(redundancy?.spells.includes('Cripple'), true);

    // Modify sphere1 to have no cost
    sphere1.spells![0].cost = undefined;
    const issuesNoCost = validateSpells([sphere1, sphere2]);
    const damageInconsistency = issuesNoCost.find((issue) => issue.type === 'inconsistent_damage');
    t.ok(
      damageInconsistency,
      'Should find inconsistent damage when higher damage spell has no cost',
    );

    t.end();
  });

  t.test('should not flag spells with different accuracy modifiers as redundant', (t) => {
    const sphere1 = makeMockSphere('Polymorph', [
      makeMockSpell({
        name: 'Disintegrate',
        rank: 4,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankseven.',
          targeting:
            'Make an attack vs. Fortitude with a \\minus4 accuracy penalty against something within \\shortrange.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Umbramancy', [
      makeMockSpell({
        name: 'Devouring Shadow',
        rank: 4,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankfivelow.',
          targeting: 'Make an attack vs. Fortitude against a creature within \\shortrange.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Disintegrate and Devouring Shadow should not be redundant due to accuracy penalty differences',
    );
    t.end();
  });

  t.test('should not flag spells with different special requirements as redundant', (t) => {
    const sphere1 = makeMockSphere('Vivimancy', [
      makeMockSpell({
        name: 'Corpse Explosion',
        rank: 3,
        roles: ['clear'],
        attack: {
          hit: '\\damagerankfour.',
          targeting:
            'Choose one corpse. Make an attack vs. Reflex against everything within a \\smallarea radius from the corpse.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Pyromancy', [
      makeMockSpell({
        name: 'Fireball',
        rank: 3,
        roles: ['clear'],
        attack: {
          hit: '\\damageranktwo.',
          targeting:
            'Make an attack vs. Reflex against everything in a \\smallarea radius within \\shortrange.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Corpse Explosion and Fireball should not be redundant due to corpse requirement',
    );
    t.end();
  });

  t.test('should not flag spells with different area sizes as redundant', (t) => {
    const sphere1 = makeMockSphere('Telekinesis', [
      makeMockSpell({
        name: 'Mighty Blastwave',
        rank: 4,
        roles: ['clear'],
        attack: {
          hit: '\\damagerankfive.',
          targeting:
            'Make an attack vs. Reflex against everything in a \\smallarea cone from you.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Universal', [
      makeMockSpell({
        name: 'Mighty Mystic Blast',
        rank: 4,
        roles: ['clear'],
        attack: {
          hit: '\\damagerankfour.',
          targeting: 'Make an attack vs. Reflex against everything in a \\medarea cone from you.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Mighty Blastwave and Mighty Mystic Blast should not be redundant due to area size differences',
    );
    t.end();
  });

  t.test('should not flag poisons vs instant damage as redundant', (t) => {
    const sphere1 = makeMockSphere('Toxicology', [
      makeMockSpell({
        name: 'Poison -- Wyvern Venom',
        rank: 3,
        roles: ['execute'],
        attack: {
          hit: 'becomes \\glossterm{poisoned} by wyvern venom.',
          targeting: 'Make an attack vs. Fortitude against one creature.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Vivimancy', [
      makeMockSpell({
        name: 'Blood Calls to Blood',
        rank: 3,
        roles: ['execute'],
        attack: {
          hit: 'takes \\damageranksix.',
          targeting: 'Make an attack vs. Fortitude against one creature.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Poison -- Wyvern Venom and Blood Calls to Blood should not be redundant due to poison condition',
    );
    t.end();
  });

  t.test('should not flag delayed spells vs immediate spells as redundant', (t) => {
    const sphere1 = makeMockSphere('Aeromancy', [
      makeMockSpell({
        name: 'Call Dust Devil',
        rank: 3,
        roles: ['clear'],
        attack: {
          hit: '\\damagerankfive.',
          targeting: 'At the start of your next turn, the dust devil forms...',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Aquamancy', [
      makeMockSpell({
        name: 'Fountain',
        rank: 3,
        roles: ['clear'],
        attack: {
          hit: '\\damagerankthree.',
          targeting: 'Make an attack against all enemies within a \\smallarea radius from you.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Call Dust Devil and Fountain should not be redundant due to delayed vs immediate damage',
    );
    t.end();
  });

  t.test('should prioritize self range parsing over secondary range keywords', (t) => {
    const spell = makeMockSpell({
      name: 'Fountain',
      rank: 3,
      roles: ['clear'],
      attack: {
        hit: '\\damagerankthree.',
        targeting:
          'Make an attack against all enemies within a \\smallarea radius from you. If there is water within \\shortrange...',
      },
    });
    const profile = buildSpellProfile(spell, 'Aquamancy');
    t.equal(
      profile.range,
      'self',
      'Fountain range should be parsed as self, prioritizing "from you" over "\\shortrange"',
    );
    t.end();
  });

  t.test('should not flag chain area spells vs single target spells as redundant', (t) => {
    const sphere1 = makeMockSphere('Electromancy', [
      makeMockSpell({
        name: 'Arc',
        rank: 1,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankone.',
          targeting:
            'Make an attack vs. Fortitude against something within \\shortrange. This attack chains once.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Thaumaturgy', [
      makeMockSpell({
        name: 'Negate',
        rank: 1,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankthree.',
          targeting:
            'Make an attack vs. Fortitude against one creature within \\shortrange. This attack automatically fails if...',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Arc and Negate should not be redundant due to area shape (chain vs single) and failure condition',
    );
    t.end();
  });

  t.test(
    'should count attunement as a balancing cost factor and not flag inconsistent damage',
    (t) => {
      const sphere1 = makeMockSphere('Electromancy', [
        makeMockSpell({
          name: 'Lightning Breath',
          rank: 3,
          roles: ['clear'],
          type: 'Attune',
          attack: {
            hit: '\\damagerankthree.',
            targeting: 'Make an attack vs. Reflex against everything in a line from you.',
          },
        }),
        makeMockSpell({
          name: 'Lightning Bolt',
          rank: 3,
          roles: ['clear'],
          attack: {
            hit: '\\damageranktwo.',
            targeting: 'Make an attack vs. Reflex against everything in a line from you.',
          },
        }),
      ]);

      const issues = validateSpells([sphere1]);
      const redundancy = issues.find((issue) => issue.type === 'redundancy');
      t.ok(redundancy, 'Should find redundancy (duplicate designs)');

      const inconsistency = issues.find((issue) => issue.type === 'inconsistent_damage');
      t.notOk(
        inconsistency,
        'Should not report inconsistent damage since Lightning Breath is an Attune spell',
      );
      t.end();
    },
  );

  t.test('should not flag damaging vs non-damaging spells as redundant', (t) => {
    const sphere1 = makeMockSphere('Channel Divinity', [
      makeMockSpell({
        name: 'Word of Faith',
        rank: 2,
        roles: ['clear'],
        attack: {
          hit: '\\damagerankone.',
          targeting:
            'Make an attack vs. Mental against all enemies in a \\smallarea radius from you.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Umbramancy', [
      makeMockSpell({
        name: 'Fearsome Shadow Cloak',
        rank: 2,
        roles: ['generator'],
        attack: {
          hit: 'The target is \\briefly \\frightened of you.',
          targeting:
            'Make an attack vs. Mental against all enemies in a \\smallarea radius from you.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Word of Faith and Fearsome Shadow Cloak should not be redundant because one deals damage and the other does not',
    );
    t.end();
  });

  t.test('should not flag healing vs non-healing spells as redundant', (t) => {
    const sphere1 = makeMockSphere('Vivimancy', [
      makeMockSpell({
        name: 'Lifesteal',
        rank: 2,
        roles: ['burst', 'healing'],
        attack: {
          hit: '\\damagerankone.',
          injury: 'If you spend stamina, you regain \\hprankfive.',
          targeting: 'Make an attack vs. Fortitude against one creature within \\medrange.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Prayer', [
      makeMockSpell({
        name: 'Inflict Wound',
        rank: 2,
        roles: ['execute'],
        attack: {
          hit: '\\damagerankone.',
          injury: '\\damagerankone again.',
          targeting: 'Make an attack vs. Fortitude against one creature within \\medrange.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Lifesteal and Inflict Wound should not be redundant because one heals and the other does not',
    );
    t.end();
  });

  t.test('should not flag growing vs static area spells as redundant', (t) => {
    const sphere1 = makeMockSphere('Terramancy', [
      makeMockSpell({
        name: 'Volcano',
        rank: 3,
        roles: ['clear'],
        attack: {
          hit: '\\damagerankone.',
          targeting:
            'You create a volcano. The area affected by the volcano increases over time. It affects a \\smallarea radius zone in the first turn.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Pyromancy', [
      makeMockSpell({
        name: 'Fireball',
        rank: 3,
        roles: ['clear'],
        attack: {
          hit: '\\damageranktwo.',
          targeting:
            'Make an attack vs. Reflex against everything in a \\smallarea radius within \\shortrange.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Volcano and Fireball should not be redundant because Volcano area increases over time',
    );
    t.end();
  });

  t.test('should not flag standard action vs reactive/triggered spells as redundant', (t) => {
    const sphere1 = makeMockSphere('Channel Divinity', [
      makeMockSpell({
        name: 'Fearful Awe',
        rank: 1,
        roles: ['flash'],
        attack: {
          hit: 'The target is \\briefly \\frightened by you.',
          targeting:
            'Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Enchantment', [
      makeMockSpell({
        name: 'Curated Threat',
        rank: 1,
        roles: ['attune'],
        type: 'Attune',
        attack: {
          hit: "The target's assessment of the threat matches your intention.",
          targeting:
            'Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Fearful Awe and Curated Threat should not be redundant due to reactive/triggered difference and different conditions',
    );
    t.end();
  });

  t.test('should not flag spells with different conditions as redundant', (t) => {
    const sphere1 = makeMockSphere('Channel Divinity', [
      makeMockSpell({
        name: 'Enduring Fearful Awe',
        rank: 6,
        roles: ['flash'],
        attack: {
          hit: 'The target is \\frightened by you as a \\glossterm{condition}.',
          targeting:
            'Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.',
        },
      }),
    ]);

    const sphere2 = makeMockSphere('Enchantment', [
      makeMockSpell({
        name: 'Intense Fearsome Aura',
        rank: 6,
        roles: ['attune'],
        type: 'Attune (deep)',
        attack: {
          hit: 'The target is \\panicked by you until your next turn.',
          targeting:
            'Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(
      redundancy,
      'Enduring Fearful Awe and Intense Fearsome Aura should not be redundant due to condition differences (frightened vs panicked)',
    );
    t.end();
  });

  t.end();
});
