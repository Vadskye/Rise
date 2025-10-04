import { Spell, mysticSpheres } from '.';

let allSpells: Record<string, Spell> | null = null;

export function getSpellByName(spellName: string) {
  if (!allSpells) {
    allSpells = {};
    for (const mysticSphere of mysticSpheres) {
      for (const spell of mysticSphere.spells) {
        allSpells[spell.name] = spell;
      }
    }
  }

  const spell = allSpells[spellName];
  if (spell) {
    // Callers could modify the spell, so we need to give them a copy
    return structuredClone(spell);
  } else {
    throw new Error(`Unable to find spell '${spellName}'`);
  }
}
