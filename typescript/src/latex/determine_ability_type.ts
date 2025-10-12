import { ActiveAbility } from '@src/abilities';

export function determineAbilityType(spell: Pick<ActiveAbility, 'type'>): string {
  if (!spell.type) {
    return 'activeability';
  } else if (spell.type.includes('Attune')) {
    return 'attuneability';
  } else if (spell.type.includes('Sustain')) {
    return 'sustainability';
  } else {
    return 'activeability';
  }
}
