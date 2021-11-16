import { CombatStyle } from ".";

export const flurryOfBlows: CombatStyle = {
  name: "Flurry of Blows",
  shortDescription: "Attack rapidly at any range.",

  maneuvers: [
    {
      name: "Twinstrike",

      // roll twice is a little over 2.5 accuracy; not adding power makes this normally
      // worse than certain strike, but it's better for crit fishing
      effect: `
        Make a \\glossterm{strike}.
        You may reroll the accuracy roll and take the highest result.
        However, you do not add your \\glossterm{power} to damage with the strike.
      `,
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Instant",
    },

    // roll three times is about 4.5 accuracy
    {
      name: "Triplestrike",

      effect: `
        Make a \\glossterm{strike}.
        You may reroll the accuracy roll twice and take the highest result.
        However, you do not add your \\glossterm{power} to damage with the strike.
      `,
      rank: 5,
      scaling: {
        7: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Rapid Quaff",

      effect: `
        Make a \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        In addition, you can drink a potion.
        You must still have a free hand that is not being used to make the strike to hold and drink the potion.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Desperate Flurry",

      // Two fatigue instead of one fatigue like desperate smash because it also doubles
      // damage from power
      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by two.

        Make two \\glossterm{strikes}.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +4 damage bonus with both strikes.",
      },
      type: "Instant",
    },

    {
      name: "Greater Desperate Flurry",

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make three \\glossterm{strikes}.
        Your \\glossterm{power} with each strike is halved.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 7,
      type: "Instant",
    },

    {
      name: "Rebounding Flurry",

      effect: `
        Make a melee \\glossterm{strike}.
        You can make an additional \\glossterm{strike} against each creature that resisted all damage from the first strike.
        You do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with both strikes.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    // TODO: unclear rank
    {
      name: "Strike Flurry",

      effect: `
        Make two \\glossterm{strikes}.
        You do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Power Flurry",

      effect: `
        Make two \\glossterm{strikes} with a -3 penalty to \\glossterm{accuracy}.
        Your \\glossterm{power} is halved with both strikes.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +2 damage bonus with both strikes.",
        6: "The damage bonus increases to +4.",
      },
      type: "Instant",
    },

    {
      name: "Whirlwind",

      effect: `
        Make a melee \\glossterm{strike} using a light or medium slashing or bludgeoning weapon.
        The strike targets all \\glossterm{enemies} within your \\glossterm{reach} with that weapon.
        Your \\glossterm{power} with the strike is halved.
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
      name: "Tripping Whirlwind",

      effect: `
        Make a melee \\glossterm{strike} using a light or medium slashing or bludgeoning weapon.
        You do not add your \\glossterm{power} to damage with the strike.
        The strike targets all \\glossterm{enemies} within your weapon's \\glossterm{reach}.
        Each creature damaged by the strike that is no more than one size category larger than you larger than you falls \\glossterm{prone}.
      `,
      rank: 5,
      scaling: {
        7: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Whirlwind Flurry",

      effect: `
        Make two melee \\glossterm{strikes} using a light or medium slashing or bludgeoning weapon against all \\glossterm{enemies} within your weapon's \\glossterm{reach}.
        You take a -2 accuracy penalty with both strikes, and you do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 7,
      type: "Instant",
    },

    {
      name: "Barrage",

      effect: `
        Make two ranged \\glossterm{strikes} with a -4 penalty to \\glossterm{accuracy}.
        Your \\glossterm{power} with both strikes is halved.
        For each previous round that you used this ability without moving, you reduce the accuracy penalty by 1.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +4 damage bonus with both strikes.",
      },
      type: "Instant",
    },

    {
      name: "Shrapnel Burst",

      effect: `
        Make a ranged \\glossterm{strike} using a projectile weapon against each creature in a \\smallarea cone from you.
        Your \\glossterm{power} with the strike is halved.
        This strike costs five projectiles.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Greater Shrapnel Burst",

      functionsLike: {
        exceptThat: "the area increases to a \\largearea cone from you.",
        name: "shrapnel strike",
      },
      rank: 5,
      scaling: {
        7: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Volley Fire",

      effect: `
        Make a ranged \\glossterm{strike} using a projectile weapon against each creature in a \\smallarea radius within \\medrange.
        Your \\glossterm{power} with the strike is halved.
        This strike costs five projectiles.
      `,
      rank: 5,
      scaling: {
        7: "The area increases to a \\medarea radius.",
      },
      type: "Instant",
    },

    {
      name: "Quickdraw",

      effect: `
        You draw one or two small or medium weapons into your \\glossterm{free hands}.
        Then, you can make a \\glossterm{strike}.
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
      name: "Quickshot",

      effect: `
        Make a ranged \\glossterm{strike} using a \\glossterm{projectile} weapon against a creature adjacent to you.
        You do not suffer the normal -4 accuracy penalty for using a medium or large ranged weapon against a creature adjacent to you on this attack.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Distracting Twinstrike",

      // condition is -1 rank worse than a normal r1 condition
      effect: `
        Make a \\glossterm{strike}.
        You may reroll the accuracy roll twice and take the highest result.
        However, do not add your \\glossterm{power} to damage with the strike.
        Each creature damaged by the strike \\glossterm{briefly} takes a -4 penalty to \\glossterm{initiative} checks and Awareness checks.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Frenzied Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        For each previous consecutive round in which you used this ability, you gain a +2 damage bonus with the strike, up to a maximum of +5.
      `,
      scaling: {
        4: 'The damage bonus per round increases to +3, and the maximum damage bonus increases to +8.',
        6: 'The damage bonus per round increases to +6, and the maximum damage bonus increases to +16.',
      },
      rank: 2,
      type: "Instant",
    },

    {
      name: "Deathseeking Flurry",

      effect: `
        Make a melee \\glossterm{strike}.
        If you use this ability during the \\glossterm{action phase}, you can make an additional \\glossterm{strike} against each creature that lost hit points from the first strike during the \\glossterm{delayed action phase}.
        You do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 1,
      scaling: {
        3: "You gain a +2 damage bonus with both strikes.",
        5: "The damage bonus increases to +4.",
        7: "The damage bonus increases to +8.",
      },
      type: "Instant",
    },

    {
      name: "Static Strike",

      effect: `
        Make a melee strike with a +1 accuracy bonus.
        Damage dealt by the strike is electricity damage in addition to its normal damage types.
      `,
      rank: 3,
      scaling: {
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Instant",
    },

    {
      name: "Mind-Numbing Swiftstrike",

      effect: `
        Make a melee \\glossterm{strike} with a +1 accuracy bonus.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature damaged by the strike is \\glossterm{briefly} \\dazed.
      `,
      rank: 2,
      scaling: {
        4: "The accuracy bonus increases to +2.",
        6: "The accuracy bonus increases to +3.",
      },
      type: "Instant",
    },

    {
      name: "Greater Mind-Numbing Swiftstrike",

      effect: `
        Make a melee \\glossterm{strike} with a +1 accuracy bonus.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature damaged by the strike is \\glossterm{briefly} \\stunned.
      `,
      rank: 6,
      type: "Instant",
    },
  ],
};
