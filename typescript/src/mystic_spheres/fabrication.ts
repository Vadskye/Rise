import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, MINOR_FATIGUE } from './constants';

export const fabrication: MysticSphere = {
  name: 'Fabrication',
  hasImage: true,
  shortDescription: 'Create objects to damage and impair foes.',
  sources: ['arcane', 'divine', 'pact'],

  cantrips: [
    {
      name: 'Fabricate Trinket',

      effect: `
        You make a Craft check to create an object of Tiny size or smaller.
        The object appears in your hand or at your feet.
        It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.
        At the end of each round, this ability is \\glossterm{dismissed} if you are not within \\medrange of the item.
      `,
      roles: ['narrative'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
  ],
  spells: [
    {
      name: 'Greater Fabricate Trinket',

      functionsLike: {
        name: 'fabricate trinket',
        exceptThat: 'the maximum size of the object increases to Small.',
      },
      rank: 4,
      roles: ['narrative'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Forge',

      effect: `
        You can create any one weapon, shield, or body armor that you are proficient with.
        It is sized appropriately for you, up to a maximum of a Medium size item.
        You can choose whether the item appears in your hand, on your body fully donned, or on the ground at your feet.
        It disappears when this spell's effect ends.

        You can \\glossterm{attune} to this spell any number of times, creating a different item each time.
        If you spend ten consecutive minutes without \\glossterm{line of effect} to the item, your attunement to that item ends and it disappears.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        2: `
          If you create body armor or a weapon, it can be created from any special material other than cold iron, dragonscale, and dragonhide (see \\pcref{Armor Special Materials}, and \\pcref{Weapon Special Materials}).
          The item's rank cannot exceed your spellcasting rank with this spell.
        `,
      },
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    // Shielded is 0.3, cover is ~0.4, so 0.7 total?
    {
      name: 'Desperate Shieldwall',

      effect: `
        You can activate this effect as a \\glossterm{minor action}.
        When you do, your attunement to this effect ends and you create a wall of indestructible shields around you until the end of the round.
        The shields make you \\shielded and give you \\glossterm{cover} from all attacks.
        This is a \\atSwift effect, so it protects you from attacks during the current phase.
      `,
      rank: 1,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Instant Shield',

      effect: `
        You can activate this effect as a \\glossterm{minor action}.
        When you do, you create a shield that you are proficient with in one \\glossterm{free hand}.
        The shield can be a standard shield or tower shield, and you can choose whether it is spiked.
        It is automatically strapped to your arm and cannot be detached.
        This allows you to use it immediately, but prevents you from using that hand for any other purpose.

        This is a \\atSwift effect, so the shield protects you from attacks during the current phase.
        The shield automatically disappears at the end of the round, but you can summon it again in future rounds.
      `,
      rank: 2,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },

    {
      name: 'Greater Instant Shield',

      functionsLike: {
        name: 'instant shield',
        exceptThat: 'you can activate the effect as a \\glossterm{free action}.',
      },
      rank: 5,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Instant Copy',

      effect: `
        Choose one Small or smaller object within \\medrange.
        You create a nonmagical copy of that item that appears in your hands or at your feet.
        Make a Craft check with a \\plus5 bonus to determine how closely the appearance and function of the copy matches the original.
        The copy is always \\glossterm{mundane}, even if the original was magical.
        It may appear to be made of a special material such as adamantine, but functions as if it was made of an ordinary material like wood or iron.
      `,
      rank: 2,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Hidden Copy',

      functionsLike: {
        name: 'instant copy',
        exceptThat:
          'the copy can appear in your backpack, or some other small personal storage you are touching.',
      },
      rank: 5,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Mystic Forge',

      // TODO: unclear rank
      functionsLike: {
        name: 'forge',
        exceptThat: `
          the item you create is magical, but cannot be made from any special material.
          When you learn this spell, you choose a single magic weapon or armor property with a rank no higher than your spellcasting rank with this spell.
          If you create an item that the property can be applied to, the item has that property.
          Whenever your spellcasting rank with this spell increases, you can choose a new magic property.
        `,
      },
      rank: 4,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Attune'],
    },
    {
      name: 'Mystic Blast Arrow',

      // -1dr for range, +1dr for double defense
      attack: {
        hit: `
          \\damageranktwo.
        `,
        targeting: `
          Make an attack vs. Armor and Brawn against something within \\longrange.
        `,
      },
      rank: 2,
      roles: ['snipe'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Mystic Blast Arrow',

      // -1dr for range, +1dr for double defense
      attack: {
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Armor and Brawn against something within \\longrange.
        `,
      },
      rank: 5,
      roles: ['snipe'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Mystic Artillery',

      // -1dr for long range, +1dr for delay, +1dr for -2a
      attack: {
        hit: `
          \\damageranktwo.
        `,
        targeting: `
          When you cast this spell, you create a ballista bolt in midair within your space and choose a target within \\longrange.
          During your next action, if that target is still within \\longrange, make a \\glossterm{reactive attack} vs. Armor with a -2 accuracy penalty against it.
          Otherwise, the bolt disappears and this spell is wasted.
        `,
      },
      roles: ['snipe'],
      rank: 1,
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Mystic Artillery',

      functionsLike: {
        name: 'mystic artillery',
        exceptThat: 'the damage increases to \\damagerankfive, and any \\glossterm{extra damage} is doubled.',
      },
      rank: 4,
      roles: ['snipe'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: "Executioner's Axe",

      // drX+1 for r0 area, +1dr for delay, Keen for only two targets
      // Since dr4 has such strong power scaling, this would really rather be dr3 or dr5.
      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: false,
        targeting: `
          When you cast this spell, you create a greataxe in midair within your space.
          During your next action, make a \\glossterm{reactive attack} vs. Armor with the axe against up to two targets adjacent to you.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Keen', 'Manifestation'],
    },

    {
      name: "Mighty Executioner's Axe",

      functionsLike: {
        name: "executioner's axe",
        exceptThat: 'the damage increases to \\damageranksix, and any \\glossterm{extra damage} is doubled.',
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Keen', 'Manifestation'],
    },

    {
      name: 'Whirlwind of Blades',

      // drX+1 in r0 area.
      // This needs to be sufficiently different from executioner's axe, so it affects a
      // larger area.
      attack: {
        hit: `\\damagerankthree.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against everything in a \\smallarea radius from you.
        `,
      },
      rank: 2,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Whirlwind of Blades',

      attack: {
        hit: `\\damageranksix.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against everything in a \\smallarea radius from you.
        `,
      },
      rank: 5,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Rain of Arrows',

      // -2dr for normal full area damage, +2dr for avoidable delay, -1dr for extended range
      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, you choose a \\smallarea radius, 60 foot tall cylinder-shaped \\glossterm{zone} within \\medrange.
          You must have \\glossterm{line of sight} and \\glossterm{line of effect} to both the top and bottom of the area.
          This means you cannot cast this spell in tight tunnels.

          A rain of arrows appears at the top of the area.
          Creatures can generally identify what area the arrows will fall into with a DV 10 Awareness check.
          During your next action, the arrows fall through the area, and you make a \\glossterm{reactive attack} vs. Armor against everything in the area.
          This attack does not damage thin \\glossterm{walls} in the area.
          Creatures under overhanging structures may have \\glossterm{cover} from the attack or be entirely excluded from the effect based on their location.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },

    {
      name: 'Massive Rain of Arrows',

      functionsLike: {
        name: 'rain of arrows',
        exceptThat: 'the area increases to a \\medarea radius, 60 foot tall cylinder-shaped \\glossterm{zone} within \\distrange. In addition, the damage increases to \\damageranksix.',
      },
      rank: 7,
      roles: ['clear'],
      tags: ['Manifestation'],
    },

    {
      name: 'Blade Barrier',

      cost: BARRIER_COOLDOWN,
      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          You create a \\medarealong \\glossterm{wall} of whirling blades within \\medrange.
          The wall provides \\glossterm{cover} against attacks made through it, though it takes no damage from attacks that hit it.
          Whenever anything passes through the wall, you make a \\glossterm{reactive attack} vs. Reflex against it.
          In addition, when you cast this spell and during each of your subsequent actions, make an attack vs. Reflex against any creature currently sharing space with it.
          Generally, this is only possible for Large or larger creatures.
          You can only attack a given target with this spell once per \\glossterm{phase}.
        `,
      },
      rank: 2,
      roles: ['barrier', 'hazard'],
      scaling: 'damage',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mighty Blade Barrier',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          the damage increases to \\damagerankfive.
          In addition, the area increases to a \\largearealong \\glossterm{wall}.
        `,
        name: 'blade barrier',
      },
      rank: 5,
      roles: ['barrier', 'hazard'],
      scaling: 'damage',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Blade Perimeter',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          the area changes to a \\medarea radius \\glossterm{wall}.
          In addition, the damage increases to \\damageranktwo.
        `,
        name: 'blade barrier',
      },
      rank: 3,
      roles: ['barrier', 'hazard'],
      scaling: 'accuracy',
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Personal Weapon',

      cost: MINOR_FATIGUE,
      functionsLike: {
        name: 'forge',
        exceptThat:
          'you can only create a weapon, and this spell has the \\atSustain (attuneable, minor) tag instead of the \\atAttune tag.',
      },
      rank: 1,
      roles: ['attune'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    // TODO: EA
    {
      name: 'Web',

      effect: `
        You fill a \\smallarea radius \\glossterm{zone} within \\shortrange with webs.
        The web makes the area \\glossterm{difficult terrain}.
        It has \\glossterm{hit points} equal to three times your \\glossterm{power}, and it is destroyed when its hit points become negative.
        If it takes damage from a \\atFire ability, it is immediately destroyed.
      `,
      rank: 3,
      roles: ['barrier'],
      scaling: {
        5: 'The hit points increase to four times your power.',
        7: 'The hit points increase to five times your power.',
      },
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    // TODO: EA
    {
      name: 'Massive Web',

      effect: `
        You fill a \\medarea radius \\glossterm{zone} within \\medrange with webs.
        The web makes the area \\glossterm{difficult terrain}.
        It has \\glossterm{hit points} equal to four times your \\glossterm{power}, and it is destroyed when its hit points become negative.
        If it takes damage from a \\atFire ability, it is immediately destroyed.
      `,
      rank: 6,
      roles: ['barrier'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Caltrops',

      // TODO: correct damage is hard to calculate. This is above rate if it triggers
      // twice, but it could easily trigger never.
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          You create exceptionally sharp caltrops in up to three unoccupied squares on solid ground within \\medrange.
          They can generally be noticed with a \\glossterm{difficulty value} 8 Awareness check.

          Whenever a \\glossterm{grounded} creature moves into any of the squares, unless the creature moves at half speed to avoid the danger, you make a \\glossterm{reactive attack} vs. Armor against them.
          You cannot make this attack against the same creature more than once per \\glossterm{phase}.
          Caltrops may not be effective against creatures with an unusual anatomy.
        `,
      },
      rank: 2,
      roles: ['hazard'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mighty Caltrops',

      functionsLike: {
        name: 'caltrops',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 5,
      roles: ['hazard'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Instant Arrow',

      castingTime: 'minor action',
      effect: `
        This spell has no \\glossterm{somatic components}.

        You create an arrow in a bow that you are holding.
        You can create \\glossterm{mundane} special ammunition of any type that you are proficient with.
        However, the item's rank cannot exceed half your spellcasting rank with this spell (minimum 0).

        The arrow persists until the end of the round, at which point it disappears.
      `,
      rank: 1,
      // A little awkward since this is a minor action spell, which is very unusual.
      roles: ['focus'],
      tags: ['Manifestation'],
    },

    // Tiny area in Short range is area rank 2, so drX-1. Sustain (minor) is -1dr for such
    // a small area.
    {
      name: 'Dagger Cloud',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          When you cast this spell, a cloud of flying daggers appears in a \\tinyarea radius \\glossterm{zone} within \\shortrange.
          Make an attack vs. Armor against each creature in the area.
          Whenever a creature enters the area, you make a \\glossterm{reactive attack} vs. Armor against it.
          Finally, during each of your subsequent actions, you make a \\glossterm{reactive attack} vs. Armor against each creature in the area.
          You can only attack a given target with this spell once per round.
        `,
      },
      rank: 3,
      roles: ['hazard'],
      scaling: 'damage',
      type: 'Sustain (minor)',
      tags: ['Manifestation'],
    },
    {
      name: 'Blade Cloud',

      functionsLike: {
        name: 'dagger cloud',
        exceptThat: 'the area increases to a \\smallarea radius, and the damage increases to \\damagerankfour.',
      },
      rank: 6,
      roles: ['hazard'],
      scaling: 'damage',
      type: 'Sustain (minor)',
      tags: ['Manifestation'],
    },
    {
      name: 'Daggerswarm',

      attack: {
        hit: `\\damagerankthree. All sources of \\glossterm{extra damage} do not apply to this attack.`,
        targeting: `
          When you cast this spell, a small swarm of daggers appears floating over your head.
          As a \\glossterm{minor action}, you can fling one dagger at a creature or object within \\shortrange.
          When you do, make an attack vs. Armor with a -2 accuracy penalty against that target.
          After the dagger deals damage, it disappears and another dagger appears in the swarm.
        `,
      },
      rank: 5,
      roles: ['attune'],
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    // Ranged prone is 1.6 EA, so r2. It can go up +1 area tier for grounded + size limit
    // + relatively short range, which makes this closer to a melee prone.
    {
      name: 'Grease',

      attack: {
        hit: `The target falls \\prone.`,
        targeting: `
          Make an attack vs. Reflex against all Large or smaller \\glossterm{grounded} creatures in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    // Ranged prone is 1.6 EA, so r2. A repeat is strong but avoidable; call it half the
    // original EA, so 2.4 EA total. We don't need more than limited scope area here.
    {
      name: 'Enduring Grease',

      attack: {
        hit: `The target falls \\prone.`,
        targeting: `
          You \\glossterm{briefly} coat everything in a \\smallarea radius \\glossterm{zone} within \\shortrange in grease.
          Make an attack vs. Reflex against all Large or smaller \\glossterm{grounded} creatures in the area.
          During your next action, this effect \\glossterm{repeats}.
        `,
      },
      rank: 5,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    // One-time fire vulnerability is worth about 0.4 EA, since it's approximately +4
    // accuracy to one ally. That's ambiguously scary, so call it 0.6 EA instead. Bump by
    // an extra rank for extended range.
    {
      name: 'Oil Slick',

      attack: {
        hit: `
          The target falls \\prone, and is \\glossterm{briefly} \\vulnerable to \\atFire attacks.
          This vulnerability ends if it takes damage from a \\atFire attack.
        `,
        targeting: `
          Make an attack vs. Reflex against all Large or smaller \\glossterm{grounded} creatures in a \\medarea radius within \\medrange.
        `,
      },
      rank: 6,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Protective Cage',

      cost: BARRIER_COOLDOWN,
      effect: `
        Choose yourself or one Large or smaller \\glossterm{ally} within \\medrange.
        You create a metal cage around the target in its space.
        The cage has a 2 inch gap between its bars, allowing the target to see and be seen by creatures outside of the cage.
        This does not block \\glossterm{line of sight} or \\glossterm{line of effect}, but it provides \\glossterm{cover}.
        % TODO: clarify that you can't create two cages around the same target simultaneously
        If another creature is in the target's space when this spell is cast, this spell fails without effect.
        The cage has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.
      `,
      rank: 3,
      roles: ['boon'],
      scaling: {
        5: `The cage's \\glossterm{hit points} increase to four times your power.`,
        7: `The cage's \\glossterm{hit points} increase to five times your power.`,
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Instant Weapon',

      castingTime: 'minor action',
      effect: `
        This spell has no \\glossterm{somatic components}.

        You create an ordinary nonmagical weapon that you are proficient with your hand or hands.
        The weapon persists until the end of the round, at which point it disappears.
      `,
      rank: 1,
      // A little awkward since this is a minor action spell, which is very unusual.
      roles: ['focus'],
      tags: ['Manifestation'],
    },

    {
      name: 'Instant Magic Weapon',

      functionsLike: {
        name: 'instant weapon',
        exceptThat: `
          the weapon you create is magical.
          When you learn this spell, you choose a single magic weapon property with a rank no higher than your spellcasting rank with this spell.
          The weapon has that property.
          Whenever your spellcasting rank with this spell increases, you can choose a new magic weapon property.
        `,
      },
      rank: 3,
      roles: ['focus'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    // r0 area is normally drX+1. If you are using a Heavy weapon, this is roughly dr3.
    // The accuracy scaling compensates for only reaching dr3 effectiveness if you are
    // using a Heavy weapon.
    {
      name: 'Bladeshard Blast',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\magical melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} in a \\smallarea cone from you.
        For each previous consecutive round in which you used this ability, you gain a +2 accuracy bonus with the strike, up to a maximum of +4.
        \\miss Half damage.
      `,
      rank: 2,
      roles: ['clear'],
      scaling: {
        // This matches Mighty Maneuver. dr3 would normally scale at +3 per excess rank,
        // but weapons have more scaling vectors than spells, so scary to combine that.
        special: 'The strike deals \\plus2 \\glossterm{extra damage} for each rank beyond 2.',
      },
      tags: ['Manifestation'],
    },

    // r0 area is normally drX+1, or dr6, which is 4.5 + 2.25dpp.
    // Double Heavy weapon strike is roughly 9 + 2dpp.
    {
      name: 'Mighty Bladeshard Blast',

      functionsLike: {
        name: 'blade barrage',
        exceptThat: 'the strike deals double damage.',
      },
      rank: 5,
      roles: ['clear'],
      scaling: {
        // dr6 would normally provide +2d8 per excess rank. This is lower because strikes
        // have more scaling options than spells.
        special: 'The strike deals \\plus1d6 \\glossterm{extra damage} for each rank beyond 5.',
      },
      tags: ['Manifestation'],
    },

    {
      name: 'Mirror Barrier',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          it reflects \\glossterm{mundane} attacks against it.
            The barrier's defenses become equal to 6 \\add half your level, and its hit points increase to three times your \\glossterm{power}.
            Whenever a creature misses or \\glossterm{glances} the barrier with a \\glossterm{mundane} attack, it scores a \\glossterm{glancing blow} with that attack against itself.
        `,
        name: 'mystic barrier',
      },
      rank: 3,
      roles: ['barrier'],
      scaling: {
        5: `The barrier's hit points increase to four times your power.`,
        7: `The barrier's hit points increase to five times your power.`,
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Greater Mirror Barrier',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          it reflects \\glossterm{mundane} attacks against it.
            The barrier's defenses become equal to 10 \\add half your level, and its hit poinst increase to four times your \\glossterm{power}.
            Whenever a creature misses or \\glossterm{glances} the barrier with a \\glossterm{mundane} attack, it scores a \\glossterm{glancing blow} with that attack against itself.
        `,
        name: 'mystic barrier',
      },
      roles: ['barrier'],
      rank: 7,
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Visual Barrier',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          you can choose the visibility of the barrier.
            There are three possibilities: fully \\glossterm{invisible}, barely visible like a normal \\spell{mystic barrier}, and visible as a deep black that completely blocks sight.
            You can change the opacity of the barrier as part of the action you use to sustain this spell, or as a \\glossterm{minor action} if you attune to this spell.
        `,
        name: 'mystic barrier',
      },
      rank: 2,
      roles: ['barrier'],
      scaling: {
        4: "The barrier's hit points increase to three times your \\glossterm{power}.",
        6: "The barrier's hit points increase to four times your \\glossterm{power}.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Sonic Barrier',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          you can choose whether the barrier blocks sound.
          You can change whether the barrier blocks sound as part of the action you use to sustain this spell, or as a \\glossterm{minor action} if you attune to this spell.

          Both types of barrier still block \\glossterm{line of effect} for effects that deal bludgeoning damage, even if they narratively come from a sound or voice.
          If the barrier does not block sound, the sound or voice can be heard on the other side at a non-damaging volume, but the attack still damages the barrier instead of anything on the other side.
        `,
        name: 'mystic barrier',
      },
      rank: 2,
      roles: ['barrier'],
      scaling: {
        4: "The barrier's hit points increase to three times your power.",
        6: "The barrier's hit points increase to four times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Forceful Barrier',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          it breaks objects in its area that obstruct its path.
          Each \\glossterm{unattended} object in the path of the wall takes \\damagerankthree.
          Any object destroyed in this way does not block the barrier's area of effect.
          This does no damage to creatures, who block the path of the barrier like normal.
        `,
        name: 'mystic barrier',
      },
      rank: 3,
      roles: ['barrier'],
      scaling: {
        4: "The barrier's hit points increase to three times your power.",
        6: "The barrier's hit points increase to four times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mystic Barrier',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\shortrange.
        The wall is visible as a shimmering magical membrane that does not block sight.
        Nothing can pass through the wall until it is destroyed.
        It has \\glossterm{hit points} equal to twice your \\glossterm{power}, and is destroyed when its hit points become negative.
      `,
      rank: 1,
      roles: ['barrier'],
      scaling: {
        3: "The barrier's hit points increase to three times your power.",
        5: "The barrier's hit points increase to four times your power.",
        7: "The barrier's hit points increase to five times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mystic Bridge',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          the wall is aligned horizontally instead of vertically.
        `,
        name: 'mystic barrier',
      },
      rank: 2,
      roles: ['barrier'],
      scaling: {
        4: "The barrier's hit points increase to three times your power.",
        6: "The barrier's hit points increase to four times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Mystic Barrier',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          the area increases to a \\largearealong wall within \\medrange, and it hit points increase to three times your \\glossterm{power}.
        `,
        name: 'mystic barrier',
      },
      rank: 4,
      roles: ['barrier'],
      scaling: {
        6: "The barrier's hit points increase to four times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    // TODO: unclear EA. It's roughly an action trade, so ~2 EA assuming they can destroy
    // it in a single attack. But it also normally removes your ability to attack, so it's
    // not as strong as "no defense action skip" would imply.
    {
      name: 'Personal Sphere',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a sphere of magical energy around yourself.
        The sphere is visible as a shimmering magical membrane that does not block sight.
        Nothing can pass through the field until it is destroyed.
        This prevents you from having \\glossterm{line of effect} to anything outside of the area.

        The sphere is immobile, so it normally prevents you from leaving the area.
        You cannot \\glossterm{dismiss} it.
        It disappears as a \\atSwift effect if you stop sustaining it, as normal for sustained abilities.

        The field as a whole has \\glossterm{hit points} equal to twice your \\glossterm{power}, and is destroyed when its hit points become negative.
        It is also destroyed if you leave the area by any means.
        Whenever you sustain this effect, the field regains hit points equal to your power.
      `,
      rank: 3,
      roles: ['turtle'],
      scaling: {
        5: "The barrier's hit points increase to three times your power.",
        7: "The barrier's hit points increase to four times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (standard)',
    },

    {
      name: 'Greater Personal Sphere',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'personal sphere',
        exceptThat: `
          this has the Sustain (minor) tag instead of Sustain (standard).
          In addition, the field's hit points increase to three times your \\glossterm{power}.
        `,
      },
      rank: 7,
      roles: ['turtle'],
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (minor)',
    },

    // Banishment is 3 EA. This is slightly worse than banishment, since it's possible for
    // a boss to destroy the sphere with its first action and use it elite action to
    // attack, so call it 2.5 EA. That makes it r7, or r6 from limited scope. But unlike
    // most action skip effects, it's not easy to justify why this would have a cooldown,
    // so leave it as r7. We also don't want to make this lower rank than Greater Personal
    // Sphere.
    {
      name: 'Entrapping Sphere',

      cost: BARRIER_COOLDOWN,
      attack: {
        crit: "The sphere's \\glossterm{hit points} are doubled.",
        hit: `
          A sphere of magical energy appears around the target in its space.
          The sphere is visible as a shimmering magical membrane that does not block sight.
          Nothing can pass through the sphere until it is destroyed.
          This prevents the target from having \\glossterm{line of effect} to anything outside of the area.
          If another creature is in the target's space when this spell is cast, this spell fails without effect.
          The field as a whole has \\glossterm{hit points} equal to twice your power.
        `,
        targeting: `
          Make an attack vs. Reflex against up to two Large or smaller creatures within \\medrange.
        `,
      },
      rank: 7,
      roles: ['stasis'],
      scaling: "accuracy",
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Invulnerable Barrier',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        exceptThat: `
          the wall's defenses are each equal to 8 + half your level.
          In addition, the wall's \\glossterm{hit points} increase to five times your \\glossterm{power}.
        `,
        name: 'mystic barrier',
      },
      rank: 5,
      roles: ['barrier'],
      scaling: {
        7: "The barrier's hit points increase to six times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Shrapnel Grenade',

      // r2 area is drX-1. Add +1dr for double defense.
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor and Reflex against everything within a \\tinyarea radius in \\shortrange.
        `,
      },
      rank: 2,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Shrapnel Grenade',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor and Reflex against everything within a \\tinyarea radius in \\shortrange.
        `,
      },
      rank: 5,
      roles: ['clear'],
      scaling: 'damage',
      tags: ['Manifestation'],
    },
    // TODO: may not be within sphere's narrative scope
    // r3 area is drX-2. Add +1dr for double defense and +1dr for combo delay trigger.
    {
      name: 'Powderkeg',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          You create a powderkeg on the ground within \\shortrange.
          The powderkeg has 10 hit points, and it automatically takes 5 damage whenever you sustain this spell.
          It explodes when it reaches 0 hit points, or when it takes any damage from a \\atFire attack.
          When it explodes, make an attack vs. Armor and Reflex against everything within a \\smallarea radius of it.
        `,
      },
      rank: 3,
      roles: ['clear', 'hazard'],
      scaling: 'damage',
      tags: ['Fire', 'Manifestation', 'Sustain (minor)'],
    },

    {
      name: 'Mighty Powderkeg',

      // Now has limited scope area, so +1dr extra
      functionsLike: {
        name: 'powderkeg',
        exceptThat: 'the damage increases to \\damagerankseven.',
      },
      rank: 6,
      roles: ['clear', 'hazard'],
      scaling: 'damage',
      tags: ['Fire', 'Manifestation', 'Sustain (minor)'],
    },
  ],
};
