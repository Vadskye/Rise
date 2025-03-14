import { MysticSphere } from '.';
import { CONDITION_CRIT, EXCEPT_NOT_DEEP, MINOR_FATIGUE } from './constants';

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
      type: 'Attune (target)',
    },

    {
      name: 'Armor Proficiency',

      effect: `
        You gain \\glossterm{proficiency} with all armor \\glossterm{usage classes}.
      `,
      rank: 1,
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
      type: 'Attune (target)',
    },

    {
      name: 'Greater Proficiency',

      effect: `
        You gain \\glossterm{proficiency} with all weapons and armor, including exotic weapons.
      `,
      rank: 4,
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
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'True Strike',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The first time the target makes a \\glossterm{strike} this round,
          it gains a +1 \\glossterm{accuracy} bonus and rolls twice and takes the higher result.
        If you cast this spell on yourself, it affects the first strike you make before the end of the next round.
      `,
      rank: 1,
      tags: [],
    },

    {
      name: 'True Cast',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The first time the target casts a spell this round,
          it gains a +1 \\glossterm{accuracy} bonus and rolls twice and takes the higher result.
        If you cast this spell on yourself, it affects the first spell you cast before the end of the next round.
      `,
      rank: 2,
      tags: [],
    },

    {
      name: 'Precognitive Offense',

      effect: `
        Whenever you would make an attack roll, you can see into the future to change your fate.
        If you do, you roll the attack roll twice and take the higher result.
        After you change your fate in this way, this effect ends.
      `,
      narrative: `
        You intuitively perceive your foes' weaknesses.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Armorbreak Sight',

      effect: `
        Whenever you would make a \\glossterm{strike} that would attack a creature's Armor defense, you may instead attack that creature's Reflex defense.
        If you do, you \\glossterm{briefly} cannot apply this effect again.
        You must make this choice before rolling the attack roll.
      `,
      narrative: `
        You intuitively perceive gaps in your foes' armor.
      `,
      rank: 2,
      type: 'Attune (deep)',
    },

    {
      name: 'Efficient Armorbreak Sight',

      functionsLike: {
        name: 'armorbreak sight',
        exceptThat: EXCEPT_NOT_DEEP,
      },
      rank: 6,
      type: 'Attune (deep)',
    },

    {
      name: 'Mass Precognitive Offense',

      functionsLike: {
        mass: true,
        name: 'Precognitive Offense',
      },
      // narrative: '',
      rank: 3,
      type: 'Attune (target)',
    },

    {
      name: 'Precognitive Defense',

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
      name: 'Mass Precognitive Defense',

      functionsLike: {
        mass: true,
        name: 'Precognitive Defense',
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: 'Attune (target)',
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
      scaling: { 5: `The bonus increases to +3.`, 7: `The bonus increases to +4.` },
      type: 'Attune',
    },

    {
      name: 'Gift of Knowledge',

      effect: `
        You gain a +3 \\glossterm{enhancement bonus} to all Knowledge skills (see \\pcref{Knowledge}).
        In addition, once per hour you may reroll one Knowledge check you make and take the higher result.
      `,
      rank: 4,
      scaling: { 6: `The bonus increases to +4.` },
      type: 'Attune',
    },

    {
      name: 'Blindsense',

      effect: `
        You gain \\trait{blindsense} with a 30 foot range, allowing you to sense your surroundings without light (see \\pcref{Blindsense}).
      `,
      rank: 1,
      scaling: {
        3: `The range increases to 45 feet.`,
        5: `The range increases to 60 feet.`,
        7: `The range increases to 90 feet.`,
      },
      type: 'Attune',
    },
    {
      name: 'Blindsight',

      effect: `
        You gain \\trait{blindsight} with a 15 foot range, allowing you to see without light (see \\pcref{Blindsight}).
        If you already have blindsight, the range of your blindsight increases by 15 feet.
      `,
      rank: 3,
      scaling: {
        5: `The range increases to 30 feet.`,
        7: `The range increases to 45 feet.`,
      },
      type: 'Attune',
    },

    {
      name: 'Mass Blindsense',

      functionsLike: {
        mass: true,
        name: 'Blindsense',
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: 'The range increases to 45 feet.',
        7: 'The range increases to 60 feet.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Mass Blindsight',

      functionsLike: {
        mass: true,
        name: 'Blindsight',
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: 'The range increases to 30 feet.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Foresight',

      effect: `
        You are never \\unaware or \\partiallyunaware.
      `,

      rank: 5,
      type: 'Attune',
    },
    {
      name: 'Mass Foresight',

      functionsLike: {
        mass: true,
        name: 'Foresight',
      },
      // narrative: '',
      rank: 7,
      type: 'Attune (target)',
    },

    {
      name: 'Reveal Weakness',

      // TODO: unclear rank (1??)
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target's weaknesses are highlighted, and openings in its defenses are revealed to attackers moments before they exist.
          It takes a -2 penalty to the chosen defense.
        `,
        targeting: `
          Choose one of the four defenses: Armor, Fortitude, Reflex, or Mental.
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Reveal Weakness',

      functionsLike: {
        name: 'reveal weakness',
        exceptThat: 'the penalty increases to -4.',
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Empowered True Strike',

      functionsLike: {
        name: 'True Strike',
        exceptThat:
          'the accuracy bonus increases to +4. However, after you cast this spell, you \\glossterm{briefly} cannot cast it again.',
      },
      rank: 6,
    },

    {
      name: 'Empowered True Cast',

      functionsLike: {
        name: 'True Cast',
        exceptThat:
          'the accuracy bonus increases to +4. However, after you cast this spell, you \\glossterm{briefly} cannot cast it again.',
      },
      rank: 7,
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
      scaling: 'double_accuracy',
    },

    {
      name: 'Myriad Visions',

      attack: {
        crit: CONDITION_CRIT,
        hit: `The target is \\dazzled as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        Your foe sees visions of possible futures that confuse its ability to determine reality.
      `,
      rank: 1,
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    // TODO: should spells be penalized for being sustain (standard) instead of immediate?
    // This is the same rank as an immediate-only spell.
    {
      name: 'Field of Visions',

      attack: {
        crit: CONDITION_CRIT,
        hit: `Each target is \\dazzled as a \\glossterm{condition}.`,
        targeting: `
          You create a field of hallucinatory visions in a \\medarea radius \\glossterm{zone} within \\medrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Sustain (attuneable, standard)', 'Visual'],
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
        At the end of each round, if the sensor is not within \\distrange from you, it is destroyed.
      `,
      rank: 2,
      scaling: {
        4: `
          The sensor is not destroyed if you do not have \\glossterm{line of effect} to it.
          If it gets farther than 240 feet from you, ignoring all obstacles, it is still destroyed.
        `,
        6: `
          The maximum distance before the sensor is destroyed increases to 480 feet.
        `,
      },
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
      tags: ['Scrying'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Distant Sight',

      effect: `
        You reduce your \\glossterm{longshot penalty} by 1.
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Empowered Distant Sight',

      effect: `
        You reduce your \\glossterm{longshot penalty} by 2.
      `,
      rank: 6,
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
      type: 'Attune (target)',
    },

    {
      name: 'Enhanced Senses',

      effect: `
        If you have Awareness as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
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
      name: 'Social Intuition',

      effect: `
        If you have Social Insight as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
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
      scaling: 'accuracy',
      type: 'Sustain (standard)',
    },
  ],
};
