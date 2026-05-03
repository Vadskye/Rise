import { Implement, StandardItem } from '../../types';

function wand(
  item: Omit<StandardItem, 'magical' | 'rarity' | 'tags' | 'upgrades'> &
    Partial<Pick<StandardItem, 'upgrades' | 'tags'>>,
): Implement {
  return {
    kind: 'Wand',
    item: {
      magical: true,
      rarity: 'Common',
      tags: item.tags || ['Attune'],
      upgrades: item.upgrades || [],
      ...item,
    },
  };
}

export const wands = (): Implement[] => {
  const items: Implement[] = [
    wand({
      name: 'Spell Wand, 1st',
      rank: 1,
      short_description: 'Grants knowledge of a rank 1 spell',
      description: `
        This wand grants you knowledge of a single rank 1 spell.
        Each wand is associated with a specific spell.
        You must have the ability to cast spells that are no more than one rank lower than the wand's rank (minimum 1).
        In addition, your \\glossterm{magic source} must grant access to the \\glossterm{mystic sphere} that the spell belongs to.
        However, you do not need to have access to the \\glossterm{mystic sphere} that the spell belongs to.

        If you can cast spells of a higher rank than the wand's rank, the spell from the wand gains any appropriate rank upgrades.
        If you stop wielding this wand, deattune from it, or otherwise lose access to its magical effects, the effects of any active spells that you know because of the wand also end, regardless of their normal duration.
      `,
    }),
    wand({
      name: 'Spell Wand, 2nd',
      rank: 2,
      short_description: 'Grants knowledge of a rank 2 spell',
      description:
        'This item functions like a \\mitem{spell wand}, except that it grants knowledge of a single rank 2 spell.',
    }),
    wand({
      name: 'Spell Wand, 3rd',
      rank: 3,
      short_description: 'Grants knowledge of a rank 3 spell',
      description:
        'This item functions like a \\mitem{spell wand}, except that it grants knowledge of a single rank 3 spell.',
    }),
  ];

  const nth = (rank: number) => {
    items.push(
      wand({
        name: `Spell Wand, ${rank}th`,
        rank,
        short_description: `Grants knowledge of a rank ${rank} spell`,
        description: `This item functions like a \\mitem{spell wand}, except that it grants knowledge of a single rank ${rank} spell.`,
      }),
    );
  };

  nth(4);
  nth(5);
  nth(6);
  nth(7);

  return items;
};
