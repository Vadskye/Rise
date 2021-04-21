import { MysticSphere } from ".";

export const bless: MysticSphere = {
  name: "Bless",
  shortDescription: "Grant divine blessings to aid allies and improve combat prowess.",
  sources: ["divine"],

  cantrips: [
    {
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +1 bonus to \\glossterm{accuracy} and \\glossterm{checks} during the next round.
      `,
      focus: false,
      name: "Boon of Competence",
      scaling: {
        2: "The bonus increases to +2.",
        4: "The bonus increases to +3.",
        6: "The bonus increases to +4.",
      },
      type: "Duration",
    },
    {
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +1 bonus to \\glossterm{defenses} during the next round.
      `,
      focus: false,
      name: "Boon of Protection",
      scaling: {
        2: "The bonus increases to +2.",
        4: "The bonus increases to +3.",
        6: "The bonus increases to +4.",
      },
      type: "Duration",
    },
  ],
  spells: [
    {
      name: "Blessing of Freedom",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject is immune to being \\slowed, \\decelerated, \\immobilized, and \\paralyzed.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 2,
      scaling: {
        4: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        6: `The subject also gains a +4 bonus to the \\textit{escape grapple} ability (see \\pcref{Grapple Actions}).`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Swiftness",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +10 foot \\glossterm{magic bonus} to its \\glossterm{base speed}, up to a maximum of double its \\glossterm{base speed}.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 1,
      scaling: {
        3: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        5: `The speed bonus increases to +20 feet.`,
        7: `The speed bonus increases to +30 feet.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Recovery",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a additional +5 bonus to a vital wound after a \\glossterm{long rest} (see \\pcref{Removing Vital Wounds}).
        `,
      rank: 3,
      scaling: {
        5: `The subject gains two additional +5 bonuses.`,
        7: `The subject gains three additional +5 bonuses.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Regeneration",

      castingTime: "minor action",
      effect: `
        Choose yourself or an \\glossterm{ally} within \\medrange.
        At the end of each round, the subject regains 1d10 \\glossterm{hit points}.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 4,
      scaling: {
        special: `
          The healing increases by +1d for each rank beyond 4.
          \\rank{6} Casting this spell does not remove previous attunements to this spell.
            In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.
        `,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Proficiency",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject becomes proficient with all standard weapon groups and all types of armor.
        This does not grant proficiency with exotic weapons or improvised weapons.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 1,
      scaling: {
        3: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        5: `The subject also gains proficiency with all exotic weapons from weapon groups that it would be proficient with without the effects of this spell.`,
        7: `The subject becomes proficient with all exotic weapons regardless of its prior proficiencies.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Boon of Precision",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The first time the subject makes a \\glossterm{strike} this round,
        it gains a +2 bonus to \\glossterm{accuracy} and rolls twice and takes the higher result.
        Because this ability has the \\abilitytag{Swift} tag, it can affect an attack the subject makes during the current phase.
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
      name: "Boon of Invulnerability",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject becomes takes half damage from all sources until the end of the current round.
        Because this ability has the \\abilitytag{Swift} tag, it affects all damage the subject takes during the current phase.
        `,
      rank: 6,
      tags: ["Swift"],
      type: "Duration",
    },

    {
      name: "Boon of Avoidance",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +2 bonus to \\glossterm{defenses} until the end of the round.
        Because this ability has the \\abilitytag{Swift} tag, this improves the subject's defenses against attacks made against it during the current phase.
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
      name: "Blessing of the Purified Body",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +4 bonus to \\glossterm{defenses} against \\glossterm{poisons} and \\glossterm{diseases}.
        In addition, at the end of each round, it automatically gains one success to resist an active poison or disease affecting it that was not applied during that round.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 2,
      scaling: {
        4: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        6: `The bonus increases to +8.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Mental Clarity",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +4 bonus to \\glossterm{defenses} against \\abilitytag{Compulsion} and \\abilitytag{Emotion} effects.
        In addition, at the end of each round, it automatically removes one \\glossterm{condition} from a Compulsion or Emotion effect that was not applied during that round.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 2,
      scaling: {
        4: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        6: `The bonus increases to +6.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Protection",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +1 \\glossterm{magic bonus} to Armor defense and Mental defense.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 1,
      scaling: {
        3: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        5: `The bonus increases to +2.`,
        7: `The bonus increases to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Precision",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} with all attacks.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 1,
      scaling: {
        3: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        5: `The bonus increases to +2.`,
        7: `The bonus increases to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Power",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +2 \\glossterm{magic bonus} to \\glossterm{power} with all abilities.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 1,
      scaling: {
        3: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        5: `The bonus increases to +4.`,
        7: `The bonus increases to +8.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Perserverance",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        Whenever the subject would gain a \\glossterm{condition}, it can choose to negate that condition.
        After negating two conditions in this way, this spell ends.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 2,
      scaling: {
        4: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        6: `The spell can negate three conditions before ending.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Boon of Cleansing",

      effect: `
        You or one \\glossterm{ally} within \\medrange can remove a \\glossterm{condition}.
        This cannot remove a condition applied during the current round.
        `,
      rank: 3,
      scaling: {
        5: `The subject can remove two conditions.`,
        7: `The subject can remove three conditions.`,
      },
      type: "Instant",
    },

    {
      name: "Cleansing Benediction",

      effect: `
        You and each of your \\glossterm{allies} within a \\smallarea radius from you can each remove a \\glossterm{condition}.
        This cannot remove a condition applied during the current round.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Blessing of Physical Prowess",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
        The subject gains a +2 \\glossterm{magic bonus} to checks using the chosen attribute.
        In addition, if you choose Strength, the subject gains a +2 \\glossterm{magic bonus} to Strength for the purpose of determining its weight limits (see \\pcref{Weight Limits}).

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 2,
      scaling: {
        4: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        6: `The bonus increases to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Endurance",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +4 \\glossterm{magic bonus} to its maximum \\glossterm{hit points}.
        In addition, it immediately gains that many hit points.
        When this ability ends, the subject loses \\glossterm{hit points} equal to the number of hit points it gained this way.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 1,
      scaling: {
        3: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Wakefulness",

      // This spell intentionally can't be cast as a minor action to avoid making waking creatures too easy
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject cannot fall asleep or be knocked unconscious, even by \\glossterm{vital wounds}.
        If it is already unconscious for any reason, this spell wakes it up before it decides whether to attune to this spell.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 2,
      scaling: {
        4: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        6: `The subject is also immune to being \\dazed or \\stunned.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Mastery",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +1 \\glossterm{magic bonus} to \\glossterm{accuracy}, \\glossterm{checks}, and \\glossterm{defenses}.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 3,
      scaling: {
        5: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        7: `The bonus increases to +2.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Resilience",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains a +6 \\glossterm{magic bonus} to its \\glossterm{resistances} against both \\glossterm{physical} damage and \\glossterm{energy} damage.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 3,
      scaling: {
        5: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
        7: `The bonus increases to +12.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Vitality",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        Whenever the subject would gain a \\glossterm{vital wound}, it can choose to negate that vital wound.
        After negating a vital wound in this way, this spell ends.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 4,
      scaling: {
        6: `Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (target) tag.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Resurrection",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        When the subject dies, it automatically returns to life at the end of the following round.
        It returns in the same state in which it died, except that all of its \\glossterm{vital rolls} for its vital rolls that were 0 or lower become 1, preventing it from dying again immediately.
        In addition, it gains four \\glossterm{fatigue points} from the trauma of the experience.
        After the subject is returned to life this way, this spell ends.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 7,
      type: "Attune (target)",
    },
  ],
  rituals: [
    {
      name: "Blessing of Fortification",

      castingTime: "one hour",
      effect: `
        Choose one \\glossterm{unattended}, nonmagical object or part of an object of up to Large size.
        Unlike most abilities, this ritual can affect individual parts of a whole object.

        % How should this affect Strength break difficulty ratings?
        The subject gains a +5 \\glossterm{magic bonus} to its \\glossterm{resistances} to both \\glossterm{physical damage} and \\glossterm{energy damage}.
        If the subject is moved, this effect ends.
        Otherwise, it lasts for one year.
        `,
      rank: 1,
      type: "Attune (ritual)",
    },

    {
      name: "Enduring Fortification",

      castingTime: "24 hours",
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: "blessing of fortification",
      },
      rank: 4,
      type: "Instant",
    },

    {
      name: "Enduring Greater Fortification",

      castingTime: "24 hours",
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: "greater fortification",
      },
      rank: 5,
      type: "Instant",
    },

    {
      name: "Greater Fortification",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
          the bonus to \\glossterm{resistances} increases to 10.
        `,
        name: "blessing of fortification",
      },
      rank: 4,
      type: "Attune (ritual)",
    },

    {
      name: "Supreme Fortification",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
          the bonus to \\glossterm{resistances} increases to 15.
        `,
        name: "blessing of fortification",
      },
      rank: 7,
      type: "Attune (ritual)",
    },

    {
      name: "Bless Water",

      castingTime: "one minute",
      effect: `
        One pint of \\glossterm{unattended}, nonmagical water within \\shortrange becomes holy water.
        Holy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck \\glossterm{undead} or an evil \\glossterm{planeforged}.
        `,
      rank: 1,
      type: "Attune (ritual)",
    },

    {
      name: "Permanent Bless Water",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
          it loses the \\abilitytag{Attune} (ritual) tag and the effect lasts permanently.
        `,
        name: "bless water",
      },
      rank: 3,
      type: "Instant",
    },

    {
      name: "Curse Water",

      castingTime: "one minute",
      effect: `
        One pint of \\glossterm{unattended}, nonmagical water within \\shortrange becomes unholy water.
        Unholy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck good \\glossterm{planeforged}.
        `,
      rank: 1,
      type: "Attune (ritual)",
    },

    {
      name: "Permanent Curse Water",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
          it loses the \\abilitytag{Attune} (ritual) tag and the effect lasts permanently.
        `,
        name: "curse water",
      },
      rank: 3,
      type: "Instant",
    },

    {
      name: "Blessing of Purification",

      castingTime: "one hour",
      effect: `
        All food and water in a single square within \\shortrange becomes purified.
        Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
        This does not prevent subsequent natural decay or spoiling.
      `,
      rank: 1,
      type: "Instant",
    },
  ],
};
