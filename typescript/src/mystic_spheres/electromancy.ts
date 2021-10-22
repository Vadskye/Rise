import { MysticSphere } from ".";

export const electromancy: MysticSphere = {
  name: "Electromancy",
  shortDescription: "Create electricity to injure and stun foes.",
  sources: ["arcane", "nature", "pact"],

  cantrips: [
    {
      name: "Spark",

      attack: {
        hit: `The subject takes 2 electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against anything within \\shortrange.
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
      name: "Magnetize",

      effect: `
        Choose one Small or smaller unattended metal object within \\medrange.
        It pulls itself toward metal objects within 1 foot of it.
        Smaller objects are typically pulled towards the subject, while it moves itself towards larger objects.
        Once it becomes affixed to another metal object, it takes a \\glossterm{difficulty value} 10 Strength check to separate the two objects.
      `,
      focus: false,
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
        hit: `Each subject takes 2d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 10 ft. wide line from you.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Shocking Grasp",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} electricity damage.`,
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
      name: "Greater Shocking Grasp",

      attack: {
        hit: `
          The subject takes 2d8 + \\glossterm{power} electricity damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{briefly} \\dazed.
        `,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      focus: false,
      rank: 3,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Supreme Shocking Grasp",

      functionsLike: {
        name: 'greater shocking grasp',
        exceptThat: 'the damage increases to 4d10 + \\glossterm{power} damage, and the subject is \\stunned instead of dazed.',
      },
      focus: false,
      rank: 7,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Stunning Discharge",

      attack: {
        crit: `The effect becomes a \\glossterm{condition}.`,
        // No relevant glance effect
        hit: `Each subject that has no remaining \\glossterm{damage resistance} is \\glossterm{briefly} \\stunned.`,
        targeting: `
          Make an attack vs. Fortitude against \\glossterm{enemies} in a \\arealarge radius from you.
        `,
      },
      rank: 2,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Greater Stunning Discharge",

      functionsLike: {
        name: 'stunning discharge',
        exceptThat: 'each subject is stunned regardless of whether it has damage resistance remaining.',
      },
      rank: 6,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Lightning Storm",

      attack: {
        hit: `Each subject takes 1d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
        Make an attack vs. Reflex against all \\glossterm{enemies} in a \\areasmall radius from you.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Lightning Storm",

      attack: {
        hit: `Each subject takes 2d8 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Supreme Lightning Storm",

      attack: {
        hit: `Each subject takes 4d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against all \\glossterm{enemies} in a \\gargarea radius from you.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Shock and Awe",

      attack: {
        crit: `The effect becomes a \\glossterm{condition} on each subject.`,
        hit: `Each subject is \\glossterm{briefly} \\confused.`,
        targeting: `
          Make an attack vs. Fortitude against all creatures with no remaining \\glossterm{damage resistance} in a \\smallarea radius within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Electromagnetic Bolt",

      attack: {
        hit: `Each subject takes 2d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 10 ft. wide line from you.
          You gain a +2 accuracy bonus against each subject that is wearing metal armor or otherwise carrying or composed of a significant amount of metal.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Magnetic Blade",

      castingTime: "minor action",
      effect: `
        Metal weapons you wield gain a +1 bonus to \\glossterm{accuracy} against targets wearing metal armor or otherwise carrying or composed of a significant amount of metal.
      `,
      rank: 3,
      scaling: {
        5: `The accuracy bonus increases to +2.`,
        7: `The bonus applies against targets with any metal on them, even as little as a single ring.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Chain Lightning",

      attack: {
        hit: `
          The primary subject takes 4d6 + \\glossterm{power} electricity damage.
          Each secondary subject takes 2d10 + half \\glossterm{power} electricity damage.
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
      type: "Instant",
    },

    {
      name: "Electric Jolt",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Electric Jolt",

      attack: {
        hit: `The subject takes 4d6 + \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\longrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Supreme Electric Jolt",

      attack: {
        hit: `The subject takes 6d10 + \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\distrange.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Electroshock",

      attack: {
        hit: `The subject takes 1d6 electricity damage.
        If it loses \\glossterm{hit points} from this damage, it is \\stunned as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Greater Electroshock",

      attack: {
        hit: `The subject takes 2d8 electricity damage.
        If it loses \\glossterm{hit points} from this damage, it is \\confused as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Call Lightning",

      attack: {
        // +1d from normal AOE due to weird area that probably just hits one person
        hit: `Each subject takes 2d8 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarealong, 5 ft. wide vertical line within \\longrange.
          If you are outdoors in cloudy or stormy weather, you gain a +2 bonus to \\glossterm{accuracy} with the attack.
          If this spell has its area increased, only the length of the line increases.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Call Lightning",

      attack: {
        // crit: '',
        // +1d from normal AOE due to weird area that probably just hits one person
        hit: `
          Each subject takes 4d10 + half \\glossterm{power} electricity damage.
        `,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft.\\ wide vertical line within \\distrange.
          If you are outdoors in cloudy or stormy weather, you gain a +2 bonus to \\glossterm{accuracy} with the attack.
          If this spell has its area increased, only the length of the line increases.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      // The flavor here is a bit of a stretch, so it doesn't provide a Reflex bonus like Haste and
      // there is no Mass Energize.
      name: "Energize",

      castingTime: "minor action",
      effect: `
        You gain a +5 foot \\glossterm{magic bonus} to speed with all of your \\glossterm{movement modes}.
      `,
      rank: 1,
      scaling: {
        3: `The speed bonus increases to +10 feet.`,
        5: `The speed bonus increases to +15 feet.`,
        7: `The speed bonus increases to +20 feet.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Lightning Breath",

      castingTime: "minor action",
      attack: {
        // +1d for attune + every other round
        hit: `Each subject takes 2d8 + half \\glossterm{power} electricity damage.`,
        targeting: `
          For the duration of this spell, you can breathe electricity like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Greater Lightning Breath",

      castingTime: "minor action",
      functionsLike: {
        name: 'lightning breath',
        exceptThat: `
          the damage increases to 5d10 + half \\glossterm{power}.
          In addition, the area increases to a \\hugearea cone.
        `,
      },
      rank: 7,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Ball Lightning",

      attack: {
        hit: `Each subject takes 2d10 electricity damage.`,
        targeting: `
          You create a Medium size ball of lightning in one space within \\longrange.
          The ball of lightning does not occupy space or block movement, and can move through creatures (but not solid objects) freely.
          Whenever you sustain this effect, you can move the ball up to 30 feet in any direction, even vertically.
          At the end of each round, if the ball is more than 120 feet from you, it disappears and this effect ends.
          Otherwise, make an attack vs. Reflex with a -2 accuracy penalty against everything in its space.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Sustain (minor)",
    },

    {
      name: "Personal Conduction",

      castingTime: "minor action",
      attack: {
        // AOE dice, but no power
        hit: `Each subject takes 2d6 electricity damage.`,
        targeting: `
          At the end of each phase, make an attack vs. Fortitude against each creature that attacked you using a free hand or a metal melee weapon during that phase.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Electrocute",

      attack: {
        // +2d from level, add trivial extra benefit for fun
        hit: `
          The subject takes 4d10 + \\glossterm{power} electricity damage.
          In addition, if the subject is unconscious from vital wounds at the end of the current \\glossterm{phase}, it dies.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },

      rank: 5,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Lightning Rod",

      attack: {
        crit: `Each bolt deals double damage.`,
        hit: `As a \\glossterm{condition}, the subject attracts lightning.
          As a \\glossterm{minor action}, you can call a bolt of lightning to strike the subject.
          When you do, the subject takes 2d8 electricity damage.
        `,
        targeting: `
          Make an attack vs. Reflex against anything within \\longrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Thunderdash",

      attack: {
        hit: `Each subject takes 2d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          Both your departure and arrival with this spell sound like a clap of thunder.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Thunderdash",

      attack: {
        hit: `Each subject takes 4d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
        You teleport into an unoccupied destination on a stable surface within \\distrange.
        Both your departure and arrival with this spell sound like a clap of thunder.
        In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },

      rank: 6,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Cleansing Shock",

      effect: `
        You or one \\glossterm{ally} within \\medrange can remove a \\glossterm{brief} effect or \\glossterm{condition}.
        This cannot remove an effect applied during the current round.
        For each effect removed this way, you deal the subject 4 electricity damage.
      `,
      rank: 4,
      scaling: {
        6: `The subject can remove two effects.`,
      },
      type: "Instant",
    },

    {
      name: "Dazing Shock",
      attack: {
        hit: `
          The subject takes 2d6 + \\glossterm{power} electricity damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{briefly} \\dazed.
        `,
        targeting: `
          Make a melee attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Stunning Shock",
      attack: {
        hit: `
          The subject takes 4d8 + \\glossterm{power} electricity damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{briefly} \\stunned.
        `,
        targeting: `
          Make a melee attack vs. Fortitude against anything within \\shortrange.
        `,
      },
      rank: 6,
      scaling: "damage",
      type: "Duration",
    },
  ],
  rituals: [],
};
