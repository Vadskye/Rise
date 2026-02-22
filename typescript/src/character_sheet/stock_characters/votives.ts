import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addVotives(stock: StockCharacters) {
  stock.addCharacter('Votive', (c: Creature) => {
    c.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'votive',
      elite: false,
      creature_type: 'mortal',
      level: 1,
      size: 'medium',
    });
    c.setProperties({
      strength_at_creation: 3,
      willpower_at_creation: 2,
      perception_at_creation: 2,
      constitution_at_creation: 1,
      dexterity_at_creation: 0,
      intelligence_at_creation: 0,
    });
    c.setEquippedArmor({ shield: 'standard shield' });
    c.addWeaponMult('broadsword');
  });
}
