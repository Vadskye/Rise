export interface DamageDice {
  count: number;
  flatBonus: number;
  size: number;
}

export function calculateDamageDice(
  baseDamageDie: string,
  level: number,
  flatBonus: number,
): DamageDice {
  let [count, size] = baseDamageDie.split("d").map(Number);
  // +1d at 4/7/10, just like player abilities
  const bonusIncrements = Math.floor((level - 1) / 3);
  for (let i = 0; i < bonusIncrements; i += 1) {
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

  return { count, flatBonus, size };
}
