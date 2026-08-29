import { Attribute } from '../../../types/core';
import { StandardItem } from '../../types';

// In terms of combat power, these items are not very strong. However, raw attributes
// provide bonuses beyond their combat potential, so it's dangerous to make them too
// cheap.
// Circlet of Strength is a deep attunement for +1 power. In general, +2 power is about
// +10% damage. 
// Circlet of Perception is a deep attunement for +0.5 accuracy. That's very weak.
export function attributeItem(name: string, attribute: Attribute): StandardItem {
  const title = attribute.charAt(0).toUpperCase() + attribute.slice(1);
  return {
    name,
    rank: 2,
    short_description: `Grants +1 ${attribute}`,
    description: `You gain a +1 \\glossterm{enhancement bonus} to your ${title}`,
    magical: true,
    upgrades: [
      {
        rank: 6,
        short_description: `Grants +2 ${attribute}`,
        description: 'The bonus increases to +2.',
      },
    ],
    tags: [],
    attunement: 'Attune (deep)',
    rarity: 'Common',
  };
}
