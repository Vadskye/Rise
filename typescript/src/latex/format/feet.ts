export function feet(value: number): string {
  if (value % 1 === 0.5) {
    return `${Math.floor(value)}-1/2 ft.`;
  } else if (value % 1 === 0) {
    return `${value} ft.`;
  } else {
    throw new Error(`It doesn't make sense to have decimal feet: '${value}'`);
  }
}
