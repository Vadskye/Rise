import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getChangedPaths } from '../src/utils/compare';

describe('getChangedPaths unit tests', () => {
  test('returns empty array when objects are identical', () => {
    const obj1 = { name: 'Dragon', level: 5 };
    const obj2 = { name: 'Dragon', level: 5 };
    assert.deepStrictEqual(getChangedPaths(obj1, obj2), []);
  });

  test('returns root path if types differ', () => {
    assert.deepStrictEqual(getChangedPaths({ name: 'Dragon' }, 'Dragon'), ['']);
  });

  test('returns primitive property differences', () => {
    const obj1 = { name: 'Dragon', level: 5 };
    const obj2 = { name: 'Wyrm', level: 6 };
    const diffs = getChangedPaths(obj1, obj2);
    assert.deepStrictEqual(diffs.sort(), ['name', 'level'].sort());
  });

  test('returns nested property differences', () => {
    const obj1 = {
      name: 'Dragon',
      knowledge: { easy: 'basic info', normal: 'normal info' },
    };
    const obj2 = {
      name: 'Dragon',
      knowledge: { easy: 'different info', normal: 'normal info' },
    };
    assert.deepStrictEqual(getChangedPaths(obj1, obj2), ['knowledge.easy']);
  });

  test('normalizes undefined or null nested objects', () => {
    const obj1 = {
      name: 'Dragon',
      knowledge: undefined,
    };
    const obj2 = {
      name: 'Dragon',
      knowledge: { easy: 'typed info' },
    };
    assert.deepStrictEqual(getChangedPaths(obj1, obj2), ['knowledge.easy']);

    const obj3 = {
      name: 'Dragon',
      knowledge: null,
    };
    assert.deepStrictEqual(getChangedPaths(obj3, obj2), ['knowledge.easy']);
  });

  test('detects array differences', () => {
    const obj1 = {
      name: 'Dragon',
      traits: ['fly', 'breathe-fire'],
    };
    const obj2 = {
      name: 'Dragon',
      traits: ['fly', 'swim'],
    };
    assert.deepStrictEqual(getChangedPaths(obj1, obj2), ['traits.1']);
  });

  test('detects array length differences', () => {
    const obj1 = {
      name: 'Dragon',
      traits: ['fly'],
    };
    const obj2 = {
      name: 'Dragon',
      traits: ['fly', 'swim'],
    };
    assert.deepStrictEqual(getChangedPaths(obj1, obj2), ['traits']);
  });
});
