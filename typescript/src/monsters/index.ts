import animals from "@src/monsters/animals";
interface Armor {
  armorDefenseBonus: number;
  name: string;
  resistanceBonus: number;
}
import { Weapon } from "@src/weapons";

interface MonsterRequiredInput {
  level: number;
  name: string;
  species: string;
}

interface MonsterOptionalInput {
  attributes?: Partial<Attributes>;
  armor?: Armor[];
  challengeRating?: number;
  size?: string;
  weapons?: Weapon[];
}

interface Attributes {
  str: number;
  dex: number;
  con: number;
  int: number;
  per: number;
  wil: number;
}

export type MonsterBase = Omit<MonsterRequiredInput, "attributes"> &
  Required<MonsterOptionalInput> & { attributes: Attributes };

export type MonsterInput = MonsterRequiredInput & MonsterOptionalInput;

export type MonsterInputByName = Record<string, MonsterInput>;

export type MonsterBaseByName = Record<string, MonsterBase>;

const monsterDefaults: Required<Omit<MonsterOptionalInput, "attributes">> & {
  attributes: Attributes;
} = {
  attributes: {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    per: 0,
    wil: 0,
  },
  armor: [],
  challengeRating: 1,
  size: "medium",
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

function mergeDefaultAttributes(monster: MonsterOptionalInput): Attributes {
  if (monster.attributes === undefined) {
    return monsterDefaults.attributes;
  }
  return Object.assign({}, monster.attributes, monsterDefaults.attributes);
}

export const monsters = generateMonsters();

export default monsters;
