import { uppercaseFirst } from './uppercase_first';

// There are a lot of nuances to title case, all of which we will ignore unless it's
// proven that we have to care.
export function titleCase(text: string): string {
  return text.split(' ').map(uppercaseFirst).join(' ');
}
