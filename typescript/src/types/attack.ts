import { DamageDice } from './core';

export interface PowerScaling {
  dice?: DicePool;
  powerPerDice: number;
  powerPerPlus1Modifier: number;
}

export class DicePool {
  constructor(
    public readonly dice: { size: number }[],
    public readonly flatModifier: number = 0,
    public readonly maximized: boolean = false,
    public readonly multiplier: number = 1,
    public readonly weak: boolean = false,
  ) {}

  static empty(): DicePool {
    return new DicePool([]);
  }

  static xdy(count: number, size: number): DicePool {
    const dice = [];
    for (let i = 0; i < count; i++) {
      dice.push({ size });
    }
    return new DicePool(dice);
  }

  static d3() {
    return DicePool.xdy(1, 3);
  }
  static d4() {
    return DicePool.xdy(1, 4);
  }
  static d6() {
    return DicePool.xdy(1, 6);
  }
  static d8() {
    return DicePool.xdy(1, 8);
  }
  static d10() {
    return DicePool.xdy(1, 10);
  }

  addDice(extraDice: { size: number }[]): DicePool {
    const newDice = [...this.dice, ...extraDice].sort((a, b) => a.size - b.size);
    return new DicePool(newDice, this.flatModifier, this.maximized, this.multiplier, this.weak);
  }

  addModifier(flatModifier: number): DicePool {
    return new DicePool(
      this.dice,
      this.flatModifier + flatModifier,
      this.maximized,
      this.multiplier,
      this.weak,
    );
  }

  multiply(multiplier: number): DicePool {
    return new DicePool(this.dice, this.flatModifier, this.maximized, multiplier, this.weak);
  }

  private calcFlatModifier(): number {
    let modifier = this.flatModifier * this.multiplier;
    if (this.weak) {
      modifier *= 0.5;
    }
    return Math.floor(modifier);
  }

  toString(): string {
    const counts: Record<number, number> = {};
    for (const die of this.dice) {
      counts[die.size] = (counts[die.size] || 0) + 1;
    }

    const containedSizes = Object.keys(counts)
      .map(Number)
      .sort((a, b) => a - b);

    if (this.maximized) {
      let sum = 0;
      for (const size of containedSizes) {
        sum += size * counts[size];
      }
      sum *= this.multiplier;
      sum += this.calcFlatModifier();
      return sum.toString();
    } else {
      const diceTexts: string[] = containedSizes.map(
        (size) => `${counts[size] * this.multiplier}d${size}`,
      );
      const modifier = this.calcFlatModifier();
      if (modifier > 0) {
        diceTexts.push(`+${modifier}`);
      } else if (modifier < 0) {
        diceTexts.push(`${modifier}`);
      }
      return diceTexts.join('+').replace(/\+-/g, '-');
    }
  }

  calcScaledPool(powerScalings: PowerScaling[], power: number): DicePool {
    let combinedPool: DicePool = this;

    // Add flat modifier
    let addedFlat = 0;
    for (const scaling of powerScalings) {
      if (scaling.powerPerPlus1Modifier > 0) {
        addedFlat += Math.floor(power / scaling.powerPerPlus1Modifier);
      }
    }
    combinedPool = combinedPool.addModifier(addedFlat);

    // Add extra dice
    for (const scaling of powerScalings) {
      if (scaling.powerPerDice > 0 && scaling.dice) {
        const addedDice = scaling.dice.dice;
        const count = Math.floor(power / scaling.powerPerDice);
        for (let i = 0; i < count; i++) {
          combinedPool = combinedPool.addDice(addedDice);
        }
      }
    }

    return combinedPool;
  }
}

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
