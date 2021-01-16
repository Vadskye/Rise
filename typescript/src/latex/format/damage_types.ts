import { DamageType } from "@src/data";

export function damageTypes(types: DamageType[]): string {
  if (types.length <= 2) {
    return types.join(" and ");
  }

  // TODO: support 3+ damage types
  throw new Error(`Too many damage types: ${types}`);
}
