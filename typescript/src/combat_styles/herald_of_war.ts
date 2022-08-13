import { CombatStyle } from ".";

export const heraldOfWar: CombatStyle = {
  name: "Herald of War",
  shortDescription:
    "Demoralize foes and inspire allies with battlecries and a commanding presence.",

  maneuvers: [
    {
      name: "Boastful Battlecry",

      effect: `
        This ability targets all \\glossterm{enemies} within a \\largearea radius from you.
        You \\glossterm{briefly} gain a +4 bonus to \\glossterm{accuracy} with \\glossterm{strikes} against each target.
      `,
      rank: 1,
    },

    {
      name: "Dazing Roar",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each target.`,
        hit: `Each target is \\glossterm{briefly} \\dazed.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      rank: 1,
    },

    {
      name: "Stunning Roar",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each target.`,
        hit: `Each target is \\glossterm{briefly} \\stunned.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      rank: 5,
    },

    {
      name: "Goading Roar",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each target.`,
        hit: `
          Each target is \\glossterm{briefly} \\goaded.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      rank: 3,
      tags: ["Emotion"],
    },

    {
      name: "Goading Roar+",

      functionsLike: {
        name: 'goading roar',
        exceptThat: "the area increases to a \\largearea radius.",
      },
      rank: 7,
      tags: ["Emotion"],
    },

    {
      name: "Fearsome Roar",

      attack: {
        crit: `The effect becomes a \\glossterm{condition}.`,
        hit: `
          Each target with remaining \\glossterm{damage resistance} is \\glossterm{briefly} \\shaken by you.
          Each target without remaining damage resistance is \\frightened by you instead of shaken.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 3,
      tags: ["Emotion"],
    },

    {
      name: "Thunderous Shout",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} sonic damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      scaling: "damage",
      rank: 3,
    },

    {
      name: "Directed Shout",

      attack: {
        hit: `The target takes 2d8 + \\glossterm{power} sonic damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange of you.
        `,
      },
      scaling: "damage",
      rank: 3,
    },

    {
      name: "Rally the Troops",

      effect: `
        You and your \\glossterm{allies} within a \\largearea radius from you can each \\glossterm{briefly} ignore any effects from one \\glossterm{condition} they are already affected by.
        Because this ability has the \\abilitytag{Swift} tag, it removes any relevant penalties from that condition during the current phase.
      `,
      rank: 1,
      tags: ["Swift"],
    },

    {
      name: "Rally the Troops+",

      effect: `
        You and your \\glossterm{allies} within a \\largearea radius from you can each \\glossterm{briefly} ignore any effects from all \\glossterm{conditions} they are already affected by.
        Because this ability has the \\abilitytag{Swift} tag, it removes any relevant penalties from those conditions during the current phase.
      `,
      rank: 5,
      tags: ["Swift"],
    },

    {
      name: "Challenging Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature damaged by the strike is \\glossterm{briefly} \\goaded by you.
      `,
      rank: 3,
    },

    {
      name: "Challenging Strike+",

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature damaged by the strike is \\goaded by you as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: "Fearsome Blow",

      effect: `
        Make a \\glossterm{strike}.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\shaken by you.
      `,
      rank: 1,
      tags: ["Emotion"],
    },

    {
      name: "Fearsome Blow+",

      effect: `
        Make a \\glossterm{strike}.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\frightened by you.
      `,
      rank: 5,
      tags: ["Emotion"],
    },

    // The rank here is pretty ambiguous
    {
      name: "Awe-Inspiring Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        In addition, make an attack vs. Mental against each \\glossterm{enemy} other than the target of that strike within a \\medarea radius from you.
        On a hit, each target is \\glossterm{briefly} \\shaken by you.
      `,
      rank: 3,
    },

    {
      name: "Inspiring Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        If you deal damage to a creature with the strike, \\glossterm{allies} within a \\largearea radius from you \\glossterm{briefly} gain a +2 bonus to Mental defense.
      `,
      rank: 1,
    },

    {
      name: "Encouraging Battlecry",

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        You and each living \\glossterm{ally} in a \\medarea radius from you each regain 1d10 \\glossterm{damage resistance}.
      `,
      rank: 3,
      scaling: { special: "The recovery increases by +1d for each rank beyond 3." },
      tags: ['Emotion', 'Swift'],
    },

    {
      name: "Encouraging Battlecry+",

      effect: `
        When you use this ability, you increase your \\glossterm{fatigue level} by one.

        You and each living \\glossterm{ally} in a \\medarea radius from you each regain 4d6 + half \\glossterm{power} \\glossterm{damage resistance}.
      `,
      rank: 7,
      tags: ['Emotion', 'Swift'],
    },

    {
      name: "Steadfast Battlecry",

      effect: `
        You and each living \\glossterm{ally} in a \\hugearea radius from you \\glossterm{briefly} gain a +2 bonus to \\glossterm{vital rolls}.
      `,
      rank: 3,
      tags: ['Emotion'],
    },

    {
      name: "Enraging Roar",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each target.`,
        hit: `
          Each target is \\glossterm{briefly} unable to take any \\glossterm{standard actions} that do not cause it to make an attack.
          For example, it could make a \\glossterm{strike} or cast an offensive spell, but it could not heal itself or summon a creature.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 3,
      tags: ['Emotion'],
    },
  ],
};
