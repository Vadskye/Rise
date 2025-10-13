import { ActiveAbility } from '@src/abilities';

export function determineAbilityType(ability: Pick<ActiveAbility, 'isMagical' | 'type'>): string {
  let durationType = 'activeability';
  if (!ability.type) {
    durationType = 'activeability';
  } else if (ability.type.includes('Attune')) {
    durationType = 'attuneability';
  } else if (ability.type.includes('Sustain')) {
    durationType = 'sustainability';
  }

  const magicalPrefix = ability.isMagical ? 'magical' : '';
  return `${magicalPrefix}${durationType}`;
}
