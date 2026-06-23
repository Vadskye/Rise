import t from 'tap';
import { validateSpells } from './validate_spells';
import { makeMockSpell, makeMockSphere } from './validate_spells_test_helpers';

t.test('validateSpells: Strictly Superior Spells', (t) => {
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

    const issues = validateSpells([sphere1, sphere2]);
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

      const issues = validateSpells([sphere1, sphere2]);
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

    const issues = validateSpells([sphere1, sphere2]);
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

      const issues = validateSpells([dustCloud, flameAura]);
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
              'Make an attack vs. Reflex and Brawn against one creature within \\shortrange.',
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

      const issues = validateSpells([garotte, windblast]);
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

      const issues = validateSpells([desiccate, drowningGrasp]);
      t.notOk(
        issues.find((i) => i.type === 'strictly_superior'),
        'Should not flag Desiccate vs Drowning Grasp',
      );
      t.end();
    });

    t.test('4. Aquajet Grasp vs Dark Grasp (Dark Grasp has difficult terrain debuff on injury)', (t) => {
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

      const issues = validateSpells([aquajetGrasp, darkGrasp]);
      t.notOk(
        issues.find((i) => i.type === 'strictly_superior'),
        'Should not flag Aquajet Grasp vs Dark Grasp',
      );
      t.end();
    });

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

      const issues = validateSpells([entangle, windseal]);
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

      const issues = validateSpells([windsnipe, distantMM]);
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

      const issues = validateSpells([asphyxiate, livingPyre]);
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

      const issues = validateSpells([desiccateSpell, shadowBlossom]);
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
          roles: ['clear', 'kite'],
          attack: {
            hit: '\\damagerankfour.',
            injury:
              'You \\glossterm{fling} the target up to 15 feet away from you. This fling distance is doubled if the target is Medium or smaller.',
            halfOnMiss: true,
            targeting:
              'Make an attack vs. Reflex and Brawn against everything in a \\largearea cone from you.',
          },
        }),
      ]);

      const issues = validateSpells([massiveWindblast, massiveBlastwave]);
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

        const issues = validateSpells([constrainingBubble, drowningBubble]);
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

      const issues = validateSpells([geyser, kindledFireburst]);
      t.notOk(
        issues.find((i) => i.type === 'strictly_superior'),
        'Should not flag Geyser vs Kindled Fireburst',
      );
      t.end();
    });

    t.test(
      '12. Greater Word of Power vs Curse of Selective Sight (invisible vs dazed/empowered)',
      (t) => {
        const greaterWordOfPower = makeMockSphere('Channel Divinity', [
          makeMockSpell({
            name: 'Greater Word of Power',
            rank: 5,
            roles: ['flash'],
            attack: {
              hit: 'The target is \\briefly \\dazed.',
              targeting:
                'Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you. Then, you are \\briefly \\empowered.',
            },
          }),
        ]);

        const curseOfSelectiveSight = makeMockSphere('Prayer', [
          makeMockSpell({
            name: 'Curse of Selective Sight',
            rank: 5,
            roles: ['maim'],
            attack: {
              hit: 'The target has difficulty looking at you until it finishes a \\glossterm{short rest}. While it is \\glossterm{injured}, it treats you as being \\trait{invisible}.',
              targeting:
                'Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.',
            },
          }),
        ]);

        const issues = validateSpells([greaterWordOfPower, curseOfSelectiveSight]);
        t.notOk(
          issues.find((i) => i.type === 'strictly_superior'),
          'Should not flag Greater Word of Power vs Curse of Selective Sight',
        );
        t.end();
      },
    );

    t.test('13. Slow vs Hostile Timeseal (slowed vs frozen in time/cannot act/returns to normal)', (t) => {
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
          roles: ['maim', 'stasis'],
          attack: {
            hit: 'If the target is \\glossterm{injured}, it becomes \\briefly frozen in time. It becomes completely immune to all damage, attacks, and effects of any kind. In addition, it cannot act in any way, and the duration of other effects on it does not expire. At the end of your next turn, it returns to normal...',
            targeting:
              'Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.',
          },
        }),
      ]);

      const issues = validateSpells([slow, hostileTimeseal]);
      t.notOk(
        issues.find((i) => i.type === 'strictly_superior'),
        'Should not flag Slow vs Hostile Timeseal',
      );
      t.end();
    });

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

      const issues = validateSpells([whirlwindOfBlades, mightyWordOfFaith]);
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
      const issues = validateSpells([testSphere]);
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
          roles: ['wildfire'] as const,
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
      const issues = validateSpells([testSphere]);
      t.notOk(
        issues.find((i) => i.type === 'strictly_superior'),
        'Should not flag Frost Breath vs Flame Breath',
      );
      t.end();
    });

    t.end();
  });

  t.end();
});
