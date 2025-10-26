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
      roles: ['retaliate'],
      tags: ['Swift'],
    },

    {
      name: 'Counter Sweep',

      effect: `
        Whenever a creature attacks you this round, you immediately make a melee \\glossterm{strike} with a +2 accuracy bonus against them as a \\glossterm{reactive attack} if possible.
        This attack resolves before the creature's attack, so if you incapacitate it with the strike, its attack does not affect you.
        You can only attack any individual creature once in this way, even if it attacks you multiple times.
      `,
      rank: 3,
      roles: ['retaliate'],
      tags: ['Swift'],
    },

    {
      name: 'Counter Flurry',

      effect: `
        Choose a creature you can see.
        If that creature attacks you this round, you immediately make two melee \\glossterm{strikes} against them as a \\glossterm{reactive attack} if possible.
        These attacks resolve before the creature's attack, so if you incapacitate it with either strike, its attack does not affect you.
        You can only respond once in this way, even if the creature attacks you multiple times.
      `,
      rank: 5,
      roles: ['retaliate'],
      tags: ['Swift'],
    },

    {
      name: 'Redeeming Followup',

      effect: `
        Make a \\glossterm{strike}.
        You gain a +2 accuracy bonus with the strike against all creatures that you missed with a \\glossterm{strike} last round.
      `,
      rank: 1,
      roles: ['payoff'],
    },

    {
      name: 'Redeeming Followup+',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        You gain a +2 accuracy bonus with the strike against all creatures that you missed with a \\glossterm{strike} last round.
      `,
      rank: 5,
      roles: ['payoff'],
    },

    {
      name: 'Victorious Followup',

      effect: `
        Make a \\glossterm{strike} with a -2 accuracy penalty.
        The strike deals \\glossterm{extra damage} equal to your power against each target that you dealt damage to with a \\glossterm{strike} last round.
      `,
      rank: 3,
      roles: ['payoff'],
    },

    {
      name: 'Victorious Followup+',

      effect: `
        Make a \\glossterm{strike} with a -2 accuracy penalty that deals quadruple \\glossterm{weapon damage}.
        The strike deals \\damageranksix \\glossterm{extra damage} against each target that you dealt damage to with a \\glossterm{strike} last round.
      `,
      rank: 7,
      roles: ['payoff'],
    },

    {
      name: 'All-In',

      effect: `
        Make a melee \\glossterm{strike} with a +1 accuracy bonus.
        After making the strike, you \\glossterm{briefly} take a -2 penalty to all defenses against each target of the strike.
      `,
      rank: 1,
      roles: ['burst'],
    },

    {
      name: 'All-In+',

      effect: `
        Make a melee \\glossterm{strike} with a +2 accuracy bonus that deals double damage.
        After making the strike, you \\glossterm{briefly} take a -2 penalty to all defenses against each target of either strike.
      `,
      rank: 5,
      roles: ['burst'],
    },

    // We normally assume a boss fight lasts 20 player actions, or 5 personal actions, so
    // using this on round 1 would affect your next 4 actions. We normally consider +4
    // accuracy to be worth 0.6 EA, but it's hard to get the full value out of this and
    // you can't combo it with a big swing, so it's fine to treat it as 0.4 EA or so.
    {
      name: 'Begin the Hunt',

      effect: `
        Make a strike with a -1 accuracy penalty.
        Then, you gain a +1 accuracy bonus against one creature targeted by the strike.
        If the strike had multiple targets, you choose which target you gain the bonus against.
        It lasts until you finish a \\glossterm{short rest} or make an attack that does not include that creature as a target.
      `,
      rank: 3,
      roles: ['ramp'],
    },

    // If you used this on your first two rounds, you'd theoretically get an additional 0.3 EA of
    // value, but your first round buff would also have been spent on one round of a
    // relatively low damage maneuver, so assume the stacking just takes this to 0.6 EA.
    {
      name: 'Begin the Hunt+',

      functionsLike: {
        name: 'begin the hunt',
        exceptThat:
          'the accuracy bonus stacks with itself, up to a maximum of a +4 bonus. This accuracy bonus does not stack with the accuracy bonus from \\ability{begin the hunt}.',
      },
      rank: 5,
      roles: ['ramp'],
    },

    {
      name: 'Punish Inattention',

      effect: `
        Choose a creature you can see.
        If that creature takes a \\glossterm{standard action} that does not attack you this round, you immediately make a melee \\glossterm{strike} with a +2 accuracy bonus against them as a \\glossterm{reactive attack} if possible.
        This attack resolves before the creature's action, so if you incapacitate it with the strike, its action fails.
        You can only attack that creature once in this way, even if it takes multiple standard actions.
      `,
      rank: 1,
      roles: ['burst'],
      tags: ['Swift'],
    },

    {
      name: 'Back Into the Fray',

      effect: `
        Make a \\glossterm{strike}.
        It deals double damage if you did not make any attacks last round and regained \\glossterm{hit points} last round.
      `,
      roles: ['payoff'],
      rank: 3,
    },

    {
      name: 'Guardbreaker',

      // This is theoretically worth 0.2 EA, since the ally gets one attack to take
      // advantage of it. That seems aggressively priced though? Arbitrarily double it to
      // 0.4.
      effect: `
        Choose an \\glossterm{ally}, then make a melee \\glossterm{strike}.
        \\hit The target takes a -2 penalty to its Armor and Reflex defenses against that ally's attacks this round.
      `,
      rank: 1,
      roles: ['trip'],
    },

    {
      name: 'Guardbreaker+',

      // By math, this is 0.4 EA. That seems unreasonably low. For now, leave this as is
      // and figure out why the math is wrong later.
      effect: `
        Choose an \\glossterm{ally}, then make a melee \\glossterm{strike} that deals double damage.
        \\hit The target takes a -4 penalty to its Armor and Reflex defenses against that ally's attacks this round.
      `,
      rank: 5,
      roles: ['trip'],
    },

    {
      name: 'Two-Weapon Rhythm',

      effect: `
        Make a \\glossterm{dual strike} using two weapons (see \\pcref{Dual Strikes}).
        \\hit You are \\glossterm{briefly} \\focused.
      `,
      rank: 3,
      roles: ['generator'],
    },

    {
      name: 'Tag-Team Followup',

      effect: `
        Make a \\glossterm{strike}.
        You get a +1 accuracy bonus with the strike if the target already took damage from one of your \\glossterm{allies} during the current round.
      `,
      rank: 1,
      roles: ['payoff'],
    },

    {
      name: 'Tag-Team Followup+',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        You get a +1 accuracy bonus with the strike if the target already took damage from one of your \\glossterm{allies} during the current round.
      `,
      rank: 5,
      roles: ['payoff'],
    },

    {
      name: 'Tranquil Kata',

      effect: `
        You are \\glossterm{briefly} \\braced.
        If your location did not change since the start of the round, you are also briefly \\focused.
      `,
      rank: 3,
      roles: ['focus'],
    },

    {
      name: 'Sharpening Kata',

      effect: `
        If you did not attack last round, you are \\glossterm{briefly} \\focused and \\honed.
      `,
      rank: 1,
      roles: ['focus'],
    },

    {
      name: 'Sharpening Kata+',

      effect: `
        If you did not attack last round, you are \\glossterm{briefly} \\primed and \\honed.
      `,
      rank: 5,
      roles: ['focus'],
    },

    // 0.7 + 0.3 = 1.0
    {
      name: 'Dance of Death',

      effect: `
        If you both dealt damage to a creature and took damage from a creature last round, you are \\glossterm{briefly} \\maximized and \\shielded.
      `,
      rank: 3,
      roles: ['focus'],
    },

    // 0.7 + 0.3 + 0.3 = 1.3
    {
      name: 'Dance of Death+',

      effect: `
        If you both dealt damage to a creature and took damage from a creature last round, you are \\glossterm{briefly} \\maximized and \\shielded.
        Since this ability has the \\atSwift tag, it protects you from attacks during the current phase.
      `,
      rank: 7,
      roles: ['focus'],
      tags: ['Swift'],
    },

    {
      name: 'Aftershock',

      effect: `
        Make a \\glossterm{strike} with a \\minus1 accuracy penalty.
        \\hit If your attack result hits the target's Fortitude defense, the target rumbles.
        A rumbling creature takes \\damagerankone during your next action.
      `,
      rank: 3,
      roles: ['burn'],
    },

    {
      name: 'Aftershock+',

      effect: `
        Make a \\glossterm{strike} with a \\minus1 accuracy penalty that deals double damage.
        \\hit If your attack result hits the target's Fortitude defense, the target rumbles.
        A rumbling creature takes \\damagerankfive during your next action.
      `,
      rank: 7,
      roles: ['burn'],
    },

    {
      name: 'Reckless Smash',

      effect: `
        Make a melee \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        After making the strike, you \\glossterm{briefly} take a \\minus2 penalty to your Armor defense.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Reckless Smash+',

      effect: `
        Make a melee \\glossterm{strike} that deals double \\glossterm{weapon damage} and triple damage overall.
        After making the strike, you \\glossterm{briefly} take a -2 penalty to your Armor defense.
      `,
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'Full-Body Thrust',

      effect: `
        Make a melee \\glossterm{strike} with \\glossterm{extra damage} equal to 1d4 plus half your \\glossterm{power}.
        However, you \\glossterm{briefly} take a -2 penalty to your accuracy and defenses after making the strike.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Full-Body Thrust+',

      effect: `
        Make a melee \\glossterm{strike} with \\damagerankseven \\glossterm{extra damage}.
        However, you \\glossterm{briefly} take a -2 penalty to your accuracy and defenses after making the strike.
      `,
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'One with the Blade',

      effect: `
        Make a \\glossterm{strike} that deals quadruple \\glossterm{weapon damage}.
        After making the strike, you \\glossterm{briefly} take a \\minus2 penalty to all non-Armor defenses.
      `,
      rank: 5,
      roles: ['burst'],
    },
  ],
};
