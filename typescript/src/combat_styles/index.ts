import { BaseSpellLike } from "@src/mystic_spheres";
import { bluntForce } from "./blunt_force";
import { dirtyFighting } from "./dirty_fighting";
import { ebbAndFlow } from "./ebb_and_flow";
import { flurryOfBlows } from "./flurry_of_blows";
import { heraldOfWar } from "./herald_of_war";
import { mobileAssault } from "./mobile_assault";
import { penetratingPrecision } from "./penetrating_precision";
import { ripAndTear } from "./rip_and_tear";
import { unbreakableDefense } from "./unbreakable_defense";

export const combatStyles = [
  bluntForce,
  dirtyFighting,
  ebbAndFlow,
  flurryOfBlows,
  heraldOfWar,
  mobileAssault,
  penetratingPrecision,
  ripAndTear,
  unbreakableDefense,
];

export type CombatStyleSource = "primal" | "martial" | "trick" | "esoteric" | "wild";

export interface CombatStyle {
  maneuvers: Maneuver[];
  name: string;
  shortDescription: string;
  specialRules?: string;
  stances?: Stance[];
}

export interface Maneuver extends BaseSpellLike {
  rank: 1 | 3 | 5 | 7;
}

export type Stance = Maneuver;
