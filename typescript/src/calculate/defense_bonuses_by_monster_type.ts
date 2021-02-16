import { DefenseType } from "@src/data";
import { MonsterType } from "@src/monsters/types";

// Like PCs, monster defense bonuses should sum to 15.
// Monster defense bonuses are generally more balanced than PC defense bonuses.
export function defenseBonusesByMonsterType(monsterType: MonsterType): Record<DefenseType, number> {
  return {
    "aberration": {
      armor: 1,
      fortitude: 4,
      reflex: 4,
      mental: 5,
    },
    "animal": {
      armor: 1,
      fortitude: 5,
      reflex: 5,
      mental: 3,
    },
    "animate": {
      armor: 1,
      fortitude: 5,
      reflex: 4,
      mental: 4,
    },
    "dragon": {
      armor: 2,
      fortitude: 4,
      reflex: 3,
      mental: 5,
    },
    "humanoid": {
      armor: 1,
      fortitude: 4,
      reflex: 4,
      mental: 5,
    },
    "magical beast": {
      armor: 1,
      fortitude: 5,
      reflex: 5,
      mental: 3,
    },
    "monstrous humanoid": {
      armor: 1,
      fortitude: 4,
      reflex: 4,
      mental: 5,
    },
    "planeforged": {
      armor: 2,
      fortitude: 4,
      reflex: 4,
      mental: 4,
    },
    "undead": {
      armor: 2,
      fortitude: 2,
      reflex: 4,
      mental: 6,
    },
  }[monsterType];
}
