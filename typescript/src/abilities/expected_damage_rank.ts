import { SpellProfile } from './spell_profile';

export interface DamageCalculationBreakdown {
  baseRank: number;
  targetingMod: number;
  targetingReason: string;
  defenseMod: number;
  defenseReason: string;
  effectMod: number;
  effectReasons: string[];
  bonusMod: number;
  bonusReasons: string[];
  expectedDamageRank: number;
}

const CONE_AREA_SIZE_RANK: Record<string, number> = {
  tiny: 0,
  small: 0,
  medium: 2,
  large: 4,
  huge: 6,
  gargantuan: 8,
};

const RADIUS_AREA_SIZE_RANK: Record<string, number> = {
  tiny: -1,
  small: 0,
  medium: 2,
  large: 4,
  huge: 6,
  gargantuan: 8,
};

const RADIUS_RANGE_RANK: Record<string, number> = {
  short: 3,
  medium: 5,
  long: 7,
  distant: 9,
};

const LINE_AREA_SIZE_RANK: Record<string, number> = {
  tiny: -1,
  small: 0,
  medium: 1,
  large: 3,
  huge: 4,
  gargantuan: 5,
};

const WALL_AREA_SIZE_RANK: Record<string, number> = {
  small: 0,
  medium: 0,
  large: 1,
  huge: 2,
  gargantuan: 3,
};

const WALL_RANGE_RANK: Record<string, number> = {
  short: 0,
  medium: 1,
  long: 3,
  distant: 5,
};

const MULTI_RANGE_RANK: Record<string, number> = {
  short: 1,
  medium: 3,
  long: 5,
  distant: 7,
};

const MULTI_TARGET_RANK: Record<number, number> = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
};

const CHAIN_RANGE_RANK: Record<string, number> = {
  melee: 0,
  short: 1,
  medium: 3,
  long: 5,
  distant: 7,
};

const CHAIN_TARGET_RANK: Record<number, number> = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
};

const SINGLE_RANGE_MOD: Record<string, number> = {
  melee: 2,
  short: 1,
  medium: 0,
  long: -1,
  distant: -2,
};

export function calculateAreaRank(profile: SpellProfile): number {
  let areaRank = profile.enemiesOnly ? 1 : 0;
  if (profile.area === 'cone') {
    areaRank += CONE_AREA_SIZE_RANK[profile.areaSize] || 0;
  } else if (profile.area === 'radius') {
    areaRank += RADIUS_AREA_SIZE_RANK[profile.areaSize] || 0;
    // Enemies-only personal radius counts as an extra area rank
    if (profile.range === 'self' && profile.enemiesOnly) {
      areaRank += 1;
    }
    // Radius areas can have range.
    areaRank += RADIUS_RANGE_RANK[profile.range] || 0;
    return areaRank;
  } else if (profile.area === 'line') {
    areaRank += LINE_AREA_SIZE_RANK[profile.areaSize] || 0;
  } else if (profile.area === 'wall') {
    // These are the values for *damaging* walls that don't block passage.
    // Full blockage walls would use a different area scaling.
    areaRank += WALL_AREA_SIZE_RANK[profile.areaSize] || 0;
    // Walls basically always have a range
    areaRank += WALL_RANGE_RANK[profile.range] || 0;
  } else if (['multi'].includes(profile.area)) {
    areaRank += MULTI_RANGE_RANK[profile.range] || 0;
    areaRank += MULTI_TARGET_RANK[profile.maxTargets] || 0;
  } else if (['chain'].includes(profile.area)) {
    if (profile.maxTargets < 2) {
      console.warn('Confusing chain max target count');
    }
    areaRank += CHAIN_RANGE_RANK[profile.range] || 0;
    areaRank += CHAIN_TARGET_RANK[profile.maxTargets] || 0;
  }

  return areaRank;
}

function calculateRangeModifier(profile: SpellProfile): number {
  if (['single', 'vertical-line'].includes(profile.area)) {
    return SINGLE_RANGE_MOD[profile.range] || 0;
  } else {
    return 0;
  }
}

function calculateAreaDamageModifier(profile: SpellProfile): number {
  if (profile.area === 'single') {
    return 0;
  }

  const areaRank = calculateAreaRank(profile);

  // Map Area Rank to damage modifier:
  // R0 -> +1, R1 -> 0, R2/R3 -> -1, R4/R5 -> -2, R6/R7 -> -3, R8+ -> -4
  if (areaRank === 0) {
    return 1;
  } else if (areaRank === 1) {
    return 0;
  } else {
    // 2-3 -> -1, 4-5 -> -2, etc.
    return -Math.floor(areaRank / 2);
  }
}

