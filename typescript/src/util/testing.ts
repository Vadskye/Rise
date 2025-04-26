// TODO: what type is t?
export function multilineEqual(t: any, expected: string, actual: string) {
  t.match(
    expected
      .trim()
      .split('\n')
      .map((line) => line.trim()),
    actual
      .trim()
      .split('\n')
      .map((line) => line.trim()),
  );
}
