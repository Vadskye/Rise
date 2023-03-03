import { CombatStyle } from '.';

export const ebbAndFlow: CombatStyle = {
  name: 'Ebb and Flow',
  shortDescription: 'Fight reactively, shifting your style with the flow of combat.',

  maneuvers: [
    {
      name: 'Counterstrike',

      effect: `
        Choose a creature you can see.
        If that creature tries to attack you this round, you immediately make a melee \\glossterm{strike} with a +2 accuracy bonus against them as a \\glossterm{reactive attack} if possible.
        This attack resolves before the creature's attack, so if you incapacitate it with the strike, its attack does not affect you.
        You can only attack that creature once in this way, even if it attacks you multiple times.
      `,
      rank: 1,
      tags: ['Swift'],
    },

    {
      name: 'Counter Sweep',

      effect: `
        Whenever a creature attacks you this round, you immediately make a melee \\glossterm{strike} with a +2 accuracy bonus against them as a \\glossterm{reactive attack} if possible.
        This strike must be made using a slashing or bludgeoning weapon.
        This attack resolves before the creature's attack, so if you incapacitate it with the strike, its attack does not affect you.
        You can only attack any individual creature once in this way, even if it attacks you multiple times.
      `,
      rank: 3,
    },

    {
      name: 'Counter Flurry',

      effect: `
        Choose a creature you can see.
        If that creature attacks you this round, you immediately make two melee \\glossterm{strikes} with a +2 accuracy bonus against them as a \\glossterm{reactive attack} if possible.
        These attacks resolve before the creature's attack, so if you incapacitate it with either strike, its attack does not affect you.
        You can only attack that creature twice in this way, even if it attacks you multiple times.
      `,
      rank: 5,
    },

    {
      name: 'Redeeming Followup',

      effect: `
        Make a \\glossterm{strike}.
        You gain a +2 accuracy bonus with the strike against each creature that you missed with a \\glossterm{strike} last round.
      `,
      rank: 1,
    },

    {
      name: 'Victorious Followup',

      effect: `
        Make a \\glossterm{strike}.
        The strike deals 1d6 \\glossterm{extra damage} per 4 power (minimum 1d6) against each creature that you dealt damage to with a \\glossterm{strike} last round.
      `,
      rank: 3,
    },

    {
      name: 'Redeeming Flurry',

      effect: `
        Make two \\glossterm{strikes}.
        You gain a +2 accuracy bonus with the strikes against each creature that you missed with a \\glossterm{strike} last round.
      `,
      rank: 5,
    },

    {
      name: 'Dazing Feint',

      effect: `
        Make a melee \\glossterm{weak strike}.
        Each creature damaged by the strike is \\dazed as a \\glossterm{condition} if your attack result beats its Reflex defense.
      `,
      rank: 1,
    },

    {
      name: 'Stunning Feint',

      effect: `
        Make a melee \\glossterm{strike}.
        Each creature damaged by the strike is \\stunned as a \\glossterm{condition} if your attack result beats its Reflex defense.
      `,
      rank: 5,
    },

    {
      name: 'Sacrificial Strike',

      effect: `
        Make a melee \\glossterm{strike} with a +1 accuracy bonus.
        However, you \\glossterm{briefly} take a -2 penalty to all defenses against each target of the strike.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 1,
    },

    {
      name: 'Sacrificial Flurry',

      effect: `
        Make two melee \\glossterm{strikes} with a +1 accuracy bonus.
        However, you \\glossterm{briefly} take a -2 penalty to all defenses against each target of either strike.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 5,
    },

    {
      name: 'Momentum Strike',

      effect: `
        Make a melee \\glossterm{strike}.
        If your movement during the \\glossterm{movement phase} of this round consisted entirely of moving at least 20 feet in a straight line towards your target, the strike deals deals 1d6 \\glossterm{extra damage} per 4 power (minimum 1d6).
        After using this maneuver, you \\glossterm{briefly} cannot use it again.
      `,
      rank: 3,
    },

    {
      name: 'Certain Strike',

      effect: `
        Make a \\glossterm{weak strike} with a +4 accuracy bonus.
      `,
      rank: 1,
    },

    {
      name: 'Certain Strike+',

      effect: `
        Make a \\glossterm{strike} with a +5 accuracy bonus.
      `,
      rank: 5,
    },

    {
      name: 'Power Strike',

      effect: `
        Make a \\glossterm{strike} with a -3 accuracy penalty.
        The strike deals double \\glossterm{weapon damage}.
      `,
      rank: 1,
    },

    {
      name: 'Power Strike+',

      effect: `
        Make a \\glossterm{strike} with a -2 accuracy penalty.
        The strike deals triple \\glossterm{weapon damage}.
      `,
      rank: 5,
    },

    {
      name: 'Hunting Strike',

      effect: `
        Make a \\glossterm{weak strike}.
        After making the strike, you gain a +1 bonus to \\glossterm{accuracy} against one target of the strike with future strikes.
        If the strike had multiple targets, you choose which target you gain the bonus against.
        This effect stacks with itself, up to a maximum of a +4 bonus.
        It lasts until you finish a \\glossterm{short rest} or make a \\glossterm{strike} that does not include that creature as a target.
      `,
      rank: 3,
    },

    {
      name: 'Hunting Strike+',

      functionsLike: {
        exceptThat:
          'the accuracy bonus from each strike increases to +2, and the strike is not weak. This bonus does not stack with the bonus from the \\maneuver{hunting strike} maneuver.',
        name: 'hunting strike',
      },
      rank: 7,
    },

    {
      name: 'Punish Inattention',

      effect: `
        Choose a creature you can see.
        If that creature takes a \\glossterm{standard action} that does not attack you this round, you immediately make a melee \\glossterm{strike} with a +2 accuracy bonus against them as a \\glossterm{reactive attack} if possible.
        This attack resolves before the creature's action, so if you incapacitate it with the strike, its action fails.
        You can only attack that creature once in this way, even if it takes multiple standard actions.
      `,
      rank: 3,
    },

    {
      name: 'Dizzying Assault',

      // -2 ranks for self-daze
      effect: `
        Make a melee \\glossterm{strike}.
        You and each creature damaged by the strike are \\dazed as a \\glossterm{condition}.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 3,
    },

    {
      name: 'Dizzying Assault+',

      effect: `
        Make a melee \\glossterm{strike} with double \\glossterm{weapon damage}.
        You and each creature damaged by the strike are \\stunned as a \\glossterm{condition}.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you or the damaged creatures during the current phase.
      `,
      rank: 7,
    },

    {
      name: 'Back Into the Fray',

      effect: `
        Make a \\glossterm{strike}.
        You gain a +2 accuracy bonus with the strike if you regained \\glossterm{hit points} or \\glossterm{damage resistance} and did not make any attacks last round.
      `,
      rank: 3,
    },

    {
      name: 'Guardbreaker',

      effect: `
        Choose an \\glossterm{ally}, then make a \\glossterm{strike}.
        Each target damaged by the strike takes a -2 penalty to all defenses against that ally's attacks this round.
      `,
      rank: 3,
    },

    {
      name: 'Two-Weapon Rhythm',

      effect: `
        Make a \\glossterm{strike} using two weapons (see \\pcref{Dual Wielding}).
        After making this strike, you \\glossterm{briefly} gain a +1 accuracy bonus with strikes for each weapon that you hit with.
      `,
      rank: 1,
    },
  ],
};
