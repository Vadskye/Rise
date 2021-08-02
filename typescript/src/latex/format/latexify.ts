export function latexify(text: string): string {
  if (text.includes("<" || text.includes(">"))) {
    console.error(`Problem latexifying text: contains <> (${text.trim().slice(0, 30)})`);
  }
  return text
    .replace(/ \+ /g, " \\add ")
    .replace(/\+(\d)/g, "\\plus$1")
    .replace(/ - (\d)/g, " \\sub $1")
    .replace(/-(\d)/, "\\minus$1");
}
