/**
 * SPELL DESIGN VALIDATION ENGINE
 *
 * WHY THIS EXISTS:
 * This validation layer exists to identify similar spell designs and damage/cost inconsistencies
 * between different spells (potentially across different mystic spheres). In RPG system design,
 * having virtually identical spells (e.g., same rank, range, action economy, and condition effects)
 * under different names decreases sphere identity, creates redundancy, and can lead to balancing
 * issues (e.g., if one deals less damage than another without a corresponding cost/drawback, like
 * the inconsistency between Bonechill and Cripple).
 *
 * HOW IT WORKS:
 * 1. buildSpellProfile() parses each spell's text fields (hit, targeting, injury, effect) into
 *    a structured "SpellProfile" using Regex and string checks (in spell_profile.ts).
 * 2. validateSpells() executes a pairwise comparison across all standard spells.
 * 3. Spells are flagged as "redundant" if they match on key mechanical properties:
 *    - Same Spell Rank
 *    - Same Action Economy (double action/precast vs. standard action)
 *    - Same Range Category (short, medium, long, distant, melee, none)
 *    - Same Targeted Defense (fortitude, reflex, mental, brawn, armor)
 *    - Same Target Area (single, cone, radius, multi)
 *    - Same set of primary applied conditions (e.g., slowed, dazed)
 *    - Share at least one core role, and match exactly on support roles (healing, cleanse, focus, etc.)
 * 4. If they are redundant, the engine checks for "inconsistent damage" if their parsed damage ranks
 *    differ without a cost difference (e.g., one deals higher damage but neither has a cost/stamina).
 *
 * ASSUMPTIONS & SIMPLIFICATIONS:
 * - Spells without an 'attack' block are assumed to be utility/passive/pure-support spells, and
 *   are skipped for redundancy checks to prevent false positives from unparsed text effects.
 * - Text Parsing via Regex: This engine uses heuristic regex matching on LaTeX/text properties.
 *   - Double actions are identified by looking for "spend a standard action to make an attack" or "during your next turn".
 *   - Defenses are matched via "vs. [Defense]" or "against [Defense]".
 *   - Conditions are matched by finding keywords (e.g., "slowed", "dazed") anywhere in the text.
 *   - Costs are simplified to checking if a "cost" string or stamina/material cost flags exist.
 *   - Damage ranks are extracted via `\damagerank[word]` (ignoring `\hprank` healing ranks).
 */

import { MysticSphere, getSpellByName } from './mystic_spheres';
import {
  calculateDefenseModifier,
  calculateExpectedDamageRank,
  DamageCalculationBreakdown,
} from './expected_damage_rank';
import { buildSpellProfile, SpellProfile, RANGE_ORDER, AREA_SIZE_ORDER } from './spell_profile';

export interface ValidationIssue {
  type:
    | 'redundancy'
    | 'inconsistent_damage'
    | 'inconsistent_roles'
    | 'almost_equivalent'
    | 'strictly_superior';
  severity: 'warning';
  message: string;
  spells: [string, string];
  differenceField?: string;
}

interface Difference {
  field: string;
  p1Value: string;
  p2Value: string;
}

