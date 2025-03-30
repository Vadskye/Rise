import t from 'tap';
import { Grimoire } from '@src/monsters/grimoire';
import { addAberrations } from './aberrations';

t.test('can create an aboleth', (t) => {
  const grimoire = new Grimoire();
  addAberrations(grimoire);

  grimoire.getMonster("aboleth", (aboleth) => {
    aboleth.getProperties(["awareness", "hit_points", "level", "name"], (p) => {
      t.match(p, {
        awareness: 5,
        hit_points: 105,
        level: 12,
        name: "aboleth",
      });
      t.end();
    });
  });
});
