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
    },
  ],
  spells: [
    {
      name: "Dimensional Grasp",

      attack: {
        // crit: '',
        hit: `
          The target takes 1d8 + \\glossterm{power} energy damage.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
        `,
      },
      narrative: `
        Your touch sends part of your foe's body to the Astral Plane.
        Although most of its body remains where it was, something important - and painful - was lost.
      `,
      rank: 1,
      scaling: "damage",
    },

    {
      name: "Greater Dimensional Grasp",

      attack: {
        // crit: '',
        hit: `
          The target takes 4d6 + \\glossterm{power} energy damage.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
        `,
      },
      narrative: `
        Your touch sends part of your foe's body to the Astral Plane.
        Although most of its body remains where it was, something important - and painful - was lost.
      `,
      rank: 5,
      scaling: "damage",
    },

    {
      name: "Banishment",

      attack: {
        hit: `
          The target takes 1d10 + half \\glossterm{power} energy damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{teleported} to a random safe place in the Astral Plane.
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
    },

    {
      name: "Certain Banishment",

      functionsLike: {
        name: "banishment",
        exceptThat: "you gain a +3 accuracy bonus with the attack, and the damage increases to 2d10 + half \\glossterm{power}.",
      },
      narrative: `
        The balor about to drag your allies into the Abyss disappears with an audible pop.
        If they act quickly, they can prepare a trap before it returns.
      `,
      rank: 6,
      scaling: "damage",
    },
    // treat this as r3 level; it's similar to immobilized, but harder to cheese with Long weapons
    {
      name: "Dimensional Anchor",

      attack: {
        hit: `
          The target takes 2d8 energy damage.
          If it loses hit points from this damage, it becomes anchored to its location as a \\glossterm{condition}.
          At the end of each round, the target teleports back to the location it was in when this spell was cast.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        There is no escape.
        Nothing prevents your foe from moving, yet it is trapped more perfectly than any net could achieve.
      `,
      rank: 5,
      tags: [],
    },
    // TODO: target wording is awkward
    {
      name: "Translocation",

      effect: `
        Choose either yourself or one unattended object or \\glossterm{ally} within \\medrange.
        If you choose something other than yourself, it must be Medium size or smaller.
        The target \\glossterm{teleports} into an unoccupied location within range on a stable surface that can support its weight.
        If the destination is invalid, this spell fails with no effect.
      `,
      rank: 1,
      narrative: `
        One by one, you teleport your allies across the chasm.
        The orcs tracking you will never be able to follow your trail now.
      `,
      scaling: {
        3: "The range increases to \\longrange.",
        5: "The range increases to \\distrange.",
        7: "The range increases to \\extrange.",
      },
    },
    {
      name: "Hostile Translocation",

      attack: {
        hit: `
          The target takes 1d6 + half \\glossterm{power} energy damage.
          If it is Medium or smaller and loses \\glossterm{hit points} from this damage, you \\glossterm{teleport} it up to 30 feet.
          The destination must be within range and on a stable surface that can support its weight.
          If the destination is invalid, the teleportation fails with no effect.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 1,
      narrative: `
        You teleport your foe across the chasm.
        The orc will never be able to reach you now.
      `,
      scaling: "damage",
    },
    {
      name: "Greater Hostile Translocation",

      attack: {
        hit: `
          The target takes 2d8 + half \\glossterm{power} energy damage.
          If it is Large or smaller and loses \\glossterm{hit points} from this damage, you \\glossterm{teleport} it up to 60 feet.
          The destination must be within range and on a stable surface that can support its weight.
          If the destination is invalid, the teleportation fails with no effect.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 5,
      narrative: `
        You teleport your foe across the chasm.
        The ogre will never be able to reach you now.
      `,
      scaling: "damage",
    },
    {
      name: "Silent Translocation",

      functionsLike: {
        exceptThat: `
          this spell does not have \\glossterm{verbal components}.
          In addition, the target's departure and arrival with this spell are silent.
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
    },
    {
      name: "Dimension Door",

      effect: `
        You teleport to an unoccupied destination on a stable surface within 300 feet of you.
        You must clearly visualize the destination's appearance and have an approximate knowledge of its direction and distance from you.
        However, you do not need \\glossterm{line of sight} or \\glossterm{line of effect} to your destination.
      `,
      narrative: `
        You were invited into this throne room once, while the old king still lived.
        Now, you can return whenever you want, no matter how many guards and locks the usurper tries to deploy against you.
      `,
      rank: 4,
      scaling: {
        6: "The maximum distance increases to 600 feet.",
      },
    },
    {
      name: "Sudden Rift",

      attack: {
        hit: `
          Each target takes 1d6 + half \\glossterm{power} energy damage.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} within a \\smallarea radius from you.
        `,
      },
      narrative: `
        Your foes are caught by a sudden rift that shunts them painfully through dimensions.
      `,
      rank: 2,
      scaling: "damage",
    },
    {
      name: "Greater Sudden Rift",

      attack: {
        hit: `
          Each target takes 2d8 + half \\glossterm{power} energy damage.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} within a \\medarea radius from you.
        `,
      },
      narrative: `
        Your foes are caught by a sudden massive rift that shunts them painfully through dimensions.
      `,
      rank: 5,
      scaling: "damage",
    },
    {
      name: "Dimensional Jaunt -- Astral Plane",

      // -1d for long range
      attack: {
        hit: `
          The target takes 1d6 + \\glossterm{power} energy damage.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\longrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Astral Plane.
        Though its destination is peaceful, the rough transit is jarring by itself.
      `,
      rank: 1,
      scaling: "damage",
    },
    {
      name: "Dimensional Jaunt -- Plane of Air",

      attack: {
        hit: `
          The target takes 1d10 bludgeoning damage.
          If it is Large or smaller and loses \\glossterm{hit points} from this damage, you can \\glossterm{knockback} it up to 30 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving the target upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\longrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Air, where it is knocked flying by powerful winds.
      `,
      rank: 2,
      scaling: "damage",
    },
    {
      name: "Dimensional Jaunt -- Plane of Earth",

      attack: {
        hit: `
          The target takes 2d6 + half \\glossterm{power} bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Earth, where it is crushed by the weight of stone.
      `,
      rank: 3,
      scaling: "damage",
    },
    {
      name: "Dimensional Jaunt -- Plane of Fire",

      attack: {
        crit: `
          Both instances of damage are doubled, not just the initial damage.
        `,
        hit: `
          The target takes 2d6 + half \\glossterm{power} fire damage immediately, and again during the next \\glossterm{action phase}.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\longrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Fire, where it bursts into flame.
      `,
      rank: 4,
      scaling: {
        special: `
          Both instances of damage increase by +1d for each rank beyond 4.
        `,
      },
    },
    {
      name: "Dimensional Jaunt -- Plane of Water",

      attack: {
        hit: `
          The target takes 2d10 + half \\glossterm{power} bludgeoning damage.
          If the target is unable to breathe water and your attack result beats its Reflex defense, this damage is doubled.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Water, where it suddenly begins drowning.
      `,
      rank: 5,
      scaling: "damage",
    },
    // +1 rank for all damage types
    {
      name: "Dimensional Jaunt -- Myriad",

      attack: {
        hit: `
          The target takes 4d10 + \\glossterm{power} damage of all types.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      narrative: `
        Your foe briefly teleports through a number of planes in a rapid sequence.
        No matter what its weaknesses are, one of those planes probably held the key.
      `,
      rank: 6,
      scaling: "damage",
    },
    {
      name: "Dimensional Jaunt -- Far Realm",

      attack: {
        hit: `
          The target takes 4d6 energy damage.
          If it lost \\glossterm{hit points} from this damage, it is \\confused as a condition.
          Otherwise, it is \\stunned instead of confused.
        `,
        targeting: `
          Make an attack vs. Mental against anything within \\medrange.
        `,
      },
      narrative: `
        Your foe briefly teleports into the Far Realm.
        The distance of the journey, combined with the bizarre destination, is deeply unsettling.
      `,
      rank: 7,
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
      type: "Attune",
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
      type: "Attune",
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
      type: "Attune",
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
      type: "Attune",
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
      type: "Attune",
    },
    {
      name: "Hostile Transposition",

      attack: {
        // crit: '',
        hit: `
          Each target takes 1d8 + half \\glossterm{power} energy damage.
          If you hit both subjects, they each teleport into each other's location.
          If either target is not standing on solid ground with sufficient space to support the other target, the teleportation fails.
        `,
        targeting: `
          Make an attack vs. Mental against two Large or smaller creatures within \\medrange.
        `,
      },
      narrative: `
        The cultists were confident that they were safe behind their defensive wall of zombies.
        When one of their number was unexpectedly replaced by a raging barbarian, they briefly discovered how wrong they were.
      `,
      rank: 2,
      scaling: "damage",
    },
    {
      name: "Greater Hostile Transposition",

      attack: {
        // crit: '',
        hit: `
          Each target takes 4d6 + half \\glossterm{power} energy damage.
          If you hit both subjects, they each teleport into each other's location.
          If either target is not standing on solid ground with sufficient space to support the other target, the teleportation fails.
        `,
        targeting: `
          Make an attack vs. Mental against two Huge or smaller creatures within \\longrange.
        `,
      },
      narrative: `
        The cultists were confident that they were safe behind their defensive wall of demonic warriors.
        When one of their number was unexpectedly replaced by a raging barbarian, they briefly discovered how wrong they were.
      `,
      rank: 6,
      scaling: "damage",
    },
    {
      name: "Transposition",

      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target teleports into the other's location.
        If either target is not standing on solid ground with sufficient space to support the other target, this spell fails.
      `,
      narrative: `
        As your enemies drew close to you, they expected you to panic and run.
        When you were unexpectedly replaced by a raging barbarian, they briefly discovered how wrong they were.
      `,
      rank: 1,
      scaling: {
        3: "The range increases to \\longrange.",
        5: "The range increases to \\distrange.",
        7: "The range increases to \\extrange.",
      },
    },
    {
      name: "Phasing Blade",

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
      type: "Attune",
    },
    {
      name: "Phasing Spells",

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
      type: "Attune",
    },
    {
      name: "Phasestep",

      effect: `
        When you move using one of your movement speeds, you can move through a single creature freely.
        After you finish moving through one creature in this way, other \\glossterm{enemies} block your movement as normal.
        This does not allow you to move through inanimate objects.
        If you move into a creature's space with this ability, but you do not move out of it, you and the creature are usually considered \\squeezing as long as you continue sharing space (see \\pcref{Squeezing}).
        If you are not able to move normally, such as if you are \\grappled, this spell does not help you.
      `,
      narrative: `
        You augment your body with the ability to travel short distances through the Astral Plane to reach your destination.
      `,
      rank: 1,
      type: "Attune",
    },

    {
      name: "Greater Phasestep",

      effect: `
        When you move using one of your movement speeds, you can move through creatures freely.
        You can also move through inanimate objects that are no more than six inches thick.
        If you move into a creature's space with this ability, but you do not move out of it, you and the creature are usually considered \\squeezing as long as you continue sharing space (see \\pcref{Squeezing}).
        If you are not able to move normally, such as if you are \\grappled, this spell does not help you.
      `,
      narrative: `
        You augment your body with the ability to travel through the Astral Plane to reach your destination.
      `,
      rank: 5,
      type: "Attune",
    },
    {
      name: "Mass Phasestep",

      functionsLike: {
        mass: true,
        name: "phasestep",
      },
      narrative: `
        You augment the bodies of your allies with the ability to travel short distances through the Astral Plane to reach their destinations.
      `,
      rank: 3,
      type: "Attune (target)",
    },

    {
      name: "Astral Refuge",

      castingTime: "minor action",
      effect: `
        Choose yourself or one Medium or smaller \\glossterm{ally} or \\glossterm{unattended} object within \\medrange.
        You send that creature into a random safe location in the Astral Plane, causing it to temporarily disappear.
        When you cast this spell, you choose how many rounds the target spends in the Astral Plane, up to a maximum of five rounds.
        At the end of the last round, it reappears in the same location where it disappeared, or in the closest unoccupied space if that location is occupied.
      `,
      rank: 2,
      scaling: {
        4: `The maximum size of the target increases to Large.`,
        6: `The maximum size of the target increases to Huge.`,
      },
    },
    {
      name: "Blink",

      effect: `
        All attacks against you this round have a 20\\% \\glossterm{failure chance}.
        In addition, you gain a +2 bonus to all defenses.
        This ability has the \\abilitytag{Swift} tag, so it protects you from attacks against you during the current phase.
      `,
      narrative: `You quickly blink into the Astral Plane, leaving a dangerous battlefield behind.`,
      rank: 1,
      scaling: {
        3: `The failure chance increases to 30\\%.`,
        5: `The failure chance increases to 40\\%.`,
        7: `The failure chance increases to 50\\%.`,
      },
      tags: ['Swift'],
    },
    {
      name: "Distant Spells",

      effect: `
        You gain a +15 foot \\glossterm{magic bonus} to the \\glossterm{range} of all of your ranged spells.
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
      type: "Attune",
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
      type: "Sustain (attuneable, minor)",
    },
    {
      name: "Greater Twinned Portals",

      functionsLike: {
        name: "twinned portals",
        exceptThat: "the range increases to \\longrange, and the portals function any number of times per phase intead of only once per phase.",
      },
      narrative: `
        You create a pair of portals that allow instant passage from one to the other.
      `,
      rank: 7,
      type: "Sustain (attuneable, minor)",
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
    },
  ],
};