function getSpellDifferences(p1: SpellProfile, p2: SpellProfile): Difference[] {
  const diffs: Difference[] = [];

  if (p1.rank !== p2.rank) {
    diffs.push({ field: 'rank', p1Value: `Rank ${p1.rank}`, p2Value: `Rank ${p2.rank}` });
  }
  if (p1.isDoubleAction !== p2.isDoubleAction) {
    diffs.push({
      field: 'action economy',
      p1Value: p1.isDoubleAction ? 'double action' : 'standard action',
      p2Value: p2.isDoubleAction ? 'double action' : 'standard action',
    });
  }
  if (p1.isNonAction !== p2.isNonAction) {
    diffs.push({
      field: 'standard action requirement',
      p1Value: p1.isNonAction ? 'non-action' : 'standard action',
      p2Value: p2.isNonAction ? 'non-action' : 'standard action',
    });
  }
  if (p1.isAttunable !== p2.isAttunable) {
    diffs.push({
      field: 'attunement',
      p1Value: p1.isAttunable ? 'attunement' : 'standard',
      p2Value: p2.isAttunable ? 'attunement' : 'standard',
    });
  }
  if (p1.isSustainedMinor !== p2.isSustainedMinor) {
    diffs.push({
      field: 'minor sustain',
      p1Value: p1.isSustainedMinor ? 'minor sustain' : 'standard',
      p2Value: p2.isSustainedMinor ? 'minor sustain' : 'standard',
    });
  }
  if (p1.range !== p2.range) {
    diffs.push({ field: 'range', p1Value: p1.range, p2Value: p2.range });
  }
  if (p1.defenses.length !== p2.defenses.length) {
    diffs.push({
      field: 'defense count',
      p1Value: `${p1.defenses.length}`,
      p2Value: `${p2.defenses.length}`,
    });
  }
  const defMod1 = calculateDefenseModifier(p1);
  const defMod2 = calculateDefenseModifier(p2);
  if (defMod1 !== defMod2) {
    diffs.push({
      field: 'defense modifier',
      p1Value: `${defMod1 >= 0 ? '+' : ''}${defMod1}`,
      p2Value: `${defMod2 >= 0 ? '+' : ''}${defMod2}`,
    });
  }
  if (p1.area !== p2.area) {
    diffs.push({ field: 'area type', p1Value: p1.area, p2Value: p2.area });
  }
  if (p1.areaSize !== p2.areaSize) {
    diffs.push({ field: 'area size', p1Value: p1.areaSize, p2Value: p2.areaSize });
  }
  if (p1.areaGrows !== p2.areaGrows) {
    diffs.push({
      field: 'area growth',
      p1Value: p1.areaGrows ? 'grows' : 'static',
      p2Value: p2.areaGrows ? 'grows' : 'static',
    });
  }
  if (p1.accuracyModifier !== p2.accuracyModifier) {
    diffs.push({
      field: 'accuracy modifier',
      p1Value: `${p1.accuracyModifier >= 0 ? '+' : ''}${p1.accuracyModifier}`,
      p2Value: `${p2.accuracyModifier >= 0 ? '+' : ''}${p2.accuracyModifier}`,
    });
  }
  if (p1.accuracyCondition !== p2.accuracyCondition) {
    diffs.push({
      field: 'accuracy condition',
      p1Value: p1.accuracyCondition || 'none',
      p2Value: p2.accuracyCondition || 'none',
    });
  }
  if (p1.specialRequirements.join(',') !== p2.specialRequirements.join(',')) {
    diffs.push({
      field: 'special requirements',
      p1Value: `[${p1.specialRequirements.join(', ')}]`,
      p2Value: `[${p2.specialRequirements.join(', ')}]`,
    });
  }
  if (p1.isLowPower !== p2.isLowPower) {
    diffs.push({
      field: 'low power flag',
      p1Value: p1.isLowPower ? 'low power' : 'standard',
      p2Value: p2.isLowPower ? 'low power' : 'standard',
    });
  }
  if (p1.isDelayed !== p2.isDelayed) {
    diffs.push({
      field: 'delayed behavior',
      p1Value: p1.isDelayed ? 'delayed' : 'immediate',
      p2Value: p2.isDelayed ? 'delayed' : 'immediate',
    });
  }
  if ([...p1.appliedEffects].sort().join(',') !== [...p2.appliedEffects].sort().join(',')) {
    diffs.push({
      field: 'applied conditions',
      p1Value: `[${p1.appliedEffects.join(', ')}]`,
      p2Value: `[${p2.appliedEffects.join(', ')}]`,
    });
  }
  if (p1.halfOnMiss !== p2.halfOnMiss) {
    diffs.push({
      field: 'half damage on miss',
      p1Value: p1.halfOnMiss ? 'half on miss' : 'none',
      p2Value: p2.halfOnMiss ? 'half on miss' : 'none',
    });
  }
  if (p1.maxTargets !== p2.maxTargets) {
    diffs.push({
      field: 'maximum targets',
      p1Value: `${p1.maxTargets} targets`,
      p2Value: `${p2.maxTargets} targets`,
    });
  }
  if (p1.enemiesOnly !== p2.enemiesOnly) {
    diffs.push({
      field: 'enemies only targeting',
      p1Value: p1.enemiesOnly ? 'enemies only' : 'all creatures',
      p2Value: p2.enemiesOnly ? 'enemies only' : 'all creatures',
    });
  }
  if (p1.isRepeating !== p2.isRepeating) {
    diffs.push({
      field: 'repeating behavior',
      p1Value: p1.isRepeating ? 'repeating' : 'single application',
      p2Value: p2.isRepeating ? 'repeating' : 'single application',
    });
  }

  if (p1.hasInjuryDamage !== p2.hasInjuryDamage) {
    diffs.push({
      field: 'injury damage',
      p1Value: p1.hasInjuryDamage ? 'injury damage' : 'no injury damage',
      p2Value: p2.hasInjuryDamage ? 'injury damage' : 'no injury damage',
    });
  }
  if (p1.hasDoT !== p2.hasDoT) {
    diffs.push({
      field: 'damage over time',
      p1Value: p1.hasDoT ? 'DoT' : 'direct',
      p2Value: p2.hasDoT ? 'DoT' : 'direct',
    });
  }

  return diffs;
}

