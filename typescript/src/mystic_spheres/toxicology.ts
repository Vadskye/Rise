import { MysticSphere } from ".";

export const toxicology: MysticSphere = {
  name: "Toxicology",
  shortDescription: "Create and manipulate poisons, acids, and fungi.",
  sources: ["arcane", "nature", "pact"],

  cantrips: [
    {
      name: "Intensify Poison",

      attack: {
        crit: `As above, except that the poison progresses by two stages instead of one.`,
        hit: `Choose a poison affecting the target.
        The poison progresses by one stage against the target, which can have varying effects depending on the poison (see \\pcref{Poison}).`,
        targeting: `
        Make an attack vs. Fortitude with a +4 \\glossterm{accuracy} bonus against one living creature within \\medrange.
        If the target is not currently poisoned, this ability has no effect.
        `,
      },
      scaling: "accuracy",
      type: "Instant",
    },

    {
      name: "Neutralize Poison",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\shortrange.
        The target gains an additional success to resist a poison currently affecting it (see \\pcref{Poison}).
      `,
      scaling: {
        2: `The number of additional successes increases to two.
            The target can split these successes among any number of different poisons affecting it.`,
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
        hit: `The target takes 1d8 + \\glossterm{power} acid damage.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Corrosive Grasp",

      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} acid damage.
          If it loses \\glossterm{hit points} from this damage, it is \\dazed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Supreme Corrosive Grasp",

      functionsLike: {
        name: 'greater corrosive grasp',
        exceptThat: 'the damage increases to 4d6 + \\glossterm{power} damage, and the target is \\stunned instead of dazed.',
      },
      rank: 6,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Poison -- Asp Venom",

      attack: {
        crit: `The target immediately reaches the second \\glossterm{poison stage}, as normal for poisons.`,
        // No relevant glance effect
        hit: `The target becomes \\glossterm{poisoned} by the first \\glossterm{poison stage} of asp venom.
        At the end of each subsequent round, you repeat this attack, as normal for poisons (see \\pcref{Poison}).
        A creature poisoned by asp venom becomes \\dazed as long as it is poisoned.
        Reaching the third \\glossterm{poison stage} causes the target to become \\stunned as long as it is poisoned.
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
        hit: `The target becomes \\glossterm{poisoned} with dragon bile.
        At the end of each subsequent round, you repeat this attack, as normal for poisons.
        For each \\glossterm{poison stage}, including the initial stage, the target takes 1d8 physical damage.
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
        hit: `Each target takes 1d10 acid damage.`,
        targeting: `
          At the end of each phase, if you lost \\glossterm{hit points} during that phase, make an attack vs. Reflex against everything adjacent to you.
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
        crit: `The target is \\stunned instead of dazed.`,
        hit: `The target is \\dazed as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },

      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Noxious Curse",

      attack: {
        crit: `The effect lasts until this curse is removed.`,
        hit: `The target is \\dazed until it takes a \\glossterm{short rest}.`,
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
      name: "Greater Noxious Curse",

      functionsLike: {
        name: 'noxious curse',
        exceptThat: 'the target is \\stunned instead of dazed.',
      },
      rank: 7,
      scaling: "accuracy",
      tags: ["Curse"],
      type: "Duration",
    },

    {
      name: "Sudden Rot",

      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} acid damage.
          This damage is doubled if the target is an object that is not primarily made of metal.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: [],
      type: "Instant",
    },

    {
      name: 'Fungal Armor',

      castingTime: 'minor action',
      effect: `
        You gain a +8 \\glossterm{magic bonus} to your \\glossterm{damage resistance}.
        However, you take a -4 penalty to your \\glossterm{hit points}.
      `,

      rank: 1,
      scaling: {
        3: `The bonus increases to +16, but the penalty increases to -8.`,
        5: `The bonus increases to +32, but the penalty increases to -16.`,
        7: `The bonus increases to +64, but the penalty increases to -32.`,
      },
      type: 'Attune (self)',
    },

    {
      name: "Acid Bath",

      attack: {
        hit: `
          The target takes 4d6 + \\glossterm{power} acid damage.
          In addition, if the target is unconscious from vital wounds at the end of the current \\glossterm{phase}, it dies.
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
          The target takes 6d10 + \\glossterm{power} acid damage.
          In addition, if the target is unconscious from vital wounds at the end of the current \\glossterm{phase}, it dies.
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
        hit: `The target takes 2d6 + \\glossterm{power} acid damage.`,
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
        hit: `The target takes 4d8 + \\glossterm{power} acid damage.`,
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
      name: "Acid Breath",

      castingTime: "minor action",
      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} acid damage.`,
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
          the damage increases to 4d10 + half \\glossterm{power}.
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
        hit: `The target takes 2d10 + \\glossterm{power} acid damage.
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
        hit: `Each target takes 2d6 + half \\glossterm{power} acid damage.`,
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
        hit: `Each target takes 4d6 + half \\glossterm{power} acid damage.`,
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
        hit: `Each target takes 1d10 + half \\glossterm{power} acid damage.`,
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
        hit: `Each target takes 4d6 + half \\glossterm{power} acid damage.`,
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
        Choose yourself or a living \\glossterm{ally} within your \\glossterm{reach}.
        The target regains 1d8 + \\glossterm{power} \\glossterm{hit points} and increases its \\glossterm{fatigue level} by one.
        In addition, it \\glossterm{briefly} gains a +2 bonus to its Fortitude defense.
      `,
      rank: 1,
      scaling: { special: "The healing increases by +1d for each rank beyond 1." },
      type: "Duration",
    },

    {
      name: "Greater Healing Salve",

      functionsLike: {
        name: "healing salve",
        exceptThat: "The healing increases to 2d10, and the Fortitude bonus increases to +3.",
      },
      rank: 4,
      scaling: { special: "The healing increases by +1d for each rank beyond 4." },
      type: "Duration",
    },

    {
      name: "Supreme Healing Salve",

      functionsLike: {
        name: "healing salve",
        exceptThat: "The healing increases to 5d10, and the Fortitude bonus increases to +3.",
      },
      rank: 7,
      type: "Duration",
    },

    {
      name: "Cleansing Draught",

      effect: `
        You or one \\glossterm{ally} within your \\glossterm{reach} can remove a \\glossterm{condition}.
        This cannot remove an effect applied during the current round.
      `,
      rank: 4,
      scaling: {
        6: `The target can remove two effects.`,
      },
      type: "Instant",
    },
    {
      name: "Fungal Growth",

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `The target becomes covered in devouring fungus as a \\glossterm{condition}.
        At the end of each round, it takes 1d4 + half \\glossterm{power} acid damage.

        The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{move action} to scrape off the fungus.
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
      name: "Greater Fungal Growth",

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `
          The target becomes covered in devouring fungus as a \\glossterm{condition}.
          At the end of each round, it takes 2d6 + half \\glossterm{power} acid damage.
        `,
        targeting: `
          Make an attack vs. Reflex against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: 'Retributive Spores',

      // original targets: ['Yourself', 'See text']
      castingTime: 'minor action',
      attack: {
        // AOE dice, no power
        hit: `Each target takes 1d10 acid damage.`,
        targeting: `
          At the end of each phase, make an attack vs. Fortitude against each creature that made a \\glossterm{melee} attack against you using a free hand or non-Long weapon during that phase.
        `,
      },
      narrative: `
        You constantly shed spores that dissolve creatures who attack you.
      `,
      rank: 3,
      scaling: 'damage',
      type: 'Attune (self)',
    },

    {
      name: 'Greater Retributive Spores',

      // original targets: ['Yourself', 'See text']
      castingTime: 'minor action',
      attack: {
        // AOE dice, no power
        hit: `Each target takes 4d8 + half \\glossterm{power} acid damage.`,
        targeting: `
          At the end of each phase, make an attack vs. Fortitude against each creature that made a \\glossterm{melee} attack against you using a free hand or non-Long weapon during that phase.
        `,
      },
      narrative: `
        You constantly shed spores that dissolve creatures who attack you.
      `,
      rank: 7,
      type: 'Attune (self)',
    },
  ],
  rituals: [],
};
