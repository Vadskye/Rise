import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT } from './constants';

export const vivimancy: MysticSphere = {
  name: 'Vivimancy',
  shortDescription: 'Manipulate life energy to aid allies or harm foes.',
  sources: ['arcane', 'divine', 'nature'],

  cantrips: [
    {
      name: 'Ablate Vital Wound',

      effect: `
        Choose a living \\glossterm{ally} you \\glossterm{touch}.
        If the target has a \\glossterm{vital wound} with a \\glossterm{vital roll} of 0, it treats that \\glossterm{vital roll} as a 1, preventing it from dying (see \\pcref{Vital Wounds}).
      `,
      scaling: {
        2: `The target can be any ally within \\shortrange.`,
        4: `The minimum \\glossterm{vital roll} you can mitigate decreases to -1.`,
        6: `The minimum \\glossterm{vital roll} you can mitigate decreases to -2.`,
      },
    },

    {
      name: 'Minor Life Infusion',

      effect: `
        You regain two \\glossterm{hit points}.
        This healing cannot increase your hit points above half your maximum hit points.
      `,
      scaling: {
        2: `The healing increases to four \\glossterm{hit points}.`,
        4: `The healing increases to eight \\glossterm{hit points}.`,
        6: `The healing increases to sixteen \\glossterm{hit points}.`,
      },
      tags: ['Swift'],
    },
  ],
  spells: [
    {
      name: 'Lifesteal Grasp',

      cost: 'One optional \\glossterm{fatigue level} (see text).',
      // baseline for melee range is dr3, drop to dr2 for healing
      attack: {
        hit: `
          \\damageranktwo.
          If the target loses \\glossterm{hit points}, you can increase your \\glossterm{fatigue level} by one. 
          % dr1
          When you do, you regain 1d6 hit points +1 per 2 power at the end of the round.
          This healing does not have the \\abilitytag{Swift} tag, so it applies after attacks during the current phase.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against a living creature you \\glossterm{touch}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Mighty Lifesteal Grasp',

      functionsLike: {
        name: 'lifesteal grasp',
        // healing is dr4
        exceptThat:
          'the damage increases to \\damageranksix, and the healing increases to 1d6 per 2 power.',
      },
      rank: 4,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Lifesteal',

      cost: 'One optional \\glossterm{fatigue level} (see text).',
      // +1r for HP theft
      attack: {
        hit: `
          \\damagerankone.
          If the target loses \\glossterm{hit points} from this damage, you can increase your \\glossterm{fatigue level} by one. 
          % dr2
          When you do, you regain 1d8 hit points +1 per 2 power at the end of the round.
          This healing does not have the \\abilitytag{Swift} tag, so it applies after attacks during the current phase.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Mighty Lifesteal',

      functionsLike: {
        name: 'lifesteal',
        // healing is dr6
        exceptThat:
          'the damage increases to \\damagerankfive, and the healing increases to 1d8 plus 1d8 per 2 power.',
      },
      rank: 6,
      tags: [],
    },

    {
      name: 'Restoration',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr2 for short range, +1dr from healing bonus
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        % dr1
        The target regains 1d8 \\glossterm{hit points} +1 per power.
      `,
      rank: 1,
      // standard rank 2 power would be 3, so 7.5 at dr3 or 9 at dr4
      scaling: { special: 'The healing increases by +2 for each rank beyond 1.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Restoration',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr5 for short range, +1dr from healing bonus
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        The target regains 2d8 hit points plus 1d8 per 3 power.
      `,
      rank: 4,
      scaling: { special: 'The healing increases by 1d8 for each rank beyond 4.' },
      tags: ['Swift'],
    },

    {
      name: 'Total Restoration',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr8 for short range, +1dr from healing bonus. Use drh to really reward
      // investment.
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        % dr7
        The target regains 1d10 \\glossterm{hit points} plus 1d10 per power.
      `,
      rank: 7,
      tags: ['Swift'],
    },

    {
      name: 'Circle of Life',

      // TODO: unclear rank. Currently using dr4.
      effect: `
        You create a zone of life energy in a \\smallarea radius around your location.
        When you cast this spell, and during each of your subsequent actions, each living creature in the area regains 1d10 hit points plus 1d6 per 3 power.
        This cannot increase a target's hit points above half its maximum hit points.
      `,
      rank: 4,
      scaling: { special: 'The healing increases by 1d6 for each rank beyond 4.' },
      tags: ['Sustain (standard)', 'Swift'],
    },

    {
      name: 'Cure Vital Wound',

      cost: 'Three \\glossterm{fatigue levels} from the target.',
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\medrange.
        The target removes one \\glossterm{vital wound}.
      `,
      rank: 5,
      scaling: {
        7: `
        The target can remove two \\glossterm{vital wounds}.
        If it does, the cost increases to six fatigue levels from the target.
      `,
      },
    },

    {
      name: 'Inflict Wound',

      attack: {
        hit: `
          \\damagerankone.
          If the target loses \\glossterm{hit points} from this damage, you deal it an additional \\damagerankone.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Inflict Wound',

      functionsLike: {
        name: 'inflict wound',
        exceptThat: 'the damage increases to \\damagerankfive, and any \\glossterm{extra damage} applied to the first instance of damage is doubled.',
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Vital Endurance',

      effect: `
        Whenever you gain a \\glossterm{vital wound}, you may choose to ignore its vital wound effect (see \\pcref{Vital Wounds}).
        You are still considered to have the vital wound, and it still provides the normal -2 penalty to future vital rolls.

        You can only ignore the effects of one of your vital wounds in this way.
        If you gain a new vital wound, you can choose to either ignore the new vital wound effect or continue ignoring the old vital wound effect.
        You can make this choice after learning the \\glossterm{vital roll} for the new vital wound.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Mass Vital Endurance',

      functionsLike: {
        mass: true,
        name: 'Vital Endurance',
      },
      // narrative: '',
      rank: 6,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Circle of Death',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          You create a zone of death in a \\smallarea radius \\glossterm{zone} within \\shortrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against all living creatures in the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Sustain (minor)'],
    },

    {
      name: 'Massive Circle of Death',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          You create a zone of death in a \\largearea radius \\glossterm{zone} within \\medrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against all living creatures in the area.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Sustain (minor)'],
    },

    {
      name: 'Lifegift',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to your maximum \\glossterm{hit points}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: 'The bonus increases to +8.',
        5: 'The bonus increases to +16.',
        7: 'The bonus increases to +32.',
      },
      type: 'Attune',
    },

    {
      name: 'Wellspring of Life',

      // This has a larger effect on large healing values, so it's not a great
      // combo with incremental regeneration-style healing.
      effect: `
        Whenever you regain hit points, you regain the maximum possible number instead of rolling.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Mass Wellspring of Life',

      functionsLike: {
        mass: true,
        name: 'wellspring of life',
      },
      rank: 4,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Avasculate',

      // TODO: math
      attack: {
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it takes damage equal to half its maximum hit points.
          The damage dealt this way cannot exceed your own maximum hit points.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 7,
    },

    {
      name: 'Lifetap',

      effect: `
        You must be alive to cast this spell.

        Whenever you cast or attack with with a damaging spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can choose to enhance it.
        You can choose to apply this enhancement after seeing the attack roll result, but before rolling damage.
        If you do, the spell deals 1d6 energy \\glossterm{extra damage} when it deals damage for the first time.
        % TODO: the timing here is very weird
        In addition, the spell can target objects and nonliving creatures as if they were living creatures.
        However, you also lose 2 hit points.

        You can increase this hit point loss to be equal to your maximum hit points.
        If you do, you gain a +5 accuracy bonus with the attack.
        Since you can choose to apply this enhancement after seeing the attack roll result, you can cause a missed attack to hit in this way.

        After you enhance a spell in this way, this effect ends.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The extra damage increases to 2d6, and the hit point loss increases to 4.`,
        5: `The extra damage increases to 4d6, and the hit point loss increases to 8.`,
        7: `The extra damage increases to 8d6, and the hit point loss increases to 16.`,
      },
      type: 'Attune',
    },

    {
      name: 'Lifetap Slash',

      // +1dr due to self damage
      attack: {
        hit: `\\damagerankthree.`,
        targeting: `
          You must be alive to cast this spell.

          Make an attack vs. Armor against something within \\medrange.
          Whether the attack hits or misses, you lose \\glossterm{hit points} equal to half your \\glossterm{power}.
          Alternately, you can choose to gain a \\glossterm{vital wound} instead.
          If you do, you gain a +5 accuracy bonus with the attack.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Lifetap Slash',

      // +1dr due to self damage
      attack: {
        hit: `\\damageranksix.`,
        targeting: `
          You must be alive to cast this spell.

          Make an attack vs. Armor against something within \\medrange.
          Whether the attack hits or misses, you lose \\glossterm{hit points} equal to your \\glossterm{power}.
          Alternately, you can increase this hit point loss to be equal to your maximum hit points.
          If you do, you gain a +5 accuracy bonus with the attack.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Lifetap Blast',

      // +1dr due to self damage
      attack: {
        hit: `\\damagerankthree.`,
        missGlance: true,
        targeting: `
          You must be alive to cast this spell.

          Make an attack vs. Reflex against everything within a \\medarea cone from you.
          Whether the attack hits or misses, you lose \\glossterm{hit points} equal to half your \\glossterm{power}.
          Alternately, you can increase this hit point loss to be equal to your maximum hit points.
          If you do, you gain a +5 accuracy bonus with the attack.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Lifetap Blast',

      // +1dr due to self damage
      attack: {
        hit: `\\damageranksix.`,
        missGlance: true,
        targeting: `
          You must be alive to cast this spell.

          Make an attack vs. Reflex against everything within a \\largearea cone from you.
          Whether the attack hits or misses, you lose \\glossterm{hit points} equal to your \\glossterm{power}.
          Alternately, you can increase this hit point loss to be equal to your maximum hit points.
          If you do, you gain a +5 accuracy bonus with the attack.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Lifetap Ward',

      effect: `
        You gain a +8 \\glossterm{enhancement bonus} to your maximum \\glossterm{damage resistance}.
        However, you take a -4 penalty to your maximum \\glossterm{hit points}.
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
      name: 'Sanguine Bond',

      attack: {
        hit: `
          \\damageranktwo. If it takes damage, the target's life becomes linked to yours as a \\glossterm{condition}.
          At the end of each subsequent round, if you lost hit points during that round, the target takes \\damageranktwo.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Lifebomb',

      // TODO: figure out optimal damage / radius.
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, your life energy begins to surge.
          During your next action, make an attack vs. Fortitude against all living \\glossterm{enemies} within a \\medarea radius from you.
          If you are at full hit points, you gain a \\plus2 accuracy bonus with this attack.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Lifebomb',

      functionsLike: {
        name: 'Lifebomb',
        exceptThat:
          'the radius increases to a \\largearea radius from you, and the damage increases to \\damagerankfive.',
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Deathtouch',

      // Baseline for melee range is dr7, which is 5.5+2.75dpp.
      // If it required no remaining DR, it would be dr9, which is 9 + 4.5dpp.
      // Maximized dr6 is 8 + 4dpp.
      attack: {
        hit: `
          \\damageranksix.
          If the target has no remaining damage resistance, this damage is maximized.
          When you kill a creature with this ability, you \\glossterm{briefly} gain a \\plus2 accuracy bonus.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against a living creature you \\glossterm{touch}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Corpse Explosion',

      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          Choose one Small or larger corpse within \\medrange.
          Make an attack vs. Reflex against everything within a \\smallarea radius from the corpse.
          You gain a \\plus1 accuracy bonus for each size category by which the corpse is larger than Medium.
          The corpse is also destroyed.
        `,
      },
      narrative: `
          You violently discharge the latent magical potential within a corpse, causing it to explode.
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Corpse Explosion',

      functionsLike: {
        name: 'corpse explosion',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      narrative: `
        You violently discharge the latent magical potential within a corpse, causing it to explode in a shower of guts and gore.
      `,
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Withering',

      attack: {
        crit: CONDITION_CRIT,
        hit: `As a \\glossterm{condition}, the target's body withers.
        It takes a -2 penalty to its Fortitude defense.
        Whenever it loses \\glossterm{hit points}, this penalty increases by 2.
        This stacks up to a maximum total penalty of -10.`,
        targeting: `
          Make an attack vs. Fortitude with a +3 accuracy bonus against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Retributive Lifebond',

      attack: {
        hit: `\\damagerankonelow.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\medarea radius \\glossterm{emanation} from you causes you to lose \\glossterm{hit points}, make a \\glossterm{reactive attack} vs. Fortitude against it.
        `,
      },
      rank: 1,
      scaling: { special: 'The damage increases by +1 for each rank beyond 1.' },
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Massive Retributive Lifebond',

      attack: {
        hit: `\\damagerankthreelow.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\hugearea radius \\glossterm{emanation} from you causes you to lose \\glossterm{hit points}, make \\glossterm{reactive attack} vs. Fortitude against it.
        `,
      },
      rank: 4,
      scaling: { special: 'The damage increases by 1d6 for each rank beyond 4.' },
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Retributive Lifebond',

      attack: {
        hit: `\\damageranksixlow.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\medarea radius \\glossterm{emanation} from you causes you to lose \\glossterm{hit points}, make a \\glossterm{reactive attack} vs. Fortitude against it.
        `,
      },
      rank: 7,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: "Healer's Intuition",

      effect: `
        If you have Medicine as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: 'Attune',
    },

    {
      name: 'Lifesense',

      effect: `
        You gain \\trait{lifesense} with a 60 foot range, allowing you to sense the location of living things without light (see \\pcref{Lifesense}).
        If you already have lifesense, the range of your lifesense increases by 60 feet.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Lifesight',

      effect: `
        You gain \\trait{lifesight} with a 30 foot range, allowing you to see living things without light (see \\pcref{Lifesight}).
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Enervating Wall',

      cost: BARRIER_COOLDOWN,
      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          You create a \\medarealong \\glossterm{wall} within \\medrange.
          Whenever a living creature passes through the wall, you make a \\glossterm{reactive attack} vs. Fortitude against it.
          In addition, when you cast this spell and during each of your subsequent actions, make an attack vs. Fortitude against any creature currently sharing space with it.
          Generally, this is only possible for Large or larger creatures.
          You can only attack a given target with this spell once per \\glossterm{phase}.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Enervating Wall',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of death',
        exceptThat: `
          the damage increases to \\damagerankfour.
          In addition, the area increases to a \\largearealong \\glossterm{wall}, and the range increases to \\longrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },
  ],
};
