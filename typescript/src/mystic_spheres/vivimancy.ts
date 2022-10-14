import { MysticSphere } from ".";

export const vivimancy: MysticSphere = {
  name: "Vivimancy",
  shortDescription: "Manipulate life energy to aid allies or harm foes.",
  sources: ["arcane", "divine", "pact"],

  cantrips: [
    {
      name: "Ablate Vital Wound",

      effect: `
        Choose an adjacent living \\glossterm{ally}.
        If the target has a \\glossterm{vital wound} with a \\glossterm{vital roll} of 0, it treats that \\glossterm{vital roll} as a 1, preventing it from dying (see \\pcref{Vital Wounds}).
      `,
      scaling: {
        2: `The range increases to \\shortrange.`,
        4: `The minimum \\glossterm{vital roll} you can mitigate decreases to -1.`,
        6: `The minimum \\glossterm{vital roll} you can mitigate decreases to -2.`,
      },
    },

    {
      name: "Minor Life Infusion",

      effect: `
        You regain two \\glossterm{hit points}.
        This healing cannot increase your hit points above half your maximum hit points.
      `,
      scaling: {
        3: `The healing increases to four \\glossterm{hit points}.`,
        5: `The healing increases to eight \\glossterm{hit points}.`,
        7: `The healing increases to sixteen \\glossterm{hit points}.`,
      },
      tags: [],
    },
  ],
  spells: [
    {
      name: "Draining Grasp",

      attack: {
        hit: `The target takes 1d8 + \\glossterm{power} energy damage.`,
        targeting: `
        You must have a \\glossterm{free hand} to cast this spell.

        Make a melee attack vs. Reflex against an adjacent living creature.
        `,
      },
      rank: 1,
      scaling: "damage",
    },

    {
      name: "Lifesteal Grasp",

      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, you can increase your \\glossterm{fatigue level} by one. 
          If you do, you regain 2d6 + \\glossterm{power} hit points.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against an adjacent living creature.
        `,
      },
      rank: 3,
      scaling: { special: "The damage and healing increases by +1d for each rank beyond 3." },
      tags: [],
    },

    {
      name: "Greater Lifesteal Grasp",

      functionsLike: {
        name: 'lifesteal grasp',
        exceptThat: "the damage and healing both increase to 5d8 + \\glossterm{power}.",
      },
      rank: 6,
      scaling: { special: "The damage and healing increases by +1d for each rank beyond 6." },
      tags: [],
    },

    {
      name: "Lifesteal",

      // +2 levels for HP theft
      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, you can increase your \\glossterm{fatigue level} by one. 
          If you do, you regain 2d6 + \\glossterm{power} hit points.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: { special: "The damage and healing increases by +1d for each rank beyond 3." },
      tags: [],
    },

    {
      name: "Restoration",

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        The target regains 1d8 + \\glossterm{power} \\glossterm{hit points} and increases its \\glossterm{fatigue level} by one.
      `,
      rank: 1,
      scaling: { special: "The healing increases by +1d for each rank beyond 1." },
      tags: [],
    },

    {
      name: "Greater Restoration",

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\medrange.
        The target regains 2d10 + \\glossterm{power} \\glossterm{hit points} and increases its \\glossterm{fatigue level} by one.
      `,
      rank: 4,
      scaling: { special: "The healing increases by +1d for each rank beyond 4." },
      tags: [],
    },

    {
      name: "Supreme Restoration",

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\longrange.
        The target regains 5d10 + \\glossterm{power} \\glossterm{hit points} and increases its \\glossterm{fatigue level} by one.
      `,
      rank: 7,
      tags: [],
    },

    {
      name: "Stabilize Life",

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\medrange.
        The target regains 1d10 + \\glossterm{power} \\glossterm{hit points}.
        This cannot increase the target's hit points above half its maximum hit points.
      `,
      rank: 2,
      scaling: { special: "The healing increases by +1d for each rank beyond 2." },
      tags: [],
    },

    {
      name: "Greater Stabilize Life",

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\medrange.
        The target regains 4d10 + \\glossterm{power} \\glossterm{hit points}.
        This cannot increase the target's hit points above half its maximum hit points.
      `,
      rank: 6,
      scaling: { special: "The healing increases by +1d for each rank beyond 6." },
      tags: [],
    },

    {
      name: "Cone of Stabilization",

      effect: `
        Each \\glossterm{ally} in a \\medarea cone regains 1d10 + half \\glossterm{power} \\glossterm{hit points}.
        This cannot increase a target's hit points above half its maximum hit points.
      `,
      rank: 3,
      scaling: { special: "The healing increases by +1d for each rank beyond 2." },
      tags: [],
    },

    {
      name: "Greater Cone of Stabilization",

      effect: `
        Each \\glossterm{ally} in a \\largearea cone regains 4d8 + half \\glossterm{power} \\glossterm{hit points}.
        This cannot increase a target's hit points above half its maximum hit points.
      `,
      rank: 7,
      tags: [],
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
    },

    {
      name: "Inflict Wound",

      // +2 levels and half power for double HP loss? rank unclear
      attack: {
        hit: `The target takes 1d10 + half \\glossterm{power} energy damage.
        If the target would lose \\glossterm{hit points} from this damage, it loses twice that many hit points instead.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 2,
      scaling: "damage",
    },

    {
      name: "Greater Inflict Wound",

      attack: {
        crit: `Double damage.
        In addition, if the target did not already gain a \\glossterm{vital wound} from that loss of hit points, it gains a \\glossterm{vital wound}.`,
        hit: `The target takes 4d10 + half \\glossterm{power} energy damage.
        If the target would lose \\glossterm{hit points} from this damage, it loses twice that many hit points instead.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 6,
      scaling: "damage",
    },

    {
      name: "Steal Vitality",

      // +1 level for situational vital wound removal
      attack: {
        hit: `The target takes 4d8 + \\glossterm{power} energy damage.
        If it loses \\glossterm{hit points} from this damage, you can remove one of your vital wounds.
        When you do, you increase your \\glossterm{fatigue level} by three.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 5,
      scaling: "damage",
    },

    {
      name: "Vital Endurance",

      effect: `
        Whenever you gain a \\glossterm{vital wound}, you may choose to ignore its vital wound effect (see \\pcref{Vital Wounds}).
        You are still considered to have the vital wound, and it still provides the normal -2 penalty to future vital rolls.

        You can only ignore the effects of one of your vital wounds in this way.
        If you gain a new vital wound, you can choose to either ignore the new vital wound effect or continue ignoring the old vital wound effect.
        You can make this choice after learning the \\glossterm{vital roll} for the new vital wound.
      `,
      rank: 3,
      scaling: {
        5: `You can ignore two vital wound effects.`,
        7: `You can ignore three vital wound effects.`,
      },
      type: "Attune",
    },

    {
      name: "Mass Vital Endurance",

      functionsLike: {
        mass: true,
        name: "Vital Endurance",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: "Each target can ignore two vital wound effects.",
      },
      type: "Attune (target)",
    },

    {
      name: "Death Knell",

      // treat as r1 debuff? mostly useless against monsters
      // +1 level for situational +2 accuracy
      attack: {
        hit: `
          The target takes 1d8 + half \\glossterm{power} energy damage.
          If loses \\glossterm{hit points} from this damage, it becomes marked for death as a \\glossterm{condition}.
          While it is marked for death, it is unable to regain \\glossterm{hit points}, and it immediately dies from any vital wound that knocks it unconscious.
          % TODO: add generic rules so this isn't necessary to state explicitly
          Any ability that removes the condition and heals simultaneously, such as the \\ability{recover} ability, allows the creature to regain hit points from that ability normally.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
          This attack gains a +2 \\glossterm{accuracy} bonus against a creature with no remaining \\glossterm{damage resistance}.
        `,
      },

      rank: 2,
      scaling: "damage",
    },

    {
      name: "Greater Death Knell",

      // treat as r1 debuff? mostly useless against monsters
      // +1 level for situational +2 accuracy
      functionsLike: {
        name: "death knell",
        exceptThat: "the damage increases to 4d8 + \\glossterm{power} energy damage.",
      },
      rank: 2,
      scaling: "damage",
    },

    {
      name: "Circle of Death",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Fortitude against all living \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 3,
      scaling: "damage",
    },

    {
      name: "Greater Circle of Death",

      attack: {
        hit: `Each target takes 4d6 + half \\glossterm{power} energy damage.`,
        targeting: `
          Make an attack vs. Fortitude against all living \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 6,
      scaling: "damage",
    },

    {
      name: "Lifegift",

      effect: `
        You gain a +4 \\glossterm{magic bonus} to your maximum \\glossterm{hit points}.
        In addition, you immediately gain that many hit points.
        When this ability ends, you lose \\glossterm{hit points} equal to the number of hit points you gained this way.
      `,
      rank: 1,
      scaling: {
        3: "The bonus increases to +8.",
        5: "The bonus increases to +16.",
        7: "The bonus increases to +32.",
      },
      type: "Attune",
    },

    {
      name: "Mass Lifegift",

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
        Once per round, when you regain hit points, you may increase that healing by 3 hit points.
      `,
      rank: 2,
      scaling: {
        4: `The additional healing increases to 6.`,
        6: `The additional healing increases to 12.`,
      },
      type: "Attune",
    },

    {
      name: "Avasculate",

      // HP loss is treated as t3.5 debuff
      attack: {
        hit: `
          The target takes 2d10 energy damage.
          If it loses \\glossterm{hit points} from this damage, it also loses additional \\glossterm{hit points} equal to half its maximum hit points.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 7,
    },

    {
      name: "Corpse Explosion",

      attack: {
        hit: `Each target takes 1d8 + half \\glossterm{power} bludgeoning damage.`,
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
    },

    {
      name: "Greater Corpse Explosion",

      functionsLike: {
        name: 'corpse explosion',
        exceptThat: 'the damage increases to 4d6 + \\glossterm{power}.',
      },
      narrative: `
        You violently discharge the latent magical potential within a corpse, causing it to explode in a shower of guts and gore.
      `,
      rank: 6,
      scaling: "damage",
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
          Make an attack vs. Fortitude with a +3 bonus to \\glossterm{accuracy} against one living creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
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
        Make an attack vs. Mental with a +3 bonus to \\glossterm{accuracy} against one living creature within \\medrange.
        `,
      },

      rank: 3,
      scaling: "accuracy",
      tags: ["Curse"],
    },

    {
      name: "Retributive Lifebond",

      attack: {
        hit: `Each target takes 1d8 energy damage.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\medarea radius \\glossterm{emanation} from you causes you to lose \\glossterm{hit points}, make a \\glossterm{reactive attack} vs. Fortitude against them.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Attune (deep)",
    },

    {
      name: "Greater Retributive Lifebond",

      attack: {
        hit: `Each target takes 2d10 energy damage.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\largearea radius \\glossterm{emanation} from you causes you to lose \\glossterm{hit points}, make \\glossterm{reactive attack} vs. Fortitude against them.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Attune (deep)",
    },

    {
      name: "Supreme Retributive Lifebond",

      attack: {
        hit: `Each target takes 4d10 + half \\glossterm{power} energy damage.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\hugearea radius \\glossterm{emanation} from you causes you to lose \\glossterm{hit points}, make a \\glossterm{reactive attack} vs. Fortitude against them.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Attune (deep)",
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
      type: "Attune",
    },

    {
      name: "Lifesense",

      effect: `
        You gain \\trait{lifesense} with a 60 foot range, allowing you to sense the location of living creatures without light (see \\pcref{Lifesense}).
      `,
      rank: 1,
      scaling: {
        3: `The range increases to 120 feet.`,
        5: `The range increases to 240 feet.`,
        7: `The range increases to 480 feet.`,
      },
      type: "Attune",
    },
    {
      name: "Lifesight",

      effect: `
        You gain \\trait{lifesight} with a 30 foot range, allowing you to see living creatures without light (see \\pcref{Lifesight}).
      `,
      rank: 3,
      scaling: {
        5: `The range increases to 60 feet.`,
        7: `The range increases to 120 feet.`,
      },
      type: "Attune",
    },

    {
      name: "Mass Lifesense",

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
    },

    {
      name: "Reincarnation",

      castingTime: "24 hours",
      effect: `
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
      materialCost: true,
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
    },

    {
      name: "Resurrection",

      castingTime: "24 hours",
      effect: `
        Choose one intact corpse within \\shortrange.
        The corpse returns to life.
        It must not have died due to old age.

        The creature has no hit points or damage resistance when it returns to life.
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
      materialCost: true,
      rank: 4,
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
      materialCost: true,
      rank: 6,
      tags: ["Creation"],
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
      materialCost: true,
      rank: 7,
      tags: ["Creation"],
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
    },

    {
      name: "Animate Dead",

      castingTime: "one hour",
      effect: `
        Choose up to four corpses within \\shortrange.
        The combined levels of all targets cannot exceed your level.
        Each target becomes an undead creature that obeys your mental commands.

        You choose whether to create a skeleton or a zombie from each corpse.
        Creating a zombie require a mostly intact corpse, including most of the flesh.
        Creating a skeleton only requires a mostly intact skeleton.
        If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.

        As a \\glossterm{minor action}, you can mentally command your undead.
        The command must be no more than 10 words, and overly complex commands may cause strange and unintended behavior.
        It affects any undead you created with this ability that are within \\distrange of you.
        Undead will obey their most recent command indefinitely.
      `,
      materialCost: true,
      rank: 3,
      type: "Attune (deep)",
    },
  ],
};
