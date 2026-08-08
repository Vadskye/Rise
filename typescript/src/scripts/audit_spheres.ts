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

// Group by sphere
const spheresMap = new Map<string, SpellDetail[]>();
for (const s of allSpells) {
  if (!spheresMap.has(s.sphere)) {
    spheresMap.set(s.sphere, []);
  }
  spheresMap.get(s.sphere)!.push(s);
}

for (const [sphereName, spells] of spheresMap.entries()) {
  console.log(`========================================`);
  console.log(`SPHERE: ${sphereName} (${spells.length} spells)`);
  console.log(`========================================`);
  for (const s of spells) {
    const hasPhys = s.tags.includes('Physical');
    const hasManif = s.tags.includes('Manifestation');
    const tagStr = s.tags.length ? s.tags.join(', ') : 'NONE';
    console.log(`  - ${s.name} (Rank ${s.rank}) [Tags: ${tagStr}]`);
    const fullText = [s.narrative, s.effect, s.attackHit, s.attackTargeting]
      .filter(Boolean)
      .join(' | ');
    console.log(`    Text snippet: ${fullText.replace(/\s+/g, ' ').substring(0, 180)}...`);
  }
  console.log('\n');
}
