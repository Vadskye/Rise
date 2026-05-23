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
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Rogue ${level}`, (c) => applyRogueBase(c, level));
  }
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
  c.setEquippedArmorName({ bodyArmor: 'buff leather' });
  c.setEquippedArmorEffects({ bodyArmor: 'buff leather' });
  c.addWeapon('smallswords');
  c.addWeaponMult('smallswords');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  combatTricksterModifiers(c, rank1);
  assassinModifiers(c, rank2);
  jackOfAllTradesModifiers(c, rank3);
}
