import type { PowerScaling } from './power_scaling';

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

  static flat(value: number): DicePool {
    return new DicePool([], value);
  }

  static newDie(die: { size: number }): DicePool {
    return new DicePool([die]);
  }

  static xdy(count: number, size: number): DicePool {
    return DicePool.xdyPlus(count, size, 0);
  }

  static xdyPlus(count: number, size: number, flatModifier: number): DicePool {
    const dice = [];
    for (let i = 0; i < count; i++) {
      dice.push({ size });
    }
    return new DicePool(dice, flatModifier);
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

  addDie(size: number): DicePool {
    return this.addDice([{ size }]);
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

  maximize(): DicePool {
    return new DicePool(this.dice, this.flatModifier, true, this.multiplier, this.weak);
  }

  makeWeak(): DicePool {
    return new DicePool(this.dice, this.flatModifier, this.maximized, this.multiplier, true);
  }

  eliteDouble(): DicePool {
    return new DicePool(
      [...this.dice, ...this.dice].sort((a, b) => a.size - b.size),
      this.flatModifier * 2,
      this.maximized,
      this.multiplier,
      this.weak,
    );
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
      const diceTexts: string[] = containedSizes
        .map((size) => {
          const count = counts[size] * this.multiplier;
          return count !== 0 ? `${count}d${size}` : '';
        })
        .filter((t) => t !== '');

      const modifier = this.calcFlatModifier();
      if (modifier !== 0 || diceTexts.length === 0) {
        diceTexts.push(modifier.toString());
      }
      return diceTexts.join('+').replace(/\+-/g, '-');
    }
  }

  averageDamage(): number {
    let sum = 0;
    for (const die of this.dice) {
      if (this.maximized) {
        sum += die.size;
      } else {
        sum += (die.size + 1) / 2;
      }
    }
    sum *= this.multiplier;
    sum += this.flatModifier * this.multiplier * (this.weak ? 0.5 : 1);
    return sum;
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
