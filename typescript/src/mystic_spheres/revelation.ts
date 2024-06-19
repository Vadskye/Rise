import { MysticSphere } from '.';
import { CONDITION_CRIT } from './constants';

export const revelation: MysticSphere = {
  name: 'Revelation',
  shortDescription: 'Share visions of the present and future, granting insight or combat prowess.',
  sources: ['arcane', 'divine'],

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
        You gain \\glossterm{proficiency} with one weapon group of your choice, including exotic weapons from that weapon group.
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
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Greater Armorbreak Sight',

      functionsLike: {
        name: 'armorbreak sight',
        exceptThat: 'using it does not prevent you from immediately using it again.',
      },
      rank: 7,
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
        3: `The range increases to 60 feet.`,
        5: `The range increases to 90 feet.`,
        7: `The range increases to 120 feet.`,
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
        7: `The range increases to 60 feet.`,
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
        5: 'The range increases to 60 feet.',
        7: 'The range increases to 120 feet.',
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

    // If the target has a vulnerability, this is like a r2 debuff. But that's pretty
    // unlikely, and it's useless if you can *already* take advantage of the
    // vulnerability, so it's closer to a r1 debuff?
    // This also bypasses many forms of immunity, including incorporeal, so it should be
    // nerfed. TODO: Nerf once people stop paying attention.
    {
      name: 'Reveal Vulnerability',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, each target's vulnerabilities become clear for all to see.
          Anyone looking at it intuitively knows whether it is \\vulnerable to any specific damage types or ability tags.
          In addition, damage against it is treated as damage of all types, which can bypass many forms of immunity and special defenses against specific damage types.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
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
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Sustain (attuneable, standard)'],
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

      // original targets: one unoccupied square within \medrange (see text)
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
        You reduce your \\glossterm{longshot penalty} by 3.
      `,
      rank: 6,
      type: 'Attune (deep)',
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
          Whenever the currently affected creature touches an intended target, you make a \\glossterm{reactive attack} against the new creature.
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
  rituals: [
    {
      name: 'Reveal True Form',

      castingTime: 'one hour',
      effect: `
        Choose one creature within \\longrange.
        You can see the target's true form, regardless of any shapechanging or illusion effects.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Augury',

      castingTime: 'one hour',
      effect: `
        You receive a limited glimpse into your immediate future.
        When you perform this ritual, you specify a course of action that you could hypothetically take during the next hour.
        You can be as broad or as detailed as you want in your description of your plan, though more specific and plausible plans generally yield more accurate results.
        The GM specifies one of four possible outcomes for the augury based on what is most likely to occur if you follow your plan.
        This is not a guarantee of success or failure, especially for plans that have some intrinsic randomness or chance of failure (such as planning to defeat a monster in combat).
        \\begin{itemize}
        \\itemhead{Weal} The plan is likely to yield good outcomes for you.
        \\itemhead{Woe} The plan is likely to yield bad outcomes for you.
        \\itemhead{Weal and Woe} The plan is likely to yield a mixture of good and bad outcomes for you.
        \\itemhead{None} Either plan is unlikely to to have any significant outcomes, or the outcomes of the plan are too vague to accurately predict.
        \\end{itemize}

        This ritual only yields accurate results once for any given situation.
        If you perform the ritual again in a situation that has not meaningfully changed, the augury always has no outcome regardless of the plan you specify.
        For example, if you are presented with seven doorways, with one doorway leading to a magnificent treasure and all other doorways leading to certain death, you cannot simply perform this ritual six times to determine the correct doorway.
      `,
      rank: 2,
    },

    {
      name: 'Greater Augury',

      castingTime: 'one hour',

      functionsLike: {
        exceptThat: `
        the augury considers events up to 4 hours into your future when evaluating the outcomes of your plan.
        `,
        name: 'augury',
      },
      rank: 4,
    },

    {
      name: 'Supreme Augury',

      castingTime: 'one hour',

      functionsLike: {
        exceptThat: `
        the augury considers events up to 12 hours into your future when evaluating the outcomes of your plan.
        `,
        name: 'augury',
      },
      rank: 6,
    },

    {
      name: 'Alarm',

      // original targets: one unoccupied square within \medrange
      castingTime: 'one minute',
      effect: `
        A \\glossterm{scrying sensor} appears floating in the air in the target location.
        The sensor passively observes its surroundings.
        As with other \\abilitytag{Scrying} effects, its visual acuity is the same as yours.
        You can choose the minimum size category that the alarm will notify you for when you cast this spell.
        If it sees a creature or object of that size or larger moving within 50 feet of it, it will trigger an alarm.
        When you perform this ritual, you choose whether the alarm causes the sound of a ringing bell or a mental "ping" that only you can notice.
        You must be within 1 mile of the sensor to receive this mental alarm.
        This mental sensation is strong enough to wake you from normal sleep, but does not otherwise disturb concentration.
        `,

      rank: 1,
      tags: ['Scrying'],
      type: 'Attune',
    },

    {
      name: 'Locate Creature',

      castingTime: 'one hour',
      effect: `
        When you perform this ritual, choose a creature.
        You must have seen the chosen creature in person and either be able to clearly visualize its appearance or know its proper name to find it with this ritual.
        A creature without a proper name cannot be identified by name in this way.
        If you specify the chosen creature's appearance incorrectly, or if it has significantly changed its appearance, you may accidentally affect a different creature, or the ritual may simply fail.

        If the creature is within 100 miles of your location, you unerringly learn the relative direction from your location to the location it was in when you started performing this ritual.
        `,

      rank: 3,
    },

    {
      name: 'Locate Object',

      castingTime: 'one minute',

      functionsLike: {
        exceptThat: `
        it locates objects instead of creatures.
        Objects currently being worn or carried by creatures cannot be found by this ritual.
        `,
        name: 'locate creature',
      },
      rank: 3,
    },

    {
      name: 'Read Magic',

      // original targets: yourself
      castingTime: 'one minute',
      effect: `
        You gain the ability to decipher magical inscriptions that would otherwise be unintelligible.
        This can allow you to read ritual books and similar objects created by other creatures.
        After you have read an inscription in this way, you are able to read that particular writing without the use of this ritual.
        `,

      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Discern Location',

      castingTime: '24 hours',
      effect: `
        When you perform this ritual, choose a creature or object.
        You must have seen the chosen creature or object in person and either be able to clearly visualize its appearance or know its proper name to find it with this ritual.
        A creature or object without a proper name cannot be identified by name in this way.
        If you specify the chosen creature or object's appearance incorrectly, or if it has significantly changed its appearance, you may accidentally affect a different creature, or the ritual may simply fail.

        If the chosen creature or object is within 100 miles of you, you learn the location (place, name, business name, or the like), community, country, and continent where the target was at when you started performing this ritual.
        % Wording?
        If there is no corresponding information about an aspect of the target's location, such as if the target is in a location which is not part of a recognized country,
        you learn only that that aspect of the information is missing.
      `,

      rank: 2,
    },

    {
      name: 'Distant Discern Location',

      castingTime: '24 hours',

      functionsLike: {
        exceptThat: `
        there is no distance limitation.
        The creature or object must simply be on the same plane as you.
        `,
        name: 'discern location',
      },
      rank: 4,
    },

    {
      name: 'Interplanar Discern Location',

      // original targets: any creature or object on the same plane as you
      castingTime: '24 hours',

      functionsLike: {
        exceptThat: `
        the target does not have to be on the same plane as you.
        `,
        name: 'discern location',
      },
      rank: 6,
    },

    {
      name: 'Sending',

      // original targets: any creature within 100 miles of you
      castingTime: 'one hour',
      effect: `
        You do not need \\glossterm{line of sight} or \\glossterm{line of effect} to the target.
        However,  must specify your target with a precise mental image of its appearance.
        The image does not have to be perfect, but it must unambiguously identify the target.
        If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the ritual may simply fail.

        You send the target a short verbal message.
        The message must be twenty-five words or less, and speaking the message must not take longer than five rounds.

        After the target receives the message, it may reply with a message of the same length as long as the ritual's effect continues.
        Once it speaks twenty-five words, or you stop sustaining the effect, the ritual is \\glossterm{dismissed}.
        `,

      rank: 3,
      type: 'Sustain (standard)',
    },

    {
      name: 'Distant Sending',

      // original targets: any creature on the same plane as you
      castingTime: 'one hour',

      functionsLike: {
        exceptThat: `
        there is no distance limitation.
        The target must simply be on the same plane as you.
        `,
        name: 'sending',
      },
      rank: 5,
      type: 'Sustain (standard)',
    },

    {
      name: 'Interplanar Sending',

      // original targets: any creature
      castingTime: 'one hour',

      functionsLike: {
        exceptThat: `
        the target does not have to be on the same plane as you.
        `,
        name: 'distant sending',
      },
      rank: 7,
      type: 'Sustain (standard)',
    },

    {
      name: 'Telepathic Bond',

      castingTime: 'one minute',
      effect: `
        Each target can communicate mentally through telepathy with each other target.
        This communication is instantaneous, though it cannot reach more than 100 miles or across planes.

        % Is this grammatically correct?
        Each target must attune to this ritual independently.
        If a target breaks its attunement, it stops being able to send and receive mental messages with other targets.
        However, the effect continues as long as at least one target attunes to it.
        If you \\glossterm{dismiss} the ritual, the effect ends for all targets.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Long-Distance Bond',

      castingTime: 'one minute',

      functionsLike: {
        exceptThat: `
        the effect works at any distance.
        The communication still does not function across planes.
        `,
        name: 'telepathic bond',
      },
      rank: 5,
      type: 'Attune',
    },

    {
      name: 'Planar Bond',

      castingTime: 'one minute',

      functionsLike: {
        exceptThat: `
        the effect works at any distance and across planes.
        `,
        name: 'telepathic bond',
      },
      rank: 7,
      type: 'Attune',
    },

    {
      name: 'Seek Legacy',

      castingTime: 'one hour',
      effect: `
        One ritual participant learns the precise distance and direction to their \\glossterm{legacy item}, if it is on the same plane.
      `,
      rank: 2,
    },

    {
      name: 'Scry Creature',

      castingTime: 'one hour',
      attack: {
        hit: `A scrying sensor appears in the target's space.
        This sensor functions like the sensor created by the \\spell{mystic eye} spell, except that you cannot move the sensor manually.
        Instead, it automatically tries to follow the target to stay in its space.
        At the end of each phase, if the sensor is not in the target's space, this effect is \\glossterm{dismissed}.`,
        targeting: `
        Make an attack vs. Mental against one creature on the same plane as you.
        You do not need \\glossterm{line of sight} or \\glossterm{line of effect} to the target.
        However,  must specify your target with a precise mental image of its appearance.
        The image does not have to be perfect, but it must unambiguously identify the target.
        If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the spell may simply fail without effect.
        This attack roll cannot \\glossterm{explode}.
        `,
      },
      rank: 4,
      tags: ['Scrying'],
    },

    {
      name: 'Interplanar Scry Creature',

      castingTime: 'one hour',
      functionsLike: {
        exceptThat: `
        the target does not have to be on the same plane as you.
        `,
        name: 'scry creature',
      },
      rank: 6,
      tags: ['Scrying'],
    },
    {
      name: 'Prophetic Dream',

      castingTime: 'one hour',
      effect: `
        The next time you fall asleep, you have a dream that foreshadows some important event or decision in your future.
        The dream may be vague or even self-contradictory, since the future is never certain, but its contents always provide some hint about what may lie ahead of you.
        Generally, a prophetic dream concerns events no more than a month before they occur, though staggeringly important events can be prophesied years in advance.

        Once you have performed this ritual, performing it again always yields the same dream until the prophesied event has happened or is no longer a relevant or likely future.
        This can happen as if your actions prevent the event from coming to pass.
      `,
      rank: 4,
      tags: ['Scrying'],
    },
    {
      name: 'Private Sanctum',

      castingTime: '24 hours',
      effect: `
        This ritual creates a ward against any external perception in a \\medarea radius \\glossterm{zone} centered on your location.
        This effect is permanent.
        Everything in the area is completely imperceptible from outside the area.
        Anyone observing the area from outside sees only a dark, silent void, regardless of darkvision and similar abilities.
        In addition, all \\abilitytag{Scrying} effects fail to function in the area.
        Creatures inside the area can see within the area and outside of it without any difficulty.
      `,
      rank: 5,
    },
    {
      name: 'Scryward',

      castingTime: '24 hours',
      effect: `
        This ritual creates a ward against scrying in a \\medarea radius \\glossterm{zone} centered on your location.
        All \\abilitytag{Scrying} effects fail to function in the area.
        This effect is permanent.
        `,
      rank: 3,
    },
    {
      name: 'Find the Path',

      castingTime: '1 hour',
      effect: `
        When you perform this ritual, you must unambiguously specify a location on the same plane as you, and you choose up to six ritual participants to guide.
        You know exactly what direction you must travel to reach your chosen destination by the most direct physical route.
        You are not always led in the exact direction of the destination -- if there is an impassable obstacle between the target and the destination, this ability will direct you around the obstacle, rather than through it.

        The guidance provided by this ability adjusts to match the current physical capabilities of each ritual participant, including flight and other unusual movement modes.
        It does not consider teleportation spells or any other active abilities which could allow the creatures to bypass physical obstacles.
        It does not see into the future, and changing circumstances may cause the most direct path to change over time.
        It also does not consider hostile creatures, traps, and other passable dangers which may endanger or slow progress.
      `,
      rank: 4,
      tags: ['Attune'],
    },
    {
      name: 'Efficient Find the Path',

      castingTime: 'one hour',
      functionsLike: {
        exceptThat: `
          the casting time is shorter, and the ritual is much less exhausting.
        `,
        name: 'find the path',
      },
      rank: 6,
      tags: ['Attune'],
    },
  ],
};
