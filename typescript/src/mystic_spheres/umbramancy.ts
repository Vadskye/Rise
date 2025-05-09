import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT, EXCEPT_NOT_DEEP, SWIFT_FATIGUE } from './constants';

export const umbramancy: MysticSphere = {
  name: 'Umbramancy',
  shortDescription: 'Manipulate shadows and darkness to conceal allies and inhibit foes.',
  sources: ['arcane', 'nature'],
  // Spells that only work vs shadowed targets have +2r. (so dr5 damage at r3)
  // Alternately, a spell can pay -1r to get +2a vs shadowed targets, or -2r for +4a
  specialRules: `
    Many spells from this sphere are particularly effective on \\glossterm{shadowed} targets.
    A creature or object is shadowed if it is not in \\glossterm{bright illumination} or \\glossterm{brilliant illumination}.
  `,

  cantrips: [
    {
      name: 'Shadowcloak',

      effect: `
        This spell has no \\glossterm{verbal components} or \\glossterm{somatic components}.

        You \\glossterm{briefly} gain a +3 \\glossterm{enhancement bonus} to the Stealth skill.
      `,
      scaling: {
        2: `The bonus increases to +4.`,
        4: `The bonus increases to +5.`,
        6: `The bonus increases to +6.`,
      },
    },

    {
      name: 'Suppress Light',

      effect: `
        This spell has no \\glossterm{verbal components}.

        \\glossterm{Bright illumination} within or passing through the one \\glossterm{zone} within \\medrange is dimmed to be no brighter than \\glossterm{shadowy illumination}.
        \\glossterm{Brilliant illumination} is undimmed.
        You can choose this spell's radius, up to a maximum of a \\smallarea radius.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      scaling: {
        2: `The maximum area increases to a \\medarea radius.`,
        4: `The range increases to \\longrange.`,
        6: `The maximum area increases to a \\largearea radius.`,
      },
      tags: ['Visual'],
      type: 'Sustain (minor)',
    },
  ],
  spells: [
    {
      name: 'Banish Light',

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
      tags: ['Visual'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Beacon of Darkness',

      effect: `
        All light within an \\glossterm{emanation} around you is suppressed.
        You can choose this spell's radius, up to a maximum of a \\largearea radius.
        Light within or passing through the area is snuffed out.
        Any object or effect which blocks light also blocks this spell's effect.
        Darkvision and similar abilities which do not require light still function within the area.
      `,
      rank: 6,
      tags: ['Visual'],
      type: 'Attune',
    },

    {
      name: 'Darklantern',

      effect: `
        Choose one Medium or smaller \\glossterm{unattended} object within \\shortrange.
        \\glossterm{Bright illumination} within or passing through an \\glossterm{emanation} from that object is dimmed to be no brighter than \\glossterm{shadowy illumination}.
        \\glossterm{Brilliant illumination} is undimmed.
        You can choose the spell's radius, up to a maximum of a \\smallarea radius.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      rank: 1,
      scaling: {
        3: `The maximum area increases to a \\medarea radius \\glossterm{emanation}.`,
        5: `The maximum area increases to a \\largearea radius \\glossterm{emanation}.`,
        7: `The maximum area increases to a \\hugearea radius \\glossterm{emanation}.`,
      },
      tags: ['Visual'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Deep Darkness',

      effect: `
        You create a void of darkness in a \\medarea radius \\glossterm{zone} within \\medrange.
        \\glossterm{Bright illumination} and \\glossterm{brilliant illumination} within or passing through that area is dimmed to be no brighter than \\glossterm{shadowy illumination}.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      rank: 4,
      tags: [],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Absolute Darkness',

      effect: `
        You create a void of darkness in a \\medarea radius \\glossterm{zone} within \\medrange.
        \\glossterm{Bright illumination} and \\glossterm{brilliant illumination} within or passing through an \\glossterm{emanation} from that object are removed, making no light possible in the area.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      rank: 7,
      tags: ['Visual'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Darkvision',

      effect: `
        You gain \\trait{darkvision} with a 60 foot range, allowing you to see in complete darkness (see \\pcref{Darkvision}).
      `,
      rank: 1,
      scaling: {
        3: `The range increases to 75 feet.`,
        5: `The range increases to 90 feet.`,
        7: `The range increases to 120 feet.`,
      },
      type: 'Attune',
    },

    {
      name: 'Mass Darkvision',

      functionsLike: {
        mass: true,
        name: 'Darkvision',
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The range increases to 75 feet.`,
        7: `The range increases to 90 feet.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Dark Miasma',

      // -2r for shadowed requirement
      attack: {
        hit: `\\damagerankonelow.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{shadowed} \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 1,
      tags: ['Cold'],
      scaling: { special: 'The damage increases by +1 for each rank beyond 1.' },
    },

    {
      name: 'Spreading Dark Miasma',

      // -2r for shadowed requirement. Enemies-only large radius is t4. Spend the 2r on
      // damage instead of area.
      attack: {
        hit: `\\damagerankfourlow.`,
        missGlance: true,
        targeting: `
          You create a field of miasma centered on your location.
          The area affected by the miasma increases over time.
          It affects a \\medarea radius \\glossterm{zone} in the first round, a \\largearea radius in the second round, and a \\hugearea radius in all subsequent rounds.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 4,
      // 1d10 is too low, 2d10 is too high, and mixed dice are awkward. We use mixed dice
      // here grudgingly.
      scaling: { special: 'The damage increases by 2d6 for each rank beyond 4.' },
      tags: ['Cold', 'Sustain (standard)'],
    },

    {
      name: 'Mighty Dark Miasma',

      // Spend the 2r from shadowed on damage instead of area
      attack: {
        hit: `\\damagerankeightlow.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{shadowed} \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 7,
      tags: ['Cold'],
      scaling: 'accuracy',
    },

    {
      name: 'Dark Grasp',

      attack: {
        // +1r for shadowed
        hit: `
          \\damageranktwolow. If the target loses hit points, it treats all \\glossterm{shadowed} areas as \\glossterm{difficult terrain} as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
          You gain a +2 accuracy bonus if the target is \\glossterm{shadowed}.
        `,
      },
      rank: 2,
      scaling: { special: 'The damage increases by 1d6 for each rank beyond 2.' },
      tags: ['Cold'],
    },

    {
      name: 'Efficient Dark Grasp',

      attack: {
        // +1r for shadowed
        hit: `
          \\damageranksixlow. If the target loses hit points, it treats all \\glossterm{shadowed} areas as \\glossterm{difficult terrain} as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
          You gain a +2 accuracy bonus if the target is \\glossterm{shadowed}.
        `,
      },
      rank: 6,
      tags: ['Cold'],
      scaling: { special: 'The damage increases by 3d8 for each rank beyond 6.' },
    },

    {
      name: 'Creeping Darkness',

      // treat as short range med radius, which is a t3 area
      attack: {
        hit: `\\damagerankthreelow.`,
        missGlance: true,
        targeting: `
          You create a field of darkness at a \\glossterm{shadowed} location within \\shortrange.
          The area affected by the field increases over time.
          It affects a \\smallarea radius in the first round, a \\medarea radius in the second round, and a \\largearea radius in all subsequent rounds.
          Light in the area is dimmed to be no brighter than \\glossterm{shadowy illumination}.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against everything in the area.
        `,
      },
      rank: 5,
      scaling: { special: 'The damage increases by 1d10 for each rank beyond 5.' },
      tags: ['Cold', 'Sustain (minor)'],
    },

    {
      name: 'Heed the Dark Call',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target feels the call of darkness as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\frightened by you.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You gain a +4 accuracy bonus if the target is \\glossterm{shadowed}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Emotion', 'Visual'],
    },

    {
      name: 'Intense Heed the Dark Call',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target feels the call of darkness as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\panicked by you.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You gain a +4 accuracy bonus if the target is \\glossterm{shadowed}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Emotion', 'Visual'],
    },

    {
      name: 'Shadow Mantle',

      effect: `
        All \\glossterm{targeted} attacks against you have a 20\\% \\glossterm{failure chance}.
      `,
      narrative: `
        Your physical form becomes blurred and shifts in and out of existence.
        This is not a mere trick of the light, but an alteration of reality to make your existence more ambiguous.
      `,
      rank: 6,
      type: 'Attune',
    },

    {
      name: 'Fade Into Darkness',

      effect: `
        At the end of each round, if you took no actions that round and are \\glossterm{shadowed}, you become \\trait{invisible} (see \\pcref{Invisible}).
        This invisibility ends after you take any action, or if you stop being shadowed.
      `,
      rank: 2,
      tags: ['Visual'],
      type: 'Attune',
    },

    {
      name: 'Greater Fade Into Darkness',

      effect: `
        At the end of each round, if you did not take a standard action that round and are \\glossterm{shadowed}, you become \\trait{invisible} (see \\pcref{Invisible}).
        This invisibility ends after you take a standard action, or if you stop being shadowed.
      `,
      rank: 6,
      tags: ['Visual'],
      type: 'Attune (deep)',
    },

    {
      name: 'Dark Shroud',

      // +1r for shadowed
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target's eyesight is darkened as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\blinded as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You gain a +2 bonus to \\glossterm{accuracy} with the attack against each \\glossterm{shadowed} creature.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Shadowstrike',

      effect: `
        Make a \\glossterm{strike}.
        The attack is made against each target's Reflex defense instead of its Armor defense.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      narrative: `
        You strike your foe's shadow instead of hitting it directly, but it takes damage all the same.
      `,
      rank: 3,
      scaling: 'accuracy',
      tags: ['Cold'],
    },

    {
      name: 'Conceal',

      effect: `
        If you have Stealth as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      tags: [],
      type: 'Attune',
    },

    {
      name: 'Shadowstep',

      cost: SWIFT_FATIGUE,
      effect: `
        This spell has no \\glossterm{verbal components}.

        You teleport into an unoccupied location within \\shortrange on a stable surface that can support your weight.
        Unlike most teleportation effects, both your departure and arrival with this spell are silent.
        If you are in \\glossterm{bright illumination} or \\glossterm{brilliant illumination} and are not touching your shadow, this spell fails without effect.
      `,
      rank: 1,
      scaling: {
        3: `The teleportation range increases to \\medrange.`,
        5: `The teleportation range increases to \\longrange.`,
        7: `The teleportation range increases to \\distrange.`,
      },
    },

    {
      name: 'Shadowstep Slice',

      functionsLike: {
        exceptThat: `
          you can also make a \\glossterm{strike} at your destination.
          The strike is not \\abilitytag{Swift}, even if you make the teleportation Swift.
          You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
          In addition, this spell does not have \\glossterm{somatic components}.
        `,
        name: 'shadowstep',
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Shadowstep Flurry',

      functionsLike: {
        exceptThat: `
          you can also make a \\glossterm{strike} at your destination.
          The strike is not \\abilitytag{Swift}, even if you make the teleportation Swift.
          You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
          In addition, you can repeat the teleportation and strike.

          This spell does not have \\glossterm{somatic components}.
        `,
        name: 'shadowstep',
      },
      rank: 7,
    },

    // Silent move action teleportation invalidates HiPS
    // {
    //   name: "Walk the Shadow Roads",

    //   effect: `
    //     Whenever you would use your land speed to move, you can teleport horizontally between shadows instead.
    //     Teleporting a given distance costs movement equal that distance.
    //     Your destination must be on a stable surface that can support your weight.
    //     If your \\glossterm{line of sight} or \\glossterm{line of effect} to your destination are blocked, or if this teleportation would somehow otherwise place you inside a solid object, your teleportation is cancelled and you remain where you were.
    //     Areas with \\glossterm{bright illumination} block line of effect for this spell, so you are unable to teleport into or past areas of bright illumination.
    //   `,
    //   rank: 4,
    //   scaling: { 6: `You can teleport in any direction instead of just horizontally.` },
    //   type: "Attune",
    // },

    {
      name: 'Bind Shadow',

      // TODO: very ambiguous rank. It's currently scaled as r3.5, since it can provide
      // immunity to melee attackers.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target's shadow is bound to the light as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it treats areas of \\glossterm{shadowy illumination} and unlit areas as solid barriers.
          This means that it cannot move into them voluntarily or with forced movement effects.
          However, this condition has no effect if it enters those areas by other means, such as by \\glossterm{teleportation} or if the light around it is suddenly extinguished.
        `,
        targeting: `
          Make an attack vs. Mental against a creature within \\shortrange that is not \\glossterm{shadowed}.
        `,
      },
      narrative: `
        You bind your foe's shadow to the light, preventing it from entering shadowed areas.
      `,
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Shadow Puppet',

      // basically t3? better control than immobilized, but no defense penalties
      attack: {
        hit: `
          \\damagerankfive.
          If the target loses \\glossterm{hit points} from this damage, you steal its shadow as a \\glossterm{condition}.
          It cannot move on its own.
          As a \\glossterm{movement}, you can control its movement instead of your own.

          If the target enters \\glossterm{brilliant illumination}, the condition automatically ends.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 7,
      tags: ['Cold'],
    },

    {
      name: 'Shadowform',

      effect: `
        You collapse to the ground, taking the appearance and shape of a shadow.
        This has a number of effects, as described below.
        \\begin{itemize}
          \\item You are nearly flat, allowing you to pass under doors and through other narrow passages.
          Your horizontal dimensions are unchanged, and you cannot enter spaces that are more narrow than you can normally fit through.
          \\item You can freely move through space occupied by other creatures, and other creatures can freely move through your space.
          \\item You gain a slow \\glossterm{climb speed}, and you can climb without using any hands.
          \\item You are always treated as being \\prone, though your movement speed is not reduced.
          \\item You gain a +4 \\glossterm{enhancement bonus} to the Stealth skill.
        \\end{itemize}

        At the end of each round, if you are not \\glossterm{shadowed}, this effect is \\glossterm{suppressed} and you return to your normal size and shape.
        If doing so is impossible, such as if you are in a space too small to contain your body, you gain a \\glossterm{vital wound} and this effect persists \\glossterm{briefly}.
        This form offers you no special immunity to damage, as creatures can simply attack the shadow.

        You can suppress or resume this ability as a \\glossterm{free action}.
      `,
      rank: 3,
      type: 'Attune (deep)',
    },

    {
      name: 'Efficient Shadowform',

      functionsLike: {
        name: 'Shadowform',
        exceptThat: EXCEPT_NOT_DEEP,
      },
      // narrative: '',
      rank: 6,
      type: 'Attune',
    },

    {
      name: 'Wall of Darkness',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\medarealong \\glossterm{wall} of darkness within \\medrange.
        The wall is visible as a solid block of darkness.
        It blocks ordinary vision and \\trait{low-light vision}, but creatures with \\trait{darkvision} can see through the wall normally.
        It does not inhibit the passage of objects or creatures.
      `,
      rank: 2,
      scaling: {
        4: 'You can choose to create a \\largearealong wall instead.',
        6: 'You can choose to create a \\hugearealong wall instead.',
      },
      tags: ['Barrier', 'Visual'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Bend Shadow',

      effect: `
        Your shadow is naturally cast in the wrong direction, pointing towards light instead of away from it.
        You are considered to be \\glossterm{shadowed} if there is \\glossterm{shadowy illumination} or darkness within 10 feet of you, even if you would otherwise be in \\glossterm{bright illumination} or \\glossterm{brilliant illumination}.
        The dark area must be large enough to hold you if you were in that location.
      `,
      rank: 1,
      type: 'Attune',
    },
  ],
};
