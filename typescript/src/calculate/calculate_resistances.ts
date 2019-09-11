import { damageResistanceByLevel } from "@src/calculate/damage_resistance_by_level";
import { woundResistanceByLevel } from "@src/calculate/wound_resistance_by_level";
import { ResistanceType, resistanceTypes } from "@src/data";
import { MonsterBase } from "@src/monsters";

export interface Resistances {
  damage: Record<ResistanceType, number>;
  wound: Record<ResistanceType, number>;
}

export function calculateResistances({
  challengeRating,
  level,
  resistanceBonuses,
}: Pick<MonsterBase, "challengeRating" | "level" | "resistanceBonuses">): Resistances {
  const dr = damageResistanceByLevel(level);
  const wr = woundResistanceByLevel(level);
  const resistances: Resistances = {
    damage: {
      global: dr + resistanceBonuses.global,
      physical: dr + resistanceBonuses.global + resistanceBonuses.physical,
      acid: dr + resistanceBonuses.global + resistanceBonuses.physical + resistanceBonuses.acid,
      bludgeoning:
        dr + resistanceBonuses.global + resistanceBonuses.physical + resistanceBonuses.bludgeoning,
      piercing:
        dr + resistanceBonuses.global + resistanceBonuses.physical + resistanceBonuses.piercing,
      slashing:
        dr + resistanceBonuses.global + resistanceBonuses.physical + resistanceBonuses.slashing,

      energy: dr + resistanceBonuses.global + resistanceBonuses.energy,
      cold: dr + resistanceBonuses.global + resistanceBonuses.energy + resistanceBonuses.cold,
      electricity:
        dr + resistanceBonuses.global + resistanceBonuses.energy + resistanceBonuses.electricity,
      fire: dr + resistanceBonuses.global + resistanceBonuses.energy + resistanceBonuses.fire,
    },
    wound: {
      global: wr + resistanceBonuses.global,
      physical: wr + resistanceBonuses.global + resistanceBonuses.physical,
      acid: wr + resistanceBonuses.global + resistanceBonuses.physical + resistanceBonuses.acid,
      bludgeoning:
        wr + resistanceBonuses.global + resistanceBonuses.physical + resistanceBonuses.bludgeoning,
      piercing:
        wr + resistanceBonuses.global + resistanceBonuses.physical + resistanceBonuses.piercing,
      slashing:
        wr + resistanceBonuses.global + resistanceBonuses.physical + resistanceBonuses.slashing,

      energy: wr + resistanceBonuses.global + resistanceBonuses.energy,
      cold: wr + resistanceBonuses.global + resistanceBonuses.energy + resistanceBonuses.cold,
      electricity:
        wr + resistanceBonuses.global + resistanceBonuses.energy + resistanceBonuses.electricity,
      fire: wr + resistanceBonuses.global + resistanceBonuses.energy + resistanceBonuses.fire,
    },
  };

  if (challengeRating !== 0.5) {
    return resistances;
  }

  for (const category of ["damage" as const, "wound" as const]) {
    for (const resistanceType of resistanceTypes) {
      resistances[category][resistanceType] *= 0.5;
    }
  }

  return resistances;
}
