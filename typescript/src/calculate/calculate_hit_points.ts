import { MonsterBase } from "@src/monsters";

export function calculateHitPoints({
  challengeRating,
  startingAttributes,
}: Pick<MonsterBase, "challengeRating" | "startingAttributes">): number {
  const crMult = {
    0.5: 0,
    1: 0.5,
    2: 1,
    3: 2,
    4: 4,
  }[challengeRating];
  return Math.floor((9 + (startingAttributes.con ?? 0)) * crMult);
}
