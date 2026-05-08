import { DicePool, PowerScaling } from '../core_mechanics/dice_pool';
import { DamageDice } from './core';
export class DamageScaling {
  constructor(
    public readonly baseDice: DicePool,
    public readonly powerScalings: PowerScaling[],
  ) {}

  scaledPool(power: number): DicePool {
    return this.baseDice.calcScaledPool(this.powerScalings, power);
  }

  static dr(rank: number): DamageScaling {
    switch (rank) {
      case 0:
        return new DamageScaling(DicePool.d4(), [{ powerPerDice: 0, powerPerPlus1Modifier: 2 }]);
      case 1:
        return new DamageScaling(DicePool.d6(), [{ powerPerDice: 0, powerPerPlus1Modifier: 2 }]);
      case 2:
        return new DamageScaling(DicePool.d10(), [{ powerPerDice: 0, powerPerPlus1Modifier: 2 }]);
      case 3:
        return new DamageScaling(DicePool.d8(), [{ powerPerDice: 0, powerPerPlus1Modifier: 1 }]);
      case 4:
        return new DamageScaling(DicePool.empty(), [
          { dice: DicePool.d6(), powerPerDice: 2, powerPerPlus1Modifier: 0 },
        ]);
      case 5:
        return new DamageScaling(DicePool.d6(), [
          { dice: DicePool.d6(), powerPerDice: 2, powerPerPlus1Modifier: 0 },
        ]);
      case 6:
        return new DamageScaling(DicePool.d8(), [
          { dice: DicePool.d8(), powerPerDice: 2, powerPerPlus1Modifier: 0 },
        ]);
      case 7:
        return new DamageScaling(DicePool.d10(), [
          { dice: DicePool.d10(), powerPerDice: 2, powerPerPlus1Modifier: 0 },
        ]);
      case 8:
        return new DamageScaling(DicePool.d6(), [
          { dice: DicePool.d6(), powerPerDice: 1, powerPerPlus1Modifier: 0 },
        ]);
      case 9:
        return new DamageScaling(DicePool.xdy(2, 8), [
          { dice: DicePool.d8(), powerPerDice: 1, powerPerPlus1Modifier: 0 },
        ]);
      case 10:
        return new DamageScaling(DicePool.xdy(2, 10), [
          { dice: DicePool.d10(), powerPerDice: 1, powerPerPlus1Modifier: 0 },
        ]);
      default:
        throw new Error(`Unsupported DR rank: ${rank}`);
    }
  }

  static drl(rank: number): DamageScaling {
    // Low power variants (mostly flat dice, no scaling)
    switch (rank) {
      case 0:
        return new DamageScaling(DicePool.d6(), []);
      case 1:
        return new DamageScaling(DicePool.d10(), []);
      case 2:
        return new DamageScaling(DicePool.d8().addDice([{ size: 6 }]), []);
      case 3:
        return new DamageScaling(DicePool.xdy(2, 10), []);
      case 4:
        return new DamageScaling(DicePool.xdy(3, 10), []);
      case 5:
        return new DamageScaling(DicePool.xdy(5, 8), []);
      case 6:
        return new DamageScaling(DicePool.xdy(7, 8), []);
      case 7:
        return new DamageScaling(DicePool.xdy(8, 10), []);
      case 8:
        return new DamageScaling(DicePool.xdy(11, 10), []);
      case 9:
        return new DamageScaling(DicePool.xdy(16, 10), []);
      case 10:
        return new DamageScaling(DicePool.xdy(22, 10), []);
      default:
        throw new Error(`Unsupported DRL rank: ${rank}`);
    }
  }
}

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
