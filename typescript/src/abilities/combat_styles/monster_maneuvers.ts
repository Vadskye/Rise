import { CombatStyle } from '.';

// Naming conventions:
export const monsterManeuvers: CombatStyle = {
  name: 'Monster Maneuvers',
  shortDescription: 'Only used for monsters. Should not appear in the book text directly.',

  maneuvers: [
    {
      name: 'Basic Strike',
      effect: `
        Make a strike.
      `,
      rank: 1,
      roles: ['burst'],
    },
    {
      name: 'Double Damage',
      effect: `
        Make a strike with a \\minus1 accuracy penalty that deals double damage.
      `,
      rank: 4,
      roles: ['burst'],
    },
    {
      name: 'Triple Damage',
      effect: `
        Make a strike that deals triple damage.
      `,
      rank: 6,
      roles: ['burst'],
    },

    {
      name: 'Weapon Mult 1',
      effect: `
        Make a strike.
      `,
      rank: 1,
      roles: ['burst'],
    },

    {
      name: 'Weapon Mult 2',
      effect: `
        Make a strike with a +1 accuracy bonus.
      `,
      rank: 2,
      roles: ['burst'],
    },

    {
      name: 'Weapon Mult 3',
      effect: `
        Make a strike that deals double weapon damage.
      `,
      rank: 3,
      roles: ['burst'],
    },

    {
      name: 'Weapon Mult 4',
      effect: `
        Make a strike that deals triple weapon damage.
      `,
      rank: 4,
      roles: ['burst'],
    },

    {
      name: 'Weapon Mult 5',
      effect: `
        Make a strike that deals triple weapon damage and extra damage equal to half your power.
      `,
      rank: 5,
      roles: ['burst'],
    },

    {
      name: 'Weapon Mult 6',
      effect: `
        Make a strike that deals five times weapon damage and extra damage equal to half your power.
      `,
      rank: 6,
      roles: ['burst'],
    },

    // Safer than the mostly equivalent 8x weapon damage plus half power that some player
    // abilities use.
    {
      name: 'Weapon Mult 7',
      effect: `
        Make a strike that deals six times weapon damage and extra damage equal to your power.
      `,
      rank: 7,
      roles: ['burst'],
    },
  ],
};
