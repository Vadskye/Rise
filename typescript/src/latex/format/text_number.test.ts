import t from 'tap';
import { textNumber } from './text_number';

t.test('textNumber', (t) => {
  t.equal(textNumber(0), 'zero');
  t.equal(textNumber(1), 'one');
  t.equal(textNumber(5), 'five');
  t.equal(textNumber(10), 'ten');
  t.throws(() => textNumber(11), /Invalid number/);
  t.throws(() => textNumber(-1), /Invalid number/);
  t.end();
});
