import t from 'tap';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { getCurrentCharacterSheet } from '@src/character_sheet/current_character_sheet';
import { Creature } from './creature';

t.test('can set a trained skill', (t) => {
  const creature = Creature.new();
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
  const creature = Creature.new();
  creature.setProperties({
    level: 20,
  });
  creature.setTrainedSkills(["awareness", "knowledge_arcana", "knowledge_local"]);
  t.match(creature.getTrainedKnowledgeSkillNames(), ["knowledge_arcana", "knowledge_local"]);
  t.end();
});

t.test('can increase accuracy with a custom modifier', (t) => {
  const creature = Creature.new();
  creature.addCustomModifier({
    name: "Precise",
    numericEffects: [{
      modifier: 20,
      statistic: "accuracy",
    }],
  });
  const sheet = creature.getSheetForTesting();
  t.equal(
    sheet.getPropertyValue("repeating_permanentmodifiers_0_statistic0"),
    "accuracy",
    "Permanent modifier should affect accuracy",
  );
  t.equal(
    sheet.getPropertyValue("repeating_permanentmodifiers_0_value0"),
    20,
    "Permanent modifier value",
  );

  t.equal(creature.accuracy, 20, "Total accuracy");
  t.end();
});

t.test('can increase a skill with a custom modifier', (t) => {
  const creature = Creature.new();
  creature.addCustomModifier({
    name: "Climber",
    numericEffects: [{
      modifier: 20,
      statistic: "climb",
    }],
  });
  t.equal(creature.climb, 20);
  t.end();
});

t.test('can add immunity modifiers', (t) => {
  const creature = Creature.new();
  creature.addCustomModifier({
    name: "Hotproof",
    immune: "Fire",
  });
  creature.addCustomModifier({
    name: "Coldproof",
    immune: "Cold",
  });

  const sheet = creature.getSheetForTesting();
  t.match(
    sheet.getRepeatingSectionValues("permanentmodifiers", "immune"),
    ["Fire", "Cold"],
    "Repeating section values",
  );
  t.equal(
    sheet.getPropertyValue("repeating_permanentmodifiers_0_immune"),
    "Fire",
    "First modifier",
  );
  t.equal(
    sheet.getPropertyValue("repeating_permanentmodifiers_1_immune"),
    "Cold",
    "Second modifier",
  );

  t.equal(creature.immune, "Cold, Fire");
  t.end();
});
