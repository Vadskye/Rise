import { RiseSkill } from '@src/character_sheet/rise_data';
import { uppercaseFirst } from './uppercase_first';

export function skillName(skill: RiseSkill): string {
  return skill.split('_').map(uppercaseFirst).join(' ');
}
