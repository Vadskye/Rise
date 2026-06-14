import { mysticSpheres } from '@src/abilities/mystic_spheres';
import { validateSpells } from '@src/abilities/validate_spells';

console.log('Running Spell Design Validation on all Mystic Spheres...');

const issues = validateSpells(mysticSpheres);

if (issues.length === 0) {
  console.log('No spell design redundancies or damage inconsistencies found!');
} else {
  console.log(`\nFound ${issues.length} design issues:\n`);

  const redundancies = issues.filter((i) => i.type === 'redundancy');
  const inconsistencies = issues.filter((i) => i.type === 'inconsistent_damage');
  const roleInconsistencies = issues.filter((i) => i.type === 'inconsistent_roles');

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
}
