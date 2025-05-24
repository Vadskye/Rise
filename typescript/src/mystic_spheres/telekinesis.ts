import { MysticSphere } from '.';
import { BARRIER_COOLDOWN, CONDITION_CRIT, EXCEPT_NOT_DEEP, MULTIHIT_CRIT } from './constants';

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

        During the movement phase, you can move the target up to 10 feet in any direction, to a maximum \\glossterm{height limit} of 5 feet.
        Your \\glossterm{weight limits} are calculated as if your Strength was \\minus1, so you can carry a Small object normally or push a Medium object at half speed.
        At the end of each round, if the target is outside of this ability's range, this ability ends.

        Although you can control the object's motion, you do not have it equipped.
        This means that you cannot gain a defense bonus from shields, magic apparel items do not grant their benefits to you, and so on.
      `,
      roles: ['narrative'],
      scaling: {
        2: `The maximum distance moved increases to 15 feet.`,
        4: `The maximum distance moved increases to 20 feet.`,
        6: `The maximum distance moved increases to 30 feet.`,
      },
      type: 'Sustain (minor)',
    },
  ],
  spells: [
    {
      name: 'Mighty Mage Hand',

      functionsLike: {
        name: 'mage hand',
        exceptThat: 'the \\glossterm{weight limits} of the hand are calculated as if your Strength was equal to 2.',
      },
      rank: 2,
      roles: ['narrative'],
      scaling: {
        special: "For each rank beyond 2, the hand's effective Strength increases by 1.",
      },
      type: 'Sustain (minor)',
    },
    {
      name: 'Interposing Force',

      // The most dangerous scenario for this spell is that you are in the front line, and
      // suceeding on this attack prevents the target from reaching the party at all.
      // Being unable to move towards you is roughly the same as a 30' push; it's worse if
      // they are already in melee, but better if they have more than 30' of movement, so
      // call it 2 EA. The Strength check is worth -2 ranks, probably.
      attack: {
        hit: `
          The target is \\glossterm{briefly} unable to move closer to you without effort.
          This does not impede its movement unless its movement would bring it closer to you while it is within \\medrange of you.
          As part of the movement, it can make a Strength check with a \\glossterm{difficulty value} of 6.
          If it succeeds, its movement towards you costs double the normal movement speed.
          Otherwise, it is unable to move towards you, and that part of its movement is wasted.
      `,
        targeting: `
          Make an attack vs. Brawn against one creature within \\medrange.
        `,
      },
      rank: 2,
      roles: ['kite'],
      scaling: 'accuracy',
    },

    {
      name: 'Intense Interposing Force',

      // At this rank, monsters are more likely to have more than 30' of movement, so this
      // is stronger than a 30' push when kiting.
      functionsLike: {
        name: 'interposing force',
        exceptThat: 'the \\glossterm{difficulty value} of the Strength check increases to 12.',
      },
      rank: 5,
      roles: ['kite'],
      scaling: 'accuracy',
    },

    {
      name: 'Personal Ward',

      effect: `
        You gain a \\plus4 bonus to your defenses against damaging attacks this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against you during the current phase.
      `,
      rank: 3,
      roles: ['turtle'],
      // narrative: '',
      tags: ['Swift'],
    },

    // This is slightly above rate because requiring objects is annoying. 
    {
      name: 'Fling Object',

      attack: {
        hit: `
          The target and the thrown object each take \\damagerankone.
          If you fling a Small object, you deal \\glossterm{extra damage} equal to half your \\glossterm{power}.
        `,
        targeting: `
          Choose a Tiny or Small \\glossterm{unattended} object within \\shortrange of you.
          You fling that object at another creature or object within \\shortrange of you.
          When you do, make an attack vs. Armor against the target.
          You gain a +2 accuracy bonus if you fling a Tiny object.
        `,
      },
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
    },

    // This is slightly above rate because requiring objects is annoying.
    {
      name: 'Mighty Fling Object',

      attack: {
        hit: `
          The target and the thrown object each take \\damagerankfour.
          If you fling a Medium object, you deal 2d6 \\glossterm{extra damage}.
        `,
        targeting: `
          Choose a Small or Medium \\glossterm{unattended} object within \\shortrange of you.
          You fling that object at another creature or object within \\shortrange of you.
          You gain a +2 accuracy bonus if you fling a Small object.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'accuracy',
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
      rank: 2,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Kinetic Discharge',

      // Baseline would be dr2 for enemies-only Small radius. Drop to dr1 for kinetic
      // charge mechanic and delay, which functionally makes it a non-action.
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          This spell has no immediate effect.
          Whenever you take damage during this spell's effect, you gain a kinetic charge.
          This is a \\abilitytag{Swift} effect, so you build up kinetic charges during the first round that you cast this spell.
          During your next action after you stop sustaining this spell, make an attack vs. Brawn against all \\glossterm{enemies} in a \\medarea radius from you.
          You gain an accuracy bonus with this attack equal to the number of kinetic charges you built up, to a maximum of +4.

          If you build up 8 kinetic charges, you immediately stop sustaining this spell, and the attack targets you and all creatures in a \\medarea radius from you.
        `,
      },
      rank: 3,
      roles: ['clear'],
      scaling: 'accuracy',
      tags: ['Sustain (minor)', 'Swift (see text)'],
    },

    {
      name: 'Mighty Kinetic Discharge',

      functionsLike: {
        name: 'kinetic discharge',
        exceptThat: 'the damage increases to \\damagerankfour.',
      },
      rank: 6,
      roles: ['clear'],
      scaling: 'accuracy',
      tags: ['Sustain (minor)', 'Swift (see text)'],
    },

    // Baseline for a double defense r0 area is drX+2, or crX+1 with drX+1. A 15' cone
    // feels partway between ranged and melee, so call a 15' push 0.8 EA. That would
    // require a rank 3 spell to get damage + debuff.
    {
      name: 'Blastwave',

      attack: {
        hit: `
          \\damagerankthree.
          You \\glossterm{knockback} each Large or smaller target that loses \\glossterm{hit points} up to 15 feet away from you.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and Brawn against everything in a \\smallarea cone from you.
        `,
      },
      rank: 2,
      roles: ['clear', 'kite'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Blastwave',

      // We don't calculate the size limitation into knockback officially, but removing
      // the limitation here has some value added.
      attack: {
        hit: `
          \\damagerankfive.
          You \\glossterm{knockback} each target that loses \\glossterm{hit points} up to 15 feet away from you.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and Brawn against everything in a \\smallarea cone from you.
        `,
      },
      rank: 4,
      roles: ['clear', 'kite'],
      scaling: 'accuracy',
    },

    {
      name: 'Massive Blastwave',

      // Correct debuff tier here would be 1.6 EA, so we're missing 0.7 EA of debuff value with just a 15' knockback. Add the size-based doubling to compensate.
      attack: {
        hit: `
          \\damageranksix.
          You \\glossterm{knockback} each target that loses \\glossterm{hit points} up to 15 feet away from you.
          This knockback distance is doubled if the target is Medium or smaller.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and Brawn against everything in a \\largearea cone from you.
        `,
      },
      rank: 6,
      roles: ['clear', 'kite'],
      scaling: 'accuracy',
    },

    // Baseline for 15' ranged push is 0.9 EA, or R-1. Increase to R0 for distance
    // extension and spend 2 ranks on pure area increase to get a R6 area.
    {
      name: 'Mind Shove',
      attack: {
        hit: `
          You \\glossterm{push} each target up to 15 feet.
          Each target can be pushed in a different direction of your choice.
        `,
        targeting: `
          Make an attack vs. Brawn against everything that is Large or smaller in a \\medarea radius within \\longrange of you.
        `,
      },
      rank: 2,
      roles: ['kite'],
    },

    // Baseline for 30' ranged push is r4, or r5 if we pay for extended area scaling.
    {
      name: 'Intense Mind Shove',
      attack: {
        hit: `
          You \\glossterm{push} each target up to 30 feet.
          Each target can be pushed in a different direction of your choice.
        `,
        targeting: `
          Make an attack vs. Brawn against everything that is Huge or smaller in a \\medarea radius within \\medrange of you.
        `,
      },
      rank: 5,
      roles: ['kite'],
    },

    // Baseline for 15' ranged push is r-1. If we pay 2 ranks for area scaling, we get a
    // R3 area.
    {
      name: 'Mind Fling',

      attack: {
        hit: `
          If each target has no remaining \\glossterm{damage resistance}, you \\glossterm{knockback} it up to 15 feet upwards or horizontally.
          Moving a target upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Brawn against up to two Large or smaller creatures within \\medrange.
        `,
      },
      rank: 1,
      roles: ['kite'],
      scaling: 'accuracy',
    },

    // Baseline for a 30' ranged push is r4.
    {
      name: 'Intense Mind Fling',

      attack: {
        hit: `
          If each target has no remaining \\glossterm{damage resistance}, you \\glossterm{knockback} it up to 30 feet upwards or horizontally.
          Moving a target upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Brawn against up to three Huge or smaller creatures within \\medrange.
        `,
      },
      rank: 4,
      roles: ['kite'],
      scaling: 'accuracy',
    },
    {
      name: 'Telekinetic Lift',

      effect: `
        Choose yourself or one Medium or smaller \\glossterm{unattended} object within \\medrange.
        The target's weight is reduced by one \\glossterm{weight category}, which makes it easier to lift and move.
        It also gains a \\plus10 foot bonus to its maximum horizontal jump distance, if applicable (see \\pcref{Jumping}).
        This increases the target's maximum vertical jump distance normally.
      `,
      rank: 1,
      roles: ['narrative'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Empowered Telekinetic Lift',

      effect: `
        Choose yourself or one Large or smaller \\glossterm{unattended} object within \\medrange.
        The target's weight is reduced by two \\glossterm{weight categories}, which makes it much easier to lift and move.
        It also gains a \\plus20 foot bonus to its maximum horizontal jump distance, if applicable (see \\pcref{Jumping}).
        This increases the target's maximum vertical jump distance normally.
      `,
      rank: 4,
      roles: ['narrative'],
      type: 'Sustain (standard)',
    },

    {
      name: 'Kinetic Redirection',

      effect: `
        You gain a +2 bonus to your Armor and Reflex defenses this round.
        In addition, whenever a creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it treats itself as a target of that strike in addition to any other targets.
        It cannot choose to reduce its accuracy or damage against itself.
        This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
      `,
      rank: 2,
      roles: ['turtle'],
      tags: ['Swift'],
    },

    {
      name: 'Levitate',

      effect: `
        You gain a slow \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
        Unlike normal, you can use this fly speed while you have \\glossterm{encumbrance}.
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
      roles: ['hazard'],
      scaling: {
        3: "The wall's hit points increase to three times your power.",
        5: "The wall's hit points increase to four times your power.",
        7: "The wall's hit points increase to five times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Sturdy Wall of Force',

      // +1r for small -> med, +1r for 3x -> 4x
      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of force',
        exceptThat: 'the area increases to a \\medarealong wall, and its hit points increase to four times your \\glossterm{power}.',
      },
      rank: 3,
      roles: ['hazard'],
      scaling: {
        5: "The wall's hit points increase to five times your power.",
        7: "The wall's hit points increase to six times your power.",
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Massive Wall of Force',

      // +3r for small -> large, +2r for short -> long
      cost: BARRIER_COOLDOWN,
      functionsLike: {
        name: 'wall of force',
        exceptThat: 'the area increases to a \\largearealong wall within \\longrange, and its hit points increase to four times your \\glossterm{power}.',
      },
      rank: 6,
      roles: ['hazard'],
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Animated Weapon',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} using one weapon you hold in a single hand.
        You use your \\glossterm{magical power} to determine your damage with the strike (see \\pcref{Power}).
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

        Make a \\glossterm{strike} using an arrow as if you were shooting it from a longbow.
        As normal for a longbow, the strike's \\glossterm{weapon damage} is 1d6 \\add half your \\glossterm{power}, and your \\glossterm{range limits} with this strike are 90/270.
        You use your \\glossterm{magical power} to determine your damage with the strike (see \\pcref{Power}).

        The arrow must be easily accessible on your person, such as in a quiver.
        You do not have to be proficient with bows, and you do not have to manually draw the arrow.
      `,
      rank: 2,
      roles: ['burst'],
      scaling: 'accuracy',
    },

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
      name: 'Efficient Floating Armament',

      functionsLike: {
        name: 'floating armament',
        exceptThat: EXCEPT_NOT_DEEP,
      },
      rank: 5,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Heavy Floating Armament',

      effect: `
        You can hold any weapon or shield other than a tower shield without using a free hand.
        It functions as if you were holding it in two hands if possible, or one hand otherwise.
        You still suffer the normal penalties if you are not proficient with it, or if it is not sized appropriately for you.
      `,
      rank: 3,
      roles: ['attune'],
      tags: [],
      type: 'Attune (deep)',
    },

    {
      name: 'Efficient Heavy Floating Armament',

      functionsLike: {
        name: 'heavy floating armament',
        exceptThat: EXCEPT_NOT_DEEP,
      },
      rank: 7,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Kinetic Shield',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to your maximum \\glossterm{damage resistance}.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },

    {
      name: 'Kinetic Shell',

      // "Did not attack Fortitude or Reflex" is confusing against abilities that
      // make a strike and also attack a secondary defense.
      // "Attacked your Armor or Reflex" is confusing against falling damage.
      effect: `
        You surround yourself with two layers of shielding that reduce the power of attacks against you.
        Whenever you would take damage from an ability that attacked your Armor, Brawn, or Reflex defense, you reduce that damage by 5, and one layer of shielding is destroyed.
        When the last layer is destroyed, this ability provides no further benefit.

        If you take simultaneous damage from more sources than you have remaining layers, the remaining layers apply to the largest damage sources, and you take full damage from any lower damage values.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: {
        3: `The damage reduction increases to 10.`,
        5: `The damage reduction increases to 20.`,
        7: `The damage reduction increases to 40.`,
      },
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Repulsion Field',

      // TODO: correct rank, clarify whether this triggers damage from knockback
      attack: {
        hit: `
          Each target is unable to enter the spell's area for the rest of the round.
          The rest of its movement in the current phase is cancelled.
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
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone.
          During your next action, the target takes \\damagerankone again.
        `,
        targeting: `
          Make an attack vs. Brawn against something within \\shortrange.
        `,
      },
      rank: 2,
      roles: ['burn'],
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Compression',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankthree, and any \\glossterm{extra damage} is doubled.
          During your next action, the target takes \\damagerankone again.
        `,
        targeting: `
          Make an attack vs. Brawn against something within \\shortrange.
        `,
      },
      rank: 4,
      roles: ['burn'],
      scaling: 'accuracy',
    },

    {
      name: 'Implosion',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfive, and any \\glossterm{extra damage} is doubled.
          During your during your next action, the target takes \\damagerankfive.
          If the target takes a \\glossterm{vital wound} from either instance of damage that leaves it unconscious, it is crushed into a small sphere and immediately dies.
          The sphere left behind is three size categories smaller than the original creature.
        `,
        targeting: `
          Make an attack vs. Brawn against something within \\shortrange.
        `,
      },
      rank: 6,
      roles: ['burn'],
      scaling: 'accuracy',
    },

    {
      name: 'Kinetic Impedance',

      // -2r from regular slowed since it doesn't block escaping, -1r for limited scope
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          Each target is impeded as a \\glossterm{condition}.
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
      name: 'Desperate Levitation',

      effect: `
        Whenever you use the \\ability{total defense} or \\ability{recover} ability, you can activate this ability.
        If you do, you move 20 feet up into the air and levitate there.
        This movement is \\atSwift, so it can help you avoid attacks during the current phase.
        While levitating in this way, your telekinesis provides you with a stable platform to maneuver, so you do not suffer penalties for being \\glossterm{midair}.
        At the end of the round, this ability ends, and you descend 20 feet without taking \\glossterm{falling damage}.
      `,
      rank: 1,
      roles: ['attune'],
      type: 'Attune',
    },

    {
      name: 'Neck Snap',

      attack: {
        hit: `
          \\damagerankseven, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Brawn with a -4 accuracy penalty against something within \\medrange.
        `,
      },
      rank: 5,
      roles: ['burst'],
      scaling: 'accuracy',
    },
  ],
};
