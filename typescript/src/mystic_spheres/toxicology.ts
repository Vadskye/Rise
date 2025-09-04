import { MysticSphere } from '.';
import { CONDITION_CRIT, MULTIHIT_CRIT, POISON_CRIT } from './constants';

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
      scaling: 'damage',
      tags: ['Acid', 'Manifestation'],
    },

    {
      name: 'Mighty Caustic Grasp',

      functionsLike: {
        name: 'caustic grasp',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 4,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Acid', 'Manifestation'],
    },

    // HP poison stun is 1.4 EA, so r1.
    {
      name: 'Poison -- Asp Venom',

      attack: {
        crit: POISON_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by asp venom (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It makes the target \\stunned while the poison lasts.
          The second escalation also deals \\damageranktwolow.
        `,
        targeting: `
          Make an attack vs. Fortitude against up to two living creatures within \\shortrange.
        `,
      },
      rank: 1,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Manifestation', 'Poison'],
    },

    // HP poison slow is r1.
    {
      name: 'Poison -- Giant Wasp Venom',

      attack: {
        crit: POISON_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by asp venom (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It makes the target \\slowed while the poison lasts.
          The second escalation also deals \\damagerankthreelow.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus2 accuracy bonus against up to two living creatures within \\medrange.
        `,
      },
      rank: 2,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Manifestation', 'Poison'],
    },

    // Normal damage over time is drX-2, so dr1 on flat damage.
    // Injury-only normally gives +2dr, but injury-only damage over time is a weak
    // concept, so it can give +4dr here, which takes it to dr3.
    {
      name: 'Poison -- Black Adder Venom',

      attack: {
        crit: POISON_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by black adder venom (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankthreelow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 2,
      roles: ['execute'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Wyvern Venom',

      attack: {
        crit: POISON_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by wyvern venom (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankthreelow immediately and with each escalation.
          The second escalation also ends the poison.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus4 accuracy bonus against one living creature within \\medrange.
        `,
      },
      rank: 3,
      roles: ['execute'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Blood Leech Venom',

      attack: {
        crit: POISON_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by blood leech venom (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankfivelow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 4,
      roles: ['execute'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Purple Worm Venom',

      attack: {
        crit: POISON_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it becomes \\glossterm{poisoned} by purple worm venom (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damageranksixlow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 5,
      roles: ['execute'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    // Normal damage over time is drX-2.
    // Flat damage means it deals drX-1, so dr0.
    // 3x dr0 is 3d6 = 10.5, vs ~5.5 from a normal immediate damage attack.
    {
      name: 'Poison -- Jellyfish Extract',

      attack: {
        crit: POISON_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by jellyfish extract (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankzerolow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
          The second escalation also ends the poison.
        `,
      },
      rank: 1,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Tree Frog Coating',

      attack: {
        crit: POISON_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by tree frog coating (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damageranktwolow immediately and with each escalation.
          The second escalation also ends the poison.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\minus3 accuracy penalty against one living creature within \\medrange.
        `,
      },
      rank: 2,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison -- Dragon Bile',

      attack: {
        crit: POISON_CRIT,
        hit: `
          The target becomes \\glossterm{poisoned} by dragon bile (see \\pcref{Poison}).
          The poison's accuracy is equal to your accuracy with this spell.
          It deals \\damagerankthreelow immediately and with each escalation.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 4,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Manifestation', 'Poison'],
    },

    {
      name: 'Poison Carrier',

      effect: `
        You are \\glossterm{unaffected} by \\glossterm{poisons}.
        All poisons affecting you are removed when you finish a \\glossterm{long rest}, but they otherwise do not expire on you.
        As a standard action, you can extract a liquid poison affecting you, allowing you to coat a weapon or put it into a regular vial.
        This process causes you to lose one hit point.
        You cannot extract non-liquid poisons in this way.
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
      rank: 2,
      roles: ['attune'],
      scaling: 'damage',
      tags: ['Acid'],
      type: 'Attune (deep)',
    },

    // Normal reactive damage would be dr5 at rank 4, but reduce that damage to give it a
    // larger area.
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
      scaling: 'damage',
      tags: ['Acid'],
      type: 'Attune (deep)',
    },

    {
      name: 'Acid Splash',

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
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Acid', 'Manifestation'],
    },

    {
      name: 'Mighty Acid Splash',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfour immediately, and again during your next action.
          This damage is doubled if the target is an object that is not \\glossterm{metallic}.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
        `,
      },
      rank: 5,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Acid', 'Manifestation'],
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

    // This doesn't really match the standard math for an sustain (minor) area, but it
    // seems fine.
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
      roles: ['hazard', 'wildfire'],
      scaling: 'damage',
      tags: ['Acid', 'Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Mighty Acid Pool',

      functionsLike: {
        name: 'acid pool',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 7,
      roles: ['hazard', 'hazard'],
      scaling: 'damage',
      tags: ['Acid', 'Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Acid Breath',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankthree immediately, and again during your next action.
        `,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe acid like a dragon as a standard action.
          When you do, make an attack vs. Fortitude and Reflex against everything in a \\medarea cone from you.
          After you use breathe acid, you \\glossterm{briefly} cannot do so again.
        `,
      },
      rank: 3,
      roles: ['attune', 'wildfire'],
      scaling: 'damage',
      tags: ['Acid'],
      type: 'Attune',
    },

    {
      name: 'Massive Acid Breath',

      functionsLike: {
        name: 'acid breath',
        exceptThat: `
          the damage increases to \\damageranksix, and the area increases to a \\largearea cone from you.
        `,
      },
      rank: 6,
      roles: ['attune', 'wildfire'],
      scaling: 'damage',
      tags: ['Acid'],
      type: 'Attune',
    },

    {
      name: 'Acid Rain',

      // Rank 4 spell would normally have dr2 and r4 area. Add +2dr for avoidable delay
      // and +1dr for double defense.
      // The open area requirement is a cost for stacking this much +damage.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damageranktwo immediately, and again during your next action.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, you choose a location within \\shortrange.
          Acid rain appears in the sky over that area, falling down towards it.
          Creatures can generally identify what area the rain will fall into with a DV 10 Awareness check.

          During your next action, the rain falls in your chosen area, and you make a \\glossterm{reactive attack} vs. Fortitude and Reflex against everything in a \\medarea radius of your chosen location.
          If there is not at least fifty feet of open space above your chosen area, this spell fails with no effect.
          This attack does not damage thin \\glossterm{walls} in the area.
        `,
      },
      rank: 4,
      roles: ['wildfire'],
      scaling: 'damage',
      tags: ['Acid', 'Manifestation'],
    },

    // Technically this should be medium range, but it feels like it should be long range?
    {
      name: 'Massive Acid Rain',

      functionsLike: {
        name: 'acid rain',
        exceptThat:
          'it affects a \\largearea radius within \\longrange, and the damage increases to \\damagerankfive.',
      },
      rank: 7,
      roles: ['wildfire'],
      tags: ['Acid', 'Manifestation'],
    },

    {
      name: 'Healing Salve',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // +1dr for short range, +1dr for healing bonus, so dr3.
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        The target regains \\damagerankthree hit points.
        In addition, it removes all \\glossterm{poisons} affecting it and becomes \\glossterm{briefly} \\glossterm{immune} to poisons.
      `,
      rank: 1,
      roles: ['healing'],
      scaling: 'healing',
      tags: ['Swift'],
    },

    {
      name: 'Empowered Healing Salve',

      cost: 'One \\glossterm{fatigue level} from the target.',
      functionsLike: {
        name: 'healing salve',
        exceptThat: 'the healing increases to \\damageranksix.',
      },
      rank: 4,
      scaling: 'healing',
      roles: ['healing'],
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
      roles: ['healing'],
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
      roles: ['healing'],
      tags: ['Poison'],
    },

    {
      name: 'Cleansing Draught',

      cost: 'One \\glossterm{fatigue level} from the target.',
      effect: `
        You or a living \\glossterm{ally} you \\glossterm{touch} can remove a \\glossterm{condition}.
      `,
      rank: 3,
      roles: ['healing'],
    },

    // Frightened by you is 2.1 EA, so r5. Move action removal drops that to r3. Limited
    // scope drops that to r2.
    {
      name: 'Terrifying Fungus',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target becomes covered in fear-inducing fungus as a \\glossterm{condition}.
          It becomes \\frightened of you and all other sources of fungus.

          The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{move action} to scrape off the fungus.
          Dropping \\prone as part of this action gives a +5 bonus to this check.
        `,
        targeting: `
          Make an attack vs. Mental against up to two living creatures within \\shortrange.
        `,
      },
      roles: ['softener'],
      rank: 2,
      scaling: 'accuracy',
      tags: ['Emotion', 'Manifestation'],
    },
    // drX-2 for move action removal, with +1dr for short range
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
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Devouring Fungus',

      functionsLike: {
        name: 'devouring fungus',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 5,
      roles: ['burn'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Regenerative Fungus',

      // -1 rank for vital roll penalty
      effect: `
        At the end of each round, fungus grows rapidly in your body to close your wounds, causing you to regain hit points equal to half your \\glossterm{power}.
        However, you take a \\minus1 penalty to your \\glossterm{vital rolls}.
      `,
      rank: 2,
      roles: ['attune', 'healing'],
      scaling: { special: 'The healing increases by 2 for each rank beyond 2.' },
      type: 'Attune (deep)',
      tags: ['Manifestation'],
    },

    {
      name: 'Empowered Regenerative Fungus',

      effect: `
        At the end of each round, fungus grows rapidly in your body to close your wounds, causing you to regain \\damagerankfour hit points.
        However, you take a \\minus1 penalty to your \\glossterm{vital rolls}.
      `,
      rank: 5,
      roles: ['attune', 'healing'],
      scaling: 'healing',
      type: 'Attune (deep)',
      tags: ['Manifestation'],
    },

    // Self-only double brace is 0.8 EA.
    {
      name: 'Bracing Concoction',

      effect: `
        You create a potion in an empty vial or similar container within \\shortrange.
        A creature can drink the potion as a standard action using a \\glossterm{free hand}.
        When a living creature drinks the potion, it becomes \\glossterm{braced} for the next two rounds.
      `,
      rank: 1,
      roles: ['boon'],
      type: 'Sustain (attuneable, minor)',
      tags: ['Manifestation'],
    },

    // Self-only double empower is 0.8 EA.
    {
      name: 'Empowering Concoction',

      effect: `
        You create a potion in an empty vial or similar container within \\shortrange.
        A creature can drink the potion as a standard action using a \\glossterm{free hand}.
        When a living creature drinks the potion, it becomes \\glossterm{empowered} for the next two rounds.
      `,
      rank: 2,
      roles: ['boon'],
      type: 'Sustain (attuneable, minor)',
      tags: ['Manifestation'],
    },

    // Self-only double focus is 0.8 EA. Arbitrarily kick this up from empowering
    // concoction since it's more versatile and we want a decent rank spread.
    {
      name: 'Focusing Concoction',

      effect: `
        You create a potion in an empty vial or similar container within \\shortrange.
        A creature can drink the potion as a standard action using a \\glossterm{free hand}.
        When a living creature drinks the potion, it becomes \\focused for the next two rounds.
      `,
      rank: 3,
      roles: ['boon'],
      type: 'Sustain (attuneable, minor)',
      tags: ['Manifestation'],
    },

    // Self-only double maximize is 1.4 EA, so this needs downsides to function
    {
      name: 'Maximal Concoction',

      effect: `
        You create a potion in an empty vial or similar container within \\shortrange.
        A creature can drink the potion as a standard action using a \\glossterm{free hand}.
        When a living creature drinks the potion, it becomes \\maximized and \\stunned for the next two rounds.
        When that effect ends, it takes \\damagerankfourlow.
      `,
      rank: 5,
      roles: ['boon'],
      type: 'Sustain (attuneable, minor)',
      tags: ['Manifestation'],
    },

    // Self-only double prime is 1.6 EA
    {
      name: 'Priming Concoction',

      effect: `
        You create a potion in an empty vial or similar container within \\shortrange.
        A creature can drink the potion as a standard action using a \\glossterm{free hand}.
        When a living creature drinks the potion, it becomes \\primed and \\stunned for the next two rounds.
        When that effect ends, it takes \\damageranksixlow.
      `,
      rank: 7,
      roles: ['boon'],
      type: 'Sustain (attuneable, minor)',
      tags: ['Manifestation'],
    },
    // Briefly dazzled with damage is 1.6 EA, so r2. Spend +1r for more area and +1r for
    // extended range, so area rank 5.
    {
      name: 'Spore Cloud',

      attack: {
        hit: `
          \\damagerankone.
          In addition, each target is \\glossterm{briefly} \\dazzled.
        `,
        targeting: `
          Make an attack vs. Fortitude against all living creatures in a \\medarea radius \\glossterm{zone} within \\medrange.
        `,
      },
      rank: 4,
      roles: ['clear', 'flash'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    // TODO: add a version of the Toxic weapon effect as a spell in this sphere.
    // What differentiates that spell from the generic weapon property?
  ],
};
