export const damageTypes: DamageType[] = [
  "physical",
  "acid",
  "bludgeoning",
  "piercing",
  "slashing",
  "energy",
  "cold",
  "electricity",
  "fire",
];

export const physicalDamageTypes: DamageType[] = [
  "physical",
  "acid",
  "bludgeoning",
  "piercing",
  "slashing",
];

export const energyDamageTypes: DamageType[] = ["energy", "cold", "electricity", "fire"];

export type DamageType =
  | "physical"
  | "acid"
  | "bludgeoning"
  | "piercing"
  | "slashing"
  | "energy"
  | "cold"
  | "electricity"
  | "fire";
