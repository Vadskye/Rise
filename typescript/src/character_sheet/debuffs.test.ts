import t from 'tap';
import { getAttrs, setAttrs } from './roll20_shim';
import { resetDefaultCharacterSheet } from './current_character_sheet';
import { handleEverything } from './sheet_worker';

t.beforeEach(() => {
  resetDefaultCharacterSheet();
  handleEverything();
});

t.test('midair debuff', (t) => {
  setAttrs({
    level: 10,
    dexterity_at_creation: 0,
    base_class: 'fighter', // +1 Armor Defense
    midair: true,
  });

  getAttrs(['armor_defense', 'reflex', 'armor_defense_debuff_explanation', 'reflex_debuff_explanation'], (attrs) => {
    // 10 level -> +5 defense
    // Fighter -> +1 armor defense, +3 reflex
    // Midair -> -4 armor defense, -4 reflex
    t.equal(attrs.armor_defense, 5 + 1 - 4, 'Armor defense should be 2');
    t.equal(attrs.reflex, 5 + 3 - 4, 'Reflex defense should be 4');
    t.equal(attrs.armor_defense_debuff_explanation, '-4 (midair)', 'Armor defense explanation should mention midair');
    t.equal(attrs.reflex_debuff_explanation, '-4 (midair)', 'Reflex defense explanation should mention midair');
    t.end();
  });
});

t.test('midair and grappled together', (t) => {
  setAttrs({
    level: 10,
    dexterity_at_creation: 0,
    base_class: 'fighter',
    midair: true,
    grappled: true,
  });

  getAttrs(['armor_defense', 'reflex', 'armor_defense_debuff_explanation', 'reflex_debuff_explanation'], (attrs) => {
    // 10 level -> +5 defense
    // Fighter -> +1 armor defense, +3 reflex
    // Midair -> -4 armor defense, -4 reflex
    // Grappled -> -2 armor defense, -2 reflex
    // Total debuff -> -6
    t.equal(attrs.armor_defense, 5 + 1 - 6, 'Armor defense should be 0');
    t.equal(attrs.reflex, 5 + 3 - 6, 'Reflex defense should be 2');
    // Explanations are comma-separated in alphabetical order of the cause usually, 
    // but the code uses namedModifierMap.generateExplanation which might have its own order.
    // In sheet_worker.ts:
    // minus2('grappled', ...)
    // minus4('midair', ...)
    // They are added in that order.
    t.match(attrs.armor_defense_debuff_explanation, /midair/, 'Should contain midair');
    t.match(attrs.armor_defense_debuff_explanation, /grappled/, 'Should contain grappled');
    t.end();
  });
});
