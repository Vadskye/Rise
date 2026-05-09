import { DamageScaling } from '../core_mechanics/damage_scaling';
export type AttackEffect =
  | { kind: 'Damage'; damage: DamageScaling }
  | { kind: 'Push'; distance: number }
  | { kind: 'Debuff'; debuff: string; duration: string }
  | { kind: 'Other'; text: string };

export interface Attack {
  accuracy: number;
  crit?: AttackEffect;
  defense: string;
  hit: AttackEffect;
  isMagical: boolean;
  isStrike: boolean;
  name: string;
  tags?: string[];
  targeting: string;
}
