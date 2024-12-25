export function latexify(text: string): string {
  if (text.includes("<" || text.includes(">"))) {
    console.error(`Problem latexifying text: contains <> (${text.trim().slice(0, 30)})`);
  }

  const pcrefMatch = text.match(/[^\\]pcref\{.*/g)
  if (pcrefMatch) {
    console.error(`Problem latexifying text: contains unprefixed pcref (${pcrefMatch.slice(0, 30)})`);
  }
  const traitMatch = text.match(/[^\\]trait\{.*/g);
  if (traitMatch) {
    console.error(`Problem latexifying text: contains unprefixed trait (${traitMatch.slice(0, 30)})`);
  }
  const glosstermMatch = text.match(/[^\\]glossterm\{.*/g);
  if (glosstermMatch) {
    console.error(`Problem latexifying text: contains unprefixed glossterm (${glosstermMatch.slice(0, 30)})`);
  }
  const tabMatch = text.match(/\t.*/g);
  if (tabMatch) {
    console.error(`Problem latexifying text: contains actual tab character (${tabMatch.slice(0, 30)})`);
  }
  const plusMatch = text.match(/[^\\]plus\d.*/g);
  if (plusMatch) {
    console.error(`Problem latexifying text: contains unprefixed add (${plusMatch.slice(0, 30)})`);
  }
  const minusMatch = text.match(/[^\\]minus\d.*/g);
  if (minusMatch) {
    console.error(`Problem latexifying text: contains unprefixed minus (${minusMatch.slice(0, 30)})`);
  }
  const damageRankMatch = text.match(/[^\\]damagerank\{.*/g)
  if (damageRankMatch) {
    console.error(`Problem latexifying text: contains unprefixed damagerank (${damageRankMatch.slice(0, 30)})`);
  }

  return text
    .replace(/ \+ /g, " \\add ")
    .replace(/\+(\d)/g, "\\plus$1")
    .replace(/ - (\d)/g, " \\sub $1")
    .replace(/-(\d)/, "\\minus$1");
}
