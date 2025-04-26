import { Spell } from '@src/mystic_spheres';

export function spellNarrative(spell: Pick<Spell, 'name' | 'narrative'>): string | null {
  if (spell.narrative) {
    if (spell.narrative.trim().length > 250) {
      console.log(`Spell ${spell.name} has overly long narrative text`);
    }
    return `
      \\textit{${spell.narrative.trim()}}
    `;
  } else {
    return null;
  }
}
