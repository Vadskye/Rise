import { DefenseType, MonsterType } from "@src/data";

// Like PCs, monster defense bonuses should sum to 15.
// Monster defense bonuses are generally more balanced than PC defense bonuses.
export function defenseBonusesByMonsterType(monsterType: MonsterType): Record<DefenseType, number> {
  return {
    "undead": {
      armor: 2,
      fortitude: 4,
      reflex: 5,
      mental: 7,
    },
  }[monsterType];
}
