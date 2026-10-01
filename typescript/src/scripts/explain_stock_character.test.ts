import t from 'tap';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import { explainStockCharacter } from '@src/scripts/explain_stock_character';
import { clearAllCharacterSheets } from '@src/character_sheet/current_character_sheet';

t.beforeEach(async () => {
  clearAllCharacterSheets();
});

t.test(
  'explainStockCharacter outputs core stats, accuracy, power, defenses, and attack damage for martial characters',
  async (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();

    const fighter = stock.getCharacter('Fighter 1')!;
    t.ok(fighter, 'Fighter 1 exists');

    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args: any[]) => {
      logs.push(args.join(' '));
    };

    try {
      explainStockCharacter(fighter);
    } finally {
      console.log = originalLog;
    }

    const output = logs.join('\n');

    // Verify headers
    t.match(output, /--- Core ---/);
    t.match(output, /--- Attributes ---/);
    t.match(output, /--- Power ---/);
    t.match(output, /--- Defenses ---/);
    t.match(output, /--- Core Accuracy & Rank ---/);
    t.match(output, /Base Accuracy\s+:\s+1/);
    t.match(output, /Character Rank\s+:\s+1/);
    t.match(output, /--- Attack Accuracy & Damage ---/);

    // Verify strike attacks explain damage
    t.match(output, /\* Broadsword \(maneuver, rank 1\)/);
    t.match(output, /Weapon\s+:\s+broadsword/);
    t.match(output, /Damage\s+:\s+1d6\+1 damage/);
    t.match(output, /Damage Details: Strike with broadsword/);
    t.match(output, /Dice\s+:\s+base 1d6/);
    t.match(output, /Power Added\s+:\s+\+1 \(mundane power 3 \* 0\.5 power mult\)/);

    // Verify maneuvers without explicit weapon inherit equipped weapon
    t.match(output, /\* Steady Slam \(maneuver, rank 1\)/);
    t.match(output, /\* Heartpiercer \(maneuver, rank 1\)/);
    t.match(output, /\* Desperate Pierce \(maneuver, rank 1\)/);
  },
);

t.test('explainStockCharacter outputs damage rank details for spellcasters', async (t) => {
  const stock = new StockCharacters();
  stock.addAllCharacters();

  const sorcerer = stock.getCharacter('Sorcerer 4')!;
  t.ok(sorcerer, 'Sorcerer 4 exists');

  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: any[]) => {
    logs.push(args.join(' '));
  };

  try {
    explainStockCharacter(sorcerer);
  } finally {
    console.log = originalLog;
  }

  const output = logs.join('\n');

  // Verify spell attacks explain damage
  t.match(output, /\* Armor Bolt Rank 2 \(spell, rank 2\)/);
  t.match(output, /Scaling\s+:\s+damage \(character rank: 2\)/);
  t.match(output, /Damage\s+:\s+1d10\+4 damage/);
  t.match(output, /Damage Details: Damage Rank 2/);
  t.match(output, /Base Dice\s+:\s+1d10/);
  t.match(output, /Power Added\s+:\s+\+4 \(magical power 8, \+1 per 2 power\)/);
});

t.test('explainStockCharacter handles characters without active abilities', async (t) => {
  const stock = new StockCharacters();
  stock.addAllCharacters();

  const dummy = stock.getCharacter('Target Dummy')!;
  t.ok(dummy, 'Target Dummy exists');

  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: any[]) => {
    logs.push(args.join(' '));
  };

  try {
    explainStockCharacter(dummy);
  } finally {
    console.log = originalLog;
  }

  const output = logs.join('\n');
  t.match(output, /--- Attack Accuracy & Damage ---/);
  t.match(output, /\(No active abilities\)/);
});
