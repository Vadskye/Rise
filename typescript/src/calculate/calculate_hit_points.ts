import { MonsterBase } from "@src/monsters";

export function calculateHitPoints(monster: Pick<MonsterBase, "startingAttributes">): number {
  return 6 + monster.startingAttributes.con;
}