export function calculateExpectedDamageRank(
  profile: SpellProfile,
): DamageCalculationBreakdown | null {
  if (profile.damageRank === null) {
    return null;
  }

  const baseRank = profile.rank || 0;
  const rangeModifier = calculateRangeModifier(profile);
  const areaModifier = calculateAreaDamageModifier(profile);

  // Single-target vs Reflex Defense Penalty
  let defenseMod = 0;
  let defenseReason = '';
  if (
    profile.area === 'single' &&
    profile.defenses.length === 1 &&
    profile.defenses[0] === 'reflex'
  ) {
    defenseMod = -1;
    defenseReason = 'Single-target vs Reflex (-1)';
  }

  // Bonus Modifiers
  let bonusMod = 0;
  const bonusReasons: string[] = [];

  // Double defense (+1)
  if (profile.defenses.length >= 2) {
    bonusMod += 1;
    bonusReasons.push('Double defense (+1)');
  }

  // Accuracy penalty
  if (profile.accuracyModifier <= -4) {
    bonusMod += 2;
    bonusReasons.push('Accuracy -4 penalty (+2)');
  } else if (profile.accuracyModifier <= -2) {
    bonusMod += 1;
    bonusReasons.push('Accuracy -2 penalty (+1)');
  }

  // Self-hit penalty
  if (profile.hasSelfHitPenalty) {
    bonusMod += 1;
    bonusReasons.push('Self-hit penalty (+1)');
  }

  // Escapable repeat
  if (profile.hasEscapableRepeat) {
    bonusMod += 1;
    bonusReasons.push('Escapable repeat (+1)');
  }

  // Inescapably delayed / Escapably delayed
  if (profile.isDelayed && !profile.isInjuryDoubleDamage && !profile.isDoubleAction) {
    bonusMod += 1;
    bonusReasons.push('Delayed damage (+1)');
  }

  // Stamina cost
  if (profile.hasCost && !profile.isAttunable) {
    bonusMod += 1;
    bonusReasons.push('Stamina / Resource cost (+1)');
  }

  // Attune standard action attack
  if (profile.hasAttuneStandardAttack) {
    if (baseRank >= 5) {
      bonusMod += 2;
      bonusReasons.push('Attune standard attack R5+ (+2)');
    } else {
      bonusMod += 1;
      bonusReasons.push('Attune standard attack R1-4 (+1)');
    }
  }

  // Effect Modifiers
  let effectMod = 0;
  const effectReasons: string[] = [];

  // Sustain (minor) zone
  if (profile.isSustainedMinor) {
    if (profile.area !== 'wall') {
      effectMod -= 2;
      effectReasons.push('Sustain (minor) zone (-2)');
    }
  }

  // DoT / Recurring damage (burn/bleed/corrode)
  const hasDoT = profile.appliedEffects.some(
    (e: string) =>
      e.includes('burn') || e.includes('bleed') || e.includes('corrode') || e.includes('poison'),
  );
  // Injury-only double damage
  if (profile.isInjuryDoubleDamage) {
    // If the injury-only damage is a DoT, it will be parsed in the expected damage rank, so this modifier needs to be positive.
    // If the injury-only damage is extra text like "double damage", it won't be parsed, so we expect -1 damage rank.
    if (hasDoT) {
      effectMod += 1;
      effectReasons.push('Injury-only double damage (DoT) (+1)');
    } else {
      effectMod -= 1;
      effectReasons.push('Injury-only double damage (-1)');
    }
  } else if (profile.isInjuryOnly) {
    effectMod += 2;
    effectReasons.push('Injury-only requirement (+2)');
  }

  // Debuff effect (slowed, dazed, vulnerable, dazzled, weakened, etc.)
  const DEBUFF_NAMES = [
    'slowed',
    'dazed',
    'blinded',
    'confused',
    'dazzled',
    'weakened',
    'vulnerable',
    'exposed',
    'dread',
    'frightened',
    'panicked',
    'immobilized',
    'charmed',
    'deafened',
    'unsteady',
  ];
  const hasDebuff =
    !profile.isInjuryDoubleDamage &&
    profile.appliedEffects.some((e: string) =>
      DEBUFF_NAMES.some((d) => e === d || e === `briefly:${d}`),
    );
  if (hasDebuff) {
    effectMod -= 1;
    effectReasons.push('Debuff effect (-1)');
  }

  // Self Buffs
  if (profile.isSelfEmpowered) {
    effectMod -= 2;
    effectReasons.push('Empowered self buff (-2)');
  }
  if (profile.isSelfMaximized) {
    effectMod -= 4;
    effectReasons.push('Maximized self buff (-4)');
  }

  const expectedDamageRank =
    baseRank + areaModifier + rangeModifier + defenseMod + effectMod + bonusMod;

  return {
    baseRank,
    targetingMod: areaModifier + rangeModifier,
    targetingReason: `Area ${areaModifier} + Range ${rangeModifier}`,
    defenseMod,
    defenseReason,
    effectMod,
    effectReasons,
    bonusMod,
    bonusReasons,
    expectedDamageRank,
  };
}
