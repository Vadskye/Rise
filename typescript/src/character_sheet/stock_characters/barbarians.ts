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
  stock.addCharacter('Barbarian 2', (c) => applyBarbarianBase(c, 2));
  stock.addCharacter('Barbarian 5', (c) => applyBarbarianBase(c, 5));
  stock.addCharacter('Barbarian 8', (c) => applyBarbarianBase(c, 8));
  stock.addCharacter('Barbarian 11', (c) => applyBarbarianBase(c, 11));
  stock.addCharacter('Barbarian 14', (c) => applyBarbarianBase(c, 14));
  stock.addCharacter('Barbarian 17', (c) => applyBarbarianBase(c, 17));
  stock.addCharacter('Barbarian 20', (c) => applyBarbarianBase(c, 20));
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
