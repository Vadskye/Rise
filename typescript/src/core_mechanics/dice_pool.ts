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
