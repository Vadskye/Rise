import {
  mysticSpheres,
  allMysticSpheres,
  rituals,
  SphereName,
} from '@src/abilities/mystic_spheres';
import { AbilityRole, isAbilityRole } from '@src/abilities/constants';
import { validateSpells } from '@src/abilities/validate_spells';
import { buildSpellProfile } from '@src/abilities/spell_profile';
import {
  CantripDefinition,
  SpellDefinition,
  RitualDefinition,
} from '@src/abilities/active_abilities';
import cli from 'commander';
import _ from 'lodash';

export type BoringCategory =
  | 'vanilla_damage'
  | 'redundant_design'
  | 'strictly_outclassed'
  | 'insufficient_role'
  | 'role_saturation';

export type SpellItemKind = 'cantrip' | 'spell' | 'ritual';

export interface StandardSpellItem {
  sphere: SphereName;
  name: string;
  spell: CantripDefinition | SpellDefinition;
  kind: 'cantrip' | 'spell';
  rank: number;
}

export interface RitualSpellItem {
  sphere: string;
  name: string;
  spell: RitualDefinition;
  kind: 'ritual';
  rank: number;
}

export type SpellItem = StandardSpellItem | RitualSpellItem;

export interface BoringFinding {
  sphere: SphereName | string;
  name: string;
  rank: number;
  kind: SpellItemKind;
  category: BoringCategory;
  score: number; // 1-10 severity score (10 = highest candidate for removal/improvement)
  reason: string;
  details?: string;
  recommendation: string;
  spells?: string[];
}

export interface FindBoringSpellsOptions {
  sphereFilter?: string;
  categoryFilter?: BoringCategory;
  maxRank?: number;
  minScore?: number;
  includeRituals?: boolean;
}

export interface CliOptions {
  sphere?: string;
  category?: BoringCategory;
  maxRank?: number;
  minScore?: number;
  includeRituals?: boolean;
  summary?: boolean;
  json?: boolean;
}

/**
 * Extracts the full combined text (attack, effect, narrative) from a spell definition.
 */
export function getSpellFullText(
  spell: CantripDefinition | SpellDefinition | RitualDefinition,
): string {
  const attackText = spell.attack
    ? `${spell.attack.hit} ${spell.attack.targeting || ''} ${spell.attack.injury || ''}`
    : '';
  return `${attackText} ${spell.effect || ''} ${spell.narrative || ''}`.trim();
}

/**
 * Collects all spells, cantrips, and optionally rituals from mystic spheres.
 */
export function getAllSpells(
  options: { includeRituals?: boolean; maxRank?: number } = {},
): SpellItem[] {
  const items: SpellItem[] = [];

  for (const sphere of allMysticSpheres) {
    if (sphere.name !== 'Universal') {
      if (sphere.cantrips) {
        for (const c of sphere.cantrips) {
          if (!options.maxRank || (c.rank || 0) <= options.maxRank) {
            items.push({
              sphere: sphere.name,
              name: c.name,
              spell: c,
              kind: 'cantrip',
              rank: c.rank || 0,
            });
          }
        }
      }
      if (sphere.spells) {
        for (const s of sphere.spells) {
          if (!options.maxRank || s.rank <= options.maxRank) {
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
    }
  }

  if (options.includeRituals) {
    for (const r of rituals) {
      items.push({
        sphere: r.spheres && r.spheres.length > 0 ? r.spheres.join(', ') : 'Rituals',
        name: r.name,
        spell: r,
        kind: 'ritual',
        rank: r.rank,
      });
    }
  }

  return items;
}

/**
 * Detects vanilla single-target damage attacks that lack status conditions, movement, or tactical choices.
 */
export function detectVanillaDamageSpells(items: SpellItem[]): BoringFinding[] {
  const findings: BoringFinding[] = [];

  for (const item of items) {
    if (item.kind === 'ritual') {
      continue;
    }

    const s = item.spell;
    const profile = buildSpellProfile(s, item.sphere);
    const fullText = getSpellFullText(s).toLowerCase();

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
        reason:
          'Pure single-target damage attack with no status conditions, movement, or tactical choices',
        details: `Attack targets ${profile.defenses.join('/') || 'defense'} at range ${profile.range}, dealing damage without secondary effects or condition interaction.`,
        recommendation:
          'Add a secondary condition (e.g. slowed, dazed, prone), tactical trigger (e.g. bonus vs injured/grappled targets), or positional effect to make combat choices more dynamic.',
      });
    }
  }

  return findings;
}

/**
 * Runs the spell validation engine to find mechanical redundancies and strictly outclassed spells.
 */
