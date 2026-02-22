import t from 'tap';
import { handleEverything } from './sheet_worker';
import { clearAllCharacterSheets, createCharacterSheet } from './current_character_sheet';

t.beforeEach(() => {
  clearAllCharacterSheets();
});

t.test('recalculation on sheet:opened', (t) => {
  t.test('recalculates trained skills', (t) => {
    const sheet = createCharacterSheet('test_char');
    handleEverything();

    sheet.setProperties({
      repeating_trainedskills_0_trained_skill: 'awareness',
      awareness_is_trained: '0',
    });
    sheet.triggerRecalculation();

    t.equal(
      sheet.getPropertyValue('awareness_is_trained'),
      '1',
      'Initial set should work via sheet:opened',
    );

    sheet.setProperties({ awareness_is_trained: '0' });
    t.equal(sheet.getPropertyValue('awareness_is_trained'), '0', 'Manual overwrite should work');

    sheet.triggerRecalculation();

    t.equal(
      sheet.getPropertyValue('awareness_is_trained'),
      '1',
      'Recalculation should restore trained status',
    );
    t.end();
  });

  t.test('recalculates attuned effects', (t) => {
    const sheet = createCharacterSheet('test_char_attuned');
    handleEverything();

    sheet.setProperties({
      repeating_attunedmodifiers_0_is_active: '1',
      active_attunement_count: 0,
    });
    sheet.triggerRecalculation();

    t.equal(
      sheet.getPropertyValue('active_attunement_count'),
      1,
      'Initial set should work via sheet:opened',
    );

    sheet.setProperties({ active_attunement_count: 0 });
    t.equal(sheet.getPropertyValue('active_attunement_count'), 0, 'Manual overwrite should work');

    sheet.triggerRecalculation();

    t.equal(
      sheet.getPropertyValue('active_attunement_count'),
      1,
      'Recalculation should restore attunement count',
    );
    t.end();
  });

  t.test('recalculates vital wounds', (t) => {
    const sheet = createCharacterSheet('test_char_vital');
    handleEverything();

    sheet.setProperties({
      repeating_vitalwounds_0_vital_wound_roll: 5,
      all_defenses_vital_wound_modifier: 0,
    });
    sheet.triggerRecalculation();

    t.equal(
      sheet.getPropertyValue('all_defenses_vital_wound_modifier'),
      -1,
      'Initial set should work via sheet:opened',
    );

    sheet.setProperties({ all_defenses_vital_wound_modifier: 0 });
    t.equal(
      sheet.getPropertyValue('all_defenses_vital_wound_modifier'),
      0,
      'Manual overwrite should work',
    );

    sheet.triggerRecalculation();

    t.equal(
      sheet.getPropertyValue('all_defenses_vital_wound_modifier'),
      -1,
      'Recalculation should restore vital wound penalty',
    );
    t.end();
  });

  t.end();
});
