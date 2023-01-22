import { CombatStyle } from '.';

export const heraldOfWar: CombatStyle = {
  name: 'Herald of War',
  shortDescription:
    'Demoralize foes and inspire allies with battlecries and a commanding presence.',

  maneuvers: [
    {
      name: 'Boastful Battlecry',

      effect: `
        This ability targets all \\glossterm{enemies} within a \\largearea radius from you.
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
        hit: `Each target takes 2d6 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      scaling: 'damage',
      rank: 3,
    },

    {
      name: 'Thunderous Shout+',

      attack: {
        hit: `Each target takes 5d10 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      scaling: 'damage',
      rank: 7,
    },

    {
      name: 'Directed Shout',

      attack: {
        hit: `
          The target takes 1d10 + \\glossterm{power} bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, it is \\deafened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange of you.
        `,
      },
      scaling: 'damage',
      rank: 1,
    },

    {
      name: 'Directed Shout+',

      attack: {
        hit: `
          The target takes 4d10 + \\glossterm{power} bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, it is \\deafened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange of you.
        `,
      },
      scaling: 'damage',
      rank: 5,
    },

    {
      name: 'Rally the Troops',

      effect: `
        You and your \\glossterm{allies} within a \\largearea radius from you can each \\glossterm{briefly} ignore any effects from one \\glossterm{condition} they are already affected by.
        Because this ability has the \\abilitytag{Swift} tag, it removes any relevant penalties from that condition during the current phase.
      `,
      rank: 1,
      tags: ['Swift'],
    },

    {
      name: 'Rally the Troops+',

      effect: `
        You and your \\glossterm{allies} within a \\largearea radius from you can each \\glossterm{briefly} ignore any effects from all \\glossterm{conditions} they are already affected by.
        Because this ability has the \\abilitytag{Swift} tag, it removes any relevant penalties from those conditions during the current phase.
      `,
      rank: 5,
      tags: ['Swift'],
    },

    {
      name: 'Challenging Strike',

      effect: `
        Make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\goaded by you as a \\glossterm{condition} if your attack result beats its Mental defense.
      `,
      rank: 5,
    },

    {
      name: 'Fearsome Blow',

      effect: `
        Make a \\glossterm{strike}.
        Each creature damaged by the strike is \\shaken by you if your attack result beats its Mental defense.
      `,
      rank: 3,
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Blow+',

      effect: `
        Make a \\glossterm{strike}.
        Each creature damaged by the strike is \\frightened by you if your attack result beats its Mental defense.
      `,
      rank: 7,
      tags: ['Emotion'],
    },

    // The rank here is pretty ambiguous
    {
      name: 'Awe-Inspiring Strike',

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        In addition, make an attack vs. Mental against each \\glossterm{enemy} other than the target of that strike within a \\medarea radius from you.
        On a hit, each target is \\shaken by you as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Encouraging Battlecry',

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        You and each living \\glossterm{ally} in a \\medarea radius from you each regain 1d10 \\glossterm{damage resistance}.
      `,
      rank: 3,
      scaling: { special: 'The recovery increases by +1d for each rank beyond 3.' },
      tags: ['Emotion', 'Swift'],
    },

    {
      name: 'Encouraging Battlecry+',

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        You and each living \\glossterm{ally} in a \\medarea radius from you each regain 4d6 + half \\glossterm{power} \\glossterm{damage resistance}.
      `,
      rank: 7,
      tags: ['Emotion', 'Swift'],
    },

    {
      name: 'Steadfast Battlecry',

      effect: `
        You and each living \\glossterm{ally} in a \\largearea radius from you \\glossterm{briefly} gain a +2 bonus to \\glossterm{vital rolls}.
      `,
      rank: 1,
      tags: ['Emotion', 'Swift'],
    },
  ],
};
