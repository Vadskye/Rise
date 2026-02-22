import { Creature } from '@src/character_sheet/creature';
import { ActiveAbility } from '@src/abilities';
import {
  calculateStrikeDamage as calculateStrikeDamageInternal,
  standardizeModifierSign as standardizeModifierSignInternal,
} from '@src/latex/monsters/player_abilities';

// LaTeX can represent modifier signs with '\\minus' or '\\plus' instead of '-' or '+'.
export function standardizeModifierSign(latexModifierSign: string): '-' | '+' {
  return standardizeModifierSignInternal(latexModifierSign);
}

// We need an explicit `isMagical` here because some magical abilities make mundane
// strikes.
export function calculateStrikeDamage(
  monster: Creature,
  ability: ActiveAbility,
  isMagical: boolean,
): string {
  return calculateStrikeDamageInternal(monster, ability, isMagical);
}
