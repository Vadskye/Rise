import t from 'tap';
import {
  evaluateComparison,
  evaluateCreatureDamageScaling,
  runDamageScalingAnalysis,
} from './determine_damage_scaling';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import { clearAllCharacterSheets } from '@src/character_sheet/current_character_sheet';

t.test('evaluateComparison', (t) => {
  t.test('should return null if X - Y <= 0', (t) => {
    const result = evaluateComparison(1, 'Test Sorcerer', 'sorcerer', 0, 1, 4);
    t.equal(result, null);
    t.end();
  });

  t.end();
});

t.test('evaluateCreatureDamageScaling', (t) => {
  t.beforeEach(() => {
    clearAllCharacterSheets();
  });

  t.test('should evaluate all valid Y values for a creature', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();
    const sorc = stock.getCharacter('Sorcerer 7');
    t.ok(sorc);
    if (sorc) {
      const results = evaluateCreatureDamageScaling(sorc);
      // Rank 3 has Y=1 (R2), Y=2 (R1)
      t.equal(results.length, 2);
      t.equal(results[0].rankY, 2);
      t.equal(results[1].rankY, 1);
    }
    t.end();
  });

  t.end();
});

t.test('runDamageScalingAnalysis', (t) => {
  t.beforeEach(() => {
    clearAllCharacterSheets();
  });

  t.test('should support DRL low-power scaling analysis', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();

    const comparisons = runDamageScalingAnalysis(stock, { className: 'sorcerer', drl: true });
    t.ok(comparisons.length > 0);
    t.end();
  });

  t.test('should sort comparisons by Alt Rank when sortByAltRank is true', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();

    const comparisons = runDamageScalingAnalysis(stock, {
      className: 'sorcerer',
      sortByAltRank: true,
    });
    t.ok(comparisons.length > 0);

    for (let i = 1; i < comparisons.length; i++) {
      const prev = comparisons[i - 1];
      const curr = comparisons[i];
      if (prev.rankY === curr.rankY) {
        t.ok(
          prev.level <= curr.level,
          `Expected prev level (${prev.level}) <= curr level (${curr.level}) when rankY matches`,
        );
      } else {
        t.ok(
          prev.rankY < curr.rankY,
          `Expected prev rankY (${prev.rankY}) < curr rankY (${curr.rankY})`,
        );
      }
    }
    t.end();
  });

  t.test('should throw error for unknown class', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();

    t.throws(() => {
      runDamageScalingAnalysis(stock, { className: 'nonexistent_class' });
    });
    t.end();
  });

  t.end();
});
