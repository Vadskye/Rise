import { MysticSphere } from '.';

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

      // -2d, -1 range level in exchange for the strong miss effect
      attack: {
        hit: `
          The target takes 1d6 + \\glossterm{power} energy damage.
          \\miss The target suffers a \\glossterm{glancing blow} from this attack, even if you missed by more than 2.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting damage unavoidably.
      `,
      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Distant Magic Missile',

      // +2r for range, +1r to offset previous -1d
      attack: {
        hit: `
          The target takes 2d8 + \\glossterm{power} energy damage.
          \\miss The target suffers a \\glossterm{glancing blow} from this attack, even if you missed by more than 2.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\longrange.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting severe damage unavoidably.
      `,
      rank: 4,
      scaling: 'damage',
    },

    {
      name: 'Mighty Magic Missile',

      // +2r to offset previous -2d, +2r for +2d
      // total of +10d
      attack: {
        hit: `
          The target takes 6d10 + \\glossterm{power} energy damage.
          \\miss The target suffers a \\glossterm{glancing blow} from this attack, even if you missed by more than 2.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting massive damage unavoidably.
      `,
      rank: 7,
      scaling: 'damage',
    },

    {
      name: 'Magic Missile Storm',

      // -1d, -1 range level in exchange for the strong miss effect
      attack: {
        hit: `
          Each target takes 1d8 + half \\glossterm{power} energy damage.
          \\miss Each target suffers a \\glossterm{glancing blow} from this attack, even if you missed by more than 2.
        `,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },
      narrative: `
        A barrage of unerring projectiles made of pure magical energy streak towards an area, inflicting damage unavoidably.
      `,
      rank: 3,
      scaling: 'damage',
    },

    {
      name: 'Massive Magic Missile Storm',

      // -1d, -1 range level in exchange for the strong miss effect
      attack: {
        hit: `
          The target takes 2d8 + half \\glossterm{power} energy damage.
          \\miss The target suffers a \\glossterm{glancing blow} from this attack, even if you missed by more than 2.
        `,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} in a \\medarea radius within \\longrange.
        `,
      },
      narrative: `
        A massive barrage of unerring projectiles made of pure magical energy streak towards your foes, inflicting damage unavoidably.
      `,
      rank: 6,
      scaling: 'damage',
    },

    {
      name: 'Suppress Item',

      attack: {
        crit: 'You can sustain this spell as a \\glossterm{free action}.',
        hit: `All magical properties the target has are \\glossterm{suppressed}.`,
        targeting: `
          Make an attack vs. Mental with a +2 \\glossterm{accuracy} bonus against one Large or smaller \\magical object within \\longrange.
          If the object is attended by a creature, the attack must also beat the attending creature's Mental defense.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Dismissal',

      attack: {
        // No relevant crit effect
        // No relevant glance effect
        hit: `The target is treated as if the ability that created it was \\glossterm{dismissed}.
        This usually causes the target to disappear.`,
        targeting: `
        Make an attack against anything within \\medrange.
        If the target is an effect of an ongoing \\magical ability, such as a summoned monster or created object, its defense against this attack is equal to 5 + the \\glossterm{rank} of the effect.
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

          The target's defense against this attack is equal to 5 \\add its \\glossterm{rank}.
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
      name: 'Intense Suppress Magic',

      functionsLike: {
        name: 'suppress magic',
        exceptThat: `
          it can also affect \\abilitytag{Curse} effects, and the range increases to \\distrange.
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
          However, the target's defense increases to 5 \\add twice its rank.
        `,
        name: 'suppress magic',
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Dispel Magic',

      functionsLike: {
        exceptThat: `
          on a hit, the effect ends completely instead of being suppressed.
          In addition, this can also affect \\abilitytag{Curse} effects, and the range increases to \\distrange.
          However, the target's defense increases to 5 \\add twice its rank.
        `,
        name: 'suppress magic',
      },
      rank: 7,
    },

    {
      name: 'Malign Transferance',

      // original targets: ['Yourself or an \\glossterm{ally} within \\medrange', 'One other creature within that range']
      attack: {
        crit: `The effect becomes a \\glossterm{condition} on the struck creature.`,
        // No glance effect; weird shenanigans if you autoremove the conditions
        hit: `
          One magical condition of your choice is removed from yourself or your chosen ally.
          In addition, the struck creature \\glossterm{briefly} suffers the effect of the removed condition.
        `,
        targeting: `
          Choose yourself or one \\glossterm{ally} within \\medrange that is currently affected by a \\magical \\glossterm{condition}.
          In addition, make an attack vs. Mental against one other creature within \\medrange.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Malign Confluence',

      attack: {
        crit: `Each transferred effect becomes a separate \\glossterm{condition} on the struck creature.`,
        // No glance effect; weird shenanigans if you autoremove the conditions
        hit: `
          One magical condition of your choice is removed from each of the five chosen creatures.
          In addition, the struck creature \\glossterm{briefly} suffers the effects of each removed condition. 
        `,
        targeting: `
          Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
          Each chosen creature must be currently affected by a \\magical condition.
          In addition, make an attack vs. Mental against one other creature within \\medrange.
        `,
      },

      rank: 7,
    },

    {
      name: 'Spellvoid',

      effect: `
        Whenever you are targeted by a spell cast by another creature, before determining if it hits you, you absorb the spell.
        It has no effect on you.
        You cannot voluntarily allow spells cast by other creatures to affect you while this effect lasts.
        After you absorb three spells in this way, this effect ends.
      `,
      rank: 7,
      type: 'Attune',
    },

    {
      name: 'Enhance Magic -- Power',

      effect: `
        Whenever you cast a spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can choose to enhance it.
        If you do, you gain a +2 bonus to your \\glossterm{magical power} with that spell.
        After you enhance a spell in this way, this effect ends.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: 'Attune',
    },

    {
      name: 'Enhance Magic -- Distance',

      effect: `
        Whenever you cast a spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can choose to double its range.
        After you enhance a spell in this way, this effect ends.
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
      type: 'Attune',
    },

    {
      name: 'Antimagic Field',

      effect: `
        You radiate an antimagic field within a \\smallarea radius \\glossterm{emanation} from you.
        All \\magical effects within the area that are dismissable or have a duration are \\glossterm{suppressed}.
        This includes attuned spells and magic items, magical conditions, and sustained magical effects.
        However, it does not include passive magical abilities on creatures, such as the ability to cast spells.
        It also does not include \\abilitytag{Curse} effects, which are more difficult to remove.

        Unlike most emanation spells, you cannot exclude yourself from this \\glossterm{emanation}.
        However, this spell does not supress itself.
      `,
      rank: 7,
      type: 'Sustain (standard)',
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
      scaling: {
        6: 'You can choose to create a \\hugearea radius instead.',
      },
      type: 'Attune',
    },

    {
      name: 'Teleportation Ward',

      effect: `
        Teleportation into and out of a \\largearea radius \\glossterm{emanation} from you is impossible.
      `,
      rank: 2,
      scaling: {
        4: 'You can choose to affect a \\hugearea radius instead.',
        6: 'You can choose to affect a \\gargarea radius instead.',
      },
      type: 'Attune',
    },

    {
      name: 'Absorb Magic',

      effect: `
        You gain a +2 bonus to your defenses against \\magical effects.
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
        This can allow you to sustain that ability for longer than 5 minutes.
        This does not allow you to make any choices as part of sustaining the chosen ability, such as telling summoned creatures how to act.
        Instead, you always make the same choice you made the last time you manually sustained the effect.
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Spellseal',

      attack: {
        crit: `The effect ends after the target fails to cast three spells instead of only one.`,
        hit: `As a \\glossterm{condition}, the next time the target tries to cast a spell, the spell automatically fails with no effect instead.
        When the target fails to cast a spell in this way, this effect ends, and the target becomes immune to this spell until it takes a \\glossterm{short rest}.`,
        targeting: `
        Make an attack vs. Fortitude with a +2 bonus to \\glossterm{accuracy} against one creature within \\medrange.
        `,
      },
      rank: 2,
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
      scaling: {
        6: 'You can choose to affect a \\hugearea radius instead.',
      },
      type: 'Attune',
    },

    {
      name: 'Spellward',

      effect: `
        Choose a \\glossterm{zone} within \\longrange.
        You can choose this spell's radius, up to a maximum of a \\largearea radius.
        Whenever a creature casts a spell in the area, that spell has a 50\\% chance to fail with no effect.
      `,
      narrative: `
        You break an area's connection to magic.
      `,
      rank: 5,
      scaling: {
        7: 'The maximum area increases to a \\hugearea radius.',
      },
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

      functionsLike: {
        name: 'total defense',
        abilityType: 'ability',
        exceptThat: `
          whenever a creature within \\medrange of you misses or \\glossterm{glances} you with a \\magical attack this round, that creature treats itself as a target of that strike in addition to any other targets.
          It cannot choose to reduce its accuracy or damage against itself.
        `,
      },
      rank: 3,
      tags: ['Swift'],
    },

    {
      name: 'Reflect Targeted Magic',

      functionsLike: {
        name: 'total defense',
        abilityType: 'ability',
        exceptThat: `
          any \\glossterm{targeted} \\magical abilities that would target you this round also target the creature using that ability in addition to you.
          It cannot choose to reduce its accuracy or damage against itself.
          Any other targets of the ability are affected normally.
        `,
      },
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
      name: 'Permanent Suppress Magic Aura',

      castingTime: '24 hours',
      effect: `
        Choose one Large or smaller \\glossterm{unattended} object within \\shortrange.
        All magical effects on the target are undetectable with abilities that detect magic.
        This effect is permanent.
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
