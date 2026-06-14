import { Attack } from './attack';

export interface Maneuver {
  name: string;
  rank: number;
  isMagical: boolean;

  // Method to resolve a maneuver into a concrete attack for a weapon
  resolve(weapon: string, attackerRank: number): Attack;
}
