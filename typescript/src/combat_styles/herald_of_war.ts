import { CombatStyle } from '.';

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
      name: 'Dazing Roar',

      attack: {
        crit: `Each target is \\stunned instead of dazed.`,
        hit: `Each target is \\dazed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      tags: ['Compulsion'],
      rank: 3,
    },

    {
      name: 'Stunning Roar',

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `Each target is \\stunned as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      tags: ['Compulsion'],
      rank: 7,
    },

    {
      name: 'Goading Roar',

      // -1r for meleeish range goad
      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
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
        crit: `Each target is \\frightened instead of shaken.`,
        hit: `Each target is \\shaken by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      tags: ['Emotion'],
      rank: 1,
    },

    {
      name: 'Fearsome Roar+',

      attack: {
        crit: `Each target is \\panicked instead of frightened.`,
        hit: `Each target is \\frightened by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      tags: ['Emotion'],
      rank: 5,
    },

    {
      name: 'Thunderous Shout',

      attack: {
        hit: `Each target takes \\damagerankthreelow{bludgeoning}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      rank: 3,
    },

    {
      name: 'Thunderous Shout+',

      attack: {
        hit: `Each target takes \\damageranksevenlow{bludgeoning}.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      rank: 7,
    },

    {
      name: 'Directed Shout',

      attack: {
        hit: `
          The target takes \\damagerankone{bludgeoning}.
          If it loses \\glossterm{hit points} from this damage, it is \\deafened as a \\glossterm{condition}.
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
          The target takes \\damagerankfive{bludgeoning}.
          If it loses \\glossterm{hit points} from this damage, it is \\deafened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange of you.
        `,
      },
      rank: 5,
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
        Make a \\glossterm{weak strike}.
        Each creature damaged by the strike is \\goaded by you as a \\glossterm{condition} if your attack result beats its Mental defense.
      `,
      rank: 3,
    },

    {
      name: 'Fearsome Blow',

      effect: `
        Make a \\glossterm{strike}.
        Each creature damaged by the strike is \\shaken by you if your attack result beats its Mental defense.
      `,
      rank: 1,
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Blow+',

      effect: `
        Make a \\glossterm{strike}.
        Each creature damaged by the strike is \\frightened by you if your attack result beats its Mental defense.
      `,
      rank: 5,
      tags: ['Emotion'],
    },

    // The rank here is pretty ambiguous
    {
      name: 'Awe-Inspiring Strike',

      effect: `
        Make a melee \\glossterm{weak strike}.
        If you deal damage, compare your attack result to the Mental defense of each \\glossterm{enemy} other than the target of that strike within a \\medarea radius from you.
        On a hit, each target is \\shaken by you as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Encouraging Battlecry',

      // TODO: not sure what the right healing amount is. Using d1.
      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        You and each living \\glossterm{ally} in a \\medarea radius from you each regain 1d6 \\glossterm{damage resistance} +1d per 2 power.
      `,
      rank: 3,
      tags: ['Emotion', 'Swift'],
    },

    {
      name: 'Encouraging Battlecry+',

      // Using d5.
      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        You and each living \\glossterm{ally} in a \\medarea radius from you each regain 2d6 \\glossterm{damage resistance} plus 1d6 per 3 power.
      `,
      rank: 7,
      tags: ['Emotion', 'Swift'],
    },
  ],
};
