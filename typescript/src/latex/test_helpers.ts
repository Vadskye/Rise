export function removeIndentation(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trimStart())
    .join('\n');
}

// This is mainly useful for writing tests for long strings in code more easily.
// It doesn't faithfully keep original surrounding whitespace - instead, it always starts the
// final string with a line break and ends with no line break.
export function nonIndentedBlock(text: string): string {
  const noIndentation = text
    .trim()
    .split('\n')
    .map((line) => line.trimStart())
    .join('\n');
  // It's easier to write the strings in code if we have a preceding line break
  return `\n${noIndentation}`;
}
