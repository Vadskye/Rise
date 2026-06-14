import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, BURNING_HALF } from '../constants';

// TODO: add -accuracy attacks
export const pyromancy: MysticSphere = add_tag_to_sphere('Fire', {
  name: 'Pyromancy',
  shortDescription: 'Create fire to incinerate foes.',
  sources: ['arcane', 'domain', 'nature', 'pact'],
  specialRules: `
    Many spells from this mystic sphere cause the target to \\debuff{burn}.
    A burning creature takes damage at the end of each of its turns.
    It can stop burning if it makes a \\glossterm{difficulty value} 5 Dexterity check as a \\glossterm{standard action}.
    Dropping \\prone as part of this action gives a +5 bonus to this check.
    Burning is automatically removed if the target takes damage from a \\atCold or \\atWater ability, or is submerged in a non-flammable liquid like water.
    If a creature stops burning at the end of its turn, it still takes damage from the burn that turn.
  `,

  cantrips: [
    {
      name: 'Personal Torch',

      effect: `
        You create a flame in your hand.
        You can create it at any intensity, up to a maximum heat equivalent to a roaring campfire.
        At it most intense, it sheds \\glossterm{bright illumination} in a 30 foot radius.
        As a standard action, you can make a melee attack vs. Reflex against a creature or object.
        On a hit, you deal the target damage equal to your \\glossterm{power}.
        If the target is highly flammable, such as a torch or campfire, it ignites.
      `,
      roles: ['narrative'],
      type: 'Sustain (attunable, minor)',
    },
  ],
  spells: [
    {
      name: 'Unstable Heat',

      attack: {
        hit: `
          \\damagerankzero.
        `,
        targeting: `
          Whenever you hit a creature with a \\atBrawling attack or a creature hits you with a \\atBrawling attack, make an attack vs. Fortitude against that creature.
          After you make this attack, this ability is \\glossterm{dismissed}.
        `,
      },
      rank: 1,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune',
    },
    {
      name: 'Mighty Unstable Heat',

      functionsLike: {
        name: 'unstable heat',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 4,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune',
    },
    {
      name: 'Channel Flame',

      // +5 accuracy bonus is reasonable for a one-off attunement
      effect: `
        Whenever you use a \\atFire ability, you can draw power from one Small or larger \\glossterm{mundane} fire within \\medrange.
        When you do, you gain a \\plus2 accuracy bonus with that ability this turn.
        % Med +4, Large +6, Huge +8, Garg +10
        For each size category above Small that you siphon in this way, this accuracy bonus increases by 2, to a maximum of a \\plus10 bonus from a Gargantuan flame.
        Then, if that fire was Medium or smaller, it is extinguished.
        After you enhance an ability in this way, this ability is \\glossterm{dismissed}.
        
        As normal, eight objects of one size category are equivalent to one object of a larger size category, so you could siphon eight Tiny torch flames instead of a Small campfire.
        When you combine sources of fire in this way, they use their true size for determining whether they are extinguished.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Stoke the Fires',

      // Rank 3 Spell
      // Area: Enemies in Tiny radius from self (R0, mod +1)
      // Buff: Briefly Empowered (0.4 EA guaranteed, mod -2)
      // Result: 3 + 1 - 2 = dr2
      attack: {
        hit: `
          \\damageranktwo.
        `,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you.
          Then, you are \\briefly \\empowered.
        `,
      },
      rank: 3,
      roles: ['generator'],
      scaling: 'damage',
    },

    {
      name: 'Stoke the Bonfire',

      // Rank 6 Spell
      // Area: Enemies in Tiny radius from self (R0, mod +1)
      // Buff: Briefly Empowered (0.4 EA guaranteed, mod -2)
      // Result: 6 + 1 - 2 = dr5
      attack: {
        hit: `
          \\damagerankfive.
        `,
        halfOnMiss: true,
        targeting: `
          You are \\briefly \\empowered.
          Then, make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 6,
      roles: ['generator'],
      scaling: 'damage',
    },

    {
      name: 'Desperate Kindling',

      // Rank 4 Spell
      // Area: Small radius from self (R0, mod +1)
      // Bonus: Fatigue Level (mod +1), Self-Hit (mod +1)
      // Buff: Briefly Maximized (0.7 EA guaranteed, mod -4)
      // Result: 4 + 1 - 4 + 2 = dr3
      cost: 'One \\glossterm{fatigue level}.',
      attack: {
        hit: `
          \\damagerankthree.
        `,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Reflex against yourself and all \\glossterm{enemies} adjacent to you.
          Then, you are \\briefly \\maximized.
        `,
      },
      rank: 4,
      roles: ['exertion', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Desperate Pyre',

      // Rank 7 Spell
      // Area: Small radius from self (R0, mod +1)
      // Mod: Fatigue Level (mod +1), Self-Hit (mod +1)
      // Buff: Briefly Maximized (0.7 EA guaranteed, mod -4)
      // Result: 7 + 1 - 4 + 2 = dr6
      cost: 'One \\glossterm{fatigue level}.',
      attack: {
        hit: `
          \\damageranksix.
        `,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Reflex against yourself and all \\glossterm{enemies} adjacent to you.
          Then, you are \\briefly \\maximized.
        `,
      },
      rank: 7,
      roles: ['exertion', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Burning Grasp',

      // This gets -1dr for being a single-target Reflex attack.
      // Baseline for Reflex melee range is dr3, which is 4.5 + 1dpp.
      // Double dr1 is 9 + 1dpp.
      attack: {
        hit: `
          \\damagerankone.
          The target also \\briefly \\debuff{burns} for \\damagerankone.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
        `,
      },
      rank: 2,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Burning Grasp',

      // Baseline for melee range is dr7, or dr6 for single target reflex.
      // We drop to dr4 for damage over time.
      attack: {
        hit: `
          \\damagerankfour.
          The target also \\briefly \\debuff{burns} for \\damagerankfour.
          Any \\glossterm{extra damage} applies to both the initial damage and the burning damage.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
        `,
      },
      rank: 5,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Pyroclasm',

      // Rank 3 Spell
      // Area: Med radius from self (R2, mod -1)
      // Mod: DoT (mod -2), Self-hit (mod +1), Escapable (mod +1)
      // Result: 3 - 1 - 2 + 1 + 1 = dr2
      attack: {
        hit: `
          \\damageranktwo.
        `,
        halfOnMiss: true,
        targeting: `
          Fire consumes a \\medarea radius \\glossterm{zone} from your location.
          Make an attack vs. Reflex against everything in the area.
          This typically means you include yourself as a target.
          At the start of your next turn, this effect \\glossterm{repeats} in the same area.
        `,
      },
      rank: 3,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Pyroclasm',

      // Rank 6 Spell
      // Area: Large radius from self (R4, mod -2)
      // Mod: Twice (mod -2), Self-hit (mod +1), Escapable (mod +1)
      // Result: 6 - 2 - 2 + 1 + 1 = dr4
      attack: {
        hit: `
          \\damagerankfour.
        `,
        halfOnMiss: true,
        targeting: `
          Fire consumes a \\largearea radius \\glossterm{zone} from your location.
          Make an attack vs. Reflex against everything in the area.
          This typically means you include yourself as a target.
          At the start of your next turn, this effect \\glossterm{repeats} in the same area.
        `,
      },
      rank: 6,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Fireball',

      // Rank 3 Spell
      // Area: Small radius in Short range (R3, mod -1)
      // Result: 3 - 1 = dr2
      attack: {
        hit: `\\damageranktwo.`,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius within \\shortrange.
        `,
      },

      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Split Fireball',

      // Rank 5 Spell
      // Area: Two Tiny radii in Short range (R3, mod -1)
      // Result: 5 - 1 = dr4
      attack: {
        hit: `\\damagerankfour.`,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Reflex against everything in each of two separate \\tinyarea radius areas within \\shortrange.
          If the areas overlap, you still only make one attack against creatures in the overlapping area.
        `,
      },

      rank: 5,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Delayed Fireball',

      // +2dr for delay
      attack: {
        hit: `\\damagerankfour.`,
        halfOnMiss: true,
        targeting: `
          When you cast this spell, you create a Fine bead of fire in midair at a location in \\shortrange.
          The bead sheds light like a torch.
          It is immune to most forms of damage, but if it takes damage from a \\atCold ability, it is destroyed and this spell has no further effect.
          At the end of your next turn, the bead explodes, and you make an attack vs. Reflex against everything in a \\medarea radius of it.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Immolating Fireball',

      // Rank 6 Spell
      // Area: Small radius in Short range (R3, mod -1)
      // Result: 6 - 1 = dr5
      attack: {
        hit: `
          \\damagerankfive.
          If a creature takes a \\glossterm{vital wound} from this damage that leaves it unconscious, its body is completely destroyed by flame.
          Only a pile of ashes remains.
          An immolated creature's equipment is unaffected.
        `,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Fan of Flames',

      attack: {
        hit: `
          \\damagerankone.
          The target also \\briefly \\debuff{burns} for \\damagerankone.
        `,
        miss: BURNING_HALF,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea cone from you.
        `,
      },
      rank: 2,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Fan of Flames',

      // Rank 5 Spell
      // Area: Small cone from you (R0, mod +1)
      // Mod: DoT (-2)
      // Result: 5 + 1 - 2 = dr4 (twice)
      attack: {
        hit: `
          \\damagerankfour.
          The target also \\briefly \\debuff{burns} for \\damagerankfour.
        `,
        miss: BURNING_HALF,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea cone from you.
        `,
      },
      rank: 5,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Ignition',

      // Rank 2 Spell
      // Range: Short (mod +1)
      // Mod: Removable (-2)
      // Result: 2 + 1 - 2 = dr1
      attack: {
        hit: `
          \\damagerankone.
          The target also burns for \\damagerankone as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Ignition',

      functionsLike: {
        name: 'ignition',
        exceptThat: 'the damage increases to \\damagerankthree.',
      },
      rank: 4,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Inescapable Ignition',

      functionsLike: {
        name: 'ignition',
        exceptThat:
          'the damage increases to \\damagerankfive, and the difficulty value of the Dexterity check to stop burning increases to 10.',
      },
      rank: 6,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Flame Breath',

      // Target is +33% damage from a rank 3 attunement.
      // Normal medarea cone would be r2 damage = 10, r3 would be 13, perfect.
      attack: {
        hit: `\\damagerankthree.`,
        halfOnMiss: true,
        targeting: `
          For the duration of this spell, you can breathe fire like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\medarea cone from you.
          You \\briefly can't use this ability again.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Massive Flame Breath',

      // Target is +46% damage from a rank 6 attunement.
      // Normal large cone would be r4 damage = 26, r6 would be 38, perfect.
      functionsLike: {
        name: 'flame breath',
        exceptThat: `
          the damage increases to \\damageranksix, and the area increases to a \\largearea cone from you.
        `,
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Eyes of Flame',

      // +1 effective rank for attune with cooldown
      attack: {
        hit: `
          \\damageranktwo, and the target is \\briefly \\dazzled.
        `,
        targeting: `
          You can set creatures on fire simply by staring at them as a standard action.
          When you do, make an attack vs. Fortitude against a creature within \\shortrange.
          You \\briefly can't use this ability again.
        `,
      },
      rank: 1,
      roles: ['burst', 'softener'],
      scaling: 'damage',
      tags: ['Visual'],
      type: 'Attune',
    },

    {
      name: 'Blinding Eyes of Flame',

      functionsLike: {
        name: 'eyes of flame',
        exceptThat:
          'the damage increases to \\damageranksix, and any \\glossterm{extra damage} is doubled. On a hit, the target also \\briefly treats you as being \\trait{invisible}.',
      },
      rank: 5,
      roles: ['burst', 'softener'],
      scaling: 'damage',
      tags: ['Visual'],
      type: 'Attune',
    },

    {
      name: 'Flame Serpent',

      attack: {
        hit: `\\damageranktwo.`,
        halfOnMiss: true,
        targeting: `
          When you cast this spell, an attack vs. Reflex against everything in a \\medarealong, 5 ft. wide \\glossterm{shapeable} line that is entirely within \\medrange of you.
          The line cannot intersect itself, and you must designate one end of the line as the head of the flame serpent and the other end as the tail of the flame serpent.

          Whenever you sustain this spell, you can repeat this attack in a new line.
          The tail of the new line must be adjacent to the head of the old line, and it cannot intersect any space occupied by the line during your last turn.
        `,
      },
      rank: 5,
      roles: ['wildfire'],
      scaling: 'damage',
      tags: ['Sustain (minor)'],
    },

    // Common reactive damage
    {
      name: 'Personal Ignition',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          At the end of your turn, make an attack vs. Fortitude against any creature that you are either grappling or are \\grappled by.
          In addition, whenever a creature makes a \\glossterm{melee} attack against you using a free hand or natural weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
          You can only attack a given target with this spell once per turn.
        `,
      },
      narrative: `
        You catch on fire.
        This does not cause you any harm, as the flames burn around your body without burning you.
      `,
      rank: 3,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    // Common reactive damage
    {
      name: 'Mighty Personal Ignition',

      functionsLike: {
        name: 'personal ignition',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      narrative: `
        You catch on fire.
        This does not cause you any harm, as the flames burn around your body without burning you.
      `,
      rank: 6,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    // Minor action attack should deal 40% damage at r4.
    // Normal damage for r1 area would be dr4 (107%), so we want 43% damage.
    // dr0 is 45% damage at rank 4.
    {
      name: 'Flame Aura',

      attack: {
        hit: `\\damagerankzero, and all \\glossterm{extra damage} does not apply.`,
        halfOnMiss: true,
        targeting: `
          Heat constantly radiates in a \\smallarea radius emanation from you.
          As a \\glossterm{minor action}, you can intensify the flames to make an attack vs. Reflex against everything in the area.
        `,
      },
      rank: 4,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    // Minor action attack should deal 60% damage at r7.
    // Normal damage for r1 area would be r7 (99%), so we want dr5 (63%)
    {
      name: 'Mighty Flame Aura',

      functionsLike: {
        name: 'flame aura',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 7,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Blade',

      // One rank behind weapon / ahead of apparel?
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        Each target's \\glossterm{manufactured weapons} shed light like a torch.
        Their strikes with those weapons gain the \\atFire tag and deal 1 \\glossterm{extra damage}.
      `,
      rank: 3,
      roles: ['attune'],
      scaling: {
        special: 'The extra damage increases by 1 for each rank beyond 3.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Greater Flame Blade',

      // One rank behind weapon / ahead of apparel?
      functionsLike: {
        name: 'flame blade',
        exceptThat: 'the extra damage increases to 1d6.',
      },
      rank: 6,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Wall of Fire',

      cost: BARRIER_COOLDOWN,
      attack: {
        hit: `\\damagerankone.`,
        halfOnMiss: true,
        targeting: `
          You create a \\medarealong \\glossterm{wall} of fire within \\medrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against any creature sharing space with it.
          Generally, this is only possible for Large or larger creatures.
          In addition, whenever something passes through the the wall, you make a \\glossterm{reactive attack} vs. Reflex against it.
          You can only attack a given target with this spell once per turn.
        `,
      },
      rank: 2,
      roles: ['hazard'],
      scaling: 'damage',
      tags: ['Barrier'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Mighty Wall of Fire',

      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of fire',
        exceptThat: `
          the damage increases to \\damagerankfour.
          In addition, the area increases to a \\largearealong \\glossterm{wall}.
        `,
      },
      rank: 5,
      roles: ['hazard'],
      scaling: 'damage',
      tags: ['Barrier'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Pyrohemia',

      // Rank 1 spell
      // Area: Med cone (R2, mod -1)
      // Mods: Injury-only double damage (mod -1), double defense (mod +1)
      // Injury-only damage combines poorly with area, so we give this a free +1dr.
      // Result: 1 - 1 - 1 + 1 + 1 = dr1

      attack: {
        miss: BURNING_HALF,
        hit: `
          \\damagerankone.
        `,
        injury: `
          The target also \\briefly \\debuff{burns} for \\damagerankone.
        `,
        targeting: `
          Make an attack vs. Fortitude and Reflex against everything in a \\medarea cone.
        `,
      },
      rank: 1,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Pyrohemia',

      attack: {
        miss: BURNING_HALF,
        hit: `
          \\damagerankfour.
        `,
        injury: `
          The target also \\briefly \\debuff{burns} for \\damagerankfour.
        `,
        targeting: `
          Make an attack vs. Fortitude and Reflex against everything in a \\medarea cone.
        `,
      },
      rank: 4,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Massive Pyrohemia',

      functionsLike: {
        name: 'pyrohemia',
        exceptThat:
          'the damage of both the initial hit and the burn increases to \\damageranksix, and the area increases to a \\largearea cone.',
      },
      rank: 7,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Kindled Fireburst',

      // This is written as a rank 3 spell with an accuracy bonus built in.
      attack: {
        hit: `\\damagerankone.`,
        halfOnMiss: true,
        targeting: `
          Choose one Tiny or larger active fire within \\shortrange.
          Make an attack vs. Reflex against everything within an \\smallarea radius from it.
          You gain a \\plus1 accuracy bonus for each size category by which the fire is larger than Tiny.
          This extinguishes the fire if it was Medium or smaller.
        `,
      },
      narrative: `
        A small source of fire, such as a torch, erupts into a much larger burst of flame.
      `,
      rank: 2,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Kindled Fireburst',

      // So this should be written as a rank 6 spell with the same accuracy bonus.
      functionsLike: {
        name: 'kindled fireburst',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      narrative: `
        A small source of fire, such as a torch, erupts into a much larger burst of flame.
      `,
      rank: 5,
      roles: ['burst'],
      scaling: 'damage',
    },

    // TODO: define EA of flight
    {
      name: 'Wings of the Phoenix',

      effect: `
        You gain a slow \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
      `,
      rank: 6,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Soul of the Phoenix',

      effect: `
        You embody the soul of the undying phoenix.
        If you die, your body and equipment catch fire and are instantly burned to ash.
        However, you continue tracking your turn in combat.
        At the start of your next turn, you are \\glossterm{resurrected} in the open space closest to where you died with all of your equipment intact.
        Unlike normal, resurrecting in this way does not impose any penalties on you.
        Your return in the same state in which you died, with three exceptions:
        \\begin{raggeditemize}
          \\item You return at full \\glossterm{hit points}, with all of your conditions removed.
          \\item All of your \\glossterm{vital rolls} for your vital rolls that were 0 or lower become 1, preventing you from dying again immediately.
          \\item You increase your \\glossterm{fatigue level} by three.
        \\end{raggeditemize}

        After you are restored to life in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 7,
      roles: ['attune', 'exertion'],
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Dash',

      // A Medium line is about r1 normally, which would be dr3. Drop to dr2 for the
      // teleportation.
      attack: {
        hit: `\\damageranktwo.`,
        halfOnMiss: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      roles: ['clear', 'dive'],
      scaling: 'damage',
    },

    {
      name: 'Distant Flame Dash',

      // A Large line is about r3 normally, which would be dr5. Drop to dr4 for the
      // teleportation.
      attack: {
        hit: `\\damagerankfour.`,
        halfOnMiss: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\longrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 6,
      roles: ['clear', 'dive'],
      scaling: 'damage',
    },
    {
      name: 'Desperate Fireburst',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        halfOnMiss: true,
        targeting: `
          Whenever you use the \\ability{recover} ability, you can activate this ability.
          If you do, make an attack vs. Reflex against everything within a \\smallarea radius from you.
          Then, this ability is \\glossterm{dismissed}.
        `,
      },
      rank: 2,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Spontaneous Combustion',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Make an attack vs. Fortitude against something adjacent to you.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Spontaneous Combustion',

      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Fortitude against something adjacent to you.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Immolate',

      // Baseline for melee range is dr9.
      // With -4 accuracy, dr11, which is undefined.
      // Spontaneous Combustion and Mighty Spontaneous Combustion would end up at drX+1 as DoT,
      // so this can probably do the same.
      attack: {
        hit: `
          \\damagerankeight.
          The target also \\briefly \\debuff{burns} for \\damagerankeight.
          Any \\glossterm{extra damage} applies to both the initial damage and the burn.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 accuracy penalty against something adjacent to you.
        `,
      },
      rank: 7,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Living Pyre',

      attack: {
        hit: `
          \\damageranktwo.
          The target also \\briefly \\debuff{burns} for \\damageranktwo.
          Any \\glossterm{extra damage} applies to both the initial damage and the burning damage.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 accuracy penalty against a creature within \\medrange.
        `,
      },
      rank: 3,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Life'],
    },
    {
      name: 'Mighty Living Pyre',

      attack: {
        hit: `
          \\damagerankfive.
          The target also \\briefly \\debuff{burns} for \\damagerankfive.
          Any \\glossterm{extra damage} applies to both the initial damage and the burning damage.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 accuracy penalty against a creature within \\medrange.
        `,
      },
      rank: 6,
      roles: ['burn'],
      scaling: 'damage',
      tags: ['Life'],
    },

    {
      name: 'Fire Shield',

      // Single target melee damage would normally be dr3, or dr2 vs all adjacent.
      // It's not clear exactly how much empowered is worth vs guaranteed damage.
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          You are \\briefly \\empowered.
          As a \\brief effect, whenever a creature makes a \\glossterm{melee} attack against you, make a \\glossterm{reactive attack} vs. Reflex against them.
        `,
      },
      roles: ['generator', 'retaliate'],
      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Mighty Fire Shield',

      functionsLike: {
        name: 'fire shield',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      roles: ['generator', 'retaliate'],
      rank: 5,
      scaling: 'damage',
    },
  ],
});
