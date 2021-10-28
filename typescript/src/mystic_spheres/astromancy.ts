import { MysticSphere } from ".";

export const astromancy: MysticSphere = {
  name: "Astromancy",
  shortDescription: "Transport creatures and objects instantly through space.",
  sources: ["arcane", "domain", "pact"],

  cantrips: [
    {
      name: "Dimension Hop",

      effect: `
        You teleport horizontally into an unoccupied location within 5 foot \\glossterm{range} on a stable surface that can support your weight.
        If the destination is invalid, this spell fails with no effect.
      `,
      narrative: `
        You disappear with an audible pop, appearing only a few feet away - but now on the other side of the cell bars.
      `,
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
        Choose one Small or smaller \\glossterm{unattended} object within \\shortrange.
        It teleports into your hand or into an unccupied location within \\shortrange.
        If the destination is invalid, this spell fails with no effect.
      `,
      narrative: `
        A tankard of ale disappears from the counter, appearing directly in your hand.
        The barkeep frowns, about to say something, before a gold coin suddenly appears in the tankard's place.
      `,
      scaling: {
        2: "The range increases to \\rngmed.",
        4: "The maximum size increases to Medium.",
        6: "The range increases to \\rnglong.",
      },
      type: "Instant",
    },
  ],
  spells: [
    {
      name: "Dimensional Grasp",

      attack: {
        // crit: '',
        hit: `
          The subject takes 1d10 + \\glossterm{power} energy damage.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      narrative: `
        Your touch sends part of your foe's body to the Astral Plane.
        Although most of its body remains where it was, something important - and painful - was lost.
      `,
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    // +1 level over banishment since Reflex is a weird defense for this effect
    {
      name: "Banishing Grasp",

      attack: {
        hit: `
          The subject takes 2d8 + half \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, it immediately disappears.
          At the end of the next round, it teleports back to its original location, or into the closest open space if that location is occupied.
          After this effect ends, it becomes immune to this effect until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      narrative: `
        Your touch banishes the dire wolf that was about to eat you.
        It should be gone long enough for you to escape to a more comfortable vantage point.
      `,
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Banishment",

      attack: {
        hit: `
          The subject takes 2d6 + half \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, it immediately teleports into a random unoccupied location in the Astral Plane.
          At the end of the next round, it teleports back to its original location, or into the closest open space if that location is occupied.
          After it returns, it becomes immune to being teleported in this way until it takes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        The dire wolf about to eat your allies disappears with an audible pop.
        If they run quickly, they can escape before it returns.
      `,
      rank: 3,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Certain Banishment",

      functionsLike: {
        name: "banishment",
        exceptThat: "you gain a +3 accuracy bonus with the attack, and the damage increases to 4d6 + half \\glossterm{power}.",
      },
      narrative: `
        The balor about to drag your allies into the Abyss disappears with an audible pop.
        If they act quickly, they can prepare a trap before it returns.
      `,
      rank: 6,
      scaling: "damage",
      type: "Duration",
    },
    // treat this as r3 -1 level; it's brutal to melee-only types
    {
      name: "Jittering Curse",

      attack: {
        crit: "The effect lasts until the curse is removed.",
        hit: `
          The subject jitters randomly until it takes a \\glossterm{short rest}.
          At the end of each \\glossterm{movement phase}, if it has no remaining \\glossterm{damage resistance}, it teleports horizontally 10 feet in a random direction.
          This teleportation only works if it moves the subject into an unoccupied location on a stable surface that can support its weight.
          If the destination is invalid, the teleportation fails with no effect.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        The furious troll rushes up to you again, ready to strike, only to be teleported away from you just before its claws reach you.
        Will it ever learn?
      `,
      rank: 6,
      tags: ["Curse"],
      type: "Duration",
    },
    // treat this as r3 -1 level; it's similar to immobilized, but harder to cheese with Long weapons
    {
      name: "Dimensional Anchor",

      attack: {
        crit: "The condition must be removed twice before the effect ends.",
        hit: `
          The subject is stuck in place as a \\glossterm{condition}.
          At the end of each round, the subject teleports back to the location it was in when this spell was cast.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\shortrange.
        `,
      },
      narrative: `
        There is no escape.
        Nothing prevents your foe from moving, yet it is trapped more perfectly than any net could achieve.
      `,
      rank: 7,
      tags: [],
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
      narrative: `
        You send part of your foe's body to the Astral Plane.
        Although most of its body remains where it was, something important - and painful - was lost.
      `,
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
      narrative: `
        One by one, you teleport your allies across the chasm.
        The orcs tracking you will never be able to follow your trail now.
      `,
      scaling: {
        3: "The range increases to \\rngmed.",
        5: "The range increases to \\rnglong.",
        7: "The range increases to \\rngdist.",
      },
      type: "Instant",
    },
    {
      name: "Mass Translocation",

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\shortrange.
        Each target other than yourself must be Medium size or smaller.
        Each subject \\glossterm{teleports} into an unoccupied location within range on a stable surface that can support its weight.
        You choose each subject's destination independently.
        If a subject's destination is invalid, this spell has no effect on it, but any other subjects still teleport normally.
      `,
      rank: 3,
      narrative: `
        You teleport your allies across the chasm all at once.
        The orcs chasing you can only stand on the other side and shout angrily.
      `,
      scaling: {
        5: "The range increases to \\rngmed.",
        7: "The range increases to \\rnglong.",
      },
      type: "Instant",
    },
    {
      name: "Silent Translocation",

      functionsLike: {
        exceptThat: `
          this spell does not have \\glossterm{verbal components}.
          In addition, the subject's departure and arrival with this spell are silent.
        `,
        name: "translocation",
      },
      narrative: `
        One by one, you teleport your allies into hidden vantage points overlooking your enemies.
        It took some effort to convince the dwarven paladin to try a surprise attack, but the results will be worth it.
      `,
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
      narrative: `
        You were invited into this throne room once, while the old king still lived.
        Now, you can return whenever you want, no matter how many guards and locks the usurper tries to deploy against you.
      `,
      rank: 4,
      scaling: {
        6: "The range increases to 900 feet.",
      },
      type: "Instant",
    },
    {
      name: "Dimensional Jaunt -- Plane of Earth",

      attack: {
        hit: `
          The subject takes 2d6 bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, it is \\immobilized as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\shortrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Earth, where it is crushed by the weight of stone.
      `,
      rank: 4,
      scaling: "accuracy",
      type: "Duration",
    },
    {
      name: "Dimensional Jaunt -- Plane of Air",

      attack: {
        hit: `
          The subject takes 1d8 bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, you \\glossterm{knockback} it up to 30 feet in any direction (see \\pcref{Knockback Effects}).
          Moving the subject upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\longrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Air, where it is knocked flying by powerful winds.
      `,
      rank: 2,
      scaling: "accuracy",
      type: "Instant",
    },
    // +2 levels for +1d; this is applying the r2 version of the ignited debuff
    {
      name: "Dimensional Jaunt -- Plane of Fire",

      attack: {
        crit: `
          Double damage, and the burning effect becomes a \\glossterm{condition}.
        `,
        hit: `
          The subject takes 4d8 + half \\glossterm{power} fire damage.
          If it loses \\glossterm{hit points} from this damage, it \\glossterm{briefly} catches on fire.
          At the end of each round, it takes 4d8 + half \\glossterm{power} damage.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\longrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of fire, where it is - unsurprisingly - set on fire.
      `,
      rank: 6,
      scaling: {
        special: `
          The damage of both the initial hit and the subsequent condition increases by +1d for each rank beyond 6.
        `,
      },
      type: "Duration",
    },
    // +1 level for all damage types
    {
      name: "Dimensional Jaunt -- Myriad",

      attack: {
        hit: `
          The subject takes 4d10 + \\glossterm{power} damage of all types.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\shortrange.
        `,
      },
      narrative: `
        Your foe briefly teleports through a number of planes in a rapid sequence.
        No matter what its weaknesses are, one of those planes probably held the key.
      `,
      rank: 5,
      scaling: "damage",
      type: "Instant",
    },
    {
      name: "Dimensional Jaunt -- Deep Astral Plane",

      attack: {
        hit: `
          The subject takes 4d6 energy damage.
          If it lost \\glossterm{hit points} from this damage, it is \\confused as a condition.
          Otherwise, it is \\stunned instead of confused.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
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
      narrative: `
        The squad of furious orcs rush up to you again, ready to strike, but you teleport away from them just before their greataxes reach you.
        Will they ever learn?
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
      narrative: `
        The kobold ambush exploited a weak point in your marching formation, and now everything is out of place.
        With a rapid succession of pops, you find yourself safely at a distance while the kobolds face the barbarian's whirling greataxe.
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
        You must be able to use your movement speeds to teleport in this way, so effects like being \\immobilized or \\grappled prevent this movement.
      `,
      narrative: `
        Why would you walk when you can teleport?
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
        All \\glossterm{strikes} against you have a 20\\% failure chance as you happen to be in the Astral Plane when the attack would hit.
        However, all of your abilities that affect creatures or objects other than yourself also have the same failure chance.
        This does not affect abilities you use that only affect yourself.
      `,
      narrative: `
        It's sometimes annoying to be caught in the Astral Plane while you're trying to banish your foes there.
        However, watching swords pass through your body as you blink out of existence is worth the risk.
      `,
      rank: 2,
      scaling: {
        4: "When you cast this spell, you can choose to increase the failure chance to 30\\%.",
        6: "When you cast this spell, you can choose to increase the failure chance to 40\\%.",
      },
      type: "Attune (self)",
    },
    {
      name: "Controlled Flicker",

      functionsLike: {
        exceptThat: `
          you can choose at the start of each round to stop flickering for that round.
          If you do, your abilities do not have a failure chance, and attacks against you also do not have a failure chance.
        `,
        name: "flicker",
      },
      narrative: `
        Some astromancers have researched the mystic arts for decades to avoid accidentally travelling to other planes in combat.
        Of course, most people take that ability for granted.
      `,
      rank: 4,
      scaling: {
        6: "When you cast this spell, you can choose to increase the failure chance to 30\\%.",
      },
      type: "Attune (self)",
    },
    {
      name: "Astral Instability",

      effect: `
        At the start of each phase, you may \\glossterm{teleport} into a random unoccupied location in the Astral Plane.
        At the end of the round, you reappear in the location where you disappeared.
        If that space is occupied, you reappear in the closest available space.
        After you teleport in this way, you \\glossterm{briefly} cannot teleport with this ability again.
      `,
      rank: 3,
      narrative: `
        Armor and shields can offer some protection, but true defensive mastery comes from not being hit at all.
        Few people send themselves to another plane just to avoid danger, but it's a virtually unbeatable defense.
      `,
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
        hit: `
          If you hit both subjects, they each teleport into each other's locations.
        `,
        targeting: `
          Make an attack vs. Mental against two Large or smaller creatures within \\longrange.
          If either creature is not standing on solid ground, this spell fails.
        `,
      },
      narrative: `
        The cultists were confident that they were safe behind their defensive wall of zombies.
        When one of their number was unexpectedly replaced by a raging barbarian, they briefly discovered how wrong they were.
      `,
      rank: 3,
      scaling: "accuracy",
      type: "Instant",
    },
    {
      name: "Massive Transposition",

      functionsLike: {
        exceptThat: "it can affect creatures with a maximum size of Gargantuan.",
        name: "transposition",
      },
      narrative: `
        The storm giant shamans were confident that they were safe behind their defensive wall of giant warriors.
        When one of their number was unexpectedly replaced by a fire-breathing dragon, they briefly discovered how wrong they were.
      `,
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
        It does not allow you to ignore armor, shields, or or similar items carried or worn by the targets of your attacks.
      `,
      rank: 3,
      narrative: `
        You augment your weapons with the ability to travel short distances through the Astral Plane to reach their targets.
      `,
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
        name: "phasing blade",
      },
      narrative: `
        You augment the weapons of your allies with the ability to travel short distances through the Astral Plane to reach their targets.
      `,
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
      narrative: `
        You augment your spells with the ability to travel short distances through the Astral Plane to reach their targets.
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
        When you move using one of your movement speeds, you can move through creatures freely.
        This does not allow you to move through inanimate objects.
        If you end your movement in spaces occupied by other creatures, both of you are still \\squeezing.
        If you are not able to move normally, such as if you are \\grappled, this spell does not help you.
      `,
      narrative: `
        You augment your body with the ability to travel short distances through the Astral Plane to reach your destination.
      `,
      rank: 3,
      scaling: {
        5: "You also ignore all sources of \\glossterm{difficult terrain}.",
        7: "You can also move through inanimate objects that are no more than six inches thick.",
      },
      type: "Attune (self)",
    },
    {
      name: "Mass Phasestep",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "phasestep",
      },
      narrative: `
        You augment the bodies of your allies with the ability to travel short distances through the Astral Plane to reach their destinations.
      `,
      rank: 5,
      scaling: {
        7: "Each subject can also ignore all sources of \\glossterm{difficult terrain}.",
      },
      type: "Attune (target)",
    },

    {
      name: "Astral Refuge",

      castingTime: "minor action",
      effect: `
        Choose yourself or one Medium or smaller \\glossterm{ally} or unattended object within \\medrange.
        You send that creature into a random safe location in the Astral Plane, causing it to temporarily disappear.
        When you cast this spell, you choose how many rounds the subject spends in the Astral Plane, up to a maximum of five rounds.
        At the end of the last round, it reappears in the same location where it disappeared, or in the closest unoccupied space if that location is occupied.
        `,
      rank: 2,
      scaling: {
        4: `The maximum size of the subject increases to Large.`,
        6: `The maximum size of the subject increases to Huge.`,
      },
      type: "Duration",
    },
    {
      name: "Blink",

      effect: `
        All attacks against you this round have a 50\\% \\glossterm{failure chance}.
        This ability has the \\abilitytag{Swift} tag, so it protects you from attacks against you during the current phase.
      `,
      narrative: `You quickly blink into the Astral Plane, leaving a dangerous battlefield behind.`,
      rank: 1,
      scaling: {
        3: `You also gain a +1 bonus to all defenses.`,
        5: `The defense bonus increases to +2.`,
        7: `The defense bonus increases to +3.`,
      },
      tags: ['Swift'],
      type: "Duration",
    },
    {
      name: "Distant Spells",

      effect: `
        You gain a +15 foot bonus to the \\glossterm{range} of all of your ranged spells.
        This does not affect spells that do not have a range listed in feet.
      `,
      narrative: `
        By channeling your spells through the Astral Plane, you can reach foes that are farther away than would normally be possible.
      `,
      rank: 2,
      scaling: {
        4: "The distance increases to 30 feet.",
        6: "The distance increases to 60 feet.",
      },
      type: "Attune (self)",
    },
    {
      name: "Twinned Portals",

      effect: `
        Choose two unoccupied squares on stable ground within \\medrange.
        A shimmering portal appears in each of the two squares.
        Each portal appears as an opaque colored disc five feet in diameter.

        Once per phase, when a creature moves into one of the squares, it can choose to pass through the portal in that square.
        If it does, it \\glossterm{teleports} to the portal in the other chosen square, regardless of \\glossterm{line of sight} or \\glossterm{line of effect} between the two portal.
        Objects can pass through the portals freely and maintain their speed, but moving objects have an unpredictable trajectory, so firing projectiles through a portal is ineffective.

        If multiple creatures attempt to pass through the portals simultaneously, they roll \\glossterm{initiative} to determine the first person into the portal.
        A creature that attempts to pass through the portal in a phase where the portal was already activated stops its movement in the square with the portal.
      `,
      narrative: `
        You create a pair of portals that allow instant passage from one to the other.
      `,
      rank: 3,
      scaling: {
        5: "The range increases to \\longrange.",
        7: "The range increases to \\distrange.",
      },
      type: "Sustain (minor)",
    },
  ],
  rituals: [
    {
      name: "Interplanar Gate",
      rank: 7,
      effect: `
        Choose a plane that connects to your current plane, and a location within that plane.
        This ritual creates an interdimensional connection between your current plane and the location you choose, allowing travel between those two planes in either direction.
        The gate takes the form of a 15-foot radius circular disk, oriented in a direction you choose (typically vertical).
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
        name: "overland teleportation",
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
      rank: 2,
      type: "Instant",
    },
    {
      name: "Astral Chest",

      castingTime: "one hour",
      effect: `
        When you cast this spell, you choose whether to send an object to the Astral Plane or retrieve the object you stored there.
        If you send an object to the Astral Plane, choose a a Medium or smaller \\glossterm{unattended} object within \\medrange of you.
        That object \\glossterm{teleports} to a random location in the Astral Plane.

        If you retrieve an object, choose an unoccupied space on stable ground within \\medrange of you.
        The object you previously stored in the Astral Plane with this ritual appears at that location.
        The object normally returns exactly as it was sent away, since the Astral Plane is vast and mostly uninhabited.
        There is a 1\\% chance per year that the object spends in the Astral Plane that it has been lost irretrievably.
      `,
      // narrative: '',
      rank: 3,
      type: "Instant",
    },
  ],
};
