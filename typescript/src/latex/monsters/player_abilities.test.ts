import t from 'tap';
import {
  reformatAttackTargeting,
  standardizeModifierSign,
  calculateStrikeDamage,
  reformatAsMonsterAbility,
  restructureStrikeAbility,
  reformatAttackConsequences,
  calculateDamage,
  StrikeActiveAbility,
} from './player_abilities';
import { ActiveAbility, standardizeManeuver } from '@src/abilities';
import { Creature } from '@src/character_sheet/creature';
import { getManeuverByName } from '@src/abilities/combat_styles';

t.test('reformatAttackTargeting', (t) => {
  const simpleCreature = Creature.new();
  simpleCreature.setProperties({
    level: 10,
  });

  // TODO: figure out type of 't'
  function testTargeting(localT: any, original: string, expected: string) {
    const mockSpell: Partial<ActiveAbility> = {
      attack: {
        hit: 'stuff',
        targeting: original,
      },
    };
    const reformatted = structuredClone(mockSpell);
    reformatAttackTargeting(simpleCreature, reformatted as any);
    localT.matchStrict(reformatted.attack, {
      hit: 'stuff',
      targeting: expected,
    });
  }

  t.test('Calculating accuracy', (t) => {
    t.test('With a numeric accuracy bonus', (t) => {
      testTargeting(
        t,
        `Make an attack vs. Mental with a +4 accuracy bonus against something.`,
        `The $name makes a $accuracy+4 attack vs. Mental against something.`,
      );
      t.end();
    });

    t.test('With a numeric accuracy penalty', (t) => {
      testTargeting(
        t,
        `Make an attack vs. Mental with a -8 accuracy penalty against something.`,
        `The $name makes a $accuracy-8 attack vs. Mental against something.`,
      );
      t.end();
    });

    t.test('With a \\plus accuracy bonus', (t) => {
      testTargeting(
        t,
        `Make an attack vs. Mental with a \\plus2 accuracy bonus against something.`,
        `The $name makes a $accuracy+2 attack vs. Mental against something.`,
      );
      t.end();
    });

    t.test('With a \\minus accuracy penalty', (t) => {
      testTargeting(
        t,
        `Make an attack vs. Mental with a \\minus3 accuracy bonus against something.`,
        `The $name makes a $accuracy-3 attack vs. Mental against something.`,
      );
      t.end();
    });

    t.test('With a \\glossterm{accuracy} bonus', (t) => {
      testTargeting(
        t,
        `
          Make an attack vs. Mental with a +4 \\glossterm{accuracy} bonus against something.
        `,
        `
          The $name makes a $accuracy+4 attack vs. Mental against something.
        `,
      );
      t.end();
    });

    t.test('With accuracy scaling', (t) => {
      const mockSpell: Partial<ActiveAbility> = {
        attack: {
          hit: 'stuff',
          targeting: 'Make an attack vs. Mental against something.',
        },
        rank: 1,
        scaling: 'accuracy',
      };
      const reformatted = structuredClone(mockSpell);
      reformatAttackTargeting(simpleCreature, reformatted as any);
      t.matchStrict(reformatted.attack, {
        hit: 'stuff',
        // 10th level, so rank 4, vs rank 1 spell
        targeting: 'The $name makes a $accuracy+3 attack vs. Mental against something.',
      });
      t.end();
    });

    t.end();
  });

  t.test('Replacing "you"', (t) => {
    t.test('With standard attack syntax', (t) => {
      testTargeting(
        t,
        `
          Make an attack vs. Mental against something.
        `,
        `
          The $name makes a $accuracy attack vs. Mental against something.
        `,
      );
      t.end();
    });

    t.test('With an area that mentions "you"', (t) => {
      testTargeting(
        t,
        `
          Make an attack vs. Mental against all enemies in a Medium cone from you.
        `,
        `
          The $name makes a $accuracy attack vs. Mental against all enemies in a Medium cone from itself.
        `,
      );
      t.end();
    });

    t.test('With an area that mentions "you" and a followup conditional "you"', (t) => {
      testTargeting(
        t,
        `
          Make an attack vs. Mental against all enemies in a Medium cone from you.
          You gain a +2 accuracy bonus against each \\glossterm{shadowed} target.
        `,
        `
          The $name makes a $accuracy attack vs. Mental against all enemies in a Medium cone from itself.
          It gains a +2 accuracy bonus against each \\glossterm{shadowed} target.
        `,
      );
      t.end();
    });

    t.end();
  });

  t.end();
});

t.test('standardizeModifierSign', (t) => {
  t.equal(standardizeModifierSign('-'), '-');
  t.equal(standardizeModifierSign('\\minus'), '-');
  t.equal(standardizeModifierSign('+'), '+');
  t.equal(standardizeModifierSign('\\plus'), '+');
  t.throws(
    () => standardizeModifierSign('invalid'),
    new Error("Unable to parse LaTeX modifier sign 'invalid'"),
  );
  t.end();
});

