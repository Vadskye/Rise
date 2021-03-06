import { CombatStyle } from ".";

export const ripAndTear: CombatStyle = {
  name: "Rip and Tear",
  sources: ["wild"],

  maneuvers: [
    {
      name: "Strip the Flesh",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that loses hit points from the strike becomes \\glossterm{vulnerable} to slashing damage as a \\glossterm{condition}.
        `,

      rank: 1,
      type: "Duration",
    },

    {
      name: "Fleshripping Slash",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that loses hit points from the strike becomes \\glossterm{vulnerable} to \\glossterm{physical damage} as a \\glossterm{condition}.
        `,

      rank: 3,
      type: "Duration",
    },

    {
      name: "Armorbreak Strike",

      effect: `
        Make a \\glossterm{strike} with a +2 bonus to \\glossterm{accuracy}.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that resists all damage from the strike takes the damage from this strike again.
        `,

      rank: 2,
      type: "Instant",
    },

    {
      name: "Brow Gash",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        If a creature loses hit points from the strike, it is \\glossterm{blinded} as a \\glossterm{condition}.
        `,

      rank: 6,
      type: "Duration",
    },

    {
      name: "Hamstring",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        If a creature loses hit points from the strike, it is \\glossterm{slowed} as a \\glossterm{condition}.
        `,

      rank: 1,
      type: "Duration",
    },

    {
      name: "Greater Hamstring",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        If a creature loses hit points from the strike, it is \\glossterm{immobilized} as a \\glossterm{condition}.
        `,

      rank: 6,
      type: "Duration",
    },

    {
      name: "Two-Weapon Rend",

      effect: `
        Make a melee strike using a slashing weapon.
        Each subject that you hit during this phase with both that strike and the \\textit{offhand strike} ability takes slashing damage equal to your \\glossterm{power}.
        `,

      rank: 2,
      type: "Instant",
    },

    {
      name: "Flintspark Strike",

      effect: `
        Make a strike using a slashing weapon.
        If the subject is wearing metal armor or is significantly composed of metal, damage dealt by the strike is fire damage in addition to its normal damage types.
        `,

      rank: 2,
      type: "Instant",
    },

    {
      name: "Sweeping Strike",

      // original targets: Up to three creatures or objects within your weapon's \glossterm{reach} (see text)
      effect: `
      Make a melee \\glossterm{strike} using a slashing weapon against each subject.
      Your \\glossterm{power} with the strike is halved.
    `,

      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Sweeping Strike",

      // original targets: Up to three creatures or objects within your weapon's \glossterm{reach} (see text)
      effect: `
      Make a melee \\glossterm{strike} using a slashing weapon against each subject.
    `,

      rank: 5,
      type: "Instant",
    },
  ],
};
