import { ActiveAbility } from '@src/abilities';

export function determineAbilityType(
  ability: Pick<ActiveAbility, 'isMagical' | 'type' | 'usageTime'>,
): string {
  let abilityType = 'activeability';
  if (ability.usageTime === 'elite') {
    abilityType = 'eliteability';
  } else if (ability.usageTime === 'triggered') {
    abilityType = 'triggeredability';
  } else if (!ability.type) {
    abilityType = 'activeability';
  } else if (ability.type.includes('Attune')) {
    abilityType = 'attuneability';
  } else if (ability.type.includes('Sustain')) {
    abilityType = 'sustainability';
  }

  const magicalPrefix = ability.isMagical ? 'magical' : '';
  return `${magicalPrefix}${abilityType}`;
}