t.test('calculateStrikeDamage', (t) => {
  const mockCreature = {
    getRelevantPower: (isMagical: boolean) => (isMagical ? 4 : 10),
  } as any;

  t.test('with no damage multiplier', (t) => {
    const ability = {
      weapon: 'bite',
      effect: 'deals damage',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(mockCreature, ability), '1d8+10');
    t.end();
  });

  t.test('with double damage multiplier', (t) => {
    const ability = {
      weapon: 'claws',
      effect: 'Make a strike that deals double damage',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(mockCreature, ability), '4d4+10');
    t.end();
  });

  t.test('with extra damage', (t) => {
    const ability = {
      weapon: 'bite',
      effect:
        'Make a strike that deals 7 \\glossterm{extra damage}.',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(mockCreature, ability), '1d8+17');
    t.end();
  });

  t.test('with double weapon damage and extra damage', (t) => {
    const ability = {
      weapon: 'bite',
      effect:
        'Make a strike that deals double weapon damage and 13 extra damage.',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(mockCreature, ability), '2d8+23');
    t.end();
  });

  t.test('with triple damage multiplier', (t) => {
    const ability = {
      weapon: 'tentacle',
      effect: 'Make a \\glossterm{strike} that deals triple damage',
      isMagical: true,
    } as any;
    // Lower because this is a magical strike
    t.equal(calculateStrikeDamage(mockCreature, ability), '3d6+12');
    t.end();
  });

  t.test('with quadruple damage multiplier', (t) => {
    const ability = {
      weapon: 'bite',
      effect: 'Make a \\glossterm{strike} that deals quadruple damage',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(mockCreature, ability), '4d8+40');
    t.end();
  });

  t.test('with a 8x weapon damage multiplier', (t) => {
    const ability = {
      weapon: 'claws',
      effect: 'Make a \\glossterm{strike} that deals eight times weapon damage',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(mockCreature, ability), '16d4+5');
    t.end();
  });

  t.test('with a 8x weapon damage multiplier and extra damage', (t) => {
    const ability = {
      weapon: 'claws',
      effect:
        'Make a \\glossterm{strike} that deals eight times weapon damage and 3 extra damage.',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(mockCreature, ability), '16d4+8');
    t.end();
  });

  t.test('with a double damage multiplier and extra damage', (t) => {
    const ability = {
      weapon: 'bite',
      effect:
        'Make a \\glossterm{strike} that deals double damage and 7 extra damage.',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(mockCreature, ability), '2d8+34');
    t.end();
  });

  // Note that ignoring extranous *conditional* text may cause problems, and this test may
  // need to be updated later.
  t.test('With extraneous text and a double weapon damage multiplier', (t) => {
    const ability = {
      weapon: 'bite',
      effect:
        'Make a strike using exactly one turkey leg wrapped around a longsword that deals double weapon damage if it is Tuesday',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(mockCreature, ability), '2d8+10');
    t.end();
  });

  t.test('with negative power', (t) => {
    const creatureWithNegativePower = {
      getRelevantPower: () => -5,
    } as any;
    const ability = {
      weapon: 'bite',
      effect: 'deals damage',
      isMagical: false,
    } as any;
    t.equal(calculateStrikeDamage(creatureWithNegativePower, ability), '1d8-5');
    t.end();
  });

  t.end();
});

t.test('reformatAsMonsterAbility', (t) => {
  let mockCreature: Creature;

  t.beforeEach(() => {
    mockCreature = {
      name: 'Test Monster',
      getRelevantPower: () => 10,
      getSizeBasedSweepingTag: () => 'Sweeping (1)',
    } as any;
  });

  t.test("throws appropriate errors", (t) => {
    t.throws(() => {
      const ability = {
        name: 'Test Ability',
        effect: 'Make a strike.',
      } as any;
      reformatAsMonsterAbility(mockCreature, ability);
    }, new Error('Monster ability Test Monster.Test Ability: Strike ability has no weapon'));

    t.throws(() => {
      const ability = {
        name: 'Test Ability',
        weapon: 'bite',
        effect: 'Make a strike.',
        attack: { hit: 'damage', targeting: 'target' },
      } as any;
      reformatAsMonsterAbility(mockCreature, ability);
    }, new Error('Monster ability Test Monster.Test Ability: Strike ability already makes an explicit attack'));

    t.end();
  });

  t.end();
});

