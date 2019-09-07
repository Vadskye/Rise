export function feet(value: number): string {
  if (value % 1 === 0.5) {
    return `${Math.floor(value)}-1/2 ft.`;
  } else {
    return `${value} ft.`;
  }
}
