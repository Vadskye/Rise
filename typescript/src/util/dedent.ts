export function dedent(text: string, indentSpaces: number = 0): string {
  const lines = text.split('\n');
  if (lines.length === 0) return '';

  // Find minimum indentation of non-empty lines (excluding the first line if it's empty)
  let minIndent = Infinity;
  const startIdx = lines[0].trim() === '' ? 1 : 0;
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    const indent = line.search(/\S/);
    if (indent !== -1 && indent < minIndent) {
      minIndent = indent;
    }
  }

  if (minIndent === Infinity) return text.trim();

  const indentStr = ' '.repeat(indentSpaces);
  return lines
    .slice(startIdx)
    .map((line) => {
      const trimmed = line.slice(minIndent);
      return trimmed === '' ? '' : indentStr + trimmed;
    })
    .join('\n')
    .trim();
}
