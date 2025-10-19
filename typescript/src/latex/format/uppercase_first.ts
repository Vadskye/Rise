export function uppercaseFirst(text: string): string {
  if (!text) {
    return text;
  }
  // We uppercase the first letter of the string. This skips any amount of preceding
  // whitespace and special characters.
  return text.replace(/(\w)/, (_, char) => char.toUpperCase());
}
