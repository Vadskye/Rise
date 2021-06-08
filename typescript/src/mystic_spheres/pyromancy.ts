import { MysticSphere } from ".";

export const pyromancy: MysticSphere = {
  name: "Pyromancy",
  shortDescription: "Create fire to incinerate foes.",
  sources: ["arcane", "domain", "nature", "pact"],

  cantrips: [
    {
      name: "Kindle",

      attack: {
        hit: `The subject takes 2 fire damage.
        If the subject is highly flammable, such as a torch or campfire, it ignites.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      focus: false,
      scaling: {
        2: `The damage increases to 5.`,
        4: `The damage increases to 10.`,
        6: `The damage increases to 20.`,
      },
      type: "Instant",
    },

    {
      name: "Extinguish",

      attack: {
        hit: `The flame is extinguished.`,
        targeting: `
          Choose one Medium or smaller active flame within \\medrange.
          If the subject is \\glossterm{attended} by a creature, such as a torch being carried, you must make an attack vs. Reflex against the attending creature.
          Otherwise, the attack automatically hits.
        `,
      },
      focus: false,
      scaling: {
        2: `The maximum size increases to Large.`,
        4: `The maximum size increases to Huge.`,
        6: `The maximum size increases to Gargantuan.`,
      },
      type: "Instant",
    },

    {
      name: "Personal Torch",

      effect: `
        You create a flame in your hand.
        You can create it at any intensity, up to a maximum heat equivalent to a roaring campfire.
        At it most intense, it sheds \\glossterm{bright illumination} in a 30 foot radius and shadowy illumination in an 60 foot radius.
        As a standard action, you can make a melee attack vs. Reflex against a creature or object.
        On a hit, the subject takes 2 fire damage.

        This effect lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      focus: false,
      scaling: {
        2: `The damage increases to 5.`,
        4: `The damage increases to 10.`,
        6: `The damage increases to 20.`,
      },
      type: "Duration",
    },

    {
      name: "Heat Air",

      effect: `
        The temperatuture of the air within a \\medarea radius \\glossterm{emanation} from you is increased by an amount of your choice, to a maximum increase of 20 degrees Fahrenheit.
        You cannot increase the temperature above 100 degrees in this way.
        This typically imposes no direct penalties on other creatures, but it may make them more or less comfortable depending on their preferred temperature.

        This ability lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      focus: false,
      scaling: {
        2: `The area increases to a \\largearea radius \\glossterm{emanation}, and the maximum temperature increase increases to 30 degrees.`,
        4: `The area increases to a \\hugearea radius \\glossterm{emanation}, and the maximum temperature increase increases to 40 degrees.`,
        6: `The area increases to a \\gargarea radius \\glossterm{emanation}, and the maximum temperature increase increases to 50 degrees.`,
      },
      type: "Duration",
    },
  ],
  spells: [
    {
      name: "Burning Grasp",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} fire damage.`,
        targeting: `
        This spell does not have the \\abilitytag{Focus} tag.
        You must have a \\glossterm{free hand} to cast this spell.

        Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      focus: false,
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Burning Grasp",

      attack: {
        glance: "Half damage from the initial hit.",
        hit: `
          The subject takes 2d10 + \\glossterm{power} fire damage.
          If it loses \\glossterm{hit points} from this damage, it catches on fire as a \\glossterm{condition}.
          At the end of each round, it takes 1d10 fire damage.

          If the the subject gains a \\glossterm{vital wound} from this damage, the condition ends.
          The condition can also be removed if the subject makes a \\glossterm{difficulty rating} 10 Dexterity check as a \\glossterm{move action} to put out the flames.
          Dropping \\prone as part of this action gives a +5 bonus to this check.
        `,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      focus: false,
      rank: 4,
      scaling: {
        special: `
          The damage from both the initial hit and the condition increases by +1d for each rank beyond 4.
        `,
      },
      type: "Duration",
    },

    {
      name: "Pyroclasm",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d10 + half \\glossterm{power} fire damage.
        In addition, if the subject is a flammable object, it catches on fire.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius within \\longrange.
        `,
      },

      rank: 5,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Fireball",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d6 + half \\glossterm{power} fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\areasmall radius within \\medrange.
        `,
      },

      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Firebolt",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} fire damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\medrange.
        `,
      },

      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Cone of Fire",

      attack: {
        hit: `Each subject takes 1d8 + half \\glossterm{power} fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\areasmall cone from you.
        `,
      },

      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Cone of Fire",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d6 + half \\glossterm{power} fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\arealarge cone from you.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Ignition",

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `The subject catches on fire as a \\glossterm{condition}.
        At the end of each round, it takes 1d10 fire damage.

        If the the subject gains a \\glossterm{vital wound} from this damage, the condition ends.
        The condition can also be removed if the subject makes a \\glossterm{difficulty rating} 10 Dexterity check as a \\glossterm{move action} to put out the flames.
        Dropping \\prone as part of this action gives a +5 bonus to this check.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Greater Ignition",

      attack: {
        crit: `The damage from the condition is doubled.`,
        glance:
          "The effect lasts until the end of the next round. The subject still takes damage during that round.",
        hit: `The subject catches on fire as a \\glossterm{condition}.
        At the end of each round, it takes 2d10 fire damage.
        If the the subject gains a \\glossterm{vital wound} from this damage, the condition ends.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Combustion",

      attack: {
        hit: `The subject takes 2d8 + \\glossterm{power} fire damage.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      narrative: `
        Your foe ignites into flame, burning from the inside out.
      `,
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Immolate",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 4d10 + \\glossterm{power} fire damage.
        In addition, if the subject has no hit points remaining at the end of the current \\glossterm{phase}, it dies.
        Its body is completely incinerated, leaving behind only a pinch of fine ash.
        Its equipment is unaffected.`,
        targeting: `
        Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },

      rank: 5,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Heat Metal",

      attack: {
        hit: `The object becomes burning hot to the touch.
        At the end of each round, it and anything touching it takes 1d10 + half \\glossterm{power} fire damage.`,
        targeting: `
          Choose one metal object within \\medrange.
          It must be no smaller than Tiny size and no larger than Large size.
          If the subject is \\glossterm{attended}, make an attack vs. Reflex against the attending creature.
          Otherwise, this attack automatically hits.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Sustain (minor)",
    },

    {
      name: "Flame Breath",

      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} fire damage.`,
        targeting: `
          For the duration of this spell, you can breathe fire like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you use this ability, you cannot use it again until after the end of the next round.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Eyes of Flame",

      castingTime: "minor action",
      attack: {
        hit: `The subject takes 2d8 + \\glossterm{power} fire damage.`,
        targeting: `
          For the duration of this spell, you can set things on fire simply by staring at them as a standard action.
          When you do, make an attack vs. Fortitude against anything within \\shortrange from you.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Flaming Spheres",

      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 2d6 fire damage.`,
        targeting: `
          When you cast this spell, a cluster of flaming spheres appears over your head.
          Each sphere is approximately one foot in diameter.
          As a \\glossterm{minor action}, you can fire an orb at a creature or object within \\shortrange.
          When you do, make an attack vs. Armor against that target.
          After the sphere deals damage, it disappears and another sphere appears in the cluster.
        `,
      },

      rank: 4,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Inferno",

      attack: {
        hit: `Each subject takes 1d8 + half \\glossterm{power} fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea radius from you.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Inferno",

      attack: {
        hit: `Each subject takes 2d6 + half \\glossterm{power} fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearea radius from you.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Supreme Inferno",

      attack: {
        hit: `Each subject takes 2d10 + half \\glossterm{power} fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\hugearea radius from you.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Flame Serpent",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d8 + half \\glossterm{power} fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarealong, 5 ft. wide shapeable line that starts within \\medrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Personal Ignition",

      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        // AOE dice, but no power
        hit: `Each subject takes 2d6 fire damage.`,
        targeting: `
          You catch on fire.
          This does not cause you any harm, as the flames burn around your body without burning you.
          At the end of each round, make an attack vs. Reflex against each creature that you are \\grappled by, and each creature that attacked you with a non-\\glossterm{Long} melee weapon that round.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Flame Aura",

      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        // TODO: is this damage correct?
        hit: `Each secondary target takes 4d6 fire damage.`,
        targeting: `
          Heat constantly radiates in a \\smallarea radius emanation from you.
          As a \\glossterm{minor action}, you can intensify the flames to make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Flame Blade",

      castingTime: "minor action",
      effect: `
        Your weapons shed light like a torch.
        In addition, all damage you deal with \\glossterm{strikes} becomes fire damage in addition to the attack's normal damage types.
      `,
      rank: 3,
      scaling: {
        5: `You also gain a +4 \\glossterm{magic bonus} to \\glossterm{power} with strikes.`,
        7: `The bonus increases to +8.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Flame Blade",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Flame Blade",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: `Each subject also gains a +4 \\glossterm{magic bonus} to \\glossterm{power} with strikes.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Wall of Fire",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 2d6 + half \\glossterm{power} fire damage.`,
        targeting: `
        You create a wall of fire in a 15 ft.\\ high, \\medarea \\glossterm{wall} within \\medrange.
        The flames and heat make it difficult to see through the wall, granting \\glossterm{concealment} to targets on the opposite side of the wall.
        Whenever anything passes through the wall, you make an attack vs. Reflex against it.
        You can only make this attack against a given target once per \\glossterm{phase}.

        Each five-foot square of wall has hit points equal to twice your \\glossterm{power}, and all of its defenses are 0.
        It is immune to most forms of attack, but it can be destroyed by cold damage and similar effects that can destroy water.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Sustain (minor)",
    },

    {
      name: "Pyrophobia",

      attack: {
        crit: `The subject is \\frightened instead of shaken.`,
        hit: `The subject is \\shaken by you and all other sources of fire as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Primal Pyrophobia",

      attack: {
        crit: `The subject is \\panicked instead of frightened.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is \\frightened by you and all other sources of fire as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
    },

    {
      name: "Pyrohemia",

      attack: {
        hit: `The subject takes 1d10 + half \\glossterm{power} fire damage.
        If it loses \\glossterm{hit points} from this damage, it is \\sickened as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\longrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Greater Pyrohemia",

      // original targets: Target
      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 2d10 + half \\glossterm{power} fire damage.
        If it loses \\glossterm{hit points} from this damage, it is \\nauseated as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\longrange.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Curse of Flammability",

      attack: {
        crit: `The effect lasts until the curse is removed.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is highly flammable until it takes a \\glossterm{short rest}.
        Like dry wood or kindling, it catches on fire whenever it takes any fire damage.
        While ignited in this way, it takes 2d8 fire damage at the end of each round.

        It can put out the fire by making a \\glossterm{difficulty rating} 10 Dexterity check as a \\glossterm{move action} to put out the flames.
        Dropping \\prone as part of this action gives a +5 bonus to this check.
        Putting out the flames in this way does not remove this effect.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },

      rank: 5,
      scaling: "accuracy",
      tags: ["Curse"],
      type: "Duration",
    },

    {
      name: "Kindled Fireburst",

      // original targets: One Tiny or larger active fire within \medrange (see text)
      attack: {
        hit: `Each subject takes 1d10 + half \\glossterm{power} fire damage.`,
        targeting: `
          Choose one Tiny or larger active fire within \\medrange.
          Make an attack vs. Reflex against everything within an \\smallarea radius from it.
        `,
      },
      narrative: `
        A small source of fire, such as a torch, erupts into a much larger burst of flame.
      `,
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Wings of the Phoenix",

      effect: `
        You gain a 30 foot \\glossterm{fly speed} with a maximum height of 30 feet (see \\pcref{Flying}).
        If you are above that height, you gain a 30 foot \\glossterm{glide speed} instead.
      `,
      rank: 5,
      scaling: { 7: `The maximum height increases to 60 feet.` },
      type: "Attune (self)",
    },

    {
      name: "Flame Dash",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d6 + half \\glossterm{power} fire damage.`,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Flame Dash",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 4d6 + half \\glossterm{power} fire damage.`,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\distrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },
  ],
  rituals: [
    {
      name: "Heat Wave",

      castingTime: "one hour",
      effect: `
        The temperature in a two mile radius cylinder-shaped \\glossterm{zone} from your location increases rapidly.
        Over the next minute after you finish this ritual, the temperature increases by 40 degrees Fahrenheit, to a maximum of 120 degrees.
        Unlike normal, this effect does not require \\glossterm{line of effect} to you.
        Instead, it affects all outdoor locations within the area.
        Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.
      `,
      rank: 4,
      type: "Attune (self)",
    },

    {
      name: "Pyrostorm",

      castingTime: "one hour",

      functionsLike: {
        exceptThat: `
          the temperature in the area increases by 60 degrees, to a minimum of 160 degrees.
        `,
        name: "heat wave",
      },
      rank: 7,
      type: "Attune (self)",
    },

    {
      name: "Detect Flame",

      castingTime: "one minute",
      effect: `
          You learn the approximate distance and direction to any active fires within \\longrange \\glossterm{range} of you.
          Since this is a \\abilitytag{Detection} ability, its range can penetrate some solid objects (see \\pcref{Detection}).
          This spell can sense fires as small as a candle flame, but no smaller.
      `,
      rank: 1,
      tags: ["Detection"],
      type: "Instant",
    },

    {
      name: "Greater Detect Flame",

      castingTime: "one minute",

      functionsLike: {
        exceptThat: `
          the range increases to \\extrange.
        `,
        name: "detect flame",
      },
      rank: 3,
      tags: ["Detection"],
      type: "Instant",
    },

    {
      name: "Supreme Detect Flame",

      castingTime: "one minute",

      functionsLike: {
        exceptThat: `
          the range increases to 2,000 feet.
        `,
        name: "detect flame",
      },
      rank: 5,
      tags: ["Detection"],
      type: "Instant",
    },
  ],
};
