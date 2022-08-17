import { CombatStyle } from ".";

export const dirtyFighting: CombatStyle = {
  name: "Dirty Fighting",
  shortDescription: "Disable foes using freehanded attacks and tricks.",

  maneuvers: [
    {
      name: "Dazing Fist",

      // -2 ranks due to unarmed limitation
      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        Each creature that loses \\glossterm{hit points} from the strike is \\dazed as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: "Dazing Fist+",

      // -2 ranks due to unarmed limitation
      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        Each creature damaged by the strike is \\dazed as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: "Stunning Fist",

      // -2 ranks due to unarmed limitation
      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: "Quivering Palm",

      effect: `
        Make a strike using the punch/kick \\glossterm{natural weapon} (see \\pcref{Natural Weapons}).
        Each creature that loses \\glossterm{hit points} from the strike takes additional bludgeoning damage equal to four times your \\glossterm{power}.
        Those creatures cannot take extra damage from this effect again until they take a \\glossterm{short rest}.
      `,
      rank: 7,
    },

    {
      name: "Strangle",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          the target also takes 1d8 + half \\glossterm{power} bludgeoning damage.
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: "grapple",
      },
      rank: 3,
      scaling: "damage",
    },

    {
      name: "Muzzling Grapple",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          the target also has a 20\\% \\glossterm{failure chance} with abilities that have \\glossterm{verbal components} as long as it is \\grappled by you.
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: "grapple",
      },
      rank: 1,
    },

    {
      name: "Muzzling Grapple+",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          the target also has a 50\\% \\glossterm{failure chance} with abilities that have \\glossterm{verbal components} as long as it is \\grappled by you.
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: "grapple",
      },
      rank: 5,
    },

    {
      name: "Pin",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          if the target has no remaining \\glossterm{damage resistance}, it is pinned completely instead of simply grappled.
          It is \\helpless, and the only physical ability it can use is the \\textit{escape grapple} ability (see \\pcref{Escape Grapple}).
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: "grapple",
      },
      rank: 7,
    },

    {
      name: "Knockback Shove",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you \\glossterm{knockback} the target up to 15 feet instead of pushing it.
          On a critical hit, you knockback the target 30 feet instead.
          Any accuracy bonuses you have that apply specifically to the \\textit{shove} ability also apply to this ability.
        `,
        name: "shove",
      },
      rank: 1,
    },

    {
      name: "Knockback Sweep",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          it affects up to three creatures within your \\glossterm{reach} instead of only one.
          In addition, you \\glossterm{knockback} each target up to 15 feet instead of pushing it.
          On a critical hit, you knockback each target 30 feet instead.
          Any accuracy bonuses you have that apply specifically to the \\textit{shove} ability also apply to this ability.
        `,
        name: "shove",
      },
      rank: 3,
    },

    {
      name: "Disarm Weapon",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you can also knock loose objects held in a single hand.
          On a critical hit, you can also knock loose an object held in two hands.
          Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.

          After you successfully knock an item loose from a creature with this ability, it gains a +5 bonus to its defenses against this ability until it takes a \\glossterm{short rest}.
        `,
        name: "disarm",
      },
      rank: 3,
    },

    {
      name: "Steal Weapon",

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: `
          you can immediately grab a disarmed object if you have a \\glossterm{free hand} available, including a hand you used for this ability.
          Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.
        `,
        name: "disarm weapon",
      },
      rank: 5,
    },

    {
      name: "Steal Weapon+",

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: `
          you can immediately grab a disarmed object if you have a \\glossterm{free hand} available, including a hand you used for this ability.
          Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.

          In addition, if you use this ability during the \\glossterm{action phase}, you can make a \\glossterm{strike} with a weapon you stole this way during the \\glossterm{delayed action phase}.
        `,
        name: "disarm weapon",
      },
      rank: 7,
    },

    {
      name: "Sunder",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          if you deal damage to an item and your attack result also beats an attending creature's Armor defense, you may choose to deal damage to the attending creature in addition to its item.
          Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.
        `,
        name: "disarm",
      },
      rank: 3,
    },

    {
      name: "Battering Ram",

      functionsLike: {
        abilityType: "ability",
        // This is basically a 30' line of standard AOE damage, -1d because it's easier to optimize
        exceptThat: `
          it requires a standard action to use and does not increase your \\glossterm{fatigue level}.
          In addition, creatures cannot choose to avoid you and each creature that you move through takes 1d8 + half \\glossterm{power} bludgeoning damage.
          Any accuracy bonuses you have that apply specifically to the \\textit{overrun} ability also apply to this ability.
        `,
        name: "overrun",
      },
      scaling: "damage",
      rank: 3,
    },

    {
      name: "Battering Ram+",

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: `
          you do not treat the space occupied by creatures you move through as difficult terrain.
          In addition, the damage increases to 4d8 + half \\glossterm{power}.
          Any accuracy bonuses you have that apply specifically to the \\textit{overrun} ability also apply to this ability.
        `,
        name: "battering ram",
      },
      scaling: "damage",
      rank: 7,
    },

    {
      name: "Alchemical Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        In addition, you can throw a tanglefoot bag, vial of alchemist's fire, or similar small object at a target of the strike.
        You must still have a free hand that is not being used to make the strike to throw the object.
      `,
      rank: 3,
    },

    {
      name: "Slipstrike",

      effect: `
        Make a melee \\glossterm{strike} with a +1 accuracy bonus.
        After making the strike, you fall \\prone.
        If you use this ability during the \\glossterm{delayed action phase}, you are also unable to stand up during the next round's \\glossterm{movement phase}.
      `,
      rank: 1,
    },

    {
      name: "Unbalancing Strike",

      effect: `
        Make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike \\glossterm{briefly} takes a -2 penalty to Reflex defense.
      `,
      rank: 1,
    },

    {
      name: "Sweep the Leg",

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike falls \\prone if it is no larger than one size category larger than you.
        A creature knocked prone in this way cannot be knocked prone by this effect again until it takes a \\glossterm{short rest}.
      `,
      rank: 1,
    },

    {
      name: "Anklesprainer",

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\glossterm{briefly} \\slowed.
      `,
      rank: 1,
    },

    {
      name: "Switchstrike",

      effect: `
        Make a melee \\glossterm{strike}.
        You may switch places with one creature damaged by the strike that is the same \\glossterm{size category} as you or smaller.
      `,
      rank: 1,
    },

    {
      name: "Eye-Averting Strike",

      effect: `
        Make a \\glossterm{strike} with a -2 accuracy penalty.
        Each creature damaged by the strike \\glossterm{briefly} treats you as being \\trait{invisible} (see \\pcref{Invisible}).
      `,
      rank: 5,
    },
  ],
};
