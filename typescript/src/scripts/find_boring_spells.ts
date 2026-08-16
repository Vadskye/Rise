import { mysticSpheres, allMysticSpheres, rituals } from '@src/abilities/mystic_spheres';
import { validateSpells } from '@src/abilities/validate_spells';
import { buildSpellProfile } from '@src/abilities/spell_profile';
import {
  CantripDefinition,
  SpellDefinition,
  RitualDefinition,
} from '@src/abilities/active_abilities';
import _ from 'lodash';

export type BoringCategory =
  | 'vanilla_damage'
  | 'redundant_design'
  | 'strictly_outclassed'
  | 'passive_stat_buff'
  | 'role_saturation'
  | 'low_complexity';

export interface BoringFinding {
  sphere: string;
  name: string;
  rank: number;
  kind: 'cantrip' | 'spell' | 'ritual';
  category: BoringCategory;
  score: number; // 1-10 severity score (10 = highest candidate for removal/improvement)
  reason: string;
  details?: string;
  recommendation: string;
}

export interface SpellItem {
  sphere: string;
  name: string;
  spell: CantripDefinition | SpellDefinition | RitualDefinition;
  kind: 'cantrip' | 'spell' | 'ritual';
  rank: number;
}

/**
 * Collects all spells, cantrips, and rituals from all mystic spheres.
 */
export function getAllSpells(): SpellItem[] {
  const items: SpellItem[] = [];

  for (const sphere of allMysticSpheres) {
    if (sphere.cantrips) {
      for (const c of sphere.cantrips) {
        items.push({
          sphere: sphere.name,
          name: c.name,
          spell: c,
          kind: 'cantrip',
          rank: 0,
        });
      }
    }
    if (sphere.spells) {
      for (const s of sphere.spells) {
        items.push({
          sphere: sphere.name,
          name: s.name,
          spell: s,
          kind: 'spell',
          rank: s.rank,
        });
      }
    }
  }

  for (const r of rituals) {
    items.push({
      sphere: 'Rituals',
      name: r.name,
      spell: r,
      kind: 'ritual',
      rank: r.rank,
    });
  }

  return items;
}

/**
 * Evaluates all spells across all spheres to find boring, redundant, or uninteresting spell designs.
 */
