import * as fs from 'fs';
import * as path from 'path';

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

const dumpPath = path.join(__dirname, 'all_spells_dump.json');
if (!fs.existsSync(dumpPath)) {
  console.log('all_spells_dump.json not found. Run dump_by_sphere.ts first!');
  process.exit(1);
}

const allSpells: SpellDetail[] = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));

// Filter out variants that inherit tags from base spells (functionsLikeName)
const baseSpells = allSpells.filter(s => !s.functionsLikeName);

console.log(`Base spells to audit: ${baseSpells.length}\n`);

const results: {
  sphere: string;
  name: string;
  rank?: number;
  currentTags: string[];
  suggestedTags: string[];
  reason: string;
  textSnippet: string;
}[] = [];

for (const s of baseSpells) {
  const text = [s.narrative || '', s.effect || '', s.attackHit || '', s.attackTargeting || ''].join(' ').replace(/\s+/g, ' ');

  const hasPhys = s.tags.includes('Physical');
  const hasManif = s.tags.includes('Manifestation');

  const missing: string[] = [];
  let reason = '';

  // 1. Treeseal
  if (s.name === 'Treeseal') {
    missing.push('Physical', 'Manifestation');
    reason = 'Creates a physical grove of trees with HP/defenses that traps the target (Physical; incorporeal entities are unaffected) and is formed temporarily from magic (Manifestation).';
  }
  // 2. Shillelagh - Transforms existing stick, so ONLY Physical, NOT Manifestation
  else if (s.name === 'Shillelagh') {
    if (!hasPhys) missing.push('Physical');
    reason = 'Transforms an existing physical stick into a weapon. Since it alters an existing object rather than creating a new temporary object from raw magic, it is Physical but NOT Manifestation.';
  }
  // 3. Barkskin & Greater Barkskin - Enhances physical armor/body
  else if (s.name === 'Barkskin' || s.name === 'Greater Barkskin') {
    if (!hasPhys) missing.push('Physical');
    reason = 'Hardens the target\'s physical body/skin into bark granting an Armor bonus (Physical armor enhancement).';
  }
  // 4. Embedded Growth
  else if (s.name === 'Embedded Growth') {
    if (!hasPhys) missing.push('Physical');
    if (!hasManif) missing.push('Manifestation');
    reason = 'Embeds a physical seed into flesh (Physical) that manifests temporary plant growth/undergrowth as it erupts (Manifestation).';
  }
  // 5. Entangle, Entangling Field, Tripping Vine - Have Manifestation, missing Physical
  else if (s.name === 'Entangle' || s.name === 'Entangling Field' || s.name === 'Tripping Vine') {
    if (!hasPhys) missing.push('Physical');
    reason = 'Plants grow from nowhere to physically restrain/slow grounded targets. Since incorporeal creatures cannot be held by physical vines, these require Physical.';
  }
  // 6. Wall of Thorns, Wall of Ice, Ice Globe, Wall of Stone
  else if (s.name === 'Wall of Thorns' || s.name === 'Wall of Ice' || s.name === 'Ice Globe' || s.name === 'Wall of Stone') {
    if (!hasPhys) missing.push('Physical');
    reason = 'Creates a physical wall/structure of thorns, ice, or stone with HP. Incorporeal entities pass through physical walls without impediment.';
  }
  // 7. Icecraft & Ice Shield
  else if (s.sphere === 'Cryomancy' && (s.name === 'Icecraft' || s.name === 'Ice Shield' || s.name === 'Greater Ice Shield')) {
    if (!hasPhys) missing.push('Physical');
    if (!hasManif) missing.push('Manifestation');
    reason = 'Creates temporary physical weapons, armor, or shields out of ice/water that vanish when destroyed or duration ends.';
  }
  // 8. Swallowed by Earth
  else if (s.name === 'Swallowed by Earth') {
    if (!hasPhys) missing.push('Physical');
    reason = 'Traps/buries targets in physical earth/rock (incorporeal creatures are immune to physical earth trapping).';
  }
  // 9. Rituals (Animated Attendant, Floating Platform, Mystic Cage, Tiny Hut)
  else if (s.sphere === 'Rituals') {
    if (s.name === 'Animated Attendant') {
      if (!hasPhys) missing.push('Physical');
      if (!hasManif) missing.push('Manifestation');
      reason = 'Creates a temporary Small physical creature that carries objects.';
    } else if (s.name === 'Floating Platform') {
      if (!hasManif) missing.push('Manifestation');
      reason = 'Creates a temporary solid platform of force capable of supporting physical weight.';
    } else if (s.name === 'Mystic Cage' || s.name === 'Tiny Hut') {
      if (!hasPhys) missing.push('Physical');
      reason = 'Creates a physical cage/shelter barrier that blocks physical passability.';
    }
  }

  if (missing.length > 0) {
    results.push({
      sphere: s.sphere,
      name: s.name,
      rank: s.rank,
      currentTags: s.tags,
      suggestedTags: Array.from(new Set([...s.tags, ...missing])),
      reason,
      textSnippet: text.substring(0, 150),
    });
  }
}

console.log(`Found ${results.length} flagged spell candidates:\n`);
for (const r of results) {
  console.log(`[${r.sphere}] ${r.name} (Rank ${r.rank})`);
  console.log(`  Current: [${r.currentTags.join(', ')}] -> Suggested: [${r.suggestedTags.join(', ')}]`);
  console.log(`  Reason: ${r.reason}`);
  console.log(`  Text: ${r.textSnippet}...`);
  console.log('');
}
