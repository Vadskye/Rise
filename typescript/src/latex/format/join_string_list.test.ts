import t from 'tap';
import { joinStringList } from './join_string_list';

t.test('joinStringList', (t) => {
  t.equal(joinStringList([]), '');
  t.equal(joinStringList(['one']), 'one');
  t.equal(joinStringList(['one', 'two']), 'one and two');
  t.equal(joinStringList(['one', 'two', 'three']), 'one, two, and three');
  t.equal(joinStringList(['one', 'two'], 'or'), 'one or two');
  t.equal(joinStringList(['one', 'two', 'three'], 'or'), 'one, two, or three');
  t.end();
});
