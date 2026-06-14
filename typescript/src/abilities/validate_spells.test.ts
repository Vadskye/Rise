import t from 'tap';
import { buildSpellProfile, validateSpells, SpellProfile } from './validate_spells';
import { SpellDefinition } from './active_abilities';
import { MysticSphere } from './mystic_spheres';

t.test('buildSpellProfile', (t) => {
  t.test('should parse double action, defense, range, area, conditions, damage, and cost', (t) => {
    const mockSpell: SpellDefinition = {
      name: 'Test Spell',
      rank: 2,
      roles: ['burst', 'maim'],
      cost: 'One ice crystal.',
      attack: {
        hit: '\\damagerankfive, and the target is \\slowed.',
        targeting: 'During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against something within \\shortrange.',
      },
    };

    const profile = buildSpellProfile(mockSpell, 'TestSphere');
    t.equal(profile.name, 'Test Spell');
    t.equal(profile.sphereName, 'TestSphere');
    t.equal(profile.rank, 2);
    t.equal(profile.isDoubleAction, true);
    t.equal(profile.isReactive, false);
    t.equal(profile.range, 'short');
    t.same(profile.defenses, ['fortitude']);
    t.equal(profile.area, 'single');
    t.equal(profile.areaSize, 'none');
    t.equal(profile.damageRank, 5);
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

  t.end();
});

t.test('validateSpells', (t) => {
  t.test('should flag duplicate spells and damage inconsistencies', (t) => {
    const sphere1: MysticSphere = {
      name: 'Cryomancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Bonechill',
          rank: 2,
          roles: ['burst', 'maim'],
          cost: 'One ice crystal.',
          attack: {
            hit: '\\damagerankfive. The target is \\slowed.',
            targeting: 'During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against something within \\shortrange.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Polymorph',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Cripple',
          rank: 2,
          roles: ['burst', 'maim'],
          attack: {
            hit: '\\damagerankfour. The target is \\slowed.',
            targeting: 'During your next turn, you can spend a \\glossterm{standard action} to make an attack vs. Fortitude against a creature within \\shortrange.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    
    // We expect a redundancy issue (virtually identical spells)
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.ok(redundancy, 'Should find a redundancy issue');
    t.equal(redundancy?.spells.includes('Bonechill'), true);
    t.equal(redundancy?.spells.includes('Cripple'), true);

    
    // Let's modify sphere1 to have no cost
    sphere1.spells![0].cost = undefined;
    const issuesNoCost = validateSpells([sphere1, sphere2]);
    const damageInconsistency = issuesNoCost.find((issue) => issue.type === 'inconsistent_damage');
    t.ok(damageInconsistency, 'Should find inconsistent damage when higher damage spell has no cost');
    
    t.end();
  });

  t.test('should not flag spells with different accuracy modifiers as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Polymorph',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Disintegrate',
          rank: 4,
          roles: ['burst'],
          attack: {
            hit: '\\damagerankseven.',
            targeting: 'Make an attack vs. Fortitude with a \\minus4 accuracy penalty against something within \\shortrange.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Umbramancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Devouring Shadow',
          rank: 4,
          roles: ['burst'],
          attack: {
            hit: '\\damagerankfivelow.',
            targeting: 'Make an attack vs. Fortitude against a creature within \\shortrange.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Disintegrate and Devouring Shadow should not be redundant due to accuracy penalty differences');
    t.end();
  });

  t.test('should not flag spells with different special requirements as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Vivimancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Corpse Explosion',
          rank: 3,
          roles: ['clear'],
          attack: {
            hit: '\\damagerankfour.',
            targeting: 'Choose one corpse. Make an attack vs. Reflex against everything within a \\smallarea radius from the corpse.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Pyromancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Fireball',
          rank: 3,
          roles: ['clear'],
          attack: {
            hit: '\\damageranktwo.',
            targeting: 'Make an attack vs. Reflex against everything in a \\smallarea radius within \\shortrange.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Corpse Explosion and Fireball should not be redundant due to corpse requirement');
    t.end();
  });

  t.test('should not flag spells with different area sizes as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Telekinesis',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Mighty Blastwave',
          rank: 4,
          roles: ['clear'],
          attack: {
            hit: '\\damagerankfive.',
            targeting: 'Make an attack vs. Reflex against everything in a \\smallarea cone from you.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Universal',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Mighty Mystic Blast',
          rank: 4,
          roles: ['clear'],
          attack: {
            hit: '\\damagerankfour.',
            targeting: 'Make an attack vs. Reflex against everything in a \\medarea cone from you.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Mighty Blastwave and Mighty Mystic Blast should not be redundant due to area size differences');
    t.end();
  });

  t.test('should not flag poisons vs instant damage as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Toxicology',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Poison -- Wyvern Venom',
          rank: 3,
          roles: ['execute'],
          attack: {
            hit: 'becomes \\glossterm{poisoned} by wyvern venom.',
            targeting: 'Make an attack vs. Fortitude against one creature.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Vivimancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Blood Calls to Blood',
          rank: 3,
          roles: ['execute'],
          attack: {
            hit: 'takes \\damageranksix.',
            targeting: 'Make an attack vs. Fortitude against one creature.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Poison -- Wyvern Venom and Blood Calls to Blood should not be redundant due to poison condition');
    t.end();
  });

  t.test('should not flag delayed spells vs immediate spells as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Aeromancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Call Dust Devil',
          rank: 3,
          roles: ['clear'],
          attack: {
            hit: '\\damagerankfive.',
            targeting: 'At the start of your next turn, the dust devil forms...',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Aquamancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Fountain',
          rank: 3,
          roles: ['clear'],
          attack: {
            hit: '\\damagerankthree.',
            targeting: 'Make an attack against all enemies within a \\smallarea radius from you.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Call Dust Devil and Fountain should not be redundant due to delayed vs immediate damage');
    t.end();
  });

  t.test('should prioritize self range parsing over secondary range keywords', (t) => {
    // Test that Fountain parses as range 'self' even though it contains '\shortrange' in text
    const spell: SpellDefinition = {
      name: 'Fountain',
      rank: 3,
      roles: ['clear'],
      attack: {
        hit: '\\damagerankthree.',
        targeting: 'Make an attack against all enemies within a \\smallarea radius from you. If there is water within \\shortrange...',
      },
    };
    const profile = buildSpellProfile(spell, 'Aquamancy');
    t.equal(profile.range, 'self', 'Fountain range should be parsed as self, prioritizing "from you" over "\\shortrange"');
    t.end();
  });

  t.test('should not flag chain area spells vs single target spells as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Electromancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Arc',
          rank: 1,
          roles: ['burst'],
          attack: {
            hit: '\\damagerankone.',
            targeting: 'Make an attack vs. Fortitude against something within \\shortrange. This attack chains once.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Thaumaturgy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Negate',
          rank: 1,
          roles: ['burst'],
          attack: {
            hit: '\\damagerankthree.',
            targeting: 'Make an attack vs. Fortitude against one creature within \\shortrange. This attack automatically fails if...',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Arc and Negate should not be redundant due to area shape (chain vs single) and failure condition');
    t.end();
  });

  t.test('should count attunement as a balancing cost factor and not flag inconsistent damage', (t) => {
    const sphere1: MysticSphere = {
      name: 'Electromancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Lightning Breath',
          rank: 3,
          roles: ['clear'],
          type: 'Attune',
          attack: {
            hit: '\\damagerankthree.',
            targeting: 'Make an attack vs. Reflex against everything in a line from you.',
          },
        },
        {
          name: 'Lightning Bolt',
          rank: 3,
          roles: ['clear'],
          attack: {
            hit: '\\damageranktwo.',
            targeting: 'Make an attack vs. Reflex against everything in a line from you.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.ok(redundancy, 'Should find redundancy (duplicate designs)');
    
    const inconsistency = issues.find((issue) => issue.type === 'inconsistent_damage');
    t.notOk(inconsistency, 'Should not report inconsistent damage since Lightning Breath is an Attune spell');
    t.end();
  });

  t.test('should not flag damaging vs non-damaging spells as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Channel Divinity',
      shortDescription: 'Test',
      sources: ['divine'],
      spells: [
        {
          name: 'Word of Faith',
          rank: 2,
          roles: ['clear'],
          attack: {
            hit: '\\damagerankone.',
            targeting: 'Make an attack vs. Mental against all enemies in a \\smallarea radius from you.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Umbramancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Fearsome Shadow Cloak',
          rank: 2,
          roles: ['generator'],
          attack: {
            hit: 'The target is \\briefly \\frightened of you.',
            targeting: 'Make an attack vs. Mental against all enemies in a \\smallarea radius from you.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Word of Faith and Fearsome Shadow Cloak should not be redundant because one deals damage and the other does not');
    t.end();
  });

  t.test('should not flag healing vs non-healing spells as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Vivimancy',
      shortDescription: 'Test',
      sources: ['nature'],
      spells: [
        {
          name: 'Lifesteal',
          rank: 2,
          roles: ['burst', 'healing'],
          attack: {
            hit: '\\damagerankone.',
            injury: 'If you increase fatigue, you regain \\hprankfive.',
            targeting: 'Make an attack vs. Fortitude against one creature within \\medrange.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Prayer',
      shortDescription: 'Test',
      sources: ['nature'],
      spells: [
        {
          name: 'Inflict Wound',
          rank: 2,
          roles: ['execute'],
          attack: {
            hit: '\\damagerankone.',
            injury: '\\damagerankone again.',
            targeting: 'Make an attack vs. Fortitude against one creature within \\medrange.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Lifesteal and Inflict Wound should not be redundant because one heals and the other does not');
    t.end();
  });

  t.test('should not flag growing vs static area spells as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Terramancy',
      shortDescription: 'Test',
      sources: ['nature'],
      spells: [
        {
          name: 'Volcano',
          rank: 3,
          roles: ['clear'],
          attack: {
            hit: '\\damagerankone.',
            targeting: 'You create a volcano. The area affected by the volcano increases over time. It affects a \\smallarea radius zone in the first turn.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Pyromancy',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Fireball',
          rank: 3,
          roles: ['clear'],
          attack: {
            hit: '\\damageranktwo.',
            targeting: 'Make an attack vs. Reflex against everything in a \\smallarea radius within \\shortrange.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Volcano and Fireball should not be redundant because Volcano area increases over time');
    t.end();
  });

  t.test('should not flag standard action vs reactive/triggered spells as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Channel Divinity',
      shortDescription: 'Test',
      sources: ['divine'],
      spells: [
        {
          name: 'Fearful Awe',
          rank: 1,
          roles: ['flash'],
          attack: {
            hit: 'The target is \\briefly \\frightened by you.',
            targeting: 'Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Enchantment',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Curated Threat',
          rank: 1,
          roles: ['attune'],
          type: 'Attune',
          attack: {
            hit: "The target's assessment of the threat matches your intention.",
            targeting: 'Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Fearful Awe and Curated Threat should not be redundant due to reactive/triggered difference and different conditions');
    t.end();
  });

  t.test('should not flag spells with different conditions as redundant', (t) => {
    const sphere1: MysticSphere = {
      name: 'Channel Divinity',
      shortDescription: 'Test',
      sources: ['divine'],
      spells: [
        {
          name: 'Enduring Fearful Awe',
          rank: 6,
          roles: ['flash'],
          attack: {
            hit: 'The target is \\frightened by you as a \\glossterm{condition}.',
            targeting: 'Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.',
          },
        },
      ],
    };

    const sphere2: MysticSphere = {
      name: 'Enchantment',
      shortDescription: 'Test',
      sources: ['arcane'],
      spells: [
        {
          name: 'Intense Fearsome Aura',
          rank: 6,
          roles: ['attune'],
          type: 'Attune (deep)',
          attack: {
            hit: 'The target is \\panicked by you until your next turn.',
            targeting: 'Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.',
          },
        },
      ],
    };

    const issues = validateSpells([sphere1, sphere2]);
    const redundancy = issues.find((issue) => issue.type === 'redundancy');
    t.notOk(redundancy, 'Enduring Fearful Awe and Intense Fearsome Aura should not be redundant due to condition differences (frightened vs panicked)');
    t.end();
  });

  t.test('almost equivalent spells validation', (t) => {
    t.test('should flag spells that are almost equivalent with exactly one difference', (t) => {
      const sphere1: MysticSphere = {
        name: 'Cryomancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Bonechill',
            rank: 2,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankfive.',
              targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
            },
          },
          {
            name: 'Cripple',
            rank: 2,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankfive.',
              targeting: 'Make an attack vs. Fortitude against a creature within \\medrange.',
            },
          },
        ],
      };

      // Case 1: Option disabled (should not find almost_equivalent)
      const issuesDisabled = validateSpells([sphere1]);
      const almost1 = issuesDisabled.find((issue) => issue.type === 'almost_equivalent');
      t.notOk(almost1, 'Should not find almost equivalent when option is omitted');

      // Case 2: Option enabled (should find almost_equivalent under differs by range)
      const issuesEnabled = validateSpells([sphere1], { showApproximate: true });
      const almost2 = issuesEnabled.find((issue) => issue.type === 'almost_equivalent');
      t.ok(almost2, 'Should find almost equivalent when option is enabled');
      t.equal(almost2?.differenceField, 'range');
      t.match(almost2?.message || '', /differ only by range/);

      t.end();
    });

    t.test('should enforce rank difference limit of 1', (t) => {
      const sphere1: MysticSphere = {
        name: 'Cryomancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Ice Spear',
            rank: 1,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankfive.',
              targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
            },
          },
          {
            name: 'Great Ice Spear',
            rank: 3,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankfive.',
              targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
            },
          },
        ],
      };

      const issues = validateSpells([sphere1], { showApproximate: true });
      const almost = issues.find((issue) => issue.type === 'almost_equivalent');
      t.notOk(almost, 'Should not flag spells as almost equivalent if rank difference is greater than 1');
      t.end();
    });

    t.test('should enforce same damage presence constraint', (t) => {
      const sphere1: MysticSphere = {
        name: 'Cryomancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Bonechill',
            rank: 2,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankfive.',
              targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
            },
          },
          {
            name: 'Freezing Touch',
            rank: 2,
            roles: ['burst'],
            attack: {
              hit: 'The target is frozen.', // No damagerank
              targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
            },
          },
        ],
      };

      const issues = validateSpells([sphere1], { showApproximate: true });
      const almost = issues.find((issue) => issue.type === 'almost_equivalent');
      t.notOk(almost, 'Should not flag spells as almost equivalent if one is damaging and the other is not');
      t.end();
    });

    t.end();
  });

  t.test('strictly superior spells validation', (t) => {
    t.test('should flag Thunderdash vs Flame Dash', (t) => {
      const sphere1: MysticSphere = {
        name: 'Electromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
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
          },
        ],
      };

      const sphere2: MysticSphere = {
        name: 'Pyromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
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
          },
        ],
      };

      const issues = validateSpells([sphere1, sphere2]);
      const superior = issues.find((issue) => issue.type === 'strictly_superior');
      t.ok(superior, 'Should flag Thunderdash vs Flame Dash');
      t.equal(superior?.spells.includes('Thunderdash'), true);
      t.equal(superior?.spells.includes('Flame Dash'), true);
      t.match(superior?.message || '', /Thunderdash.*strictly superior.*Flame Dash/);
      t.end();
    });

    t.test('should not flag as strictly superior if the upgraded spell has a balancing cost factor', (t) => {
      const sphere1: MysticSphere = {
        name: 'Electromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Charged Thunderdash',
            rank: 3,
            roles: ['clear', 'dive'],
            cost: '1 fatigue',
            attack: {
              hit: '\\damagerankthree.',
              injury: 'The target is \\briefly \\deafened.',
              halfOnMiss: true,
              targeting: `
                You teleport into an unoccupied destination on a stable surface within \\shortrange.
                In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
              `,
            },
          },
        ],
      };

      const sphere2: MysticSphere = {
        name: 'Pyromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
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
          },
        ],
      };

      const issues = validateSpells([sphere1, sphere2]);
      const superior = issues.find((issue) => issue.type === 'strictly_superior');
      t.notOk(superior, 'Should not flag when there is a balancing cost factor');
      t.end();
    });

    t.test('should not flag if the better spell has a higher rank', (t) => {
      const sphere1: MysticSphere = {
        name: 'Electromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
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
          },
        ],
      };

      const sphere2: MysticSphere = {
        name: 'Pyromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
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
          },
        ],
      };

      const issues = validateSpells([sphere1, sphere2]);
      const superior = issues.find((issue) => issue.type === 'strictly_superior');
      t.notOk(superior, 'Should not flag since rank 4 spell being better than rank 3 is expected');
      t.end();
    });

    t.test('should handle specific user-reported superiority edge cases correctly', (t) => {
      // 1. Dust Cloud vs Flame Aura (Flame Aura deals damagerankzero)
      const dustCloud: MysticSphere = {
        name: 'Aeromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Dust Cloud',
            rank: 3,
            roles: ['flash'],
            attack: {
              hit: 'The target is \\dazzled.',
              targeting: 'Make an attack vs. Reflex against each creature in a \\smallarea radius within \\shortrange.',
            },
          },
        ],
      };

      const flameAura: MysticSphere = {
        name: 'Pyromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Flame Aura',
            rank: 4,
            roles: ['attune'],
            attack: {
              hit: '\\damagerankzero.',
              targeting: 'Heat constantly radiates in a \\smallarea radius emanation from you.',
            },
          },
        ],
      };

      // 2. Garotte vs Mighty Shielding Windblast (Mighty Shielding Windblast shields)
      const garotte: MysticSphere = {
        name: 'Fabrication',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Garotte',
            rank: 4,
            roles: ['burst'],
            attack: {
              hit: '\\damageranksix.',
              targeting: 'Make an attack vs. Reflex and Brawn against one creature within \\shortrange.',
            },
          },
        ],
      };

      const windblast: MysticSphere = {
        name: 'Aeromancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Mighty Shielding Windblast',
            rank: 5,
            roles: ['clear', 'turtle'],
            attack: {
              hit: '\\damagerankfive.',
              targeting: 'Make an attack vs. Brawn and Reflex against all adjacent. Then, you are \\briefly \\shielded.',
            },
          },
        ],
      };

      // 3. Desiccate vs Drowning Grasp (conditional accuracy and injury debuff)
      const desiccate: MysticSphere = {
        name: 'Aquamancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Desiccate',
            rank: 2,
            roles: ['burst'],
            attack: {
              hit: '\\damagerankthree.',
              targeting: 'Make an attack vs. Fortitude against one creature within \\shortrange. You gain +2 accuracy if target is native to water.',
            },
          },
        ],
      };

      const drowningGrasp: MysticSphere = {
        name: 'Aquamancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Drowning Grasp',
            rank: 2,
            roles: ['burst', 'maim'],
            attack: {
              hit: '\\damageranktwo.',
              injury: 'The target becomes unable to breathe air as a \\glossterm{condition}.',
              targeting: 'Make an attack vs. Fortitude against one creature you touch.',
            },
          },
        ],
      };

      // 4. Aquajet Grasp vs Dark Grasp (Dark Grasp has difficult terrain debuff on injury)
      const aquajetGrasp: MysticSphere = {
        name: 'Aquamancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Aquajet Grasp',
            rank: 1,
            roles: ['burst', 'maim'],
            attack: {
              hit: '\\damageranktwo.',
              injury: 'You fling it.',
              targeting: 'Make an attack vs. Brawn against one creature you touch.',
            },
          },
        ],
      };

      const darkGrasp: MysticSphere = {
        name: 'Umbramancy',
        shortDescription: 'Test',
        sources: ['arcane'],
        spells: [
          {
            name: 'Dark Grasp',
            rank: 1,
            roles: ['burst', 'maim'],
            attack: {
              hit: '\\damageranktwolow.',
              injury: 'As a condition, target treats dim illumination as difficult terrain.',
              targeting: 'Make an attack vs. Brawn against something adjacent.',
            },
          },
        ],
      };

      const issues1 = validateSpells([dustCloud, flameAura]);
      t.notOk(issues1.find(i => i.type === 'strictly_superior'), 'Dust Cloud vs Flame Aura');

      const issues2 = validateSpells([garotte, windblast]);
      t.notOk(issues2.find(i => i.type === 'strictly_superior'), 'Garotte vs Mighty Shielding Windblast');

      const issues3 = validateSpells([desiccate, drowningGrasp]);
      t.notOk(issues3.find(i => i.type === 'strictly_superior'), 'Desiccate vs Drowning Grasp');

      const issues4 = validateSpells([aquajetGrasp, darkGrasp]);
      t.notOk(issues4.find(i => i.type === 'strictly_superior'), 'Aquajet Grasp vs Dark Grasp');

      t.end();
    });

    t.end();
  });

  t.end();
});

