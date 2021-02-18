export const damageTypes: DamageType[] = [
  "physical",
  "bludgeoning",
  "piercing",
  "slashing",
  "energy",
  "acid",
  "cold",
  "electricity",
  "fire",
  "sonic",
];

export const physicalDamageTypes: DamageType[] = [
  "physical",
  "bludgeoning",
  "piercing",
  "slashing",
];

export const energyDamageTypes: DamageType[] = [
  "acid",
  "energy",
  "cold",
  "electricity",
  "fire",
  "sonic",
];

export type DamageType =
  | "physical"
  | "bludgeoning"
  | "piercing"
  | "slashing"
  | "energy"
  | "acid"
  | "cold"
  | "electricity"
  | "fire"
  | "sonic"
  | "universal";
