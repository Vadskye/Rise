import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addSorcerers(stock: StockCharacters) {
  stock.addCharacter('Sorcerer', (c: Creature) => {
    c.setRequiredProperties({
      alignment: 'chaotic neutral',
      base_class: 'sorcerer',
      elite: false,
      creature_origin: 'natural',
      creature_type: 'humanoid',
      level: 1,
      size: 'medium',
    });
    c.setProperties({
      willpower_at_creation: 3,
      constitution_at_creation: 2,
      perception_at_creation: 2,
      dexterity_at_creation: 1,
      strength_at_creation: 0,
      intelligence_at_creation: 0,
    });
    c.setEquippedArmor({ bodyArmor: 'mage armor' });
  });
}
