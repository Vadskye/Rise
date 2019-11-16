import { MonsterInput } from "@src/monsters/reformat_monster_input";
import { aberrations } from "./aberrations";
import { animals } from "./animals";
import { animates } from "./animates";
import { humanoids } from "./humanoids";
import { monstrousHumanoids } from "./monstrous_humanoids";
import { outsiders } from "./outsiders";
import { undead } from "./undead";

export type MonsterType =
  | "aberration"
  | "animal"
  | "animate"
  | "humanoid"
  | "monstrous humanoid"
  | "outsider"
  | "undead";

export const monsterTypes: MonsterType[] = [
  "aberration",
  "animal",
  "animate",
  "humanoid",
  "monstrous humanoid",
  "outsider",
  "undead",
];

export const monsterInputsByType: Record<MonsterType, MonsterInput[]> = {
  "aberration": aberrations,
  "animal": animals,
  "animate": animates,
  "humanoid": humanoids,
  "monstrous humanoid": monstrousHumanoids,
  "outsider": outsiders,
  "undead": undead,
};
