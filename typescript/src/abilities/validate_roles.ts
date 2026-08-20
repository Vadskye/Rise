/**
 * SPELL ROLE VALIDATION ENGINE
 *
 * Validates that spells across all Mystic Spheres have accurate and complete roles
 * matching their mechanics as defined in constants.ts and the game rules.
 *
 * Rules:
 * - Roles are based on normal spell effects (ignoring critical hit clauses).
 * - Multi-effect spells must have all applicable roles.
 * - Persistent conditions on non-injured targets are 'softener' (single or multi-target).
 * - Brief/1-turn debuffs are 'trip' (single-target) or 'flash' (multi-target/area).
 * - Distant and Long range damage spells are 'snipe' (in addition to burst or clear).
 * - Attunement spells must have 'attune', and only have secondary roles if they grant active actions/reactions.
 */

import { AbilityRole } from './constants';
import { SpellDefinition } from './active_abilities';
import { MysticSphere, SphereName } from './mystic_spheres';
import { buildSpellProfile, resolveSpell, SpellProfile } from './spell_profile';

export interface RoleValidationIssue {
  type: 'missing_role' | 'unexpected_role' | 'invalid_attunement_role';
  severity: 'warning';
  spellName: string;
  sphereName: SphereName;
  spellRank: number;
  role: AbilityRole;
  message: string;
  actualRoles: AbilityRole[];
  expectedRoles: AbilityRole[];
}

/**
 * Strips crit text and normalizes text for role parsing.
 */
function getNormalSpellText(spell: SpellDefinition): {
  hit: string;
  targeting: string;
  injury: string;
  effect: string;
  fullText: string;
} {
  const resolved = resolveSpell(spell);
  const hit = resolved.attack?.hit || '';
  const targeting = resolved.attack?.targeting || '';
  const injury = resolved.attack?.injury || '';
  const effect = resolved.effect || '';
  const fullText = `${hit} ${targeting} ${injury} ${effect}`;
  return { hit, targeting, injury, effect, fullText };
}

/**
 * Determines whether the spell applies persistent conditions (vs brief/1-turn status).
 */
function hasPersistentCondition(hit: string, effect: string): boolean {
  const combined = `${hit} ${effect}`.toLowerCase();
  if (
    combined.includes('as a \\glossterm{condition}') ||
    combined.includes('as a condition') ||
    combined.includes('as conditions') ||
    combined.includes('is cursed') ||
    combined.includes('are cursed') ||
    combined.includes('\\glossterm{condition}') ||
    combined.includes('permanent condition')
  ) {
    return true;
  }
  return false;
}

/**
 * Determines whether a debuff requires the target to be injured.
 */
function isInjuryDebuff(hit: string, injury: string, effect: string): boolean {
  if (
    injury &&
    (injury.toLowerCase().includes('is \\') ||
      injury.toLowerCase().includes('takes a -') ||
      injury.toLowerCase().includes('fling') ||
      injury.toLowerCase().includes('push') ||
      injury.toLowerCase().includes('slowed') ||
      injury.toLowerCase().includes('prone') ||
      injury.toLowerCase().includes('dazed'))
  ) {
    return true;
  }
  const combined = `${hit} ${effect}`.toLowerCase();
  return /if (it|the target) (is|was) (?:\\glossterm{)?injured(?:})?/i.test(combined);
}

/**
 * Determines whether a debuff is incapacitating (stasis).
 */
function isStasisDebuff(hit: string, effect: string): boolean {
  const combined = `${hit} ${effect}`.toLowerCase();
  return (
    combined.includes('cannot act') ||
    combined.includes("can't act") ||
    combined.includes('frozen in time') ||
    combined.includes('\\stasis') ||
    combined.includes('in stasis') ||
    combined.includes('petrified') ||
    combined.includes('incapacitated')
  );
}

function hasDebuffWords(hit: string, effect: string): boolean {
  const combined = `${hit} ${effect}`.toLowerCase();
  const debuffKeywords = [
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
    'concealment',
    'exposed',
    'dread',
    'shaken',
    'frightened',
    'panicked',
    'immobilized',
    'deafened',
    'penalty to defenses',
    'penalty to accuracy',
    '-2 penalty',
    '-4 penalty',
    '-1 penalty',
    'cannot stand',
    "can't stand",
    'cannot move',
    "can't move",
    'fling',
    'push',
  ];

  return debuffKeywords.some((kw) => combined.includes(kw));
}

