import { Exposure, PoisonForm } from './types';

export function getPoisonDescription(exposure: Exposure, form: PoisonForm, effect: string): string {
  if (!effect.trim().startsWith('The poison')) {
    console.warn(`Poison effects should start with 'The poison': '${effect.trim()}'`);
  }

  const aAn = exposure === 'ingestion' || exposure === 'injury' ? 'an' : 'a';

  return `
    This is ${aAn} ${exposure}-based ${form} poison (see \\pcref{Poison}).
    ${effect}
  `.trim();
}
