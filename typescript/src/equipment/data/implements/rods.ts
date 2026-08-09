import { Implement, StandardItem, AttunementRequirement } from '../../types';

function rod(
  item: Omit<StandardItem, 'magical' | 'rarity' | 'tags' | 'upgrades' | 'attunement'> &
    Partial<Pick<StandardItem, 'upgrades' | 'tags' | 'attunement'>>,
): Implement {
  const tags = item.tags || [];
  let attunement: AttunementRequirement = item.attunement || 'Attune';
  if (tags.includes('Attune (deep)')) {
    attunement = 'Attune (deep)';
  } else if (tags.includes('Attune')) {
    attunement = 'Attune';
  }
  const cleanedTags = tags.filter((t) => t !== 'Attune' && t !== 'Attune (deep)');
  return {
    kind: 'Rod',
    item: {
      magical: true,
      rarity: 'Common',
      upgrades: item.upgrades || [],
      ...item,
      tags: cleanedTags,
      attunement,
    },
  };
}

export const rods = (): Implement[] => [
  rod({
    // Fan of Flames is an equivalent spell, and it deals dr2 + dr2 = 9 + 9 = 16.
    // Target damage is +29%, so ~21 damage.
    // Double dr3l is 22 damage, which is a bit high but about right.
    name: 'Rod of Flame',
    rank: 2,
    short_description: 'Deals $dr3l burning damage in a cone',
    description: `
      You can activate this rod as a standard action.
      When you do, make an attack vs. Armor and Reflex against everything within a \\smallarea cone, and you \\glossterm{briefly} cannot activate this rod again.
      Your minimum accuracy is $accuracy.
      \\hit $dr3l damage.
      The target also \\briefly \\debuff{burns} for $dr3l damage.
      \\miss Half damage, and the target does not burn.
    `,
    tags: ['Fire'],
    upgrades: [
      // Normal spell is dr4 + dr4 = 19 + 19 = 38 damage.
      // We want +37% damage, so ~51 damage.
      // The closest matching flat damage value is double 7d6.
      {
        rank: 4,
        short_description: 'Deals 7d6 burning damage in a cone',
        description:
          'The minimum accuracy increases to $accuracy and the damage increases to 7d6.',
      },
      // Normal spell is dr6 + dr6 = 38 + 38 = 76 damage.
      // We want +46% damage, so ~111 damage.
      // The closest matching flat damage value is double 10d10.
      {
        rank: 6,
        short_description: 'Deals 10d10 burning damage in a cone',
        description:
          'The minimum accuracy increases to $accuracy and the damage increases to 10d10.',
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
    tags: ['Electricity'],
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
    tags: ['Visual'],
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
