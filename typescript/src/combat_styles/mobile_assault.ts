import { CombatStyle } from '.';

export const mobileAssault: CombatStyle = {
  name: 'Mobile Assault',
  shortDescription: 'Move around the battlefield with ease to avoid threats or hunt weak foes.',

  maneuvers: [
    {
      name: 'Reaping Harvest',

      effect: `
        Move up to half your movement speed in a straight line.
        You can make a melee \\glossterm{strike} using a slashing or bludgeoning weapon.
        The strike targets all \\glossterm{enemies} adjacent to you at any point during your movement.
        On a miss, you still deal half damage.
      `,
      rank: 3,
    },

    {
      name: 'Reaping Harvest+',

      effect: `
        Move up to your movement speed in a straight line.
        You can make a melee \\glossterm{strike} using a slashing or bludgeoning weapon.
        The strike deals double \\glossterm{weapon damage}, and it targets all \\glossterm{enemies} adjacent to you at any point during your movement.
        On a miss, you still deal half damage.
      `,
      rank: 7,
    },

    {
      name: 'Spring Attack',

      effect: `
        Move up to half your movement speed and make a melee \\glossterm{strike}.
        After making the strike, you can use the other half of your movement.
      `,
      rank: 3,
    },

    {
      name: "Rushed Strike",

      effect: `
        You can move up to half your speed and make a strike with a -1 accuracy penalty, in either order.
      `,
      rank: 1,
    },

    {
      name: "Rushed Strike+",

      effect: `
        You can move up to your speed and make a strike with a -2 accuracy penalty, in either order.
      `,
      rank: 3,
    },

    {
      name: 'Push Through',

      effect: `
        Make a melee \\glossterm{strike}.
        If the target takes damage, you can \\glossterm{briefly} move through its space as if it was not there.
      `,
      rank: 1,
    },

    {
      name: 'Sprinting Charge',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          you can move up to twice your speed instead of up to your speed, and the defense penalty is removed.
          When you use this ability, you increase your \\glossterm{fatigue level} by one.
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
      name: 'Retreating Strike',

      effect: `
        Make a melee \\glossterm{strike}.
        In addition, you can move up to your movement speed in a straight line away from one target of the strike.
      `,
      rank: 3,
    },

    {
      name: 'Flash Sweep',

      effect: `
        You \\glossterm{teleport} horizontally to a location within \\shortrange.
        In addition, you can make a melee \\glossterm{strike} that targets all \\glossterm{enemies} within a 5 ft.\\ wide line between your starting location and your ending location.
        On a miss, you still deal half damage.
        You cannot use this ability if you have any \\glossterm{encumbrance}.
      `,
      rank: 5,
    },

    {
      name: 'Flash Flurry',

      effect: `
        You \\glossterm{teleport} horizontally to a location within \\shortrange.
        In addition, you can make two melee \\glossterm{strikes}.
        Each strike targets one creature within a 5 ft.\\ wide line between your starting location and your ending location.
        You can target the same creature with both strikes.
        You cannot use this ability if you have any \\glossterm{encumbrance}.
      `,
      rank: 7,
    },

    {
      name: 'Flash Charge',

      effect: `
        You \\glossterm{teleport} horizontally to a location within \\shortrange.
        In addition, you can make a melee \\glossterm{strike} at your destination.
        You cannot use this ability if you have any \\glossterm{encumbrance}.
      `,
      rank: 3,
    },

    {
      name: 'Leaping Strike',

      effect: `
        You jump and move as normal for the jump (see \\pcref{Jumping}).
        You can make a melee \\glossterm{strike} from any location you occupy during the motion, including both your initial leap and your fall afterwards (if any).
      `,
      rank: 3,
    },

    {
      name: 'Leaping Impact Strike',

      effect: `
        You jump and move as normal for the jump (see \\pcref{Jumping}).
        You can make a melee \\glossterm{strike} from any location you occupy during the jump.
        Your \\glossterm{weapon damage} with the strike is doubled.
        If you hit with the strike, the target takes half of the \\glossterm{falling damage} that you would normally take based on the height of the jump, ignoring any of your abilities that reduce that damage.
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
        If the target loses hit points, it is \\frightened by you as a \\glossterm{condition}.
        This is an \\abilitytag{Emotion} effect.
      `,
      rank: 3,
      tags: [],
    },

    {
      name: 'Fearsome Pounce+',

      effect: `
        Move up to half your movement speed and make a melee \\glossterm{strike} with double \\glossterm{weapon damage}.
        If the target takes damage, it is \\frightened by you as a \\glossterm{condition}.
        This is an \\abilitytag{Emotion} effect.
      `,
      rank: 7,
      tags: [],
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
