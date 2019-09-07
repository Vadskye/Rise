import { MonsterInput } from "@src/monsters/reformat_monster_input";
import { MonsterType } from "@src/monsters/types";

export function addType(
  monsterType: MonsterType,
  monsterInputs: Array<Omit<MonsterInput, "type">>,
): MonsterInput[] {
  return monsterInputs.map((monsterInput) => {
    return {
      ...monsterInput,
      type: monsterType,
    };
  });
}
