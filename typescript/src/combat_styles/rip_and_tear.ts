import { CombatStyle } from '.';

export const ripAndTear: CombatStyle = {
  name: 'Rip and Tear',
  shortDescription: 'Rip foes apart.',

  maneuvers: [
    {
      name: 'Strip the Flesh',

      effect: `
        Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        If the target loses hit points, it becomes \\vulnerable to all damage as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Rend the Hide',

      effect: `
        Make a \\glossterm{strike}.
        The strike deals \\glossterm{extra damage} equal to half your power if the target is not wearing metal body armor.
      `,
      rank: 3,
    },

    {
      name: 'Rend the Hide+',

      effect: `
        Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        The strike deals 1d6 \\glossterm{extra damage} per 2 power if the target is not wearing metal body armor.
      `,
      rank: 7,
    },

    {
      name: 'Brow Gash',

      effect: `
        Make a \\glossterm{strike}.
        If the target loses hit points, it becomes \\dazzled as a \\glossterm{condition}.
      `,
      rank: 1,
    },

    {
      name: 'Blinding Brow Gash',

      effect: `
        Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        If the target loses hit points, it becomes \\blinded as a \\glossterm{condition}.
      `,
      rank: 7,
    },

    {
      name: 'Hamstring',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target loses hit points and your attack result also hits its Reflex defense, it becomes \\slowed as a \\glossterm{condition}.
      `,
      rank: 1,
    },
    {
      name: 'Hamstring+',

      effect: `
        Make a melee \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        If the target loses hit points and your attack result also hits its Reflex defense, it becomes \\slowed as a \\glossterm{condition}.
      `,
      rank: 5,
    },

    {
      name: 'Two-Weapon Rend',

      effect: `
        Make a melee \\glossterm{dual strike} (see \\pcref{Dual Strikes}).
        If the target takes damage, it bleeds.
        A bleeding creature takes damage equal to half your \\glossterm{power} during your next action.
        On a critical hit, this bleeding damage is doubled.
      `,
      rank: 1,
    },

    {
      name: 'Two-Weapon Rend+',

      // Currently dr4; unclear if correct damage
      effect: `
        Make a melee \\glossterm{dual strike} (see \\pcref{Dual Strikes}).
        If the target takes damage, it bleeds.
        A bleeding creature takes 1d6 damage per 2 \\glossterm{power} during your next action.
        On a critical hit, this bleeding damage is doubled.
      `,
      rank: 5,
    },

    {
      name: 'Flintspark',

      effect: `
        Make a strike.
        If your attack also hits the target's Reflex defense, it takes damage equal to your power during your next action.
      `,
      rank: 3,
      tags: ['Fire'],
    },

    {
      name: 'Flintspark+',

      effect: `
        Make a strike that deals double \\glossterm{weapon damage}.
        If your attack also hits the target's Reflex defense, it takes 1d8 damage per 2 power during your next action.
      `,
      rank: 7,
      tags: ['Fire'],
    },

    {
      name: 'Wide Sweep',

      effect: `
        Make a melee \\glossterm{strike}.
        The strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag.
        This allows the strike to hit an additional target (see \\pcref{Weapon Tags}).
      `,
      rank: 1,
    },

    {
      name: 'Rebounding Throw',

      effect: `
        Make a thrown \\glossterm{strike}.
        The strike also targets an additional creature or object within 10 feet of the strike's primary target.
      `,
      rank: 1,
    },

    {
      name: 'Ricochet',

      effect: `
        Make a thrown \\glossterm{strike} against up to three creatures or objects in a \\smallarea radius within \\medrange of you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 3,
    },

    {
      name: 'Ricochet+',

      effect: `
        Make a thrown \\glossterm{strike} against up to five creatures or objects within \\medrange of you.
        You can choose the same target multiple times, but not twice in a row, and no more than twice total.
        If you choose the same target twice, it takes double damage from the attack.

        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 7,
    },

    {
      name: 'Desperate Bloodwhirl',

      cost: "One \\glossterm{fatigue level}.",
      effect: `
        Make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
        \\hit Each creature that loses \\glossterm{hit points} takes damage from the strike again during your next action.
      `,
      rank: 1,
    },

    {
      name: 'Bloodletter',

      effect: `
        Make a \\glossterm{strike}.
        If the target loses hit points, it takes damage from the strike again during your next action.
      `,
      rank: 1,
    },

    {
      name: 'Bloodletter+',

      effect: `
        Make a \\glossterm{strike}.
        If the target loses hit points, it takes damage from the strike again during each of your next two actions.
      `,
      rank: 5,
    },

    {
      name: 'Spinning Slash',

      effect: `
        Make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you.
      `,
      rank: 3,
    },

    {
      name: 'Slash and Return',

      effect: `
        Make two \\glossterm{strikes}.
        You gain a +1 accuracy bonus with the first strike, and a -3 accuracy penalty with the second strike.
      `,
      rank: 5,
    },

    {
      name: 'Tear Exposed Flesh',

      effect: `
        Make a \\glossterm{strike}.
        If the target has no remaining \\glossterm{damage resistance}, the strike deals double \\glossterm{weapon damage}.
      `,
      // narrative: '',
      rank: 3,
    },

    {
      name: 'Tear Exposed Flesh+',

      effect: `
        Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        If the target has no remaining \\glossterm{damage resistance}, the strike deals triple \\glossterm{weapon damage}.
      `,
      // narrative: '',
      rank: 5,
    },
  ],
};
