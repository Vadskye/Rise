import { CombatStyle } from '.';

// This contains maneuvers that are only used by monsters, not players.
// This includes generic damage scaling maneuvers and specific maneuvers that are used by
// multiple separate monsters.
// Since we can't easily represent complex scaling concepts this way, some shared monster
// maneuvers like "Grappling Strike" are calculated in `creature.ts` instead.
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
    // Same as Leadership feat ability
    {
      name: 'Battle Command',
      effect: `
        Choose an \\glossterm{ally} within \\medrange.
        The target becomes \\focused and gains a \\plus1 accuracy bonus this round.
      `,
      rank: 1,
      roles: ['boon'],
    }
  ],
};
