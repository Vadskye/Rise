import t from 'tap';
import { Grimoire } from '@src/monsters/grimoire';
import { addAberrations } from './aberrations';

t.test('can create an aboleth', (t) => {
  const grimoire = new Grimoire();
  addAberrations(grimoire);

  grimoire.getMonster("aboleth", (aboleth) => {
    aboleth.getProperties(["awareness", "hit_points", "level", "name", "perception"], (p) => {
      t.match(p, {
        awareness: 13,
        hit_points: 159,
        level: 12,
        name: "aboleth",
        perception: 4,
      });
      t.end();
    });
  });
});
