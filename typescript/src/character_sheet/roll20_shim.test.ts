import t from 'tap';
import { on, getAttrs, setAttrs } from './roll20_shim';

t.test('can get and set properties', (t) => {
  const expected = {
    level: 3,
    name: "Warrior",
    stunned: true,
  };

  setAttrs(expected);
  getAttrs(["level", "name", "stunned"], (attrs) => {
    t.matchOnly(attrs, expected);
    t.end();
  });
});

t.test('can create listeners', (t) => {
  on(
    "change:level",
    () => t.end(),
  );
  setAttrs({ level: 5 });
});
