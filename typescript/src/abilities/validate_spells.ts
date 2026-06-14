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
 *    a structured "SpellProfile" using Regex and string checks.
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
 *    differ without a cost difference (e.g., one deals higher damage but neither has a cost/fatigue).
 *
 * ASSUMPTIONS & SIMPLIFICATIONS:
 * - Spells without an 'attack' block are assumed to be utility/passive/pure-support spells, and
 *   are skipped for redundancy checks to prevent false positives from unparsed text effects.
 * - Text Parsing via Regex: This engine uses heuristic regex matching on LaTeX/text properties.
 *   - Double actions are identified by looking for "spend a standard action to make an attack" or "during your next turn".
 *   - Defenses are matched via "vs. [Defense]" or "against [Defense]".
 *   - Conditions are matched by finding keywords (e.g., "slowed", "dazed") anywhere in the text.
 *   - Costs are simplified to checking if a "cost" string or fatigue/material cost flags exist.
 *   - Damage ranks are extracted via `\damagerank[word]` (ignoring `\hprank` healing ranks).
 */

import { SpellDefinition, CantripDefinition } from './active_abilities';
import { MysticSphere } from './mystic_spheres';

export interface SpellProfile {
  name: SpellDefinition['name'];
  sphereName: string;
  rank: SpellDefinition['rank'];
  isDoubleAction: boolean;
  isReactive: boolean;
  range: string;
  defenses: string[];
  area: string;
  areaSize: string;
  damageRank: number | null;
  isLowPower: boolean;
  appliedEffects: string[];
  accuracyModifier: number;
  specialRequirements: string[];
  isDelayed: boolean;
  hasCost: boolean;
  roles: SpellDefinition['roles'];
  hasAttack: boolean;
  type?: SpellDefinition['type'];
  healingRank: number | null;
  areaGrows: boolean;
  halfOnMiss: boolean;
  maxTargets: number;
}

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

const RANK_WORDS: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

function parseDamageRank(text: string): number | null {
  const matches = [...text.matchAll(/\\damagerank(\w+)/gi)];
  if (matches.length === 0) return null;

  const firstWord = matches[0][1].toLowerCase().replace('low', '');
  let baseRank = RANK_WORDS[firstWord] !== undefined ? RANK_WORDS[firstWord] : null;
  if (baseRank === null) return null;

  // If there are multiple damageranks, and it has DoT keywords, add +2
  if (matches.length >= 2) {
    const lowercase = text.toLowerCase();
    if (
      lowercase.includes('burn') ||
      lowercase.includes('corrode') ||
      lowercase.includes('poison') ||
      lowercase.includes('next turn') ||
      lowercase.includes('each turn')
    ) {
      baseRank += 2;
    }
  }
  return baseRank;
}

function parseHealingRank(text: string): number | null {
  const match = text.match(/\\hprank(\w+)/i);
  if (!match) return null;
  const word = match[1].toLowerCase().replace('low', '');
  return RANK_WORDS[word] !== undefined ? RANK_WORDS[word] : null;
}

function parseDefenses(text: string): string[] {
  const lowercase = text.toLowerCase();
  const defenses = ['fortitude', 'reflex', 'mental', 'brawn', 'armor'];
  const matched: string[] = [];
  for (const def of defenses) {
    const regex = new RegExp(`(vs\\.|against|and)\\s+(\\\\glossterm{)?${def}`, 'i');
    if (regex.test(lowercase)) {
      matched.push(def);
    }
  }
  if (matched.length === 0 && lowercase.includes('strike')) {
    matched.push('armor');
  }
  return matched.sort();
}

function parseRange(text: string): string {
  const lowercase = text.toLowerCase();
  if (lowercase.includes('touch') || lowercase.includes('\\glossterm{touch}')) return 'melee';
  if (
    lowercase.includes('from you') ||
    lowercase.includes('adjacent to you') ||
    lowercase.includes('from your location') ||
    lowercase.includes('around you') ||
    lowercase.includes('emanation')
  ) {
    return 'self';
  }
  if (lowercase.includes('\\shortrange')) return 'short';
  if (lowercase.includes('\\medrange')) return 'medium';
  if (lowercase.includes('\\longrange')) return 'long';
  if (lowercase.includes('\\distrange')) return 'distant';
  return 'none';
}

function parseArea(text: string): string {
  const lowercase = text.toLowerCase();
  if (lowercase.includes('cone')) return 'cone';
  if (lowercase.includes('radius') || lowercase.includes('emanation') || lowercase.includes('zone'))
    return 'radius';
  if (lowercase.includes('line')) return 'line';
  if (lowercase.includes('wall')) return 'wall';
  if (lowercase.includes('chain')) return 'chain';
  if (
    lowercase.includes('up to') &&
    (lowercase.includes('targets') || lowercase.includes('creatures'))
  )
    return 'multi';
  return 'single';
}

