import { MonsterBase } from "@src/monsters";

export function calculateHitPoints({
  challengeRating,
  startingAttributes,
}: Pick<MonsterBase, "challengeRating" | "startingAttributes">): number {
  const crMult = challengeRating <= 1 ? 0.5 : 1;
  return Math.floor((6 + startingAttributes.con) * crMult);
}
