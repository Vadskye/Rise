import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addPaladins(stock: StockCharacters) {
  stock.addCharacter('Paladin', (c: Creature) => {
    c.setRequiredProperties({
      alignment: 'lawful good',
      base_class: 'paladin',
      elite: false,
      creature_origin: 'natural',
      creature_type: 'humanoid',
      level: 1,
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
    c.addWeaponMult('greatsword');
  });
}
