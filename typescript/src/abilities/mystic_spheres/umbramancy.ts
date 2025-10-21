import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT, SWIFT_FATIGUE } from '../constants';

export const umbramancy: MysticSphere = {
  name: 'Umbramancy',
  shortDescription: 'Manipulate shadows to conceal allies and inhibit foes.',
  sources: ['arcane', 'nature'],
  // Spells that manipulate your shadow to attack enemies target Brawn/Fortitude.
  // Spells that manipulate the shadows of enemies target Mental.
  // Umbramancy spells deal flat damage, like photomancy spells.
  // To avoid excess overlap with photomancy, avoid Reflex attacks. Both umbramancy and
  // photomancy hit Fortitude, which makes sense.

  // Spells that only work vs shadowed targets have +0.5dr. Since we're dealing with flat
  // damage values, that means we can turn a +1dr modifier for normally scaling damage
  // into a full damage increment with a shadowed requirement.
  // Likewise, a spell can pay -1dr (flat) for +4a with a requirement that you are shadowed.
  // Debuffs gain -0.2 EA if they only work on shadowed enemies.
  // Alternately, debuffs can pay 1 rank to gain +2 accuracy vs shadowed creatures.
  specialRules: `
    Many spells from this sphere are particularly effective if you or the target are \\glossterm{shadowed}.
    A creature or object is shadowed if it is touching its shadow.
    That typically means it is in \\glossterm{dim illumination} or \\glossterm{bright illumination}, but not \\glossterm{brilliant illumination} or complete darkness.
    In addition, it must be \\glossterm{grounded} or otherwise touching a surface.
  `,

  cantrips: [
    {
      name: 'Shadowcloak',

      effect: `
        This spell has no \\glossterm{verbal components} or \\glossterm{somatic components}.

        You \\glossterm{briefly} gain a +3 \\glossterm{enhancement bonus} to the Stealth skill.
        If you stop being \\glossterm{shadowed} at any point, this effect immediately ends.
      `,
      roles: ['narrative'],
      scaling: {
        2: `The bonus increases to +4.`,
        4: `The bonus increases to +5.`,
        6: `The bonus increases to +6.`,
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

        \\glossterm{Bright illumination} within through one \\glossterm{zone} within \\medrange is dimmed to be no brighter than \\glossterm{dim illumination}.
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

    {
      name: 'My Shadow Looms Large',

      // r0 gives drX+1 with shadowed requirement
      attack: {
        hit: `\\damageranktwolow.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{shadowed} creatures in a \\smallarea cone from you.
        `,
      },
      roles: ['clear'],
      rank: 1,
      scaling: { special: 'The damage increases by 1d6 for each rank beyond 1.' },
    },

    {
      name: 'My Mighty Shadow Looms Large',

      // r0 gives drX+1 with shadowed requirement
      attack: {
        hit: `\\damagerankfivelow.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Fortitude against all \\glossterm{shadowed} creatures in a \\smallarea cone from you.
        `,
      },
      roles: ['clear'],
      rank: 4,
      scaling: { special: 'The damage increases by 2d8 for each rank beyond 4.' },
    },

    {
      name: 'My Shadow Hungers',

      // For power scaling damage, a rank 3 spell that makes a single attack in a r3 area
      // would deal dr1, though that's known to be suspiciously weak. Converting that to a
      // double attack that deals dr0 is... probably fine. That means the base hit damage
      // for each tick would be 53% of dr3. dr2 flat damage is 63% of dr3, which is fine
      // with a shadowed requirement.
      attack: {
        hit: `\\damageranktwolow.`,
        missGlance: true,
        targeting: `
          You create a field of dark miasma in a \\medarea radius \\glossterm{zone} from you.
          Make an attack vs. Fortitude against all \\glossterm{shadowed} \\glossterm{enemies} in the area.
          During your next action, this effect \\glossterm{repeats} in the same area.
        `,
      },
      rank: 3,
      roles: ['wildfire'],
      scaling: 'damage',
    },

    {
      name: 'My Growing Shadow Hungers',

      // For power scaling damage, a rank 6 spell that makes a single attack in a rank 3
      // area would deal dr5 (83%). That's fairly close to this spell, since you have to
      // sustain it to get a larger area. With a shadowed requirement, that's enough to
      // justify dr6l here.
      attack: {
        hit: `\\damageranksixlow.`,
        missGlance: true,
        targeting: `
          You create a spreading field of dark miasma in a \\glossterm{zone} from you.
          It affects a \\medarea radius \\glossterm{zone} in the first round, a \\largearea radius in the second round, and a \\hugearea radius in all subsequent rounds.
          Any effect which increases or changes this spell's area affects all of its areas equally, not just the area in the first round.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Fortitude against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 6,
      roles: ['wildfire'],
      scaling: { special: 'The damage increases by 3d10 for each rank beyond 6.' },
      tags: ['Sustain (standard)'],
    },

    {
      name: 'Dark Grasp',

      attack: {
        // Assume this is 50% action denial in 25% of fights, which would be 0.6 EA as a
        // condition. You can get 0.6 EA on a melee debuff at r1.
        // Melee range is drX+2, and debuff is drX+1, so shadowed lets us keep drX+1.
        hit: `
          \\damageranktwolow.
        `,
        injury: `
          As a \\glossterm{condition}, the target treats all areas of \\glossterm{dim illumination} as \\glossterm{difficult terrain}.
        `,
        targeting: `
          You must be \\glossterm{shadowed} to cast this spell.
          % Normally grasp spells would require touch and a free hand, but your shadow touches
          % the target, not you.
          Make an attack vs. Brawn against something adjacent to you.
        `,
      },
      rank: 1,
      roles: ['burst', 'maim'],
      scaling: { special: 'The damage increases by 1d6 for each rank beyond 1.' },
    },

    {
      name: 'Efficient Dark Grasp',

      attack: {
        // 1.5 EA for the condition, so we need a rank 5 effect to apply it as a regular
        // condition.
        hit: `
          \\damageranksixlow, and the target treats all areas of \\glossterm{dim illumination} as \\glossterm{difficult terrain} as a \\glossterm{condition}.
        `,
        targeting: `
          You must be \\glossterm{shadowed} to cast this spell.
          Make an attack vs. Brawn against something adjacent to you.
        `,
      },
      rank: 5,
      roles: ['burst', 'maim'],
      scaling: { special: 'The damage increases by 3d8 for each rank beyond 5.' },
    },

    {
      name: 'Still the Dancing Shadows',

      // Brief slowed is 2 EA ranged, so r4, or r3 shadowed.
      attack: {
        hit: `
          The target is \\glossterm{briefly} \\slowed.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{shadowed} creatures in a \\smallarea radius within \\shortrange.
        `,
      },
      rank: 3,
      roles: ['maim'],
      scaling: 'accuracy',
      tags: [],
    },

    {
      name: 'Nyctophobia',

      // Frightened by all is a 1.7 EA debuff, or 1.5 EA with the shadowed requirement, up
      // to 1.9 EA with prefire. We can drop to rank 3 with limited scope.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target becomes afraid of the dark as a \\glossterm{condition}.
          While it is \\glossterm{shadowed} and \\glossterm{injured}, it is \\frightened of all creatures.
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
        While you are \\glossterm{shadowed}, attacks against you have a 20\\% \\glossterm{failure chance}.
      `,
      narrative: `
        Your physical form becomes blurred and shifts in and out of existence.
        This is not a mere trick of the light, but an alteration of reality to make your existence more ambiguous.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune (deep)',
    },
    {
      name: 'Efficient Shadow Mantle',

      effect: `
        While you are \\glossterm{shadowed}, attacks against you have a 20\\% \\glossterm{failure chance}.
      `,
      rank: 6,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Dark Shroud',

      // Dazzled is 1.8 EA, so r3. +1r for shadowed accuracy.
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is \\dazzled as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius within \\shortrange.
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
        It can only deal damage to \\glossterm{shadowed} creatures.
        The attack is made against each target's Mental defense instead of its Armor defense.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      narrative: `
        You strike your foe's shadow instead of hitting it directly, but it takes damage just the same.
      `,
      rank: 2,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Shadowstrike',

      effect: `
        Make a \\glossterm{strike} that deals double damage.
        It can only deal damage to \\glossterm{shadowed} creatures.
        The attack is made against each target's Mental defense instead of its Armor defense.
        You use the higher of your \\glossterm{magical power} and your \\glossterm{mundane power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      narrative: `
        You strike your foe's shadow instead of hitting it directly, but it takes damage just the same.
      `,
      rank: 5,
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
        You must be \\glossterm{shadowed} to cast this spell.
        It has no \\glossterm{verbal components}.

        You teleport into an unoccupied location within \\shortrange on a stable surface that can support your weight.
        If you would not be shadowed in that location, this teleportation fails without effect.
        Unlike most teleportation effects, both your departure and arrival with this spell are silent.
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
    // Controlling movement is roughly 100% action denial for the turn, so 4 EA. Double
    // application is -2 EA??, so 2 EA. Damage is 3 EA, or r9, which drops to r7 with melee
    // only. Drop to r6 for the extra defense, then r7 again from shadowed accuracy. This
    // is all getting a bit silly, but it's plausibly within rate.
    {
      name: 'Shadow Puppet',

      attack: {
        hit: `
          \\damageranksevenlow.
        `,
        injury: `
          The target becomes \\glossterm{briefly} \\slowed.
          If it was already slowed with this effect and your attack result hits its Mental defense, you also control its movement during the next movement phase.
          It cannot take any actions during the movement phase, and as a \\glossterm{move action}, you can cause it to move up to its normal speed.
          During this movement, its movement is not reduced by being slowed.
          After this effect ends, you cannot control its movement again until it takes a \\glossterm{short rest}.

          If the target enters \\glossterm{brilliant illumination}, the effect automatically ends.
        `,
        targeting: `
          Make an attack vs. Fortitude against one \\glossterm{shadowed} creature adjacent to you.
        `,
      },
      rank: 7,
      roles: ['burst', 'maim'],
    },

    {
      name: 'Shadowform',

      effect: `
        You collapse to the ground, taking the appearance and shape of a shadow.
        This has a number of effects, as described below.
        \\begin{raggeditemize}
          \\item You are nearly flat, allowing you to pass under doors and through other narrow passages.
          Your horizontal dimensions are unchanged, and you cannot enter spaces that are more narrow than you can normally fit through.
          \\item You can freely move through space occupied by other creatures, and other creatures can freely move through your space.
          \\item While you in a space occupied by an \\glossterm{shadowed} \\glossterm{ally}, you have \\glossterm{concealment}, and you can use the \\textit{hide} ability without moving in a way that causes observers to lose sight of you (see \\pcref{Stealth}).
          \\item You gain a slow \\glossterm{climb speed}, and you can climb without using any hands.
          \\item You are always treated as being \\prone, though your movement speed is not reduced.
        \\end{raggeditemize}

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

    // TODO: maybe combine with a different more useful buff?
    // {
    //   name: 'Bend Shadow',

    //   effect: `
    //     Your shadow is naturally cast in the wrong direction, pointing towards light instead of away from it.
    //     You are considered to be \\glossterm{shadowed} if there is \\glossterm{dim illumination} or darkness within 10 feet of you, even if you would otherwise be in \\glossterm{bright illumination} or \\glossterm{brilliant illumination}.
    //     The dark area must be large enough to hold you if you were in that location.
    //   `,
    //   rank: 2,
    //   roles: ['attune'],
    //   type: 'Attune',
    // },

    {
      name: 'Shadow Cloak',

      effect: `
        You must be \\glossterm{shadowed} to cast this spell.

        All attacks against you and all \\glossterm{shadowed} allies within a \\largearea radius from you have a 20\\% \\glossterm{failure chance} this round.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks during the current phase.
      `,
      rank: 2,
      roles: ['boon', 'turtle'],
      tags: ['Swift'],
    },

    // 1.1 EA
    {
      name: 'Enduring Shadow Cloak',

      effect: `
        You must be \\glossterm{shadowed} to cast this spell.

        All attacks against all \\glossterm{shadowed} allies within a \\largearea radius from you have a 20\\% \\glossterm{failure chance} this round.
        In addition, all attacks against you \\glossterm{briefly} have a 20\\% failure chance.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks during the current phase.
      `,
      rank: 6,
      roles: ['boon', 'turtle'],
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
        hit: `The target is \\glossterm{briefly} \\frightened of you.`,
        targeting: `
          Make an attack vs. Mental against all \\glossterm{enemies} in a \\smallarea radius from you.
          In addition, all attacks against you \\glossterm{briefly} have a 20\\% \\glossterm{failure chance}.
          Since this ability does not have the \\abilitytag{Swift} tag, it does not affect attacks against you during the current phase.
        `,
      },
      rank: 2,
      roles: ['generator'],
      scaling: 'accuracy',
    },
    {
      name: 'Shadowfeed',
      effect: `
        At the end of each round, if you are \\glossterm{shadowed}, you regain \\hprankone.
      `,
      rank: 4,
      roles: ['attune', 'healing'],
      scaling: 'healing',
      type: 'Attune (deep)',
    },

    {
      name: 'Greater Shadowfeed',
      effect: `
        At the end of each round, if you are \\glossterm{shadowed}, you regain \\hprankfour.
      `,
      rank: 6,
      roles: ['attune', 'healing'],
      scaling: 'healing',
      type: 'Attune (deep)',
    },
    // Should be a rank 3 spell, -1r for delay
    {
      name: 'Whispers in the Dark',
      attack: {
        hit: `
          The target suffers no immediate effect.
          At the end of the next round, if it is \\glossterm{shadowed}, it becomes \\glossterm{briefly} \\frightened by all creatures.
        `,
        targeting: `
          Make an attack vs. Mental against up to two creatures within \\medrange.
        `,
      },
      rank: 2,
      roles: ['softener'],
      scaling: 'accuracy',
      tags: ['Emotion', 'Auditory'],
    },
    {
      name: 'Sever Shadow',
      effect: `
        You separate your shadow from your body so you can control it independently.
        As a \\glossterm{move action}, you can move your shadow using your climb speed or walk speed.
        It can fit through any gap that allows light to pass through, such as under a door.
        Each time you move your shadow, it frays.
        You can move it up to five times before this effect ends.

        If either you or your shadow ever stops being \\glossterm{shadowed}, this effect ends.
        Your shadow is constantly hiding and requires a \\glossterm{difficulty value} 15 Awareness check to notice.
        That check is modified by all normal Awareness modifiers to notice a hiding creature, such as requiring cover or concealment.

        At the start of each round, you choose whether you see from your shadow or from your body.
        While viewing through your shadow, your observation ability is the same as your normal body, except that it does not share the benefits of any \\magical effects that improve your vision.
        You otherwise act normally, though you may have difficulty moving or taking actions if the shadow cannot see your body or your intended targets, effectively making you \\blinded.
      `,
      rank: 5,
      roles: ['narrative'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Greater Sever Shadow',
      functionsLike: {
        name: 'sever shadow',
        exceptThat: `
          when the effect ends, you can choose to \\glossterm{teleport} to the location of your shadow.
          You do not need \\glossterm{line of sight} or \\glossterm{line of effect} to your shadow.
        `,
      },
      rank: 7,
      roles: ['mobility', 'narrative'],
      type: 'Sustain (minor)',
    },
    // +1dr for shadowed + cannot be shadowed downside would give dr5l.
    {
      name: 'Devouring Shadow',
      attack: {
        hit: `\\damagerankfivelow, and any \\glossterm{extra damage} is doubled.`,
        targeting: `
          You must be \\glossterm{shadowed} to cast this spell.
          After you cast this spell, you \\glossterm{briefly} cannot be \\glossterm{shadowed} for any reason.

          Make an attack vs. Fortitude against a creature within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Devouring Shadow',
      functionsLike: {
        name: 'devouring shadow',
        exceptThat: 'the damage increases to \\damagerankeightlow.',
      },
      rank: 7,
      roles: ['burst'],
    },

    {
      name: 'Shadowsight',
      effect: `
        You gain \\trait{low-light vision} and a \\plus2 \\glossterm{enhancement bonus} to Awareness.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +3.`,
        5: `The bonus increases to +4.`,
        7: `The bonus increases to +5.`,
      },
      type: 'Attune',
    },

    // Any two focused is 1 EA
    {
      name: 'Shadowguide',
      effect: `
        Choose up to two \\glossterm{shadowed} \\glossterm{allies} within \\medrange.
        Each target is \\focused this round.
      `,
      rank: 4,
      roles: ['boon'],
      type: 'Attune',
    },

    // All focused is 1.4 EA. Since it doesn't affect you, call it 1.2 EA.
    {
      name: 'Greater Shadowguide',
      effect: `
        All \\glossterm{shadowed} \\glossterm{allies} within a \\largearea radius of you are \\focused this round.
      `,
      rank: 7,
      roles: ['boon'],
      type: 'Attune',
    },

    {
      name: 'Meld into Shadow',
      effect: `
        You must be \\glossterm{shadowed} to cast this spell.

        Attacks against you have a 50\\% \\glossterm{failure chance} this round.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks during the current phase.
      `,
      rank: 1,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    // 1.1 EA, but conditional
    {
      name: 'Greater Meld into Shadow',
      effect: `
        You must be \\glossterm{shadowed} to cast this spell.

        Attacks against you have a 50\\% \\glossterm{failure chance} this round.
        When an attack against you fails in this way, you become \\glossterm{briefly} \\empowered.
        This ability has the \\abilitytag{Swift} tag, so it affects attacks against you during the current phase.
      `,
      rank: 5,
      roles: ['generator', 'turtle'],
      tags: ['Swift'],
    },

    // 0.7 EA for personal protection. That's not a full rank 2 effect, so say we get +1dr
    // from the combo effect. We also get the usual +1dr for unavoidable damage delay. A
    // tiny area in short range is r2. With flat damage, the +2dr brings us back to dr3.
    {
      name: 'Shadow Blossom',

      attack: {
        hit: `
          \\damageranktwolow.
        `,
        targeting: `
          You must be \\glossterm{shadowed} to cast this spell.

          When you cast this spell, you wrap yourself in shadow.
          All attacks against you \\glossterm{briefly} have a 50\\% \\glossterm{failure chance}.
          Next round, you can spend a \\glossterm{standard action} to \\glossterm{teleport} to a location within \\shortrange.
          If you do, make an attack vs. Fortitude against each \\glossterm{enemy} adjacent to you.
        `,
      },

      rank: 2,
      roles: ['clear', 'turtle'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Shadow Blossom',

      functionsLike: {
        name: 'shadow blossom',
        exceptThat:
          'the damage increases to \\damagerankfivelow, and the teleportation range increases to \\medrange.',
      },
      rank: 5,
      roles: ['clear', 'turtle'],
      scaling: 'damage',
    },
  ],
};
