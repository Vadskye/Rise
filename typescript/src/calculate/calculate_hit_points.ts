import { MonsterBase } from "@src/monsters";

export function calculateHitPoints({
  challengeRating,
  startingAttributes,
}: Pick<MonsterBase, "challengeRating" | "startingAttributes">): number {
  const crMult = challengeRating === 0.5 ? 0.5 : 1;
  return (6 + startingAttributes.con) * crMult;
}
