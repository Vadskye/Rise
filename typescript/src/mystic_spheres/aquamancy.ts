import { MysticSphere } from '.';
import {CONDITION_CRIT} from './constants';

export const aquamancy: MysticSphere = {
  name: 'Aquamancy',
  hasImage: true,
  shortDescription: 'Command water to crush and drown foes.',
  sources: ['domain', 'nature'],

  cantrips: [
    {
      name: 'Create Water',

      effect: `
        You create up to two gallons of wholesome, drinkable water divided among any number of locations within \\shortrange, allowing you to fill multiple small water containers.
        You must create a minimum of one ounce of water in each location.
      `,
      narrative: `
        The desert air ripples with heat, scorching the group of adventurers.
        When they finally stop to rest, you conjure water from thin air, giving them all the strength to press on.
      `,
      scaling: {
        2: 'The volume created increases to five gallons.',
        4: 'The volume created increases to ten gallons.',
        6: 'The volume created increases to twenty gallons.',
      },
      tags: ['Creation'],
    },
    {
      name: 'Manipulate Water',

      effect: `
        You change the speed of water within a \\medarea radius \\glossterm{emanation} from you by up to 5 miles per hour.
        If you decrease the water's speed to 0, you can increase it again with the remainder of your speed change and choose any direction for it to travel.
        You choose the speed change and direction when you cast this spell, and that choice persists for the duration of this effect.

        In addition to allowing you to change the direction of currents within large bodies of water, you can also use this to propel water across surfaces.
        Generally, moving water uphill costs at least 5 miles per hour of speed for every foot of elevation that you are trying to climb, which can limit your ability to move water up large distances.
      `,
      scaling: {
        3: 'You can choose to affect a \\largearea radius instead, and the maximum speed change increases to 10 miles per hour.',
        5: 'You can choose to affect a \\hugearea radius instead, and the maximum speed change increases to 15 miles per hour.',
        7: 'You can choose to affect a \\gargarea radius instead, and the maximum speed change increases to 20 miles per hour.',
      },
      type: 'Sustain (minor)',
    },
    {
      name: 'Aquatic Freedom',

      effect: `
        You gain a +3 \\glossterm{enhancement bonus} to the Swim skill.
      `,
      scaling: {
        2: `
          You also gain a \\glossterm{swim speed} 10 feet slower than the \\glossterm{base speed} for your size.
          If you already have a swim speed, you gain a +10 foot \\glossterm{enhancement bonus} to your swim speed.
        `,
        4: `
          You also gain the ability to breathe water as easily as a human breathes air, preventing you from drowning or suffocating underwater.
        `,
        6: `The Swim bonus increases to +6.`,
      },
      type: 'Attune',
    },
  ],
  spells: [
    {
      name: 'Desiccate',

      // The accuracy bonus drops damage from d3 to d2h
      attack: {
        hit: `
          \\damageranktwohigh{physical}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          You gain a +2 accuracy bonus if the target has a swim speed and is not currently touching water.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Mighty Desiccate',

      // This accuracy bonus is high enough to drop from d7 to d6h
      attack: {
        hit: `
          \\damageranksixhigh{physical}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          You gain a +4 accuracy bonus if the target has a swim speed and is not currently touching water.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },
    {
      name: 'Aquarium',

      // Don't use a standard area since this scales in scary ways with area
      // doubling.
      effect: `
        You create a self-contained pool of water in a 10 foot radius cylinder-shaped \\glossterm{zone} within \\shortrange.
        Everything inside the area is underwater (see \\pcref{Fighting While Swimming}).
      `,
      rank: 2,
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Massive Aquarium',

      effect: `
        You create a self-contained body of water in a \\medarea radius cylinder-shaped \\glossterm{zone} within \\medrange.
        Everything inside the area is underwater (see \pcref{Fighting While Swimming}).
      `,
      rank: 7,
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    // swimming is r2.5
    {
      name: 'Constraining Bubble',

      // -2 ranks for one round delay
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the majority of the target's body is surrounded by a layer of water.
          This does not restrict its ability to breathe, and has no immediate negative effects.
          However, after your action next round, the water expands to impede the target's movements.
          It is treated as \\swimming, which causes it to suffer penalties if it does not have a \\glossterm{swim speed}. 
        `,
        targeting: `
          Make an attack vs. Reflex against one Large or smaller creature within \\medrange.
        `,
      },
      rank: 5,
      tags: ['Manifestation'],
    },

    {
      name: 'Crashing Wave',

      attack: {
        hit: `
          \\damagerankone{bludgeoning}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarealong, 10 ft. wide line from you.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Crashing Wave',

      attack: {
        hit: `
          \\damagerankthree{bludgeoning}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarealong, 10 ft. wide line from you.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Aquajet Propulsion',

      // 1 rank for movement
      attack: {
        hit: `
          \\damagerankone{bludgeoning}.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange.
          Whether you hit or miss, you may \\glossterm{push} yourself up to 15 feet in a straight horizontal line away from the target.
          If you are underwater, this movement is doubled and you can also move vertically.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Intense Aquajet Propulsion',

      // 3 ranks for movement, use high power scaling
      attack: {
        hit: `
          \\damagerankfourhigh{bludgeoning}.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\medrange.
          Whether you hit or miss, you may \\glossterm{push} yourself up to 30 feet away in a straight horizontal line away from the target.
          If you are underwater, this movement is doubled and you can also move vertically.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Fountain',

      attack: {
        hit: `
          \\damagerankone{bludgeoning}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} within a \\smallarea radius from you.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Fountain',

      attack: {
        hit: `
          \\damagerankfivehigh{bludgeoning}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Armor against all \\glossterm{enemies} within a \\smallarea radius from you.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Wall of Water',

      // targeting: None,
      effect: `
          You create a \\medarealong \\glossterm{wall} of water within \\medrange.
          The wall is four inches thick.
          Sight through the wall is possible, though distorted.
          The wall provides both \\glossterm{cover} and \\glossterm{concealment} to targets on the opposite side of the wall (see \\pcref{Obstacles and Cover}).
          In addition, ranged \\glossterm{strikes} that pass through the wall take a -4 accuracy penalty.
          Creatures can pass through the wall unharmed, though it costs five extra feet of movement to move through the wall.

          The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
          After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 1,
      scaling: {
        3: `You can increase the area to a \\largearealong wall.`,
        5: `You can increase the area to a \\hugearealong wall.`,
        7: `The range increases to \\longrange.`,
      },
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Raging River',

      // +2 ranks for sustain, +1 for Large or smaller push
      attack: {
        hit: `
          \\damageranktwo{bludgeoning}.
          In addition, each Large or smaller target damaged by the attack is \\glossterm{pushed} 15 feet in the direction the water flows.
          Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
        `,
        missGlance: true,
        targeting: `
          You create a continuous river of water in a \\medarealong, 10 ft. wide line-shaped \\glossterm{zone} from you.
          The water flows in a direction that you choose when you cast the spell.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against everything in the area.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Sustain (minor)'],
    },
    {
      name: 'Geyser',

      // -1r for reflex single target area, -1r for sustain minor in tiny area?
      attack: {
        hit: `
          \\damagerankone{bludgeoning}.
        `,
        missGlance: true,
        targeting: `
          You create a geyser in a \\medarealong, 5 ft.\\ wide vertical line-shaped \\glossterm{zone} within \\shortrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in the area.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Sustain (minor)'],
    },
    {
      name: 'Mighty Geyser',

      attack: {
        hit: `
          \\damagerankfour{bludgeoning}.
        `,
        missGlance: true,
        targeting: `
          You create a geyser in a \\largearealong, 5 ft.\\ wide vertical line-shaped \\glossterm{zone} within \\shortrange.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in the area.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation', 'Sustain (minor)'],
    },
    {
      name: 'Obscuring Mist',

      effect: `
        Fog fills the air within a \\largearea radius \\glossterm{zone} from your location.
        The fog partially obstructs sight, granting \\glossterm{concealment} to anything seen through the fog (see \\pcref{Concealment}).
      `,
      rank: 1,
      scaling: {
        3: 'You can choose to create a \\hugearea radius instead.',
        5: 'You can choose to create a \\gargarea radius instead.',
        7: 'You can choose to create a 240 foot radius instead.',
      },
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Misty Halo',

      effect: `
        Fog fills the air within a \\largearea radius \\glossterm{zone} from your location.
        The fog partially obstructs sight, granting \\glossterm{concealment} to anything seen through the fog (see \\pcref{Concealment}).
        You can exclude an inner radius of any size from the area, allowing you to create fog that surrounds your location without blocking sight to things near to you.
      `,
      rank: 3,
      scaling: {
        5: 'You can choose to create a \\hugearea radius instead.',
        7: 'You can choose to create a \\gargarea radius instead.',
      },
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Misty Shroud',

      effect: `
        At the end of each round, fog \\glossterm{briefly} fills a \\medarea radius zone from you.
        This fog does not fully block sight, but it provides \\glossterm{concealment}.
        There is no time gap between the disappearance of the old fog and the appearance of the new fog, so you can keep continuous fog cover by staying in the same place or moving slowly.
      `,
      rank: 3,
      scaling: {
        5: 'When you cast this spell, you can choose to create a \\largearea radius instead.',
        7: 'When you cast this spell, you can choose to create a \\hugearea radius instead.',
      },
      type: 'Attune',
    },
    {
      name: 'Aqueous Tentacle',

      effect: `
        Choose yourself or an \\glossterm{ally} within \medrange.
        The target gains an aqueous \\glossterm{natural weapon} that replaces one of its \\glossterm{free hands}.
        It uses the higher of your \\glossterm{magical power} and its own \\glossterm{mundane power} to determine its damage with strikes using the weapon (see \\pcref{Power}).
        The weapon deals 1d8 bludgeoning damage and has the \\weapontag{Long} and \\weapontag{Sweeping} (1) weapon tags (see \\pcref{Weapon Tags}).
      `,
      narrative: `
        You grow a massive watery tentacle that extends from your body.
      `,
      rank: 2,
      tags: ['Manifestation'],
      type: 'Attune (target)',
    },
    {
      name: 'Mighty Aqueous Tentacle',

      functionsLike: {
        name: 'aqueous tentacle',
        exceptThat: 'the damage dealt by the weapon increases to 2d6. However, you can only target yourself',
      },
      narrative: `
        You grow a massive watery tentacle that extends from your body.
      `,
      rank: 6,
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Octopus Tentacles',

      effect: `
        You gain eight aqueous \\glossterm{natural weapons} that resemble tentacles.
        Each natural weapon deals 1d6 bludgeoning damage and has the \\weapontag{Long} and \\weapontag{Light} weapon tags (see \\pcref{Weapon Tags}).
        Strikes using the tentacles are considered \\magical abilities, which means you use your \\glossterm{magical power} to determine your damage instead of your \\glossterm{mundane power} (see \\pcref{Power}).

        Whenever you make a \\glossterm{strike} with the tentacles, you can attack with all of the tentacles at once, with each tentacle attacking a different target.
        This functions as if your attacks had the \\weapontag{Sweeping} (7) tag, with no limit on how far each secondary target must be from the primary target.
        Alternately, you can \\glossterm{dual wield} with the tentacles.
        If you do, your attacks have \\weapontag{Sweeping} (3) instead of \\weapontag{Sweeping} (7).
      `,
      rank: 4,
      type: 'Attune',
    },
    {
      name: 'Aqueous Form',

      effect: `
        You transform your body and equipment into water, allowing you to compress your body or contort yourself into odd shapes.
        This has the following effects:

        \\begin{itemize}
          \\par
          \\item You gain a \\glossterm{swim speed} 10 feet slower than the \\glossterm{base speed} for your size.
            If you already have a swim speed, you gain a \\plus10 foot \\glossterm{enhancement bonus} to your swim speed.
          \\item You gain a +8 \\glossterm{enhancement bonus} to the Flexibility skill. In addition, the minimum size you can squeeze down to is reduced to one inch, which can dramatically improve your ability to squeeze through tight spaces.
          \\item You gain a +4 bonus to your defenses when determining whether a \\glossterm{strike} gets a \\glossterm{critical hit} against you instead of a normal hit.
          \\item You ignore \\glossterm{difficult terrain} from all sources except for creature abilities.
        \\end{itemize}

        % There must be text between an itemize block and the end of a mdframed env
        \\hypertarget{itemizespace}{}
      `,
      rank: 3,
      type: 'Attune (deep)',
    },
    {
      name: 'Fog Cloud',

      effect: `
        A cloud of fog appears in a \\medarea radius within \\medrange.
        The fog provides \\glossterm{concealment} for everything in the area.
      `,
      rank: 2,
      scaling: {
        4: 'You can choose to create a \\largearea radius instead.',
        6: 'You can choose to create a \\hugearea radius instead.',
      },
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Solid Fog Cloud',

      effect: `
        A cloud of fog appears in a \\medarea radius within \\medrange.
        The fog provides \\glossterm{concealment} for everything in the area.
        In addition, the fog's area is \\glossterm{difficult terrain}.
      `,
      rank: 6,
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Fog Wall',

      effect: `
        You create a \\medarealong \\glossterm{wall} of fog within \\longrange.
        The fog makes it difficult to see through the wall, granting \\glossterm{concealment} to anything viewed through the wall (see \\pcref{Concealment}).

        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 1,
      scaling: {
        3: 'You can choose to create a \\largearealong wall instead.',
        5: 'You can choose to create a \\hugearealong wall instead.',
        7: 'You can choose to create a \\gargarealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Fluid Motion',

      effect: `
        When you move using one of your movement speeds, you can transform yourself into a rushing flow of water with a volume roughly equal to your normal volume until your movement is complete.
        You can only transform into water in this way once during your movement, and you return to your normal form at the end of the movement.
        In this form, you may move wherever water could go, you cannot take other actions, such as jumping, attacking, or casting spells.
        You may move through squares occupied by enemies without penalty.
        Being \\grappled or otherwise physically constrained does not prevent you from transforming into water in this way.

        Your speed is halved when moving uphill and doubled when moving downhill.
        Unusually steep inclines may cause greater movement differences while in this form.

        If the water is split, you may reform from anywhere the water has reached, to as little as a single ounce of water.
        If not even an ounce of water exists contiguously, your body reforms from all of the largest available sections of water, cut into pieces of appropriate size.
        This usually causes you to die.
      `,
      rank: 5,
      type: 'Attune',
    },
    {
      name: 'Forceful Aquajet',

      attack: {
        hit: `
          \\damagerankone{bludgeoning}.
          If the target is Medium or smaller and it takes damage, you \\glossterm{knockback} it up to 15 feet horizontally (see \\pcref{Knockback Effects}).
          If the target is underwater, this distance is doubled and you can also move it vertically.
        `,
        targeting: 'Make an attack vs. Armor against anything within \\medrange.',
      },
      // narrative: '',
      rank: 3,
      scaling: 'accuracy',
    },
    {
      name: 'Intense Forceful Aquajet',

      functionsLike: {
        name: 'forceful aquajet',
        exceptThat:
          'the damage increases to \\damagerankfivehigh{bludgeoning}, and the knockback distance increases to 30 feet.',
      },
      // narrative: '',
      rank: 7,
      scaling: 'accuracy',
    },
    {
      name: 'Personal Aquarium',

      effect: `
        You surround yourself in a bubble of water.
        This has the following effects:
        \\begin{itemize}
          \\item Your land speed is halved.
          \\item If you have a swim speed, you can use it to move around on land.
          \\item You are always considered to be \\swimming, so you take penalties if you do not have a swim speed.
          \\item The water blocks you from breathing air, but you can poke your head out of the bubble to take a breath as a \\glossterm{movement}.
          \\item You gain a +4 \\glossterm{enhancement bonus} to your \\glossterm{damage resistance}.
          \\item You gain a +2 bonus to your defenses against ranged \\glossterm{strikes}.
          \\item You gain a +2 bonus to your defenses against the \\ability{grapple} ability.
        \\end{itemize}

        % There must be text between an itemize block and the end of a mdframed env
        \\hypertarget{itemizespace}{}
      `,
      // narrative: '',
      rank: 3,
      scaling: {
        5: 'The damage resistance bonus increases to +8.',
        7: 'The damage resistance bonus increases to +16.',
      },
      type: 'Attune',
    },
    {
      name: 'Waterward',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to your \\glossterm{damage resistance}.
      `,

      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },
    {
      name: 'Mass Waterward',

      functionsLike: {
        mass: true,
        name: 'Waterward',
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: 'Attune (target)',
    },
    {
      name: 'Slippery Escapist',

      effect: `
        If you have Flexibility as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: 'Attune',
    },
    {
      name: 'Liquifying Grasp',

      attack: {
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it is transformed into a puddle of water as a \\glossterm{condition}.
          This has the following effects:
          \\begin{itemize}
            \\item If it is submerged in water or other liquid, it takes \\damagerankfour physical damage during each of your subsequent actions as it dissolves.
            \\item It is \\prone and cannot stand up.
            \\item It has no \\glossterm{free hands}, causing it to drop anything it is holding and making it unable to take any actions that require free hands.
            \\item It is unable to speak normally or use verbal or somatic \\glossterm{casting components}.
          \\end{itemize}

          % There must be text between an itemize block and the end of a mdframed env
          \\hypertarget{itemizespace}{}
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex and Fortitude against one creature you \\glossterm{touch}.
        `,
      },
      rank: 4,
    },
    {
      name: 'Liquify',

      attack: {
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it is transformed into a puddle of water.
          This functions like the effect of the \\spell{liquifying grasp} spell, except that the damage while submerged increases to \\damagerankseven.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 7,
    },
    {
      name: 'Slippery Puddle',

      attack: {
        hit: `Each target falls \\prone.`,
        targeting: `
          Make an attack vs. Reflex against all Large or smaller \\glossterm{grounded} creatures in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Drown',

      attack: {
        hit: `
          \\damagerankthree{bludgeoning}.
        `,
        targeting: `
          Make an attack vs. Fortitude and Reflex against anything within \\medrange.
          This attack automatically fails against creatures that can breathe water.
        `,
      },
      // narrative: '',
      rank: 1,
      scaling: 'accuracy',
    },
    {
      name: 'Mighty Drown',

      attack: {
        hit: `
          \\damagerankseven{bludgeoning}.
        `,
        targeting: `
          Make an attack vs. Fortitude and Reflex against anything within \\medrange.
          This attack automatically fails against creatures that can breathe water.
        `,
      },
      // narrative: '',
      rank: 4,
      scaling: 'accuracy',
    },
  ],
  rituals: [
    {
      name: 'Rainstorm',

      castingTime: 'one minute',
      effect: `
        Torrential rain begins falling out of thin air within a \\glossterm{zone} within \\longrange.
        You choose the radius of the zone, up to a maximum of a \\largearea radius.
        The rain extinguishes minor fires such as campfires and torches on contact.
        Everything in the area is \\trait{impervious} to fire damage.
      `,
      rank: 1,
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Purify Water',

      castingTime: 'one minute',
      effect: `
        You can separate out dirt, sand, salt, and similar minor pollutants from up to ten gallons of water within \\shortrange.
        The waste material moves to the edge of the water so it falls out or can be easily removed.
        This does not remove poisons, magical effects, or contaminants heavier than half a pound.
        Using this on a very large body of water is difficult, since the waste material can easily mix with the water unaffected by a single casting of this spell.
      `,
      // narrative: '',
      rank: 1,
    },
    {
      name: 'Massive Purify Water',

      functionsLike: {
        exceptThat: 'the affected volume increases to a 5-foot cube, or a little over 900 gallons.',
        name: 'purify water',
      },
      rank: 4,
      tags: [],
      castingTime: 'one minute',
    },
    {
      name: 'Dampen',

      effect: `
          Choose up to six ritual participants.
          Each target becomes \\glossterm{impervious} to fire damage.
      `,
      rank: 2,
      type: 'Attune (target)',
      castingTime: 'one minute',
    },
    {
      name: 'Water Breathing',

      castingTime: 'one minute',
      effect: `
        Choose up to six ritual participants.
        Each target gains the ability to breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
      `,
      // narrative: '',
      rank: 3,
      type: 'Attune (target)',
    },
    {
      name: 'Detect Water',

      effect: `
        You learn the approximate distance and direction to any bodies of water within \\distrange of you.
        Since this is a \\abilitytag{Detection} ability, its range can penetrate some solid objects (see \\pcref{Detection}).
        This spell can detect bodies of water with a minimum size of Fine.
      `,
      rank: 1,
      tags: ['Detection'],
      castingTime: 'one minute',
    },
    {
      name: 'Distant Detect Water',

      functionsLike: {
        exceptThat: 'the range increases to 2,000 feet.',
        name: 'detect water',
      },
      rank: 4,
      tags: ['Detection'],
      castingTime: 'one minute',
    },
    {
      name: 'Swimmers',

      castingTime: 'one minute',
      effect: `
        Choose up to six ritual participants.
        Each target gains a \\glossterm{swim speed} 10 feet slower than the \\glossterm{base speed} for its size.
      `,
      // narrative: '',
      rank: 3,
      type: 'Attune (target)',
    },
  ],
};
