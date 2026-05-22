import { StockCharacters } from '@src/character_sheet/stock_characters';
import { Grimoire } from '@src/monsters/grimoire';
import {
  CombatScenario,
  createStandardAdventuringParty,
  createTeam,
} from '@src/combat/combat_scenario';
import { Creature } from '@src/character_sheet/creature';
import cli from 'commander';

async function main({ verbose = false }: { verbose?: boolean } = {}) {
  const stock = new StockCharacters();
  stock.addAllCharacters();

  const grimoire = new Grimoire();
  grimoire.addAllMonsters();

  const levels = [2, 5, 8, 11, 14, 17, 20];

  for (const level of levels) {
    console.log(`\n=========================================`);
    console.log(`Level ${level} Benchmark`);
    console.log(`=========================================`);

    const partyTeam = createStandardAdventuringParty(level);

    // Find Monsters
    const monsterNames = grimoire.getMonsterNames();
    let nonEliteMonsterName: string | null = null;
    let eliteMonsterName: string | null = null;

    for (const name of monsterNames) {
      const monster = grimoire.getMonster(name);
      if (!monster) continue;

      if (monster.level === level) {
        if (monster.elite && !eliteMonsterName) {
          eliteMonsterName = name;
        } else if (!monster.elite && !nonEliteMonsterName) {
          nonEliteMonsterName = name;
        }
      }

      if (nonEliteMonsterName && eliteMonsterName) {
        break;
      }
    }

    // Run Non-Elite Combat
    if (nonEliteMonsterName) {
      console.log(`\n--- Group Combat: Party vs 4x ${nonEliteMonsterName} ---`);
      const enemies: Creature[] = [];
      for (let i = 0; i < 4; i++) {
        enemies.push(grimoire.getMonster(nonEliteMonsterName)!);
      }
      const enemyTeam = createTeam('Enemies', enemies);
      const scenario = new CombatScenario([partyTeam, enemyTeam]);
      const results = scenario.simulate(200, verbose);
      logResults(results);
    } else {
      console.warn(`Warning: No level ${level} non-elite monster found.`);
    }

    // Run Elite Combat
    if (eliteMonsterName) {
      console.log(`\n--- Elite Combat: Party vs 1x ${eliteMonsterName} ---`);
      const enemyTeam = createTeam('Elite Enemy', [grimoire.getMonster(eliteMonsterName)!]);
      const scenario = new CombatScenario([partyTeam, enemyTeam]);
      const results = scenario.simulate(200, verbose);
      logResults(results);
    } else {
      console.warn(`Warning: No level ${level} elite monster found.`);
    }
  }
}

function logResults(results: any) {
  console.log(`Average Turns: ${results.averageTurns.toFixed(2)}`);
  for (const teamName in results.winRates) {
    console.log(
      `${teamName} Win Rate: ${results.winRates[teamName].toFixed(2)}% | Avg HP Remaining: ${results.averageHpPercentRemaining[teamName].toFixed(2)}%`,
    );
    console.log(
      `  Action Hit Rate: ${results.actionHitRates[teamName].toFixed(2)}% | Target Hit Rate: ${results.targetHitRates[teamName].toFixed(2)}%`,
    );
  }
}

if (require.main === module) {
  cli.option('-v, --verbose', 'Enable verbose combat logging').parse(process.argv);

  main({ verbose: cli.verbose }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
