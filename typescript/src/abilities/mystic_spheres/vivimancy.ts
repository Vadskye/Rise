import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT, MULTIHIT_CRIT } from '../constants';

export const vivimancy: MysticSphere = {
  name: 'Vivimancy',
  shortDescription: 'Manipulate life energy to aid allies or harm foes.',
  sources: ['arcane', 'divine', 'nature'],

  cantrips: [
    {
      name: 'Flow of Life',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        At the end of each round, you regain hit points equal to your \\glossterm{power} (minimum 1).
      `,
      roles: ['healing', 'exertion'],
      type: 'Sustain (standard)',
    },
  ],
  spells: [
    {
      name: 'Lifesteal Grasp',

      cost: 'One optional \\glossterm{fatigue level} (see text).',
      // baseline for melee range is dr3, drop to dr2 for healing.
      // Baseline for self-only healing would be drX+3. Although this is combined with
      // damage, the healing is also conditional, so it's not as safe as full healing, so
      // it can keep its full healing value.
      attack: {
        hit: `
          \\damageranktwo.
        `,
        injury: `
          You can increase your \\glossterm{fatigue level} by one. 
          If you do, you regain \\hprankfour at the end of the round.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against a living creature you \\glossterm{touch}.
        `,
      },
      rank: 1,
      roles: ['burst', 'healing'],
      scaling: {
        special:
          'For each rank beyond 1, the damage increases by 1d6 and the healing increases by 1d10.',
      },
      tags: [],
    },

    {
      name: 'Mighty Lifesteal Grasp',

      functionsLike: {
        name: 'lifesteal grasp',
        exceptThat: `
          the damage increases to \\damagerankfive, and any \\glossterm{extra damage} is doubled.
          In addition, the healing increases to \\hprankseven.
        `,
      },
      rank: 4,
      roles: ['burst', 'healing'],
      scaling: {
        special:
          'For each rank beyond 4, the damage increases by 2d6 and the healing increases by 3d10.',
      },
      tags: [],
    },

    {
      name: 'Lifesteal',

      cost: 'One optional \\glossterm{fatigue level} (see text).',
      // -1dr for healing. Healing is drX+3, as lifesteal grasp.
      attack: {
        hit: `
          \\damagerankone.
        `,
        injury: `
          You can increase your \\glossterm{fatigue level} by one.
          If you do, you regain \\hprankfive at the end of the round.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 2,
      roles: ['burst', 'healing'],
      scaling: {
        special:
          'For each rank beyond 2, the damage increases by 2 and the healing increases by 2d8.',
      },
      tags: [],
    },

    {
      name: 'Mighty Lifesteal',

      functionsLike: {
        name: 'lifesteal',
        exceptThat: `
          the damage increases to \\damagerankfive, and any \\glossterm{extra damage} is doubled.
          In addition, the healing increases to \\hpranknine.
        `,
      },
      roles: ['burst', 'healing'],
      rank: 6,
      scaling: {
        special:
          'For each rank beyond 6, the damage increases by 2d8 and the healing increases by 4d8.',
      },
      tags: [],
    },

    {
      name: 'Restoration',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr2 for short range, +1dr from healing bonus
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        % dr1
        The target regains \\hprankthree.
      `,
      rank: 1,
      roles: ['healing', 'exertion'],
      scaling: 'healing',
      tags: ['Swift'],
    },

    {
      name: 'Greater Restoration',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr5 for short range, +1dr from healing bonus
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        The target regains \\hpranksix.
      `,
      rank: 4,
      roles: ['healing', 'exertion'],
      scaling: 'healing',
      tags: ['Swift'],
    },

    {
      name: 'Total Restoration',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr8 for short range, +1dr from healing bonus. Use drh to really reward
      // investment.
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        The target regains \\hpranknine.
      `,
      rank: 7,
      roles: ['healing', 'exertion'],
      tags: ['Swift'],
    },

    {
      name: 'Circle of Life',

      // TODO: unclear healing rank. Short range healing would be dr5.
      // Assume that this hits two allies, so dr2. This can hit enemies mainly for
      // symmetry with circle of death; that's rarely a huge weakness in practice.
      // +1dr for delay
      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You inscribe a circle in a \\medarea radius \\glossterm{zone} from you.
        During your next action, each living creature in the area regains \\hprankthree.
      `,
      rank: 3,
      roles: ['healing', 'exertion'],
      scaling: 'healing',
      tags: ['Swift'],
    },

    {
      name: 'Greater Circle of Life',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You inscribe a circle in a \\medarea radius \\glossterm{zone} from you.
        During your next action, each living creature in the area regains \\hpranksix.
      `,
      rank: 6,
      roles: ['healing', 'exertion'],
      scaling: 'healing',
      tags: ['Swift'],
    },

    // TODO: What level can vital wounds usually be removed?
    {
      name: 'Cure Vital Wound',

      cost: 'Three \\glossterm{fatigue levels} from the target.',
      effect: `
        Choose yourself or a living \\glossterm{ally} within \\medrange.
        The target regains \\hprankseven and removes one of its \\glossterm{vital wounds}.
      `,
      rank: 4,
      roles: ['healing', 'exertion'],
      scaling: 'healing',
    },

    {
      name: 'Inflict Wound',

      // Normal short range would be dr3. Drop by -1dr for the injury effect.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone.
        `,
        injury: `
          \\damagerankone again.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 2,
      roles: ['execute'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Inflict Wound',

      functionsLike: {
        name: 'inflict wound',
        exceptThat:
          'both damage instances increase to \\damagerankfive, and any \\glossterm{extra damage} applies to both the initial damage and the injury damage.',
      },
      rank: 5,
      roles: ['execute'],
      scaling: 'damage',
    },

    // TODO: unclear EA
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
      name: 'Circle of Death',

      // r1 area is drX normally. Drop by -1dr for injury effect, then +2dr for escapably
      // delayed damage.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfour.
        `,
        injury: `
          \\damagerankfour again.
        `,
        missGlance: true,
        targeting: `
          You inscribe a circle in a \\medarea radius \\glossterm{zone} from your location.
          During your next action, make a \\glossterm{reactive attack} vs. Fortitude against all living creatures in the area.
        `,
      },
      rank: 3,
      roles: ['clear', 'execute'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Circle of Death',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankseven.
        `,
        injury: `
          \\damagerankseven again.
        `,
        missGlance: true,
        targeting: `
          You inscribe a circle in a \\medarea radius \\glossterm{zone} from your location.
          During your next action, make a \\glossterm{reactive attack} vs. Fortitude against all living creatures in the area.
        `,
      },
      rank: 6,
      roles: ['clear', 'execute'],
      scaling: 'damage',
    },

    {
      name: 'Lifegift',

      effect: `
        You gain a +2 \\glossterm{enhancement bonus} to your \\glossterm{durability}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: 'The bonus increases to +3.',
        5: 'The bonus increases to +4.',
        7: 'The bonus increases to +5.',
      },
      type: 'Attune',
    },

    // TODO: unclear EA
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
      name: 'Blood Calls to Blood',

      // Rank 3:
      // Normal injury-only damage would be dr5, which is ~19 damage
      // Normal medium HP is ~45
      // Rank 7:
      // Normal injury-only damage would be dr9, which is usually ~90 damage.
      // Normal medium HP is ~200, so these values are pretty close
      attack: {
        hit: `
          If the target is \\glossterm{injured}, if takes \\damageranksix, up to a maximum total damage equal to half your maximum hit points.
          Any \\glossterm{extra damage} is not limited by your hit points.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      roles: ['execute'],
      rank: 3,
      scaling: 'damage',
    },

    {
      name: 'Exsanguinate',

      attack: {
        hit: `
          If the target is \\glossterm{injured}, it takes damage equal to half your maximum hit points.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 7,
      roles: ['execute'],
    },

    {
      name: 'Lifetap',

      effect: `
        You must be alive to cast this spell.

        Whenever you cast a spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can activate this effect as a \\glossterm{minor action}.
        If you do, the spell deals 1d8 \\glossterm{extra damage} when it deals damage for the first time.
        In addition, the spell can target objects and nonliving creatures as if they were living creatures.
        However, you also lose 2 hit points.

        You can increase this hit point loss to be equal to half your maximum hit points.
        If you do, you gain a +4 accuracy bonus with the attack.

        After you enhance a spell in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      // This is +1d over Enhance Magic -- Might in exchange for the HP loss
      scaling: {
        3: `The extra damage increases to 2d8, and the hit point loss increases to 4.`,
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
          You can increase this hit point loss to be equal to half your maximum hit points.
          If you do, you gain a +4 accuracy bonus with the attack.
        `,
      },
      rank: 2,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Lifetap Slash',

      // +1dr due to self damage
      attack: {
        hit: `\\damageranksix, and any \\glossterm{extra damage} is doubled.`,
        targeting: `
          You must be alive to cast this spell.

          Make an attack vs. Armor against something within \\medrange.
          Whether the attack hits or misses, you lose \\glossterm{hit points} equal to your \\glossterm{power}.
          You can increase this hit point loss to be equal to half your maximum hit points.
          If you do, you gain a +4 accuracy bonus with the attack.
        `,
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Lifetap Blast',

      // r1 area is normally drX. Add +1dr due to self damage.
      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          You must be alive to cast this spell.

          Make an attack vs. Reflex against everything within a \\medarea cone from you.
          Whether the attack hits or misses, you lose \\glossterm{hit points} equal to half your \\glossterm{power}.
          You can increase this hit point loss to be equal to half your maximum hit points.
          If you do, you gain a +4 accuracy bonus with the attack.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Lifetap Blast',

      // +1dr due to self damage
      attack: {
        hit: `\\damagerankseven.`,
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
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Sanguine Bond',

      // Assume the total damage dealt is doubled. It might trigger 2-3 times, and with a
      // delay, so overall multiplying the damage by 2 seems reasonable.
      // dr3 is 4.5 + 1dpp.
      // Double dr1 is 5 + 1dpp.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone, and the target's life becomes linked to yours as a \\glossterm{condition}.
          At the end of each subsequent round, if you lost hit points during that round, the target takes \\damagerankone.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 3,
      roles: ['burn'],
      scaling: {
        special: 'Both instances of damage increase by 2 for each rank beyond 3.',
      },
    },

    {
      name: 'Mighty Sanguine Bond',

      // Assume the total damage dealt is doubled. It might trigger 2-3 times, and with a
      // delay, so overall multiplying the damage by 2 seems reasonable.
      // dr6 is 4.5 + 2.25dpp.
      // Double dr3 is 9 + 2dpp.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankthree, and the target's life becomes linked to yours as a \\glossterm{condition}.
          At the end of each subsequent round, if you lost hit points during that round, the target takes \\damagerankthree.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 6,
      roles: ['burn'],
      scaling: {
        special: 'Both instances of damage increase by 1d6 for each rank beyond 6.',
      },
    },

    {
      name: 'Lifebomb',

      // r2 area is drX-1.
      // +1dr for barely avoidable delay.
      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, your life energy begins to surge.
          During your next action, make a \\glossterm{reactive attack} vs. Fortitude against all living \\glossterm{enemies} within a \\smallarea radius from you.
          If you are at full hit points at that time, you gain a \\plus4 accuracy bonus with this attack.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Massive Lifebomb',

      functionsLike: {
        name: 'Lifebomb',
        exceptThat:
          'the radius increases to a \\medarea radius from you, and the damage increases to \\damageranksix.',
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
    },

    // r2 area is drX-1. Calculate as a rank 4 spell, then subtract a full rank for the corpse
    // requirement.
    {
      name: 'Corpse Explosion',

      attack: {
        hit: `\\damagerankthree.`,
        missGlance: true,
        targeting: `
          Choose one Small or larger \\glossterm{unattended} \\glossterm{corpse} within \\shortrange.
          Make an attack vs. Reflex against everything within a \\tinyarea radius from the corpse.
          You gain a \\plus1 accuracy bonus for each size category by which the corpse is larger than Medium.
          The corpse is also destroyed.
        `,
      },
      narrative: `
        You violently discharge the latent magical potential within a corpse, causing it to explode.
      `,
      rank: 3,
      roles: ['clear', 'payoff'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Corpse Explosion',

      functionsLike: {
        name: 'corpse explosion',
        exceptThat:
          'the damage increases to \\damageranksix, and the area increases to a \\smallarea radius from the corpse.',
      },
      narrative: `
        You violently discharge the latent magical potential within a corpse, causing it to explode in a shower of guts and gore.
      `,
      rank: 6,
      roles: ['clear', 'payoff'],
      scaling: 'damage',
    },

    {
      name: 'Withering',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target's body withers.
          It takes a -2 penalty to its Fortitude defense.
          Whenever it suffers a \\glossterm{injury}, this penalty increases by 2.
          This stacks up to a maximum total penalty of -10.
        `,
        targeting: `
          Make an attack vs. Fortitude with a +3 accuracy bonus against one creature within \\medrange.
        `,
      },
      rank: 2,
      roles: ['softener'],
      scaling: 'accuracy',
    },

    // Uncommon reactive damage
    {
      name: 'Retributive Lifebond',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\medarea radius \\glossterm{emanation} from you causes you to suffer an \\glossterm{injury}, make a \\glossterm{reactive attack} vs. Fortitude against it.
        `,
      },
      rank: 2,
      scaling: 'damage',
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Retributive Lifebond',

      attack: {
        hit: `\\damagerankfive.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\medarea radius \\glossterm{emanation} from you causes you to suffer an \\glossterm{injury}, make \\glossterm{reactive attack} vs. Fortitude against it.
        `,
      },
      rank: 5,
      scaling: 'damage',
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Vital Intuition',

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
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against any living creature sharing space with it.
          Generally, this is only possible for Large or larger creatures.
          In addition, whenever a living creature passes through the the wall, you make a \\glossterm{reactive attack} vs. Fortitude against it.
          You can only attack a given target with this spell once per round.
        `,
      },
      rank: 2,
      roles: ['hazard'],
      scaling: 'damage',
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Enervating Wall',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          the damage increases to \\damagerankfive.
          In addition, the area increases to a \\largearealong \\glossterm{wall}.
        `,
        name: 'enervating wall',
      },
      rank: 5,
      roles: ['hazard'],
      scaling: 'damage',
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Vital Regeneration',

      cost: 'See text.',
      effect: `
        At the end of each round, if the target's \\glossterm{fatigue level} does not exceed its \\glossterm{fatigue tolerance}, it automatically removes one of its \\glossterm{vital wounds}.
        It can choose to stop this regeneration if it is conscious, but the regeneration happens automatically if it is unconscious due to vital wounds.
        For each vital wound removed in this way, it increases its \\glossterm{fatigue level} by three.
      `,
      rank: 5,
      roles: ['attune', 'exertion'],
      type: 'Attune (target)',
    },

    {
      name: 'Regeneration',

      effect: `
        At the end of each round, you regain hit points equal to half your \\glossterm{power}.
      `,
      rank: 3,
      roles: ['healing'],
      scaling: { special: 'The healing increases by 2 for each rank beyond 3.' },
      type: 'Attune (deep)',
    },

    {
      name: 'Greater Regeneration',

      effect: `
        At the end of each round, you regain \\hprankthree.
      `,
      rank: 5,
      roles: ['healing'],
      scaling: 'healing',
      type: 'Attune (deep)',
    },

    {
      name: 'Supreme Regeneration',

      effect: `
        At the end of each round, you regain \\hpranksix.
      `,
      rank: 7,
      roles: ['healing'],
      type: 'Attune (deep)',
    },

    // Brief stun is r1. Add +1 area, so we get area rank 3 and spell rank 2.
    {
      name: 'Putrefying Blast',

      attack: {
        hit: `The target is \\glossterm{briefly} \\stunned.`,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} within a \\medarea cone from you.
        `,
      },
      rank: 2,
      roles: ['flash'],
      scaling: 'accuracy',
    },

    // Condition stun is r9. -1 rank for limited scope, -1 rank for self-stun.
    {
      name: 'Greater Putrefying Blast',

      attack: {
        crit: CONDITION_CRIT,
        hit: `The target is \\stunned as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} within a \\largearea cone from you.
          Then, you are \\glossterm{briefly} \\stunned.
        `,
      },
      rank: 7,
      roles: ['softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Drain Life',

      attack: {
        hit: `\\damageranktwo.`,
        injury: `You are \\glossterm{briefly} \\empowered.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 1,
      roles: ['burst', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Drain Life',

      attack: {
        hit: `\\damagerankfive, and any \\glossterm{extra damage} is doubled.`,
        injury: `You are \\glossterm{briefly} \\empowered.`,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['burst', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Siphon Protection',

      // Single defense is 1.0 EA. One rank of area gives a r0 spell with r1 area, which
      // is enough for 0.4 ranks of buff.
      attack: {
        hit: `
          The target \\glossterm{briefly} takes a -2 penalty to the chosen defense.
        `,
        targeting: `
          Choose one of the five defenses: Armor, Brawn, Fortitude, Reflex, or Mental.
          Make an attack vs. Fortitude against up to two creatures within \\shortrange.
          Then, you \\glossterm{briefly} gain a +2 bonus to that defense.
          Since this ability does not have the \\atSwift tag, it does not protect you from attacks during the current phase.
        `,
      },
      rank: 1,
      roles: ['generator', 'softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Intense Siphon Protection',

      // Brief stun is 1.4 EA, so r1. Braced requires 4 ranks. Drop by a rank since the
      // brace is conditional.
      attack: {
        hit: `
          The target is \\glossterm{briefly} \\stunned.
          Then, you are briefly \\braced.
          Since this ability does not have the \\atSwift tag, it does not protect you from attacks during the current phase.
        `,
        targeting: `
          Make an attack vs. Fortitude against up to two creatures within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['generator', 'softener'],
      scaling: 'accuracy',
    },
  ],
};
