import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import {
  battleforgedResilienceModifiers,
  outlandSavageModifiers,
  primalWarriorModifiers,
} from '@src/classes/archetypes/barbarian';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';

export function addBarbarians(stock: StockCharacters) {
  stock.addCharacter('Barbarian', (c) => applyBarbarianBase(c, 1));
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Barbarian ${level}`, (c) => applyBarbarianBase(c, level));
  }
}

function applyBarbarianBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'chaotic neutral',
    base_class: 'barbarian',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    strength_at_creation: 3,
    constitution_at_creation: 2,
    dexterity_at_creation: 2,
    perception_at_creation: 1,
    intelligence_at_creation: 0,
    willpower_at_creation: 0,
  });
  c.setEquippedArmorName({ bodyArmor: 'scale' });
  c.setEquippedArmorEffects({ bodyArmor: 'scale' });
  c.addWeapon('greataxe');
  c.addWeaponMult('greataxe');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  primalWarriorModifiers(c, rank1);
  battleforgedResilienceModifiers(c, rank2);
  outlandSavageModifiers(c, rank3);
}
