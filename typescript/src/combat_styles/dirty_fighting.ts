import { CombatStyle } from ".";

export const dirtyFighting: CombatStyle = {
  name: "Dirty Fighting",
  shortDescription: "Disable foes using freehanded attacks and tricks.",

  maneuvers: [
    {
      name: "Dazing Fist",

      // half power instead of no power due to unarmed limitation
      effect: `
        Make a strike using an \\glossterm{unarmed attack}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\glossterm{briefly} \\dazed.
      `,
      rank: 1,
      scaling: {
        3: "You gain a +1 accuracy bonus with the strike.",
        5: "The accuracy bonus increases to +2.",
        7: "The accuracy bonus increases to +3.",
      },
      type: "Duration",
    },

    {
      name: "Stunning Fist",

      // half power instead of no power due to unarmed limitation
      effect: `
        Make a strike penalty using an \\glossterm{unarmed attack}.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1 accuracy bonus with the strike.",
        7: "The accuracy bonus increases to +2.",
      },
      type: "Duration",
    },

    {
      name: "Quivering Palm",

      effect: `
        Make a strike using an \\glossterm{unarmed attack}.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike takes additional bludgeoning damage to half of its maximum hit points, to a maximum of 100 extra damage.
      `,
      rank: 7,
      type: "Instant",
    },

    {
      name: "Strangle",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          the subject also takes 1d8 + half \\glossterm{power} bludgeoning damage.
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: "grapple",
      },
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Muzzling Grapple",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          the subject also has a 25\\% \\glossterm{failure chance} with abilities that have \\glossterm{verbal components} as long as it is \\grappled by you.
          This failure chance increases to 50\\% with abilities that have both verbal components and \\glossterm{somatic components}.
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: "grapple",
      },
      rank: 4,
      scaling: {
        6: "You gain a +1 \\glossterm{accuracy} bonus with the attack.",
      },
      type: "Instant",
    },

    {
      name: "Pin",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          if the subject has no remaining \\glossterm{damage resistance}, the subject is pinned completely instead of simply grappled.
          It is \\glossterm{helpless}, and the only physical ability it can use is the \\textit{escape grapple} ability (see \pcref{Escape Grapple}).
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: "grapple",
      },
      rank: 6,
      type: "Instant",
    },

    {
      name: "Knockback Shove",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you \\glossterm{knockback} the subject up to 15 feet instead of pushing it.
          On a critical hit, you knockback the subject 30 feet instead.
          Any accuracy bonuses you have that apply specifically to the \\textit{shove} ability also apply to this ability.
        `,
        name: "shove",
      },
      rank: 2,
      scaling: {
        4: "The distance you knockback the subject increases to 30 feet, or 60 feet on a critical hit.",
        6: "The distance you knockback the subject increases to 60 feet, or 120 feet on a critical hit.",
      },
      type: "Instant",
    },

    {
      name: "Knockback Sweep",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          it affects up to three creatures within your \\glossterm{reach} instead of only one.
          In addition, you \\glossterm{knockback} each subject up to 15 feet instead of pushing it.
          On a critical hit, you knockback each subject 30 feet instead.
          Any accuracy bonuses you have that apply specifically to the \\textit{shove} ability also apply to this ability.
        `,
        name: "shove",
      },
      rank: 4,
      scaling: {
        6: "The distance you knockback each subject increases to 30 feet, or 60 feet on a critical hit.",
      },
      type: "Instant",
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
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the attack.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
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
      rank: 4,
      scaling: {
        6: "You gain a +1 accuracy bonus with the attack.",
      },
      type: "Instant",
    },

    {
      name: "Greater Steal Weapon",

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
      type: "Instant",
    },

    {
      name: "Sunder",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          if you disarm an attended item and your attack result also beats the attending creature's Armor defense, you may choose to deal damage to the attending creature in addition to its item.
          Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.
        `,
        name: "disarm",
      },
      rank: 2,
      scaling: {
        4: "You gain a +2 damage bonus with the strike.",
        6: "The damage bonus increases to +4.",
      },
      type: "Instant",
    },

    {
      name: "Battering Ram",

      functionsLike: {
        abilityType: "ability",
        // This is basically a 30' line of standard AOE damage, -1d because it's easier to optimize
        exceptThat: `
          it requires a standard action to use and does not increase your \\glossterm{fatigue level}.
          In addition, creatures cannot choose to avoid you and each creature that you move through takes 1d10 + half \\glossterm{power} bludgeoning damage.
          Any accuracy bonuses you have that apply specifically to the \\textit{overrun} ability also apply to this ability.
        `,
        name: "overrun",
      },
      scaling: "damage",
      rank: 3,
      type: "Instant",
    },

    {
      name: "Greater Battering Ram",

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: `
          you do not treat the space occupied by creatures you move through as difficult terrain.
          In addition, the damage increases to 4d6 + half \\glossterm{power}.
          Any accuracy bonuses you have that apply specifically to the \\textit{overrun} ability also apply to this ability.
        `,
        name: "battering ram",
      },
      scaling: "damage",
      rank: 6,
      type: "Instant",
    },

    {
      name: "Alchemical Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        In addition, you can throw a tanglefoot bag, vial of alchemist's fire, or similar small object at a target of the strike.
        You must still have a free hand that is not being used to make the strike to throw the object.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Slipstrike",

      effect: `
        Make a melee \\glossterm{strike} with a +2 damage bonus.
        After making the strike, you fall \\prone.
        If you use this ability during the \\glossterm{delayed action phase}, you are also \\glossterm{briefly} unable to stand up.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +4.",
        5: "The damage bonus increases to +8.",
        7: "The damage bonus increases to +16.",
      },
      type: "Instant",
    },

    {
      name: "Unbalancing Strike",

      effect: `
        Make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike \\glossterm{briefly} takes a -2 penalty to Reflex defense.
      `,
      rank: 3,
      scaling: {
        5: "The penalty increases to -3.",
        7: "The penalty increases to -4.",
      },
      type: "Instant",
    },

    {
      name: "Sweep the Leg",

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by this strike falls \\prone.
        A creature knocked prone in this way cannot be knocked prone by this effect again until it takes a \\glossterm{short rest}.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Anklesprainer",

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature damaged by the strike is \\glossterm{briefly} \\slowed.
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
      name: "Switchstrike",

      effect: `
        Make a melee \\glossterm{strike}.
        You may switch places with one creature damaged by the strike that is the same \\glossterm{size category} as you or smaller.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1 accuracy bonus with the strike.",
        6: "The accuracy bonus increases to +2.",
      },
      type: "Instant",
    },

    {
      name: "Eye-Averting Strike",

      effect: `
        Make a \\glossterm{strike} with a -2 accuracy penalty.
        Each creature damaged by the strike \\glossterm{briefly} treats you as being \\glossterm{invisible}.
      `,
      rank: 5,
      scaling: {
        7: "The accuracy penalty is reduced to -1.",
      },
      type: "Duration",
    },
  ],
};
