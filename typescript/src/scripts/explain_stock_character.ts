import { StockCharacters } from '@src/character_sheet/stock_characters';
import { Creature } from '@src/character_sheet/creature';
import { setCurrentCharacterSheet } from '@src/character_sheet/current_character_sheet';
import cli from 'commander';

const ATTRIBUTE_NAMES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'perception',
  'willpower',
] as const;

export function explainStockCharacter(creature: Creature) {
  const sheet = creature['sheet'];

  console.log('='.repeat(80));
  console.log(
    ` Stock Character: ${creature.name} (Level ${creature.level} ${creature.base_class})`,
  );
  console.log('='.repeat(80));

  console.log('\n--- Core ---');
  console.log(`  Monster: ${creature.is_monster}`);
  console.log(`  Elite: ${creature.elite}`);
  console.log(`  Monster Type: ${creature.monster_type}`);

  // Attributes
  console.log('\n--- Attributes ---');
  for (const attr of ATTRIBUTE_NAMES) {
    const atCreation = Number(sheet.getPropertyValue(`${attr}_at_creation`) || 0);
    const levelScaling = Number(sheet.getPropertyValue(`${attr}_level_scaling`) || 0);
    const permMod = Number(sheet.getPropertyValue(`${attr}_permanent_modifier`) || 0);
    const total = Number(sheet.getPropertyValue(attr) || 0);
    console.log(
      `  ${attr.padEnd(14)}: ${total.toString().padStart(2)} (Creation: ${atCreation}, Level Scaling: ${levelScaling}, Perm Mod: ${permMod})`,
    );
  }

  // Power
  console.log('\n--- Power ---');
  const magPower = creature.magical_power;
  const magExp = sheet.getPropertyValue('magical_power_explanation') || '(none)';
  const magPermMod = Number(sheet.getPropertyValue('magical_power_permanent_modifier') || 0);
  const magAttunedMod = Number(sheet.getPropertyValue('magical_power_attuned_modifier') || 0);
  console.log(`  Magical Power  : ${magPower}`);
  console.log(`    Explanation  : ${magExp}`);
  console.log(
    `    Formula parts: half level = ${Math.floor(creature.level / 2)}, willpower = ${creature.willpower}`,
  );
  console.log(`    Perm Modifier: ${magPermMod}`);
  console.log(`    Attuned Mod  : ${magAttunedMod}`);

  const munPower = creature.mundane_power;
  const munExp = sheet.getPropertyValue('mundane_power_explanation') || '(none)';
  const munPermMod = Number(sheet.getPropertyValue('mundane_power_permanent_modifier') || 0);
  console.log(`  Mundane Power  : ${munPower}`);
  console.log(`    Explanation  : ${munExp}`);
  console.log(
    `    Formula parts: half level = ${Math.floor(creature.level / 2)}, strength = ${creature.strength}`,
  );
  console.log(`    Perm Modifier: ${munPermMod}`);

  // Defenses
  console.log('\n--- Defenses ---');
  console.log(
    `  Armor Defense  : ${creature.armor_defense} [${creature.armor_defense_explanation}]`,
  );
  console.log(`  Brawn Defense  : ${creature.brawn} [${creature.brawn_explanation}]`);
  console.log(`  Fortitude      : ${creature.fortitude} [${creature.fortitude_explanation}]`);
  console.log(`  Mental Defense : ${creature.mental} [${creature.mental_explanation}]`);
  console.log(`  Reflex Defense : ${creature.reflex} [${creature.reflex_explanation}]`);

  // Repeating Custom Modifiers
  console.log('\n--- Repeating Modifier Rows Registered On Sheet ---');
  for (const modType of ['permanent', 'attuned', 'legacy', 'temporary'] as const) {
    const section = `repeating_${modType}modifiers`;
    const repSection = sheet.getRepeatingSection(section);
    const rowIds = repSection.getRowIds();
    console.log(`  [${section}] (${rowIds.length} row(s)):`);
    if (rowIds.length === 0) {
      console.log(`    (none)`);
    } else {
      for (const rowId of rowIds) {
        const name = repSection.getRowValue(rowId, 'name');
        const isActive = repSection.getRowValue(rowId, 'is_active');
        const effects: string[] = [];
        for (let i = 0; i < 3; i++) {
          const stat = repSection.getRowValue(rowId, `statistic${i}`);
          const val = repSection.getRowValue(rowId, `value${i}`);
          if (stat) {
            const num = Number(val);
            effects.push(`${stat}: ${num >= 0 ? '+' : ''}${val}`);
          }
        }
        const activeStr = isActive !== undefined ? ` (is_active: ${isActive})` : '';
        console.log(`    - Row ${rowId}: "${name}"${activeStr} -> [${effects.join(', ')}]`);
      }
    }
  }

  // Diagnostic
  console.log('\n--- Custom Modifier Status ---');
  if (
    magPermMod === 0 &&
    sheet.getRepeatingSection('repeating_permanentmodifiers').getRowIds().length > 0
  ) {
    console.log(
      `  [!] Repeating permanent modifiers are present in sheet rows, but magical_power_permanent_modifier is 0.`,
    );
    console.log(
      `      Cause: handleCustomModifiers() does not run on 'sheet:opened', and modifiers were added before event listeners attached.`,
    );
  } else {
    console.log(`  Custom modifiers are processed.`);
  }
  console.log('='.repeat(80) + '\n');
}

async function main() {
  cli
    .option('-c, --character <name>', 'Character name (e.g. "Sorcerer 4" or "Fighter 1")')
    .option('--class <string>', 'Filter by class (e.g. "sorcerer")', 'sorcerer')
    .option('-l, --level <number>', 'Filter by level (e.g. 4)', (val) => parseInt(val, 10))
    .parse(process.argv);

  const stock = new StockCharacters();
  stock.addAllCharacters();

  let targetName: string;
  if (cli.character) {
    targetName = cli.character;
  } else if (cli.level !== undefined) {
    const className = cli.class.charAt(0).toUpperCase() + cli.class.slice(1).toLowerCase();
    targetName = `${className} ${cli.level}`;
  } else {
    cli.help();
  }

  const creature = stock.getCharacter(targetName);
  if (!creature) {
    console.error(`Character "${targetName}" not found in stock characters.`);
    process.exit(1);
  }

  explainStockCharacter(creature);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
