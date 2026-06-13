import { StockCharacters } from '../character_sheet/stock_characters';
import { CombatScenario, cloneMonster, loadAllMonsters } from '../combat/combat_scenario';
import { Creature } from '../character_sheet/creature';
import cli from 'commander';

async function main({
  team1,
  team2,
  iterations,
  verbose,
}: {
  team1: string;
  team2: string;
  iterations: number;
  verbose: boolean;
}) {
  const stock = new StockCharacters();
  stock.addAllCharacters();
  loadAllMonsters();

  const c1 = resolveCreature(team1, stock);
  const c2 = resolveCreature(team2, stock);

  console.log(`Simulating fight between ${team1} and ${team2} for ${iterations} iterations...\n`);

  const scenario = new CombatScenario([
    { name: 'Team 1', members: [c1] },
    { name: 'Team 2', members: [c2] },
  ]);

  const result = scenario.simulate(iterations, verbose);

  console.log('--- Results ---');
  console.log(`Average Turns: ${result.averageTurns.toFixed(2)}`);
  for (const name in result.winRates) {
    console.log(
      `${name} Win Rate: ${result.winRates[name].toFixed(2)}% | Avg HP Remaining: ${result.averageHpPercentRemaining[name].toFixed(2)}% | Hit Rate: ${result.averageHitRates[name].toFixed(2)}%`,
    );
  }
}

function resolveCreature(name: string, stock: StockCharacters): Creature {
  let creature: Creature;
  if (stock.hasCharacter(name)) {
    creature = stock.getCharacter(name)!;
  } else {
    try {
      creature = cloneMonster(name);
      return creature; // Already cloned with unique name
    } catch (e) {
      throw new Error(`Could not find character or monster named "${name}"`);
    }
  }

  // Clone stock character to ensure unique ID
  const uniqueId = Math.random().toString(36).substring(7);
  return creature.clone(`${name}_${uniqueId}`);
}

if (require.main === module) {
  cli
    .option('--team1 <name>', 'Name of character or monster for Team 1')
    .option('--team2 <name>', 'Name of character or monster for Team 2')
    .option('--iterations <number>', 'Number of iterations', (val) => parseInt(val, 10), 1000)
    .option('--verbose', 'Enable verbose logging for the first fight')
    .parse(process.argv);

  const options = cli.opts();

  if (!options.team1 || !options.team2) {
    console.error('Error: Both --team1 and --team2 are required.');
    cli.outputHelp();
    process.exit(1);
  }

  main({
    team1: options.team1,
    team2: options.team2,
    iterations: options.iterations,
    verbose: !!options.verbose,
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
