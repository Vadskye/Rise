import t from 'tap';
import { inferExpectedRoles, validateSpellRoles } from './validate_roles';
import { buildSpellProfile, stripGlossterm } from './spell_profile';
import { SpellDefinition } from './active_abilities';
import { MysticSphere } from './mystic_spheres';
import { telekinesis } from './mystic_spheres/telekinesis';
import { umbramancy } from './mystic_spheres/umbramancy';
import { vivimancy } from './mystic_spheres/vivimancy';

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

    t.test('should infer burn for single-target delayed attacks (like Boulder Heave)', (t) => {
      const boulderHeave: SpellDefinition = {
        name: 'Boulder Heave',
        rank: 2,
        roles: ['burn'],
        attack: {
          hit: '\\damagerankthree.',
          targeting: `
            When you cast this spell, you create a boulder in midair above your space and choose a target within \\medrange.
            If the area above you is occupied, this spell fails without effect.
            At the start of your next turn, if that target is still within \\medrange, make a \\glossterm{reactive attack} vs. Armor against it.
            Otherwise, the boulder disappears and this spell is wasted.
          `,
        },
      };
      const profile = buildSpellProfile(boulderHeave, 'Terramancy');
      const roles = inferExpectedRoles(boulderHeave, profile);
      t.ok(roles.has('burn'), 'Should infer burn for delayed single-target reactive attack');
      t.notOk(roles.has('burst'), 'Should not infer burst for delayed attack');
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
      'should infer maim and burst (not trip) for functionsLike spell scaling injury debuff (like Mighty Drowning Grasp)',
      (t) => {
        const mightyDrowning: SpellDefinition = {
          name: 'Mighty Drowning Grasp',
          rank: 6,
          roles: ['burst', 'maim'],
          scaling: 'damage',
          functionsLike: {
            name: 'drowning grasp',
            exceptThat:
              'the damage increases to \\damageranksix, any \\glossterm{extra damage} is doubled.',
          },
        };
        const profile = buildSpellProfile(mightyDrowning, 'Aquamancy');
        const roles = inferExpectedRoles(mightyDrowning, profile);
        t.ok(roles.has('burst'), 'Should infer burst');
        t.ok(roles.has('maim'), 'Should infer maim');
        t.notOk(roles.has('trip'), 'Should not infer trip for injury-only debuff');
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

    t.test('should infer trip for movement-impeding debuffs (like Interposing Force)', (t) => {
      const spell: SpellDefinition = {
        name: 'Interposing Force',
        rank: 2,
        roles: ['trip'],
        attack: {
          hit: 'The target is \\briefly unable to move closer to you without effort.',
          targeting: 'Make an attack vs. Brawn against one creature within \\medrange.',
        },
      };
      const profile = buildSpellProfile(spell, 'Telekinesis');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('trip'), 'Should infer trip for unable to move closer');
      t.end();
    });

    t.test(
      'should infer narrative for object manipulation and weight reduction (like Distant Hand and Telekinetic Lift)',
      (t) => {
        const distantHand: SpellDefinition = {
          name: 'Distant Hand',
          rank: 1,
          roles: ['narrative'],
          effect: `
            Choose one Medium or smaller \\glossterm{unattended} object within \\medrange.
            You can telekinetically control the target object.
            You can carry a small object normally or push a medium object at half speed.
          `,
        };
        const profileHand = buildSpellProfile(distantHand, 'Telekinesis');
        const rolesHand = inferExpectedRoles(distantHand, profileHand);
        t.ok(rolesHand.has('narrative'), 'Should infer narrative for object manipulation');

        const teleLift: SpellDefinition = {
          name: 'Telekinetic Lift',
          rank: 1,
          roles: ['narrative'],
          effect: `
            Choose yourself or one Medium or smaller \\glossterm{unattended} object within \\medrange.
            The target's weight is reduced by one \\glossterm{weight category}.
          `,
        };
        const profileLift = buildSpellProfile(teleLift, 'Telekinesis');
        const rolesLift = inferExpectedRoles(teleLift, profileLift);
        t.ok(rolesLift.has('narrative'), 'Should infer narrative for weight reduction');
        t.end();
      },
    );

    t.test('should infer maim and softener for difficult terrain debuffs', (t) => {
      const darkGrasp: SpellDefinition = {
        name: 'Dark Grasp',
        rank: 1,
        roles: ['burst', 'maim'],
        attack: {
          hit: '\\damagerankthree.',
          injury:
            'As a \\glossterm{condition}, the target treats all areas of \\glossterm{dim illumination} as \\glossterm{difficult terrain}.',
          targeting: 'Make an attack vs. Brawn against something adjacent to you.',
        },
      };
      const profileGrasp = buildSpellProfile(darkGrasp, 'Umbramancy');
      const rolesGrasp = inferExpectedRoles(darkGrasp, profileGrasp);
      t.ok(rolesGrasp.has('burst'), 'Should infer burst for damage');
      t.ok(rolesGrasp.has('maim'), 'Should infer maim for difficult terrain on injury');

      const effGrasp: SpellDefinition = {
        name: 'Efficient Dark Grasp',
        rank: 6,
        roles: ['burst', 'softener'],
        attack: {
          hit: '\\damagerankseven. In addition, the target treats all areas of \\glossterm{dim illumination} as \\glossterm{difficult terrain} as a \\glossterm{condition}.',
          targeting: 'Make an attack vs. Brawn against something adjacent to you.',
        },
      };
      const profileEff = buildSpellProfile(effGrasp, 'Umbramancy');
      const rolesEff = inferExpectedRoles(effGrasp, profileEff);
      t.ok(rolesEff.has('burst'), 'Should infer burst');
      t.ok(rolesEff.has('softener'), 'Should infer softener for uninjured difficult terrain');
      t.end();
    });

    t.test('should infer burn for injury damage over time without expecting execute', (t) => {
      const spell: SpellDefinition = {
        name: 'The Shadows Cut Deep',
        rank: 1,
        roles: ['burn'],
        attack: {
          hit: '\\damagerankone.',
          injury: 'The target \\briefly \\glossterm{bleeds} for \\damagerankone.',
          targeting:
            'Make an attack vs. Armor and Mental against a \\glossterm{shadowed} creature within \\medrange.',
        },
      };
      const profile = buildSpellProfile(spell, 'Umbramancy');
      const roles = inferExpectedRoles(spell, profile);
      t.ok(roles.has('burn'), 'Should infer burn for bleed');
      t.notOk(roles.has('execute'), 'Should not infer execute for bleed DoT');
      t.end();
    });

    t.test('should infer execute (and not burst) for injury-only damage', (t) => {
      const bloodCalls: SpellDefinition = {
        name: 'Blood Calls to Blood',
        rank: 3,
        roles: ['execute'],
        attack: {
          hit: 'If the target is \\glossterm{injured}, it takes \\damageranksix.',
          targeting: 'Make an attack vs. Fortitude against one creature within \\medrange.',
        },
      };
      const profile = buildSpellProfile(bloodCalls, 'Vivimancy');
      const roles = inferExpectedRoles(bloodCalls, profile);
      t.ok(roles.has('execute'), 'Should infer execute');
      t.notOk(roles.has('burst'), 'Should not infer burst for injury-only damage');

      const exsanguinate: SpellDefinition = {
        name: 'Exsanguinate',
        rank: 7,
        roles: ['execute'],
        attack: {
          hit: 'If the target is \\glossterm{injured}, it takes damage equal to half your maximum hit points.',
          targeting: 'Make an attack vs. Fortitude against one creature within \\medrange.',
        },
      };
      const profileEx = buildSpellProfile(exsanguinate, 'Vivimancy');
      const rolesEx = inferExpectedRoles(exsanguinate, profileEx);
      t.ok(rolesEx.has('execute'), 'Should infer execute for HP-based injury damage');
      t.end();
    });

    t.test('should infer payoff for corpse requirement', (t) => {
      const corpseExplosion: SpellDefinition = {
        name: 'Corpse Explosion',
        rank: 3,
        roles: ['clear', 'payoff'],
        attack: {
          hit: '\\damagerankfive.',
          targeting:
            'Choose one Small or larger \\glossterm{unattended} \\glossterm{corpse} within \\shortrange. Make an attack vs. Armor and Reflex against everything within a \\tinyarea radius from the corpse.',
        },
      };
      const profile = buildSpellProfile(corpseExplosion, 'Vivimancy');
      const roles = inferExpectedRoles(corpseExplosion, profile);
      t.ok(roles.has('clear'), 'Should infer clear');
      t.ok(roles.has('payoff'), 'Should infer payoff for corpse requirement');
      t.end();
    });

    t.test('should infer turtle for defensive buffs in hit block', (t) => {
      const intenseSiphon: SpellDefinition = {
        name: 'Intense Siphon Protection',
        rank: 4,
        roles: ['flash', 'turtle'],
        attack: {
          hit: 'The target is \\briefly \\dazed. Then, you are \\briefly \\braced.',
          targeting:
            'Make an attack vs. Fortitude against up to two creatures within \\shortrange.',
        },
      };
      const profile = buildSpellProfile(intenseSiphon, 'Vivimancy');
      const roles = inferExpectedRoles(intenseSiphon, profile);
      t.ok(roles.has('flash'), 'Should infer flash for dazed');
      t.ok(roles.has('turtle'), 'Should infer turtle for braced');
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

    t.test('should validate Telekinesis, Umbramancy, and Vivimancy with zero role issues', (t) => {
      const issues = validateSpellRoles([telekinesis, umbramancy, vivimancy]);
      t.equal(issues.length, 0, `Expected 0 role issues, but found: ${JSON.stringify(issues, null, 2)}`);
      t.end();
    });

    t.end();
  });

  t.end();
});
