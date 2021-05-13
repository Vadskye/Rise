import { DefenseType, MonsterType } from "@src/data";

// Like PCs, monster defense bonuses should sum to 15.
// Monster defense bonuses are generally more balanced than PC defense bonuses.
export function defenseBonusesByMonsterType(monsterType: MonsterType): Record<DefenseType, number> {
  return {
    "aberration": {
      armor: 1,
      fortitude: 5,
      reflex: 5,
      mental: 8,
    },
    "animal": {
      armor: 1,
      fortitude: 7,
      reflex: 7,
      mental: 4,
    },
    "animate": {
      armor: 1,
      fortitude: 8,
      reflex: 5,
      mental: 5,
    },
    "dragon": {
      armor: 2,
      fortitude: 6,
      reflex: 4,
      mental: 6,
    },
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
