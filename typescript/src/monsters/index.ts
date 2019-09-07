import { attributes } from "@src/data/attributes";
import { skills } from "@src/data/skills";
import { animals } from "@src/monsters/animals";
interface Armor {
  armorDefenseBonus: number;
  name: string;
  resistanceBonus: number;
}
import { fromPairs } from "@src/util/from_pairs";
import { Weapon } from "@src/weapons";

type MonsterSpecies = "animal" | "humanoid";

interface MonsterRequiredInput {
  level: number;
  name: string;
  species: MonsterSpecies;
}

interface MonsterOptionalInput {
  attributes?: Partial<Creature.Attributes>;
  armor?: Armor[];
  challengeRating?: number;
  size?: string;
  skills?: Partial<Creature.Skills>;
  weapons?: Weapon[];
}

export type MonsterBase = Omit<MonsterRequiredInput, "attributes" | "skills"> &
  Required<MonsterOptionalInput> & { attributes: Creature.Attributes; skills: Creature.Skills };

export type MonsterInput = MonsterRequiredInput & MonsterOptionalInput;

export type MonsterInputByName = Record<string, MonsterInput>;

export type MonsterBaseByName = Record<string, MonsterBase>;

const monsterDefaults: Required<Omit<MonsterOptionalInput, "attributes" | "skills">> & {
  attributes: Creature.Attributes;
  skills: Creature.Skills;
} = {
  attributes: fromPairs(attributes.map((a) => [a, 0])),
  armor: [],
  challengeRating: 1,
  size: "medium",
  skills: fromPairs(skills.map((s) => [s, 0])),
  weapons: [],
};

function generateMonsters(): MonsterBase[] {
  const monsterInputs = [...animals];

  const monsters = monsterInputs.map((monsterInput) => {
    return {
      ...monsterInput,
      ...monsterDefaults,
      attributes: mergeDefaultAttributes(monsterInput),
    };
  });

  return monsters;
}

function mergeDefaultAttributes(monster: MonsterOptionalInput): Creature.Attributes {
  if (monster.attributes === undefined) {
    return monsterDefaults.attributes;
  }
  return Object.assign({}, monster.attributes, monsterDefaults.attributes);
}

export const monsters = generateMonsters();
