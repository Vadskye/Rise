// import { DamageType, DefenseType } from "@src/data";
// import { MonsterBase } from "@src/monsters";
// import { isStandardWeaponName, StandardWeaponName, standardWeapons } from "@src/weapons";

// export type AbilityEffect = (monster: MonsterBase) => string;

// interface StandardAbilityInput {
//   name: StandardAbilityName;
// }

// interface WeaponAbilityInput {
//   accuracyBonus?: number;
//   defense?: DefenseType;
//   effect?: string | null;
//   name: string;
//   source?: "magical" | "mundane";
//   weaponName: StandardWeaponName;
// }

// interface CustomEffectAbilityInput {
//   effect: string | null;
//   name: string;
//   powerBonus?: number;
//   source?: "magical" | "mundane";
//   target: string;
// }

// interface CustomAttackAbilityInput {
//   accuracyBonus?: number;
//   damageTypes: DamageType[];
//   defense: DefenseType;
//   effect?: string | null;
//   name: string;
//   powerBonus?: number;
//   source?: "magical" | "mundane";
//   target: string;
// }

// export type AbilityInput =
//   | StandardAbilityInput
//   | WeaponAbilityInput
//   | CustomEffectAbilityInput
//   | CustomAttackAbilityInput;

// // TODO: add ability tags
// export type Ability = Required<AbilityInput>;

// type StandardAbilityName = "fireball";

// function hasStandardWeaponName(input: AbilityInput): input is WeaponAbilityInput {
//   return isStandardWeaponName((input as WeaponAbilityInput).weaponName);
// }

// function hasStandardAbilityName(input: AbilityInput): input is StandardAbilityInput {
//   return Boolean(standardAbilities[(input as StandardAbilityInput).name]);
// }

// const standardAbilities: Record<StandardAbilityName, Omit<AbilityInput, "name">> = {
//   fireball: {
//     damageTypes: ["fire"],
//     defense: "armor",
//     source: "magical",
//     target: "Everything in a \\areasmall radius within \\rngclose range",
//   },
// };

// export function parseAbilityInput(input: AbilityInput): Ability {
//   const defaults: Pick<Ability, "accuracyBonus" | "damageTypes" | "powerBonus" | "source"> = {
//     accuracyBonus: 0,
//     damageTypes: [],
//     powerBonus: 0,
//     source: "mundane",
//   };

//   if (hasStandardWeaponName(input)) {
//     return {
//       ...defaults,
//       defense: "armor",
//       effect: "TODO",
//       target: "TODO",
//       ...standardWeapons[input.weaponName],
//       ...input,
//     };
//   } else if (hasStandardAbilityName(input)) {
//     return {
//       ...defaults,
//       name: input.name,
//       ...standardAbilities[input.name],
//     };
//   } else {
//     return {
//       ...defaults,
//       ...input,
//     };
//   }
// }

// // export function calculateAbilities(monster: MonsterBase) {
// //   return monster.abilityInputs.map((a) => calculateAbility(monster, a));
// // }

// // function calculateAbility(monster: MonsterBase, abilityInput: AbilityInput): Ability {
// //   return {
// //     name: abilityInput.name,
// //     ...(sStandardAbilityName(abilityInput.name) && standardAbilities[abilityInput.name]),
// //   };
// // }
