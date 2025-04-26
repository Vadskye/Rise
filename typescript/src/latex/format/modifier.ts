export function modifier(value: number | null): string {
  if (value === null) {
    return 'N/A';
  } else if (value < 0) {
    return `\\minus${Math.abs(value)}`;
  } else {
    return `\\plus${value}`;
  }
}
