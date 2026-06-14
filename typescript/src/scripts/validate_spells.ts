import { mysticSpheres } from '@src/abilities/mystic_spheres';
import { validateSpells } from '@src/abilities/validate_spells';
import _ from 'lodash';

const showApproximate = process.argv.includes('--show-approximate');

console.log('Running Spell Design Validation on all Mystic Spheres...');

const issues = validateSpells(mysticSpheres, { showApproximate });

if (issues.length === 0) {
  console.log('No spell design redundancies or damage inconsistencies found!');
} else {
  console.log(`\nFound ${issues.length} design issues:\n`);

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
      console.log(`=== Almost Equivalent Spell Designs (differs by ${field}) (${fieldIssues.length}) ===`);
      for (const issue of fieldIssues) {
        console.log(`- ${issue.message}`);
      }
      console.log();
    }
  }
}
