import { generateMonsters } from "@src/monsters/generate_monsters";
export {
  monsterIsMonsterGroup,
  Monster,
  MonsterBase,
  MonsterGroup,
} from "@src/monsters/reformat_monster_input";
export * from "@src/monsters/generate_monsters";

export const monstersByType = generateMonsters();
