import { CombatStyle } from ".";

export const flurryOfBlows: CombatStyle = {
  name: "Flurry of Blows",
  shortDescription: "Attack rapidly at any range.",
  sources: ["esoteric", "wild"],

  maneuvers: [
    {
      name: "Twinstrike",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike.
        In exchange, you roll to hit twice and take the higher result.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Rapid Quaff",

      effect: `
        Make a \\glossterm{strike}.
        You take a -1d penalty to damage with the strike.
        In addition, you can drink a potion.
        You must still have a free hand that is not being used to make the strike to hold and drink the potion.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Desperate Flurry",

      effect: `
        When you use this ability, you gain two \\glossterm{fatigue points}.

        Make two \\glossterm{strikes}.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Greater Desperate Flurry",

      effect: `
        When you use this ability, you gain one \\glossterm{fatigue point}.

        Make two \\glossterm{strikes}.
        You cannot use the \\textit{desperate exertion} ability to affect these strikes.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Rebounding Flurry",

      effect: `
        You can only use this ability during the \\glossterm{action phase}.
        Make a \\glossterm{strike}.
        If all damage from the strike is resisted, you can make an additional strike during the \\glossterm{delayed action phase}.
        You take a -2d penalty to damage with both strikes.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Rebounding Flurry",

      effect: `
        You can only use this ability during the \\glossterm{action phase}.
        Make a \\glossterm{strike}.
        If all damage from the strike is resisted, you can make an additional strike during the \\glossterm{delayed action phase}.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Strike Flurry",

      // basically +1d
      effect: `
        Make two \\glossterm{strikes}.
        You take a -2d penalty to damage with both strikes, and your \\glossterm{power} is halved.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Greater Strike Flurry",

      // basically +3d
      effect: `
        Make two \\glossterm{strikes}.
        You take a -1d penalty to damage with both strikes, and your \\glossterm{power} is halved.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Supreme Strike Flurry",

      // basically +3d
      effect: `
        Make two \\glossterm{strikes}.
        Your \\glossterm{power} is halved with both strikes.
      `,
      rank: 7,
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
      type: "Instant",
    },

    {
      name: "Greater Power Flurry",

      // basically +3d, -2a
      effect: `
        Make two \\glossterm{strikes} with a -2 penalty to \\glossterm{accuracy}.
        You gain a +1d bonus to damage with both strikes, but your \\glossterm{power} is halved.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Whirlwind",

      effect: `
        Make a melee \\glossterm{strike} using a light or medium slashing or bludgeoning weapon against all \\glossterm{enemies} within your weapon's \\glossterm{reach}.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Whirlwind Flurry",

      effect: `
        Make two melee \\glossterm{strikes} with a -2 penalty to \\glossterm{accuracy} using a light or medium slashing or bludgeoning weapon against all \\glossterm{enemies} within your weapon's \\glossterm{reach}.
        You take a -2d penalty to damage with both strikes, and your \\glossterm{power} is halved.
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
      type: "Instant",
    },

    {
      name: "Greater Volley Fire",

      effect: `
        Make a ranged \\glossterm{strike} using a projectile weapon against each creature in a \\medarea radius within \\longrange.
        Your \\glossterm{power} with the strike is halved.
        This strike costs ten projectiles.
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
