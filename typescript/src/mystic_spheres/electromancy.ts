import { MysticSphere } from '.';
import { add_tag_to_sphere } from './add_tag';
import { CONDITION_CRIT, SWIFT_FATIGUE } from './constants';

export const electromancy: MysticSphere = add_tag_to_sphere('Electricity', {
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
        hit: `
          The target takes damage equal to your \\glossterm{power}.
        `,
        targeting: `
          Make an attack vs. Reflex against something within \\shortrange.
        `,
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
      type: 'Sustain (attuneable, minor)',
    },
  ],
  spells: [
    {
      name: 'Distant Chain',

      effect: `
        Your abilities that \\glossterm{chain} can travel an extra fifteen feet between each chain.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Magnetic Chain',

      effect: `
        Your abilities that \\glossterm{chain} can chain one additional time, but only to a \\glossterm{metallic} creature or object.
        The bonus chain can travel an extra fifteen feet.
        This does not affect abilities that do not already chain.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Extra Chain',

      effect: `
        Your abilities that \\glossterm{chain} can chain one additional time.
        This does not affect abilities that do not already chain.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

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
        crit: CONDITION_CRIT,
        hit: `
          The target becomes a lightning rod as a \\glossterm{condition}.
          Abilities which \\glossterm{chain} can reach up to 60 feet to affect the target instead of the normal 15 feet.
          In addition, while it has no remaining \\glossterm{damage resistance}, it is \\vulnerable to lightning damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
          You gain a +2 accuracy bonus with this attack if the target is at least one size category larger than all other creatures and objects within 15 feet of it.
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
        crit: CONDITION_CRIT,
        hit: `
          The target is \\vulnerable to lightning damage as a \\glossterm{condition}.
          In addition, abilities which \\glossterm{chain} can reach up to 60 feet to affect the target instead of the normal 15 feet.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Lightning Bolt',

      attack: {
        hit: `\\damagerankone.`,
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
        hit: `\\damagerankthree.`,
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

      // Baseline for grasp is dr4, dr3 for one chain
      attack: {
        hit: `\\damagerankthree.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Arcing Grasp',

      // Baseline for grasp is dr7, dr5 for two chains
      attack: {
        hit: `\\damagerankfive.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
          This attack \\glossterm{chains} twice.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Stunning Discharge',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target that has no remaining \\glossterm{damage resistance} is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\medarea radius from you.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Brain-Scrambling Discharge',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target that has no remaining \\glossterm{damage resistance} is \\confused as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\medarea radius from you.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Energize',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr4 from short range, +1dr for healing buff
      effect: `
        Chose yourself or one \\glossterm{ally} within \\shortrange.
        The target regains 1d8 \\glossterm{damage resistance} plus 1d8 per 3 power.
        In addition, it is \\glossterm{impervious} to \\atElectricity attacks this round.
      `,
      rank: 3,
      scaling: { special: 'The recovery increases by 1d8 for each rank beyond 3.' },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Energize',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr7 from short range, +1dr for healing buff
      effect: `
        Chose yourself or one \\glossterm{ally} within \\shortrange.
        The target regains 4d8 \\glossterm{damage resistance} plus 1d8 per 2 power.
        In addition, it is \\glossterm{immune} to \\atElectricity attacks this round.
      `,
      rank: 6,
      scaling: { special: 'The recovery increases by 2d8 for each rank beyond 6.' },
      tags: ['Swift'],
    },

    {
      name: 'Arc',

      // short range for one chain
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: false,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Multiarc',

      // short range for one chain
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: false,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
          This attack \\glossterm{chains} twice.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Arc',

      // short range for one chain
      attack: {
        hit: `\\damagerankfive.`,
        missGlance: false,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
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
        hit: `\\damagerankthree.`,
        missGlance: false,
        targeting: `
          Make an attack vs. Fortitude against something within \\medrange.
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
        hit: `\\damageranksix.`,
        missGlance: false,
        targeting: `
          Make an attack vs. Fortitude against something within \\medrange.
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
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Chain Lightning',

      // Not obvious what correct damage scaling would be.
      attack: {
        hit: `\\damagerankthree.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          This attack can \\glossterm{chain} five times.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Electroshock',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\stunned as a \\glossterm{condition}.
          While it is below its maximum hit points, it is \\confused instead of stunned.
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
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in an area.
          If you sustained this spell this round, or if you are outside in a storm, the area is a \\largearealong, 5 ft. wide vertical line within \\longrange.
          Otherwise, it is a \\medarealong, 5 ft. wide vertical line within \\medrange.
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
        exceptThat: 'the damage increases to \\damagerankfive.',
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
        You gain a +10 foot \\glossterm{enhancement bonus} to your \\glossterm{movement speed}.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Lightning Breath',

      attack: {
        // d2 instead of d1 for attune + every other round
        hit: `\\damageranktwo.`,
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
          the damage increases to \\damagerankfive.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
      type: 'Attune',
    },

    {
      name: 'Ball Lightning',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          You create a Medium size ball of lightning in one space within \\medrange.
          The ball of lightning does not occupy space or block movement, and can move through creatures (but not solid objects) freely.
          Once during each \\glossterm{movement phase}, you can move the ball up to 30 feet in any direction, even vertically, as a \\glossterm{free action}.
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
        hit: `\\damagerankone.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you, make a \\glossterm{reactive attack} vs. Fortitude against them.
          If the target is \\glossterm{metallic} or used a \\glossterm{metallic} weapon to make the attack, you gain a \\plus2 accuracy bonus with this attack.
        `,
      },
      rank: 3,
      roles: ['attune'],
      scaling: 'accuracy',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Personal Conduction',

      attack: {
        hit: `\\damagerankfour.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you, make a \\glossterm{reactive attack} vs. Fortitude against them.
          If the target is \\glossterm{metallic} or used a \\glossterm{metallic} weapon to make the attack, you gain a \\plus2 accuracy bonus with this attack.
        `,
      },
      rank: 6,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Electrocute',

      attack: {
        // add trivial extra benefit for fun
        hit: `
          \\damagerankfour.
          If takes a \\glossterm{vital wound} from this damage that leaves it unconscious, it immediately dies.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\medrange.
        `,
      },

      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Thunderdash',

      cost: SWIFT_FATIGUE,
      attack: {
        hit: `\\damagerankone.`,
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

      // If you ignore the sustain complexity, this is a 30' line that also costs your
      // movement and can be awkwardly dodged. Sometimes the teleport is an upside, but
      // it's also sometimes a downside. dr4 is aggressive for this spell, and it might
      // need to drop to dr3.
      attack: {
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          You create a short-lived duplicate of yourself made of electricity in a space adjacent to you.
          It lasts as long as you sustain this spell.
          As a \\glossterm{movement}, you can move the duplicate up to your \\glossterm{movement speed} as long as you can see it.
          It can move freely through spaces occupied by creatures, but it cannot pass through solid objects.
          When you stop sustaining this spell, you make an attack vs. Reflex against everything in the path it took that round, and you \\glossterm{teleport} to its final location.
          You do not need \\glossterm{line of sight} or \\glossterm{line of effect} for this teleportation.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Distant Thunderdash',

      cost: SWIFT_FATIGUE,
      attack: {
        hit: `\\damagerankfour.`,
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
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\debuff{enraged} as a \\glossterm{condition}.
          Every round, it must spend a \\glossterm{standard action} to make an attack.
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
        crit: CONDITION_CRIT,
        hit: `
          Each target with no remaining \\glossterm{damage resistance} becomes \\confused as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\medrange.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Magnetic Blow',
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
      name: 'Arcing Blow',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{strike}.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        The strike \\glossterm{chains} once.
      `,
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Arcing Blow',
      functionsLike: {
        name: 'arcing blow',
        exceptThat: 'the strike deals double \\glossterm{weapon damage}.',
      },
      rank: 6,
      scaling: 'accuracy',
    },
  ],
});
