import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus, monsterPowerBonusByLevel } from ".";

export function calculateMundanePower({
  attributes,
  challengeRating,
  level,
  powerBonuses,
}: Pick<MonsterBase, "attributes" | "challengeRating" | "level" | "powerBonuses">) {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  const monsterBonus = monsterPowerBonusByLevel(level);
  return (
    Math.max(attributes.str ?? 0, level) + crBonus + monsterBonus + (powerBonuses?.mundane || 0)
  );
}
