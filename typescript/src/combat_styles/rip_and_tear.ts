import { CombatStyle } from ".";

export const ripAndTear: CombatStyle = {
  name: "Rip and Tear",
  shortDescription: "Rip foes apart with slashing weapons.",

  maneuvers: [
    {
      name: "Strip the Flesh",

      // treat as r2 debuff
      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike becomes \\glossterm{vulnerable} to all damage as a \\glossterm{condition}.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },

    {
      name: "Strip the Armor",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature that resists all damage from the strike takes the damage from the strike again.
        This extra damage cannot cause the creature to lose \\glossterm{hit points}.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +1.",
      },
      type: "Instant",
    },

    {
      name: "Rend the Hide",

      // -1 rank for metal armor restriction and only affecting Armor
      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike that is not wearing metal armor \\glossterm{briefly} takes a -2 penalty to Armor defense.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Greater Rend the Hide",

      // -1 rank for metal armor restriction and only affecting Armor
      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike that is not wearing metal armor \\glossterm{briefly} takes a -4 penalty to Armor defense.
      `,
      rank: 7,
      type: "Instant",
    },

    {
      name: "Brow Gash",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\glossterm{briefly} \\dazzled.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Duration",
    },

    {
      name: "Blinding Brow Gash",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike is \\blinded as a \\glossterm{condition}.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Hamstring",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\slowed as a \\glossterm{condition}.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },

    {
      name: "Greater Hamstring",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\slowed as a \\glossterm{condition}.
      `,
      rank: 6,
      type: "Duration",
    },

    {
      name: "Two-Weapon Rend",

      effect: `
        Make a melee strike using a slashing weapon.
        At the end of this phase, each creature that you hit during this phase with both this strike and the \\textit{offhand strike} ability takes slashing damage equal to half your \\glossterm{power} (minimum 1).
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
        At the end of this phase, each creature that you hit during this phase with both this strike and the \\textit{offhand strike} ability takes slashing damage equal to your \\glossterm{power}.
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
        Make a strike with a +2 damage bonus using a slashing weapon.
        If the subject is wearing metal armor or is significantly composed of metal, damage dealt by the strike is fire damage in addition to its normal damage types.
      `,
      rank: 3,
      scaling: {
        5: "The damage bonus increases to +5.",
        7: "The damage bonus increases to +10.",
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
        4: "You gain a +2 damage bonus with the strike.",
        6: "The damage bonus increases to +5.",
      },
      type: "Instant",
    },

    {
      name: "Sweeping Throw",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing weapon.
        The strike also targets an additional creature or object within 5 feet of the strike's primary target.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +2 damage bonus with the strike.",
        6: "The damage bonus increases to +5.",
      },
      type: "Instant",
    },

    {
      name: "Greater Sweeping Throw",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing weapon.
        The strike also targets up to two additional creatures or object within 5 feet of the strike's primary target.
      `,
      rank: 5,
      scaling: {
        7: "You gain a +5 damage bonus with the strike.",
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
        6: "You gain a +5 damage bonus with the strike.",
      },
      type: "Instant",
    },

    // is 2x power equal to +5-10 damage? sometimes better, sometimes worse, especially with the
    // delay and limited stacking, so seems fine
    {
      name: "Bloodletting Strike",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature damaged by the strike \\glossterm{briefly} bleeds from the wound.
        It takes physical damage equal to half your \\glossterm{power} with that strike at the end of each round.
        This damage does not stack if you use this strike on the same creature again before it stops bleeding.
      `,
      rank: 5,
      scaling: {
        7: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Duration",
    },

    {
      name: "Bloodletting Sweep",

      functionsLike: {
        name: 'bloodletting strike',
        exceptThat: 'the strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag (see \\pcref{Weapon Tags}).',
      },
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

      effect: `
        Make two melee \\glossterm{strikes} using a slashing weapon.
        You do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Tear Exposed Flesh",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        If the target does not have any remaining \\glossterm{damage resistance}, your \\glossterm{power} with the strike is doubled.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Greater Tear Exposed Flesh",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        If the target does not have any remaining \\glossterm{damage resistance}, your \\glossterm{power} with the strike is tripled.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Flay",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\dazed.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 \\glossterm{accuracy} bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },

    {
      name: "Greater Flay",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\stunned.
      `,
      rank: 6,
      type: "Duration",
    },
  ],
};