interface ComparisonResult {
  isBetter: boolean;
  isWorse: boolean;
  betterFields: string[];
  worseFields: string[];
}

function compareAppliedEffects(
  effects1: string[],
  effects2: string[],
): { isBetter: boolean; isWorse: boolean } {
  let isBetter = false;
  let isWorse = false;

  const getBaseEffect = (e: string) => (e.startsWith('briefly:') ? e.substring(8) : e);
  const isBrief = (e: string) => e.startsWith('briefly:');

  for (const e1 of effects1) {
    const base1 = getBaseEffect(e1);
    const brief1 = isBrief(e1);

    const matching2 = effects2.find((e2) => getBaseEffect(e2) === base1);
    if (!matching2) {
      // effects1 has a condition that effects2 does not have at all
      isBetter = true;
    } else {
      const brief2 = isBrief(matching2);
      if (brief1 && !brief2) {
        // e1 is brief, matching2 is full -> effects1 is worse
        isWorse = true;
      } else if (!brief1 && brief2) {
        // e1 is full, matching2 is brief -> effects1 is better
        isBetter = true;
      }
    }
  }

  for (const e2 of effects2) {
    const base2 = getBaseEffect(e2);
    const matching1 = effects1.find((e1) => getBaseEffect(e1) === base2);
    if (!matching1) {
      // effects2 has a condition that effects1 does not have at all
      isWorse = true;
    }
  }

  return { isBetter, isWorse };
}

