// This is better than the lodash implementation because it preserves the types of the keys
export function fromPairs<D, V>(input: Array<[keyof D, V]>): Record<keyof D, V> {
  const dict: Partial<Record<keyof D, V>> = {};
  for (const [key, value] of input) {
    dict[key] = value;
  }
  return dict as Record<keyof D, V>;
}
