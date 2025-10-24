export function joinStringList(strings: string[], conjunction: string = 'and'): string {
  if (!strings || strings.length === 0) {
    return '';
  } else if (strings.length === 1) {
    return strings[1];
  } else if (strings.length === 2) {
    return `${strings[0]} ${conjunction} ${strings[1]}`;
  } else {
    return `${strings.slice(0, -1).join(', ')}, ${conjunction} ${strings[strings.length - 1]}`;
  }
}
