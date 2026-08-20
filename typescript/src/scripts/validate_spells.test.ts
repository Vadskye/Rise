import t from 'tap';
import { main } from './validate_spells';

t.test('validate_spells script', (t) => {
  t.test('should validate a specific sphere case-insensitively', (t) => {
    // Should not throw when valid sphere is specified
    t.doesNotThrow(() => {
      main({ runDesign: true, sphere: 'Pyromancy' });
    });
    t.doesNotThrow(() => {
      main({ runRoles: true, sphere: 'aeromancy' });
    });
    t.doesNotThrow(() => {
      main({ runExtraDamage: true, runComparative: true, sphere: 'Cryomancy' });
    });
    t.end();
  });

  t.test('should throw an error for an unknown mystic sphere', (t) => {
    t.throws(
      () => {
        main({ runDesign: true, sphere: 'NonExistentSphere' });
      },
      {
        message: /Unknown mystic sphere "NonExistentSphere"/,
      },
    );
    t.end();
  });

  t.test('should validate all mystic spheres when no sphere is specified', (t) => {
    t.doesNotThrow(() => {
      main({ runDesign: true, runRoles: true });
    });
    t.end();
  });

  t.end();
});
