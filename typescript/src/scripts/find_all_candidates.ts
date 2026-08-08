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
const baseSpells = allSpells.filter((s) => !s.functionsLikeName);

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
  const text = [s.narrative || '', s.effect || '', s.attackHit || '', s.attackTargeting || '']
    .join(' ')
    .replace(/\s+/g, ' ');
  const textLower = text.toLowerCase();

  const hasPhys = s.tags.includes('Physical');
  const hasManif = s.tags.includes('Manifestation');
  const hasBarrier = s.tags.includes('Barrier');
  const hasCreation = s.tags.includes('Creation');

  const missing: string[] = [];
  let reason = '';

  // ----------------------------------------------------
  // MANIFESTATION CRITERIA
  // ----------------------------------------------------
  // Manifestation creates temporary creatures, physical objects, barriers, structures, terrain, armor, weapons, or traps from magical energy that disappear when duration ends or destroyed.
  // Note: If it already has Creation, Creation is for permanent physical objects, though some spells might be boundary cases.

  const createsTemporaryObjectOrBarrier =
    (hasBarrier && !hasManif) ||
    textLower.includes('creates a wall') ||
    textLower.includes('create a wall') ||
    textLower.includes('creates a huge grove') ||
    textLower.includes('grows around') ||
    textLower.includes('creates a small creature') ||
    textLower.includes('summon') ||
    textLower.includes('creates a circular platform') ||
    textLower.includes('creates a temporary') ||
    textLower.includes('transforms an unattended') ||
    textLower.includes('grows from nowhere') ||
    textLower.includes('embeds itself in a foe and grows') ||
    textLower.includes('seeds') ||
    textLower.includes('barrier') ||
    textLower.includes('shelter') ||
    textLower.includes('cage');

  // ----------------------------------------------------
  // PHYSICAL CRITERIA
  // ----------------------------------------------------
  // Physical affects physical objects and creatures, and CANNOT affect incorporeal creatures.
  // - Trapping/enclosing targets in physical structures/groves/trees/walls/ice/earth/vines/cages (e.g. Treeseal, Wall of Ice, Wall of Stone, Wall of Thorns).
  // - Physical body transformations, hardenings, or modifications (e.g. Barkskin, Greater Barkskin, Stoneskin, Malleable Body, Flense, Fleshspike).
  // - Physical items, weapons, or physical missiles embedded in flesh (e.g. Embedded Growth, Treeclub, Shillelagh).
  // - Physical restraints/entanglements made of solid matter (e.g. Entangle, Entangling Field, Tripping Vine).

  // Let's analyze specific candidate patterns:

  // Pattern 1: Treeseal & Grove/Plant trapping/barriers
  if (s.name === 'Treeseal') {
    missing.push('Physical', 'Manifestation');
    reason =
      'Creates a physical grove of trees with HP/defenses that traps the target (Physical; cannot affect incorporeal) and is formed temporarily from magic (Manifestation).';
  } else if (s.name === 'Barkskin' || s.name === 'Greater Barkskin') {
    if (!hasPhys) {
      missing.push('Physical');
    }
    if (!hasManif) {
      missing.push('Manifestation');
    }
    reason =
      "Hardens the user's physical body/skin into wooden bark (Physical armor enhancement; Manifestation of plant layer/bark).";
  } else if (s.name === 'Embedded Growth') {
    if (!hasPhys) {
      missing.push('Physical');
    }
    if (!hasManif) {
      missing.push('Manifestation');
    }
    reason = 'Embeds a physical seed into flesh that grows painfully and bursts into undergrowth.';
  } else if (s.name === 'Shillelagh') {
    if (!hasPhys) {
      missing.push('Physical');
    }
    if (!hasManif) {
      missing.push('Manifestation');
    }
    reason = 'Transforms a physical wooden stick into a combat club/weapon temporarily.';
  } else if (s.name === 'Entangle' || s.name === 'Entangling Field' || s.name === 'Tripping Vine') {
    if (!hasPhys) {
      missing.push('Physical');
    }
    reason =
      'Restrains/slows grounded targets using physical plant vines growing from earth/undergrowth (should not affect incorporeal creatures).';
  } else if (s.name === 'Wall of Thorns') {
    if (!hasPhys) {
      missing.push('Physical');
    }
    reason =
      'Creates a physical wall of thorns with HP that physically impedes movement and damages creatures passing through.';
  }

  // Cryomancy (Ice structures / walls / cages / armor)
  else if (s.sphere === 'Cryomancy') {
    if (
      s.name.includes('Wall of Ice') ||
      s.name.includes('Ice Barrier') ||
      s.name.includes('Glacier') ||
      textLower.includes('wall of ice') ||
      textLower.includes('ice wall')
    ) {
      if (!hasPhys) {
        missing.push('Physical');
      }
      if (!hasManif) {
        missing.push('Manifestation');
      }
      reason =
        'Creates a physical wall/barrier of solid ice with HP that physically blocks line of sight/effect and movement.';
    } else if (
      s.name.includes('Ice Cage') ||
      textLower.includes('trapped in ice') ||
      textLower.includes('encased in ice') ||
      textLower.includes('ice encases')
    ) {
      if (!hasPhys) {
        missing.push('Physical');
      }
      if (!hasManif) {
        missing.push('Manifestation');
      }
      reason =
        'Encases target in a solid physical cage/block of ice (Physical; incorporeal creatures pass through ice).';
    } else if (
      s.name.includes('Ice Armor') ||
      s.name.includes('Frost Armor') ||
      textLower.includes('coat of ice')
    ) {
      if (!hasPhys) {
        missing.push('Physical');
      }
      if (!hasManif) {
        missing.push('Manifestation');
      }
      reason = 'Manifests a coat of physical ice around the body granting Armor bonus.';
    }
  }

  // Terramancy (Earth / Stone walls, armors, cages, missiles)
  else if (s.sphere === 'Terramancy') {
    if (s.name === 'Wall of Stone') {
      if (!hasPhys) {
        missing.push('Physical');
      }
      reason =
        'Creates a physical wall of solid stone (has Manifestation & Earth, but missing Physical). Incorporeal creatures pass through solid stone.';
    } else if (
      textLower.includes('wall of earth') ||
      textLower.includes('earthen wall') ||
      textLower.includes('stone wall') ||
      textLower.includes('pillar of stone')
    ) {
      if (!hasPhys) {
        missing.push('Physical');
      }
      if (!hasManif) {
        missing.push('Manifestation');
      }
      reason = 'Creates physical stone/earth barriers or structures.';
    } else if (
      s.name.includes('Sinkhole') ||
      s.name.includes('Quicksand') ||
      textLower.includes('entombs') ||
      textLower.includes('swallows')
    ) {
      if (!hasPhys) {
        missing.push('Physical');
      }
      reason =
        'Traps/buries targets in physical earth/mud (should not affect incorporeal creatures).';
    }
  }

  // Fabrication (Created items, barriers, gadgets, weapons)
  else if (s.sphere === 'Fabrication') {
    if (
      textLower.includes('wall') ||
      textLower.includes('barrier') ||
      textLower.includes('bridge') ||
      textLower.includes('sphere')
    ) {
      if (
        hasManif &&
        !hasPhys &&
        (textLower.includes('solid') ||
          textLower.includes('physical') ||
          textLower.includes('wood') ||
          textLower.includes('metal') ||
          textLower.includes('stone') ||
          textLower.includes('shrapnel'))
      ) {
        missing.push('Physical');
        reason = 'Creates a physical wall/barrier/object out of solid material.';
      }
    }
  }

  // Polymorph (Body modifications & physical transformations)
  else if (s.sphere === 'Polymorph') {
    // Check if any Polymorph spell is missing Physical or Manifestation
    if (!hasPhys) {
      missing.push('Physical');
      reason =
        'Polymorph ability modifying physical anatomy/body (should be tagged Physical like almost all Polymorph spells).';
    }
    if (
      textLower.includes('manifest') ||
      textLower.includes('creates') ||
      textLower.includes('grows new') ||
      textLower.includes('duplicate')
    ) {
      if (!hasManif) {
        missing.push('Manifestation');
        reason = 'Creates or manifests temporary body parts / physical appendages.';
      }
    }
  }

  // Telekinesis
  else if (s.sphere === 'Telekinesis') {
    if (s.name.includes('Wall of Force') || s.name.includes('Force Barrier')) {
      // Note: Telekinetic force wall - does force affect incorporeal creatures? Let's check rulebook narrative!
    }
  }

  // Vivimancy (Flesh, bone, blood, biological constructs)
  else if (s.sphere === 'Vivimancy') {
    if (
      textLower.includes('bone') ||
      textLower.includes('flesh') ||
      textLower.includes('organ') ||
      textLower.includes('claw') ||
      textLower.includes('carapace')
    ) {
      if (!hasPhys) {
        missing.push('Physical');
      }
      if (
        textLower.includes('creates') ||
        textLower.includes('grows') ||
        textLower.includes('forms')
      ) {
        if (!hasManif) {
          missing.push('Manifestation');
        }
      }
      reason = 'Manipulates or manifests physical biological matter (flesh/bone/organs).';
    }
  }

  // Rituals
  else if (s.sphere === 'Rituals') {
    if (s.name === 'Animated Attendant') {
      if (!hasPhys) {
        missing.push('Physical');
      }
      if (!hasManif) {
        missing.push('Manifestation');
      }
      reason = 'Creates a temporary Small physical creature/servant that carries objects.';
    } else if (s.name === 'Floating Platform') {
      if (!hasManif) {
        missing.push('Manifestation');
      }
      reason = 'Creates a temporary solid platform of force.';
    } else if (s.name === 'Tiny Hut' || s.name === 'Shelter') {
      if (!hasPhys) {
        missing.push('Physical');
      }
      if (!hasManif) {
        missing.push('Manifestation');
      }
      reason = 'Creates a temporary physical shelter/structure.';
    } else if (s.name === 'Mystic Cage') {
      if (!hasPhys) {
        missing.push('Physical');
      }
      reason = 'Has Manifestation, creates a physical cage to trap targets.';
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
  console.log(
    `  Current: [${r.currentTags.join(', ')}] -> Suggested: [${r.suggestedTags.join(', ')}]`,
  );
  console.log(`  Reason: ${r.reason}`);
  console.log(`  Text: ${r.textSnippet}...`);
  console.log('');
}
