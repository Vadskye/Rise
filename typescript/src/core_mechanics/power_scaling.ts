import type { DicePool } from './dice_pool';

export interface PowerScaling {
  dice?: DicePool;
  powerPerDice: number;
  powerPerPlus1Modifier: number;
}

export function standardWeaponScaling(): PowerScaling {
  return { powerPerDice: 0, powerPerPlus1Modifier: 2 };
}

export function heavyWeaponScalings(): PowerScaling[] {
  return [standardWeaponScaling(), { powerPerDice: 0, powerPerPlus1Modifier: 3 }];
}
