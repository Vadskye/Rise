import { sentenceCase } from 'change-case';

export function abilityUsageTime(usageTime: string | undefined, name: string) {
  if (usageTime && usageTime.slice(-1) === '.') {
    console.error(`Ability '${name}' usage time should not end in a period.`);
  }

  if (usageTime === 'minor action') {
    return '\\glossterm{Minor action}';
  } else if (usageTime) {
    return sentenceCase(usageTime);
  } else {
    return 'Standard action';
  }
}
