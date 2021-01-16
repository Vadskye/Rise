import { ActiveAbility, ActiveAbilityInput, parseActiveAbility } from "@src/active_abilities";
import { Armor, ArmorInput, parseArmorInput } from "@src/armor";
import { Attack, AttackInput, parseAttack } from "@src/attacks";
import {
  attributesAtLevel,
  calculateAccuracy,
  calculateAttack,
  CalculatedAttack,
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
import { attributes, DamageType, damageTypes, DefenseType, defenseTypes, skills } from "@src/data";
import { MonsterType } from "@src/monsters/types";
import { PassiveAbility } from "@src/passive_abilities";
import { fromPairs } from "@src/util/from_pairs";
import { parseWeaponInput, Weapon, WeaponInput } from "@src/weapons";
import _ from "lodash";

import { MovementMode } from "@src/movement_modes";

export interface MonsterGroupInput {
  description?: string;
  knowledge: Record<number, string>;
  knowledgeSkills?: string[] | null;
  level: number;
  monsters: Array<Omit<MonsterBaseInput, "monsterType">>;
  monsterType: MonsterType;
  name: string;
}

export type MonsterGroup = Required<Omit<MonsterGroupInput, "monsters">> & {
  monsters: MonsterBase[];
};

function monsterInputIsMonsterGroupInput(monster: MonsterInput): monster is MonsterGroupInput {
  return Boolean((monster as MonsterGroupInput).monsters);
}

export function monsterIsMonsterGroup(monster: Monster): monster is MonsterGroup {
  return Boolean((monster as MonsterGroup).monsters);
}

export type MonsterInput = MonsterBaseInput | MonsterGroupInput;

export interface MonsterBaseInput {
  accuracyBonus?: number;
  alignment: string;
  attackInputs?: AttackInput[];
  activeAbilityInputs?: ActiveAbilityInput[];
  armorInputs?: ArmorInput[];
  challengeRating?: 0.5 | 1 | 2 | 3 | 4;
  defenseBonuses?: Partial<Record<DefenseType, number>>;
  delayedCalculations?: Array<(monster: MonsterBase) => void>;
  description?: string | null;
  height?: string | null;
  knowledge?: Record<number, string> | null;
  languages?: string[];
  level: number;
  knowledgeSkills?: string[] | null;
  monsterType: MonsterType;
  name: string;
  passiveAbilities?: PassiveAbility[];
  powerBonuses?: {
    magical?: number;
    mundane?: number;
  };
  reach?: number;
  resistanceBonuses?: Partial<Record<DamageType, number>>;
  size?: Creature.Size;
  skillPoints?: Partial<Creature.SkillPoints>;
  space?: number;
  speeds?: Partial<Record<MovementMode, number | null>>;
  startingAttributes: Partial<Creature.Attributes>;
  weaponInput?: WeaponInput[];
  weight?: string | null;
}

interface MonsterCalculatedValues {
  accuracy: number;
  activeAbilities: ActiveAbility[];
  armors: Armor[];
  attacks: Attack[];
  attributes: Creature.Attributes;
  calculatedAttacks: CalculatedAttack[];
  defenses: Record<DefenseType, number>;
  defenseBonuses: Record<DefenseType, number>;
  hitPoints: number;
  magicalPower: number;
  mundanePower: number;
  passiveAbilities: PassiveAbility[];
  reach: number;
  resistanceBonuses: Record<DamageType, number>;
  resistances: Resistances;
  skills: Creature.Skills;
  skillPoints: Creature.SkillPoints;
  startingAttributes: Creature.Attributes;
  space: number;
  speeds: Record<MovementMode, number>;
  weapons: Weapon[];
}

export type MonsterBase = Required<MonsterBaseInput> & MonsterCalculatedValues;

export type Monster = MonsterGroup | MonsterBase;

const monsterDefaults: Required<
  Omit<
    MonsterBaseInput,
    | "alignment"
    | "defenseBonuses"
    | "level"
    | "monsterType"
    | "name"
    | "skillPoints"
    | "startingAttributes"
    | "resistanceBonuses"
    | keyof MonsterCalculatedValues
  >
> &
  Pick<
    MonsterCalculatedValues,
    | "armors"
    | "defenseBonuses"
    | "passiveAbilities"
    | "resistanceBonuses"
    | "skillPoints"
    | "speeds"
    | "startingAttributes"
    | "weapons"
  > = {
  accuracyBonus: 0,
  activeAbilityInputs: [],
  attackInputs: [],
  armorInputs: [],
  armors: [],
  challengeRating: 1,
  defenseBonuses: fromPairs(defenseTypes.map((d) => [d, 0])),
  delayedCalculations: [],
  description: null,
  height: null,
  knowledge: null,
  knowledgeSkills: null,
  languages: [],
  passiveAbilities: [],
  powerBonuses: {},
  resistanceBonuses: fromPairs(damageTypes.map((d) => [d, 0])),
  size: "medium",
  skillPoints: fromPairs(skills.map((s) => [s, 0])),
  speeds: { burrow: 0, climb: 0, fly: 0, land: 0, swim: 0 },
  startingAttributes: fromPairs(attributes.map((a) => [a, 0])),
  weaponInput: [],
  weapons: [],
  weight: null,
};

const monsterGroupDefaults = {
  description: "",
  knowledgeSkills: null,
};

function calculateSkills(
  attributes: Creature.Attributes,
  skillPoints: Creature.SkillPoints,
  monsterInput: MonsterBaseInput,
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

export function processMonsterInput(monsterInput: MonsterBaseInput | MonsterGroupInput): Monster {
  return monsterInputIsMonsterGroupInput(monsterInput)
    ? generateMonsterGroup(monsterInput)
    : generateMonsterBase(monsterInput);
}

function generateMonsterGroup(monsterGroupInput: MonsterGroupInput): MonsterGroup {
  return {
    ...monsterGroupInput,
    ...monsterGroupDefaults,
    monsters: monsterGroupInput.monsters.map((m) =>
      generateMonsterBase({
        ...m,
        monsterType: monsterGroupInput.monsterType,
      }),
    ),
  };
}

function generateMonsterBase(monsterInput: MonsterBaseInput): MonsterBase {
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

  const armors = monster.armorInputs.map(parseArmorInput);
  for (const armor of armors) {
    for (const [defenseType, bonus] of _.entries(armor.defenseBonuses)) {
      monster.defenseBonuses[defenseType as DefenseType] += bonus;
    }
    for (const [damageType, bonus] of _.entries(armor.resistanceBonuses)) {
      monster.resistanceBonuses[damageType as DamageType] += bonus;
    }
  }

  const attributes = attributesAtLevel({ level: monster.level, startingAttributes });
  const accuracy = calculateAccuracy({ ...monster, startingAttributes });
  const magicalPower = calculateMagicalPower({ ...monster, attributes });
  const mundanePower = calculateMundanePower({ ...monster, attributes });
  const activeAbilities = monster.activeAbilityInputs.map(parseActiveAbility);
  const weapons = monster.weaponInput.map(parseWeaponInput);
  const attacks = monster.attackInputs.map(parseAttack);
  const hitPoints = calculateHitPoints({ ...monster, attributes });
  const monsterBase: MonsterBase = {
    ...monster,
    accuracy,
    activeAbilities,
    armors,
    attacks,
    attributes,
    calculatedAttacks: attacks.map((a) => {
      return calculateAttack(a, { ...monster, accuracy, magicalPower, mundanePower });
    }),
    defenses: calculateDefenses(monster),
    hitPoints,
    magicalPower,
    mundanePower,
    reach: reachBySize(monster.size),
    resistances: calculateResistances({ ...monster, attributes, hitPoints }),
    space: spaceBySize(monster.size),
    speeds: {
      burrow: monsterInput.speeds?.burrow || 0,
      climb: monsterInput.speeds?.climb || 0,
      fly: monsterInput.speeds?.fly || 0,
      land: monsterInput.speeds?.land === null ? 0 : speedBySize(monster.size),
      swim: monsterInput.speeds?.swim || 0,
    },
    skills: calculateSkills(attributes, skillPoints, monster),
    weapons,
  };

  if (monsterInput.delayedCalculations?.length) {
    for (const calc of monsterInput.delayedCalculations) {
      calc(monsterBase);
    }
  }
  return monsterBase;
}
