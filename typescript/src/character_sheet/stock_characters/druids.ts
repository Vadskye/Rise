import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';
import {
  natureMagicModifiers,
  elementalistModifiers,
  natureSpellMasteryModifiers,
} from '@src/classes/archetypes/druid';

export function addDruids(stock: StockCharacters) {
  stock.addCharacter('Druid', (c) => applyDruidBase(c, 1));
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Druid ${level}`, (c) => applyDruidBase(c, level));
  }
}

function applyDruidBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'neutral',
    base_class: 'druid',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
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
  c.setEquippedArmorName({ bodyArmor: 'buff leather', shield: 'standard shield' });
  c.setEquippedArmorEffects({ bodyArmor: 'buff leather', shield: 'standard shield' });
  c.addWeapon('sickle');
  c.addWeaponMult('sickle');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  natureMagicModifiers(c, rank1);
  natureSpellMasteryModifiers(c, rank2);
  elementalistModifiers(c, rank3);
}
