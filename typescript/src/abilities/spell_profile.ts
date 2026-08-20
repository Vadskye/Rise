import { SpellDefinition, CantripDefinition, ActiveAbilityAttack } from './active_abilities';
import { getSpellByName, SphereName } from './mystic_spheres';

export const RANGE_ORDER = ['none', 'self', 'melee', 'short', 'medium', 'long', 'distant'] as const;
export type SpellRange = (typeof RANGE_ORDER)[number];

export const AREA_SIZE_ORDER = [
  'none',
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
  'gargantuan',
] as const;
export type AreaSize = (typeof AREA_SIZE_ORDER)[number];

export const SPELL_AREAS = [
  'single',
  'radius',
  'cone',
  'line',
  'wall',
  'vertical-line',
  'chain',
  'multi',
] as const;
export type SpellArea = (typeof SPELL_AREAS)[number];

export const DEFENSE_TYPES = ['armor', 'brawn', 'fortitude', 'mental', 'reflex'] as const;
export type DefenseType = (typeof DEFENSE_TYPES)[number];

export const BASE_APPLIED_EFFECTS = [
  'blinded',
  'braced',
  'cannot act',
  'charmed',
  'confused',
  'dazed',
  'dazzled',
  'deafened',
  'difficult terrain',
  'dread',
  'empowered',
  'exposed',
  'failure chance',
  'fling',
  'focused',
  'fortified',
  'frightened',
  'frozen',
  'goaded',
  'grappled',
  'honed',
  'immobilized',
  'invisible',
  'liquify',
  'maximized',
  'panicked',
  'poisoned',
  'primed',
  'prone',
  'push',
  'resistant',
  'shaken',
  'shielded',
  'slowed',
  'stasis',
  'steeled',
  'teleport',
  'unable to breathe',
  'unsteady',
  'vulnerable',
  'weakened',
] as const;
export type BaseAppliedEffect = (typeof BASE_APPLIED_EFFECTS)[number];
export type AppliedEffect = BaseAppliedEffect | `briefly:${BaseAppliedEffect}`;

export const SPECIAL_REQUIREMENTS = [
  'corpse',
  'fails',
  'free hand',
  'injured',
  'removable',
  'shadowed',
] as const;
export type SpecialRequirement = (typeof SPECIAL_REQUIREMENTS)[number];

