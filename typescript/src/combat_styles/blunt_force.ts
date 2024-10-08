import { CombatStyle } from '.';

export const bluntForce: CombatStyle = {
  name: 'Blunt Force',
  shortDescription: 'Smash foes with bludgeoning weapons and raw power.',

  maneuvers: [
    {
      name: 'Armorcrusher',

      effect: `
        Make a \\glossterm{weak strike} using a bludgeoning weapon.
        The attack is made against the target's Fortitude defense instead of its Armor defense.
      `,
      rank: 1,
    },

    {
      name: 'Armorcrusher+',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The attack is made against the target's Fortitude defense instead of its Armor defense.
      `,
      rank: 3,
    },

    {
      name: 'Ground Stomp',

      attack: {
        hit: `\\damagerankone{bludgeoning}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      rank: 1,
    },

    {
      name: 'Ground Stomp+',

      attack: {
        hit: `\\damagerankfive{bludgeoning}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you that are on the same stable surface as you.
        `,
      },
      rank: 5,
    },

    {
      name: 'Ground Slam',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        It targets everything supported by that surface in a \\smallarea cone from you.
        You take a -1 accuracy penalty with the strike.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
        On a miss, you still deal half damage.
      `,
      rank: 1,
    },

    {
      name: 'Ground Slam+',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon against a stable surface.
        It targets everything supported by that surface in a \\medarea cone from you.
        You take a -1 accuracy penalty with the strike, but it deals \\glossterm{extra damage} equal to your power.
        On a miss, you still deal half damage.
        All damage dealt by this attack is bludgeoning damage instead of its normal types.
      `,
      rank: 5,
    },

    {
      name: 'Tenderize',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        \\damaginghit If the target loses hit points, it is \\vulnerable to all damage as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Concussive Strike',

      effect: `
        Make a melee \\glossterm{weak strike} using a bludgeoning weapon.
        \\damaginghit If the target loses \\glossterm{hit points}, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Concussive Strike+',

      effect: `
        Make a melee \\glossterm{strike} with triple \\glossterm{weapon damage} using a bludgeoning weapon.
        \\damaginghit If the target loses hit points, it is \\confused as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Leap Slam',

      attack: {
        hit: `\\damageranktwohigh{bludgeoning}.`,
        missGlance: true,
        targeting: `
          You jump and move as normal for the jump (see \\pcref{Jumping}).
          When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, you emit a small shockwave.
          If you do, make an attack vs. Reflex against everything adjacent to you that is on the same stable surface as you.
        `,
      },
      rank: 3,
    },

    {
      name: 'Leap Slam+',

      functionsLike: {
        name: 'leap slam',
        exceptThat: 'the damage increases to \\damageranksix{bludgeoning}.',
      },
      rank: 7,
    },

    {
      name: 'Ricochet',

      effect: `
        Make a thrown \\glossterm{strike} using a slashing or bludgeoning weapon against up to three creatures or objects in a \\smallarea radius within \\medrange of you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 3,
    },

    {
      name: 'Ricochet+',

      effect: `
        Make a thrown \\glossterm{strike} using a slashing or bludgeoning weapon against up to five creatures or objects within \\medrange of you.
        You can choose the same target multiple times, but not twice in a row, and no more than twice total.
        If you choose the same target twice, it takes double damage from the attack.

        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 7,
    },

    {
      name: 'Blasting',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        \\damaginghit If the target loses \\glossterm{hit points}, it falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
    },

    {
      name: 'Knockdown',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        \\damaginghit If the target loses \\glossterm{hit points}, it falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 1,
    },

    {
      name: 'Knockdown+',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        \\damaginghit The target falls \\prone.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 3,
    },

    {
      name: 'Forceful Smash',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        \\damaginghit You \\glossterm{knockback} the target 15 feet.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 3,
    },

    {
      name: 'Forceful Smash+',

      effect: `
        Make a \\glossterm{strike} with double \\glossterm{weapon damage} using a bludgeoning weapon.
        \\damaginghit You \\glossterm{knockback} the target 30 feet.
        This is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
      `,
      rank: 7,
    },

    {
      name: 'Press Forward',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        After you make the strike, you can move up to 5 feet.
        During this movement, you can move into space occupied by creatures that you damaged with the strike.
        When you do, you \\glossterm{push} that creature up to 5 feet in any direction.
        This push is a \\abilitytag{Size-Based} effect, so it does not affect creatures more than one size category larger than you.
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

      cost: "One \\glossterm{fatigue level}.",
      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        The strike deals \\glossterm{extra damage} equal to your power.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 1,
    },

    {
      name: 'Desperate Smash+',

      cost: "One \\glossterm{fatigue level}.",
      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon with double \\glossterm{weapon damage}.
        The strike deals 1d8 \\glossterm{extra damage} per 3 power.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
      `,
      rank: 5,
    },

    {
      name: 'Gutshot',

      effect: `
        Make a strike with a -1 accuracy penalty using a bludgeoning weapon.
        \\damaginghit If your attack also hits the target's Fortitude defense, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Boneshatter',

      effect: `
        Make a \\glossterm{strike} using a bludgeoning weapon.
        \\hit If your attack also hits the target's Fortitude defense, the strike deals maximum damage.
      `,
      rank: 3,
    },

    {
      name: 'Earsplitting Bonedrum',

      // treat deafen as rank 0.5; self-deafen is almost no downside, so just narrative
      effect: `
        Make a melee \\glossterm{strike}.
        \\hit You and the target are \\deafened as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Overhand Smash',

      // 10% of the time, double damage. 20% of the time, -2 defenses.
      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        If you hit by 5 or more, the strike deals double \\glossterm{weapon damage}.
        If you miss with the strike, you \\glossterm{briefly} take a -2 penalty to your Armor and Reflex defenses.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 1,
    },

    {
      name: 'Overhand Smash+',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        If you hit by 5 or more, the strike deals quadruple \\glossterm{weapon damage}.
        Otherwise, it deals double weapon damage.
        If you miss with the strike, you \\glossterm{briefly} take a -2 penalty to your Armor and Reflex defenses.
      `,
      rank: 5,
    },

    {
      name: 'All-In Smash',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        The strike deals double \\glossterm{weapon damage}.
        However, you \\glossterm{briefly} take a -2 penalty to accuracy and all defenses.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 3,
    },

    {
      name: 'All-In Smash+',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        The strike deals triple \\glossterm{weapon damage}.
        However, you \\glossterm{briefly} take a -2 penalty to accuracy and all defenses.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 5,
    },

    {
      name: 'Erupting Bonedrum',

      effect: `
        Make a melee \\glossterm{strike} using a bludgeoning weapon.
        You cannot get a \\glossterm{critical hit} with this strike.
        \\damaginghit Compare your attack result to the Fortitude defense of all other \\glossterm{enemies} within a \\smallarea radius of the target of your strike.
        On a hit against a secondary target, you deal damage equal to the damage you dealt with the strike.
        On a miss against a secondary target, you still deal half damage.
      `,
      rank: 3,
    },
  ],
};
