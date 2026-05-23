import t from 'tap';
import { getArchetypeRanks } from './apply_archetypes';

t.test('getArchetypeRanks', (t) => {
  t.same(getArchetypeRanks(1), [1, 0, 0], 'Level 1');
  t.same(getArchetypeRanks(2), [1, 1, 0], 'Level 2');
  t.same(getArchetypeRanks(3), [1, 1, 1], 'Level 3');
  t.same(getArchetypeRanks(4), [2, 1, 1], 'Level 4');
  t.same(getArchetypeRanks(5), [2, 2, 1], 'Level 5');
  t.same(getArchetypeRanks(6), [2, 2, 2], 'Level 6');
  t.same(getArchetypeRanks(7), [3, 2, 2], 'Level 7');
  t.same(getArchetypeRanks(21), [7, 7, 7], 'Level 21');
  t.end();
});
