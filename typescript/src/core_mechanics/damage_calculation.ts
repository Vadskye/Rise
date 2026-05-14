import { ActiveAbility } from '@src/abilities/active_abilities';
import { Creature } from '@src/character_sheet/creature';
import { DamageScaling } from '@src/core_mechanics/damage_scaling';
import { DicePool } from '@src/core_mechanics/dice_pool';

export type DamageRank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export function parseDamageRank(rankText: string): DamageRank {
  const rank = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  }[rankText.toLowerCase()];
  if (rank === undefined) {
    throw new Error(`Unable to parse damage rank '${rankText}'`);
  }

  return rank as DamageRank;
}

// Calculate damage for a non-strike ability (spells, etc.) based on the damage rank,
// the creature's power, and the excess rank from scaling. Despite the name, the exact
// same calculations are used for both HP and damage, so this handles both.
export function calculateDamage(
  monster: Creature,
  ability: ActiveAbility,
  damageRank: DamageRank,
  lowPowerScaling: boolean,
): DicePool {
  const excessRank = Math.max(0, monster.calculateRank() - ability.rank);
  const scaling = lowPowerScaling ? DamageScaling.drl(damageRank) : DamageScaling.dr(damageRank);
  const relevantPower = monster.getRelevantPower(ability.isMagical);

  return scaling.scaledPool(relevantPower, excessRank);
}
