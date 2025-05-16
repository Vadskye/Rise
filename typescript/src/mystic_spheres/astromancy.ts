import { MysticSphere } from '.';
import { IMMUNITY_CRIT, MULTIHIT_CRIT, SWIFT_FATIGUE } from './constants';

export const astromancy: MysticSphere = {
  name: 'Astromancy',
  hasImage: true,
  shortDescription: 'Transport creatures and objects instantly through space.',
  sources: ['arcane', 'domain', 'soulkeeper'],
  specialRules: `
    Many abilities from this mystic sphere cause creature to \\glossterm{teleport}.
    Unless otherwise specified, teleporation requires \\glossterm{line of sight}, \\glossterm{line of effect}, and an unoccupied destination on stable ground.
    For details, see \\pcref{Teleportation}.

    \\spheredef{flicker}[flickered] Some spells from this sphere can cause creatures or objects to very briefly \\glossterm{teleport} to other locations.
    If the space occupied by a flickered target is occupied or otherwise inaccessible when it returns, it instead reappears in the closest available open space.
    Flickering works even if the target is not stable ground that can support its weight.

    When a creature or object flickers, it returns at the end of the current turn unless the ability specifies a different duration.
    That means that you can't make any additional attacks against it during your turn.
    If one of your allies takes a turn after you, they will be able to attack the flickered target normally, since it will have returned by then.

    If the target cannot be \\glossterm{teleported}, the flicker fails.
    This also prevents effects that trigger when it returns, such as the damage from the \\spell{planar jaunt -- astral plane} spell.
  `,

  cantrips: [
    {
      name: 'Dimension Hop',

      effect: `
        You \\glossterm{teleport} horizontally to a location within 5 foot \\glossterm{range}.
      `,
      narrative: `
        You disappear with an audible pop, appearing only a few feet away - but now on the other side of the cell bars.
      `,
      scaling: {
        2: 'The range increases to 15 feet.',
        4: 'The range increases to \\rngshort.',
        6: 'The range increases to \\rngmed.',
      },
    },
    {
      name: 'Translocate Object',

      effect: `
        Choose one Small or smaller \\glossterm{unattended} object within \\shortrange.
        It teleports into your hand or into an unoccupied location within the same range.
      `,
      narrative: `
        A tankard of ale disappears from the counter, appearing directly in your hand.
        The barkeep frowns, about to say something, before a gold coin suddenly appears in the tankard's place.
      `,
      scaling: {
        2: 'The range increases to \\rngmed.',
        4: 'The maximum size increases to Medium.',
        6: 'The range increases to \\rnglong.',
      },
    },
  ],
  spells: [
    {
      name: 'Panic Translocation',

      effect: `
        At the end of each round, if you gained a \\glossterm{vital wound} that round, you \\glossterm{teleport} up to 60 feet away from the source of the wound to the most distant valid destination.
        This teleportation functions even if you are unconscious, but you cannot consciously control the direction.
        If the source of the wound is unclear, the teleportation direction is chosen randomly.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Instant Retrieval',

      effect: `
        As a \\glossterm{minor action}, you can teleport one of your items into your \\glossterm{free hand}.
        This can teleport items from your backpack, or other storage devices worn closely on your body such as weapon sheathes, as long as you are touching the outside of that storage (including though clothing or armor).
        Conjuring a shield in this way does not automatically strap it to your arm, so you must still spend the normal action to don it (see \\tref{Donning Armor}).
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Tactical Translocation',

      effect: `
        Once per round, when you would make a melee \\glossterm{strike} or use an ability that requires \\glossterm{touch} on a creature other than yourself, you can first \\glossterm{teleport} up to 10 feet.
        Your destination must be adjacent to the target.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Splicing Grasp',

      attack: {
        hit: `
          \\damagerankone.
          If the target is Large or smaller and loses \\glossterm{hit points}, you may \\glossterm{teleport} it up to 30 feet.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Mental against a creature you \\glossterm{touch}.
        `,
      },
      narrative: `
        Your touch makes your foe disappear.
        Most of it reappears intact elsewhere, but something important - and painful - was lost in transit.
      `,
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Distant Splicing Grasp',

      attack: {
        hit: `
          \\damageranksix.
          If the target is Huge or smaller and loses hit points, you \\glossterm{teleport} it up to 90 feet.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Mental against a creature you \\glossterm{touch}.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Banishment',

      attack: {
        crit: IMMUNITY_CRIT,
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it \\sphereterm{flickers} to a random safe place in the Astral Plane.
          It does not return until the end of the next round.
          After it returns, it becomes immune to flickering in this way until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against one Large or smaller creature within \\medrange.
        `,
      },
      narrative: `
        The dire wolf about to eat your allies disappears with an audible pop.
        If they run quickly, they can escape before it returns.
      `,
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Banishing Rift',

      functionsLike: {
        name: 'banishment',
        exceptThat:
          'it affects all Large or smaller creatures in a \\medarea radius within \\medrange.',
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Efficient Banishment',

      functionsLike: {
        name: 'banishment',
        exceptThat: 'it works even if the target has damage resistance remaining.',
      },
      rank: 5,
      scaling: 'accuracy',
    },

    // treat this as t3 debuff; it's similar to immobilized, but harder to cheese with Long weapons
    {
      name: 'Dimensional Anchor',

      attack: {
        hit: `
          If the target has no remaining damage resistance, it becomes anchored to its location as long as you sustain this spell.
          At the end of each round, the target \\glossterm{teleports} back to the location it was in when this spell was cast.
          This teleportation does not require \\glossterm{line of sight} or \\glossterm{line of effect}, but it does not function across planes.

          Alternately, you can cast this spell on an \\glossterm{ally}.
          In that case, the ally does not take damage, but is still anchored in place as long as you sustain this spell.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        There is no escape.
        Nothing prevents your foe from moving, yet it is trapped more perfectly than any net could achieve.
      `,
      rank: 6,
      scaling: 'accuracy',
      tags: ['Sustain (minor)'],
    },
    // TODO: target wording is awkward
    {
      name: 'Translocation',

      cost: SWIFT_FATIGUE,
      effect: `
        Choose either yourself or one unattended object or \\glossterm{ally} within \\medrange.
        If you choose something other than yourself, it must be Medium or smaller.
        The target \\glossterm{teleports} into a location within the same range.
      `,
      rank: 1,
      narrative: `
        One by one, you teleport your allies across the chasm.
        The orcs tracking you will never be able to follow your trail now.
      `,
      scaling: {
        3: 'The range increases to \\longrange.',
        5: 'The range increases to \\distrange.',
        7: 'The range increases to \\extrange.',
      },
    },
    {
      name: 'Hostile Translocation',

      attack: {
        hit: `
          If the target is Large or smaller, you \\glossterm{teleport} it up to 30 feet.
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
      scaling: 'accuracy',
    },
    {
      name: 'Intense Hostile Translocation',

      attack: {
        hit: `
          If the target is Large or smaller, you \\glossterm{teleport} it up to 60 feet.
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
      scaling: 'accuracy',
    },
    {
      name: 'Silent Translocation',

      functionsLike: {
        exceptThat: `
          this spell has no \\glossterm{verbal components}.
          In addition, the target's departure and arrival with this spell are silent.
        `,
        name: 'translocation',
      },
      narrative: `
        One by one, you teleport your allies into hidden vantage points overlooking your enemies.
        It took some effort to convince the dwarven paladin to try a surprise attack, but the results will be worth it.
      `,
      rank: 3,
      scaling: {
        5: 'The range increases to \\rngmed.',
        7: 'The range increases to \\rnglong.',
      },
    },
    {
      name: 'Dimension Door',

      cost: SWIFT_FATIGUE,
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
        6: 'The maximum distance increases to 600 feet.',
      },
    },
    {
      name: 'Astral Rupture',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and Mental against all \\glossterm{enemies} within a \\smallarea radius from you.
        `,
      },
      narrative: `
        Your foes are caught by a sudden rift that shunts them painfully through dimensions.
      `,
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Massive Astral Rupture',

      attack: {
        hit: `
          \\damagerankseven.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and Mental against all \\glossterm{enemies} within a \\largearea radius from you.
        `,
      },
      narrative: `
        Your foes are caught by a sudden massive rift that shunts them painfully through dimensions.
      `,
      rank: 7,
      scaling: 'accuracy',
    },
    {
      name: 'Persistent Planar Rift',

      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          You create a rift in a \\smallarea radius \\glossterm{zone} within \\medrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against all creatures in the area.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Growing Planar Rift',

      attack: {
        hit: `
          \\damagerankfive.
        `,
        missGlance: true,
        targeting: `
          You create a rift at a location within \\longrange.
          The area affected by the rift increases over time.
          It affects a \\medarea radius \\glossterm{zone} in the first round, a \\largearea radius in the second round, and a \\hugearea radius in all subsequent rounds.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against everything in the area.
        `,
      },
      rank: 7,
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Planar Jaunt -- Plane of Fire',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          The target \\sphereterm{flickers} to the Plane of Fire.
          When it returns, you deal it \\damagerankone.
          If the target loses \\glossterm{hit points}, you deal it this damage again during your next action.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\shortrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Fire, where it bursts into flame.
      `,
      rank: 1,
      scaling: 'accuracy',
      tags: ['Fire'],
    },
    {
      name: 'Planar Jaunt -- Astral Plane',

      attack: {
        hit: `
          The target \\sphereterm{flickers} to the Astral Plane.
          When it returns, it takes \\damagerankone.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\longrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Astral Plane.
        Though its destination is peaceful, the rough transit is jarring by itself.
      `,
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Planar Jaunt -- Plane of Earth',

      attack: {
        hit: `
          The target \\sphereterm{flickers} to the Plane of Earth.
          When it returns, you deal it \\damagerankone.
          If it loses \\glossterm{hit points}, it becomes \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\medrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Earth, where it is crushed by the weight of stone.
      `,
      rank: 3,
      scaling: 'accuracy',
      tags: ['Earth'],
    },
    {
      name: 'Planar Jaunt -- Plane of Air',

      // Baseline tier for determining debuffs is 3, since it's long range.
      // 15' knockback is a t1 debuff
      attack: {
        hit: `
          The target \\sphereterm{flickers} to the Plane of Air.
          When it returns, you deal it \\damageranktwo.
          If it is Large or smaller and your attack result also beats its Fortitude defense, you can \\glossterm{knockback} it up to 15 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving the target upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\longrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Air, where it is knocked flying by powerful winds.
      `,
      rank: 4,
      scaling: 'accuracy',
      tags: ['Air'],
    },
    {
      name: 'Planar Jaunt -- Plane of Water',

      attack: {
        hit: `
          The target \\sphereterm{flickers} to the Plane of Water.
          When it returns, it you deal it \\damagerankfour.
          If it is a creature that breathes air and not water, and your attack result beats its Reflex defense, this attack deals maximum damage.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\medrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Water, where it suddenly begins drowning.
      `,
      rank: 5,
      scaling: 'accuracy',
      tags: ['Water'],
    },
    {
      name: 'Planar Jaunt -- Myriad',

      // -1r for multi-tag stuff
      attack: {
        hit: `
          The target \\sphereterm{flickers} to a random assortment of planes.
          When it returns, it takes \\damagerankfive.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\medrange.
          The target must be impervious or immune to all of this spell's tags to be impervous or immune to this attack.
        `,
      },
      narrative: `
        Your foe briefly teleports through a number of planes in a rapid sequence.
        No matter what its weaknesses are, one of those planes probably held the key.
      `,
      rank: 6,
      scaling: 'accuracy',
      tags: ['Air', 'Cold', 'Earth', 'Electricity', 'Fire', 'Water'],
    },
    {
      name: 'Planar Jaunt -- Eternal Void',

      attack: {
        hit: `
          The target \\sphereterm{flickers} to the Eternal Void.
          When it returns, you deal it \\damagerankfive.
          If it loses \\glossterm{hit points} from this damage, it becomes \\confused as a condition.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\medrange.
        `,
      },
      narrative: `
        Your foe briefly teleports into the Eternal Void.
        The distance of the journey, combined with the bizarre destination, is deeply unsettling.
      `,
      rank: 7,
    },
    {
      name: 'Dimensional Jitter',

      effect: `
        At the end of each \\glossterm{phase}, you may choose to \\glossterm{teleport} 10 feet horizontally in a random direction.
      `,
      narrative: `
        The squad of furious orcs rush up to you again, ready to strike, but you teleport away from them just before their greataxes reach you.
        Will they ever learn?
      `,
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Dimension Walk',

      effect: `
        Once per round, you can teleport horizontally instead of moving using your \\glossterm{land speed}.
        Teleporting a given distance costs movement equal to that distance.
        If this teleportation fails for any reason, you still expend that movement.
      `,
      narrative: `
        Why would you walk when you can teleport?
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Astral Instability',

      effect: `
        At the start of each phase, you may \\sphereterm{flicker} to a random unoccupied location in the Astral Plane.
        You do not return until the end of the round.
        After you flicker in this way, you \\glossterm{briefly} cannot flicker with this ability again.
      `,
      narrative: `
        Armor and shields can offer some protection, but true defensive mastery comes from not being hit at all.
        Few people send themselves to another plane just to avoid danger, but it's a virtually unbeatable defense.
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Hostile Transposition',

      attack: {
        hit: `
          If you hit both subjects, they each \\glossterm{teleport} into each other's location.
          If the teleportation is invalid for either target, it fails for both targets.
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
      scaling: 'accuracy',
    },
    // Strong scaling with range
    {
      name: 'Distant Hostile Transposition',

      attack: {
        hit: `
          If you hit both subjects, they each \\glossterm{teleport} into each other's location.
          If the teleportation is invalid for either target, it fails for both targets.
        `,
        targeting: `
          Make an attack vs. Mental against two Huge or smaller creatures within \\distrange.
        `,
      },
      narrative: `
        The cultists were confident that they were safe behind their defensive wall of demonic warriors.
        When one of their number was unexpectedly replaced by a raging barbarian, they briefly discovered how wrong they were.
      `,
      rank: 6,
      scaling: 'accuracy',
    },
    {
      name: 'Transposition',

      cost: SWIFT_FATIGUE,
      effect: `
        Choose two \\glossterm{allies} within \\medrange.
        Each target \\glossterm{teleports} into the other's location.
        If the teleportation is invalid for either target, it fails for both targets.
      `,
      narrative: `
        As your enemies drew close to you, they expected you to panic and run.
        When you were unexpectedly replaced by a raging barbarian, they briefly discovered how wrong they were.
      `,
      rank: 1,
      scaling: {
        3: 'The range increases to \\longrange.',
        5: 'The range increases to \\distrange.',
        7: 'The range increases to \\extrange.',
      },
    },
    {
      name: 'Phasing Blade',

      effect: `
        Whenever you make a \\glossterm{strike}, your weapon or projectile can pass through a single physical obstacle up to one foot thick on its way to the strike's target.
        This can allow your attacks to ignore \\glossterm{cover}, or even attack through solid walls.
        It does not allow you to ignore armor, shields, or or similar items carried or worn by the targets of your attacks.
      `,
      rank: 3,
      roles: ['attune'],
      narrative: `
        You augment your weapons with the ability to travel short distances through the Astral Plane to reach their targets.
      `,
      type: 'Attune',
    },
    {
      name: 'Mass Phasing Blade',

      functionsLike: {
        mass: true,
        name: 'phasing blade',
      },
      rank: 5,
      roles: ['attune'],
      type: 'Attune (target)',
    },
    {
      name: 'Phasing Spells',

      effect: `
        When determining whether you have \\glossterm{line of effect} to a particular location with spells, you can ignore a single physical obstacle up to one foot thick.
        This can allow you to cast spells through solid walls, though it does not grant you the ability to see through the wall.
      `,
      narrative: `
        You augment your spells with the ability to travel short distances through the Astral Plane to reach their targets.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Phasestep',

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
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Mass Phasestep',

      functionsLike: {
        mass: true,
        name: 'phasestep',
      },
      rank: 3,
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Greater Phasestep',

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
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Astral Refuge',

      castingTime: 'minor action',
      effect: `
        Choose yourself or one Medium or smaller \\glossterm{ally} or \\glossterm{unattended} object within \\medrange.
        You \\sphereterm{flicker} the target into a random safe location in the Astral Plane.
        When you cast this spell, you choose how many rounds the target spends in the Astral Plane, up to a maximum of five rounds.
        It returns at the end of the last round.
      `,
      rank: 2,
      scaling: {
        4: `The maximum size of the target increases to Large.`,
        6: `The maximum size of the target increases to Huge.`,
      },
    },
    {
      name: 'Blink',

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
      name: 'Distant Spells',

      effect: `
        You gain a +15 foot \\glossterm{enhancement bonus} to the \\glossterm{range} of all of your ranged spells.
        This does not affect spells that do not have a range listed in feet.
      `,
      narrative: `
        By channeling your spells through the Astral Plane, you can reach foes that are farther away than would normally be possible.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },
    {
      name: 'Empowered Distant Spells',

      effect: `
        You gain a +60 foot \\glossterm{enhancement bonus} to the \\glossterm{range} of all of your ranged spells.
        This does not affect spells that do not have a range listed in feet.
      `,
      rank: 6,
      roles: ['attune'],
      type: 'Attune (deep)',
    },
    {
      name: 'Twinned Portals',

      effect: `
        Choose two unoccupied squares on stable ground within \\longrange.
        A shimmering portal appears in each of the two squares.
        Each portal appears as an opaque colored disc five feet in diameter.

        Once per phase, when a creature moves into one of the squares, it can choose to pass through the portal in that square.
        If it does, it \\glossterm{teleports} to the portal in the other chosen square, regardless of \\glossterm{line of sight} or \\glossterm{line of effect} between the two portals.
        Objects can pass through the portals freely and maintain their speed, but moving objects have an unpredictable trajectory, so shooting projectiles through a portal is ineffective.

        If multiple creatures attempt to pass through the portals simultaneously, they roll \\glossterm{initiative} to determine the first person into the portal.
        A creature that attempts to pass through the portal in a phase where the portal was already activated stops its movement in the square with the portal.
      `,
      narrative: `
        You create a pair of portals that allow instant passage from one to the other.
      `,
      rank: 3,
      roles: ['narrative'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Giant Twinned Portals',

      functionsLike: {
        name: 'twinned portals',
        exceptThat:
          'the portals are 20 feet in diameter.',
      },
      narrative: `
        You create a pair of gigantic portals that allow instant passage from one to the other.
      `,
      rank: 5,
      roles: ['narrative'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Rapid Twinned Portals',

      functionsLike: {
        name: 'twinned portals',
        exceptThat:
          'the portals function any number of times per phase intead of only once per phase.',
      },
      narrative: `
        You create a pair of portals that allow instant passage from one to the other.
      `,
      rank: 7,
      roles: ['narrative'],
      type: 'Sustain (attuneable, minor)',
    },
  ],
};
