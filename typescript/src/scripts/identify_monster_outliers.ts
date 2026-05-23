import { StockCharacters } from '@src/character_sheet/stock_characters';
import { Grimoire } from '@src/monsters/grimoire';
import {
  CombatScenario,
  createStandardAdventuringParty,
  createTeam,
} from '@src/combat/combat_scenario';
import { Creature } from '@src/character_sheet/creature';
import cli from 'commander';
import * as fs from 'fs';
import * as path from 'path';

interface MonsterSimulationResult {
  source: string;
  name: string;
  level: number;
  isElite: boolean;
  clampedLevel: number;
  partyWinRate: number;
  partyAvgHpRemaining: number;
  enemyWinRate: number;
  enemyAvgHpRemaining: number;
  avgTurns: number;
  category: 'Dangerous' | 'Weak' | 'Balanced';
  actionHitRateParty: number;
  targetHitRateParty: number;
  actionHitRateEnemy: number;
  targetHitRateEnemy: number;
}

async function main(options: {
  iterations: number;
  level?: number;
  monster?: string;
  minWinRate: number;
  maxWinRate: number;
  output?: string;
  verbose: boolean;
}) {
  const { iterations, level, monster: monsterFilter, minWinRate, maxWinRate, output, verbose } = options;

  console.log(`Initializing Stock Characters and Grimoire...`);
  const stock = new StockCharacters();
  stock.addAllCharacters();

  const grimoire = new Grimoire();
  grimoire.addAllMonsters();

  console.log(`Gathering all monsters...`);
  const monstersToSimulate: { source: string; name: string; creature: Creature }[] = [];
  const processedNames = new Set<string>();

  // 1. Individual Monsters
  for (const name of grimoire.getMonsterNames()) {
    const creature = grimoire.getMonster(name);
    if (creature) {
      monstersToSimulate.push({
        source: 'Individual',
        name,
        creature,
      });
      processedNames.add(name.toLowerCase());
    }
  }

  // 2. Monsters from Groups
  for (const groupName of grimoire.getMonsterGroupNames()) {
    const group = grimoire.getMonsterGroup(groupName);
    if (group) {
      for (const m of group.monsters) {
        // Distinguish in-group monsters if they have the same name or need group-level context
        const monsterKey = `${groupName}.${m.name}`.toLowerCase();
        if (!processedNames.has(monsterKey)) {
          monstersToSimulate.push({
            source: `Group: ${groupName}`,
            name: m.name,
            creature: m,
          });
          processedNames.add(monsterKey);
        }
      }
    }
  }

  // Filter based on options
  let filtered = monstersToSimulate;
  if (level !== undefined) {
    filtered = filtered.filter((m) => m.creature.level === level);
  }
  if (monsterFilter) {
    const q = monsterFilter.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.source.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    console.log(`No monsters found matching the specified filters.`);
    return;
  }

  console.log(`Found ${filtered.length} monster(s) to simulate. Starting combat simulations...`);
  console.log(`Configuration: ${iterations} iterations per combat. Outlier thresholds: Dangerous < ${minWinRate}%, Weak > ${maxWinRate}%`);

  const results: MonsterSimulationResult[] = [];
  let count = 0;

  for (const entry of filtered) {
    count++;
    const creature = entry.creature;
    const mLevel = creature.level;
    const isElite = creature.elite || creature.monster_type === 'elite';

    // Clamp level to valid StockCharacters bounds [1, 21]
    const clampedLevel = Math.max(1, Math.min(21, mLevel));
    if (mLevel < 1 || mLevel > 21) {
      console.warn(`[Warning] ${entry.name} has level ${mLevel}. Clamping stock party to level ${clampedLevel}.`);
    }

    process.stdout.write(`[${count}/${filtered.length}] Simulating ${entry.name} (Level ${mLevel}${isElite ? ' Elite' : ''})... `);

    try {
      const partyTeam = {
        name: 'Standard Adventuring Party',
        members: [
          stock.getCharacter(`Cleric ${clampedLevel}`)!,
          stock.getCharacter(`Fighter ${clampedLevel}`)!,
          stock.getCharacter(`Rogue ${clampedLevel}`)!,
          stock.getCharacter(`Wizard ${clampedLevel}`)!,
        ],
      };
      const enemyTeamName = isElite ? 'Elite Enemy' : 'Enemies';

      // Spawn independent clones of the monster
      const enemies: Creature[] = [];
      if (isElite) {
        enemies.push(creature.clone(`${entry.name}_elite`));
      } else {
        for (let i = 0; i < 4; i++) {
          enemies.push(creature.clone(`${entry.name}_clone_${i}`));
        }
      }

      const enemyTeam = createTeam(enemyTeamName, enemies);
      const scenario = new CombatScenario([partyTeam, enemyTeam]);
      const sim = scenario.simulate(iterations, verbose);

      const partyWinRate = sim.winRates['Standard Adventuring Party'] || 0;
      const partyAvgHpRemaining = sim.averageHpPercentRemaining['Standard Adventuring Party'] || 0;
      const enemyWinRate = sim.winRates[enemyTeamName] || 0;
      const enemyAvgHpRemaining = sim.averageHpPercentRemaining[enemyTeamName] || 0;
      const avgTurns = sim.averageTurns;

      let category: 'Dangerous' | 'Weak' | 'Balanced' = 'Balanced';
      if (partyWinRate < minWinRate) {
        category = 'Dangerous';
      } else if (partyWinRate > maxWinRate && partyAvgHpRemaining > 85) {
        category = 'Weak';
      }

      results.push({
        source: entry.source,
        name: entry.name,
        level: mLevel,
        isElite,
        clampedLevel,
        partyWinRate,
        partyAvgHpRemaining,
        enemyWinRate,
        enemyAvgHpRemaining,
        avgTurns,
        category,
        actionHitRateParty: sim.actionHitRates['Standard Adventuring Party'] || 0,
        targetHitRateParty: sim.targetHitRates['Standard Adventuring Party'] || 0,
        actionHitRateEnemy: sim.actionHitRates[enemyTeamName] || 0,
        targetHitRateEnemy: sim.targetHitRates[enemyTeamName] || 0,
      });

      console.log(`Done. Party Win Rate: ${partyWinRate.toFixed(1)}% | Category: ${category}`);
    } catch (err: any) {
      console.log(`ERROR: ${err.message}`);
    }
  }

  // Filter outliers
  const dangerousOutliers = results
    .filter((r) => r.category === 'Dangerous')
    .sort((a, b) => a.partyWinRate - b.partyWinRate);

  const weakOutliers = results
    .filter((r) => r.category === 'Weak')
    .sort((a, b) => b.partyWinRate - a.partyWinRate || b.partyAvgHpRemaining - a.partyAvgHpRemaining);

  const balancedMonsters = results.filter((r) => r.category === 'Balanced');

  // Print results on console
  console.log(`\n======================================================================`);
  console.log(`SIMULATION SUMMARY`);
  console.log(`======================================================================`);
  console.log(`Total Monsters Simulated : ${results.length}`);
  console.log(`Too Dangerous Outliers   : ${dangerousOutliers.length} (${((dangerousOutliers.length / results.length) * 100).toFixed(1)}%)`);
  console.log(`Too Weak Outliers        : ${weakOutliers.length} (${((weakOutliers.length / results.length) * 100).toFixed(1)}%)`);
  console.log(`Balanced Monsters        : ${balancedMonsters.length} (${((balancedMonsters.length / results.length) * 100).toFixed(1)}%)`);
  console.log(`======================================================================`);

  if (dangerousOutliers.length > 0) {
    console.log(`\nTOO DANGEROUS OUTLIERS (Party Win Rate < ${minWinRate}%):`);
    printConsoleTable(dangerousOutliers);
  } else {
    console.log(`\nNo "Too Dangerous" outliers found.`);
  }

  if (weakOutliers.length > 0) {
    console.log(`\nTOO WEAK OUTLIERS (Party Win Rate > ${maxWinRate}%):`);
    printConsoleTable(weakOutliers);
  } else {
    console.log(`\nNo "Too Weak" outliers found.`);
  }

  // Generate Report if requested
  if (output) {
    const reportPath = path.resolve(process.cwd(), output);
    console.log(`\nWriting detailed Markdown report to: ${reportPath}`);
    const markdownContent = generateMarkdownReport(options, results, dangerousOutliers, weakOutliers);
    fs.writeFileSync(reportPath, markdownContent, 'utf-8');
  }
}

