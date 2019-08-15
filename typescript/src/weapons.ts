// TODO: add subtypes
export type DamageType = "physical" | "energy" | null;

export interface Weapon {
  damageTypes: DamageType[];
  name: string;
}
