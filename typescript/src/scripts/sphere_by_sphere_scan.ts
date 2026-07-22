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

// Filter out variants that inherit tags from base spells (functionsLikeName)
const baseSpells = allSpells.filter(s => !s.functionsLikeName);

// Group by sphere
const spheresMap = new Map<string, SpellDetail[]>();
for (const s of baseSpells) {
  if (!spheresMap.has(s.sphere)) {
    spheresMap.set(s.sphere, []);
  }
  spheresMap.get(s.sphere)!.push(s);
}

for (const [sphereName, spells] of spheresMap.entries()) {
  console.log(`========================================`);
  console.log(`SPHERE: ${sphereName} (${spells.length} base spells)`);
  console.log(`========================================`);
  
  for (const s of spells) {
    const hasPhys = s.tags.includes('Physical');
    const hasManif = s.tags.includes('Manifestation');
    const tagStr = s.tags.length ? s.tags.join(', ') : 'NONE';
    const text = [s.narrative || '', s.effect || '', s.attackHit || '', s.attackTargeting || ''].join(' ').replace(/\s+/g, ' ');

    // Let's flag interesting mechanics:
    // - Barriers / Walls / Shelters / Structures / Cages / Groves / Fortifications
    // - Armors / Skins / Carapaces / Shields / Bodies
    // - Weapons / Objects / Items / Bombs / Platforms
    // - Summons / Creatures / Attendants / Elementals / Plants / Vines
    // - Restraints / Traps / Entangles / Swallowing / Encasings / Pins / Grapples
    // - Flesh / Bone / Blood / Biological parts
    
    let flags: string[] = [];

    const textLower = text.toLowerCase();

    if (textLower.includes('wall') || textLower.includes('barrier') || textLower.includes('cage') || textLower.includes('grove') || textLower.includes('shelter') || textLower.includes('fortification') || textLower.includes('platform') || textLower.includes('bridge') || textLower.includes('encase') || textLower.includes('trap')) {
      flags.push('STRUCTURE/BARRIER/TRAP');
    }
    if (textLower.includes('armor') || textLower.includes('skin') || textLower.includes('carapace') || textLower.includes('shield') || textLower.includes('body') || textLower.includes('flesh') || textLower.includes('bone')) {
      flags.push('ARMOR/BODY/PHYSIOLOGY');
    }
    if (textLower.includes('weapon') || textLower.includes('object') || textLower.includes('stick') || textLower.includes('item') || textLower.includes('bomb') || textLower.includes('seed') || textLower.includes('grenade') || textLower.includes('shrapnel')) {
      flags.push('OBJECT/WEAPON/ITEM');
    }
    if (textLower.includes('creature') || textLower.includes('summon') || textLower.includes('attendant') || textLower.includes('servant') || textLower.includes('golem') || textLower.includes('elemental') || textLower.includes('duplicate')) {
      flags.push('SUMMON/CREATURE');
    }
    if (textLower.includes('entangle') || textLower.includes('slowed') || textLower.includes('prone') || textLower.includes('swallow') || textLower.includes('pin') || textLower.includes('grapple')) {
      flags.push('RESTRAINT/PHYSICAL_MOVEMENT');
    }

    if (flags.length > 0) {
      console.log(`[${s.name}] (Rank ${s.rank})`);
      console.log(`  Tags: [${tagStr}] | Type: ${s.type || 'Standard'}`);
      console.log(`  Flags: ${flags.join(' | ')}`);
      console.log(`  Text: ${text.substring(0, 160)}...`);
      console.log('');
    }
  }
}
