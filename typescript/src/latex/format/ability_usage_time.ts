import { sentenceCase } from 'change-case';
import { ActiveAbilityUsageTime } from '@src/abilities/active_abilities';

export function abilityUsageTime(usageTime: ActiveAbilityUsageTime | undefined, name: string) {
  if (usageTime && usageTime.slice(-1) === '.') {
    console.error(`Ability '${name}' usage time should not end in a period.`);
  }

  if (usageTime === 'minor') {
    return '\\glossterm{Minor action}';
  } else if (usageTime === 'elite') {
    return '\\glossterm{Elite action}';
  } else if (usageTime) {
    return sentenceCase(usageTime);
  } else {
    return 'Standard action';
  }
}
