/**
 * TODO: Add support for extra damage to sheet_worker.ts and everywhere else

import { Creature } from '@src/character_sheet/creature';

// Use Freezing Staff as a baseline; it's unconditional extra damage.
export function implementModifiers(creature: Creature, rank: number) {
  const extraDamage = {
    2: '1',
    3: '1',
    4: '2',
    5: '1d4',
    6: '1d6',
    7: '1d8',
    8: '1d10',
  }[rank] || 0;
  if (!rank) {
    return;
  }
  creature.addCustomModifier({
    name: "Extra Damage Implement",
    statistic: "extra_damage",
    value: extraDamage,
  });
}
*/