function parseAreaSize(text: string): string {
  const lowercase = text.toLowerCase();
  if (lowercase.includes('\\tinyarea') || lowercase.includes('tiny')) return 'tiny';
  if (lowercase.includes('\\smallarea') || lowercase.includes('small')) return 'small';
  if (lowercase.includes('\\medarea') || lowercase.includes('medium')) return 'medium';
  if (lowercase.includes('\\largearea') || lowercase.includes('large')) return 'large';
  if (lowercase.includes('\\hugearea') || lowercase.includes('huge')) return 'huge';
  if (lowercase.includes('\\gargarea') || lowercase.includes('gargantuan')) return 'gargantuan';
  return 'none';
}

/**
 * Parses all status-altering effects applied by the spell, including both:
 * - Persistent conditions (e.g. slowed, dazed, prone)
 * - Brief/temporary buffs and debuffs (e.g. shielded, focused, unable to breathe)
 *
 * This allows the validator to compare spell similarity and strict superiority
 * regardless of whether the effect is a formal Rise "condition" or a brief status effect.
 */
function parseAppliedEffects(text: string): string[] {
  const lowercase = text.toLowerCase();
  const effects = [
    'slowed',
    'dazed',
    'blinded',
    'prone',
    'confused',
    'dazzled',
    'goaded',
    'unsteady',
    'grappled',
    'stunned',
    'weakened',
    'vulnerable',
    'exposed',
    'dread',
    'shaken',
    'poisoned',
    'frightened',
    'panicked',
    'immobilized',
    'charmed',
    'deafened',
    'shielded',
    'focused',
    'braced',
    'empowered',
    'fortified',
    'honed',
    'maximized',
    'primed',
    'steeled',
    'resistant',
    'unable to breathe',
    'difficult terrain',
    'liquify',
    'failure chance',
  ];
  return effects.filter((e) => lowercase.includes(e));
}

function parseAccuracyModifier(text: string): number {
  const lowercase = text.toLowerCase();
  const match = lowercase.match(/(\\plus|\\minus|\+|-)(\d+) (\\glossterm{)?accuracy/);
  if (match) {
    const sign = match[1] === '\\minus' || match[1] === '-' ? -1 : 1;
    return sign * Number(match[2]);
  }
  return 0;
}

function parseSpecialRequirements(text: string): string[] {
  const lowercase = text.toLowerCase();
  const requirements: string[] = [];
  if (lowercase.includes('corpse')) {
    requirements.push('corpse');
  }
  if (lowercase.includes('shadowed')) {
    requirements.push('shadowed');
  }
  if (lowercase.includes('injured')) {
    requirements.push('injured');
  }
  if (lowercase.includes('fails') || lowercase.includes('automatically fails')) {
    requirements.push('fails');
  }
  if (
    lowercase.includes('removed if') ||
    lowercase.includes('removed by') ||
    lowercase.includes('ends if') ||
    lowercase.includes('ends early if')
  ) {
    requirements.push('removable');
  }
  return requirements.sort();
}

function parseDelayed(text: string): boolean {
  const lowercase = text.toLowerCase();
  return (
    (lowercase.includes('next turn') ||
      lowercase.includes('next round') ||
      lowercase.includes('delayed')) &&
    !lowercase.includes('until your next turn')
  );
}

function parseMaxTargets(text: string): number {
  const lowercase = text.toLowerCase();
  const match = lowercase.match(
    /(?:up to|against)\s+(\w+|\d+)\s+(?:grounded\s+)?(?:creatures|targets|enemies|allies)/,
  );
  if (match) {
    const val = match[1];
    if (/\d+/.test(val)) {
      return parseInt(val, 10);
    }
    const wordMap: Record<string, number> = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
    };
    if (wordMap[val] !== undefined) {
      return wordMap[val];
    }
  }
  return 1;
}

