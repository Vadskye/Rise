import t from 'tap';
import { spellScaling } from './spell_scaling';
import { ActiveAbility } from '@src/abilities';

let capturedWarnings: string[][];
let originalConsoleWarn: any;
t.beforeEach(() => {
  capturedWarnings = [];
  originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    capturedWarnings.push(args);
  };
});
t.afterEach(() => {
  console.warn = originalConsoleWarn;
});

t.test('spellScaling', (t) => {
  t.test('should return null if spell.scaling is null', (t) => {
    const spell: Partial<ActiveAbility> = {
      scaling: undefined,
    };
    t.equal(spellScaling(spell as ActiveAbility), null);
    t.end();
  });

  t.test('should return null if spell.rank is at least 7', (t) => {
    const spell: Partial<ActiveAbility> = {
      scaling: 'accuracy',
      rank: 7,
    };
    t.equal(spellScaling(spell as ActiveAbility), null);
    t.end();
  });

  t.test('accuracy scaling', (t) => {
    t.test('works for spell.attack', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'accuracy',
        rank: 1,
        attack: { hit: 'deals damage', targeting: 'target' },
      };
      t.equal(
        spellScaling(spell as ActiveAbility),
        "The attack's \\glossterm{accuracy} increases by +1 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('works for spell.functionsLike', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'accuracy',
        rank: 1,
        functionsLike: { name: 'other spell' },
      };
      t.equal(
        spellScaling(spell as ActiveAbility),
        "The attack's \\glossterm{accuracy} increases by +1 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('should warn if there is neither spell.attack nor spell.functionsLike', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'accuracy',
        rank: 1,
      };
      t.equal(
        spellScaling(spell as ActiveAbility),
        "The attack's \\glossterm{accuracy} increases by +1 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, [
        ['Spell Test Spell has accuracy scaling, but does not make an attack.'],
      ]);
      t.end();
    });

    t.test('should warn if spell contains damage value', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'accuracy',
        rank: 1,
        effect: 'damagerankone',
        attack: { hit: 'deals damage', targeting: 'target' },
      };
      spellScaling(spell as ActiveAbility);
      t.matchOnlyStrict(capturedWarnings, [
        ['Spell Test Spell has accuracy scaling, but should probably have damage scaling'],
      ]);
      t.end();
    });

    t.end();
  });

  t.test('double accuracy scaling', (t) => {
    t.test('works for spell.attack', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'double_accuracy',
        rank: 1,
        attack: { hit: 'deals damage', targeting: 'target' },
      };
      t.equal(
        spellScaling(spell as ActiveAbility),
        "The attack's \\glossterm{accuracy} increases by +2 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('works for spell.functionsLike', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'double_accuracy',
        rank: 1,
        functionsLike: { name: 'other spell' },
      };
      t.equal(
        spellScaling(spell as ActiveAbility),
        "The attack's \\glossterm{accuracy} increases by +2 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('should warn if there is neither spell.attack nor spell.functionsLike', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'double_accuracy',
        rank: 1,
      };
      t.equal(
        spellScaling(spell as ActiveAbility),
        "The attack's \\glossterm{accuracy} increases by +2 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, [
        ['Spell Test Spell has double accuracy scaling, but does not make an attack.'],
      ]);
      t.end();
    });

    t.test('should warn if spell contains damage value', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'double_accuracy',
        rank: 1,
        effect: 'damagerankone',
        attack: { hit: 'deals damage', targeting: 'target' },
      };
      spellScaling(spell as ActiveAbility);
      t.matchOnlyStrict(capturedWarnings, [
        ['Spell Test Spell has double accuracy scaling, but should probably have damage scaling'],
      ]);
      t.end();
    });

    t.end();
  });

  t.test('damage scaling', (t) => {
    t.test('should work with damagerankzero through ten', (t) => {
      const ranks = [
        ['damagerankzero', '1'],
        ['damagerankone', '2'],
        ['damageranktwo', '1d6'],
        ['damagerankthree', '1d6'],
        ['damagerankfour', '2d6'],
        ['damagerankfive', '2d6'],
        ['damageranksix', '2d6'],
        ['damagerankseven', '2d8'],
        ['damagerankeight', '2d10'],
        ['damageranknine', '4d6'],
        ['damagerankten', '4d8'],
      ];
      for (const [rankStr, expectedVal] of ranks) {
        const spell: Partial<ActiveAbility> = {
          name: 'Test Spell',
          scaling: 'damage',
          rank: 1,
          effect: rankStr,
        };
        t.equal(
          spellScaling(spell as ActiveAbility),
          `The damage increases by ${expectedVal} for each rank beyond 1.`,
        );
      }
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('should work with damagerankzerolow through tenlow', (t) => {
      const ranks = [
        ['damagerankzerolow', '2'],
        ['damagerankonelow', '3'],
        ['damageranktwolow', '1d8'],
        ['damagerankthreelow', '1d8'],
        ['damagerankfourlow', '2d6'],
        ['damagerankfivelow', '3d6'],
        ['damageranksixlow', '3d10'],
        ['damageranksevenlow', '4d10'],
        ['damagerankeightlow', '5d10'],
        ['damagerankninelow', '6d10'],
        ['damageranktenlow', '8d10'],
      ];
      for (const [rankStr, expectedVal] of ranks) {
        const spell: Partial<ActiveAbility> = {
          name: 'Test Spell',
          scaling: 'damage',
          rank: 1,
          effect: rankStr,
        };
        t.equal(
          spellScaling(spell as ActiveAbility),
          `The damage increases by ${expectedVal} for each rank beyond 1.`,
        );
      }
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('should warn if unable to calculate damage scaling', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'damage',
        rank: 1,
        effect: 'no damage rank here',
      };
      t.equal(
        spellScaling(spell as ActiveAbility),
        'The damage increases by undefined for each rank beyond 1.',
      );
      t.matchOnlyStrict(capturedWarnings, [['Unable to calculate damage scaling for Test Spell']]);
      t.end();
    });

    t.end();
  });

  t.test('healing scaling', (t) => {
    t.test('should work with hprankzero through ten', (t) => {
      const ranks = [
        ['hprankzero', '1'],
        ['hprankone', '2'],
        ['hpranktwo', '1d6'],
        ['hprankthree', '1d6'],
        ['hprankfour', '2d6'],
        ['hprankfive', '2d6'],
        ['hpranksix', '2d6'],
        ['hprankseven', '2d8'],
        ['hprankeight', '2d10'],
        ['hpranknine', '4d6'],
        ['hprankten', '4d8'],
      ];
      for (const [rankStr, expectedVal] of ranks) {
        const spell: Partial<ActiveAbility> = {
          name: 'Test Spell',
          scaling: 'healing',
          rank: 1,
          effect: rankStr,
        };
        t.equal(
          spellScaling(spell as ActiveAbility),
          `The healing increases by ${expectedVal} for each rank beyond 1.`,
        );
      }
      t.end();
    });

    t.test('should work with hprankzerolow through tenlow', (t) => {
      const ranks = [
        ['hprankzerolow', '2'],
        ['hprankonelow', '3'],
        ['hpranktwolow', '1d8'],
        ['hprankthreelow', '1d8'],
        ['hprankfourlow', '2d6'],
        ['hprankfivelow', '3d6'],
        ['hpranksixlow', '3d10'],
        ['hpranksevenlow', '4d10'],
        ['hprankeightlow', '5d10'],
        ['hprankninelow', '6d10'],
        ['hpranktenlow', '8d10'],
      ];
      for (const [rankStr, expectedVal] of ranks) {
        const spell: Partial<ActiveAbility> = {
          name: 'Test Spell',
          scaling: 'healing',
          rank: 1,
          effect: rankStr,
        };
        t.equal(
          spellScaling(spell as ActiveAbility),
          `The healing increases by ${expectedVal} for each rank beyond 1.`,
        );
      }
      t.end();
    });

    t.test('should warn if unable to calculate healing scaling', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: 'healing',
        rank: 1,
        effect: 'no healing rank here',
      };
      t.equal(
        spellScaling(spell as ActiveAbility),
        'The healing increases by undefined for each rank beyond 1.',
      );
      t.matchOnlyStrict(capturedWarnings, [['Unable to calculate healing scaling for Test Spell']]);
      t.end();
    });

    t.end();
  });

  t.test('special scaling', (t) => {
    t.test('should return special text if spell.scaling.special is defined', (t) => {
      const spell: Partial<ActiveAbility> = {
        scaling: { special: 'Special scaling text.' },
      };
      t.equal(spellScaling(spell as ActiveAbility), 'Special scaling text.');
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.end();
  });

  t.test('object scaling', (t) => {
    // TODO: should this warn because the scaling doesn't reach all the way to rank 7?
    t.test('should format ranks correctly for object scaling', (t) => {
      const spell: Partial<ActiveAbility> = {
        scaling: {
          3: 'Effect at rank 3',
          5: 'Effect at rank 5',
        },
      };
      t.equal(
        spellScaling(spell as ActiveAbility),
        '\\rank{3} Effect at rank 3\n\\rank{5} Effect at rank 5',
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.end();
  });

  t.test('unrecognized scaling', (t) => {
    t.test('should throw an error for unrecognized scaling type', (t) => {
      const spell: Partial<ActiveAbility> = {
        name: 'Test Spell',
        scaling: true as any, // Invalid scaling type
      };
      t.throws(
        () => spellScaling(spell as ActiveAbility),
        new Error("Spell Test Spell has unrecognized scaling: 'true'"),
      );

      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.end();
  });

  t.end();
});
