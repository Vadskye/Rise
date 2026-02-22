import t from 'tap';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import { clearAllCharacterSheets } from '@src/character_sheet/current_character_sheet';
import {
  loadAllMonsters,
  getMonster,
  createTeam,
  createScenario,
} from '@src/combat/combat_scenario';

// Pre-load monsters for combat smoke tests
loadAllMonsters();

t.beforeEach(() => {
  clearAllCharacterSheets();
});

t.test('StockCharacters', (t) => {
  const stock = new StockCharacters();
  stock.addAllCharacters();
  const names = stock.getCharacterNames();

  t.test('load all characters', (t) => {
    t.ok(names.length > 0, 'Should have some stock characters');

    for (const name of names) {
      const char = stock.getCharacter(name);
      t.ok(char, `Character ${name} should exist`);
      if (char) {
        t.equal(char.level, 1, `${name} should be level 1`);
        t.ok(char.hit_points > 0, `${name} should have hit points`);
      }
    }
    t.test('automated armor selection', (t) => {
      t.equal(
        stock.getCharacter('Fighter')?.body_armor_name,
        'breastplate',
        'Fighter should have breastplate',
      );
      t.equal(stock.getCharacter('Cleric')?.body_armor_name, 'scale', 'Cleric should have scale');
      t.equal(
        stock.getCharacter('Druid')?.body_armor_name,
        'buff leather',
        'Druid should have buff leather',
      );
      t.equal(
        stock.getCharacter('Barbarian')?.body_armor_name,
        'scale',
        'Barbarian should have scale',
      );
      t.equal(
        stock.getCharacter('Monk')?.body_armor_name,
        'buff leather',
        'Monk should have buff leather',
      );
      t.equal(
        stock.getCharacter('Paladin')?.body_armor_name,
        'breastplate',
        'Paladin should have breastplate',
      );
      t.notOk(stock.getCharacter('Wizard')?.body_armor_name, 'Wizard should have no armor');
      t.notOk(stock.getCharacter('Sorcerer')?.body_armor_name, 'Sorcerer should have no armor');
      t.end();
    });

    t.end();
  });

  for (const name of names) {
    t.test(`combat smoke test: ${name}`, (t) => {
      // Need to reload characters for each test because beforeEach clears the sheets
      const localStock = new StockCharacters();
      localStock.addAllCharacters();
      const char = localStock.getCharacter(name);

      t.ok(char, `${name} should exist`);
      if (char) {
        const trainingTarget = getMonster('Giant Wasp');

        const charTeam = createTeam(name, [char]);
        const opponentTeam = createTeam('Opponent Team', [trainingTarget]);

        const scenario = createScenario([charTeam, opponentTeam]);
        // Just 10 iterations for a smoke test
        const result = scenario.simulate(10);

        t.ok(result.averageRounds > 0, 'Simulation should complete some rounds');
        t.ok((result.winRates['Character Team'] ?? 0) >= 0, 'Win rate should be a valid number');
      }
      t.end();
    });
  }

  t.end();
});
