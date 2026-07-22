import { allMysticSpheres, rituals } from '../abilities/mystic_spheres';
import * as fs from 'fs';

interface SpellDetail {
  sphere: string;
  name: string;
  tags: string[];
  type?: string;
  roles?: string[];
  narrative?: string;
  effect?: string;
  attackHit?: string;
  attackTargeting?: string;
  functionsLikeName?: string;
  rank?: number;
}

const allSpells: SpellDetail[] = [];

for (const sphere of allMysticSpheres) {
  if (sphere.cantrips) {
    for (const c of sphere.cantrips) {
      allSpells.push({
        sphere: sphere.name,
        name: c.name,
        tags: c.tags || [],
        type: c.type,
        roles: c.roles,
        narrative: c.narrative,
        effect: c.effect,
        attackHit: c.attack?.hit,
        attackTargeting: c.attack?.targeting,
        rank: 0,
      });
    }
  }
  if (sphere.spells) {
    for (const s of sphere.spells) {
      allSpells.push({
        sphere: sphere.name,
        name: s.name,
        tags: s.tags || [],
        type: s.type,
        roles: s.roles,
        narrative: s.narrative,
        effect: s.effect,
        attackHit: s.attack?.hit,
        attackTargeting: s.attack?.targeting,
        functionsLikeName: s.functionsLike?.name,
        rank: s.rank,
      });
    }
  }
}

for (const r of rituals) {
  allSpells.push({
    sphere: 'Rituals',
    name: r.name,
    tags: r.tags || [],
    type: r.type,
    roles: r.roles,
    narrative: r.narrative,
    effect: r.effect,
    attackHit: r.attack?.hit,
    attackTargeting: r.attack?.targeting,
    rank: r.rank,
  });
}

// Write a full JSON report to a file so we can programmatically inspect or filter it
fs.writeFileSync('all_spells_dump.json', JSON.stringify(allSpells, null, 2));
console.log(`Exported ${allSpells.length} spells to all_spells_dump.json`);
