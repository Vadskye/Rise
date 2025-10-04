import t from 'tap';
import { Grimoire } from '@src/monsters/grimoire';
import { addAberrations } from './aberrations';

t.test('aboleth', (t) => {
  const grimoire = new Grimoire();
  addAberrations(grimoire);
  const aboleth = grimoire.getMonster('Aboleth');

  t.test('has basic combat values', (t) => {
    const vals = aboleth.getPropertyValues([
      'awareness',
      'hit_points',
      'level',
      'name',
      'perception',
      'size',
      'speed',
    ]);
    t.match(vals, {
      awareness: 13,
      hit_points: 270,
      level: 12,
      name: 'Aboleth',
      perception: 4,
      size: 'huge',
      speed: 50,
    });
    t.end();
  });

  t.test('has movement speeds', (t) => {
    t.match(aboleth.getCustomMovementSpeeds(), ['Swim (normal)', 'Land (slow)']);
    t.end();
  });

  t.end();
});