function compareSpellProfiles(p1: SpellProfile, p2: SpellProfile): ComparisonResult {
  const betterFields: string[] = [];
  const worseFields: string[] = [];

  // 1. Damage Rank (comparing unconditional base damage and conditional max damage)
  const unconditional1 = p1.unconditionalDamageRank ?? 0;
  const unconditional2 = p2.unconditionalDamageRank ?? 0;
  const max1 = p1.maxDamageRank ?? 0;
  const max2 = p2.maxDamageRank ?? 0;

  if (
    (unconditional1 > unconditional2 && max1 >= max2) ||
    (max1 > max2 && unconditional1 >= unconditional2)
  ) {
    betterFields.push('damage rank');
  } else if (
    (unconditional1 < unconditional2 && max1 <= max2) ||
    (max1 < max2 && unconditional1 <= unconditional2)
  ) {
    worseFields.push('damage rank');
  } else if (unconditional1 > unconditional2 && max1 < max2) {
    betterFields.push('unconditional damage rank');
    worseFields.push('max damage rank');
  } else if (unconditional1 < unconditional2 && max1 > max2) {
    worseFields.push('unconditional damage rank');
    betterFields.push('max damage rank');
  }

  // Low Power flag (standard power scaling is better than low power)
  if (p1.isLowPower !== p2.isLowPower) {
    if (!p1.isLowPower) {
      betterFields.push('power scaling');
    } else {
      worseFields.push('power scaling');
    }
  }

  // 2. Healing Rank
  const h1 = p1.healingRank ?? 0;
  const h2 = p2.healingRank ?? 0;
  if (h1 > h2) {
    betterFields.push('healing rank');
  } else if (h1 < h2) {
    worseFields.push('healing rank');
  }

  // 3. Action Economy (double action is worse)
  if (p1.isDoubleAction !== p2.isDoubleAction) {
    if (!p1.isDoubleAction) {
      betterFields.push('action economy');
    } else {
      worseFields.push('action economy');
    }
  }

  // 4. Cost (having cost is worse)
  if (p1.hasCost !== p2.hasCost) {
    if (!p1.hasCost) {
      betterFields.push('cost');
    } else {
      worseFields.push('cost');
    }
  }

  // 5. Delay (delayed is worse)
  if (p1.isDelayed !== p2.isDelayed) {
    if (!p1.isDelayed) {
      betterFields.push('delayed behavior');
    } else {
      worseFields.push('delayed behavior');
    }
  }

  // 6. Accuracy Modifier
  if (p1.accuracyModifier !== p2.accuracyModifier) {
    if (p1.accuracyModifier > p2.accuracyModifier) {
      betterFields.push('accuracy modifier');
    } else {
      worseFields.push('accuracy modifier');
    }
  }

  // 7. Range
  if (p1.range !== p2.range) {
    const idx1 = Math.max(0, (RANGE_ORDER as readonly string[]).indexOf(p1.range));
    const idx2 = Math.max(0, (RANGE_ORDER as readonly string[]).indexOf(p2.range));
    if (idx1 > idx2) {
      betterFields.push('range');
    } else if (idx1 < idx2) {
      worseFields.push('range');
    }
  }

  // 8. Area Size
  if (p1.areaSize !== p2.areaSize) {
    const idx1 = Math.max(0, (AREA_SIZE_ORDER as readonly string[]).indexOf(p1.areaSize));
    const idx2 = Math.max(0, (AREA_SIZE_ORDER as readonly string[]).indexOf(p2.areaSize));
    if (idx1 > idx2) {
      betterFields.push('area size');
    } else if (idx1 < idx2) {
      worseFields.push('area size');
    }
  }

  // 9. Applied Effects (superset of applied effects is better)
  const effectComp = compareAppliedEffects(p1.appliedEffects, p2.appliedEffects);
  if (effectComp.isBetter) {
    betterFields.push('applied conditions');
  }
  if (effectComp.isWorse) {
    worseFields.push('applied conditions');
  }

  // 10. Special Requirements / Drawbacks (fewer is better/subset is better)
  const r1 = new Set(p1.specialRequirements);
  const r2 = new Set(p2.specialRequirements);
  const hasExtraReqsP1 = p1.specialRequirements.some((r) => !r2.has(r));
  const hasExtraReqsP2 = p2.specialRequirements.some((r) => !r1.has(r));
  if (hasExtraReqsP1) {
    worseFields.push('special requirements');
  }
  if (hasExtraReqsP2) {
    betterFields.push('special requirements');
  }

  // 11. Half on Miss (having half on miss is better)
  if (p1.halfOnMiss !== p2.halfOnMiss) {
    if (p1.halfOnMiss) {
      betterFields.push('half damage on miss');
    } else {
      worseFields.push('half damage on miss');
    }
  }

  // 12. Max Targets (for multi-target area spells, having more targets is better)
  if (p1.area === 'multi' && p2.area === 'multi' && p1.maxTargets !== p2.maxTargets) {
    if (p1.maxTargets > p2.maxTargets) {
      betterFields.push('maximum targets');
    } else {
      worseFields.push('maximum targets');
    }
  }

  // 13. Accuracy Condition
  if (p1.accuracyCondition !== p2.accuracyCondition) {
    betterFields.push('accuracy condition');
    worseFields.push('accuracy condition');
  }

  // 14. Enemies Only (targeting enemies only is better than targeting everything/creatures in an area)
  if (p1.enemiesOnly !== p2.enemiesOnly) {
    if (p1.enemiesOnly) {
      betterFields.push('enemies only targeting');
    } else {
      worseFields.push('enemies only targeting');
    }
  }

  // 16. Repeating Behavior (having repeating/DoT/recurring damage is better)
  if (p1.isRepeating !== p2.isRepeating) {
    if (p1.isRepeating) {
      betterFields.push('repeating behavior');
    } else {
      worseFields.push('repeating behavior');
    }
  }

  // 17. Defense Modifier (single-target Reflex attack targets an easier defense, corresponding to a -1dr damage modifier)
  const defMod1 = calculateDefenseModifier(p1);
  const defMod2 = calculateDefenseModifier(p2);
  if (defMod1 !== defMod2) {
    if (defMod1 < defMod2) {
      betterFields.push('defense modifier');
    } else {
      worseFields.push('defense modifier');
    }
  }

  return {
    isBetter: betterFields.length > 0,
    isWorse: worseFields.length > 0,
    betterFields,
    worseFields,
  };
}

