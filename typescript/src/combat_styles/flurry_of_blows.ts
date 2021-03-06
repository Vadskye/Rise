import { CombatStyle } from ".";

export const flurryOfBlows: CombatStyle = {
  name: "Flurry of Blows",
  sources: ["esoteric", "wild"],

  maneuvers: [
    {
      name: "Rapid Flurry",

      effect: `
        Make two melee \\glossterm{strikes} with a -2 penalty to \\glossterm{accuracy}.
        You take a -2d penalty to damage with both strikes, and your \\glossterm{power} is \\glossterm{halved}.
        `,

      rank: 3,
      type: "Instant",
    },

    {
      name: "Power Flurry",

      effect: `
        Make two \\glossterm{strikes} with a -4 penalty to \\glossterm{accuracy}.
        `,

      rank: 5,
      type: "Instant",
    },

    {
      name: "Triple Flurry",

      effect: `
        Make three melee \\glossterm{strikes} with a -3 penalty to \\glossterm{accuracy}.
        You take a -2d penalty to damage with all strikes, and your \\glossterm{power} is \\glossterm{halved}.
        `,

      rank: 7,
      type: "Instant",
    },

    {
      name: "Whirlwind",

      // original targets: All \glossterm{enemies} within your weapon's \glossterm{reach}
      effect: `
        Make a melee \\glossterm{strike} using a light or medium slashing weapon against each subject.
        Your \\glossterm{power} with the strike is halved.
        `,

      rank: 2,
      type: "Instant",
    },

    {
      name: "Whirlwind Flurry",

      // original targets: All \glossterm{enemies} within your weapon's \glossterm{reach}
      effect: `
        Make two melee \\glossterm{strikes} with a -2 penalty to \\glossterm{accuracy} using a light or medium slashing weapon against each subject.
        You take a -2d penalty to damage with both strikes, and your \\glossterm{power} is halved.
        `,

      rank: 7,
      type: "Instant",
    },

    {
      name: "Barrage",

      effect: `
        Make two ranged \\glossterm{strikes} with a -4 penalty to \\glossterm{accuracy}.
        Your \\glossterm{power} with the both strikes is halved.
        For each previous round that you used this ability without moving, you reduce the accuracy penalty by 1.
        `,

      rank: 4,
      type: "Instant",
    },

    {
      name: "Volley Fire",

      // original targets: Each creature in a \areasmall radius within \medrange.
      effect: `
        Make a ranged \\glossterm{strike} using a projectile weapon against each subject.
        Your \\glossterm{power} with the strike is halved.
        This strike costs one projectile per target.
        `,

      rank: 5,
      type: "Instant",
    },

    {
      name: "Arrowstorm",

      // original targets: Each creature in a \areamed radius within \longrange.
      effect: `
        Make a ranged \\glossterm{strike} using a projectile weapon against each subject.
        Your \\glossterm{power} with the strike is halved.
        This strike costs one projectile per target.
        `,

      rank: 7,
      type: "Instant",
    },

    {
      name: "Quickdraw",

      effect: `
        You draw one or two weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike}.
        `,

      rank: 1,
      type: "Instant",
    },

    {
      name: "Quickshot",

      effect: `
        Make a ranged \\glossterm{strike} using a \\glossterm{projectile} weapon against a creature adjacent to you.
        You are not \\glossterm{defenseless} against that creature during the current phase.
        `,

      rank: 2,
      type: "Instant",
    },
  ],
};
