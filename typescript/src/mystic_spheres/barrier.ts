import { MysticSphere } from ".";

export const barrier: MysticSphere = {
  name: "Barrier",
  shortDescription: "Construct barriers to shield allies and areas from hostile forces.",
  sources: ["arcane", "divine", "nature"],

  cantrips: [
    {
      name: "Burst Ward",

      effect: `
        You take half damage from \\glossterm{energy damage} this round.
        This halving is applied before \\glossterm{resistances} and similar abilities.
        Because this is a \\glossterm{Swift} ability, it affects damage you take during the current phase.
      `,
      // narrative: '',
      scaling: {
        2: "The halving applies to all damage, not just energy damage.",
        4: "You also gain a +1 bonus to all defenses.",
        6: "The defense bonus increases to +2.",
      },
      tags: ["Swift"],
      type: "Duration",
    },
    {
      functionsLike: {
        exceptThat: `
          its \\glossterm{range} is \\shortrange and the maximum dimensions of the barrier are a 5 ft.\\ by 5 ft.\\ square.
        `,
        spell: "mystic barrier",
      },
      name: "Minor Barrier",
      scaling: {
        2: "The range increases to \\medrange.",
        4: "The maximum dimensions of the wall increase to a 5 ft.\\ by 10 ft.\\ rectangle, and the hit points of each square increase to 8.",
        6: "The maximum dimensions of the wall increase to a 10 ft.\\ by 10 ft.\\ square, and the hit points of each square increase to 16.",
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },
  ],
  spells: [
    {
      name: "Mirror Barrier",

      functionsLike: {
        exceptThat: `
          it reflects \\glossterm{mundane} attacks against it.
            The barrier's defenses become equal to 5 \\add your level.
            Whenever a creature misses the barrier with a \\glossterm{mundane} attack, it makes the same attack against itself, rolling a new attack roll against its own defenses.
            In addition, the \\glossterm{hit points} of each 5-ft.\\ square increase to 8.
        `,
        spell: "mystic barrier",
      },
      rank: 4,
      scaling: {
        6: `The maximum area increases to a \\medarea long line, and the hit points of each square increase to 16.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Visual Barrier",

      functionsLike: {
        exceptThat: `
          you can choose the visibility of the barrier.
            There are three possibilities: fully invisible, barely visible like a normal \\spell{mystic barrier}, and visible as a deep black that completely blocks sight.
            You can change the opacity of the barrier as part of the action you use to sustain this spell, or as a \\glossterm{minor action} if you attune to this spell.
        `,
        spell: "mystic barrier",
      },
      rank: 2,
      scaling: {
        4: `The maximum area increases to a \\medarea long line, and the hit points of each square increase to 8.`,
        6: `The maximum area increases to a \\largearea long line, and the hit points of each square increase to 16.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Audible Barrier",

      functionsLike: {
        exceptThat: `
          you can choose how much the barrier blocks sound.
            There are three possibilities: fully sound-permeable, fully sound-blocking like a normal \\spell{mystic barrier}, and sound-dampening.
            You can change how much the barrier blocks sound as part of the action you use to sustain this spell, or as a \\glossterm{minor action} if you attune to this spell.

            A sound-dampening barrier increases the \\glossterm{difficulty rating} of sound-based Awareness checks by 20.
            Sound-permeable and sound-dampening barriers do not block \\glossterm{line of effect} for effects that deal \\glossterm{sonic damage}, but a sound-dampening barrier makes everything \\glossterm{impervious} to \\glossterm{sonic damage} that originates from the other side of the barrier.
        `,
        spell: "mystic barrier",
      },
      rank: 2,
      scaling: {
        4: `The maximum area increases to a \\medarea long line, and the hit points of each square increase to 8.`,
        6: `The maximum area increases to a \\largearea long line, and the hit points of each square increase to 16.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Forceful Barrier",

      functionsLike: {
        exceptThat: `
          it breaks objects in its area that obstruct its path.
            Each object in the path of the wall takes energy damage equal to 2d6 plus your \\glossterm{power}.
            Any object destroyed in this way does not block the barrier's area of effect.
            This does no damage to creatures, who block the path of the barrier like normal.
            In addition, the \\glossterm{hit points} of each 5-ft.\\ square increase to 8.
        `,
        spell: "mystic barrier",
      },
      rank: 3,
      scaling: {
        5: `The maximum area increases to a \\medarea long line, and the hit points of each square increase to 16.
            In addition, the damage increases to 2d8 plus your \\glossterm{power}.`,
        7: `The maximum area increases to a \\largearea long line, and the hit points of each square increase to 32.
            In addition, the damage increases to 2d10 plus your \\glossterm{power}.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Mystic Barrier",

      effect: `
        You create a wall of magical energy within \\medrange.
        You can choose the dimensions of the wall, up to a maximum of a 15 ft.\\ high, \\smallarea length line.
        If you create the wall within a space too small to hold it, it fills as much of the space as possible, starting from the middle of the chosen space.
        This can allow you to completely block off small tunnels.
        The wall is visible as a shimmering magical membrane that does not block sight.
        Nothing can pass through the wall until it is destroyed.
        Each 5-ft.\\ square of wall has 4 \\glossterm{hit points}, and all of its defenses are 0.

        When you cast this spell, you can \\glossterm{attune} to it.
        If you do, it gains the \\glossterm{Attune} (self) tag and loses the \\glossterm{Sustain} (minor) tag.
      `,
      rank: 1,
      scaling: {
        3: `The maximum area increases to a \\medarea long line, and the hit points of each square increase to 8.`,
        5: `The maximum area increases to a \\largearea long line, and the hit points of each square increase to 16.`,
        7: `The maximum area increases to a \\hugearea long line, and the hit points of each square increase to 32.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Mystic Bridge",

      functionsLike: {
        exceptThat: `
          the wall is aligned horizontally instead of vertically.
        `,
        spell: "mystic barrier",
      },
      rank: 2,
      scaling: {
        4: `The maximum area increases to a \\medarea long line, and the hit points of each square increase to 8.`,
        6: `The maximum area increases to a \\largearea long line, and the hit points of each square increase to 16.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Protective Sphere",

      effect: `
        Choose yourself or one Large or smaller \\glossterm{ally} within \\medrange.
        You create a sphere of magical energy around the subject in its space.
        The sphere is visible as a shimmering magical membrane that does not block sight.
        Nothing can pass through the field until it is destroyed.
        This prevents the subject from having \\glossterm{line of effect} to anything outside of the area.
        Each 5-ft.\\ square of the field has \\glossterm{hit points} equal to twice your \\glossterm{power}.

        If another creature is in the subject's space when this spell is cast, this spell fails without effect.
        `,
      rank: 1,
      scaling: {
        3: `The \\glossterm{hit points} of each 5-ft.\\ square increase to be equal to three times your \\glossterm{power}.`,
        5: `The maximum size of the subject increases to Huge.`,
        7: `The \\glossterm{hit points} of each 5-ft.\\ square increase to be equal to four times your \\glossterm{power}.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Quickseal",

      effect: `
        Choose one \\glossterm{unattended} openable object within \\medrange.
        You create a curved field of magical energy that blocks access to the subject's opening mechanism.
        The opening mechanism must be Small or smaller in size.
        Nothing can pass through the field until it is destroyed.
        The field has 8 \\glossterm{hit points}.
      `,
      rank: 2,
      scaling: {
        4: `The \\glossterm{hit points} of the field increase to 16.`,
        6: `The \\glossterm{hit points} of the field increase to 32.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Personal Sphere",

      effect: `
        You create a sphere of magical energy around yourself.
        The sphere is visible as a shimmering magical membrane that does not block sight.
        Nothing can pass through the field until it is destroyed.
        This prevents you from having \\glossterm{line of effect} to anything outside of the area.
        When you move, the sphere moves with you, though you cannot force it against another creature or object.
        Each 5-ft.\\ square of the field has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        `,
      rank: 5,
      scaling: {
        7: `The \\glossterm{hit points} of each 5-ft.\\ square increase to be equal to four times your \\glossterm{power}.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Entrapping Sphere",

      attack: {
        crit: "The sphere's \\glossterm{hit points} increase to 32.",
        glance: "The effect lasts until the end of the next round.",
        hit: `
          A sphere of magical energy appears around the subject in its space.
          The sphere is visible as a shimmering magical membrane that does not block sight.
          Nothing can pass through the sphere until it is destroyed.
          This prevents the subject from having \\glossterm{line of effect} to anything outside of the area.
          Each 5-ft.\\ square of the field has \\glossterm{hit points} equal to twice your \\glossterm{power}.

          If another creature is in the subject's space when this spell is cast, this spell fails without effect.
        `,
        targeting: `
          Make an attack vs. Reflex against anything Large or smaller within \\medrange.
        `,
      },
      rank: 6,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Sustain (standard)",
    },

    {
      name: "Invulnerable Barrier",

      functionsLike: {
        exceptThat: `
          the wall is \\glossterm{impervious} to physical damage.
          In addition, each 5-ft.\\ square of wall has 16 \\glossterm{hit points}.
        `,
        spell: "mystic barrier",
      },
      rank: 5,
      scaling: {
        7: `The maximum area increases to a \\medarea long line, and the hit points of each square increase to 32.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Wall of Energy Impedance",

      effect: `
        You create a wall of magical energy in a 15 ft.\\ high, \\smallarea long line within \\medrange.
        The wall is visible as a shimmering magical membrane that does not block sight.
        It does not impede passage for objects or creatures, but any ability that deals \\glossterm{energy damage} treats the wall as an impassable barrier.
        Each 5-ft.\\ square of wall has \\glossterm{hit points} equal to twice your \\glossterm{power}.
        `,
      rank: 3,
      scaling: {
        5: `The area increases to a \\medarea long line.`,
        7: `The \\glossterm{hit points} of each 5-ft.\\ square increase to be equal to three times your \\glossterm{power}.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Wall of Magic Impedance",

      functionsLike: {
        exceptThat: `
          the wall only blocks \\glossterm{magical} abilities.
            Objects, creatures, and \\glossterm{mundane} abilities can pass through the wall freely, but any \\glossterm{magical} ability treats the wall as an impassable barrier.
            In addition, each 5-ft.\\ square of wall has 8 \\glossterm{hit points}.
        `,
        spell: "mystic barrier",
      },
      rank: 4,
      scaling: {
        6: `The maximum area increases to a \\medarea long line, and the hit points of each square increase to 16.`,
      },
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "One-Way Barrier",

      functionsLike: {
        exceptThat: `
          you choose one side of the barrier when you cast the spell.
            Whenever an object, creature, or ability passes through the barrier from the chosen side, the barrier parts to allow it through.
            If it stops halfway, it can return to its side, but once it passes through fully it treats the barrier as impassable from the other side.
            In addition, each 5-ft.\\ square of wall has 16 \\glossterm{hit points}.
        `,
        spell: "mystic barrier",
      },
      rank: 7,
      tags: ["Manifestation"],
      type: "Sustain (standard)",
    },

    {
      name: "Kinetic Shield",

      castingTime: "minor action",
      effect: `
        You gain a +4 \\glossterm{magic bonus} to your \\glossterm{resistance} against \\glossterm{physical} damage.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Kinetic Shield",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "kinetic shield",
      },
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Retributive Kinetic Shield",

      effect: `
        You can cast this spell as a \\glossterm{minor action}.

        You gain a +16 \\glossterm{magic bonus} to \\glossterm{resistance} against \\glossterm{physical damage}.
        In addition, whenever you resist physical damage, the attacker takes energy damage equal to half the damage resisted this way.
        If the attacker is beyond \\shortrange of you, this reflection fails.
        Any effect which increases this spell's range increases the range of this effect by the same amount.
      `,
      rank: 5,
      scaling: { 7: `The bonus increases to +32.` },
      type: "Attune (self)",
    },

    {
      name: "Resist Energy",

      castingTime: "minor action",
      effect: `
        You gain a +4 \\glossterm{magic bonus} to your \\glossterm{resistance} against \\glossterm{energy} damage.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Resist Energy",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "resist energy",
      },
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Universal Shield",

      effect: `
        You gain a +6 \\glossterm{magic bonus} to your \\glossterm{resistances} against both \\glossterm{physical damage} and \\glossterm{energy damage}.
      `,
      rank: 3,
      scaling: {
        5: `The bonus increases to +12.`,
        7: `The bonus increases to +24.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Universal Shield",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "universal shield",
      },
      rank: 5,
      scaling: {
        7: `The bonus increases to +12.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Repulsion Field",

      attack: {
        crit:
          "You also \\glossterm{knockback} each subject 20 feet in the direction that it tried to enter the area from.",
        glance:
          "The effect lasts until the end of the next round, allowing the creature to freely enter the zone after that time.",
        hit: `
          Each subject is unable to enter the spell's area with any part of its body for the duration of the spell.
          The rest of its movement in the current phase is cancelled.
        `,
        targeting: `
          When you cast this spell, you create a repulsive field in a \\smallarea radius \\glossterm{zone} from your location.
          Whenever an enemy makes physical contact with the spell's area, you make an attack vs. Mental against it.
          Creatures in the area at the time that the spell is cast are unaffected by the spell.
        `,
      },
      rank: 4,
      scaling: "accuracy",
      type: "Sustain (minor)",
    },

    {
      name: "Energy Immunity",

      effect: `
        Choose a subtype of \\glossterm{energy damage}: acid, cold, electricity, fire, or sonic.
        You become immune to damage of the chosen type.
        Attacks that deal damage of multiple types still inflict damage normally unless you are immune to all types of damage dealt.
      `,
      rank: 5,
      scaling: {
        7: `
          You may attune to this spell any number of times, choosing a different subtype of energy damage each time.
          If you are immune to all subtypes of energy damage, you also become immune to energy damage without a subtype.
        `,
      },
      type: "Attune (self)",
    },

    {
      name: "Deflective Shield",

      castingTime: "minor action",
      effect: `
        You gain a +1 \\glossterm{magic bonus} to Armor defense and Reflex defense.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +2.`,
        5: `The bonus increases to +3.`,
        7: `The bonus increases to +4.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Deflective Shield",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "deflective shield",
      },
      rank: 3,
      scaling: {
        5: `The bonus increases to +2.`,
        7: `The bonus increases to +3.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Antilife Shell",

      functionsLike: {
        exceptThat: "you gain a +10 bonus to \\glossterm{accuracy} against living creatures.",
        spell: "repulsion field",
      },
      rank: 6,
      scaling: "accuracy",
      type: "Sustain (minor)",
    },
  ],
  rituals: [
    {
      name: "Endure Elements",

      castingTime: "one minute",
      effect: `
        Choose either yourself or an \\glossterm{ally} or unattended object within \\medrange.
        The subject suffers no harm from being in a hot or cold environment.
        It can exist comfortably in conditions between \\minus50 and 140 degrees Fahrenheit.
        Its equipment, if any, is also protected.
        This does not protect the subject from fire or cold damage.
      `,
      rank: 1,
      type: "Attune (ritual)",
    },

    {
      name: "Mystic Lock",

      castingTime: "one minute",
      effect: `
        Choose one Large or smaller closable, nonmagical object within \\shortrange, such as a door or box.
        The subject becomes magically locked.
        It can be unlocked with a Devices check against a \\glossterm{difficulty rating} equal to 20 \\add your \\glossterm{power}.
        The \\glossterm{difficulty rating} to break it open forcibly increases by 10.
        You can freely open an object sealed by this effect as if it were not locked.
      `,
      rank: 2,
      type: "Attune (ritual)",
    },

    {
      name: "Greater Mystic Lock",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
          the \\glossterm{difficulty rating} to unlock the object with a Devices check is instead equal to 30 + your \\glossterm{power}.
            In addition, the \\glossterm{difficulty rating} to break it open increases by 20 instead of by 10.
        `,
        spell: "mystic lock",
      },
      rank: 4,
      type: "Attune (ritual)",
    },

    {
      name: "Explosive Runes",

      castingTime: "one hour",
      effect: `
        % TODO: clarify how to identify that this is Explosive Runes instead of bad handwriting
        Choose one Small or smaller \\glossterm{unattended} object with writing on it within \\shortrange.
        The writing on the object is altered by the runes in subtle ways, making it more difficult to read.
        It becomes a \\glossterm{trap}.
        To read the writing, a creature must concentrate on reading it, which requires a standard action.
        If a creature reads the object, the object explodes.
        You make an attack vs. Reflex against everything within a \\smallarea radius from the object.
        Each struck subject takes 2d8 + half \\glossterm{power} energy damage.

        After the object explodes in this way, the ritual is \\glossterm{dismissed}.
        If the object is destroyed or rendered illegible, the ritual is dismissed without exploding.
        `,
      rank: 4,
      type: "Attune (ritual)",
    },

    {
      name: "Scryward",

      castingTime: "24 hours",
      effect: `
        This ritual creates a ward against scrying in a \\medarea radius \\glossterm{zone} centered on your location.
        All \\glossterm{Scrying} effects fail to function in the area.
        This effect is permanent.
        `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Private Sanctum",

      castingTime: "24 hours",
      effect: `
        This ritual creates a ward against any external perception in a \\medarea radius \\glossterm{zone} centered on your location.
        This effect is permanent.
        Everything in the area is completely imperceptible from outside the area.
        Anyone observing the area from outside sees only a dark, silent void, regardless of darkvision and similar abilities.
        In addition, all \\glossterm{Scrying} effects fail to function in the area.
        Creatures inside the area can see within the area and outside of it without any difficulty.
        `,
      rank: 5,
      type: "Instant",
    },
  ],
};
