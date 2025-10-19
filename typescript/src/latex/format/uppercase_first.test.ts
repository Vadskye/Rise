import t from 'tap';
import { uppercaseFirst } from './uppercase_first';

t.test('uppercaseFirst', (t) => {
  t.test('should return an empty string for an empty input', (t) => {
    t.equal(uppercaseFirst(''), '');
    t.end();
  });

  t.test('should return the same string if it starts with an uppercase letter', (t) => {
    t.equal(uppercaseFirst('Hello'), 'Hello');
    t.end();
  });

  t.test('should handle single character strings', (t) => {
    t.equal(uppercaseFirst('a'), 'A');
    t.end();
  });

  t.test('should uppercase only the first word', (t) => {
    t.equal(uppercaseFirst('hello world'), 'Hello world');
    t.end();
  });

  t.test('should ignore preceding whitespace', (t) => {
    t.equal(uppercaseFirst('    hello world'), '    Hello world');
    t.end();
  });

  t.test('should ignore preceding special characters', (t) => {
    t.equal(uppercaseFirst('"hello world"'), '"Hello world"');
    t.end();
  });

  t.end();
});
