import type { StockCharacters } from '../stock_characters';
import { Creature } from '../creature';
import { getArchetypeRanks } from '@src/classes/archetypes/apply_archetypes';
import {
  pactMagicModifiers,
  covenantKeeperModifiers,
  pactSpellMasteryModifiers,
} from '@src/classes/archetypes/votive';

export function addVotives(stock: StockCharacters) {
  stock.addCharacter('Votive', (c) => applyVotiveBase(c, 1));
  for (let level = 1; level <= 21; level++) {
    stock.addCharacter(`Votive ${level}`, (c) => applyVotiveBase(c, level));
  }
}

function applyVotiveBase(c: Creature, level: number) {
  c.setRequiredProperties({
    alignment: 'neutral',
    base_class: 'votive',
    elite: false,
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: level,
    size: 'medium',
  });
  c.setProperties({
    strength_at_creation: 3,
    willpower_at_creation: 2,
    perception_at_creation: 2,
    constitution_at_creation: 1,
    dexterity_at_creation: 0,
    intelligence_at_creation: 0,
  });
  c.setEquippedArmorName({ bodyArmor: 'scale', shield: 'standard shield' });
  c.setEquippedArmorEffects({ bodyArmor: 'scale', shield: 'standard shield' });
  c.addWeapon('broadsword');
  c.addWeaponMult('broadsword');

  const [rank1, rank2, rank3] = getArchetypeRanks(level);

  pactMagicModifiers(c, rank1);
  pactSpellMasteryModifiers(c, rank2);
  covenantKeeperModifiers(c, rank3);
}
