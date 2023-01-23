import { CombatStyle } from '.';

export const bluntForce: CombatStyle = {
  name: 'Blunt Force',
  shortDescription: 'Smash foes with bludgeoning weapons and raw power.',

  maneuvers: [
    {
      name: 'Armorcrusher',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
      `,
      rank: 1,
    },

    {
      name: 'Armorcrusher+',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
      `,
      rank: 3,
    },

    {
      name: 'Ground Stomp',

      attack: {
        hit: `Each target takes 1d8 + half \\glossterm{power} bludgeoning damage.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      scaling: 'damage',
      rank: 1,
    },

    {
      name: 'Ground Slam',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        The strike targets everything supported by that surface in a \\smallarea cone from you.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
      `,
      rank: 3,
    },

    {
      name: 'Ground Slam+',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        The strike targets everything supported by that surface in a \\largearea cone from you.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
      `,
      rank: 7,
    },

    {
      name: 'Resonating Strike',

      effect: `
        Make a strike using a bludgeoning weapon.
        If your attack result beats a target's Fortitude defense, you gain a +4 damage bonus with the strike against that target.
      `,
      rank: 3,
      scaling: {
        5: 'The damage bonus increases to +8.',
        7: 'The damage bonus increases to +16.',
      },
    },

    {
      name: 'Tenderize',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Each creature damaged by the strike becomes \\dazed as a \\glossterm{condition} if your attack result beats its Fortitude defense.
      `,
      rank: 5,
    },

    {
      name: 'Headshot',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Headshot+',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\confused as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Leap Slam',

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} bludgeoning damage.`,
        missGlance: true,
        targeting: `
          You make a long jump or high jump and move as normal for the jump (see \\pcref{Jump}).
          When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, you emit a small shockwave.
          If you do, make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      scaling: 'damage',
      rank: 3,
    },

    {
      name: 'Leap Slam+',

      functionsLike: {
        name: 'leap slam',
        exceptThat: 'the damage increases to 4d10 + \\glossterm{power}.',
      },
      scaling: 'damage',
      rank: 7,
    },

    {
      name: 'Ricochet',

      effect: `
        Make a thrown \\glossterm{strike} using a slashing or bludgeoning weapon against up to three creatures or objects within \\shortrange of you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 3,
    },

    {
      name: 'Knockdown',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike falls \\prone if your attack result beats its Fortitude defense.
      `,
      rank: 3,
    },

    {
      name: 'Forceful Strike',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The strike gains the \\glossterm{Forceful} weapon tag (see \\pcref{Weapon Tags}).
        If it already has that weapon tag, the maximum size category of creature that you can \\glossterm{knockback} with that tag increases by one size category, and the knockback distance increases by 10 feet.
      `,
      rank: 3,
    },

    {
      name: 'Press Forward',

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
      name: 'Press Forward+',

      functionsLike: {
        exceptThat: 'you can move up to your full movement speed instead of only 5 feet.',
        name: 'press forward',
      },
      rank: 5,
    },

    {
      name: 'Desperate Smash',

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a \\glossterm{strike} with a +4 damage bonus using a bludgeoning weapon.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
      scaling: {
        3: 'The damage bonus increases to +8.',
        5: 'The damage bonus increases to +16.',
        7: 'The damage bonus increases to +24.',
      },
    },

    {
      name: 'Desperate Crush',

      effect: `
        After you use this ability, you increase your \\glossterm{fatigue level} by one.

        Make a \\glossterm{strike} with a +4 damage bonus using a bludgeoning weapon.
        The attack is made against each target's Fortitude defense instead of its Armor defense.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 3,
      scaling: {
        5: 'The damage bonus increases to +8.',
        7: 'The damage bonus increases to +16.',
      },
    },

    {
      name: 'Gutshot',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike becomes \\dazed as a \\glossterm{condition} if your attack result beats its Fortitude defense.
      `,
      rank: 1,
    },

    {
      name: 'Gutshot+',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike becomes \\stunned as a \\glossterm{condition} if your attack result beats its Fortitude defense.
      `,
      rank: 5,
    },

    {
      name: 'Boneshatter',

      // baseline is +2d at this level, could be +3d due to delay
      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike takes the damage from the strike again during your next action.
      `,
      rank: 5,
    },

    {
      name: 'Earsplitting Bonedrum',

      // treat deafen as rank 0.5; self-deafen is almost no downside, so just narrative
      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        You and each creature damaged by the strike are \\deafened as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Earsplitting Bonedrum+',

      // treat deafen as rank 0.5; self-deafen is almost no downside, so just narrative
      effect: `
        Make a melee \\glossterm{strike}.
        You and each creature damaged by the strike are \\deafened as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Impactful Strike',

      effect: `
        Make a \\glossterm{strike}.
        If you get a \\glossterm{critical hit} with the strike, you roll triple damage dice instead of double damage dice.
        If your weapon has the \\weapontag{Impact} weapon tag, you roll quadruple damage dice instead.
      `,
      rank: 1,
    },

    {
      name: 'Unbalanced Smash',

      effect: `
        Make a melee \\glossterm{strike} with a +2 damage bonus using a bludgeoning weapon.
        If you miss with the strike, you \\glossterm{briefly} take a -2 penalty to your Armor and Reflex defenses.
      `,
      rank: 1,
      scaling: {
        3: 'The damage bonus increases to +4.',
        5: 'The damage bonus increases to +8.',
        7: 'The damage bonus increases to +16.',
      },
    },
  ],
};
