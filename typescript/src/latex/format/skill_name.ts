import { RiseSkill } from '@src/core_mechanics/skills';
import { uppercaseFirst } from './uppercase_first';
import { titleCase } from './title_case';

export function skillName(skill: RiseSkill): string {
  if (skill === 'craft_untrained') {
    return 'Craft';
  }
  if (skill === 'sleight_of_hand') {
    return 'Sleight of Hand';
  }
  const subskillMatch = skill.match(/^(craft|knowledge)_(\w+)/);
  if (subskillMatch) {
    const subskill = subskillMatch[2].replaceAll('_', ' ');
    return `${uppercaseFirst(subskillMatch[1])} (${subskill})`;
  } else {
    return titleCase(skill.replaceAll('_', ' '));
  }
}