export function findBoringSpells(
  options: {
    sphereFilter?: string;
    categoryFilter?: BoringCategory;
    minScore?: number;
    includeRituals?: boolean;
  } = {},
): BoringFinding[] {
  const allItems = getAllSpells().filter(
    (item) => options.includeRituals || item.kind !== 'ritual',
  );
  const findings: BoringFinding[] = [];

  // Helper to extract full text of a spell
  function getFullText(spell: CantripDefinition | SpellDefinition | RitualDefinition): string {
    const attackText = spell.attack
      ? `${spell.attack.hit} ${spell.attack.targeting || ''} ${spell.attack.injury || ''}`
      : '';
    return `${attackText} ${spell.effect || ''} ${spell.narrative || ''}`.trim();
  }

  // 2. Check for Vanilla Damage attacks (pure single-target damage, no status/terrain/tactics)
  for (const item of allItems) {
    const s = item.spell;
    const profile = buildSpellProfile(s as SpellDefinition, item.sphere);
    const fullText = getFullText(s).toLowerCase();

    const isDamageAttack =
      profile.hasAttack && (profile.maxDamageRank !== null || fullText.includes('damagerank'));
    const isSingleTarget = profile.area === 'single' && profile.maxTargets <= 1;
    const hasNoConditions = profile.appliedEffects.length === 0;
    const hasNoSpecialReqs = profile.specialRequirements.length === 0;
    const hasNoAccCondition = profile.accuracyCondition === null;
    const isNotDelayedOrRepeating = !profile.isDelayed && !profile.isRepeating;

    // Movement/terrain/dynamic choice keywords
    const hasMovementOrTerrain =
      /push|pull|fling|teleport|slide|move|fly|leap|wall|zone|difficult terrain|cover|hazard/i.test(
        fullText,
      );
    const hasReactionOrTrigger =
      /reaction|reactive|whenever|when an ally|when an enemy|if the target is|if you are/i.test(
        fullText,
      );

    if (
      isDamageAttack &&
      isSingleTarget &&
      !profile.isAttunable &&
      !profile.hasDoT &&
      hasNoConditions &&
      hasNoSpecialReqs &&
      hasNoAccCondition &&
      isNotDelayedOrRepeating &&
      !hasMovementOrTerrain &&
      !hasReactionOrTrigger
    ) {
      findings.push({
        sphere: item.sphere,
        name: s.name,
        rank: item.rank,
        kind: item.kind,
        category: 'vanilla_damage',
        score: 8,
        reason: `Pure single-target damage attack with no status conditions, movement, or tactical choices`,
        details: `Attack targets ${profile.defenses.join('/') || 'defense'} at range ${profile.range}, dealing damage without secondary effects or condition interaction.`,
        recommendation: `Add a secondary condition (e.g. slowed, dazed, prone), tactical trigger (e.g. bonus vs injured/grappled targets), or positional effect to make combat choices more dynamic.`,
      });
    }
  }

  // 3. Run validation engine for mechanical redundancies and strictly superior/outclassed spells
  const validationIssues = validateSpells(mysticSpheres, { showApproximate: true });
  for (const issue of validationIssues) {
    if (issue.type === 'redundancy' || issue.type === 'almost_equivalent') {
      const [spellA, spellB] = issue.spells;
      const itemA = allItems.find((i) => i.name === spellA);
      const itemB = allItems.find((i) => i.name === spellB);

      if (itemA) {
        findings.push({
          sphere: itemA.sphere,
          name: itemA.name,
          rank: itemA.rank,
          kind: itemA.kind,
          category: 'redundant_design',
          score: 8,
          reason: `Mechanically redundant with "${spellB}" (${itemB?.sphere || 'other sphere'})`,
          details: issue.message,
          recommendation: `Differentiate the mechanics (e.g. range, defense targeted, action cost, secondary condition) or remove/combine one of the spells.`,
        });
      }
      if (itemB) {
        findings.push({
          sphere: itemB.sphere,
          name: itemB.name,
          rank: itemB.rank,
          kind: itemB.kind,
          category: 'redundant_design',
          score: 8,
          reason: `Mechanically redundant with "${spellA}" (${itemA?.sphere || 'other sphere'})`,
          details: issue.message,
          recommendation: `Differentiate the mechanics (e.g. range, defense targeted, action cost, secondary condition) or remove/combine one of the spells.`,
        });
      }
    } else if (issue.type === 'strictly_superior') {
      // In validateSpells, issue.spells is [inferiorSpellName, superiorSpellName]
      const [inferiorName, superiorName] = issue.spells;
      const itemInferior = allItems.find((i) => i.name === inferiorName);
      const itemSuperior = allItems.find((i) => i.name === superiorName);

      if (itemInferior) {
        findings.push({
          sphere: itemInferior.sphere,
          name: itemInferior.name,
          rank: itemInferior.rank,
          kind: itemInferior.kind,
          category: 'strictly_outclassed',
          score: 9,
          reason: `Strictly outclassed by "${superiorName}" (${itemSuperior?.sphere || 'other sphere'})`,
          details: issue.message,
          recommendation: `Buff this spell, add a unique utility feature, or remove it as it is strictly inferior to "${superiorName}".`,
        });
      }
    }
  }

  // 4. Check for Passive Stat Buffs (attune/focus spells with only flat numerical bonuses)
  for (const item of allItems) {
    const s = item.spell;
    const roles = s.roles || [];
    const isBuffRole = roles.some((r) =>
      ['attune', 'focus', 'turtle', 'ramp'].includes(r.toLowerCase()),
    );
    const fullText = getFullText(s);

    if (isBuffRole && !s.attack) {
      const isOnlyFlatStats =
        /^\s*(?:you gain|grants?|targets? gain|allies gain)?\s*(?:a\s+)?(?:\+\d+|\-\d+)?\s*(?:bonus|penalty)?\s*to\s*(?:accuracy|defense|armor|saving throws|fortitude|reflex|mental|brawn)\b[^.]*\.\s*$/i.test(
          fullText,
        );
      const hasActiveGrantedAction =
        /standard action|minor action|reaction|whenever|can spend|can use|allows you to/i.test(
          fullText,
        );

      if (
        isOnlyFlatStats ||
        (!hasActiveGrantedAction &&
          /gain a \+\d+ bonus to/i.test(fullText) &&
          fullText.length < 120)
      ) {
        findings.push({
          sphere: item.sphere,
          name: s.name,
          rank: item.rank,
          kind: item.kind,
          category: 'passive_stat_buff',
          score: 6,
          reason: `Flat numerical stat buff with no active actions or interactive mechanics`,
          details: `Effect description: "${fullText}"`,
          recommendation: `Replace simple passive stat bonuses with an active granted capability, situational trigger, or dynamic choice.`,
        });
      }
    }
  }

  // 5. Check for Role Saturation within a single sphere
  const sphereGroups = _.groupBy(allItems, (i) => i.sphere);
  for (const [sphereName, sphereSpells] of Object.entries(sphereGroups)) {
    if (sphereName === 'Non-Sphere Spells' || sphereName === 'Rituals') {
      continue;
    }

    const roleMap = new Map<string, SpellItem[]>();
    for (const item of sphereSpells) {
      for (const role of item.spell.roles || []) {
        const key = `${role.toLowerCase()}:${item.rank}`;
        if (!roleMap.has(key)) {
          roleMap.set(key, []);
        }
        roleMap.get(key)!.push(item);
      }
    }

    for (const [key, items] of roleMap.entries()) {
      if (items.length >= 3) {
        const [role, rankStr] = key.split(':');
        const spellNames = items.map((i) => i.spell.name).join(', ');
        for (const item of items) {
          findings.push({
            sphere: sphereName,
            name: item.spell.name,
            rank: item.rank,
            kind: item.kind,
            category: 'role_saturation',
            score: 5,
            reason: `Role "${role}" is saturated in ${sphereName} at Rank ${rankStr} (${items.length} spells: ${spellNames})`,
            details: `Multiple spells in the same sphere compete for the exact same role and rank.`,
            recommendation: `Prune or differentiate the competing spells to give each spell a unique combat niche within the sphere.`,
          });
        }
      }
    }
  }

  // 6. Check for Low Complexity / Extremely Brief descriptions
  for (const item of allItems) {
    const s = item.spell;
    const fullText = getFullText(s);
    if (fullText.length > 0 && fullText.length < 50 && !s.functionsLike) {
      findings.push({
        sphere: item.sphere,
        name: s.name,
        rank: item.rank,
        kind: item.kind,
        category: 'low_complexity',
        score: 4,
        reason: `Very brief spell description (${fullText.length} characters)`,
        details: `Text: "${fullText}"`,
        recommendation: `Expand text to clarify interactions, tactical choices, or unique sphere identity, or combine into another spell.`,
      });
    }
  }

  // Deduplicate findings by (sphere, name, category) keeping highest score
  const uniqueFindingsMap = new Map<string, BoringFinding>();
  for (const f of findings) {
    const key = `${f.sphere}:${f.name}:${f.category}`;
    const existing = uniqueFindingsMap.get(key);
    if (!existing || f.score > existing.score) {
      uniqueFindingsMap.set(key, f);
    }
  }

  let result = Array.from(uniqueFindingsMap.values());

  // Filter options
  if (options.sphereFilter) {
    const filterLower = options.sphereFilter.toLowerCase();
    result = result.filter((f) => f.sphere.toLowerCase().includes(filterLower));
  }
  if (options.categoryFilter) {
    result = result.filter((f) => f.category === options.categoryFilter);
  }
  if (options.minScore !== undefined) {
    result = result.filter((f) => f.score >= options.minScore!);
  }

  // Sort by score descending, then sphere, rank, name
  return result.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (a.sphere !== b.sphere) {
      return a.sphere.localeCompare(b.sphere);
    }
    if (a.rank !== b.rank) {
      return a.rank - b.rank;
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * CLI Runner
 */
if (require.main === module) {
  const args = process.argv.slice(2);

  let sphereFilter: string | undefined;
  let categoryFilter: BoringCategory | undefined;
  let minScore: number | undefined;
  let includeRituals = false;
  let showJson = false;
  let showSummary = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--sphere' && i + 1 < args.length) {
      sphereFilter = args[++i];
    } else if (arg === '--category' && i + 1 < args.length) {
      categoryFilter = args[++i] as BoringCategory;
    } else if (arg === '--min-score' && i + 1 < args.length) {
      minScore = parseInt(args[++i], 10);
    } else if (arg === '--include-rituals') {
      includeRituals = true;
    } else if (arg === '--json') {
      showJson = true;
    } else if (arg === '--summary') {
      showSummary = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Rise Spell Quality Audit - Find Boring / Redundant Spells

Usage: npx tsx src/scripts/find_boring_spells.ts [options]

Options:
  --sphere <name>       Filter findings by sphere name (e.g. Pyromancy, Aeromancy)
  --category <category> Filter by category (vanilla_damage, functions_like_clone, redundant_design, strictly_outclassed, passive_stat_buff, role_saturation, low_complexity)
  --min-score <number>  Filter by minimum severity score (1-10)
  --include-rituals     Include rituals in the audit (excluded by default)
  --summary             Output high-level summary by category and sphere
  --json                Output raw JSON results
  --help, -h            Show this help menu
`);
      process.exit(0);
    }
  }

  const findings = findBoringSpells({ sphereFilter, categoryFilter, minScore, includeRituals });

  if (showJson) {
    console.log(JSON.stringify(findings, null, 2));
    process.exit(0);
  }

  if (showSummary) {
    console.log(`\n========================================`);
    console.log(` SUMMARY: BORING / REDUNDANT SPELL CANDIDATES`);
    console.log(`========================================\n`);
    console.log(`Total Candidate Issues Flagged: ${findings.length}\n`);

    const byCategory = _.groupBy(findings, (f) => f.category);
    console.log(`--- Breakdown by Category ---`);
    for (const [cat, items] of Object.entries(byCategory)) {
      console.log(`  - ${cat}: ${items.length} spell(s)`);
    }

    const bySphere = _.groupBy(findings, (f) => f.sphere);
    console.log(`\n--- Breakdown by Sphere ---`);
    for (const [sph, items] of Object.entries(bySphere)) {
      console.log(`  - ${sph}: ${items.length} candidate issue(s)`);
    }
    console.log();
    process.exit(0);
  }

  console.log(`\n=============================================================`);
  console.log(` RISE SPELL AUDIT: CANDIDATES FOR REMOVAL OR IMPROVEMENT`);
  console.log(`=============================================================\n`);
  console.log(`Found ${findings.length} candidate spells across Mystic Spheres:\n`);

  const grouped = _.groupBy(findings, (f) => f.sphere);

  for (const [sphereName, sphereFindings] of Object.entries(grouped)) {
    console.log(`=============================================================`);
    console.log(` SPHERE: ${sphereName.toUpperCase()} (${sphereFindings.length} candidate issues)`);
    console.log(`=============================================================`);

    for (const f of sphereFindings) {
      console.log(
        `\n[Score ${f.score}/10] [${f.category.toUpperCase()}] ${f.name} (${f.kind}, Rank ${f.rank})`,
      );
      console.log(`  Reason: ${f.reason}`);
      if (f.details) {
        console.log(`  Details: ${f.details}`);
      }
      console.log(`  💡 Action: ${f.recommendation}`);
    }
    console.log();
  }
}
