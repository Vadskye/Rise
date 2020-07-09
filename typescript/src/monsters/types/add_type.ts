import {
  MonsterBaseInput,
  MonsterGroupInput,
  MonsterInput,
} from "@src/monsters/reformat_monster_input";
import { MonsterType } from "@src/monsters/types";

export type TypelessMonsterInput =
  | Omit<MonsterBaseInput, "monsterType">
  | Omit<MonsterGroupInput, "monsterType">;

export function addType(
  monsterType: MonsterType,
  monsterInputs: TypelessMonsterInput[],
): MonsterInput[] {
  return monsterInputs.map((monsterInput) => {
    return {
      ...monsterInput,
      monsterType,
    };
  });
}
