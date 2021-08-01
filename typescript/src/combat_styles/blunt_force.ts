import { CombatStyle } from ".";

export const bluntForce: CombatStyle = {
  name: "Blunt Force",
  shortDescription: "Smash foes with bludgeoning weapons and raw power.",

  maneuvers: [
    {
      name: "Liver Crush",

      effect: `
        Make a \\glossterm{strike} with a -2d damage penalty using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\sickened.
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
      name: "Nauseating Liver Crush",

      effect: `
        Make a \\glossterm{strike} with a -2d damage penalty using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\nauseated.
      `,
      rank: 5,
      scaling: {
        7: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Duration",
    },

    {
      name: "Pulverizing Crush",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
      `,
      rank: 1,
      scaling: {
        3: "The damage penalty is removed.",
        5: "You gain a +1d damage bonus with the strike.",
        7: "The damage bonus increases to +2d.",
      },
      type: "Instant",
    },

    {
      name: "Pulverizing Power Crush",

      effect: `
        Make a \\glossterm{strike} with a -2 accuracy penalty using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You gain a +2d damage bonus with the strike.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +3d.",
        5: "The damage bonus increases to +4d.",
        7: "The damage bonus increases to +5d.",
      },
      type: "Instant",
    },

    {
      name: "Ground Stomp",

      attack: {
        hit: `Each subject takes 1d10 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      scaling: "damage",
      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Ground Stomp",

      attack: {
        glance: `Half damage.`,
        hit: `
          Each subject takes 2d8 + half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius from you that is on the same stable surface as you.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Supreme Ground Stomp",

      attack: {
        glance: `Half damage.`,
        hit: `
          Each subject takes 4d6 + half \\glossterm{power} bludgeoning damage.
          Each creature that loses \\glossterm{hit points} from this damage is knocked \\prone.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius from you that is on the same stable surface as you.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Ground Slam",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        The strike targets everything supported by that surface in a \\smallarealong, 5 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1d damage bonus with the strike.",
        6: "The damage bonus increases to +2d.",
      },
      type: "Instant",
    },

    {
      name: "Greater Ground Slam",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        The strike targets everything on that surface in a \\medarealong, 10 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1d damage bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Supreme Ground Slam",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        The strike targets everything on that surface in a \\largearealong, 15 ft. wide line from you.
        Your \\glossterm{power} with the strike is halved.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Resonating Strike",

      effect: `
        Make a strike with a +1d damage bonus using a bludgeoning weapon.
        Damage dealt by the strike is sonic damage in addition to its normal damage types.
      `,
      rank: 3,
      scaling: {
        5: "The damage bonus increases to +2d.",
        7: "The damage bonus increases to +3d.",
      },
      type: "Instant",
    },

    {
      name: "Headshot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        You take a -1d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazed as a \\glossterm{condition}.
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
      name: "Stunning Headshot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
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
      name: "Confusing Headshot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        You take a -2d damage penalty with the strike, and your \\glossterm{power} is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\confused as a \\glossterm{condition}.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Leap Slam",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to your \\glossterm{land speed} (see \\pcref{Leap}).
          When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, you emit a small shockwave.
          If you do, make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      scaling: "damage",
      rank: 4,
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
      name: "Knockdown",

      effect: `
        Make a \\glossterm{strike} with a -2d damage penalty using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        Each creature that loses \\glossterm{hit points} from the strike falls \\prone if it is no larger than one size category larger than you.
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
      name: "Forceful Strike",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The strike gains the \\glossterm{Forceful} weapon tag (see \\pcref{Weapon Tags}).
        If it already has that weapon tag, the maximum size category of creature that you can \\glossterm{knockback} with that tag increases by one size category.
      `,
      rank: 2,
      scaling: {
        4: "The distance that you can knockback the target increases by 10 feet.",
        6: "The distance that you can knockback the target increases by an additional 10 feet.",
      },
      type: "Instant",
    },

    {
      name: "Press Forward",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        After you make the strike, you can move up to 10 feet, \\glossterm{pushing} each creature damaged by the strike as you move.
        You cannot push creatures two or more size categories larger than you with this ability.
      `,
      rank: 2,
      scaling: {
        4: "You gain a +1d damage bonus with the strike.",
        6: "The damage bonus increases to +2d.",
      },
      type: "Instant",
    },

    {
      name: "Greater Press Forward",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        After you make the strike, you can move up to your movement speed, \\glossterm{pushing} each creature damaged by the strike as you move.
        You cannot push creatures two or more size categories larger than you with this ability.
      `,
      rank: 4,
      scaling: {
        6: "You gain a +1d damage bonus with the strike.",
      },
      type: "Instant",
    },

    {
      name: "Desperate Smash",

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a \\glossterm{strike} with a +2d damage bonus using a bludgeoning weapon.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +3d.",
        5: "The damage bonus increases to +4d.",
        7: "The damage bonus increases to +5d.",
      },
      type: "Instant",
    },

    {
      name: "Desperate Crush",

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a \\glossterm{strike} with a +2d damage bonus using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +3d.",
        5: "The damage bonus increases to +4d.",
        7: "The damage bonus increases to +5d.",
      },
      type: "Instant",
    },

    {
      name: "Dazing Smash",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\dazed.
        After it stops being dazed, it becomes immune to being dazed in this way until it takes a \\glossterm{short rest}.
      `,
      rank: 3,
      scaling: {
        5: "You gain a +1d damage bonus with the strike.",
        7: "The damage bonus increases to +2d.",
      },
      type: "Duration",
    },

    {
      name: "Stunning Smash",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\stunned.
        After it stops being stunned, it becomes immune to being stunned in this way until it takes a \\glossterm{short rest}.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Tenderizing Blow",

      effect: `
        Make a \\glossterm{strike} with a -2d damage penalty using a bludgeoning weapon.
        Each creature damaged by the strike is \\glossterm{briefly} \\sickened.
      `,
      rank: 5,
      scaling: {
        7: "You gain a +1 accuracy bonus with the strike.",
      },
      type: "Duration",
    },

    {
      name: "Boneshatter",

      // baseline is +2d at this level, could be +3d due to delay
      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike \\glossterm{briefly} takes half the damage from the strike again at the end of each round.
      `,
      rank: 5,
      scaling: {
        7: "You gain a +1d damage bonus with the strike.",
      },
      type: "Duration",
    },
  ],
};
