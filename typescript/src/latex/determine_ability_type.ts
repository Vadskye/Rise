import { SpellLike } from '@src/mystic_spheres';

export function determineAbilityType(spell: Pick<SpellLike, 'type'>): string {
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
