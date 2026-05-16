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
  stock.addCharacter('Druid 2', (c) => applyDruidBase(c, 2));
  stock.addCharacter('Druid 5', (c) => applyDruidBase(c, 5));
  stock.addCharacter('Druid 8', (c) => applyDruidBase(c, 8));
  stock.addCharacter('Druid 11', (c) => applyDruidBase(c, 11));
  stock.addCharacter('Druid 14', (c) => applyDruidBase(c, 14));
  stock.addCharacter('Druid 17', (c) => applyDruidBase(c, 17));
  stock.addCharacter('Druid 20', (c) => applyDruidBase(c, 20));
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
  c.setEquippedArmor({ bodyArmor: 'buff leather', shield: 'standard shield' });
  c.addWeapon('sickle');
  c.addWeaponMult('sickle');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  natureMagicModifiers(c, rank1);
  natureSpellMasteryModifiers(c, rank2);
  elementalistModifiers(c, rank3);
}
