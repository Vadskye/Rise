import { DicePool } from './dice_pool';
import { test } from 'tap';

test('DicePool.toString', (t) => {
  t.test('simple dice', (t) => {
    t.equal(DicePool.xdy(1, 6).toString(), '1d6');
    t.equal(DicePool.xdy(2, 8).toString(), '2d8');
    t.equal(DicePool.xdyPlus(1, 10, 5).toString(), '1d10+5');
    t.end();
  });

  t.test('multiple dice sizes', (t) => {
    const pool = DicePool.xdy(1, 4).addDice([{ size: 6 }]);
    t.equal(pool.toString(), '1d4+1d6');
    t.end();
  });

  t.test('flat modifiers', (t) => {
    t.equal(DicePool.xdy(1, 6).addModifier(2).toString(), '1d6+2');
    t.equal(DicePool.xdy(1, 6).addModifier(-2).toString(), '1d6-2');
    t.equal(new DicePool([], 5).toString(), '5');
    t.equal(new DicePool([], -5).toString(), '-5');
    t.end();
  });

  t.test('multiplier', (t) => {
    const pool = DicePool.xdy(1, 6).addModifier(2).multiply(2);
    t.equal(pool.toString(), '2d6+4');

    const poolNeg = DicePool.xdy(1, 6).addModifier(-1).multiply(2);
    t.equal(poolNeg.toString(), '2d6-2');
    t.end();
  });

  t.test('weak', (t) => {
    const pool = new DicePool([{ size: 6 }], 4, false, 1, true);
    // Dice are not halved in non-maximized string, but modifier is.
    // 4 * 0.5 = 2.
    t.equal(pool.toString(), '1d6+2');
    t.end();
  });

  t.test('maximized', (t) => {
    t.equal(new DicePool([{ size: 6 }], 2, true).toString(), '8');
    t.equal(new DicePool([{ size: 6 }], 2, true, 2).toString(), '16');
    t.end();
  });

  t.test('maximized with weak', (t) => {
    const pool = new DicePool([{ size: 6 }], 2, true, 1, true);
    // 6 (dice) + 1 (half of 2) = 7
    t.equal(pool.toString(), '7');
    t.end();
  });

  t.test('complex negative modifiers', (t) => {
    // -2 * 2 = -4
    const pool = new DicePool([{ size: 6 }], -2, false, 2);
    t.equal(pool.toString(), '2d6-4');

    // Multiple dice types with negative modifier
    const pool2 = new DicePool([{ size: 4 }, { size: 6 }], -1, false, 1);
    t.equal(pool2.toString(), '1d4+1d6-1');

    // Negative multiplier and negative modifier
    // -1 * -2 = 2
    const pool3 = new DicePool([{ size: 6 }], -2, false, -1);
    t.equal(pool3.toString(), '-1d6+2');
    t.end();
  });

  t.test('zero cases', (t) => {
    t.equal(new DicePool([], 0).toString(), '0');
    t.equal(new DicePool([{ size: 6 }], 0, false, 0).toString(), '0');
    t.end();
  });

  t.end();
});
