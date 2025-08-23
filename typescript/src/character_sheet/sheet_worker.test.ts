import t from 'tap';
import { getAttrs, setAttrs } from './roll20_shim';
import { resetDefaultCharacterSheet } from './current_character_sheet';
import { handleEverything } from './sheet_worker';

t.beforeEach(() => {
  resetDefaultCharacterSheet();
  handleEverything();
});

function setStandardFighter() {
  setAttrs({
    armor_usage_class: 'heavy',
    base_class: 'fighter',
    body_armor_defense: 5,
    constitution: 2,
    dexterity: 2,
    intelligence: 0,
    level: 10,
    perception: 0,
    strength: 3,
    willpower: 1,
  });
}

function setStandardWizard() {
  setAttrs({
    armor_usage_class: 'light',
    base_class: 'wizard',
    body_armor_defense: 2,
    constitution: 0,
    dexterity: 1,
    intelligence: 3,
    level: 10,
    perception: 2,
    strength: 0,
    willpower: 2,
  });
}

t.test('can calculate armor defense', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['armor_defense', 'armor_defense_explanation'], (attrs) => {
      t.match(attrs, {
        armor_defense: 11,
        armor_defense_explanation: '+5 (level)  +5 (body armor)  +1 (fighter)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['armor_defense', 'armor_defense_explanation'], (attrs) => {
      t.match(attrs, {
        armor_defense: 7,
        armor_defense_explanation: '+5 (level)  +2 (body armor)',
      });
      t.end();
    });
  });

  t.end();
});


t.test('can calculate hit points', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['hit_points_max', 'hit_points_explanation'], (attrs) => {
      t.match(attrs, {
        hit_points_max: 29,
        hit_points_explanation: '+29 (level)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['hit_points_max', 'hit_points_explanation'], (attrs) => {
      t.match(attrs, {
        hit_points_max: 20,
        hit_points_explanation: '+20 (level)',
      });
      t.end();
    });
  });

  t.end();
});
