import { MonsterBase } from "@src/monsters";
import { monsterAccuracyBonusByLevel } from ".";
import { calculateChallengeRatingBonus } from "./calculate_challenge_rating_bonus";

export function calculateAccuracy({
  accuracyBonus,
  challengeRating,
  level,
  startingAttributes,
}: Pick<
  MonsterBase,
  "accuracyBonus" | "challengeRating" | "level" | "startingAttributes"
>): number {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  const levelScaling = monsterAccuracyBonusByLevel(level);
  return (
    level + Math.floor((startingAttributes.per ?? 0) / 2), accuracyBonus + crBonus + levelScaling
  );
}
