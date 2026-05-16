import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addPaladins(stock: StockCharacters) {
  stock.addCharacter('Paladin', (c) => applyPaladinBase(c, 1));
  stock.addCharacter('Paladin 4', (c) => applyPaladinBase(c, 4));
  stock.addCharacter('Paladin 7', (c) => applyPaladinBase(c, 7));
  stock.addCharacter('Paladin 10', (c) => applyPaladinBase(c, 10));
  stock.addCharacter('Paladin 13', (c) => applyPaladinBase(c, 13));
  stock.addCharacter('Paladin 16', (c) => applyPaladinBase(c, 16));
  stock.addCharacter('Paladin 19', (c) => applyPaladinBase(c, 19));
  stock.addCharacter('Paladin 21', (c) => applyPaladinBase(c, 21));
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
