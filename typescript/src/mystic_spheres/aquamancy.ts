import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { BARRIER_COOLDOWN, CONDITION_CRIT, EXCEPT_NOT_DEEP } from './constants';

export const aquamancy: MysticSphere = add_tag_to_sphere("Water", {
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
        % Tiny body of water is 1 cubic foot = 7.5 gallons
        This generally means that you can create a Tiny body of water with one minute of work.
      `,
      narrative: `
        The desert air ripples with heat, scorching the group of adventurers.
        When they finally stop to rest, you conjure water from thin air, giving them all the strength to press on.
      `,
      scaling: {
        2: 'The volume created increases to five gallons.',
        // Small body of water is 2.5^3 = ~15.5 cubic feet = ~120 gallons
        4: 'The volume created increases to ten gallons. This generally means that you can create a Small body of water with one minute of work.',
        6: 'The volume created increases to twenty gallons.',
      },
      tags: ['Creation'],
    },
    {
      name: 'Aquatic Freedom',

      effect: `
        You gain a +3 \\glossterm{enhancement bonus} to the Swim skill.
      `,
      scaling: {
        2: "The bonus increases to +4.",
        4: "The bonus increases to +5.",
        6: "The bonus increases to +6.",
      },
      type: 'Attune',
    },
  ],
  spells: [
    {
      name: 'Restorative Water',

      effect: `
        While this spell is active, water can heal you.
        As a standard action, you can draw restorative power from water by drinking at least one ounce of clean water.
        % dr3l
        When you do, you regain 2d10 hit points.
        Normally, this healing cannot increase your hit points above half your maximum hit points.
        If you increase your \\glossterm{fatigue level} by one, you can ignore this limitation for one drink of water.
      `,
      rank: 1,
      scaling: { special: "The healing increases by 1d10 per rank beyond 1." },
      type: 'Attune',
    },
    {
      name: 'Cleansing Water',

      effect: `
        While this spell is active, water can purify you.
        As a standard action, you can cleanse yourself by drinking at least one ounce of clean water.
        When you do, you remove one \\glossterm{condition} affecting you.
        If you are also attuned to the \\ability{restorative water} spell, you can both regain hit points and remove a condition from the same drink of water.
      `,
      rank: 3,
      type: 'Attune',
    },
    {
      name: 'Aquatic Agility',

      effect: `
        You also gain a \\glossterm{swim speed} 10 feet slower than the \\glossterm{base speed} for your size.
        If you already have a swim speed, you gain a +10 foot \\glossterm{enhancement bonus} to your swim speed.
        While swimming, you gain a \\plus1 bonus to your Armor and Reflex defenses.
      `,
      rank: 2,
      type: 'Attune',
    },
    {
      name: 'Desiccate',

      // No penalty for the extremely rare bonus
      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          You gain a +2 accuracy bonus if the target is native to water, which is typically true for creatures with a swim speed and no land speed.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Mighty Desiccate',

      // No penalty for the extremely rare bonus
      attack: {
        hit: `
          \\damagerankseven.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          You gain a +4 accuracy bonus if the target is native to water, which is typically true for creatures with a swim speed and no land speed.
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
        Everything inside the area is \\submerged (see \\pcref{Fighting In Water}).
      `,
      rank: 2,
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Massive Aquarium',

      effect: `
        You create a self-contained body of water in a 20 foot radius cylinder-shaped \\glossterm{zone} within \\medrange.
        Everything inside the area is \\submerged (see \\pcref{Fighting In Water}).
      `,
      rank: 6,
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
          It is treated as \\submerged, which causes it to suffer penalties if it does not have a \\glossterm{swim speed}. 
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
          \\damagerankone.
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
          \\damagerankthree.
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
      name: 'Water Hammer',

      attack: {
        hit: `
          \\damageranktwo.
          If the target loses \\glossterm{hit points}, it is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus2 accuracy bonus against something within \\shortrange.
          This attack automatically fails unless you hit the target with a \\atWater ability last round.
          After you make this attack, you are \\glossterm{briefly} \\stunned.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Water Hammer',

      attack: {
        hit: `
          \\damagerankfive.
          If the target loses \\glossterm{hit points}, it is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude with a \\plus2 accuracy bonus against something within \\shortrange.
          This attack automatically fails unless you hit the target with a \\atWater ability last round.
          After you make this attack, you are \\glossterm{briefly} \\stunned.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Surfing Slam',

      // Treat this as a short range attack. Moving is sometimes good, sometimes bad.
      attack: {
        hit: `
          \\damagerankthree.
        `,
        targeting: `
          Move up to your speed with your \\glossterm{land speed} or \\glossterm{swim speed}.
          Then, make an attack vs. Fortitude against something you \\glossterm{touch}.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
    {
      name: 'Mighty Surfing Slam',

      // Treat this as a short range attack. Moving is sometimes good, sometimes bad.
      attack: {
        hit: `
          \\damageranksix.
        `,
        targeting: `
          Move up to your speed with your \\glossterm{land speed} or \\glossterm{swim speed}.
          Then, make an attack vs. Fortitude against something you \\glossterm{touch}.
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
          \\damagerankone.
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
          \\damagerankfive.
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
      cost: BARRIER_COOLDOWN,
      effect: `
          You create a \\medarealong \\glossterm{wall} of water within \\medrange.
          The wall is four inches thick.
          Sight through the wall is possible, though distorted.
          The wall provides both \\glossterm{cover} and \\glossterm{concealment} to targets on the opposite side of the wall (see \\pcref{Obstacles and Cover}).
          In addition, ranged \\glossterm{strikes} that pass through the wall take a -4 accuracy penalty.
          Creatures can pass through the wall unharmed, though it costs five extra feet of movement to move through the wall.

          The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.
      `,
      rank: 1,
      scaling: {
        3: `You can increase the area to a \\largearealong wall.`,
        5: `You can increase the area to a \\hugearealong wall.`,
        7: `The range increases to \\longrange.`,
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },
    {
      name: 'Raging River',

      // +2 ranks for sustain, +1 for Large or smaller push
      attack: {
        hit: `
          \\damageranktwo.
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
          \\damagerankone.
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
          \\damagerankfour.
          You \\glossterm{knockback} each Large or smaller target that loses \\glossterm{hit points} from this damage 10 feet vertically.
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
        You gain an aqueous \\glossterm{natural weapon} that replaces one of your \\glossterm{free hands}.
        The weapon deals 1d8 damage and has the \\atWater, \\weapontag{Long}, and \\weapontag{Resonating} tags (see \\pcref{Weapon Tags}).
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with strikes using the weapon (see \\pcref{Power}).
      `,
      narrative: `
        You grow a massive watery tentacle that extends from your body.
      `,
      rank: 1,
      tags: ['Manifestation'],
      type: 'Attune',
    },
    {
      name: 'Mass Aqueous Tentacle',

      functionsLike: {
        name: 'aqueous tentacle',
        exceptThat: `
          it affects up to five creatures of your choice from among yourself and your allies within \\medrange.
          Each target uses the higher of your \\glossterm{magical power} and its own \\glossterm{mundane power} to determine its damage with strikes using the weapon.
        `,
      },
      rank: 4,
      tags: ['Manifestation'],
      type: 'Attune (target)',
    },
    {
      name: 'Mighty Aqueous Tentacle',

      functionsLike: {
        name: 'aqueous tentacle',
        exceptThat: 'the damage dealt by the weapon increases to 2d6.',
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
        Each natural weapon deals 1d6 damage and has the \\atWater, \\weapontag{Long}, and \\weapontag{Light} tags (see \\pcref{Weapon Tags}).
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with strikes using the weapons (see \\pcref{Power}).

        Whenever you make a \\glossterm{strike} with the tentacles, you can attack with all of the tentacles at once, with each tentacle attacking a different target.
        This functions as if your attacks had the \\weapontag{Sweeping} (7) tag, with no limit on how far each secondary target must be from the primary target.
        Alternately, you can make \\glossterm{dual strikes} with the tentacles.
        If you do, your attacks have \\weapontag{Sweeping} (3) instead of \\weapontag{Sweeping} (7).
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Water Whip',

      attack: {
        hit: `
          \\damagerankone.
          If the target takes damage and your attack result beats its Fortitude defense, you can \\glossterm{push} it up to 15 feet.
        `,
        targeting: `
          Make an attack vs. Armor against one creature within \\shortrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Intense Water Whip',

      attack: {
        hit: `
          \\damagerankfive.
          If the target takes damage and your attack result beats its Fortitude defense, you can \\glossterm{push} it up to 30 feet.
        `,
        targeting: `
          Make an attack vs. Armor against one creature within \\shortrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
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
          \\item You take a -1 penalty to your Armor defense.
        \\end{itemize}

        % There must be text between an itemize block and the end of a mdframed env
        \\hypertarget{itemizespace}{}
      `,
      rank: 3,
      type: 'Attune (deep)',
    },
    {
      name: 'Efficient Aqueous Form',

      functionsLike: {
        name: "aqueous form",
        exceptThat: EXCEPT_NOT_DEEP,
      },
      rank: 6,
      type: 'Attune',
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
          \\damagerankone.
          If the target is Medium or smaller and it takes damage, you \\glossterm{knockback} it up to 15 feet horizontally (see \\pcref{Knockback Effects}).
          If the target is \\submerged, this distance is doubled and you can also move it vertically.
        `,
        targeting: 'Make an attack vs. Armor against something within \\medrange.',
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
          'the damage increases to \\damagerankfive, and the knockback distance increases to 30 feet.',
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
          \\item You are always considered to be \\submerged, so you take penalties if you do not have a swim speed (see \\pcref{Fighting In Water}).
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

      // Permanent prone is essentially the same as slowed, which is a t2 debuff.
      // Vulnerability makes up the other part of the ability's power, with damage as a
      // smaller upside.
      attack: {
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, its lower body is transformed into a puddle of water as a \\glossterm{condition}.
          This has the following effects:
          \\begin{itemize}
            \\item It has no functioning legs, causing it to be permanently \\prone. It can still slosh across the ground, but at half speed, as normal for being prone.
            \\item It is \\vulnerable to \\atCold and \\atWater abilities.
            \\item During each of your subsequent actions, if it is \\debuff{submerged} or not \\glossterm{grounded}, it takes \\damagerankfive as its body melts away.
          \\end{itemize}

          % There must be text between an itemize block and the end of a mdframed env
          \\hypertarget{itemizespace}{}
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against one creature you \\glossterm{touch}.
        `,
      },
      rank: 5,
    },
    {
      name: 'Liquify',

      attack: {
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, it is transformed into a puddle of water.
          This functions like the effect of the \\spell{liquifying grasp} spell, except that the damage increases to \\damagerankseven.
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
      name: 'Drowning Grasp',

      // The +2 accuracy basically always applies
      attack: {
        hit: `
          \\damagerankone.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against one creature you \\glossterm{touch}.
          You gain a \\plus2 accuracy bonus if the target needs to breathe and cannot breathe water.
        `,
      },
      // narrative: '',
      rank: 1,
      scaling: 'accuracy',
    },
    {
      name: 'Mighty Drowning Grasp',

      // 
      attack: {
        hit: `
          \\damagerankfour.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against one creature \\glossterm{touch}.
          You gain a \\plus2 accuracy bonus if the target needs to breathe and cannot breathe water.
        `,
      },
      // narrative: '',
      rank: 4,
      scaling: 'accuracy',
    },
  ],
});
