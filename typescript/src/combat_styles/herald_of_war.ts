import { CombatStyle } from ".";

export const heraldOfWar: CombatStyle = {
  name: "Herald of War",
  sources: ["martial", "primal"],

  maneuvers: [
    {
      name: "Boastful Battlecry",

      // original targets: \glossterm{Enemies} within a \arealarge range from you
      effect: `
        During the next round, you gain a +4 bonus to \\glossterm{accuracy} with \\glossterm{strikes} against each subject.
        `,

      rank: 1,
      scaling: {
        3: "The bonus increases to +5.",
        5: "The bonus increases to +6.",
        7: "The bonus increases to +7.",
      },
      type: "Instant",
    },

    {
      name: "Demoralizing Battlecry",

      // original targets: \glossterm{Enemies} in a \areasmall radius from you.
      attack: {
        crit: `Each subject takes a -2 penalty to defenses as a \\glossterm{condition}.

        \\rankline
        You gain a +1 bonus to \\glossterm{accuracy} with the attack for each rank beyond 3.`,

        hit: `Each subject takes a -2 penalty to defenses until the end of the next round..`,
        targeting: `
        Make an attack vs. Mental against each subject.
        `,
      },

      rank: 3,
      type: "Duration",
    },

    {
      name: "Fearsome Battlecry",

      // original targets: \glossterm{Enemies} in a \areasmall radius from you.
      attack: {
        crit: `Each subject that has no remaining \\glossterm{resistance} to sonic damage is \\glossterm{frightened} by you as a \\glossterm{condition}.

        \\rankline
        You gain a +1 bonus to \\glossterm{accuracy} with the attack for each rank beyond 1.`,

        hit: `Each subject that has no remaining \\glossterm{resistance} to sonic damage is \\glossterm{shaken} by you as a \\glossterm{condition}..`,
        targeting: `
        Make an attack vs. Mental against each subject.
        `,
      },

      rank: 1,
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Frightening Battlecry",

      // original targets: \glossterm{Enemies} in a \areasmall radius from you.
      attack: {
        crit: `Each subject that has no remaining \\glossterm{resistance} to sonic damage is \\glossterm{panicked} by you as a \\glossterm{condition}.

        \\rankline
        You gain a +1 bonus to \\glossterm{accuracy} with the attack for each rank beyond 4.`,
        glance: `As above, except that the condition is removed at the end of the next round.`,
        hit: `Each subject that has no remaining \\glossterm{resistance} to sonic damage is \\glossterm{frightened} by you as a \\glossterm{condition}..`,
        targeting: `
        Make an attack vs. Mental against each subject.
        `,
      },

      rank: 4,
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Thunderous Shout",

      // original targets: Everything in a \areasmall cone from you
      attack: {
        hit: `Each subject takes 2d6 + half \\glossterm{power} sonic damage

        \\rankline
        The damage increases by +1d for each rank beyond 3..`,
        targeting: `
        Make an attack vs. Fortitude against each subject.
        `,
      },

      rank: 3,
      type: "Instant",
    },

    {
      name: "Thunderous Bellow",

      // original targets: Everything in a \areahuge cone from you
      attack: {
        hit: `Each subject takes 4d6 + half \\glossterm{power} sonic damage.`,
        targeting: `
        Make an attack vs. Fortitude against each subject.
        `,
      },

      rank: 6,
      type: "Instant",
    },

    {
      name: "Rally the Troops",

      // original targets: You and your \glossterm{allies} within a \areamed radius from you
      effect: `
        Each subject can ignore any effects from one \\glossterm{condition} it is already affected by until the end of the next round.
        Because this ability has the \\glossterm{Swift} tag, it allows your allies to ignore conditions they would be affected by during the current phase.
        `,

      rank: 2,
      scaling: {
        4: "The area increases to a \\largearea radius from you.",
        6: "The area increases to a \\hugearea radius from you.",
      },
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Challenging Strike",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that takes damage from the strike takes a -2 penalty to \\glossterm{accuracy} against creatures other than you as a \\glossterm{condition}.
        This condition is removed if another creature applies this condition to the same target.
        `,

      rank: 2,
      type: "Duration",
    },

    {
      name: "Fearsome Blow",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{shaken} by you as a \\glossterm{condition}.
        `,

      rank: 2,
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Frightening Blow",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike.
        Each creature that loses hit points from the strike is \\glossterm{frightened} by you as a \\glossterm{condition}.
        `,

      rank: 5,
      tags: ["Emotion"],
      type: "Duration",
    },
  ],
};
