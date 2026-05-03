import t from 'tap';
import { Creature } from './creature';

t.test('creature type overrides origin traits', (t) => {
  const creature = Creature.new();
  // Undead origin normally has 'corporeal'
  // Ghost type has 'incorporeal'
  // Ghost should override Undead, resulting in 'incorporeal' (and NO 'corporeal')
  creature.setRequiredProperties({
    alignment: 'neutral',
    base_class: 'hybrid',
    creature_origin: 'undead',
    creature_type: 'ghost',
    elite: false,
    level: 1,
    size: 'medium',
  });

  const traits = creature.getStandardTraits();
  t.ok(traits.includes('incorporeal'), 'Should have incorporeal');
  t.notOk(traits.includes('corporeal'), 'Should NOT have corporeal');
  t.end();
});

t.test('individual monster overrides type/origin traits', (t) => {
  const creature = Creature.new();
  // Add incorporeal explicitly
  creature.addTrait('incorporeal');

  // Set as natural origin animal type (normally both would imply corporeal)
  creature.setRequiredProperties({
    alignment: 'neutral',
    base_class: 'hybrid',
    creature_origin: 'natural',
    creature_type: 'animal',
    elite: false,
    level: 1,
    size: 'medium',
  });

  const traits = creature.getStandardTraits();
  t.ok(traits.includes('incorporeal'), 'Should have incorporeal');
  t.notOk(traits.includes('corporeal'), 'Should NOT have corporeal (overridden by individual)');
  t.end();
});

t.test('vampires (undead humanoids) get both origin and type traits', (t) => {
  const creature = Creature.new();
  // Undead origin: bloodless, corporeal, dynamic, immortal, nonliving
  // Humanoid type: ensouled
  // No conflicts here, so it should have all of them.
  creature.setRequiredProperties({
    alignment: 'neutral evil',
    base_class: 'hybrid',
    creature_origin: 'undead',
    creature_type: 'humanoid',
    elite: false,
    level: 5,
    size: 'medium',
  });

  const traits = creature.getStandardTraits();
  t.ok(traits.includes('bloodless'), 'Should have bloodless (from undead)');
  t.ok(traits.includes('ensouled'), 'Should have ensouled (from humanoid)');
  t.ok(traits.includes('immortal'), 'Should have immortal (from undead)');
  t.ok(traits.includes('nonliving'), 'Should have nonliving (from undead)');
  t.ok(traits.includes('corporeal'), 'Should have corporeal (from undead)');
  t.end();
});
