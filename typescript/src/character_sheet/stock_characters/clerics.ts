import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';
import {
  divineMagicModifiers,
  divineSpellMasteryModifiers,
  domainInfluenceModifiers,
} from '@src/classes/archetypes/cleric';

export function addClerics(stock: StockCharacters) {
  stock.addCharacter('Cleric', (c) => applyClericBase(c, 1));
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Cleric ${level}`, (c) => applyClericBase(c, level));
  }
}

function applyClericBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'lawful good',
    base_class: 'cleric',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    willpower_at_creation: 3,
    perception_at_creation: 2,
    strength_at_creation: 2,
    constitution_at_creation: 1,
    dexterity_at_creation: 0,
    intelligence_at_creation: 0,
  });
  c.setEquippedArmorName({ bodyArmor: 'scale', shield: 'standard shield' });
  c.setEquippedArmorEffects({ bodyArmor: 'scale', shield: 'standard shield' });
  c.addWeapon('battleaxe');
  c.addWeaponMult('battleaxe');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  divineMagicModifiers(c, rank1);
  divineSpellMasteryModifiers(c, rank2);
  domainInfluenceModifiers(c, rank3);
}
