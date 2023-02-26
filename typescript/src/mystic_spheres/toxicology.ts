import { MysticSphere } from '.';

export const toxicology: MysticSphere = {
  name: 'Toxicology',
  shortDescription: 'Create and manipulate poisons, acids, and fungi.',
  sources: ['arcane', 'nature', 'pact'],

  cantrips: [
    {
      name: 'Intensify Poison',

      attack: {
        crit: `As above, except that the poison progresses by two stages instead of one.`,
        hit: `Choose a poison affecting the target.
        The poison progresses by one stage against the target, which can have varying effects depending on the poison (see \\pcref{Poison}).`,
        targeting: `
        Make an attack vs. Fortitude with a +4 \\glossterm{accuracy} bonus against one living creature within \\medrange.
        If the target is not currently poisoned, this ability has no effect.
        `,
      },
      scaling: 'accuracy',
    },

    {
      name: 'Neutralize Poison',

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
    },
  ],
  spells: [
    {
      name: 'Corrosive Grasp',

      attack: {
        hit: `
          The target takes \\damageranktwo{acid} damage immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Corrosive Grasp',

      attack: {
        hit: `
          The target takes \\damagerankfive{acid} immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Poison -- Asp Venom',

      attack: {
        crit: `The poison immediately reaches an extra \\glossterm{poison stage}.`,
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by asp venom (see \\pcref{Poison}).
          The stage 1 effect makes the target \\stunned while the poison lasts.
          The stage 3 effect makes the target \\blinded while the poison lasts.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Giant Wasp Venom',

      attack: {
        crit: `The poison immediately reaches an extra \\glossterm{poison stage}.`,
        hit: `
          If the target has no remaining damage resistance, it becomes \\glossterm{poisoned} by giant wasp venom (see \\pcref{Poison}).
          The stage 1 effect makes the target \\slowed while the poison lasts.
          The stage 3 effect makes the target \\immobilized while the poison lasts.
        `,
        targeting: `
          Make an attack vs. Fortitude with a +1 accuracy bonus against one living creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Black Adder Venom',

      attack: {
        crit: `The poison immediately reaches an extra \\glossterm{poison stage}.`,
        hit: `
          If the target has no remaining damage resistance, it becomes \\glossterm{poisoned} by black adder venom (see \\pcref{Poison}).
          The stage 1 effect inflicts 2d8 damage each time the poison's attack succeeds.
        `,
        targeting: `
          Make an attack vs. Fortitude with a +1 accuracy bonus against one living creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Wyvern Venom',

      attack: {
        crit: `The poison immediately reaches an extra \\glossterm{poison stage}.`,
        hit: `
          If the target has no remaining damage resistance, it becomes \\glossterm{poisoned} by wyvern venom (see \\pcref{Poison}).
          The stage 1 effect inflicts 3d8 damage each time the poison's attack succeeds.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Blood Leech Venom',

      attack: {
        crit: `The poison immediately reaches an extra \\glossterm{poison stage}.`,
        hit: `
          If the target has no remaining damage resistance, it becomes \\glossterm{poisoned} by blood leech venom (see \\pcref{Poison}).
          The stage 1 effect makes the target \\vulnerable to all damage while the poison lasts.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Cockatrice Venom',

      attack: {
        crit: `The poison immediately reaches an extra \\glossterm{poison stage}.`,
        hit: `
          If the target has no remaining damage resistance, it becomes \\glossterm{poisoned} by cockatrice bile (see \\pcref{Poison}).
          The stage 1 effect makes the target \\slowed and \\stunned while the poison lasts.
          The stage 3 effect makes the target \\petrified while the poison lasts.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Jellyfish Extract',

      attack: {
        crit: `The poison immediately reaches an extra \\glossterm{poison stage}.`,
        hit: `
          The target becomes \\glossterm{poisoned} by jellyfish extract (see \\pcref{Poison}).
          The stage 1 effect inflicts 1d6 damage each time the poison's attack succeeds.
          The stage 3 effect also ends the poison.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },

      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Dragon Bile',

      attack: {
        crit: `The poison immediately reaches an extra \\glossterm{poison stage}.`,
        hit: `
          The target becomes \\glossterm{poisoned} with dragon bile (see \\pcref{Poison}).
          The stage 1 effect inflicts 3d8 damage each time the poison's attack succeeds.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },

      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison Transferance',

      attack: {
        crit: `As above, except that the primary target gains two successes to resist its poison.
        In addition, the secondary target immediately reaches the poison's second poison stage.`,
        hit: `The chosen creature gains an additional success to resist a poison currently affecting it.
        In addition, the struck creature becomes \\glossterm{poisoned} by that same poison, and immediately suffers the effect of the poison's first \\glossterm{poison stage}.`,
        targeting: `
          Choose yourself or one \\glossterm{ally} within \\medrange that is currently affected by a poison.
          In addition, make an attack vs. Fortitude against one other creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Poison Immunity',

      effect: `
        You become \\glossterm{immune} to \\glossterm{poisons}.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Acidic Blood',

      attack: {
        hit: `Each target takes \\damagerankone{acid}.`,
        targeting: `
          Once per round, when you lose \\glossterm{hit points} during the \\glossterm{action phase}, make a \\glossterm{reactive attack} vs. Reflex against everything adjacent to you.
        `,
      },
      narrative: `
        Your blood becomes acidic.
        This does not harm you, but your blood can be dangerous to anything nearby when you bleed.
      `,
      rank: 1,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Acidic Blood',

      attack: {
        hit: `Each target takes \\damagerankfour{acid}.`,
        targeting: `
          Once per round, when you lose \\glossterm{hit points} during the \\glossterm{action phase}, make a \\glossterm{reactive attack} vs. Reflex against all \\glossterm{enemies} in a \\smallarea radius from you.
        `,
      },
      narrative: `
        Your blood becomes acidic.
        This does not harm you, but your blood can be dangerous to your enemies when you bleed.
      `,
      rank: 5,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Sudden Rot',

      attack: {
        hit: `
          The target takes \\damagerankone{acid} immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Mighty Sudden Rot',

      attack: {
        hit: `
          The target takes \\damagerankfive{acid} immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Fungal Armor',

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
      type: 'Attune',
    },

    {
      name: 'Acid Bath',

      attack: {
        hit: `
          The target takes \\damagerankthreehigh{acid} immediately, and again during your next action.
          If takes a \\glossterm{vital wound} from this damage that leaves it unconscious, it immediately dies.
          The target's body is completely dissolved by acid, leaving behind only a splash of black sludge.
          Its equipment is unaffected.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Acid Breath',

      attack: {
        hit: `Each target takes \\damageranktwo{acid}.`,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe acid like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything in a \\medarea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Mighty Acid Breath',

      functionsLike: {
        name: 'acid breath',
        exceptThat: `
          the damage increases to \\damagerankfive{acid}.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Acid Rain',

      attack: {
        hit: `Each target takes \\damagerankone{acid}.`,
        missGlance: true,
        targeting: `
          You create an acidic rain in a \\areasmall radius cylinder-shaped \\glossterm{zone} around you.
          When you cast this spell, and during your next action, make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Distant Acid Rain',

      attack: {
        hit: `Each target takes \\damagerankthree{acid}.`,
        missGlance: true,
        targeting: `
          You create an acidic rain in a \\areasmall radius cylinder-shaped \\glossterm{zone} within \\medrange.
          When you cast this spell, and during your next action, make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Massive Acid Rain',

      attack: {
        // Unclear damage
        hit: `Each target takes \\damagerankfourhigh{acid}.`,
        missGlance: true,
        targeting: `
          You create an acidic rain in a \\largearea radius cylinder-shaped \\glossterm{zone} around you.
          When you cast this spell, and during your next action, make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Healing Salve',

      effect: `
        Choose yourself or a living \\glossterm{ally} you \\glossterm{touch}.
        % d1
        The target regains 1d6 \\glossterm{hit points} +1d per 2 power and increases its \\glossterm{fatigue level} by one.
        In addition, it gains a +2 bonus to its Fortitude defense this round.
      `,
      rank: 1,
      scaling: { special: 'The healing increases by +1d for each rank beyond 1.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Healing Salve',

      functionsLike: {
        name: 'healing salve',
        exceptThat: 'the healing increases to 2d6 plus 1d6 per 3 power, and the Fortitude bonus increases to +4.',
      },
      rank: 5,
      scaling: { special: 'The healing increases by 1d6 for each rank beyond 5.' },
      tags: ['Swift'],
    },

    {
      name: 'Cleansing Draught',

      effect: `
        You or a living \\glossterm{ally} you \\glossterm{touch} can remove a \\glossterm{condition}.
      `,
      rank: 4,
    },
    {
      name: 'Fungal Growth',

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `The target becomes covered in devouring fungus as a \\glossterm{condition}.
        It takes \\damagerankone{acid} immediately and during each of your subsequent actions.

        The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{movement} to scrape off the fungus.
        Dropping \\prone as part of this action gives a +5 bonus to this check.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },
    {
      name: 'Greater Fungal Growth',

      functionsLike: {
        name: "fungal growth",
        exceptThat: "the damage increases to \\damagerankfourlow{acid}, and the condition cannot be removed with a Dexterity check.",
      },
      rank: 5,
      scaling: 'accuracy',
    },
  ],
  rituals: [],
};
