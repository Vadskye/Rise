import { SpellDefinition, CantripDefinition } from './active_abilities';
import { getSpellByName } from './mystic_spheres';

export interface SpellProfile {
  name: SpellDefinition['name'];
  sphereName: string;
  rank: SpellDefinition['rank'];
  isDoubleAction: boolean;
  isNonAction: boolean;
  range: string;
  defenses: string[];
  area: string;
  areaSize: string;
  damageRank: number | null;
  isLowPower: boolean;
  appliedEffects: string[];
  accuracyModifier: number;
  accuracyCondition: string | null;
  specialRequirements: string[];
  isDelayed: boolean;
  hasCost: boolean;
  roles: SpellDefinition['roles'];
  hasAttack: boolean;
  type?: SpellDefinition['type'];
  healingRank: number | null;
  areaGrows: boolean;
  halfOnMiss: boolean;
  maxTargets: number;
  hasInjuryDamage: boolean;
  isSustainedMinor: boolean;
  isAttunable: boolean;
  enemiesOnly: boolean;
  isRepeating: boolean;
  providesCover: boolean;
  hasSelfHitPenalty: boolean;
  isInjuryDoubleDamage: boolean;
  isInjuryOnly: boolean;
  hasAttuneStandardAttack: boolean;
  hasEscapableRepeat: boolean;
  isSelfEmpowered: boolean;
  isSelfMaximized: boolean;
}

export const RANK_WORDS: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

export const RANGE_ORDER = ['none', 'self', 'melee', 'short', 'medium', 'long', 'distant'] as const;
export const AREA_SIZE_ORDER = [
  'none',
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
  'gargantuan',
] as const;

export function parseDamageRank(text: string): number | null {
  const matches = [...text.matchAll(/\\damagerank(\w+)/gi)];
  if (matches.length === 0) {
    return null;
  }

  const firstWord = matches[0][1].toLowerCase().replace('low', '');
  let baseRank = RANK_WORDS[firstWord] !== undefined ? RANK_WORDS[firstWord] : null;
  if (baseRank === null) {
    return null;
  }

  // If there are multiple damageranks, and it has DoT keywords, add +2
  if (matches.length >= 2) {
    const lowercase = text.toLowerCase();
    if (
      lowercase.includes('burn') ||
      lowercase.includes('bleed') ||
      lowercase.includes('corrode') ||
      lowercase.includes('poison') ||
      lowercase.includes('next turn') ||
      lowercase.includes('each turn') ||
      lowercase.includes('subsequent turn') ||
      lowercase.includes('subsequent round') ||
      lowercase.includes('each of your') ||
      lowercase.includes('each round')
    ) {
      baseRank += 2;
    }
  }
  return baseRank;
}

export function parseHealingRank(text: string): number | null {
  const match = text.match(/\\hprank(\w+)/i);
  if (!match) {
    return null;
  }
  const word = match[1].toLowerCase().replace('low', '');
  return RANK_WORDS[word] !== undefined ? RANK_WORDS[word] : null;
}

export function parseDefenses(text: string): string[] {
  const lowercase = text.toLowerCase();
  const defenses = ['fortitude', 'reflex', 'mental', 'brawn', 'armor'];
  const matched: string[] = [];
  for (const def of defenses) {
    const regex = new RegExp(`(vs\\.|against|and)\\s+(\\\\glossterm{)?${def}`, 'i');
    if (regex.test(lowercase)) {
      matched.push(def);
    }
  }
  if (matched.length === 0 && lowercase.includes('strike')) {
    matched.push('armor');
  }
  return matched.sort();
}

