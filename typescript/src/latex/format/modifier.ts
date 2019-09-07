export function modifier(value: number) {
  if (value < 0) {
    return `\\minus${value}`;
  } else {
    return `\\plus${value}`;
  }
}
