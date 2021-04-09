import { MysticSphere } from ".";

export const umbramancy: MysticSphere = {
  name: "Umbramancy",
  shortDescription: "Manipulate shadows and darkness to conceal allies and inhibit foes.",
  sources: ["arcane", "pact"],

  cantrips: [
    {
      name: "Shadowcloak",

      effect: `
        This spell has no \\glossterm{verbal components}.

        You gain a +2 bonus to the Stealth skill until the end of the next round.
      `,
      focus: false,
      scaling: {
        2: `The bonus increases to +4.`,
        4: `The bonus increases to +6.`,
        6: `The bonus increases to +8.`,
      },
      type: "Duration",
    },

    {
      name: "Suppress Light",

      effect: `
        This spell has no \\glossterm{verbal components}.

        Light within or passing through the one \\glossterm{zone} within \\medrange is dimmed to be no brighter than \\glossterm{shadowy illumination}.
        You can choose this spell's radius, up to a maximum of a \\smallarea radius.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      focus: false,
      scaling: {
        2: `The maximum area increases to a \\medarea radius.`,
        4: `The range increases to \\longrange.`,
        6: `The maximum area increases to a \\largearea radius.`,
      },
      type: "Sustain (minor)",
    },
  ],
  spells: [
    {
      name: "Banish Light",

      effect: `
        All light within one \\glossterm{zone} within \\medrange is suppressed.
        You can choose this spell's radius, up to a maximum of a \\medarea radius.
        Light within or passing through the area is snuffed out.
        Any object or effect which blocks light also blocks this spell's effect.
        Darkvision and similar abilities which do not require light still function within the area.
      `,
      rank: 3,
      scaling: {
        5: `The maximum area increases to a \\largearea radius.`,
        7: `The maximum area increases to a \\hugearea radius.`,
      },
      tags: ["Sensation"],
      type: "Sustain (minor)",
    },

    {
      name: "Darklantern",

      effect: `
        Choose one Medium or smaller \\glossterm{unattended} object within \\shortrange.
        Light within or passing through an \\glossterm{emanation} from that object is dimmed to be no brighter than \\glossterm{shadowy illumination}.
        You can choose the spell's radius, up to a maximum of a \\smallarea radius.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      rank: 1,
      scaling: {
        3: `The maximum area increases to a \\medarea radius \\glossterm{emanation}.`,
        5: `The maximum area increases to a \\largearea radius \\glossterm{emanation}.`,
        7: `The maximum area increases to a \\hugearea radius \\glossterm{emanation}.`,
      },
      tags: ["Sensation"],
      type: "Attune (self)",
    },

    {
      name: "Darkvision",

      effect: `
        You gain \\glossterm{darkvision} with a 60 foot radius.
      `,
      rank: 2,
      scaling: {
        4: `The radius increases to 120 feet.`,
        6: `The radius increases to 240 feet.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Darkvision",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Darkvision",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: `The radius increases to 120 feet.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Dark Miasma",

      attack: {
        hit: `Each subject takes 1d6 + half \\glossterm{power} cold damage.`,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\smallarea radius from you.
          You gain a +2 bonus to \\glossterm{accuracy} with the attack against each creature that is not in \\glossterm{bright illumination}.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Dark Miasma",

      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d6 + half \\glossterm{power} cold damage.`,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{enemies} in a \\largearea radius from you.
          You gain a +2 bonus to \\glossterm{accuracy} with the attack against each creature that is not in \\glossterm{bright illumination}.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Dark Grasp",

      attack: {
        // -1d to compensate for +2a
        hit: `The subject takes 1d8 + \\glossterm{power} cold damage.`,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
          You gain a +2 bonus to \\glossterm{accuracy} with the attack if the target is not in \\glossterm{bright illumination}.
        `,
      },
      focus: false,
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Chill of Darkness",

      attack: {
        // -1d to compensate for +2a
        hit: `The subject takes 1d8 + \\glossterm{power} cold damage.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\longrange.
          You gain a +2 bonus to \\glossterm{accuracy} with the attack if the subject is not in \\glossterm{bright illumination}.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Shadow Mantle",

      effect: `
        Your physical form becomes blurred and shifts in and out of existence.
        This is not a mere trick of the light, but an alteration of reality to make your existence more ambiguous.
        You gain a +1 \\glossterm{magic bonus} to Armor defense and the Stealth skill.
      `,
      rank: 1,
      scaling: {
        3: `The bonuses increase to +2.`,
        5: `The bonuses increase to +3.`,
        7: `The bonuses increase to +4.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Shadow Mantle",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Shadow Mantle",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonuses increase to +2.`,
        7: `The bonuses increase to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Fade Into Darkness",

      effect: `
        At the end of each round, if you took no actions that round and are not in \\glossterm{bright illumination}, you become \\glossterm{invisible}.
        This invisibility ends after you take any action.
      `,
      rank: 2,
      scaling: {
        4: `Moving during a round does not prevent you from becoming invisible at the end of the round.`,
        6: `Taking \\glossterm{minor actions} does not prevent you from becoming invisible at the end of the round.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Shrouded Vision",

      attack: {
        crit: `The subject is \\blinded instead.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `As a \\glossterm{condition}, the subject takes a -4 penalty to \\glossterm{accuracy} and visual Awareness checks.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
          You gain a +2 bonus to \\glossterm{accuracy} with the attack if the subject is not in \\glossterm{bright illumination}.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Sensation", "Visual"],
      type: "Duration",
    },

    {
      name: "Dark Shroud",

      attack: {
        crit: "The effect becomes a \\glossterm{condition} on each subject.",
        glance: "The effect lasts until the end of the next round.",
        hit: `Each subject takes a -2 penalty to \\glossterm{accuracy} and visual Awareness checks until the end of the next round.`,
        targeting: `
        Make an attack vs. Mental against all creatures in a \\smallarea radius within \\longrange.
        You gain a +2 bonus to \\glossterm{accuracy} with the attack against each creature that is not in \\glossterm{bright illumination}.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Hidden Blade",

      effect: `
        Your weapons become become shrouded in darkness, making them virtually impossible to see.
        Your melee \\glossterm{strikes} are treated as if they came from an invisible creature.

        Most creatures are at least \\partiallyunaware of attacks from invisible creatures, even if they are already actively engaged in combat, causing them to suffer a -2 penalty to Armor and Reflex defenses against the attack.
        This effect provides no offensive benefit against creatures immune to \\abilitytag{Visual} abilities.
      `,
      rank: 6,
      tags: ["Sensation", "Visual"],
      type: "Attune (self)",
    },

    {
      name: "Conceal",

      effect: `
        You gain a +3 \\glossterm{magic bonus} to the Stealth skill.
        In addition, you are treated as being \\glossterm{trained} in that skill if you would otherwise be untrained.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      tags: ["Sensation"],
      type: "Attune (self)",
    },

    {
      name: "Shadowstep",

      effect: `
        This spell has no \\glossterm{verbal components}.

        You teleport into an unoccupied location within \\shortrange on a stable surface that can support your weight.
        Unlike most teleportation effects, both your departure and arrival with this spell are silent.
        If you are in \\glossterm{bright illumination} and are not touching your shadow, this spell fails without effect.
      `,
      rank: 1,
      scaling: {
        3: `The teleportation range increases to \\medrange.`,
        5: `The teleportation range increases to \\longrange.`,
        7: `The teleportation range increases to \\distrange.`,
      },
      type: "Instant",
    },

    {
      name: "Shadowstrike",

      functionsLike: {
        exceptThat: `
          you can also make a \\glossterm{strike} at your destination.
          You take a -2 penalty to \\glossterm{accuracy} with the strike due to its rushed nature.
        `,
        name: "shadowstep",
      },
      rank: 4,
      scaling: { 6: `The teleportation range increases to \\medrange.` },
      type: "Instant",
    },

    {
      name: "Walk the Shadow Roads",

      effect: `
        Whenever you would use your land speed to move, you can teleport horizontally between shadows instead.
        Teleporting a given distance costs movement equal that distance.
        Your destination must be on a stable surface that can support your weight.
        If your \\glossterm{line of sight} or \\glossterm{line of effect} to your destination are blocked, or if this teleportation would somehow otherwise place you inside a solid object, your teleportation is cancelled and you remain where you were.
        Areas with \\glossterm{bright illumination} block line of effect for this spell, so you are unable to teleport into or past areas of bright illumination.
      `,
      rank: 4,
      scaling: { 6: `You can teleport in any direction instead of just horizontally.` },
      type: "Attune (self)",
    },

    {
      name: "Bind Shadow",

      attack: {
        hit: `The subject takes 1d8 + half \\glossterm{power} cold damage.
        If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange standing on the ground.
          You attempt to bind the creature's shadow to the ground, slowing its movement.
          If the subject is in \\glossterm{bright illumination} and is not touching its shadow, the attack automatically misses.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Pin Shadow",

      // original targets: One creature within \medrange standing on the ground
      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 2d8 cold damage.
        If it loses \\glossterm{hit points} from this damage, it is \\immobilized as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange standing on the ground.
          You attempt to pin the creature's shadow to the ground, preventing it from moving.
          If the subject is in \\glossterm{bright illumination} and is not touching its shadow, the attack automatically misses.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Dancing Shadow",

      // original targets: One creature within \medrange standing on the ground
      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 4d8 + half \\glossterm{power} cold damage.
        If it loses \\glossterm{hit points} from this damage, it is \\disoriented as a \\glossterm{condition}.
        In addition, it must move a distance equal to its maximum movement speed in a straight line during each \\glossterm{movement phase}.
        It must use its movement mode with the highest speed to move this way.
        It is not required to use the \\textit{sprint} ability, or use any other special movement ability, though it may choose to do so.
        If it is unable to move its full speed without making a skill check or encountering a solid obstacle, it may choose to stop its movement after moving the maximum possible distance without doing so.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange standing on the grond.
          You compel the subject's shadow to dance, controlling its movement.
          If the subject is in \\glossterm{bright illumination} and is not touching its shadow, this attack automatically misses.
        `,
      },
      rank: 7,
      type: "Duration",
    },

    {
      name: "Shadowform",

      effect: `
        You collapse to the ground, taking the appearance and shape of a shadow.
        This has a number of effects, as described below.
        \\begin{itemize}
          \\item You are nearly flat, allowing you to pass under doors and through other narrow passages.
          Your horizontal dimensions are unchanged, and you cannot enter spaces that are more narrow than you can normally fit through.
          \\item You can freely move through space occupied by other creatures, and other creatures can freely move through your space.
          \\item You gain a \\glossterm{climb speed} equal to your \\glossterm{base speed}, and you can climb without using any hands.
          \\item You are always treated as being \\prone.
          \\item You gain a +4 \\glossterm{magic bonus} to the Stealth skill.
        \\end{itemize}

        While you are in \\glossterm{bright illumination}, this effect is \\glossterm{suppressed}, and you return to your normal size and shape.
        If doing so is impossible, such as if you are in a space too small to contain your body, you gain a \\glossterm{vital wound} and this effect persists for the rest of the round.
        This form offers you no special immunity to damage, as creatures can simply attack the shadow.
      `,
      rank: 4,
      scaling: {
        6: `You can maintain the form in bright illumination for a full round before it is suppressed.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Wall of Darkness",

      effect: `
        You create a wall of darkness in a 15 ft.\\ high, \\medarealong line within \\medrange.
        If you create the wall within a space too small to hold it, it fills as much of the space as possible, starting from the middle of the chosen space.
        This can allow you to completely block off small tunnels.
        The wall is visible as a solid block of darkness that blocks sight.
        Creatures with the \\glossterm{darkvision} ability can see through the wall normally.
        It does not inhibit the passage of objects or creatures.
      `,
      rank: 1,
      scaling: {
        3: `The area increases to a \\largearealong line.`,
        5: `The area increases to a 30 ft.\\ high \\hugearealong line.`,
        7: `The area increases to a 60 ft.\\ high, \\gargarealong line.`,
      },
      tags: ["Sensation"],
      type: "Sustain (minor)",
    },
  ],
  rituals: [
    {
      name: "Sunlight Ward",

      castingTime: "one hour",
      effect: `
        One ritual participant is never considered to be in natural sunlight.
        This does not impair its vision, but protects it if it would otherwise suffer negative consequences for being in natural sunlight.
      `,
      rank: 3,
      type: "Attune (target)",
    },

    {
      name: "Conceal Trail",

      castingTime: "one minute",
      effect: `
        Choose up to five creatures within \\medrange from among you and your \\glossterm{allies}.
        At the end of each round, the footprints, scent, and other tracks left by each subject during that round are magically concealed.
        This increases the \\glossterm{difficulty rating} to follow the trail by 10, but does not prevent creatures from seeing or smelling each subject normally in combat.
        At the end of each round, if any target is outside of \\longrange from you, the effect is broken for that target and its trail is revealed.
      `,
      rank: 2,
      type: "Attune (ritual)",
    },

    {
      name: "Greater Conceal Trail",

      castingTime: "one minute",
      functionsLike: {
        exceptThat: `
          the difficulty rating increase changes to 20.
        `,
        name: "conceal trail",
      },
      rank: 4,
      type: "Attune (ritual)",
    },

    {
      name: "Supreme Conceal Trail",

      castingTime: "one minute",
      functionsLike: {
        exceptThat: `
          the difficulty rating increase changes to 30.
        `,
        name: "conceal trail",
      },
      rank: 6,
      type: "Attune (ritual)",
    },
  ],
};
