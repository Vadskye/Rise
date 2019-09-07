import { generateMonsters } from "@src/monsters/generate_monsters";
export { MonsterBase } from "@src/monsters/reformat_monster_input";
export * from "@src/monsters/generate_monsters";

export const monsters = generateMonsters();
