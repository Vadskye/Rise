import { CombatStyle } from '.';
// TODO: move this to a more generally shared location
import {CONDITION_CRIT } from '../mystic_spheres/constants';

export const heraldOfWar: CombatStyle = {
  name: 'Herald of War',
  shortDescription:
    'Demoralize foes and inspire allies with battlecries and a commanding presence.',

  maneuvers: [
    {
      name: 'Boastful Battlecry',

      effect: `
        This ability affects all \\glossterm{enemies} within a \\largearea radius from you.
        You \\glossterm{briefly} gain a +4 bonus to \\glossterm{accuracy} with \\glossterm{strikes} against each target.
      `,
      rank: 1,
    },

    {
      name: 'Stunning Roar',

      attack: {
        crit: CONDITION_CRIT,
        hit: `Each target with no remaining \\glossterm{damage resistance} is \\stunned as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      tags: ['Compulsion'],
      rank: 3,
    },

    {
      name: 'Stunning Roar+',

      attack: {
        crit: CONDITION_CRIT,
        hit: `Each target is \\stunned as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      tags: ['Compulsion'],
      rank: 7,
    },

    {
      name: 'Goading Roar',

      attack: {
        crit: CONDITION_CRIT,
        hit: `Each target is \\goaded by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      tags: ['Emotion'],
      rank: 5,
    },

    {
      name: 'Fearsome Roar',

      attack: {
        hit: `Each target with no remaining \\glossterm{damage resistance} is \\frightened by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      tags: ['Emotion'],
      rank: 1,
    },

    {
      name: 'Fearsome Roar+',

      attack: {
        hit: `Each target is \\frightened by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      tags: ['Emotion'],
      rank: 5,
    },

    {
      name: 'Thunderous Shout',

      attack: {
        hit: `\\damagerankone{bludgeoning}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      rank: 1,
    },

    {
      name: 'Thunderous Shout+',

      attack: {
        hit: `\\damagerankfourhigh{bludgeoning}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarea cone from you.
        `,
      },
      rank: 5,
    },

    {
      name: 'Directed Shout',

      attack: {
        hit: `
          \\damagerankone{bludgeoning}.
          If the target loses \\glossterm{hit points} from this damage, it is \\deafened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange of you.
        `,
      },
      rank: 1,
    },

    {
      name: 'Directed Shout+',

      attack: {
        hit: `
          \\damagerankthreehigh{bludgeoning}.
          If the target takes damage, it is \\deafened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange of you.
        `,
      },
      rank: 3,
    },

    {
      name: 'Rally the Troops',

      effect: `
        Your \\glossterm{allies} within a \\largearea radius from you can each \\glossterm{briefly} ignore any effects from all \\glossterm{conditions} they are already affected by.
        Because this ability has the \\abilitytag{Swift} tag, it removes any relevant penalties from those conditions during the current phase.
      `,
      rank: 3,
      tags: ['Swift'],
    },

    {
      name: 'Challenging Strike',

      effect: `
        Make a \\glossterm{strike}.
        \\hit If the target takes damage, it becomes \\goaded by you as a \\glossterm{condition}.
        This is an \\abilitytag{Emotion} effect.
      `,
      rank: 5,
    },

    {
      name: 'Fearsome Blow',

      effect: `
        Make a melee \\glossterm{strike}.
        \\hit If the target loses \\glossterm{hit points}, it becomes \\frightened by you.
        This is an \\abilitytag{Emotion} effect.
      `,
      rank: 1,
      tags: [],
    },

    {
      name: 'Fearsome Blow+',

      effect: `
        Make a melee \\glossterm{strike} with double \\glossterm{weapon damage}.
        \\hit If the target takes damage, it becomes \\frightened by you.
        This is an \\abilitytag{Emotion} effect.
      `,
      rank: 5,
      tags: [],
    },

    // The rank here is pretty ambiguous. The baseline for a small radius enemies-only
    // frighten would be r3. Making it conditional on a melee strike is maybe fine? This
    // can't frighten and deal damage to the same target, so it's pretty situational.
    {
      name: 'Awe-Inspiring Strike',

      effect: `
        Make a melee strike.
        \\hit If the target takes damage, compare your attack result to the Mental defense of each \\glossterm{enemy} other than the target of that strike within a \\medarea radius from you.
        On a hit, each target is \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Encouraging Battlecry',

      // Use same value as Preacher
      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        You and each \\glossterm{ally} in a \\medarea radius from you each regain 2d6 \\glossterm{damage resistance}.
      `,
      rank: 3,
      tags: ['Emotion', 'Swift'],
    },

    {
      name: 'Encouraging Battlecry+',

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        You and each \\glossterm{ally} in a \\medarea radius from you each regain 5d10 \\glossterm{damage resistance}.
      `,
      rank: 7,
      tags: ['Emotion', 'Swift'],
    },
  ],
};
