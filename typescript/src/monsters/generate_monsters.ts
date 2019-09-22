import { MonsterBase, reformatMonsterInput } from "@src/monsters/reformat_monster_input";
import { animals, humanoids } from "@src/monsters/types";
import _ from "lodash";

export function generateMonsters(): MonsterBase[] {
  const monsterInputs = _.sortBy([...animals, ...humanoids], (m) => m.monsterType + m.name);

  return monsterInputs.map(reformatMonsterInput);
}
