import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, MULTIHIT_CRIT } from './constants';

export const pyromancy: MysticSphere = add_tag_to_sphere('Fire', {
  name: 'Pyromancy',
  shortDescription: 'Create fire to incinerate foes.',
  sources: ['arcane', 'domain', 'nature', 'pact'],
  // Special: this sphere gets +1dr for large area attacks, but is bad at everything other
  // than damage.

  cantrips: [
    {
      name: 'Personal Torch',

      effect: `
        You create a flame in your hand.
        You can create it at any intensity, up to a maximum heat equivalent to a roaring campfire.
        At it most intense, it sheds \\glossterm{bright illumination} in a 30 foot radius and shadowy illumination in an 60 foot radius.
        As a standard action, you can make a melee attack vs. Reflex against a creature or object.
        On a hit, you deal the target 2 damage.
        If the target is highly flammable, such as a torch or campfire, it ignites.
      `,
      scaling: {
        2: `The damage increases to 5.`,
        4: `The damage increases to 10.`,
        6: `The damage increases to 20.`,
      },
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Heat Air',

      effect: `
        The temperatuture of the air within a \\largearea radius \\glossterm{emanation} from you is increased by an amount of your choice, to a maximum increase of 20 degrees Fahrenheit.
        You cannot increase the temperature above 100 degrees in this way.
        This typically imposes no direct penalties on other creatures, but it may make them more or less comfortable depending on their preferred temperature.
      `,
      scaling: {
        2: 'The maximum temperature change increases to 25 degrees.',
        4: 'The area increases to a \\hugearea radius.',
        6: 'The maximum temperature change increases to 30 degrees.',
      },
      type: 'Attune',
    },
  ],
  spells: [
    {
      name: 'Unstable Heat',

      attack: {
        hit: `
          \\damagerankone.
        `,
        targeting: `
          Whenever you hit a creature with a \\atBrawling attack or a creature hits you with a \\atBrawling attack, make an attack vs. Reflex against that creature.
          After you make this attack, this ability ends.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      type: 'Attune',
    },
    {
      name: 'Mighty Unstable Heat',

      functionsLike: {
        name: 'unstable heat',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 4,
      scaling: 'accuracy',
      type: 'Attune',
    },
    {
      name: 'Siphon Flame',

      effect: `
        Whenever you use a \\atFire ability, you can siphon \\glossterm{mundane} flames within \\longrange to fuel it.
        This extinguishes each siphoned flame that is Medium or smaller.
        You gain a \\plus2 accuracy bonus with that ability this round for drawing in a Small flame, such as a campfire.
        For each size category above Small that you siphon in this way, this accuracy bonus increases by 2, to a maximum of a \\plus7 bonus from a Colossal flame.
        As normal, eight objects of one size category are equivalent to one object of a larger size category, so you could siphon eight Tiny torch flames instead of a campfire.
        After you enhance an ability in this way, this ability ends.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Burning Grasp',

      // Baseline for melee range is dr4, which is 3.5 + 1.75dpp.
      // Double dr2 is 7 + 2dpp.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damageranktwo immediately, and again during your next action.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Burning Grasp',

      // Baseline for melee range is dr7, which is 5.5 + 2.75dpp.
      // Double dr5 is 7 + 3.5dpp.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfive immediately, and again during your next action.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Pyroclasm',

      // +1dr for full self-targeting
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Fire consumes a \\medarea radius \\glossterm{zone} from your location.
          When you cast this spell, and during your next action, make an attack vs. Reflex against everything in the area.
          This typically means you include yourself as a target.
        `,
      },

      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Pyroclasm',

      // +1dr for full self-targeting
      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          Fire consumes a \\largearea radius \\glossterm{zone} from your location.
          When you cast this spell, and during your next action, make an attack vs. Reflex against everything in the area.
          This typically means you include yourself as a target.
        `,
      },

      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Fireball',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius within \\shortrange.
        `,
      },

      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Fireball',

      attack: {
        hit: `\\damagerankthree.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearea radius within \\medrange.
        `,
      },

      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Delayed Fireball',

      attack: {
        hit: `\\damagerankfive.`,
        missGlance: true,
        targeting: `
          When you cast this spell, you create a Fine bead of fire in midair at a location in \\medrange.
          The bead sheds light like a torch.
          It is immune to most forms of damage, but if it takes cold damage, it is destroyed and this spell has no further effect.
          At the end of the next round, the bead explodes, and you make an attack vs. Reflex against everything in a \\medarea radius of it.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Immolating Fireball',

      attack: {
        hit: `
          \\damageranksix.
          If a creature takes a \\glossterm{vital wound} from this damage that leaves it unconscious, its body is completely destroyed by flame.
          Only a pile of ashes remains.
          An immolated creature's equipment is unaffected.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius within \\medrange.
        `,
      },

      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Burning Hands',

      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea cone from you.
        `,
      },

      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Burning Hands',

      attack: {
        hit: `\\damagerankthree.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea cone from you.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Ignition',

      attack: {
        crit: `All damage from the condition is doubled, not just the initial damage.`,
        hit: `
          The target catches on fire as a \\glossterm{condition}.
          It takes \\damagerankone immediately and during each of your subsequent actions.

          The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{movement} to put out the flames.
          Dropping \\prone as part of this action gives a +5 bonus to this check.
        `,
        targeting: `
          Make an attack vs. Fortitude and Reflex against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Ignition',

      functionsLike: {
        name: 'ignition',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Flame Breath',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe fire like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Massive Flame Breath',

      functionsLike: {
        name: 'flame breath',
        exceptThat: `
          the damage increases to \\damagerankfive.
          In addition, the area increases to a \\gargarea cone.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Eyes of Flame',

      // +1dr for brief cooldown
      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          You can set things on fire simply by staring at them as a standard action.
          When you do, make an attack vs. Fortitude against something within \\shortrange from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Mighty Eyes of Flame',

      functionsLike: {
        name: 'eyes of flame',
        exceptThat: 'the damage increases to \\damagerankseven.',
      },
      rank: 5,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Flaming Spheres',

      attack: {
        hit: `\\damagerankthree.`,
        targeting: `
          When you cast this spell, a cluster of flaming spheres appears over your head.
          Each sphere is approximately one foot in diameter.
          As a \\glossterm{minor action}, you can fire an orb at a creature or object within \\shortrange.
          When you do, make an attack vs. Fortitude with a -2 accuracy penalty against that target.
          After the sphere deals damage, it disappears and another sphere appears in the cluster.
        `,
      },

      rank: 5,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Serpent',

      attack: {
        hit: `\\damagerankthree.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft. wide shapeable line that starts within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Personal Ignition',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against any creature that you are currently \\grappled by.
          In addition, whenever a creature makes a \\glossterm{melee} attack against you using a free hand or natural weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
          You can only attack a given target with this spell once per \\glossterm{phase}.
        `,
      },
      narrative: `
        You catch on fire.
        This does not cause you any harm, as the flames burn around your body without burning you.
      `,
      rank: 2,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

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
      rank: 5,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Aura',

      attack: {
        // TODO: is this damage correct?
        hit: `\\damagerankone. All sources of \\glossterm{extra damage} do not apply to this attack.`,
        missGlance: true,
        targeting: `
          Heat constantly radiates in a \\smallarea radius emanation from you.
          As a \\glossterm{minor action}, you can intensify the flames to make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Flame Aura',

      functionsLike: {
        name: 'flame aura',
        exceptThat: 'the damage increases to \\damagerankfour. Extra damage is still not applied.',
      },
      rank: 7,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Blade',

      effect: `
        The target's \\glossterm{manufactured weapons} shed light like a torch.
        Their strikes with those weapons gain the \\atFire tag.
      `,
      rank: 1,
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
          Whenever anything passes through the wall, you make a \\glossterm{reactive attack} vs. Reflex against it.
          In addition, when you cast this spell and during each of your subsequent actions, make an attack vs. Reflex against any creature currently sharing space with it.
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
      scaling: 'accuracy',
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Pyrohemia',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone.
          If the target loses \\glossterm{hit points}, it takes this damage again during your next action.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Pyrohemia',

      functionsLike: {
        name: 'pyrohemia',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Kindled Fireburst',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Choose one Tiny or larger active fire within \\medrange.
          Make an attack vs. Reflex against everything within an \\smallarea radius from it.
        `,
      },
      narrative: `
        A small source of fire, such as a torch, erupts into a much larger burst of flame.
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Kindled Fireburst',

      functionsLike: {
        name: 'kindled fireburst',
        exceptThat:
          'the damage increases to \\damageranksix, and the area increases to a \\medarea radius.',
      },
      narrative: `
        A small source of fire, such as a torch, erupts into a much larger burst of flame.
      `,
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Wings of the Phoenix',

      effect: `
        You gain a 30 foot \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
      `,
      rank: 6,
      type: 'Attune',
    },

    {
      name: 'Soul of the Phoenix',

      effect: `
        You embody the soul of the undying phoenix.
        If you die, your body and equipment catch fire and are instantly burned to ash.
        At the end of the next round after you died, you return to life with all of your equipment intact.
        Your return in the same state in which you died, with three exceptions:
        \\begin{itemize}
          \\item You return at full \\glossterm{hit points} and \\glossterm{damage resistance}, with all of your conditions removed.
          \\item All of your \\glossterm{vital rolls} for your vital rolls that were 0 or lower become 1, preventing you from dying again immediately.
          \\item You increase your \\glossterm{fatigue level} by three.
        \\end{itemize}

        After you are restored to life in this way, this spell ends.
      `,
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Dash',

      cost: 'One optional \\glossterm{fatigue level}. If you pay this cost, the spell becomes \\abilitytag{Swift}.',
      attack: {
        hit: `\\damagerankone.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Distant Flame Dash',

      cost: 'One optional \\glossterm{fatigue level}. If you pay this cost, the spell becomes \\abilitytag{Swift}.',
      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\distrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },
    {
      name: 'Desperate Fireburst',

      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          Whenever you use the \\ability{total defense} or \\ability{recover} ability, you can activate this ability.
          If you do, make an attack vs. Reflex against everything within a \\smallarea radius from you.
          Then, this ability ends.
          Unlike the \\ability{total defense} and \\ability{recover} abilities, this attack is not \\atSwift, so it takes effect during your normal action in the action phase.
        `,
      },
      rank: 1,
      type: 'Attune',
    },
  ],
});
