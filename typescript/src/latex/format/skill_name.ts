import { RiseSkill } from '@src/character_sheet/rise_data';
import { uppercaseFirst } from './uppercase_first';

export function skillName(skill: RiseSkill): string {
  return uppercaseFirst(skill.replace('_', ' '));
}
