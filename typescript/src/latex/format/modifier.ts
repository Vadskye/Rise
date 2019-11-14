export function modifier(value: number) {
  if (value < 0) {
    return `\\minus${Math.abs(value)}`;
  } else {
    return `\\plus${value}`;
  }
}
