import t from 'tap';
import { validateSpells } from './validate_spells';
import { makeMockSpell, makeMockSphere } from './validate_spells_test_helpers';

t.test('validateSpells: Almost Equivalent Spells', (t) => {
  t.test('should flag spells that are almost equivalent with exactly one difference', (t) => {
    const sphere1 = makeMockSphere('Cryomancy', [
      makeMockSpell({
        name: 'Bonechill',
        rank: 2,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankfive.',
          targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
        },
      }),
      makeMockSpell({
        name: 'Cripple',
        rank: 2,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankfive.',
          targeting: 'Make an attack vs. Fortitude against a creature within \\medrange.',
        },
      }),
    ]);

    // Case 1: Option disabled (should not find almost_equivalent)
    const issuesDisabled = validateSpells([sphere1]);
    const almost1 = issuesDisabled.find((issue) => issue.type === 'almost_equivalent');
    t.notOk(almost1, 'Should not find almost equivalent when option is omitted');

    // Case 2: Option enabled (should find almost_equivalent under differs by range)
    const issuesEnabled = validateSpells([sphere1], { showApproximate: true });
    const almost2 = issuesEnabled.find((issue) => issue.type === 'almost_equivalent');
    t.ok(almost2, 'Should find almost equivalent when option is enabled');
    t.equal(almost2?.differenceField, 'range');
    t.match(almost2?.message || '', /differ only by range/);

    t.end();
  });

  t.test('should enforce rank difference limit of 1', (t) => {
    const sphere1 = makeMockSphere('Cryomancy', [
      makeMockSpell({
        name: 'Ice Spear',
        rank: 1,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankfive.',
          targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
        },
      }),
      makeMockSpell({
        name: 'Great Ice Spear',
        rank: 3,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankfive.',
          targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1], { showApproximate: true });
    const almost = issues.find((issue) => issue.type === 'almost_equivalent');
    t.notOk(
      almost,
      'Should not flag spells as almost equivalent if rank difference is greater than 1',
    );
    t.end();
  });

  t.test('should enforce same damage presence constraint', (t) => {
    const sphere1 = makeMockSphere('Cryomancy', [
      makeMockSpell({
        name: 'Bonechill',
        rank: 2,
        roles: ['burst'],
        attack: {
          hit: '\\damagerankfive.',
          targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
        },
      }),
      makeMockSpell({
        name: 'Freezing Touch',
        rank: 2,
        roles: ['burst'],
        attack: {
          hit: 'The target is frozen.', // No damagerank
          targeting: 'Make an attack vs. Fortitude against something within \\shortrange.',
        },
      }),
    ]);

    const issues = validateSpells([sphere1], { showApproximate: true });
    const almost = issues.find((issue) => issue.type === 'almost_equivalent');
    t.notOk(
      almost,
      'Should not flag spells as almost equivalent if one is damaging and the other is not',
    );
    t.end();
  });

  t.end();
});
