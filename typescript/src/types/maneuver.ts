import { MonsterWeapon } from '@src/monsters/weapons';
import { Attack } from './attack';

export interface Maneuver {
  name: string;
  rank: number;
  isMagical: boolean;
  
  // Method to resolve a maneuver into a concrete attack for a weapon
  resolve(weapon: MonsterWeapon, attackerRank: number): Attack;
}
