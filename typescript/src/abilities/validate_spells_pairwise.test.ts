import t from 'tap';
import { validateSpellsPairwise } from './validate_spells';
import { buildSpellProfile } from './spell_profile';
import { makeMockSpell, makeMockSphere } from './validate_spells_test_helpers';

t.test('validateSpellsPairwise', (t) => {
  t.test('Almost equivalent spells', (t) => {
    t.test('should flag spells that are almost equivalent with exactly one difference', (t) => {
      const sphere1 = makeMockSphere('Cryomancy', [
        makeMockSpell({
          name: 'Bonechill',
          rank: 2,
          roles: ['burst'],
          attack: {
            hit: '\\damagerankfive.',
            targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
          },
        }),
        makeMockSpell({
          name: 'Cripple',
          rank: 2,
          roles: ['burst'],
          attack: {
            hit: '\\damagerankfive.',
            targeting: 'Make an attack vs. Fortitude against a creature within \\medrange.',
          },
        }),
      ]);

      // Case 1: Option disabled (should not find almost_equivalent)
      const issuesDisabled = validateSpellsPairwise([sphere1]);
      const almost1 = issuesDisabled.find((issue) => issue.type === 'almost_equivalent');
      t.notOk(almost1, 'Should not find almost equivalent when option is omitted');

      // Case 2: Option enabled (should find almost_equivalent under differs by range)
      const issuesEnabled = validateSpellsPairwise([sphere1], { showApproximate: true });
      const almost2 = issuesEnabled.find((issue) => issue.type === 'almost_equivalent');
      t.ok(almost2, 'Should find almost equivalent when option is enabled');
      t.equal(almost2?.differenceField, 'range');
      t.match(almost2?.message || '', /differ only by range/);

      t.end();
    });

    t.test('should enforce rank difference limit of 1', (t) => {
      const sphere1 = makeMockSphere('Cryomancy', [
        makeMockSpell({
          name: 'Ice Spear',
          rank: 1,
          roles: ['burst'],
          attack: {
            hit: '\\damagerankfive.',
            targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
          },
        }),
        makeMockSpell({
          name: 'Great Ice Spear',
          rank: 3,
          roles: ['burst'],
          attack: {
            hit: '\\damagerankfive.',
            targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
          },
        }),
      ]);

      const issues = validateSpellsPairwise([sphere1], { showApproximate: true });
      const almost = issues.find((issue) => issue.type === 'almost_equivalent');
      t.notOk(
        almost,
        'Should not flag spells as almost equivalent if rank difference is greater than 1',
      );
      t.end();
    });

    t.test('should enforce same damage presence constraint', (t) => {
      const sphere1 = makeMockSphere('Cryomancy', [
        makeMockSpell({
          name: 'Bonechill',
          rank: 2,
          roles: ['burst'],
          attack: {
            hit: '\\damagerankfive.',
            targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
          },
        }),
        makeMockSpell({
          name: 'Freezing Touch',
          rank: 2,
          roles: ['burst'],
          attack: {
            hit: 'The target is frozen.', // No damagerank
            targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
          },
        }),
      ]);

      const issues = validateSpellsPairwise([sphere1], { showApproximate: true });
      const almost = issues.find((issue) => issue.type === 'almost_equivalent');
      t.notOk(
        almost,
        'Should not flag spells as almost equivalent if one is damaging and the other is not',
      );
      t.end();
    });

    t.end();
  });

  t.test('Redundancy and inconsistency', (t) => {
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

      const issues = validateSpellsPairwise([sphere1, sphere2]);

      const redundancy = issues.find((issue) => issue.type === 'redundancy');
      t.ok(redundancy, 'Should find a redundancy issue');
      t.equal(redundancy?.spells.includes('Bonechill'), true);
      t.equal(redundancy?.spells.includes('Cripple'), true);

      // Modify sphere1 to have no cost
      sphere1.spells![0].cost = undefined;
      const issuesNoCost = validateSpellsPairwise([sphere1, sphere2]);
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

      const issues = validateSpellsPairwise([sphere1, sphere2]);
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
            hit: '\\damagerankfive.',
            targeting:
              'Choose one corpse. Make an attack vs. Armor and Reflex against everything within a \\smallarea radius from the corpse.',
          },
        }),
      ]);

      const sphere2 = makeMockSphere('Pyromancy', [
        makeMockSpell({
          name: 'Fireball',
          rank: 3,
          roles: ['clear'],
          attack: {
            hit: '\\damagerankthree.',
            targeting:
              'Make an attack vs. Armor and Reflex against everything in a \\smallarea radius within \\shortrange.',
          },
        }),
      ]);

      const issues = validateSpellsPairwise([sphere1, sphere2]);
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
            targeting: 'Make an attack vs. Reflex against everything in a \\smallarea cone from you.',
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

      const issues = validateSpellsPairwise([sphere1, sphere2]);
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

      const issues = validateSpellsPairwise([sphere1, sphere2]);
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

      const issues = validateSpellsPairwise([sphere1, sphere2]);
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

      const issues = validateSpellsPairwise([sphere1, sphere2]);
      const redundancy = issues.find((issue) => issue.type === 'redundancy');
      t.notOk(
        redundancy,
        'Arc and Negate should not be redundant due to area shape (chain vs single) and failure condition',
      );
      t.end();
    });

    t.test('should not flag attunement spells vs standard spells as redundant', (t) => {
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

      const issues = validateSpellsPairwise([sphere1]);
      const redundancy = issues.find((issue) => issue.type === 'redundancy');
      t.notOk(redundancy, 'Should not report redundancy between attunement and standard spells');
      t.end();
    });

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

      const issues = validateSpellsPairwise([sphere1, sphere2]);
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

      const issues = validateSpellsPairwise([sphere1, sphere2]);
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

      const issues = validateSpellsPairwise([sphere1, sphere2]);
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

      const issues = validateSpellsPairwise([sphere1, sphere2]);
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
            hit: 'The target is \\briefly \\panicked by you.',
            targeting:
              'Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.',
          },
        }),
      ]);

      const issues = validateSpellsPairwise([sphere1, sphere2]);
      const redundancy = issues.find((issue) => issue.type === 'redundancy');
      t.notOk(
        redundancy,
        'Enduring Fearful Awe and Intense Fearsome Aura should not be redundant due to condition differences (frightened vs panicked)',
      );
      t.end();
    });

    t.test('should not flag Kinetic Rebound (attunement) and Thorns (standard) as redundant', (t) => {
      const telekinesis = makeMockSphere('Telekinesis', [
        makeMockSpell({
          name: 'Kinetic Rebound',
          rank: 2,
          roles: ['attune'],
          type: 'Attune (deep)',
          attack: {
            hit: '\\damagerankone.',
            targeting:
              'Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon, make a \\glossterm{reactive attack} vs. Brawn against them.',
          },
        }),
      ]);

      const verdamancy = makeMockSphere('Verdamancy', [
        makeMockSpell({
          name: 'Thorns',
          rank: 2,
          roles: ['focus'],
          attack: {
            hit: '\\damageranktwo.',
            targeting: `
              You are \\briefly covered in thorns.
              The thorns grant you \\glossterm{cover} from all attacks.
              In addition, whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon, make a \\glossterm{reactive attack} vs. Armor against them.
            `,
          },
        }),
      ]);

      const issues = validateSpellsPairwise([telekinesis, verdamancy]);
      const redundancy = issues.find((issue) => issue.type === 'redundancy');
      t.notOk(
        redundancy,
        'Kinetic Rebound and Thorns should not be redundant due to attunement vs standard duration',
      );
      t.end();
    });

    t.end();
  });

  t.test('Strictly superior spells', (t) => {
    t.test('should flag Thunderdash vs Flame Dash', (t) => {
      const sphere1 = makeMockSphere('Electromancy', [
        makeMockSpell({
          name: 'Thunderdash',
          rank: 3,
          roles: ['clear', 'dive'],
          attack: {
            hit: '\\damageranktwo.',
            injury: 'The target is \\briefly \\deafened.',
            halfOnMiss: true,
            targeting: `
              You teleport into an unoccupied destination on a stable surface within \\shortrange.
              Both your departure and arrival with this spell sound like a clap of thunder.
              In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
            `,
          },
        }),
      ]);

      const sphere2 = makeMockSphere('Pyromancy', [
        makeMockSpell({
          name: 'Flame Dash',
          rank: 3,
          roles: ['clear', 'dive'],
          attack: {
            hit: '\\damageranktwo.',
            halfOnMiss: true,
            targeting: `
              You teleport into an unoccupied destination on a stable surface within \\shortrange.
              In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
            `,
          },
        }),
      ]);

      const issues = validateSpellsPairwise([sphere1, sphere2]);
      const superior = issues.find((issue) => issue.type === 'strictly_superior');
      t.ok(superior, 'Should flag Thunderdash vs Flame Dash');
      t.equal(superior?.spells.includes('Thunderdash'), true);
      t.equal(superior?.spells.includes('Flame Dash'), true);
      t.match(superior?.message || '', /Thunderdash.*strictly superior.*Flame Dash/);
      t.end();
    });

    t.test(
      'should not flag as strictly superior if the upgraded spell has a balancing cost factor',
      (t) => {
        const sphere1 = makeMockSphere('Electromancy', [
          makeMockSpell({
            name: 'Charged Thunderdash',
            rank: 3,
            roles: ['clear', 'dive'],
            cost: '1 stamina',
            attack: {
              hit: '\\damagerankthree.',
              injury: 'The target is \\briefly \\deafened.',
              halfOnMiss: true,
              targeting: `
                You teleport into an unoccupied destination on a stable surface within \\shortrange.
                In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
              `,
            },
          }),
        ]);

        const sphere2 = makeMockSphere('Pyromancy', [
          makeMockSpell({
            name: 'Flame Dash',
            rank: 3,
            roles: ['clear', 'dive'],
            attack: {
              hit: '\\damageranktwo.',
              halfOnMiss: true,
              targeting: `
                You teleport into an unoccupied destination on a stable surface within \\shortrange.
                In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
              `,
            },
          }),
        ]);

        const issues = validateSpellsPairwise([sphere1, sphere2]);
        const superior = issues.find((issue) => issue.type === 'strictly_superior');
        t.notOk(superior, 'Should not flag when there is a balancing cost factor');
        t.end();
      },
    );

    t.test('should not flag if the better spell has a higher rank', (t) => {
      const sphere1 = makeMockSphere('Electromancy', [
        makeMockSpell({
          name: 'Greater Thunderdash',
          rank: 4,
          roles: ['clear', 'dive'],
          attack: {
            hit: '\\damagerankthree.',
            injury: 'The target is \\briefly \\deafened.',
            halfOnMiss: true,
            targeting: `
              You teleport into an unoccupied destination on a stable surface within \\shortrange.
              In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
            `,
          },
        }),
      ]);

      const sphere2 = makeMockSphere('Pyromancy', [
        makeMockSpell({
          name: 'Flame Dash',
          rank: 3,
          roles: ['clear', 'dive'],
          attack: {
            hit: '\\damageranktwo.',
            halfOnMiss: true,
            targeting: `
              You teleport into an unoccupied destination on a stable surface within \\shortrange.
              In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
            `,
          },
        }),
      ]);

      const issues = validateSpellsPairwise([sphere1, sphere2]);
      const superior = issues.find((issue) => issue.type === 'strictly_superior');
      t.notOk(superior, 'Should not flag since rank 4 spell being better than rank 3 is expected');
      t.end();
    });

    t.test('user-reported edge cases', (t) => {
      t.test('1. Dust Cloud vs Flame Aura (Flame Aura deals damagerankzero)', (t) => {
        const dustCloud = makeMockSphere('Aeromancy', [
          makeMockSpell({
            name: 'Dust Cloud',
            rank: 3,
            roles: ['flash'],
            attack: {
              hit: 'The target is \\dazzled.',
              targeting:
                'Make an attack vs. Reflex against each creature in a \\smallarea radius within \\shortrange.',
            },
          }),
        ]);

        const flameAura = makeMockSphere('Pyromancy', [
          makeMockSpell({
            name: 'Flame Aura',
            rank: 4,
            roles: ['attune'],
            attack: {
              hit: '\\damagerankzero.',
              targeting: 'Heat constantly radiates in a \\smallarea radius emanation from you.',
            },
          }),
        ]);

        const issues = validateSpellsPairwise([dustCloud, flameAura]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Dust Cloud vs Flame Aura',
        );
        t.end();
      });

      t.test('2. Garotte vs Mighty Shielding Windblast (Mighty Shielding Windblast shields)', (t) => {
        const garotte = makeMockSphere('Fabrication', [
          makeMockSpell({
            name: 'Garotte',
            rank: 4,
            roles: ['burst'],
            attack: {
              hit: '\\damageranksix.',
              targeting:
                'Make an attack vs. Brawn and Reflex against one creature within \\shortrange.',
            },
          }),
        ]);

        const windblast = makeMockSphere('Aeromancy', [
          makeMockSpell({
            name: 'Mighty Shielding Windblast',
            rank: 5,
            roles: ['clear', 'turtle'],
            attack: {
              hit: '\\damagerankfive.',
              targeting:
                'Make an attack vs. Brawn and Reflex against all adjacent. Then, you are \\briefly \\shielded.',
            },
          }),
        ]);

        const issues = validateSpellsPairwise([garotte, windblast]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Garotte vs Mighty Shielding Windblast',
        );
        t.end();
      });

      t.test('3. Desiccate vs Drowning Grasp (conditional accuracy and injury debuff)', (t) => {
        const desiccate = makeMockSphere('Aquamancy', [
          makeMockSpell({
            name: 'Desiccate',
            rank: 2,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankthree.',
              targeting:
                'Make an attack vs. Fortitude against one creature within \\shortrange. You gain +2 accuracy if target is native to water.',
            },
          }),
        ]);

        const drowningGrasp = makeMockSphere('Aquamancy', [
          makeMockSpell({
            name: 'Drowning Grasp',
            rank: 2,
            roles: ['burst', 'maim'],
            attack: {
              hit: '\\damageranktwo.',
              injury: 'The target becomes unable to breathe air as a \\glossterm{condition}.',
              targeting: 'Make an attack vs. Fortitude against one creature you touch.',
            },
          }),
        ]);

        const issues = validateSpellsPairwise([desiccate, drowningGrasp]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Desiccate vs Drowning Grasp',
        );
        t.end();
      });

      t.test(
        '4. Aquajet Grasp vs Dark Grasp (Dark Grasp has difficult terrain debuff on injury)',
        (t) => {
          const aquajetGrasp = makeMockSphere('Aquamancy', [
            makeMockSpell({
              name: 'Aquajet Grasp',
              rank: 1,
              roles: ['burst', 'maim'],
              attack: {
                hit: '\\damageranktwo.',
                injury: 'You fling it.',
                targeting: 'Make an attack vs. Brawn against one creature you touch.',
              },
            }),
          ]);

          const darkGrasp = makeMockSphere('Umbramancy', [
            makeMockSpell({
              name: 'Dark Grasp',
              rank: 1,
              roles: ['burst', 'maim'],
              attack: {
                hit: '\\damageranktwolow.',
                injury: 'As a condition, target treats dim illumination as difficult terrain.',
                targeting: 'Make an attack vs. Brawn against something adjacent.',
              },
            }),
          ]);

          const issues = validateSpellsPairwise([aquajetGrasp, darkGrasp]);
          t.notOk(
            issues.find((i) => i.type === 'strictly_superior'),
            'Should not flag Aquajet Grasp vs Dark Grasp',
          );
          t.end();
        },
      );

      t.test('5. Entangle vs Windseal (target count and removal drawback)', (t) => {
        const entangle = makeMockSphere('Verdamancy', [
          makeMockSpell({
            name: 'Entangle',
            rank: 4,
            roles: ['trip'],
            attack: {
              hit: `
                The target is \\briefly \\slowed.
                This effect is immediately removed if the target takes damage from a \\atAcid or \\atFire ability.
              `,
              targeting: `
                Make an attack vs. Brawn against up to two \\glossterm{grounded} creatures within \\medrange.
                You gain a +2 accuracy bonus against each target that is in \\glossterm{undergrowth}.
              `,
            },
          }),
        ]);

        const windseal = makeMockSphere('Aeromancy', [
          makeMockSpell({
            name: 'Windseal',
            rank: 4,
            roles: ['flash'],
            attack: {
              hit: `
                The target is \\briefly \\slowed.
              `,
              targeting: `
                Make an attack vs. Brawn against up to three creatures within \\medrange.
              `,
            },
          }),
        ]);

        const issues = validateSpellsPairwise([entangle, windseal]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Entangle vs Windseal',
        );
        t.end();
      });

      t.test('6. Mighty Windsnipe vs Distant Magic Missile (half on miss)', (t) => {
        const windsnipe = makeMockSphere('Aeromancy', [
          makeMockSpell({
            name: 'Mighty Windsnipe',
            rank: 7,
            roles: ['snipe'],
            attack: {
              hit: `
                \\damagerankfive.
              `,
              targeting: 'Make an attack vs. Armor against something within \\distrange.',
            },
          }),
        ]);

        const distantMM = makeMockSphere('Thaumaturgy', [
          makeMockSpell({
            name: 'Distant Magic Missile',
            rank: 7,
            roles: ['burst'],
            attack: {
              hit: `
                \\damagerankfive, and any \\glossterm{extra damage} is doubled.
              `,
              halfOnMiss: true,
              targeting: `
                Make an attack vs. Armor against something within \\longrange.
                This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
              `,
            },
          }),
        ]);

        const issues = validateSpellsPairwise([windsnipe, distantMM]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Mighty Windsnipe vs Distant Magic Missile',
        );
        t.end();
      });

      t.test('7. Asphyxiate vs Living Pyre (damage over time rank adjustment)', (t) => {
        const asphyxiate = makeMockSphere('Aeromancy', [
          makeMockSpell({
            name: 'Asphyxiate',
            rank: 2,
            roles: ['burst'],
            attack: {
              hit: `
                \\damagerankthree.
              `,
              targeting: `
                Make an attack vs. Fortitude with a \\minus2 accuracy penalty against one creature within \\medrange.
                If the target does not need to breathe air, this attack has no effect.
              `,
            },
          }),
        ]);

        const livingPyre = makeMockSphere('Pyromancy', [
          makeMockSpell({
            name: 'Living Pyre',
            rank: 3,
            roles: ['burn'],
            attack: {
              hit: `
                \\damageranktwo.
                The target also \\briefly \\debuff{burns} for \\damageranktwo.
                Any \\glossterm{extra damage} applies to both the initial damage and the burning damage.
              `,
              targeting: `
                Make an attack vs. Fortitude with a -4 accuracy penalty against a creature within \\medrange.
              `,
            },
          }),
        ]);

        const issues = validateSpellsPairwise([asphyxiate, livingPyre]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Asphyxiate vs Living Pyre',
        );
        t.end();
      });

      t.test('8. Desiccate vs Shadow Blossom (failure chance defensive buff)', (t) => {
        const desiccateSpell = makeMockSphere('Aquamancy', [
          makeMockSpell({
            name: 'Desiccate',
            rank: 2,
            roles: ['burst'],
            attack: {
              hit: `
                \\damagerankthree.
              `,
              targeting: `
                Make an attack vs. Fortitude against one creature within \\shortrange.
                You gain a +2 accuracy bonus if the target is native to water.
              `,
            },
          }),
        ]);

        const shadowBlossom = makeMockSphere('Umbramancy', [
          makeMockSpell({
            name: 'Shadow Blossom',
            rank: 2,
            roles: ['clear', 'turtle'],
            attack: {
              hit: `
                \\damageranktwolow.
              `,
              targeting: `
                You must be \\glossterm{shadowed} to cast this spell.
                When you cast this spell, you wrap yourself in shadow.
                All attacks against you \\briefly have a 50\\% \\glossterm{failure chance}.
                During your next turn, you can spend a \\glossterm{standard action} to \\glossterm{teleport} to a location within \\shortrange.
                If you do, make an attack vs. Fortitude against each \\glossterm{enemy} adjacent to you.
              `,
            },
          }),
        ]);

        const issues = validateSpellsPairwise([desiccateSpell, shadowBlossom]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Desiccate vs Shadow Blossom',
        );
        t.end();
      });

      t.test('9. Massive Windblast vs Massive Blastwave (fling vs higher damage rank)', (t) => {
        const massiveWindblast = makeMockSphere('Aeromancy', [
          makeMockSpell({
            name: 'Massive Windblast',
            rank: 6,
            roles: ['clear'],
            attack: {
              hit: '\\damagerankfive.',
              halfOnMiss: true,
              targeting:
                'Make an attack vs. Brawn and Reflex against everything in a \\largearea cone from you.',
            },
          }),
        ]);

        const massiveBlastwave = makeMockSphere('Telekinesis', [
          makeMockSpell({
            name: 'Massive Blastwave',
            rank: 6,
            roles: ['clear', 'maim'],
            attack: {
              hit: '\\damagerankfour.',
              injury:
                'You \\glossterm{fling} the target 15 feet away from you. This fling distance is doubled if the target is Medium or smaller.',
              halfOnMiss: true,
              targeting:
                'Make an attack vs. Brawn and Reflex against everything in a \\largearea cone from you.',
            },
          }),
        ]);

        const issues = validateSpellsPairwise([massiveWindblast, massiveBlastwave]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Massive Windblast vs Massive Blastwave',
        );
        t.end();
      });

      t.test(
        '10. Constraining Bubble vs Drowning Bubble (rank 6, 2 targets vs rank 7, 3 targets, injured requirement)',
        (t) => {
          const constrainingBubble = makeMockSphere('Aquamancy', [
            makeMockSpell({
              name: 'Constraining Bubble',
              rank: 6,
              roles: ['softener'],
              attack: {
                hit: 'The target is \\briefly surrounded by a bubble of water. It cannot breathe air, fly, or glide. If it does not have a \\glossterm{swim speed}, it is \\unsteady.',
                targeting:
                  'Make an attack vs. Brawn against up to two Huge or smaller creatures within \\medrange.',
              },
            }),
          ]);

          const drowningBubble = makeMockSphere('Aquamancy', [
            makeMockSpell({
              name: 'Drowning Bubble',
              rank: 7,
              roles: ['maim'],
              attack: {
                hit: 'If the target is \\glossterm{injured}, it is surrounded by a bubble of water as a \\glossterm{condition}. It cannot breathe air, fly, or glide.',
                targeting:
                  'Make an attack vs. Brawn against up to three Huge or smaller creatures within \\medrange.',
              },
            }),
          ]);

          const issues = validateSpellsPairwise([constrainingBubble, drowningBubble]);
          t.notOk(
            issues.find((i) => i.type === 'strictly_superior'),
            'Should not flag Constraining Bubble vs Drowning Bubble',
          );
          t.end();
        },
      );

      t.test('11. Geyser vs Kindled Fireburst (vertical line vs radius area types)', (t) => {
        const geyser = makeMockSphere('Aquamancy', [
          makeMockSpell({
            name: 'Geyser',
            rank: 2,
            roles: ['burst', 'hazard'],
            attack: {
              hit: '\\damagerankone.',
              halfOnMiss: true,
              targeting:
                'You create a geyser in a \\medarealong, 5 ft.\\ wide vertical line-shaped \\glossterm{zone} within \\shortrange.',
            },
          }),
        ]);

        const kindledFireburst = makeMockSphere('Pyromancy', [
          makeMockSpell({
            name: 'Kindled Fireburst',
            rank: 2,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankone.',
              halfOnMiss: true,
              targeting:
                'Choose one Tiny or larger active fire within \\shortrange. Make an attack vs. Reflex against everything within an \\smallarea radius from it.',
            },
          }),
        ]);

        const issues = validateSpellsPairwise([geyser, kindledFireburst]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Geyser vs Kindled Fireburst',
        );
        t.end();
      });

      t.test(
        '13. Slow vs Hostile Timeseal (slowed vs frozen in time/cannot act/returns to normal)',
        (t) => {
          const slow = makeMockSphere('Chronomancy', [
            makeMockSpell({
              name: 'Slow',
              rank: 4,
              roles: ['maim'],
              attack: {
                hit: 'If the target is \\glossterm{injured}, it is \\slowed as a \\glossterm{condition}.',
                targeting:
                  'Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.',
              },
            }),
          ]);

          const hostileTimeseal = makeMockSphere('Chronomancy', [
            makeMockSpell({
              name: 'Hostile Timeseal',
              rank: 4,
              roles: ['maim'],
              attack: {
                hit: 'If the target is \\glossterm{injured}, it becomes \\briefly frozen in time. It becomes completely immune to all damage, attacks, and effects of any kind. In addition, it cannot act in any way, and the duration of other effects on it does not expire. At the end of your next turn, it returns to normal...',
                targeting:
                  'Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.',
              },
            }),
          ]);

          const issues = validateSpellsPairwise([slow, hostileTimeseal]);
          t.notOk(
            issues.find((i) => i.type === 'strictly_superior'),
            'Should not flag Slow vs Hostile Timeseal',
          );
          t.end();
        },
      );

      t.test('14. Whirlwind of Blades vs Mighty Word of Faith (enemiesOnly difference)', (t) => {
        const whirlwindOfBlades = makeMockSphere('Fabrication', [
          makeMockSpell({
            name: 'Whirlwind of Blades',
            rank: 4,
            roles: ['clear'],
            attack: {
              hit: `\\damagerankfive.`,
              halfOnMiss: true,
              targeting: `
                Make an attack vs. Armor against everything in a \\smallarea radius from you.
              `,
            },
          }),
        ]);

        const mightyWordOfFaith = makeMockSphere('Channel Divinity', [
          makeMockSpell({
            name: 'Mighty Word of Faith',
            rank: 5,
            roles: ['clear'],
            attack: {
              hit: `
                \\damagerankfour.
              `,
              halfOnMiss: true,
              targeting: `
                Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
              `,
            },
          }),
        ]);

        const issues = validateSpellsPairwise([whirlwindOfBlades, mightyWordOfFaith]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Whirlwind of Blades vs Mighty Word of Faith',
        );
        t.end();
      });

      t.test('15. Echoing Fearful Awe vs Cause Fear (brief vs condition)', (t) => {
        const testSphere = makeMockSphere('Universal', [
          makeMockSpell({
            name: 'Echoing Fearful Awe',
            rank: 4,
            roles: ['flash'] as const,
            attack: {
              hit: 'The target is \\briefly \\frightened by you.',
              targeting:
                'Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.',
            },
          }),
          makeMockSpell({
            name: 'Cause Fear',
            rank: 5,
            roles: ['flash'] as const,
            attack: {
              hit: 'The target is \\frightened by you as a \\glossterm{condition}.',
              targeting:
                'Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.',
            },
          }),
        ]);
        const issues = validateSpellsPairwise([testSphere]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Echoing Fearful Awe vs Cause Fear',
        );
        t.end();
      });

      t.test('16. Frost Breath vs Flame Breath (delayed damage vs immediate)', (t) => {
        const testSphere = makeMockSphere('Universal', [
          makeMockSpell({
            name: 'Frost Breath',
            rank: 3,
            roles: ['clear'] as const,
            type: 'Attune',
            attack: {
              hit: 'The target feels a growing chill. At the end of its next turn, it takes \\damagerankfour.',
              halfOnMiss: true,
              targeting:
                "For the duration of this spell, you can breathe cold. You \\briefly can't use this ability again.",
            },
          }),
          makeMockSpell({
            name: 'Flame Breath',
            rank: 3,
            roles: ['clear'] as const,
            type: 'Attune',
            attack: {
              hit: '\\damagerankthree.',
              halfOnMiss: true,
              targeting:
                "For the duration of this spell, you can breathe fire. You \\briefly can't use this ability again.",
            },
          }),
        ]);
        const issues = validateSpellsPairwise([testSphere]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Frost Breath vs Flame Breath',
        );
        t.end();
      });

      t.test('17. Bleed vs Fleshspike (conditional injury execute vs flat burst)', (t) => {
        const polymorph = makeMockSphere('Polymorph', [
          makeMockSpell({
            name: 'Bleed',
            rank: 1,
            roles: ['burn', 'execute'] as const,
            attack: {
              hit: '\\damagerankone.',
              injury: 'The target \\briefly \\debuff{bleeds} for \\damagerankone.',
              targeting: 'Make an attack vs. Fortitude against one creature within \\shortrange.',
            },
          }),
          makeMockSpell({
            name: 'Fleshspike',
            rank: 1,
            roles: ['burst'] as const,
            attack: {
              hit: '\\damagerankthree.',
              targeting: `
                You must have a \\glossterm{free hand} to cast this spell.
                Make an attack vs. Armor against an adjacent creature.
              `,
            },
          }),
        ]);
        const issues = validateSpellsPairwise([polymorph]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Bleed vs Fleshspike as strictly superior',
        );
        t.end();
      });

      t.test('18. Caustic Grasp vs Fleshspike (DoT burn vs direct burst)', (t) => {
        const sphere = makeMockSphere('TestSphere', [
          makeMockSpell({
            name: 'Caustic Grasp',
            rank: 1,
            roles: ['burn'] as const,
            attack: {
              hit: '\\damagerankone. The target also \\briefly \\debuff{corrodes} for \\damagerankone.',
              targeting: `
                You must have a \\glossterm{free hand} to cast this spell.
                Make an attack vs. Fortitude against something you touch.
              `,
            },
          }),
          makeMockSpell({
            name: 'Fleshspike',
            rank: 1,
            roles: ['burst'] as const,
            attack: {
              hit: '\\damagerankthree.',
              targeting: `
                You must have a \\glossterm{free hand} to cast this spell.
                Make an attack vs. Armor against an adjacent creature.
              `,
            },
          }),
        ]);
        const issues = validateSpellsPairwise([sphere]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Caustic Grasp vs Fleshspike as strictly superior',
        );
        t.end();
      });

      t.test('19. Ignition vs Burning Grasp (single-target Reflex attack has -1dr modifier)', (t) => {
        const pyromancy = makeMockSphere('Pyromancy', [
          makeMockSpell({
            name: 'Burning Grasp',
            rank: 2,
            roles: ['burn'],
            scaling: 'damage',
            attack: {
              hit: `
                  \\damagerankone.
                  The target also \\briefly \\debuff{burns} for \\damagerankone.
                `,
              targeting: `
                  You must have a \\glossterm{free hand} to cast this spell.
                  Make an attack vs. Reflex against something you \\glossterm{touch}.
                `,
            },
          }),
          makeMockSpell({
            name: 'Ignition',
            rank: 2,
            roles: ['burn'],
            scaling: 'damage',
            attack: {
              hit: `
                  \\damagerankone.
                  The target also \\debuff{burns} for \\damagerankone as a \\glossterm{condition}.
                `,
              targeting: `
                  Make an attack vs. Fortitude against one creature within \\shortrange.
                `,
            },
          }),
        ]);

        const issues = validateSpellsPairwise([pyromancy]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Ignition vs Burning Grasp as strictly superior due to single-target Reflex modifier',
        );
        t.end();
      });

      t.end();
    });

    t.end();
  });

  t.end();
});

