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
  ],
};
