import { Attribute } from '../../../types/core';
import { StandardItem } from '../../types';

export function attributeItem(name: string, attribute: Attribute): StandardItem {
  const title = attribute.charAt(0).toUpperCase() + attribute.slice(1);
  return {
    name,
    rank: 3,
    short_description: `Grants +1 ${attribute}`,
    description: `You gain a +1 \\glossterm{enhancement bonus} to your ${title}`,
    magical: true,
    upgrades: [
      {
        rank: 7,
        short_description: `Grants +2 ${attribute}`,
        description: 'The bonus increases to +2.',
      },
    ],
    tags: [],
    attunement: 'Attune (deep)',
    rarity: 'Common',
  };
}
