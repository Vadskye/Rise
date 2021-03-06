import { CombatStyle } from ".";

export const dirtyFighting: CombatStyle = {
  name: "Dirty Fighting",
  shortDescription: "Disable foes using freehanded attacks and tricks.",
  sources: ["esoteric", "primal", "trick"],

  maneuvers: [
    {
      name: "Dazing Fist",

      effect: `
        Make a strike using an \\glossterm{unarmed attack}.
        Your \\glossterm{power} with the strike is halved.
        If a creature loses hit points from the strike, it is \\glossterm{dazed} as a \\glossterm{condition}.
      `,
      rank: 1,
      type: "Duration",
    },

    {
      name: "Stunning Fist",

      effect: `
        Make a strike using an \\glossterm{unarmed attack}.
        Your \\glossterm{power} with the strike is halved.
        If a creature loses hit points from the strike, it is \\glossterm{stunned} as a \\glossterm{condition}.
        `,

      rank: 3,
      type: "Duration",
    },

    {
      name: "Quivering Palm",

      effect: `
        Make a strike using an \\glossterm{unarmed attack}.
        Your \\glossterm{power} with the strike is halved.
        If a creature loses hit points from the strike, it loses additional hit points equal to half its maximum hit points.
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
      name: "Knockdown",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You take a -1d penalty to damage with the strike.
        If a creature loses hit points from the strike, it falls \\glossterm{prone}.
      `,
      rank: 2,
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

      // original targets: One creature within your \glossterm{reach}

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

      // original targets: One creature within your \glossterm{reach}

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: `
        This maneuver functions like the \\textit{disarm weapon} ability, except that you can immediately grab a disarmed object if you have a \\glossterm{free hand} available, including a hand you used for this ability.
        Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.

        In addition, if you use this ability during the \\glossterm{action phase}, you can make a \\glossterm{strike} with the stolen weapon during the \\glossterm{delayed action phase}.
        `,
        name: "disarm weapon",
      },
      rank: 6,
      type: "Instant",
    },

    {
      name: "Sunder",

      // original targets: One creature within your \glossterm{reach}

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
        This maneuver functions like the \\textit{disarm} ability, except that you gain a +1d bonus to damage with the strike.
        Any accuracy bonuses you have that apply specifically to the \\textit{disarm} ability also apply to this ability.
        `,
        name: "disarm",
      },
      rank: 1,
      type: "Instant",
    },

    {
      name: "Sundering Followthrough",

      // original targets: One creature within your \glossterm{reach}

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
        This maneuver functions like the \\textit{disarm} ability, except that you gain a +1d bonus to damage with the strike.
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

      // original targets: Each creature in the area (see text)

      functionsLike: {
        abilityType: "ability",
        exceptThat: `
        This maneuver functions like the \\textit{overrun} ability, except that it requires a standard action to use and does not cause you to gain a \\glossterm{fatigue point}.
        In addition, creatures cannot choose to avoid you and each creature that you move through takes bludgeoning damage equal to 2d6 plus half your \\glossterm{power}, or double that damage on a critical hit.
        Any accuracy bonuses you have that apply specifically to the \\textit{overrun} ability also apply to this ability.

        \\rankline
        The damage increases by +1d for each rank beyond 3.
        `,
        name: "overrun",
      },
      rank: 3,
      type: "Instant",
    },

    {
      name: "Battering Rush",

      // original targets: Each creature in the area (see text)

      functionsLike: {
        abilityType: "maneuver",
        exceptThat: `
        This maneuver functions like the \\textit{battering ram} ability, except that you do not treat the space occupied by creatures you move through as difficult terrain.
        In addition, missing an attack does not cause you to fall prone, though it still ends your movement.
        The damage also increases to 4d6 plus half your \\glossterm{power}.
        Any accuracy bonuses you have that apply specifically to the \\textit{overrun} ability also apply to this ability.

        \\rankline
        The damage increases by +1d for each rank beyond 6.
        `,
        name: "battering ram",
      },
      rank: 6,
      type: "Instant",
    },

    {
      name: "Deattunement Strike",

      effect: `
        Make a \\glossterm{strike}.
        You take a -2d penalty to damage with the strike.
        If a creature loses hit points from the strike, it stops being \\glossterm{attuned} to two effects.
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
        You gain a +2 bonus to \\glossterm{accuracy} with the strike against each creature that is using a \\glossterm{Focus} ability during the current phase.
        `,

      rank: 2,
      type: "Instant",
    },

    {
      name: "Spellbane Flurry",

      effect: `
        Make two melee \\glossterm{strikes}.
        Your \\glossterm{power} with both strikes is halved.
        You take a -4 penalty to \\glossterm{accuracy} with the strikes against any target that is not using a \\glossterm{Focus} ability during the current phase.
        `,

      rank: 6,
      type: "Instant",
    },
  ],
};
