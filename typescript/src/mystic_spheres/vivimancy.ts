import { MysticSphere } from ".";

export const vivimancy: MysticSphere = {
  name: "Vivimancy",
  shortDescription: "Manipulate life energy to aid allies or harm foes.",
  sources: ["arcane", "divine", "pact"],
  specialRules: `
    Undead creatures are affected in unusual ways by the direct manipulation of life energy.
    They are always considered a \\glossterm{living} creature and an \\glossterm{ally} for spells from the \sphere{vivimancy} mystic sphere.
    Any effect from this mystic sphere that would deal energy damage to an undead creature causes that creature to regain that many lost hit points instead.
    Likewise, any effect from this mystic sphere that would cause an undead creature to regain lost hit points instead causes it to lose that many hit points instead.
  `,

  cantrips: [
    {
      name: "Ablate Vital Wound",

      effect: `
        Choose a living \\glossterm{ally} within your \\glossterm{reach}.
        If the target has a \\glossterm{vital wound} with a \\glossterm{vital roll} of 0, it treats that \\glossterm{vital roll} as a 1, preventing it from dying (see \\pcref{Vital Wounds}).
      `,
      scaling: {
        2: `The range increases to \\shortrange.`,
        4: `The minimum \\glossterm{vital roll} you can mitigate decreases to -1.`,
        6: `The minimum \\glossterm{vital roll} you can mitigate decreases to -2.`,
      },
      type: "Instant",
    },

    {
      name: "Minor Life Infusion",

      effect: `
        You regain two \\glossterm{hit points}.
        After you use this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Healing} ability.
      `,
      scaling: {
        3: `The healing increases to four \\glossterm{hit points}.`,
        5: `The healing increases to eight \\glossterm{hit points}.`,
        7: `The healing increases to sixteen \\glossterm{hit points}.`,
      },
      tags: ['Healing'],
      type: "Instant",
    },
  ],
  spells: [
    {
      name: "Lifeseal",

      attack: {
        hit: `The target takes 4d6 + \\glossterm{power} energy damage.
        If it loses \\glossterm{hit points} from this damage, it is \\glossterm{briefly} unable to regain any hit points.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Draining Grasp",

      attack: {
        hit: `The target takes 1d10 + \\glossterm{power} energy damage.`,
        targeting: `
        You must have a \\glossterm{free hand} to cast this spell.

        Make a melee attack vs. Reflex against one living creature within your \\glossterm{reach}.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Lifesteal Grasp",

      attack: {
        hit: `
          The target takes 2d8 + \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, you regain 2d8 + \\glossterm{power} hit points.
          After you use this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Healing} ability.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against one living creature within your \\glossterm{reach}.
        `,
      },
      rank: 3,
      scaling: { special: "The damage and healing increases by +1d for each rank beyond 3." },
      tags: ['Healing'],
      type: "Duration",
    },

    {
      name: "Greater Lifesteal Grasp",

      functionsLike: {
        name: 'lifesteal grasp',
        exceptThat: "the damage increases to 6d10 + \\glossterm{power}.",
      },
      rank: 7,
      scaling: "damage",
      tags: ['Healing'],
      type: "Duration",
    },

    {
      name: "Drain Life",

      attack: {
        hit: `The target takes 1d10 + \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Drain Life",

      attack: {
        hit: `The target takes 4d6 + \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\longrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Supreme Drain Life",

      attack: {
        hit: `The target takes 6d10 + \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\distrange.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Cure Wound",

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        The target regains 1d10 + \\glossterm{power} \\glossterm{hit points}.
        After you use this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Healing} ability.
      `,
      rank: 2,
      scaling: { special: "The healing increases by +1d for each rank beyond 2." },
      tags: ['Healing'],
      type: "Instant",
    },

    {
      name: "Triage",

      castingTime: "minor action",
      effect: `
        Choose a living \\glossterm{ally} within \\longrange.
        If the target has a \\glossterm{vital wound} with a \\glossterm{vital roll} of 0, it treats that \\glossterm{vital roll} as a 1, preventing it from dying (see \\pcref{Vital Wounds}).
      `,
      rank: 2,
      scaling: {
        4: `The minimum \\glossterm{vital roll} you can mitigate decreases to -1.`,
        6: `The minimum \\glossterm{vital roll} you can mitigate decreases to -2.`,
      },
      type: "Instant",
    },

    {
      name: "Cure Vital Wound",

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\medrange
        The target removes one \\glossterm{vital wound}.
        It increases its \\glossterm{fatigue level} by three for each vital wound removed this way.
      `,
      rank: 5,
      scaling: { 7: `The target can remove two \\glossterm{vital wounds}.` },
      type: "Instant",
    },

    {
      name: "Inflict Wound",

      // +2 levels and half power for double HP loss? rank unclear
      attack: {
        hit: `The target takes 2d6 + half \\glossterm{power} energy damage.
        If the target would lose \\glossterm{hit points} from this damage, it loses twice that many hit points instead.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Inflict Wound",

      attack: {
        crit: `Double damage.
        In addition, if the target did not already gain a \\glossterm{vital wound} from that loss of hit points, it gains a \\glossterm{vital wound}.`,
        hit: `The target takes 5d10 + half \\glossterm{power} energy damage.
        If the target would lose \\glossterm{hit points} from this damage, it loses twice that many hit points instead.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Steal Vitality",

      // +1 level for situational vital wound removal
      attack: {
        hit: `The target takes 4d10 + \\glossterm{power} energy damage.
        If it loses \\glossterm{hit points} from this damage, you can remove one of your vital wounds.
        When you do, you increase your \\glossterm{fatigue level} by three.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Vital Persistence",

      castingTime: "minor action",
      effect: `
        Whenever you gain a \\glossterm{vital wound}, you may choose to ignore its vital wound effect (see \\pcref{Vital Wounds}).
        You are still considered to have the vital wound, and it still provides the normal -1 penalty to future vital rolls.

        You can only ignore the effects of one of your vital wounds in this way.
        If you gain a new vital wound, you can choose to either ignore the new vital wound effect or continue ignoring the old vital wound effect.
        You can make this choice after learning the \\glossterm{vital roll} for the new vital wound.
      `,
      rank: 3,
      scaling: {
        5: `You can ignore the vital wound effect of two of your \\glossterm{vital wounds} instead of only one.`,
        7: `Vital wounds you ignore with this spell do not cause you to suffer any penalty to future vital rolls.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Vital Persistence",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Vital Persistence",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: "Each subject can ignore the vital wound effect of two of its \\glossterm{vital wounds} instead of only one.",
      },
      type: "Attune (target)",
    },

    {
      name: "Death Knell",

      // Unclear rank
      attack: {
        hit: `The target takes 1d10 + half \\glossterm{power} energy damage.
        If it loses \\glossterm{hit points} from this damage, it is marked for death as a \\glossterm{condition}.
        If it reaches 0 hit points during this effect, it immediately dies.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\longrange.
          This attack gains a +2 \\glossterm{accuracy} bonus against a creature with no remaining \\glossterm{damage resistance}.
        `,
      },

      rank: 2,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Circle of Death",

      attack: {
        hit: `Each subject takes 2d6 + half \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Fortitude against all living \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Circle of Death",

      attack: {
        hit: `Each subject takes 4d8 + half \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Fortitude against all living \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Circle of Life",

      effect: `
        You and each living \\glossterm{ally} in a \\medarea radius from you each regains 2d10 \\glossterm{hit points}.
        After you use this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Healing} ability.
      `,
      rank: 4,
      scaling: { special: "The healing increases by +1d for each rank beyond 4." },
      tags: ['Healing'],
      type: "Instant",
    },

    {
      name: "Lifegift",

      castingTime: "minor action",
      effect: `
        You gin a +4 \\glossterm{magic bonus} to your maximum \\glossterm{hit points}.
        In addition, you immediately gain that many hit points.
        When this ability ends, you lose \\glossterm{hit points} equal to the number of hit points you gained this way.
      `,
      rank: 1,
      scaling: {
        3: "The bonus increases to +8.",
        5: "The bonus increases to +16.",
        7: "The bonus increases to +32.",
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Lifegift",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Lifegift",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: "The bonus increases to +8.",
        7: "The bonus increases to +16.",
      },
      type: "Attune (target)",
    },

    {
      name: "Wellspring of Life",

      effect: `
        Once per round, when you regain hit points, you may regain 3 additional hit points.
      `,
      rank: 2,
      scaling: {
        4: `The additional healing increases to 6.`,
        6: `The additional healing increases to 12.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Avasculate",

      // HP loss is treated as t3.5 debuff
      attack: {
        hit: `
          The target takes 4d6 energy damage.
          If it loses \\glossterm{hit points} from this damage, it also loses additional \\glossterm{hit points} equal to half its maximum hit points.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 7,
      type: "Instant",
    },

    {
      name: "Sapping Miasma",

      attack: {
        crit: "The effect becomes a \\glossterm{condition}.",
        // No relevant glance effect
        hit: `Each subject is \\glossterm{briefly} \\dazed.`,
        targeting: `
          Make an attack vs. Fortitude against all living creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Greater Sapping Miasma",

      attack: {
        crit: "The effect becomes a \\glossterm{condition}.",
        hit: `Each subject is \\glossterm{briefly} \\stunned.`,
        targeting: `
          Make an attack vs. Fortitude against all living creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Lifesteal",

      // +2 levels for HP theft
      attack: {
        hit: `
          The target takes 2d8 + \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, you regain 2d8 + \\glossterm{power} hit points.
          After you use this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Healing} ability.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: { special: "The damage and healing increases by +1d for each rank beyond 3." },
      tags: ['Healing'],
      type: "Instant",
    },

    {
      name: "Lifesteal Blade",

      castingTime: "minor action",
      effect: `
        Once per round, when you cause a creature to lose \\glossterm{hit points} with a \\glossterm{strike}, you regain \\glossterm{hit points} equal to 2d10 + half your \\glossterm{power}.
      `,
      rank: 5,
      scaling: { special: "The healing increases by +1d for each rank beyond 5." },
      tags: ['Healing'],
      type: "Attune (self)",
    },

    {
      name: "Mass Lifesteal Blade",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Lifesteal Blade",
      },
      // narrative: '',
      rank: 7,
      type: "Attune (target)",
    },

    {
      name: "Corpse Explosion",

      attack: {
        hit: `Each subject takes 1d10 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Choose one Small or larger corpse within \\medrange.
          Make an attack vs. Reflex against each creature within a \\smallarea radius from the corpse.
          The corpse is also destroyed.
        `,
      },
      narrative: `
          You violently discharge the latent magical potential within a corpse, causing it to explode.
      `,
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Corpse Explosion",

      functionsLike: {
        name: 'corpse explosion',
        exceptThat: 'the damage increases to 4d8 + \\glossterm{power}.',
      },
      narrative: `
        You violently discharge the latent magical potential within a corpse, causing it to explode in a shower of guts and gore.
      `,
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Withering",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        // No relevant glance effect
        hit: `As a \\glossterm{condition}, the target's body withers.
        It takes a -2 penalty to Fortitude defense.
        Whenever it loses one or more \\glossterm{hit points} from a single attack, this penalty increases by 1.
        This penalty increase stacks, and persists even if the target regains the lost hit points.`,
        targeting: `
          Make an attack vs. Fortitude with a +2 bonus to \\glossterm{accuracy} against one living creature within \\longrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Withering Curse",

      attack: {
        crit: `The effect lasts until this curse is removed. The penalty resets to -2 whenever the target takes a short rest.`,
        hit: `The target becomes more vulnerable to injury until it takes a short rest.
        It takes a -2 penalty to Fortitude defense.
        Whenever it loses one or more \\glossterm{hit points} from a single attack, this penalty increases by 1.
        This penalty increase stacks, and persists even if the target regains the lost hit points.`,
        targeting: `
        Make an attack vs. Mental with a +2 bonus to \\glossterm{accuracy} against one living creature within \\longrange.
        `,
      },

      rank: 3,
      scaling: "accuracy",
      tags: ["Curse"],
      type: "Duration",
    },

    {
      name: "Retributive Lifebond",

      attack: {
        hit: `Each subject takes 1d10 energy damage.`,
        targeting: `
          At the end of each phase, make an attack vs. Fortitude against each \\glossterm{enemy} within a \\smallarea radius \\glossterm{emanation} from you that caused you to lose \\glossterm{hit points} during that phase.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Greater Retributive Lifebond",

      attack: {
        // +1d from levels
        hit: `Each subject takes 4d6 energy damage.`,
        targeting: `
          At the end of each phase, make an attack vs. Fortitude against each \\glossterm{enemy} within a \\medarea radius \\glossterm{emanation} from you that caused you to lose \\glossterm{hit points} during that phase.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Supreme Retributive Lifebond",

      attack: {
        // +1d from levels
        hit: `Each subject takes 6d10 energy damage.`,
        targeting: `
          At the end of each phase, make an attack vs. Fortitude against each \\glossterm{enemy} within a \\largearea radius \\glossterm{emanation} from you that caused you to lose \\glossterm{hit points} during that phase.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Healer's Intuition",

      effect: `
        If you are \\glossterm{trained} with the Medicine skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
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
      name: "Lifesense",

      effect: `
        You gain \\trait{lifesense} with a 60 foot range, allowing you to sense the location of living creatures without light (see \pcref{Lifesense}).
      `,
      rank: 1,
      scaling: {
        3: `The range increases to 120 feet.`,
        5: `The range increases to 240 feet.`,
        7: `The range increases to 480 feet.`,
      },
      type: "Attune (self)",
    },
    {
      name: "Lifesight",

      effect: `
        You gain \\trait{lifesight} with a 30 foot range, allowing you to see living creatures without light (see \pcref{Lifesight}).
      `,
      rank: 3,
      scaling: {
        5: `The range increases to 60 feet.`,
        7: `The range increases to 120 feet.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Lifesense",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Lifesense",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: "The range increases to 120 feet.",
        7: "The range increases to 240 feet.",
      },
      type: "Attune (target)",
    },

    {
      name: "Mass Lifesight",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Lifesight",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: "The range increases to 60 feet.",
      },
      type: "Attune (target)",
    },
  ],
  rituals: [
    {
      name: "Remove Disease",

      castingTime: "one hour",
      effect: `
          All diseases affecting yourself or one \\glossterm{ally} within \\medrange are removed.
      `,
      rank: 2,
      type: "Instant",
    },

    {
      name: "Restore Senses",

      castingTime: "one hour",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        One of the target's physical senses, such as sight or hearing, is restored to full capacity.
        This can heal both magical and mundane effects, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Reincarnation",

      castingTime: "24 hours",
      effect: `
        In addition to the normal requirements, this ritual requires and consumes diamond dust worth a total of 2,000 gp.

        Choose one Diminuitive or larger piece of a humanoid corpse.
        It must have been part of the original creature's body at the time of death.
        The creature the corpse belongs to returns to life in a new body.
        It must not have died due to old age.

        This ritual creates an entirely new body for the creature's soul to inhabit from the natural elements at hand.
        During the ritual, the body ages to match the age of the original creature at the time it died.
        The creature has 0 hit points when it returns to life.

        A reincarnated creature is identical to the original creature in all respects, except for its species.
        The creature's species is replaced with a random species from \\tref{Humanoid Reincarnations}.
        Its appearance changes as necessary to match its new species, though it retains the general shape and distinguishing features of its original appearance.
        The creature loses all attribute modifiers and abilities from its old species, and gains those of its new species.
        However, its languages are unchanged.

        Coming back from the dead is an ordeal.
        All of the creature's \\glossterm{attunement points} and daily abilities are expended when it returns to life.
        In addition, its maximum attunement points are reduced by 1.
        This penalty lasts for thirty days, or until the creature gains a level.
        If this would reduce a creature's maximum attunement points below 0, the creature cannot be resurrected.

        This ritual can only be learned through the nature \\glossterm{magic source}.
      `,
      rank: 4,
      tableText: `
        \\begin{dtable}
            \\lcaption{Humanoid Reincarnations}
            \\begin{dtabularx}{\\columnwidth}{l X}
                \\tb{d\\%} & \\tb{Incarnation} \\tableheaderrule
                01--13 & Dwarf \\\\
                14--26 & Elf \\\\
                27--40 & Gnome \\\\
                41--52 & Half-elf \\\\
                53--62 & Half-orc \\\\
                63--74 & Halfling \\\\
                75--100 & Human \\\\
            \\end{dtabularx}
        \\end{dtable}
      `,
      tags: ["Creation"],
      type: "Duration",
    },

    {
      name: "Fated Reincarnation",

      castingTime: "24 hours",
      functionsLike: {
        exceptThat: `
          the target is reincarnated as its original species instead of as a random species.
        `,
        name: "reincarnation",
      },
      rank: 6,
      tags: ["Creation"],
      type: "Instant",
    },

    {
      name: "Purge Curse",

      castingTime: "24 hours",
      effect: `
        All curses affecting yourself or one \\glossterm{ally} within \\medrange are removed.
        This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
        However, it can allow the target to remove any cursed items it has equipped.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "True Regeneration",

      castingTime: "24 hours",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        All of the target's \\glossterm{vital wounds} are healed.
        In addition, any of the target's severed body parts or missing organs grow back by the end of the next round.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Resurrection",

      castingTime: "24 hours",
      effect: `
        In addition to the normal requirements, this ritual requires and consumes diamond dust worth a total of 2,000 gp.

        Choose one intact corpse within \\shortrange.
        The corpse returns to life.
        It must not have died due to old age.

        The creature has 0 hit points when it returns to life.
        It is cured of all \\glossterm{vital wounds} and other negative effects, but the body's shape is unchanged.
        Any missing or irreparably damaged limbs or organs remain missing or damaged.
        The creature may therefore die shortly after being resurrected if its body is excessively damaged.

        Coming back from the dead is an ordeal.
        All of the creature's \\glossterm{attunement points} and daily abilities are expended when it returns to life.
        In addition, its maximum \\glossterm{fatigue tolerance} is reduced by 1.
        This penalty lasts for thirty days, or until the creature gains a level.
        If this would reduce a creature's maximum fatigue tolerance below 0, the creature cannot be resurrected.

        This ritual can only be learned through the divine \\glossterm{magic source}.
      `,
      rank: 4,
      type: "Duration",
    },

    {
      name: "Complete Resurrection",

      castingTime: "24 hours",
      functionsLike: {
        exceptThat: `
        it does not have to target a fully intact corpse.
        The target must have been part of the original creature's body at the time of death.
        The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.
        `,
        name: "resurrection",
      },
      rank: 6,
      tags: ["Creation"],
      type: "Instant",
    },

    {
      name: "True Resurrection",

      // original targets: Special
      castingTime: "24 hours",

      functionsLike: {
        exceptThat: `
        it does not require any piece of the corpse.
        Instead, you must explicitly and unambiguously specify the identity of the creature being resurrected.
        The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.
        `,
        name: "resurrection",
      },
      rank: 7,
      tags: ["Creation"],
      type: "Instant",
    },

    {
      name: "Soul Bind",

      castingTime: "one hour",
      effect: `
        % Is this clear enough that you can't use the same gem for this ritual twice?
        Choose a nonmagical gem you hold that is worth at least 1,000 gp.
        In addition, choose one intact corpse within \\shortrange.
        A fragment of the soul of the creature that the target corpse belongs to is magically imprisoned in the chosen gem.
        This does not remove the creature from its intended afterlife.
        However, it prevents the creature from being resurrected, and prevents the corpse from being used to create undead creatures, as long as the gem is intact.
        A creature holding the gem may still resurrect or reanimate the creature.
        If the gem is shattered, the fragment of the creature's soul returns to its body.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Animate Dead",

      castingTime: "one hour",
      effect: `
        Choose up to four corpses within \\shortrange.
        The combined levels of all targets cannot exceed your level.
        Each subject becomes an undead creature that obeys your mental commands.

        You choose whether to create a skeleton or a zombie from each corpse.
        Creating a zombie require a mostly intact corpse, including most of the flesh.
        Creating a skeleton only requires a mostly intact skeleton.
        If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.

        As a \\glossterm{minor action}, you can mentally command your undead.
        The command must be no more than 10 words, and overly complex commands may cause strange and unintended behavior.
        It affects any undead you created with this ability that are within \\distrange of you.
        Undead will obey their most recent command indefinitely.
      `,
      rank: 3,
      type: "Attune (self)",
    },
  ],
};
