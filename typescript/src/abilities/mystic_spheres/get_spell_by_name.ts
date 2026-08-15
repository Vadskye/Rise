import { allMysticSpheres } from '.';
import type { SpellDefinition } from '@src/abilities';

let allSpells: Record<string, SpellDefinition> | null = null;

export function getSpellByName(spellName: string) {
  if (!allSpells) {
    allSpells = {};
    for (const mysticSphere of allMysticSpheres) {
      for (const spell of mysticSphere.spells) {
        allSpells[spell.name.toLowerCase()] = spell;
      }
      if (mysticSphere.cantrips) {
        for (const cantrip of mysticSphere.cantrips) {
          allSpells[cantrip.name.toLowerCase()] = cantrip as any;
        }
      }
    }
  }

  const spell = allSpells[spellName.toLowerCase()];
  if (spell) {
    // Callers could modify the spell, so we need to give them a copy
    return structuredClone(spell);
  } else {
    throw new Error(`Unable to find spell '${spellName}'`);
  }
}
