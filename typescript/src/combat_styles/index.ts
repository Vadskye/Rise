import { FunctionsLike, StandardAttack } from "@src/mystic_spheres";
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

export type Source = "primal" | "martial" | "trick" | "esoteric" | "wild";

export interface CombatStyle {
  name: string;
  maneuvers: Maneuver[];
  sources: Source[];
  stances?: Stance[];
}

export interface Maneuver {
  attack?: StandardAttack;
  effect?: string;
  focus?: boolean;
  functionsLike?: FunctionsLike;
  name: string;
  narrative?: string;
  rank: number;
  scaling?: "accuracy" | "damage" | Record<string, string>;
  tags?: string[];
  type: "Instant" | "Duration";
}

export interface Stance {
  name: string;
}
