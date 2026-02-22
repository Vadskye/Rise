import { StockCharacters } from '@src/character_sheet/stock_characters';
import { CombatScenario, createTeam } from '@src/combat/combat_scenario';
import { calculateStrikeDamage } from '@src/abilities/maneuver_parser';
import { Creature } from '@src/character_sheet/creature';
import cli from 'commander';

async function main({ character, level }: { character?: string; level?: number }) {
  const stock = new StockCharacters();
  stock.addAllCharacters();

  let characterNames = stock.getCharacterNames();

  if (character) {
    characterNames = characterNames.filter((name) =>
      name.toLowerCase().includes(character.toLowerCase()),
    );
  }

  console.log(`Found ${characterNames.length} stock characters matching criteria.\n`);

  for (const name of characterNames) {
    const character = stock.getCharacter(name);
    if (!character) continue;

    if (level !== undefined) {
      character.setProperties({ level });
    }

    console.log(`--- Character: ${name} ---`);
    console.log(`Level: ${character.level}`);
    console.log(`Mundane Power: ${character.mundane_power}`);
    console.log(`Magical Power: ${character.magical_power}`);

    const scenario = new CombatScenario([
      createTeam('Self', [character]),
      createTeam('Target', [stock.getCharacter('Target Dummy')!]),
    ]);

    const abilities = character.getActiveAbilities().filter((a) => a.weapon);

    if (abilities.length === 0) {
      const damage = scenario.calculateDamage(character);
      console.log(`Standard Damage (No Ability): ~${damage} (random roll)`);
    } else {
      for (const ability of abilities) {
        const samples: number[] = [];
        for (let i = 0; i < 10; i++) {
          samples.push(scenario.calculateDamage(character, ability));
        }
        console.log(`Generic accuracy: ${character.accuracy}`);
        console.log(`Ability: ${ability.name}`);
        console.log(`Weapon: ${ability.weapon}`);
        console.log(`Damage Samples: [${samples.join(', ')}]`);
        console.log(`Strike damage: ${calculateStrikeDamage(character, ability, false)}`);
        console.log(`Average: ${(samples.reduce((a, b) => a + b, 0) / samples.length).toFixed(1)}`);
      }
    }
    console.log('');
  }
}

if (require.main === module) {
  cli
    .option('-l, --level <number>', 'Character level', (val) => parseInt(val, 10))
    .option('-c, --character <name>', 'Character name')
    .parse(process.argv);

  main({ character: cli.character, level: cli.level }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
