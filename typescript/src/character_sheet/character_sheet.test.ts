import { CharacterSheet } from './character_sheet';
import t from 'tap';

t.test('CharacterSheet', (t) => {
  t.beforeEach(async (t) => {
    const characterSheet = new CharacterSheet('Test Character');
    t.context = { characterSheet };
  });

  t.test('constructor initializes characterName', (t) => {
    const { characterSheet } = t.context;
    t.equal(characterSheet.characterName, 'Test Character', 'characterName should be initialized');
    t.end();
  });

  t.test('getRepeatingSection returns a RepeatingSection instance', (t) => {
    const { characterSheet } = t.context;
    const section = characterSheet.getRepeatingSection('trainedskills');
    t.ok(section, 'should return a repeating section');
    t.end();
  });

  t.end();
});