t.test('restructureStrikeAbility', (t) => {
  let mockCreature: Creature;

  t.beforeEach(() => {
    mockCreature = {
      name: 'Test Monster',
      getRelevantPower: () => 10,
      getSizeBasedSweepingTag: () => 'Sweeping (1)',
    } as any;
  });

  t.test('custom circumstances', (t) => {
    t.test('with no accuracy modifier', (t) => {
      const ability = {
        name: 'Test Ability',
        weapon: 'bite',
        effect: 'Make a strike.',
      } as any;
      restructureStrikeAbility(mockCreature, ability);
      t.matchStrict(ability.attack, {
        hit: '1d8+10 damage.',
        targeting: 'The $name makes a $accuracy melee strike vs. Armor with its bite.',
      });
      t.matchStrict(ability.tags, ['Sweeping (1)']);
      t.end();
    });

    t.test('with an extra effect after the strike', (t) => {
      const ability = {
        name: 'Test Ability',
        weapon: 'bite',
        effect:
          'Make a strike. Then, you are \\glossterm{briefly} \\empowered. Next round, you are \\braced.',
      } as any;
      restructureStrikeAbility(mockCreature, ability);
      t.matchStrict(ability.attack, {
        hit: '1d8+10 damage.',
        targeting: 'The $name makes a $accuracy melee strike vs. Armor with its bite. Then, it is \\glossterm{briefly} \\empowered. Next round, it is \\braced.',
      });
      t.end();
    });

    t.test('with an accuracy modifier and an extra effect after the strike', (t) => {
      const ability = {
        name: 'Test Ability',
        weapon: 'talons',
        effect:
          'Make a strike with a +1 accuracy bonus. Then, you are \\glossterm{briefly} \\empowered. Next round, you are \\braced.',
      } as any;
      restructureStrikeAbility(mockCreature, ability);
      t.matchStrict(ability.attack, {
        hit: '2d4+5 damage.',
        targeting: 'The $name makes a $accuracy+3 melee strike vs. Armor with its talons. Then, it is \\glossterm{briefly} \\empowered. Next round, it is \\braced.',
      });
      t.end();
    });

    t.test('with a +accuracy bonus', (t) => {
      const ability = {
        name: 'Test Ability',
        weapon: 'claws',
        effect: 'Make a strike with a +4 accuracy bonus.',
      } as any;
      restructureStrikeAbility(mockCreature, ability);
      t.matchStrict(ability.attack, {
        hit: '2d4+5 damage.',
        targeting: 'The $name makes a $accuracy+6 melee strike vs. Armor with its claws.',
      });
      t.end();
    });

    t.test('with extraneous text and double damage', (t) => {
      const ability = {
        name: 'Test Ability',
        weapon: 'bite',
        effect: 'Make a strike using a longsword with a +4 accuracy bonus that deals double damage.',
      } as any;
      restructureStrikeAbility(mockCreature, ability);
      t.matchStrict(ability.attack, {
        hit: '2d8+20 damage.',
        targeting: 'The $name makes a $accuracy+4 melee strike vs. Armor with its bite.',
      });
      t.end();
    });

    t.test('with a -accuracy penalty', (t) => {
      const ability = {
        name: 'Test Ability',
        weapon: 'stinger',
        effect: 'Make a strike with a -2 accuracy penalty.',
      } as any;
      restructureStrikeAbility(mockCreature, ability);
      t.matchStrict(ability.attack, {
        hit: '1d6+10 damage.',
        targeting: 'The $name makes a $accuracy-1 melee strike vs. Armor with its stinger.',
      });
      t.end();
    });

    t.test('with a \\plus accuracy bonus', (t) => {
      const ability = {
        name: 'Test Ability',
        weapon: 'bite',
        effect: 'Make a strike with a \\plus3 accuracy bonus.',
      } as any;
      restructureStrikeAbility(mockCreature, ability);
      t.matchStrict(ability.attack, {
        hit: '1d8+10 damage.',
        targeting: 'The $name makes a $accuracy+3 melee strike vs. Armor with its bite.',
      });
      t.end();
    });

    t.test('with a \\minus accuracy penalty', (t) => {
      const ability = {
        name: 'Test Ability',
        weapon: 'bite',
        effect: 'Make a strike with a \\minus1 accuracy penalty.',
      } as any;
      restructureStrikeAbility(mockCreature, ability);
      t.matchStrict(ability.attack, {
        hit: '1d8+10 damage.',
        targeting: 'The $name makes a $accuracy-1 melee strike vs. Armor with its bite.',
      });
      t.end();
    });

    t.end();
  });

  t.test('standard maneuvers', (t) => {

    t.test('Mighty Rushdown', (t) => {
      const maneuver = standardizeManeuver({
        ...getManeuverByName('Mighty Rushdown'),
        weapon: 'bite',
      }) as StrikeActiveAbility;
      restructureStrikeAbility(mockCreature, maneuver);

      t.matchOnlyStrict(maneuver, {
        attack: {
          crit: undefined,
          hit: '2d8+10 damage.',
          miss: undefined,
          injury: undefined,
          targeting: "The $name can move up to its speed, then it makes a $accuracy melee strike vs. Armor with its bite.",
        },
        isMagical: false,
        kind: 'maneuver',
        name: 'Mighty Rushdown',
        rank: 3,
        roles: ['dive'],
        tags: ['Sweeping (1)'],
        weapon: 'bite',
      });

      t.end();
    });

    t.end();
  });

  t.end();
});

