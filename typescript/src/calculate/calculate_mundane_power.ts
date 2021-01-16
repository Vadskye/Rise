import { MonsterBase } from "@src/monsters";
import { monsterPowerBonusByLevel } from ".";

export function calculateMundanePower({
  attributes,
  level,
  powerBonuses,
}: Pick<
  MonsterBase,
  "attributes" | "challengeRating" | "level" | "powerBonuses" | "startingAttributes"
>): number {
  const monsterBonus = monsterPowerBonusByLevel(level);
  return Math.floor((attributes.str ?? 0) / 2) + monsterBonus + (powerBonuses?.magical || 0);
}
