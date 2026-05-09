import { uppercaseFirst } from './uppercase_first';

// There are a lot of nuances to title case, all of which we will ignore unless it's
// proven that we have to care.
const SMALL_WORDS = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'for',
  'if',
  'in',
  'nor',
  'of',
  'on',
  'or',
  'so',
  'the',
  'to',
  'up',
  'yet',
]);

export function titleCase(text: string): string {
  return text
    .split(' ')
    .map((word, index) => {
      if (index > 0 && SMALL_WORDS.has(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return uppercaseFirst(word);
    })
    .join(' ');
}
