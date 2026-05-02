import { Implement, StandardItem } from '../../types';

function rod(
  item: Omit<StandardItem, 'magical' | 'rarity' | 'tags' | 'upgrades'> &
    Partial<Pick<StandardItem, 'upgrades' | 'tags'>>,
): Implement {
  return {
    kind: 'Rod',
    item: {
      magical: true,
      rarity: 'Common',
      tags: item.tags || ['Attune'],
      upgrades: item.upgrades || [],
      ...item,
    },
  };
}

export const rods = (): Implement[] => [
  rod({
    name: 'Rod of Flame',
    rank: 2,
    short_description: 'Deals $dr2l damage in a cone',
    description: `
      You can activate this rod as a standard action.
      When you do, make an attack vs. Reflex against everything within a \\smallarea cone.
      Your minimum accuracy is $accuracy.
      \\hit $dr2l damage.
      \\miss Half damage.
    `,
    tags: ['Fire', 'Attune'],
    upgrades: [
      {
        rank: 4,
        short_description: 'Deals $dr4l damage in a cone',
        description:
          'The minimum accuracy increases to $accuracy and the damage increases to $dr4l.',
      },
    ],
  }),
  rod({
    name: 'Rod of Dragonflame',
    rank: 6,
    short_description: 'Deals $dr5l damage in a large cone',
    description: `
      You can activate this rod as a standard action.
      When you do, make an attack vs. Reflex against everything within a \\largearea cone.
      Your minimum accuracy is $accuracy.
      \\hit $dr5l damage.
      \\miss Half damage.
    `,
    tags: ['Fire', 'Attune'],
  }),
  rod({
    name: 'Rod of Translocation',
    rank: 2,
    short_description: 'Can teleport up to 30 feet',
    description: `
      You can activate this rod as a standard action.
      When you do, you \\glossterm{teleport} to an unoccupied location within \\shortrange.
    `,
    upgrades: [
      {
        rank: 4,
        short_description: 'Can teleport up to 60 feet',
        description: 'The range increases to \\medrange.',
      },
      {
        rank: 6,
        short_description: 'Can teleport up to 90 feet',
        description: 'The range increases to \\longrange.',
      },
    ],
  }),
  rod({
    name: 'Radiant Rod',
    rank: 2,
    short_description: 'Can deal $dr2l damage',
    description: `
      This rod sheds \\glossterm{bright illumination} in a \\smallarea radius.
      You can activate it as a standard action.
      When you do, it fires a ray of light at anything within \\shortrange.
      Make an attack against the target's Reflex defense.
      Your minimum accuracy is $accuracy.
      Whether you hit or miss, \\glossterm{bright illumination} \\glossterm{briefly} fills a 30 foot radius around a 5 ft. wide straight line between you and the target.
      \\hit $dr2l damage.
      If this attack beats a creature's Fortitude defense, it deals maximum damage.
    `,
    tags: ['Visual', 'Attune'],
    upgrades: [
      {
        rank: 4,
        short_description: 'Can deal $dr4l damage',
        description:
          'The minimum accuracy increases to $accuracy, and the damage increases to $dr4l.',
      },
      {
        rank: 6,
        short_description: 'Can deal $dr6l damage',
        description:
          'The minimum accuracy increases to $accuracy, and the damage increases to $dr6l.',
      },
    ],
  }),
];
