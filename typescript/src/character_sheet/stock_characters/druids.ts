import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addDruids(stock: StockCharacters) {
  stock.addCharacter('Druid', (c: Creature) => {
    c.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'druid',
      elite: false,
      creature_origin: 'natural',
      creature_type: 'humanoid',
      level: 1,
      size: 'medium',
    });
    c.setProperties({
      willpower_at_creation: 3,
      perception_at_creation: 2,
      constitution_at_creation: 2,
      strength_at_creation: 1,
      dexterity_at_creation: 0,
      intelligence_at_creation: 0,
    });
    c.setEquippedArmor({ shield: 'standard shield' });
    c.addWeaponMult('sickle');
  });
}
