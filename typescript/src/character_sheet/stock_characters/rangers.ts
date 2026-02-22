import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addRangers(stock: StockCharacters) {
  stock.addCharacter('Ranger', (c: Creature) => {
    c.setRequiredProperties({
      alignment: 'neutral good',
      base_class: 'ranger',
      elite: false,
      creature_type: 'mortal',
      level: 1,
      size: 'medium',
    });
    c.setProperties({
      perception_at_creation: 3,
      dexterity_at_creation: 2,
      strength_at_creation: 2,
      constitution_at_creation: 1,
      intelligence_at_creation: 0,
      willpower_at_creation: 0,
    });
    c.addWeaponMult('smallswords');
  });
}
