export function damageDice(power: number): string {
  let count = 1;
  let size = 8;
  for (let i = 0; i <= power; i += 2) {
    size += 2;
    if (size > 10) {
      count += 1;
      size = 6;
    }
  }

  return `${count}d${size}`;
}
