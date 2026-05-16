import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addSorcerers(stock: StockCharacters) {
  stock.addCharacter('Sorcerer', (c) => applySorcererBase(c, 1));
  stock.addCharacter('Sorcerer 4', (c) => applySorcererBase(c, 4));
  stock.addCharacter('Sorcerer 7', (c) => applySorcererBase(c, 7));
  stock.addCharacter('Sorcerer 10', (c) => applySorcererBase(c, 10));
  stock.addCharacter('Sorcerer 13', (c) => applySorcererBase(c, 13));
  stock.addCharacter('Sorcerer 16', (c) => applySorcererBase(c, 16));
  stock.addCharacter('Sorcerer 19', (c) => applySorcererBase(c, 19));
  stock.addCharacter('Sorcerer 21', (c) => applySorcererBase(c, 21));
}

function applySorcererBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'chaotic neutral',
    base_class: 'sorcerer',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
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
}
