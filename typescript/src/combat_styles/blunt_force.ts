import { CombatStyle } from '.';

export const bruteForce: CombatStyle = {
  name: 'Brute Force',
  shortDescription: 'Smash foes with raw power.',

  maneuvers: [
    {
      name: 'Pure Power',

      effect: `
        Make a \\glossterm{strike} with a -4 accuracy penalty.
        The strike deals double \\glossterm{weapon damage}.
      `,
      rank: 1,
      roles: ['burst'],
    },

    {
      name: 'Pure Power+',

      effect: `
        Make a \\glossterm{strike} with a -2 accuracy penalty.
        The strike deals triple \\glossterm{weapon damage}.
      `,
      rank: 5,
      roles: ['burst'],
    },
    {
      name: 'Armorcrusher',

      effect: `
        Make a \\glossterm{strike}.
        The attack is made against the target's Fortitude defense instead of its Armor defense.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Ground Stomp',

      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      rank: 1,
      roles: ['clear'],
      tags: ['Earth'],
    },

    {
      name: 'Ground Stomp+',

      attack: {
        hit: `\\damagerankfive.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you that are on the same stable surface as you.
        `,
      },
      rank: 5,
      roles: ['clear'],
      tags: ['Earth'],
    },

    {
      name: 'Ground Slam',

      effect: `
        Make a melee \\glossterm{strike} with a -1 accuracy penalty against a stable surface.
        % TODO: wording
        The strike targets everything supported by that surface in a \\smallarea cone from one corner of the target space.
      `,
      rank: 1,
      roles: ['clear'],
      tags: ['Earth'],
    },

    {
      name: 'Ground Slam+',

      // TODO: actual math on effectiveness; -2 accuracy?
      effect: `
        Make a melee \\glossterm{strike} with a -1 accuracy penalty against a stable surface.
        It targets everything supported by that surface in a \\medarea cone from one corner of the target space.
        The strike deals double \\glossterm{weapon damage}.
      `,
      rank: 5,
      roles: ['clear'],
      tags: ['Earth'],
    },

    {
      name: 'Tenderize',

      effect: `
        Make a \\glossterm{strike}.
        If the target loses hit points, it becomes \\vulnerable to all damage as a \\glossterm{condition}.
      `,
      roles: ['maim'],
      rank: 5,
    },

    {
      name: 'Steady Slam',

      effect: `
        Make a melee \\glossterm{strike} using a single weapon.
        If you get a \\glossterm{glancing blow}, it deals full damage instead of half damage.
        However, you cannot get a \\glossterm{critical hit}.
      `,
      roles: ['burst'],
      rank: 1,
    },

    {
      name: 'Steady Slam+',

      effect: `
        Make a melee \\glossterm{strike} that deals double \\glossterm{weapon damage} using a single weapon.
        If you get a \\glossterm{glancing blow}, it deals full damage instead of half damage.
      `,
      roles: ['burst'],
      rank: 5,
    },

    {
      name: 'Concussion',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target loses hit points and your attack result also hits its Fortitude defense, it becomes \\stunned as a \\glossterm{condition}.
      `,
      roles: ['maim'],
      rank: 1,
    },

    {
      name: 'Concussion+',

      effect: `
        Make a melee \\glossterm{strike} that deals triple \\glossterm{weapon damage}.
        If the target loses hit points and your attack result also hits its Fortitude defense, it becomes \\confused as a \\glossterm{condition}.
      `,
      roles: ['maim'],
      rank: 7,
    },

    {
      name: 'Leap Slam',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          You jump and move as normal for the jump (see \\pcref{Jumping}).
          When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, you emit a small shockwave.
          If you do, make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      rank: 3,
      roles: ['clear', 'dive'],
      tags: ['Earth'],
    },

    {
      name: 'Leap Slam+',

      functionsLike: {
        name: 'leap slam',
        exceptThat: 'the damage increases to \\damageranksix.',
      },
      rank: 7,
      roles: ['clear', 'dive'],
      tags: ['Earth'],
    },

    {
      name: 'Ricochet',

      effect: `
        Make a thrown \\glossterm{strike} against up to three creatures or objects in a \\smallarea radius within \\medrange of you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 3,
      roles: ['clear'],
    },

    {
      name: 'Ricochet+',

      effect: `
        Make a thrown \\glossterm{strike} against up to five creatures or objects within \\medrange of you.
        You can choose the same target multiple times, but not twice in a row, and no more than twice total.
        If you choose the same target twice, it takes double damage from the attack.

        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 7,
      roles: ['clear'],
    },

    {
      name: 'Knockdown',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target loses hit points, it falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
      roles: ['maim'],
    },

    {
      name: 'Knockdown+',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage, it falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 3,
      roles: ['maim'],
    },

    {
      name: 'Forceful Smash',

      effect: `
        Make a \\glossterm{strike}.
        If the target takes damage, you \\glossterm{knockback} it 15 feet.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 3,
      roles: ['burst', 'combo'],
    },

    {
      name: 'Forceful Smash+',

      effect: `
        Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        If the target takes damage, you \\glossterm{knockback} it 30 feet.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 7,
      roles: ['burst', 'combo'],
    },

    {
      name: 'Press Forward',

      effect: `
        Make a melee \\glossterm{strike}.
        After you make the strike, you can move up to 5 feet.
        During this movement, you can move into space occupied by creatures that you damaged with the strike.
        When you do, you \\glossterm{push} that creature up to 5 feet away from you into an unoccupied space.
        This push is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
      roles: ['dive'],
    },

    {
      name: 'Press Forward+',

      functionsLike: {
        exceptThat:
          'the strike deals double \\glossterm{weapon damage}, and you can move up to half your movement speed instead of only 5 feet.',
        name: 'press forward',
      },
      rank: 5,
      roles: ['dive'],
    },

    {
      name: 'Desperate Smash',

      // Expected high power is about 4.
      // A normal strike would deal about 1d8+2 = 6.5 damage.
      // A Heavy weapon would deal about 1d10+3 = 8.5 damage
      // This would deal 8.5 damage normally or 10.5 with a Heavy weapon, so about 25%
      // more damage than baseline.
      cost: 'One \\glossterm{fatigue level} (see text).',
      effect: `
        Make a \\glossterm{strike}.
        The strike deals \\glossterm{extra damage} equal to half your power.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.

        This ability only increases your fatigue level if the strike hits.
      `,
      rank: 1,
      roles: ['burst', 'exertion'],
    },

    {
      name: 'Desperate Smash+',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        The strike deals \\glossterm{extra damage} equal to your power.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.

        This ability only increases your fatigue level if the strike hits.
      `,
      rank: 5,
      roles: ['burst', 'exertion'],
    },

    {
      name: 'Gutshot',

      effect: `
        Make a strike with a -1 accuracy penalty.
        If the target takes damage and your attack result also hits its Fortitude defense, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['softener'],
    },

    {
      name: 'Boneshatter',

      effect: `
        Make a \\glossterm{strike}.
        If your attack result hits the target's Fortitude defense, the strike deals triple \\glossterm{weapon damage}.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Earsplitting Bonedrum',

      // treat deafen as rank 0.5; self-deafen is almost no downside, so just narrative
      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage, you and the target are \\deafened as a \\glossterm{condition}.
      `,
      rank: 1,
      roles: ['softener'],
      tags: ['Auditory'],
    },

    {
      name: 'Overhand Smash',

      effect: `
        Make a melee \\glossterm{strike}.
        It deals double \\glossterm{weapon damage}, but you cannot get a \\glossterm{critical hit}.
        After making the strike, you \\glossterm{briefly} take a -2 penalty to your Armor and Reflex defenses.
        This penalty does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Overhand Smash+',

      effect: `
        Make a melee \\glossterm{strike}.
        It deals quadruple \\glossterm{weapon damage}, but you cannot get a \\glossterm{critical hit}.
        After making the strike, you \\glossterm{briefly} take a -2 penalty to your Armor and Reflex defenses.
        This penalty does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'Erupting Bonedrum',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage, compare your attack result to the Fortitude defense of all other \\glossterm{enemies} within a \\medarea radius of the target of your strike.
        This is an \\atAuditory effect.
        On a hit against a secondary target, you deal damage equal to the damage you dealt with the strike.
      `,
      rank: 3,
      roles: ['clear'],
      tags: [],
    },
  ],
};
