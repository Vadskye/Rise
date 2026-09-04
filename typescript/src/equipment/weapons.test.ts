import { test } from 'tap';
import {
  addDiceIncrement,
  addDiceIncrementString,
  addDiceIncrementToPool,
  DICE_INCREMENT_ORDER,
} from './weapons';
import { DicePool } from '../core_mechanics/dice_pool';

test('DICE_INCREMENT_ORDER', (t) => {
  t.equal(DICE_INCREMENT_ORDER.length, 12);
  t.equal(DICE_INCREMENT_ORDER[0], '1d2');
  t.equal(DICE_INCREMENT_ORDER[11], '4d10');
  t.end();
});

test('addDiceIncrement', (t) => {
  t.test('increments by +1 along the ladder', (t) => {
    t.same(addDiceIncrement({ count: 1, size: 2 }, 1), { count: 1, size: 3 });
    t.same(addDiceIncrement({ count: 1, size: 3 }, 1), { count: 1, size: 4 });
    t.same(addDiceIncrement({ count: 1, size: 4 }, 1), { count: 1, size: 6 });
    t.same(addDiceIncrement({ count: 1, size: 6 }, 1), { count: 1, size: 8 });
    t.same(addDiceIncrement({ count: 1, size: 8 }, 1), { count: 1, size: 10 });
    t.same(addDiceIncrement({ count: 1, size: 10 }, 1), { count: 2, size: 6 });
    t.same(addDiceIncrement({ count: 2, size: 6 }, 1), { count: 2, size: 8 });
    t.same(addDiceIncrement({ count: 2, size: 8 }, 1), { count: 2, size: 10 });
    t.same(addDiceIncrement({ count: 2, size: 10 }, 1), { count: 4, size: 6 });
    t.same(addDiceIncrement({ count: 4, size: 6 }, 1), { count: 4, size: 8 });
    t.same(addDiceIncrement({ count: 4, size: 8 }, 1), { count: 4, size: 10 });
    t.end();
  });

  t.test('decrements by -1 along the ladder', (t) => {
    t.same(addDiceIncrement({ count: 2, size: 6 }, -1), { count: 1, size: 10 });
    t.same(addDiceIncrement({ count: 1, size: 10 }, -1), { count: 1, size: 8 });
    t.same(addDiceIncrement({ count: 1, size: 8 }, -1), { count: 1, size: 6 });
    t.same(addDiceIncrement({ count: 4, size: 10 }, -1), { count: 4, size: 8 });
    t.end();
  });

  t.test('multiple steps', (t) => {
    t.same(addDiceIncrement({ count: 1, size: 8 }, 2), { count: 2, size: 6 });
    t.same(addDiceIncrement({ count: 1, size: 8 }, 3), { count: 2, size: 8 });
    t.same(addDiceIncrement({ count: 2, size: 8 }, -2), { count: 1, size: 10 });
    t.same(addDiceIncrement({ count: 1, size: 6 }, 0), { count: 1, size: 6 });
    t.end();
  });

  t.test('clamping on boundaries', (t) => {
    // Upper bound clamp
    t.same(addDiceIncrement({ count: 4, size: 10 }, 1), { count: 4, size: 10 });
    t.same(addDiceIncrement({ count: 4, size: 8 }, 5), { count: 4, size: 10 });

    // Lower bound clamp
    t.same(addDiceIncrement({ count: 1, size: 2 }, -1), { count: 1, size: 2 });
    t.same(addDiceIncrement({ count: 1, size: 6 }, -10), { count: 1, size: 2 });
    t.end();
  });

  t.test('throws on unknown dice pool', (t) => {
    t.throws(() => addDiceIncrement({ count: 3, size: 6 }, 1), /Match not found in progression/);
    t.throws(() => addDiceIncrement({ count: 1, size: 12 }, 1), /Match not found in progression/);
    t.end();
  });

  t.end();
});

test('addDiceIncrementString', (t) => {
  t.equal(addDiceIncrementString('1d8', 1), '1d10');
  t.equal(addDiceIncrementString('1d8', 2), '2d6');
  t.equal(addDiceIncrementString('1d8', -1), '1d6');
  t.equal(addDiceIncrementString('1d8+2', 1), '1d10+2');
  t.equal(addDiceIncrementString('2d6', 0), '2d6');
  t.equal(addDiceIncrementString('invalid', 1), 'invalid');
  t.end();
});

test('addDiceIncrementToPool', (t) => {
  const d8Pool = DicePool.d8().addModifier(3);
  const incremented = addDiceIncrementToPool(d8Pool, 1);
  t.equal(incremented.toString(), '1d10+3');

  const twoSteps = addDiceIncrementToPool(d8Pool, 2);
  t.equal(twoSteps.toString(), '2d6+3');
  t.end();
});
