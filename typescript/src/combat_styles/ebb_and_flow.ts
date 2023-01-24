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
        If that creature attacks you this round, you immediately make two melee \\glossterm{strikes} with a -2 accuracy penalty against them as a \\glossterm{reactive attack} if possible.
        Your \\glossterm{power} with both strikes is halved.
        These attacks resolve before the creature's attack, so if you incapacitate it with either strike, its attack does not affect you.
        You can only attack that creature once in this way, even if it attacks you multiple times.
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
        You gain a +2 accuracy bonus with the strike against each creature that you dealt damage to with a \\glossterm{strike} last round.
      `,
      rank: 3,
    },

    {
      name: 'Redeeming Flurry',

      effect: `
        Make two \\glossterm{strikes}.
        Your \\glossterm{power} with both strikes is halved.
        You take a -4 accuracy penalty with the strikes against anything other than creatures that you missed with a \\glossterm{strike} last round.
      `,
      rank: 5,
    },

    {
      name: 'Dazing Feint',

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\dazed as a \\glossterm{condition} if your attack results beats its Reflex defense.
      `,
      rank: 1,
    },

    {
      name: 'Stunning Feint',

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\stunned as a \\glossterm{condition} if your attack results beats its Reflex defense.
      `,
      rank: 5,
    },

    {
      name: 'Mind-Fuzzing Feint',

      effect: `
        Make a melee \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        Each creature damaged by the strike is \\glossterm{briefly} \\confused if your attack results beats its Reflex defense.
        After this effect ends, the creature cannot be confused by this effect again until it takes a \\glossterm{short rest}.
      `,
      rank: 7,
    },

    {
      name: 'Reckless Strike',

      effect: `
        Make a melee \\glossterm{strike}.
        You gain a +1 accuracy bonus and a +2 damage bonus with the strike.
        However, you \\glossterm{briefly} take a -2 penalty to all defenses after making the strike.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 1,
      scaling: {
        3: 'The damage bonus increases to +4.',
        5: 'The damage bonus increases to +8.',
        7: 'The damage bonus increases to +16.',
      },
    },

    {
      name: 'Reckless Flurry',

      // TODO: unclear rank
      effect: `
        Make two melee \\glossterm{strikes}.
        Your \\glossterm{power} with each strike is halved.
        In addition, you \\glossterm{briefly} take a -2 penalty to all defenses after making the strikes.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 7,
    },

    {
      name: 'Momentum Strike',

      effect: `
        Make a melee \\glossterm{strike}.
        If your movement during the \\glossterm{movement phase} of this round consisted entirely of moving at least 20 feet in a straight line towards your target, you gain a +4 damage bonus with the strike.
      `,
      rank: 3,
      scaling: {
        5: 'The damage bonus increases to +8.',
        7: 'The damage bonus increases to +16.',
      },
    },

    {
      name: 'Certain Strike',

      effect: `
        Make a \\glossterm{strike} with a +3 accuracy bonus.
        Your \\glossterm{power} with the strike is halved.
      `,
      rank: 1,
    },

    {
      name: 'Mighty Strike',

      effect: `
        Make a \\glossterm{strike} with a -1 penalty to \\glossterm{accuracy}.
        The strike deals maximum damage with all damage dice.
      `,
      rank: 1,
    },

    {
      name: 'Hunting Strike',

      effect: `
        Make a \\glossterm{strike}.
        Your \\glossterm{power} with the strike is halved.
        After making the strike, you gain a +1 bonus to \\glossterm{accuracy} against one target of the strike with future strikes.
        If the strike had multiple targets, you choose which target you gain the bonus against.
        This effect stacks with itself, up to a maximum of a +4 bonus.
        It lasts until you take a \\glossterm{short rest} or make a \\glossterm{strike} that does not include that creature as a target.
      `,
      rank: 3,
    },

    {
      name: 'Hunting Strike+',

      functionsLike: {
        exceptThat:
          'the accuracy bonus from each strike increases to +2. This bonus does not stack with the bonus from the \\maneuver{hunting strike} maneuver.',
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
      name: 'Mainhand Feint',

      effect: `
        Make a melee \\glossterm{strike}.
        You do not add your \\glossterm{power} to damage with the strike.
        However, you \\glossterm{briefly} add your \\glossterm{power} to damage with the \\ability{offhand strike} ability.
      `,
      rank: 5,
      tags: [],
    },

    {
      name: 'Reckless Assault',

      // -2 ranks for self-daze
      effect: `
        Make a melee \\glossterm{strike}.
        You and each creature that lost \\glossterm{hit points} from the strike are \\dazed as a \\glossterm{condition}.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you during the current phase.
      `,
      rank: 1,
    },

    {
      name: 'Reckless Assault+',

      effect: `
        Make a melee \\glossterm{strike}.
        You and each creature that lost \\glossterm{hit points} from the strike are \\stunned as a \\glossterm{condition}.
        This ability does not have the \\abilitytag{Swift} tag, so it does not affect attacks made against you or the damaged creatures during the current phase.
      `,
      rank: 5,
    },

    {
      name: 'Back Into the Fray',

      effect: `
        Make a melee \\glossterm{strike}.
        You gain a +2 accuracy bonus with the strike if you regained \\glossterm{hit points} or \\glossterm{damage resistance} and did not make any attacks last round.
      `,
      rank: 3,
    },

    {
      name: 'Tag-Team Strike',

      effect: `
        Make a melee \\glossterm{strike}.
        You gain a +1 accuracy bonus with the strike if the target is adjacent to one of your \\glossterm{allies}.
      `,
      rank: 1,
    },
  ],
};
