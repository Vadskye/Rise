import t from 'tap';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { getCurrentCharacterSheet } from '@src/character_sheet/current_character_sheet';
import { Creature } from './creature';

t.test('can set a trained skill', (t) => {
  const sheet = getCurrentCharacterSheet();
  handleEverything();
  const creature = new Creature(sheet);
  creature.setProperties({
    level: 20,
  });
  creature.setTrainedSkills(["awareness"]);
  const vals = creature.getPropertyValues(["accuracy", "awareness"]);
  t.match(vals, {
    accuracy: 10, // Make sure that general calculations worked
    awareness: 13,
  });
  t.end();
});
