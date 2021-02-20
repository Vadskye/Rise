import { Spell } from "@src/mystic_spheres";

export function spellNarrative(spell: Pick<Spell, "narrative">): string | null {
  if (spell.narrative) {
    return `
      \\textit{${spell.narrative.trim()}}
    `;
  } else {
    return null;
  }
}
