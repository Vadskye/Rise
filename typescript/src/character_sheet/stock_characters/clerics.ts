import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addClerics(stock: StockCharacters) {
  stock.addCharacter('Cleric', (c) => applyClericBase(c, 1));
  stock.addCharacter('Cleric 4', (c) => applyClericBase(c, 4));
  stock.addCharacter('Cleric 7', (c) => applyClericBase(c, 7));
  stock.addCharacter('Cleric 10', (c) => applyClericBase(c, 10));
  stock.addCharacter('Cleric 13', (c) => applyClericBase(c, 13));
  stock.addCharacter('Cleric 16', (c) => applyClericBase(c, 16));
  stock.addCharacter('Cleric 19', (c) => applyClericBase(c, 19));
  stock.addCharacter('Cleric 21', (c) => applyClericBase(c, 21));
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
