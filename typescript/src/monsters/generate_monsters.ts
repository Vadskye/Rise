import { MonsterBase, reformatMonsterInput } from "@src/monsters/reformat_monster_input";
import { aberrations, animals, humanoids } from "@src/monsters/types";
import _ from "lodash";

export function generateMonsters(): MonsterBase[] {
  const monsterInputs = _.sortBy(
    [...aberrations, ...animals, ...humanoids],
    (m) => m.monsterType + m.name,
  );

  return monsterInputs.map(reformatMonsterInput);
}
