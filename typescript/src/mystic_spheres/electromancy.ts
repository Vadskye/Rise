import { MysticSphere } from '.';

export const electromancy: MysticSphere = {
  name: 'Electromancy',
  hasImage: true,
  shortDescription: 'Create electricity to injure and stun foes.',
  sources: ['arcane', 'nature', 'pact'],
  // +1r for one chain, +2r for two chains?
  specialRules: `
    Some spells from this mystic sphere \\glossterm{chain} between multiple targets.
    In addition, some spells from this mystic sphere gain benefits against \\glossterm{metallic} targets.
  `,

  cantrips: [
    {
      name: 'Spark',

      attack: {
        hit: `The target takes 2 electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against anything within \\shortrange.
        `,
      },
      scaling: {
        2: `The damage increases to 5.`,
        4: `The damage increases to 10.`,
        6: `The damage increases to 20.`,
      },
    },

    {
      name: 'Magnetize',

      effect: `
        Choose one Small or smaller \\glossterm{unattended} \\glossterm{metallic} object within \\medrange.
        It pulls itself toward metal objects within 1 foot of it.
        Smaller objects are typically pulled towards the target, while it moves itself towards larger objects.
        Once it becomes affixed to another metal object, it takes a \\glossterm{difficulty value} 10 Strength check to separate the two objects.
      `,
      scaling: {
        2: `The maximum size increases to Medium.`,
        4: `The maximum size increases to Large.`,
        6: `The maximum size increases to Huge.`,
      },
      type: 'Sustain (minor)',
    },
  ],
  spells: [
    {
      name: 'Magnetic Pull',

      effect: `
        Choose one Small or smaller \\glossterm{unattended} \\glossterm{metallic} object within \\shortrange.
        It flies into your hands.
        If you are unable to catch it, it drops to the ground adjacent to your space without harming you.
      `,
      rank: 1,
      scaling: {
        3: `The maximum size increases to Medium.`,
        5: `The range increases to \\medrange.`,
        7: `The maximum size increases to Large.`,
      },
    },
    {
      name: 'Lightning Rod',

      attack: {
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, becomes is \\vulnerable to lightning damage as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mass Lightning Rod',

      functionsLike: {
        name: 'lightning rod',
        exceptThat: 'the attack \\glossterm{chains} five times.',
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Efficient Lightning Rod',

      attack: {
        hit: `
          The target is \\vulnerable to lightning damage as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Lightning Bolt',

      attack: {
        hit: `Each target takes \\damagerankone{electricity}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft. wide line from you.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Massive Lightning Bolt',

      attack: {
        hit: `Each target takes \\damagerankthreehigh{electricity}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\hugearealong, 10 ft. wide line from you.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Arcing Grasp',

      attack: {
        hit: `The target takes \\damagerankone{electricity}.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Arcing Grasp',

      attack: {
        hit: `The target takes \\damagerankfourhigh{electricity}.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Reflex against something you \\glossterm{touch}.
          This attack \\glossterm{chains} twice.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Stunning Discharge',

      attack: {
        hit: `
          Each target that has no remaining \\glossterm{damage resistance} is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea radius from you.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Brain-Scrambling Discharge',

      attack: {
        hit: `
          Each target that has no remaining \\glossterm{damage resistance} is \\confused as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea radius from you.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Energize',

      effect: `
        Chose yourself or one \\glossterm{ally} within \\medrange.
        The target regains 1d6 \\glossterm{damage resistance} plus 1d6 per 4 power, and increases its \\glossterm{fatigue level} by one.
        In addition, it is \\glossterm{impervious} to electricity damage this round.
      `,
      rank: 3,
      scaling: { special: 'The recovery increases by 1d6 for each rank beyond 3.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Energize',

      effect: `
        Chose yourself or one \\glossterm{ally} within \\medrange.
        The target regains 1d10 \\glossterm{damage resistance} plus 1d10 per 3 power, and increases its \\glossterm{fatigue level} by one.
        In addition, it is \\glossterm{immune} to electricity damage this round.
      `,
      rank: 6,
      scaling: { special: 'The recovery increases by 1d10 for each rank beyond 6.' },
      tags: ['Swift'],
    },

    {
      name: 'Arc',

      // short range for one chain
      attack: {
        hit: `Each target takes \\damagerankone{electricity}.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Arc',

      // short range for one chain
      attack: {
        hit: `Each target takes \\damagerankfivehigh{electricity}.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Electromagnetic Arc',

      // Bunch of nonsense almost makes it as low as full AOE scaling?
      attack: {
        hit: `Each target takes \\damagerankthree{electricity}.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack \\glossterm{chains} twice.
          You gain a +2 accuracy bonus against each \\glossterm{metallic} target.
          In addition, the attack can chain up to 30 feet to reach a metallic target instead of only 15 feet.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Electromagnetic Arc',

      attack: {
        hit: `Each target takes \\damageranksix{electricity}.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack \\glossterm{chains} twice.
          You gain a +2 accuracy bonus against each \\glossterm{metallic} target.
          In addition, the attack can chain up to 30 feet to reach a metallic target.
        `,
      },
      rank: 7,
      // scaling: 'accuracy',
    },

    {
      name: 'Magnetic Blade',

      effect: `
        You gain a +1 accuracy bonus with \\glossterm{strikes} you make using \\glossterm{metallic} weapons against metallic targets.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Chain Lightning',

      // not obvious what correct damage scaling would be
      attack: {
        hit: `
          The primary target takes \\damagerankthree{electricity}.
          Each secondary target takes \\damageranktwo{electricity}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          This attack can \\glossterm{chain} five times.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Electroshock',

      attack: {
        hit: `
          The target is \\dazed as a \\glossterm{condition}.
          While it has no remaining \\glossterm{damage resistance}, it is \\stunned instead of dazed.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Electroshock',

      attack: {
        hit: `
          The target is \\stunned as a \\glossterm{condition}.
          While it has no remaining \\glossterm{damage resistance}, it is \\confused instead of stunned.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 7,
      // scaling: 'accuracy',
    },

    {
      name: 'Call Lightning',

      attack: {
        hit: `
          Each target takes \\damagerankone{electricity}.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in an area.
          If you sustained this spell this round, or if you are outside in a storm, the area is a \\largearealong, 5 ft. wide vertical line within \\longrange.
          Otherwise, it is a \\medarealong, 5 ft. wide vertical line within \\medrange.
          If this spell has its area increased, only the length of the line increases.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Sustain (standard)'],
    },

    {
      name: 'Mighty Call Lightning',

      functionsLike: {
        name: 'call lightning',
        exceptThat: 'the damage increases to \\damagerankfivehigh{electricity}.',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Sustain (standard)'],
    },

    {
      // The flavor here is a bit of a stretch, so it's behind Haste and there is no Mass
      // version.
      name: 'Lightning Speed',

      effect: `
        You gain a +10 foot \\glossterm{magic bonus} to your land speed.
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Lightning Breath',

      attack: {
        // d2 instead of d1 for attune + every other round
        hit: `Each target takes \\damageranktwo{electricity}.`,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe electricity like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\hugearealong, 10 ft. wide line from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Mighty Lightning Breath',

      functionsLike: {
        name: 'lightning breath',
        exceptThat: `
          the damage increases to \\damagerankfive{electricity}.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Ball Lightning',

      attack: {
        hit: `Each target takes \\damageranktwo{electricity}.`,
        targeting: `
          You create a Medium size ball of lightning in one space within \\medrange.
          The ball of lightning does not occupy space or block movement, and can move through creatures (but not solid objects) freely.
          Whenever you sustain this effect, you can move the ball up to 30 feet in any direction, even vertically.
          When you create the ball, and during each of your subsequent actions, make an attack vs. Reflex with a -2 accuracy penalty against everything in its space.
          Then, if the ball is more than 120 feet from you, it disappears and this effect ends.
        `,
        // missGlance: true,
      },
      rank: 4,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Personal Conduction',

      attack: {
        hit: `Each target takes \\damagerankone{electricity}.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or \\glossterm{metallic} weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Personal Conduction',

      attack: {
        hit: `Each target takes \\damagerankfour{electricity}.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or \\glossterm{metallic} weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
        `,
      },
      rank: 5,
      type: 'Attune (deep)',
    },

    {
      name: 'Electrocute',

      attack: {
        // add trivial extra benefit for fun
        hit: `
          The target takes \\damagerankfourhigh{electricity}.
          If takes a \\glossterm{vital wound} from this damage that leaves it unconscious, it immediately dies.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },

      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Thunderdash',

      attack: {
        hit: `Each target takes \\damagerankone{electricity}.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          Both your departure and arrival with this spell sound like a clap of thunder.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Charged Dash',

      attack: {
        hit: `Each target takes \\damagerankthree{electricity}.`,
        missGlance: true,
        targeting: `
          You create a short-lived duplicate of yourself made of electricity in a space adjacent to you.
          It lasts as long as you sustain this spell.
          As a \\glossterm{movement}, you can move the duplicate up to your \\glossterm{land speed} as long as you can see it.
          It can move freely through spaces occupied by creatures, but it cannot pass through solid objects.
          When you stop sustaining this spell, you make an attack vs. Reflex against everything in the path it took, and you \\glossterm{teleport} to its final location.
          You do not need \\glossterm{line of sight} or \\glossterm{line of effect} for this teleportation.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Distant Thunderdash',

      attack: {
        hit: `Each target takes \\damagerankfour{electricity}.`,
        missGlance: true,
        targeting: `
        You teleport into an unoccupied destination on a stable surface within \\distrange.
        Both your departure and arrival with this spell sound like a clap of thunder.
        In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },

      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Overcharge',
      attack: {
        hit: `
          As a \\glossterm{condition}, each target is unable to take any \\glossterm{standard actions} that do not cause it to make an attack.
          For example, it could make a \\glossterm{strike} or cast an offensive spell, but it could not heal itself or summon a creature.
        `,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
          This attack \\glossterm{chains} once.
          You gain a +2 accuracy bonus against \\glossterm{metallic} targets.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Short-Circuit',
      attack: {
        hit: `
          Each target with no remaining \\glossterm{damage resistance} becomes \\confused as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Magnetic Strike',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{strike} using a \\glossterm{metallic} weapon.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        The strike's deals double \\glossterm{weapon damage} against \\glossterm{metallic} targets.
      `,
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Arcing Strike',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{weak strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        Damage dealt by the strike is electricity damage in addition to its normal damage types.
        The strike \\glossterm{chains} once.
        Damage dealt to the secondary target is exclusively electricity damage, regardless of the strike's normal damage types.
      `,
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Arcing Strike',
      functionsLike: {
        name: 'arcing strike',
        exceptThat: "the strike is not weak.",
      },
      rank: 3,
      scaling: 'accuracy',
    },
  ],
  rituals: [],
};
