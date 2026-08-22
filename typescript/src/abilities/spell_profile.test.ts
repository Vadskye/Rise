import t from 'tap';
import { parseArea } from './spell_profile';

t.test('parseArea', (t) => {
  t.test('line', (t) => {
    t.equal(parseArea('Make an attack vs. Brawn and Reflex against everything in a \\largearealong, 5 ft.\\ wide line from you.'), 'line');
    t.end();
  });

  t.end();
});
