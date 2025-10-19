import { RiseSkill } from '@src/character_sheet/rise_data';
import { uppercaseFirst } from './uppercase_first';
import { titleCase } from './title_case';

export function skillName(skill: RiseSkill): string {
  const subskillMatch = skill.match(/^(craft|knowledge)_(\w+)/);
  if (subskillMatch) {
    return `${uppercaseFirst(subskillMatch[1])} (${subskillMatch[2]})`;
  } else {
    return titleCase(skill.replaceAll('_', ' '));
  }
}
