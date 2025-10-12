import { bruteForce } from './brute_force';
import { dirtyFighting } from './dirty_fighting';
import { ebbAndFlow } from './ebb_and_flow';
import { flurryOfBlows } from './flurry_of_blows';
import { heraldOfWar } from './herald_of_war';
import { mobileHunter } from './mobile_assault';
import { perfectPrecision } from './perfect_precision';
import { ripAndTear } from './rip_and_tear';
import { monsterManeuvers } from './monster_maneuvers';
import { unbreakableDefense } from './unbreakable_defense';
import { ManeuverDefinition } from '@src/abilities/active_abilities';

export { getManeuverByName, getWeaponMultByRank } from './get_maneuver_by_name';

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

export const monsterCombatStyles = [...combatStyles, monsterManeuvers];

export type CombatStyleSource = 'primal' | 'martial' | 'trick' | 'esoteric' | 'wild';

export interface CombatStyle {
  maneuvers: ManeuverDefinition[];
  name: string;
  shortDescription: string;
  specialRules?: string;
}
