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
      roles: ['narrative'],
      scaling: {
        2: `The bonus increases to +4.`,
        4: `The bonus increases to +5.`,
        6: `The bonus increases to +6.`,
      },
    },

    {
      name: 'Passing Shadow',

      effect: `
        This spell has no \\glossterm{verbal components} or \\glossterm{somatic components}.

        Choose one creature within \\medrange.
        The target is \\glossterm{briefly} \\glossterm{shadowed}, regardless of the light surrounding it.
        This normally means it has \\glossterm{concealment} from attacks against it.
      `,
      roles: ['narrative'],
      scaling: {
        2: `You can choose an additional target within range.`,
        4: `The maximum range increases to \\longrange.`,
        6: `The maximum range increases to \\distrange.`,
      },
    },

  ],
  spells: [
    {
      name: 'Suppress Light',

      // Treat this as an AOE brief dazzle with Sustain (minor). That's 1.6 EA. But how do
      // you deal with this not making an attack? In theory, enemies can move out of the
      // area to avoid being affected, but if you create the area on your party then it
      // affects all enemies regardless of how spread out they are. That sounds like it's
      // worth at least 0.4 EA, for a total of 2 EA.
      effect: `
        This spell has no \\glossterm{verbal components}.

        \\glossterm{Bright illumination} within through one \\glossterm{zone} within \\medrange is dimmed to be no brighter than \\glossterm{shadowy illumination}.
        \\glossterm{Brilliant illumination} is undimmed.
        You can choose this spell's radius, up to a maximum of a \\smallarea radius.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      rank: 4,
      roles: ['flash', 'hazard'],
      scaling: {
        6: `The maximum area increases to a \\medarea radius.`,
      },
      tags: ['Visual'],
      type: 'Sustain (minor)',
    },
    // TODO: proper EA calc
    {
      name: 'Banish Light',

      effect: `
        All light within one \\glossterm{zone} within \\medrange is suppressed.
        You can choose this spell's radius, up to a maximum of a \\smallarea radius.
        Light within the area is snuffed out.
        Any object or effect which blocks light also blocks this spell's effect.
        Darkvision and similar abilities which do not require light still function within the area.
      `,
      rank: 7,
      roles: ['flash', 'hazard'],
      tags: ['Visual'],
      type: 'Sustain (minor)',
    },

    // basically the same as Suppress Light, but slightly more restrictive area generally
    {
      name: 'Darklantern',

      effect: `
        Choose one Medium or smaller \\glossterm{unattended} object within \\shortrange.
        \\glossterm{Bright illumination} within an \\glossterm{emanation} from that object is dimmed to be no brighter than \\glossterm{shadowy illumination}.
        \\glossterm{Brilliant illumination} is undimmed.
        You can choose the spell's radius, up to a maximum of a \\smallarea radius.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      rank: 3,
      roles: ['attune'],
      scaling: {
        5: `The maximum area increases to a \\medarea radius \\glossterm{emanation}.`,
        7: `The maximum area increases to a \\largearea radius \\glossterm{emanation}.`,
      },
      tags: ['Visual'],
      type: 'Attune',
    },

    {
      name: 'Darkvision',

      effect: `
        You gain \\trait{darkvision} with a 60 foot range, allowing you to see in complete darkness (see \\pcref{Darkvision}).
        If you already have darkvision, the range of your darkvision increases by 60 feet.
      `,
      rank: 1,
      roles: ['attune'],
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
      roles: ['attune'],
      type: 'Attune (target)',
    },

    {
      name: 'Reaching Shadows',

      // r0 gives drX+1, drop to drX for the accuracy bonus
      attack: {
        hit: `\\damagerankonelow.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against everything a \\smallarea cone from you.
          You gain a +2 accuracy bonus against each \\glossterm{shadowed} target.
        `,
      },
      roles: ['clear'],
      rank: 1,
      scaling: { special: 'The damage increases by +2 for each rank beyond 1.' },
    },

    {
      name: 'Mighty Reaching Shadows',

      // r0 gives drX+1, drop to drX for the accuracy bonus
      attack: {
        hit: `\\damagerankfourlow.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Mental against everything a \\smallarea cone from you.
          You gain a +2 accuracy bonus against each \\glossterm{shadowed} target.
        `,
      },
      roles: ['clear'],
      rank: 4,
      scaling: { special: 'The damage increases by 1d10 for each rank beyond 4.' },
    },

    {
      name: 'Dark Miasma',

      // area rank X is normally drX-2, or drX-1 for flat damage. Add +1dr for shadowed requirement,
      // keeping in mind that +1dr is very strong for flat damage effects. Then, drop by
      // dr1 for the double attack.
      attack: {
        hit: `\\damageranktwolow.`,
        missGlance: true,
        targeting: `
          You create a field of dark miasma in a \\medarea radius \\glossterm{zone} from you.
          When you cast this spell, and during your next action, make an attack vs. Mental against all \\glossterm{shadowed} \\glossterm{enemies} in the area.
        `,
      },
      rank: 3,
      roles: ['wildfire'],
      scaling: { special: 'The damage increases by 1d6 for each rank beyond 3.' },
    },

    {
      name: 'Spreading Dark Miasma',

      // All the same calcs as dark miasma, except that we calculate this as a large
      // radius for area purposes, and it doesn't drop by a damage rank for double attack
      // because you have to sustain it.
      attack: {
        hit: `\\damagerankfivelow.`,
        missGlance: true,
        targeting: `
          You create a spreading field of dark miasma in a \\glossterm{zone} from you.
          It affects a \\medarea radius \\glossterm{zone} in the first round, a \\largearea radius in the second round, and a \\hugearea radius in all subsequent rounds.
          Any effect which increases or changes this spell's area affects all of its areas equally, not just the area in the first round.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Mental against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 5,
      roles: ['wildfire'],
      scaling: { special: 'The damage increases by 2d8 for each rank beyond 5.' },
      tags: ['Sustain (standard)'],
    },


    {
      name: 'Dark Grasp',

      attack: {
        // Assume this is 50% action denial in 25% of fights, which would be 0.6 EA as a
        // condition. You can get 0.6 EA on a melee debuff at r1.
        // Melee range is drX+2, and debuff is drX+1, but we want to avoid X+1 with flat
        // damage. The shadowed accuracy compensates for that, so we get drX.
        hit: `
          \\damagerankonelow. If the target loses hit points, it treats all \\glossterm{shadowed} areas as \\glossterm{difficult terrain} as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Mental against something you \\glossterm{touch}.
          You gain a +2 accuracy bonus if the target is \\glossterm{shadowed}.
        `,
      },
      rank: 1,
      roles: ['burst', 'maim'],
      scaling: { special: 'The damage increases by +2 for each rank beyond 1.' },
    },

    {
      name: 'Efficient Dark Grasp',

      attack: {
        // 1.5 EA for the condition, so we need a rank 5 effect to apply it as a regular
        // condition.
        hit: `
          \\damagerankfivelow, and the target treats all \\glossterm{shadowed} areas as \\glossterm{difficult terrain} as a \\glossterm{condition}.
        `,
        targeting: `
          You must have a \\glossterm{free hand} to cast this spell.

          Make an attack vs. Mental against something you \\glossterm{touch}.
          You gain a +2 accuracy bonus if the target is \\glossterm{shadowed}.
        `,
      },
      rank: 5,
      roles: ['burst', 'maim'],
      scaling: { special: 'The damage increases by 2d8 for each rank beyond 5.' },
    },

    // -2r compared to Suppress Light because it has to start from shadowy illumination,
    // then +1r for the size scaling
    {
      name: 'Creeping Darkness',

      effect: `
        This spell has no \\glossterm{verbal components}.

        Choose a \\glossterm{shadowed} location within \\medrange.
        \\glossterm{Bright illumination} within a \\glossterm{zone} from that location is dimmed to be no brighter than \\glossterm{shadowy illumination}.
        The area of darkness increases over time.
        It affects a \\smallarea radius in the first round, a \\medarea radius in the second round, and a \\largearea radius in all subsequent rounds.
        Any effect which increases or changes this spell's area affects all of its areas equally, not just the area in the first round.

        \\glossterm{Brilliant illumination} is undimmed.
        Any object or effect which blocks light also blocks this spell's effect.
      `,
      rank: 3,
      roles: ['flash', 'hazard'],
      // TODO: unclear how this could scale
      tags: ['Sustain (minor)'],
    },

    {
      name: 'Nyctophobia',

      // Frightened by all is a 1.7 EA debuff. Creatures are usually shadowed... maybe 75% of the time,
      // so call that 1.3 EA. With prefire, that's 1.7 EA again.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target becomes afraid of the dark as a \\glossterm{condition}.
          While it is \\glossterm{shadowed} and below its maximum \\glossterm{hit points}, it is \\frightened of all creatures.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\medrange.
        `,
      },
      rank: 3,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: ['Emotion', 'Visual'],
    },

    {
      name: 'Shadow Mantle',

      effect: `
        All attacks against you have a 20\\% \\glossterm{failure chance}.
      `,
      narrative: `
        Your physical form becomes blurred and shifts in and out of existence.
        This is not a mere trick of the light, but an alteration of reality to make your existence more ambiguous.
      `,
      rank: 6,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Fade Into Darkness',

      effect: `
        At the end of each round, if you took no actions that round and are \\glossterm{shadowed}, you become \\trait{invisible} (see \\pcref{Invisible}).
        This invisibility ends after you take any action, or if you stop being shadowed.
      `,
      rank: 2,
      roles: ['attune'],
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
      roles: ['attune'],
      tags: ['Visual'],
      type: 'Attune (deep)',
    },

    {
      name: 'Dark Shroud',

      // Dazzled is 1.8 EA, so r3. +1r for shadowed accuracy.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all creatures in a \\smallarea radius within \\shortrange.
          You gain a +2 \\glossterm{accuracy} bonus with the attack against each \\glossterm{shadowed} creature.
        `,
      },
      rank: 4,
      roles: ['flash'],
      scaling: 'accuracy',
      tags: ['Visual'],
    },

    {
      name: 'Shadowstrike',

      effect: `
        Make a \\glossterm{strike}.
        The attack is made against each target's Mental defense instead of its Armor defense.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      narrative: `
        You strike your foe's shadow instead of hitting it directly, but it takes damage just the same.
      `,
      rank: 3,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Conceal',

      effect: `
        If you have Stealth as a \\glossterm{trained skill}, you gain a +3 \\glossterm{enhancement bonus} to it.
        Otherwise, you are treated as being trained in that skill.
      `,
      rank: 1,
      roles: ['attune'],
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
      roles: ['dive'],
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
      roles: ['dive'],
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
      roles: ['dive'],
      rank: 6,
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

    // Controlling movement is roughly 100% action denial for the turn, so 4 EA. Double
    // application is -2 EA, so 2 EA. Damage is 3 EA, or r9, which drops to r7 with melee
    // only. Drop to r6 for the extra defense, then r7 again from shadowed accuracy. This
    // is all getting a bit silly, but it's plausibly within rate.
    {
      name: 'Shadow Puppet',

      // basically t3? better control than immobilized, but no defense penalties
      attack: {
        hit: `
          \\damagerankseven.
          If the target loses \\glossterm{hit points} from this damage, it is \\glossterm{briefly} \\slowed.
          If it was already slowed with this effect and your attack result hits its Mental defense, you also control its movement during the next movement phase.
          It cannot take any actions during the movement phase, and as a \\glossterm{move action}, you can cause it to move up to its normal speed.
          During this movement, its movement is not reduced by being slowed.
          After this effect ends, you cannot control its movement again until it takes a \\glossterm{short rest}.

          If the target enters \\glossterm{brilliant illumination}, the effect automatically ends.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature you \\glossterm{touch}.
          You gain a +2 accuracy bonus if the target is \\glossterm{shadowed}.
        `,
      },
      rank: 7,
      roles: ['burst', 'maim'],
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
      roles: ['attune'],
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
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Wall of Darkness',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\smallarealong \\glossterm{wall} of darkness within \\medrange.
        The wall is visible as a solid block of darkness.
        It blocks ordinary vision and \\trait{low-light vision}, but creatures with \\trait{darkvision} can see through the wall normally.
        It does not inhibit the passage of objects or creatures.
      `,
      rank: 2,
      roles: ['hazard'],
      scaling: {
        4: 'You can choose to create a \\medarealong wall instead.',
        6: 'You can choose to create a \\largearealong wall instead.',
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
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    // 20% failure chance is 20% action denial, and two targets would plausibly affect 75%
    // of enemy actions. So this is worth about 0.6 EA. Throw in empower to get it to 0.8
    // EA.
    {
      name: 'Shared Shadow Cloak',

      effect: `
        Choose one ally within \\medrange.
        All attacks against you and the target have a 20\\% \\glossterm{failure chance} this round.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks during the current phase.
        If you are currently \\glossterm{shadowed}, you are also \\glossterm{briefly} \\empowered.
      `,
      rank: 1,
      roles: ['boon'],
      tags: ['Swift'],
    },

    {
      name: 'Enduring Shadow Cloak',

      // If this affects you twice, it's about 50% in round 1 and 50% in round 2, so 4 *
      // 0.2 = 0.8 EA. Empowerment gets this a bit higher.
      effect: `
        All attacks against you \\glossterm{briefly} have a 20\\% \\glossterm{failure chance}.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks during the current phase.
        If you are currently \\glossterm{shadowed}, you are also \\glossterm{briefly} \\empowered.
      `,
      rank: 3,
      roles: ['focus'],
      tags: ['Swift'],
    },

    {
      name: 'Become One With Shadow',

      // 50% action denial against 50% of enemy attacks = 1 EA.
      effect: `
        All attacks against you have a 50\\% \\glossterm{failure chance} this round.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks during the current phase.
        If you are currently \\glossterm{shadowed}, you are also \\glossterm{briefly} \\empowered.
      `,
      rank: 6,
      roles: ['focus'],
      tags: ['Swift'],
    },

    {
      // Personal 20% failure is about 0.4 EA. That gives room for 1 EA of debuff at a
      // base area rank of r0. Brief frighten is 0.6 EA, so we have +3 area ranks to
      // spend, reaching r3 area. 
      name: 'Fearsome Shadow Cloak',
      attack: {
        hit: `Each target is \\glossterm{briefly} \\frightened of you.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
          In addition, all attacks against you \\glossterm{briefly} have a 20\\% \\glossterm{failure chance}.
          Since this ability does not have the \\abilitytag{Swift} tag, it does not affect attacks against you during the current phase.
        `,
      },
      rank: 2,
      roles: ['generator'],
    },
  ],
};
