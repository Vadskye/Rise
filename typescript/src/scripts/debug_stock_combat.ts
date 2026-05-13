import { StockCharacters } from '@src/character_sheet/stock_characters';
import { calculateDamage, getDefaultAttack } from '@src/combat/combat_turn';
import { calculateStrikeDamage } from '@src/latex/monsters/player_abilities';
import { parseAttackEffect } from '@src/combat/parse_attack_effect';
import { SimulatorReadyAttack } from '@src/abilities/active_abilities';
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

    const abilities = character.getActiveAbilities();
    const parsedAttacks = abilities
      .map((a) => parseAttackEffect(a, character))
      .filter((a): a is SimulatorReadyAttack => a !== null);

    if (parsedAttacks.length === 0) {
      const defaultAttack = getDefaultAttack(character);
      const damage = calculateDamage(defaultAttack);
      console.log(`Standard Damage (No Ability): ~${damage} (random roll)`);
    } else {
      for (const attack of parsedAttacks) {
        const samples: number[] = [];
        for (let i = 0; i < 10; i++) {
          samples.push(calculateDamage(attack));
        }
        console.log(`Generic accuracy: ${character.accuracy}`);
        console.log(`Ability: ${attack.hit}`);
        console.log(`Damage Samples: [${samples.join(', ')}]`);
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
