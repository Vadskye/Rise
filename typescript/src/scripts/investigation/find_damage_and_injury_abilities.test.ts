import tap from 'tap';
import {
  extractInjuryRiders,
  findDamageAndInjuryAbilities,
} from './find_damage_and_injury_abilities';

tap.test('find_damage_and_injury_abilities', async (t) => {
  t.test(
    'extractInjuryRiders extracts buffs, debuffs, movement, and special effects',
    async (t) => {
      t.same(extractInjuryRiders(''), []);
      t.same(extractInjuryRiders('The target bleeds for \\damagerankone.'), []);
      t.same(extractInjuryRiders('The target is \\briefly \\dazed.'), ['debuff:dazed']);
      t.same(extractInjuryRiders('You are \\briefly \\empowered.'), ['buff:empowered']);
      t.same(extractInjuryRiders('You fling the target up to 15 feet vertically.'), [
        'movement:fling',
      ]);
      t.same(
        extractInjuryRiders(
          'The target is \\glossterm{briefly} \\dazzled, and it suffers consequences as if it had been struck by a beam of natural sunlight.',
        ),
        ['debuff:dazzled', 'special:sunlight'],
      );
    },
  );

  t.test('findDamageAndInjuryAbilities categorizes known benchmark spells correctly', async (t) => {
    const results = findDamageAndInjuryAbilities();
    t.ok(results.length > 0, 'Should find damaging abilities with injury riders');

    const drainLife = results.find((r) => r.name === 'Drain Life');
    t.ok(drainLife, 'Drain Life should be found');
    t.equal(drainLife?.category, 'free', 'Drain Life should be categorized as free');

    const solarRay = results.find((r) => r.name === 'Solar Ray');
    t.ok(solarRay, 'Solar Ray should be found');
    t.equal(solarRay?.category, 'free', 'Solar Ray should be categorized as free');

    const kineticCudgel = results.find((r) => r.name === 'Kinetic Cudgel');
    t.ok(kineticCudgel, 'Kinetic Cudgel should be found');
    t.equal(kineticCudgel?.category, 'reduced', 'Kinetic Cudgel should be categorized as reduced');

    const ventus = results.find((r) => r.name === 'Conjoined Conjuration -- Ventus');
    t.ok(ventus, 'Ventus should be found');
    t.equal(ventus?.category, 'reduced', 'Ventus should be categorized as reduced');

    const geyser = results.find((r) => r.name === 'Geyser');
    t.ok(geyser, 'Geyser should be found');
    t.equal(geyser?.category, 'heavy_reduction', 'Geyser should be categorized as heavy_reduction');
  });
});
