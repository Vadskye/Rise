export function latexifyClass(text: string): string {
  return text
    .trim()
    .replace(/</g, '{')
    .replace(/>/g, '}')
    .replace(/ \+ /g, ' \\add ')
    .replace(/}\{\\lcol\}/g, '>{\\lcol}')
    .replace(/\+(\d)/g, '\\plus$1')
    .replace(/ - (\d)/g, ' \\sub $1')
    .replace(/ -(\d)/g, ' \\minus$1');
}
