import { DefenseType, MonsterType } from "@src/data";

// Like PCs, monster defense bonuses should sum to 15.
// Monster defense bonuses are generally more balanced than PC defense bonuses.
export function defenseBonusesByMonsterType(monsterType: MonsterType): Record<DefenseType, number> {
  return {
    "humanoid": {
      armor: 1,
      fortitude: 6,
      reflex: 6,
      mental: 6,
    },
    "magical beast": {
      armor: 1,
      fortitude: 7,
      reflex: 6,
      mental: 5,
    },
    "monstrous humanoid": {
      armor: 1,
      fortitude: 7,
      reflex: 5,
      mental: 6,
    },
    "planeforged": {
      armor: 1,
      fortitude: 6,
      reflex: 6,
      mental: 6,
    },
    "undead": {
      armor: 2,
      fortitude: 4,
      reflex: 5,
      mental: 7,
    },
  }[monsterType];
}
