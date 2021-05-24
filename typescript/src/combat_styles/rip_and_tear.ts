import { CombatStyle } from ".";

export const ripAndTear: CombatStyle = {
  name: "Rip and Tear",
  shortDescription: "Rip foes apart with slashing weapons.",

  maneuvers: [
    {
      name: "Strip the Flesh",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike becomes \\glossterm{vulnerable} to all damage until the end of the next round.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },

    {
      name: "Greater Strip the Flesh",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike becomes \\glossterm{vulnerable} to all damage as a \\glossterm{condition}.
      `,
      rank: 6,
      type: "Duration",
    },

    {
      name: "Strip the Armor",

      effect: `
        Make a \\glossterm{strike} with a +1 accuracy bonus using a slashing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that resists all damage from the strike takes the damage from the strike again.
      `,
      rank: 2,
      scaling: {
        4: "The accuracy bonus increases to +2.",
        6: "The accuracy bonus increases to +3.",
      },
      type: "Instant",
    },

    {
      name: "Rend the Hide",

      effect: `
        Make a \\glossterm{strike} with a -1d damage penalty using a slashing weapon.
        Each creature damaged by the strike that is not wearing metal armor takes a -2 penalty to Armor defense until the end of the next round.
      `,
      rank: 1,
      scaling: {
        3: "The penalty increases to -3.",
        5: "The penalty increases to -4.",
        7: "The penalty increases to -5.",
      },
      type: "Instant",
    },

    // +1 rank for +1d
    {
      name: "Brow Gash",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -1d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\blinded until the end of the next round.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Duration",
    },

    {
      name: "Greater Brow Gash",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -1d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\blinded as a \\glossterm{condition}.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Hamstring",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -1d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\slowed as a \\glossterm{condition}.
      `,
      rank: 1,
      type: "Duration",
    },

    {
      name: "Greater Hamstring",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\decelerated as a \\glossterm{condition}.
      `,
      rank: 3,
      type: "Duration",
    },

    {
      name: "Supreme Hamstring",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\immobilized as a \\glossterm{condition}.
      `,
      rank: 6,
      type: "Duration",
    },

    {
      name: "Two-Weapon Rend",

      effect: `
        Make a melee strike using a slashing weapon.
        At the end of this phase, each creature that you hit during this phase with both that strike and the \\textit{offhand strike} ability takes slashing damage equal to half your \\glossterm{power} (minimum 1).
      `,
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Instant",
    },

    {
      name: "Greater Two-Weapon Rend",

      effect: `
        Make a melee strike using a slashing weapon.
        At the end of this phase, each creature that you hit during this phase with both that strike and the \\textit{offhand strike} ability takes slashing damage equal to your \\glossterm{power}.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Flintspark Strike",

      effect: `
        Make a strike using a slashing weapon.
        If the subject is wearing metal armor or is significantly composed of metal, damage dealt by the strike is fire damage in addition to its normal damage types.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1d damage bonus with the strike.",
        6: "The damage bonus increases to +2d.",
      },
      type: "Instant",
    },

    {
      name: "Sweeping Strike",

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon.
        The strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag (see \\pcref{Weapon Tags}).
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 bonus to the Sweeping value of the strike.",
        6: "The bonus to the Sweeping value increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Sweeping Throw",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing weapon.
        The strike also targets an additional creature or object within 5 feet of the strike's primary target.
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Greater Sweeping Throw",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing weapon.
        The strike also targets up to two additional creatures or object within 5 feet of the strike's primary target.
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 5,
      scaling: {
        7: "You gain a +1 accuracy bonus with the strike.",
      },
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
      scaling: {
        6: "You gain a +1d damage bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Bloodletting Strike",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature that loses \\glossterm{hit points} from the strike begins bleeding as a \\glossterm{condition}.
        It loses \\glossterm{hit points} equal to your \\glossterm{power} with that strike at the end of each round until the condition is removed.
        This condition is automatically removed once the creature suffers a \\glossterm{vital wound}.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Duration",
    },

    {
      name: "Bloodletting Sweep",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        The strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag (see \\pcref{Weapon Tags}).

        Each creature that loses \\glossterm{hit points} from the strike begins bleeding as a \\glossterm{condition}.
        It loses \\glossterm{hit points} equal to your \\glossterm{power} with that strike at the end of each round until the condition is removed.
        This condition is automatically removed once the creature suffers a \\glossterm{vital wound}.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Spinning Slash",

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon against any number of creatures or objects within your weapon's \\glossterm{reach}.
        Your \\glossterm{power} with the strike is halved.
        In addition, you take no penalties for being \\surrounded until the end of the current round.
        This penalty removal is a \\abilitytag{Swift} effect, so it affects attacks against you during the current round.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Twinslash",

      // basically +1d
      effect: `
        Make two melee \\glossterm{strikes} using a slashing weapon.
        You take a -2d damage penalty with both strikes, and your \\glossterm{power} is halved.
      `,
      rank: 3,
      scaling: {
        5: "The damage penalty is reduced to -1d.",
        7: "The damage penalty is removed.",
      },
      type: "Instant",
    },

    {
      name: "Tear Exposed Flesh",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        If the target does not have any remaining \\glossterm{damage resistance}, your \\glossterm{power} with the strike is doubled.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1d damage bonus with the strike.",
        7: "The damage bonus increases to +2d.",
      },
      type: "Instant",
    },
  ],
};
