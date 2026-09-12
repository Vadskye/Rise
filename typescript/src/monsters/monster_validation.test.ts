import { test } from 'tap';
import { Creature } from '@src/character_sheet/creature';
import {
  checkValidMonster,
  formatShieldWithHeavyWeaponWarning,
  isShieldWithHeavyWeaponWarning,
} from './monster_validation';

function createBaseMonster(name: string = 'Test Monster'): Creature {
  const creature = Creature.new();
  creature.setProperties({ name });
  creature.setRequiredProperties({
    alignment: 'neutral',
    base_class: 'warrior',
    creature_origin: 'natural',
    creature_types: ['humanoid'],
    elite: false,
    level: 1,
    size: 'medium',
  });
  creature.setBaseAttributes([1, 1, 1, 0, 0, 0]);
  creature.setKnowledgeResults({ normal: 'Some knowledge' });
  creature.setEquippedArmorName({ bodyArmor: 'buff leather' });
  return creature;
}

test('monster_validation shield and heavy weapon checks', (t) => {
  t.test(
    'monster with shield and non-heavy weapon generates no shield+heavy weapon warning',
    (t) => {
      const creature = createBaseMonster();
      creature.setEquippedArmorName({ shield: 'standard shield' });
      creature.addWeapon('broadsword');
      creature.addManeuver('Steady Slam', { weapon: 'broadsword' });

      const { guidelines } = checkValidMonster(creature);
      const heavyWarnings = guidelines.filter((g) => isShieldWithHeavyWeaponWarning(g));
      t.equal(heavyWarnings.length, 0, 'No warning should be generated for broadsword and shield');
      t.end();
    },
  );

  t.test('monster with shield and greatsword generates guideline warning', (t) => {
    const creature = createBaseMonster();
    creature.setEquippedArmorName({ shield: 'standard shield' });
    creature.addWeapon('greatsword');
    creature.addManeuver('Steady Slam', { weapon: 'greatsword' });

    const { guidelines } = checkValidMonster(creature);
    const expectedWarning = formatShieldWithHeavyWeaponWarning('greatsword');
    t.ok(guidelines.includes(expectedWarning), 'Should contain shield with heavy weapon warning');
    t.ok(isShieldWithHeavyWeaponWarning(expectedWarning, 'greatsword'));
    t.end();
  });

  t.test('monster with greatsword but no shield generates no shield warning', (t) => {
    const creature = createBaseMonster();
    creature.addWeapon('greatsword');
    creature.addManeuver('Steady Slam', { weapon: 'greatsword' });

    const { guidelines } = checkValidMonster(creature);
    const heavyWarnings = guidelines.filter((g) => isShieldWithHeavyWeaponWarning(g));
    t.equal(heavyWarnings.length, 0, 'No warning when no shield is equipped');
    t.end();
  });

  t.test('monster with buckler and greataxe via setEquipment generates guideline warning', (t) => {
    const creature = createBaseMonster();
    creature.setEquipment(['buff leather', 'buckler', 'greataxe']);
    creature.addManeuver('Steady Slam', { weapon: 'greataxe' });

    const { guidelines } = checkValidMonster(creature);
    const expectedWarning = formatShieldWithHeavyWeaponWarning('greataxe');
    t.ok(guidelines.includes(expectedWarning), 'Should contain warning for buckler and greataxe');
    t.end();
  });

  t.end();
});
