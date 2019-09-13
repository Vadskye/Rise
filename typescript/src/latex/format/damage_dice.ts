export function damageDice(power: number): string {
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

  return `${count}d${size}`;
}
