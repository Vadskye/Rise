import { Armor } from "@src/armor";
import {
  Attack,
  attributesAtLevel,
  calculateAccuracy,
  calculateAttacks,
  calculateDefenses,
  calculateHitPoints,
  calculateMagicalPower,
  calculateMundanePower,
  calculateResistances,
  reachBySize,
  Resistances,
  skillModifierByName,
  spaceBySize,
  speedBySize,
} from "@src/calculate";
import {
  attributes,
  DefenseType,
  defenseTypes,
  ResistanceType,
  resistanceTypes,
  skills,
} from "@src/data";
import { MonsterType } from "@src/monsters/types";
import { fromPairs } from "@src/util/from_pairs";
import { parseWeaponInput, Weapon, WeaponInput } from "@src/weapons";

export interface MonsterInput {
  accuracyBonus?: number;
  armor?: Armor[];
  challengeRating?: number;
  defenseBonuses?: Partial<Record<DefenseType, number>>;
  level: number;
  monsterType: MonsterType;
  name: string;
  reach?: number;
  resistanceBonuses?: Partial<Record<ResistanceType, number>>;
  size?: Creature.Size;
  skillPoints?: Partial<Creature.Skills>;
  space?: number;
  speed?: number;
  startingAttributes?: Partial<Creature.Attributes>;
  weaponInput?: WeaponInput[];
}

interface MonsterCalculatedValues {
  accuracy: number;
  attacks: Attack[];
  attributes: Creature.Attributes;
  defenses: Record<DefenseType, number>;
  defenseBonuses: Record<DefenseType, number>;
  hitPoints: number;
  magicalPower: number;
  mundanePower: number;
  reach: number;
  resistanceBonuses: Record<ResistanceType, number>;
  resistances: Resistances;
  skills: Creature.Skills;
  skillPoints: Creature.Skills;
  startingAttributes: Creature.Attributes;
  space: number;
  speed: number;
  weapons: Weapon[];
}

export type MonsterBase = Required<MonsterInput> & MonsterCalculatedValues;

const monsterDefaults: Required<
  Omit<
    MonsterInput,
    | "defenseBonuses"
    | "level"
    | "monsterType"
    | "name"
    | "skillPoints"
    | "startingAttributes"
    | "resistanceBonuses"
    | keyof MonsterCalculatedValues
  >
> & {
  defenseBonuses: Record<DefenseType, number>;
  resistanceBonuses: Record<ResistanceType, number>;
  skillPoints: Creature.Skills;
  startingAttributes: Creature.Attributes;
  weapons: Weapon[];
} = {
  accuracyBonus: 0,
  armor: [],
  challengeRating: 1,
  defenseBonuses: fromPairs(defenseTypes.map((d) => [d, 0])),
  resistanceBonuses: fromPairs(resistanceTypes.map((d) => [d, 0])),
  size: "medium",
  skillPoints: fromPairs(skills.map((s) => [s, 0])),
  startingAttributes: fromPairs(attributes.map((a) => [a, 0])),
  weaponInput: [],
  weapons: [],
};

function calculateSkills(
  attributes: Creature.Attributes,
  skillPoints: Creature.Skills,
  monsterInput: MonsterInput,
): Creature.Skills {
  const skillModifiers: Partial<Creature.Skills> = {};
  for (const skillName of skills) {
    skillModifiers[skillName] = skillModifierByName({
      attributes,
      level: monsterInput.level,
      name: skillName,
      skillPoints: skillPoints[skillName],
    });
  }
  return skillModifiers as Creature.Skills;
}

export function reformatMonsterInput(monsterInput: MonsterInput): MonsterBase {
  const defenseBonuses = Object.assign(
    {},
    monsterDefaults.defenseBonuses,
    monsterInput.defenseBonuses,
  );
  const startingAttributes = Object.assign(
    {},
    monsterDefaults.startingAttributes,
    monsterInput.startingAttributes,
  );
  const skillPoints = Object.assign({}, monsterDefaults.skillPoints, monsterInput.skillPoints);
  const resistanceBonuses = Object.assign(
    {},
    monsterDefaults.resistanceBonuses,
    monsterInput.resistanceBonuses,
  );
  const monster = {
    ...monsterDefaults,
    ...monsterInput,
    defenseBonuses,
    resistanceBonuses,
    startingAttributes,
    skillPoints,
  };

  const attributeModifiers = attributesAtLevel({ level: monster.level, startingAttributes });
  const accuracy = calculateAccuracy({ ...monster, attributes: attributeModifiers });
  const magicalPower = calculateMagicalPower({ ...monster, attributes: attributeModifiers });
  const mundanePower = calculateMundanePower({ ...monster, attributes: attributeModifiers });
  const weapons = monster.weaponInput.map(parseWeaponInput);
  return {
    accuracy,
    attributes: attributeModifiers,
    attacks: calculateAttacks({ accuracy, magicalPower, mundanePower, weapons }),
    defenses: calculateDefenses(monster),
    hitPoints: calculateHitPoints(monster),
    magicalPower,
    mundanePower,
    reach: reachBySize(monster.size),
    resistances: calculateResistances(monster),
    space: spaceBySize(monster.size),
    speed: speedBySize(monster.size),
    skills: calculateSkills(attributeModifiers, skillPoints, monster),
    weapons,
    ...monster,
  };
}
