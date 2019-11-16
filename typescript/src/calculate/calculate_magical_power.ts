import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus } from "./calculate_challenge_rating_bonus";

export function calculateMagicalPower({
  attributes,
  challengeRating,
  level,
}: Pick<MonsterBase, "attributes" | "challengeRating" | "level">) {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  return Math.max(attributes.wil ?? 0, level) + crBonus;
}
