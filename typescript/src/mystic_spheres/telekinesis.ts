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
      scaling: {
        2: `The maximum distance moved increases to 15 feet.`,
        4: `The maximum distance moved increases to 20 feet.`,
        6: `The maximum distance moved increases to 30 feet.`,
      },
      type: 'Sustain (minor)',
    },

    {
      name: 'Gentle Force',

      effect: `
        You can exert minor force on objects and creatures around you.
        When you cast this spell, and during each of your subsequent actions, you may choose any object or creature within \\shortrange of you.
        That object or creature feels a push in a direction of your choice.
        The force is sufficient to lift an \\glossterm{unattended} object with a Diminutive \\glossterm{weight category}, or to push an object with a Tiny weight category across the ground.
        This ability cannot physically move or even meaningfully impede any creature, but it can be perceived.
      `,
      scaling: {
        2: `The range increases to \\medrange`,
        4: `The force increases to be able to lift a Tiny weight, or to push a Small weight.`,
        6: `The range increases to \\longrange`,
      },
      type: 'Sustain (minor)',
    },
  ],
  spells: [
    {
      name: 'Interposing Force',

      // price as one rank cheaper than slowed; it's better against low-Strength targets, but worse in
      // general
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          As a \\glossterm{condition}, the target is unable to move closer to you without effort.
          This does not impede its movement unless its movement would bring it closer to you while it is within \\medrange of you.
          As part of the movement, it can make a Strength check with a \\glossterm{difficulty value} of 5.
          If it succeeds, it can move normally.
          Otherwise, it is unable to move towards you, and that part of its movement is wasted.
      `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },

      rank: 4,
      scaling: 'accuracy',
    },

    {
      name: 'Intense Interposing Force',

      functionsLike: {
        name: 'interposing force',
        exceptThat:
          'the \\glossterm{difficulty value} of the Strength check increases to 10.',
      },
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Personal Ward',

      effect: `
        You gain a \\plus4 bonus to your defenses against damaging attacks this round.
        Because this is a \\abilitytag{Swift} ability, it affects attacks against you during the current phase.
      `,
      rank: 3,
      // narrative: '',
      tags: ['Swift'],
    },

    {
      name: 'Fling Object',

      attack: {
        hit: `
          The target and the thrown object each take 1d6 damage.
          If you fling a Small object, the damage increases by +1 per 2 \\glossterm{power}.
        `,
        targeting: `
          Choose a Tiny or Small unattended object within \\medrange of you.
          You fling that object at another creature or object within \\medrange of you.
          You gain a +2 accuracy bonus if you fling a Tiny object.
        `,
      },

      rank: 1,
      scaling: 'accuracy',
    },

    {
      name: 'Multifling',

      functionsLike: {
        name: 'fling object',
        exceptThat:
          'you can fling two objects, each at a different target within range. In addition, the base damage increases to 1d8.',
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Mighty Fling Object',

      attack: {
        hit: `
          The target and the thrown object each take 2d8 bludgeoning damage.
          If you fling a Medium object, the damage increases by an amount equal to your \\glossterm{power}.
        `,
        targeting: `
          Choose a Small or Medium unattended object within \\medrange of you.
          You fling that object at another creature or object within \\medrange of you.
          You gain a +2 accuracy bonus if you fling a Small object.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Force Extension',

      effect: `
        Your melee \\glossterm{strikes} gain the \\weapontag{Long} weapon tag, allowing you to attack targets up to 10 feet away from you (see \\pcref{Weapon Tags}).
      `,

      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Mass Force Extension',

      functionsLike: {
        mass: true,
        name: 'Force Extension',
      },
      // narrative: '',
      rank: 5,
      type: 'Attune (target)',
    },

    {
      name: 'Mental Reload',

      effect: `
        You can reload projectile weapons without requiring any \\glossterm{free hands}.
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Kinetic Discharge',

      // Baseline would be dr2 for enemies-only delayed Med radius. Drop to dr1 for
      // kinetic charge mechanic.
      attack: {
        hit: `
          \\damagerankone.
        `,
        missGlance: true,
        targeting: `
          This spell has no immediate effect.
          Whenever you take damage during this spell's effect, you build up a kinetic charge.
          This is a \\abilitytag{Swift} effect, so you build up kinetic charges during the first round that you cast this spell.
          When you stop sustaining this spell, make an attack vs. Fortitude against all \\glossterm{enemies} in a \\medarea radius from you.
          You gain an accuracy bonus with this attack equal to the number of kinetic charges you built up, to a maximum of +5.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Sustain (minor)', 'Swift (see text)'],
    },

    {
      name: 'Mighty Kinetic Discharge',

      functionsLike: {
        name: 'kinetic discharge',
        exceptThat: 'the damage increases to \\damagerankfive.',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Sustain (minor)', 'Swift (see text)'],
    },

    {
      name: 'Blastwave',

      attack: {
        hit: `
          \\damagerankthree.
          You \\glossterm{knockback} each Huge or smaller target that loses \\glossterm{hit points} up to 30 feet in a straight line away from you.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and Fortitude against everything in a \\smallarea cone from you.
        `,
      },
      rank: 3,
      scaling: 'accuracy',
    },

    {
      name: 'Massive Blastwave',

      attack: {
        hit: `
          \\damageranksix.
          You \\glossterm{knockback} each creature that loses \\glossterm{hit points} up to 30 feet horizontally away from you.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex and Fortitude against everything in a \\largearea cone from you.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Mind Shove',
      attack: {
        hit: `
          You \\glossterm{push} each target up to 30 feet in a straight line.
        `,
        targeting: `
          Make an attack vs. Fortitude against everything that is Large or smaller in a \\smallarea radius within \\medrange of you.
        `,
      },
      rank: 2,
    },

    {
      name: 'Intense Mind Shove',
      attack: {
        hit: `
          You \\glossterm{push} each target up to 60 feet in a straight line.
        `,
        targeting: `
          Make an attack vs. Fortitude against everything that is Huge or smaller in a \\smallarea radius within \\medrange of you.
        `,
      },
      rank: 6,
    },

    {
      name: 'Toss Foe',

      attack: {
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, you \\glossterm{knockback} it up to 30 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving the target upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Fortitude against something Medium or smaller within \\medrange.
        `,
      },

      rank: 1,
      scaling: 'accuracy',
    },
    {
      name: 'Intense Toss Foe',

      attack: {
        hit: `
          If the target has no remaining \\glossterm{damage resistance}, you \\glossterm{knockback} it up to 60 feet upwards or horizontally (see \\pcref{Knockback Effects}).
          Moving the target upwards costs twice the normal movement cost.
        `,
        targeting: `
          Make an attack vs. Fortitude against something Large or smaller within \\medrange.
        `,
      },
      // narrative: '',
      rank: 5,
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
      tags: ['Swift'],
    },

    {
      name: 'Levitate',

      effect: `
        You gain a 20 foot \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
        Unlike normal, you can use this fly speed while you have \\glossterm{encumbrance}.
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Wall of Force',

      cost: BARRIER_COOLDOWN,
      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a shimmering magical field that does not block sight.
        Nothing can pass through the wall until it is destroyed.
        It has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.
      `,
      rank: 1,
      scaling: {
        3: 'You can choose to create a \\medarealong wall instead.',
        5: 'You can choose to create a \\largearealong wall instead.',
        7: 'You can choose to create a \\hugearealong wall instead.',
      },
      tags: ['Barrier', 'Manifestation'],
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Forcecage',

      cost: BARRIER_COOLDOWN,
      effect: `
        You slowly create a 10 ft.\\ cube of telekinetic force within \\medrange.
        The cage appears at the end of the next round after you cast this spell.
        Before that time, there is no visible indication of where the cage will appear.
        Any physical obstacles in the way of the cage at the time that it forms prevent it from appearing.
        You can create the cube around a sufficiently small creature to trap it inside.
        Each wall is transparent, but it blocks physical passage and \\glossterm{line of effect}.
        The cube as a whole has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.
      `,
      rank: 7,
      tags: ['Barrier'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Animated Weapon',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a melee \\glossterm{strike} using one weapon you hold in a single hand.
        You use your \\glossterm{magical power} to determine your damage with the strike (see \\pcref{Power}).
        The weapon flies out of your hand to strike multiple enemies, granting this strike the \\weapontag{Long} and \\weapontag{Sweeping} (1) tags (see \\pcref{Weapon Tags}).
        It flies back into your hand after making the strike.
      `,
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Mind Arrow',

      effect: `
        This spell has no \\glossterm{somatic components}.

        Make a \\glossterm{strike} using an arrow as if you were firing it from a longbow.
        As normal for a longbow, the strike's base \\glossterm{weapon damage} is 1d6, and your \\glossterm{range limits} with this strike are 90/270.
        You use your \\glossterm{magical power} to determine your damage with the strike (see \\pcref{Power}).

        The arrow must be easily accessible on your person, such as in a quiver.
        You do not have to be proficient with bows, and you do not have to manually draw the arrow.
      `,
      rank: 2,
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
      type: 'Attune (deep)',
    },

    {
      name: 'Efficient Floating Armament',

      functionsLike: {
        name: "floating armament",
        exceptThat: EXCEPT_NOT_DEEP,
      },
      rank: 6,
      type: 'Attune',
    },

    {
      name: 'Heavy Floating Armament',

      effect: `
        You can hold any weapon or shield other than a tower shield without using a free hand.
        It functions as if you were holding it in two hands if possible, or one hand otherwise.
        You still suffer the normal penalties if you are not proficient with it, or if it is not sized appropriately for you.
      `,
      rank: 4,
      tags: [],
      type: 'Attune (deep)',
    },

    {
      name: 'Kinetic Shield',

      effect: `
        You gain a +4 \\glossterm{enhancement bonus} to your \\glossterm{damage resistance}.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },

    {
      name: 'Mass Kinetic Shield',

      functionsLike: {
        mass: true,
        name: 'kinetic shield',
      },
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Kinetic Shell',

      // "Did not attack Fortitude or Reflex" is confusing against abilities that
      // make a strike and also attack a secondary defense.
      // "Attacked your Armor or Reflex" is confusing against falling damage.
      effect: `
        You surround yourself with two layers of shielding that reduce the power of attacks against you.
        Whenever you would take damage from an ability that attacked your Armor or Reflex defense, you reduce that damage by 5, and one layer of shielding is destroyed.
        When the last layer is destroyed, this ability provides no further benefit.

        If you take simultaneous damage from more sources than you have remaining layers, the remaining layers apply to the largest damage sources, and you take full damage from any lower damage values.
      `,
      rank: 1,
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

      // TODO: correct rank
      attack: {
        hit: `
          Each target is unable to enter the spell's area for the rest of the round.
          The rest of its movement in the current phase is cancelled.
        `,
        targeting: `
          When you cast this spell, you create a repulsive field in a \\smallarea radius \\glossterm{zone} from your location.
          Whenever an enemy makes physical contact with the spell's area, you make a \\glossterm{reactive attack} vs. Fortitude against it.
          Creatures in the area at the time that the spell is cast are unaffected by the spell.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      type: 'Sustain (minor)',
    },

    {
      name: 'Compression',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankone immediately, and again during your next action.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange from you.
        `,
      },
      rank: 2,
      scaling: 'accuracy',
    },

    {
      name: 'Implosion',

      attack: {
        crit: MULTIHIT_CRIT,
        hit: `
          \\damagerankfive immediately, and again during your next action.
          If takes a \\glossterm{vital wound} from this damage that leaves it unconscious, it is crushed into a small sphere and immediately dies.
          The sphere left behind is three size categories smaller than the original creature.
        `,
        targeting: `
          Make an attack vs. Fortitude against something within \\shortrange from you.
        `,
      },
      rank: 6,
      scaling: 'accuracy',
    },

    {
      name: 'Kinetic Impedance',

      // -2r from regular slowed since it doesn't block escaping
      attack: {
        crit: CONDITION_CRIT,
        hit: `
          The target is impeded as a \\glossterm{condition}.
          While it is within \\shortrange of you, it is \\slowed.
          It suffers no ill effects beyond that range.
      `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },

      rank: 2,
      scaling: 'accuracy',
    },
    {
      name: 'Desperate Levitation',

      effect: `
        Whenever you use the \\ability{total defense} or \\ability{recover} ability, you can activate this ability.
        If you do, you move 20 feet up into the air and levitate there.
        Then, your attunement to this effect ends.
        This movement is \\atSwift, so it can help you avoid attacks during the current phase.
        While levitating in this way, your telekinesis provides you with a stable platform to maneuver, so you do not suffer penalties for being \\glossterm{midair}.
        At the end of the round, this levitation effect ends, and you descend 20 feet without taking \\glossterm{falling damage}.
      `,
      rank: 1,
      type: 'Attune',
    },
  ],
  rituals: [
    {
      name: 'Force Lock',

      castingTime: 'one minute',
      effect: `
        Choose one Large or smaller closable, nonmagical object within \\shortrange, such as a door or box.
        The target is surrounded by a telekinetic barrier that prevents it from being opened.
        It gains a +10 bonus to its \\glossterm{damage resistance}.
        The barrier can be bypassed with a DV 20 Devices check, allowing the object to be opened.

        When you perform this ritual, you may choose a Fine object within \\shortrange to function as a key.
        When the chosen key touches the protected object, this ritual is \\glossterm{suppressed} for one minute, allowing the object to be opened normally.
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Empowered Force Lock',

      castingTime: 'one minute',
      functionsLike: {
        exceptThat: `
          the maximum size increases to Huge, and the Devices DV to unlock it increases to 30.
          In addition, the damage resistance bonus increases to +20.
        `,
        name: 'force lock',
      },
      rank: 5,
      type: 'Attune',
    },
  ],
};
