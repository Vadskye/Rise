import { Exposure, PoisonForm } from './types';
import { poisons } from './data/consumables/poisons';

export interface PoisonDefinition {
  accuracyModifier?: number;
  injury: boolean;
  it: string;
  name: string;
}

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

export function getPoisonNames(): string[] {
  return poisons()
    .map((tool) => tool.item.name.replace(/^Poison,\s*/i, ''))
    .sort();
}

export function getPoisonByName(name: string): PoisonDefinition | undefined {
  const normalizedSearch = name.trim().toLowerCase();
  const tool = poisons().find((t) => {
    const itemName = t.item.name.toLowerCase();
    const shortName = itemName.replace(/^poison,\s*/i, '');
    return itemName === normalizedSearch || shortName === normalizedSearch;
  });

  if (!tool) {
    return undefined;
  }

  const desc = tool.item.description;
  const isInjury = desc.includes('injury-based');

  // Parse accuracy modifier e.g. "$consumableaccuracy+4", "$consumableaccuracy-3", or "$consumableaccuracy"
  let accuracyModifier: number | undefined = undefined;
  const accMatch = desc.match(/\$consumableaccuracy([+-]\d+)?/);
  if (accMatch) {
    if (accMatch[1]) {
      accuracyModifier = parseInt(accMatch[1], 10);
    } else {
      accuracyModifier = 0;
    }
  }

  // Extract the effect statement following the accuracy line
  // Descriptions look like:
  // "This is an injury-based liquid poison (see \pcref{Poison}).\nThe poison's accuracy is $consumableaccuracy+1.\nIt inflicts $dr3l damage..."
  const lines = desc
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const effectLines: string[] = [];
  let foundAcc = false;

  for (const line of lines) {
    if (foundAcc) {
      effectLines.push(line);
    } else if (line.includes("The poison's accuracy is")) {
      foundAcc = true;
    }
  }

  let effectText = effectLines.join(' ').trim();
  if (!effectText) {
    effectText = tool.item.short_description || '';
  }

  // Format `it` clause: strip leading "It " or "The poison " if present so `It ${poison.it}` forms a natural sentence
  if (/^it\s+/i.test(effectText)) {
    effectText = effectText.replace(/^it\s+/i, '');
  }

  if (effectText && !effectText.endsWith('.')) {
    effectText += '.';
  }

  return {
    name: tool.item.name,
    injury: isInjury,
    accuracyModifier,
    it: effectText,
  };
}