function checkSpellPair(
  p1: SpellProfile,
  p2: SpellProfile,
  options?: { showApproximate?: boolean },
): ValidationIssue[] {
  // Both spells must have attack definitions (i.e. they are combat abilities)
  if (!p1.hasAttack || !p2.hasAttack) {
    return [];
  }

  // Hard constraint: The spells must still either both deal damage or both not deal damage
  if ((p1.maxDamageRank === null) !== (p2.maxDamageRank === null)) {
    return [];
  }

  // Hard constraint: Both must either heal or both not heal
  if ((p1.healingRank === null) !== (p2.healingRank === null)) {
    return [];
  }

  // Hard constraint: rank difference must be <= 1
  if (Math.abs(p1.rank - p2.rank) > 1) {
    return [];
  }

  const diffs = getSpellDifferences(p1, p2);
  const issues: ValidationIssue[] = [];

  if (diffs.length === 0) {
    // If they reach here, they are virtually identical spells!
    issues.push({
      type: 'redundancy',
      severity: 'warning',
      message: `Spells "${p1.name}" (${p1.sphereName}) and "${p2.name}" (${p2.sphereName}) are virtually identical: both are Rank ${p1.rank}, range: ${p1.range}, defense count: ${p1.defenses.length}, double action: ${p1.isDoubleAction}, applying conditions: [${p1.appliedEffects.join(', ')}].`,
      spells: [p1.name, p2.name],
    });

    // Now check for damage vs cost inconsistencies:
    if (
      p1.maxDamageRank !== null &&
      p2.maxDamageRank !== null &&
      p1.maxDamageRank !== p2.maxDamageRank
    ) {
      const higher = p1.maxDamageRank > p2.maxDamageRank ? p1 : p2;
      const lower = p1.maxDamageRank > p2.maxDamageRank ? p2 : p1;

      // If the higher damage one has no cost, but the lower damage one does, or both have no cost, it's inconsistent!
      if (!higher.hasCost || (!higher.hasCost && !lower.hasCost)) {
        issues.push({
          type: 'inconsistent_damage',
          severity: 'warning',
          message: `Spell "${higher.name}" (${higher.sphereName}) deals more damage (Rank ${higher.maxDamageRank}) than "${lower.name}" (${lower.sphereName}, Rank ${lower.maxDamageRank}) despite being equivalent, with no balancing cost factor.`,
          spells: [p1.name, p2.name],
        });
      }
    }

    // Now check for healing vs cost inconsistencies:
    if (p1.healingRank !== null && p2.healingRank !== null && p1.healingRank !== p2.healingRank) {
      const higher = p1.healingRank > p2.healingRank ? p1 : p2;
      const lower = p1.healingRank > p2.healingRank ? p2 : p1;

      if (!higher.hasCost || (!higher.hasCost && !lower.hasCost)) {
        issues.push({
          type: 'inconsistent_damage',
          severity: 'warning',
          message: `Spell "${higher.name}" (${higher.sphereName}) heals more (Rank ${higher.healingRank}) than "${lower.name}" (${lower.sphereName}, Rank ${lower.healingRank}) despite being equivalent, with no balancing cost factor.`,
          spells: [p1.name, p2.name],
        });
      }
    }

    // Also check for role inconsistencies:
    if (p1.roles.join(',') !== p2.roles.join(',')) {
      issues.push({
        type: 'inconsistent_roles',
        severity: 'warning',
        message: `Spell "${p1.name}" (${p1.sphereName}) has different roles (${p1.roles.join(', ')}) than "${p2.name}" (${p2.sphereName}, ${p2.roles.join(', ')}) despite being equivalent.`,
        spells: [p1.name, p2.name],
      });
    }
  } else {
    // Dominance / Strictly Superior check
    if (
      p1.area === p2.area &&
      p1.isNonAction === p2.isNonAction &&
      p1.areaGrows === p2.areaGrows &&
      // We don't need defenses to be identical when comparing superiority
      p1.defenses.length === p2.defenses.length &&
      p1.isAttunable === p2.isAttunable &&
      p1.isSustainedMinor === p2.isSustainedMinor
    ) {
      // For utility/debuff spells (no damage and no healing), they must share at least one parsed condition AND share at least one role
      let isComparable = true;
      if (
        p1.maxDamageRank === null &&
        p2.maxDamageRank === null &&
        p1.healingRank === null &&
        p2.healingRank === null
      ) {
        const hasSharedCondition = p1.appliedEffects.some((e) => p2.appliedEffects.includes(e));
        const hasSharedRole = p1.roles.some((r) => p2.roles.includes(r));
        if (!hasSharedCondition || !hasSharedRole) {
          isComparable = false;
        }
      }

      if (isComparable) {
        const comparison = compareSpellProfiles(p1, p2);
        if (comparison.isBetter && !comparison.isWorse && p1.rank <= p2.rank) {
          issues.push({
            type: 'strictly_superior',
            severity: 'warning',
            message: `Spell "${p1.name}" (${p1.sphereName}) is strictly superior to "${p2.name}" (${p2.sphereName}) at Rank ${p1.rank}: better in [${comparison.betterFields.join(', ')}] with no balancing drawbacks.`,
            spells: [p1.name, p2.name],
          });
        } else if (comparison.isWorse && !comparison.isBetter && p2.rank <= p1.rank) {
          issues.push({
            type: 'strictly_superior',
            severity: 'warning',
            message: `Spell "${p2.name}" (${p2.sphereName}) is strictly superior to "${p1.name}" (${p1.sphereName}) at Rank ${p2.rank}: better in [${comparison.worseFields.join(', ')}] with no balancing drawbacks.`,
            spells: [p1.name, p2.name],
          });
        }
      }
    }

    if (diffs.length === 1 && options?.showApproximate && p1.sphereName === p2.sphereName) {
      const d = diffs[0];
      issues.push({
        type: 'almost_equivalent',
        severity: 'warning',
        message: `Spells "${p1.name}" (${p1.sphereName}) and "${p2.name}" (${p2.sphereName}) are almost equivalent: differ only by ${d.field} ("${d.p1Value}" vs "${d.p2Value}").`,
        spells: [p1.name, p2.name],
        differenceField: d.field,
      });
    }
  }

  return issues;
}

