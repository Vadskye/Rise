import { DicePool } from './dice_pool';

export class PowerScaling {
  constructor(
    public readonly dice: DicePool | null,
    public readonly powerPerDice: number,
    public readonly powerPerPlus1Modifier: number,
  ) {}

  static standardWeaponScaling(): PowerScaling {
    return new PowerScaling(null, 0, 2);
  }

  static heavyWeaponScalings(): PowerScaling[] {
    return [PowerScaling.standardWeaponScaling(), new PowerScaling(null, 0, 3)];
  }
}
