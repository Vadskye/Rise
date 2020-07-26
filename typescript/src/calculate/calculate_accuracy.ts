import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus } from "./calculate_challenge_rating_bonus";

export function calculateAccuracy({
  accuracyBonus,
  challengeRating,
  level,
  attributes,
}: Pick<MonsterBase, "accuracyBonus" | "attributes" | "challengeRating" | "level">): number {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  return (
    Math.max(level, attributes.per ?? 0) +
    accuracyBonus +
    crBonus +
    Math.min(0, attributes.per ?? 0)
  );
}
