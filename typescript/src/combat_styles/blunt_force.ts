import { CombatStyle } from ".";

export const bluntForce: CombatStyle = {
  name: "Blunt Force",
  shortDescription: "Smash foes with bludgeoning weapons and raw power.",

  maneuvers: [
    {
      name: "Armorcrusher",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
      `,
      rank: 1,
    },

    {
      name: "Armorcrusher+",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
      `,
      rank: 3,
    },

    {
      name: "Ground Stomp",

      attack: {
        hit: `Each target takes 1d6 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      scaling: "damage",
      rank: 1,
    },

    {
      name: "Ground Slam",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        The strike targets everything supported by that surface in a \\smallarealong, 5 ft. wide line from you.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
      `,
      rank: 3,
    },

    {
      name: "Resonating Strike",

      effect: `
        Make a strike using a bludgeoning weapon.
        Damage dealt by the strike is sonic damage in addition to its normal damage types.
      `,
      rank: 1,
    },

    {
      name: "Gutshot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\glossterm{briefly} \\dazed.
      `,
      rank: 1,
    },

    {
      name: "Gutshot+",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Each creature damaged by the strike is \\glossterm{briefly} \\dazed.
      `,
      rank: 5,
    },

    {
      name: "Headshot",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: "Headshot+",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\confused as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: "Leap Slam",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          You make a long jump or high jump and move as normal for the jump (see \\pcref{Jump}).
          When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, you emit a small shockwave.
          If you do, make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      scaling: "damage",
      rank: 3,
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

    {
      name: "Knockdown",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You do not add your \\glossterm{power} to damage with the strike.
        Each creature damaged by the strike falls \\prone if it is no larger than one size category larger than you.
      `,
      rank: 1,
    },

    {
      name: "Forceful Strike",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The strike gains the \\glossterm{Forceful} weapon tag (see \\pcref{Weapon Tags}).
        If it already has that weapon tag, the maximum size category of creature that you can \\glossterm{knockback} with that tag increases by one size category, and the knockback distance increases by 10 feet.
      `,
      rank: 3,
    },

    {
      name: "Press Forward",

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        After you make the strike, you can move up to 5 feet.
        During this movement, you can move into space occupied by creatures that you damaged with the strike.
        When you do, you \\glossterm{push} that creature up to 5 feet in any direction.
        You cannot push creatures that are two or more size categories larger than you with this ability.
      `,
      rank: 1,
    },

    {
      name: "Press Forward+",

      functionsLike: {
        exceptThat: "you can move up to your full movement speed instead of only 5 feet.",
        name: "press forward",
      },
      rank: 5,
    },

    {
      name: "Desperate Smash",

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a \\glossterm{strike} with a +4 damage bonus using a bludgeoning weapon.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
      scaling: {
        3: "The damage bonus increases to +8.",
        5: "The damage bonus increases to +16.",
        7: "The damage bonus increases to +24.",
      },
    },

    {
      name: "Desperate Crush",

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a \\glossterm{strike} with a +4 damage bonus using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 3,
      scaling: {
        5: "The damage bonus increases to +8.",
        7: "The damage bonus increases to +16.",
      },
    },

    {
      name: "Tenderizing Smash",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Each creature damaged by the strike is \\glossterm{briefly} \\dazed.
        After this effect ends, the creature cannot be dazed by this effect again until it takes a \\glossterm{short rest}.
      `,
      rank: 3,
    },

    {
      name: "Tenderizing Smash+",

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Each creature damaged by the strike is \\glossterm{briefly} \\stunned.
        After this effect ends, the creature cannot be stunned by this effect again until it takes a \\glossterm{short rest}.
      `,
      rank: 7,
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
    },

    {
      name: "Stomach-Churning Strike",

      effect: `
        Make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike \\glossterm{briefly} takes a -2 penalty to its Fortitude defense.
      `,
      rank: 1,
    },

    {
      name: "Earsplitting Bonedrum",

      // -2 ranks for self-deafen? seems generous
      effect: `
        Make a melee \\glossterm{strike}.
        You and each creature damaged by the strike are \\glossterm{briefly} \\deafened.
      `,
      rank: 3,
    },

    {
      name: "Impactful Strike",

      effect: `
        Make a \\glossterm{strike}.
        If you get a \\glossterm{critical hit} with the strike, you roll triple damage dice instead of double damage dice.
        If your weapon has the \\weapontag{Impact} weapon tag, you roll quadruple damage dice instead.
      `,
      rank: 1,
    },
  ],
};
