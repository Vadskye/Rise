import { allMysticSpheres, SphereName } from '@src/abilities/mystic_spheres';
import { buildSpellProfile, resolveSpell, parseDamageRank } from '@src/abilities/spell_profile';
import {
  calculateExpectedDamageRank,
  DamageCalculationBreakdown,
} from '@src/abilities/expected_damage_rank';
import { CantripDefinition, SpellDefinition } from '@src/abilities/active_abilities';

export type InjuryCategory = 'free' | 'reduced' | 'heavy_reduction';

export interface InjuryRiderItem {
  sphereName: SphereName;
  name: string;
  rank: number;
  actualDamageRank: number;
  unpenalizedBaseRank: number;
  expectedDamageRank: number;
  penaltyPaid: number;
  category: InjuryCategory;
  injuryText: string;
  riderEffects: string[];
  breakdown: DamageCalculationBreakdown;
  isDerived: boolean;
}

const BUFF_KEYWORDS = [
  'empowered',
  'maximized',
  'focused',
  'shielded',
  'braced',
  'fortified',
  'honed',
  'primed',
  'steeled',
  'resistant',
];

const DEBUFF_KEYWORDS = [
  'slowed',
  'dazed',
  'blinded',
  'confused',
  'dazzled',
  'goaded',
  'unsteady',
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
  'cannot act',
  'frozen',
  'stasis',
  'unable to breathe',
];

const MOVEMENT_KEYWORDS = ['fling', 'push', 'pull', 'slide', 'prone', 'teleport'];

const SPECIAL_KEYWORDS = ['sunlight', 'difficult terrain', 'liquify'];

/**
 * Extracts buff, debuff, status, or movement riders from injury text.
 * Excludes pure bonus damage / DoT effects.
 */
export function extractInjuryRiders(injuryText: string): string[] {
  if (!injuryText || injuryText.trim() === '') {
    return [];
  }

  const lowercase = injuryText.toLowerCase();
  const riders: string[] = [];

  for (const buff of BUFF_KEYWORDS) {
    if (lowercase.includes(buff)) {
      riders.push(`buff:${buff}`);
    }
  }

  for (const debuff of DEBUFF_KEYWORDS) {
    if (lowercase.includes(debuff)) {
      riders.push(`debuff:${debuff}`);
    }
  }

  for (const move of MOVEMENT_KEYWORDS) {
    if (lowercase.includes(move)) {
      riders.push(`movement:${move}`);
    }
  }

  for (const special of SPECIAL_KEYWORDS) {
    if (lowercase.includes(special)) {
      riders.push(`special:${special}`);
    }
  }

  return riders;
}

/**
 * Analyzes all spells and cantrips across all spheres to find damaging abilities
 * with bonus injury effects, categorized by damage reduction.
 */
export function findDamageAndInjuryAbilities(): InjuryRiderItem[] {
  const results: InjuryRiderItem[] = [];

  for (const sphere of allMysticSpheres) {
    const abilities: Array<SpellDefinition | CantripDefinition> = [
      ...(sphere.cantrips || []),
      ...(sphere.spells || []),
    ];

    for (const rawAbility of abilities) {
      const isDerived = !!rawAbility.functionsLike;
      const spell = resolveSpell(rawAbility);

      if (!spell.attack) {
        continue;
      }

      const injuryText = spell.attack.injury || '';
      const riders = extractInjuryRiders(injuryText);

      // We only care about abilities that have non-damage bonus buffs/debuffs/movement on injury
      if (riders.length === 0) {
        continue;
      }

      const profile = buildSpellProfile(rawAbility, sphere.name);
      if (profile.maxDamageRank === null && parseDamageRank(spell.attack.hit) === null) {
        continue;
      }

      const breakdown = calculateExpectedDamageRank(profile);
      if (!breakdown) {
        continue;
      }

      const actualDamageRank = profile.unconditionalDamageRank ?? profile.maxDamageRank ?? 0;
      const unpenalizedBaseRank =
        profile.rank + breakdown.targetingMod + breakdown.defenseMod + breakdown.bonusMod;
      const penaltyPaid = unpenalizedBaseRank - actualDamageRank;
      const expectedDamageRank = breakdown.expectedDamageRank;

      let category: InjuryCategory;
      if (penaltyPaid <= 0) {
        // Did not reduce damage (got effect for free or even overbudget)
        category = 'free';
      } else if (penaltyPaid <= 2) {
        // Paid standard -1 or -2 damage reduction
        category = 'reduced';
      } else {
        // Traded major damage (3+ damage ranks reduction)
        category = 'heavy_reduction';
      }

      results.push({
        sphereName: sphere.name,
        name: rawAbility.name,
        rank: rawAbility.rank || 0,
        actualDamageRank,
        unpenalizedBaseRank,
        expectedDamageRank,
        penaltyPaid,
        category,
        injuryText: injuryText.replace(/\s+/g, ' ').trim(),
        riderEffects: riders,
        breakdown,
        isDerived,
      });
    }
  }

  return results;
}

