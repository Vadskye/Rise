import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addPaladins(stock: StockCharacters) {
  stock.addCharacter('Paladin', (c) => applyPaladinBase(c, 1));
  stock.addCharacter('Paladin 2', (c) => applyPaladinBase(c, 2));
  stock.addCharacter('Paladin 5', (c) => applyPaladinBase(c, 5));
  stock.addCharacter('Paladin 8', (c) => applyPaladinBase(c, 8));
  stock.addCharacter('Paladin 11', (c) => applyPaladinBase(c, 11));
  stock.addCharacter('Paladin 14', (c) => applyPaladinBase(c, 14));
  stock.addCharacter('Paladin 17', (c) => applyPaladinBase(c, 17));
  stock.addCharacter('Paladin 20', (c) => applyPaladinBase(c, 20));
}

function applyPaladinBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'lawful good',
    base_class: 'paladin',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    strength_at_creation: 3,
    willpower_at_creation: 2,
    constitution_at_creation: 2,
    perception_at_creation: 1,
    dexterity_at_creation: 0,
    intelligence_at_creation: 0,
  });
  // TODO: add smite
  c.setEquippedArmor({ bodyArmor: 'breastplate' });
  c.addWeapon('greatsword');
  c.addWeaponMult('greatsword');
}
