import { MysticSphere } from '.';
import { CONDITION_CRIT } from './constants';

export const vivimancy: MysticSphere = {
  name: 'Vivimancy',
  shortDescription: 'Manipulate life energy to aid allies or harm foes.',
  sources: ['arcane', 'divine', 'pact', 'nature'],

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
        3: `The healing increases to four \\glossterm{hit points}.`,
        5: `The healing increases to eight \\glossterm{hit points}.`,
        7: `The healing increases to sixteen \\glossterm{hit points}.`,
      },
      tags: ['Swift'],
    },
  ],
  spells: [
    {
      name: 'Lifesteal Grasp',

      // baseline for multi-defense grasp is dr4, drop to dr3 for healing
      attack: {
        hit: `
          \\damagerankthree{energy}.
          If the target loses \\glossterm{hit points}, you can increase your \\glossterm{fatigue level} by one. 
          % dr1
          When you do, you regain 1d6 hit points +1 per 2 power at the end of the round.
          This healing does not have the \\abilitytag{Swift} tag, so it applies after attacks during the current phase.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex and Fortitude against a living creature you \\glossterm{touch}.
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
        // healing is dr4h
        exceptThat: 'the damage increases to \\damageranksix{energy}, and the healing increases to 1d8 per 3 power.',
      },
      rank: 4,
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Lifesteal',

      // +1r for HP theft
      attack: {
        hit: `
          \\damagerankone{energy}.
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
        // healing is dr6h
        exceptThat: 'the damage increases to \\damagerankfivehigh{energy}, and the healing increases to 1d8 per 2 power.',
      },
      rank: 6,
      tags: [],
    },

    {
      name: 'Restoration',

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        % dr1
        The target regains 1d8 \\glossterm{hit points} +1 per 2 power and increases its \\glossterm{fatigue level} by one.
      `,
      rank: 1,
      scaling: { special: 'The healing increases by +2 for each rank beyond 1.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Restoration',

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        % dr4h
        The target regains 1d6 hit points plus 1d6 per 2 power and increases its \\glossterm{fatigue level} by one.
      `,
      rank: 4,
      // At rank 5, expected power is about 10, so dr5h is 6d6 = 21, and dr6h would be
      // 22.5.
      scaling: { special: 'The healing increases by 1d6 for each rank beyond 4.' },
      tags: ['Swift'],
    },

    {
      name: 'Total Restoration',

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\shortrange.
        % dr7h
        The target regains 1d6 \\glossterm{hit points} per power and increases its \\glossterm{fatigue level} by one.
      `,
      rank: 7,
      tags: ['Swift'],
    },

    {
      name: 'Circle of Life',

      // TODO: unclear rank
      effect: `
        You create a zone of life energy in a \\smallarea radius around your location.
        When you cast this spell, and during each of your subsequent actions, each living creature in the area regains 1d8 hit points +1 per power.
        This cannot increase a target's hit points above half its maximum hit points.
      `,
      rank: 4,
      scaling: { special: 'The healing increases by 1d8 for each rank beyond 4.' },
      tags: ['Sustain (standard)', 'Swift'],
    },

    {
      name: 'Cure Vital Wound',

      effect: `
        Choose yourself or a living \\glossterm{ally} within \\medrange.
        The target removes one \\glossterm{vital wound}.
        It increases its \\glossterm{fatigue level} by three for each vital wound removed this way.
      `,
      rank: 5,
      scaling: { 7: `The target can remove two \\glossterm{vital wounds}.` },
    },

    {
      name: 'Inflict Wound',

      attack: {
        hit: `
          \\damagerankone{energy}.
          If the target loses \\glossterm{hit points} from this damage, it takes the damage again.
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
        exceptThat: 'the damage increases to \\damagerankfivehigh{energy}.',
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
      scaling: {
        6: `You can ignore two vital wound effects.`,
      },
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
      type: 'Attune (target)',
    },

    {
      name: 'Circle of Death',

      attack: {
        hit: `
          \\damageranktwo{energy}.
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
          \\damagerankfivehigh{energy}.
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
        In addition, you immediately gain that many hit points.
        When this ability ends, you lose \\glossterm{hit points} equal to the number of hit points you gained this way.
      `,
      rank: 1,
      scaling: {
        3: 'The bonus increases to +8.',
        5: 'The bonus increases to +16.',
        7: 'The bonus increases to +32.',
      },
      type: 'Attune',
    },

    {
      name: 'Mass Lifegift',

      functionsLike: {
        mass: true,
        name: 'Lifegift',
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: 'The bonus increases to +8.',
        7: 'The bonus increases to +16.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Wellspring of Life',

      // This has a larger effect on large healing values, so it's not as obvious of a
      // combo with incremental regeneration-style healing. 
      effect: `
        Whenever you regain hit points, you regain the maximum possible number instead of rolling.
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Avasculate',

      // HP loss is treated as t3.5 debuff
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

        Whenever you cast a damaging spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can choose to enhance it.
        If you do, the spell deals 1d6 energy \\glossterm{extra damage} when it deals damage for the first time.
        In addition, the spell can target objects and nonliving creatures as if they were living creatures.
        However, you also lose 2 hit points.
        Alternately, you can increase this hit point loss to be equal to your maximum hit points.
        If you do, you gain a +5 accuracy bonus with the attack.

        After you enhance a spell in this way, this effect ends.
      `,
      rank: 1,
      scaling: {
        3: `The extra damage increases to 1d10, and the hit point loss increases to 4.`,
        5: `The extra damage increases to 2d10, and the hit point loss increases to 8.`,
        7: `The extra damage increases to 4d10, and the hit point loss increases to 16.`,
      },
      type: 'Attune',
    },

    {
      name: 'Lifetap Slash',

      // +1dr due to self damage
      attack: {
        hit: `\\damagerankthreehigh{slashing}.`,
        targeting: `
          You must be alive to cast this spell.

          Make an attack vs. Armor against anything within \\medrange.
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
        hit: `\\damageranksixhigh{slashing}.`,
        targeting: `
          You must be alive to cast this spell.

          Make an attack vs. Armor against anything within \\medrange.
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
        hit: `\\damagerankthreehigh{bludgeoning}.`,
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
        hit: `\\damageranksixhigh{bludgeoning}.`,
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
      name: 'Corpse Explosion',

      attack: {
        hit: `\\damagerankone{bludgeoning}.`,
        missGlance: true,
        targeting: `
          Choose one Small or larger corpse within \\medrange.
          Make an attack vs. Reflex against everything within a \\smallarea radius from the corpse.
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
        exceptThat: 'the damage increases to \\damagerankfivehigh{bludgeoning}.',
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
        // No relevant glance effect
        hit: `As a \\glossterm{condition}, the target's body withers.
        It takes a -2 penalty to its Fortitude defense, and it cannot regain \\glossterm{hit points} or \\glossterm{damage resistance}.
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
        hit: `\\damagerankonelow{energy}.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\medarea radius \\glossterm{emanation} from you causes you to lose \\glossterm{hit points}, make a \\glossterm{reactive attack} vs. Fortitude against it.
        `,
      },
      rank: 1,
      scaling: { special: 'The damage increases by +1 for each rank beyond 1.' },
      type: 'Attune (deep)',
    },

    {
      name: 'Massive Retributive Lifebond',

      attack: {
        hit: `\\damagerankthreelow{energy}.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\hugearea radius \\glossterm{emanation} from you causes you to lose \\glossterm{hit points}, make \\glossterm{reactive attack} vs. Fortitude against it.
        `,
      },
      rank: 4,
      scaling: { special: 'The damage increases by 1d6 for each rank beyond 4.' },
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Retributive Lifebond',

      attack: {
        hit: `\\damageranksixlow{energy}.`,
        targeting: `
          Whenever an \\glossterm{enemy} within a \\medarea radius \\glossterm{emanation} from you causes you to lose \\glossterm{hit points}, make a \\glossterm{reactive attack} vs. Fortitude against it.
        `,
      },
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: "Healer's Intuition",

      effect: `
        If you have Medicine as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
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
        You gain \\trait{lifesense} with a 60 foot range, allowing you to sense the location of living creatures without light (see \\pcref{Lifesense}).
      `,
      rank: 1,
      scaling: {
        3: `The range increases to 90 feet.`,
        5: `The range increases to 120 feet.`,
        7: `The range increases to 150 feet.`,
      },
      type: 'Attune',
    },
    {
      name: 'Lifesight',

      effect: `
        You gain \\trait{lifesight} with a 30 foot range, allowing you to see living creatures without light (see \\pcref{Lifesight}).
      `,
      rank: 3,
      scaling: {
        5: `The range increases to 60 feet.`,
        7: `The range increases to 90 feet.`,
      },
      type: 'Attune',
    },

    {
      name: 'Mass Lifesense',

      functionsLike: {
        mass: true,
        name: 'Lifesense',
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: 'The range increases to 90 feet.',
        7: 'The range increases to 120 feet.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Mass Lifesight',

      functionsLike: {
        mass: true,
        name: 'Lifesight',
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: 'The range increases to 60 feet.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Wall of Death',

      attack: {
        hit: `\\damagerankone{energy}.`,
        missGlance: true,
        targeting: `
          You create a \\medarealong \\glossterm{wall} of death within \\medrange.
          Whenever a living creature passes through the wall, you make a \\glossterm{reactive attack} vs. Fortitude against it.
          In addition, when you cast this spell and during each of your subsequent actions, make an attack vs. Fortitude against any creature currently sharing space with it.
          Generally, this is only possible for Large or larger creatures.
          You can only attack a given target with this spell once per \\glossterm{phase}.

          After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Wall of Death',

      functionsLike: {
        name: 'wall of death',
        exceptThat: `
          the damage increases to \\damagerankfourhigh{energy}.
          In addition, the area increases to a \\largearealong \\glossterm{wall}, and the range increases to \\longrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },
  ],
  // TODO: should the "soul" spells move elsewhere? They don't fit neatly into druid
  // narrative tropes, and they undercut the idea that this is the "life" sphere.
  rituals: [
    {
      name: 'Remove Disease',

      castingTime: 'one hour',
      effect: `
          All diseases affecting yourself or one \\glossterm{ally} within \\medrange are removed.
      `,
      rank: 2,
    },

    {
      name: 'Restore Senses',

      castingTime: 'one hour',
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        One of the target's physical senses, such as sight or hearing, is restored to full capacity.
        This can heal both magical and mundane effects, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).
      `,
      rank: 3,
    },

    {
      name: 'Corpse Communion',

      castingTime: '1 hour',
      effect: `
        You ask a corpse a single yes or no question.
        In its afterlife, the soul that inhabited the corpse becomes aware of your question and can answer yes or no as it chooses.
        It receives no magical insight into your identity, but it hears your question in your words.
        The corpse answers yes or no if the soul wishes to, but no other communication is possible.
        This requires a corpse with an intact mouth or other speaking apparatus.
      `,
      rank: 3,
    },

    {
      name: 'Greater Corpse Communion',

      castingTime: '1 hour',
      functionsLike: {
        name: 'corpse communion',
        exceptThat: `
          the corpse can answer with a single full sentence, rather than only with "yes" or "no".
        `,
      },
      rank: 6,
    },

    {
      name: 'Reincarnation',

      castingTime: '24 hours',
      effect: `
        Choose one Diminuitive or larger piece of a humanoid corpse.
        It must have been part of the original creature's body at the time of death.
        The creature the corpse belongs to is \\glossterm{resurrected}.
        A new healthy body is created for it, so the corpse does not need to be fully intact.

        A reincarnated creature is identical to the original creature in all respects, except for its species.
        The creature's species is replaced with a random species from \\tref{Humanoid Reincarnations}.
        Its appearance changes as necessary to match its new species, though it retains the general shape and distinguishing features of its original appearance.
        The creature loses all attribute modifiers and abilities from its old species, and gains those of its new species.
        However, its languages are unchanged.

        This ritual can only be learned through the nature \\glossterm{magic source}.
      `,
      materialCost: true,
      rank: 4,
      tableText: `
        \\begin{dtable}
            \\lcaption{Humanoid Reincarnations}
            \\begin{dtabularx}{\\columnwidth}{l X}
                \\tb{d\\%} & \\tb{Incarnation} \\tableheaderrule
                01--13 & Dwarf \\\\
                14--26 & Elf \\\\
                27--40 & Gnome \\\\
                41--52 & Half-elf \\\\
                53--62 & Half-orc \\\\
                63--74 & Halfling \\\\
                75--100 & Human \\\\
            \\end{dtabularx}
        \\end{dtable}
      `,
      tags: ['Creation'],
    },

    {
      name: 'Fated Reincarnation',

      castingTime: '24 hours',
      functionsLike: {
        exceptThat: `
          the target is reincarnated as its original species instead of as a random species.
        `,
        name: 'reincarnation',
      },
      rank: 6,
      tags: ['Creation'],
    },

    {
      name: 'Purge Curse',

      castingTime: '24 hours',
      effect: `
        All curses affecting yourself or one \\glossterm{ally} within \\medrange are removed.
        This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
        However, it can allow the target to remove any cursed items it has equipped.
      `,
      rank: 3,
    },

    {
      name: 'True Regeneration',

      castingTime: '24 hours',
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        All of the target's \\glossterm{vital wounds} are healed.
        In addition, any of the target's severed body parts or missing organs grow back by the end of the next round.
      `,
      rank: 3,
    },

    {
      name: 'Resurrection',

      castingTime: '24 hours',
      effect: `
        Choose one corpse within \\shortrange.
        The corpse is \\glossterm{resurrected} (see \\pcref{Resurrection}).
      `,
      materialCost: true,
      rank: 4,
    },

    {
      name: 'Greater Resurrection',

      // original targets: Special
      castingTime: '24 hours',

      effect: `
        Choose a dead creature.
        You must explicitly and unambiguously specify the identity of the creature being resurrected.
        That creature is \\glossterm{resurrected} (see \\pcref{Resurrection}).
        A new healthy body is created for it, so you do not need an intact corpse.
      `,
      materialCost: true,
      rank: 6,
      tags: ['Creation'],
    },

    {
      name: 'Soul Bind',

      castingTime: 'one hour',
      effect: `
        % Is this clear enough that you can't use the same gem for this ritual twice?
        Choose a nonmagical gem you hold that is at least rank 5 (25,000 gp).
        In addition, choose one intact corpse within \\shortrange.
        A fragment of the soul of the creature that the target corpse belongs to is magically imprisoned in the chosen gem.
        This does not remove the creature from its intended afterlife.
        However, it prevents the creature from being \\glossterm{resurrected}, and prevents the corpse from being used to create undead creatures, as long as the gem is intact.
        A creature holding the gem may still resurrect or reanimate the creature.
        If the gem is shattered, the fragment of the creature's soul returns to its body.
      `,
      rank: 6,
    },

    // TODO: prohibit warlock and druid necromancers???
    {
      name: 'Animate Dead',

      castingTime: 'one hour',
      effect: `
        Choose up to four corpses within \\shortrange.
        The combined levels of all targets cannot exceed your level.
        Each target becomes an undead creature that obeys your mental commands.

        You choose whether to create a skeleton or a zombie from each corpse.
        Creating a zombie require a mostly intact corpse, including most of the flesh.
        Creating a skeleton only requires a mostly intact skeleton.
        If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.

        As a \\glossterm{minor action}, you can mentally command your undead.
        The command must be no more than 10 words, and overly complex commands may cause strange and unintended behavior.
        It affects any undead you created with this ability that are within \\distrange of you.
        Undead will obey their most recent command indefinitely.
      `,
      materialCost: true,
      rank: 3,
      type: 'Attune (deep)',
    },
  ],
};
