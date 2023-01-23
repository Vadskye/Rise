import { MysticSphere } from '.';

export const pyromancy: MysticSphere = {
  name: 'Pyromancy',
  shortDescription: 'Create fire to incinerate foes.',
  sources: ['arcane', 'domain', 'nature', 'pact'],

  cantrips: [
    {
      name: 'Kindle',

      attack: {
        hit: `The target takes 2 fire damage.
        If the target is highly flammable, such as a torch or campfire, it ignites.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      scaling: {
        2: `The damage increases to 5.`,
        4: `The damage increases to 10.`,
        6: `The damage increases to 20.`,
      },
    },

    {
      name: 'Extinguish',

      attack: {
        hit: `The flame is extinguished.`,
        targeting: `
          Choose one Medium or smaller active flame within \\medrange.
          If the target is \\glossterm{attended} by a creature, such as a torch being carried, you must make an attack vs. Reflex against the attending creature.
          Otherwise, the attack automatically hits.
        `,
      },
      scaling: {
        2: `The maximum size increases to Large.`,
        4: `The maximum size increases to Huge.`,
        6: `The maximum size increases to Gargantuan.`,
      },
    },

    {
      name: 'Personal Torch',

      effect: `
        You create a flame in your hand.
        You can create it at any intensity, up to a maximum heat equivalent to a roaring campfire.
        At it most intense, it sheds \\glossterm{bright illumination} in a 30 foot radius and shadowy illumination in an 60 foot radius.
        As a standard action, you can make a melee attack vs. Reflex against a creature or object.
        On a hit, the target takes 2 fire damage.

        This effect lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      scaling: {
        2: `The damage increases to 5.`,
        4: `The damage increases to 10.`,
        6: `The damage increases to 20.`,
      },
    },

    {
      name: 'Heat Air',

      effect: `
        The temperatuture of the air within a \\medarea radius \\glossterm{emanation} from you is increased by an amount of your choice, to a maximum increase of 20 degrees Fahrenheit.
        You cannot increase the temperature above 100 degrees in this way.
        This typically imposes no direct penalties on other creatures, but it may make them more or less comfortable depending on their preferred temperature.

        This ability lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      scaling: {
        3: 'You can choose to affect a \\largearea radius instead, and the maximum temperature change increases to 30 degrees.',
        5: 'You can choose to affect a \\hugearea radius instead, and the maximum temperature change increases to 40 degrees.',
        7: 'You can choose to affect a \\gargarea radius instead, and the maximum temperature change increases to 50 degrees.',
      },
    },
  ],
  spells: [
    {
      name: 'Burning Grasp',

      attack: {
        hit: `
          The target takes 1d8 + half \\glossterm{power} fire damage immediately, and again during your next action.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
        `,
      },
      rank: 2,
      scaling: 'damage',
    },

    {
      name: 'Mighty Burning Grasp',

      attack: {
        hit: `
          The target takes 4d8 + half \\glossterm{power} fire damage immediately, and again during your next action.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
        `,
      },
      rank: 6,
      scaling: 'damage',
    },

    {
      name: 'Pyroclasm',

      attack: {
        hit: `
          Each target takes 1d6 + half \\glossterm{power} fire damage.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius from you.
          In addition, you take fire damage equal to half your \\glossterm{power}.
        `,
      },

      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Massive Pyroclasm',

      // +3r to get huge
      attack: {
        hit: `
          Each target takes 2d6 + half \\glossterm{power} fire damage.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\hugearea radius from you.
          In addition, you take fire damage equal to half your \\glossterm{power}.
        `,
      },

      rank: 4,
      scaling: 'damage',
    },

    {
      name: 'Fireball',

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} fire damage.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius within \\medrange.
        `,
      },

      rank: 4,
      scaling: 'damage',
    },

    {
      name: 'Delayed Fireball',

      // +2r for delay, +1r for range
      attack: {
        hit: `Each target takes 4d6 + half \\glossterm{power} fire damage.`,
        missGlance: true,
        targeting: `
          When you cast this spell, you create a small bead of fire in midair within your space.
          During your next action, the bead flies out and explodes as you direct.
          Make an attack vs. Reflex against everything in a \\medarea radius within \\longrange.
        `,
      },
      rank: 7,
      scaling: 'damage',
    },

    {
      name: 'Burning Hands',

      attack: {
        hit: `Each target takes 1d6 + half \\glossterm{power} fire damage.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea cone from you.
        `,
      },

      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Massive Burning Hands',

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} fire damage.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearea cone from you.
        `,
      },
      rank: 4,
      scaling: 'damage',
    },

    {
      name: 'Ignition',

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `The target catches on fire as a \\glossterm{condition}.
        It takes 1d6 + half \\glossterm{power} fire damage immediately and during each of your subsequent actions.

        The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{movement} to put out the flames.
        Dropping \\prone as part of this action gives a +5 bonus to this check.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Intense Ignition',

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `
          The target catches on fire as a \\glossterm{condition}.
          It takes 2d8 + half \\glossterm{power} fire damage immediately and during each of your subsequent actions.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Heat Metal',

      attack: {
        hit: `
          The object becomes burning hot to the touch.
          It and anything touching it takes 1d10 + half \\glossterm{power} fire damage immediately and during each of your subsequent actions.
        `,
        targeting: `
          Choose one \\glossterm{metallic} object within \\medrange.
          It must be no smaller than Tiny size and no larger than Large size.
          If the target is \\glossterm{attended}, make an attack vs. Reflex against the attending creature.
          Otherwise, this attack automatically hits.
        `,
      },
      rank: 2,
      scaling: 'damage',
      type: 'Sustain (minor)',
    },

    {
      name: 'Flame Breath',

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} fire damage.`,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe fire like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Massive Flame Breath',

      functionsLike: {
        name: 'flame breath',
        exceptThat: `
          the damage increases to 4d10 + half \\glossterm{power}.
          In addition, the area increases to a \\hugearea cone.
        `,
      },
      rank: 7,
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Eyes of Flame',

      // -1r for attune requirement
      attack: {
        hit: `
          The target takes 1d8 + half \\glossterm{power} fire damage immediately, and again during your next action.
        `,
        targeting: `
          You can set things on fire simply by staring at them as a standard action.
          When you do, make an attack vs. Fortitude against anything within \\medrange from you.
        `,
      },
      rank: 2,
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Flaming Spheres',

      attack: {
        hit: `The target takes 2d8 fire damage.`,
        targeting: `
          When you cast this spell, a cluster of flaming spheres appears over your head.
          Each sphere is approximately one foot in diameter.
          As a \\glossterm{minor action}, you can fire an orb at a creature or object within \\shortrange.
          When you do, make an attack vs. Armor against that target.
          After the sphere deals damage, it disappears and another sphere appears in the cluster.
        `,
      },

      rank: 4,
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Flaming Spheres',

      functionsLike: {
        name: 'flaming spheres',
        exceptThat: `
          the damage increases to 4d10, and the range increases to \\medrange.
        `,
      },
      rank: 7,
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Serpent',

      attack: {
        hit: `Each target takes 2d8 + half \\glossterm{power} fire damage.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft. wide shapeable line that starts within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Personal Ignition',

      attack: {
        hit: `The target takes 1d8 + half \\glossterm{power} fire damage.`,
        targeting: `
          During each of your subsequent actions, make an attack vs. Fortitude against any creature that you are currently \\grappled by.
          In addition, whenever a creature makes a \\glossterm{melee} attack against you using a free hand or natural weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
          You can only attack a given target with this spell once per \\glossterm{phase}.
        `,
      },
      narrative: `
        You catch on fire.
        This does not cause you any harm, as the flames burn around your body without burning you.
      `,
      rank: 2,
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Personal Ignition',

      functionsLike: {
        name: 'personal ignition',
        exceptThat: 'the damage increases to 4d8 + half \\glossterm{power}.',
      },
      narrative: `
        You catch on fire.
        This does not cause you any harm, as the flames burn around your body without burning you.
      `,
      rank: 6,
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Aura',

      attack: {
        // TODO: is this damage correct?
        hit: `Each target takes 2d10 fire damage.`,
        targeting: `
          Heat constantly radiates in a \\smallarea radius emanation from you.
          As a \\glossterm{minor action}, you can intensify the flames to make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 6,
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Blade',

      effect: `
        Your weapons shed light like a torch.
        All damage you deal with \\glossterm{strikes} becomes fire damage in addition to the attack's normal damage types.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Mass Flame Blade',

      functionsLike: {
        mass: true,
        name: 'Flame Blade',
      },
      // narrative: '',
      rank: 3,
      type: 'Attune (target)',
    },

    {
      name: 'Wall of Fire',

      attack: {
        hit: `The target takes 1d8 + half \\glossterm{power} fire damage.`,
        targeting: `
          You create a \\medarealong \\glossterm{wall} of fire within \\medrange.
          Whenever anything passes through the wall, you make a \\glossterm{reactive attack} vs. Reflex against it.
          In addition, when you cast this spell and during each of your subsequent actions, make an attack vs. Reflex against any creature currently sharing space with it.
          Generally, this is only possible for Large or larger creatures.
          You can only attack a given target with this spell once per \\glossterm{phase}.

          After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
        `,
      },
      rank: 2,
      scaling: 'damage',
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Wall of Fire',

      functionsLike: {
        name: 'wall of fire',
        exceptThat: `
          the damage increases to 4d6 + half \\glossterm{power}.
          In addition, the area increases to a \\largearealong \\glossterm{wall}, and the range increases to \\longrange.
        `,
      },
      rank: 6,
      scaling: 'damage',
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Pyrophobia',

      attack: {
        crit: `The target is \\frightened instead of shaken.`,
        hit: `
          The target is \\shaken by you as a \\glossterm{condition}.
          Whenever it takes fire damage, the penalties from this condition are \\glossterm{briefly} doubled.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    {
      name: 'Primal Pyrophobia',

      attack: {
        crit: `The target is \\panicked instead of frightened.`,
        hit: `
          The target is \\frightened by you as a \\glossterm{condition}.
          Whenever it takes fire damage, the penalties from this condition are \\glossterm{briefly} doubled.
        `,
        targeting: `
        Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Emotion'],
    },

    {
      name: 'Pyrohemia',

      // normal damaging effect would be 1d8 + power; +2d for HP restriction seems fine
      attack: {
        hit: `
          The target takes 1d6 + half \\glossterm{power} fire damage.
          If it loses \\glossterm{hit points} from this damage, it takes 1d6 + half \\glossterm{power} fire damage during your next action.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Mighty Pyrohemia',

      // all four ranks to double power, which is spicy
      attack: {
        hit: `
          The target takes 2d10 + \\glossterm{power} fire damage.
          If it loses \\glossterm{hit points} from this damage, it takes 2d8 + half \\glossterm{power} fire damage during your next action.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Kindled Fireburst',

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} fire damage.`,
        missGlance: true,
        targeting: `
          Choose one Tiny or larger active fire within \\medrange.
          Make an attack vs. Reflex against everything within an \\medarea radius from it.
        `,
      },
      narrative: `
        A small source of fire, such as a torch, erupts into a much larger burst of flame.
      `,
      rank: 3,
      scaling: 'damage',
    },

    {
      name: 'Wings of the Phoenix',

      effect: `
        You gain a 30 foot \\glossterm{fly speed} with a maximum height of 30 feet (see \\pcref{Flight}).
      `,
      rank: 5,
      scaling: { 7: `The maximum height increases to 60 feet.` },
      type: 'Attune',
    },

    {
      name: 'Soul of the Phoenix',

      effect: `
        You embody the soul of the undying phoenix.
        If you die, your body and equipment catch fire and are instantly burned to ash.
        At the end of the next round after you died, you return to life with all of your equipment intact.
        Your return in the same state in which you died, with three exceptions.
        You return at full \\glossterm{hit points} and with all of your conditions removed.
        In addition, all of your \\glossterm{vital rolls} for your vital rolls that were 0 or lower become 1, preventing you from dying again immediately.
        After you are restored to life this way, this spell ends.
      `,
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: 'Flame Dash',

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} fire damage.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: 'damage',
    },

    {
      name: 'Distant Flame Dash',

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} fire damage.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\distrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 6,
      scaling: 'damage',
    },
  ],
  rituals: [
    {
      name: 'Heat Tolerance',

      castingTime: 'one minute',
      effect: `
        Choose either yourself or an \\glossterm{ally} or unattended object within \\medrange.
        The target suffers no harm from being in a hot environment.
        It can exist comfortably in conditions as high as 140 degrees Fahrenheit.
        Its equipment, if any, is also protected.
        This does not protect the target from fire damage.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Heat Wave',

      castingTime: 'one hour',
      effect: `
        The temperature in a two mile radius cylinder-shaped \\glossterm{zone} from your location increases rapidly.
        Over the next minute after you finish this ritual, the temperature increases by 40 degrees Fahrenheit, to a maximum of 120 degrees.
        Unlike normal, this effect does not require \\glossterm{line of effect} to you.
        Instead, it affects all outdoor locations within the area.
        Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Pyrostorm',

      castingTime: 'one hour',

      functionsLike: {
        exceptThat: `
          the temperature in the area increases by 60 degrees, to a minimum of 160 degrees.
        `,
        name: 'heat wave',
      },
      rank: 7,
      type: 'Attune',
    },

    {
      name: 'Detect Flame',

      castingTime: 'one minute',
      effect: `
          You learn the approximate distance and direction to any active fires within \\longrange \\glossterm{range} of you.
          Since this is a \\abilitytag{Detection} ability, its range can penetrate some solid objects (see \\pcref{Detection}).
          This spell can sense fires as small as a candle flame, but no smaller.
      `,
      rank: 1,
      tags: ['Detection'],
    },

    {
      name: 'Distant Detect Flame',

      castingTime: 'one minute',

      functionsLike: {
        exceptThat: `
          the range increases to 2,000 feet.
        `,
        name: 'detect flame',
      },
      rank: 4,
      tags: ['Detection'],
    },

    {
      name: 'Explosive Runes',

      castingTime: 'one hour',
      effect: `
        % TODO: clarify how to identify that this is Explosive Runes instead of bad handwriting
        Choose one Medium or smaller \\glossterm{unattended} object with writing on it within \\shortrange.
        The writing on the object is altered by the runes in subtle ways, making it more difficult to read.
        It becomes a \\glossterm{trap}.
        To read the writing, a creature must concentrate on reading it, which requires a standard action.
        If a creature reads the object, the object explodes.
        You make an attack vs. Reflex against everything within a \\medarea radius from the object.
        Your accuracy with this attack is equal to half your level \\add half your Perception.
        This accuracy is calculated at the time that you perform this ritual and does not change afterwards.
        Each struck target takes 2d6 + half \\glossterm{power} fire damage.
        A miss is still considered a \\glossterm{glancing blow}.

        After the object explodes in this way, the ritual is \\glossterm{dismissed}.
        If the object is destroyed or rendered illegible, the ritual is dismissed without exploding.
      `,
      rank: 4,
      scaling: {
        special: `
          You can perform this ritual at a higher rank.
          The damage increases by +1d per rank beyond 4.
        `,
      },
      tags: ['Trap'],
      type: 'Attune',
    },
  ],
};
