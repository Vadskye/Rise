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

        This ability lasts until you \\glossterm{dismiss} it or until you use it again.
      `,
      name: 'Testament',
      roles: ['narrative'],
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
      roles: ['focus', 'healing', 'exertion'],
      rank: 4,
      scaling: 'healing',
      tags: [],
    },

    {
      name: 'Triumph of the Faithful',

      effect: `
        At the end of the next round, you become infused with divine power.
        This causes you to \\glossterm{briefly} gain a \\plus2 bonus to your Mental defense and become \\focused.
      `,
      rank: 1,
      roles: ['focus', 'turtle'],
      tags: [],
    },

    {
      name: 'Restoration of the Faithful',

      // -1d for delay, since this basically guarantees you will get good use from the
      // healing
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        At the end of the next round, you become infused with divine power.
        This causes you to regain \\hprankfour.
      `,
      roles: ['healing', 'exertion'],
      rank: 2,
      scaling: 'healing',
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
      roles: ['turtle', 'focus', 'retaliate'],
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
      roles: ['burst', 'retaliate'],
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
      roles: ['burst', 'retaliate'],
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
      scaling: 'damage',
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
      scaling: 'damage',
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

    // TODO: scaling?
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
      roles: ['focus', 'exertion'],
      type: 'Sustain (minor)',
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
      roles: ['burst'],
      scaling: 'damage',
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
      roles: ['burst'],
      scaling: 'damage',
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
      roles: ['flash', 'generator'],
      scaling: 'accuracy',
    },

    // Brief + HP deafen is normally ~0.9 EA, so 1.5 EA with empower. Call that rank 1.
    {
      name: 'Word of Power',

      attack: {
        crit: CONDITION_CRIT,
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
      roles: ['flash', 'generator'],
      scaling: 'accuracy',
    },

    // HP Banishment is 2 EA, so r4, or r3 with limited scope
    {
      name: 'Divine Interdiction',

      attack: {
        hit: `
          If the target is \\glossterm{injured}, an interdiction \\glossterm{briefly} divides it from everything outside itself.
          No ability can have \\glossterm{line of effect} to or from it, even abilities that can pass pass through solid objects.
          After the interdiction ends, the target becomes immune to this effect until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\medrange.
        `,
      },
      rank: 3,
      roles: ['stasis'],
      scaling: 'accuracy',
    },

    {
      name: 'Sanctified Blade',

      effect: `
        Whenever you make a \\glossterm{strike}, you can activate this effect as a \\glossterm{minor action}.
        If you do, the strike deals 1d6 \\glossterm{extra damage}.
        After you enhance a strike in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      // Weaker scaling than Enhance Magic -- Might because strikes double more quickly.
      // TODO: actual scaling math
      scaling: {
        3: `The extra damage increases to 1d10.`,
        5: `The extra damage increases to 2d8.`,
        7: `The extra damage increases to 4d6.`,
      },
      type: 'Attune',
    },

    // Injury goad is 1.2 EA. This is probably too generous to also bundle brief dazzle?
    {
      name: "Champion's Blade",

      attack: {
        hit: `
          The target is \\glossterm{briefly} \\goaded by you.
          If it was \\glossterm{injured} by the strike, it is also goaded by you as a \\glossterm{condition}.
        `,
        targeting: `
          Whenever you make a \\glossterm{strike}, you can activate this effect as a \\glossterm{minor action}.
          If you do, make an attack vs. Mental against each creature hit by the strike.
          After you enhance a strike in this way, this ability is \\glossterm{dismissed}.
        `,
      },
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },

    // Injury dazzle is 0.7 EA. This is probably too generous to also bundle brief dazzle?
    {
      name: "Radiant Blade",

      attack: {
        hit: `
          The target is \\glossterm{briefly} \\dazzled.
          If it was \\glossterm{injured} by the strike, it is also dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Whenever you make a \\glossterm{strike}, you can activate this effect as a \\glossterm{minor action}.
          If you do, make an attack vs. Mental against each creature hit by the strike.
          After you enhance a strike in this way, this ability is \\glossterm{dismissed}.
        `,
      },
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    // +4a is 0.9 EA on ally
    {
      name: "Unerring Blade",

      effect: `
        Whenever you make a \\glossterm{strike}, you can activate this effect as a \\glossterm{minor action}.
        If you do, you gain a \\plus4 accuracy bonus with the strike.
        After you enhance a strike in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    // Stunned as a condition is 3 EA, or 4 EA with damage, so 2 EA as a double action.
    // Expected damage for two debuff + damage spells would be 2x dr4. dr6 seems like a
    // reasonable approximation.
    {
      name: 'Touch of God',

      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
          In addition, the target is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          When you cast this spell, you begin visibly glowing with divine power.
          Next round, you can spend a \\glossterm{standard action} to \\glossterm{touch} a creature with a \\glossterm{free hand}.
          When you do, make an attack vs. Mental against that creature.
        `,
      },
      rank: 3,
      roles: ['burst', 'softener'],
      scaling: 'damage',
    },
    // We have an extra 0.8 EA available. Without doing proper math, that seems like we
    // can increase the damage by +1dr.
    // Expected damage for two debuff + damage spells would be 2x dr7. dr10 is almost
    // exactly the same.
    {
      name: 'Mighty Touch of God',

      attack: {
        hit: `
          \\damagerankten, and any \\glossterm{extra damage} is tripled.
          In addition, the target is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          When you cast this spell, you begin visibly glowing with divine power.
          Next round, you can spend a \\glossterm{standard action} to \\glossterm{touch} a creature with a \\glossterm{free hand}.
          When you do, make an attack vs. Mental against that creature.
        `,
      },
      rank: 6,
      roles: ['burst', 'softener'],
      scaling: 'damage',
    },
  ],
};
