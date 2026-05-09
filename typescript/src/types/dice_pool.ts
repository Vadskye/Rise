import { PowerScaling } from './power_scaling';

export class Die {
  constructor(public readonly size: number) {}

  static new(size: number): Die {
    return new Die(size);
  }

  addIncrement(): Die[] {
    if (this.size < 4) {
      return [Die.new(this.size + 1)];
    } else if (this.size < 10) {
      return [Die.new(this.size + 2)];
    } else {
      return [Die.new(6), Die.new(6)];
    }
  }

  static d3() {
    return Die.new(3);
  }
  static d4() {
    return Die.new(4);
  }
  static d6() {
    return Die.new(6);
  }
  static d8() {
    return Die.new(8);
  }
  static d10() {
    return Die.new(10);
  }

  toString(): string {
    return `1d${this.size}`;
  }
}

export class DicePool {
  constructor(
    public readonly dice: Die[],
    public readonly flatModifier: number = 0,
    public readonly maximized: boolean = false,
    public readonly multiplier: number = 1,
    public readonly weak: boolean = false,
  ) {}

  static newDie(die: Die): DicePool {
    return new DicePool([die]);
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

  static empty(): DicePool {
    return new DicePool([]);
  }

  static xdy(count: number, size: number): DicePool {
    return DicePool.xdyPlus(count, size, 0);
  }

  static xdyPlus(count: number, size: number, flatModifier: number): DicePool {
    const dice: Die[] = [];
    for (let i = 0; i < count; i++) {
      dice.push(Die.new(size));
    }
    return new DicePool(dice, flatModifier);
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

  addDice(extraDice: Die[]): DicePool {
    const newDice = [...this.dice, ...extraDice].sort((a, b) => a.size - b.size);
    return new DicePool(newDice, this.flatModifier, this.maximized, this.multiplier, this.weak);
  }

  addDie(die: Die): DicePool {
    return this.addDice([die]);
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

  private calcFlatModifier(): number {
    let modifier = this.flatModifier * this.multiplier;
    if (this.weak) {
      modifier *= 0.5;
    }
    return modifier;
  }

  toString(): string {
    const counts = new Map<number, number>();
    for (const die of this.dice) {
      counts.set(die.size, (counts.get(die.size) || 0) + 1);
    }

    const containedSizes = Array.from(counts.keys()).sort((a, b) => a - b);

    if (this.maximized) {
      let sum = 0;
      for (const size of containedSizes) {
        sum += size * (counts.get(size) || 0);
      }
      sum *= this.multiplier;
      sum += Math.floor(this.calcFlatModifier());
      return sum.toString();
    } else {
      const diceTexts: string[] = containedSizes.map(
        (s) => `${(counts.get(s) || 0) * this.multiplier}d${s}`,
      );
      const modifier = Math.floor(this.calcFlatModifier());
      if (modifier !== 0) {
        diceTexts.push(modifier > 0 ? `+${modifier}` : `${modifier}`);
      }
      return diceTexts.join('+').replace(/\+\-/g, '-');
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
    sum += this.calcFlatModifier();
    return sum;
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

  calcScaledPool(powerScalings: PowerScaling[], power: number): DicePool {
    let combinedPool: DicePool = this;
    let flatModifier = this.flatModifier;

    for (const scaling of powerScalings) {
      if (scaling.powerPerPlus1Modifier > 0) {
        flatModifier += Math.floor(power / scaling.powerPerPlus1Modifier);
      }
    }

    combinedPool = new DicePool(
      this.dice,
      flatModifier,
      this.maximized,
      this.multiplier,
      this.weak,
    );

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
