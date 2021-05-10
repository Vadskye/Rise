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
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The subject gains an additional success to resist a poison currently affecting it (see \\pcref{Poison}).
      `,
      focus: false,
      scaling: {
        3: `The number of additional successes increases to two.
            The subject can split these successes among any number of different poisons affecting it.`,
        5: `The number of additional successes increases to three.`,
        7: `The number of additional successes increases to four.`,
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
          The subject takes 2d10 + \\glossterm{power} acid damage.
          If it loses \\glossterm{hit points} from this damage, it is \\sickened as a \\glossterm{condition}.
        `,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      focus: false,
      rank: 4,
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
          Make an attack vs. Fortitude against one living creature within \\medrange.
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
        Make an attack vs. Fortitude against one living creature within \\shortrange.
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
        glance: "The effect lasts until the end of the next round.",
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
        hit: `The subject takes 6d10 + \\glossterm{power} acid damage.`,
        glance: "Half damage.",
        targeting: `
          Make an attack vs. Fortitude against anything within \\distrange.
        `,
      },
      rank: 7,
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
      name: "Acid Breath",

      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} acid damage.`,
        targeting: `
          For the duration of this spell, you can breathe acid like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything in a \\largearea cone from you.
          After you use this ability, you cannot use it again until after the end of the next round.
        `,
      },
      rank: 3,
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
      name: "Healing Salve",

      effect: `
        Choose yourself or one \\glossterm{ally} within your \\glossterm{reach}.
        The subject regains 1d10 + \\glossterm{power} \\glossterm{hit points}.
        After you use this ability, you cannot use it or any other \\abilitytag{Healing} ability until after the end of the next round.
      `,
      rank: 2,
      scaling: { special: "The healing increases by +1d for each rank beyond 2." },
      tags: ['Healing'],
      type: "Instant",
    },
  ],
  rituals: [],
};
