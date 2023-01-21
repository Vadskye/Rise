import { MysticSphere } from '.';

export const electromancy: MysticSphere = {
  name: 'Electromancy',
  hasImage: true,
  shortDescription: 'Create electricity to injure and stun foes.',
  sources: ['arcane', 'nature', 'pact'],
  // +2r for one chain, +3r for two chains
  // +3r for 5 chains (but half power to chained targets)
  specialRules: `
    Some spells from this mystic sphere chain between multiple targets.
    In addition, some spells from this mystic sphere gain benefits against \\glossterm{metallic} targets.

    \\spheredef{chain} A spell can specify that it chains a certain number of times.
    For each time that the spell chains, the caster may choose an additional secondary target for the spell.
    Each additional target must be within 15 feet of the previous target in the chain, starting with the spell's primary target.
    These additional targets must have \\glossterm{line of sight} to the spell's caster and \\glossterm{line of effect} to the previous target in the chain.
    However, they do not need \\glossterm{line of effect} to the spell's caster, and they can be beyond than the spell's original range.

    Unless otherwise noted in a spell's description, the secondary targets from chaining are affected by the spell in the exact same way as the primary target.
    Both creatures and objects are valid targets for chaining, but they have to be reasonably sized.
    You can't chain off of the ground.
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
        Choose one Small or smaller unattended metal object within \\medrange.
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
      name: 'Lightning Rod',

      attack: {
        hit: `
          The target takes 1d6 electricity damage.
          If it loses \\glossterm{hit points} from this damage, it is \\vulnerable to lightning damage as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 2,
      scaling: 'damage',
    },

    {
      name: 'Mighty Lightning Rod',

      attack: {
        hit: `
          The target takes 4d8 + \\glossterm{power} electricity damage.
          If it loses \\glossterm{hit points} from this damage, it is \\vulnerable to lightning damage as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 6,
      scaling: 'damage',
    },

    {
      name: 'Lightning Bolt',

      attack: {
        hit: `Each target takes 1d8 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft. wide line from you.
        `,
      },
      rank: 2,
      scaling: 'damage',
    },
    {
      name: 'Massive Lightning Bolt',

      attack: {
        hit: `Each target takes 2d8 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\hugearealong, 10 ft. wide line from you.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Electromagnetic Grasp',

      // +1r for situational +2acc
      attack: {
        hit: `The target takes 1d8 + \\glossterm{power} electricity damage.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
          You gain a +2 accuracy bonus against each \\glossterm{metallic} target.
        `,
      },
      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Mighty Electromagnetic Grasp',

      // +3r for situational +4acc, +2r for +1d
      attack: {
        hit: `The target takes 4d6 + \\glossterm{power} electricity damage.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything adjacent to you.
          You gain a +4 accuracy bonus against each \\glossterm{metallic} target.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Stunning Discharge',

      attack: {
        crit: `Creatures that have remaining damage resistance are also affected.`,
        hit: `
          Each target that has no remaining \\glossterm{damage resistance} is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea radius from you.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Brain-Scrambling Discharge',

      attack: {
        crit: `Creatures that have remaining damage resistance are also affected.`,
        hit: `
          Each target that has no remaining \\glossterm{damage resistance} is \\confused as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against all creatures in a \\medarea radius from you.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Energize',

      effect: `
        Chose yourself or one \\glossterm{ally} within \\medrange.
        The target regains 1d8 + \\glossterm{power} \\glossterm{damage resistance} and increases its \\glossterm{fatigue level} by one.
        In addition, it is \\glossterm{impervious} to electricity damage this round.
      `,
      rank: 2,
      scaling: { special: 'The recovery increases by +1d for each rank beyond 2.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Energize',

      effect: `
        Chose yourself or one \\glossterm{ally} within \\medrange.
        The target regains 4d8 + \\glossterm{power} \\glossterm{damage resistance} and increases its \\glossterm{fatigue level} by one.
        In addition, it is \\glossterm{immune} to electricity damage this round.
      `,
      rank: 6,
      scaling: { special: 'The recovery increases by +1d for each rank beyond 6.' },
      tags: ['Swift'],
    },

    {
      name: 'Arc',

      // -1r for -1d
      attack: {
        hit: `Each target takes 1d6 + \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
          This attack \\sphereterm{chains} once.
        `,
      },
      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Mighty Arc',

      // +2r for +1d, +1r to offset previous -1d, +1r for medium range
      attack: {
        hit: `Each target takes 4d6 + \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack \\sphereterm{chains} once.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Electromagnetic Arc',

      // +3r for chain, +1r for metallic accuracy, -1r for -1d
      attack: {
        hit: `Each target takes 2d6 + \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack \\sphereterm{chains} twice.
          You gain a +2 accuracy bonus against each \\glossterm{metallic} target.
          In addition, the attack can chain up to 30 feet to reach a metallic target.
        `,
      },
      rank: 4,
      scaling: 'damage',
    },

    {
      name: 'Certain Electromagnetic Arc',

      // +2r for extra +2 accuracy, +1r to offset -1d
      attack: {
        hit: `Each target takes 4d8 + \\glossterm{power} electricity damage.`,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack \\sphereterm{chains} twice.
          You gain a +4 accuracy bonus against each \\glossterm{metallic} target.
          In addition, the attack can chain up to 30 feet to reach a metallic target.
        `,
      },
      rank: 7,
      scaling: 'damage',
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

      attack: {
        hit: `
          The primary target takes 2d8 + \\glossterm{power} electricity damage.
          Each secondary target takes 2d6 + half \\glossterm{power} electricity damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          This attack can \\glossterm{chain} five times.
        `,
      },
      rank: 4,
      scaling: {
        special:
          'The damage to both the primary and secondary subjects increases by +1d for each rank beyond 5.',
      },
    },

    {
      name: 'Electroshock',

      attack: {
        hit: `
          The target takes 1d10 electricity damage.
          If it loses \\glossterm{hit points} from this damage, it is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          This attack \\sphereterm{chains} once.
        `,
      },
      rank: 3,
      scaling: 'damage',
    },

    {
      name: 'Intense Electroshock',

      attack: {
        hit: `
          Each target takes 4d6 electricity damage.
          Each creature that loses \\glossterm{hit points} from this damage, is \\confused as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          This attack \\sphereterm{chains} once.
        `,
      },
      rank: 7,
      scaling: 'damage',
    },

    {
      name: 'Call Lightning',

      attack: {
        // +1d from normal AOE due to weird area that probably just hits one person
        hit: `
          Each target takes 1d10 + half \\glossterm{power} electricity damage.
        `,
        targeting: `
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in an area.
          If you sustained this spell this round, or if you are outside in a storm, the area is a \\largearealong, 5 ft. wide vertical line within \\longrange.
          Otherwise, it is a \\medarealong, 5 ft. wide vertical line within \\medrange.
          If this spell has its area increased, only the length of the line increases.
        `,
      },
      rank: 2,
      scaling: 'damage',
      tags: ['Sustain (standard)'],
    },

    {
      name: 'Mighty Call Lightning',

      functionsLike: {
        name: 'call lightning',
        exceptThat: 'the damage increases to 4d8 + half \\glossterm{power}.',
      },
      rank: 6,
      scaling: 'damage',
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
        // +1d for attune + every other round
        hit: `Each target takes 2d6 + half \\glossterm{power} electricity damage.`,
        targeting: `
          For the duration of this spell, you can breathe electricity like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\hugearealong, 10 ft. wide line from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 3,
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Mighty Lightning Breath',

      functionsLike: {
        name: 'lightning breath',
        exceptThat: `
          the damage increases to 4d10 + \\glossterm{power}.
        `,
      },
      rank: 7,
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Ball Lightning',

      attack: {
        hit: `Each target takes 2d6 electricity damage.`,
        targeting: `
          You create a Medium size ball of lightning in one space within \\medrange.
          The ball of lightning does not occupy space or block movement, and can move through creatures (but not solid objects) freely.
          Whenever you sustain this effect, you can move the ball up to 30 feet in any direction, even vertically.
          When you create the ball, and during each of your subsequent actions, make an attack vs. Reflex with a -2 accuracy penalty against everything in its space.
          Then, if the ball is more than 120 feet from you, it disappears and this effect ends.
        `,
      },
      rank: 4,
      scaling: 'damage',
      type: 'Sustain (minor)',
    },

    {
      name: 'Personal Conduction',

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or \\glossterm{metallic} weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
        `,
      },
      rank: 3,
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Greater Personal Conduction',

      attack: {
        hit: `Each target takes 4d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or \\glossterm{metallic} weapon, make a \\glossterm{reactive attack} vs. Fortitude against them.
        `,
      },
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: 'Electrocute',

      attack: {
        // +2d from level, add trivial extra benefit for fun
        hit: `
          The target takes 4d6 + \\glossterm{power} electricity damage.
          If takes a \\glossterm{vital wound} from this damage that leaves it unconscious, it immediately dies.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange.
        `,
      },

      rank: 4,
      scaling: 'damage',
    },

    {
      name: 'Thunderdash',

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          Both your departure and arrival with this spell sound like a clap of thunder.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      scaling: 'damage',
    },

    {
      name: 'Distant Thunderdash',

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} electricity damage.`,
        targeting: `
        You teleport into an unoccupied destination on a stable surface within \\distrange.
        Both your departure and arrival with this spell sound like a clap of thunder.
        In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },

      rank: 6,
      scaling: 'damage',
    },

    {
      name: 'Short-Circuit',
      attack: {
        hit: `
          The target is \\dazed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Short-Circuit',
      attack: {
        hit: `
          The target is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Shocking Arc',
      attack: {
        hit: `
          The target takes 1d6 + half \\glossterm{power} electricity damage.
          Each creature that loses \\glossterm{hit points} from this damage is \\dazed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack \\sphereterm{chains} once.
        `,
      },
      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Intense Shocking Arc',
      attack: {
        hit: `
          Each target takes 2d8 + half \\glossterm{power} electricity damage.
          Each creature that loses \\glossterm{hit points} from this damage is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack \\sphereterm{chains} once.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Magnetic Strike',
      effect: `
        Make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        Damage dealt by the strike is electricity damage in addition to its normal damage types.
        You gain a +1 accuracy bonus against \\glossterm{metallic} targets.
      `,
      rank: 1,
      scaling: {
        3: 'The accuracy bonus increases to +2.',
        5: 'The accuracy bonus increases to +3.',
        7: 'The accuracy bonus increases to +4.',
      },
    },

    {
      name: 'Arcing Strike',
      effect: `
        Make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        Damage dealt by the strike is electricity damage in addition to its normal damage types.
        The strike \\sphereterm{chains} once.
        Damage dealt to the secondary target is exclusively electricity damage, regardless of the strike's normal damage types.
      `,
      rank: 3,
      scaling: {
        5: 'The strike chains twice.',
        7: 'The strike chains three times.',
      },
    },
  ],
  rituals: [],
};
