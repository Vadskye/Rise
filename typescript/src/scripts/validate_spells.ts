import { mysticSpheres } from '@src/abilities/mystic_spheres';
import { validateSpells, validateSpellDesignGuidelines } from '@src/abilities/validate_spells';
import _ from 'lodash';

const runComparative = process.argv.includes('--comparative');
const runDesign = process.argv.includes('--design');
const showApproximate = process.argv.includes('--show-approximate');

if (!runComparative && !runDesign) {
  console.error('Error: At least one validation flag must be provided: --design or --comparative.');
  process.exit(1);
}

console.log('Running Spell Validation on all Mystic Spheres...\n');

// ---------------------------------------------------------------------------
// PART 1: SPELL DESIGN GUIDELINE VALIDATION (docs/damaging_abilities.md)
// ---------------------------------------------------------------------------
if (runDesign) {
  console.log('========================================================================');
  console.log('PART 1: SPELL DESIGN GUIDELINE VALIDATION (docs/damaging_abilities.md)');
  console.log('========================================================================\n');

  const designIssues = validateSpellDesignGuidelines(mysticSpheres);

  if (designIssues.length === 0) {
    console.log('All damaging spells adhere to design doc formulas!\n');
  } else {
    console.log(`Found ${designIssues.length} design guideline mismatches:\n`);

    const underbudget = designIssues.filter((i) => i.type === 'design_underbudget');
    const overbudget = designIssues.filter((i) => i.type === 'design_overbudget');

    if (underbudget.length > 0) {
      console.log(
        `=== Underbudget Spells (deal less damage than allowed) (${underbudget.length}) ===`,
      );
      for (const issue of underbudget) {
        console.log(`- ${issue.message}`);
        console.log(`    Breakdown:`);
        console.log(`      * Base Rank: ${issue.breakdown.baseRank}`);
        console.log(
          `      * Targeting Mod: ${issue.breakdown.targetingMod} (${issue.breakdown.targetingReason})`,
        );
        if (issue.breakdown.defenseReason) {
          console.log(
            `      * Defense Mod: ${issue.breakdown.defenseMod} (${issue.breakdown.defenseReason})`,
          );
        }
        if (issue.breakdown.effectReasons.length > 0) {
          console.log(
            `      * Effect Mod: ${issue.breakdown.effectMod} (${issue.breakdown.effectReasons.join(', ')})`,
          );
        }
        if (issue.breakdown.bonusReasons.length > 0) {
          console.log(
            `      * Bonus Mod: ${issue.breakdown.bonusMod} (${issue.breakdown.bonusReasons.join(', ')})`,
          );
        }
      }
      console.log();
    }

    if (overbudget.length > 0) {
      console.log(
        `=== Overbudget Spells (deal more damage than allowed) (${overbudget.length}) ===`,
      );
      for (const issue of overbudget) {
        console.log(`- ${issue.message}`);
        console.log(`    Breakdown:`);
        console.log(`      * Base Rank: ${issue.breakdown.baseRank}`);
        console.log(
          `      * Targeting Mod: ${issue.breakdown.targetingMod} (${issue.breakdown.targetingReason})`,
        );
        if (issue.breakdown.defenseReason) {
          console.log(
            `      * Defense Mod: ${issue.breakdown.defenseMod} (${issue.breakdown.defenseReason})`,
          );
        }
        if (issue.breakdown.effectReasons.length > 0) {
          console.log(
            `      * Effect Mod: ${issue.breakdown.effectMod} (${issue.breakdown.effectReasons.join(', ')})`,
          );
        }
        if (issue.breakdown.bonusReasons.length > 0) {
          console.log(
            `      * Bonus Mod: ${issue.breakdown.bonusMod} (${issue.breakdown.bonusReasons.join(', ')})`,
          );
        }
      }
      console.log();
    }
  }
}

// ---------------------------------------------------------------------------
// PART 2: CROSS-SPELL COMPARATIVE VALIDATION
// ---------------------------------------------------------------------------
if (runComparative) {
  console.log('========================================================================');
  console.log('PART 2: CROSS-SPELL COMPARATIVE VALIDATION');
  console.log('========================================================================\n');

  const issues = validateSpells(mysticSpheres, { showApproximate });

  if (issues.length === 0) {
    console.log('No spell design redundancies or damage inconsistencies found!');
  } else {
    console.log(`Found ${issues.length} comparative design issues:\n`);

    const redundancies = issues.filter((i) => i.type === 'redundancy');
    const inconsistencies = issues.filter((i) => i.type === 'inconsistent_damage');
    const roleInconsistencies = issues.filter((i) => i.type === 'inconsistent_roles');
    const superiorSpells = issues.filter((i) => i.type === 'strictly_superior');
    const almostEquivalent = issues.filter((i) => i.type === 'almost_equivalent');

    if (redundancies.length > 0) {
      console.log(`=== Redundancies / Duplicate Spell Designs (${redundancies.length}) ===`);
      for (const issue of redundancies) {
        console.log(`- ${issue.message}`);
      }
      console.log();
    }

    if (inconsistencies.length > 0) {
      console.log(`=== Inconsistent Damage / Cost Balancing (${inconsistencies.length}) ===`);
      for (const issue of inconsistencies) {
        console.log(`- ${issue.message}`);
      }
      console.log();
    }

    if (roleInconsistencies.length > 0) {
      console.log(`=== Inconsistent Roles (${roleInconsistencies.length}) ===`);
      for (const issue of roleInconsistencies) {
        console.log(`- ${issue.message}`);
      }
      console.log();
    }

    if (superiorSpells.length > 0) {
      console.log(`=== Strictly Superior Spell Designs (${superiorSpells.length}) ===`);
      for (const issue of superiorSpells) {
        console.log(`- ${issue.message}`);
      }
      console.log();
    }

    if (almostEquivalent.length > 0) {
      const grouped = _.groupBy(almostEquivalent, (i) => i.differenceField || 'other');
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
  }
}
