import { DicePool, PowerScaling } from './dice_pool';

export interface ExcessRankScaling {
  dicePerRank?: DicePool;
  flatDamagePerRank?: number;
}

export class DamageScaling {
  constructor(
    public readonly baseDice: DicePool,
    public readonly powerScalings: PowerScaling[],
    public readonly excessRankScaling?: ExcessRankScaling,
  ) {}

  scaledPool(power: number, excessRank: number = 0): DicePool {
    let pool = this.baseDice;
    if (excessRank > 0 && this.excessRankScaling) {
      if (this.excessRankScaling.dicePerRank) {
        for (let i = 0; i < excessRank; i++) {
          pool = pool.addDice(this.excessRankScaling.dicePerRank.dice);
        }
      }
      if (this.excessRankScaling.flatDamagePerRank) {
        pool = pool.addModifier(excessRank * this.excessRankScaling.flatDamagePerRank);
      }
    }
    return pool.calcScaledPool(this.powerScalings, power);
  }

  static dr(rank: number): DamageScaling {
    switch (rank) {
      case 0:
        return new DamageScaling(
          DicePool.d4(),
          [{ powerPerDice: 0, powerPerPlus1Modifier: 2 }],
          { flatDamagePerRank: 1 },
        );
      case 1:
        return new DamageScaling(
          DicePool.d6(),
          [{ powerPerDice: 0, powerPerPlus1Modifier: 2 }],
          { flatDamagePerRank: 2 },
        );
      case 2:
        return new DamageScaling(
          DicePool.d10(),
          [{ powerPerDice: 0, powerPerPlus1Modifier: 2 }],
          { dicePerRank: DicePool.d6() },
        );
      case 3:
        return new DamageScaling(
          DicePool.d8(),
          [{ powerPerDice: 0, powerPerPlus1Modifier: 1 }],
          { dicePerRank: DicePool.d6() },
        );
      case 4:
        return new DamageScaling(
          DicePool.empty(),
          [{ dice: DicePool.d6(), powerPerDice: 2, powerPerPlus1Modifier: 0 }],
          { dicePerRank: DicePool.d6() },
        );
      case 5:
        return new DamageScaling(
          DicePool.d6(),
          [{ dice: DicePool.d6(), powerPerDice: 2, powerPerPlus1Modifier: 0 }],
          { dicePerRank: DicePool.xdy(2, 6) },
        );
      case 6:
        return new DamageScaling(
          DicePool.d8(),
          [{ dice: DicePool.d8(), powerPerDice: 2, powerPerPlus1Modifier: 0 }],
          { dicePerRank: DicePool.xdy(2, 8) },
        );
      case 7:
        return new DamageScaling(
          DicePool.d10(),
          [{ dice: DicePool.d10(), powerPerDice: 2, powerPerPlus1Modifier: 0 }],
          { dicePerRank: DicePool.xdy(2, 10) },
        );
      case 8:
        return new DamageScaling(
          DicePool.d6(),
          [{ dice: DicePool.d6(), powerPerDice: 1, powerPerPlus1Modifier: 0 }],
          { dicePerRank: DicePool.xdy(4, 6) },
        );
      case 9:
        return new DamageScaling(
          DicePool.xdy(2, 8),
          [{ dice: DicePool.d8(), powerPerDice: 1, powerPerPlus1Modifier: 0 }],
          { dicePerRank: DicePool.xdy(4, 8) },
        );
      case 10:
        return new DamageScaling(
          DicePool.xdy(2, 10),
          [{ dice: DicePool.d10(), powerPerDice: 1, powerPerPlus1Modifier: 0 }],
          { dicePerRank: DicePool.xdy(4, 10) },
        );
      default:
        throw new Error(`Unsupported DR rank: ${rank}`);
    }
  }

  static drl(rank: number): DamageScaling {
    // Low power variants (mostly flat dice, no scaling)
    switch (rank) {
      case 0:
        return new DamageScaling(DicePool.d6(), [], { flatDamagePerRank: 1 });
      case 1:
        return new DamageScaling(DicePool.d10(), [], { flatDamagePerRank: 2 });
      case 2:
        return new DamageScaling(DicePool.d8().addDice([{ size: 6 }]), [], {
          dicePerRank: DicePool.d6(),
        });
      case 3:
        return new DamageScaling(DicePool.xdy(2, 10), [], { dicePerRank: DicePool.d10() });
      case 4:
        return new DamageScaling(DicePool.xdy(3, 10), [], { dicePerRank: DicePool.d10() });
      case 5:
        return new DamageScaling(DicePool.xdy(5, 8), [], { dicePerRank: DicePool.xdy(2, 8) });
      case 6:
        return new DamageScaling(DicePool.xdy(7, 8), [], { dicePerRank: DicePool.xdy(3, 8) });
      case 7:
        return new DamageScaling(DicePool.xdy(8, 10), [], { dicePerRank: DicePool.xdy(3, 10) });
      case 8:
        return new DamageScaling(DicePool.xdy(11, 10), [], { dicePerRank: DicePool.xdy(5, 10) });
      case 9:
        return new DamageScaling(DicePool.xdy(16, 10), [], { dicePerRank: DicePool.xdy(6, 10) });
      case 10:
        return new DamageScaling(DicePool.xdy(22, 10), [], { dicePerRank: DicePool.xdy(8, 10) });
      default:
        throw new Error(`Unsupported DRL rank: ${rank}`);
    }
  }
}
