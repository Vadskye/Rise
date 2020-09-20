import { calculateDamageDice } from "@src/calculate";

export function damageDice(power: number): string {
  const { flatBonus, count, size } = calculateDamageDice(power);
  if (flatBonus) {
    return `${count}d${size}+${flatBonus}`;
  } else {
    return `${count}d${size}`;
  }
}
