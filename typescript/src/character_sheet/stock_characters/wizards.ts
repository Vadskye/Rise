import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addWizards(stock: StockCharacters) {
  stock.addCharacter('Wizard', (c: Creature) => {
    c.setRequiredProperties({
      alignment: 'lawful good',
      base_class: 'wizard',
      elite: false,
      creature_origin: 'natural',
      creature_type: 'humanoid',
      level: 1,
      size: 'medium',
    });
    c.setProperties({
      intelligence_at_creation: 3,
      perception_at_creation: 2,
      willpower_at_creation: 2,
      constitution_at_creation: 1,
      strength_at_creation: 0,
      dexterity_at_creation: 0,
    });
    c.setEquippedArmor({ bodyArmor: 'mage armor' });
  });
}
