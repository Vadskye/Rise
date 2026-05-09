import {
  RiseSize,
  RiseDebuff,
  RiseTag,
} from '../character_sheet/rise_data';

export * from '../core_mechanics/attributes';
import { Defense } from '../core_mechanics/attributes';

export type Size = RiseSize;
export type Debuff = RiseDebuff;
export type Tag = RiseTag;

export class DamageDice {
  constructor(
    public readonly count: number,
    public readonly size: number,
    public readonly increments: number,
    public readonly maximized: boolean = false,
  ) {}

  static new(increments: number): DamageDice {
    if (increments >= 13) {
      return new DamageDice(increments - 8, 10, increments);
    }

    let currentIncrements = increments;
    let count = 1;
    while (currentIncrements > 6) {
      currentIncrements -= 3;
      count *= 2;
    }

    let size: number;
    switch (currentIncrements) {
      case -2:
      case -1:
      case 0:
        size = 1;
        break;
      case 1:
        size = 2;
        break;
      case 2:
        size = 3;
        break;
      case 3:
        size = 4;
        break;
      case 4:
        size = 6;
        break;
      case 5:
        size = 8;
        break;
      case 6:
        size = 10;
        break;
      default:
        throw new Error(`Invalid dice increments ${increments}`);
    }

    return new DamageDice(count, size, increments);
  }

  static d3() {
    return DamageDice.new(2);
  }
  static d4() {
    return DamageDice.new(3);
  }
  static d6() {
    return DamageDice.new(4);
  }
  static d8() {
    return DamageDice.new(5);
  }
  static d10() {
    return DamageDice.new(6);
  }

  add(increments: number): DamageDice {
    const newDice = DamageDice.new(this.increments + increments);
    return new DamageDice(newDice.count, newDice.size, newDice.increments, this.maximized);
  }

  toString(): string {
    if (this.size === 1) {
      return '1';
    } else if (this.maximized) {
      return `${this.count * this.size}`;
    } else {
      return `${this.count}d${this.size}`;
    }
  }

  averageDamage(): number {
    if (this.maximized) {
      return this.count * this.size;
    } else {
      return (this.count * (this.size + 1)) / 2;
    }
  }
}

export type Resource = 'aura' | 'fatigue' | 'health' | 'mana' | 'stamina';

export type Sense =
  | { kind: 'Darkvision'; range: number }
  | { kind: 'LowLightVision' }
  | { kind: 'Scent' }
  | { kind: 'Tremorsense'; range: number }
  | { kind: 'Truesight'; range: number };

export type ComplexDebuff =
  | Debuff
  | { kind: 'Charmed'; source: string }
  | { kind: 'Frightened'; source: string }
  | { kind: 'Panicked'; source: string }
  | { kind: 'Vulnerable'; defense: Defense };
