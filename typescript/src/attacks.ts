import { AbilityTag } from "@src/ability_tags";
import { DamageType, DefenseType } from "@src/data";
import { MonsterBase } from "@src/monsters";
import { isStandardWeaponName, StandardWeaponName, standardWeapons } from "@src/weapons";

export type AttackEffect = (monster: MonsterBase) => string;

interface StandardAttackInput {
  accuracyBonus?: number;
  name: StandardAttackName;
  powerMultiplier?: 0 | 0.5 | 1;
  preface?: string;
  tags?: AbilityTag[];
}

interface WeaponAttackInput {
  accuracyBonus?: number;
  defense?: DefenseType;
  name: string;
  powerMultiplier: 0 | 0.5 | 1;
  preface?: string;
  source?: "magical" | "mundane";
  tags?: AbilityTag[];
  target?: string;
  weaponName: StandardWeaponName;
}

interface CustomAttackInput {
  accuracyBonus?: number;
  baseDamageDie?: string;
  crit?: string | null;
  damageTypes?: DamageType[];
  defense: DefenseType;
  hit?: string | null;
  name: string;
  powerMultiplier?: 0 | 0.5 | 1;
  preface?: string;
  source?: "magical" | "mundane";
  tags?: AbilityTag[];
  target: string;
}

export type AttackInput = StandardAttackInput | WeaponAttackInput | CustomAttackInput;

// TODO: add ability tags, including Magical sources
export type Attack = Required<Omit<CustomAttackInput, "baseDamageDie">> & {
  baseDamageDie?: string;
  weaponName?: string;
};

export type DamagingAttack = Omit<Attack, "baseDamageDie" | "powerMultiplier"> &
  Required<Pick<Attack, "baseDamageDie" | "powerMultiplier">>;

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
    | "baseDamageDie"
    | "crit"
    | "damageTypes"
    | "defense"
    | "hit"
    | "source"
    | "tags"
    | "target"
  > &
    Required<Pick<CustomAttackInput, "powerMultiplier">>
> = {
  "acid breath": {
    baseDamageDie: "1d8",
    damageTypes: ["acid"],
    defense: "armor",
    hit: "Each target takes $damage.",
    powerMultiplier: 0.5,
    source: "mundane",
    target: "Everything in a \\areasmall cone",
  },
  "combustion": {
    baseDamageDie: "1d10",
    damageTypes: ["fire"],
    defense: "fortitude",
    hit: "The target takes $damage.",
    powerMultiplier: 1,
    source: "magical",
    tags: ["Focus", "Spell"],
    target: "One creature or object within \\rngmed range",
  },
  "drain life": {
    baseDamageDie: "1d10",
    damageTypes: ["energy"],
    defense: "fortitude",
    hit: "The target takes $damage.",
    powerMultiplier: 1,
    source: "magical",
    tags: ["Focus", "Spell"],
    target: "One living creature within \\rngmed range",
  },
  "fireball": {
    baseDamageDie: "1d8",
    damageTypes: ["fire"],
    defense: "armor",
    hit: "Each target takes $damage.",
    powerMultiplier: 0.5,
    source: "magical",
    tags: ["Focus", "Spell"],
    target: "Everything in a \\areasmall radius within \\rngmed range",
  },
};

export function parseAttack(input: AttackInput): Attack {
  const defaults: Pick<
    Attack,
    | "accuracyBonus"
    | "crit"
    | "damageTypes"
    | "hit"
    | "powerMultiplier"
    | "preface"
    | "source"
    | "tags"
  > = {
    accuracyBonus: 0,
    crit: null,
    damageTypes: [],
    hit: null,
    powerMultiplier: 1,
    preface: "",
    source: "mundane",
    tags: [],
  };

  if (hasStandardWeaponName(input)) {
    const weapon = standardWeapons[input.weaponName];
    return {
      ...defaults,
      baseDamageDie: weapon.baseDamageDie,
      damageTypes: weapon.damageTypes,
      defense: "armor",
      hit: "The target takes $damage.",
      target: "One creature or object within \\glossterm{reach}",
      ...input,
      accuracyBonus: (weapon.accuracyBonus || 0) + (input.accuracyBonus || 0),
      powerMultiplier: input.powerMultiplier,
    };
  } else if (hasStandardAttackName(input)) {
    const standardAttack = standardAttacks[input.name];
    return {
      ...defaults,
      ...standardAttack,
      name: input.name,
      accuracyBonus: (standardAttack.accuracyBonus || 0) + (input.accuracyBonus || 0),
      powerMultiplier: input.powerMultiplier ?? standardAttack.powerMultiplier,
    };
  } else {
    return {
      ...defaults,
      ...input,
    };
  }
}

export function attackIsDamaging(attack: Attack | DamagingAttack): attack is DamagingAttack {
  return Boolean(
    attack.powerMultiplier !== null && attack.powerMultiplier !== undefined && attack.baseDamageDie,
  );
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
