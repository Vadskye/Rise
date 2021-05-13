import {
  MonsterBaseInput,
  MonsterGroupInput,
  MonsterInput,
} from "@src/monsters/reformat_monster_input";
import { MonsterType } from "@src/data";

export type TypelessMonsterInput =
  | Omit<MonsterBaseInput, "monsterType">
  | Omit<MonsterGroupInput, "monsterType">;

function isMonsterGroup(m: TypelessMonsterInput): m is MonsterGroupInput {
  return Boolean((m as MonsterGroupInput)?.monsters);
}

export function addType(
  monsterType: MonsterType,
  monsterInputs: TypelessMonsterInput[],
): MonsterInput[] {
  return monsterInputs.map((monsterInput) => {
    if (isMonsterGroup(monsterInput)) {
      return {
        ...monsterInput,
        monsters: monsterInput.monsters.map((mon) => {
          return {
            ...mon,
            monsterType,
          };
        }),
        monsterType,
      };
    } else {
      return {
        ...monsterInput,
        monsterType,
      };
    }
  });
}
