import { MysticSphere } from '.';
import { CONDITION_CRIT, MINOR_FATIGUE } from './constants';

export const revelation: MysticSphere = {
  name: 'Revelation',
  shortDescription: 'Share visions of the present and future, granting insight or combat prowess.',
  sources: ['arcane', 'divine', 'soulkeeper'],

  cantrips: [
    {
      name: 'Reveal Sensation',

      effect: `
        You \\glossterm{briefly} gain a +3 \\glossterm{enhancement bonus} to Awareness checks.
      `,
      roles: ['narrative'],
      scaling: {
        2: `The bonus increases to +4.`,
        4: `The bonus increases to +5.`,
        6: `The bonus increases to +6.`,
      },
    },
  ],
  spells: [
    {
      name: 'Reveal Proficiency',

      effect: `
        You become \\glossterm{proficient} with all armor and weapons, including exotic weapons.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Purge Invisibility',

      cost: MINOR_FATIGUE,
      effect: `
        Creatures or objects within a \\largearea radius \\glossterm{emanation} from you cannot be \\trait{invisible}.
        Any effects that would cause them to be invisible are \\glossterm{suppressed}.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Learn from Failure',

      // Any two focused is 1 EA. Drop to r2 for the condition.
      effect: `
        Choose up to two creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target that missed a creature with an attack becomes \\focused this round.
        If you target yourself, this effect lasts \\glossterm{briefly} on you instead of only this round.
      `,
      rank: 2,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Foresee Safety',

      effect: `
        You become \\glossterm{briefly} \\braced.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
      `,
      rank: 1,
      roles: ['focus'],
      tags: ['Subtle', 'Swift'],
    },

    {
      name: 'Foresee Distant Safety',

      effect: `
        At the start of the next round, you become \\glossterm{briefly} \\braced.
      `,
      rank: 5,
      roles: ['focus'],
      tags: ['Subtle'],
    },

    {
      name: 'Foresee Victory',

      effect: `
        You become \\glossterm{briefly} \\primed.
      `,
      rank: 1,
      roles: ['focus'],
      tags: ['Subtle'],
    },

    {
      name: 'Foresee Distant Victory',

      effect: `
        At the end of the next round, you become \\primed during the following round.
      `,
      rank: 5,
      roles: ['focus'],
      tags: ['Subtle'],
    },

    {
      name: 'Reveal Victory',

      // Ally focus and +1 accuracy is 0.8 EA.
      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target becomes \\focused and gains a \\plus1 accuracy bonus this round.
      `,
      rank: 1,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Greater Reveal Victory',

      // Ally focus and +2 accuracy is 1.1 EA.
      effect: `
        Choose one \\glossterm{ally} within \\medrange.
        The target becomes \\focused and gains a \\plus2 accuracy bonus this round.
      `,
      rank: 6,
      roles: ['boon'],
      tags: [],
    },

    // Focus is 0.4 EA, so r1 gives 0.8 EA of debuff, which is just enough for brief
    // frighten. We can increase to r2 to get a r3 area.
    {
      name: 'Visions of Certain Doom',

      attack: {
        hit: `
          The target is \\glossterm{briefly} \\frightened of you.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
          Then, you are \\glossterm{briefly} \\focused.
        `,
      },
      narrative: `
        The same visions that terrify your foes inspire you to victory.
      `,
      rank: 2,
      roles: ['generator', 'flash'],
      scaling: 'accuracy',
      tags: ['Emotion', 'Visual'],
    },

    // Brief focus is 0.4 EA. To get brief frightened by all, we would need 1.7 / 0.6 = 2.8
    // EA, which we can get at r7 with limited scope.
    {
      name: 'Visions of Omnipresent Doom',

      functionsLike: {
        name: 'visions of certain doom',
        exceptThat: 'each target is frightened of all creatures, not just you.',
      },
      rank: 7,
      roles: ['generator', 'flash'],
      scaling: 'accuracy',
      tags: ['Emotion', 'Visual'],
    },

    {
      name: 'Precognitive Offense',

      // 0.8 EA in theory, but focused and honed aren't optimal together since focused is
      // better on low accuracy and honed is better on high accuracy
      effect: `
        At the start of each phase, you can choose to become \\focused and \\honed during that phase.
        At the end of that phase, this ability is \\glossterm{dismissed}.
      `,
      narrative: `
        You can intuitively perceive your foes' weaknesses.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    // 1.2 EA on allies
    {
      name: 'Mass Precognitive Offense',

      functionsLike: {
        mass: true,
        name: 'Precognitive Offense',
      },
      // narrative: '',
      rank: 5,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Precognitive Defense',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to your maximum \\glossterm{hit points}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },

    // TODO: calculate EA for skills
    {
      name: 'Precognitive Competence',

      effect: `
        You gain a +2 \\glossterm{enhancement bonus} to all skills.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Greater Precognitive Competence',

      effect: `
        You gain a +3 \\glossterm{enhancement bonus} to all skills.
      `,
      rank: 6,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Gift of Knowledge',

      effect: `
        You gain a +3 \\glossterm{enhancement bonus} to all Knowledge skills (see \\pcref{Knowledge}).
        In addition, once per hour you may reroll one Knowledge check you make and take the higher result.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    // TODO: calculate EA of sense abilities
    {
      name: 'Blindsense',

      effect: `
        You gain \\trait{blindsense} with a 60 foot range, allowing you to sense your surroundings without light (see \\pcref{Blindsense}).
        If you already have blindsense, the range of your blindsense increases by 30 feet.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Blindsight',

      effect: `
        You gain \\trait{blindsight} with a 30 foot range, allowing you to see without light (see \\pcref{Blindsight}).
        If you already have blindsight, the range of your blindsight increases by 30 feet.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Mass Blindsense',

      functionsLike: {
        mass: true,
        name: 'Blindsense',
      },
      // narrative: '',
      rank: 4,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Mass Blindsight',

      functionsLike: {
        mass: true,
        name: 'Blindsight',
      },
      // narrative: '',
      rank: 6,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    // TODO: calculate EA of immunities
    {
      name: 'Foresight',

      effect: `
        You are never \\unaware or \\partiallyunaware.
      `,

      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Visions of Weakness',

      // Single defense is 1.0 EA. One rank of area gives a r0 spell with r1 area, which
      // is enough for 0.4 ranks of buff.
      attack: {
        hit: `
          The target \\glossterm{briefly} takes a -2 penalty to the chosen defense.
        `,
        targeting: `
          Choose one of the five defenses: Armor, Brawn, Fortitude, Reflex, or Mental.
          Make an attack vs. Mental against up to two creatures within \\shortrange.
          Then, you \\glossterm{briefly} gain a +2 bonus to that defense.
          Since this ability does not have the \\atSwift tag, it does not protect you from attacks during the current phase.
        `,
      },
      narrative: `
        You expose your enemy's weaknesses, revealing openings in its defenses moments before they exist.
        This insight helps you bolster your own defenses.
      `,
      rank: 1,
      roles: ['generator', 'softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Intense Visions of Weakness',

      // Brief stun is 1.4 EA, so r1. Braced requires 4 ranks.
      attack: {
        hit: `
          The target is \\glossterm{briefly} \\stunned.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\shortrange.
          Then, you are \\glossterm{briefly} \\braced.
          Since this ability does not have the \\atSwift tag, it does not protect you from attacks during the current phase.
        `,
      },
      rank: 5,
      roles: ['generator', 'softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Reveal Vulnerability',

      cost: MINOR_FATIGUE,
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target's vulnerabilities become clear for all to see.
          Anyone looking at it intuitively knows everything that it is \\vulnerable, \\impervious, and immune to.
        `,
        targeting: `
          Make an attack vs. Mental with a +4 accuracy bonus against one creature or object within \\longrange.
          This attack automatically succeeds against \\glossterm{unattended} objects.
        `,
      },
      rank: 1,
      roles: ['softener'],
      scaling: 'double_accuracy',
    },

    {
      name: 'Myriad Visions',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\medrange.
        `,
      },
      narrative: `
        Your foes see visions of possible futures that confuse their ability to determine reality.
      `,
      rank: 2,
      roles: ['softener'],
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Field of Visions',

      // brief dazzle is 0.6, so zone is 1.6 = rank 2. Trade +1 rank for +2 area rank.
      attack: {
        hit: `The target is \\glossterm{briefly} \\dazzled.`,
        targeting: `
          You create a field of hallucinatory visions in a \\smallarea radius \\glossterm{zone} within \\shortrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 3,
      roles: ['flash', 'hazard'],
      scaling: 'accuracy',
      tags: ['Sustain (attuneable, minor)', 'Visual'],
    },

    {
      name: 'Mystic Eye',

      effect: `
        A \\glossterm{scrying sensor} appears floating in the air in any unoccupied square within \\medrange.
        At the start of each round, you choose whether you see and hear from this sensor or from your body.

        While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\magical effects that improve your vision.
        You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

        If undisturbed, the sensor floats in the air in its position.
        As a \\glossterm{movement}, you can move the sensor up to 30 feet in any direction, even vertically.
        At the end of each round, if the sensor is not within 120 feet from you, it is destroyed.
        This distance check ignores \\glossterm{line of sight} and \\glossterm{line of effect}.
      `,
      rank: 2,
      roles: ['narrative'],
      tags: ['Scrying'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Clairvoyance',

      effect: `
        A \\glossterm{scrying sensor} appears floating in the air in any unoccupied square within \\medrange.
        You do not need \\glossterm{line of sight} or \\glossterm{line of effect} to target a location.
        You must specify a distance and direction to target a location you cannot see.
        This can allow you to cast the spell beyond walls and similar obstacles.

        At the start of each round, you choose whether you see and hear from this sensor or from your body.
        While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\magical effects that improve your vision.
        You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

        If undisturbed, the sensor floats in the air in its position.
      `,
      rank: 5,
      roles: ['narrative'],
      tags: ['Scrying'],
      type: 'Sustain (attuneable, standard)',
    },

    {
      name: 'Reverse Scrying',

      effect: `
        Choose one magical sensor within \\medrange.
        A \\glossterm{scrying sensor} appears at the location of the source of the ability that created the chosen sensor.
        At the start of each round, you choose whether you see and hear from this sensor or from your body.
        While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\magical effects that improve your vision.
        You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

        If undisturbed, the sensor floats in the air in its position.
      `,
      rank: 3,
      roles: ['narrative'],
      tags: ['Scrying'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Precognitive Precision',

      effect: `
        You gain a +1 \\glossterm{enhancement bonus} to \\glossterm{accuracy}.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Greater Precognitive Precision',

      effect: `
        You gain a +2 \\glossterm{enhancement bonus} to \\glossterm{accuracy}.
      `,
      rank: 7,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Enhanced Senses',

      effect: `
        If you have Awareness as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
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
      name: 'Social Intuition',

      effect: `
        If you have Social Insight as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
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
      name: 'Sensory Chain',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, you can see and hear out of the target's eyes and ears instead of your own.
          If the target stops being within 1 mile from you, ignoring \\glossterm{line of sight} and \\glossterm{line of effect}, this ability is \\glossterm{dismissed}.
          If you cannot see yourself, you are \\blinded for combat purposes.

          While using the target's senses, you can choose any creatures you see as intended targets to continue the chain.
          Whenever the currently affected creature touches an intended target, you make a \\glossterm{reactive attack} vs. Mental against the new creature.
          You can only make this attack against a given target once per \\glossterm{phase}.
          On a hit, the touched creature becomes the new target of this spell and the condition is transferred to it.
          On a miss, the condition remains on the previous creature.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 4,
      roles: ['narrative'],
      scaling: 'accuracy',
      type: 'Sustain (standard)',
    },

    {
      name: "Animal's Sight",

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, you can see and hear out of the target's eyes and ears instead of your own.
          If the target stops being within 1 mile from you, ignoring \\glossterm{line of sight} and \\glossterm{line of effect}, this ability is \\glossterm{dismissed}.
          If you cannot see yourself, you are \\blinded for combat purposes.
        `,
        targeting: `
          Make an attack vs. Mental against one animal within \\medrange.
          You cannot make this attack against that same creature again until this spell ends.
        `,
      },

      rank: 2,
      roles: ['narrative'],
      scaling: 'accuracy',
      type: 'Sustain (standard)',
    },
  ],
};
