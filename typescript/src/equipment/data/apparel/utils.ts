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

export function skillItem(name: string, skill: string): StandardItem {
  return {
    name,
    rank: 3,
    short_description: `Grants +3 ${skill}`,
    description: `You gain a +3 \\glossterm{enhancement bonus} to the ${skill} skill (see \\pcref{${skill}}).`,
    magical: true,
    upgrades: [
      {
        rank: 6,
        short_description: `Grants +5 ${skill}`,
        description: 'The bonus increases to +5.',
      },
    ],
    tags: [],
    attunement: 'Attune',
    rarity: 'Common',
  };
}

export function reliableSkillItem(name: string, skills: string, summary: string): StandardItem {
  return {
    name,
    rank: 1,
    short_description: `Can reroll 1s with ${summary} skills`,
    description: `Whenever you roll a 1 on an attack or check using the ${skills} skills, you may reroll and take the higher result.\nYou can only reroll any individual roll once in this way.\nThis does not affect bonus dice rolled for exploding attacks.`,
    magical: true,
    upgrades: [
      {
        rank: 4,
        short_description: `Can reroll 3 or less with ${summary} skills`,
        description: 'You can also reroll when you roll a 2 or 3.',
      },
    ],
    tags: [],
    attunement: 'Attune',
    rarity: 'Common',
  };
}
