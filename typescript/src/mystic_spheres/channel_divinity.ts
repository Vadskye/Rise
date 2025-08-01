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

        This ability lasts until you \glossterm{dismiss} it or until you use it again.
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
  ],
  spells: [
    {
      name: 'Deliverance of the Faithful',

      // TODO: modernize
      effect: `
        At the end of the next round, you become infused with divine power, which has three effects.
        % d3
        First, you heal 1d8 \\glossterm{hit points} \\plus1 per \\glossterm{power}.
        This healing cannot increase your hit points above half your maximum hit points.
        Second, you may remove one \\glossterm{condition} affecting you.
        This cannot remove an effect applied during that round.
        Third, you gain a +2 \\glossterm{accuracy} bonus during the round after you become infused with divine power.
      `,
      rank: 4,
      scaling: { special: 'The healing increases by 1d8 for each rank beyond 4.' },
      tags: [],
    },

    {
      name: 'Triumph of the Faithful',

      // Compare with Boastful Battlecry
      effect: `
        At the end of the next round, you become infused with divine power.
        You gain a +4 \\glossterm{accuracy} bonus during the round after you become infused with divine power.
      `,
      rank: 1,
      tags: [],
    },

    {
      name: 'Divine Authority',

      effect: `
        If you have Persuasion as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      roles: ['attune'],
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
        You gain a +4 \\glossterm{enhancement bonus} to your maximum \\glossterm{hit points} and \\glossterm{damage resistance}.
        In addition, you gain a +1 \\glossterm{enhancement bonus} to your \\glossterm{vital rolls}.
      `,
      rank: 1,
      roles: ['attune'],
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
      name: 'Endure Tribulation',

      effect: `
        You gain a +2 bonus to all defenses and a +4 bonus to \\glossterm{vital rolls} this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against you during the current phase.
      `,
      rank: 1,
      tags: ['Swift'],
    },

    {
      name: 'Retributive Judgment',

      // close range for accuracy
      attack: {
        hit: `
          \\damageranktwo.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\shortrange.
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
          \\damagerankfive.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\shortrange.
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
          \\damagerankone.
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
          \\damagerankthree.
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
          \\damageranksix.
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
          If the target has no remaining \\glossterm{damage resistance}, it becomes \\frightened by you as a \\glossterm{condition}.
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
          The target is \\frightened by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
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
      roles: ['attune'],
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
      roles: ['attune'],
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
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Attune (deep)',
    },

    {
      name: 'Faithful Endurance',

      effect: `
        You gain a +2 \\glossterm{enhancement bonus} to your \\glossterm{vital rolls} (see \\pcref{Vital Rolls}).
      `,
      rank: 2,
      roles: ['attune'],
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
      roles: ['attune'],
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
        In exchange, you gain a +2 \\glossterm{enhancement bonus} to \\glossterm{vital rolls} and become immune to \\glossterm{conditions}.
      `,
      rank: 6,
      type: 'Sustain (free)',
    },

    {
      name: 'Banish Anathema',

      // baseline is r3 due to +2 accuracy
      attack: {
        hit: `
          \\damageranktwo.
        `,
        injury: `
          The target is \\glossterm{teleported} to a random safe place in the Astral Plane.
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
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Fearful Judgment',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        injury: `
          The target becomes \\frightened by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\shortrange.
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
          \\damagerankseven.
        `,
        injury: `
          The target becomes \\panicked by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\shortrange.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },
  ],
};
