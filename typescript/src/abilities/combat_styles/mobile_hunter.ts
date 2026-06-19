import { CombatStyle } from '.';

export const mobileHunter: CombatStyle = {
  name: 'Mobile Hunter',
  shortDescription: 'Move around the battlefield with ease to avoid threats or hunt weak foes.',

  maneuvers: [
    {
      name: 'Momentous Impact',

      effect: `
        Make a melee \\glossterm{strike}.
        If you moved at least 20 feet in a straight line towards your target this turn, the strike deals deals \\glossterm{extra damage} equal to half your power.
      `,
      rank: 3,
      roles: ['burst', 'payoff'],
    },

    {
      name: 'Adrenaline',

      cost: 'One \\glossterm{stamina}, unless you have a \\glossterm{vital wound}.',
      effect: `
        You \\briefly gain a \\plus10 foot bonus to your \\glossterm{speed} and are \\primed.
        \\longreminder{This doesn't increase your \\glossterm{available movement} this turn.}
      `,
      rank: 1,
      roles: ['exertion', 'focus'],
    },

    {
      name: 'Adrenaline+',

      cost: 'One \\glossterm{stamina}, unless you have a \\glossterm{vital wound}.',
      effect: `
        You \\briefly gain a \\plus20 foot bonus to your \\glossterm{speed} and are \\primed.
        \\longreminder{This doesn't increase your \\glossterm{available movement} this turn.}
      `,
      rank: 5,
      roles: ['exertion', 'focus'],
    },

    {
      name: 'Reaping Harvest',

      effect: `
        Move up to your \\glossterm{speed} in a straight line without reducing your \\glossterm{available movement}.
        You can also make a melee \\glossterm{strike}.
        The strike targets all \\glossterm{enemies} adjacent to you at any point during your movement.
      `,
      rank: 3,
      roles: ['clear'],
    },

    {
      name: 'Reaping Harvest+',

      effect: `
        Move up to your \\glossterm{speed} in a straight line without reducing your \\glossterm{available movement}.
        You can also make a melee \\glossterm{strike} that deals triple damage.
        The strike targets all \\glossterm{enemies} adjacent to you at any point during your movement.
      `,
      rank: 7,
      roles: ['clear'],
    },

    {
      name: 'Mighty Charge',

      cost: `Your available movement, if any, is reduced to zero.`,
      effect: `
        You can move up to your speed without reducing your \\glossterm{available movement}.
        Then, you can make a melee \\glossterm{strike} with a \\minus2 accuracy penalty that deals double \\glossterm{weapon damage}.
      `,
      rank: 3,
      roles: ['dive'],
    },

    {
      name: 'Push Through',

      effect: `
        Make a melee \\glossterm{strike}.
        \\hit If the target is a creature, you \\briefly do not consider it to be an \\glossterm{obstacle} when moving through its space.
        You still cannot end your movement in its space.
      `,
      rank: 1,
      roles: ['dive'],
    },

    {
      name: 'Charge',

      // Mostly irrelevant for intended usage, but makes it hard to yoyo
      cost: `Your available movement, if any, is reduced to zero.`,
      effect: `
        Move up to your speed in a single straight line without reducing your \\glossterm{available movement}.
        At the end of this movement, you can make a melee \\glossterm{strike}.
      `,
      rank: 1,
      roles: ['dive'],
    },

    {
      name: 'Fall Back',

      effect: `
        Make a melee \\glossterm{strike}.
        Then, you add half your \\glossterm{speed} to your \\glossterm{available movement}.
      `,
      rank: 1,
      roles: ['mobility', 'burst'],
    },
    {
      name: 'Fall Back+',

      effect: `
        Make a melee \\glossterm{strike}.
        Then, you add your \\glossterm{speed} to your \\glossterm{available movement}.
      `,
      rank: 3,
      roles: ['mobility', 'burst'],
    },

    {
      name: 'Flash Sweep',

      // Think of this as a rank 1 area, so drX.
      // It gets +2 accuracy, so drX-1.
      // That's about 20 damage vs 22 for a dr4 spell used at rank 5.
      effect: `
        You can move in a straight line, reducing your \\glossterm{available movement} as normal.
        During this movement, you move too quickly to be seen, making you \\trait{invisible}.
        While still invisible, you can make a melee \\glossterm{strike} that deals triple weapon damage.
        The strike targets all \\glossterm{enemies} adjacent to you at any point during your movement.
        After making the strike, you become visible at your destination.
      `,
      rank: 5,
      roles: ['clear', 'dive'],
    },

    {
      name: 'Flash Flurry',

      effect: `
        You can move in a straight line, reducing your \\glossterm{available movement} as normal.
        During this movement, you move too quickly to be seen, making you \\trait{invisible}.
        While still invisible, you can make two melee \\glossterm{strikes} that deal triple \\glossterm{weapon damage} at any point during your movement.
        After making the strikes, you become visible at your destination.
      `,
      rank: 7,
      roles: ['dive'],
    },

    {
      name: 'Flash Charge',

      effect: `
        You can move in a straight line, reducing your \\glossterm{available movement} as normal.
        During this movement, you move too quickly to be seen, making you \\trait{invisible}.
        When you arrive at your destination, you can make a melee \\glossterm{strike} there while still invisible.
        After making the strike, you become visible at your destination.
      `,
      rank: 3,
      roles: ['dive'],
    },

    {
      name: 'Carve the Air',

      effect: `
        Make a melee \\glossterm{strike}.
        If you are \\glossterm{midair} due to an intentional jump, you gain a \\plus1 accuracy bonus with the strike (see \\pcref{Jumping}).
        This bonus increases to \\plus2 against each target of the strike that is also midair.
      `,
      rank: 1,
      roles: ['payoff'],
    },

    {
      name: 'Carve the Air+',

      effect: `
        Make a melee \\glossterm{strike} that deals double damage.
        If you are \\glossterm{midair} due to an intentional jump, you gain a \\plus1 accuracy bonus with the strike (see \\pcref{Jumping}).
        This bonus increases to \\plus2 against each target of the strike that is also midair.
      `,
      rank: 5,
      roles: ['payoff'],
    },

    // TODO: higher rank version of this
    {
      name: 'Unbalancing Backstep',

      effect: `
        You are \\briefly \\braced.
        In addition, choose a creature you can see.
        You can move up to 5 feet away from that creature.
        Until your next turn, whenever that creature misses you with a melee \\glossterm{strike}, it takes a -2 penalty to its Armor defense.
        As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
      `,
      rank: 1,
      roles: ['turtle'],
    },

    // assume movement is worth 0.6 EA or so
    {
      name: 'Fearsome Charge',

      cost: `Your available movement, if any, is reduced to zero.`,
      effect: `
        Move up to half your \\glossterm{speed} without reducing your \\glossterm{available movement}.
        Then, make a melee \\glossterm{strike} that deals double damage.
        \\hit If your attack result also hits the target's Mental defense, it is \\briefly \\frightened by you.
      `,
      rank: 5,
      tags: ['Emotion'],
      roles: ['dive', 'softener'],
    },

    {
      name: 'Eyeflash Charge',

      // assume movement is worth 0.6 EA or so
      cost: `Your available movement, if any, is reduced to zero.`,
      effect: `
        Move up to half your movement speed without reducing your \\glossterm{available movement}.
        Then, make a \\glossterm{strike} that deals triple damage.
        \\hit The target \\briefly treats you as being \\trait{invisible}.
      `,
      rank: 7,
      tags: ['Emotion'],
      roles: ['dive', 'softener'],
    },

    {
      name: 'Frenzied Charge',

      cost: `Your available movement, if any, is reduced to zero.`,
      effect: `
        After using this ability, you \\briefly take a \\minus4 penalty to all defenses.

        Move up to your speed in a single straight line without reducing your \\glossterm{available movement}.
        At the end of your movement, you can make a melee \\glossterm{strike} that deals double damage.
        If you moved at least 15 feet during the charge, you gain a \\plus2 accuracy bonus with the strike.
      `,
      rank: 5,
      roles: ['dive'],
    },

    {
      name: 'Leap Slam',

      // Basically tiny radius from you, which is area rank 0. That would normally be drX+1, but this gets about +2 accuracy, so use drX.
      attack: {
        hit: `\\damagerankthree.`,
        halfOnMiss: true,
        targeting: `
          You jump, reducing your \\glossterm{available movement} as normal (see \\pcref{Jumping}).
          When you land at the end of your turn, make a \\glossterm{reactive attack} vs. Brawn against all \\glossterm{enemies} adjacent to you.
          You gain a \\plus1 accuracy bonus with this attack for every 10 feet of available movement that you spent on this jump.
        `,
      },
      rank: 3,
      roles: ['clear', 'dive'],
      tags: ['Earth', 'Physical'],
    },

    {
      name: 'Leap Slam+',

      functionsLike: {
        name: 'leap slam',
        exceptThat: 'the damage increases to \\damagerankseven.',
      },
      rank: 7,
      roles: ['clear', 'dive'],
      tags: ['Earth', 'Physical'],
    },
  ],
};
