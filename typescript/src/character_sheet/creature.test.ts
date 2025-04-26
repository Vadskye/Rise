import t from 'tap';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { getCurrentCharacterSheet } from '@src/character_sheet/current_character_sheet';
import { Creature } from './creature';

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

t.test('can add a debuff autoattack', (t) => {
  const creature = Creature.new();
  creature.setProperties({
    level: 7,
  });
  creature.addAutoAttack({
    defense: ['Fortitude'],
    effect: 'dazzled',
    name: 'Flashy Light',
    isMagical: true,
    targeting: 'targeted_medium',
  });

  t.matchOnly(creature.getDebuffAutoAttacks(), [
    {
      attack_accuracy: 4,
      attack_effect: `Make an attack against something within 60 feet.
Hit: The target is dazzled as a condition.`,
      attack_name: 'Flashy Light',
      is_magical: true,
      is_targeted: true,
      monster_effect: `The $name makes an attack against something within 60 feet.
Hit: The target is dazzled as a condition.`,
      tags: '',
      usage_time: 'standard',
    },
  ]);

  t.end();
});

t.test('can add a damaging autoattack', (t) => {
  const creature = Creature.new();
  creature.setProperties({
    level: 7,
  });
  creature.addAutoAttack({
    accuracy: 'low_accuracy',
    areaShape: 'radius_at_range',
    defense: ['Reflex'],
    effect: 'damage',
    name: 'Fireball',
    isMagical: true,
    targeting: 'small_area',
  });

  t.matchOnly(creature.getDamagingAutoAttacks(), [
    {
      attack_accuracy: -2,
      attack_damage_dice: '1d8+3',
      attack_effect: `Make an attack against everything in a 15 foot radius within 30 feet.
Miss: Half damage.`,
      attack_name: 'Fireball',
      is_magical: true,
      is_targeted: false,
      monster_effect: `The $name makes an attack against everything in a 15 foot radius within 30 feet.
Hit: 1d8+3 damage.
Miss: Half damage.`,
      tags: '',
      usage_time: 'standard',
    },
  ]);

  t.end();
});
