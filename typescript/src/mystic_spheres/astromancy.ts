import { MysticSphere } from '.';
import { MULTIHIT_CRIT, SWIFT_FATIGUE, SWIFT_FATIGUE_SELF } from './constants';

export const astromancy: MysticSphere = {
  name: 'Astromancy',
  hasImage: true,
  shortDescription: 'Transport creatures and objects instantly through space.',
  sources: ['arcane', 'domain', 'soulkeeper'],
  specialRules: `
    Many abilities from this mystic sphere cause creatures or objects to \\glossterm{teleport}.
    Unless otherwise specified, teleporation requires \\glossterm{line of sight}, \\glossterm{line of effect}, and an unoccupied destination on stable ground.
    For details, see \\pcref{Teleportation}.

    \\spheredef{flicker}[flickered] Some spells from this sphere can cause creatures or objects to very briefly \\glossterm{teleport} to other locations.
    This is called flickering.
    If the space occupied by a flickered target is occupied or otherwise inaccessible when it returns, it instead reappears in the closest available open space.
    Flickering works even if the target is not on stable ground.

    When a creature or object flickers, it returns at the end of your current turn unless the ability specifies a different duration.
    That means that you can't make any additional attacks against it during your turn.
    If one of your allies takes a turn after you, they will be able to attack the flickered target normally, since it will have returned by then.

    If the target cannot be \\glossterm{teleported}, the flicker fails.
    This also prevents effects that trigger when it returns, such as the damage from the \\spell{planar jaunt -- astral plane} spell.
  `,

  cantrips: [
    {
      name: 'Translocate Object',

      effect: `
        Choose one Tiny or smaller \\glossterm{unattended} object within \\medrange.
        It teleports into your hand or into an unoccupied location within the same range.
      `,
      narrative: `
        A tankard of ale disappears from the counter, appearing directly in your hand.
        The barkeep frowns, about to say something, before a gold coin suddenly appears in the tankard's place.
      `,
      roles: ['narrative'],
    },
  ],
  spells: [
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
    // Melee 15' teleport is 0.6 EA, or 1.6 EA with damage. That's easily enough for a
    // melee spell.
    {
      name: 'Splicing Grasp',

      attack: {
        hit: `
          \\damageranktwo.
          If the target is Large or smaller, you may \\glossterm{teleport} it up to 15 feet.
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
      roles: ['burst', 'kite'],
      rank: 1,
      scaling: 'damage',
    },

    // 30' melee teleport is 1.7 EA, or 2.7 EA with damage. Melee takes that down to 2.3,
    // which is rank 6.
    {
      name: 'Distant Splicing Grasp',

      attack: {
        hit: `
          \\damagerankseven.
          If the target is Huge or smaller, you \\glossterm{teleport} it up to 30 feet.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Mental against a creature you \\glossterm{touch}.
        `,
      },
      roles: ['burst', 'kite'],
      rank: 6,
      scaling: 'damage',
    },

    {
      name: 'Banishment',

      attack: {
        hit: `
          If the target is \\glossterm{injured}, it \\sphereterm{flickers} to a random safe place in the Astral Plane.
          It does not return until the end of the next round.
          After it returns, it becomes immune to flickering in this way until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          Make an attack vs. Mental against up to three Large or smaller creatures within \\medrange.
          You gain a +2 accuracy bonus against \\creaturetag{planeforged} creatures.
        `,
      },
      narrative: `
        The dire wolf about to eat your allies disappears with an audible pop.
        If they run quickly, they can escape before it returns.
      `,
      rank: 4,
      roles: ['stasis'],
      scaling: 'accuracy',
    },

    // Banishment is r9, which is just enough for a grasp spell
    {
      name: 'Banishing Grasp',

      attack: {
        hit: `
          The target \\sphereterm{flickers} to a random safe place in the Astral Plane.
          It does not return until the end of the next round.
          After it returns, it becomes immune to flickering in this way until it finishes a \\glossterm{short rest}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Mental against a creature you \\glossterm{touch}.
          You gain a +2 accuracy bonus against \\creaturetag{planeforged} creatures.
        `,
      },
      rank: 7,
      roles: ['stasis'],
      scaling: 'accuracy',
    },

    {
      name: 'Translocation',

      cost: SWIFT_FATIGUE_SELF,
      effect: `
        Choose either yourself or one unattended object or \\glossterm{ally} within \\medrange.
        If you choose something other than yourself, it must be Medium or smaller.
        The target \\glossterm{teleports} up to 30 feet.
      `,
      rank: 1,
      narrative: `
        One by one, you teleport your allies across the chasm.
        The orcs tracking you will never be able to follow your trail now.
      `,
      roles: ['mobility'],
    },
    {
      name: 'Distant Translocation',

      cost: SWIFT_FATIGUE_SELF,
      functionsLike: {
        name: 'translocation',
        exceptThat:
          'the range increases to \\distrange, and the teleportation distance increases to 60 feet.',
      },
      rank: 5,
      narrative: `
        One by one, you teleport your allies across the chasm.
        The orcs tracking you will never be able to follow your trail now.
      `,
      roles: ['mobility'],
    },
    {
      name: 'Giant Translocation',

      cost: SWIFT_FATIGUE_SELF,
      functionsLike: {
        name: 'translocation',
        exceptThat: 'the maximum size increases to Huge.',
      },
      rank: 6,
      narrative: `
        One by one, you teleport your allies across the chasm.
        The orcs tracking you will never be able to follow your trail now.
      `,
      roles: ['mobility'],
    },
    // 30' ranged teleportation is r4. Limited scope drops to r3. Adding extra targets is
    // sketchy here because adding allies makes this extremely powerful for kiting, so
    // keep it as single target.
    {
      name: 'Hostile Translocation',

      attack: {
        hit: `
          You \\glossterm{teleport} the target up to 30 feet.
        `,
        targeting: `
          Make an attack vs. Mental against one Large or smaller creature within \\medrange.
        `,
      },
      rank: 3,
      narrative: `
        You teleport your foe across the chasm.
        The orc will never be able to reach you now.
      `,
      roles: ['kite'],
      scaling: 'accuracy',
    },
    // 60' teleport is at least as strong as an action skip. It's hard to calculate this
    // EA accurately, but it seems dangerous to make it lower level than this.
    {
      name: 'Intense Hostile Translocation',

      attack: {
        hit: `
          If the target is Large or smaller and is \\glossterm{injured}, you \\glossterm{teleport} it up to 60 feet.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 7,
      roles: ['kite', 'maim'],
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
      roles: ['mobility'],
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
      roles: ['mobility'],
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
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
    },
    {
      name: 'Massive Astral Rupture',

      attack: {
        hit: `
          \\damageranksix.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and Mental against all \\glossterm{enemies} within a \\medarea radius from you.
        `,
      },
      narrative: `
        Your foes are caught by a sudden massive rift that shunts them painfully through dimensions.
      `,
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
    },
    {
      name: 'Persistent Astral Rupture',

      // Normal damage for limited scope area would be drX-1. With sustain (minor), drX-3.
      // This should really be rank 6 to get small radius in short range, but that
      // conflicts with massive astral rupture, so this cheats a bit
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          You create a chaotic planar rupture in a \\smallarea radius \\glossterm{zone} within \\shortrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against all creatures in the area.
        `,
      },
      rank: 5,
      roles: ['wildfire'],
      scaling: 'damage',
      type: 'Sustain (attuneable, minor)',
    },
    // Since this is sustain (standard), it doesn't have to pay the steep damage cost of
    // Persistent Astral Rupture. It still pays a cost for extended range.
    {
      name: 'Growing Astral Rupture',

      attack: {
        hit: `
          \\damagerankfour.
        `,
        missGlance: true,
        targeting: `
          You create a chaotic planar rupture at a location within \\longrange.
          Its area increases over time.
          It affects a \\medarea radius \\glossterm{zone} in the first round, a \\largearea radius in the second round, and a \\hugearea radius in all subsequent rounds.
          Any effect which increases or changes this spell's area affects all of its areas equally, not just the area in the first round.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against all creatures in the area.
        `,
      },
      rank: 7,
      roles: ['wildfire'],
      type: 'Sustain (attuneable, standard)',
    },
    {
      name: 'Planar Jaunt -- Plane of Fire',

      // Normal damage for short range would be dr2, which is 2.5 + 1dpp.
      // Double dr0 is 5 + 1dpp.
      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          The target \\sphereterm{flickers} to the Plane of Fire.
          When it returns, you deal it \\damagerankzero.
          During your next action, the target takes \\damagerankzero again.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\shortrange.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Fire, where it bursts into flame.
      `,
      rank: 1,
      roles: ['burn'],
      scaling: 'damage',
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
      roles: ['snipe'],
      scaling: 'damage',
    },
    {
      name: 'Planar Jaunt -- Plane of Air',

      // A 15' vertical push is worth 1.6 EA, which is r2.
      attack: {
        hit: `
          If the target is \\glossterm{injured}, you \\glossterm{knockback} it up to 15 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving it upwards costs twice the normal movement cost.
          Each target of this spell must be knocked back in the same direction.

          You can leave the target \\midair after the knockback.
          It normally falls at the end of the round, potentially causing it to take \\glossterm{falling damage} (see \\pcref{Falling Damage}).
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\longrange that each have a \\glossterm{weight category} of Medium or lighter.
        `,
      },
      narrative: `
        Your foes disappear for a second into the Plane of Air, where they are knocked flying by powerful winds.
      `,
      // narrative: '',
      rank: 3,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Air'],
    },
    {
      name: 'Planar Jaunt -- Plane of Earth',

      // Ranged slow is 2 EA, so r4.
      attack: {
        hit: `
          The target \\sphereterm{flickers} to the Plane of Earth.
          When it returns, it is \\glossterm{briefly} \\slowed.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
        `,
      },
      narrative: `
        Your foes disappear for a second into the Plane of Earth.
        When they return, they are encumbered by the weight of earth.
      `,
      rank: 4,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Earth'],
    },

    {
      name: 'Planar Jaunt -- Plane of Water',

      // -1dr for the accuracy and weird debuff
      attack: {
        hit: `
          The target \\sphereterm{flickers} to the Plane of Water.
          When it returns, it you deal it \\damagerankfour.
        `,
        injury: `
          The target becomes unable to breathe air as a \\glossterm{condition}.
          It can remove this condition by making a \\glossterm{difficulty value} 10 Constitution check as a \\glossterm{standard action}.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\medrange.
          You gain a \\plus2 accuracy bonus if the target needs to breathe and cannot breathe water.
        `,
      },
      narrative: `
        Your foe disappears for a second into the Plane of Water, where it suddenly begins drowning.
      `,
      rank: 5,
      roles: ['burst', 'maim'],
      scaling: 'damage',
      tags: ['Water'],
    },
    {
      name: 'Planar Jaunt -- Myriad',

      // -1dr for multi-tag stuff
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
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Air', 'Cold', 'Earth', 'Electricity', 'Fire', 'Water'],
    },
    {
      name: 'Planar Jaunt -- Eternal Void',

      // Briefly stunned is r1, so r5 with damage, or r7 with damage + hp condition
      attack: {
        hit: `
          The target \\sphereterm{flickers} to the Eternal Void.
          When it returns, you deal it \\damageranksix, and it is \\glossterm{briefly} \\stunned.
        `,
        injury: `
          The target becomes \\stunned as a condition.
        `,
        targeting: `
          Make an attack vs. Mental against something within \\medrange.
        `,
      },
      narrative: `
        Your foe briefly teleports into the Eternal Void.
        The distance of the journey, combined with the bizarre destination, is deeply unsettling.
      `,
      roles: ['burst', 'maim'],
      rank: 7,
    },
    // Scary against melee enemies, hard to calculate EA
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
        Once per phase, you can teleport horizontally instead of moving using your \\glossterm{walk speed}.
        Teleporting a given distance costs movement equal to that distance.
        If this teleportation fails for any reason, you still expend that movement.
      `,
      narrative: `
        Why would you walk when you can teleport?
      `,
      rank: 2,
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

      // Like hostile translocation, but +1r for double target?
      attack: {
        hit: `
          If you hit both targets, they each \\glossterm{teleport} into each other's location.
          If the teleportation is invalid for either target, it fails for both targets.
        `,
        targeting: `
          Make an attack vs. Mental against two Large or smaller creatures within \\medrange.
          Both targets must be within \\shortrange of each other.
          The number of targets affected by this spell cannot by modified by abilities.
        `,
      },
      narrative: `
        The cultists were confident that they were safe behind their defensive wall of zombies.
        When one of their number was unexpectedly replaced by a raging barbarian, they briefly discovered how wrong they were.
      `,
      rank: 4,
      roles: ['mobility'],
      scaling: 'accuracy',
    },
    // Hard to calculate EA, assume it's the same as Translocation
    {
      name: 'Transposition',

      cost: SWIFT_FATIGUE,
      effect: `
        Choose two creatures from among yourself and your Medium or smaller \\glossterm{allies} within \\medrange.
        Both targets must be within \\shortrange of each other.
        The number of targets affected by this spell cannot by modified by abilities.

        Each target \\glossterm{teleports} into the other's location.
        If the teleportation is invalid for either target, it fails for both targets.
      `,
      narrative: `
        As your enemies drew close to you, they expected you to panic and run.
        When you were unexpectedly replaced by a raging barbarian, they briefly discovered how wrong they were.
      `,
      rank: 1,
      roles: ['mobility'],
    },
    {
      name: 'Giant Transposition',

      cost: SWIFT_FATIGUE,
      functionsLike: {
        name: 'transposition',
        exceptThat: 'the maximum size increases to Huge.',
      },
      rank: 5,
      roles: ['mobility'],
    },
    {
      name: 'Phasing Blade',

      effect: `
        Whenever you make a \\glossterm{strike}, your weapon or projectile can pass through a single physical obstacle up to one foot thick on its way to the strike's target.
        This can allow your attacks to ignore \\glossterm{cover}, or even attack through solid walls.
        It does not allow you to ignore armor, shields, or similar items carried or worn by the targets of your attacks.
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
        When you move using one of your movement speeds, you can move through creatures freely.
        This does not allow you to move through inanimate objects.
        You must still end your movement in an unoccupied space.
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
      name: 'Greater Phasestep',

      functionsLike: {
        name: 'phasestep',
        exceptThat:
          'you can also move through \\glossterm{mundane}, \\glossterm{inanimate} objects that are no more than six inches thick.',
      },
      narrative: `
        You augment your body with the ability to travel through the Astral Plane to reach your destination.
      `,
      rank: 4,
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
      roles: ['boon'],
    },
    {
      name: 'Blink',

      effect: `
        All attacks against you this round have a 20\\% \\glossterm{failure chance}.
        In addition, you gain a +2 bonus to all defenses.
        This ability has the \\abilitytag{Swift} tag, so it protects you from attacks during the current phase.
      `,
      narrative: `You jump into the Astral Plane the instant before a sword slashes through the space you left behind.`,
      rank: 1,
      roles: ['turtle'],
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
      name: 'Greater Distant Spells',

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

        Once per phase, when a Medium or smaller creature or object touches the portal in its square, it passes through that portal.
        If it does, it \\glossterm{teleports} to the portal in the other chosen square, regardless of \\glossterm{line of sight} or \\glossterm{line of effect} between the two portals.
        Objects maintain their speed when passing through the portal, but moving objects have an unpredictable trajectory, so shooting projectiles through a portal is ineffective.

        If multiple creatures attempt to pass through the portals simultaneously, they roll \\glossterm{initiative} to determine the first creature into the portal.
        A creature that attempts to pass through the portal in a phase where the portal was already activated stops its movement in the square with the portal.
      `,
      narrative: `
        You create a pair of portals that allow instant passage from one to the other.
      `,
      rank: 3,
      roles: ['mobility'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Giant Twinned Portals',

      functionsLike: {
        name: 'twinned portals',
        exceptThat:
          'the portals are 20 feet in diameter, and the maximum size of creatures or objects passing through the portal increases to Huge.',
      },
      narrative: `
        You create a pair of gigantic portals that allow instant passage from one to the other.
      `,
      rank: 6,
      roles: ['mobility'],
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
      roles: ['mobility'],
      type: 'Sustain (attuneable, minor)',
    },
  ],
};
