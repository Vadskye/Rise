import { StockCharacters } from '../stock_characters';

export function addFighters(stock: StockCharacters) {
  stock.addCharacter('Fighter', (c) => {
    c.setRequiredProperties({
      alignment: 'lawful neutral',
      base_class: 'fighter',
      elite: false,
      creature_origin: 'natural',
      creature_type: 'humanoid',
      level: 1,
      size: 'medium',
    });
    c.setProperties({
      strength_at_creation: 3,
      dexterity_at_creation: 2,
      constitution_at_creation: 2,
      perception_at_creation: 1,
      intelligence_at_creation: 0,
      willpower_at_creation: 0,
    });
    c.setEquippedArmor({ shield: 'standard shield' });
    c.addWeaponMult('broadsword');
  });
}
