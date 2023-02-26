import { MysticSphere } from '.';

export const umbramancy: MysticSphere = {
  name: 'Umbramancy',
  shortDescription: 'Manipulate shadows and darkness to conceal allies and inhibit foes.',
  sources: ['arcane', 'pact'],
  specialRules: `
    \\spheredef{shadowed} A creature or object is shadowed if it is not in \\glossterm{bright illumination} or \\glossterm{brilliant illumination}.
  `,

  cantrips: [
    {
      name: 'Shadowcloak',

      effect: `
        This spell has no \\glossterm{verbal components} or \\glossterm{somatic components}.

        You \\glossterm{briefly} gain a +3 \\glossterm{magic bonus} to the Stealth skill.
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

        Light within or passing through the one \\glossterm{zone} within \\medrange is dimmed to be no brighter than \\glossterm{shadowy illumination}.
        You can choose this spell's radius, up to a maximum of a \\smallarea radius.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      scaling: {
        2: `The maximum area increases to a \\medarea radius.`,
        4: `The range increases to \\longrange.`,
        6: `The maximum area increases to a \\largearea radius.`,
      },
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
      tags: [],
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
      tags: [],
      type: 'Attune',
    },

    {
      name: 'Darklantern',

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
      tags: [],
      type: 'Attune',
    },

    {
      name: 'Darkvision',

      effect: `
        You gain \\trait{darkvision} with a 60 foot range, allowing you to see in complete darkness (see \\pcref{Darkvision}).
      `,
      rank: 1,
      scaling: {
        3: `The range increases to 90 feet.`,
        5: `The range increases to 120 feet.`,
        7: `The range increases to 180 feet.`,
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
        5: `The radius increases to 90 feet.`,
        7: `The radius increases to 120 feet.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Dark Miasma',

      attack: {
        // Shadowed requirement allows t3 area
        hit: `Each target takes \\damagerankone{cold}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{shadowed} \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Dark Miasma',

      attack: {
        // +2r for shadowed accuracy
        hit: `Each target takes \\damagerankthree{cold}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
          You gain a +4 accuracy bonus against each \\glossterm{shadowed} target.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Dark Miasma',

      attack: {
        hit: `Each target takes \\damagerankfour{cold}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{shadowed} \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Dark Miasma',

      attack: {
        hit: `Each target takes \\damageranksix{cold}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{shadowed} \\glossterm{enemies} in a \\hugearea radius from you.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Dark Grasp',

      attack: {
        // +1r for shadowed
        hit: `
          The target takes \\damageranktwo{cold}.
          If it takes damage and your attack result beats its Mental defense, it is \\shaken by you as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
          You gain a +2 accuracy bonus if the target is \\sphereterm{shadowed}.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Dark Grasp',

      functionsLike: {
        name: 'dark grasp',
        exceptThat:
          'the target is \\frightened instead of shaken, and the damage increases to \\damageranksix{cold}.',
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Creeping Darkness',

      // treat as short range med radius, which is a t3 area
      attack: {
        hit: `Each target takes \\damagerankthree{cold}.`,
        missGlance: true,
        targeting: `
          You create a field of darkness at a \\sphereterm{shadowed} location within \\shortrange.
          The area affected by the field increases over time.
          It affects a \\smallarea radius in the first round, a \\medarea radius in the second round, and a \\largearea radius in all subsequent rounds.
          Light in the area is dimmed to be no brighter than \\glossterm{shadowy illumination}.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against everything in the area.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Sustain (standard)'],
    },

    {
      name: 'Massive Creeping Darkness',

      attack: {
        hit: `Each target takes \\damagerankfive{cold}.`,
        missGlance: true,
        targeting: `
          You create a field of darkness at a \\sphereterm{shadowed} location within \\medrange.
          The area affected by the field increases over time.
          It affects a \\medarea radius in the first round, a \\largearea radius in the second round, and a \\hugearea radius in all subsequent rounds.
          Light in the area is dimmed to be no brighter than \\glossterm{shadowy illumination}.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against everything in the area.
        `,
      },
      rank: 7,
      scaling: 'accuracy',
      tags: ['Sustain (standard)'],
    },

    {
      name: 'Heed the Dark Call',

      attack: {
        // -1 range for shadowed
        hit: `
          The target feels the call of darkness as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\frightened by you.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\longrange.
          You gain a +2 accuracy bonus if the target is \\sphereterm{shadowed}.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Heed the Dark Call',

      attack: {
        // +1r for shadowed
        hit: `
          The target feels the call of darkness as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\panicked by you.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\longrange.
          You gain a +2 accuracy bonus if the target is \\sphereterm{shadowed}.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
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
        At the end of each round, if you took no actions that round and are not in \\glossterm{brilliant illumination}, you become \\trait{invisible} (see \\pcref{Invisible}).
        This invisibility ends after you take any action.
      `,
      rank: 2,
      scaling: {
        4: `Moving during the \\glossterm{movement phase} does not end your invisibility or prevent you from becoming invisible.`,
        6: `Taking \\glossterm{free actions} and \\glossterm{minor actions} does not end your invisibility or prevent you from becoming invisible.`,
      },
      type: 'Attune',
    },

    {
      name: 'Dark Shroud',

      // +1r for shadowed
      attack: {
        hit: `
          The target's eyesight is darkened as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it is \\blinded as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          You gain a +2 bonus to \\glossterm{accuracy} with the attack against each creature that is not in \\glossterm{bright illumination}.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Shadowstrike',

      effect: `
        Make a \\glossterm{strike}.
        Damage dealt by the strike is cold damage in addition to its normal damage types.
        The attack is made against each target's Reflex defense instead of its Armor defense.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      narrative: `
        You strike your foe's shadow instead of hitting it directly, but it takes damage all the same.
      `,
      rank: 3,
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Conceal',

      effect: `
        If you are \\glossterm{trained} with the Stealth skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
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
    },

    {
      name: 'Shadowstep Strike',

      functionsLike: {
        exceptThat: `
          you can also make a \\glossterm{strike} at your destination.
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
        hit: `
          The target's shadow is bound to the light as a \\glossterm{condition}.
          While it is below its maximum \\glossterm{hit points}, it treats areas of \\glossterm{shadowy illumination} and unlit areas as solid barriers.
          This means that it cannot move into them voluntarily or with forced movement effects.
          However, this condition has no effect if it enters those areas by other means, such as by \\glossterm{teleportation} or if the light around it is suddenly extinguished.
        `,
        targeting: `
          Make an attack vs. Mental against a creature within \\shortrange that is not \\sphereterm{shadowed}.
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
          The target takes \\damagerankfive{cold}.
          If it loses \\glossterm{hit points} from this damage, you steal its shadow as a \\glossterm{condition}.
          It cannot move on its own.
          As a \\glossterm{movement}, you can control its movement instead of your own.

          If the target enters \\glossterm{brilliant illumination}, the condition automatically ends.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      rank: 7,
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
          \\item You gain a \\glossterm{climb speed} 10 feet slower than the \\glossterm{base speed} for your size, and you can climb without using any hands.
          \\item You are always treated as being \\prone, though your movement speed is not reduced.
          \\item You gain a +4 \\glossterm{magic bonus} to the Stealth skill.
        \\end{itemize}

        At the end of each round, if you are in \\glossterm{bright illumination}, this effect is \\glossterm{suppressed} and you return to your normal size and shape.
        If doing so is impossible, such as if you are in a space too small to contain your body, you gain a \\glossterm{vital wound} and this effect persists \\glossterm{briefly}.
        This form offers you no special immunity to damage, as creatures can simply attack the shadow.

        You can suppress or resume this ability as a \\glossterm{free action}.
      `,
      rank: 3,
      type: 'Attune (deep)',
    },

    {
      name: 'Deep Shadowform',

      functionsLike: {
        exceptThat:
          'bright illumination does not suppress the effect. It is still suppressed by \\glossterm{brilliant illumination}.',
        name: 'Shadowform',
      },
      // narrative: '',
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: 'Wall of Darkness',

      effect: `
        You create a \\medarealong \\glossterm{wall} of darkness within \\medrange.
        The wall is visible as a solid block of darkness.
        It blocks ordinary vision and \\trait{low-light vision}, but creatures with \\trait{darkvision} can see through the wall normally.
        It does not inhibit the passage of objects or creatures.

        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 2,
      scaling: {
        4: 'You can choose to create a \\largearealong wall instead.',
        6: 'You can choose to create a \\hugearealong wall instead.',
      },
      tags: ['Barrier'],
      type: 'Sustain (attuneable, minor)',
    },
  ],
  rituals: [
    {
      name: 'Sunlight Ward',

      castingTime: 'one hour',
      effect: `
        One ritual participant is never considered to be in natural sunlight.
        This does not impair its vision, but protects it if it would otherwise suffer negative consequences for being in natural sunlight.
      `,
      rank: 3,
      type: 'Attune (target)',
    },

    {
      name: 'Conceal Trail',

      castingTime: 'one minute',
      effect: `
        Choose up to five creatures within \\medrange from among you and your \\glossterm{allies}.
        At the end of each round, the footprints, scent, and other tracks left by each target during that round are magically concealed.
        This increases the \\glossterm{difficulty value} to follow the trail by 10, but does not prevent creatures from seeing or smelling each target normally in combat.
        At the end of each round, if any target is outside of \\longrange from you, the effect is broken for that target and its trail is revealed.
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Greater Conceal Trail',

      castingTime: 'one minute',
      functionsLike: {
        exceptThat: `
          the difficulty value increase changes to 20.
        `,
        name: 'conceal trail',
      },
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Supreme Conceal Trail',

      castingTime: 'one minute',
      functionsLike: {
        exceptThat: `
          the difficulty value increase changes to 30.
        `,
        name: 'conceal trail',
      },
      rank: 6,
      type: 'Attune',
    },
  ],
};
