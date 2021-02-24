import { MysticSphere } from ".";

export const revelation: MysticSphere = {
  name: "Revelation",
  shortDescription: "Share visions of the present and future, granting insight or combat prowess.",
  sources: ["arcane", "divine", "nature"],

  cantrips: [
    {
      name: "Reveal Sensation",

      effect: `
        Choose a sense, such as vision or hearing.
        You gain a +4 bonus to Awareness checks using that sense until the end of the next round.
      `,
      focus: false,
      scaling: {
        2: `The bonus increases to +6.`,
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +10.`,
      },
      type: "Duration",
    },

    {
      name: "Reveal Truth",

      effect: `
        You may reroll one Knowledge check you made last round.
        You can only cast this spell once per hour.
      `,
      focus: false,
      scaling: {
        2: `You also gain a +2 bonus to the Knowledge check.`,
        4: `The bonus increases to +4.`,
        6: `The bonus increases to +6.`,
      },
      type: "Instant",
    },
  ],
  spells: [
    {
      name: "Proficiency",

      effect: `
        You gain \\glossterm{proficiency} with one weapon group of your choice.
      `,
      rank: 1,
      scaling: {
        3: `You also gain a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} with the chosen weapon group.`,
        5: `You also gain \\glossterm{exotic proficiency} with the chosen weapon group.`,
        7: `The accuracy bonus increases to +2.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Purge Invisibility",

      effect: `
        All invisibility effects within a \\medarea radius \\glossterm{emanation} from you are \\glossterm{suppressed}.
      `,
      rank: 2,
      scaling: {
        4: `The area increases to a \\largearea radius \\glossterm{emanation}.`,
        6: `The area increases to a \\hugearea radius \\glossterm{emanation}.`,
      },
      type: "Attune (self)",
    },

    {
      name: "True Strike",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The first time the subject makes a \\glossterm{strike} this round,
        it gains a +2 bonus to \\glossterm{accuracy} and rolls twice and takes the higher result.
        Because this ability has the \\glossterm{Swift} tag, it can affect an attack the subject makes during the current phase.
        If you cast this spell on yourself, it affects the first strike you make until the end of the next round.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +3.`,
        5: `The bonus increases to +4.`,
        7: `The bonus increases to +5.`,
      },
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Precognitive Offense",

      castingTime: "minor action",
      effect: `
        You gain a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} with all attacks.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +2.`,
        5: `The bonus increases to +3.`,
        7: `The bonus increases to +4.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Precognitive Offense",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "Precognitive Offense",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +2.`,
        7: `The bonus increases to +3.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Precognitive Defense",

      effect: `
        You gain a +1 \\glossterm{magic bonus} to Armor defense and Reflex defense.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +2.`,
        5: `The bonus increases to +3.`,
        7: `The bonus increases to +4.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Mass Precognitive Defense",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "Precognitive Defense",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonuses increase to +2.`,
        7: `The bonuses increase to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Discern Lies",

      attack: {
        glance: "The effect lasts until the end of the next round.",
        hit: `When you hear the subject deliberately and knowingly speaks a lie, you know that the subject was lying.
        This ability does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions.`,
        targeting: `
        This spell has no \\glossterm{verbal components}.

        Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 3,
      scaling: "accuracy",
      tags: ["Subtle"],
      type: "Sustain (minor)",
    },

    {
      name: "Boon of Mastery",

      effect: `
        You gain a +2 \\glossterm{magic bonus} to all skills.
      `,
      rank: 3,
      scaling: { 5: `The bonus increases to +3.`, 7: `The bonus increases to +4.` },
      type: "Attune (self)",
    },

    {
      name: "Boon of Knowledge",

      effect: `
        You gain a +4 \\glossterm{magic bonus} to all Knowledge skills (see \\pcref{Knowledge}).
        In addition, once per hour you may reroll one Knowledge check you make and take the higher result.
      `,
      rank: 4,
      scaling: { 6: `The bonus increases to +6.` },
      type: "Attune (self)",
    },

    {
      name: "Blindsight",

      effect: `
        You gain \\glossterm{blindsight} with a 30 foot range.
        This can allow you to see perfectly without any light, regardless of concealment or invisibility.
      `,
      rank: 2,
      scaling: { 4: `The range increases to 60 feet.`, 6: `The range increases to 120 feet.` },
      type: "Attune (self)",
    },

    {
      name: "Mass Blindsight",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "Blindsight",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: "The range increases to 60 feet.",
      },
      type: "Attune (target)",
    },

    {
      name: "Boon of Many Eyes",

      effect: `
        You reduce your penalties for being \\glossterm{surrounded} by 1.
      `,

      rank: 3,
      scaling: {
        5: `The penalty reduction increases to 2.
            You are still considered to be surrounded for the purpose of other abilities, even this reduces your penalties to 0.`,
        7: `You can never be \\glossterm{surrounded}`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Boon of Many Eyes",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "Boon of Many Eyes",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: `The penalty reduction increases to 2.
            Each subject is still considered to be surrounded for the purpose of other abilities, even this reduces its penalties to 0.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Reveal Weakness",

      attack: {
        crit: `The penalty increases to -4.`,
        hit: `As a \\glossterm{condition}, the subject's weaknesses are highlighted, and openings in its defenses are revealed to attackers moments before they exist.
        It takes a -2 penalty to the chosen defense.`,
        targeting: `
          Choose one of the four defenses: Armor, Fortitude, Reflex, or Mental.
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 2,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Reveal Vulnerability",

      attack: {
        crit: `The reduction increases to four times your \\glossterm{power}.`,
        hit: `As a \\glossterm{condition}, the subject's vulnerabilities become clear for all to see.
        Its \\glossterm{resistances} are reduced by an amount equal to twice your \\glossterm{power}.
        When this effect ends, it regains resistances equal to the amount it lost this way.`,
        targeting: `
          Make an attack vs. Mental with a +4 \\glossterm{accuracy} bonus against one creature within \\longrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Myriad Visions",

      attack: {
        crit: `The subject is also \\glossterm{dazed} as part of the same condition.`,
        hit: `The subject sees visions of possible futures that confuse its ability to determine reality.
        It is \\glossterm{dazzled} as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Stunning Truth",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject's mind is overwhelmed by a total awareness of your chosen fact.
        It is \\glossterm{stunned} as a \\glossterm{condition}.`,
        targeting: `
        Choose a fact that you know and make an attack vs. Mental against one creature within \\medrange.
        If the subject does not already know that fact to be true or false,
        and the subject has sufficient cognitive ability to understand the fact,
        you gain a +2 bonus to \\glossterm{accuracy}.
        Otherwise, you take a -2 penalty to accuracy.
        The fact does not have to be true to gain this bonus.
        `,
      },
      rank: 6,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Arcane Eye",

      effect: `
        A \\glossterm{scrying sensor} appears floating in the air in any unoccupied square within \\medrange.
        At the start of each round, you choose whether you see and hear from this sensor or from your body.

        While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\glossterm{magical} effects that improve your vision.
        You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

        If undisturbed, the sensor floats in the air in its position.
        During each \\glossterm{movement phase}, you can move the sensor up to 30 feet in any direction, even vertically.
        At the end of each round, if the sensor is does not have \\glossterm{line of effect} from you, it is destroyed.
      `,
      rank: 2,
      scaling: {
        4: `The sensor is not destroyed if you do not have \\glossterm{line of effect} to it.`,
        6: `You constantly receive sensory input from both your body and the sensor.`,
      },
      tags: ["Scrying"],
      type: "Sustain (minor)",
    },

    {
      name: "Clairvoyance",

      // original targets: one unoccupied square within \medrange (see text)
      effect: `
        A \\glossterm{scrying sensor} appears floating in the air in any unoccupied square within \\medrange.
        You do not need \\glossterm{line of sight} or \\glossterm{line of effect} to target a location.
        You must specify a distance and direction to target a location you cannot see.
        This can allow you to cast the spell beyond walls and similar obstacles.

        At the start of each round, you choose whether you see and hear from this sensor or from your body.
        While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\glossterm{magical} effects that improve your vision.
        You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

        If undisturbed, the sensor floats in the air in its position.
      `,
      rank: 5,
      scaling: {
        7: `You constantly receive sensory input from both your body and the sensor.`,
      },
      tags: ["Scrying"],
      // The use of attune (self) is intentional to make the "scout the dungeon exclusively using clairvoyance" plan improbably difficult to pull of.`,
      type: "Attune (self)",
    },

    {
      name: "Reverse Scrying",

      effect: `
        Choose one magical sensor within \\medrange.
        A \\glossterm{scrying sensor} appears at the location of the source of the the ability that created the chosen sensor.
        At the start of each round, you choose whether you see and hear from this sensor or from your body.
        While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\glossterm{magical} effects that improve your vision.
        You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

        If undisturbed, the sensor floats in the air in its position.
      `,
      rank: 3,
      scaling: {
        5: `The range increases to \\longrange.`,
        7: `The range increases to \\distrange.`,
      },
      tags: ["Scrying"],
      type: "Sustain (minor)",
    },

    {
      name: "Longshot",

      effect: `
        You reduce your penalties for \\glossterm{range increments} by 1.
      `,
      rank: 1,
      scaling: {
        3: `The penalty reduction increases to 2.`,
        5: `The penalty reduction increases to 3.`,
        7: `The penalty reduction increases to 4.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Longshot",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "Longshot",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The penalty reduction increases to 2.`,
        7: `The penalty reduction increases to 3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Enhanced Senses",

      effect: `
        You gain a +3 \\glossterm{magic bonus} to the Awareness skill.
        In addition, you are treated as being \\glossterm{trained} in that skill if you would otherwise be untrained.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Sensory Chain",

      attack: {
        hit: `As a \\glossterm{condition}, you can see and hear out of the subject's eyes and ears instead of your own.
        If the subject stops being within 1 mile from you, regardless of intervening barriers
        Whenever the subject touches another creature, you can make an attack against the new creature.
        On a hit, the touched creature becomes the new target of this spell and the condition is transferred to it.
        On a miss, the condition remains on the previous creature.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You cannot make this attack against that same creature again until this spell ends.
        `,
      },

      rank: 4,
      scaling: "accuracy",
      type: "Sustain (standard)",
    },
  ],
  rituals: [
    {
      name: "Reveal True Form",

      castingTime: "one hour",
      effect: `
        Choose one creature within \\longrange.
        You can see the subject's true form, regardless of any shapechanging or illusion effects.
      `,
      rank: 3,
      type: "Attune (self)",
    },

    {
      name: "Augury",

      castingTime: "one hour",
      effect: `
        You receive a limited glimpse into your immediate future.
        When you perform this ritual, you specify a course of action that you could hypothetically take during the next hour.
        You can be as broad or as detailed as you want in your description of your plan, though more specific and plausible plans generally yield more accurate results.
        The GM specifies one of four possible outcomes for the augury based on what is most likely to occur if you follow your plan.
        This is not a guarantee of success or failure, especially for plans that have some intrinsic randomness or chance of failure (such as planning to defeat a monster in combat).
        \\begin{itemize}
        \\itemhead{Weal}: The plan is likely to yield good outcomes for you.
        \\itemhead{Woe}: The plan is likely to yield bad outcomes for you.
        \\itemhead{Weal and Woe}: The plan is likely to yield a mixture of good and bad outcomes for you.
        \\itemhead{None}: Either plan is unlikely to to have any significant outcomes, or the outcomes of the plan are too vague to accurately predict.
        \\end{itemize}

        This ritual only yields accurate results once for any given situation.
        If you perform the ritual again in a situation that has not meaningfully changed, the augury always has no outcome regardless of the plan you specify.
        For example, if you are presented with seven doorways, with one doorway leading to a magnificent treasure and all other doorways leading to certain death, you cannot simply perform this ritual six times to determine the correct doorway.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Greater Augury",

      castingTime: "one hour",

      functionsLike: {
        exceptThat: `
        the augury considers events up to 4 hours into your future when evaluating the outcomes of your plan.
        `,
        spell: "augury",
      },
      rank: 4,
      type: "Instant",
    },

    {
      name: "Supreme Augury",

      castingTime: "one hour",

      functionsLike: {
        exceptThat: `
        the augury considers events up to 12 hours into your future when evaluating the outcomes of your plan.
        `,
        spell: "augury",
      },
      rank: 6,
      type: "Instant",
    },

    {
      name: "Alarm",

      // original targets: one unoccupied square within \medrange
      castingTime: "one minute",
      effect: `
        A \\glossterm{scrying sensor} appears floating in the air in the subject location.
        The sensor passively observes its surroundings.
        As with other \\glossterm{Scrying} effects, its visual acuity is the same as yours.
        You can choose the minimum size category that the alarm will notify you for when you cast this spell.
        If it sees a creature or object of that size or larger moving within 50 feet of it, it will trigger an alarm.
        When you perform this ritual, you choose whether the alarm causes the sound of a ringing bell or a mental "ping" that only you can notice.
        You must be within 1 mile of the sensor to receive this mental alarm.
        This mental sensation is strong enough to wake you from normal sleep, but does not otherwise disturb concentration.
        `,

      rank: 1,
      tags: ["Scrying"],
      type: "Attune (self)",
    },

    {
      name: "Locate Creature",

      castingTime: "one hour",
      effect: `
        When you perform this ritual, choose a creature.
        You must have seen the chosen creature in person and either be able to clearly visualize its appearance or know its proper name to find it with this ritual.
        A creature without a proper name cannot be identified by name in this way.
        If you specify the chosen creature's appearance incorrectly, or if it has significantly changed its appearance, you may accidentally affect a different creature, or the ritual may simply fail.

        If the creature is within 100 miles of your location, you unerringly learn the relative direction from your location to the location it was in when you started performing this ritual.
        `,

      rank: 3,
      type: "Instant",
    },

    {
      name: "Locate Object",

      castingTime: "one minute",

      functionsLike: {
        exceptThat: `
        it locates objects instead of creatures.
        Objects currently being worn or carried by creatures cannot be found by this ritual.
        `,
        spell: "locate creature",
      },
      rank: 3,
      type: "Instant",
    },

    {
      name: "Read Magic",

      // original targets: yourself
      castingTime: "one minute",
      effect: `
        You gain the ability to decipher magical inscriptions that would otherwise be unintelligible.
        This can allow you to read ritual books and similar objects created by other creatures.
        After you have read an inscription in this way, you are able to read that particular writing without the use of this ritual.
        `,

      rank: 1,
      type: "Attune (ritual)",
    },

    {
      name: "Discern Location",

      castingTime: "24 hours",
      effect: `
        When you perform this ritual, choose a creature or object.
        You must have seen the chosen creature or object in person and either be able to clearly visualize its appearance or know its proper name to find it with this ritual.
        A creature or object without a proper name cannot be identified by name in this way.
        If you specify the chosen creature or object's appearance incorrectly, or if it has significantly changed its appearance, you may accidentally affect a different creature, or the ritual may simply fail.

        If the chosen creature or object is within 100 miles of you, you learn the location (place, name, business name, or the like), community, country, and continent where the subject was at when you started performing this ritual.
        % Wording?
        If there is no corresponding information about an aspect of the subject's location, such as if the subject is in a location which is not part of a recognized country,
        you learn only that that that aspect of the information is missing.
      `,

      rank: 2,
      type: "Instant",
    },

    {
      name: "Distant Discern Location",

      castingTime: "24 hours",

      functionsLike: {
        exceptThat: `
        there is no distance limitation.
        The creature or object must simply be on the same plane as you.
        `,
        spell: "discern location",
      },
      rank: 4,
      type: "Instant",
    },

    {
      name: "Interplanar Discern Location",

      // original targets: any creature or object on the same plane as you
      castingTime: "24 hours",

      functionsLike: {
        exceptThat: `
        the subject does not have to be on the same plane as you.
        `,
        spell: "discern location",
      },
      rank: 6,
      type: "Instant",
    },

    {
      name: "Sending",

      // original targets: any creature within 100 miles of you
      castingTime: "one hour",
      effect: `
        You do not need \\glossterm{line of sight} or \\glossterm{line of effect} to the subject.
        However,  must specify your target with a precise mental image of its appearance.
        The image does not have to be perfect, but it must unambiguously identify the subject.
        If you specify its appearance incorrectly, or if the subject has changed its appearance, you may accidentally target a different creature, or the ritual may simply fail.

        You send the subject a short verbal message.
        The message must be twenty-five words or less, and speaking the message must not take longer than five rounds.

        After the the subject receives the message, it may reply with a message of the same length as long as the ritual's effect continues.
        Once it speaks twenty-five words, or you stop sustaining the effect, the ritual is \\glossterm{dismissed}.
        `,

      rank: 3,
      type: "Sustain (standard)",
    },

    {
      name: "Distant Sending",

      // original targets: any creature on the same plane as you
      castingTime: "one hour",

      functionsLike: {
        exceptThat: `
        there is no distance limitation.
        The subject must simply be on the same plane as you.
        `,
        spell: "sending",
      },
      rank: 5,
      type: "Sustain (standard)",
    },

    {
      name: "Interplanar Sending",

      // original targets: any creature
      castingTime: "one hour",

      functionsLike: {
        exceptThat: `
        the subject does not have to be on the same plane as you.
        `,
        spell: "distant sending",
      },
      rank: 7,
      type: "Sustain (standard)",
    },

    {
      name: "Telepathic Bond",

      // original targets: up to five ritual participants
      castingTime: "one minute",
      effect: `
        Each subject can communicate mentally through telepathy with each other target.
        This communication is instantaneous, though it cannot reach more than 100 miles or across planes.

        % Is this grammatically correct?
        Each subject must attune to this ritual independently.
        If a target breaks its attunement, it stops being able to send and receive mental messages with other targets.
        However, the effect continues as long as at least one target attunes to it.
        If you \\glossterm{dismiss} the ritual, the effect ends for all targets.
      `,
      rank: 3,
      type: "Attune (ritual)",
    },

    {
      name: "Long-Distance Bond",

      // original targets: up to five ritual participants
      castingTime: "one minute",

      functionsLike: {
        exceptThat: `
        the effect works at any distance.
        The communication still does not function across planes.
        `,
        spell: "telepathic bond",
      },
      rank: 5,
      type: "Attune (ritual)",
    },

    {
      name: "Planar Bond",

      // original targets: up to five ritual participants
      castingTime: "one minute",

      functionsLike: {
        exceptThat: `
        the effect works at any distance and across planes.
        It gains the \\glossterm{Planar} tag in addition to the tags from the \\ritual{telepathic bond} ritual.
        `,
        spell: "telepathic bond",
      },
      rank: 7,
      type: "Attune (ritual)",
    },

    {
      name: "Seek Legacy",

      castingTime: "24 hours",
      effect: `
        One ritual participant learns the precise distance and direction to their \\glossterm{legacy item}, if it is on the same plane.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Scry Creature",

      castingTime: "one hour",
      attack: {
        hit: `A scrying sensor appears in the subject's space.
        This sensor functions like the sensor created by the \\spell{arcane eye} spell, except that you cannot move the sensor manually.
        Instead, it automatically tries to follow the subject to stay in its space.
        At the end of each phase, if the sensor is not in the subject's space, this effect is \\glossterm{dismissed}.`,
        targeting: `
        Make an attack vs. Mental against one creature on the same plane as you.
        You do not need \\glossterm{line of sight} or \\glossterm{line of effect} to the subject.
        However,  must specify your target with a precise mental image of its appearance.
        The image does not have to be perfect, but it must unambiguously identify the subject.
        If you specify its appearance incorrectly, or if the subject has changed its appearance, you may accidentally target a different creature, or the spell may simply be \\glossterm{miscast}.
        This attack roll cannot \\glossterm{explode}.
        `,
      },
      rank: 4,
      tags: ["Scrying"],
      type: "Instant",
    },

    {
      name: "Interplanar Scry Creature",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
        the subject does not have to be on the same plane as you.
        It gains the \\glossterm{Planar} tag in addition to the tags from the \\ritual{scry creature} ritual.
        `,
        spell: "scry creature",
      },
      rank: 6,
      tags: ["Scrying"],
      type: "Instant",
    },
  ],
};
