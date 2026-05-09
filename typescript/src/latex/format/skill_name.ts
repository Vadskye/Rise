import { RiseSkill } from '@src/core_mechanics/skills';
import { uppercaseFirst } from './uppercase_first';
import { titleCase } from './title_case';

export function skillName(skill: RiseSkill): string {
  const subskillMatch = skill.match(/^(craft|knowledge|profession|perform)_(\w+)/);
  if (subskillMatch) {
    const category = uppercaseFirst(subskillMatch[1]);
    const subskill = subskillMatch[2];

    if (subskill === 'untrained') {
      return category;
    }

    return `${category} (${subskill.replaceAll('_', ' ')})`;
  } else {
    return titleCase(skill.replaceAll('_', ' '));
  }
}
