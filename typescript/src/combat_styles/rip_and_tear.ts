import { CombatStyle } from ".";

export const ripAndTear: CombatStyle = {
  name: "Rip and Tear",
  shortDescription: "Rip foes apart with slashing weapons.",

  maneuvers: [
    {
      name: "Strip the Flesh",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike becomes \\glossterm{briefly} \\glossterm{vulnerable} to all damage.
      `,
      rank: 3,
    },

    {
      name: "Strip the Flesh+",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike becomes \\glossterm{vulnerable} to all damage as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: "Strip the Armor",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature that resists all damage from the strike \\glossterm{briefly} takes a -2 penalty to Armor defense.
      `,
      rank: 3,
    },

    {
      name: "Rend the Hide",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You gain a +1 \\glossterm{accuracy} bonus with the strike against creatures that are not wearing metal armor.
      `,
      rank: 3,
    },

    {
      name: "Brow Gash",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\glossterm{briefly} \\dazzled.
      `,
      rank: 1,
    },

    {
      name: "Bloody Brow Gash",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazzled as a \\glossterm{condition}.
        In addition, it \\glossterm{briefly} takes damage equal to your \\glossterm{power} at the end of each round.
      `,
      rank: 5,
    },

    {
      name: "Blinding Brow Gash",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike is \\blinded as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: "Hamstring",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\slowed as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: "Hamstring+",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature damaged by the strike is \\slowed as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: "Two-Weapon Rend",

      effect: `
        Make a melee strike using a slashing weapon.
        At the end of this phase, each creature that you hit during this phase with both this strike and the \\textit{offhand strike} ability takes slashing damage equal to half your \\glossterm{power}.
      `,
      rank: 1,
    },

    {
      name: "Two-Weapon Rend+",

      effect: `
        Make a melee strike using a slashing weapon.
        At the end of this phase, each creature that you hit during this phase with both this strike and the \\textit{offhand strike} ability takes slashing damage equal to your \\glossterm{power}.
      `,
      rank: 5,
    },

    {
      name: "Flintspark Strike",

      effect: `
        Make a strike using a slashing weapon.
        Damage dealt by the strike is fire damage in addition to its normal damage types.
      `,
      rank: 1,
    },

    {
      name: "Sweeping Strike",

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon.
        The strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag (see \\pcref{Weapon Tags}).
      `,
      rank: 3,
    },

    {
      name: "Sweeping Throw",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing weapon.
        The strike also targets an additional creature or object within 10 feet of the strike's primary target.
      `,
      rank: 3,
    },

    {
      name: "Sweeping Throw+",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing weapon.
        The strike also targets up to two additional creatures or object within 10 feet of the strike's primary target.
      `,
      rank: 5,
    },

    {
      name: "Ricochet",

      effect: `
        Make a thrown \\glossterm{strike} using a slashing or bludgeoning weapon against up to three creatures or objects within \\shortrange of you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 3,
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
    },

    {
      name: "Bloodletting Sweep",

      functionsLike: {
        name: 'bloodletting strike',
        exceptThat: 'the strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag (see \\pcref{Weapon Tags}).',
      },
      rank: 7,
    },

    {
      name: "Spinning Slash",

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon.
        The strike targets any number of \\glossterm{enemies} within your \\glossterm{reach} with that weapon.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 1,
    },

    {
      name: "Spinning Slash+",

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon.
        The strike targets any number of \\glossterm{enemies} within your \\glossterm{reach} with that weapon.
      `,
      rank: 5,
    },

    {
      name: "Twinslash",

      effect: `
        Make two melee \\glossterm{strikes} using a slashing weapon.
        You do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 5,
    },

    {
      name: "Tear Exposed Flesh",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        If the target does not have any remaining \\glossterm{damage resistance}, you gain a +2 damage bonus with the strike.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +4.",
        5: "The damage bonus increases to +8.",
        7: "The damage bonus increases to +16.",
      },
    },

    {
      name: "Agonizing Flay",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\glossterm{briefly} \\dazed.
      `,
      rank: 1,
    },

    {
      name: "Agonizing Flay+",

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\glossterm{briefly} \\stunned.
      `,
      rank: 5,
    },
  ],
};
