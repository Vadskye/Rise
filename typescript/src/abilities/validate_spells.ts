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
  range: string;
  defenses: string[];
  area: string;
  areaSize: string;
  damageRank: number | null;
  isLowPower: boolean;
  conditions: string[];
  accuracyModifier: number;
  specialRequirements: string[];
  isDelayed: boolean;
  hasCost: boolean;
  roles: SpellDefinition['roles'];
  hasAttack: boolean;
  type?: SpellDefinition['type'];
  healingRank: number | null;
  areaGrows: boolean;
}

export interface ValidationIssue {
  type: 'redundancy' | 'inconsistent_damage' | 'inconsistent_roles';
  severity: 'warning';
  message: string;
  spells: [string, string];
}

const RANK_WORDS: Record<string, number> = {
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
  const match = text.match(/\\damagerank(\w+)/i);
  if (!match) return null;
  const word = match[1].toLowerCase().replace('low', '');
  return RANK_WORDS[word] || null;
}

function parseHealingRank(text: string): number | null {
  const match = text.match(/\\hprank(\w+)/i);
  if (!match) return null;
  const word = match[1].toLowerCase().replace('low', '');
  return RANK_WORDS[word] || null;
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
  if (lowercase.includes('radius') || lowercase.includes('emanation') || lowercase.includes('zone')) return 'radius';
  if (lowercase.includes('line')) return 'line';
  if (lowercase.includes('wall')) return 'wall';
  if (lowercase.includes('chain')) return 'chain';
  if (lowercase.includes('up to') && (lowercase.includes('targets') || lowercase.includes('creatures'))) return 'multi';
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

function parseConditions(text: string): string[] {
  const lowercase = text.toLowerCase();
  const conditions = [
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
  ];
  return conditions.filter((c) => lowercase.includes(c));
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
  return requirements.sort();
}

function parseDelayed(text: string): boolean {
  const lowercase = text.toLowerCase();
  return (
    lowercase.includes('next turn') ||
    lowercase.includes('next round') ||
    lowercase.includes('delayed')
  ) && !lowercase.includes('until your next turn');
}

export function buildSpellProfile(spell: SpellDefinition | CantripDefinition, sphereName: string): SpellProfile {
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
  const conditions = parseConditions(fullText);
  const accuracyModifier = parseAccuracyModifier(fullText);
  const specialRequirements = parseSpecialRequirements(fullText);
  const isDelayed = parseDelayed(fullText);
  const hasCost =
    !!spell.cost ||
    spell.fatigueCost === true ||
    spell.materialCost === true ||
    (spell.type || '').toLowerCase().startsWith('attune') ||
    fullText.toLowerCase().includes('cooldown');
  const roles = (spell.roles || []).map((r) => r.toLowerCase() as SpellDefinition['roles'][number]).sort();

  const healingRank = parseHealingRank(fullText);
  const areaGrows = fullText.toLowerCase().includes('increases over time');

  return {
    name: spell.name,
    sphereName,
    rank: (spell.rank || 0) as SpellDefinition['rank'],
    isDoubleAction,
    range,
    defenses,
    area,
    areaSize,
    damageRank,
    isLowPower,
    conditions,
    accuracyModifier,
    specialRequirements,
    isDelayed,
    hasCost,
    roles,
    hasAttack: !!spell.attack,
    type: spell.type,
    healingRank,
    areaGrows,
  };
}

export function validateSpells(spheres: MysticSphere[]): ValidationIssue[] {
  const profiles: SpellProfile[] = [];
  const issues: ValidationIssue[] = [];

  for (const sphere of spheres) {
    const spells = sphere.spells || [];
    for (const spell of spells) {
      profiles.push(buildSpellProfile(spell, sphere.name));
    }
  }

  // Compare every pair of spells
  outer: for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      const p1 = profiles[i];
      const p2 = profiles[j];

      // Both spells must have attack definitions (i.e. they are combat abilities)
      if (!p1.hasAttack || !p2.hasAttack) continue;

      // Must be same rank
      if (p1.rank !== p2.rank) continue;

      // Must be same action economy
      if (p1.isDoubleAction !== p2.isDoubleAction) continue;

      // Must have same range category
      if (p1.range !== p2.range) continue;

      // Must have same targeted defenses
      const defs1 = p1.defenses.join(',');
      const defs2 = p2.defenses.join(',');
      if (defs1 !== defs2) continue;

      // Must have same targeting area structure
      if (p1.area !== p2.area) continue;

      // Must have same area size
      if (p1.areaSize !== p2.areaSize) continue;

      // Must have same area growth behavior
      if (p1.areaGrows !== p2.areaGrows) continue;

      // Must not mix damaging and non-damaging spells
      if ((p1.damageRank === null) !== (p2.damageRank === null)) continue;

      // Must not mix healing and non-healing spells
      if ((p1.healingRank === null) !== (p2.healingRank === null)) continue;

      // Must have same accuracy modifier
      if (p1.accuracyModifier !== p2.accuracyModifier) continue;

      // Must have same special requirements
      const reqs1 = p1.specialRequirements.join(',');
      const reqs2 = p2.specialRequirements.join(',');
      if (reqs1 !== reqs2) continue;

      // Must have same low power flag
      if (p1.isLowPower !== p2.isLowPower) continue;

      // Must have same delayed flag
      if (p1.isDelayed !== p2.isDelayed) continue;

      // Must share the exact same primary conditions
      const conds1 = [...p1.conditions].sort().join(',');
      const conds2 = [...p2.conditions].sort().join(',');
      if (conds1 !== conds2) continue;

      // If they reach here, they are virtually identical spells!
      issues.push({
        type: 'redundancy',
        severity: 'warning',
        message: `Spells "${p1.name}" (${p1.sphereName}) and "${p2.name}" (${p2.sphereName}) are virtually identical: both are Rank ${p1.rank}, range: ${p1.range}, defense: ${p1.defenses.join('/')}, double action: ${p1.isDoubleAction}, applying conditions: [${p1.conditions.join(', ')}].`,
        spells: [p1.name, p2.name],
      });

      // Now we filter for type inconsistencies. We want to flag attunement and non-attunement spells as being virtually identical above, but they are significantly different in other ways, so we don't need the subsequent checks.
      if (p1.type !== p2.type) {
        continue;
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
    }
  }

  return issues;
}
