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

const allSpells: SpellDetail[] = JSON.parse(fs.readFileSync('all_spells_dump.json', 'utf8'));

// Filter out "functionsLike" variant spells to keep analysis clean, but track base spells
const uniqueSpells = allSpells.filter((s) => !s.functionsLikeName);

console.log(
  `Loaded ${allSpells.length} total spell entries (${uniqueSpells.length} unique base spells/cantrips/rituals).\n`,
);

// Group by sphere
const spheres = Array.from(new Set(allSpells.map((s) => s.sphere)));

for (const sphere of spheres) {
  const sphereSpells = uniqueSpells.filter((s) => s.sphere === sphere);
  console.log(`========================================`);
  console.log(`SPHERE: ${sphere} (${sphereSpells.length} unique base spells)`);
  console.log(`========================================`);

  for (const s of sphereSpells) {
    const text = [s.narrative || '', s.effect || '', s.attackHit || '', s.attackTargeting || '']
      .join(' ')
      .replace(/\s+/g, ' ');
    const hasPhys = s.tags.includes('Physical');
    const hasManif = s.tags.includes('Manifestation');

    console.log(
      `- ${s.name} [Rank ${s.rank}] | Tags: [${s.tags.join(', ')}] | Type: ${s.type || 'Standard'}`,
    );
    if (s.narrative) {
      console.log(`  Narrative: ${s.narrative}`);
    }
    if (s.effect) {
      console.log(`  Effect: ${s.effect}`);
    }
    if (s.attackHit) {
      console.log(`  Hit: ${s.attackHit}`);
    }
    if (s.attackTargeting) {
      console.log(`  Targeting: ${s.attackTargeting}`);
    }
    console.log('');
  }
}
