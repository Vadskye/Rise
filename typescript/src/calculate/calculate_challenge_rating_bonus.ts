export function calculateChallengeRatingBonus(challengeRating: number): number {
  return Math.max(0, challengeRating - 1);
}
