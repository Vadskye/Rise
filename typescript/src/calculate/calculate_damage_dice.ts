export interface DamageDice {
  count: number;
  flatBonus: number;
  size: number;
}

export function calculateDamageDice(power: number): DamageDice {
  let count = 1;
  let size = 8;
  for (let i = 2; i <= power; i += 2) {
    size += 2;
    if (size > 10) {
      if (count < 4) {
        count *= 2;
        size = 6;
      } else {
        count += 1;
        size = 10;
      }
    }
  }

  let flatBonus = 0;
  if (count > 8) {
    flatBonus = (count - 8) * 10;
    count = 8;
  }

  return { flatBonus, count, size };
}
