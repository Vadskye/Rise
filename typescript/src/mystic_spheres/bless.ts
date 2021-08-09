import { MysticSphere } from ".";

export const bless: MysticSphere = {
  name: "Bless",
  shortDescription: "Grant divine blessings to aid allies and improve combat prowess.",
  sources: ["divine"],

  cantrips: [
    {
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject \\glossterm{briefly} a +1 bonus to \\glossterm{accuracy} and \\glossterm{checks}.
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
        The subject \\glossterm{briefly} gains a +1 bonus to all \\glossterm{defenses}.
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
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange. 
        Each subject is immune to being \\slowed, \\decelerated, \\immobilized, and \\paralyzed.
      `,
      rank: 4,
      scaling: {
        6: `Each subject also gains a +4 bonus to the \\textit{escape grapple} ability (see \\pcref{Grapple Actions}).`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Swiftness",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange. 
        Each subject gains a +5 foot \\glossterm{magic bonus} to speed with all its \\glossterm{movement modes}, and a +1 \\glossterm{magic bonus} to Reflex defense.

        You can only have one casting of this spell active at once.
        When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.
      `,
      rank: 2,
      scaling: {
        4: `The speed bonus increases to +10 feet, and the defense bonus increases to +2.`,
        6: `The speed bonus increases to +15 feet, and the defense bonus increases to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Recovery",

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever each subject finishes a \\glossterm{long rest}, it removes an additional \\glossterm{vital wound} (see \\pcref{Removing Vital Wounds}).
      `,
      rank: 4,
      scaling: {
        6: `The number of vital wounds removed increases to two.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Regeneration",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        At the end of each round, each subject regains 2d8 \\glossterm{hit points}.
      `,
      rank: 5,
      scaling: {
        special: `
          The healing increases by +1d for each rank beyond 5.
        `,
      },
      tags: ['Healing'],
      type: "Attune (target)",
    },

    {
      name: "Blessing of Proficiency",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject becomes proficient with one additional weapon group and all types of armor.
        This does not grant proficiency with exotic weapons or improvised weapons.
      `,
      rank: 1,
      scaling: {
        3: `Each subject also gains proficiency with all exotic weapons from weapon groups that it would be proficient with without the effects of this spell.`,
        5: `Each subject becomes proficient with all weapon groups.`,
        7: `Each subject becomes proficient with all exotic weapons regardless of its prior proficiencies.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Shielding Boon",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        If the subject takes the \\textit<total defense> action during the current phase, it gains an additional +2 bonus to all defenses until the end of the round.
        Because this ability has the \\abilitytag{Swift} tag, it affects attacks against the subject during the current phase.
        If you cast this spell on yourself, it affects the first time you use the \\textit<total defense> ability before the end of the next round.
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
      name: "Boon of Precision",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The first time the subject makes a \\glossterm{strike} this round,
        it gains a +2 bonus to \\glossterm{accuracy} and rolls twice and takes the higher result.
        Because this ability has the \\abilitytag{Swift} tag, it can affect an attack the subject makes during the current phase.
        If you cast this spell on yourself, it affects the first strike you make before the end of the next round.
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
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject gains a +4 bonus to \\glossterm{defenses} against \\glossterm{poisons} and \\glossterm{diseases}.
        In addition, at the end of each round, it automatically gains one success to resist an active poison or disease affecting it that was not applied during that round.
      `,
      rank: 3,
      scaling: {
        5: `The bonus increases to +6.`,
        7: `The bonus increases to +8.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Mental Clarity",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject gains a +4 bonus to \\glossterm{defenses} against \\abilitytag{Compulsion} and \\abilitytag{Emotion} effects.
        In addition, at the end of each round, it automatically removes one \\glossterm{condition} from a Compulsion or Emotion effect that was not applied during that round.
      `,
      rank: 3,
      scaling: {
        5: `The bonus increases to +6.`,
        7: `The bonus increases to +8.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Protection",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject gains a +1 \\glossterm{magic bonus} to Armor defense and Mental defense.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +2.`,
        6: `The bonus increases to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Precision",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject gains a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} with all attacks.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +2.`,
        6: `The bonus increases to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Power",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject gains a +2 \\glossterm{magic bonus} to \\glossterm{power}.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +4.`,
        6: `The bonus increases to +8.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Perseverance",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever each subject would gain a \\glossterm{condition}, it can choose to negate that condition.
        After a creature negates a condition in this way, this spell ends for that creature.
      `,
      rank: 3,
      scaling: {
        5: `The spell can negate two conditions before ending.`,
        7: `The spell can negate three conditions before ending.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Boon of Cleansing",

      effect: `
        You or one \\glossterm{ally} within \\medrange can remove a \\glossterm{brief} effect or \\glossterm{condition}.
        This cannot remove an effect applied during the current round.
      `,
      rank: 4,
      scaling: {
        6: `The subject can remove two effects.`,
      },
      type: "Instant",
    },

    {
      name: "Cleansing Benediction",

      effect: `
        You and each \\glossterm{ally} within a \\smallarea radius from you can each remove a \\glossterm{brief} effect or \\glossterm{condition}.
        This cannot remove effects applied during the current round.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Blessing of Physical Prowess",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
        Each subject gains a +2 \\glossterm{magic bonus} to checks using the chosen attribute.
        In addition, if you choose Strength, each subject gains a +2 \\glossterm{magic bonus} to Strength for the purpose of determining its weight limits (see \\pcref{Weight Limits}).
      `,
      rank: 3,
      scaling: {
        5: `The bonus increases to +3.`,
        7: `The bonus increases to +4.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Endurance",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject gains a +4 \\glossterm{magic bonus} to its maximum \\glossterm{hit points}.
        In addition, it immediately gains that many hit points.
        When this ability ends, each subject loses \\glossterm{hit points} equal to the number of hit points it gained this way.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +16.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Divine Warning",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject cannot be \\surrounded and is never \\unaware or \\partiallyunaware.
      `,
      rank: 6,
      type: "Attune (target)",
    },

    {
      name: "Blessing of Cleansing Renewal",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        At the end of each round, each subject removes one \\glossterm{condition} of its choice affecting it.
        This cannot remove a condition applied during the current round.
      `,
      rank: 7,
      type: "Attune (target)",
    },

    {
      name: "Blessing of Wakefulness",

      // This spell intentionally can't be cast as a minor action to avoid making waking creatures too easy
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject cannot fall asleep or be knocked unconscious, except by \\glossterm{vital wounds}.
        If it is already unconscious for any reason, this spell wakes it up before it decides whether to attune to this spell.
      `,
      rank: 1,
      scaling: {
        3: `This effect also protects each subject from being knocked unconscious by vital wounds.`,
        5: `Each subject is also immune to being \\dazed or \\stunned.`,
        7: `You can cast this spell as a \\glossterm{minor action}.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Mastery",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject gains a +1 \\glossterm{magic bonus} to \\glossterm{accuracy} and all \\glossterm{defenses}.
        In addition, it gains a +2 \\glossterm{magic bonus} to \\glossterm{power} and \\glossterm{damage resistance}.
      `,
      rank: 4,
      scaling: {
        6: `
          The accuracy and defense bonuses increases to +2.
          In addition the power and damage resistance bonuses increase to +4.
        `,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Resilience",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each subject gains a +4 \\glossterm{magic bonus} to its \\glossterm{damage resistance}.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +16.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Blessing of Vitality",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Whenever each subject would gain a \\glossterm{vital wound}, it can choose to negate that vital wound.
        After negating a vital wound for a creature in this way, this spell ends for that creature.
      `,
      rank: 6,
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
        The subject gains a +5 \\glossterm{magic bonus} to its \\glossterm{damage resistance}.
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
          the bonus to \\glossterm{damage resistance} increases to 10.
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
          the bonus to \\glossterm{damage resistance} increases to 15.
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
