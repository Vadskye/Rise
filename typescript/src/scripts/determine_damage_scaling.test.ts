import t from 'tap';
import {
  getTargetRange,
  evaluateComparison,
  evaluateCreatureDamageScaling,
  runDamageScalingAnalysis,
} from './determine_damage_scaling';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import { clearAllCharacterSheets } from '@src/character_sheet/current_character_sheet';

t.test('getTargetRange', (t) => {
  t.test('should return correct ranges for Y=1, 2, 3', (t) => {
    t.same(getTargetRange(1), { minPct: -5.0, maxPct: 5.0 });
    t.same(getTargetRange(2), { minPct: 0.0, maxPct: 10.0 });
    t.same(getTargetRange(3), { minPct: 5.0, maxPct: 20.0 });
    t.end();
  });

  t.test('should return null for unsupported Y values', (t) => {
    t.equal(getTargetRange(0), null);
    t.equal(getTargetRange(4), null);
    t.equal(getTargetRange(-1), null);
    t.end();
  });

  t.end();
});

t.test('evaluateComparison', (t) => {
  t.test('should return null if X - Y < 0', (t) => {
    const result = evaluateComparison(1, 'Test Sorcerer', 'sorcerer', 0, 1, 4);
    t.equal(result, null);
    t.end();
  });

  t.test('should calculate valid comparison for X=1, Y=1 (Rank 0 spell)', (t) => {
    const result = evaluateComparison(1, 'Sorcerer 1', 'sorcerer', 1, 1, 4);
    t.ok(result);
    t.equal(result?.rankX, 1);
    t.equal(result?.rankY, 0);
    t.equal(result?.y, 1);
    t.equal(result?.level, 1);
    t.equal(typeof result?.avgX, 'number');
    t.equal(typeof result?.avgXY, 'number');
    t.end();
  });

  t.test('should detect inversion outlier if lower rank deals more damage', (t) => {
    // Level 10 sorcerer (Rank 4, Power 9) vs Rank 3 spell with +1 excess rank
    const result = evaluateComparison(10, 'Sorcerer 10', 'sorcerer', 4, 1, 9);
    t.ok(result);
    t.equal(result?.isOutlier, true);
    t.equal(result?.status, 'OUTLIER (INVERTED)');
    t.ok((result?.pctDiff ?? 0) < -5.0);
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
      // Rank 3 has Y=1 (R2), Y=2 (R1), Y=3 (R0) -> 3 comparisons
      t.equal(results.length, 3);
      t.equal(results[0].rankY, 2);
      t.equal(results[1].rankY, 1);
      t.equal(results[2].rankY, 0);
    }
    t.end();
  });

  t.end();
});

t.test('runDamageScalingAnalysis', (t) => {
  t.beforeEach(() => {
    clearAllCharacterSheets();
  });

  t.test('should run analysis for all 21 levels of stock Sorcerer', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();

    const comparisons = runDamageScalingAnalysis(stock, { className: 'sorcerer' });
    t.ok(comparisons.length > 0);

    // Should include levels 1 to 21
    const levels = new Set(comparisons.map((c) => c.level));
    for (let lvl = 1; lvl <= 21; lvl++) {
      t.ok(levels.has(lvl), `Missing level ${lvl}`);
    }

    t.end();
  });

  t.test('should support DRL low-power scaling analysis', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();

    const comparisons = runDamageScalingAnalysis(stock, { className: 'sorcerer', drl: true });
    t.ok(comparisons.length > 0);
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
