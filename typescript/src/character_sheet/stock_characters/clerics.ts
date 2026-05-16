import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addClerics(stock: StockCharacters) {
  stock.addCharacter('Cleric', (c) => applyClericBase(c, 1));
  stock.addCharacter('Cleric 2', (c) => applyClericBase(c, 2));
  stock.addCharacter('Cleric 5', (c) => applyClericBase(c, 5));
  stock.addCharacter('Cleric 8', (c) => applyClericBase(c, 8));
  stock.addCharacter('Cleric 11', (c) => applyClericBase(c, 11));
  stock.addCharacter('Cleric 14', (c) => applyClericBase(c, 14));
  stock.addCharacter('Cleric 17', (c) => applyClericBase(c, 17));
  stock.addCharacter('Cleric 20', (c) => applyClericBase(c, 20));
}

function applyClericBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'lawful good',
    base_class: 'cleric',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    willpower_at_creation: 3,
    perception_at_creation: 2,
    strength_at_creation: 2,
    constitution_at_creation: 1,
    dexterity_at_creation: 0,
    intelligence_at_creation: 0,
  });
  c.setEquippedArmor({ bodyArmor: 'scale', shield: 'standard shield' });
  c.addWeapon('battleaxe');
  c.addWeaponMult('battleaxe');
}
