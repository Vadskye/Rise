import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT } from '../constants';

export const thaumaturgy: MysticSphere = {
  name: 'Thaumaturgy',
  shortDescription: 'Suppress and manipulate magical effects.',
  sources: ['arcane', 'domain'],

  cantrips: [
    {
      name: 'Detect Magic',

      effect: `
        Choose a \\arealarge cone from you.
        You know whether any \\magical effects exist in the area.
        This includes active spell effects, magical items, and any other magic that is currently affecting the area or creatures in the area.
        It does not include passive magical abilities on creatures in the area, such as the ability to cast spells.
        It also does not provide any information about the number or location of those magical effects.
      `,
      roles: ['narrative'],
      tags: ['Detection'],
    },
  ],
  spells: [
    {
      name: 'Magic Missile',

      // -1dr in exchange for miss + cover/concealment
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against something within \\shortrange.
          This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting damage unavoidably.
      `,
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
    },

    // -1dr for miss + cover/concealment, -1dr for long range
    {
      name: 'Distant Magic Missile',

      attack: {
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against something within \\longrange.
          This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting severe damage unavoidably.
      `,
      rank: 7,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Magic Missile',

      // -1dr for miss effect and cover/concealment effect.
      // We cheat a bit to get this to have double extra damage; a normal rank 4 short
      // range damage spell would have double extra damage.
      attack: {
        hit: `
          \\damagerankfour, and any \\glossterm{extra damage} is doubled.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against something within \\shortrange.
          This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
        `,
      },
      narrative: `
        An unerring projectile made of pure magical energy streaks towards your foe, inflicting massive damage unavoidably.
      `,
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
    },

    // treat rank as 1 lower for determining area, but not damage. Ignoring cover and miss
    // chances is less exciting for AOE than single target, since single target also gets
    // the half damage on miss effect.
    {
      name: 'Magic Missile Storm',

      attack: {
        hit: `
          \\damagerankfour.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} within a \\largearea radius from you.
          This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
        `,
      },
      narrative: `
        A barrage of unerring projectiles made of pure magical energy streak towards an area, inflicting damage unavoidably.
      `,
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
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
      roles: ['softener'],
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Dismissal',

      attack: {
        hit: `The target is treated as if the ability that created it was \\glossterm{dismissed}.
        This usually causes the target to disappear.`,
        targeting: `
        Make an attack against something within \\medrange.
        If the target is an effect of an ongoing \\magical ability, such as a summoned monster or created object, its defense against this attack is equal to 5 + twice the \\glossterm{rank} of the effect.
        Otherwise, this spell has no effect.
        `,
      },

      rank: 2,
      roles: ['softener'],
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
      roles: ['softener'],
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
      roles: ['softener'],
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
      roles: ['softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Imbue Weapon',

      effect: `
        Choose one weapon you are touching and proficient with.
        You can use the higher of your \\glossterm{magical power} and \\glossterm{mundane power} to determine your damage with \\glossterm{strikes} using that weapon (see \\pcref{Power}).
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Spellvoid',

      effect: `
        Whenever you are targeted by a spell cast by another creature, before determining if it hits you, you absorb the spell.
        It has no effect on you.
        This does not prevent the spell from affecting other creatures.
        You cannot voluntarily allow spells cast by other creatures to affect you while this effect lasts.
        After you absorb three spells in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 7,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Enhance Magic -- Might',

      effect: `
        Whenever you cast a spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can activate this effect as a \\glossterm{minor action}.
        If you do, the spell deals 1d6 \\glossterm{extra damage} when it deals damage for the first time.
        After you enhance a spell in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The extra damage increases to 2d6.`,
        5: `The extra damage increases to 2d10.`,
        7: `The extra damage increases to 4d10.`,
      },
      type: 'Attune',
    },

    {
      name: 'Enhance Magic -- Precision',

      effect: `
        Whenever you cast a spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can activate this effect as a \\glossterm{minor action}.
        If you do, you become \\focused and \\honed for the rest of that round.
        After you enhance a spell in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    // Repeating is basically 1 EA, but it seems scary for some reason, so call it rank 4
    {
      name: 'Enhance Magic -- Echo',

      effect: `
        Whenever you cast a spell that does not have the \\abilitytag{Sustain} or \\abilitytag{Attune} tags, you can activate this effect as a \\glossterm{minor action}.
        If you do, the spell \\glossterm{repeats} during your next action.
        After you enhance a spell in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Dimensional Seal',

      attack: {
        hit: `
          The target cannot be \\glossterm{teleported}.
          An object affected by this spell is left behind if it is carried by a creature that teleports.
        `,
        targeting: `
          Make an attack vs. Mental with a +2 accuracy bonus against something within \\medrange.
        `,
      },
      rank: 2,
      roles: ['narrative'],
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
      roles: ['narrative'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Absorb Magic',

      effect: `
        You gain a +1 \\glossterm{enhancement bonus} to your defenses against \\magical effects.
        In addition, the next time a \\magical attack beats your defenses, it has no effect on you.
        After you negate two attacks in this way, this spell's effect ends.
      `,
      rank: 6,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Second Mind',

      effect: `
        Choose a \\magical ability you are currently sustaining that requires either a \\glossterm{free action} or a \\glossterm{minor action} to sustain.
        That ability is automatically sustained as long as this effect lasts.
        % Divine Offering breaks permanent sustain; there are probably others
        This can allow you to sustain that ability for longer than 5 minutes.
        However, the ability automatically ends after 10 minutes, ending your attunement to this spell.

        Automatically sustaining an ability with this spell does not allow you to make any new choices, such as giving summoned creatures new instructions.
        Instead, you always make the same choice you made the last time you manually sustained the effect.
        You can still manually sustain the ability to change your choices while this spell is active.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Spellseal',

      // Action skip is 2 EA and must be combined with limited scope, so we get r3. Drop
      // to r1 because it only works on spellcasters.
      attack: {
        hit: `
          The target's magic is partially sealed as a \\glossterm{condition}.
          The first time it tries to cast a spell, the spell automatically fails with no effect instead.
          When the target fails to cast a spell in this way, this ability is \\glossterm{dismissed}, and the target becomes immune to this spell until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 1,
      roles: ['stasis'],
      scaling: 'accuracy',
    },

    {
      name: 'Delay Teleportation',

      effect: `
        Whenever a creature or object would teleport into a \\hugearea radius \\glossterm{emanation} from you from outside of that area, that teleportation is delayed by a round.
        The teleporting creature or object remains stuck in the Astral Expanse and can take no actions during that time.
        % TODO: should they experience a delay?
        Creatures delayed in this way do not experience a delay, though they may be able to deduce that they were delayed based on observable evidence.

        Whenever something is delayed in this way, you learn its approximate size and location within the area, allowing you to know which space or spaces it will occupy when it arrives.
        Creatures and objects delayed by this effect remain delayed even if you move such that their destination is no longer within the area of this effect.
        This does not affect teleportation away from or within the area.
      `,
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
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
      roles: ['narrative'],
      type: 'Attune',
    },

    {
      name: 'Reflect Magic',

      effect: `
        You are \\braced this round.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
        In addition, whenever a creature within \\medrange of you misses or \\glossterm{glances} you with a \\magical attack this round, that creature treats itself as a target of that attack in addition to any other targets.
        The attacker cannot choose to reduce its accuracy or damage against itself.
      `,
      rank: 2,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Greater Reflect Magic',

      effect: `
        You are \\braced this round.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
        In addition, whenever a creature within \\medrange of you makes a \\magical attack against you this round, that creature treats itself as a target of that attack in addition to any other targets.
        The attacker cannot choose to reduce its accuracy or damage against itself.
      `,
      rank: 7,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Wall of Magic Impedance',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\medarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a shimmering magical membrane that does not block sight.
        It has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.
        Objects, creatures, and \\glossterm{mundane} abilities can pass through the wall freely, but any \\magical ability treats the wall as an impassable barrier.
      `,
      rank: 5,
      roles: ['hazard'],
      scaling: {
        7: "The wall's hit points increase to four times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    // +1dr for prereq
    {
      name: 'Negate',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          This attack automatically fails if the target does not have any \\magical abilities.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
    },

    // +1dr for prereq, -1dr for debuff. TODO: exact EA.
    {
      name: 'Nullify',

      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        injury: `
          The target is \\glossterm{briefly} unable to use any \\magical abilities that would require a \\glossterm{standard action} or \\glossterm{elite action}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          This attack automatically fails if the target does not have any \\magical abilities.
        `,
      },
      rank: 5,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Arcane Surge',

      effect: `
        You are \\glossterm{briefly} \\maximized.
      `,
      rank: 1,
      roles: ['focus'],
    },

    {
      name: 'Greater Arcane Surge',

      effect: `
        You are \\glossterm{briefly} \\maximized and \\empowered.
      `,
      rank: 6,
      roles: ['focus'],
    },

    // Half damage is 0.7 EA, empower is 0.4 EA. We can combine them with these
    // conditions.
    {
      name: 'Arcane Fuel',

      effect: `
        You take half damage from \\magical effects this round.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
        When you take damage from a magical effect this round, you become \\glossterm{briefly} \\empowered.
      `,
      rank: 3,
      roles: ['focus', 'turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Greater Arcane Fuel',

      effect: `
        You take half damage from \\magical effects this round.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
        When you take damage from a magical effect this round, you become \\glossterm{briefly} \\maximized.
      `,
      rank: 7,
      roles: ['focus', 'turtle'],
      tags: ['Swift'],
    },

    // +1dr for prereq, -1dr for empowered
    {
      name: 'Extract Magic',

      attack: {
        hit: `
          \\damagerankthree.
          You are also \\glossterm{briefly} \\empowered.
        `,
        targeting: `
          Make an attack vs. Fortitude against a creature within \\medrange.
          This attack automatically fails if the target does not have any \\magical abilities.
        `,
      },
      rank: 3,
      roles: ['burst', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Extract Magic',

      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
          You are also \\glossterm{briefly} \\empowered.
        `,
        targeting: `
          Make an attack vs. Fortitude against a creature within \\shortrange.
          This attack automatically fails if the target does not have any \\magical abilities.
        `,
      },
      rank: 6,
      roles: ['burst', 'generator'],
      scaling: 'damage',
    },

    // HP action skip is 2 EA. Only blocking magical abilities is about 75% effective, so
    // call it 1.5 EA, or 2.5 EA with damage.
    {
      name: 'Nullify',

      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        injury: `
          The target is \\glossterm{briefly} unable to use any \\magical active abilities.
          This does not prevent its passive or triggered magical abilities from functioning normally.
          Once this effect ends, the target becomes \\glossterm{immune} to it until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Fortitude against a creature within \\medrange.
          This attack automatically fails if the target does not have any \\magical abilities.
        `,
      },
      rank: 7,
      roles: ['maim'],
    },

    // +2dr for condition and delay
    {
      name: 'Mystic Backlash',

      attack: {
        hit: `
          You weave a trap into the target's magic.
          If it uses a \\magical ability as a standard action or \\glossterm{elite action}, it takes \\damagerankfour.
          After it takes damage in this way, this effect ends.
          It cannot trigger this trap in the same round that you cast this spell.
        `,
        targeting: `
          Make an attack vs. Mental against a creature within \\medrange.
        `,
      },
      rank: 2,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Subtle'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Mighty Mystic Backlash',

      functionsLike: {
        name: 'mystic backlash',
        exceptThat:
          'the damage increases to \\damagerankseven, and any \\glossterm{extra damage} is doubled.',
      },
      rank: 5,
      roles: ['burn'],
      tags: ['Subtle'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Mystic Convergence',

      // All empowered is 1.4 EA. Allies in med radius from you is weaker, so maybe 1.2
      // EA. That means we get normal standard action damage on the attack, with +1dr from
      // the delay.
      attack: {
        hit: `
          \\damageranktwo.
        `,
        targeting: `
          When you cast this spell, magical energy visibly coalesces around you, causing you to radiate multicolored light as a torch.
          Next round, you can spend a \\glossterm{standard action} to make an attack vs. Mental against each \\glossterm{enemy} within a \\medarea radius from you.
          If you do, each of your \\glossterm{allies} in the area becomes \\empowered during that round.
        `,
      },
      rank: 3,
      roles: ['wildfire', 'boon'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Mystic Convergence',

      functionsLike: {
        name: 'mystic convergence',
        exceptThat: 'the damage increases to \\damageranksix.',
      },
      rank: 6,
      roles: ['wildfire', 'boon'],
      scaling: 'damage',
    },
  ],
};
