import { MonsterBase, reformatMonsterInput } from "@src/monsters/reformat_monster_input";
import { animals, humanoids } from "@src/monsters/types";

export function generateMonsters(): MonsterBase[] {
  const monsterInputs = [...animals, ...humanoids];

  return monsterInputs.map(reformatMonsterInput);
}
