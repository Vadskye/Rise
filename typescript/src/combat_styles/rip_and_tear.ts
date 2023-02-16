import { CombatStyle } from '.';

export const ripAndTear: CombatStyle = {
  name: 'Rip and Tear',
  shortDescription: 'Rip foes apart with slashing weapons.',

  maneuvers: [
    {
      name: 'Strip the Flesh',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature that loses \\glossterm{hit points} from the strike becomes \\vulnerable to all damage as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Rend the Hide',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        The strike deals 1d6 \\glossterm{extra damage} per 4 power (minimum 1d6) against creatures that are not wearing metal body armor.
      `,
      rank: 3,
    },

    {
      name: 'Rend the Hide+',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        The strike deals 1d10 \\glossterm{extra damage} per 3 power against creatures that are not wearing metal body armor.
      `,
      rank: 7,
    },

    {
      name: 'Brow Gash',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazzled as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Blinding Brow Gash',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\blinded as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Hamstring',

      effect: `
        Make a \\glossterm{weak strike} using a slashing weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\slowed as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Hamstring+',

      effect: `
        Make a \\glossterm{strike} with a +2 accuracy bonus using a slashing weapon.
        Each creature damaged by the strike is \\slowed as a conditiion if your attack result beats its Reflex defense.
      `,
      rank: 5,
    },

    {
      name: 'Two-Weapon Rend',

      effect: `
        Make a melee strike using two slashing weapons (see \\pcref{Dual Wielding}).
        Each target that takes damage from both weapons bleeds.
        A bleeding creature takes 1d4 slashing damage +1d per two \\glossterm{power} during your next action.
      `,
      rank: 1,
    },

    {
      name: 'Two-Weapon Rend+',

      effect: `
        Make a melee strike using a slashing weapon.
        Each target that takes damage from both weapons bleeds.
        A bleeding creature takes 1d6 slashing damage per 3 \\glossterm{power} during your next action.
      `,
      rank: 5,
    },

    {
      name: 'Flintspark Strike',

      effect: `
        Make a strike using a slashing weapon.
        Damage dealt by the strike is fire damage in addition to its normal damage types.
        If your attack result beats a target's Reflex defense, the target takes 1d6 fire damage per 4 power (minimum 1d6) during your next action.
      `,
      rank: 3,
    },

    {
      name: 'Flintspark Strike+',

      effect: `
        Make a strike using a slashing weapon.
        Damage dealt by the strike is fire damage in addition to its normal damage types.
        If your attack result beats a target's Reflex defense, the target takes 1d10 fire damage per 3 power during your next action.
      `,
      rank: 7,
    },

    {
      name: 'Sweeping Strike',

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon.
        The strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag.
        This allows the strike to hit an additional target (see \\pcref{Weapon Tags}).
      `,
      rank: 3,
    },

    {
      name: 'Sweeping Throw',

      effect: `
        Make a thrown \\glossterm{strike} using a slashing weapon.
        The strike also targets an additional creature or object within 10 feet of the strike's primary target.
      `,
      rank: 3,
    },

    {
      name: 'Ricochet',

      effect: `
        Make a thrown \\glossterm{strike} using a slashing or bludgeoning weapon against up to three creatures or objects in a \\smallarea radius within \\shortrange of you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 3,
    },

    {
      name: 'Ricochet+',

      effect: `
        Make a thrown \\glossterm{strike} using a slashing or bludgeoning weapon against up to four creatures or objects within \\medrange of you.
        You can choose the same target multiple times, but not twice in a row.
        If you choose the same target twice, it takes double damage from the attack.

        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 7,
    },

    {
      name: 'Bloodletting Strike',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature damaged by the strike bleeds if your attack result beats its Fortitude defense.
        A bleeding creature takes 1d4 slashing damage +1d per two \\glossterm{power} during your next action.
      `,
      rank: 1,
    },

    {
      name: 'Bloodletting Strike+',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature damaged by the strike bleeds if your attack result beats its Fortitude defense.
        A bleeding creature takes 1d6 slashing damage per 3 \\glossterm{power} during your next action.
      `,
      rank: 5,
    },

    {
      name: 'Spinning Slash',

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon.
        The strike targets all \\glossterm{enemies} adjacent to you.
        On a miss, you get a \\glossterm{glancing blow}.
      `,
      rank: 3,
    },

    {
      name: 'Slash and Return',

      effect: `
        Make two \\glossterm{strikes} using a slashing weapon.
        You gain a +2 accuracy bonus with the first strike, and a -2 accuracy penalty with the second strike.
      `,
      rank: 5,
    },

    {
      name: 'Tear Exposed Flesh',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        If the target does not have any remaining \\glossterm{damage resistance}, it takes all damage from the strike again during your next action.
      `,
      rank: 3,
    },
  ],
};
