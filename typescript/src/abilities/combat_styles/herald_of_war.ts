import { CombatStyle } from '.';
// TODO: move this to a more generally shared location
import { CONDITION_CRIT } from '../constants';

// Naming conventions:
// "Shout" is directed, so single-target or cone
// "Roar" is omnidirectional, so radius
export const heraldOfWar: CombatStyle = {
  name: 'Herald of War',
  shortDescription:
    'Demoralize foes and inspire allies with battlecries and a commanding presence.',

  maneuvers: [
    {
      name: 'Cry of Rage',

      effect: `
        You are \\glossterm{briefly} \\primed and \\enraged.
      `,
      rank: 1,
      roles: ['focus'],
      tags: ['Auditory'],
    },

    {
      name: 'Cry of Rage+',

      effect: `
        You are \\glossterm{briefly} \\primed, \\empowered, and \\enraged.
      `,
      rank: 5,
      roles: ['focus'],
      tags: ['Auditory'],
    },

    {
      name: 'Stunning Shout',

      attack: {
        hit: `The target is \\glossterm{briefly} \\stunned.`,
        targeting: `
          Make an attack vs. Mental against everything in a \\medarea cone from you.
        `,
      },
      rank: 1,
      roles: ['flash'],
      tags: ['Auditory', 'Compulsion'],
    },

    {
      name: 'Stunning Shout+',

      // Brief + HP stun is worth 2 EA, so rank 4. That gives +1r for area rank, for a
      // total of ar6. But we only use ar5 here...
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\stunned.
          If it is \\glossterm{injured}, it is stunned as a \\glossterm{condition} instead.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea cone from you.
        `,
      },
      rank: 5,
      roles: ['flash'],
      tags: ['Auditory', 'Compulsion'],
    },

    // Could be either Brawn or Fort?
    {
      name: 'Faltering Roar',

      attack: {
        hit: `The target is \\glossterm{briefly} \\slowed.`,
        targeting: `
          Make an attack vs. Brawn against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 5,
      roles: ['flash'],
      tags: ['Auditory'],
    },

    {
      name: 'Goading Shout',

      // Brief + HP goad is 1.6 EA, or r3.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\goaded by you.
          If it has no remaining \\glossterm{hit points}, it is also goaded by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea cone from you.
        `,
      },
      tags: ['Auditory', 'Emotion'],
      roles: ['flash'],
      rank: 3,
    },

    {
      name: 'Goading Shout+',

      // Condition goad is 3 EA, or r9. If we drop to limited scope and then cheat for no
      // reason, we can get in at r7.
      attack: {
        crit: CONDITION_CRIT,
        hit: `The target is \\goaded by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea cone from you.
        `,
      },
      tags: ['Auditory', 'Emotion'],
      roles: ['flash'],
      rank: 7,
    },

    {
      name: 'Fearsome Roar',

      // Brief + HP frighten is 1.2 EA, so we can spend one EA on area for ar3.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\frightened by you.
          If the target is \\glossterm{injured}, it also becomes frightened of you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 1,
      roles: ['flash'],
      tags: ['Auditory', 'Emotion'],
    },

    {
      name: 'Fearsome Roar+',

      // Frightened as a condition is r5.
      attack: {
        crit: CONDITION_CRIT,
        hit: `The target is \\frightened by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 5,
      roles: ['flash'],
      tags: ['Auditory', 'Emotion'],
    },

    {
      name: 'Thunderous Shout',

      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea cone from you.
        `,
      },
      rank: 1,
      roles: ['clear'],
      tags: ['Auditory'],
    },

    {
      name: 'Thunderous Shout+',

      attack: {
        hit: `\\damagerankfive.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea cone from you.
        `,
      },
      rank: 5,
      roles: ['clear'],
      tags: ['Auditory'],
    },

    {
      name: 'Deafening Shout',

      attack: {
        hit: `
          \\damagerankone, and the target is \\glossterm{briefly} \\deafened.
        `,
        targeting: `
          Make an attack vs. Fortitude against a creature within \\shortrange.
        `,
      },
      rank: 1,
      roles: ['softener'],
      tags: ['Auditory'],
    },

    {
      name: 'Deafening Shout+',

      attack: {
        hit: `
          \\damagerankfive.
          \\hit The target becomes \\deafened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against a creature within \\shortrange.
        `,
      },
      rank: 5,
      roles: ['softener'],
      tags: ['Auditory'],
    },

    {
      name: 'Rally the Troops',

      effect: `
        Your \\glossterm{allies} within a \\largearea radius from you can each \\glossterm{briefly} ignore any effects from all \\glossterm{conditions} they are already affected by.
        Because this is a \\abilitytag{Swift} ability, so it removes any relevant penalties from those conditions during the current phase.
      `,
      rank: 3,
      roles: ['cleanse'],
      tags: ['Auditory', 'Swift'],
    },

    {
      name: 'Empowering Roar',

      effect: `
        Up to two \\glossterm{allies} within a \\smallarea radius from you are \\empowered this round.
      `,
      rank: 3,
      roles: ['boon'],
      tags: ['Auditory'],
    },

    {
      name: 'Empowering Roar+',

      effect: `
        Your \\glossterm{allies} within a \\medarea radius from you are \\empowered this round.
      `,
      rank: 7,
      roles: ['boon'],
      tags: ['Auditory'],
    },

    {
      name: 'Watch Out',

      effect: `
        Up to two \\glossterm{allies} within \\medrange are \\shielded this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against them during the current phase.
      `,
      rank: 1,
      roles: ['boon'],
      tags: ['Auditory', 'Swift'],
    },

    {
      name: 'Watch Out+',

      effect: `
        Your \\glossterm{allies} within a \\largearea radius from you are \\shielded this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against them during the current phase.
      `,
      rank: 5,
      roles: ['boon'],
      tags: ['Auditory', 'Swift'],
    },

    {
      name: 'Stand Firm',

      effect: `
        One \\glossterm{ally} within \\medrange is \\fortified and \\steeled this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against it during the current phase.
      `,
      rank: 1,
      roles: ['boon'],
      tags: ['Auditory', 'Swift'],
    },

    {
      name: 'Stand Firm+',

      effect: `
        Up to two \\glossterm{allies} within \\medrange are \\fortified and \\steeled this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against them during the current phase.
      `,
      rank: 5,
      roles: ['boon'],
      tags: ['Auditory', 'Swift'],
    },

    {
      name: 'Brace Yourselves',

      effect: `
        Up to two \\glossterm{allies} within \\shortrange are \\braced this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against them during the current phase.
      `,
      rank: 3,
      roles: ['boon'],
      tags: ['Auditory', 'Swift'],
    },

    {
      name: 'Directing Shout',

      effect: `
        Up to two \\glossterm{allies} within \\distrange are \\focused this round.
      `,
      rank: 5,
      roles: ['boon'],
      tags: ['Auditory'],
    },

    // Shielded is 0.3 EA and brief goad is 1.0 EA, so we need 1 / 0.7 = 1.4 EA of base
    // debuff, which is a standard r1 debuff.
    {
      name: 'Challenge',

      attack: {
        hit: `The target is \\glossterm{briefly} \\goaded by you.`,
        targeting: `
          Make an attack vs. Mental against up to two creatures in \\shortrange.
          Then, you are \\glossterm{briefly} \\shielded.
        `,
      },
      rank: 1,
      roles: ['generator', 'softener'],
      tags: ['Emotion'],
    },

    // Braced is 0.4 EA and brief goad + hp goad is 1.6 EA, so we need 1.6 / 0.6 = 2.7 EA
    // of base debuff, which is r8. Limited scope lets us get that at r7.
    {
      name: 'Challenge+',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\goaded by you.
          If the target is \\glossterm{injured}, it also goaded as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against up to four creatures in \\shortrange.
          Then, you are \\glossterm{briefly} \\braced.
        `,
      },
      rank: 7,
      roles: ['generator', 'softener'],
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Blow',

      // Brief frighten is 0.8 EA
      effect: `
        Make a \\glossterm{strike}.
        \\hit If your attack result also hits the target's Mental defense, it becomes \\glossterm{briefly} \\frightened by you.
      `,
      rank: 3,
      roles: ['softener'],
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Blow+',

      // Condition frighten is 1.7 EA
      effect: `
        Make a melee \\glossterm{strike} that deals triple damage.
        \\hit If your attack result also hits the target's Mental defense, it becomes \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['softener'],
      tags: ['Emotion'],
    },

    // The rank here is pretty ambiguous. Brief frighten is normally 0.8 EA, so we have
    // two ranks to spend on area. Making it conditional on a strike is maybe fine? This
    // can't frighten and deal damage to the same target, so it's pretty situational.
    {
      name: 'Inspire Awe',

      effect: `
        Make a strike that deals double damage.
        \\hit Compare your attack result to the Mental defense of each \\glossterm{enemy} other than the target of that strike within a \\smallarea radius from the target.
        On a hit, each secondary target is \\glossterm{briefly} \\frightened by you.
      `,
      rank: 5,
      roles: ['flash'],
      tags: ['Emotion'],
    },

    {
      name: 'Encouraging Battlecry',

      // We have to use a power scaling here because maneuvers don't have rank scaling, so
      // this would fall behind quickly otherwise
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You and each \\glossterm{ally} in a \\medarea radius from you each regain \\glossterm{hit points} equal to 1d6 \\add your \\glossterm{power}.
      `,
      rank: 3,
      roles: ['healing'],
      tags: ['Auditory', 'Emotion', 'Swift'],
    },

    {
      name: 'Encouraging Battlecry+',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You and each \\glossterm{ally} in a \\medarea radius from you each regain \\glossterm{hit points} equal to 1d8 per 2 power.
      `,
      rank: 7,
      roles: ['healing'],
      tags: ['Auditory', 'Emotion', 'Swift'],
    },

    {
      name: 'Mighty Roar',

      // Empowered + fortified is 0.5 EA, so we get 1.4 / 2 = 0.7 EA of debuff.
      // Brief deafened is 0.3 EA, so we get two ranks of +area, which gets us to area
      // rank 3.
      attack: {
        hit: `The target is \\glossterm{briefly} \\deafened.`,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea radius from you.
          Then, you are \\glossterm{briefly} \\fortified and \\empowered.
        `,
      },
      rank: 1,
      roles: ['generator', 'flash'],
      tags: ['Auditory'],
    },

    {
      name: 'Mighty Roar+',

      // To get deafened as a condition, we need 2.4 EA, which is r6.
      // Limited scope allows r5, though we cheat to keep r3 area.
      attack: {
        crit: CONDITION_CRIT,
        hit: `The target is \\deafened as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea radius from you.
          Then, you are \\glossterm{briefly} \\fortified and \\empowered.
        `,
      },
      rank: 5,
      roles: ['generator', 'flash'],
      tags: ['Auditory'],
    },
  ],
};
