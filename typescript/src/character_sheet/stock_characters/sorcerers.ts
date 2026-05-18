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
  stock.addCharacter('Sorcerer 2', (c) => applySorcererBase(c, 2));
  stock.addCharacter('Sorcerer 5', (c) => applySorcererBase(c, 5));
  stock.addCharacter('Sorcerer 8', (c) => applySorcererBase(c, 8));
  stock.addCharacter('Sorcerer 11', (c) => applySorcererBase(c, 11));
  stock.addCharacter('Sorcerer 14', (c) => applySorcererBase(c, 14));
  stock.addCharacter('Sorcerer 17', (c) => applySorcererBase(c, 17));
  stock.addCharacter('Sorcerer 20', (c) => applySorcererBase(c, 20));
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
