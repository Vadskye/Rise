import { MysticSphere } from ".";

export const astromancy: MysticSphere = {
  name: "Astromancy",
  shortDescription: "Transport creatures and objects instantly through space.",

  cantrips: [
    {
      name: "Dimension Hop",

      effect: `
        You teleport into an unoccupied destination within 5 foot \\glossterm{range}.
        If the destination is invalid, this spell fails with no effect.
      `,
      // narrative: '',
      scaling: {
        2: "The range increases to 15 feet.",
        4: "The range increases to \\rngshort.",
        6: "The range increases to \\rngmed.",
      },
      type: "Instant",
    },
    {
      name: "Translocate Object",

      effect: `
        Choose one Tiny or smaller \\glossterm{unattended} object within \\shortrange.
        It teleports into your hand or into an unccupied location within \\shortrange.
        If the destination is invalid, this spell fails with no effect.
      `,
      // narrative: '',
      scaling: {
        2: "The range increases to \\rngmed.",
        4: "The maximum size increases to Small.",
        6: "The range increases to \\rnglong.",
      },
      type: "Instant",
    },
  ],
  spells: [
    {
      name: "Dimensional Grasp",

      rank: 1,
      attack: {
        // crit: '',
        // glance: '',
        hit: `
          The subject takes 1d10 + \\glossterm{power} energy damage.
        `,
        targeting: `
          This spell does not have the \\glossterm{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      scaling: "damage",
      focus: false,
      type: "Instant",
    },
    {
      name: "Banishing Grasp",

      attack: {
        crit: `
          Double damage.
          In addition, if the subject is a \\glossterm{planeforged} not on its home plane, it is teleported to a random location on its home plane.
          If it is a creature created by a \\glossterm{Manifestation} ability, it immediately disappears.
        `,
        glance: "Half damage.",
        hit: `
          The subject takes 2d10 + \\glossterm{power} energy damage.
        `,
        targeting: `
          This spell does not have the \\glossterm{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      rank: 4,
      scaling: "damage",
      focus: false,
      type: "Instant",
    },
    {
      name: "Banishment",

      attack: {
        crit: `
          Double damage.
          In addition, if the subject is a \\glossterm{planeforged} not on its home plane, it is teleported to a random location on its home plane.
          If it is a creature created by a \\glossterm{Manifestation} ability, it immediately disappears.
        `,
        glance: "Half damage.",
        hit: `
          The subject takes 2d6 + half \\glossterm{power} energy damage.
        `,
        // +2 accuracy in exchange for +1 level and -half power
        targeting: `
          Make a melee attack vs. Mental with a +2 \\glossterm{accuracy} bonus against anything within \\medrange.
        `,
      },
      rank: 3,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Jittering Curse",

      attack: {
        crit: "The effect lasts until the curse is removed.",
        glance: "The effect lasts until the end of the next round.",
        hit: `
          At the end of each \\glossterm{movement phase}, the subject teleports 10 feet in a random direction.
          This effect lasts until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 6,
      tags: ["Curse"],
      type: "Duration",
    },
    // treat this as r2; it's similar to immobilized, but harder to cheese
    {
      name: "Curse of Stagnancy",

      attack: {
        crit: "The effect lasts until the curse is removed.",
        glance: "The effect lasts until the end of the next round.",
        hit: `
          At the end of each round, the subject teleports back to the location it was in
          when this spell was cast.
          This effect lasts until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 7,
      tags: ["Curse"],
      type: "Duration",
    },
    {
      name: "Dimensional Jaunt",

      attack: {
        hit: `
          The subject takes 1d10 + \\glossterm{power} energy damage.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },
    // TODO: target wording is awkward
    {
      name: "Translocation",

      effect: `
        Choose either yourself or one unattended object or \\glossterm{ally} within \\shortrange.
        If you choose something other than yourself, it must be Medium size or smaller.
        The subject \\glossterm{teleports} into an unoccupied location within range on a stable surface that can support its weight.
        If the destination is invalid, this spell fails with no effect.
      `,
      rank: 1,
      scaling: {
        3: "The range increases to \\rngmed.",
        5: "The range increases to \\rnglong.",
        7: "The range increases to \\rngdist.",
      },
      type: "Instant",
    },
    {
      name: "Silent Translocation",

      functionsLike: {
        exceptThat: "the subject's departure and arrival with this spell are silent.",
        spell: "translocation",
      },
      rank: 3,
      scaling: {
        5: "The range increases to \\rngmed.",
        7: "The range increases to \\rnglong.",
      },
      type: "Instant",
    },
    {
      name: "Dimension Door",

      effect: `
        You teleport to an unoccupied destination on a stable surfce within \\rngdist range of you.
        You must clearly visualize the destination's appearance and have an approximate knowledge of its direction and distance from you.
        However, you do not need \\glossterm{line of sight} or \\glossterm{line of effect} to your destination.
      `,
      rank: 4,
      scaling: {
        6: "The range increases to \\extrange.",
      },
      type: "Instant",
    },
    {
      name: "Dimensional Jaunt -- Plane of Earth",

      attack: {
        glance: "Half damage.",
        hit: `
          The subject takes 2d6 + \\glossterm{power} bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{immobilized} as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Earth, where it is crushed by the weight of stone.
      `,
      rank: 4,
      scaling: "damage",
      type: "Duration",
    },
    {
      name: "Dimensional Jaunt -- Plane of Air",

      // targeting: "One creature or object within \\rngmed range",
      attack: {
        hit: `
          The subject takes 1d10 bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, you \\glossterm{knockback} it up to 50 feet in any direction (see \\pcref{Knockback Effects}).
          Moving the subject upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Air, where it is knocked flying by powerful winds.
      `,
      rank: 2,
      scaling: "damage",
      type: "Instant",
    },
    // +2 levels for +1d
    {
      name: "Dimensional Jaunt -- Plane of Fire",

      attack: {
        glance: "Half damage.",
        hit: `
          The subject takes 4d8 + half \\glossterm{power} fire damage.
          If it loses \\glossterm{hit points} from this damage, it catches on fire as a \\glossterm{condition}.
          At the end of each subsequent round, it takes 4d6 fire damage.

          If the the subject gains a \\glossterm{vital wound} from this damage, the condition ends.
          This condition can be removed if the subject makes a \\glossterm{difficulty rating} 10 Dexterity check as a \\glossterm{move action} to put out the flames.
          Dropping \\glossterm{prone} as part of this action gives a +5 bonus to this check.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      rank: 6,
      scaling: {
        special: `
          The damage of both the initial hit and the subsequent condition increases by +1d for each rank beyond 6.
        `,
      },
      type: "Duration",
    },
    // +2 levels for mixed damage types, +2 levels for +1d
    {
      name: "Dimensional Jaunt -- Myriad",

      attack: {
        glance: "Half damage.",
        hit: `
          The subject takes 4d8 + \\glossterm{power} damage of all types.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      narrative: `
        Your foe briefly teleports through a number of planes in sequence.
      `,
      rank: 5,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Dimensional Jaunt -- Deep Astral Plane",

      attack: {
        glance: "Half damage.",
        hit: `
          The subject takes 4d6 energy damage.
          In addition, it is \\glossterm{stunned} as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      effect: `
          Make an attack vs. Mental against the subject.
          \\hit The subject takes 4d6 energy damage.
          In addition, it is \\glossterm{stunned} as a \\glossterm{condition}.
          \\glance As above, except that the condition is removed at the end of the next round:
      `,
      narrative: `
        Your foe briefly teleports into the Deep Astral Plane.
        The distance of the journey, combined with the bizarre destination, is deeply unsettling.
      `,
      rank: 7,
      type: "Duration",
    },
    {
      name: "Dimensional Jitter",

      effect: `
        At the end of each \\glossterm{phase}, you may choose to \\glossterm{teleport} 10 feet horizontally in a random direction.
        If your \\glossterm{line of effect} to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are.
      `,
      rank: 5,
      scaling: {
        7: "You can choose the direction of the teleportation.",
      },
      type: "Attune (self)",
    },
    // TODO: target wording
    {
      name: "Dimensional Shuffle",

      effect: `
        Choose up to five creatures from among you and your \\glossterm{allies} within \\longrange.
        Each subject \\glossterm{teleports} into the location of a different subject.
      `,
      rank: 2,
      scaling: {
        4: "The range increases to \\distrange.",
        6: "The range increases to \\extrange.",
      },
      type: "Instant",
    },
    {
      name: "Dimension Walk",

      effect: `
        Once per round, you can teleport horizontally instead of moving normally.
        Teleporting a given distance costs movement equal to that distance.
        If your \\glossterm{line of effect} to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are that phase.
        You must be able to move to teleport in this way, so effects like being \\glossterm{immobilized} prevent this movement.
      `,
      rank: 4,
      scaling: {
        6: "You can teleport in this way any number of times each round, allowing you to break up your teleportation between movements.",
      },
      type: "Attune (self)",
    },
    {
      name: "Flicker",

      effect: `
        You randomly flicker between your current plane and the Astral Plane.
        \\glossterm{Targeted} \\glossterm{strikes} against you have a 20\\% failure chance as you happen to be in the Astral Plane when the attack would hit.
        However, all of your attacks also have the same failure chance.
        This does not affect abilities you use that do not make attacks.
      `,
      rank: 2,
      scaling: {
        4: "The failure chance increases to 30\\%.",
        6: "The failure chance increases to 40\\%.",
      },
      type: "Attune (self)",
    },
    {
      name: "Controlled Flicker",

      functionsLike: {
        exceptThat: `
          you can choose at the start of each round to stop flickering for that round.
          If you do, your attacks do not have a failure chance, and attacks against you also do not have a failure chance.
        `,
        spell: "flicker",
      },
      rank: 4,
      scaling: {
        6: "The failure chance increases to 30\\%.",
      },
      type: "Attune (self)",
    },
    {
      name: "Astral Instability",

      effect: `
        At the start of each phase, you may \\glossterm{teleport} into a random location in the Astral Plane.
        At the end of the round, you reappear in the location where you disappeared.
        If that space is occupied, you reappear in the closest available space.
      `,
      rank: 3,
      scaling: {
        5: `
          When you disappear, you can choose where you reappear.
          You can choose any unoccupied location within \\rngshort range from the location where you disappeared.
        `,
        7: "The distance you can reappear at increases to \\rngmed range.",
      },
      type: "Attune (self)",
    },
    {
      name: "Transposition",

      attack: {
        // crit: '',
        // glance: '',
        hit: `
          If both subjects are hit, they each teleport into each other's locations.
        `,
        targeting: `
          Make an attack vs. Mental against two Large or smaller creatures within \\medrange.
          If either creature is not standing on solid ground, this spell fails.
        `,
      },
      rank: 3,
      scaling: "accuracy",
      type: "Instant",
    },
    {
      name: "Massive Transposition",

      functionsLike: {
        exceptThat: "it can affect creatures with a maximum size of Gargantuan.",
        spell: "transposition",
      },
      rank: 5,
      scaling: "accuracy",
      type: "Instant",
    },
    {
      name: "Phasing Blade",

      castingTime: "minor action",
      effect: `
        Whenever you make a \\glossterm{strike}, your weapon or projectile can pass through a single physical obstacle up to one foot thick on its way to the strike's target.
        This can allow your attacks to ignore \\glossterm{cover}, or even attack through solid walls.
        It does not allow you to ignore armor, shields, or or similar items used by the targets of your attacks.
      `,
      rank: 3,
      scaling: {
        5: "Your strikes can pass through any number of physical obstacles with a combined thickness of two feet or less.",
        7: "Your strikes can pass through any number of physical obstacles with a combined thickness of five feet or less.",
      },
      type: "Attune (self)",
    },
    {
      name: "Mass Phasing Blade",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "phasing blade",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: "Each subject's strikes can penetrate through any number of physical obstacles with a combined thickness of two feet or less.",
      },
      type: "Attune (target)",
    },
    {
      name: "Phasing Spells",

      castingTime: "minor action",
      effect: `
        When determining whether you have \\glossterm{line of effect} to a particular location with spells, you can ignore a single physical obstacle up to one foot thick.
        This can allow you to cast spells through solid walls, though it does not grant you the ability to see through the wall.
      `,
      rank: 4,
      scaling: {
        6: "Your spells can pass through any number of physical obstacles with a combined thickness of two feet or less.",
      },
      type: "Attune (self)",
    },
    {
      name: "Phasestep",

      castingTime: "minor action",
      effect: `
        You can move through creatures freely.
        This does not allow you to move through inanimate objects.
        It also does not allow you to end your movement in spaces occupied by other creatures without \\glossterm{squeezing}.
      `,
      rank: 3,
      scaling: {
        5: "You also ignore all sources of \\glossterm{difficult terrain}.",
        7: "You can also move through inanimate objects that block no more than half your body at a time, such as low walls.",
      },
      type: "Attune (self)",
    },
    {
      name: "Mass Phasestep",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        spell: "phasestep",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: "Each subject can also ignore all sources of \\glossterm{difficult terrain}.",
      },
      type: "Attune (target)",
    },
  ],
  rituals: [
    {
      name: "Gate",
      rank: 7,
      effect: `
        Choose a plane that connects to your current plane, and a location within that plane.
        This ritual creates an interdimensional connection between your current plane and the location you choose, allowing travel between those two planes in either direction.
        The gate takes the form of a \\areatiny radius circular disk, oriented a direction you choose (typically vertical).
        It is a two-dimensional window looking into the plane you specified when casting the spell, and anyone or anything that moves through it is shunted instantly to the other location.
        The gate cannot be \\glossterm{sustained} for more than 5 rounds, and is automatically dismissed at the end of that time.

        You must specify the gate's destination with a precise mental image of its appearance.
        The image does not have to be perfect, but it must unambiguously identify the location.
        Incomplete or incorrect mental images may result in the ritual leading to an unintended destination within the same plane, or simply failing entirely.

        % TODO: Is this planar cosmology correct?
        The Astral Plane connects to every plane, but transit from other planes is usually more limited.
        From the Material Plane, you can only reach the Astral Plane.
      `,
      type: "Sustain (standard)",
      castingTime: "one week",
    },
    {
      name: "Plane Shift",
      rank: 4,
      effect: `
        Choose a \\glossterm{planar rift} within \\medrange and up to five Large or smaller ritual participants.
        Each creature teleports to the unoccupied spaces closest to the other side of the planar rift.
        For details about \\glossterm{planar rifts}, see \\pcref{Planar Rifts}.

        % TODO: Is this planar cosmology correct?
        The Astral Plane connects to every plane, but transit from other planes is usually more limited.
        From the Material Plane, you can only reach the Astral Plane.
      `,
      tags: [],
      castingTime: "1 hour",
      type: "Instant",
    },
    {
      name: "Astral Projection",

      effect: `
        Choose up to five Large or smaller ritual participants.
        Each creature teleports to a single random location within the Inner Astral Plane (see \\pcref{The Astral Plane}).

        In addition, a localized \\glossterm{planar rift} appears at the destination area on the Astral Plane which leads back to the location where this ritual was performed.
        The rift can only be passed through by the targets of this effect.
        It lasts for one week before disappearing permanently, potentially stranding the targets in the Astral Plane if they have not yet returned.
      `,
      rank: 5,
      tags: [],
      castingTime: "24 hours",
      type: "Duration",
    },
    {
      name: "Homeward Shift",

      effect: `
        This ritual can only be performed on the Astral Plane.

        Choose up to five Large or smaller ritual participants.
        Each creature teleports to the last spaces they occupied on their home planes.
      `,
      rank: 4,
      tags: [],
      castingTime: "24 hours",
      type: "Instant",
    },
    {
      name: "Overland Teleportation",
      rank: 5,
      effect: `
        Choose a destination up to 100 miles away from you on your current plane.
        Up to five Medium or smaller ritual participants are teleported to the chosen destination.

        You must specify the destination with a precise mental image of its appearance.
        The image does not have to be perfect, but it must unambiguously identify the destination.
        If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
        The new destination will be one that more closely resembles your mental image.
        If no such area exists, the ritual simply fails.
        % TODO: does this need more clarity about what teleportation works?
      `,
      tags: [],
      castingTime: "24 hours",
      type: "Instant",
    },
    {
      name: "Distant Overland Teleportation",

      functionsLike: {
        exceptThat: `
        there is no distance limitation.
        The destination must simply be on the same plane as you.
        `,
        spell: "overland teleportation",
      },
      rank: 7,
      tags: [],
      castingTime: "24 hours",
      type: "Instant",
    },
    {
      name: "Retrieve Legacy",

      castingTime: "24 hours",
      effect: `
        Choose one ritual participant.
        If its \\glossterm{legacy item} is on the same plane and \\glossterm{unattended}, it is teleported into the creature's hand.
      `,
      // narrative: '',
      rank: 3,
      type: "Instant",
    },
  ],
};
