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

// Function to print spell details nicely
function printSpell(s: SpellDetail, reason: string) {
  console.log(`[${s.sphere}] ${s.name} (Rank ${s.rank})`);
  console.log(`  Current Tags: [${s.tags.join(', ')}]`);
  console.log(`  Reason/Flag: ${reason}`);
  if (s.narrative) console.log(`  Narrative: ${s.narrative.trim()}`);
  if (s.effect) console.log(`  Effect: ${s.effect.trim()}`);
  if (s.attackHit) console.log(`  Hit: ${s.attackHit.trim()}`);
  if (s.attackTargeting) console.log(`  Targeting: ${s.attackTargeting.trim()}`);
  console.log('---');
}

console.log('=== CANDIDATES AUDIT ===\n');

for (const s of allSpells) {
  const text = [s.narrative || '', s.effect || '', s.attackHit || '', s.attackTargeting || ''].join(' ').toLowerCase();
  const hasPhys = s.tags.includes('Physical');
  const hasManif = s.tags.includes('Manifestation');

  // Check 1: Spells that create physical obstacles, walls, barriers, traps, ice/stone/plant/wood structures or cages
  const createsPhysicalStructure = 
    text.includes('wall') || text.includes('barrier') || text.includes('grove') || text.includes('cage') || 
    text.includes('fortification') || text.includes('hut') || text.includes('platform') || text.includes('bridge') ||
    text.includes('shelter') || text.includes('pillar') || text.includes('house') || text.includes('encase');

  // Check 2: Spells that manifest weapons, equipment, armor, skin changes, constructs, temporary physical items/creatures
  const manifestsObjectOrCreature = 
    text.includes('creates') || text.includes('create') || text.includes('manifest') || text.includes('grows') ||
    text.includes('form') || text.includes('construct') || text.includes('servant') || text.includes('weapon') ||
    text.includes('armor') || text.includes('skin') || text.includes('carapace') || text.includes('stick') || text.includes('club');

  // Check 3: Spells that grapple, restrain, entangle, slow via physical matter, trip, or pin target physically
  const physicalRestraint = 
    text.includes('trap') || text.includes('entangle') || text.includes('pin') || text.includes('bind') ||
    text.includes('grapple') || text.includes('swallow') || text.includes('bury') || text.includes('encase');

  // Let's filter out spells that already have BOTH Physical and Manifestation
  if (hasPhys && hasManif) continue;

  // If spell has Manifestation but NOT Physical
  if (hasManif && !hasPhys) {
    if (createsPhysicalStructure || physicalRestraint || text.includes('tree') || text.includes('stone') || text.includes('ice') || text.includes('wood') || text.includes('rock') || text.includes('earth') || text.includes('plant') || text.includes('vine') || text.includes('bark') || text.includes('skin') || text.includes('weapon')) {
      printSpell(s, 'Has Manifestation, missing Physical (creates physical objects/structures/restraints/coatings)');
    }
  }

  // If spell has Physical but NOT Manifestation
  if (hasPhys && !hasManif) {
    if (manifestsObjectOrCreature || createsPhysicalStructure || s.type?.includes('Sustain') || s.type?.includes('Attune')) {
      printSpell(s, 'Has Physical, missing Manifestation (creates temporary physical objects/forms/effects)');
    }
  }

  // If spell has NEITHER Physical nor Manifestation
  if (!hasPhys && !hasManif) {
    if (createsPhysicalStructure || (manifestsObjectOrCreature && (text.includes('tree') || text.includes('wood') || text.includes('ice') || text.includes('stone') || text.includes('rock') || text.includes('earth') || text.includes('plant') || text.includes('vine') || text.includes('water') || text.includes('weapon') || text.includes('armor') || text.includes('skin') || text.includes('wall') || text.includes('barrier') || text.includes('creature') || text.includes('attendant') || text.includes('golem') || text.includes('shield')))) {
      printSpell(s, 'Missing BOTH Physical and Manifestation');
    }
  }
}
