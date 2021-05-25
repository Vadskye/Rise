import { baseResistanceByLevel } from "@src/calculate/base_resistance_by_level";
import { MonsterBase } from "@src/monsters";

export function calculateDamageResistance({
  attributes,
  challengeRating,
  drBonus,
  level,
}: Pick<
  MonsterBase,
  "attributes" | "challengeRating" | "drBonus" | "level"
>): number {
  // Monters have 2x the level-based resistances of PCs
  const fromLevel = baseResistanceByLevel(level) * 2;
  const crMultiplier = {
    0.5: 0,
    1: 0,
    2: 1,
    3: 2,
    4: 4,
  }[challengeRating];
  return crMultiplier * (fromLevel + Math.floor((attributes.con || 0) / 2)) + drBonus;
}
