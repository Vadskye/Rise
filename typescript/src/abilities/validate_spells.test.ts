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
    t.equal(profile.range, 'short');
    t.same(profile.defenses, ['fortitude']);
    t.equal(profile.area, 'single');
    t.equal(profile.areaSize, 'none');
    t.equal(profile.damageRank, 5);
    t.equal(profile.isLowPower, false);
    t.same(profile.conditions, ['slowed']);
    t.equal(profile.accuracyModifier, 0);
    t.same(profile.specialRequirements, []);
    t.equal(profile.isDelayed, true);
    t.equal(profile.hasCost, true);
    t.same(profile.roles, ['burst', 'maim']);
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

  t.end();
});
