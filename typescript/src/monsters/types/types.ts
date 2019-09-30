import { MonsterInput } from "@src/monsters/reformat_monster_input";
import { aberrations } from "./aberrations";
import { animals } from "./animals";
import { humanoids } from "./humanoids";

export type MonsterType = "aberration" | "animal" | "humanoid";

export const monsterTypes: MonsterType[] = ["aberration", "animal", "humanoid"];

export const monsterInputsByType: Record<MonsterType, MonsterInput[]> = {
  aberration: aberrations,
  animal: animals,
  humanoid: humanoids,
};