/**
 * Checks if an attunement spell grants an active action or reaction.
 */
function attunementGrantsActiveAction(hit: string, targeting: string, effect: string): boolean {
  const combined = `${hit} ${targeting} ${effect}`.toLowerCase();
  return (
    combined.includes('as a \\glossterm{standard action}') ||
    combined.includes('as a standard action') ||
    combined.includes('as a \\glossterm{minor action}') ||
    combined.includes('as a minor action') ||
    combined.includes('spend a standard action') ||
    combined.includes('spend a minor action')
  );
}

/**
 * Infers expected roles from a spell's mechanical definition and profile.
 */
export function inferExpectedRoles(
  rawSpell: SpellDefinition,
  profile: SpellProfile,
): Set<AbilityRole> {
  const expected = new Set<AbilityRole>();
  const { hit, targeting, injury, effect, fullText } = getNormalSpellText(rawSpell);
  const textLower = fullText.toLowerCase();

  const dealsDamage = profile.maxDamageRank !== null;

  // 1. Attunement
  if (profile.requiresAttunement) {
    expected.add('attune');
    if (!(attunementGrantsActiveAction(hit, targeting, effect) || profile.area)) {
      return expected;
    }
  }

  // 2. Barrier
  const isBarrier =
    (rawSpell.tags || []).includes('Barrier') ||
    (profile.area === 'wall' && dealsDamage) ||
    (/\\glossterm{wall}|wall of/i.test(textLower) && dealsDamage);
  if (isBarrier) {
    expected.add('barrier');
  }

  // 3. Healing
  if (
    profile.healingRank !== null ||
    /regains?\s+(?:\d+\s+)?(?:\\glossterm{)?hit points/i.test(textLower) ||
    /\bregains? hit points\b/i.test(textLower)
  ) {
    expected.add('healing');
  }

  // 4. Cleanse
  if (
    /removes?\s+(?:all|a|one|\d+)?\s*(?:\\glossterm{)?(?:condition|curse|poison)/i.test(
      textLower,
    ) ||
    /ends?\s+(?:all|a|one|\d+)?\s*(?:\\glossterm{)?(?:condition|curse|poison)/i.test(textLower) ||
    /cures?\s+(?:a|one|\d+)?\s*(?:\\glossterm{)?poison/i.test(textLower) ||
    /\bcleanse\b/i.test(textLower)
  ) {
    expected.add('cleanse');
  }

  // 5. Exertion
  if (
    rawSpell.staminaCost === true ||
    /spends?\s+(?:one|\d+)?\s*\\glossterm{stamina}/i.test(textLower) ||
    /spends?\s+(?:a|\d+)?\s*vital wound/i.test(textLower)
  ) {
    expected.add('exertion');
  }

  // 6. Hazard
  const requiresStandardActionToSustain = !profile.isAttunable && (
    (rawSpell.type || '').toLowerCase().includes('standard') ||
    textLower.includes('spend a standard action to sustain') ||
    textLower.includes('sustain (standard)'));

  const isHazard =
    !requiresStandardActionToSustain &&
    (((rawSpell.type || '').toLowerCase().includes('sustain') &&
      (profile.area === 'radius' ||
        profile.area === 'line' ||
        textLower.includes('zone')) &&
      (profile.isRepeating ||
        textLower.includes('each of your subsequent actions') ||
        textLower.includes('each round') ||
        textLower.includes('each turn') ||
        textLower.includes('hazard'))) ||
      (!rawSpell.type &&
        (textLower.includes('creates a zone') || textLower.includes('hazard')) &&
        (textLower.includes('each turn') ||
          textLower.includes('each round') ||
          textLower.includes('subsequent round'))));
  if (isHazard) {
    expected.add('hazard');
  }

  // 7. Retaliate
  if (
    /whenever a creature.*?attacks you/i.test(textLower) ||
    /attacks you or your allies/i.test(textLower) ||
    /deal.*extra damage to creatures that attacked/i.test(textLower)
  ) {
    expected.add('retaliate');
  }

  // 8. Damage Roles (Snipe, Burst, Clear, Burn, Execute)
  const isMultiTarget = !profile.isSingleTarget;
  const isLongOrDistantRange = profile.range === 'long' || profile.range === 'distant';

  if (dealsDamage) {
    // Snipe
    if (isLongOrDistantRange) {
      expected.add('snipe');
    }

    // Burn (Single-target DoT)
    if (profile.isSingleTarget && profile.hasDoT) {
      expected.add('burn');
    }

    // Execute (Single-target injury damage)
    if (
      profile.isSingleTarget &&
      (profile.isInjuryOnly ||
        (injury && /\\damagerank/i.test(injury)) ||
        textLower.includes('if the target is injured, it takes'))
    ) {
      expected.add('execute');
    }

    // Clear (Multi-target immediate damage)
    if (isMultiTarget) {
      expected.add('clear');
    }

    // Burst (Single-target immediate damage, not purely DoT, not injury-only, not long/distant snipe)
    if (profile.isSingleTarget && hit && !profile.isInjuryOnly && !profile.hasDoT && !isLongOrDistantRange) {
      expected.add('burst');
    }
  }

  // 9. Debuff Roles (Softener, Flash, Trip, Stasis, Maim)
  const isInjuryDebuffEffect = isInjuryDebuff(hit, injury, effect);
  const isStasis = isStasisDebuff(hit, effect);
  const isCondition = hasPersistentCondition(hit, effect);
  // The spell must actually have a hit effect to inflict debuffs. Otherwise, it might be
  // an ally-only boon.
  const hasDebuff = hit && (hasDebuffWords(hit, effect) || isCondition || isStasis || isInjuryDebuffEffect);

  if (hasDebuff) {
    if (isStasis && profile.isSingleTarget) {
      expected.add('stasis');
    } else if (isCondition && !isInjuryDebuffEffect) {
      // Any persistent condition on non-injured targets is softener
      expected.add('softener');
    } else if (profile.isSingleTarget && !isLongOrDistantRange && !dealsDamage) {
      // Brief single-target debuff is trip
      expected.add('trip');
    } else if (profile.isSingleTarget && hasDebuffWords(hit, effect) && !isCondition) {
      expected.add('trip');
    } else if (isInjuryDebuffEffect && !dealsDamage) {
      expected.add('maim');
    } else if (isMultiTarget) {
      // Brief multi-target debuff is flash
      expected.add('flash');
    }
  }

  // 10. Turtle (Brief defensive buff on self)
  const isTurtle =
    /you (?:are|become)\s+(?:\\briefly\s+)?\\(shielded|fortified|steeled|braced)/i.test(
      textLower,
    ) ||
    /gain\s+(?:a\s+)?\+\d+\s+bonus to (?:your\s+)?defenses/i.test(textLower) ||
    /takes?\s+half\s+damage/i.test(textLower);
  if (isTurtle && !profile.requiresAttunement) {
    expected.add('turtle');
  }

  // 11. Focus & Generator
  const isOffensiveBuffOnSelf =
    /you (?:are|become)\s+(?:\\briefly\s+)?\\(?:primed|empowered|maximized|focused|honed)/i.test(
      textLower,
    ) || /your next\s+(?:attack|strike|spell)/i.test(textLower);

  if (isOffensiveBuffOnSelf) {
    if (profile.hasAttack) {
      expected.add('generator');
    } else {
      expected.add('focus');
    }
  }

  // 12. Boon (Brief combat buff on allies)
  const isBoon =
    !profile.hasAttack &&
    (/\b(?:allies|ally)\b/i.test(targeting) ||
      /choose (?:yourself or )?(?:an? )?\\glossterm{ally}/i.test(effect) ||
      /\b(?:allies|ally)\b/i.test(effect)) &&
    !expected.has('healing') &&
    !expected.has('cleanse') &&
    !expected.has('mobility');
  if (isBoon && !dealsDamage) {
    expected.add('boon');
  }

  // 13. Mobility (Movement/repositioning without attack)
  const isMobility =
    !profile.hasAttack &&
    !/one of your items/.test(textLower) &&
    (/\\glossterm{fling}/i.test(textLower) ||
      /\\glossterm{push}/i.test(textLower) ||
      /teleport/i.test(textLower) ||
      /glide speed/i.test(textLower) ||
      /fly speed/i.test(textLower) ||
      /walk speed/i.test(textLower) ||
      /move up to/i.test(textLower));
  if (isMobility) {
    expected.add('mobility');
  }

  // 14. Dive & Kite
  if (profile.hasAttack) {
    if (
      !/move the ball/.test(textLower) && (
        /move (?:towards|adjacent|through)/i.test(textLower) ||
        /leap.*attack/i.test(textLower) ||
        /move in a straight line/i.test(textLower) ||
        /charge/i.test(textLower))
    ) {
      expected.add('dive');
    }
    if (/move away.*attack/i.test(textLower) || /push.*prevent.*approach/i.test(textLower)) {
      expected.add('kite');
    }
  }

  // 15. Ramp
  if (
    (textLower.includes('for the rest of combat') ||
      textLower.includes('until combat ends') ||
      textLower.includes('for the rest of the fight'))
  ) {
    expected.add('ramp');
  }

  // 16. Narrative
  if (
    textLower.includes('outside of combat') ||
    textLower.includes('for one day') ||
    textLower.includes('for one year') ||
    textLower.includes('for 24 hours') ||
    (rawSpell.usageTime &&
      rawSpell.usageTime !== 'standard' &&
      rawSpell.usageTime !== 'minor')
  ) {
    expected.add('narrative');
  }

  // 17. Payoff
  if (textLower.includes('during your last turn')) {
    expected.add('payoff');
  }

  return expected;
}

/**
 * Validates the roles of all standard leveled spells in the given Mystic Spheres.
 */
export function validateSpellRoles(spheres: MysticSphere[]): RoleValidationIssue[] {
  const issues: RoleValidationIssue[] = [];

  for (const sphere of spheres) {
    const spells = sphere.spells || [];
    for (const spell of spells) {
      const profile = buildSpellProfile(spell, sphere.name);
      const expectedSet = inferExpectedRoles(spell, profile);
      const actualSet = new Set(spell.roles || []);
      const { hit, targeting, effect } = getNormalSpellText(spell);

      // Check Attunement rules
      if (profile.requiresAttunement) {
        const grantsAction = attunementGrantsActiveAction(hit, targeting, effect);
        if (!grantsAction) {
          for (const actualRole of actualSet) {
            if (actualRole !== 'attune' && actualRole !== 'barrier') {
              issues.push({
                type: 'invalid_attunement_role',
                severity: 'warning',
                spellName: spell.name,
                sphereName: sphere.name,
                spellRank: spell.rank ?? 0,
                role: actualRole,
                message: `Attunement spell "${spell.name}" (${sphere.name}, Rank ${spell.rank}) has secondary role '${actualRole}', but does not grant an active action or reaction. Persistent attunements should only have ['attune'].`,
                actualRoles: spell.roles || [],
                expectedRoles: ['attune'],
              });
            }
          }
        }
      }

      // Check missing roles
      for (const expRole of expectedSet) {
        // If it's an attunement spell without granted actions, only 'attune' (or barrier) is expected
        if (
          !attunementGrantsActiveAction(hit, targeting, effect) &&
          expRole !== 'attune' &&
          expRole !== 'barrier'
        ) {
          continue;
        }

        if (!actualSet.has(expRole)) {
          issues.push({
            type: 'missing_role',
            severity: 'warning',
            spellName: spell.name,
            sphereName: sphere.name,
            spellRank: spell.rank ?? 0,
            role: expRole,
            message: `Spell "${spell.name}" (${sphere.name}, Rank ${spell.rank}) is missing expected role '${expRole}'.`,
            actualRoles: spell.roles || [],
            expectedRoles: Array.from(expectedSet),
          });
        }
      }

      // Check unexpected roles
      for (const actRole of actualSet) {
        if (!expectedSet.has(actRole)) {
          // Special exception: burst on long/distant range if treated as burst + snipe
          if (
            actRole === 'burst' &&
            expectedSet.has('snipe') &&
            profile.area === 'single' &&
            profile.maxTargets <= 1
          ) {
            continue;
          }

          issues.push({
            type: 'unexpected_role',
            severity: 'warning',
            spellName: spell.name,
            sphereName: sphere.name,
            spellRank: spell.rank ?? 0,
            role: actRole,
            message: `Spell "${spell.name}" (${sphere.name}, Rank ${spell.rank}) has unexpected role '${actRole}' (expected: [${Array.from(expectedSet).join(', ')}]).`,
            actualRoles: spell.roles || [],
            expectedRoles: Array.from(expectedSet),
          });
        }
      }
    }
  }

  return issues;
}
