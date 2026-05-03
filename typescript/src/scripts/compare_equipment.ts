/**
 * compare_equipment.ts
 *
 * Generates equipment LaTeX output from the TypeScript pipeline.
 * Mirrors the interface of the Rust `item_latex` binary so outputs can be diffed
 * using verify_latex.js.
 *
 * Usage (from typescript/ directory):
 *   npx tsx src/scripts/compare_equipment.ts --category implements --table
 *   npx tsx src/scripts/compare_equipment.ts --category implements --descriptions
 *
 * Valid categories: implements, magic armor, magic weapons, apparel,
 *                   consumable tools, permanent tools
 */

import {
  generateImplementsDescriptions,
  generateImplementsTables,
  generateMagicArmorDescriptions,
  generateMagicArmorTables,
  generateMagicWeaponsDescriptions,
  generateMagicWeaponsTables,
  generateApparelDescriptions,
  generateApparelTables,
} from '../equipment/latex/generate';

function parseArgs(): { category: string; mode: 'table' | 'descriptions' } {
  const args = process.argv.slice(2);
  let category = '';
  let mode: 'table' | 'descriptions' | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--category' && args[i + 1]) {
      category = args[i + 1];
      i++;
    } else if (args[i] === '--table') {
      mode = 'table';
    } else if (args[i] === '--descriptions') {
      mode = 'descriptions';
    }
  }

  if (!category) {
    console.error('Error: --category is required');
    console.error(
      'Valid values: implements, magic armor, magic weapons, apparel, consumable tools, permanent tools',
    );
    process.exit(1);
  }

  if (!mode) {
    console.error('Error: must provide either --table or --descriptions');
    process.exit(1);
  }

  return { category: category.toLowerCase(), mode };
}

function generate(category: string, mode: 'table' | 'descriptions'): string {
  switch (category) {
    case 'implements':
      return mode === 'table' ? generateImplementsTables() : generateImplementsDescriptions();
    case 'magic armor':
      return mode === 'table' ? generateMagicArmorTables() : generateMagicArmorDescriptions();
    case 'magic weapons':
      return mode === 'table' ? generateMagicWeaponsTables() : generateMagicWeaponsDescriptions();
    case 'apparel':
      return mode === 'table' ? generateApparelTables() : generateApparelDescriptions();
    default:
      console.error(`Error: unrecognized category '${category}'`);
      console.error('Valid values: implements, magic armor, magic weapons, apparel');
      console.error('(consumable tools, permanent tools not yet migrated)');
      process.exit(1);
  }
}

const { category, mode } = parseArgs();
const output = generate(category, mode);
process.stdout.write(output + '\n');
