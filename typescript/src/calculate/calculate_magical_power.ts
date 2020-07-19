import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus, monsterPowerBonusByLevel } from ".";

export function calculateMagicalPower({
  attributes,
  challengeRating,
  level,
  powerBonuses,
}: Pick<MonsterBase, "attributes" | "challengeRating" | "level" | "powerBonuses">) {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  const monsterBonus = monsterPowerBonusByLevel(level);
  return (
    Math.max(attributes.wil ?? 0, level) + crBonus * monsterBonus + (powerBonuses?.magical || 0)
  );
}
