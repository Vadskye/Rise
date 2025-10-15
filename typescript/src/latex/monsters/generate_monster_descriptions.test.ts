import t from 'tap';
import { generateMonsterDescriptions } from './generate_monster_descriptions';

t.test('generateMonsterDescriptions', (t) => {
  t.test('should contain Aboleth', (t) => {
    const result = generateMonsterDescriptions();
    t.matchStrict(result, /\\monsubsection\{Aboleth\}/);
    t.end();
  });

  t.test('should contain Army Deserter', (t) => {
    const result = generateMonsterDescriptions();
    t.matchStrict(result, /\\monsubsubsection\{Army Deserter\}/);
    t.end();
  });

  t.end();
});
