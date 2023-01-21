import { MysticSphere } from '.';

export const telekinesis: MysticSphere = {
  name: 'Telekinesis',
  shortDescription: 'Manipulate kinetic energy at a distance.',
  sources: ['arcane', 'pact'],

  cantrips: [
    {
      name: 'Distant Hand',

      effect: `
        Choose one Medium or smaller \\glossterm{unattended} object within \\medrange.
        You can telekinetically control the target object as if you were holding it in a single extra hand.
        Any attacks you make with the object or checks you make to manipulate the object have a maximum bonus equal to your \\glossterm{power}.
        At the end of each round, if the target is outside of this ability's range, this ability ends.

        During the movement phase, you can move the target up to 5 feet in any direction.
        You use your Willpower instead of your Strength to determine your \\glossterm{weight limits} when moving objects in this way (see \\pcref{Weight Limits}).
      `,
      scaling: {
        2: `The distance moved increases to 15 feet.`,
        4: `The distance moved increases to 30 feet.`,
        6: `The distance moved increases to 60 feet.`,
      },
      type: 'Sustain (minor)',
    },

    {
      name: 'Gentle Force',

      effect: `
        You can exert minor force on objects and creatures around you.
        When you cast this spell, and during each of your subsequent actions, you may choose any object or creature within \\shortrange of you.
        That object or creature feels a push in a direction of your choice.
        The force is sufficient to lift an object with a Diminuitive \\glossterm{weight category}, or to push an object with a Tiny weight category across the ground.
        The force exerted by this ability is insufficient to physically move or even meaningfully impede any creature, but it can be perceived.
      `,
      scaling: {
        2: `The force increases to lift a Tiny weight object, or to push a Small weight object.`,
        4: `The range increases to \\longrange`,
        6: `The force increases to lift a Small weight object, or to push a Medium weight object.`,
      },
      type: 'Sustain (minor)',
    },

    {
      name: 'Personal Ward',

      effect: `
        You are \\trait{impervious} to \\glossterm{physical damage} this round.
        Because this is a \\abilitytag{Swift} ability, it affects damage you take during the current phase.
      `,
      // narrative: '',
      scaling: {
        2: 'You also gain a +1 bonus to your Armor and Reflex defenses.',
        4: 'The defense bonuses increase to +2.',
        6: 'The defense bonuses increase to +3.',
      },
      tags: ['Swift'],
    },
  ],
  spells: [
    {
      name: 'Interposing Force',

      // price as one rank cheaper than slowed; it's better against low-Strength targets, but worse in
      // general
      attack: {
        crit: `The difficulty value of the Strength check increases by 10.`,
        hit: `As a \\glossterm{condition}, the target is unable to move closer to you without effort.
        This does not impede its movement unless its movement would bring it closer to you while it is within \\medrange of you.
        As part of the movement, it can make a Strength check with a \\glossterm{difficulty value} of 5.
        If it succeeds, it can move towards you at half speed.`,
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
          'the \\glossterm{difficulty value} of the Strength check increases to 10, or to 15 on a critical hit.',
      },
      rank: 7,
      scaling: 'accuracy',
    },

    {
      name: 'Fling Object',

      attack: {
        hit: `
          The target and the thrown object each take 1d8 bludgeoning damage.
          Specific objects may add additional damage types appropriately.
          For example, flinging a sharp spear would also deal piercing damage.
          You add your \\glossterm{power} to the damage if you fling a Medium object, or half your power if you fling a Small object.
        `,
        targeting: `
          Choose a Tiny, Small, or Medium unattended nonmagical object within \\medrange of you.
          You fling that object at another creature or object within \\medrange of you.
          You gain a +4 accuracy bonus if you fling a Tiny object, or a +2 accuracy bonus if you fling a Small object.
        `,
      },

      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Multifling',

      functionsLike: {
        name: 'fling object',
        exceptThat:
          'you can fling two objects, each at a different target within range. In addition, the damage increases to 2d8.',
      },
      rank: 4,
      scaling: 'damage',
    },

    {
      name: 'Mighty Fling Object',

      functionsLike: {
        name: 'fling object',
        exceptThat: 'the damage increases to 4d8.',
      },
      rank: 5,
      scaling: 'damage',
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
      name: 'Rapid Reload',

      effect: `
        You can reload weapons from the crossbow weapon group as a \\glossterm{minor action} instead of as a standard action, and without requiring any \\glossterm{free hands}.
        Whenever you reload a crossbow in this way, you \\glossterm{briefly} cannot do so again.
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Blastwave',

      attack: {
        hit: `
          Each target takes 1d10 + half \\glossterm{power} bludgeoning damage.
          You \\glossterm{knockback} each creature that loses \\glossterm{hit points} up to 15 feet horizontally away from you.
        `,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarea cone from you.
        `,
      },
      rank: 3,
      scaling: 'damage',
    },

    {
      name: 'Intense Blastwave',

      // +2r for 30' knockback, +1r for med cone
      attack: {
        hit: `
          Each target takes 2d10 + half \\glossterm{power} bludgeoning damage.
          You \\glossterm{knockback} each creature that loses \\glossterm{hit points} up to 30 feet horizontally away from you.
        `,
        targeting: `
          Make an attack vs. Fortitude against everything in a \\medarea cone from you.
        `,
      },
      rank: 6,
      scaling: 'damage',
    },

    {
      name: 'Mind Shove',
      // +1r for a size-limited r1 debuff that sometimes, but not always, has extra damage attached
      attack: {
        hit: `
          You \\glossterm{push} the target up to 30 feet in a straight line.
          If the target impacts a solid object before it moves the maximum distance, it stops moving and both it and the object take 1d8 + half \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything Large or smaller within \\medrange of you.
        `,
      },
      rank: 2,
    },

    {
      name: 'Mighty Mind Shove',
      // +1r for long range, +2r for full damage, +1r for size limit
      attack: {
        hit: `
          You \\glossterm{push} the target up to 30 feet in a straight line.
          If the target impacts a solid object before it moves the maximum distance, it stops moving and both it and the object take 4d6 + \\glossterm{power} bludgeoning damage.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything Huge or smaller within \\longrange of you.
        `,
      },
      rank: 6,
    },

    {
      name: 'Toss Foe',

      attack: {
        hit: `
          The target takes 1d6 bludgeoning damage.
          If it loses \\glossterm{hit points} from this damage, you \\glossterm{knockback} it up to 30 feet horizontally (see \\pcref{Knockback Effects}).
        `,
        targeting: `
          Make an attack vs. Fortitude against anything Large or smaller within \\medrange.
        `,
      },

      rank: 1,
      scaling: 'damage',
    },
    {
      name: 'Intense Toss Foe',

      functionsLike: {
        name: 'toss foe',
        // This deals an immediate 6d6 if you smash someone against a barrier, which is a lot of damage.
        exceptThat:
          'the knockback distance increases to 60 feet. In addition, the damage increases to 2d8.',
      },
      // narrative: '',
      rank: 5,
      scaling: 'damage',
    },
    {
      name: 'Telekinetic Lift',

      effect: `
        Choose yourself or one Medium or smaller \\glossterm{unattended} object within \\medrange.
        The target is reduced to half of its normal weight.
        This gives it a +4 \\glossterm{magic bonus} to the Jump skill, if applicable, and makes it easier to lift and move.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +6.`,
        5: `The target is reduced to a quarter of its normal weight. In addition, the bonus increases to +8.`,
        7: `The bonus increases to +10.`,
      },
      type: 'Sustain (attuneable, minor)',
    },

    {
      name: 'Mind Parry',

      functionsLike: {
        name: 'total defense',
        abilityType: 'ability',
        exceptThat: `
          whenever a creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it treats itself as a target of that strike in addition to any other targets.
          It cannot choose to reduce its accuracy or damage against itself.
          This ability is \\abilitytag{Swift}, so it protects you from attacks in the current phase.
        `,
      },
      rank: 2,
      tags: ['Swift'],
    },

    {
      name: 'Levitate',

      effect: `
        You gain a 15 foot \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
        Your \\glossterm{maneuverability} with this fly speed is perfect (see \\pcref{Flying Maneuverability}).
      `,
      rank: 4,
      scaling: { 6: `The maximum height above the surface increases to 30 feet.` },
      type: 'Attune',
    },

    {
      name: 'Wall of Force',

      effect: `
        You create a \\smallarealong \\glossterm{wall} of magical energy within \\medrange.
        The wall is visible as a shimmering magical field that does not block sight.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
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

      effect: `
        You slowly create a 10 ft.\\ cube of telekinetic force within \\medrange.
        The cage appears at the end of the next round after you cast this spell.
        Before that time, there is no visible indication of where the cage will appear.
        Any physical obstacles in the way of the cage at the time that it forms prevent it from appearing.
        You can create the cube around a sufficiently small creature to trap it inside.
        Each wall is transparent, but it blocks physical passage and \\glossterm{line of effect}.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 7,
      tags: ['Barrier'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Animated Weapon',

      effect: `
        Make a \\glossterm{strike} using a weapon you hold in a single hand.
        The weapon gains the \\abilitytag{Long} tag for this strike, allowing you to attack more distant targets.
        You use your \\glossterm{magical power} to determine your damage with the strike (see \\pcref{Power}).
        The weapon flies back into your hand after making the strike.
      `,
      rank: 1,
      scaling: {
        3: `You gain a +1 accuracy bonus with the strike.`,
        5: `The accuracy bonus increases to +2.`,
        7: `The accuracy bonus increases to +3.`,
      },
    },

    {
      name: 'Mind Arrow',

      effect: `
        You can make a \\glossterm{strike} using a projectile as if you were firing it from a longbow.
        You not have to be proficient with bows, and you do not have to manually draw the arrow.
        It must be easily accessible on your person, such as in a quiver.
        As normal for a longbow, the strike deals 1d6 damage, and your \\glossterm{range limits} with this strike are 90/270.
        You use your \\glossterm{magical power} to determine your damage with the strike (see \\pcref{Power}).
      `,
      rank: 1,
      scaling: {
        3: `You gain a +1 accuracy bonus with the strike.`,
        5: `The accuracy bonus increases to +2.`,
        7: `The accuracy bonus increases to +3.`,
      },
    },

    {
      name: 'Floating Armament',

      effect: `
        You can hold a light or medium weapon or shield without using a free hand.
        It functions as if you were holding it in a single hand.
        You still suffer the normal penalties if you are not proficient with it, or if it is not sized appropriately for you.
      `,
      rank: 3,
      tags: [],
      type: 'Attune (deep)',
    },

    {
      name: 'Greater Floating Armament',

      effect: `
        You can hold any weapon or shield other than a tower shield without using a free hand.
        It functions as if you were holding it in two hands if possible, or one hand otherwise.
        You still suffer the normal penalties if you are not proficient with it, or if it is not sized appropriately for you.
      `,
      rank: 7,
      tags: [],
      type: 'Attune (deep)',
    },

    {
      name: 'Kinetic Shield',

      effect: `
        You gain a +4 \\glossterm{magic bonus} to your \\glossterm{damage resistance}.
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
      name: 'Retributive Kinetic Shield',

      effect: `
        You gain a +16 \\glossterm{magic bonus} to \\glossterm{damage resistance}.
        In addition, whenever you resist damage, the attacker takes bludgeoning damage equal to half the damage resisted this way.
        If the attacker is beyond \\shortrange of you, this reflection fails.
        Any effect which increases this spell's range increases the range of this effect by the same amount.
      `,
      rank: 5,
      scaling: { 7: `The bonus increases to +32.` },
      type: 'Attune (deep)',
    },

    {
      name: 'Kinetic Shell',

      effect: `
        You surround yourself with two layers of shielding that reduce the power of physical attacks against you.
        Whenever you would take physical damage, you reduce that damage by 5, and one layer of shielding is destroyed.
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
        crit:
          'You also \\glossterm{knockback} the target 15 feet in the direction that it tried to enter the area from.',
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
        hit: `
          The target takes 1d8 + half \\glossterm{power} bludgeoning damage immediately, and again during your next action.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange from you.
        `,
      },
      rank: 2,
      scaling: 'damage',
    },

    {
      name: 'Implosion',

      attack: {
        hit: `
          The target takes 4d8 + half \\glossterm{power} bludgeoning damage immediately, and again during your next action.
          If takes a \\glossterm{vital wound} from this damage that leaves it unconscious, it is crushed into a small sphere and immediately dies.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\shortrange from you.
        `,
      },
      rank: 6,
      scaling: 'damage',
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