function formatTable(items: InjuryRiderItem[]): string {
  if (items.length === 0) {
    return '  (None found)\n';
  }

  const header = [
    'Sphere'.padEnd(16),
    'Spell Name'.padEnd(34),
    'Rank'.padEnd(6),
    'Actual DR'.padEnd(11),
    'Base DR'.padEnd(9),
    'Penalty Paid'.padEnd(14),
    'Riders',
  ].join(' | ');

  const separator = [
    '-'.repeat(16),
    '-'.repeat(34),
    '-'.repeat(6),
    '-'.repeat(11),
    '-'.repeat(9),
    '-'.repeat(14),
    '-'.repeat(30),
  ].join('-|-');

  const rows = items.map((item) => {
    const penaltyStr =
      item.penaltyPaid > 0
        ? `-${item.penaltyPaid} dr`
        : item.penaltyPaid === 0
          ? '0 dr (Free)'
          : `+${-item.penaltyPaid} dr (Extra)`;
    const derivedMark = item.isDerived ? ' *' : '';
    const nameStr = (item.name + derivedMark).padEnd(34);
    const ridersStr = item.riderEffects.join(', ');

    return [
      item.sphereName.padEnd(16),
      nameStr,
      `R${item.rank}`.padEnd(6),
      `dr${item.actualDamageRank}`.padEnd(11),
      `dr${item.unpenalizedBaseRank}`.padEnd(9),
      penaltyStr.padEnd(14),
      ridersStr,
    ].join(' | ');
  });

  return `  ${header}\n  ${separator}\n  ${rows.join('\n  ')}\n`;
}

export function main(): void {
  console.log('================================================================================');
  console.log('INVESTIGATION: DAMAGING ABILITIES WITH INJURY-TRIGGERED BUFFS & DEBUFFS');
  console.log('================================================================================\n');

  const allResults = findDamageAndInjuryAbilities();

  const freeList = allResults.filter((r) => r.category === 'free');
  const reducedList = allResults.filter((r) => r.category === 'reduced');
  const heavyReducedList = allResults.filter((r) => r.category === 'heavy_reduction');

  console.log(
    `Found ${allResults.length} total damaging spells with injury-triggered bonus effects.\n`,
  );

  console.log(`=== CATEGORY 1: FREE INJURY RIDERS / NO DAMAGE PENALTY (${freeList.length}) ===`);
  console.log(
    'These spells deal full baseline damage without paying damage rank for the injury effect.\n',
  );
  console.log(formatTable(freeList));

  console.log(
    `=== CATEGORY 2: STANDARD DAMAGE REDUCTION / PAID INJURY RIDERS (${reducedList.length}) ===`,
  );
  console.log('These spells reduce their damage by 1-2 ranks in exchange for the injury effect.\n');
  console.log(formatTable(reducedList));

  console.log(
    `=== CATEGORY 3: HEAVY DAMAGE REDUCTION / UTILITY PRIMARY (${heavyReducedList.length}) ===`,
  );
  console.log(
    'These spells deal far below baseline damage (e.g. dr1 at high rank), focusing primarily on utility/movement.\n',
  );
  console.log(formatTable(heavyReducedList));

  console.log('================================================================================');
  console.log('SUMMARY STATISTICS');
  console.log('================================================================================');
  console.log(`  Total Abilities with Injury Riders : ${allResults.length}`);
  console.log(
    `  - Free Bonus / Unreduced Damage     : ${freeList.length} (${((freeList.length / allResults.length) * 100).toFixed(1)}%)`,
  );
  console.log(
    `  - Standard Damage Reduction (Paid)  : ${reducedList.length} (${((reducedList.length / allResults.length) * 100).toFixed(1)}%)`,
  );
  console.log(
    `  - Heavy Damage Reduction (Utility)  : ${heavyReducedList.length} (${((heavyReducedList.length / allResults.length) * 100).toFixed(1)}%)`,
  );
  console.log('\n  (* indicates derived spell using functionsLike)\n');
}

if (require.main === module) {
  main();
}
