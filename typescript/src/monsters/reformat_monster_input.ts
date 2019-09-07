import { Armor } from "@src/armor";
import { attributes } from "@src/data/attributes";
import { skills } from "@src/data/skills";
import { MonsterType } from "@src/monsters/types";
import { fromPairs } from "@src/util/from_pairs";
import { Weapon } from "@src/weapons";

interface MonsterRequiredInput {
  level: number;
  name: string;
  type: MonsterType;
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

function mergeDefaultAttributes(monster: MonsterOptionalInput): Creature.Attributes {
  if (monster.attributes === undefined) {
    return monsterDefaults.attributes;
  }
  return Object.assign({}, monster.attributes, monsterDefaults.attributes);
}

export function reformatMonsterInput(monsterInput: MonsterInput): MonsterBase {
  return {
    ...monsterInput,
    ...monsterDefaults,
    attributes: mergeDefaultAttributes(monsterInput),
  };
}
