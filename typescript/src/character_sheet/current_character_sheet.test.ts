import t from 'tap';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { CharacterSheet } from '@src/character_sheet/character_sheet';
import { getCurrentCharacterSheet, setCurrentCharacterSheet } from './current_character_sheet';

t.test('can access one sheet while a different sheet is active', (t) => {
  setCurrentCharacterSheet('apple');
  const appleSheet: CharacterSheet = getCurrentCharacterSheet();
  appleSheet.setProperties({
    level: 1,
    name: 'apple',
  });

  setCurrentCharacterSheet('banana');
  const bananaSheet = getCurrentCharacterSheet();
  bananaSheet.setProperties({
    level: 2,
    name: 'banana',
  });

  appleSheet.getAttrs(['level', 'name'], (attrs) => {
    t.equal(attrs.level, 1);
    t.equal(attrs.name, 'apple');
    t.end();
  });
});

t.test('triggers work for inactive sheets', (t) => {
  setCurrentCharacterSheet('apple');
  handleEverything();
  const appleSheet: CharacterSheet = getCurrentCharacterSheet();
  appleSheet.setProperties({
    level: 1,
    name: 'apple',
  });

  setCurrentCharacterSheet('banana');
  const bananaSheet = getCurrentCharacterSheet();
  bananaSheet.setProperties({
    level: 2,
    name: 'banana',
  });

  appleSheet.getAttrs(['hit_points', 'level', 'name'], (attrs) => {
    t.matchOnly(attrs, {
      hit_points: 10,
      level: 1,
      name: 'apple',
    });
    t.end();
  });
});
