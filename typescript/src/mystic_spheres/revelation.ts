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

    {
      name: 'Reveal Truth',

      effect: `
        You may reroll one Knowledge check you made last round.
        You can only cast this spell once per hour.
      `,
      roles: ['narrative'],
      scaling: {
        2: `You also gain a +2 \\glossterm{enhancement bonus} to the Knowledge check.`,
        4: `The bonus increases to +3.`,
        6: `The bonus increases to +4.`,
      },
    },
  ],
  spells: [
    {
      name: 'Weapon Proficiency',

      effect: `
        You gain \\glossterm{proficiency} with all weapons from one weapon group of your choice, including exotic weapons from that weapon group.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Mass Weapon Proficiency',

      functionsLike: {
        mass: true,
        name: 'weapon proficiency',
      },
      // narrative: '',
      rank: 3,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Armor Proficiency',

      effect: `
        You gain \\glossterm{proficiency} with all armor \\glossterm{usage classes}.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Mass Armor Proficiency',

      functionsLike: {
        mass: true,
        name: 'armor proficiency',
      },
      // narrative: '',
      rank: 3,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Greater Proficiency',

      effect: `
        You gain \\glossterm{proficiency} with all weapons and armor, including exotic weapons.
      `,
      rank: 4,
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
      scaling: {
        4: 'You can choose to affect a \\hugearea radius instead.',
        6: 'You can choose to affect a \\gargarea radius instead.',
      },
      roles: ['attune'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Learn from Failure',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        If the target missed a creature with an attack last round, they become \\focused and gain a \\plus1 accuracy bonus this round.
        If you target yourself, this effect lasts \\glossterm{briefly} instead of only this round.
      `,
      rank: 1,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Foresee Safety',

      effect: `
        You become \\glossterm{briefly} \\braced.
        Since this ability does not have the \\atSwift tag, it does not protect you from attacks during the current phase.
      `,
      rank: 1,
      roles: ['focus'],
      tags: [],
    },

    {
      name: 'Foresee Distant Safety',

      effect: `
        At the end of the next round, you become \\braced during the following round.
        If you took no damage that round, you also become \\steeled during the following round.
      `,
      rank: 4,
      roles: ['focus'],
      tags: [],
    },

    {
      name: 'Foresee Victory',

      effect: `
        You become \\glossterm{briefly} \\primed.
      `,
      rank: 2,
      roles: ['focus'],
      tags: [],
    },

    {
      name: 'Foresee Distant Victory',

      effect: `
        At the end of the next round, you become \\primed during the following round.
        If you dealt no damage that round, you also become \\glossterm{empowered} during the following round.
      `,
      rank: 5,
      roles: ['focus'],
      tags: [],
    },

    {
      name: 'True Strike',

      // Ally focus is 0.6 EA, self focus + hone is 0.8 EA. Increasing ally range makes
      // the two outcomes more similar.
      effect: `
        Choose yourself or one \\glossterm{ally} within \\longrange.
        The target becomes \\focused this round.
        If you target yourself, the effect lasts \\glossterm{briefly} instead of only this round, and you also become briefly \\honed.
      `,
      rank: 1,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Mighty True Strike',

      // Ally focus + empower is 0.9 EA, self focus + empower + hone is 1 EA
      effect: `
        Choose yourself or one \\glossterm{ally} within \\longrange.
        The target becomes \\focused and \\empowered this round.
        If you target yourself, the effect lasts \\glossterm{briefly} instead of only this round, and you also become briefly \\honed.
      `,
      rank: 4,
      roles: ['boon'],
      tags: [],
    },

    {
      name: 'Enduring True Strike',

      cost: "One \\glossterm{fatigue level}.",
      // Ally double focus is 1.2 EA, self triple focus is 1.2 EA
      effect: `
        Choose yourself or one \\glossterm{ally} within \\longrange.
        The target becomes \\glossterm{briefly} \\focused.
        If you target yourself, the effect lasts for an additional round.
      `,
      rank: 6,
      roles: ['boon'],
      tags: [],
    },

    // Brief frighten is 0.6 EA. If we spend two ranks on area, we get a r0 spell with a
    // r2 area. That's enough for 0.4 EA of buff.
    {
      name: 'Visions of Focusing Fear',

      attack: {
        hit: `
          Each target is \\glossterm{briefly} \\frightened of you.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
          Then, you are \\glossterm{briefly} \\focused.
        `,
      },
      narrative: `
        The same visions that terrify your foes inspire you to victory.
      `,
      rank: 2,
      roles: ['generator'],
      scaling: 'accuracy',
      tags: ['Emotion', 'Visual'],
    },

    // Brief panic is r6. Drop to limited scope for r5, then 2 ranks of buff.
    {
      name: 'Visions of Sharp Panic',

      attack: {
        hit: `
          Each target is \\glossterm{briefly} \\panicked by you.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
          Then, you are \\glossterm{briefly} \\honed.
        `,
      },
      rank: 7,
      roles: ['generator'],
      scaling: 'accuracy',
      tags: ['Emotion', 'Visual'],
    },

    {
      name: 'Precognitive Offense',

      effect: `
        At the start of each phase, you can choose to become \\focused during that phase.
        After you do, this effect ends.
      `,
      narrative: `
        You intuitively perceive your foes' weaknesses.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Mass Precognitive Offense',

      functionsLike: {
        mass: true,
        name: 'Precognitive Offense',
      },
      // narrative: '',
      rank: 3,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Precognitive Defense',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to your maximum \\glossterm{damage resistance}.
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

    {
      name: 'Discern Lies',

      attack: {
        hit: `
          When you hear the target deliberately and knowingly speaks a lie, you know that the target was lying.
          This ability does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions.
        `,
        targeting: `
          This spell has no \\glossterm{verbal components}.

          Make an attack vs. Mental against one creature within \\medrange.
          Whether you hit or miss, the target becomes immune to this effect until it takes a \\glossterm{short rest}.
        `,
      },
      rank: 3,
      roles: ['narrative'],
      scaling: 'accuracy',
      tags: ['Subtle'],
      type: 'Sustain (attuneable, minor)',
    },

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

    {
      name: 'Foresight',

      effect: `
        You are never \\unaware or \\partiallyunaware.
      `,

      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Visions of Weakness',

      // Single defense is 1.0 EA. One rank of area gives a r0 spell with r1 area, which
      // is enough for 0.4 ranks of buff.
      attack: {
        hit: `
          Each target \\glossterm{briefly} takes a -2 penalty to the chosen defense.
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
          Each target is \\glossterm{briefly} \\stunned.
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
          Each target is \\dazzled as a \\glossterm{condition}.
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
        hit: `Each target is \\glossterm{briefly} \\dazzled.`,
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
        As a \\glossterm{move action}, you can move the sensor up to 30 feet in any direction, even vertically.
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
      // The use of attune instead of Sustain is intentional to make the "scout the dungeon exclusively using clairvoyance" plan improbably difficult to pull off.
      type: 'Attune',
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
      name: 'Distant Sight',

      effect: `
        You reduce your \\glossterm{longshot penalty} by 1.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Empowered Distant Sight',

      effect: `
        You reduce your \\glossterm{longshot penalty} by 2.
      `,
      rank: 6,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Mass Distant Sight',

      functionsLike: {
        mass: true,
        name: 'Distant Sight',
      },
      // narrative: '',
      rank: 4,
      roles: ['attune'],
      type: 'Attune (target)',
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
          If the target stops being within 1 mile from you, ignoring \\glossterm{line of sight} and \\glossterm{line of effect}, this effect ends.
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
          If the target stops being within 1 mile from you, ignoring \\glossterm{line of sight} and \\glossterm{line of effect}, this effect ends.
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