export function validateSpells(
  spheres: MysticSphere[],
  options?: { showApproximate?: boolean },
): ValidationIssue[] {
  const profiles: SpellProfile[] = [];
  const issues: ValidationIssue[] = [];

  for (const sphere of spheres) {
    const spells = sphere.spells || [];
    for (const spell of spells) {
      profiles.push(buildSpellProfile(spell, sphere.name));
    }
  }

  // Compare every pair of spells
  for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      issues.push(...checkSpellPair(profiles[i], profiles[j], options));
    }
  }

  return issues;
}

export interface DamagingSpellDesignIssue {
  type: 'design_underbudget' | 'design_overbudget';
  severity: 'warning';
  spellName: string;
  sphereName: string;
  spellRank: number;
  actualDamageRank: number;
  expectedDamageRank: number;
  difference: number;
  message: string;
  breakdown: DamageCalculationBreakdown;
}

export function validateSpellDesignGuidelines(spheres: MysticSphere[]): DamagingSpellDesignIssue[] {
  const issues: DamagingSpellDesignIssue[] = [];

  for (const sphere of spheres) {
    const spells = sphere.spells || [];
    for (const spell of spells) {
      const profile = buildSpellProfile(spell, sphere.name);
      if (profile.maxDamageRank === null) {
        continue;
      }

      const breakdown = calculateExpectedDamageRank(profile);
      if (!breakdown) {
        continue;
      }

      if (profile.maxDamageRank !== breakdown.expectedDamageRank) {
        const diff = profile.maxDamageRank - breakdown.expectedDamageRank;
        const type = diff < 0 ? 'design_underbudget' : 'design_overbudget';
        const diffStr = diff > 0 ? `+${diff}` : `${diff}`;
        const message = `Spell "${profile.name}" (${profile.sphereName}, Rank ${profile.rank}) deals Rank ${profile.maxDamageRank} damage, but design guidelines expect Rank ${breakdown.expectedDamageRank} (${diffStr} discrepancy). [Base ${breakdown.baseRank} + Targeting (${breakdown.targetingMod}) + Defense (${breakdown.defenseMod}) + Effect (${breakdown.effectMod}) + Bonus (${breakdown.bonusMod})]`;

        issues.push({
          type,
          severity: 'warning',
          spellName: profile.name,
          sphereName: profile.sphereName,
          spellRank: profile.rank,
          actualDamageRank: profile.maxDamageRank,
          expectedDamageRank: breakdown.expectedDamageRank,
          difference: diff,
          message,
          breakdown,
        });
      }
    }
  }

  return issues;
}