t.test('reformatAttackConsequences', (t) => {
  const simpleCreature = {
    name: 'Test Monster',
    getRelevantPower: () => 10,
    calculateRank: () => 3,
  } as any;

  t.test('replaces "by you" with "by the $name"', (t) => {
    const ability = {
      attack: {
        hit: 'The target is frightened by you.',
      },
    } as any;
    reformatAttackConsequences(simpleCreature, ability);
    t.equal(ability.attack.hit, 'The target is frightened by the $name.');
    t.end();
  });

  t.test('replaces damage rank in hit, crit, and injury', (t) => {
    const ability = {
      rank: 3,
      isMagical: false,
      attack: {
        hit: '\\damagerankthree.',
        crit: 'Also deals \\damagerankfour.',
        injury: 'And \\damagerankfive.',
      },
    } as any;
    reformatAttackConsequences(simpleCreature, ability);
    t.equal(ability.attack.hit, '1d8\\plus10 damage.');
    t.equal(ability.attack.crit, 'Also deals 5d6 damage.');
    t.equal(ability.attack.injury, 'And 6d6 damage.');
    t.end();
  });

  t.test('replaces non-power damage scaling', (t) => {
    const ability = {
      rank: 3,
      isMagical: false,
      attack: {
        hit: '\\damagerankthreelow.',
      },
    } as any;
    reformatAttackConsequences(simpleCreature, ability);
    t.equal(ability.attack.hit, '2d10 damage.');
    t.end();
  });

  t.test('replaces non-power damage scaling with excess rank', (t) => {
    const ability = {
      rank: 1,
      isMagical: false,
      attack: {
        hit: '\\damagerankfivelow.',
      },
    } as any;
    reformatAttackConsequences(simpleCreature, ability);
    // +4d8 from excess rank
    t.equal(ability.attack.hit, '9d8 damage.');
    t.end();
  });

  t.test('removes extraneous damage text', (t) => {
    const ability = {
      rank: 3,
      isMagical: false,
      attack: {
        hit: 'Deals \\damagerankthree, and any extra damage is doubled.',
      },
    } as any;
    reformatAttackConsequences(simpleCreature, ability);
    t.equal(ability.attack.hit, 'Deals 1d8\\plus10 damage.');
    t.end();
  });

  t.test('clears ability.scaling to undefined if it was "damage"', (t) => {
    const ability = {
      scaling: 'damage',
      attack: {
        hit: 'Deals damage.',
      },
    } as any;
    reformatAttackConsequences(simpleCreature, ability);
    t.equal(ability.scaling, undefined);
    t.end();
  });

  t.test('does not clear ability.scaling if it was not "damage"', (t) => {
    const ability = {
      scaling: 'accuracy',
      attack: {
        hit: 'Deals damage.',
      },
    } as any;
    reformatAttackConsequences(simpleCreature, ability);
    t.equal(ability.scaling, 'accuracy');
    t.end();
  });

  t.end();
});

t.test('calculateDamage', (t) => {
  const rank3Creature = {
    getRelevantPower: () => 10,
    calculateRank: () => 3,
  } as any;

  const rank6Creature = {
    getRelevantPower: () => 10,
    calculateRank: () => 6,
  } as any;

  t.test('dr3 as a rank 3 creature', (t) => {
    const ability = { rank: 3, isMagical: false } as any;
    t.equal(calculateDamage(rank3Creature, ability, 3, false), '1d8\\plus10 damage');
    t.end();
  });

  t.test('dr3 as a rank 3 creature using a rank 1 ability', (t) => {
    const ability = { rank: 1, isMagical: false } as any;
    // +6 from scaling
    t.equal(calculateDamage(rank3Creature, ability, 3, false), '1d8\\plus2d6\\plus10 damage');
    t.end();
  });

  t.test('dr3 as a rank 6 creature', (t) => {
    const ability = { rank: 3, isMagical: false } as any;
    // +9 from scaling
    t.equal(calculateDamage(rank6Creature, ability, 3, false), '1d8\\plus3d6\\plus10 damage');
    t.end();
  });

  t.test('dr4 as a rank 6 creature', (t) => {
    const ability = { rank: 4, isMagical: false } as any;
    // +2d6 from scaling
    t.equal(calculateDamage(rank6Creature, ability, 4, false), '7d6 damage');
    t.end();
  });

  t.end();
});
