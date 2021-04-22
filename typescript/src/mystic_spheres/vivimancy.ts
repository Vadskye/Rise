import { MysticSphere } from ".";

export const vivimancy: MysticSphere = {
  name: "Vivimancy",
  shortDescription: "Manipulate life energy to aid allies or harm foes.",
  sources: ["arcane", "divine", "pact"],

  cantrips: [
    {
      name: "Ablate Vital Wound",

      effect: `
        Choose a living \\glossterm{ally} within your \\glossterm{reach}.
        If the subject has a \\glossterm{vital wound} with a \\glossterm{vital roll} of 0, it treats that \\glossterm{vital roll} as a 1, preventing it from dying (see \\pcref{Vital Wounds}).
      `,
      focus: false,
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
        Choose yourself or one living \\glossterm{ally} within \\medrange.
        The subject regains two \\glossterm{hit points}.
        After you use this ability, you cannot use it or any other \abilitytag{Healing} ability until after the end of the next round.
      `,
      focus: false,
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
        glance: `Half damage.`,
        hit: `The subject takes 4d6 + \\glossterm{power} energy damage.
        If it loses \\glossterm{hit points} from this damage, it becomes unable to regain any hit points as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\longrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Draining Grasp",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} energy damage.`,
        targeting: `
        This spell does not have the \\abilitytag{Focus} tag.
        You must have a \\glossterm{free hand} to cast this spell.

        Make a melee attack vs. Reflex against one living creature within your \\glossterm{reach}.
        `,
      },
      focus: false,
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Lifesteal Grasp",

      attack: {
        glance: "Half damage.",
        hit: `
          The subject takes 2d8 + \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, you regain hit points equal to the damage it took this way.
          After you use this ability, you cannot use it or any other \\abilitytag{Healing} ability until after the end of the next round.
        `,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against one living creature within your \\glossterm{reach}.
        `,
      },
      focus: false,
      rank: 3,
      scaling: "damage",
      tags: ['Healing'],
      type: "Duration",
    },

    {
      name: "Drain Life",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Cure Wound",

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        The subject regains \\glossterm{hit points} equal to 1d8 plus half your \\glossterm{power}.
        After you use this ability, you cannot use it or any other \\abilitytag{Healing} ability until after the end of the next round.
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
        If the subject has a \\glossterm{vital wound} with a \\glossterm{vital roll} of 0, it treats that \\glossterm{vital roll} as a 1, preventing it from dying (see \\pcref{Vital Wounds}).
      `,
      rank: 2,
      scaling: {
        4: `The minimum \\glossterm{vital roll} you can mitigate decreases to -1.`,
        6: `The minimum \\glossterm{vital roll} you can mitigate decreases to -2.`,
      },
      type: "Instant",
    },

    {
      name: "Fortify Life",

      castingTime: "minor action",
      effect: `
        You gain a +2 \\glossterm{magic bonus} to Fortitude defense.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +3.`,
        5: `The bonus increases to +4.`,
        7: `The bonus increases to +5.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Fortify Life",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Fortify Life",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +3.`,
        7: `The bonus increases to +4.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Cure Vital Wound",

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\medrange
        The subject removes one \\glossterm{vital wound}.
        It increases its \\glossterm{fatigue level} by two for each vital wound removed this way.
      `,
      rank: 5,
      scaling: { 7: `The subject can remove two \\glossterm{vital wounds}.` },
      type: "Instant",
    },

    {
      name: "Inflict Wound",

      attack: {
        hit: `The subject takes 1d8 + half \\glossterm{power} energy damage.
        If the subject would lose \\glossterm{hit points} from this damage, it loses twice that many hit points instead.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },

      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Inflict Wound",

      attack: {
        crit: `Double damage.
        In addition, if the subject did not already gain a \\glossterm{vital wound} from that loss of hit points, it gains a \\glossterm{vital wound}.`,
        glance: `Half damage.`,
        hit: `The subject takes 2d10 + half \\glossterm{power} energy damage.
        If the subject would lose \\glossterm{hit points} from this damage, it loses twice that many hit points instead.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },

      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Steal Vitality",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 4d10 + \\glossterm{power} energy damage.
        If it loses \\glossterm{hit points} from this damage, you can remove one of your vital wounds.
        When you do, you increase your \\glossterm{fatigue level} by two.`,
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
        You ignore the vital wound effect of one of your \\glossterm{vital wounds} (see \\pcref{Vital Wounds}).
        You are still considered to have the vital wound, and it still provides the normal -1 penalty to future vital rolls.
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

      attack: {
        hit: `The subject takes 1d10 + half \\glossterm{power} energy damage.
        If it loses \\glossterm{hit points} from this damage, it is marked for death as a \\glossterm{condition}.
        If it reaches 0 hit points during this effect, it immediately dies.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\longrange.
          This attack gains a +2 \\glossterm{accuracy} bonus a creature at less than its maximum \\glossterm{hit points}.
        `,
      },

      rank: 2,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Circle of Death",

      attack: {
        glance: `Half damage.`,
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
      name: "Circle of Life",

      effect: `
        You and each living \\glossterm{ally} in a \\medarea radius from you each regain 2d10 \\glossterm{hit points}.
        After you use this ability, you cannot use it or any other \\abilitytag{Healing} ability until after the end of the next round.
      `,
      rank: 5,
      scaling: { special: "The healing increases by +1d for each rank beyond 5." },
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
        Once per round, when you regain hit points, you regain 4 additional hit points.
      `,
      rank: 2,
      scaling: {
        4: `The additional healing increases to 8.`,
        6: `The additional healing increases to 16.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Avasculate",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 4d6 energy damage.
        If it loses \\glossterm{hit points} from this damage, it also loses additional \\glossterm{hit points} equal to half its maximum hit points.
        Unlike normal, this hit point loss is rounded up instead of down.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 7,
      type: "Instant",
    },

    {
      name: "Sickening Miasma",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each subject.",
        hit: `Each subject is \\sickened until the end of the next round.`,
        targeting: `
          Make an attack vs. Fortitude against all living creatures in a \\smallarea radius within \\longrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Nauseating Miasma",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each subject.",
        hit: `Each subject is \\nauseated until the end of the next round.`,
        targeting: `
          Make an attack vs. Fortitude against all living creatures in a \\smallarea radius within \\longrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Lifesteal",

      // original targets: one living creature within \medrange
      attack: {
        glance: `Half damage.`,
        hit: `
          The subject takes 2d8 + \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, you regain \\glossterm{hit points} equal to the hit points it lost this way.
          After you use this ability, you cannot use it or any other \abilitytag{Healing} ability until after the end of the next round.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ['Healing'],
      type: "Instant",
    },

    {
      name: "Lifesteal Blade",

      castingTime: "minor action",
      effect: `
        Once per round, when you cause a living creature to lose \\glossterm{hit points} with a \\glossterm{strike}, you regain \\glossterm{hit points} equal to half the hit points the struck creature lost this way.
      `,
      rank: 5,
      scaling: {
        7: `The healing increases to be equal to the hit points the struck creature lost this way.`,
      },
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
      name: "Withering",

      attack: {
        crit: `The penalty starts at -5.`,
        hit: `As a \\glossterm{condition}, the subject's body withers.
        It takes a -2 penalty to Fortitude defense.
        Whenever it loses one or more \\glossterm{hit points} from a single attack, this penalty increases by 1.
        This penalty increase stacks, and persists even if the subject regains the lost hit points.`,
        targeting: `
          Make an attack vs. Fortitude with a +2 bonus to \\glossterm{accuracy} against one living creature within \\longrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Withering Curse",

      attack: {
        crit: `The effect lasts until this curse is removed.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject becomes more vulnerable to injury until it takes a short rest.
        It takes a -2 penalty to Fortitude defense.
        Whenever it loses one or more \\glossterm{hit points} from a single attack, this penalty increases by 1.
        This penalty increase stacks, and persists even if the subject regains the lost hit points.`,
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
        hit: `Each subject takes 1d8 energy damage.`,
        targeting: `
          At the end of each round, make an attack vs. Fortitude against each creature adjacent to you that caused you to lose \\glossterm{hit points} that round.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Greater Retributive Lifebond",

      attack: {
        glance: `Half damage.`,
        // +1d from levels
        hit: `Each secondary target takes 2d10 energy damage.`,
        targeting: `
          At the end of each round, make an attack vs. Fortitude against each creature within a \\medarea radius \\glossterm{emanation} from you that caused you to lose \\glossterm{hit points} that round.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Attune (self)",
    },
  ],
  rituals: [
    {
      name: "Remove Disease",

      castingTime: "one hour",
      effect: `
          All diseases affecting yourself or one \\glossterm{ally} within \\medrange are removed.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Restore Senses",

      castingTime: "one hour",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        One of the subject's physical senses, such as sight or hearing, is restored to full capacity.
        This can heal both magical and mundane effects, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Reincarnation",

      castingTime: "24 hours",
      effect: `
        Choose one Diminuitive or larger piece of a humanoid corpse
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
          the subject is reincarnated as its original species instead of as a random species.
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
        This ritual cannot remove a curse that is part of the effect of an item the subject has equipped.
        However, it can allow the subject to remove any cursed items it has equipped.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "True Regeneration",

      castingTime: "24 hours",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        All of the subject's \\glossterm{vital wounds} are healed.
        In addition, any of the subject's severed body parts or missing organs grow back by the end of the next round.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Resurrection",

      castingTime: "24 hours",
      effect: `
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
        The subject must have been part of the original creature's body at the time of death.
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
        A fragment of the soul of the creature that the subject corpse belongs to is magically imprisoned in the chosen gem.
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
        Choose any number of corpses within \\shortrange.
        The combined levels of all targets cannot exceed your \\glossterm{power}.
        The subject becomes an undead creature that obeys your spoken commands.
        You choose whether to create a skeleton or a zombie.
        Creating a zombie require a mostly intact corpse, including most of the flesh.
        Creating a skeleton only requires a mostly intact skeleton.
        If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.
      `,
      rank: 3,
      type: "Attune (ritual)",
    },
  ],
};
