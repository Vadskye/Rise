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
      roles: ['burst'],
      scaling: 'accuracy',
    },
  ],
  spells: [
    {
      name: 'Distant Chain',

      // TODO: EA math, may be too weak
      effect: `
        Your abilities that \\glossterm{chain} can travel an extra fifteen feet between each chain.
        Whenever you use an ability that chains, you can enhance it to travel an extra thirty feet between each chain instead of an extra fifteen feet.
        If you do, this ability is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    // TODO: EA math, may be too weak
    {
      name: 'Extra Chain',

      effect: `
        Your abilities that \\glossterm{chain} can chain one additional time.
        This does not affect abilities that do not already chain.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Magnetic Pull',

      // TODO: awkward weight category wording
      effect: `
        Choose one \\glossterm{unattended} \\glossterm{metallic} object within \\medrange with a \\glossterm{weight category} of Small or less.
        It flies into your hands.
        If you are unable to catch it, it drops to the ground adjacent to your space without harming you.
      `,
      rank: 1,
      roles: ['narrative'],
      scaling: {
        3: `The maximum size increases to Medium.`,
        5: `The range increases to \\longrange.`,
        7: `The maximum size increases to Large.`,
      },
    },
    {
      name: 'Lightning Rod',

      // Assume 1/3 of attacks can benefit from the vulnerability, so 3.0 / 3 = 1 EA, or
      // 1.4 from prebuff. The chaining is ambiguous but not super strong, so call it 0.2 EA.
      // That's r2, or r1 with limited scope. Then, pay one rank for accuracy, so r2.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target becomes a lightning rod as a \\glossterm{condition}.
          Abilities which \\glossterm{chain} can travel an extra 30 feet to affect it.
          In addition, while it is \\glossterm{injured}, it is \\vulnerable to \\atElectricity abilities.
        `,
        targeting: `
          Make an attack vs. Fortitude against up one creature within \\shortrange.
          This attack \\glossterm{chains} once.
          You gain a +2 accuracy bonus with this attack against each target that is at least one size category larger than all other creatures and objects within 15 feet of it.
        `,
      },
      rank: 2,
      roles: ['maim', 'softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Mass Lightning Rod',

      // Pay +1 rank for larger area. Ignoring accuracy, the base is r3, so we have r4
      // area. That's enough for a 5x chain probably.
      functionsLike: {
        name: 'lightning rod',
        exceptThat:
          'the attack \\glossterm{chains} five times, and the range increases to \\medrange.',
      },
      rank: 4,
      roles: ['flash', 'maim'],
      scaling: 'accuracy',
    },

    {
      name: 'Lightning Bolt',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearealong, 5 ft. wide line from you.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
    },
    // -1dr for extended area
    {
      name: 'Massive Lightning Bolt',

      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything in a \\hugearealong, 15 ft. wide line from you.
        `,
      },
      rank: 5,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Arcing Grasp',

      // Baseline for grasp is dr3, dr2 for one chain
      attack: {
        hit: `\\damageranktwo.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Arcing Grasp',

      // Baseline for grasp is dr6, dr5 for one chain
      attack: {
        hit: `\\damagerankfive, and any \\glossterm{extra damage} is doubled.`,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Fortitude against something you \\glossterm{touch}.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Stunning Discharge',

      // stun is 1.2 EA, +1r for area gives r3 area
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          If the target is \\glossterm{injured}, it is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\medarea radius from you.
        `,
      },
      rank: 1,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    // brief + hp stun is 1.8 EA, so r3. +1r for area gives r5 area.
    {
      name: 'Massive Stunning Discharge',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\glossterm{briefly} \\stunned.
          If it is \\glossterm{injured}, it is also \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\largearea radius from you.
        `,
      },
      rank: 4,
      roles: ['maim', 'flash'],
      scaling: 'accuracy',
    },

    {
      name: 'Energize',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr4 from short range, +1dr for healing buff
      effect: `
        Chose yourself or one \\glossterm{ally} within \\shortrange.
        The target regains 1d6 \\glossterm{hit points} plus 1d6 per 2 power.
        In addition, it is \\impervious to \\atElectricity attacks this round.
      `,
      rank: 3,
      roles: ['healing', 'boon', 'exertion'],
      // Slightly weaker scaling than dr5l, but better to keep with d6
      scaling: { special: 'The recovery increases by 2d6 for each rank beyond 3.' },
      tags: ['Swift'],
    },

    {
      name: 'Greater Energize',

      cost: 'One \\glossterm{fatigue level} from the target.',
      // dr7 from short range, +1dr for healing buff
      effect: `
        Chose yourself or one \\glossterm{ally} within \\shortrange.
        The target regains 1d6 \\glossterm{hit points} plus 1d6 per power.
        In addition, it is \\glossterm{immune} to \\atElectricity attacks this round.
      `,
      rank: 6,
      roles: ['healing', 'boon', 'exertion'],
      scaling: { special: 'The recovery increases by 6d6 for each rank beyond 6.' },
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
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Multiarc',

      // Short range, chain twice is kind of like 3 creatures in short range, so treat
      // this as r2 area.
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
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Arc',

      // short range for one chain
      attack: {
        hit: `\\damagerankfive, and any \\glossterm{extra damage} is doubled.`,
        missGlance: false,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Electromagnetic Arc',

      // +1r/-1dr for metallic effects
      attack: {
        hit: `\\damagerankthree.`,
        missGlance: false,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange.
          This attack \\glossterm{chains} twice.
          You gain a +2 accuracy bonus against each \\glossterm{metallic} target.
          In addition, the chain can travel an additional 15 feet to reach metallic targets.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Electromagnetic Arc',

      // +1r/-1dr for metallic effects
      functionsLike: {
        name: 'electromagnetic arc',
        exceptThat:
          'the damage increases to \\damageranksix, and any \\glossterm{extra damage} is doubled.',
      },
      rank: 7,
      roles: ['clear'],
      // scaling: 'accuracy',
    },

    {
      name: 'Magnetic Blade',

      effect: `
        You gain a +1 \\glossterm{enhancement bonus} to \\glossterm{accuracy} with \\glossterm{vstrikes} you make using \\glossterm{metallic} weapons against metallic targets.
      `,
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Chain Lightning',

      // Roughly a r4 area, since chains can reach beyond Medium technically
      attack: {
        hit: `\\damageranktwo.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
          This attack can \\glossterm{chain} five times.
        `,
      },
      rank: 4,
      roles: ['clear'],
      scaling: 'damage',
    },

    // Stunned as a condition is r9. Limited scope is r8, and assume metallic only is
    // worth -2r.
    {
      name: 'Short-Circuit',

      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\stunned as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one \\glossterm{metallic} creature within \\medrange.
          This attack \\glossterm{chains} once.
        `,
      },
      rank: 6,
      roles: ['softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Call Lightning',

      // -1dr for extended range sustain / single target reflex
      // TODO: redesign as attunement?
      attack: {
        hit: `
          \\damageranktwo.
        `,
        missGlance: true,
        targeting: `
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Reflex against everything in an area.
          If you sustained this spell this round, or if you are outside in a storm, the area is a \\largearealong, 5 ft. wide vertical line within \\longrange.
          Otherwise, it is a \\medarealong, 5 ft. wide vertical line within \\medrange.
        `,
      },
      rank: 3,
      // Although this technically affects an area, it will typically only hit one person,
      // so we classify it as burst instead of clear.
      roles: ['burst'],
      scaling: 'damage',
      tags: ['Sustain (standard)'],
    },

    {
      name: 'Mighty Call Lightning',

      functionsLike: {
        name: 'call lightning',
        exceptThat:
          'the damage increases to \\damagerankfive, and any \\glossterm{extra damage} is doubled.',
      },
      rank: 6,
      roles: ['burst'],
      scaling: 'damage',
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
        hit: `\\damagerankfour.`,
        missGlance: true,
        targeting: `
          For the duration of this spell, you can breathe electricity like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearealong, 5 ft. wide line from you.
          After you use breathe electricity, you \\glossterm{briefly} cannot do so again.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Mighty Lightning Breath',

      functionsLike: {
        name: 'lightning breath',
        exceptThat: `
          the damage increases to \\damagerankseven, and the area increases to a \\largearealong, 10 ft. wide line.
        `,
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Ball Lightning',

      // TODO: clean up wording
      attack: {
        hit: `\\damagerankzero.`,
        missGlance: true,
        targeting: `
          You create a Medium size ball of lightning in one space within \\medrange.
          The ball of lightning does not occupy space or block movement, and can move through creatures (but not solid objects) freely.
          You can move the ball up to 30 feet in any direction, even vertically, as a \\glossterm{minor action}.
          When you create the ball, and once during each of your actions, make an attack vs. Reflex against everything in its space.

          At the end of each round, if the ball is more than 120 feet from you, it disappears.
          You can recreate it in an unoccupied space within \\medrange as a minor action.
        `,
        // missGlance: true,
      },
      rank: 4,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune (deep)',
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
      rank: 2,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Personal Conduction',

      functionsLike: {
        name: 'personal conduction',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 5,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Electrocute',

      attack: {
        // add trivial extra benefit for fun
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
          If takes a \\glossterm{vital wound} from this damage that leaves it unconscious, it immediately dies.
        `,
        targeting: `
          Make an attack vs. Fortitude with a -4 \\glossterm{accuracy} penalty against something within \\shortrange.
        `,
      },

      rank: 2,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Electrocute',

      functionsLike: {
        name: 'electrocute',
        exceptThat: 'the damage increases to \\damagerankeight.',
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Thunderdash',

      cost: SWIFT_FATIGUE,
      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          You teleport into an unoccupied destination on a stable surface within \\shortrange.
          Both your departure and arrival with this spell sound like a clap of thunder.
          In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        `,
      },
      rank: 3,
      roles: ['clear', 'dive'],
      scaling: 'damage',
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
          As a \\glossterm{move action}, you can move the duplicate up to your \\glossterm{movement speed} as long as you can see it.
          It can move freely through spaces occupied by creatures, but it cannot pass through solid objects.
          When you stop sustaining this spell, you make an attack vs. Reflex against everything in the path it took that round, and you \\glossterm{teleport} to its final location.
          You do not need \\glossterm{line of sight} or \\glossterm{line of effect} for this teleportation.
        `,
      },
      roles: ['clear', 'dive'],
      rank: 4,
      scaling: 'damage',
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
      roles: ['clear', 'dive'],
      scaling: 'damage',
    },

    {
      name: 'Magnetic Blow',
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{strike} using a \\glossterm{metallic} weapon.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
        The strike deals double damage against \\glossterm{metallic} targets.
      `,
      rank: 4,
      roles: ['burst'],
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
      roles: ['clear'],
      scaling: 'accuracy',
    },

    // TODO: too weak?
    {
      name: 'Mighty Arcing Blow',
      functionsLike: {
        name: 'arcing blow',
        exceptThat: 'the strike deals double damage.',
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'accuracy',
    },

    {
      name: 'Charged Blade',

      effect: `
        Whenever you make a \\glossterm{strike}, you can activate this effect as a \\glossterm{minor action}.
        If you do, the strike deals 1d6 \\glossterm{extra damage} and gains the \\atElectricity tag.
        After you enhance a strike in this way, this ability is \\glossterm{dismissed}.
      `,
      rank: 1,
      roles: ['attune'],
      // Weaker scaling than Enhance Magic -- Might because strikes double more quickly.
      // TODO: actual scaling math
      scaling: {
        3: `The extra damage increases to 1d10.`,
        5: `The extra damage increases to 2d8.`,
        7: `The extra damage increases to 4d6.`,
      },
      type: 'Attune',
    },
    {
      name: 'Charge Up',

      effect: `
        When you cast this spell, and whenever you sustain it, electricity loudly arcs and crackles around you.
        When you stop sustaining this spell, you gain a benefit based on how many times you sustained it.
        \\begin{mdframedraggeditemize}
          \\item Never: You are \\empowered this round.
          \\item Once: This round, you are empowered and your abilities that \\glossterm{chain} can chain an additional time.
          \\item Two or more times: This round, you are empowered and all of your \\glossterm{targeted} abilities can chain an additional time.
        \\end{mdframedraggeditemize}
      `,
      rank: 2,
      roles: ['focus'],
      type: 'Sustain (minor)'
    },

    {
      name: 'Greater Charge Up',

      effect: `
        When you cast this spell, and whenever you sustain it, electricity loudly arcs and crackles around you.
        When you stop sustaining this spell, you gain a benefit based on how many times you sustained it.
        \\begin{mdframedraggeditemize}
          \\item Never: You are \\maximized this round.
          \\item Once: This round, you are maximized and your abilities that \\glossterm{chain} can chain an additional time.
          \\item Two or more times: This round, you are maximized and all of your \\glossterm{targeted} abilities can chain an additional time.
        \\end{mdframedraggeditemize}
      `,
      rank: 6,
      roles: ['focus'],
      type: 'Sustain (minor)'
    },

    {
      name: 'Static Shock',

      // Single target melee damage would normally be dr3, or dr2 vs all adjacent.
      // It's not clear exactly how much braced is worth vs guaranteed damage.
      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          You are \\glossterm{braced} this round.
          This is a \\atSwift effect, so it protects you from attacks during the current phase.
          In addition, whenever a creature makes a \\glossterm{melee} attack against you this round, make a \\glossterm{reactive attack} vs. Fortitude against them.
          If the target is \\glossterm{metallic} or used a \\glossterm{metallic} weapon to make the attack, you gain a \\plus2 accuracy bonus with this attack.
        `,
      },
      roles: ['turtle', 'retaliate'],
      rank: 1,
      scaling: 'damage',
      tags: ['Swift'],
    },

    {
      name: 'Mighty Static Shock',

      functionsLike: {
        name: 'static shock',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      roles: ['turtle', 'retaliate'],
      rank: 5,
      scaling: 'damage',
      tags: ['Swift'],
    },
  ],
});
