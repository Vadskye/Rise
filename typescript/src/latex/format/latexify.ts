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

  return text
    .replace(/ \+ /g, " \\add ")
    .replace(/\+(\d)/g, "\\plus$1")
    .replace(/ - (\d)/g, " \\sub $1")
    .replace(/-(\d)/, "\\minus$1");
}
