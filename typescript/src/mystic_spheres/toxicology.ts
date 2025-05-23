import { MysticSphere } from '.';
import { CONDITION_CRIT, MULTIHIT_CRIT } from './constants';

export const toxicology: MysticSphere = {
  name: 'Toxicology',
  shortDescription: 'Create and manipulate poisons, acids, and fungi.',
  sources: ['arcane', 'nature'],
  // The baseline for an injury poison is one rank higher than a standard "if no dr"
  // spell, because you can keep attacking until they are eventually affectd.

  cantrips: [
    {
      name: 'Detect Poison',

      castingTime: 'one minute',
      effect: `
          Choose a \\arealarge cone from you.
          You identify the presence or absence of any poisoned, poisonous, or venomous creatures and objects in the area.
          This does not provide any other information, such as location or type of poison.
      `,
      scaling: {
        2: `
          You also learn the number of poisons in the area.
        `,
        4: 'You also learn the location of each poison in the area.',
        6: `This ability can be used as a \\glossterm{minor action}.`,
      },
      tags: ['Detection'],
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

      // Baseline for melee range is dr3, which is 4.5 + 1dpp.
      // Double dr1 is 7 + 1dpp.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone damage immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Acid'],
    },

    {
      name: 'Mighty Caustic Grasp',

      functionsLike: {
        name: 'caustic grasp',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Acid'],
    },

    {
      name: 'Intensify Poison',

      attack: {
        crit: `As above, except that the poison progresses by two stages instead of one.`,
        hit: `
          Choose a poison affecting the target.
          The poison immediately progresses by one stage against the target, which can have varying effects depending on the poison (see \\pcref{Poison}).
          In addition, that poison gains a +4 accuracy bonus on all of its future attack rolls against the target until it is removed.
        `,
        targeting: `
          Make an attack vs. Fortitude with a +4 \\glossterm{accuracy} bonus against one living creature within \\medrange.
          If the target is not currently poisoned, this ability has no effect.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Poison'],
    },

    {
      name: 'Poison -- Asp Venom',

      effect: `
        Choose one living creature within \\shortrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by asp venom (see \\pcref{Poison}).
        The stage 1 effect makes the target \\stunned while the poison lasts.
      `,
      rank: 1,
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Giant Wasp Venom',

      effect: `
        Choose one living creature within \\shortrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by giant wasp venom (see \\pcref{Poison}).
        The stage 1 effect makes the target \\slowed while the poison lasts.
        The stage 3 effect also deals \damagerankthreelow.
      `,
      rank: 2,
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Black Adder Venom',

      effect: `
        Choose one living creature within \\shortrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by black adder venom (see \\pcref{Poison}).
        The poison inflicts \\damagerankfourlow damage per \\glossterm{poison stage}.
      `,
      rank: 2,
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Wyvern Venom',

      effect: `
        Choose one living creature within \\shortrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by wyvern venom (see \\pcref{Poison}).
        You gain a +1 accuracy bonus with the poison.
        The poison inflicts \\damagerankfivelow damage per \\glossterm{poison stage}.
        The stage 3 effect also ends the poison.
      `,
      rank: 3,
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Blood Leech Venom',

      effect: `
        Choose one living creature within \\shortrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by blood leech venom (see \\pcref{Poison}).
        The poison's stage 1 effect makes the target \\vulnerable to all damage while the poison lasts.
      `,
      rank: 5,
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Purple Worm Venom',

      effect: `
        Choose one living creature within \\shortrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by wyvern venom (see \\pcref{Poison}).
        The poison inflicts \\damageranksevenlow damage per \\glossterm{poison stage}.
      `,
      rank: 5,
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Cockatrice Venom',

      effect: `
        Choose one living creature within \\shortrange.
        If the target has no remaining \\glossterm{damage resistance}, it becomes \\glossterm{poisoned} by cockatrice venom (see \\pcref{Poison}).
        You gain a +1 accuracy bonus with the poison.
        The stage 1 effect makes the target \\slowed and \\stunned while the poison lasts.
        The stage 3 effect makes the target petrified while the poison lasts.
        This makes the target \\paralyzed, except that they remain standing in the form of a statue.
      `,
      rank: 7,
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Jellyfish Extract',

      effect: `
        Choose one living creature within \\shortrange.
        It becomes \\glossterm{poisoned} by jellyfish extract (see \\pcref{Poison}).
        The poison inflicts \\damagerankzerolow damage per \\glossterm{poison stage}.
        The stage 3 effect also ends the poison.
      `,
      rank: 1,
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Dragon Bile',

      effect: `
        Choose one living creature within \\shortrange.
        It becomes \\glossterm{poisoned} by dragon bile (see \\pcref{Poison}).
        The poison inflicts \\damagerankthreelow damage per \\glossterm{poison stage}.
        The stage 3 effect also ends the poison.
      `,
      rank: 4,
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
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
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison Immunity',

      effect: `
        You become \\glossterm{immune} to \\glossterm{poisons}.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Acidic Blood',

      attack: {
        hit: `\\damagerankone.`,
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
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Acid'],
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Acidic Blood',

      attack: {
        hit: `\\damagerankfour.`,
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
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Acid'],
      type: 'Attune (deep)',
    },

    {
      name: 'Sudden Rot',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Acid'],
    },

    {
      name: 'Mighty Sudden Rot',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfive immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Acid'],
    },

    {
      name: 'Fungal Armor',

      effect: `
        You gain a +8 \\glossterm{enhancement bonus} to your maximum \\glossterm{damage resistance}.
        However, you take a -4 penalty to your \\glossterm{hit points}.
      `,
      rank: 1,
      roles: ['attune'],
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
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          You create a pool of acid in a \\smallarea radius cylinder-shaped \\glossterm{zone} within \\shortrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Acid', 'Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Mighty Acid Pool',

      functionsLike: {
        name: 'acid pool',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Acid', 'Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Acid Breath',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone immediately, and again during your next action.
        `,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe acid like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything in a \\largearea cone from you.
          After you use breathe acid, you \\glossterm{briefly} cannot do so again.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Acid'],
      type: 'Attune',
    },

    {
      name: 'Mighty Acid Breath',

      functionsLike: {
        name: 'acid breath',
        exceptThat: `
          the damage increases to \\damagerankfive.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Acid'],
      type: 'Attune',
    },

    {
      name: 'Acid Rain',

      // dX+1 for delay, +1dr for open area requirement
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankthree immediately, and again during your next action.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, you choose a \\medarea radius within \\shortrange.
          Acid rain appears high in the sky over that area, falling down towards it.
          During your next action, the rain falls in your chosen area, and you make an attack vs. Fortitude against everything in the area.
          If there is not at least fifty feet of open space above your chosen area, this spell fails with no effect.
          This attack does not damage thin \\glossterm{walls} in the area.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Acid', 'Manifestation'],
    },

    {
      name: 'Massive Acid Rain',

      functionsLike: {
        name: 'acid rain',
        exceptThat:
          'it affects a \\largearea radius within \\longrange, and the damage increases to \\damageranksix.',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Acid', 'Manifestation'],
    },

    {
      name: 'Healing Salve',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // Stronger secondary effect due to touch range
      effect: `
        Choose yourself or a living \\glossterm{ally} you \\glossterm{touch}.
        The target regains 2d6 hit points.
        In addition, it gains a +2 bonus to its Fortitude defense and \\glossterm{vital rolls} this round.
      `,
      rank: 1,
      scaling: { special: 'The healing increases by 1d6 for each rank beyond 1.' },
      tags: ['Swift'],
    },

    {
      name: 'Bitter Remedy',

      cost: 'Two \\glossterm{fatigue levels} from the target.',
      effect: `
        Choose yourself or a living \\glossterm{ally} you \\glossterm{touch}.
        The target removes one of its \\glossterm{vital wounds}.
        If it is unconscious, you choose which vital wound is removed.
        Then, it gains a \\glossterm{vital wound} that imposes a -2 penalty to its Fortitude defense (see \\tref{Vital Wound Effects}).
      `,
      // narrative: '',
      rank: 1,
      tags: ['Poison'],
    },

    {
      name: 'Efficient Bitter Remedy',

      cost: 'Two \\glossterm{fatigue levels} from the target.',
      functionsLike: {
        name: 'bitter remedy',
        exceptThat: `the vital wound created by this spell was no vital wound effect.`,
      },
      // narrative: '',
      rank: 3,
      tags: ['Poison'],
    },

    {
      name: 'Empowered Healing Salve',

      functionsLike: {
        name: 'healing salve',
        exceptThat: 'the healing increases to 6d6, and the bonuses increase to +4.',
      },
      rank: 5,
      scaling: { special: 'The healing increases by 2d6 for each rank beyond 5.' },
      tags: ['Swift'],
    },

    {
      name: 'Cleansing Draught',

      cost: 'One \\glossterm{fatigue level} from the target.',
      effect: `
        You or a living \\glossterm{ally} you \\glossterm{touch} removes a \\glossterm{condition}.
      `,
      rank: 4,
    },
    {
      name: 'Terrifying Fungus',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target becomes covered in fear-inducing fungus as a \\glossterm{condition}.
          It becomes \\frightened of you and all other sources of fungus as a \\glossterm{condition}.

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
          It takes \\damagerankone immediately and during each of your subsequent actions.

          The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{movement} to scrape off the fungus.
          Dropping \\prone as part of this action gives a +5 bonus to this check.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Acid'],
    },
    {
      name: 'Mighty Devouring Fungus',

      functionsLike: {
        name: 'devouring fungus',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Acid'],
    },
    {
      name: 'Regenerative Fungus',

      // dr2l healing is very strong as an automatic effect, but the downsides are spicy
      // too...
      effect: `
        At the end of each round, fungus grows rapidly in your body to close your wounds, causing you to regain 1d8+1d6 hit points.
        Keep track of how many total hit points you regain with this ability.
        If that value exceeds half your maximum hit points, you are unable to \\glossterm{dismiss} this ability or stop being \\glossterm{attuned} to it.
        If that value exceeds your maximum hit points, you gain a \\plus2 bonus to your Fortitude defense, but you are \\slowed.
        If that value exceeds twice your maximum hit points, you are \\paralyzed.

        Whenever you finish a \\glossterm{short rest}, any fungus decays, resetting the value of hit points you have healed with this ability.
        That value cannot be reset in any other way, even if this ability ends.
      `,
      rank: 1,
      scaling: { special: 'The healing increases by 1d6 for each rank beyond 1.' },
      tags: ['Attune'],
    },
  ],
};
