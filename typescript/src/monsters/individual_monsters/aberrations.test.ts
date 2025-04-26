import t from 'tap';
import { Grimoire } from '@src/monsters/grimoire';
import { addAberrations } from './aberrations';

t.test('can create an aboleth', (t) => {
  const grimoire = new Grimoire();
  addAberrations(grimoire);

  const aboleth = grimoire.getMonster('aboleth');
  const vals = aboleth.getPropertyValues([
    'awareness',
    'hit_points',
    'level',
    'name',
    'perception',
  ]);
  t.match(vals, {
    awareness: 13,
    hit_points: 159,
    level: 12,
    name: 'aboleth',
    perception: 4,
  });
  t.end();
});
