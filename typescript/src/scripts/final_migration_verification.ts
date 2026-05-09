import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { verify } from './verify_latex_parity';

const REPO_ROOT = path.resolve(__dirname, '../../../');
const RUST_DIR = path.join(REPO_ROOT, 'rust');
const TS_DIR = path.join(REPO_ROOT, 'typescript');
const RUST_GEN_DIR = path.join(REPO_ROOT, 'rust_generated');
const TS_GEN_DIR = path.join(REPO_ROOT, 'typescript_generated');

interface GenTask {
  name: string;
  rust: string;
  ts: string;
}

const TASKS: GenTask[] = [
  {
    name: 'classes.tex',
    rust: 'cargo run --bin classes_chapter',
    ts: 'npx tsx src/scripts/generate_latex.ts -t classes_chapter',
  },
  {
    name: 'apparel.tex',
    rust: 'cargo run --bin item_latex -- --category apparel --descriptions',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_apparel_descriptions',
  },
  {
    name: 'apparel_table.tex',
    rust: 'cargo run --bin item_latex -- --category apparel --table',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_apparel_tables',
  },
  {
    name: 'implements.tex',
    rust: 'cargo run --bin item_latex -- --category implements --descriptions',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_implements_descriptions',
  },
  {
    name: 'implements_table.tex',
    rust: 'cargo run --bin item_latex -- --category implements --table',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_implements_tables',
  },
  {
    name: 'magic_armor.tex',
    rust: 'cargo run --bin item_latex -- --category "magic armor" --descriptions',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_magic_armor_descriptions',
  },
  {
    name: 'magic_armor_table.tex',
    rust: 'cargo run --bin item_latex -- --category "magic armor" --table',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_magic_armor_tables',
  },
  {
    name: 'magic_weapons.tex',
    rust: 'cargo run --bin item_latex -- --category "magic weapons" --descriptions',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_magic_weapons_descriptions',
  },
  {
    name: 'magic_weapons_table.tex',
    rust: 'cargo run --bin item_latex -- --category "magic weapons" --table',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_magic_weapons_tables',
  },
  {
    name: 'consumable_tools.tex',
    rust: 'cargo run --bin item_latex -- --category "consumable tools" --descriptions',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_consumable_tools_descriptions',
  },
  {
    name: 'consumable_tools_table.tex',
    rust: 'cargo run --bin item_latex -- --category "consumable tools" --table',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_consumable_tools_tables',
  },
  {
    name: 'permanent_tools.tex',
    rust: 'cargo run --bin item_latex -- --category "permanent tools" --descriptions',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_permanent_tools_descriptions',
  },
  {
    name: 'permanent_tools_table.tex',
    rust: 'cargo run --bin item_latex -- --category "permanent tools" --table',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_permanent_tools_tables',
  },
  {
    name: 'relics.tex',
    rust: 'cargo run --bin item_latex -- --category relics --descriptions',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_relic_descriptions',
  },
  {
    name: 'relics_table.tex',
    rust: 'cargo run --bin item_latex -- --category relics --table',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_relic_tables',
  },
  {
    name: 'everything_table.tex',
    rust: 'cargo run --bin item_latex -- --category everything --table',
    ts: 'npx tsx src/scripts/generate_latex.ts -t equipment_everything_table',
  },
  {
    name: 'modules.tex',
    rust: 'cargo run --bin modules_chapter',
    ts: 'npx tsx src/scripts/generate_latex.ts -t modules',
  },
];

const UNCOMMON_CLASSES = [
  'automaton',
  'dragon',
  'dryad',
  'harpy',
  'incarnation',
  'naiad',
  'oozeborn',
  'troll',
  'treant',
  'vampire',
];

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function runCommand(cmd: string, cwd: string): string {
  console.log(`Running: ${cmd} in ${cwd}`);
  try {
    return execSync(cmd, { cwd, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch (e: any) {
    console.error(`Command failed: ${cmd}\n${e.stderr || e.message}`);
    return '';
  }
}

function main() {
  ensureDir(RUST_GEN_DIR);
  ensureDir(TS_GEN_DIR);

  console.log('Building Rust project...');
  runCommand('cargo build', RUST_DIR);

  const results: { name: string; match: boolean }[] = [];

  for (const task of TASKS) {
    console.log(`\n--- Verifying ${task.name} ---`);
    const rustOutput = runCommand(task.rust, RUST_DIR);
    const tsOutput = runCommand(task.ts, TS_DIR);

    const rustPath = path.join(RUST_GEN_DIR, task.name);
    const tsPath = path.join(TS_GEN_DIR, task.name);

    fs.writeFileSync(rustPath, rustOutput);
    fs.writeFileSync(tsPath, tsOutput);

    const match = verify(rustPath, tsPath);
    results.push({ name: task.name, match });
  }

  // Handle uncommon species classes
  console.log('\n--- Verifying Uncommon Species Classes ---');
  // First clear existing files in core paths to avoid confusion
  const rustTargetDir = path.join(REPO_ROOT, 'comprehensive_codex/generated');
  const tsTargetDir = path.join(REPO_ROOT, 'comprehensive_codex/generated'); // They share the same for now

  // We need to move them after generation to our comparison dirs
  runCommand('cargo run --bin uncommon_species_classes', RUST_DIR);
  for (const cls of UNCOMMON_CLASSES) {
    const filename = `${cls}.tex`;
    const src = path.join(rustTargetDir, filename);
    const dest = path.join(RUST_GEN_DIR, filename);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
    }
  }

  runCommand('npx tsx src/scripts/generate_uncommon_species_classes.ts', TS_DIR);
  for (const cls of UNCOMMON_CLASSES) {
    const filename = `${cls}.tex`;
    const src = path.join(tsTargetDir, filename);
    const dest = path.join(TS_GEN_DIR, filename);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
    }
  }

  for (const cls of UNCOMMON_CLASSES) {
    const filename = `${cls}.tex`;
    const rustPath = path.join(RUST_GEN_DIR, filename);
    const tsPath = path.join(TS_GEN_DIR, filename);

    if (fs.existsSync(rustPath) && fs.existsSync(tsPath)) {
      const match = verify(rustPath, tsPath);
      results.push({ name: filename, match });
    } else {
      console.error(
        `Missing files for ${cls}: Rust=${fs.existsSync(rustPath)}, TS=${fs.existsSync(tsPath)}`,
      );
      results.push({ name: filename, match: false });
    }
  }

  console.log('\n--- Final Verification Summary ---');
  const mismatches = results.filter((r) => !r.match);
  if (mismatches.length === 0) {
    console.log('🎉 ALL FILES MATCH!');
  } else {
    console.log(`❌ ${mismatches.length} mismatches found:`);
    for (const m of mismatches) {
      console.log(`  - ${m.name}`);
    }
  }

  // Generate Report
  const reportPath = path.join(REPO_ROOT, 'migration_verification_report.md');
  const reportContent = `
# Final Migration Verification Report

**Date:** ${new Date().toISOString()}

## Summary
- Total Files Verified: ${results.length}
- Matches: ${results.length - mismatches.length}
- Mismatches: ${mismatches.length}

## Detailed Results
| File | Status |
| :--- | :--- |
${results.map((r) => `| ${r.name} | ${r.match ? '✅ MATCH' : '❌ DISCREPANCY'} |`).join('\n')}

${
  mismatches.length > 0
    ? `
## Discrepancies
Please check the console output for detailed diffs of the discrepancies.
`
    : ''
}
`;
  fs.writeFileSync(reportPath, reportContent);
  console.log(`\nReport written to: ${reportPath}`);
}

main();
