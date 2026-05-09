import t from 'tap';
import { getClassName, getClassShorthand } from './metadata';

t.test('Classes Metadata', (t) => {
  t.test('getClassName returns lowercase name', (t) => {
    t.equal(getClassName('Barbarian'), 'barbarian');
    t.equal(getClassName('Wizard'), 'wizard');
    t.end();
  });

  t.test('getClassShorthand returns expected shorthand', (t) => {
    t.equal(getClassShorthand('Barbarian'), 'Bbn');
    t.equal(getClassShorthand('Cleric'), 'Clr');
    t.equal(getClassShorthand('Wizard'), 'Wiz');
    t.end();
  });

  t.end();
});
