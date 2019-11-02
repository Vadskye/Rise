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
import { fromPairs } from "@src/util/from_pairs";
import { parseWeaponInput, Weapon, WeaponInput } from "@src/weapons";
import _ from "lodash";

export interface PassiveAbility {
  description: string;
  name: string;
}

export interface MonsterInput {
  accuracyBonus?: number;
  attackInputs?: AttackInput[];
  activeAbilityInputs?: ActiveAbilityInput[];
  armorInputs?: ArmorInput[];
  challengeRating?: number;
  defenseBonuses?: Partial<Record<DefenseType, number>>;
  level: number;
  monsterType: MonsterType;
  name: string;
  passiveAbilities?: PassiveAbility[];
  reach?: number;
  resistanceBonuses?: Partial<Record<DamageType, number>>;
  size?: Creature.Size;
  skillPoints?: Partial<Creature.Skills>;
  space?: number;
  speed?: number;
  startingAttributes?: Partial<Creature.Attributes>;
  weaponInput?: WeaponInput[];
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
  armors: Armor[];
  defenseBonuses: Record<DefenseType, number>;
  resistanceBonuses: Record<DamageType, number>;
  passiveAbilities: PassiveAbility[];
  skillPoints: Creature.Skills;
  startingAttributes: Creature.Attributes;
  weapons: Weapon[];
} = {
  accuracyBonus: 0,
  activeAbilityInputs: [],
  attackInputs: [],
  armorInputs: [],
  armors: [],
  challengeRating: 1,
  defenseBonuses: fromPairs(defenseTypes.map((d) => [d, 0])),
  passiveAbilities: [],
  resistanceBonuses: fromPairs(damageTypes.map((d) => [d, 0])),
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

  const armors = monster.armorInputs.map(parseArmorInput);
  for (const armor of armors) {
    for (const [defenseType, bonus] of _.entries(armor.defenseBonuses)) {
      monster.defenseBonuses[defenseType as DefenseType] += bonus;
    }
    for (const [damageType, bonus] of _.entries(armor.resistanceBonuses)) {
      monster.resistanceBonuses[damageType as DamageType] += bonus;
    }
  }

  const attributeModifiers = attributesAtLevel({ level: monster.level, startingAttributes });
  const accuracy = calculateAccuracy({ ...monster, attributes: attributeModifiers });
  const magicalPower = calculateMagicalPower({ ...monster, attributes: attributeModifiers });
  const mundanePower = calculateMundanePower({ ...monster, attributes: attributeModifiers });
  const activeAbilities = monster.activeAbilityInputs.map(parseActiveAbility);
  const weapons = monster.weaponInput.map(parseWeaponInput);
  const attacks = monster.attackInputs.map(parseAttack);
  return {
    ...monster,
    accuracy,
    activeAbilities,
    armors,
    attacks,
    attributes: attributeModifiers,
    calculatedAttacks: attacks.map((a) => {
      return calculateAttack(a, { ...monster, accuracy, magicalPower, mundanePower });
    }),
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
  };
}
