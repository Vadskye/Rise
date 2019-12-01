import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus, monsterPowerBonusByLevel } from ".";

export function calculateMundanePower({
  attributes,
  challengeRating,
  level,
}: Pick<MonsterBase, "attributes" | "challengeRating" | "level">) {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  const monsterBonus = monsterPowerBonusByLevel(level);
  return Math.max(attributes.str ?? 0, level) + crBonus + monsterBonus;
}
