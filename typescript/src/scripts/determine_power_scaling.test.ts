import t from 'tap';
import {
  evaluatePowerComparison,
  evaluateCreaturePowerScaling,
  runPowerScalingAnalysis,
} from './determine_power_scaling';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import { clearAllCharacterSheets } from '@src/character_sheet/current_character_sheet';

t.test('evaluatePowerComparison', (t) => {
  t.test('should calculate diff and pctDiff correctly for rank 3 sorcerer', (t) => {
    // Rank 3: DR = 1d8 + 7 = 4.5 + 7 = 11.5, DRL = 2d10 = 11.0
    // diff = 11.5 - 11.0 = 0.5, pctDiff = (0.5 / 11.0) * 100 = 4.545% (< +10% target min => Insufficient power scaling)
    const result = evaluatePowerComparison(7, 'Sorcerer 7', 'sorcerer', 3, 7);
    t.equal(result.level, 7);
    t.equal(result.rank, 3);
    t.equal(result.power, 7);
    t.equal(result.avgDR, 11.5);
    t.equal(result.avgDRL, 11);
    t.equal(result.diff, 0.5);
    t.equal(result.pctDiff.toFixed(2), '4.55');
    t.equal(result.isOutlier, true);
    t.equal(result.status, 'Insufficient power scaling');
    t.end();
  });

  t.end();
});

t.test('evaluateCreaturePowerScaling', (t) => {
  t.beforeEach(() => {
    clearAllCharacterSheets();
  });

  t.test('should evaluate power scaling for a stock creature', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();
    const sorc = stock.getCharacter('Sorcerer 7');
    t.ok(sorc);
    if (sorc) {
      const result = evaluateCreaturePowerScaling(sorc);
      t.equal(result.rank, 3);
      t.equal(result.level, 7);
      t.ok(result.power > 0);
    }
    t.end();
  });

  t.end();
});

t.test('runPowerScalingAnalysis', (t) => {
  t.beforeEach(() => {
    clearAllCharacterSheets();
  });

  t.test('should run power scaling analysis for sorcerer across levels', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();

    const comparisons = runPowerScalingAnalysis(stock, { className: 'sorcerer' });
    t.equal(comparisons.length, 21);
    t.equal(comparisons[0].level, 1);
    t.equal(comparisons[20].level, 21);
    t.end();
  });

  t.test('should filter by level when specified', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();

    const comparisons = runPowerScalingAnalysis(stock, { className: 'sorcerer', level: 10 });
    t.equal(comparisons.length, 1);
    t.equal(comparisons[0].level, 10);
    t.end();
  });

  t.test('should throw error for unknown class', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();

    t.throws(() => {
      runPowerScalingAnalysis(stock, { className: 'nonexistent_class' });
    });
    t.end();
  });

  t.end();
});
