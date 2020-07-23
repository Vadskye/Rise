import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus, monsterPowerBonusByLevel } from ".";

export function calculateMundanePower({
  challengeRating,
  level,
  powerBonuses,
  startingAttributes,
}: Pick<MonsterBase, "challengeRating" | "level" | "powerBonuses" | "startingAttributes">) {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  const monsterBonus = monsterPowerBonusByLevel(level);
  return (
    level + (startingAttributes.str ?? 0) + crBonus * monsterBonus + (powerBonuses?.magical || 0)
  );
}
