import { MysticSphere } from '.';
import { CONDITION_CRIT, MULTIHIT_CRIT } from './constants';

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
      name: 'Caustic Grasp',

      // baseline for grasp is dX+1. +2dr from extra defense, -2dr from next round damage
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damageranktwo{acid} damage immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude and Reflex against something you \\glossterm{touch}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Caustic Grasp',

      functionsLike: {
        name: 'caustic grasp',
        exceptThat: 'the damage increases to \\damagerankfive{acid}.',
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Poison -- Asp Venom',

      effect: `
        Choose one living creature within \\medrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by asp venom (see \\pcref{Poison}).
        The stage 1 effect makes the target \\stunned while the poison lasts.
        The stage 3 effect makes the target \\blinded while the poison lasts.
      `,
      rank: 1,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Giant Wasp Venom',

      // TODO: why does this have a +1 accuracy bonus?
      effect: `
        Choose one living creature within \\medrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by giant wasp venom (see \\pcref{Poison}).
        You gain a +1 accuracy bonus with the poison.
        The stage 1 effect makes the target \\slowed while the poison lasts.
        The stage 3 effect makes the target \\immobilized while the poison lasts.
      `,
      rank: 1,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Black Adder Venom',

      effect: `
        Choose one living creature within \\medrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by black adder venom (see \\pcref{Poison}).
        The poison inflicts 2d8 poison damage per \\glossterm{poison stage}.
      `,
      rank: 2,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Wyvern Venom',

      effect: `
        Choose one living creature within \\medrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by wyvern venom (see \\pcref{Poison}).
        The poison inflicts 3d8 poison damage per \\glossterm{poison stage}.
      `,
      rank: 3,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Blood Leech Venom',

      effect: `
        Choose one living creature within \\medrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by blood leech venom (see \\pcref{Poison}).
        The stage 1 effect makes the target \\vulnerable to all damage while the poison lasts.
      `,
      rank: 5,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Cockatrice Venom',

      effect: `
        Choose one living creature within \\medrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by cockatrice bile (see \\pcref{Poison}).
        The stage 1 effect makes the target \\slowed and \\stunned while the poison lasts.
        The stage 3 effect makes the target petrified while the poison lasts.
        This makes the target \\paralyzed, except that they remain standing in the form of a statue.
      `,
      rank: 5,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Jellyfish Extract',

      effect: `
        Choose one living creature within \\medrange.
        It becomes \\glossterm{poisoned} by jellyfish extract (see \\pcref{Poison}).
        The poison inflicts 1d6 poison damage per \\glossterm{poison stage}.
        The stage 3 effect also ends the poison.
      `,
      rank: 1,
      scaling: 'poison',
      tags: ['Manifestation'],
    },

    {
      name: 'Poison -- Dragon Bile',

      effect: `
        Choose one living creature within \\medrange.
        It becomes \\glossterm{poisoned} by dragon bile (see \\pcref{Poison}).
        The poison inflicts 3d8 poison damage per \\glossterm{poison stage}.
      `,
      rank: 5,
      scaling: 'poison',
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
        hit: `\\damagerankone{acid}.`,
        missGlance: true,
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
        hit: `\\damagerankfour{acid}.`,
        missGlance: true,
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
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone{acid} immediately, and again during your next action.
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
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfivehigh{acid} immediately, and again during your next action.
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
        You gain a +8 \\glossterm{enhancement bonus} to your \\glossterm{damage resistance}.
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
      name: 'Acid Pool',

      attack: {
        hit: `
          \\damagerankone{acid}.
        `,
        missGlance: true,
        targeting: `
          You create a pool of acid in a \\smallarea radius cylinder-shaped \\glossterm{zone} within \\shortrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Mighty Acid Pool',

      functionsLike: {
        name: 'acid pool',
        exceptThat: 'the damage increases to \\damagerankfive{acid}.',
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Acid Breath',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone{acid} immediately, and again during your next action.
        `,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe acid like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything in a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 4,
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
      rank: 7,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Acid Rain',

      // dX+1 for delay, +1dr for open area requirement
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankthree{acid} immediately, and again during your next action.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, you choose a \\medarea radius within \\shortrange.
          Acid rain appears high in the sky over that area, falling down towards it.
          During your next action, the rain falls in your chosen area, and you make an attack vs. Fortitude against everything in the area.
          If there is not at least fifty feet of open space above your chosen area, this spell fails with no effect.
          This attack does not damage any \\glossterm{walls} in the area.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Massive Acid Rain',

      functionsLike: {
        name: 'acid rain',
        exceptThat: 'it affects a \\largearea radius within \\longrange, and the damage increases to \\damageranksix{acid}.',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Healing Salve',

      effect: `
        Choose yourself or a living \\glossterm{ally} you \\glossterm{touch}.
        % d1
        The target regains 1d6 \\glossterm{hit points} +1 per 2 power and increases its \\glossterm{fatigue level} by one.
        In addition, it gains a +2 bonus to its Fortitude defense this round.
      `,
      rank: 1,
      scaling: { special: 'The healing increases by +1 for each rank beyond 1.' },
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
        The target increases its \\glossterm{fatigue level} by one if it removes a condition in this way.
      `,
      rank: 4,
    },
    {
      name: 'Terrifying Fungus',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target becomes covered in fear-inducing fungus as a \\glossterm{condition}.
          It is \\frightened of you and all other sources of fungus as a \\glossterm{condition}.

          The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{movement} to scrape off the fungus.
          Dropping \\prone as part of this action gives a +5 bonus to this check.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },
    {
      name: 'Devouring Fungus',

      attack: {
        crit: `All damage from the condition is doubled, not just the initial damage.`,
        hit: `
          The target becomes covered in devouring fungus as a \\glossterm{condition}.
          It takes \\damagerankone{acid} immediately and during each of your subsequent actions.

          The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{movement} to scrape off the fungus.
          Dropping \\prone as part of this action gives a +5 bonus to this check.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Mighty Devouring Fungus',

      functionsLike: {
        name: "fungal growth",
        exceptThat: "the damage increases to \\damagerankfour{acid}.",
      },
      rank: 5,
      scaling: 'accuracy',
    },
  ],
  rituals: [],
};