export function parseRange(text: string): string {
  const lowercase = text.toLowerCase();
  if (
    lowercase.includes('touch') ||
    lowercase.includes('\\glossterm{touch}') ||
    lowercase.includes('adjacent creature') ||
    lowercase.includes('adjacent target') ||
    /against\s+(?:something|anything|one|a|the|target|creature|an)\b.*adjacent/i.test(lowercase)
  ) {
    return 'melee';
  }
  if (
    lowercase.includes('from you') ||
    lowercase.includes('adjacent to you') ||
    lowercase.includes('from your location') ||
    lowercase.includes('around you') ||
    lowercase.includes('emanation')
  ) {
    return 'self';
  }
  if (lowercase.includes('\\distrange')) {
    return 'distant';
  }
  if (lowercase.includes('\\longrange')) {
    return 'long';
  }
  if (lowercase.includes('\\medrange')) {
    return 'medium';
  }
  if (lowercase.includes('\\shortrange')) {
    return 'short';
  }
  return 'none';
}

export function parseArea(text: string): string {
  const lowercase = text.toLowerCase();
  if (lowercase.includes('vertical line')) {
    return 'vertical-line';
  }
  if (lowercase.includes('cone')) {
    return 'cone';
  }
  if (
    lowercase.includes('radius') ||
    lowercase.includes('emanation') ||
    lowercase.includes('zone') ||
    lowercase.includes('adjacent to you')
  ) {
    return 'radius';
  }
  if (lowercase.includes('line')) {
    return 'line';
  }
  if (lowercase.includes('wall')) {
    return 'wall';
  }
  if (lowercase.includes('chain')) {
    return 'chain';
  }
  if (
    lowercase.includes('up to') &&
    (lowercase.includes('targets') || lowercase.includes('creatures'))
  ) {
    return 'multi';
  }
  return 'single';
}

// Return from smallest to largest.
// This gives slightly better results for spells that grow in area,
// though we should really handle that explicitly.
export function parseAreaSize(text: string): string {
  const lowercase = text.toLowerCase();
  if (lowercase.includes('\\tinyarea') || lowercase.includes('adjacent to you')) {
    return 'tiny';
  }
  if (lowercase.includes('\\smallarea')) {
    return 'small';
  }
  if (lowercase.includes('\\medarea')) {
    return 'medium';
  }
  if (lowercase.includes('\\largearea')) {
    return 'large';
  }
  if (lowercase.includes('\\hugearea')) {
    return 'huge';
  }
  if (lowercase.includes('\\gargarea')) {
    return 'gargantuan';
  }

  return 'none';
}

/**
 * Parses all status-altering effects applied by the spell, including both:
 * - Persistent conditions (e.g. slowed, dazed, prone)
 * - Brief/temporary buffs and debuffs (e.g. shielded, focused, unable to breathe)
 *
 * This allows the validator to compare spell similarity and strict superiority
 * regardless of whether the effect is a formal Rise "condition" or a brief status effect.
 */
export function parseAppliedEffects(text: string): string[] {
  const lowercase = text.toLowerCase();
  const effects = [
    'slowed',
    'dazed',
    'blinded',
    'prone',
    'confused',
    'dazzled',
    'goaded',
    'unsteady',
    'grappled',
    'weakened',
    'vulnerable',
    'exposed',
    'dread',
    'shaken',
    'poisoned',
    'frightened',
    'panicked',
    'immobilized',
    'charmed',
    'deafened',
    'shielded',
    'focused',
    'braced',
    'empowered',
    'fortified',
    'honed',
    'maximized',
    'primed',
    'steeled',
    'resistant',
    'unable to breathe',
    'difficult terrain',
    'liquify',
    'failure chance',
    'fling',
    'push',
    'teleport',
    'burn',
    'corrode',
    'bleed',
    'poison',
    'frozen',
    'stasis',
    'cannot act',
    'invisible',
  ];
  const result: string[] = [];
  for (const e of effects) {
    let index = lowercase.indexOf(e);
    if (index === -1) {
      continue;
    }

    let allBrief = true;
    while (index !== -1) {
      const start = Math.max(0, index - 20);
      const preText = lowercase.substring(start, index);
      if (!preText.includes('briefly')) {
        allBrief = false;
        break;
      }
      index = lowercase.indexOf(e, index + 1);
    }

    if (allBrief) {
      result.push(`briefly:${e}`);
    } else {
      result.push(e);
    }
  }
  return result;
}

