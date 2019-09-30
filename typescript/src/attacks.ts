import { DamageType, DefenseType } from "@src/data";
import { MonsterBase } from "@src/monsters";
import { isStandardWeaponName, StandardWeaponName, standardWeapons } from "@src/weapons";

export type AttackEffect = (monster: MonsterBase) => string;

interface StandardAttackInput {
  name: StandardAttackName;
}

interface WeaponAttackInput {
  accuracyBonus?: number;
  defense?: DefenseType;
  name: string;
  source?: "magical" | "mundane";
  target?: string;
  weaponName: StandardWeaponName;
}

interface CustomAttackInput {
  accuracyBonus?: number;
  crit?: string | null;
  damageTypes: DamageType[];
  defense: DefenseType;
  hit?: string | null;
  name: string;
  powerBonus?: number;
  source?: "magical" | "mundane";
  target: string;
}

export type AttackInput = StandardAttackInput | WeaponAttackInput | CustomAttackInput;

// TODO: add ability tags
export type Attack = Required<CustomAttackInput>;

type StandardAttackName = "fireball";

function hasStandardWeaponName(input: AttackInput): input is WeaponAttackInput {
  return isStandardWeaponName((input as WeaponAttackInput).weaponName);
}

function hasStandardAttackName(input: AttackInput): input is StandardAttackInput {
  return Boolean(standardAttacks[(input as StandardAttackInput).name]);
}

const standardAttacks: Record<
  StandardAttackName,
  Pick<CustomAttackInput, "crit" | "damageTypes" | "defense" | "hit" | "source" | "target">
> = {
  fireball: {
    crit: null,
    damageTypes: ["fire"],
    defense: "armor",
    hit: "Each target takes <standard damage>.",
    source: "magical",
    target: "Everything in a \\areasmall radius within \\rngclose range",
  },
};

export function parseAttack(input: AttackInput): Attack {
  const defaults: Pick<
    Attack,
    "accuracyBonus" | "crit" | "damageTypes" | "hit" | "powerBonus" | "source"
  > = {
    accuracyBonus: 0,
    crit: null,
    damageTypes: [],
    hit: null,
    powerBonus: 0,
    source: "mundane",
  };

  if (hasStandardWeaponName(input)) {
    return {
      ...defaults,
      defense: "armor",
      hit: "The target takes <standard damage>.",
      target: "strike",
      ...standardWeapons[input.weaponName],
      ...input,
    };
  } else if (hasStandardAttackName(input)) {
    return {
      ...defaults,
      name: input.name,
      ...standardAttacks[input.name],
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
