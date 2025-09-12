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
        In either case, you gain the ability to see the auras of other creatures using this spell if they are within \\medrange.
        If you see another creature with the same aura as you, this spell grants you the unerring knowledge of that similarity.
        This can allow you to identify other followers of your deity or alignment with certainty.

        This ability lasts until you \glossterm{dismiss} it or until you use it again.
      `,
      roles: ['narrative'],
      name: 'Testament',
    },
  ],
  spells: [
    {
      name: 'Deliverance of the Faithful',

      // Focused is 0.6 EA, healing is less than a normal heal. Combining healing with an
      // offensive buff means it's hard to take full advantage of its theoretical power
      // when used as a pre-combat buff.
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        At the end of the next round, you become infused with divine power.
        This causes you to regain \\hprankfour, and you become \\glossterm{briefly} \\focused.
      `,
      roles: ['focus'],
      rank: 4,
      scaling: 'healing',
      tags: [],
    },

    {
      name: 'Triumph of the Faithful',

      effect: `
        At the end of the next round, you become infused with divine power.
        This causes you to \\glossterm{briefly} gain a \\plus2 bonus to your Mental defense and be \\focused.
      `,
      rank: 1,
      roles: ['focus'],
      tags: [],
    },

    {
      name: 'Vengeance of the Faithful',

      effect: `
        At the end of the next round, you become infused with divine power.
        This causes you to to be \\glossterm{briefly} \\primed.
      `,
      rank: 7,
      roles: ['focus'],
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
      name: 'Endure Tribulation',

      effect: `
        You take half damage from all sources this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against you during the current phase.
      `,
      rank: 1,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Embrace Tribulation',

      effect: `
        You take half damage from all sources this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against you during the current phase.
        If an attack \\glossterm{injures} you this round, you become \\primed next round.
      `,
      rank: 6,
      roles: ['turtle'],
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
          You gain a +3 accuracy bonus if the target attacked you or one of your \\glossterm{allies} during the previous round.
        `,
      },
      rank: 2,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Retributive Judgment',

      // close range for accuracy
      attack: {
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\shortrange.
          You gain a +3 accuracy bonus if the target attacked you or one of your \\glossterm{allies} during the previous round.
        `,
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'damage',
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
      roles: ['clear'],
      scaling: 'damage',
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
      roles: ['clear'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Word of Faith',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'accuracy',
    },

    // Briefly frightened by you is 0.8 EA. Enemies in a large area is r5 area,
    // so we spend 3 ranks on area and cheat the last area rank.
    {
      name: 'Fearful Awe',

      attack: {
        hit: `
          The target is \\glossterm{briefly} \\frightened by you.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 1,
      roles: ['flash'],
      scaling: 'accuracy',
    },

    // Repeating brief frighten is 1.6 EA. To reach r5, we need to spend two levels on
    // area? That's a little more than necessary.
    {
      name: 'Echoing Fearful Awe',

      attack: {
        hit: `
          The target is \\glossterm{briefly} \\frightened by you.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
          This attack \\glossterm{repeats} during your next action.
        `,
      },
      rank: 4,
      roles: ['flash'],
      scaling: 'accuracy',
    },

    // Frightened as a condition is 2.1 = r6.
    {
      name: 'Enduring Fearful Awe',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\frightened by you as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 6,
      roles: ['flash'],
      scaling: 'accuracy',
    },

    // TODO: calculate EA of enlarge
    {
      name: 'Divine Might',

      effect: `
        Your size increases by one \\glossterm{size category}.
        Increasing your size gives you a +1 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -1 penalty to your Reflex defense, and a -4 penalty to your Stealth skill.
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

    // Reactive brief frighten is 1.2 EA. Deep r2 spell is ~1.6 EA, so we can increase the
    // area.
    {
      name: 'Daunting Presence',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\frightened by you.
        `,
        targeting: `
          Whenever an \\glossterm{enemy} enters a \\largearea radius \\glossterm{emanation} from you, make a \\glossterm{reactive attack} vs. Mental against them.
          After you attack a creature this way, it becomes immune to this attack from you until it finishes a \\glossterm{short rest}.
        `,
      },
      rank: 2,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Attune (deep)',
    },

    // r5 attunement can give 1.2 EA
    {
      name: 'Efficient Daunting Presence',

      functionsLike: {
        name: 'daunting presence',
        exceptThat: 'it is a normal attunement instead of a \\glossterm{deep attunement}.',
      },
      rank: 5,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Emotion'],
      type: 'Attune',
    },

    {
      name: 'Faithful Endurance',

      effect: `
        You gain a +2 \\glossterm{enhancement bonus} to your \\glossterm{vital rolls} (see \\pcref{Vital Rolls}).
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Divine Power',

      effect: `
        Whenever you make a damaging attack, you can infuse that attack with divine power as a \\glossterm{minor action}.
        If you do, the attack deals 1d6 \\glossterm{extra damage} when it deals damage for the first time.
        After you enhance an attack in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The extra damage increases to 2d6.`,
        5: `The extra damage increases to 2d10.`,
        7: `The extra damage increases to 4d10.`,
      },
      type: 'Attune',
    },

    // Unaffected by conditions has no clear EA, and neither does giving yourself a vital
    // wound.
    {
      name: 'Divine Offering',

      castingTime: 'minor action',
      effect: `
        When you cast this spell, you gain a \\glossterm{vital wound} that has no vital wound effect.
        In exchange, you gain a +2 \\glossterm{enhancement bonus} to \\glossterm{vital rolls} and are \\glossterm{unaffected} by \\glossterm{conditions}.
      `,
      rank: 6,
      roles: ['focus'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Banish Anathema',

      // baseline is r3 due to +2 accuracy
      attack: {
        hit: `
          If the target is \\glossterm{injured}, it \\glossterm{teleports} to a random safe place in the Astral Plane.
          At the end of the next round, it teleports back to its original location, or into the closest open space if that location is occupied.
          After it returns, it becomes immune to being teleported in this way until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You gain a +2 accuracy bonus if the target attacked you or one of your \\glossterm{allies} during the previous round.
        `,
      },
      rank: 4,
      roles: ['trip'],
      scaling: 'accuracy',
    },

    // TODO: Unclear EA
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
      name: 'Power of Belief',

      effect: `
        You are \\empowered.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Shield of Faith',

      effect: `
        You are \\shielded.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Efficient Shield of Faith',

      effect: `
        You are \\shielded.
      `,
      rank: 7,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Divine Mantle',

      effect: `
        You are \\braced.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    // dr4 is 1.75dpp.
    // dr2 * 1.5 is 3.75 + 1.5dpp.
    {
      name: 'Unerring Judgment',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        targeting: `
          Make an attack vs. Mental with a \\plus5 accuracy bonus against one creature within \\medrange.
        `,
      },
      rank: 4,
      roles: ['trip'],
      scaling: 'accuracy',
    },

    // dr7 is 5.5 + 2.75dpp.
    // dr5 * 1.5 is 5.25 + 2.6dpp.
    {
      name: 'Mighty Unerring Judgment',

      attack: {
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Mental with a \\plus5 accuracy bonus against one creature within \\medrange.
        `,
      },
      rank: 7,
      roles: ['trip'],
      scaling: 'accuracy',
    },

    // 0.4 EA, so -40% debuff EA. Brief stun is normally 1.4 EA, so 2.3 EA = rank 6 with
    // this, or rank 5 with limited scope.
    {
      name: 'Greater Word of Power',

      attack: {
        hit: `
          The target is \\glossterm{briefly} \\stunned.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
          Then, you are \\glossterm{briefly} \\empowered.
        `,
      },
      rank: 5,
      roles: ['generator'],
      scaling: 'accuracy',
    },

    // Brief + HP deafen is normally ~0.9 EA, so 1.5 EA with empower. Call that rank 1.
    {
      name: 'Word of Power',

      attack: {
        hit: `
          The target is \\glossterm{briefly} \\deafened.
          If it is \\glossterm{injured}, it is also deafened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
          Then, you are \\glossterm{briefly} \\empowered.
        `,
      },
      rank: 1,
      roles: ['generator'],
      scaling: 'accuracy',
    },
  ],
};