export interface ExtraDamageValidationIssue {
  type: 'missing_double_extra_damage' | 'unexpected_double_extra_damage';
  severity: 'warning';
  spellName: string;
  sphereName: string;
  spellRank?: number;
  damageRank: number;
  targetCategory: string;
  message: string;
}

const DAMAGE_RANK_ORDER: Record<string, number> = {
  damagerankzero: 0,
  damagerankzerolow: 0,
  damagerankone: 1,
  damagerankonelow: 1,
  damageranktwo: 2,
  damageranktwolow: 2,
  damagerankthree: 3,
  damagerankthreelow: 3,
  damagerankfour: 4,
  damagerankfourlow: 4,
  damagerankfive: 5,
  damagerankfivelow: 5,
  damageranksix: 6,
  damageranksixlow: 6,
  damagerankseven: 7,
  damageranksevenlow: 7,
  damagerankeight: 8,
  damagerankeightlow: 8,
  damageranknine: 9,
  damagerankninelow: 9,
  damagerankten: 10,
  damageranktenlow: 10,
  damagerankeleven: 11,
  damagerankelevenlow: 11,
  damageranktwelve: 12,
  damageranktwelvelow: 12,
};

function getHighestDamageRank(text: string): number {
  const matches = text.match(/\\damagerank[a-z]+/gi) || [];
  let maxRank = -1;
  for (const m of matches) {
    const clean = m.replace('\\', '').toLowerCase();
    if (DAMAGE_RANK_ORDER[clean] !== undefined && DAMAGE_RANK_ORDER[clean] > maxRank) {
      maxRank = DAMAGE_RANK_ORDER[clean];
    }
  }
  return maxRank;
}

const SPECIAL_EXTRA_DAMAGE_EXEMPTIONS = new Set([
  'Mighty Touch of God',
  'Immolate',
  'Mighty Living Pyre',
  'Blood Calls to Blood',
  'Mighty Blood Calls to Blood',
]);

function cleanLatex(text: string): string {
  return text.replace(/\\[a-zA-Z]+\{([^}]*)\}/g, '$1').replace(/\\[a-zA-Z]+/g, ' ');
}

function getExtraDamageTargetCategory(
  fullText: string,
  spellName: string,
): 'single' | 'multi_le_2' | 'multi_gt_2' | 'area' {
  const combText = cleanLatex(fullText).toLowerCase();

  const isArea =
    /radius|cone|line|wall|blast|zone|cube|emanation|within a (tiny|small|med|large|huge|gargantuan)area|everything within|everything in|all creatures within|all enemies within|each creature within|each enemy within|each creature in|each enemy in|all targets within|against yourself and all|against all enemies adjacent|against each enemy adjacent/i.test(
      combText,
    );

  if (isArea) {
    if (
      spellName.includes('Solar Ray') ||
      spellName === 'Blinding Sun' ||
      spellName === 'Mighty Surfing Slam' ||
      spellName === 'Tripping Vine Slam'
    ) {
      return 'single';
    }
    return 'area';
  }

  if (
    combText.includes('chains twice') ||
    combText.includes('chains 2 times') ||
    combText.includes('chains 3') ||
    combText.includes('chains 4') ||
    combText.includes('chains 5') ||
    combText.includes('chains three') ||
    combText.includes('chains four') ||
    combText.includes('chains five') ||
    combText.includes('up to three') ||
    combText.includes('three targets') ||
    combText.includes('three creatures') ||
    combText.includes('four creatures') ||
    combText.includes('up to four')
  ) {
    return 'multi_gt_2';
  }

  if (
    combText.includes('chains once') ||
    combText.includes('chains 1 time') ||
    combText.includes('up to two targets') ||
    combText.includes('two creatures') ||
    combText.includes('up to two creatures') ||
    combText.includes('two targets')
  ) {
    return 'multi_le_2';
  }

  return 'single';
}

