import { CombatStyle } from ".";

export const ripAndTear: CombatStyle = {
  name: "Rip and Tear",
  shortDescription: "Rip foes apart with slashing weapons.",
  sources: ["esoteric", "martial", "primal", "trick", "wild"],

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
      name: "Greater Strip the Flesh",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature that loses hit points from the strike becomes \\glossterm{vulnerable} to \\glossterm{physical damage} as a \\glossterm{condition}.
      `,
      rank: 3,
      type: "Duration",
    },

    {
      name: "Strip the Armor",

      effect: `
        Make a \\glossterm{strike} with a +2 bonus to \\glossterm{accuracy} using a slashing weapon.
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
        At the end of this phase, each creature that you hit during this phase with both that strike and the \\textit{offhand strike} ability takes slashing damage equal to half your \\glossterm{power}.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Two-Weapon Rend",

      effect: `
        Make a melee strike using a slashing weapon.
        At the end of this phase, each creature that you hit during this phase with both that strike and the \\textit{offhand strike} ability takes slashing damage equal to your \\glossterm{power}.
      `,
      rank: 4,
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

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon against up to three creatures or objects within your weapon's \\glossterm{reach}.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Sweeping Strike",

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon against up to three creatures or objects within your weapon's \\glossterm{reach}.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Sweeping Throw",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing weapon.
        The strike also targets up to two creatures or objects within 5 feet of the strike's primary target.
        Your \\glossterm{power} with the strike is halved.
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Ricochet",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing or bludgeoning weapon against up to three creatures or objects in a \\smallarea radius within \\shortrange.
        Your \\glossterm{power} with the strike is halved.
        If you choose yourself as one of the subjects, you can catch the weapon instead of taking damage from it.
      `,
      rank: 4,
      type: "Instant",
    },

    {
      name: "Bloodletting Strike",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature that loses hit points from the strike begins bleeding as a \\glossterm{condition}.
        It loses \\glossterm{hit points} equal to your \\glossterm{power} with that strike at the end of each round until the condition is removed.
        The condition can be removed with the \\textit{treat condition} ability (see \\pcref{Treat Condition}).
        The \\glossterm{difficulty rating} of the check is equal to 5.
      `,
      rank: 3,
      type: "Duration",
    },

    {
      name: "Greater Bloodletting Strike",

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: "the condition cannot be removed with the \\textit{treat condition} ability.",
        name: "Bloodletting Strike",
      },
      rank: 6,
      type: "Duration",
    },
  ],
};