function printConsoleTable(list: MonsterSimulationResult[]) {
  const colWidths = {
    lvl: 5,
    elite: 6,
    name: 24,
    source: 24,
    win: 12,
    hp: 12,
    turns: 8,
  };

  const hr = `+${'-'.repeat(colWidths.lvl)}+${'-'.repeat(colWidths.elite)}+${'-'.repeat(colWidths.name)}+${'-'.repeat(colWidths.source)}+${'-'.repeat(colWidths.win)}+${'-'.repeat(colWidths.hp)}+${'-'.repeat(colWidths.turns)}+`;
  
  console.log(hr);
  console.log(
    `| ${'Lvl'.padEnd(colWidths.lvl - 2)} | ` +
    `${'Type'.padEnd(colWidths.elite - 2)} | ` +
    `${'Monster Name'.padEnd(colWidths.name - 2)} | ` +
    `${'Source / Group'.padEnd(colWidths.source - 2)} | ` +
    `${'Party Win %'.padEnd(colWidths.win - 2)} | ` +
    `${'Party HP%'.padEnd(colWidths.hp - 2)} | ` +
    `${'Turns'.padEnd(colWidths.turns - 2)} |`
  );
  console.log(hr);

  for (const r of list) {
    const eliteStr = r.isElite ? 'Elite' : 'Normal';
    console.log(
      `| ${r.level.toString().padEnd(colWidths.lvl - 2)} | ` +
      `${eliteStr.padEnd(colWidths.elite - 2)} | ` +
      `${r.name.slice(0, colWidths.name - 2).padEnd(colWidths.name - 2)} | ` +
      `${r.source.slice(0, colWidths.source - 2).padEnd(colWidths.source - 2)} | ` +
      `${r.partyWinRate.toFixed(1).padEnd(colWidths.win - 2)} | ` +
      `${r.partyAvgHpRemaining.toFixed(1).padEnd(colWidths.hp - 2)} | ` +
      `${r.avgTurns.toFixed(1).padEnd(colWidths.turns - 2)} |`
    );
  }
  console.log(hr);
}