export function validateDoubleExtraDamage(spheres: MysticSphere[]): ExtraDamageValidationIssue[] {
  const issues: ExtraDamageValidationIssue[] = [];

  for (const sphere of spheres) {
    const spells = sphere.spells || [];
    for (const spell of spells) {
      if (SPECIAL_EXTRA_DAMAGE_EXEMPTIONS.has(spell.name)) {
        continue;
      }

      let baseSpell: any = null;
      if (spell.functionsLike) {
        try {
          baseSpell = getSpellByName(spell.functionsLike.name);
        } catch (e) {}
      }

      const hit = spell.attack?.hit || (baseSpell?.attack?.hit || '');
      const targeting = spell.attack?.targeting || (baseSpell?.attack?.targeting || '');
      const effect = spell.effect || (baseSpell?.effect || '');
      const exceptThat = spell.functionsLike?.exceptThat || '';
      const fullText = `${hit} ${targeting} ${effect} ${exceptThat}`;

      const dmgRank = getHighestDamageRank(fullText);
      const hasDouble = /extra damage.*?is doubled|doubled.*?extra damage/i.test(fullText);
      const isPoison = spell.name.startsWith('Poison --') || spell.name.includes('Concoction');

      const targetCategory = getExtraDamageTargetCategory(fullText, spell.name);

      if (isPoison) {
        if (hasDouble) {
          issues.push({
            type: 'unexpected_double_extra_damage',
            severity: 'warning',
            spellName: spell.name,
            sphereName: sphere.name,
            spellRank: spell.rank,
            damageRank: dmgRank,
            targetCategory,
            message: `Poison spell "${spell.name}" (${sphere.name}) should not double extra damage.`,
          });
        }
        continue;
      }

      if (targetCategory === 'single' || targetCategory === 'multi_le_2') {
        if (dmgRank >= 5 && !hasDouble) {
          issues.push({
            type: 'missing_double_extra_damage',
            severity: 'warning',
            spellName: spell.name,
            sphereName: sphere.name,
            spellRank: spell.rank,
            damageRank: dmgRank,
            targetCategory,
            message: `Single-target or <=2-target spell "${spell.name}" (${sphere.name}, Rank ${spell.rank}) deals damage rank ${dmgRank} >= 5, but is missing doubled extra damage phrasing.`,
          });
        } else if (dmgRank >= 0 && dmgRank < 5 && hasDouble) {
          issues.push({
            type: 'unexpected_double_extra_damage',
            severity: 'warning',
            spellName: spell.name,
            sphereName: sphere.name,
            spellRank: spell.rank,
            damageRank: dmgRank,
            targetCategory,
            message: `Spell "${spell.name}" (${sphere.name}, Rank ${spell.rank}) deals damage rank ${dmgRank} < 5, but doubles extra damage.`,
          });
        }
      } else {
        // Area or multi > 2
        if (hasDouble) {
          issues.push({
            type: 'unexpected_double_extra_damage',
            severity: 'warning',
            spellName: spell.name,
            sphereName: sphere.name,
            spellRank: spell.rank,
            damageRank: dmgRank,
            targetCategory,
            message: `Area or multi-target (>2 targets) spell "${spell.name}" (${sphere.name}, Rank ${spell.rank}) should not double extra damage.`,
          });
        }
      }
    }
  }

  return issues;
}

