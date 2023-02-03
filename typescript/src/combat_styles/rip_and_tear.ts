import { CombatStyle } from '.';

export const ripAndTear: CombatStyle = {
  name: 'Rip and Tear',
  shortDescription: 'Rip foes apart with slashing weapons.',

  maneuvers: [
    {
      name: 'Strip the Flesh',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your damage with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike becomes \\vulnerable to all damage as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Rend the Hide',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        You gain a +4 damage bonus with the strike against creatures that are not wearing metal body armor.
      `,
      rank: 3,
      scaling: {
        5: 'The damage bonus increases to +8.',
        7: 'The damage bonus increases to +16.',
      },
    },

    {
      name: 'Brow Gash',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Each creature that loses \\glossterm{hit points} from the strike is \\dazzled as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Blinding Brow Gash',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\blinded as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Hamstring',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        Your \\glossterm{power} with the strike is halved.
        Each creature that loses \\glossterm{hit points} from the strike is \\slowed as a \\glossterm{condition}.
      `,
      rank: 3,
    },

    {
      name: 'Two-Weapon Rend',

      effect: `
        Make a melee strike using a slashing weapon.
        Each damaged creature that you already hit with the \\ability{offhand strike} ability this round takes additional slashing damage equal to half your \\glossterm{power}.
      `,
      rank: 1,
    },

    {
      name: 'Two-Weapon Rend+',

      effect: `
        Make a melee strike using a slashing weapon.
        Each damaged creature that you already hit with the \\ability{offhand strike} ability this round takes additional slashing damage equal to your \\glossterm{power}.
      `,
      rank: 5,
    },

    {
      name: 'Flintspark Strike',

      effect: `
        Make a strike using a slashing weapon.
        Damage dealt by the strike is fire damage in addition to its normal damage types.
        Each creature that loses \\glossterm{hit points} from this strike takes fire damage equal to half your power during your next action.
      `,
      rank: 1,
    },

    {
      name: 'Flintspark Strike+',

      effect: `
        Make a strike using a slashing weapon.
        Damage dealt by the strike is fire damage in addition to its normal damage types.
        Each creature that loses \\glossterm{hit points} from this strike takes fire damage equal to your power during your next action.
      `,
      rank: 5,
    },

    {
      name: 'Sweeping Strike',

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon.
        The strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag (see \\pcref{Weapon Tags}).
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
        A bleeding creature takes slashing damage equal to half your \\glossterm{power} with that strike during your next action.
      `,
      rank: 1,
    },

    // is 2x power equal to +5-10 damage? sometimes better, sometimes worse, especially with the
    // delay, so seems fine
    {
      name: 'Bloodletting Strike+',

      functionsLike: {
        name: 'bloodletting strike',
        exceptThat:
          'the extra damage increases to be equal to your \\glossterm{power} with the strike.',
      },
      rank: 5,
    },

    {
      name: 'Bloodletting Sweep',

      functionsLike: {
        name: 'bloodletting strike',
        exceptThat:
          'the strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag (see \\pcref{Weapon Tags}).',
      },
      rank: 7,
    },

    {
      name: 'Spinning Slash',

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon.
        The strike targets all \\glossterm{enemies} adjacent to you.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 1,
    },

    {
      name: 'Spinning Slash+',

      effect: `
        Make a melee \\glossterm{strike} using a slashing weapon.
        The strike targets all \\glossterm{enemies} adjacent to you.
      `,
      rank: 5,
    },

    {
      name: 'Twinslash',

      effect: `
        Make two melee \\glossterm{strikes} using a slashing weapon.
        You do not add your \\glossterm{power} to damage with either strike.
      `,
      rank: 5,
    },

    {
      name: 'Tear Exposed Flesh',

      effect: `
        Make a \\glossterm{strike} using a slashing weapon.
        If the target does not have any remaining \\glossterm{damage resistance}, you gain a +4 damage bonus with the strike.
      `,
      rank: 1,
      scaling: {
        3: 'The damage bonus increases to +8.',
        5: 'The damage bonus increases to +16.',
        7: 'The damage bonus increases to +24.',
      },
    },
  ],
};