export function detectValidationIssues(items: SpellItem[]): BoringFinding[] {
  const findings: BoringFinding[] = [];
  const validationIssues = validateSpells(mysticSpheres, { showApproximate: true });

  for (const issue of validationIssues) {
    if (issue.type === 'redundancy' || issue.type === 'almost_equivalent') {
      const [spellA, spellB] = issue.spells;
      const itemA = items.find((i) => i.name === spellA);
      const itemB = items.find((i) => i.name === spellB);

      if (itemA || itemB) {
        const nameA = itemA?.name || spellA;
        const nameB = itemB?.name || spellB;
        const sphereA = itemA?.sphere || 'other sphere';
        const sphereB = itemB?.sphere || 'other sphere';
        const sphere =
          itemA && itemB && itemA.sphere === itemB.sphere
            ? itemA.sphere
            : `${sphereA} / ${sphereB}`;
        const rank = itemA?.rank ?? itemB?.rank ?? 0;
        const kind = itemA?.kind ?? itemB?.kind ?? 'spell';
        const sortedNames = [nameA, nameB].sort();

        findings.push({
          sphere,
          name: sortedNames.join(', '),
          rank,
          kind,
          category: 'redundant_design',
          score: 8,
          reason:
            sphereA === sphereB
              ? `Mechanically redundant designs in ${sphere}: "${nameA}" and "${nameB}"`
              : `Mechanically redundant designs: "${nameA}" (${sphereA}) and "${nameB}" (${sphereB})`,
          details: issue.message,
          recommendation:
            'Differentiate the mechanics (e.g. range, defense targeted, action cost, secondary condition) or remove/combine one of the spells.',
          spells: sortedNames,
        });
      }
    } else if (issue.type === 'strictly_superior') {
      // In validateSpells, issue.spells is [inferiorSpellName, superiorSpellName]
      const [inferiorName, superiorName] = issue.spells;
      const itemInferior = items.find((i) => i.name === inferiorName);
      const itemSuperior = items.find((i) => i.name === superiorName);

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

  return findings;
}

/**
 * Detects role saturation within a single sphere (3+ spells competing for the exact same role and rank).
 */
export function detectRoleSaturation(items: SpellItem[]): BoringFinding[] {
  const findings: BoringFinding[] = [];
  const sphereGroups = _.groupBy(items, (i) => i.sphere);

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

    for (const [key, roleItems] of roleMap.entries()) {
      const [role, rankStr] = key.split(':');
      if (!isAbilityRole(role)) {
        throw new Error(`Unable to parse role "${role}"`);
      }
      const rank = parseInt(rankStr, 10);
      const spellNames = roleItems.map((i) => i.spell.name).join(', ');
      // Rank 1 attunements are a special case. We actually want a *minimum* value in
      // addition to a maximum.
      if (role === 'attune' && rank === 1) {
        if (roleItems.length <= 1) {
          findings.push({
            sphere: sphereName,
            name: spellNames,
            rank,
            kind: 'spell',
            category: 'insufficient_role',
            score: 8,
            reason: `Insufficient role "${role}" in ${sphereName} at Rank ${rankStr} (${roleItems.length} spells: ${spellNames})`,
            details: 'Not enough spells in the same sphere of the given role.',
            recommendation: 'Add more spells of the given role.',
            spells: roleItems.map((i) => i.spell.name),
          });
        }
      }
      if (roleItems.length >= expectedRoleLimit(role, rank)) {
        findings.push({
          sphere: sphereName,
          name: spellNames,
          rank,
          kind: rank === 0 ? 'cantrip' : 'spell',
          category: 'role_saturation',
          score: 5,
          reason: `Role "${role}" is saturated in ${sphereName} at Rank ${rankStr} (${roleItems.length} spells: ${spellNames})`,
          details: 'Multiple spells in the same sphere compete for the exact same role and rank.',
          recommendation:
            'Prune or differentiate the competing spells to give each spell a unique combat niche within the sphere.',
          spells: roleItems.map((i) => i.spell.name),
        });
      }
    }
  }

  return findings;
}

function expectedRoleLimit(role: AbilityRole, rank: number) {
  const commonRoles = ['attune', 'burst', 'clear', 'maim'];
  let limit = 3;
  if (commonRoles.includes(role)) {
    limit += 1;
  }
  if (rank <= 4) {
    limit += 1;
  }

  return limit;
}

/**
 * Deduplicates findings by (sphere, name, category), preserving the entry with the highest score.
 */
export function deduplicateFindings(findings: BoringFinding[]): BoringFinding[] {
  const uniqueMap = new Map<string, BoringFinding>();
  for (const f of findings) {
    const key = `${f.sphere}:${f.name}:${f.category}`;
    const existing = uniqueMap.get(key);
    if (!existing || f.score > existing.score) {
      uniqueMap.set(key, f);
    }
  }
  return Array.from(uniqueMap.values());
}

/**
 * Evaluates all spells across all spheres to find boring, redundant, or uninteresting spell designs.
 */
export function findBoringSpells(options: FindBoringSpellsOptions = {}): BoringFinding[] {
  const items = getAllSpells({ includeRituals: options.includeRituals, maxRank: options.maxRank });

  const rawFindings: BoringFinding[] = [
    ...detectVanillaDamageSpells(items),
    ...detectValidationIssues(items),
    ...detectRoleSaturation(items),
  ];

  let result = deduplicateFindings(rawFindings);

  if (options.sphereFilter) {
    const filterLower = options.sphereFilter.toLowerCase();
    result = result.filter((f) => f.sphere.toLowerCase().includes(filterLower));
  }
  if (options.categoryFilter) {
    console.log('options.categoryFilter', options.categoryFilter);
    result = result.filter((f) => f.category === options.categoryFilter);
  }
  if (options.minScore !== undefined) {
    result = result.filter((f) => f.score >= options.minScore!);
  }

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
 * Prints high-level summary breakdown of findings.
 */
export function printSummaryReport(findings: BoringFinding[]): void {
  console.log('\n========================================');
  console.log(' SUMMARY: BORING / REDUNDANT SPELL CANDIDATES');
  console.log('========================================\n');
  console.log(`Total Candidate Issues Flagged: ${findings.length}\n`);

  const byCategory = _.groupBy(findings, (f) => f.category);
  console.log('--- Breakdown by Category ---');
  for (const [cat, items] of Object.entries(byCategory)) {
    console.log(`  - ${cat}: ${items.length} spell(s)`);
  }

  const bySphere = _.groupBy(findings, (f) => f.sphere);
  console.log('\n--- Breakdown by Sphere ---');
  for (const [sph, items] of Object.entries(bySphere)) {
    console.log(`  - ${sph}: ${items.length} candidate issue(s)`);
  }
  console.log();
}

/**
 * Prints detailed human-readable findings grouped by sphere.
 */
export function printDetailedReport(findings: BoringFinding[]): void {
  console.log('\n=============================================================');
  console.log(' RISE SPELL AUDIT: CANDIDATES FOR REMOVAL OR IMPROVEMENT');
  console.log('=============================================================\n');
  console.log(`Found ${findings.length} candidate spells across Mystic Spheres:\n`);

  const grouped = _.groupBy(findings, (f) => f.sphere);
  const sphereNames = _.sortBy(Object.keys(grouped));

  for (const sphereName of sphereNames) {
    const sphereFindings = grouped[sphereName];
    console.log('=============================================================');
    console.log(` SPHERE: ${sphereName.toUpperCase()} (${sphereFindings.length} candidate issues)`);
    console.log('=============================================================');

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

/**
 * Runs the CLI command with parsed options.
 */
export async function runCli(opts: CliOptions): Promise<void> {
  const findings = findBoringSpells({
    sphereFilter: opts.sphere,
    categoryFilter: opts.category,
    maxRank: opts.maxRank,
    minScore: opts.minScore,
    includeRituals: opts.includeRituals,
  });

  if (opts.json) {
    console.log(JSON.stringify(findings, null, 2));
    return;
  }

  if (opts.summary) {
    printSummaryReport(findings);
    return;
  }

  printDetailedReport(findings);
}

if (require.main === module) {
  cli
    .name('find_boring_spells')
    .description(
      'Rise Spell Quality Audit - Find boring, redundant, or uninteresting spell designs',
    )
    .option('-s, --sphere <name>', 'Filter findings by sphere name (e.g. Pyromancy, Aeromancy)')
    .option(
      '-c, --category <category>',
      'Filter by category (vanilla_damage, redundant_design, strictly_outclassed, role_saturation)',
    )
    .option('--max-rank <max_rank>', 'Filter by max spell rank', (val) => parseInt(val, 10))
    .option('-m, --min-score <number>', 'Filter by minimum severity score (1-10)', (val) =>
      parseInt(val, 10),
    )
    .option('-r, --include-rituals', 'Include rituals in the audit (excluded by default)')
    .option('--summary', 'Output high-level summary by category and sphere')
    .option('--json', 'Output raw JSON results')
    .parse(process.argv);

  runCli({
    sphere: cli.sphere,
    category: cli.category,
    maxRank: cli.maxRank,
    minScore: cli.minScore,
    includeRituals: Boolean(cli.includeRituals),
    summary: Boolean(cli.summary),
    json: Boolean(cli.json),
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
