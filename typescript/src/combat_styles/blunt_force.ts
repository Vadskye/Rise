import { CombatStyle } from '.';

export const bruteForce: CombatStyle = {
  name: 'Brute Force',
  shortDescription: 'Smash foes with raw power.',

  maneuvers: [
    {
      name: 'Armorcrusher',

      effect: `
        Make a \\glossterm{strike}.
        The attack is made against the target's Fortitude defense instead of its Armor defense.
      `,
      rank: 3,
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
      tags: ['Earth'],
    },

    {
      name: 'Ground Slam',

      effect: `
        Make a melee \\glossterm{strike} against a stable surface.
        The strike targets everything supported by that surface in a \\smallarea cone from you.
        You take a -1 accuracy penalty with the strike.
        On a miss, you still deal half damage.
      `,
      rank: 1,
      tags: ['Earth'],
    },

    {
      name: 'Ground Slam+',

      effect: `
        Make a melee \\glossterm{strike} against a stable surface.
        It targets everything supported by that surface in a \\medarea cone from you.
        You take a -1 accuracy penalty with the strike, but it deals \\glossterm{extra damage} equal to your power.
        On a miss, you still deal half damage.
      `,
      rank: 5,
      tags: ['Earth'],
    },

    {
      name: 'Tenderize',

      effect: `
        Make a \\glossterm{strike}.
        If it loses hit points, the target is \\vulnerable to all damage as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Concussion',

      effect: `
        Make a melee \\glossterm{strike}.
        If it loses hit points and your attack result beats its Fortitude defense, the target is \\stunned as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Concussion+',

      effect: `
        Make a melee \\glossterm{strike} with triple \\glossterm{weapon damage}.
        If it loses hit points and your attack result beats its Fortitude defense, the target is \\confused as a \\glossterm{condition}.
      `,
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
      tags: ['Earth'],
    },

    {
      name: 'Leap Slam+',

      functionsLike: {
        name: 'leap slam',
        exceptThat: 'the damage increases to \\damageranksix.',
      },
      rank: 7,
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
    },

    {
      name: 'Knockdown',

      effect: `
        Make a melee \\glossterm{strike}.
        If it loses hit points, the target falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
    },

    {
      name: 'Knockdown+',

      effect: `
        Make a melee \\glossterm{strike}.
        If damaged, the target falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 3,
    },

    {
      name: 'Forceful Smash',

      effect: `
        Make a \\glossterm{strike}.
        If the target takes damage, you \\glossterm{knockback} it 15 feet.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 3,
    },

    {
      name: 'Forceful Smash+',

      effect: `
        Make a \\glossterm{strike} with double \\glossterm{weapon damage}.
        If the target takes damage, you \\glossterm{knockback} it 30 feet.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 7,
    },

    {
      name: 'Press Forward',

      effect: `
        Make a melee \\glossterm{strike}.
        After you make the strike, you can move up to 5 feet.
        During this movement, you can move into space occupied by creatures that you damaged with the strike.
        When you do, you \\glossterm{push} that creature up to 5 feet in any direction.
        This push is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
    },

    {
      name: 'Press Forward+',

      functionsLike: {
        exceptThat: 'the strike deals double \\glossterm{weapon damage}, and you can move up to half your movement speed instead of only 5 feet.',
        name: 'press forward',
      },
      rank: 5,
    },

    {
      name: 'Desperate Smash',

      cost: "One \\glossterm{fatigue level}.",
      effect: `
        Make a \\glossterm{strike}.
        The strike deals \\glossterm{extra damage} equal to your power.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
    },

    {
      name: 'Desperate Smash+',

      cost: "One \\glossterm{fatigue level}.",
      effect: `
        Make a \\glossterm{strike} with double \\glossterm{weapon damage}.
        The strike deals 1d8 \\glossterm{extra damage} per 3 power.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 5,
    },

    {
      name: 'Gutshot',

      effect: `
        Make a strike with a -1 accuracy penalty.
        If the target takes damage and your attack result also hits its Fortitude defense, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Boneshatter',

      effect: `
        Make a \\glossterm{strike}.
        If your attack result hits the target's Fortitude defense, the strike deals triple \\glossterm{weapon damage}.
      `,
      rank: 5,
    },

    {
      name: 'Earsplitting Bonedrum',

      // treat deafen as rank 0.5; self-deafen is almost no downside, so just narrative
      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage, you and the target are \\deafened as a \\glossterm{condition}.
      `,
      rank: 1,
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
    },

    {
      name: 'Erupting Bonedrum',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage, compare your attack result to the Fortitude defense of all other \\glossterm{enemies} within a \\medarea radius of the target of your strike.
        This is an \\atAuditory effect.
        On a hit against a secondary target, you deal damage equal to the damage you dealt with the strike.
        On a miss against a secondary target, you still deal half damage.
      `,
      rank: 3,
      tags: [],
    },
  ],
};
