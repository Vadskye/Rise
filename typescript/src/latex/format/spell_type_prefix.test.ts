import t from 'tap';
import { generateUsageAndTags } from './spell_type_prefix';

t.test('generateUsageAndTags', (t) => {
  t.equal(
    generateUsageAndTags('standard action', 'arbitrary name', ''),
    'Casting time: Standard action.',
    'explicit casting time, no tags text',
  );
  t.equal(
    generateUsageAndTags(undefined, 'arbitrary name', ''),
    '\\abilityusagetime Standard action.',
    'no casting time, no tags text',
  );
  t.end();
});
