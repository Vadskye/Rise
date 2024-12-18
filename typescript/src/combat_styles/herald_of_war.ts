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
      tags: ['Auditory'],
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
      tags: ['Auditory', 'Compulsion'],
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
      tags: ['Auditory', 'Compulsion'],
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
      tags: ['Auditory', 'Emotion'],
      rank: 5,
    },

    {
      name: 'Fearsome Roar',

      attack: {
        hit: `
          Each target with no remaining \\glossterm{damage resistance} is \\frightened by you as a \\glossterm{condition}.
        `,
        crit: CONDITION_CRIT,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      tags: ['Auditory', 'Emotion'],
      rank: 1,
    },

    {
      name: 'Fearsome Roar+',

      attack: {
        hit: `Each target is \\frightened by you as a \\glossterm{condition}.`,
        crit: CONDITION_CRIT,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      tags: ['Auditory', 'Emotion'],
      rank: 5,
    },

    {
      name: 'Thunderous Shout',

      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\smallarea cone from you.
        `,
      },
      rank: 1,
      tags: ['Auditory'],
    },

    {
      name: 'Thunderous Shout+',

      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea cone from you.
        `,
      },
      rank: 5,
      tags: ['Auditory'],
    },

    {
      name: 'Directed Shout',

      attack: {
        hit: `
          \\damagerankone.
          If the target loses \\glossterm{hit points} from this damage, it is \\deafened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against a creature within \\shortrange of you.
        `,
      },
      rank: 1,
      tags: ['Auditory'],
    },

    {
      name: 'Directed Shout+',

      attack: {
        hit: `
          \\damagerankthree.
          If the target takes damage, it is \\deafened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against a creature within \\shortrange of you.
        `,
      },
      rank: 3,
      tags: ['Auditory'],
    },

    {
      name: 'Rally the Troops',

      effect: `
        Your \\glossterm{allies} within a \\largearea radius from you can each \\glossterm{briefly} ignore any effects from all \\glossterm{conditions} they are already affected by.
        Because this ability has the \\abilitytag{Swift} tag, it removes any relevant penalties from those conditions during the current phase.
      `,
      rank: 3,
      tags: ['Auditory', 'Swift'],
    },

    {
      name: 'Challenge',

      effect: `
        Make a \\glossterm{strike}.
        If damaged, the target becomes \\goaded by you as a \\glossterm{condition}.
      `,
      rank: 5,
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Blow',

      effect: `
        Make a melee \\glossterm{strike}.
        If it loses hit points, the target becomes \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 1,
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Blow+',

      effect: `
        Make a melee \\glossterm{strike} with double \\glossterm{weapon damage}.
        If damaged, the target becomes \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 5,
      tags: ['Emotion'],
    },

    // The rank here is pretty ambiguous. The baseline for a small radius enemies-only
    // frighten would be r3. Making it conditional on a melee strike is maybe fine? This
    // can't frighten and deal damage to the same target, so it's pretty situational.
    {
      name: 'Inspire Awe',

      effect: `
        Make a melee strike.
        If the target takes damage, compare your attack result to the Mental defense of each \\glossterm{enemy} other than the target of that strike within a \\medarea radius from you.
        On a hit, each target is \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 3,
      tags: ['Emotion'],
    },

    {
      name: 'Encouraging Battlecry',

      // We have to use a power scaling here because maneuvers don't have rank scaling, so
      // this would fall behind quickly otherwise
      cost: "One \\glossterm{fatigue level}.",
      effect: `
        You and each \\glossterm{ally} in a \\medarea radius from you each regain 1d6 per 3 power \\glossterm{damage resistance}.
      `,
      rank: 3,
      tags: ['Auditory', 'Emotion', 'Swift'],
    },

    {
      name: 'Encouraging Battlecry+',

      cost: "One \\glossterm{fatigue level}.",
      effect: `
        You and each \\glossterm{ally} in a \\medarea radius from you each regain 1d8 per 2 power \\glossterm{damage resistance}.
      `,
      rank: 7,
      tags: ['Auditory', 'Emotion', 'Swift'],
    },
  ],
};
