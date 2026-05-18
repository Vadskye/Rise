import { StockCharacters } from '@src/character_sheet/stock_characters';
import { Grimoire } from '@src/monsters/grimoire';
import { CombatScenario, createTeam } from '@src/combat/combat_scenario';
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

    // Get Party
    const partyNames = [
      `Fighter ${level}`,
      `Rogue ${level}`,
      `Cleric ${level}`,
      `Wizard ${level}`,
    ];

    const partyMembers: Creature[] = [];
    for (const name of partyNames) {
      const char = stock.getCharacter(name);
      if (char) {
        // Clone to avoid mutation and ensure unique sheet names
        const uniqueId = Math.random().toString(36).substring(7);
        partyMembers.push(char.clone(`${name}_Party_${uniqueId}`));
      } else {
        console.warn(`Warning: Stock character ${name} not found.`);
      }
    }

    if (partyMembers.length === 0) {
      console.error(`Error: No party members found for level ${level}. Skipping.`);
      continue;
    }

    console.log(`Party HP:`);
    for (const member of partyMembers) {
      console.log(`  ${member.name}: ${member.hit_points} HP`);
    }

    const partyTeam = createTeam('Party', partyMembers);

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
        const baseMonster = grimoire.getMonster(nonEliteMonsterName);
        if (baseMonster) {
          const uniqueId = Math.random().toString(36).substring(7);
          enemies.push(baseMonster.clone(`${nonEliteMonsterName}_${i}_${uniqueId}`));
        }
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
      const baseMonster = grimoire.getMonster(eliteMonsterName);
      if (baseMonster) {
        const uniqueId = Math.random().toString(36).substring(7);
        const enemyTeam = createTeam('Elite Enemy', [baseMonster.clone(`${eliteMonsterName}_Elite_${uniqueId}`)]);
        const scenario = new CombatScenario([partyTeam, enemyTeam]);
        const results = scenario.simulate(200, verbose);
        logResults(results);
      }
    } else {
      console.warn(`Warning: No level ${level} elite monster found.`);
    }
  }
}

function logResults(results: any) {
  console.log(`Average Turns: ${results.averageTurns.toFixed(2)}`);
  for (const teamName in results.winRates) {
    console.log(
      `${teamName} Win Rate: ${results.winRates[teamName].toFixed(2)}% | Avg HP Remaining: ${results.averageHpPercentRemaining[teamName].toFixed(2)}% | Hit Rate: ${results.averageHitRates[teamName].toFixed(2)}%`
    );
  }
}

if (require.main === module) {
  cli
    .option('-v, --verbose', 'Enable verbose combat logging')
    .parse(process.argv);

  main({ verbose: cli.verbose }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
