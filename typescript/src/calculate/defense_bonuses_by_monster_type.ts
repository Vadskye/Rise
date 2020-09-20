import { DefenseType } from "@src/data";
import { MonsterType } from "@src/monsters/types";

export function defenseBonusesByMonsterType(monsterType: MonsterType): Record<DefenseType, number> {
  return {
    "aberration": {
      armor: 2,
      fortitude: 3,
      reflex: 2,
      mental: 4,
    },
    "animal": {
      armor: 2,
      fortitude: 4,
      reflex: 3,
      mental: 2,
    },
    "animate": {
      armor: 2,
      fortitude: 3,
      reflex: 3,
      mental: 3,
    },
    "dragon": {
      armor: 3,
      fortitude: 3,
      reflex: 3,
      mental: 3,
    },
    "humanoid": {
      // This is lower because humanoids are expected to wear armor
      armor: 0,
      fortitude: 3,
      reflex: 3,
      mental: 3,
    },
    "magical beast": {
      armor: 2,
      fortitude: 3,
      reflex: 3,
      mental: 3,
    },
    "monstrous humanoid": {
      armor: 2,
      fortitude: 3,
      reflex: 3,
      mental: 3,
    },
    "outsider": {
      armor: 3,
      fortitude: 3,
      reflex: 3,
      mental: 3,
    },
    "undead": {
      armor: 2,
      fortitude: 2,
      reflex: 3,
      mental: 4,
    },
  }[monsterType];
}
