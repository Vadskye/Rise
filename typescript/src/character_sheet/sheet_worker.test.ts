import t from 'tap';
import { getAttrs, setAttrs } from './roll20_shim';
import { handleEverything } from './sheet_worker';

t.test("Changing level also changes armor defense", (t) => {
  handleEverything();
  setAttrs({
    level: 20,
  });
  getAttrs(["armor_defense"], ({ armor_defense }) => {
    t.equal(armor_defense, 10);
    t.end();
  });
});
