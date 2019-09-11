import { MonsterInput } from "@src/monsters/reformat_monster_input";
import { MonsterType } from "@src/monsters/types";

export function addType(
  monsterType: MonsterType,
  monsterInputs: Array<Omit<MonsterInput, "monsterType">>,
): MonsterInput[] {
  return monsterInputs.map((monsterInput) => {
    return {
      ...monsterInput,
      monsterType,
    };
  });
}
