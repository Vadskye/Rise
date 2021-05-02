import { CombatStyle } from ".";

export const dirtyFighting: CombatStyle = {
  name: "Dirty Fighting",
  shortDescription: "Disable foes using freehanded attacks and tricks.",

  maneuvers: [
    {
      name: "Dazing Fist",

      effect: `
        Make a strike using an \\glossterm{unarmed attack}.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazed as a \\glossterm{condition}.
      `,
      rank: 1,
      type: "Duration",
    },

    {
      name: "Stunning Fist",

      effect: `
        Make a strike using an \\glossterm{unarmed attack}.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
        `,

      rank: 3,
      type: "Duration",
    },

    {
      name: "Quivering Palm",

      effect: `
        Make a strike using an \\glossterm{unarmed attack}.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike loses additional hit points equal to half its maximum hit points.
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
      name: "Instant Pin",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          it requires two \\glossterm{free hands} to use, and the subject is immediately pinned (see \\pcref{Pin}).
          Any accuracy bonuses you have that apply specifically to the \\textit{grapple} ability also apply to this ability.
        `,
        name: "grapple",
      },
      rank: 7,
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
        6: "The distance you knockback the subject increases to 30 feet, or 60 feet on a critical hit.",
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
        `,
        name: "disarm",
      },
      rank: 2,
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
      rank: 6,
      type: "Instant",
    },

    {
      name: "Sunder",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you gain a +1d bonus to damage with the strike.
          Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.
        `,
        name: "disarm",
      },
      rank: 1,
      type: "Instant",
    },

    {
      name: "Greater Sunder",

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
          you gain a +1d bonus to damage with the strike.
          In addition, if you disarm an attended item and your attack result also beats the attending creature's Armor defense, you may choose to deal damage to the attending creature in addition to its item.
          Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.
        `,
        name: "disarm",
      },
      rank: 4,
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
      name: "Deattunement Strike",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike.
        Each creature that loses \\glossterm{hit points} from the strike stops being \\glossterm{attuned} to two effects.
        It can freely choose which effects it releases its attunement to.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Spellbreaker Strike",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        If a creature takes damage from the strike, it stops being \\glossterm{attuned} to one effect.
        It can freely choose which effect it releases its attunement to.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Spellbane Strike",

      effect: `
        Make a melee \\glossterm{strike}.
        You gain a +2 bonus to \\glossterm{accuracy} with the strike against each creature that is using a \\abilitytag{Focus} ability during the current phase.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Spellbane Flurry",

      effect: `
        Make two melee \\glossterm{strikes}.
        Your \\glossterm{power} with both strikes is halved.
        You take a -4 penalty to \\glossterm{accuracy} with the strikes against any target that is not using a \\abilitytag{Focus} ability during the current phase.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Alchemical Strike",

      effect: `
        Make a melee \\glossterm{strike} with a -1d penalty to damage.
        In addition, you can throw a tanglefoot bag, vial of alchemist's fire, or similar small object at a target of the strike.
        You must still have a free hand that is not being used to make the strike to throw the object.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Slipstrike",

      effect: `
        Make a melee \\glossterm{strike} with a +1d bonus to damage.
        After making the strike, you fall \\prone, and you cannot stand up until after the next \\glossterm{movement phase}.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Unbalancing Strike",

      effect: `
        Make a \\glossterm{strike}.
        Each creature damaged by the strike takes a -2 penalty to Reflex defense until the end of the next round.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Greater Unbalancing Strike",

      effect: `
        Make a \\glossterm{strike}.
        Each creature damaged by the strike takes a -4 penalty to Reflex defense until the end of the next round.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Supreme Unbalancing Strike",

      effect: `
        Make a \\glossterm{strike}.
        Each creature damaged by the strike takes a -6 penalty to Reflex defense until the end of the next round.
      `,
      rank: 5,
      type: "Instant",
    },

    {
      name: "Sweep the Leg",

      effect: `
        Make a melee \\glossterm{strike} with a -2d penalty to damage.
        Each creature damaged by the strike falls \\prone.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Anklesprainer",

      effect: `
        Make a melee \\glossterm{strike}.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature damaged by the strike is \\slowed until the end of the next round.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Greater Anklesprainer",

      effect: `
        Make a melee \\glossterm{strike}.
        You take a -2d penalty to damage with the strike, and your \\glossterm{power} is halved.
        Each creature damaged by the strike is \\decelerated until the end of the next round.
      `,
      rank: 4,
      type: "Instant",
    },
  ],
};
