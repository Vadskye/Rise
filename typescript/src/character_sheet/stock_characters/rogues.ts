import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';
import {
  combatTricksterModifiers,
  assassinModifiers,
  jackOfAllTradesModifiers,
} from '@src/classes/archetypes/rogue';

export function addRogues(stock: StockCharacters) {
  stock.addCharacter('Rogue', (c) => applyRogueBase(c, 1));
  stock.addCharacter('Rogue 2', (c) => applyRogueBase(c, 2));
  stock.addCharacter('Rogue 5', (c) => applyRogueBase(c, 5));
  stock.addCharacter('Rogue 8', (c) => applyRogueBase(c, 8));
  stock.addCharacter('Rogue 11', (c) => applyRogueBase(c, 11));
  stock.addCharacter('Rogue 14', (c) => applyRogueBase(c, 14));
  stock.addCharacter('Rogue 17', (c) => applyRogueBase(c, 17));
  stock.addCharacter('Rogue 20', (c) => applyRogueBase(c, 20));
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
  c.setEquippedArmor({ bodyArmor: 'buff leather' });
  c.addWeapon('smallswords');
  c.addWeaponMult('smallswords');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  combatTricksterModifiers(c, rank1);
  assassinModifiers(c, rank2);
  jackOfAllTradesModifiers(c, rank3);
}
