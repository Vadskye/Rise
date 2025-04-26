export function latexify(text: string): string {
  // It's sometimes valid to use '>' for table column definitions
  warnIfPattern(text, />[^{]/, "contains '>'");
  warnIfPattern(text, /</, "contains '<'");
  warnIfPattern(text, /[^\\]pcref\{.*/, "contains unprefixed pcref");

  warnIfPattern(text, /[^\\]trait\{.*/, "contains unprefixed trait");

  warnIfPattern(text, /[^\\]glossterm\{.*/, "contains unprefixed glossterm");

  warnIfPattern(text, /\t.*/, "contains actual tab character");

  warnIfPattern(text, /[^\\]plus\d.*/, "contains unprefixed add");

  warnIfPattern(text, /[^\\]minus\d.*/, "contains unprefixed minus");

  warnIfPattern(text, /[^\\]damagerank\{.*/, "contains unprefixed damagerank");

  return text
    .replace(/ \+ /g, " \\add ")
    .replace(/\+(\d)/g, "\\plus$1")
    .replace(/ - (\d)/g, " \\sub $1")
    .replace(/-(\d)/, "\\minus$1");
}

function warnIfPattern(text: string, pattern: RegExp, explanation: string) {
  if (text.match(pattern)) {
    const sliceStart = Math.max(0, text.search(pattern) - 15);
    const sliceEnd = Math.min(text.length, sliceStart + 30);
    console.error(`Problem latexifying text: ${explanation} (${text.slice(sliceStart, sliceEnd)})`);
  }
}