function generateMarkdownReport(
  options: any,
  all: MonsterSimulationResult[],
  dangerous: MonsterSimulationResult[],
  weak: MonsterSimulationResult[]
): string {
  const dateStr = new Date().toLocaleString();
  let md = `# Rise Monster Power Level Simulation Report\n\n`;
  md += `*Generated on:* ${dateStr}\n\n`;
  md += `## Configuration & Metadata\n`;
  md += `- **Iterations per Combat:** ${options.iterations}\n`;
  md += `- **Dangerous Win Rate Threshold:** < ${options.minWinRate}%\n`;
  md += `- **Weak Win Rate Threshold:** > ${options.maxWinRate}%\n`;
  if (options.level !== undefined) {
    md += `- **Level Filter:** Level ${options.level}\n`;
  }
  if (options.monster) {
    md += `- **Name Filter:** "${options.monster}"\n`;
  }
  md += `\n`;

  md += `## Executive Summary\n`;
  md += `| Category | Count | Percentage |\n`;
  md += `| :--- | :---: | :---: |\n`;
  md += `| **Too Dangerous (Overtuned)** | ${dangerous.length} | ${((dangerous.length / all.length) * 100).toFixed(1)}% |\n`;
  md += `| **Too Weak (Undertuned)** | ${weak.length} | ${((weak.length / all.length) * 100).toFixed(1)}% |\n`;
  md += `| **Balanced / Within Thresholds** | ${all.length - dangerous.length - weak.length} | ${(((all.length - dangerous.length - weak.length) / all.length) * 100).toFixed(1)}% |\n`;
  md += `| **Total Simulated** | **${all.length}** | **100.0%** |\n\n`;

  // Too Dangerous Section
  md += `## Too Dangerous (Overtuned) Monsters\n`;
  if (dangerous.length > 0) {
    md += `These monsters achieved a high victory rate against a standard adventuring party of equivalent level, indicating their stats or abilities may be overtuned.\n\n`;
    md += `| Level | Type | Monster Name | Source / Group | Party Win Rate | Party Avg HP Remaining | Avg Turns | Hit Rate (Party / Enemy) |\n`;
    md += `| :---: | :---: | :--- | :--- | :---: | :---: | :---: | :---: |\n`;
    for (const r of dangerous) {
      md += `| ${r.level} | ${r.isElite ? 'Elite' : 'Normal'} | **${r.name}** | ${r.source} | ${r.partyWinRate.toFixed(1)}% | ${r.partyAvgHpRemaining.toFixed(1)}% | ${r.avgTurns.toFixed(1)} | ${r.actionHitRateParty.toFixed(1)}% / ${r.actionHitRateEnemy.toFixed(1)}% |\n`;
    }
  } else {
    md += `*No "Too Dangerous" outliers were detected using the current calibration.*\n`;
  }
  md += `\n`;

  // Too Weak Section
  md += `## Too Weak (Undertuned) Monsters\n`;
  if (weak.length > 0) {
    md += `These monsters are defeated very easily by standard adventuring parties, resulting in extremely high party win rates and very little damage taken by the party.\n\n`;
    md += `| Level | Type | Monster Name | Source / Group | Party Win Rate | Party Avg HP Remaining | Avg Turns | Hit Rate (Party / Enemy) |\n`;
    md += `| :---: | :---: | :--- | :--- | :---: | :---: | :---: | :---: |\n`;
    for (const r of weak) {
      md += `| ${r.level} | ${r.isElite ? 'Elite' : 'Normal'} | **${r.name}** | ${r.source} | ${r.partyWinRate.toFixed(1)}% | ${r.partyAvgHpRemaining.toFixed(1)}% | ${r.avgTurns.toFixed(1)} | ${r.actionHitRateParty.toFixed(1)}% / ${r.actionHitRateEnemy.toFixed(1)}% |\n`;
    }
  } else {
    md += `*No "Too Weak" outliers were detected using the current calibration.*\n`;
  }
  md += `\n`;

  // Complete breakdown
  md += `## Complete Simulation Results\n`;
  md += `<details>\n<summary>Click to view full results table for all ${all.length} monsters</summary>\n\n`;
  md += `| Level | Type | Monster Name | Source / Group | Party Win Rate | Party Avg HP Remaining | Avg Turns | Category |\n`;
  md += `| :---: | :---: | :--- | :--- | :---: | :---: | :---: | :---: |\n`;
  const sortedAll = [...all].sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
  for (const r of sortedAll) {
    md += `| ${r.level} | ${r.isElite ? 'Elite' : 'Normal'} | ${r.name} | ${r.source} | ${r.partyWinRate.toFixed(1)}% | ${r.partyAvgHpRemaining.toFixed(1)}% | ${r.avgTurns.toFixed(1)} | **${r.category}** |\n`;
  }
  md += `\n</details>\n`;

  return md;
}

if (require.main === module) {
  cli
    .option('-i, --iterations <number>', 'Number of iterations per monster', (val) => parseInt(val, 10), 100)
    .option('-l, --level <number>', 'Filter by monster level', (val) => parseInt(val, 10))
    .option('-m, --monster <string>', 'Filter by monster name or source (substring)')
    .option('--min-win-rate <number>', 'Threshold below which monster is too dangerous (default 60%)', (val) => parseFloat(val), 60)
    .option('--max-win-rate <number>', 'Threshold above which monster is too weak (default 98%)', (val) => parseFloat(val), 98)
    .option('-o, --output <path>', 'Path to write a detailed Markdown report')
    .option('-v, --verbose', 'Enable verbose combat logging')
    .parse(process.argv);

  main({
    iterations: cli.iterations,
    level: cli.level,
    monster: cli.monster,
    minWinRate: cli.minWinRate,
    maxWinRate: cli.maxWinRate,
    output: cli.output,
    verbose: Boolean(cli.verbose),
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
