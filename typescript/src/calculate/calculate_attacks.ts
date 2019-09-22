// import { DamageType } from "@src/data";
// import { MonsterBase } from "@src/monsters";
// import { Weapon } from "@src/weapons";

// export interface Attack {
//   accuracy: number;
//   damageTypes: DamageType[];
//   name: string;
//   power: number;
// }

// type MonsterForAttack = Pick<MonsterBase, "accuracy" | "magicalPower" | "mundanePower" | "weapons">;

// export function calculateAttacks({
//   accuracy,
//   magicalPower,
//   mundanePower,
//   weapons,
// }: MonsterForAttack): Attack[] {
//   return weapons.map((weapon) => calculateAttack(weapon, { accuracy, magicalPower, mundanePower }));
// }

// function calculateAttack(weapon: Weapon, monster: Omit<MonsterForAttack, "weapons">): Attack {
//   // TODO: add magical power
//   const relevantPower = weapon.source === "mundane" ? monster.mundanePower : monster.magicalPower;
//   return {
//     accuracy: monster.accuracy + weapon.accuracyBonus,
//     damageTypes: weapon.damageTypes,
//     effect: weapon.effect,
//     name: weapon.name,
//     power: relevantPower + weapon.powerBonus,
//   };
// }
