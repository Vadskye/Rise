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
        During the next round, you gain a +4 bonus to \\glossterm{accuracy} with \\glossterm{strikes} against each subject.
      `,
      rank: 1,
      scaling: {
        3: "The bonus increases to +6.",
        5: "The bonus increases to +8.",
        7: "The bonus increases to +10.",
      },
      type: "Instant",
    },

    {
      name: "Demoralizing Battlecry",

      attack: {
        crit: `Each subject takes a -2 penalty to defenses as a \\glossterm{condition}.`,
        hit: `Each subject takes a -2 penalty to defenses until the end of the next round.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      scaling: "accuracy",
      rank: 3,
      type: "Duration",
    },

    {
      name: "Fearsome Battlecry",

      attack: {
        crit: `Each subject that is below its maximum \\glossterm{hit points} is \\frightened by you as a \\glossterm{condition}.`,
        hit: `Each subject that is below its maximum \\glossterm{hit points} is \\shaken by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      scaling: "accuracy",
      rank: 1,
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Frightening Battlecry",

      attack: {
        crit: `Each subject that is below its maximum \\glossterm{hit points} is \\panicked by you as a \\glossterm{condition}.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `Each subject that is below its maximum \\glossterm{hit points} is \\frightened by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      scaling: "accuracy",
      rank: 4,
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Thunderous Shout",

      attack: {
        hit: `Each subject takes 2d6 + half \\glossterm{power} sonic damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      scaling: "damage",
      rank: 3,
      type: "Instant",
    },

    {
      name: "Greater Thunderous Shout",

      attack: {
        hit: `Each subject takes 4d6 + half \\glossterm{power} sonic damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\hugearea cone from you.
        `,
      },
      rank: 6,
      type: "Instant",
    },

    {
      name: "Rally the Troops",

      effect: `
        You and your \\glossterm{allies} within a \\largearea radius from you can each ignore any effects from one \\glossterm{condition} they are already affected by until the end of the next round.
        Because this ability has the \\abilitytag{Swift} tag, it removes any relevant penalties from those conditions during the current phase.
      `,
      rank: 2,
      scaling: {
        4: "The area increases to a \\hugearea radius from you.",
        6: "Each ally can ignore two conditions instead of one.",
      },
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Challenging Strike",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike.
        As a \\glossterm{condition}, each creature damaged by the strike takes a -2 penalty to \\glossterm{accuracy} against creatures other than you as long as it is within \\rngmed range of you.
        This condition is removed if another creature applies this condition to the same target.
      `,
      rank: 3,
      scaling: {
        5: "The penalty increases to -4.",
        7: "The penalty increases to -6.",
      },
      type: "Duration",
    },

    {
      name: "Fearsome Blow",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature damaged by the strike is \\shaken by you as a \\glossterm{condition}.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Frightening Blow",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature damaged by the strike is \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 6,
      tags: ["Emotion"],
      type: "Duration",
    },
  ],
};
