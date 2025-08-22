import { CombatStyle } from '.';

export const ripAndTear: CombatStyle = {
  name: 'Rip and Tear',
  shortDescription: 'Rip foes apart.',

  maneuvers: [
    {
      name: 'Strip the Flesh',

      effect: `
        Make a \\glossterm{strike}.
        \\injury If the target is not wearing metal body armor, it becomes \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['maim'],
    },

    {
      name: 'Rend the Hide',

      effect: `
        Make a \\glossterm{strike}.
        \\hit If the target is not wearing metal body armor, it bleeds.
        A bleeding creature takes damage equal to half your power during your next action.
        On a critical hit, this bleeding damage is doubled.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Rend the Hide+',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        If the target is not wearing metal body armor, it bleeds.
        A bleeding creature takes 1d6 damage per 2 power during your next action.
        On a critical hit, this bleeding damage is doubled.
      `,
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'Brow Gash',

      effect: `
        Make a \\glossterm{strike}.
        \\injury The target becomes \\dazzled as a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['maim'],
    },

    {
      name: 'Painful Brow Gash',

      // Should be 1.8 EA and r7 only gets you 1.6, but the combo is less than the sum of
      // its parts?
      effect: `
        Make a \\glossterm{strike} that deals triple damage.
        \\injury The target becomes \\dazzled and \\stunned as a single \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['maim'],
    },

    {
      name: 'Hamstring',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        \\injury The target becomes \\slowed as a \\glossterm{condition}.
      `,
      rank: 5,
      roles: ['maim'],
    },

    {
      name: 'Two-Weapon Rend',

      effect: `
        Make a \\glossterm{dual strike} (see \\pcref{Dual Strikes}).
        You \\glossterm{reroll} the attack roll once and keep the lower result.
        \\hit The target bleeds.
        A bleeding creature takes damage equal to the damage it took from the strike during your next action.
      `,
      rank: 3,
      roles: ['burn'],
    },

    {
      name: 'Two-Weapon Rend+',

      // Currently dr4; unclear if correct damage
      effect: `
        Make a melee \\glossterm{dual strike} (see \\pcref{Dual Strikes}).
        \\hit The target bleeds.
        A bleeding creature takes damage equal to 2d6 \\add your \\glossterm{power} during your next action.
        On a critical hit, this bleeding damage is doubled.
      `,
      rank: 5,
      roles: ['burn'],
    },

    {
      name: 'Flintspark',

      effect: `
        Make a strike.
        \\hit The target burns.
        A burning creature takes damage equal to half your power during your next action.
        On a critical hit, this burning damage is doubled.
      `,
      rank: 3,
      tags: ['Fire'],
      roles: ['burn'],
    },

    {
      name: 'Flintspark+',

      effect: `
        Make a strike that deals double damage.
        \\hit The target burns.
        A burning creature takes damage equal to 3d6 \\add your power during your next action.
        On a critical hit, this burning damage is doubled.
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
        Make a thrown \\glossterm{strike} against up to four creatures or objects in a \\smallarea radius within \\medrange of you.
        Each target must be within your maximum \\glossterm{range limit} with your weapon, and you take the normal longshot penalty for attacking a creature at long range (see \\pcref{Weapon Range Limits}).
        If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
      `,
      rank: 3,
      roles: ['clear'],
    },

    {
      name: 'Ricochet+',

      effect: `
        Make a thrown \\glossterm{strike} against up to six creatures or objects in a \\smallarea radius within \\medrange of you.
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

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
        Each creature hit by the strike bleeds.
        A bleeding creature takes damage equal to half your \\glossterm{power} during your next action.
        On a critical hit, this bleeding damage is doubled.
      `,
      rank: 1,
      roles: ['wildfire'],
    },

    {
      name: 'Desperate Bloodwhirl+',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        The strike targets all \\glossterm{enemies} adjacent to you.
        You cannot use the \\textit{desperate exertion} ability to affect this strike.
        Each creature hit by the strike bleeds.
        A bleeding creature takes damage equal to your \\glossterm{power} during your next action.
        On a critical hit, this bleeding damage is doubled.
      `,
      rank: 5,
      roles: ['wildfire'],
    },

    {
      name: 'Bloodletter',

      effect: `
        Make a \\glossterm{strike}.
        \\injury The target bleeds.
        A bleeding creature takes damage equal to 1d4 \\add half your \\glossterm{power} during your next action.
        On a critical hit, this bleeding damage is doubled.
      `,
      rank: 1,
      roles: ['execute'],
    },

    // If you include the bonus round, this is the highest damage ability in the game, but
    // it seems like that would very rarely apply.
    {
      name: 'Bloodletter+',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        \\injury The target bleeds profusely.
        A bleeding creature takes damage equal to 2d6 \\add your \\glossterm{power} during your next two actions.
        On a critical hit, this bleeding damage is doubled.
      `,
      rank: 5,
      roles: ['execute'],
    },

    {
      name: 'Spinning Steel',

      effect: `
        You are \\steeled this round.
        Make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you.
        The steel is a \\atSwift effect, but the strike is not.
      `,
      rank: 3,
      roles: ['clear', 'turtle'],
      tags: ['Swift (see text)'],
    },

    {
      name: 'Spinning Steel+',

      effect: `
        You are \\steeled this round.
        Make a melee \\glossterm{strike} that deals triple damage.
        The strike targets all \\glossterm{enemies} adjacent to you.
        The steel is a \\atSwift effect, but the strike is not.
      `,
      rank: 7,
      roles: ['clear', 'turtle'],
      tags: ['Swift (see text)'],
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
        \\injury You are \\glossterm{briefly} \\empowered.
      `,
      // narrative: '',
      rank: 1,
      roles: ['generator'],
    },

    {
      name: 'Bloodreap+',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        \\injury You are \\glossterm{briefly} \\empowered.
      `,
      // narrative: '',
      rank: 5,
      roles: ['generator'],
    },

    {
      name: 'Blood Trance',

      effect: `
        You may choose to lose a quarter of your maximum hit points.
        Then, if you are below your maximum \\glossterm{hit points}, you become \\glossterm{briefly} \\primed and \\empowered.
      `,
      // narrative: '',
      rank: 3,
      roles: ['focus'],
    },
  ],
};
