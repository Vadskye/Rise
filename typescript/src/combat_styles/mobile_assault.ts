import { CombatStyle } from '.';

export const mobileHunter: CombatStyle = {
  name: 'Mobile Hunter',
  shortDescription: 'Move around the battlefield with ease to avoid threats or hunt weak foes.',

  maneuvers: [
    {
      name: 'Momentous Impact',

      cost: 'You \\glossterm{briefly} cannot use this ability again.',
      effect: `
        Make a melee \\glossterm{strike}.
        If your movement during the \\glossterm{movement phase} of this round consisted entirely of moving at least 20 feet in a straight line towards your target, the strike deals deals \\glossterm{extra damage} equal to your power.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Reaping Harvest',

      effect: `
        Move up to half your movement speed in a straight line.
        You can also make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you at any point during your movement.
      `,
      rank: 3,
    },

    {
      name: 'Reaping Harvest+',

      effect: `
        Move up to your movement speed in a straight line.
        You can also make a melee \\glossterm{strike}.
        The strike deals double \\glossterm{weapon damage}, and it targets all \\glossterm{enemies} adjacent to you at any point during your movement.
      `,
      rank: 7,
    },

    {
      name: 'Spring Attack',

      effect: `
        Move up to half your movement speed and make a \\glossterm{strike}.
        If the strike is a \\glossterm{melee} strike, you gain a \\plus2 accuracy bonus with it.
        After making the strike, you can use the other half of your movement.
      `,
      rank: 5,
    },

    {
      name: 'Rushdown',

      effect: `
        You can move up to half your speed, then make a melee \\glossterm{strike}.
      `,
      rank: 1,
    },

    {
      name: 'Rushdown+',

      effect: `
        You can move up to your speed, then make a melee \\glossterm{strike}.
      `,
      rank: 3,
    },

    {
      name: 'Push Through',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage and is a creature, you \\glossterm{briefly} do not consider it to be an \\glossterm{obstacle}.
        This means you can move through its space freely.
        If you end your movement in its space, this can cause you both to be \\squeezing (see \\pcref{Squeezing}).
      `,
      rank: 1,
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
    },

    {
      name: 'Prepared Sprint',

      effect: `
        Your movement speed is \\glossterm{briefly} doubled.
        However, you cannot use the \\textit{sprint} ability during that time.
      `,
      rank: 1,
    },

    {
      name: 'Fall Back',

      effect: `
        Make a melee \\glossterm{strike}.
        Then, you can move up to half your movement speed.
      `,
      rank: 1,
    },
    {
      name: 'Fall Back+',

      effect: `
        Make a melee \\glossterm{strike}.
        Then, you can move up to your movement speed.
      `,
      rank: 3,
    },

    {
      name: 'Flash Sweep',

      effect: `
        You can move in a straight line up to your land speed.
        During this movement, you move too quickly to be seen, becoming \\trait{invisible}.
        You reappear at your destination, and you can make a melee \\glossterm{strike} there.
        The strike targets all \\glossterm{enemies} adjacent to you at any point during your movement.
        You cannot use this ability if you have any \\glossterm{encumbrance}.
      `,
      rank: 5,
    },

    {
      name: 'Flash Flurry',

      effect: `
        You can move in a straight line up to your land speed.
        During this movement, you move too quickly to be seen, becoming \\trait{invisible}.
        You reappear at your destination, and you can make two melee \\glossterm{strikes} there.
        Each strike targets one creature adjacent to you at any point during your movement.
        You can target the same creature with both strikes.
        You cannot use this ability if you have any \\glossterm{encumbrance}.
      `,
      rank: 7,
    },

    {
      name: 'Flash Charge',

      effect: `
        You can move in a straight line up to your land speed.
        During this movement, you move too quickly to be seen, becoming \\trait{invisible}.
        You reappear at your destination, and you can make a melee \\glossterm{strike} there.
        You cannot use this ability if you have any \\glossterm{encumbrance}.
      `,
      rank: 3,
    },

    {
      name: 'Carve the Air',

      effect: `
        You jump and move as normal for the jump (see \\pcref{Jumping}).
        You can make a melee \\glossterm{strike} from any location you occupy during the motion, including both your initial leap and your fall afterwards (if any).
      `,
      rank: 3,
    },

    {
      name: 'Leaping Impact',

      effect: `
        You jump and move as normal for the jump (see \\pcref{Jumping}).
        You can make a melee \\glossterm{strike} from your final location after jumping.
        Your \\glossterm{weapon damage} with the strike is doubled.
        On a hit, the target takes half of the \\glossterm{falling damage} that you would normally take based on the height of the jump, ignoring any of your abilities that reduce that damage.
      `,
      rank: 7,
    },

    {
      name: 'Passing Splitstrike',

      effect: `
        Make a melee \\glossterm{strike}, then move up to 10 feet and make another melee \\glossterm{strike}.
        You cannot include the same creature or object as a target of both strikes.
      `,
      rank: 3,
    },

    // TODO: higher rank version of this
    {
      name: 'Unbalancing Backstep',

      effect: `
        Choose a creature you can see.
        You can move up to 5 feet away from that creature.
        In addition, you gain a +2 bonus to your Armor and Reflex defenses this round.
        Whenever that creature misses or \\glossterm{glances} you with a melee \\glossterm{strike} this round, it takes a -2 penalty to Armor defense during the next round.
        As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.

        The defense bonus and reactive penalties are \\abilitytag{Swift} effects, but not the movement.
      `,
      rank: 1,
      tags: ['Swift (see text)'],
    },

    {
      name: 'Fearsome Pounce',

      effect: `
        Move up to half your movement speed and make a melee \\glossterm{strike}.
        If the target loses hit points, it becomes \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 3,
      tags: ['Emotion'],
    },

    {
      name: 'Fearsome Pounce+',

      effect: `
        Move up to half your movement speed and make a melee \\glossterm{strike} that deals double \\glossterm{weapon damage}.
        If the target takes damage, it becomes \\frightened by you as a \\glossterm{condition}.
      `,
      rank: 7,
      tags: ['Emotion'],
    },

    {
      name: 'Frenzied Charge',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you gain a +2 accuracy bonus with the strike if you moved at least 15 feet during the charge.
          However, the penalty to your defenses increases to \\minus4.
        `,
        name: 'charge',
      },
      rank: 3,
    },
  ],
};
