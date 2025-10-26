import { CombatStyle } from '.';

export const mobileHunter: CombatStyle = {
  name: 'Mobile Hunter',
  shortDescription: 'Move around the battlefield with ease to avoid threats or hunt weak foes.',

  maneuvers: [
    {
      name: 'Momentous Impact',

      effect: `
        Make a melee \\glossterm{strike}.
        If your movement during the \\glossterm{movement phase} of this round consisted entirely of moving at least 20 feet in a straight line towards your target, the strike deals deals \\glossterm{extra damage} equal to half your power.
      `,
      rank: 3,
      roles: ['burst', 'payoff'],
    },

    {
      name: 'Adrenaline',

      cost: 'One \\glossterm{fatigue level} (see text).',
      effect: `
        You \\glossterm{briefly} gain a \\plus10 foot bonus to your \\glossterm{speed} and are \\primed.
        If you have a \\glossterm{vital wound}, this ability does not increase your fatigue level.
      `,
      rank: 1,
      roles: ['exertion', 'focus'],
    },

    {
      name: 'Adrenaline+',

      cost: 'One \\glossterm{fatigue level}.',
      effect: `
        You \\glossterm{briefly} gain a \\plus20 foot bonus to your \\glossterm{speed} and are \\primed.
        If you have a \\glossterm{vital wound}, this ability does not increase your fatigue level.
      `,
      rank: 5,
      roles: ['exertion', 'focus'],
    },

    {
      name: 'Reaping Harvest',

      effect: `
        Move up to your speed in a straight line.
        You can also make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you at any point during your movement.
      `,
      rank: 3,
      roles: ['clear'],
    },

    {
      name: 'Reaping Harvest+',

      effect: `
        Move up to your speed in a straight line.
        You can also make a melee \\glossterm{strike} that deals triple damage.
        The strike targets all \\glossterm{enemies} adjacent to you at any point during your movement.
      `,
      rank: 7,
      roles: ['clear'],
    },

    {
      name: 'Rushdown',

      effect: `
        You can move up to half your speed, then make a melee \\glossterm{strike}.
      `,
      rank: 1,
      roles: ['dive'],
    },

    {
      name: 'Mighty Rushdown',

      effect: `
        You can move up to your speed, then make a melee \\glossterm{strike} with a \\minus2 accuracy penalty that deals double \\glossterm{weapon damage}.
      `,
      rank: 3,
      roles: ['dive'],
    },

    {
      name: 'Push Through',

      effect: `
        Make a melee \\glossterm{strike}.
        \\hit If the target is a creature, you \\glossterm{briefly} do not consider it to be an \\glossterm{obstacle} when moving through its space.
        You still cannot end your movement in its space.
      `,
      rank: 1,
      roles: ['dive'],
    },

    {
      name: 'Sprinting Charge',

      cost: 'One \\glossterm{fatigue level}.',
      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you can move up to twice your speed instead of up to your speed, and the defense penalty is removed.
        `,
        name: 'charge',
      },
      rank: 1,
      roles: ['exertion', 'dive'],
    },

    {
      name: 'Prepared Sprint',

      effect: `
        Your movement speed is \\glossterm{briefly} doubled.
        However, you cannot use the \\textit{sprint} ability during that time.
      `,
      rank: 1,
      roles: ['focus'],
    },

    {
      name: 'Fall Back',

      effect: `
        Make a melee \\glossterm{strike}.
        Then, you can move up to half your movement speed.
      `,
      rank: 1,
      roles: ['mobility', 'burst'],
    },
    {
      name: 'Fall Back+',

      effect: `
        Make a melee \\glossterm{strike}.
        Then, you can move up to your speed.
      `,
      rank: 3,
      roles: ['mobility', 'burst'],
    },

    {
      name: 'Flash Sweep',

      effect: `
        You can move in a straight line up to your \\glossterm{speed}.
        During this movement, you move too quickly to be seen, making you \\trait{invisible}.
        While still invisible, you can make a melee \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        The strike targets all \\glossterm{enemies} adjacent to you at any point during your movement.
        After making the strike, you become visible at your destination.
      `,
      rank: 5,
      roles: ['clear'],
    },

    {
      name: 'Flash Flurry',

      effect: `
        You can move in a straight line up to your \\glossterm{speed}.
        During this movement, you move too quickly to be seen, making you \\trait{invisible}.
        While still invisible, you can make two melee \\glossterm{strikes} that deal double \\glossterm{weapon damage} at any point during your movement.
        After making the strikes, you become visible at your destination.
      `,
      rank: 7,
      roles: ['dive'],
    },

    {
      name: 'Flash Charge',

      effect: `
        You can move in a straight line up to your \\glossterm{speed}.
        During this movement, you move too quickly to be seen, making you \\trait{invisible}.
        You become visible at your destination, and you can then make a melee \\glossterm{strike} there.
      `,
      rank: 3,
      roles: ['dive'],
    },

    {
      name: 'Carve the Air',

      effect: `
        You jump and move as normal for the jump (see \\pcref{Jumping}).
        You can make a melee \\glossterm{strike} with a -1 accuracy penalty from any location you occupy during the motion.
        This includes both your initial leap and any fall afterwards that happens during the current round.
      `,
      rank: 1,
      roles: ['dive'],
    },

    {
      name: 'Leaping Impact',

      effect: `
        You jump and move as normal for the jump (see \\pcref{Jumping}).
        You can make a melee \\glossterm{strike} that deals double damage from your final location after jumping.
        On a hit, the target takes half of the \\glossterm{falling damage} that you would normally take based on the height of the jump, ignoring any of your abilities that reduce that damage.
      `,
      rank: 7,
      roles: ['payoff'],
    },

    // TODO: higher rank version of this
    {
      name: 'Unbalancing Backstep',

      effect: `
        You are \\braced this round.
        In addition, choose a creature you can see.
        You can move up to 5 feet away from that creature.
        Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it takes a -2 penalty to Armor defense during the next round.
        As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.

        The defense bonus and reactive penalty trigger are \\abilitytag{Swift} effects, but not the movement.
      `,
      rank: 1,
      tags: ['Swift (see text)'],
      roles: ['turtle'],
    },

    // assume movement is worth 0.6 EA or so
    {
      name: 'Fearsome Rushdown',

      effect: `
        Move up to half your movement speed and make a melee \\glossterm{strike} that deals double damage.
        \\hit If your attack result also hits the target's Mental defense, it is \\glossterm{briefly} \\frightened by you.
      `,
      rank: 5,
      tags: ['Emotion'],
      roles: ['dive', 'softener'],
    },

    {
      name: 'Eyeflash Rushdown',

      // assume movement is worth 0.6 EA or so
      effect: `
        Move up to half your movement speed and make a melee \\glossterm{strike} that deals triple damage.
        \\hit The target \\glossterm{briefly} treats you as being \\trait{invisible}.
      `,
      rank: 7,
      tags: ['Emotion'],
      roles: ['dive', 'softener'],
    },

    {
      name: 'Frenzied Charge',

      effect: `
        After using this ability, you \\glossterm{briefly} take a \\minus4 penalty to all defenses.

        Move up to your speed in a single straight line.
        At the end of your movement, you can make a melee \\glossterm{strike} that deals double damage.
        If you moved at least 15 feet during the charge, you gain a \\plus2 accuracy bonus with the strike.
      `,
      rank: 5,
      roles: ['dive'],
    },

    {
      name: 'Leap Slam',

      // Basically tiny radius in short range, which is area rank 2
      attack: {
        hit: `\\damageranktwo.`,
        missGlance: true,
        targeting: `
          You jump and move as normal for the jump (see \\pcref{Jumping}).
          When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, you emit a small shockwave.
          If you do, make an attack vs. Reflex against all \\glossterm{enemies} adjacent to you that are on the same stable surface as you.
        `,
      },
      rank: 3,
      roles: ['clear', 'dive'],
      tags: ['Earth'],
    },

    {
      name: 'Leap Slam+',

      functionsLike: {
        name: 'leap slam',
        exceptThat: 'the damage increases to \\damageranksix.',
      },
      rank: 7,
      roles: ['clear', 'dive'],
      tags: ['Earth'],
    },
  ],
};
