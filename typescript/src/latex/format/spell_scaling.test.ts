import t from 'tap';
import { spellScaling } from './spell_scaling';
import { SpellLike } from '@src/abilities/mystic_spheres';

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
    const spell: Partial<SpellLike> = {
      scaling: undefined,
    };
    t.equal(spellScaling(spell as SpellLike), null);
    t.end();
  });

  t.test('should return null if spell.rank is at least 7', (t) => {
    const spell: Partial<SpellLike> = {
      scaling: 'accuracy',
      rank: 7,
    };
    t.equal(spellScaling(spell as SpellLike), null);
    t.end();
  });

  t.test('accuracy scaling', (t) => {
    t.test('works for spell.attack', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'accuracy',
        rank: 1,
        attack: { hit: 'deals damage', targeting: 'target' },
      };
      t.equal(
        spellScaling(spell as SpellLike),
        "The attack's \\glossterm{accuracy} increases by +1 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('works for spell.functionsLike', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'accuracy',
        rank: 1,
        functionsLike: { name: 'other spell' },
      };
      t.equal(
        spellScaling(spell as SpellLike),
        "The attack's \\glossterm{accuracy} increases by +1 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('should warn if there is neither spell.attack nor spell.functionsLike', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'accuracy',
        rank: 1,
      };
      t.equal(
        spellScaling(spell as SpellLike),
        "The attack's \\glossterm{accuracy} increases by +1 for each rank beyond 1.",
      );
      t.matchOnlyStrict(
        capturedWarnings,
        [['Spell Test Spell has accuracy scaling, but does not make an attack.']],
      );
      t.end();
    });

    t.test('should warn if spell contains damage value', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'accuracy',
        rank: 1,
        effect: 'damagerankone',
        attack: { hit: 'deals damage', targeting: 'target' },
      };
      spellScaling(spell as SpellLike);
      t.matchOnlyStrict(
        capturedWarnings,
        [['Spell Test Spell has accuracy scaling, but should probably have damage scaling']],
      );
      t.end();
    });

    t.end();
  });

  t.test('double accuracy scaling', (t) => {
    t.test('works for spell.attack', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'double_accuracy',
        rank: 1,
        attack: { hit: 'deals damage', targeting: 'target' },
      };
      t.equal(
        spellScaling(spell as SpellLike),
        "The attack's \\glossterm{accuracy} increases by +2 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('works for spell.functionsLike', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'double_accuracy',
        rank: 1,
        functionsLike: { name: 'other spell' },
      };
      t.equal(
        spellScaling(spell as SpellLike),
        "The attack's \\glossterm{accuracy} increases by +2 for each rank beyond 1.",
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('should warn if there is neither spell.attack nor spell.functionsLike', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'double_accuracy',
        rank: 1,
      };
      t.equal(
        spellScaling(spell as SpellLike),
        "The attack's \\glossterm{accuracy} increases by +2 for each rank beyond 1.",
      );
      t.matchOnlyStrict(
        capturedWarnings,
        [['Spell Test Spell has double accuracy scaling, but does not make an attack.']],
      );
      t.end();
    });

    t.test('should warn if spell contains damage value', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'double_accuracy',
        rank: 1,
        effect: 'damagerankone',
        attack: { hit: 'deals damage', targeting: 'target' },
      };
      spellScaling(spell as SpellLike);
      t.matchOnlyStrict(
        capturedWarnings,
        [['Spell Test Spell has double accuracy scaling, but should probably have damage scaling']],
      );
      t.end();
    });

    t.end();
  });


  t.test('damage scaling', (t) => {
    t.test('should work with damagerankone', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'damage',
        rank: 1,
        effect: 'damagerankone',
      };
      t.equal(
        spellScaling(spell as SpellLike),
        'The damage increases by 1 for each rank beyond 1.',
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('should work with damageranktwolow', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'damage',
        rank: 1,
        effect: 'damageranktwolow',
      };
      t.equal(
        spellScaling(spell as SpellLike),
        'The damage increases by 1d6 for each rank beyond 1.',
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.test('should warn if unable to calculate damage scaling', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'damage',
        rank: 1,
        effect: 'no damage rank here',
      };
      t.equal(
        spellScaling(spell as SpellLike),
        'The damage increases by undefined for each rank beyond 1.',
      );
      t.matchOnlyStrict(capturedWarnings, [['Unable to calculate damage scaling for Test Spell']]);
      t.end();
    });

    t.end();
  });

  t.test('healing scaling', (t) => {
    t.test('should work with hprankone', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'healing',
        rank: 1,
        effect: 'hprankone',
      };
      t.equal(
        spellScaling(spell as SpellLike),
        'The healing increases by 1 for each rank beyond 1.',
      );
      t.end();
    });

    t.test('should work with hpranktwolow', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'healing',
        rank: 1,
        effect: 'hpranktwolow',
      };
      t.equal(
        spellScaling(spell as SpellLike),
        'The healing increases by 1d6 for each rank beyond 1.',
      );
      t.end();
    });

    t.test('should warn if unable to calculate healing scaling', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: 'healing',
        rank: 1,
        effect: 'no healing rank here',
      };
      t.equal(
        spellScaling(spell as SpellLike),
        'The healing increases by undefined for each rank beyond 1.',
      );
      t.matchOnlyStrict(capturedWarnings, [['Unable to calculate healing scaling for Test Spell']]);
      t.end();
    });

    t.end();
  });

  t.test('special scaling', (t) => {
    t.test('should return special text if spell.scaling.special is defined', (t) => {
      const spell: Partial<SpellLike> = {
        scaling: { special: 'Special scaling text.' },
      };
      t.equal(spellScaling(spell as SpellLike), 'Special scaling text.');
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.end();
  });

  t.test('object scaling', (t) => {
    // TODO: should this warn because the scaling doesn't reach all the way to rank 7?
    t.test('should format ranks correctly for object scaling', (t) => {
      const spell: Partial<SpellLike> = {
        scaling: {
          3: 'Effect at rank 3',
          5: 'Effect at rank 5',
        },
      };
      t.equal(
        spellScaling(spell as SpellLike),
        '\\rank{3} Effect at rank 3\n\\rank{5} Effect at rank 5',
      );
      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.end();
  });

  t.test('unrecognized scaling', (t) => {
    t.test('should throw an error for unrecognized scaling type', (t) => {
      const spell: Partial<SpellLike> = {
        name: 'Test Spell',
        scaling: true as any, // Invalid scaling type
      };
      t.throws(
        () => spellScaling(spell as SpellLike),
        new Error("Spell Test Spell has unrecognized scaling: 'true'"),
      );

      t.matchOnlyStrict(capturedWarnings, []);
      t.end();
    });

    t.end();
  });

  t.end();
});
