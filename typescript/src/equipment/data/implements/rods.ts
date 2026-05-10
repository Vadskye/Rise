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
    // Small cone of burn is dr1 + dr1 normally, which is 7 + 7 = 14 at rank 2.
    // Compare a one-shot burst of dr3, which is 11 at rank 2.
    // Double dr2l is 16, which is a little low on damage, so bump minimum accuracy by 1.
    name: 'Rod of Flame',
    rank: 2,
    short_description: 'Deals $dr2l burning damage in a cone',
    description: `
      You can activate this rod as a standard action.
      When you do, make an attack vs. Reflex against everything within a \\smallarea cone, and you \\glossterm{briefly} cannot activate this rod again.
      Your minimum accuracy is $accuracy+1.
      \\hit $dr2l damage.
      At the end of its next turn, the target takes $dr2l again.
      \\miss Half damage, and no delayed damage.
    `,
    tags: ['Fire', 'Attune'],
    upgrades: [
      // Normally dr3+dr3 = 31. Double dr4l is 33. Double dr5l is 45.
      // A single damage burst would be dr5 = 23.
      // We choose a nonstandard damage value here to allow more precise scaling.
      {
        rank: 4,
        short_description: 'Deals 4d10 burning damage in a cone',
        description:
          'The minimum accuracy increases to $accuracy and the damage increases to 4d10.',
      },
      // Normally dr5+dr5 = 60. Double dr6l is 63. Double dr7l is 88, which is 46% over 60, which is about right
      {
        rank: 6,
        short_description: 'Deals $dr7l burning damage in a cone',
        description:
          'The minimum accuracy increases to $accuracy and the damage increases to $dr7l.',
      },
    ],
  }),
  rod({
    // Short range chain 1 is drX.
    // At rank 1, dr1 is 6. We want +25%, so dr2l works.
    name: 'Arcing Rod',
    rank: 1,
    short_description: 'Deals $dr2l damage in a chain',
    description: `
      You can activate this rod as a standard action.
      When you do, make an attack vs. Fortitude against something within \\shortrange, and you \\glossterm{briefly} cannot activate this rod again.
      This attack \\glossterm{chains} once.
      Your minimum accuracy is $accuracy.
      \\hit $dr2l damage.
    `,
    tags: ['Electricity', 'Attune'],
    upgrades: [
      {
        rank: 3,
        short_description: 'Deals $dr4l in a chain.',
        description:
          'The minimum accuracy increases to $accuracy and the damage increases to $dr4l.',
      },
      {
        rank: 5,
        short_description: 'Deals $dr5l in a chain.',
        description:
          'The minimum accuracy increases to $accuracy and the damage increases to $dr5l.',
      },
    ],
  }),
  rod({
    name: 'Rod of Translocation',
    rank: 1,
    short_description: 'Can teleport up to 30 feet',
    description: `
      You can activate this rod as a standard action.
      When you do, you \\glossterm{teleport} to an unoccupied location within \\shortrange, and you \\glossterm{briefly} cannot activate this rod again.
    `,
    upgrades: [
      {
        rank: 3,
        short_description: 'Can teleport up to 60 feet',
        description: 'The range increases to \\medrange.',
      },
      {
        rank: 5,
        short_description: 'Can teleport up to 90 feet',
        description: 'The range increases to \\longrange.',
      },
    ],
  }),
  rod({
    // short range double defense is +2dr, so dr4 at rank 2, which is 12 damage, or 11 as a target for flat damage.
    // dr3l is 11 damage, which is too low. dr4l is 16, which is too high. We want 14 damage, so use a custom damage value.
    name: 'Radiant Rod',
    rank: 2,
    short_description: 'Can deal 4d6 damage and dazzle',
    description: `
      This rod sheds \\glossterm{bright illumination} in a \\smallarea radius.
      You can activate it as a standard action.
      When you do, it fires a ray of light at anything within \\shortrange, and you \\glossterm{briefly} cannot activate this rod again.
      Make an attack against the target's Fortitude and Reflex defenses.
      Your minimum accuracy is $accuracy.
      Whether you hit or miss, \\glossterm{bright illumination} \\glossterm{briefly} fills a 30 foot radius around a 5 ft. wide straight line between you and the target.
      \\hit 4d6 damage.
      \\injury The target is \\glossterm{briefly} \\dazzled.
    `,
    tags: ['Visual', 'Attune'],
    upgrades: [
      {
        // dr6 is 29 damage, or 26 as a target for flat damage.
        // dr5l is 22 damage, which is a bit low, but fine with the debuff.
        rank: 4,
        short_description: 'Can deal $dr5l damage and dazzle',
        description:
          'The minimum accuracy increases to $accuracy, and the damage increases to $dr5l.',
      },
      {
        // dr8 is 56 damage, or 50 as a target for flat damage.
        // dr7l is 44 damage, which is a bit low, but fine with the debuff.
        rank: 6,
        short_description: 'Can deal $dr7l damage and blind',
        description:
          'The minimum accuracy increases to $accuracy, and the damage increases to $dr7l. The target is also \\blinded instead of dazzled on injury.',
      },
    ],
  }),
];
