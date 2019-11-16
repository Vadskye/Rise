import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus } from "./calculate_challenge_rating_bonus";
import { monsterBonusByLevel } from "./monster_bonus_by_level";

export function calculateAccuracy({
  accuracyBonus,
  challengeRating,
  level,
  attributes,
}: Pick<MonsterBase, "accuracyBonus" | "attributes" | "challengeRating" | "level">): number {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  const monsterBonus = monsterBonusByLevel(level);
  return (
    Math.max(level, attributes.per ?? 0) +
    accuracyBonus +
    monsterBonus +
    crBonus +
    Math.min(0, attributes.per ?? 0)
  );
}
