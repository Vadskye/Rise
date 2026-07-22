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
  const textLower = text.toLowerCase();

  const hasPhys = s.tags.includes('Physical');
  const hasManif = s.tags.includes('Manifestation');
  const hasBarrier = s.tags.includes('Barrier');

  const missing: string[] = [];
  let reason = '';

  if (s.name === 'Treeseal') {
    missing.push('Physical', 'Manifestation');
    reason = 'Creates a physical grove of trees with HP/defenses that traps the target (Physical; cannot affect incorporeal) and is formed temporarily from magic (Manifestation).';
  } else if (s.name === 'Barkskin' || s.name === 'Greater Barkskin') {
    if (!hasPhys) missing.push('Physical');
    if (!hasManif) missing.push('Manifestation');
    reason = 'Hardens the user\'s physical body/skin into wooden bark (Physical armor enhancement; Manifestation of plant layer/bark).';
  } else if (s.name === 'Embedded Growth') {
    if (!hasPhys) missing.push('Physical');
    if (!hasManif) missing.push('Manifestation');
    reason = 'Embeds a physical seed into flesh that grows painfully and bursts into undergrowth.';
  } else if (s.name === 'Shillelagh') {
    if (!hasPhys) missing.push('Physical');
    if (!hasManif) missing.push('Manifestation');
    reason = 'Transforms a physical wooden stick into a combat club/weapon temporarily.';
  } else if (s.name === 'Entangle' || s.name === 'Entangling Field' || s.name === 'Tripping Vine') {
    if (!hasPhys) missing.push('Physical');
    reason = 'Restrains/slows grounded targets using physical plant vines growing from earth/undergrowth (should not affect incorporeal creatures).';
  } else if (s.name === 'Wall of Thorns') {
    if (!hasPhys) missing.push('Physical');
    reason = 'Creates a physical wall of thorns with HP that physically impedes movement and damages creatures passing through.';
  } else if (s.sphere === 'Cryomancy') {
    if (s.name === 'Wall of Ice' || s.name === 'Ice Globe') {
      if (!hasPhys) missing.push('Physical');
      reason = 'Creates a physical wall/sphere of clear ice with HP through which physical objects/creatures cannot pass.';
    } else if (s.name === 'Icecraft' || s.name === 'Ice Shield' || s.name === 'Greater Ice Shield') {
      if (!hasPhys) missing.push('Physical');
      if (!hasManif) missing.push('Manifestation');
      reason = 'Creates temporary physical weapons, armor, or shields out of ice/water.';
    }
  } else if (s.sphere === 'Terramancy') {
    if (s.name === 'Wall of Stone') {
      if (!hasPhys) missing.push('Physical');
      reason = 'Creates a physical wall of solid stone with HP. Incorporeal creatures pass through solid stone.';
    } else if (s.name === 'Swallowed by Earth') {
      if (!hasPhys) missing.push('Physical');
      reason = 'Traps/buries targets in physical earth/rock (incorporeal creatures are immune).';
    }
  } else if (s.sphere === 'Polymorph') {
    if (s.name === 'Duplicate Organ') {
      if (!hasManif) missing.push('Manifestation');
      reason = 'Creates/manifests a temporary biological organ on the body.';
    }
  } else if (s.sphere === 'Rituals') {
    if (s.name === 'Animated Attendant') {
      if (!hasPhys) missing.push('Physical');
      if (!hasManif) missing.push('Manifestation');
      reason = 'Creates a temporary Small physical creature that carries objects.';
    } else if (s.name === 'Floating Platform') {
      if (!hasManif) missing.push('Manifestation');
      reason = 'Creates a temporary solid platform of force.';
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
