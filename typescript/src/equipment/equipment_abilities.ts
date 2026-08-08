function ensureEndsWithPeriod(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return '';
  }
  if (trimmed.endsWith('.') || trimmed.endsWith('}')) {
    return trimmed;
  }
  return trimmed + '.';
}

export function combineDescriptions(baseDesc: string, upgradeDesc: string): string {
  let desc = baseDesc;

  // 1. Range upgrades: e.g. "The range increases to \longrange."
  const rangeMatch = upgradeDesc.match(/range increases to (\\(?:short|med|long)range)/i);
  if (rangeMatch) {
    desc = desc.replace(/\\(?:short|med|long)range/g, rangeMatch[1]);
  }

  // 2. Damage upgrades: e.g. "The damage increases to $dr5l."
  const drMatch = upgradeDesc.match(/\$dr\d+l?/g);
  if (drMatch) {
    desc = desc.replace(/\$dr\d+l?/g, drMatch[0]);
  }

  // 3. Tanglefoot bag target/range upgrade
  if (
    upgradeDesc.includes(
      'affects each Large or smaller creature in a \\smallarea radius within \\medrange',
    )
  ) {
    desc = desc.replace(
      /against one Large or smaller creature within \\shortrange/i,
      'against each Large or smaller creature in a \\smallarea radius within \\medrange',
    );
  }

  // 4. "each target does not have to be injured" upgrades (Thunderstone / Dazing Sphere)
  if (upgradeDesc.includes('does not have to be injured')) {
    desc = desc.replace(/If the target is \\glossterm{injured},\s*/i, '');
    desc = desc.replace(/Each \\glossterm{injured} creature is/i, 'Each creature is');
  }

  return desc;
}

export interface ParsedConsumable {
  targeting: string;
  hit?: string;
  miss?: string;
  injury?: string;
  crit?: string;
}

export function parseConsumableDescription(description: string): ParsedConsumable {
  const result: ParsedConsumable = { targeting: '' };

  const tags = [
    { name: 'hit', pattern: /\\hit\b/ },
    { name: 'miss', pattern: /\\miss\b/ },
    { name: 'injury', pattern: /\\injury\b/ },
    { name: 'crit', pattern: /\\crit\b/ },
  ];

  const occurrences: { name: string; index: number; length: number }[] = [];
  for (const tag of tags) {
    const match = tag.pattern.exec(description);
    if (match) {
      occurrences.push({ name: tag.name, index: match.index, length: match[0].length });
    }
  }

  occurrences.sort((a, b) => a.index - b.index);

  let targetingRaw =
    occurrences.length > 0 ? description.substring(0, occurrences[0].index) : description;

  targetingRaw = targetingRaw.trim();
  targetingRaw = targetingRaw.replace(
    /^You can throw this item as a (standard|minor|triggered|action) action\.\s*(When you do,\s*)?/i,
    '',
  );
  targetingRaw = targetingRaw.replace(
    /^You can activate this item as a (standard|minor|triggered|action) action\.\s*(As part of that action, you can optionally throw it anywhere within \\(?:short|med|long)range\.\s*)?(When you activate this item,\s*)?/i,
    '',
  );
  targetingRaw = targetingRaw.replace(/^When you do,\s*/i, '');

  result.targeting = ensureEndsWithPeriod(targetingRaw);
  if (result.targeting.length > 0) {
    result.targeting = result.targeting.charAt(0).toUpperCase() + result.targeting.slice(1);
  }

  for (let i = 0; i < occurrences.length; i++) {
    const current = occurrences[i];
    const nextIndex = i + 1 < occurrences.length ? occurrences[i + 1].index : description.length;
    const content = description.substring(current.index + current.length, nextIndex).trim();
    result[current.name as 'hit' | 'miss' | 'injury' | 'crit'] = ensureEndsWithPeriod(content);
  }

  return result;
}