export function buildSpellProfile(
  spell: SpellDefinition | CantripDefinition,
  sphereName: string,
): SpellProfile {
  const hit = spell.attack?.hit || '';
  const targeting = spell.attack?.targeting || '';
  const injury = spell.attack?.injury || '';
  const effect = spell.effect || '';
  const fullText = `${hit} ${targeting} ${injury} ${effect}`;

  const isDoubleAction =
    /spend a (\\glossterm{)?standard action(})? to make an attack/i.test(fullText) ||
    /during your next turn, you can spend a/i.test(fullText);

  const defenses = parseDefenses(fullText);
  const range = parseRange(fullText);
  const area = parseArea(fullText);
  const areaSize = parseAreaSize(fullText);
  const damageRank = parseDamageRank(fullText);
  const isLowPower = /\\damagerank\w+low/i.test(fullText);
  const appliedEffects = parseAppliedEffects(fullText);
  const accuracyModifier = parseAccuracyModifier(fullText);
  const specialRequirements = parseSpecialRequirements(fullText);
  const isDelayed = parseDelayed(fullText);
  const hasCost =
    !!spell.cost ||
    spell.fatigueCost === true ||
    spell.materialCost === true ||
    (spell.type || '').toLowerCase().startsWith('attune') ||
    fullText.toLowerCase().includes('cooldown');
  const roles = (spell.roles || [])
    .map((r) => r.toLowerCase() as SpellDefinition['roles'][number])
    .sort();

  const healingRank = parseHealingRank(fullText);
  const areaGrows = fullText.toLowerCase().includes('increases over time');

  const isReactive =
    targeting.toLowerCase().includes('reactive attack') ||
    targeting.toLowerCase().includes('\\reactiveattack') ||
    targeting.toLowerCase().includes('whenever');

  const halfOnMiss = spell.attack?.halfOnMiss === true;
  const maxTargets = parseMaxTargets(fullText);

  return {
    name: spell.name,
    sphereName,
    rank: (spell.rank || 0) as SpellDefinition['rank'],
    isDoubleAction,
    isReactive,
    range,
    defenses,
    area,
    areaSize,
    damageRank,
    isLowPower,
    appliedEffects,
    accuracyModifier,
    specialRequirements,
    isDelayed,
    hasCost,
    roles,
    hasAttack: !!spell.attack,
    type: spell.type,
    healingRank,
    areaGrows,
    halfOnMiss,
    maxTargets,
  };
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
  if (p1.isReactive !== p2.isReactive) {
    diffs.push({
      field: 'reactive nature',
      p1Value: p1.isReactive ? 'reactive/triggered' : 'standard',
      p2Value: p2.isReactive ? 'reactive/triggered' : 'standard',
    });
  }
  if (p1.range !== p2.range) {
    diffs.push({ field: 'range', p1Value: p1.range, p2Value: p2.range });
  }
  if (p1.defenses.join(',') !== p2.defenses.join(',')) {
    diffs.push({
      field: 'targeted defenses',
      p1Value: `[${p1.defenses.join(', ')}]`,
      p2Value: `[${p2.defenses.join(', ')}]`,
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

  return diffs;
}

const RANGE_ORDER = ['none', 'self', 'melee', 'short', 'medium', 'long', 'distant'];
const AREA_SIZE_ORDER = ['none', 'tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'];

interface ComparisonResult {
  isBetter: boolean;
  isWorse: boolean;
  betterFields: string[];
  worseFields: string[];
}

function compareSpellProfiles(p1: SpellProfile, p2: SpellProfile): ComparisonResult {
  const betterFields: string[] = [];
  const worseFields: string[] = [];

  // 1. Damage Rank
  const d1 = p1.damageRank ?? 0;
  const d2 = p2.damageRank ?? 0;
  if (d1 > d2) betterFields.push('damage rank');
  else if (d1 < d2) worseFields.push('damage rank');

  // 2. Healing Rank
  const h1 = p1.healingRank ?? 0;
  const h2 = p2.healingRank ?? 0;
  if (h1 > h2) betterFields.push('healing rank');
  else if (h1 < h2) worseFields.push('healing rank');

  // 3. Action Economy (double action is worse)
  if (p1.isDoubleAction !== p2.isDoubleAction) {
    if (!p1.isDoubleAction) betterFields.push('action economy');
    else worseFields.push('action economy');
  }

  // 4. Cost (having cost is worse)
  if (p1.hasCost !== p2.hasCost) {
    if (!p1.hasCost) betterFields.push('cost');
    else worseFields.push('cost');
  }

  // 5. Delay (delayed is worse)
  if (p1.isDelayed !== p2.isDelayed) {
    if (!p1.isDelayed) betterFields.push('delayed behavior');
    else worseFields.push('delayed behavior');
  }

  // 6. Accuracy Modifier
  if (p1.accuracyModifier !== p2.accuracyModifier) {
    if (p1.accuracyModifier > p2.accuracyModifier) betterFields.push('accuracy modifier');
    else worseFields.push('accuracy modifier');
  }

  // 7. Range
  if (p1.range !== p2.range) {
    const idx1 = Math.max(0, RANGE_ORDER.indexOf(p1.range));
    const idx2 = Math.max(0, RANGE_ORDER.indexOf(p2.range));
    if (idx1 > idx2) betterFields.push('range');
    else if (idx1 < idx2) worseFields.push('range');
  }

  // 8. Area Size
  if (p1.areaSize !== p2.areaSize) {
    const idx1 = Math.max(0, AREA_SIZE_ORDER.indexOf(p1.areaSize));
    const idx2 = Math.max(0, AREA_SIZE_ORDER.indexOf(p2.areaSize));
    if (idx1 > idx2) betterFields.push('area size');
    else if (idx1 < idx2) worseFields.push('area size');
  }

  // 9. Applied Effects (superset of applied effects is better)
  const e1 = new Set(p1.appliedEffects);
  const e2 = new Set(p2.appliedEffects);
  const hasExtraP1 = p1.appliedEffects.some((e) => !e2.has(e));
  const hasExtraP2 = p2.appliedEffects.some((e) => !e1.has(e));
  if (hasExtraP1) betterFields.push('applied conditions');
  if (hasExtraP2) worseFields.push('applied conditions');

  // 10. Special Requirements / Drawbacks (fewer is better/subset is better)
  const r1 = new Set(p1.specialRequirements);
  const r2 = new Set(p2.specialRequirements);
  const hasExtraReqsP1 = p1.specialRequirements.some((r) => !r2.has(r));
  const hasExtraReqsP2 = p2.specialRequirements.some((r) => !r1.has(r));
  if (hasExtraReqsP1) worseFields.push('special requirements');
  if (hasExtraReqsP2) betterFields.push('special requirements');

  // 11. Half on Miss (having half on miss is better)
  if (p1.halfOnMiss !== p2.halfOnMiss) {
    if (p1.halfOnMiss) betterFields.push('half damage on miss');
    else worseFields.push('half damage on miss');
  }

  // 12. Max Targets (for multi-target area spells, having more targets is better)
  if (p1.area === 'multi' && p2.area === 'multi' && p1.maxTargets !== p2.maxTargets) {
    if (p1.maxTargets > p2.maxTargets) betterFields.push('maximum targets');
    else worseFields.push('maximum targets');
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
  if (!p1.hasAttack || !p2.hasAttack) return [];

  // Hard constraint: The spells must still either both deal damage or both not deal damage
  if ((p1.damageRank === null) !== (p2.damageRank === null)) return [];

  // Hard constraint: Both must either heal or both not heal
  if ((p1.healingRank === null) !== (p2.healingRank === null)) return [];

  // Hard constraint: rank difference must be <= 1
  if (Math.abs(p1.rank - p2.rank) > 1) return [];

  const diffs = getSpellDifferences(p1, p2);
  const issues: ValidationIssue[] = [];

  if (diffs.length === 0) {
    // If they reach here, they are virtually identical spells!
    issues.push({
      type: 'redundancy',
      severity: 'warning',
      message: `Spells "${p1.name}" (${p1.sphereName}) and "${p2.name}" (${p2.sphereName}) are virtually identical: both are Rank ${p1.rank}, range: ${p1.range}, defense: ${p1.defenses.join('/')}, double action: ${p1.isDoubleAction}, applying conditions: [${p1.appliedEffects.join(', ')}].`,
      spells: [p1.name, p2.name],
    });

    // We want to flag attunement and non-attunement spells as redundant above, but they are significantly different in other ways, so we don't need the subsequent checks.
    if (p1.type !== p2.type) {
      return issues;
    }

    // Now check for damage vs cost inconsistencies:
    if (p1.damageRank !== null && p2.damageRank !== null && p1.damageRank !== p2.damageRank) {
      const higher = p1.damageRank > p2.damageRank ? p1 : p2;
      const lower = p1.damageRank > p2.damageRank ? p2 : p1;

      // If the higher damage one has no cost, but the lower damage one does, or both have no cost, it's inconsistent!
      if (!higher.hasCost || (!higher.hasCost && !lower.hasCost)) {
        issues.push({
          type: 'inconsistent_damage',
          severity: 'warning',
          message: `Spell "${higher.name}" (${higher.sphereName}) deals more damage (Rank ${higher.damageRank}) than "${lower.name}" (${lower.sphereName}, Rank ${lower.damageRank}) despite being equivalent, with no balancing cost factor.`,
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
      p1.isReactive === p2.isReactive &&
      p1.areaGrows === p2.areaGrows &&
      p1.defenses.join(',') === p2.defenses.join(',')
    ) {
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