export interface SpellProfile {
  name: SpellDefinition['name'];
  sphereName: SphereName;
  rank: SpellDefinition['rank'];
  isDoubleAction: boolean;
  isNonAction: boolean;
  range: SpellRange;
  defenses: DefenseType[];
  area: SpellArea;
  areaSize: AreaSize;
  /**
   * Maximum effective damage rank achieved when all conditional triggers (such as injury bonus
   * damage, execution clauses, or full damage-over-time ticks) are satisfied.
   * This represents the spell's full damage budget checked against damaging ability guidelines.
   */
  maxDamageRank: number | null;
  /**
   * Unconditional damage rank dealt on initial hit against an uninjured / healthy target.
   * For spells with conditional injury damage (e.g. Bleed dealing dr1 on hit + dr1 bleed if injured),
   * unconditionalDamageRank is 1 while maxDamageRank is 3. For flat burst spells (e.g. Fleshspike),
   * unconditionalDamageRank and maxDamageRank are both 3. For injury-only attacks, this is 0.
   */
  unconditionalDamageRank: number | null;
  // Inflicts damage over time (burn, bleed, etc.)
  hasDoT: boolean;
  isLowPower: boolean;
  appliedEffects: AppliedEffect[];
  accuracyModifier: number;
  accuracyCondition: string | null;
  specialRequirements: SpecialRequirement[];
  isDelayed: boolean;
  hasCost: boolean;
  roles: SpellDefinition['roles'];
  hasAttack: boolean;
  type?: SpellDefinition['type'];
  healingRank: number | null;
  areaGrows: boolean;
  halfOnMiss: boolean;
  isSingleTarget: boolean;
  maxTargets: number;
  hasInjuryDamage: boolean;
  isSustainedMinor: boolean;
  isAttunable: boolean;
  requiresAttunement: boolean;
  enemiesOnly: boolean;
  isRepeating: boolean;
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

export function parseDefenses(text: string): DefenseType[] {
  const lowercase = text.toLowerCase();
  const defenses: readonly DefenseType[] = ['fortitude', 'reflex', 'mental', 'brawn', 'armor'];
  const matched: DefenseType[] = [];
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

export function parseRange(text: string): SpellRange {
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
  if (lowercase.includes('\\distrange') && !/distrange of you.*disappears/.test(lowercase)) {
    return 'distant';
  }
  if (lowercase.includes('\\longrange') && !/longrange of you.*disappears/.test(lowercase)) {
    return 'long';
  }
  if (lowercase.includes('\\medrange') && !/medrange of you.*disappears/.test(lowercase)) {
    return 'medium';
  }
  if (lowercase.includes('\\shortrange') && !/shortrange of you.*disappears/.test(lowercase)) {
    return 'short';
  }
  return 'none';
}

export function parseArea(text: string): SpellArea {
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
  if (lowercase.includes('line') && !lowercase.includes('move in a straight line')) {
    return 'line';
  }
  if (lowercase.includes('wall')) {
    return 'wall';
  }
  if (lowercase.includes('chain')) {
    return 'chain';
  }
  if (/up to.*(targets|creatures)/.test(lowercase)) {
    return 'multi';
  }
  return 'single';
}

// Return from smallest to largest.
// This gives slightly better results for spells that grow in area,
// though we should really handle that explicitly.
export function parseAreaSize(text: string): AreaSize {
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
export function parseAppliedEffects(text: string): AppliedEffect[] {
  const lowercase = text.toLowerCase();
  const effects: readonly BaseAppliedEffect[] = BASE_APPLIED_EFFECTS;
  const result: AppliedEffect[] = [];
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

export function parseSpecialRequirements(text: string): SpecialRequirement[] {
  const lowercase = text.toLowerCase();
  const requirements: SpecialRequirement[] = [];
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
  const targetCountMatch = lowercase.match(
    /(?:against\s+up\s+to|up\s+to|against)\s+(\w+|\d+)(?:\s+[\w-]+){0,4}?\s+(?:creatures?|targets?|enem(?:y|ies)|all(?:y|ies))/i,
  );
  if (targetCountMatch) {
    const val = targetCountMatch[1];
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

export function resolveSpell<T extends SpellDefinition | CantripDefinition>(
  spell: T,
  visited: Set<string> = new Set(),
): T {
  if (!spell.functionsLike) {
    return spell;
  }

  const spellKey = spell.name?.toLowerCase() || '';
  if (visited.has(spellKey)) {
    return spell;
  }
  visited.add(spellKey);

  let base: SpellDefinition | CantripDefinition | undefined;
  try {
    base = getSpellByName(spell.functionsLike.name);
  } catch {
    return spell;
  }

  const resolvedBase = resolveSpell(base, visited);

  let attack: ActiveAbilityAttack | undefined;
  if (spell.attack) {
    attack = { ...spell.attack };
  } else if (resolvedBase.attack) {
    attack = { ...resolvedBase.attack };
  }

  let effect: string | undefined = spell.effect ?? resolvedBase.effect;

  const exceptThat = spell.functionsLike.exceptThat || '';
  const isMass = spell.functionsLike.mass === true;
  const isOneYear = spell.functionsLike.oneYear === true;

  const massText = isMass
    ? 'it affects up to five creatures of your choice from among yourself and your \\glossterm{allies} within \\medrange.'
    : '';
  const oneYearText = isOneYear ? 'the effect lasts for one year.' : '';

  if (attack) {
    let hit = attack.hit;
    let targeting = attack.targeting;
    if (massText) {
      targeting = targeting ? `${targeting} ${massText}` : massText;
    }
    if (oneYearText) {
      hit = hit ? `${hit} ${oneYearText}` : oneYearText;
    }
    if (exceptThat) {
      const exceptDr = parseDamageRank(exceptThat);
      if (exceptDr !== null) {
        hit = `${exceptThat} ${hit}`;
      } else {
        hit = `${hit} ${exceptThat}`;
      }
    }
    attack = {
      ...attack,
      hit,
      targeting,
    };
  } else if (effect !== undefined) {
    let newEffect = effect;
    if (massText) {
      newEffect = `${massText} ${newEffect}`;
    }
    if (oneYearText) {
      newEffect = `${newEffect} ${oneYearText}`;
    }
    if (exceptThat) {
      newEffect = `${newEffect} ${exceptThat}`;
    }
    effect = newEffect;
  }

  return {
    ...resolvedBase,
    ...spell,
    attack,
    effect,
    roles: spell.roles ?? resolvedBase.roles,
    type: spell.type ?? resolvedBase.type,
    tags: spell.tags ?? resolvedBase.tags,
    cost: spell.cost ?? resolvedBase.cost,
    staminaCost: spell.staminaCost ?? resolvedBase.staminaCost,
    materialCost: spell.materialCost ?? resolvedBase.materialCost,
    usageTime: spell.usageTime ?? resolvedBase.usageTime,
    scaling: spell.scaling ?? resolvedBase.scaling,
  } as T;
}

export function buildSpellProfile(
  rawSpell: SpellDefinition | CantripDefinition,
  sphereName: SphereName,
): SpellProfile {
  const spell = resolveSpell(rawSpell);

  const hit = spell.attack?.hit || '';
  const targeting = spell.attack?.targeting || '';
  const injury = spell.attack?.injury || '';
  const effect = spell.effect || '';
  const halfOnMiss = spell.attack?.halfOnMiss === true;

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

  const isSingleTarget = area === 'single' || area === 'vertical-line';

  const isLowPower = /\\damagerank\w+low/i.test(fullText);
  const appliedEffects = parseAppliedEffects(fullText);
  const accuracyModifier = parseAccuracyModifier(fullText);
  const accuracyCondition = parseAccuracyCondition(fullText);
  const specialRequirements = parseSpecialRequirements(fullText);

  const rawIsDelayed = parseIsDelayed(hit, targeting);
  const isRepeating = parseIsRepeating(fullText, rawIsDelayed);
  const isDelayed = rawIsDelayed && !isRepeating;

  const isSustained =
    (spell.type || '').toLowerCase().includes('sustain') ||
    (spell.tags || []).some((tag) => tag.toLowerCase().includes('sustain')) ||
    lowercase.includes('sustain');

  const isSustainedMinor =
    isSustained &&
    ((spell.type || '').toLowerCase().includes('minor') ||
      (spell.tags || []).some((tag) => tag.toLowerCase().includes('minor')) ||
      /sustain\s*\([^)]*minor[^)]*\)/i.test(fullText));

  const isAttunable =
    (spell.type || '').toLowerCase().includes('ttun') || lowercase.includes('attune');
  const requiresAttunement = Boolean(
    spell.type && (spell.type.includes('Attune') || spell.type === 'Sustain (attunable, standard)'),
  );

  const hasCost =
    !!spell.cost ||
    spell.staminaCost === true ||
    spell.materialCost === true ||
    (spell.type || '').toLowerCase().startsWith('attune') ||
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

  const hasDoT =
    lowercase.includes('burn') ||
    lowercase.includes('bleed') ||
    lowercase.includes('corrode') ||
    lowercase.includes('poison') ||
    /subsequent turns.*take.*damage/.test(lowercase);

  const maxDamageRank = parseDamageRank(fullText);
  let unconditionalDamageRank: number | null = null;
  if (maxDamageRank !== null) {
    if (isInjuryOnly) {
      unconditionalDamageRank = 0;
    } else {
      unconditionalDamageRank = parseDamageRank(hit) ?? parseDamageRank(effect);
    }
  }

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
    maxDamageRank,
    unconditionalDamageRank,
    hasDoT,
    isLowPower,
    appliedEffects,
    accuracyModifier,
    accuracyCondition,
    specialRequirements,
    isDelayed,
    hasCost,
    roles,
    hasAttack: !!spell.attack,
    type: spell.type,
    healingRank,
    areaGrows,
    halfOnMiss,
    maxTargets,
    hasInjuryDamage,
    isSustainedMinor,
    isAttunable,
    requiresAttunement,
    enemiesOnly,
    isRepeating,
    hasSelfHitPenalty,
    isInjuryDoubleDamage,
    isInjuryOnly,
    hasAttuneStandardAttack,
    hasEscapableRepeat,
    isSelfEmpowered,
    isSelfMaximized,
    isSingleTarget,
  };
}
