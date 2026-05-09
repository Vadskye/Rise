import { Tool, StandardItem } from '../../types';
import { calculateMinimumLevel } from '../../item_creature';

function awareness_dv(rank: number): number {
  return 9 + calculateMinimumLevel(rank);
}

function ground_deployment(rank: number): string {
  const dv = awareness_dv(rank);
  return `
    You can deploy this trap on a space on the ground adjacent to you as a standard action.
    While this trap is deployed, a creature can notice it with a \\glossterm{difficulty value} ${dv} Awareness check.
    A creature that notices the trap can avoid triggering it while moving.
    The first time something enters the trap's space without avoiding the trap, the trap activates.
  `.trim();
}

function createTrap(data: Partial<StandardItem>, subskill: string): Tool {
  return {
    category: { kind: 'Trap', subskill },
    item: {
      magical: false,
      rarity: 'Common',
      tags: [],
      upgrades: [],
      description: '',
      short_description: '',
      name: '',
      rank: 0,
      ...data,
    },
  };
}

export function traps(): Tool[] {
  return [
    createTrap(
      {
        name: 'Foothold Trap',
        rank: 1,
        short_description: 'Temporarily immobilizes',
        description: `
          ${ground_deployment(1)}

          When the trap is activated, it makes a $accuracy \\glossterm{reactive attack} vs. Reflex against the source of that activation.
          After the trap triggers, it must be manually deployed again.
          \\hit The target is \\slowed until it breaks free of the trap.
          Breaking free of the trap requires making a DV 10 Strength or Devices check as a standard action.
        `,
        upgrades: [
          {
            rank: 3,
            short_description: 'Temporarily immobilizes',
            description: `
              The accuracy increases to $accuracy, and the Awareness DV increases to ${awareness_dv(3)}.
            `,
          },
        ],
      },
      'metal',
    ),
    createTrap(
      {
        name: 'Bear Trap',
        rank: 2,
        short_description: 'Deals $dr4l damage and immobilizes',
        description: `
          ${ground_deployment(2)}

          When the trap is activated, it makes a $accuracy \\glossterm{reactive attack} vs. Armor and Reflex against the source of that activation.
          After the trap triggers, it must be manually deployed again.
          \\hit $dr4l piercing damage.
          If the target takes damage, it is \\slowed until it breaks free of the trap.
          Breaking free of the trap requires making a DV 10 Strength or Devices check as a standard action.
        `,
        upgrades: [
          {
            rank: 4,
            short_description: 'Deals $dr6l damage and immobilizes',
            description: `
              The accuracy increases to $accuracy, the Awareness DV increases to ${awareness_dv(4)}, and the damage increases to $dr6l.
            `,
          },
        ],
      },
      'metal',
    ),
    createTrap(
      {
        name: 'Fireburst Trap',
        rank: 2,
        short_description: 'Deals $dr3l damage in a small area',
        description: `
          ${ground_deployment(2)}

          When the trap is activated, it makes a $accuracy \\glossterm{reactive attack} vs. Reflex against everything in a \\smallarea radius of it.
          After the trap triggers, it must be repaired with a DV ${awareness_dv(2)} Devices check before it can be deployed again.
          \\hit $dr3l damage.
        `,
        tags: ['Fire'],
        upgrades: [
          {
            rank: 4,
            short_description: 'Deals $dr6l damage in a small area',
            description: `
              The accuracy increases to $accuracy, the damage increases to $dr6l, and the Awareness and Devices DVs each increase to ${awareness_dv(4)}.
            `,
          },
          {
            rank: 6,
            short_description: 'Deals $dr8l damage in a small area',
            description: `
              The accuracy increases to $accuracy, the damage increases to $dr8l, and the Awareness and Devices DVs each increase to ${awareness_dv(6)}.
            `,
          },
        ],
      },
      'alchemy, metal',
    ),
    createTrap(
      {
        name: 'Caltrops',
        rank: 2,
        short_description: 'Deals $dr1l damage when stepped on',
        description: `
          A caltrop is a four-pronged iron spike crafted so that one prong faces up no matter how the caltrop comes to rest.
          As a standard action, you can scatter caltrops on the ground in the hope that your enemies step on them or are at least forced to slow down to avoid them.
          One 2-pound bag of caltrops covers a 5-foot square.
          They can generally be noticed with a \\glossterm{difficulty value} 8 Awareness check.

          Whenever a creature moves into the area, unless the creature moves at half speed to avoid the danger, the caltrops make a $accuracy \\glossterm{reactive attack} vs. Armor against the creature.
          \\hit $dr1l piercing damage.

          Caltrops may not be effective against creatures with an unusual anatomy.
          Multiple applications of caltrops in the same area have no additional effect.
        `,
        upgrades: [
          {
            rank: 4,
            short_description: 'Deals $dr3l damage when stepped on',
            description: `
              The accuracy increases to $accuracy, and the damage increases to $dr3l.
            `,
          },
          {
            rank: 6,
            short_description: 'Deals $dr5l damage when stepped on',
            description: `
              The accuracy increases to $accuracy, and the damage increases to $dr5l.
            `,
          },
        ],
      },
      'alchemy, metal',
    ),
  ];
}
