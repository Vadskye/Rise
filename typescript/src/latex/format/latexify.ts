export function latexify(text: string): string {
  return text
    .replace(/ \+ /g, " \\add ")
    .replace(/\+(\d)/g, "\\plus$1")
    .replace(/ - (\d)/g, " \\sub $1")
    .replace(/-(\d)/, "\\minus$1");
}
