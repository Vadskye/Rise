import { DamageDice } from "@src/calculate";

export function damageDice({ count, flatBonus, size }: DamageDice): string {
  if (flatBonus) {
    return `${count}d${size}+${flatBonus}`;
  } else {
    return `${count}d${size}`;
  }
}
