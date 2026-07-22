import { allMysticSpheres, rituals } from '../abilities/mystic_spheres';

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

console.log(`Total Spells evaluated: ${allSpells.length}\n`);

for (const s of allSpells) {
  // Skip variant spells that function like another spell (e.g. Mighty X, Massive X) unless we want to note them
  const hasPhys = s.tags.includes('Physical');
  const hasManif = s.tags.includes('Manifestation');
  
  const text = [
    s.narrative || '',
    s.effect || '',
    s.attackHit || '',
    s.attackTargeting || '',
  ].join(' ').toLowerCase();

  // Print any spell that might be relevant for analysis
  console.log(`=== [${s.sphere}] ${s.name} (Rank ${s.rank}) ===`);
  console.log(`Tags: [${s.tags.join(', ')}] | Type: ${s.type || 'Standard'}`);
  if (s.functionsLikeName) console.log(`Functions Like: ${s.functionsLikeName}`);
  console.log(`Text: ${text.replace(/\s+/g, ' ')}\n`);
}
