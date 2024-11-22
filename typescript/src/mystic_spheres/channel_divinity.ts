import { MysticSphere } from '.';
import { CONDITION_CRIT } from './constants';

export const channelDivinity: MysticSphere = {
  name: 'Channel Divinity',
  hasImage: true,
  shortDescription: 'Invoke divine power to smite foes and gain power.',
  sources: ['divine'],

  cantrips: [
    {
      effect: `
        The magical essence of your deity or alignment is overlayed on your body as an aura.
        This represents your deity if you are a cleric, or your alignment if you are a paladin.
        In either case, you gain the ability to see the auras of other creatures using this spell if they are within \\rngshort range.
        If you see another creature with the same aura as you, this spell grants you the unerring knowledge of that similarity.
        This can allow you to identify other followers of your deity or alignment with certainty.

        This spell lasts until you use it again or until you \\glossterm{dismiss} it.
      `,
      name: 'Testament',
      scaling: {
        2: 'The range increases to \\rngmed.',
        4: `
          If you are a cleric, you can also unerringly see an aura around creatures who worship your deity.
          If you are a paladin, you can also unerringly see an aura around creatures who share your devoted alignment.
        `,
        6: 'The range increases to \\rnglong.',
      },
    },
    {
      effect: `
        You emit \\glossterm{bright illumination} in a radius of your choice, up to a maximum of 15 feet, and \\glossterm{shadowy illumination} in twice that radius.
        The color of the light depends on the nature of your deity or alignment.
        Each deity has their own color or color combination.
        Typically, good is yellow, evil is purple, law is white, and chaos is a myriad of ever-changing colors.
      `,
      name: 'Divine Radiance',
      narrative: `
        You call on the majesty of your deity or alignment to radiate into the world.
      `,
      scaling: {
        2: 'The maximum radius of bright illumination increases to 30 feet.',
        4: 'The maximum radius of bright illumination increases to 60 feet.',
        6: 'The maximum radius of bright illumination increases to 120 feet.',
      },
      type: 'Sustain (attuneable, minor)',
    },
  ],
  spells: [
    {
      name: 'Deliverance of the Faithful',

      effect: `
        At the end of the next round, you become infused with divine power, which has three effects.
        % d3
        First, you heal 1d8 \\glossterm{hit points} \\plus1 per \\glossterm{power}.
        This healing cannot increase your hit points above half your maximum hit points.
        Second, you may remove one \\glossterm{condition} affecting you.
        This cannot remove an effect applied during that round.
        Third, you gain a +2 bonus to \\glossterm{accuracy} during the round after you become infused with divine power.
      `,
      rank: 4,
      scaling: { special: 'The healing increases by 1d8 for each rank beyond 4.' },
      tags: [],
    },

    {
      name: 'Triumph of the Faithful',

      effect: `
        At the end of the next round, you become infused with divine power.
        You gain a +3 bonus to \\glossterm{accuracy} during the round after you become infused with divine power.
      `,
      rank: 1,
      scaling: {
        3: 'The accuracy bonus increases to +4.',
        5: 'The accuracy bonus increases to +5.',
        7: 'The accuracy bonus increases to +6.',
      },
      tags: [],
    },

    {
      name: 'Divine Authority',

      effect: `
        If you have Persuasion as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: 'Attune',
    },

    {
      name: 'Agent of the Divine',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to \\glossterm{hit points} and \\glossterm{damage resistance}.
        In addition, you gain a +1 \\glossterm{enhancement bonus} to your \\glossterm{vital rolls}.
      `,
      rank: 1,
      scaling: {
        3: `
          The bonuses to hit points and damage resistance increase to +8.
        `,
        5: `
          The bonuses to hit points and damage resistance increase to +16.
        `,
        7: `
          The bonuses to hit points and damage resistance increase to +32.
        `,
      },
      type: 'Attune (deep)',
    },

    {
      name: 'Endurance of the Faithful',

      effect: `
        You gain a +2 bonus to all defenses and a +2 bonus to \\glossterm{vital rolls} this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against you during the current phase.
      `,
      rank: 1,
      scaling: {
        3: `The bonuses increase to +3.`,
        5: `The bonuses increase to +4.`,
        7: `The bonuses increase to +5.`,
      },
      tags: ['Swift'],
    },

    {
      name: 'Retributive Judgment',

      // close range for accuracy
      attack: {
        hit: `
          \\damageranktwo{}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\shortrange.
          You gain a +2 accuracy bonus if the target attacked you or one of your \\glossterm{allies} during the previous round.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Retributive Judgment',

      // close range and d5h for accuracy
      attack: {
        hit: `
          \\damagerankfive{}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\shortrange.
          You gain a +4 accuracy bonus if the target attacked you or one of your \\glossterm{allies} during the previous round.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Word of Faith',

      attack: {
        hit: `
          \\damagerankone{}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Word of Faith',

      attack: {
        hit: `
          \\damagerankthree{}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Word of Faith',

      attack: {
        hit: `
          \\damageranksix{}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Fearful Awe',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target with no remaining \\glossterm{damage resistance} becomes \\frightened by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Efficient Fearful Awe',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\frightened by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Mantle of Faith',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to your \\glossterm{damage resistance}.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },

    {
      name: 'Divine Might',

      effect: `
        Your size increases by one \\glossterm{size category}.
        Increasing your size gives you a +1 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -1 penalty to your Reflex defense, and a -5 penalty to Stealth.
        It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).

        This spell makes you slightly clumsy in your new size.
        You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Greater Divine Might',

      effect: `
        Your size increases by two \\glossterm{size categories}.
        This gives you a +2 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -2 penalty to your Reflex defense, and a -10 penalty to Stealth.
        It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).

        This spell makes you slightly clumsy in your new size.
        You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
      `,
      rank: 7,
      type: 'Attune',
    },

    {
      name: 'Divine Presence',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\frightened by you as a \\glossterm{condition}.
        `,
        targeting: `
          Whenever an \\glossterm{enemy} enters a \\smallarea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.
          After you attack a creature this way, it becomes immune to this attack from you until it finishes a \\glossterm{short rest}.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Attune (deep)',
    },

    {
      name: 'Faithful Endurance',

      effect: `
        You gain a +2 \\glossterm{enhancement bonus} to \\glossterm{vital rolls} (see \\pcref{Vital Rolls}).
      `,
      rank: 2,
      scaling: { 4: `The bonus increases to +3.`, 6: `The bonus increases to +4.` },
      type: 'Attune',
    },

    {
      name: 'Divine Power',

      effect: `
        Whenever you make a damaging attack, you can infuse that attack with divine power.
        If you do, the attack deals 1d4 \\glossterm{extra damage} when it deals damage for the first time.
        After you enhance an attack in this way, this effect ends.
      `,
      rank: 1,
      scaling: {
        3: `The extra damage increases to 1d8.`,
        5: `The extra damage increases to 2d6.`,
        7: `The extra damage increases to 2d10.`,
      },
      type: 'Attune',
    },

    {
      name: 'Divine Offering',

      castingTime: 'minor action',
      effect: `
        When you cast this spell, you gain a \\glossterm{vital wound} that has no vital wound effect.
        In exchange, you gain a +4 \\glossterm{enhancement bonus} to \\glossterm{vital rolls} and become immune to \\glossterm{conditions}.
      `,
      rank: 6,
      type: 'Sustain (free)',
    },

    {
      name: 'Banish Anathema',

      // baseline is r3 due to +2 accuracy
      attack: {
        hit: `
          \\damageranktwo{}.
          If the target loses \\glossterm{hit points} from this damage, it is \\glossterm{teleported} to a random safe place in the Astral Plane.
          At the end of the next round, it teleports back to its original location, or into the closest open space if that location is occupied.
          After it returns, it becomes immune to being teleported in this way until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You gain a +2 accuracy bonus if the target attacked you or one of your \\glossterm{allies} during the previous round.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Unwavering Faith',

      effect: `
        You are \\glossterm{immune} to \\abilitytag{Compulsion} and \\abilitytag{Emotion} attacks.
      `,
      rank: 5,
      type: 'Attune',
    },

    {
      name: 'Fearful Judgment',

      attack: {
        hit: `{
          \\damagerankthree{}.
          If the target loses hit points, it is \\frightened by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\shortrange.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },
    {
      name: 'Intense Fearful Judgment',

      attack: {
        hit: `
          \\damagerankseven{}.
          If the target loses hit points, it is \\panicked by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\shortrange.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },
  ],
  rituals: [
    {
      name: 'Divine Seal',

      castingTime: "one minute",
      effect: `
        The area within an \\largearea radius \\glossterm{zone} from your location becomes sealed by your deity.
        Whenever a creature casts a divine spell in the area, if that creature does not share your deity, the spell has a 50\\% chance to fail with no effect.
      `,
      rank: 3,
      type: 'Attune',
    },
    {
      name: 'Persistent Divine Seal',

      castingTime: "24 hours",
      functionsLike: {
        name: "divine seal",
        exceptThat: "the effect lasts for one year.",
      },
      rank: 3,
    },
    {
      name: 'Consecrated Ground',

      castingTime: 'one hour',
      effect: `
        The area within an \\largearea radius \\glossterm{zone} from your location becomes sacred to your deity.
        % TODO: what cares about consecration?
        This has no tangible effects by itself, but some special abilities and monsters behave differently in consecrated areas.
      `,
      rank: 2,
      type: 'Attune',
    },
    {
      name: 'Permanent Consecrated Ground',

      castingTime: '24 hours',
      functionsLike: {
        exceptThat: `
          the effect is permanent.
        `,
        name: 'consecrated ground',
      },
      rank: 4,
    },

    {
      name: 'Divine Transit',

      castingTime: '24 hours',
      effect: `
        Choose a destination on your current plane, and up to six Medium or smaller ritual participants.
        Each target is teleported to the temple or equivalent holy site to your deity that is closest to the chosen destination.
        This does not require \\glossterm{line of sight} or \\glossterm{line of effect} to the destination.

        You can specify the destination by naming an \\glossterm{astral beacon}.
        Alternately, you can specify the destination with a precise mental image of its appearance.
        The image does not have to be perfect, but it must unambiguously identify the destination.
        If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
        The new destination will be one that more closely resembles your mental image.
        If no such area exists, the ritual simply fails.

        `,
      rank: 4,
    },
    {
      name: 'Efficient Divine Transit',

      functionsLike: {
        exceptThat: `
          the casting time is shorter, and the ritual is much less exhausting.
        `,
        name: 'divine transit',
      },
      rank: 6,
      tags: [],
      castingTime: 'one hour',
    },

    {
      name: 'Commune',

      castingTime: '24 hours',
      effect: `
        You ask your source of divine power a single yes or no question.
        You receive a correct answer to that question to the limit of that source's knowledge, which is usually quite extensive.
        The answer is typically given as "yes" or "no", but it may answer "unclear" if the source does not know the answer.
        In cases where a one-word answer would be misleading or contrary to the source's interests, a short phrase may be given as an answer instead.

        This ritual only yields accurate results once for any given situation.
        If you perform the ritual again in a situation that has not meaningfully changed, you receive no answer regardless of your question.
        For example, if you are presented with seven doorways, with one doorway leading to a magnificent treasure and all other doorways leading to certain death, you cannot simply perform this ritual six times to determine the correct doorway.
      `,
      rank: 3,
    },
    {
      name: 'Efficient Commune',

      functionsLike: {
        exceptThat: `
          the casting time is shorter, and the ritual is much less exhausting.
        `,
        name: 'commune',
      },
      rank: 5,
      tags: [],
      castingTime: 'one hour',
    },
  ],
};
