import t from 'tap';
import { feet } from './feet';

t.test('feet', (t) => {
  t.test('should format simple integers', (t) => {
    t.equal(feet(0), '0 ft.');
    t.equal(feet(10), '10 ft.');
    t.equal(feet(1), '1 ft.');
    t.end();
  });

  t.test('should show half feet', (t) => {
    t.equal(feet(0.5), '0-1/2 ft.');
    t.equal(feet(10.5), '10-1/2 ft.');
    t.equal(feet(1.5), '1-1/2 ft.');
    t.end();
  });

  t.test('should error for invalid values', (t) => {
    t.throws(() => feet(1.25), '1.25 feet');
    t.throws(() => feet(undefined as any), 'undefined feet');
    t.end();
  });

  t.end();
});