export function parseAccuracyModifier(text: string): number {
  const lowercase = text.toLowerCase();
  const match = lowercase.match(/with a\s+(\\plus|\\minus|\+|-)(\d+)\s+(?:\\glossterm{)?accuracy/i);
  if (match) {
    const sign = match[1].toLowerCase() === '\\minus' || match[1] === '-' ? -1 : 1;
    return sign * Number(match[2]);
  }
  return 0;
}

export function parseAccuracyCondition(text: string): string | null {
  const lowercase = text.toLowerCase();
  const hasAny = /(\\plus|\\minus|\+|-)\d+\s+(?:\\glossterm{)?accuracy/i.test(lowercase);
  if (!hasAny) {
    return null;
  }

  const hasUnconditional = /with a\s+(\\plus|\\minus|\+|-)\d+\s+(?:\\glossterm{)?accuracy/i.test(
    lowercase,
  );
  if (hasUnconditional) {
    return null;
  }

  const match = lowercase.match(
    /(?:accuracy bonus|accuracy penalty)\s+(?:if|against|when|for)\s+([^.]+)/i,
  );
  return match ? match[1].trim() : 'conditional';
}

export function parseSpecialRequirements(text: string): string[] {
  const lowercase = text.toLowerCase();
  const requirements: string[] = [];
  if (lowercase.includes('corpse')) {
    requirements.push('corpse');
  }
  if (lowercase.includes('shadowed')) {
    requirements.push('shadowed');
  }
  if (lowercase.includes('injured')) {
    requirements.push('injured');
  }
  if (lowercase.includes('fails') || lowercase.includes('automatically fails')) {
    requirements.push('fails');
  }
  if (
    lowercase.includes('removed if') ||
    lowercase.includes('removed by') ||
    lowercase.includes('ends if') ||
    lowercase.includes('ends early if')
  ) {
    requirements.push('removable');
  }
  if (lowercase.includes('free hand') || lowercase.includes('freehand')) {
    requirements.push('free hand');
  }
  return requirements.sort();
}

export function parseIsDelayed(hit: string, targeting: string): boolean {
  const text = `${hit} ${targeting}`.toLowerCase();
  if (text.includes('returns to normal') || text.includes('return to normal')) {
    return false;
  }
  return (
    (text.includes('next turn') ||
      text.includes('next round') ||
      text.includes('delayed') ||
      text.includes('when it returns')) &&
    !text.includes('until your next turn')
  );
}

export function parseIsRepeating(text: string, isDelayed: boolean): boolean {
  const lowercase = text.toLowerCase();

  let hasAgain = false;
  const matches = [...lowercase.matchAll(/\bagain\b/g)];
  for (const match of matches) {
    const matchIndex = match.index!;
    const start = Math.max(0, matchIndex - 50);
    const preText = lowercase.substring(start, matchIndex);
    const isNegated =
      /\b(?:can't|cannot|not|never)\b/i.test(preText) &&
      (preText.includes('use') ||
        preText.includes('cast') ||
        preText.includes('make') ||
        preText.includes('trigger') ||
        preText.includes('control') ||
        preText.includes('perform'));
    if (!isNegated) {
      hasAgain = true;
      break;
    }
  }

  return (
    hasAgain ||
    /\brepeats?\b/i.test(lowercase) ||
    /\bsubsequent\b/i.test(lowercase) ||
    /each\s+(?:turn|round)/i.test(lowercase) ||
    (lowercase.includes('next turn') && !isDelayed)
  );
}

export function parseProvidesCover(text: string): boolean {
  return text.toLowerCase().includes('cover');
}

export function parseNumAreas(text: string): number {
  const lowercase = text.toLowerCase();
  const match = lowercase.match(
    /(one|two|three|four|five)\s+separate\s+(?:\\tinyarea|\\smallarea|\\medarea|\\largearea|\\hugearea|\\gargarea)?\s*(?:radius|cone|line|wall|zone|areas?)/i,
  );
  if (match) {
    const wordMap: Record<string, number> = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
    };
    return wordMap[match[1]] || 1;
  }
  return 1;
}

export function parseMaxTargets(text: string): number {
  const lowercase = text.toLowerCase();
  const match = lowercase.match(
    /(?:against\s+up\s+to|up\s+to|against)\s+(\w+|\d+)(?:\s+[\w-]+){0,4}?\s+(?:creatures?|targets?|enem(?:y|ies)|all(?:y|ies))/i,
  );
  if (match) {
    const val = match[1];
    if (/\d+/.test(val)) {
      return parseInt(val, 10);
    }
    const wordMap: Record<string, number> = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
    };
    if (wordMap[val] !== undefined) {
      return wordMap[val];
    }
  }
  return 1;
}

export function buildSpellProfile(
  spell: SpellDefinition | CantripDefinition,
  sphereName: string,
): SpellProfile {
  let hit = spell.attack?.hit || '';
  let targeting = spell.attack?.targeting || '';
  let injury = spell.attack?.injury || '';
  let effect = spell.effect || '';
  let type = spell.type;
  let cost = spell.cost;
  let staminaCost = spell.staminaCost;
  let materialCost = spell.materialCost;
  let halfOnMiss = spell.attack?.halfOnMiss === true;

  if (spell.functionsLike) {
    try {
      const base = getSpellByName(spell.functionsLike.name);
      if (base) {
        if (!hit && base.attack?.hit) {
          hit = base.attack.hit;
        }
        if (!targeting && base.attack?.targeting) {
          targeting = base.attack.targeting;
        }
        if (!injury && base.attack?.injury) {
          injury = base.attack.injury;
        }
        if (!effect && base.effect) {
          effect = base.effect;
        }
        if (!type && base.type) {
          type = base.type;
        }
        if (!cost && base.cost) {
          cost = base.cost;
        }
        if (staminaCost === undefined && base.staminaCost !== undefined) {
          staminaCost = base.staminaCost;
        }
        if (materialCost === undefined && base.materialCost !== undefined) {
          materialCost = base.materialCost;
        }
        if (!halfOnMiss && base.attack?.halfOnMiss === true) {
          halfOnMiss = true;
        }
      }
      let except = spell.functionsLike.exceptThat || '';
      if (spell.functionsLike.mass) {
        except = `it affects up to five creatures of your choice from among yourself and your \\glossterm{allies} within \\medrange. ${except}`;
      }
      if (spell.functionsLike.oneYear) {
        except = `the effect lasts for one year. ${except}`;
      }
      if (except) {
        const exceptDr = parseDamageRank(except);
        if (exceptDr !== null) {
          hit = `${except} ${hit}`;
        } else {
          hit = `${hit} ${except}`;
        }
      }
    } catch {
      // If base lookup fails, proceed with raw spell definition
    }
  }

  const fullText = `${hit} ${targeting} ${injury} ${effect}`;
  const lowercase = fullText.toLowerCase();

  const isDoubleAction =
    /spend a (\\glossterm{)?standard action(})? to make an attack/i.test(fullText) ||
    /during your next turn, you can spend a/i.test(fullText);

  const defenses = parseDefenses(fullText);
  const range = parseRange(fullText);
  let area = parseArea(fullText);

  let areaSize = parseAreaSize(fullText);
  const numAreas = parseNumAreas(fullText);
  if (numAreas > 1) {
    const idx = (AREA_SIZE_ORDER as readonly string[]).indexOf(areaSize);
    if (idx !== -1 && idx < AREA_SIZE_ORDER.length - 1) {
      areaSize = AREA_SIZE_ORDER[idx + 1];
    }
  }

  const damageRank = parseDamageRank(fullText);
  const isLowPower = /\\damagerank\w+low/i.test(fullText);
  const appliedEffects = parseAppliedEffects(fullText);
  const accuracyModifier = parseAccuracyModifier(fullText);
  const accuracyCondition = parseAccuracyCondition(fullText);
  const specialRequirements = parseSpecialRequirements(fullText);

  const rawIsDelayed = parseIsDelayed(hit, targeting);
  const isRepeating = parseIsRepeating(fullText, rawIsDelayed);
  const isDelayed = rawIsDelayed && !isRepeating;

  const providesCover = parseProvidesCover(fullText);

  const isSustained =
    (type || '').toLowerCase().includes('sustain') ||
    (spell.tags || []).some((tag) => tag.toLowerCase().includes('sustain')) ||
    lowercase.includes('sustain');

  const isSustainedMinor =
    isSustained &&
    ((type || '').toLowerCase().includes('minor') ||
      (spell.tags || []).some((tag) => tag.toLowerCase().includes('minor')) ||
      /sustain\s*\([^)]*minor[^)]*\)/i.test(fullText));

  const isAttunable = (type || '').toLowerCase().includes('ttun') || lowercase.includes('attune');

  const hasCost =
    !!cost ||
    staminaCost === true ||
    materialCost === true ||
    (type || '').toLowerCase().startsWith('attune') ||
    lowercase.includes('cooldown');
  const roles = (spell.roles || [])
    .map((r) => r.toLowerCase() as SpellDefinition['roles'][number])
    .sort();

  const healingRank = parseHealingRank(fullText);
  const areaGrows = lowercase.includes('increases over time');

  const isNonAction =
    targeting.toLowerCase().includes('reactive attack') ||
    targeting.toLowerCase().includes('\\reactiveattack') ||
    targeting.toLowerCase().includes('whenever') ||
    lowercase.includes('minor action');

  const maxTargets = parseMaxTargets(fullText);

  if (maxTargets > 1 && area === 'single') {
    area = 'multi';
  }

  const hasInjuryDamage =
    injury.toLowerCase().includes('\\damagerank') ||
    injury.toLowerCase().includes('damage') ||
    lowercase.includes('extra damage');

  const enemiesOnly = /enem(y|ies)/i.test(targeting);

  const hasSelfHitPenalty =
    lowercase.includes('include yourself as a target') || lowercase.includes('yourself and all');

  const isInjuryDoubleDamage =
    !!injury &&
    (/\\damagerank/i.test(injury) ||
      /takes \\damagerank/i.test(injury) ||
      /burns? for \\damagerank/i.test(injury) ||
      /bleeds? for \\damagerank/i.test(injury));

  const isInjuryOnly = specialRequirements.includes('injured') && !/\\damagerank/i.test(hit);

  const hasAttuneStandardAttack =
    isAttunable &&
    (/as a (?:\\glossterm{)?standard action(?:})?/i.test(fullText) ||
      /spend a (?:\\glossterm{)?standard action(?:})?/i.test(fullText));

  const hasEscapableRepeat =
    lowercase.includes('repeats in the same area') ||
    (lowercase.includes('escapable') && lowercase.includes('repeat'));

  const isSelfEmpowered =
    /you (?:are|become)\s+(?:\\briefly\s+)?\\empowered/i.test(fullText) ||
    /the target is \\empowered/i.test(fullText);

  const isSelfMaximized =
    /you (?:are|become)\s+(?:\\briefly\s+)?\\maximized/i.test(fullText) ||
    /the target is \\maximized/i.test(fullText);

  return {
    name: spell.name,
    sphereName,
    rank: (spell.rank || 0) as SpellDefinition['rank'],
    isDoubleAction,
    isNonAction,
    range,
    defenses,
    area,
    areaSize,
    damageRank,
    isLowPower,
    appliedEffects,
    accuracyModifier,
    accuracyCondition,
    specialRequirements,
    isDelayed,
    hasCost,
    roles,
    hasAttack: !!spell.attack || !!spell.functionsLike,
    type,
    healingRank,
    areaGrows,
    halfOnMiss,
    maxTargets,
    hasInjuryDamage,
    isSustainedMinor,
    isAttunable,
    enemiesOnly,
    isRepeating,
    providesCover,
    hasSelfHitPenalty,
    isInjuryDoubleDamage,
    isInjuryOnly,
    hasAttuneStandardAttack,
    hasEscapableRepeat,
    isSelfEmpowered,
    isSelfMaximized,
  };
}
