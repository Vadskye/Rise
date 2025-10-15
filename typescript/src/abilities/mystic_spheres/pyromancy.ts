import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import {
  BARRIER_COOLDOWN,
  DELAYED_HALF,
  MULTIHIT_CRIT,
  TELEPORT_ATTACK_FATIGUE,
} from '../constants';

// TODO: add -accuracy attacks
export const pyromancy: MysticSphere = add_tag_to_sphere('Fire', {
  name: 'Pyromancy',
  shortDescription: 'Create fire to incinerate foes.',
  sources: ['arcane', 'domain', 'nature', 'pact'],

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
      type: 'Sustain (attuneable, minor)',
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
        When you do, you gain a \\plus2 accuracy bonus with that ability this round.
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

      // This has the damage of a r0 spell because of the buff
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you.
          Then, you are \\glossterm{briefly} \\empowered.
        `,
      },
      rank: 1,
      roles: ['generator'],
      scaling: 'damage',
    },

    {
      name: 'Stoke the Bonfire',

      // This has the damage of a r4 spell because of the pre-damage buff
      attack: {
        hit: `
          \\damagerankfour.
        `,
        missGlance: true,
        targeting: `
          You are \\glossterm{briefly} \\empowered.
          Then, make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 5,
      roles: ['generator'],
      scaling: 'damage',
    },

    {
      name: 'Desperate Kindling',

      // Normally, a maximizing spell would require R-3 damage. This gets R-2 because of the
      // self-targeting, and R-1 from the fatigue level.
      cost: 'One \\glossterm{fatigue level}.',
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against yourself and all \\glossterm{enemies} adjacent to you.
          Then, you are \\glossterm{briefly} \\maximized.
        `,
      },
      rank: 3,
      roles: ['exertion', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Desperate Pyre',

      // Normally, a maximizing spell would require R-3 damage. This gets R-2 because of the
      // self-targeting, and R-1 from the fatigue level.
      cost: 'One \\glossterm{fatigue level}.',
      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against yourself and all \\glossterm{enemies} adjacent to you.
          Then, you are \\glossterm{briefly} \\maximized.
        `,
      },
      rank: 6,
      roles: ['exertion', 'generator'],
      scaling: 'damage',
    },

    {
      name: 'Burning Grasp',

      // This gets -1dr for being a single-target Reflex attack.
      // Baseline for Reflex melee range is dr3, which is 4.5 + 1dpp.
      // Double dr1 is 9 + 1dpp.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone.
          During your next action, the target takes \\damagerankone again.
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
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfour, and any \\glossterm{extra damage} is doubled.
          During your next action, the target takes \\damagerankfour again.
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

      // A normal r1 area would deal dr3 immediate damage, or dr2 damage over two rounds.
      // This gets +1dr for self-targeting and ability to escape the second hit.
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Fire consumes a \\medarea radius \\glossterm{zone} from your location.
          Make an attack vs. Reflex against everything in the area.
          This typically means you include yourself as a target.
          During your next action, this effect \\glossterm{repeats} in the same area.
        `,
      },
      rank: 3,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Pyroclasm',

      // A normal R3 area would deal dr5 immediate damage, or dr3 over two rounds.
      // This gets +1dr for self-targeting and ability to escape the second hit.
      attack: {
        hit: `
          \\damagerankfour.
        `,
        missGlance: true,
        targeting: `
          Fire consumes a \\largearea radius \\glossterm{zone} from your location.
          Make an attack vs. Reflex against everything in the area.
          This typically means you include yourself as a target.
          During your next action, this effect \\glossterm{repeats} in the same area.
        `,
      },
      rank: 6,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Fireball',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\tinyarea radius within \\shortrange.
        `,
      },

      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Split Fireball',

      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
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
        missGlance: true,
        targeting: `
          When you cast this spell, you create a Fine bead of fire in midair at a location in \\shortrange.
          The bead sheds light like a torch.
          It is immune to most forms of damage, but if it takes damage from a \\atCold ability, it is destroyed and this spell has no further effect.
          At the end of the next round, the bead explodes, and you make an attack vs. Reflex against everything in a \\medarea radius of it.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Immolating Fireball',

      attack: {
        hit: `
          \\damagerankfive.
          If a creature takes a \\glossterm{vital wound} from this damage that leaves it unconscious, its body is completely destroyed by flame.
          Only a pile of ashes remains.
          An immolated creature's equipment is unaffected.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\tinyarea radius within \\shortrange.
        `,
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Fan of Flames',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `\\damagerankone immediately, and again during your next action.`,
        miss: DELAYED_HALF,
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

      // Normal immediate damage would be dr5 (3.5 + 1.75dpp)
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `\\damagerankthree immediately, and again during your next action.`,
        miss: DELAYED_HALF,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea cone from you.
        `,
      },
      rank: 5,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'Ignition',

      attack: {
        crit: `All damage from the condition is doubled, not just the initial damage.`,
        hit: `
          The target catches on fire as a \\glossterm{condition}.
          It takes \\damagerankone immediately and during each of your subsequent actions.

          The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{move action} to put out the flames.
          Dropping \\prone as part of this action gives a +5 bonus to this check.
          This condition is automatically removed if the target takes damage from a \\atCold or \\atWater ability.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
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
        exceptThat: 'the damage increases to \\damagerankfour.',
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
          'the damage increases to \\damagerankfive, and the difficulty value of the Dexterity check to put out the flames increases to 15.',
      },
      rank: 6,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Flame Breath',

      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe fire like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\medarea cone from you.
          After you breathe fire, you \\glossterm{briefly} cannot do so again.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Massive Flame Breath',

      functionsLike: {
        name: 'flame breath',
        exceptThat: `
          the damage increases to \\damagerankseven, and the area increases to a \\largearea cone from you.
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
          \\damageranktwo, and the target is \\glossterm{briefly} \\dazzled.
        `,
        targeting: `
          You can set creatures on fire simply by staring at them as a standard action.
          When you do, make an attack vs. Fortitude against a creature within \\shortrange of you.
          After you stare at a creature in this way, you \\glossterm{briefly} cannot do so again.
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
          'the damage increases to \\damageranksix, and any \\glossterm{extra damage} is doubled. On a hit, the target also \\glossterm{briefly} treats you as being \\trait{invisible}.',
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
        missGlance: true,
        targeting: `
          When you cast this spell, an attack vs. Reflex against everything in a \\medarealong, 5 ft. wide \\glossterm{shapeable} line that is entirely within \\medrange of you.
          The line cannot intersect itself, and you must designate one end of the line as the head of the flame serpent and the other end as the tail of the flame serpent.

          Whenever you sustain this spell, you can repeat this attack in a new line.
          The tail of the new line must be adjacent to the head of the old line, and it cannot intersect any space occupied by the line in the previous round.
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
        hit: `1d4 damage \\add half power.`,
        targeting: `
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against any creature that you are either grappling or are \\grappled by.
          In addition, whenever a creature makes a \\glossterm{melee} attack against you using a free hand or natural weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
          You can only attack a given target with this spell once per \\glossterm{phase}.
        `,
      },
      narrative: `
        You catch on fire.
        This does not cause you any harm, as the flames burn around your body without burning you.
      `,
      rank: 3,
      roles: ['attune'],
      scaling: {
        special: 'The damage increases by 2 for each rank beyond 3.',
      },
      type: 'Attune (deep)',
    },

    // Common reactive damage
    {
      name: 'Mighty Personal Ignition',

      functionsLike: {
        name: 'personal ignition',
        exceptThat: 'the damage increases to \\damagerankthree.',
      },
      narrative: `
        You catch on fire.
        This does not cause you any harm, as the flames burn around your body without burning you.
      `,
      rank: 5,
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
        missGlance: true,
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
        missGlance: true,
        targeting: `
          You create a \\medarealong \\glossterm{wall} of fire within \\medrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against any creature sharing space with it.
          Generally, this is only possible for Large or larger creatures.
          In addition, whenever something passes through the the wall, you make a \\glossterm{reactive attack} vs. Reflex against it.
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
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Pyrohemia',

      // Normal damage for a medium cone is dr1, so dr0 with the HP clause, and dr1 with
      // Reflex + Fort defenses.
      attack: {
        crit: MULTIHIT_CRIT,
        miss: DELAYED_HALF,
        hit: `
          \\damagerankone.
          If the target \\glossterm{hit points}, it takes this damage again during your next action.
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

      functionsLike: {
        name: 'pyrohemia',
        exceptThat: 'the damage increases to \\damagerankfour.',
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
          'the damage increases to \\damageranksix, and the area increases to a \\largearea cone.',
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
        missGlance: true,
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
        At the end of the next round after you died, you return to life with all of your equipment intact.
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
      cost: TELEPORT_ATTACK_FATIGUE,
      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
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
      cost: TELEPORT_ATTACK_FATIGUE,
      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\distrange.
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
        missGlance: true,
        targeting: `
          Whenever you use the \\ability{total defense} or \\ability{recover} ability, you can activate this ability.
          If you do, make an attack vs. Reflex against everything within a \\smallarea radius from you.
          Then, this ability is \\glossterm{dismissed}.
          Unlike the \\ability{total defense} and \\ability{recover} abilities, this attack is not \\atSwift, so it takes effect during your normal action in the action phase.
        `,
      },
      rank: 2,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Combustion',

      // Baseline for melee range is dr3.
      // With -4 accuracy, dr5, which is 3.5 + 1.75dpp.
      // Double dr2 is 5 + 2dpp.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damageranktwo.
          During your next action, the target takes \\damageranktwo again, and any \\glossterm{extra damage} also applies to this damage.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 accuracy penalty against something adjacent to you.
        `,
      },
      rank: 1,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Combustion',

      // Baseline for melee range is dr6.
      // With -4 accuracy, dr8, which is 3.5 + 3.5dpp.
      // Double dr5 is 7 + 3.5dpp.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfive.
          During your next action, the target takes \\damagerankfive again, and any \\glossterm{extra damage} also applies to this damage.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 accuracy penalty against something adjacent to you.
        `,
      },
      rank: 4,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Immolate',

      // Baseline for melee range is dr9.
      // With -4 accuracy, dr11, which is undefined.
      // Combustion and Mighty Combustion ended up at drX+1, so this can probably do the
      // same.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankeight, and any \\glossterm{extra damage} is doubled.
          During your next action, the target takes \\damagerankeight again, and any \\glossterm{extra damage} also applies to this damage.
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

      // Same damage calcs as combustion
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damageranktwo.
          During your next action, the target takes \\damageranktwo again, and any \\glossterm{extra damage} also applies to this damage.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 accuracy penalty against a living creature within \\medrange.
        `,
      },
      rank: 3,
      roles: ['burn'],
      scaling: 'damage',
    },
    {
      name: 'Mighty Living Pyre',

      // Same damage calcs as mighty combustion
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfive.
          During your next action, the target takes \\damagerankfive again, and any \\glossterm{extra damage} also applies to this damage.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 accuracy penalty against a living creature within \\medrange.
        `,
      },
      rank: 6,
      roles: ['burn'],
      scaling: 'damage',
    },

    {
      name: 'Fire Shield',

      // Single target melee damage would normally be dr3, or dr2 vs all adjacent.
      // It's not clear exactly how much empowered is worth vs guaranteed damage.
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          You are \\glossterm{briefly} \\empowered.
          In addition, whenever a creature makes a \\glossterm{melee} attack against you this round, make a \\glossterm{reactive attack} vs. Reflex against them.
        `,
      },
      roles: ['generator', 'retaliate'],
      rank: 1,
      scaling: 'damage',
      tags: ['Swift'],
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
      tags: ['Swift'],
    },
  ],
});
