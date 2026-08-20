import { mysticSpheres } from '@src/abilities/mystic_spheres';
import {
  validateSpells,
  validateSpellDesignGuidelines,
  validateDoubleExtraDamage,
  validateSpellRoles,
  DamagingSpellDesignIssue,
  ExtraDamageValidationIssue,
  RoleValidationIssue,
  ValidationIssue,
} from '@src/abilities/validate_spells';
import { DamageCalculationBreakdown } from '@src/abilities/expected_damage_rank';
import cli from 'commander';
import _ from 'lodash';

export interface ValidationOptions {
  runDesign?: boolean;
  runComparative?: boolean;
  runExtraDamage?: boolean;
  runRoles?: boolean;
  showApproximate?: boolean;
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

function printRoleIssuesGroup(title: string, issues: RoleValidationIssue[]): void {
  if (issues.length === 0) {
    return;
  }

  console.log(`=== ${title} (${issues.length}) ===`);
  for (const issue of issues) {
    console.log(`- ${issue.message}`);
  }
  console.log();
}

function runRoleValidation(): void {
  console.log('========================================================================');
  console.log('PART 4: SPELL ROLE VALIDATION (constants.ts)');
  console.log('========================================================================\n');

  const issues = validateSpellRoles(mysticSpheres);

  if (issues.length === 0) {
    console.log('All spells have valid and complete roles!\n');
    return;
  }

  console.log(`Found ${issues.length} role validation issues:\n`);

  const missing = issues.filter((i) => i.type === 'missing_role');
  const unexpected = issues.filter((i) => i.type === 'unexpected_role');
  const invalidAttunement = issues.filter((i) => i.type === 'invalid_attunement_role');

  printRoleIssuesGroup('Missing Roles (Spells missing expected roles based on mechanics)', missing);
  printRoleIssuesGroup(
    'Unexpected Roles (Spells with roles not supported by mechanics)',
    unexpected,
  );
  printRoleIssuesGroup(
    'Invalid Attunement Roles (Attunements with secondary roles without active actions)',
    invalidAttunement,
  );
}

export function main(options: ValidationOptions): void {
  console.log('Running Spell Validation on all Mystic Spheres...\n');

  if (options.runDesign) {
    runDesignValidation();
  }

  if (options.runExtraDamage) {
    runExtraDamageValidation();
  }

  if (options.runComparative) {
    runComparativeValidation({ showApproximate: Boolean(options.showApproximate) });
  }

  if (options.runRoles) {
    runRoleValidation();
  }
}

if (require.main === module) {
  cli
    .name('validate_spells')
    .description('Validate spells across mystic spheres')
    .option('-d, --design', 'Validate spell design guidelines (expected damage vs formulas)')
    .option('-c, --comparative', 'Validate cross-spell comparative balance and redundancies')
    .option('-e, --extra-damage', 'Validate double extra damage guidelines')
    .option('-r, --roles', 'Validate spell roles')
    .option('-a, --show-approximate', 'Show approximate matches in comparative validation')
    .option('--all', 'Run all validations')
    .parse(process.argv);

  const opts = cli.opts();
  const runAll = Boolean(opts.all);
  const runDesign = runAll || Boolean(opts.design);
  const runComparative = runAll || Boolean(opts.comparative);
  const runExtraDamage = runAll || Boolean(opts.extraDamage);
  const runRoles = runAll || Boolean(opts.roles);
  const showApproximate = Boolean(opts.showApproximate);

  if (!runDesign && !runComparative && !runExtraDamage && !runRoles) {
    console.error(
      'Error: At least one validation flag must be provided: --design, --comparative, --extra-damage, --roles, or --all.\n',
    );
    cli.outputHelp();
    process.exit(1);
  }

  main({
    runDesign,
    runComparative,
    runExtraDamage,
    runRoles,
    showApproximate,
  });
}
