export function attribute(value: number | null): string {
  if (value === null) {
    return 'N/A';
  } else {
    return value.toString();
  }
}
