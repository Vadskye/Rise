import { MysticSphere } from ".";

export const electromancy: MysticSphere = {
  name: "Electromancy",
  shortDescription: "Create electricity to injure and stun foes.",
  sources: ["arcane", "nature", "pact"],

  cantrips: [
    {
      name: "Spark",

      attack: {
        hit: `The target takes 2 electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against anything within \\shortrange.
        `,
      },
      scaling: {
        2: `The damage increases to 5.`,
        4: `The damage increases to 10.`,
        6: `The damage increases to 20.`,
      },
    },

    {
      name: "Magnetize",

      effect: `
        Choose one Small or smaller unattended metal object within \\medrange.
        It pulls itself toward metal objects within 1 foot of it.
        Smaller objects are typically pulled towards the target, while it moves itself towards larger objects.
        Once it becomes affixed to another metal object, it takes a \\glossterm{difficulty value} 10 Strength check to separate the two objects.
      `,
      scaling: {
        2: `The maximum size increases to Medium.`,
        4: `The maximum size increases to Large.`,
        6: `The maximum size increases to Huge.`,
      },
      type: "Sustain (minor)",
    },
  ],
  spells: [
    {
      name: "Lightning Bolt",

      attack: {
        hit: `Each target takes 1d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarealong, 5 ft. wide line from you.
        `,
      },
      rank: 1,
      scaling: "damage",
    },
    {
      name: "Greater Lightning Bolt",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 10 ft. wide line from you.
        `,
      },
      rank: 3,
      scaling: "damage",
    },
    {
      name: "Supreme Lightning Bolt",

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\gargarealong, 15 ft. wide line from you.
        `,
      },
      rank: 6,
      scaling: "damage",
    },

    {
      name: "Shocking Grasp",

      attack: {
        hit: `The target takes 1d8 + \\glossterm{power} electricity damage.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
        `,
      },
      rank: 1,
      scaling: "damage",
    },

    {
      name: "Greater Shocking Grasp",

      attack: {
        hit: `
          The target takes 2d6 + \\glossterm{power} electricity damage.
          If it loses \\glossterm{hit points} from this damage, it is \\dazed as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
        `,
      },
      rank: 3,
      scaling: "damage",
    },

    {
      name: "Supreme Shocking Grasp",

      functionsLike: {
        name: 'greater shocking grasp',
        exceptThat: 'the damage increases to 4d8 + \\glossterm{power} damage, and the target is \\stunned instead of dazed.',
      },
      rank: 6,
      scaling: "damage",
    },

    {
      name: "Stunning Discharge",

      attack: {
        crit: `Creatures that have remaining damage resistance are also affected.`,
        hit: `
          Each target that has no remaining \\glossterm{damage resistance} is \\dazed as a \\glossterm{condition} and \\glossterm{briefly} \\stunned.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea radius from you.
        `,
      },
      rank: 1,
      scaling: "accuracy",
    },

    {
      name: "Greater Stunning Discharge",

      attack: {
        crit: `Creatures that have remaining damage resistance are also affected.`,
        hit: `
          Each target that has no remaining \\glossterm{damage resistance} is \\stunned as a \\glossterm{condition} and \\glossterm{briefly} \\confused.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea radius from you.
        `,
      },
      rank: 5,
      scaling: "accuracy",
    },

    {
      name: 'Energize',

      effect: `
        Chose yourself or one \\glossterm{ally} within \\medrange.
        The target regains 1d8 + \\glossterm{power} \\glossterm{damage resistance} and increases its \\glossterm{fatigue level} by one.
        In addition, it is \\glossterm{impervious} to electricity damage this round.
      `,
      rank: 2,
      scaling: { special: "The recovery increases by +1d for each rank beyond 2." },
      tags: ['Swift'],
    },

    {
      name: 'Greater Energize',

      effect: `
        Chose yourself or one \\glossterm{ally} within \\medrange.
        The target regains 4d8 + \\glossterm{power} \\glossterm{damage resistance} and increases its \\glossterm{fatigue level} by one.
        In addition, it is \\glossterm{immune} to electricity damage this round.
      `,
      rank: 6,
      scaling: { special: "The recovery increases by +1d for each rank beyond 6." },
      tags: ['Swift'],
    },

    {
      name: "Lightning Storm",

      attack: {
        hit: `Each target takes 1d8 + half \\glossterm{power} electricity damage.`,
        targeting: `
        Make an attack vs. Reflex against all \\glossterm{enemies} in a \\areasmall radius from you.
        `,
      },
      rank: 2,
      scaling: "damage",
    },

    {
      name: "Greater Lightning Storm",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 4,
      scaling: "damage",
    },

    {
      name: "Supreme Lightning Storm",

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\gargarea radius from you.
        `,
      },
      rank: 6,
      scaling: "damage",
    },

    {
      name: "Electromagnetic Bolt",

      attack: {
        hit: `Each target takes 2d8 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 10 ft. wide line from you.
          You gain a +2 accuracy bonus against each target that is wearing metal armor or otherwise carrying or composed of a significant amount of metal.
        `,
      },
      rank: 5,
      scaling: "damage",
    },

    {
      name: "Magnetic Blade",

      effect: `
        Metal weapons you wield gain a +1 bonus to \\glossterm{accuracy} against targets wearing metal armor or otherwise carrying or composed of a significant amount of metal.
      `,
      rank: 3,
      type: "Attune",
    },

    {
      name: "Chain Lightning",

      attack: {
        hit: `
          The primary target takes 2d10 + \\glossterm{power} electricity damage.
          Each secondary target takes 2d8 + half \\glossterm{power} electricity damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          In addition, regardless of whether you hit that creature, make an attack vs. Reflex against all \\glossterm{enemies} within a \\smallarea radius from that creature.
        `,
      },
      rank: 5,
      scaling: {
        special:
          "The damage to both the primary and secondary subjects increases by +1d for each rank beyond 5.",
      },
    },

    {
      name: "Electroshock",

      attack: {
        hit: `The target takes 1d4 electricity damage.
        If it loses \\glossterm{hit points} from this damage, it is \\stunned as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
    },

    {
      name: "Greater Electroshock",

      attack: {
        hit: `The target takes 2d6 electricity damage.
        If it loses \\glossterm{hit points} from this damage, it is \\confused as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
    },

    {
      name: "Call Lightning",

      attack: {
        // +1d from normal AOE due to weird area that probably just hits one person
        hit: `Each target takes 1d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarealong, 5 ft. wide vertical line within \\medrange.
          If you are outdoors in cloudy or stormy weather, you gain a +2 bonus to \\glossterm{accuracy} with the attack.
          If this spell has its area increased, only the length of the line increases.
        `,
      },
      rank: 2,
      scaling: "damage",
    },

    {
      name: "Greater Call Lightning",

      attack: {
        // crit: '',
        // +1d from normal AOE due to weird area that probably just hits one person
        hit: `
          Each target takes 4d8 + half \\glossterm{power} electricity damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft.\\ wide vertical line within \\distrange.
          If you are outdoors in cloudy or stormy weather, you gain a +2 bonus to \\glossterm{accuracy} with the attack.
          If this spell has its area increased, only the length of the line increases.
        `,
      },
      rank: 6,
      scaling: "damage",
    },

    {
      // The flavor here is a bit of a stretch, so it only affects land speed and there is
      // no Mass Energize.
      name: "Energize",

      effect: `
        You gain a +10 foot \\glossterm{magic bonus} to your land speed.
      `,
      rank: 4,
      type: "Attune",
    },

    {
      name: "Lightning Breath",

      attack: {
        // +1d for attune + every other round
        hit: `Each target takes 2d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          For the duration of this spell, you can breathe electricity like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Attune",
    },

    {
      name: "Greater Lightning Breath",

      functionsLike: {
        name: 'lightning breath',
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
      name: "Ball Lightning",

      attack: {
        hit: `Each target takes 2d8 electricity damage.`,
        targeting: `
          You create a Medium size ball of lightning in one space within \\longrange.
          The ball of lightning does not occupy space or block movement, and can move through creatures (but not solid objects) freely.
          Whenever you sustain this effect, you can move the ball up to 30 feet in any direction, even vertically.
          When you create the ball, and each subsequent \\glossterm{action phase}, make an attack vs. Reflex with a -2 accuracy penalty against everything in its space.
          Then, if the ball is more than 120 feet from you, it disappears and this effect ends.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Sustain (minor)",
    },

    {
      name: "Personal Conduction",

      attack: {
        // AOE dice, but no power
        hit: `Each target takes 2d6 electricity damage.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Attune (deep)",
    },

    {
      name: "Greater Personal Conduction",

      attack: {
        // AOE dice, but no power
        hit: `Each target takes 4d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
        `,
      },
      rank: 7,
      type: "Attune (deep)",
    },

    {
      name: "Electrocute",

      attack: {
        // +2d from level, add trivial extra benefit for fun
        hit: `
          The target takes 4d8 + \\glossterm{power} electricity damage.
          In addition, if the target is unconscious from vital wounds at the end of the current \\glossterm{phase}, it dies.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },

      rank: 5,
      scaling: "damage",
    },

    {
      name: "Lightning Rod",

      // -1 level vs Greater Ignition due to minor action cost
      attack: {
        crit: `Each bolt deals double damage.`,
        hit: `As a \\glossterm{condition}, the target attracts lightning.
          As a \\glossterm{minor action}, you can call a bolt of lightning to strike the target.
          When you do, the target takes 2d6 + half \\glossterm{power} electricity damage.
        `,
        targeting: `
          Make an attack vs. Reflex against anything within \\medrange.
        `,
      },
      rank: 4,
      scaling: "damage",
    },

    {
      name: "Greater Lightning Rod",

      // -1 level vs Greater Ignition due to minor action cost
      attack: {
        crit: `Each bolt deals double damage.`,
        hit: `As a \\glossterm{condition}, the target attracts lightning.
          As a \\glossterm{minor action}, you can call a bolt of lightning to strike the target.
          When you do, the target takes 4d8 + half \\glossterm{power} electricity damage.
        `,
        targeting: `
          Make an attack vs. Reflex against anything within \\longrange.
        `,
      },
      rank: 7,
      scaling: "damage",
    },

    {
      name: "Thunderdash",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          Both your departure and arrival with this spell sound like a clap of thunder.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: "damage",
    },

    {
      name: "Greater Thunderdash",

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
        You teleport into an unoccupied destination on a stable surface within \\distrange.
        Both your departure and arrival with this spell sound like a clap of thunder.
        In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },

      rank: 6,
      scaling: "damage",
    },

    {
      name: "Cleansing Shock",

      effect: `
        You or one \\glossterm{ally} within \\medrange can remove a \\glossterm{condition}.
        This cannot remove an effect applied during the current round.
        For each effect removed this way, you deal the target 4 electricity damage.
      `,
      rank: 4,
      scaling: {
        6: `The target can remove two effects.`,
      },
    },

    {
      name: "Dazing Shock",
      attack: {
        hit: `
          The target takes 1d10 + \\glossterm{power} electricity damage.
          If it loses \\glossterm{hit points} from this damage, it is \\dazed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 2,
      scaling: "damage",
    },

    {
      name: "Stunning Shock",
      attack: {
        hit: `
          The target takes 4d6 + \\glossterm{power} electricity damage.
          If it loses \\glossterm{hit points} from this damage, it is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 6,
      scaling: "damage",
    },

    {
      name: "Shocking Burst",

      attack: {
        hit: `Each target takes 1d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: [],
    },

    {
      name: "Greater Shocking Burst",

      attack: {
        hit: `Each target takes 4d8 + \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: [],
    },
  ],
  rituals: [],
};
