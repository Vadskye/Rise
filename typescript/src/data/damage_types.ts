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
  "psychic",
];

export const physicalDamageTypes: DamageType[] = [
  "physical",
  "acid",
  "bludgeoning",
  "piercing",
  "slashing",
];

export const energyDamageTypes: DamageType[] = [
  "energy",
  "cold",
  "electricity",
  "fire",
  "psychic",
];

export type DamageType =
  | "physical"
  | "acid"
  | "bludgeoning"
  | "piercing"
  | "slashing"
  | "energy"
  | "acid"
  | "cold"
  | "electricity"
  | "fire"
  | "psychic"
  | "universal";
