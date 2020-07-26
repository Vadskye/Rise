import { calculateDamageDice } from "@src/calculate";

export function damageDice(power: number): string {
  const { count, size } = calculateDamageDice(power);
  return `${count}d${size}`;
}
