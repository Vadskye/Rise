import { MysticSphere } from '.';
import { CONDITION_CRIT, MULTIHIT_CRIT } from './constants';

export const toxicology: MysticSphere = {
  name: 'Toxicology',
  shortDescription: 'Create and manipulate poisons, acids, and fungi.',
  sources: ['arcane', 'nature'],
  // The baseline for an injury poison is one rank higher than a standard "if no dr"
  // spell, because you can keep attacking until they are eventually affectd.

  cantrips: [
    // TODO: convert this to a ritual and replace it with a different cantrip
    {
      name: 'Intensify Poison',

      attack: {
        crit: `The poison progresses by an additional stage.`,
        hit: `
          Choose a poison affecting the target.
          The poison immediately progresses by one stage against the target, which can have varying effects depending on the poison (see \\pcref{Poison}).
          In addition, the target removes one of its successes to remove the poison, if any.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
          If the target is not currently poisoned, this ability has no effect.
        `,
      },
      roles: ['combo'],
      scaling: 'double_accuracy',
      tags: ['Poison'],
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
          \\damagerankone immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 1,
      roles: ['burn'],
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
      roles: ['burn'],
      scaling: 'accuracy',
      tags: ['Acid'],
    },

    // HP stun is 1.4 EA, so r1. Short range allows the extra damage.
    {
      name: 'Poison -- Asp Venom',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by asp venom (see \\pcref{Poison}).
          This makes it \\stunned while the poison lasts.
          The second escalation also inflicts \\damageranktwolow.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 1,
      roles: ['maim'],
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Giant Wasp Venom',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by asp venom (see \\pcref{Poison}).
          This makes it \\slowed while the poison lasts.
          The second escalation also inflicts \\damagerankthreelow.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus2 accuracy bonus against one living creature within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['maim'],
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Black Adder Venom',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by black adder venom (see \\pcref{Poison}).
          The poison inflicts \\damagerankthreelow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['execute'],
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Wyvern Venom',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by wyvern venom (see \\pcref{Poison}).
          The poison inflicts \\damagerankfourlow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus1 accuracy bonus against one living creature within \\shortrange.
        `,
      },
      rank: 3,
      roles: ['execute'],
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Blood Leech Venom',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by wyvern venom (see \\pcref{Poison}).
          The poison inflicts \\damagerankfivelow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['execute'],
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Purple Worm Venom',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by purple worm venom (see \\pcref{Poison}).
          The poison inflicts \\damageranksixlow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 5,
      roles: ['execute'],
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Jellyfish Extract',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by jellyfish extract (see \\pcref{Poison}).
          The poison inflicts \\damagerankzerolow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 1,
      roles: ['burn'],
      scaling: 'poison',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Dragon Bile',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by dragon bile (see \\pcref{Poison}).
          The poison inflicts \\damagerankthreelow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['burn'],
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
          Once per round, when you lose \\glossterm{hit points} during the \\glossterm{action phase}, make a \\glossterm{reactive attack} vs. Reflex against all \\glossterm{enemies} adjacent to you.
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
        You gain a +8 \\glossterm{enhancement bonus} to your maximum \\glossterm{hit points}.
        However, you also take a -1 penalty to your \\glossterm{vital rolls}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +16.`,
        5: `The bonus increases to +32.`,
        7: `The bonus increases to +64.`,
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
      rank: 3,
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
      rank: 6,
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
          During your next action, the rain falls in your chosen area, and you make a \\glossterm{reactive attack} vs. Fortitude against everything in the area.
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
      // +1dr for short range, +1dr for healing bonus, so dr3.
      // Since flat damage scales better, dr2.
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        The target regains 1d8+1d6 hit points.
        In addition, it removes all \\glossterm{poisons} affecting it and becomes \\glossterm{briefly} \\glossterm{immune} to poisons.
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

          The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{move actoin} to scrape off the fungus.
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

          The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{move action} to scrape off the fungus.
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

      // -1 rank for vital roll penalty
      effect: `
        At the end of each round, fungus grows rapidly in your body to close your wounds, causing you to regain hit points equal to half your \\glossterm{power}.
        Whenever you regain hit points in this way, you \\glossterm{briefly} take a \\minus1 penalty to your \\glossterm{vital rolls}.
      `,
      rank: 2,
      roles: ['attune', 'healing'],
      scaling: { special: 'The healing increases by +2 for each rank beyond 2.' },
      tags: ['Attune (deep)'],
    },
  ],
};
