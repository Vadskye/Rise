import { BaseSpellLike } from '@src/mystic_spheres';
import { bruteForce } from './brute_force';
import { dirtyFighting } from './dirty_fighting';
import { ebbAndFlow } from './ebb_and_flow';
import { flurryOfBlows } from './flurry_of_blows';
import { heraldOfWar } from './herald_of_war';
import { mobileHunter } from './mobile_assault';
import { perfectPrecision } from './perfect_precision';
import { ripAndTear } from './rip_and_tear';
import { unbreakableDefense } from './unbreakable_defense';

export { getManeuverByName } from './get_maneuver_by_name';

export const combatStyles = [
  bruteForce,
  dirtyFighting,
  ebbAndFlow,
  flurryOfBlows,
  heraldOfWar,
  mobileHunter,
  perfectPrecision,
  ripAndTear,
  unbreakableDefense,
];

export type CombatStyleSource = 'primal' | 'martial' | 'trick' | 'esoteric' | 'wild';

export interface CombatStyle {
  maneuvers: Maneuver[];
  name: string;
  shortDescription: string;
  specialRules?: string;
}

export interface Maneuver extends BaseSpellLike {
  rank: 1 | 3 | 5 | 7;
}
