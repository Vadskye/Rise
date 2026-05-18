import t from 'tap';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import { getSpellByName } from '.';
import { nonsphereSpells } from './nonsphere_spells';

t.test('getSpellByName', (t) => {
  t.test('should work when loading all characters', (t) => {
    const stock = new StockCharacters();
    t.doesNotThrow(() => {
      stock.addAllCharacters();
    }, 'Should not throw when adding all characters');
    t.end();
  });

  t.test('should find nonsphere spells', (t) => {
    t.ok(nonsphereSpells.spells.length > 0, 'Should have some nonsphere spells');
    for (const spell of nonsphereSpells.spells) {
      t.doesNotThrow(() => {
        getSpellByName(spell.name);
      }, `Should find spell ${spell.name}`);
    }
    t.end();
  });

  t.end();
});
