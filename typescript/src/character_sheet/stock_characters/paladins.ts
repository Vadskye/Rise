import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';
import {
  divineMagicModifiers,
  devotedParagonModifiers,
  stalwartGuardianModifiers,
} from '@src/classes/archetypes/paladin';

export function addPaladins(stock: StockCharacters) {
  stock.addCharacter('Paladin', (c) => applyPaladinBase(c, 1));
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Paladin ${level}`, (c) => applyPaladinBase(c, level));
  }
}

function applyPaladinBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'lawful good',
    base_class: 'paladin',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    strength_at_creation: 3,
    willpower_at_creation: 2,
    constitution_at_creation: 2,
    perception_at_creation: 1,
    dexterity_at_creation: 0,
    intelligence_at_creation: 0,
  });
  // TODO: add smite
  c.setEquippedArmorName({ bodyArmor: 'breastplate' });
  c.setEquippedArmorEffects({ bodyArmor: 'breastplate' });
  c.addWeapon('greatsword');
  c.addWeaponMult('greatsword');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  divineMagicModifiers(c, rank1);
  stalwartGuardianModifiers(c, rank2);
  devotedParagonModifiers(c, rank3);
}
