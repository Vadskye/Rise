import { CombatStyle } from '.';
import { MULTIHIT_CRIT } from '@src/abilities/constants';

export const ripAndTear: CombatStyle = {
  name: 'Rip and Tear',
  shortDescription: 'Rip foes apart.',

  maneuvers: [
    {
      name: 'Strip the Flesh',

      effect: `
        Make a \\glossterm{strike}.
        \\injury If the target is not wearing metal body armor, it becomes \\dazed as a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['maim'],
    },

    {
      name: 'Rend the Hide',

      effect: `
        Make a \\glossterm{strike}.
        \\injury If the target is not wearing metal body armor, it \\briefly \\debuff{bleeds} for damage equal to the damage dealt by the strike.
      `,
      rank: 3,
      roles: ['burst'],
      tags: ['Blood'],
    },

    {
      name: 'Rend the Hide+',

      effect: `
        Make a \\glossterm{strike} that deals six times \\glossterm{weapon damage}.
        \\injury If the target is not wearing metal body armor, it \\briefly \\debuff{bleeds} for damage equal to the damage dealt by the strike.
      `,
      rank: 7,
      roles: ['burst'],
      tags: ['Blood'],
    },

    {
      name: 'Brow Gash',

      effect: `
        Make a melee \\glossterm{strike}.
        \\injury If your attack result hits the target's Fortitude defense, it becomes \\dazzled as a \\glossterm{condition}.
      `,
      rank: 1,
      roles: ['maim'],
    },

    {
      name: 'Painful Brow Gash',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        \\injury If your attack result hits the target's Fortitude defense, it becomes \\dazzled and \\dazed as a single \\glossterm{condition}.
      `,
      rank: 5,
      roles: ['maim'],
    },

    {
      name: 'Two-Weapon Rend',

      effect: `
        Make a \\glossterm{dual strike} (see \\pcref{Dual Strikes}).
        You \\glossterm{reroll} the attack roll once and keep the lower result.
        \\hit The target \\briefly \\debuff{bleeds} for damage equal to the damage dealt by the strike.
      `,
      rank: 3,
      roles: ['burn'],
      tags: ['Blood'],
    },

    {
      name: 'Two-Weapon Rend+',

      // Currently dr4; unclear if correct damage
      effect: `
        Make a melee \\glossterm{dual strike} (see \\pcref{Dual Strikes}).
        \\hit The target \\briefly \\debuff{bleeds} for 2d6 \\add your \\glossterm{power} damage.
        \\crit ${MULTIHIT_CRIT}
      `,
      rank: 5,
      roles: ['burn'],
      tags: ['Blood'],
    },

    {
      name: 'Flintspark',

      effect: `
        Make a strike.
        \\hit The target \\briefly \\debuff{burns} for damage equal to half your power.
        \\crit ${MULTIHIT_CRIT}
      `,
      rank: 3,
      tags: ['Fire'],
      roles: ['burn'],
    },

    {
      name: 'Flintspark+',

      effect: `
        Make a strike that deals double damage.
        \\hit The target \\briefly \\debuff{burns} for \\damagerankfour.
        \\crit ${MULTIHIT_CRIT}
      `,
      rank: 7,
      tags: ['Fire'],
      roles: ['burn'],
    },

    {
      name: 'Wide Sweep',

      effect: `
        Make a melee \\glossterm{strike}.
        The strike gains the \\glossterm{Sweeping} (1) tag, or you gain a +1 bonus to the Sweeping value if it already had that tag.
        This allows the strike to hit an additional target (see \\pcref{Weapon Tags}).
      `,
      rank: 1,
      roles: ['clear'],
    },

    {
      name: 'Rebounding Throw',

      effect: `
        Make a thrown \\glossterm{strike}.
        The strike also targets an additional creature or object within 10 feet of the strike's primary target.
      `,
      rank: 1,
      roles: ['clear'],
    },

    {
      name: 'Ricochet',

      effect: `
        Make a thrown \\glossterm{strike} against up to four creatures or objects in a \\smallarea radius within \\medrange.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 3,
      roles: ['clear'],
    },

    {
      name: 'Ricochet+',

      effect: `
        Make a thrown \\glossterm{strike} against up to six creatures or objects in a \\smallarea radius within \\medrange.
        You can choose the same target multiple times, but not twice in a row, and no more than three times total.
        Choosing the same target twice means it takes double damage, and three times means it takes triple damage.

        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 7,
      roles: ['clear'],
    },

    {
      name: 'Desperate Bloodwhirl',

      cost: 'One \\glossterm{stamina}.',
      effect: `
        Make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
        Each creature hit by the strike \\briefly \\debuff{bleeds} for damage equal to half your \\glossterm{power}.
        \\crit ${MULTIHIT_CRIT}
      `,
      rank: 1,
      roles: ['wildfire'],
      tags: ['Blood'],
    },

    {
      name: 'Desperate Bloodwhirl+',

      cost: 'One \\glossterm{stamina}.',
      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        The strike targets all \\glossterm{enemies} adjacent to you.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
        Each creature hit by the strike \\briefly \\debuff{bleeds} for damage equal to your \\glossterm{power}.
        \\crit ${MULTIHIT_CRIT}
      `,
      rank: 5,
      roles: ['wildfire'],
      tags: ['Blood'],
    },

    {
      name: 'Bloodletter',

      effect: `
        Make a \\glossterm{strike}.
        \\injury The target \\briefly \\debuff{bleeds} for damage equal to half your \\glossterm{power}.
        \\crit ${MULTIHIT_CRIT}
      `,
      rank: 1,
      roles: ['execute'],
      tags: ['Blood'],
    },

    // With only a single extra turn of damage, this is 36% more damage than baseline.
    // That's almost on par for an injury-only attack.
    {
      name: 'Bloodletter+',

      effect: `
        Make a \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        \\injury The target \\debuff{bleeds} for damage equal to 2d6 \\add your \\glossterm{power} as a \\glossterm{condition}.
        \\crit ${MULTIHIT_CRIT}
      `,
      rank: 5,
      roles: ['execute'],
      tags: ['Blood'],
    },

    {
      name: 'Spinning Steel',

      // This is maybe too strong?
      effect: `
        You are \\briefly \\steeled.
        Make a melee \\glossterm{strike} with a \\minus1 accuracy penalty.
        The strike targets all \\glossterm{enemies} adjacent to you.
      `,
      rank: 3,
      roles: ['clear', 'turtle'],
    },

    {
      name: 'Spinning Steel+',

      effect: `
        You are \\briefly \\steeled.
        Make a melee \\glossterm{strike} that deals double damage.
        The strike targets all \\glossterm{enemies} adjacent to you.
      `,
      rank: 7,
      roles: ['clear', 'turtle'],
    },

    {
      name: 'Slash and Return',

      effect: `
        Make two \\glossterm{strikes}.
        You gain a +2 accuracy bonus with the first strike, and a -2 accuracy penalty with the second strike.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Tear Exposed Flesh',

      effect: `
        Make a \\glossterm{strike} with a -1 accuracy penalty.
        If the target is \\glossterm{injured}, the strike deals double damage.
      `,
      // narrative: '',
      rank: 3,
      roles: ['execute'],
    },

    {
      name: 'Tear Exposed Flesh+',

      effect: `
        Make a \\glossterm{strike} that deals \\glossterm{extra damage} equal to half your \\glossterm{power}.
        If the target is \\glossterm{injured}, the strike deals triple damage.
      `,
      // narrative: '',
      rank: 7,
      roles: ['execute'],
    },

    {
      name: 'Bloodreap',

      effect: `
        Make a melee \\glossterm{strike}.
        \\injury You are \\briefly \\empowered.
      `,
      // narrative: '',
      rank: 1,
      roles: ['generator'],
      tags: ['Blood'],
    },

    {
      name: 'Bloodreap+',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        \\injury You are \\briefly \\empowered.
      `,
      // narrative: '',
      rank: 5,
      roles: ['generator'],
      tags: ['Blood'],
    },

    {
      name: 'Blood Trance',

      effect: `
        You may choose to lose a quarter of your maximum hit points.
        Then, if you are \\glossterm{injured}, you become \\briefly \\primed and \\empowered.
      `,
      // narrative: '',
      rank: 3,
      roles: ['focus'],
      tags: ['Blood'],
    },
  ],
};
