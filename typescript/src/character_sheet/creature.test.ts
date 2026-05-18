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

t.test('can apply armor effects', (t) => {
  const creature = Creature.new();
  creature.setEquippedArmorEffects({ bodyArmor: 'breastplate', shield: 'standard shield' });

  t.equal(creature.body_armor_defense, 5, 'Body armor defense');
  t.equal(creature.body_armor_durability, 5, 'Body armor durability');
  t.equal(creature.body_armor_speed, -10, 'Body armor speed');
  t.equal(creature.body_armor_vital_rolls, 2, 'Body armor vital rolls');
  t.equal(creature.body_armor_usage_class, 'heavy', 'Body armor usage class');
  t.equal(creature.body_armor_dex_skill_modifier, -4, 'Body armor dex skill modifier');

  t.equal(creature.shield_defense, 2, 'Shield defense');
  t.equal(creature.shield_reflex, 2, 'Shield reflex');
  t.equal(creature.shield_accuracy, 0, 'Shield accuracy');

  t.end();
});

t.test('calling only setEquippedArmorName does not affect numeric stats', (t) => {
  const creature = Creature.new();
  creature.setEquippedArmorName({ bodyArmor: 'breastplate', shield: 'standard shield' });

  t.notOk(creature.body_armor_defense, 'Body armor defense should be falsy');
  t.notOk(creature.shield_defense, 'Shield defense should be falsy');

  t.end();
});
