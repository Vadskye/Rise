const tagPattern = /([^(]+) ?(\([^)]+\))?/;

export function formatTagLatex(tag: string): string {
  if (tag.includes('abilitytag')) {
    return tag;
  }
  const match = tag.match(tagPattern);
  if (!match) {
    throw new Error(`Unable to parse tag '${tag}'`);
  }

  const tagName = match[1].trim();
  const parenthetical = match[2];
  return parenthetical ? `\\abilitytag{${tagName}} ${parenthetical}` : `\\abilitytag{${tagName}}`;
}
