import t from 'tap';
import { inferExpectedRoles, validateSpellRoles } from './validate_roles';
import { buildSpellProfile, stripGlossterm } from './spell_profile';
import { SpellDefinition } from './active_abilities';
import { MysticSphere } from './mystic_spheres';

t.test('validate_roles', (t) => {
  t.test('stripGlossterm', (t) => {
    t.equal(
      stripGlossterm('The target is \\dazed as a \\glossterm{condition}.'),
      'The target is \\dazed as a condition.',
      'should strip single glossterm',
    );
    t.equal(
      stripGlossterm('\\glossterm{allies} and \\glossterm{enemies} in the \\glossterm{zone}'),
      'allies and enemies in the zone',
      'should strip multiple glossterms',
    );
    t.equal(
      stripGlossterm('plain text without wrappers'),
      'plain text without wrappers',
      'should leave plain text unchanged',
    );
    t.equal(stripGlossterm(''), '', 'should handle empty string');
    t.end();
  });

  t.test('inferExpectedRoles', (t) => {
    t.test('should infer burst for short-range single-target damage', (t) => {
      const spell: SpellDefinition = {
        name: 'Firebolt',
        rank: 1,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankone.',
          targeting: 'Make an attack vs. Armor against one creature within \\shortrange.',
        },
      };
      const profile = buildSpellProfile(spell, 'Aeromancy');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('burst'), 'Should infer burst');
      t.notOk(roles.has('snipe'), 'Should not infer snipe');
      t.notOk(roles.has('clear'), 'Should not infer clear');
      t.end();
    });

    t.test('should infer clear for area damage', (t) => {
      const spell: SpellDefinition = {
        name: 'Fireball',
        rank: 3,
        roles: ['clear'],
        attack: {
          hit: '\\damagerankthree.',
          targeting:
            'Make an attack vs. Reflex against all creatures in a \\medarea radius within \\medrange.',
        },
      };
      const profile = buildSpellProfile(spell, 'Aeromancy');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('clear'), 'Should infer clear');
      t.notOk(roles.has('burst'), 'Should not infer burst');
      t.end();
    });

    t.test('should infer snipe for long range and distant range damage', (t) => {
      const spellLong: SpellDefinition = {
        name: 'Windslash',
        rank: 3,
        roles: ['clear', 'snipe'],
        attack: {
          hit: '\\damageranktwo.',
          targeting: 'Make an attack vs. Armor against up to two targets within \\longrange.',
        },
      };
      const profileLong = buildSpellProfile(spellLong, 'Aeromancy');
      const rolesLong = inferExpectedRoles(spellLong, profileLong);
      t.ok(rolesLong.has('snipe'), 'Should infer snipe for long range');
      t.ok(rolesLong.has('clear'), 'Should infer clear for multi-target');

      const spellDist: SpellDefinition = {
        name: 'Windsnipe',
        rank: 4,
        roles: ['snipe'],
        attack: {
          hit: '\\damageranktwo.',
          targeting: 'Make an attack vs. Armor against something within \\distrange.',
        },
      };
      const profileDist = buildSpellProfile(spellDist, 'Aeromancy');
      const rolesDist = inferExpectedRoles(spellDist, profileDist);
      t.ok(rolesDist.has('snipe'), 'Should infer snipe for distant range');
      t.end();
    });

    t.test(
      'should infer softener for persistent conditions across areas (like Dust Storm)',
      (t) => {
        const spell: SpellDefinition = {
          name: 'Dust Storm',
          rank: 5,
          roles: ['softener'],
          type: 'Sustain (standard)',
          attack: {
            crit: 'The target is also \\briefly \\blinded.',
            hit: 'The target is \\dazzled as a \\glossterm{condition}.',
            targeting:
              'You create a dust storm in a \\glossterm{zone} around you. When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against all \\glossterm{enemies} in the area.',
          },
        };
        const profile = buildSpellProfile(spell, 'Aeromancy');
        const roles = inferExpectedRoles(spell, profile);
        t.ok(roles.has('softener'), 'Should infer softener for area persistent condition');
        t.notOk(roles.has('flash'), 'Should not infer flash for persistent condition');
        t.notOk(roles.has('hazard'), 'Should not infer hazard for sustain (standard)');
        t.end();
      },
    );

    t.test('should infer hazard for sustain (minor) persistent zone', (t) => {
      const spell: SpellDefinition = {
        name: 'Wind Tunnel',
        rank: 3,
        roles: ['hazard'],
        type: 'Sustain (minor)',
        attack: {
          hit: 'The target is \\glossterm{pushed} 15 feet.',
          targeting:
            'You create a continuous blast of wind in a \\largearealong line-shaped \\glossterm{zone} from you. When you cast this spell, and during each of your subsequent actions, make an attack vs. Brawn against everything in the area.',
        },
      };
      const profile = buildSpellProfile(spell, 'Aeromancy');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('hazard'), 'Should infer hazard for sustain (minor) zone');
      t.end();
    });

    t.test('should infer hazard for attunable zone effects (like Fog Cloud)', (t) => {
      const fogCloud: SpellDefinition = {
        name: 'Fog Cloud',
        rank: 3,
        roles: ['attune', 'flash', 'hazard'],
        type: 'Sustain (attunable, standard)',
        effect: `
          A cloud of fog appears in a \\smallarea radius \\glossterm{zone} within \\medrange.
          The fog provides \\glossterm{concealment} for anything within or seen through the area.
        `,
      };
      const profile = buildSpellProfile(fogCloud, 'Aquamancy');
      const roles = inferExpectedRoles(fogCloud, profile);
      t.ok(roles.has('attune'), 'Should infer attune for attunable sustain spell');
      t.ok(roles.has('hazard'), 'Should infer hazard for attunable zone spell');

      const persistentFog: SpellDefinition = {
        name: 'Persistent Fog Cloud',
        rank: 6,
        roles: ['flash', 'hazard'],
        type: 'Sustain (attunable, minor)',
        effect: `
          A cloud of fog appears in a \\medarea radius \\glossterm{zone} within \\medrange.
          The fog provides \\glossterm{concealment} for anything within or seen through the area.
        `,
      };
      const profilePersistent = buildSpellProfile(persistentFog, 'Aquamancy');
      const rolesPersistent = inferExpectedRoles(persistentFog, profilePersistent);
      t.ok(rolesPersistent.has('hazard'), 'Should infer hazard for minor sustain attunable zone');
      t.end();
    });

    t.test('should infer flash for brief multi-target debuffs', (t) => {
      const spell: SpellDefinition = {
        name: 'Windseal',
        rank: 4,
        roles: ['flash'],
        attack: {
          hit: 'The target is \\briefly \\slowed.',
          targeting: 'Make an attack vs. Brawn against up to three creatures within \\medrange.',
        },
      };
      const profile = buildSpellProfile(spell, 'Aeromancy');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('flash'), 'Should infer flash for brief multi-target debuff');
      t.notOk(roles.has('softener'), 'Should not infer softener for brief debuff');
      t.end();
    });

    t.test('should infer trip for brief single-target debuffs', (t) => {
      const spell: SpellDefinition = {
        name: 'Single Dazzle',
        rank: 1,
        roles: ['trip'],
        attack: {
          hit: 'The target is \\briefly \\dazzled.',
          targeting: 'Make an attack vs. Reflex against one creature within \\shortrange.',
        },
      };
      const profile = buildSpellProfile(spell, 'Aeromancy');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('trip'), 'Should infer trip');
      t.notOk(roles.has('flash'), 'Should not infer flash');
      t.end();
    });

    t.test('should infer maim for injury debuffs', (t) => {
      const spell: SpellDefinition = {
        name: 'Buffet',
        rank: 2,
        roles: ['maim'],
        attack: {
          hit: 'If the target is \\glossterm{injured}, you \\glossterm{fling} it up to 15 feet.',
          targeting: 'Make an attack vs. Brawn against one creature within \\medrange.',
        },
      };
      const profile = buildSpellProfile(spell, 'Aeromancy');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('maim'), 'Should infer maim');
      t.notOk(roles.has('trip'), 'Should not infer trip');
      t.end();
    });

    t.test(
      'should infer maim and burst (not trip) for functionsLike spell scaling injury debuff (like Intense Aquajet Grasp)',
      (t) => {
        const intenseAquajet: SpellDefinition = {
          name: 'Intense Aquajet Grasp',
          rank: 6,
          roles: ['burst', 'maim'],
          scaling: 'damage',
          functionsLike: {
            name: 'aquajet grasp',
            exceptThat:
              'the damage increases to \\damagerankeight, any \\glossterm{extra damage} is doubled, and the fling distance increases to 30 feet.',
          },
        };
        const profile = buildSpellProfile(intenseAquajet, 'Aquamancy');
        const roles = inferExpectedRoles(intenseAquajet, profile);
        t.ok(roles.has('burst'), 'Should infer burst');
        t.ok(roles.has('maim'), 'Should infer maim');
        t.notOk(roles.has('trip'), 'Should not infer trip for injury-only fling');
        t.end();
      },
    );

    t.test('should infer clear and turtle for multi-role attack + shield spell', (t) => {
      const spell: SpellDefinition = {
        name: 'Shielding Windblast',
        rank: 2,
        roles: ['clear', 'turtle'],
        attack: {
          hit: '\\damageranktwo.',
          targeting:
            'Make an attack vs. Brawn and Reflex against all \\glossterm{enemies} adjacent to you. Then, you are \\briefly \\shielded.',
        },
      };
      const profile = buildSpellProfile(spell, 'Aeromancy');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('clear'), 'Should infer clear');
      t.ok(roles.has('turtle'), 'Should infer turtle');
      t.end();
    });

    t.test('should ignore crit effects when determining roles', (t) => {
      const spell: SpellDefinition = {
        name: 'Crit Condition Attack',
        rank: 1,
        roles: ['burst'],
        attack: {
          crit: 'The target is \\blinded as a \\glossterm{condition}.',
          hit: '\\damagerankone.',
          targeting: 'Make an attack vs. Armor against one creature within \\shortrange.',
        },
      };
      const profile = buildSpellProfile(spell, 'Aeromancy');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('burst'), 'Should infer burst');
      t.notOk(roles.has('softener'), 'Should not infer softener from crit text');
      t.end();
    });

    t.end();
  });

  t.test('validateSpellRoles', (t) => {
    t.test('should flag missing and unexpected roles', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Aeromancy',
        shortDescription: 'Test',
        sources: ['nature'],
        spells: [
          {
            name: 'Mismatched Dust Storm',
            rank: 5,
            roles: ['flash'], // Should be softener!
            type: 'Sustain (standard)',
            attack: {
              hit: 'The target is \\dazzled as a \\glossterm{condition}.',
              targeting:
                'You create a dust storm in a \\glossterm{zone} around you. When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against all \\glossterm{enemies} in the area.',
            },
          },
          {
            name: 'Incomplete Shield Blast',
            rank: 2,
            roles: ['clear'], // Missing turtle!
            attack: {
              hit: '\\damageranktwo.',
              targeting:
                'Make an attack vs. Brawn and Reflex against all \\glossterm{enemies} adjacent to you. Then, you are \\briefly \\shielded.',
            },
          },
        ],
      };

      const issues = validateSpellRoles([mockSphere]);
      t.ok(
        issues.some(
          (i) =>
            i.spellName === 'Mismatched Dust Storm' &&
            i.type === 'missing_role' &&
            i.role === 'softener',
        ),
        'Should flag missing softener on Mismatched Dust Storm',
      );
      t.ok(
        issues.some(
          (i) =>
            i.spellName === 'Mismatched Dust Storm' &&
            i.type === 'unexpected_role' &&
            i.role === 'flash',
        ),
        'Should flag unexpected flash on Mismatched Dust Storm',
      );
      t.ok(
        issues.some(
          (i) =>
            i.spellName === 'Incomplete Shield Blast' &&
            i.type === 'missing_role' &&
            i.role === 'turtle',
        ),
        'Should flag missing turtle on Incomplete Shield Blast',
      );
      t.end();
    });

    t.test('should accept hazard role on attunable zone spells like Fog Cloud', (t) => {
      const mockSphere: MysticSphere = {
        name: 'Aquamancy',
        shortDescription: 'Test',
        sources: ['nature'],
        spells: [
          {
            name: 'Fog Cloud',
            rank: 3,
            roles: ['attune', 'hazard'],
            tags: ['Manifestation'],
            type: 'Sustain (attunable, standard)',
            effect: `
              A cloud of fog appears in a \\smallarea radius \\glossterm{zone} within \\medrange.
              The fog provides \\glossterm{concealment} for anything within or seen through the area.
            `,
          },
        ],
      };

      const issues = validateSpellRoles([mockSphere]);
      t.notOk(
        issues.some((i) => i.spellName === 'Fog Cloud' && i.role === 'hazard'),
        'Should not flag hazard as unexpected or invalid on Fog Cloud',
      );
      t.end();
    });

    t.end();
  });

  t.end();
});
