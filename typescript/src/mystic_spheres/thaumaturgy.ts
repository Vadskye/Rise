import { MysticSphere } from '.';
import { CONDITION_CRIT } from './constants';

export const thaumaturgy: MysticSphere = {
  name: 'Thaumaturgy',
  shortDescription: 'Suppress and manipulate magical effects.',
  sources: ['arcane', 'domain'],

  cantrips: [
    {
      name: 'Detect Magic',

      effect: `
        Choose a \\arealarge \\glossterm{cone} from you.
        You know whether any \\magical abilities were activated in that area since the start of the last round.
        This does not provide any information about passive magical effects, such as attuned spells.
        It also does not provide any information about the number or location of those magical effects.
      `,
      scaling: {
        2: `
          You also learn if any passive magical effects existed in the area.
          This is separate from your knowledge of active magical effects.
        `,
        4: 'You can choose to create a \\hugearea cone instead.',
        6: `You also learn the number of magical effects in the area.`,
      },
      tags: ['Detection'],
    },

    {
      name: 'Sense Magical Potential',

      effect: `
        You discern whether one creature within \\shortrange has any \\magical abilities.
        This does not give you any information about the nature of those magical abilities.
      `,
      scaling: {
        2: `You can also discern whether the target has the ability to cast spells of any kind.`,
        4: `You can also discern which \\glossterm{magic sources} the target has access to, if they have access to any.`,
        6: `You can also discern which \\glossterm{mystic spheres} the target has access to, if they have access to any.`,
      },
    },
  ],
  spells: [
    {
      name: 'Magic Missile',

      // -1 range in exchange for the strong miss effect
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange.
          This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting damage unavoidably.
      `,
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Distant Magic Missile',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against anything within \\longrange.
          This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting severe damage unavoidably.
      `,
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Magic Missile',

      // -1 range for miss effect and cover/concealment effect
      attack: {
        hit: `
          \\damagerankfour.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange.
          This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting massive damage unavoidably.
      `,
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Magic Missile Storm',

      // -1 range for ignoring cover
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
          This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
        `,
      },
      narrative: `
        A barrage of unerring projectiles made of pure magical energy streak towards an area, inflicting damage unavoidably.
      `,
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Magic Missile Storm',

      // -1 range for ignoring cover
      attack: {
        hit: `
          \\damageranksix.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
          This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
        `,
      },
      narrative: `
        A massive barrage of unerring projectiles made of pure magical energy streak towards your foes, inflicting damage unavoidably.
      `,
      rank: 7,
    },

    {
      name: 'Suppress Item',

      attack: {
        hit: `All magical properties the target has are \\glossterm{suppressed}.`,
        targeting: `
          Make an attack vs. Mental with a +4 \\glossterm{accuracy} bonus against one Large or smaller \\magical object within \\medrange.
          If the object is attended by a creature, the attack must also beat the attending creature's Mental defense.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Dismissal',

      attack: {
        hit: `The target is treated as if the ability that created it was \\glossterm{dismissed}.
        This usually causes the target to disappear.`,
        targeting: `
        Make an attack against anything within \\medrange.
        If the target is an effect of an ongoing \\magical ability, such as a summoned monster or created object, its defense against this attack is equal to 5 + twice the \\glossterm{rank} of the effect.
        Otherwise, this spell has no effect.
        `,
      },

      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Suppress Magic',

      attack: {
        hit: `The effect is \\glossterm{suppressed} as long as you \\glossterm{sustain} this ability.`,
        targeting: `
          Choose a single 5-ft. square within \\medrange.
          Make an attack against a random \\magical effect active in that square, if any exist.
          This can only target magical effects that are sustained or which have a specific duration.
          This includes brief effects, conditions, and \\abilitytag{Sustain} abilities, but it does not include attuned effects or permanent magical abilities on creatures.
          It also does not include \\abilitytag{Curse} effects, which are more difficult to remove.
          The attack cannot \\glossterm{explode} by any means.

          The target's defense against this attack is equal to 5 \\add twice its \\glossterm{rank}.
          For effects that have no specific rank, such as some monster abilities, treat their rank as being equal to one third of their level.

          This spell cannot be used to interrupt or negate immediate effects, such as spells being cast.
          Identifying non-visual magical effects can be difficult, so you may have to guess which area to target.
        `,
      },

      rank: 2,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Greater Suppress Magic',

      functionsLike: {
        name: 'suppress magic',
        exceptThat: `
          it can also affect \\abilitytag{Curse} effects.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Dispel Magic',

      functionsLike: {
        exceptThat: `
          on a hit, the effect ends completely instead of being suppressed.
        `,
        name: 'suppress magic',
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Spellvoid',

      effect: `
        Whenever you are targeted by a spell cast by another creature, before determining if it hits you, you absorb the spell.
        It has no effect on you.
        This does not prevent the spell from affecting other creatures.
        You cannot voluntarily allow spells cast by other creatures to affect you while this effect lasts.
        After you absorb three spells in this way, this effect ends.
      `,
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: 'Enhance Magic -- Might',

      effect: `
        Whenever you cast a damaging spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can choose to enhance it.
        If you do, the spell deals 1d4 \\glossterm{extra damage} when it deals damage for the first time.
        After you enhance a spell in this way, your attunement to this ability ends.
      `,
      rank: 1,
      scaling: {
        3: `The extra damage increases to 1d8.`,
        5: `The extra damage increases to 3d6.`,
        7: `The extra damage increases to 6d6.`,
      },
      type: 'Attune',
    },

    {
      name: 'Enhance Magic -- Precision',

      effect: `
        Whenever you cast a spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can choose to gain a +4 accuracy bonus when you make your first attack with it.
        After you enhance a spell in this way, your attunement to this ability ends.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Enhance Magic -- Echo',

      effect: `
        Whenever you cast a spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can choose to echo it.
        If you do, the spell takes effect again during your next action.
        It has the same choices for all decisions, such as targets.
        After you echo a spell in this way, this effect ends.
      `,
      rank: 5,
      type: 'Attune (deep)',
    },

    {
      name: 'Dimensional Seal',

      attack: {
        hit: `
          The target cannot be \\glossterm{teleported}.
          An object affected by this spell is left behind if it is carried by a creature that teleports.
        `,
        targeting: `
          Make an attack vs. Mental with a +2 accuracy bonus against anything within \\medrange.
        `,
      },

      rank: 2,
      scaling: 'accuracy',
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Dimensional Lock',

      effect: `
        This spell creates a dimensional lock in a \\largearea radius \\glossterm{zone} from your location.
        Extraplanar travel into or out of the area is impossible.
        This prevents all \\abilitytag{Manifestation} effects and effects teleport targets or move them between planes.
      `,
      rank: 4,
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Teleportation Ward',

      effect: `
        Teleportation into and out of a \\largearea radius \\glossterm{emanation} from you is impossible.
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Absorb Magic',

      effect: `
        You gain a +1 bonus to your defenses against \\magical effects.
        In addition, the next time a \\magical attack beats your defenses, it has no effect on you.
        After you negate two attacks in this way, this spell's effect ends.
      `,
      rank: 6,
      type: 'Attune (deep)',
    },

    {
      name: 'Second Mind',

      effect: `
        Choose a \\magical ability you are currently sustaining that requires either a \\glossterm{free action} or a \\glossterm{minor action} to sustain.
        That ability is automatically sustained as long as this effect lasts.
        % TODO: is this safe?
        This can allow you to sustain that ability for longer than 5 minutes.
        This does not allow you to make any choices as part of sustaining the chosen ability, such as telling summoned creatures how to act.
        Instead, you always make the same choice you made the last time you manually sustained the effect.
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Spellseal',

      // -2r relative to mind blank's effect because it doesn't always work
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target's magic is partially sealed as a \\glossterm{condition}.
          The first time it tries to cast a spell while it is below its maximum \\glossterm{hit points}, the spell automatically fails with no effect instead.
          When the target fails to cast a spell in this way, this effect ends, and the target becomes immune to this spell until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Fortitude with a +2 bonus to \\glossterm{accuracy} against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Efficient Spellseal',

      functionsLike: {
        name: 'spellseal',
        exceptThat: 'it works even if the target is at full hit points.',
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Delay Teleportation',

      effect: `
        Whenever a creature or object would teleport into a \\largearea radius \\glossterm{emanation} from you from outside of that area, that teleportation is delayed by a round.
        The teleporting creature or object remains stuck in the Astral Plane and can take no actions during that time.
        Creatures delayed in this way do not experience a delay, though they may be able to deduce that they were delayed based on observable evidence.

        Whenever something is delayed in this way, you learn its approximate size and location within the area, allowing you to know which space or spaces it will occupy when it arrives.
        Creatures and objects delayed by this effect remain delayed even if you move such that their destination is no longer within the area of this effect.
        This does not affect teleportation away from the area unless that teleportation's destination lies within the area.
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Dead Magic Zone',

      effect: `
        Choose a \\glossterm{zone} within \\medrange.
        You can choose this spell's radius, up to a maximum of a \\medarea radius.
        Whenever a creature casts a spell in the area, that spell has a 50\\% chance to fail with no effect.
      `,
      narrative: `
        You break an area's connection to magic.
      `,
      rank: 5,
      type: 'Sustain (minor)',
    },

    {
      name: 'Cryptic Spells',

      effect: `
        Whenever you cast a spell, you may choose to mimic the identifying characteristics of a different spell you know.
        If you do, the \\glossterm{verbal components}, \\glossterm{somatic components}, visual effects, and magical aura of the spell you are casting change to match the mimic spell.
        This affects inspection of the spell itself by any means.
        However, it does not alter the mechanical effects of the spell in any way.
        This change cannot fully remove verbal, somatic, or visual components.
        If the mimic spell does not have an identifying characteristic, the original characteristic of the spell you are casting is unchanged.

        An observer who gets a \\glossterm{critical success} to identify the spell's effects can identify the true spell that you are casting (see \\pcref{Identify Magical Effect}).
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Reflect Magic',

      effect: `
        You gain a +2 bonus to all defenses this round.
        In addition, whenever a creature within \\medrange of you misses or \\glossterm{glances} you with a \\magical attack this round, that creature treats itself as a target of that strike in addition to any other targets.
        The attacker cannot choose to reduce its accuracy or damage against itself.
      `,
      rank: 3,
      tags: ['Swift'],
    },

    {
      name: 'Reflect Targeted Magic',

      effect: `
        You gain a +2 bonus to all defenses this round.
        In addition, any \\glossterm{targeted} \\magical abilities that would target you this round also target the creature using that ability in addition to you.
        It cannot choose to reduce its accuracy or damage against itself.
        Any other targets of the ability are affected normally.
      `,
      rank: 5,
      tags: ['Swift'],
    },

    {
      name: 'Wall of Magic Impedance',

      effect: `
        You create a \\medarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a shimmering magical membrane that does not block sight.
        Objects, creatures, and \\glossterm{mundane} abilities can pass through the wall freely, but any \\magical ability treats the wall as an impassable barrier.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 5,
      scaling: {
        7: 'You can choose to create a \\largearealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
  ],
  // TODO: add a ritual that can remove domination, or rewrite existing rituals to work on
  // domination. The trick is that it's an attunement by another creature who is not
  // present, and we generally don't want to remove attunements.
  rituals: [
    {
      name: 'Dispel Curse',

      castingTime: '24 hours',
      effect: `
        Choose yourself or one \\glossterm{ally} within \\shortrange.
        All curses affecting the target are removed.
        This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
        However, it can allow the target to remove any cursed items it has equipped.
      `,
      rank: 3,
    },
    {
      name: 'Suppress Magic Aura',

      castingTime: 'one minute',
      effect: `
        Choose one \\glossterm{ally} or \\glossterm{unattended} object within \\shortrange.
        All magical effects on the target, including any magic items a target creature wears or carries, are undetectable with abilities that detect magic.
      `,
      rank: 2,
      type: 'Attune',
    },
    {
      name: 'Persistent Suppress Magic Aura',

      castingTime: '24 hours',
      effect: `
        Choose one Large or smaller \\glossterm{unattended} object within \\shortrange.
        All magical effects on the target are undetectable with abilities that detect magic.
        This effect lasts for one year.
      `,
      rank: 4,
    },
    {
      name: 'Analyze Magic',

      castingTime: 'one hour',
      effect: `
        Make a Knowledge check to identify a magical effect with a +5 bonus (see \\pcref{Identify Magical Effect}).
      `,
      rank: 2,
    },
    {
      name: 'Greater Analyze Magic',

      castingTime: 'one hour',
      effect: `
        Make a Knowledge check to identify a magical effect with a +10 bonus (see \\pcref{Identify Magical Effect}).
      `,
      rank: 4,
    },
    {
      name: 'Supreme Analyze Magic',

      castingTime: 'one hour',
      effect: `
        Make a Knowledge check to identify a magical effect with a +15 bonus (see \\pcref{Identify Magical Effect}).
      `,
      rank: 6,
    },
  ],
};
