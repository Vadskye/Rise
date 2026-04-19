import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addRogues(stock: StockCharacters) {
  stock.addCharacter('Rogue', (c: Creature) => {
    c.setRequiredProperties({
      alignment: 'chaotic neutral',
      base_class: 'rogue',
      elite: false,
      creature_origin: 'natural',
      creature_type: 'humanoid',
      level: 1,
      size: 'medium',
    });
    c.setProperties({
      dexterity_at_creation: 3,
      perception_at_creation: 2,
      intelligence_at_creation: 2,
      constitution_at_creation: 1,
      strength_at_creation: 0,
      willpower_at_creation: 0,
    });
    c.addSneakAttack('smallswords');
    c.addWeaponMult('smallswords');
  });
}
