export function caseInsensitiveSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: 'base' });
}
