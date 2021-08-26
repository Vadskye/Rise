import { MysticSphere } from ".";

export const toxicology: MysticSphere = {
  name: "Toxicology",
  shortDescription: "Create and manipulate poisons and acids.",
  sources: ["arcane", "nature", "pact"],

  cantrips: [
    {
      name: "Intensify Poison",

      attack: {
        crit: `As above, except that the poison progresses by two stages instead of one.`,
        hit: `Choose a poison affecting the subject.
        The poison progresses by one stage against the subject, which can have varying effects depending on the poison (see \\pcref{Poison}).`,
        targeting: `
        Make an attack vs. Fortitude with a +4 \\glossterm{accuracy} bonus against one living creature within \\medrange.
        If the subject is not currently poisoned, this ability has no effect.
        `,
      },
      focus: false,
      scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Neutralize Poison",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\shortrange.
        The subject gains an additional success to resist a poison currently affecting it (see \\pcref{Poison}).
      `,
      focus: false,
      scaling: {
        2: `The number of additional successes increases to two.
            The subject can split these successes among any number of different poisons affecting it.`,
        4: `The number of additional successes increases to three.`,
        6: `The range increases to \\medrange.`,
      },
      type: "Instant",
    },
  ],
  spells: [
    {
      name: "Corrosive Grasp",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} acid damage.`,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      focus: false,
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Corrosive Grasp",

      attack: {
        glance: "Half damage.",
        hit: `
          The subject takes 2d8 + \\glossterm{power} acid damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{briefly} \\sickened.
        `,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      focus: false,
      rank: 3,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Supreme Corrosive Grasp",

      functionsLike: {
        name: 'greater corrosive grasp',
        exceptThat: 'the damage increases to 4d10 + \\glossterm{power} damage, and the subject is \\nauseated instead of slowed.',
      },
      focus: false,
      rank: 7,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Poison -- Asp Venom",

      attack: {
        crit: `The target immediately reaches the second \\glossterm{poison stage}, as normal for poisons.`,
        hit: `The subject becomes \\glossterm{poisoned} by the first \\glossterm{poison stage} of asp venom.
        At the end of each subsequent round, you repeat this attack, as normal for poisons (see \\pcref{Poison}).
        A creature poisoned by asp venom becomes \\sickened as long as it is poisoned.
        Reaching the third \\glossterm{poison stage} causes the subject to become \\nauseated as long as it is poisoned.
        A third failed attack ends the poison.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Poison -- Dragon Bile",

      attack: {
        crit: `The target immediately reaches the second \\glossterm{poison stage}, as normal for poisons.`,
        hit: `The subject becomes \\glossterm{poisoned} with dragon bile.
        At the end of each subsequent round, you repeat this attack, as normal for poisons.
        For each \\glossterm{poison stage}, including the initial stage, the subject takes 1d10 physical damage.
        A third failed attack ends the poison.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\longrange.
        `,
      },

      rank: 3,
      scaling: {
        special: "The hit point loss from the poison increases by +1d for each rank beyond 3.",
      },
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Poison Transferance",

      attack: {
        crit: `As above, except that the primary target gains two successes to resist its poison.
        In addition, the secondary target immediately reaches the poison's second poison stage.`,
        // No glance effect; weird shenanigans if you autoremove the poison.
        hit: `The chosen creature gains an additional success to resist a poison currently affecting it.
        In addition, the struck creature becomes \\glossterm{poisoned} by that same poison, and immediately suffers the effect of the poison's first \\glossterm{poison stage}.`,
        targeting: `
          Choose yourself or one \\glossterm{ally} within \\medrange that is currently affected by a poison.
          In addition, make an attack vs. Fortitude against one other creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Poison Immunity",

      effect: `
        You become immune to all \\glossterm{poisons}.
        You stop being poisoned by any poisons currently affecting you, and new poisons cannot be applied to you.
      `,
      rank: 4,
      scaling: { 6: `You can cast this spell as a \\glossterm{minor action}.` },
      type: "Attune (self)",
    },

    {
      name: "Acidic Blood",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d6 acid damage.`,
        targeting: `
          At the end of each round, if you lost \\glossterm{hit points} during that round, make an attack vs. Fortitude against everything adjacent to you.
        `,
      },
      narrative: `
        Your blood becomes acidic.
        This does not harm you, but your blood can be dangerous to anything nearby when you bleed.
      `,
      rank: 3,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Sickness",

      attack: {
        crit: `The subject is \\nauseated instead of sickened.`,
        hit: `The subject is \\sickened as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },

      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Sickening Curse",

      attack: {
        crit: `The effect lasts until this curse is removed.`,
        glance: "The effect lasts \\glossterm{briefly}.",
        hit: `The subject is \\sickened until it takes a \\glossterm{short rest}.`,
        targeting: `
          Make an attack vs. Mental against one living creature within \\medrange.
        `,
      },

      rank: 3,
      scaling: "accuracy",
      tags: ["Curse"],
      type: "Duration",
    },

    {
      name: "Nauseating Curse",

      functionsLike: {
        name: 'sickening curse',
        exceptThat: 'the subject is \\nauseated instead of sickened.',
      },
      rank: 7,
      scaling: "accuracy",
      tags: ["Curse"],
      type: "Duration",
    },

    {
      name: "Acid Splash",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Acid Bath",

      attack: {
        hit: `
          The subject takes 4d8 + \\glossterm{power} acid damage.
          In addition, if the subject has no hit points remaining at the end of the current \\glossterm{phase}, it dies.
          Its body is completely dissolved by acid, leaving behind only a splash of black sludge.
          Its equipment is unaffected.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Acid Bath",

      attack: {
        hit: `
          The subject takes 7d10 + \\glossterm{power} acid damage.
          In addition, if the subject has no hit points remaining at the end of the current \\glossterm{phase}, it dies.
          Its body is completely dissolved by acid, leaving behind only a splash of black sludge.
          Its equipment is unaffected.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },
      rank: 7,
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Acid Arrow",

      attack: {
        hit: `The subject takes 2d8 + \\glossterm{power} acid damage.`,
        glance: "Half damage.",
        targeting: `
          Make an attack vs. Fortitude against anything within \\distrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Acid Arrow",

      attack: {
        hit: `The subject takes 4d10 + \\glossterm{power} acid damage.`,
        glance: "Half damage.",
        targeting: `
          Make an attack vs. Fortitude against anything within \\extrange.
        `,
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Acid Spray",

      attack: {
        hit: `Each subject takes 1d8 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Acid Spray",

      attack: {
        hit: `Each subject takes 2d10 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarea cone from you.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Supreme Acid Spray",

      attack: {
        hit: `Each subject takes 4d10 + \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\largearea cone from you.
        `,
      },
      rank: 7,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Acid Breath",

      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} acid damage.`,
        targeting: `
          For the duration of this spell, you can breathe acid like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything in a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Greater Acid Breath",

      castingTime: "minor action",
      functionsLike: {
        name: 'acid breath',
        exceptThat: `
          the damage increases to 5d10 + half \\glossterm{power}.
          In addition, the area increases to a \\hugearea cone.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Corrosive Splash",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 4d6 + \\glossterm{power} acid damage.
        This attack deals double damage to objects.`,
        targeting: `
        Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },

      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Acid Rain",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\areasmall radius, 30 ft.\\ high cylinder within \\medrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Acid Rain",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 4d8 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\arealarge radius, 30 ft.\\ high cylinder within \\longrange.
        `,
      },
      rank: 7,
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Acid Orb",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d6 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\areasmall radius within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Acid Orb",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 4d8 + half \\glossterm{power} acid damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\areamed radius within \\medrange.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Healing Salve",

      effect: `
        Choose yourself or one \\glossterm{ally} within your \\glossterm{reach}.
        The subject regains 1d10 + \\glossterm{power} \\glossterm{hit points}.
        After you use this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Healing} ability.
      `,
      rank: 2,
      scaling: { special: "The healing increases by +1d for each rank beyond 2." },
      tags: ['Healing'],
      type: "Instant",
    },

    {
      name: "Greater Healing Salve",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\shortrange.
        The subject regains 4d6 + \\glossterm{power} \\glossterm{hit points}.
        After you use this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Healing} ability.
      `,
      rank: 5,
      scaling: { special: "The healing increases by +1d for each rank beyond 5." },
      tags: ['Healing'],
      type: "Instant",
    },

    {
      name: "Cleansing Draught",

      effect: `
        You or one \\glossterm{ally} within your \\glossterm{reach} can remove a \\glossterm{brief} effect or \\glossterm{condition}.
        This cannot remove an effect applied during the current round.
      `,
      rank: 4,
      scaling: {
        6: `The subject can remove two effects.`,
      },
      type: "Instant",
    },
    {
      name: "Acid Soak",

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `The subject becomes drenched in acid as a \\glossterm{condition}.
        At the end of each round, it takes 1d6 acid damage.

        The condition can be removed if the subject makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{move action} to scrape off the acid.
        Dropping \\prone as part of this action gives a +5 bonus to this check.`,
        targeting: `
          Make an attack vs. Reflex against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Duration",
    },
    {
      name: "Greater Acid Soak",

      attack: {
        crit: `The damage from the condition is doubled.`,
        glance:
          "The effect lasts \\glossterm{briefly}. The subject still takes damage during the next round.",
        hit: `
          The subject becomes drenched in acid as a \\glossterm{condition}.
          At the end of each round, it takes 2d10 + half \\glossterm{power} acid damage.
        `,
        targeting: `
          Make an attack vs. Reflex against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Duration",
    },
  ],
  rituals: [],
};
