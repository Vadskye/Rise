import t from 'tap';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { getCurrentCharacterSheet } from '@src/character_sheet/current_character_sheet';
import { Creature } from './creature';

t.test('can set a trained skill', (t) => {
  const creature = Creature.fromName("test character");
  creature.setProperties({
    level: 20,
  });
  creature.setTrainedSkills(["awareness"]);
  const vals = creature.getPropertyValues(["accuracy", "awareness"]);
  t.match(vals, {
    accuracy: 10, // Make sure that general calculations worked
    awareness: 13,
  });
  t.match(creature.getTrainedSkillNames(), ["awareness"]);
  t.end();
});

t.test('can set a trained knowledge skill', (t) => {
  const creature = Creature.fromName("test character");
  creature.setProperties({
    level: 20,
  });
  creature.setTrainedSkills(["awareness", "knowledge_arcana", "knowledge_local"]);
  t.match(creature.getTrainedKnowledgeSkillNames(), ["knowledge_arcana", "knowledge_local"]);
  t.end();
});
