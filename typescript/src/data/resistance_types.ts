import { DamageType, damageTypes } from "@src/data/damage_types";

export type ResistanceType = DamageType | "global";

export const resistanceTypes: ResistanceType[] = [...damageTypes, "global"];
