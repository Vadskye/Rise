import { MysticSphere } from ".";

export const cryomancy: MysticSphere = {
  name: "Cryomancy",
  shortDescription: "Drain heat to injure and freeze foes.",
  sources: ["arcane", "nature", "pact"],

  cantrips: [
    {
      name: "Chill",

      attack: {
        hit: `
          The target takes 2 cold damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      scaling: {
        2: "The damage increases to 5.",
        4: "The damage increases to 10.",
        6: "The damage increases to 20.",
      },
    },
    {
      name: "Chill Air",

      effect: `
        The temperatuture of the air within a \\areamed radius \\glossterm{emanation} from you is reduced by an amount of your choice, to a maximum reduction of 20 degrees Fahrenheit.
        You cannot reduce the temperature below 0 degrees in this way.
        This typically imposes no direct penalties on other creatures, but it may make them more or less comfortable depending on their preferred temperature.

        This ability lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
      `,
      scaling: {
        2: "The area increases to a \\largearea radius \\glossterm{emanation}, and the maximum temperature reduction increases to 30 degrees.",
        4: "The area increases to a \\hugearea radius \\glossterm{emanation}, and the maximum temperature reduction increases to 40 degrees.",
        6: "The area increases to a \\gargarea radius \\glossterm{emanation}, and the maximum temperature reduction increases to 50 degrees.",
      },
    },
  ],
  spells: [
    {
      name: "Freezing Grasp",

      attack: {
        hit: `The target takes 1d8 + \\glossterm{power} cold damage.`,
        targeting: `
        You must have a \\glossterm{free hand} to cast this spell.

        Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      rank: 1,
      scaling: "damage",
    },

    {
      name: "Greater Freezing Grasp",

      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} cold damage.
          If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      rank: 3,
      scaling: "damage",
    },

    {
      name: "Supreme Freezing Grasp",

      functionsLike: {
        name: 'greater freezing grasp',
        exceptThat: 'the damage increases to 4d6 + \\glossterm{power} damage, and the condition must be removed twice before the effect ends.',
      },
      rank: 6,
      scaling: "damage",
    },

    {
      name: "Cone of Cold",

      attack: {
        hit: `Each target takes 1d6 + half \\glossterm{power} cold damage.`,
        targeting: `
        Make an attack vs. Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      rank: 1,
      scaling: "damage",
    },

    {
      name: "Greater Cone of Cold",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} cold damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\largearea cone from you.
        `,
      },
      rank: 3,
      scaling: "damage",
    },

    {
      name: "Supreme Cone of Cold",

      attack: {
        hit: `Each target takes 2d8 + half \\glossterm{power} cold damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\hugearea cone from you.
        `,
      },
      rank: 5,
    },

    {
      name: "Frozen Legs",

      attack: {
        hit: `The target takes 2d6 cold damage.
        If it loses \\glossterm{hit points} from this damage, it is \\immobilized as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
    },

    {
      name: "Mass Frozen Legs",

      attack: {
        crit: 'The effect becomes a \\glossterm{condition}.',
        hit: `
          Each target that has no remaining \\glossterm{damage resistance} is \\glossterm{briefly} \\immobilized.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 4,
      scaling: "accuracy",
    },

    {
      name: "Ice Lance",

      attack: {
        hit: `Each target takes 1d8 + half \\glossterm{power} piercing and cold damage.`,
        targeting: `
          Make an attack vs. Armor against everything in a \\largearealong, 5 ft. wide line from you.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Greater Ice Lance",

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} piercing and cold damage.`,
        targeting: `
          Make an attack vs. Armor against everything in a \\largearealong, 10 ft. wide line from you.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Ice Spike",

      attack: {
        hit: `The target takes 2d6 + \\glossterm{power} piercing and cold damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Greater Ice Spike",

      attack: {
        hit: `The target takes 4d8 + \\glossterm{power} piercing and cold damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\medrange.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
    },

    {
      name: "Freeze Poison",

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The target takes 1 cold damage.
        In addition, it gains an additional success to resist a poison currently affecting it (see \\pcref{Poison}).
      `,
      rank: 1,
      scaling: {
        3: `The number of additional successes increases to two.
            The target can split these successes among any number of different poisons affecting it.`,
        5: `The number of additional successes increases to three.`,
        7: `The number of additional successes increases to four.`,
      },
    },

    {
      name: "Skate",

      effect: `
        You can move on top of calm water as if it were land.
        You treat the water as \\glossterm{difficult terrain}.
      `,
      rank: 1,
      scaling: {
        3: `You can also move on top of rough or stormy water.`,
        5: `You no longer treat the water as difficult terrain.`,
        7: `You also gain a +5 foot \\glossterm{magic bonus} to your land speed.`,
      },
      type: "Attune",
    },

    {
      name: "Mass Skate",

      functionsLike: {
        mass: true,
        name: "Skate",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        3: `The target can also move on top of rough or stormy water.`,
        5: `The target no longer treats the water as difficult terrain.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Skyskate",

      effect: `
        Whenever you move using one of your movement speeds, you can leave a trail of ice behind you.
        The ice lasts until the end of the round before disappearing.

        While you are leaving a trail of ice behind you, you can move into thin air by walking on your own ice trail, just as if it was solid ground.
        If you are still standing on your own ice trail when it disappears at the end of the round, you fall.

        Creatures following closely behind you while you move may also be able to use your ice trail.
        However, most Large or larger creatures will break the ice trail if they step onto it, which may cause both of you to fall.
      `,
      rank: 3,
      scaling: {
        5: `Your ice trail collapses more gradually.  If you are still standing on your own ice trail when it disappears, you treat your fall as if it were 60 feet shorter than it actually was for the purpose of determining \\glossterm{falling damage}.`,
        7: `Your ice trail lasts \\glossterm{briefly} after your movement.`,
      },
      tags: ["Manifestation"],
      type: "Attune",
    },

    {
      name: "Icy Shell",

      effect: `
        You cover your body with two layers of ice that crumple when they take damage.
        The ice does not cover your joints, allowing you to move freely.
        Whenever you would take physical damage or fire damage, you reduce that damage by 5, and one layer of ice is destroyed.
        When the last layer of ice is destroyed, this ability provides no further benefit.

        If you take simultaneous damage from more sources than you have remaining layers, the remaining layers apply to the largest damage sources, and you take full damage from any lower damage values.
      `,
      rank: 1,
      scaling: {
        3: `The damage reduction increases to 10.`,
        5: `The damage reduction increases to 20.`,
        7: `The damage reduction increases to 40.`,
      },
      tags: ["Manifestation"],
      type: "Attune (deep)",
    },

    {
      name: "Frostbite",

      attack: {
        hit: `
          The target takes 1d4 cold damage.
          If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.
          This condition must be removed twice before the effect ends.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },

      rank: 1,
      scaling: "accuracy",
    },

    {
      name: "Greater Frostbite",

      functionsLike: {
        name: 'frostbite',
        exceptThat: 'the damage increases to 1d10, and the attack gains a +3 \\glossterm{accuracy} bonus.',
      },
      rank: 4,
      scaling: "accuracy",
    },

    {
      name: "Hailstorm",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} bludgeoning and cold damage (see \\pcref{Multiple Damage Types}).`,
        targeting: `
          Make an attack vs. Armor against everything in a \\medarea radius within \\medrange.
        `,
      },

      rank: 4,
      scaling: "damage",
    },

    {
      name: "Greater Hailstorm",

      attack: {
        hit: `Each target takes 4d8 + half \\glossterm{power} bludgeoning and cold damage (see \\pcref{Multiple Damage Types}).`,
        targeting: `
          Make an attack vs. Armor against everything in a \\medarea radius within \\longrange.
        `,
      },

      rank: 7,
      scaling: "damage",
    },

    {
      name: "Blizzard",

      attack: {
        hit: `Each target takes 1d8 + half \\glossterm{power} cold damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarea radius from you.
        `,
      },
      rank: 2,
      scaling: "damage",
    },

    {
      name: "Greater Blizzard",

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} cold damage.`,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\largearea radius from you.
        `,
      },
      rank: 5,
      scaling: "damage",
    },

    {
      name: "Icecraft",

      effect: `
        Choose one pool of \\glossterm{unattended}, nonmagical water within \\shortrange.
        This spell creates up to three weapons, suits of body armor, or shields from the target pool of water.
        You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made entirely from metal, except for heavy armor.
        The pool of water targeted must be at least as large as the largest item you create.

        An item created with this spell functions like a normal item of its type, with three exceptions.
        First, any \\glossterm{strikes} that you make with a weapon created with this ability are \\glossterm{magical} abilities, so you use your Willpower to determine your damage instead of your Strength (see \\pcref{Dice Bonuses From Attributes}).
        except that it reacts differently to fire damage.
        Second, while wearing body armor from this spell, you are \\trait{impervious} to fire damage.
        Third, whenever you lose \\glossterm{hit points} from fire damage, all armor and weapons you made with this ability disappear.
        They reappear at the end of the round.
      `,
      rank: 1,
      scaling: {
        3: `
          If you create body armor or a weapon, it can be created from special materials other than cold iron.
          The item's rank still cannot exceed your spellcasting rank with this spell, including any modifiers from special materials.
        `,
        5: `
          You can also create heavy armor.
        `,
        7: `
          This spell loses the \\abilitytag{Attune} tag.
          Instead, it lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
        `,
      },
      type: "Attune",
    },

    {
      name: "Frost Breath",

      attack: {
        // +1d for attune + every other round
        hit: `Each target takes 2d6 + half \\glossterm{power} cold damage.`,
        targeting: `
          For the duration of this spell, you can breathe cold like a dragon as a standard action.
          When you do, make an attack vs. Fortitude against everything in a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Attune",
    },

    {
      name: "Greater Frost Breath",

      functionsLike: {
        name: 'frost breath',
        exceptThat: `
          the damage increases to 4d10 + half \\glossterm{power}.
          In addition, the area increases to a \\hugearea cone.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Attune",
    },

    {
      name: "Frigid Aura",

      // original targets: ['Yourself', 'See text']
      attack: {
        hit: `Each target takes 2d6 cold damage.`,
        targeting: `
          At the end of each phase, make an attack vs. Fortitude against each creature that made a \\glossterm{melee} attack against you using a free hand or non-Long weapon during that phase.
        `,
      },

      rank: 3,
      scaling: "damage",
      type: "Attune (deep)",
    },

    {
      name: "Greater Frigid Aura",

      attack: {
        hit: `Each target takes 4d10 + half \\glossterm{power} cold damage.`,
        targeting: `
          At the end of each phase, make an attack vs. Fortitude against each creature that made a \\glossterm{melee} attack against you using a free hand or non-Long weapon during that phase.
        `,
      },

      rank: 7,
      // scaling: "damage",
      type: "Attune (deep)",
    },

    {
      name: "Chillwind Dash",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} cold damage.`,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: "damage",
    },

    {
      name: "Greater Chillwind Dash",

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} cold damage.`,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\distrange.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 6,
      scaling: "damage",
    },
    {
      name: "Bonechill",

      attack: {
        hit: `
          The target takes 1d10 + \\glossterm{power} cold damage.
          If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 2,
      scaling: "damage",
    },

    {
      name: "Quickchill",

      attack: {
        hit: `
          The target takes 2d8 + \\glossterm{power} cold damage.
          If it takes damage, it is \\glossterm{briefly} \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 4,
      scaling: "damage",
    },

    {
      name: "Greater Quickchill",

      attack: {
        hit: `
          The target takes 4d8 + \\glossterm{power} cold damage.
          If it takes damage, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 7,
      scaling: "damage",
    },
  ],
  rituals: [
    {
      name: "Cold Tolerance",

      castingTime: "one minute",
      effect: `
        Choose either yourself or an \\glossterm{ally} or unattended object within \\medrange.
        The target suffers no harm from being in a cold environment.
        It can exist comfortably in conditions as low as -50 degrees Fahrenheit.
        Its equipment, if any, is also protected.
        This does not protect the target from cold damage.
      `,
      rank: 1,
      type: "Attune",
    },
    {
      name: "Frostfall",

      castingTime: "one hour",
      effect: `
        The temperature in a two mile radius cylinder-shaped \\glossterm{zone} from your location decreases rapidly.
        Over the next minute after you finish this ritual, the temperature decreases by 40 degrees Fahrenheit, to a minimum of \\minus30 degrees.
        Unlike normal, this effect does not require \\glossterm{line of effect} to you.
        Instead, it affects all outdoor locations within the area.
        Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.
      `,
      rank: 4,
      type: "Attune",
    },

    {
      name: "Froststorm",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
          the temperature in the area decreases by 60 degrees, to a minimum of \\minus70 degrees.
        `,
        name: "frostfall",
      },
      rank: 7,
      type: "Attune",
    },
  ],
};
