import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';
import {
  arcaneMagicModifiers,
  draconicMagicModifiers,
  innateArcanistModifiers,
} from '@src/classes/archetypes/sorcerer';

export function addSorcerers(stock: StockCharacters) {
  stock.addCharacter('Sorcerer', (c) => applySorcererBase(c, 1));
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Sorcerer ${level}`, (c) => applySorcererBase(c, level));
  }
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
  c.setEquippedArmorName({ bodyArmor: 'mage armor' });
  c.setEquippedArmorEffects({ bodyArmor: 'mage armor' });

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  arcaneMagicModifiers(c, rank1);
  draconicMagicModifiers(c, rank2);
  innateArcanistModifiers(c, rank3);
}
