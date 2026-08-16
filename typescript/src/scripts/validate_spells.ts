import { mysticSpheres } from '@src/abilities/mystic_spheres';
import {
  validateSpells,
  validateSpellDesignGuidelines,
  validateDoubleExtraDamage,
  DamagingSpellDesignIssue,
  ExtraDamageValidationIssue,
  ValidationIssue,
} from '@src/abilities/validate_spells';
import { DamageCalculationBreakdown } from '@src/abilities/expected_damage_rank';
import _ from 'lodash';

interface ValidationOptions {
  runDesign: boolean;
  runComparative: boolean;
  runExtraDamage: boolean;
  showApproximate: boolean;
}

function parseCommandLineArgs(): ValidationOptions {
  const runComparative = process.argv.includes('--comparative');
  const runDesign = process.argv.includes('--design');
  const runExtraDamage = process.argv.includes('--extra-damage');
  const showApproximate = process.argv.includes('--show-approximate');

  if (!runComparative && !runDesign && !runExtraDamage) {
    console.error(
      'Error: At least one validation flag must be provided: --design, --comparative, or --extra-damage.',
    );
    process.exit(1);
  }

  return { runDesign, runComparative, runExtraDamage, showApproximate };
}

function printDamageBreakdown(breakdown: DamageCalculationBreakdown): void {
  console.log(`    Breakdown:`);
  console.log(`      * Base Rank: ${breakdown.baseRank}`);
  console.log(`      * Targeting Mod: ${breakdown.targetingMod} (${breakdown.targetingReason})`);
  if (breakdown.defenseReason) {
    console.log(`      * Defense Mod: ${breakdown.defenseMod} (${breakdown.defenseReason})`);
  }
  if (breakdown.effectReasons.length > 0) {
    console.log(
      `      * Effect Mod: ${breakdown.effectMod} (${breakdown.effectReasons.join(', ')})`,
    );
  }
  if (breakdown.bonusReasons.length > 0) {
    console.log(`      * Bonus Mod: ${breakdown.bonusMod} (${breakdown.bonusReasons.join(', ')})`);
  }
}

function printDesignIssuesGroup(title: string, issues: DamagingSpellDesignIssue[]): void {
  if (issues.length === 0) {
    return;
  }

  console.log(`=== ${title} (${issues.length}) ===`);
  for (const issue of issues) {
    console.log(`- ${issue.message}`);
    printDamageBreakdown(issue.breakdown);
  }
  console.log();
}

function runDesignValidation(): void {
  console.log('========================================================================');
  console.log('PART 1: SPELL DESIGN GUIDELINE VALIDATION (docs/damaging_abilities.md)');
  console.log('========================================================================\n');

  const designIssues = validateSpellDesignGuidelines(mysticSpheres);

  if (designIssues.length === 0) {
    console.log('All damaging spells adhere to design doc formulas!\n');
    return;
  }

  console.log(`Found ${designIssues.length} design guideline mismatches:\n`);

  const underbudget = designIssues.filter((i) => i.type === 'design_underbudget');
  const overbudget = designIssues.filter((i) => i.type === 'design_overbudget');

  printDesignIssuesGroup('Underbudget Spells (deal less damage than allowed)', underbudget);
  printDesignIssuesGroup('Overbudget Spells (deal more damage than allowed)', overbudget);
}

function printComparativeIssuesGroup(title: string, issues: ValidationIssue[]): void {
  if (issues.length === 0) {
    return;
  }

  console.log(`=== ${title} (${issues.length}) ===`);
  for (const issue of issues) {
    console.log(`- ${issue.message}`);
  }
  console.log();
}

function printAlmostEquivalentIssues(issues: ValidationIssue[]): void {
  if (issues.length === 0) {
    return;
  }

  const grouped = _.groupBy(issues, (i) => i.differenceField || 'other');
  const fields = Object.keys(grouped).sort();

  for (const field of fields) {
    const fieldIssues = grouped[field];
    console.log(
      `=== Almost Equivalent Spell Designs (differs by ${field}) (${fieldIssues.length}) ===`,
    );
    for (const issue of fieldIssues) {
      console.log(`- ${issue.message}`);
    }
    console.log();
  }
}

function runComparativeValidation(options: { showApproximate: boolean }): void {
  console.log('========================================================================');
  console.log('PART 2: CROSS-SPELL COMPARATIVE VALIDATION');
  console.log('========================================================================\n');

  const issues = validateSpells(mysticSpheres, { showApproximate: options.showApproximate });

  if (issues.length === 0) {
    console.log('No spell design redundancies or damage inconsistencies found!');
    return;
  }

  console.log(`Found ${issues.length} comparative design issues:\n`);

  const redundancies = issues.filter((i) => i.type === 'redundancy');
  const inconsistencies = issues.filter((i) => i.type === 'inconsistent_damage');
  const roleInconsistencies = issues.filter((i) => i.type === 'inconsistent_roles');
  const superiorSpells = issues.filter((i) => i.type === 'strictly_superior');
  const almostEquivalent = issues.filter((i) => i.type === 'almost_equivalent');

  printComparativeIssuesGroup('Redundancies / Duplicate Spell Designs', redundancies);
  printComparativeIssuesGroup('Inconsistent Damage / Cost Balancing', inconsistencies);
  printComparativeIssuesGroup('Inconsistent Roles', roleInconsistencies);
  printComparativeIssuesGroup('Strictly Superior Spell Designs', superiorSpells);
  printAlmostEquivalentIssues(almostEquivalent);
}

function printExtraDamageIssuesGroup(title: string, issues: ExtraDamageValidationIssue[]): void {
  if (issues.length === 0) {
    return;
  }

  console.log(`=== ${title} (${issues.length}) ===`);
  for (const issue of issues) {
    console.log(`- ${issue.message}`);
  }
  console.log();
}

function runExtraDamageValidation(): void {
  console.log('========================================================================');
  console.log('PART 3: DOUBLE EXTRA DAMAGE GUIDELINE VALIDATION');
  console.log('========================================================================\n');

  const issues = validateDoubleExtraDamage(mysticSpheres);

  if (issues.length === 0) {
    console.log('All spells adhere to double extra damage guidelines!\n');
    return;
  }

  console.log(`Found ${issues.length} extra damage guideline mismatches:\n`);

  const missing = issues.filter((i) => i.type === 'missing_double_extra_damage');
  const unexpected = issues.filter((i) => i.type === 'unexpected_double_extra_damage');

  printExtraDamageIssuesGroup(
    'Missing Double Extra Damage (Single-target / <=2-target spells with damage rank >= 5)',
    missing,
  );
  printExtraDamageIssuesGroup(
    'Unexpected Double Extra Damage (Area spells, >2-target spells, or spells with damage rank < 5)',
    unexpected,
  );
}

function main(): void {
  const options = parseCommandLineArgs();

  console.log('Running Spell Validation on all Mystic Spheres...\n');

  if (options.runDesign) {
    runDesignValidation();
    runExtraDamageValidation();
  } else if (options.runExtraDamage) {
    runExtraDamageValidation();
  }

  if (options.runComparative) {
    runComparativeValidation({ showApproximate: options.showApproximate });
  }
}

main();

