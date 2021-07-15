import { CombatStyle } from ".";

export const flurryOfBlows: CombatStyle = {
  name: "Flurry of Blows",
  shortDescription: "Attack rapidly at any range.",

  maneuvers: [
    {
      name: "Twinstrike",

      effect: `
        Make a \\glossterm{strike} with a -2d damage penalty.
        You roll to hit twice and take the higher result.
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
      name: "Triplestrike",

      effect: `
        Make a \\glossterm{strike} with a -1d damage penalty.
        You roll to hit three times and take the highest result.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Rapid Quaff",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
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
        6: "You gain a +1d damage bonus with both strikes.",
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
        Make a melee \\glossterm{strike} with a -2d damage penalty.
        You can make an additional \\glossterm{strike} with a -2d damage penalty against each creature that resisted all damage from the first strike.
        Your \\glossterm{power} with both strikes is halved.
      `,
      rank: 2,
      scaling: {
        4: "The damage penalty with both strikes is reduced to -1d.",
        6: "The damage penalty with both strikes is removed.",
      },
      type: "Instant",
    },

    {
      name: "Strike Flurry",

      // basically +1d
      effect: `
        Make two \\glossterm{strikes}.
        You take a -2d damage penalty with both strikes, and your \\glossterm{power} is halved.
      `,
      rank: 3,
      scaling: {
        5: "The damage penalty with both strikes is reduced to -1d.",
        7: "The damage penalty with both strikes is removed.",
      },
      type: "Instant",
    },

    {
      name: "Power Flurry",

      // basically +3d, -3a
      effect: `
        Make two \\glossterm{strikes} with a -3 penalty to \\glossterm{accuracy}.
        Your \\glossterm{power} is halved with both strikes.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1d damage bonus with both strikes.",
        6: "The damage bonus increases to +2d.",
      },
      type: "Instant",
    },

    {
      name: "Whirlwind",

      effect: `
        Make a melee \\glossterm{strike} using a light or medium slashing or bludgeoning weapon.
        The strike targets all \\glossterm{enemies} within your weapon's \\glossterm{reach}.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Tripping Whirlwind",

      effect: `
        Make a melee \\glossterm{strike} using a light or medium slashing or bludgeoning weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
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
        You take a -2d damage penalty with both strikes, and your \\glossterm{power} is halved.
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
        6: "You gain a +1d damage bonus with both strikes.",
      },
      type: "Instant",
    },

    {
      name: "Shrapnel Strike",

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
      name: "Greater Shrapnel Strike",

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
        You draw one or two weapons into your \\glossterm{free hands}.
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
        Make a \\glossterm{strike} with a -2d damage penalty.
        You roll to hit twice and take the higher result.
        Each creature that loses \\glossterm{hit points} from the strike \\glossterm{briefly} takes a -4 penalty to \\glossterm{initiative} checks and Awareness checks.
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
        % This would be easier to write as +1d up to +3d, but that is very
        % annoying to track in practice due to the different dice for each stage.
        % A static damage bonus is more complex to write down, but much easier
        % to actually make attacks with.
        For each previous consecutive round that you used this ability, you gain a +1 damage bonus with the strike, up to a maximum of +3.
      `,
      scaling: {
        special: `
          The damage bonus for each consecutive round increases by 1 for each rank beyond 1.
          In addition, the maximum damage bonus increases by 3 for each rank beyond 1.
        `,
      },
      rank: 1,
      type: "Instant",
    },

    {
      name: "Harrying Strike",

      // -2 levels relative to a normal r1 debuff
      effect: `
        Make a melee \\glossterm{strike} with a -2d damage penalty.
        Each creature damaged by the strike \\glossterm{briefly} increases its \\glossterm{focus penalty} by 2.
      `,
      rank: 3,
      scaling: {
        5: "The penalty increases to -3.",
        7: "The penalty increases to -4.",
      },
      type: "Duration",
    },

    {
      name: "Deathseeking Flurry",

      effect: `
        Make a melee \\glossterm{strike} with a -2d damage penalty.
        You can make an additional \\glossterm{strike} with a -2d damage penalty against each creature that lost hit points from the first strike.
        Your \\glossterm{power} with both strikes is halved.
      `,
      rank: 1,
      scaling: {
        3: "The damage penalty with both strikes is reduced to -1d.",
        5: "The damage penalty with both strikes is removed.",
        7: "You gain a +1d damage bonus with both strikes.",
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
        Make a melee \\glossterm{strike}.
        You take a -1d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazed as a \\glossterm{condition}.
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
      name: "Greater Mind-Numbing Swiftstrike",

      effect: `
        Make a melee \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Supreme Mind-Numbing Swiftstrike",

      effect: `
        Make a melee \\glossterm{strike}.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\confused as a \\glossterm{condition}.
      `,
      rank: 7,
      type: "Instant",
    },
  ],
};
