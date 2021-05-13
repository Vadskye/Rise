import { MonsterType, monsterTypes } from "@src/data";
import { Monster, processMonsterInput } from "@src/monsters/reformat_monster_input";
import { monsterInputsByType } from "@src/monsters/types";
import { fromPairs } from "@src/util/from_pairs";
import _ from "lodash";

export function generateMonsters(): Record<MonsterType, Monster[]> {
  return fromPairs(
    monsterTypes.map((t) => [
      t,
      _.sortBy(monsterInputsByType[t], (m) => m.name.toLowerCase()).map(processMonsterInput),
    ]),
  );
}
