import t from 'tap';
import { modifier } from './modifier';

t.test('modifier', (t) => {
  t.test('should return "N/A" for null input', (t) => {
    t.equal(modifier(null), 'N/A');
    t.end();
  });

  t.test('should return \\plus for positive numbers', (t) => {
    t.equal(modifier(0), '\\plus0');
    t.equal(modifier(5), '\\plus5');
    t.end();
  });

  t.test('should return \\minus for negative numbers', (t) => {
    t.equal(modifier(-1), '\\minus1');
    t.equal(modifier(-5), '\\minus5');
    t.end();
  });

  t.end();
});
