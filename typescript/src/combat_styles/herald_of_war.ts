import { CombatStyle } from '.';
// TODO: move this to a more generally shared location
import { CONDITION_CRIT } from '../mystic_spheres/constants';

export const heraldOfWar: CombatStyle = {
  name: 'Herald of War',
  shortDescription:
    'Demoralize foes and inspire allies with battlecries and a commanding presence.',

  maneuvers: [
    // +4 accuracy is 0.6 EA. That leaves 1.4 * 0.4 = 0.6 EA of debuff.
    // Brief enrage is 0.2 EA, so we have 2 ranks of +area, which gets us to a r3 area.
    {
      name: 'Boastful Battlecry',

      attack: {
        hit: `
          Each target is \\glossterm{briefly} \\enraged.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
          Whether you hit or miss, you \\glossterm{briefly} gain a +4 accuracy bonus with \\glossterm{strikes} against each target.
        `,
      },
      rank: 1,
      roles: ['generator'],
      tags: ['Auditory'],
    },

    // Enraged as a condition is 1.2 EA, and we only get 40% EA with a 0.6 EA buff, so we
    // would need a base debuff rank of 3 EA. With limited scope and cheating, we can
    // squeeze it into a r7 effect.
    {
      name: 'Boastful Battlecry+',

      functionsLike: {
        name: 'boastful battlecry',
        exceptThat: 'each target is enraged as a \\glossterm{condition} instead of only briefly.',
      },
      rank: 7,
      roles: ['generator'],
      tags: ['Auditory'],
    },

    {
      name: 'Stunning Roar',

      attack: {
        hit: `Each target is \\glossterm{briefly} \\stunned.`,
        targeting: `
          Make an attack vs. Mental against everything in a \\medarea cone from you.
        `,
      },
      rank: 1,
      roles: ['flash'],
      tags: ['Auditory', 'Compulsion'],
    },

    {
      name: 'Stunning Roar+',

      // Brief + HP stun is worth 2 EA, so rank 4. That gives room to scale to a huge
      // radius.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\glossterm{briefly} \\stunned.
          If it has no remaining \\glossterm{damage resistance}, it is stunned as a \\glossterm{condition} instead.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\hugearea radius from you.
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
        hit: `Each target is \\glossterm{briefly} \\slowed.`,
        targeting: `
          Make an attack vs. Brawn against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 5,
      roles: ['flash'],
      tags: ['Auditory'],
    },

    {
      name: 'Goading Roar',

      // baseline for a brief + HP goad is r1. We can spend two ranks on area to get a r5
      // area.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\glossterm{briefly} \\goaded by you.
          If it has no remaining \\glossterm{hit points}, it is also goaded by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      tags: ['Auditory', 'Emotion'],
      roles: ['flash'],
      rank: 3,
    },

    {
      name: 'Goading Roar+',

      attack: {
        crit: CONDITION_CRIT,
        hit: `Each target is \\goaded by you as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      tags: ['Auditory', 'Emotion'],
      roles: ['flash'],
      rank: 7,
    },

    {
      name: 'Provoking Roar',

      attack: {
        hit: `
          1d4 damage and each target is \\glossterm{briefly} \\enraged.
        `,
        targeting: `
          Make an attack vs. Mental against everything in a \\medarea cone from you.
        `,
      },
      rank: 1,
      roles: ['flash'],
      tags: ['Auditory', 'Emotion'],
    },

    {
      name: 'Enraging Roar',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\enraged as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against everything a \\largearea cone from you.
        `,
      },
      roles: ['flash'],
      rank: 3,
      tags: ['Auditory', 'Emotion'],
    },

    {
      name: 'Fearsome Roar',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\glossterm{briefly} \\frightened by you.
          Each target with no remaining \\glossterm{damage resistance} also becomes frightened of you as a \\glossterm{condition}.
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

      // Frightened as a condition is theoretically r4, not sure why this is r5. No room
      // to increase area because we'd need to spend two ranks on it
      attack: {
        crit: CONDITION_CRIT,
        hit: `Each target is \\frightened by you as a \\glossterm{condition}.`,
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
          Make an attack vs. Fortitude against a creature within \\shortrange of you.
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
          Make an attack vs. Fortitude against a creature within \\shortrange of you.
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
        Because this ability has the \\abilitytag{Swift} tag, it removes any relevant penalties from those conditions during the current phase.
      `,
      rank: 3,
      roles: ['cleanse'],
      tags: ['Auditory', 'Swift'],
    },

    {
      name: 'Empowering Roar',

      effect: `
        Your \\glossterm{allies} within a \\largearea radius from you are \\empowered this round.
      `,
      rank: 3,
      roles: ['boon'],
      tags: ['Auditory'],
    },

    {
      name: 'Empowering Roar+',

      effect: `
        You and your \\glossterm{allies} within a \\largearea radius from you are \\glossterm{briefly} \\empowered.
      `,
      rank: 7,
      roles: ['boon'],
      tags: ['Auditory'],
    },

    // Shielded is 0.3 EA and brief goad is 1.0 EA, so we need 1 / 0.7 = 1.4 EA of base
    // debuff, which is a standard r1 debuff.
    {
      name: 'Challenge',

      attack: {
        hit: `Each target is \\glossterm{briefly} \\goaded by you.`,
        targeting: `
          Make an attack vs. Mental against up to two creatures in \\shortrange.
          Then, you are \\glossterm{briefly} \\glossterm{shielded}.
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
          Each target is \\glossterm{briefly} \\goaded by you.
          Each target with no remaining \\glossterm{damage resistance} is also goaded as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against up to four creatures in \\shortrange.
          Then, you are \\glossterm{briefly} \\glossterm{braced}.
        `,
      },
      rank: 7,
      roles: ['generator', 'softener'],
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Blow',

      effect: `
        Make a melee \\glossterm{strike}.
        \\hit If your attack result also hits the target's Mental defense, it becomes \\glossterm{briefly} \\frightened by you.
      `,
      rank: 1,
      roles: ['softener'],
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Blow+',

      effect: `
        Make a melee \\glossterm{strike} that deals triple damage.
        \\hit If your attack result also hits the target's Mental defense, it becomes \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 7,
      roles: ['softener'],
      tags: ['Emotion'],
    },

    // The rank here is pretty ambiguous. The baseline for a small radius enemies-only
    // brief frighten would be r1. Making it conditional on a strike is maybe fine? This
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
        You and each \\glossterm{ally} in a \\medarea radius from you each regain damage resistance equal to 1d6 \\add your \\glossterm{power}.
      `,
      rank: 3,
      roles: ['healing'],
      tags: ['Auditory', 'Emotion', 'Swift'],
    },

    {
      name: 'Encouraging Battlecry+',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You and each \\glossterm{ally} in a \\medarea radius from you each regain 1d8 per 2 power \\glossterm{damage resistance}.
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
        hit: `Each target is \\glossterm{briefly} \\deafened.`,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea radius from you.
          Then, you are \\glossterm{briefly} \\glossterm{empowered} and \\glossterm{fortified}.
        `,
      },
      rank: 1,
      roles: ['generator'],
      tags: ['Auditory'],
    },

    {
      name: 'Mighty Roar+',

      // To get deafened as a condition, we need 2.4 EA, which is r6.
      // Limited scope allows r5, though we cheat to keep r3 area.
      attack: {
        crit: CONDITION_CRIT,
        hit: `Each target is \\deafened as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea radius from you.
          Then, you are \\glossterm{briefly} \\glossterm{empowered} and \\glossterm{fortified}.
        `,
      },
      rank: 5,
      roles: ['generator'],
      tags: ['Auditory'],
    },
  ],
};
