import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, INJURY_CRIT, MULTIHIT_CRIT } from '../constants';

export const telekinesis: MysticSphere = {
  name: 'Telekinesis',
  shortDescription: 'Manipulate kinetic energy at a distance.',
  sources: ['arcane', 'pact'],
  specialRules: `
    All \\abilitytag{Barrier} effects from this mystic sphere are made of telekinetic force, not physical objects.
    They can still be destroyed normally, but this makes them especially effective against \\trait{incorporeal} creatures.
    Incorporeal creatures cannot enter or pass through the barriers, and must move around them in the same way that any other creature does.
    This allows a telekinetic barrier to completely block passage in a hallway for an incorporeal creature as long as the surrounding walls are too thick for it to pass through.
  `,

  cantrips: [
    {
      name: 'Distant Hand',

      effect: `
        Choose one Medium or smaller \\glossterm{unattended} object within \\medrange.
        You can telekinetically control the target object as if you were holding it in a single extra hand.
        Your maximum modifier to \\glossterm{accuracy} and checks using the object is equal to your rank with this cantrip.

        Once per turn as a \\glossterm{free action}, you can move the target up to 15 feet in any direction, to a maximum \\glossterm{height limit} of 5 feet.
        Your \\glossterm{weight limits} are calculated as if your Strength was \\minus1, so you can carry a Small object normally or push a Medium object at half speed.
        % TODO: should this be a start of turn trigger or an "anytime" trigger?
        At the start of your turn, if the target is outside of this ability's range, this ability is \\glossterm{dismissed}.

        Although you can control the object's motion, you do not have it equipped.
        This means that a shield does not grant you its defense bonus, a magic ring does not grant its benefits to you, and so on.
      `,
      roles: ['narrative'],
      type: 'Sustain (attunable, minor)',
    },
  ],
  spells: [
    {
      name: 'Mighty Distant Hand',

      functionsLike: {
        name: 'distant hand',
        exceptThat:
          'the \\glossterm{weight limits} of the hand are calculated as if your Strength was equal to 2.',
      },
      rank: 2,
      roles: ['narrative'],
      scaling: {
        special: "For each rank beyond 2, the hand's effective Strength increases by 1.",
      },
      type: 'Sustain (attunable, minor)',
    },
    {
      name: 'Interposing Force',

      // The most dangerous scenario for this spell is that you are in the front line, and
      // suceeding on this attack prevents the target from reaching the party at all.
      // Being unable to move towards you is roughly the same as a 30' push; it's worse if
      // they are already in melee, but better if they have more than 30' of movement, so
      // call it 2 EA. The Might check is worth -2 ranks, probably.
      attack: {
        crit: 'The \\glossterm{difficulty value} increases to 10.',
        hit: `
          The target is \\briefly unable to move closer to you without effort.
          This does not impede its movement unless its movement would bring it closer to you while it is within \\medrange of you.
          As part of the movement, it can make a Might check with a \\glossterm{difficulty value} of 6.
          If it succeeds, its movement towards you costs double the normal \\glossterm{available movement}.
          Otherwise, it is unable to move towards you, and that part of its movement is wasted.
      `,
        targeting: `
          Make an attack vs. Brawn against one creature within \\medrange.
        `,
      },
      rank: 2,
      roles: ['trip'],
      scaling: 'accuracy',
    },

    {
      name: 'Intense Interposing Force',

      // At this rank, monsters are more likely to have more than 30' of movement, so this
      // is stronger than a 30' push when kiting.
      functionsLike: {
        name: 'interposing force',
        exceptThat:
          'the \\glossterm{difficulty value} of the Might check increases to 10, or to 15 on a critical hit.',
      },
      rank: 5,
      roles: ['trip'],
      scaling: 'accuracy',
    },

    {
      name: 'Kinetic Ablation',

      // 0.7 EA
      effect: `
        Whenever you cast or sustain this spell, you \\briefly take half damage from all sources.
      `,
      rank: 1,
      roles: ['turtle'],
      // narrative: '',
      type: 'Sustain (standard)',
    },

    {
      name: 'Greater Kinetic Ablation',

      // 0.4 + 0.7 EA
      effect: `
        Whenever you cast or sustain this spell, you \\briefly are \\shielded and take half damage from all sources.
      `,
      rank: 6,
      roles: ['turtle'],
      type: 'Sustain (standard)',
    },

    // This is slightly above rate because requiring objects is annoying.
    {
      name: 'Fling Object',

      // Rank 1 Spell
      // Range: Medium (mod 0)
      // Result: 1 + 0 = dr1
      // (This is slightly above rate because requiring objects is annoying)
      attack: {
        hit: `
          The target and the thrown object each take \\damagerankone.
          If you fling a Small object, you deal \\glossterm{extra damage} equal to half your \\glossterm{power}.
        `,
        targeting: `
          Choose a Tiny or Small \\glossterm{unattended} object within \\medrange.
          You fling that object at another creature or object within \\medrange of you.
          When you do, make an attack vs. Armor against the target.
          You gain a +2 accuracy bonus if you fling a Tiny object.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'damage',
    },

    // This is slightly above rate because requiring objects is annoying.
    {
      name: 'Mighty Fling Object',

      // Rank 4 Spell
      // Range: Medium (mod 0)
      // Result: 4 + 0 = dr4
      attack: {
        hit: `
          The target and the thrown object each take \\damagerankfour.
          If you fling a Medium object, you deal 2d6 \\glossterm{extra damage}.
        `,
        targeting: `
          Choose a Small or Medium \\glossterm{unattended} object within \\medrange.
          You fling that object at another creature or object within \\medrange of you.
          You gain a +2 accuracy bonus if you fling a Small object.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'damage',
    },

    {
      name: 'Force Extension',

      effect: `
        Your melee \\glossterm{strikes} gain the \\weapontag{Long} weapon tag, allowing you to attack targets up to 10 feet away from you (see \\pcref{Weapon Tags}).
      `,
      rank: 3,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Mental Reload',

      effect: `
        You can reload projectile weapons without requiring any \\glossterm{free hands}.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Kinetic Discharge',

      // Baseline would be dr3 for enemies-only Small radius. Drop to dr2 for kinetic
      // charge accuracy mechanic, increase to dr3 since the damage is delayed.
      attack: {
        hit: `
          \\damagerankthree.
        `,
        halfOnMiss: true,
        targeting: `
          You \\briefly build up energy.
          Whenever you take damage during that time, you gain a kinetic charge.

          When that effect ends, make a \\glossterm{reactive attack} vs. Brawn against all \\glossterm{enemies} in a \\smallarea radius from you.
          You gain an accuracy bonus with this attack equal to the number of kinetic charges you built up, to a maximum of +4.
          If you built up 5 or more kinetic charges, the area increases to a \\medarea radius.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Kinetic Discharge',

      functionsLike: {
        name: 'kinetic discharge',
        exceptThat: 'the damage increases to \\damageranksix.',
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'damage',
    },

    // Baseline for a double defense r0 area is drX+2, or crX+1 with drX+1. A 15' cone
    // feels partway between ranged and melee, so call a 15' push 0.8 EA. That would
    // require a rank 3 spell to get damage + debuff.
    {
      name: 'Blastwave',

      // Rank 2 Spell
      // Area: Small cone from self (R0, mod +1)
      // Effect: Double defense (+1)
      // Result: 2 + 1 + 1 = dr4
      attack: {
        hit: `
          \\damagerankfour.
        `,
        injury: `
          If the target is Large or smaller, you \\glossterm{fling} it 5 feet away from you.
        `,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against everything in a \\smallarea cone from you.
        `,
      },
      rank: 2,
      roles: ['clear', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Blastwave',

      attack: {
        hit: `
          \\damagerankseven.
        `,
        injury: `
          If the target is Huge or smaller, you \\glossterm{fling} it 15 feet away from you.
        `,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against everything in a \\smallarea cone from you.
        `,
      },
      rank: 5,
      roles: ['clear', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Massive Blastwave',

      // Rank 6 Spell
      // Area: Large cone from self (R4, mod -2)
      // Effect: Double defense (+1)
      // Result: 6 - 2 + 1 = dr5
      // (Correct debuff tier here would be 1.6 EA, so we're missing 0.7 EA of debuff value
      // with just a 15' fling. Add the size-based doubling to compensate.)
      attack: {
        hit: `
          \\damagerankfive.
        `,
        injury: `
          You \\glossterm{fling} the target 15 feet away from you.
          This fling distance is doubled if the target is Medium or smaller.
        `,
        halfOnMiss: true,
        targeting: `
          Make an attack vs. Brawn and Reflex against everything in a \\largearea cone from you.
        `,
      },
      rank: 6,
      roles: ['clear', 'maim'],
      scaling: 'damage',
    },

    // Baseline for 15' ranged push is 0.9 EA, or R-1. Increase to R0 for distance
    // extension and spend 1 rank on pure area increase to get a R5 area.
    {
      name: 'Mind Shove',
      attack: {
        crit: 'The maximum push distance increases to 30 feet.',
        hit: `
          You \\glossterm{push} each target up to 15 feet.
          Each target of this spell must be pushed in the same direction.
        `,
        targeting: `
          Make an attack vs. Brawn against everything that is Large or smaller in a \\medarea radius within \\medrange.
        `,
      },
      rank: 1,
      roles: ['flash'],
      scaling: 'accuracy',
    },

    // Baseline for 30' ranged push is r4, or r5 if we pay for extended area scaling.
    {
      name: 'Intense Mind Shove',
      attack: {
        crit: 'The maximum push distance increases to 45 feet.',
        hit: `
          You \\glossterm{push} the target up to 30 feet.
          Each target of this spell must be pushed in the same direction.
        `,
        targeting: `
          Make an attack vs. Brawn against everything that is Huge or smaller in a \\medarea radius within \\medrange.
        `,
      },
      rank: 5,
      roles: ['flash'],
      scaling: 'accuracy',
    },

    {
      name: 'Versatile Mind Shove',
      attack: {
        crit: 'The maximum push distance increases to 30 feet.',
        hit: `
          You \\glossterm{push} the target up to 15 feet.
          Each target of this spell can be pushed in a different direction of your choice.
        `,
        targeting: `
          Make an attack vs. Brawn against everything that is Large or smaller in a \\medarea radius within \\longrange.
        `,
      },
      rank: 6,
      roles: ['flash'],
      scaling: 'accuracy',
    },

    // Baseline for 15' ranged push is r-1. If we pay 2 ranks for area scaling, we get a
    // R3 area.
    {
      name: 'Mind Fling',

      attack: {
        crit: INJURY_CRIT,
        hit: `
          If the target is \\glossterm{injured}, you \\glossterm{fling} it up to 15 feet upwards or horizontally.
          Moving it upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Brawn against up to two Large or smaller creatures within \\medrange.
        `,
      },
      rank: 1,
      roles: ['maim'],
      scaling: 'accuracy',
    },

    // Baseline for a 30' ranged push is r4.
    {
      name: 'Intense Mind Fling',

      attack: {
        crit: INJURY_CRIT,
        hit: `
          If the target is \\glossterm{injured}, you \\glossterm{fling} it up to 30 feet upwards or horizontally.
          Moving it upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Brawn against up to three Huge or smaller creatures within \\medrange.
        `,
      },
      rank: 4,
      roles: ['maim'],
      scaling: 'accuracy',
    },
    {
      name: 'Telekinetic Lift',

      effect: `
        Choose yourself or one Medium or smaller \\glossterm{unattended} object within \\medrange.
        The target's weight is reduced by one \\glossterm{weight category}, which makes it easier to lift and move.
        It also gains a \\plus10 foot \\glossterm{enhancement bonus} to its maximum horizontal jump distance, if applicable (see \\pcref{Jumping}).
      `,
      rank: 1,
      roles: ['narrative'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Greater Telekinetic Lift',

      effect: `
        Choose yourself or one Large or smaller \\glossterm{unattended} object within \\medrange.
        The target's weight is reduced by two \\glossterm{weight categories}, which makes it much easier to lift and move.
        It also gains a \\plus20 foot \\glossterm{enhancement bonus} to its maximum horizontal jump distance, if applicable (see \\pcref{Jumping}).
      `,
      rank: 4,
      roles: ['narrative'],
      type: 'Sustain (standard)',
    },

    {
      name: 'Kinetic Redirection',

      // Braced is 0.5 EA, redirect is ???
      effect: `
        Whenever you cast or sustain this spell, you are \\briefly \\braced.
        In addition, whenever a creature misses you with a melee \\glossterm{strike} during that effect, it treats itself as a target of that strike in addition to any other targets.
        It cannot choose to reduce its accuracy or damage against itself.
      `,
      rank: 3,
      roles: ['turtle'],
      type: 'Sustain (standard)',
    },

    {
      name: 'Greater Kinetic Redirection',

      functionsLike: {
        name: 'kinetic redirection',
        exceptThat: 'you are also \\briefly \\shielded.',
      },
      rank: 7,
      roles: ['turtle'],
      type: 'Sustain (standard)',
    },

    {
      name: 'Levitate',

      effect: `
        You gain a slow \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Wall of Force',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\shortrange.
        The wall is visible as a shimmering magical field that does not block sight.
        Nothing can pass through the wall until it is destroyed.
        It has \\glossterm{hit points} equal to twice your \\glossterm{power}, and is destroyed when its hit points become negative.
      `,
      rank: 1,
      roles: ['barrier'],
      scaling: {
        3: "The wall's hit points increase to three times your power.",
        5: "The wall's hit points increase to four times your power.",
        7: "The wall's hit points increase to five times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Sturdy Wall of Force',

      // +1r for small -> med, +1r for 3x -> 4x
      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of force',
        exceptThat:
          'the area increases to a \\medarealong wall, and its hit points increase to four times your \\glossterm{power}.',
      },
      rank: 3,
      roles: ['barrier'],
      scaling: {
        5: "The wall's hit points increase to five times your power.",
        7: "The wall's hit points increase to six times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Massive Wall of Force',

      // +3r for small -> large, +2r for short -> long
      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of force',
        exceptThat:
          'the area increases to a \\largearealong wall within \\longrange, and its hit points increase to four times your \\glossterm{power}.',
      },
      rank: 6,
      roles: ['barrier'],
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attunable, minor)',
    },

    {
      name: 'Animated Weapon',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\magical melee \\glossterm{strike} using one weapon you hold in a single hand.
        The weapon flies out of your hand to strike at range, granting this strike the \\weapontag{Long} tag (see \\pcref{Weapon Tags}).
        It flies back into your hand after making the strike.
      `,
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    {
      name: 'Mind Arrow',

      // dr1 in long range, but a little better because it can go up to 270
      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\magical \\glossterm{strike} using an arrow as if you were shooting it from a longbow.
        As normal for a longbow, the strike deals damage equal to 1d6 \\add half your \\glossterm{power}, and your \\glossterm{range limits} with this strike are 90/270.

        The arrow must be easily accessible on your person, such as in a quiver.
        You do not have to be proficient with bows, and you do not have to manually draw the arrow.
      `,
      rank: 2,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    // dr4 is 1.75dpp.
    // Double longbow is 7 + 1dpp.
    // That's... pretty close? More generally, a double damage strike at rank 5 is
    // reasonable as a maneuver.
    {
      name: 'Mighty Mind Arrow',

      functionsLike: {
        name: 'mind arrow',
        exceptThat: 'the strike deals double damage.',
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    // Assume that you are using a Heavy weapon, and this gives you a shield.
    // That's +2 Armor and +2 Ref, which is the same as shielded. However, it doesn't
    // stack with actually using a shield, so it's a little weaker. Rank 1 is probably
    // okay.
    {
      name: 'Floating Armament',

      effect: `
        You can hold a non-\\weapontag{Heavy} weapon or shield without using a free hand.
        It functions as if you were holding it in a single hand.
        You still suffer the normal penalties if you are not proficient with it, or if it is not sized appropriately for you.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune (deep)',
    },

    {
      name: 'Heavy Floating Armament',

      effect: `
        You can hold any weapon or shield without using a free hand.
        It functions as if you were holding it in two hands if possible, or one hand otherwise.
        You still suffer the normal penalties if you are not proficient with it, or if it is not sized appropriately for you.
      `,
      rank: 3,
      roles: ['attune'],
      tags: [],
      type: 'Attune (deep)',
    },

    // Ally shielded is 0.6 EA. Ally empowered is 0.2 EA. The damage requirement means we
    // can try it at rank 5.
    {
      name: 'Kinetic Shield',

      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        The target is \\briefly \\shielded.
        During the effect, if the target takes damage, it is \\briefly \\empowered.
      `,
      rank: 2,
      roles: ['boon', 'focus', 'turtle'],
    },

    // 0.9 + 0.2 EA
    {
      name: 'Shared Kinetic Shield',

      effect: `
        Choose up to one \\glossterm{ally} within \\medrange.
        You and the target are both \\briefly \\shielded.
        During the effect, if you or the target takes damage, you are \\briefly \\empowered.
      `,
      rank: 2,
      roles: ['boon', 'focus', 'turtle'],
    },

    {
      name: 'Repulsion Field',

      // TODO: correct rank, clarify whether this triggers damage from fling
      attack: {
        crit: 'The effect lasts \\briefly on the target.',
        hit: `
          The target is unable to enter the spell's area for the rest of its turn.
          The rest of its movement is cancelled.
        `,
        targeting: `
          When you cast this spell, you create a repulsive field in a \\smallarea radius \\glossterm{zone} from your location.
          Whenever an \\glossterm{enemy} makes physical contact with the spell's area, you make a \\glossterm{reactive attack} vs. Brawn against it.
          Creatures in the area at the time that the spell is cast are unaffected by the spell.
        `,
      },
      rank: 4,
      roles: ['hazard'],
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Compression',

      attack: {
        hit: `\\damagerankthree.`,
        injury: `
          The target is \\briefly \\sickened.
        `,
        targeting: `
          Make an attack vs. Brawn against something within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Compression',

      attack: {
        hit: `\\damageranksix, and any \\glossterm{extra damage} is doubled.`,
        injury: `
          The target is \\briefly \\sickened.
        `,
        targeting: `
          Make an attack vs. Brawn against something within \\shortrange.
        `,
      },
      rank: 5,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Implosion',

      attack: {
        hit: `
          \\damagerankeight, and any \\glossterm{extra damage} is doubled.

          If the target takes a \\glossterm{vital wound} from either instance of damage that leaves it unconscious, it is crushed into a small sphere and immediately dies.
          The sphere left behind is three size categories smaller than the original creature.
        `,
        injury: `
          The target is \\sickened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Brawn against something within \\shortrange.
        `,
      },
      rank: 7,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Kinetic Impedance',

      // -2r from regular slowed since it doesn't block escaping, -1r for limited scope
      attack: {
        crit: 'The impedance range increases to \\longrange.',
        hit: `
          The target is impeded as a \\glossterm{condition}.
          While it is within \\shortrange of you, it is \\slowed.
          It suffers no ill effects beyond that range.
      `,
        targeting: `
          Make an attack vs. Brawn against up to two creatures within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['softener'],
      scaling: 'accuracy',
    },

    {
      name: 'Neck Snap',

      attack: {
        hit: `
          \\damageranksix, and any \\glossterm{extra damage} is doubled.
        `,
        injury: `
          The target is \\briefly \\sickened.
        `,
        targeting: `
          Make an attack vs. Brawn with a -2 accuracy penalty against something within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Mighty Neck Snap',

      attack: {
        hit: `
          \\damageranknine, and any \\glossterm{extra damage} is doubled.
        `,
        injury: `
          The target is \\sickened as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Brawn with a -2 accuracy penalty against something within \\shortrange.
        `,
      },
      rank: 7,
      roles: ['burst', 'maim'],
      scaling: 'damage',
    },

    {
      name: 'Kinetic Rebound',

      attack: {
        hit: `\\damagerankone.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon, make a \\glossterm{reactive attack} vs. Brawn against them.
        `,
      },
      rank: 2,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Kinetic Rebound',

      attack: {
        hit: `\\damagerankfive, and any \\glossterm{extra damage} is doubled.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-\\weapontag{Long} weapon, make a \\glossterm{reactive attack} vs. Brawn against them.
        `,
      },
      rank: 5,
      roles: ['attune'],
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    // TODO: define EA of special senses
    {
      name: 'Proprioception',

      effect: `
        You gain \\sense{blindsense} with a 60 foot range, allowing you to sense your surroundings without light (see \\pcref{Blindsense}).
        If you already have blindsense, the range of your blindsense increases by 60 feet.

        In addition, you gain \\sense{blindsight} with a 15 foot range, allowing you to see without light (see \\pcref{Blindsight}).
        If you already have blindsight, the range of your blindsight increases by 15 feet.
      `,
      rank: 4,
      roles: ['attune'],
      type: 'Attune',
    },
  ],
};
