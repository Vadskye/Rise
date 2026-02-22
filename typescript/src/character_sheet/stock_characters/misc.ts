import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addMisc(stock: StockCharacters) {
  stock.addCharacter('Target Dummy', (c: Creature) => {
    c.setProperties({
      perception_at_creation: -100,
      constitution_at_creation: 90, // 90 from con, 10 from base calc = 100 total HP
      level: 1,
    });
  });

  stock.addCharacter('Target Dummy 1000', (c: Creature) => {
    c.setProperties({
      perception_at_creation: -100,
      constitution_at_creation: 990, // 1000 total HP
      level: 1,
    });
  });
}
