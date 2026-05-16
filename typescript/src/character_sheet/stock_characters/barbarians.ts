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
  stock.addCharacter('Barbarian 4', (c) => applyBarbarianBase(c, 4));
  stock.addCharacter('Barbarian 7', (c) => applyBarbarianBase(c, 7));
  stock.addCharacter('Barbarian 10', (c) => applyBarbarianBase(c, 10));
  stock.addCharacter('Barbarian 13', (c) => applyBarbarianBase(c, 13));
  stock.addCharacter('Barbarian 16', (c) => applyBarbarianBase(c, 16));
  stock.addCharacter('Barbarian 19', (c) => applyBarbarianBase(c, 19));
  stock.addCharacter('Barbarian 21', (c) => applyBarbarianBase(c, 21));
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
  c.setEquippedArmor({ bodyArmor: 'scale' });
  c.addWeapon('greataxe');
  c.addWeaponMult('greataxe');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  primalWarriorModifiers(c, rank1);
  battleforgedResilienceModifiers(c, rank2);
  outlandSavageModifiers(c, rank3);
}
