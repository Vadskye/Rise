import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';

export function addRogues(stock: StockCharacters) {
  stock.addCharacter('Rogue', (c) => applyRogueBase(c, 1));
  stock.addCharacter('Rogue 4', (c) => applyRogueBase(c, 4));
  stock.addCharacter('Rogue 7', (c) => applyRogueBase(c, 7));
  stock.addCharacter('Rogue 10', (c) => applyRogueBase(c, 10));
  stock.addCharacter('Rogue 13', (c) => applyRogueBase(c, 13));
  stock.addCharacter('Rogue 16', (c) => applyRogueBase(c, 16));
  stock.addCharacter('Rogue 19', (c) => applyRogueBase(c, 19));
  stock.addCharacter('Rogue 21', (c) => applyRogueBase(c, 21));
}

function applyRogueBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'chaotic neutral',
    base_class: 'rogue',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
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
  c.setEquippedArmor({ bodyArmor: 'buff leather' });
  c.addWeapon('smallswords');
  c.addWeaponMult('smallswords');
}
