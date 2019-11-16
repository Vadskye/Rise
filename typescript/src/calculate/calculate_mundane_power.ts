import { MonsterBase } from "@src/monsters";
import { calculateChallengeRatingBonus } from "./calculate_challenge_rating_bonus";

export function calculateMundanePower({
  attributes,
  challengeRating,
  level,
}: Pick<MonsterBase, "attributes" | "challengeRating" | "level">) {
  const crBonus = calculateChallengeRatingBonus(challengeRating);
  return Math.max(attributes.str ?? 0, level) + crBonus;
}
