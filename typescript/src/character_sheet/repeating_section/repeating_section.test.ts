import t from 'tap';
import { splitPropertyName } from './repeating_section';

t.test('splitPropertyName', (t) => {
  t.test('should parse full property name', (t) => {
    const result = splitPropertyName('repeating_abilities_123_spellname');
    t.equal(result.sectionName, 'abilities', 'sectionName should be correct');
    t.equal(result.rowId, '123', 'rowId should be correct');
    t.equal(result.rowPropertyName, 'spellname', 'rowPropertyName should be correct');
    t.end();
  });

  t.test('should parse property name with only section and property', (t) => {
    const result = splitPropertyName('repeating_abilities:spellname');
    t.equal(result.sectionName, 'abilities', 'sectionName should be correct');
    t.equal(result.rowId, null, 'rowId should be null');
    t.equal(result.rowPropertyName, 'spellname', 'rowPropertyName should be correct');
    t.end();
  });

  t.test('should parse property name with only section and property (underscore)', (t) => {
    const result = splitPropertyName('repeating_abilities_spellname');
    t.equal(result.sectionName, 'abilities', 'sectionName should be correct');
    t.equal(result.rowId, null, 'rowId should be null');
    t.equal(result.rowPropertyName, 'spellname', 'rowPropertyName should be correct');
    t.end();
  });

  t.test('should parse property name with only section', (t) => {
    const result = splitPropertyName('repeating_abilities');
    t.equal(result.sectionName, 'abilities', 'sectionName should be correct');
    t.equal(result.rowId, null, 'rowId should be null');
    t.equal(result.rowPropertyName, null, 'rowPropertyName should be null');
    t.end();
  });

  t.test('should throw error for unparseable property name', (t) => {
    t.throws(() => splitPropertyName('invalid_name'), 'should throw an error');
    t.end();
  });

  t.end();
});
