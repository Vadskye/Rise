import { uppercaseFirst } from './uppercase_first';

// There are a lot of nuances to sentence case, all of which we will ignore unless it's
// proven that we have to care. There is a `sentenceCase` function in the `change-case`
// module, but it does weird extra logic to replace commas and semicolons, so it's not
// trustworthy.
export function sentenceCase(text: string): string {
  return uppercaseFirst(text.toLowerCase());
}
