import { AbilityTag } from "@src/ability_tags";
import { DamageType, DefenseType } from "@src/data";
import { MonsterBase } from "@src/monsters";
import { isStandardWeaponName, StandardWeaponName, standardWeapons } from "@src/weapons";

export type AttackEffect = (monster: MonsterBase) => string;

interface StandardAttackInput {
  accuracyBonus?: number;
  name: StandardAttackName;
  powerBonus?: number;
  tags?: AbilityTag[];
}

interface WeaponAttackInput {
  accuracyBonus?: number;
  defense?: DefenseType;
  name: string;
  powerBonus?: number;
  source?: "magical" | "mundane";
  tags?: AbilityTag[];
  target?: string;
  weaponName: StandardWeaponName;
}

interface CustomAttackInput {
  accuracyBonus?: number;
  crit?: string | null;
  damageTypes?: DamageType[];
  defense: DefenseType;
  hit?: string | null;
  name: string;
  powerBonus?: number;
  source?: "magical" | "mundane";
  tags?: AbilityTag[];
  target: string;
}

export type AttackInput = StandardAttackInput | WeaponAttackInput | CustomAttackInput;

// TODO: add ability tags, including Magical sources
export type Attack = Required<CustomAttackInput> & { weaponName?: string };

type StandardAttackName = "acid breath" | "drain life" | "fireball" | "combustion";

function hasStandardWeaponName(input: AttackInput): input is WeaponAttackInput {
  return isStandardWeaponName((input as WeaponAttackInput).weaponName);
}

function hasStandardAttackName(input: AttackInput): input is StandardAttackInput {
  return Boolean(standardAttacks[(input as StandardAttackInput).name]);
}

const standardAttacks: Record<
  StandardAttackName,
  Pick<
    CustomAttackInput,
    | "accuracyBonus"
    | "crit"
    | "damageTypes"
    | "defense"
    | "hit"
    | "powerBonus"
    | "source"
    | "tags"
    | "target"
  >
> = {
  "acid breath": {
    damageTypes: ["acid"],
    defense: "armor",
    hit: "Each target takes $damage.",
    source: "mundane",
    target: "Everything in a \\areamed cone",
  },
  "combustion": {
    damageTypes: ["fire"],
    defense: "reflex",
    hit: "The target takes $damage.",
    powerBonus: 2,
    source: "magical",
    tags: ["Focus"],
    target: "One creature or object within \\rngmed range",
  },
  "drain life": {
    damageTypes: [],
    defense: "fortitude",
    hit: "The target loses a \\glossterm{hit point}",
    source: "magical",
    tags: ["Focus"],
    target: "One creature within \\rngmed range",
  },
  "fireball": {
    damageTypes: ["fire"],
    defense: "armor",
    hit: "Each target takes $damage.",
    source: "magical",
    tags: ["Focus"],
    target: "Everything in a \\areasmall radius within \\rngclose range",
  },
};

export function parseAttack(input: AttackInput): Attack {
  const defaults: Pick<
    Attack,
    "accuracyBonus" | "crit" | "damageTypes" | "hit" | "powerBonus" | "source" | "tags"
  > = {
    accuracyBonus: 0,
    crit: null,
    damageTypes: [],
    hit: null,
    powerBonus: 0,
    source: "mundane",
    tags: [],
  };

  if (hasStandardWeaponName(input)) {
    const weapon = standardWeapons[input.weaponName];
    return {
      ...defaults,
      defense: "armor",
      hit: "The target takes $damage.",
      target: "One creature or object within \\glossterm{reach}",
      ...input,
      accuracyBonus: (weapon.accuracyBonus || 0) + (input.accuracyBonus || 0),
      powerBonus: (weapon.powerBonus || 0) + (input.powerBonus || 0),
    };
  } else if (hasStandardAttackName(input)) {
    const standardAttack = standardAttacks[input.name];
    return {
      ...defaults,
      ...standardAttack,
      name: input.name,
      accuracyBonus: (standardAttack.accuracyBonus || 0) + (input.accuracyBonus || 0),
      powerBonus: (standardAttack.powerBonus || 0) + (input.powerBonus || 0),
    };
  } else {
    return {
      ...defaults,
      ...input,
    };
  }
}

// export function calculateAttacks(monster: MonsterBase) {
//   return monster.abilityInputs.map((a) => calculateAttack(monster, a));
// }

// function calculateAttack(monster: MonsterBase, abilityInput: AttackInput): Attack {
//   return {
//     name: abilityInput.name,
//     ...(sStandardAttackName(abilityInput.name) && standardAttacks[abilityInput.name]),
//   };
// }
