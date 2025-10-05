import { addAccuracyToEffect, replaceAccuracyTerms } from './replace_placeholders';
import { Creature } from '@src/character_sheet/creature';
import t from 'tap';

t.test('addAccuracyToEffect', (t) => {
  t.test('can add new modifier', (t) => {
    t.equal(
      addAccuracyToEffect(1, 'Attack with $accuracy accuracy', 'arbitrary name'),
      'Attack with $accuracy+1 accuracy',
      'should add a new positive modifier',
    );
    t.end();
  });

  t.test('can increase existing modifier', (t) => {
    t.equal(
      addAccuracyToEffect(2, 'Attack with $accuracy+1 accuracy', 'arbitrary name'),
      'Attack with $accuracy+3 accuracy',
      'should increase an existing positive modifier',
    );
    t.end();
  });

  t.test('can decrease existing modifier', (t) => {
    t.equal(
      addAccuracyToEffect(-2, 'Attack with $accuracy+3 accuracy', 'arbitrary name'),
      'Attack with $accuracy+1 accuracy',
      'should decrease an existing positive modifier',
    );
    t.end();
  });

  t.test('can flip existing modifier sign', (t) => {
    t.equal(
      addAccuracyToEffect(-4, 'Attack with $accuracy+2 accuracy', 'arbitrary name'),
      'Attack with $accuracy-2 accuracy',
      'should flip the sign of an existing modifier',
    );
    t.end();
  });

  t.test('can add new modifier to brawling', (t) => {
    t.equal(
      addAccuracyToEffect(1, 'Attack with $brawlingaccuracy accuracy', 'arbitrary name'),
      'Attack with $brawlingaccuracy+1 accuracy',
      'should add a new positive modifier to brawling accuracy',
    );
    t.end();
  });

  t.test('throws error for multiple accuracy placeholders', (t) => {
    t.throws(
      () => addAccuracyToEffect(1, 'Attack with $accuracy and $accuracy accuracy', 'arbitrary name'),
      new Error('Cannot add accuracy to ability arbitrary name: more than one $accuracy present'),
      'should throw an error for multiple accuracy placeholders',
    );
    t.end();
  });

  t.test('throws error for no accuracy placeholders', (t) => {
    t.throws(
      () => addAccuracyToEffect(1, 'Attack with no accuracy', 'arbitrary name'),
      new Error('Cannot add accuracy to ability arbitrary name: no $accuracy to replace'),
      'should throw an error for no accuracy placeholders',
    );
    t.end();
  });


  t.end();
});

t.test('replaceAccuracyTerms', (t) => {
  const mockCreature = {
    name: 'Test Creature',
    accuracy: 5,
  } as Creature;

  t.test('replaces $accuracy with creature accuracy', (t) => {
    t.equal(
      replaceAccuracyTerms('$accuracy vs. Armor', mockCreature),
      '+5 vs. Armor',
      'should replace $accuracy with creature accuracy',
    );
    t.end();
  });

  t.test('replaces $accuracy with positive local modifier', (t) => {
    t.equal(
      replaceAccuracyTerms('$accuracy vs. Armor+2', mockCreature),
      '+7 vs. Armor',
      'should add positive local modifier',
    );
    t.end();
  });

  t.test('replaces $accuracy with negative local modifier', (t) => {
    t.equal(
      replaceAccuracyTerms('$accuracy vs. Armor-3', mockCreature),
      '+2 vs. Armor',
      'should subtract negative local modifier',
    );
    t.end();
  });

  t.test('replaces $accuracy with weapon accuracy', (t) => {
    t.equal(
      replaceAccuracyTerms('$accuracy vs. Armor', mockCreature, 3),
      '+8 vs. Armor',
      'should add weapon accuracy',
    );
    t.end();
  });

  t.test('replaces $accuracy with local and weapon accuracy', (t) => {
    t.equal(
      replaceAccuracyTerms('$accuracy vs. Armor+2', mockCreature, 3),
      '+10 vs. Armor',
      'should add local and weapon accuracy',
    );
    t.end();
  });

  t.test('replaces $accuracy resulting in zero', (t) => {
    const zeroAccuracyCreature = { ...mockCreature, accuracy: 0 } as Creature;
    t.equal(
      replaceAccuracyTerms('$accuracy vs. Armor', zeroAccuracyCreature),
      '+0 vs. Armor',
      'should result in +0 for zero accuracy',
    );
    t.end();
  });

  t.test('replaces $accuracy resulting in negative', (t) => {
    const negativeAccuracyCreature = { ...mockCreature, accuracy: -5 } as Creature;
    t.equal(
      replaceAccuracyTerms('$accuracy vs. Armor', negativeAccuracyCreature),
      '-5 vs. Armor',
      'should result in negative accuracy',
    );
    t.end();
  });

  t.test('replaces multiple $accuracy terms', (t) => {
    t.equal(
      replaceAccuracyTerms('First $accuracy, then $accuracy+1, finally $accuracy-2', mockCreature),
      'First +5, then +6, finally +3',
      'should replace multiple accuracy terms correctly',
    );
    t.end();
  });

  t.end();
});

