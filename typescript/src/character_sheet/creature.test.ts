import t from 'tap';
import { Creature } from './creature';
import { getCurrentCharacterSheet } from './current_character_sheet';

t.test('can set a trained skill', (t) => {
  const creature = Creature.new();
  creature.setProperties({
    level: 20,
  });
  creature.setTrainedSkills(['awareness']);
  const vals = creature.getPropertyValues(['accuracy', 'awareness']);
  t.matchOnly(vals, {
    accuracy: 10, // Make sure that general calculations worked
    awareness: 13,
  });
  t.matchOnly(creature.getTrainedSkillNames(), ['awareness']);
  t.end();
});

t.test('can set a trained knowledge skill', (t) => {
  const creature = Creature.new();
  creature.setProperties({
    level: 20,
  });
  creature.setTrainedSkills(['awareness', 'knowledge_arcana', 'knowledge_local']);
  t.matchOnly(creature.getTrainedKnowledgeSkillNames(), ['knowledge_arcana', 'knowledge_local']);
  t.end();
});

t.test('can increase accuracy with a custom modifier', (t) => {
  const creature = Creature.new();
  creature.addCustomModifier({
    name: 'Precise',
    numericEffects: [
      {
        modifier: 20,
        statistic: 'accuracy',
      },
    ],
  });
  const sheet = creature.getSheetForTesting();
  t.equal(
    sheet.getPropertyValue('repeating_permanentmodifiers_0_statistic0'),
    'accuracy',
    'Permanent modifier should affect accuracy',
  );
  t.equal(
    sheet.getPropertyValue('repeating_permanentmodifiers_0_value0'),
    20,
    'Permanent modifier value',
  );

  t.equal(creature.accuracy, 20, 'Total accuracy');
  t.end();
});

t.test('can increase a skill with a custom modifier', (t) => {
  const creature = Creature.new();
  creature.addCustomModifier({
    name: 'Climber',
    numericEffects: [
      {
        modifier: 20,
        statistic: 'climb',
      },
    ],
  });
  t.equal(creature.climb, 20);
  t.end();
});

t.test('can add immunity modifiers', (t) => {
  const creature = Creature.new();
  creature.addCustomModifier({
    name: 'Hotproof',
    immune: 'Fire',
  });
  creature.addCustomModifier({
    name: 'Coldproof',
    immune: 'Cold',
  });

  const sheet = creature.getSheetForTesting();
  t.matchOnly(
    sheet.getRepeatingSectionValues('permanentmodifiers', 'immune'),
    ['Fire', 'Cold'],
    'Repeating section values',
  );
  t.equal(
    sheet.getPropertyValue('repeating_permanentmodifiers_0_immune'),
    'Fire',
    'First modifier',
  );
  t.equal(
    sheet.getPropertyValue('repeating_permanentmodifiers_1_immune'),
    'Cold',
    'Second modifier',
  );

  t.equal(creature.immune, 'Cold, Fire');
  t.end();
});

t.test('automatic caching works and is cleared on mutation', (t) => {
  const creature = Creature.new();
  creature.setProperties({ level: 1 });

  // Access property to cache it
  const level1 = creature.level;
  t.equal(level1, 1);

  // Directly modify the underlying sheet without the creature knowing
  const sheet = getCurrentCharacterSheet();
  sheet.setProperties({ level: 2 });
  t.equal(sheet.getPropertyValue('level'), 2);
  // The creature still thinks its level is 1, because level is cached.
  t.equal(creature.level, 1);

  // If we modify any statistic of the creature, it should clear the cache.
  creature.setTrainedSkills(['awareness']);
  t.equal(creature.level, 2, 'Cache should be cleared after setting any statistic');

  t.end();
});
