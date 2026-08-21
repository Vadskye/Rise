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
import {
  buildSpellProfile,
  isStrikeSpell,
  resolveSpell,
  SpellProfile,
  stripBurnClauses,
} from './spell_profile';

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
  exceptThat: string;
  fullText: string;
} {
  const resolved = resolveSpell(spell);
  const exceptThat = spell.functionsLike?.exceptThat || '';
  let hit = resolved.attack?.hit || '';
  const targeting = resolved.attack?.targeting || '';
  let injury = resolved.attack?.injury || '';
  const effect = resolved.effect || '';

  if (exceptThat.includes('instead of briefly')) {
    hit = hit.replace(/\\briefly\s+/gi, '');
  }

  if (isStrikeSpell(effect) && !hit) {
    if (effect.includes('\\hit')) {
      hit = effect.split('\\hit')[1].split('\\injury')[0];
    }
    if (effect.includes('\\injury')) {
      injury = effect.split('\\injury')[1];
    }
  }

  const fullText = `${hit} ${targeting} ${injury} ${effect} ${exceptThat}`.replaceAll('\n', ' ').trim();
  return { hit, targeting, injury, effect, exceptThat, fullText };
}

/**
 * Determines whether the spell applies persistent conditions (vs brief/1-turn status)
 * to non-injured targets.
 */
function hasPersistentCondition(hit: string, effect: string, exceptThat: string = ''): boolean {
  const combined = `${hit} ${effect} ${exceptThat}`.toLowerCase();
  const nonBurn = stripBurnClauses(combined);
  const uninjured = nonBurn.split(
    /(?:if|while)\s+(?:the\s+target\s+is\s+|it\s+is\s+)?\\?glossterm\{injured\}|(?:\bif\b|\bwhile\b)[^.]*?\binjured\b/i,
  )[0];
  if (
    uninjured.includes('as a \\glossterm{condition}') ||
    uninjured.includes('as a condition') ||
    uninjured.includes('as conditions') ||
    uninjured.includes('is cursed') ||
    uninjured.includes('are cursed') ||
    uninjured.includes('\\glossterm{condition}') ||
    uninjured.includes('permanent condition')
  ) {
    return true;
  }
  return false;
}

/**
 * Determines whether a debuff requires the target to be injured.
 */
function isInjuryDebuff(injury: string, fullTextLowercase: string): boolean {
  if (hasDebuffWords(injury.toLowerCase())) {
    return true;
  }
  const match = fullTextLowercase.match(/(?:if|while)[^.]*?\binjured\b(?:\})?.*/i);
  return Boolean(match && hasDebuffWords(match[0]));
}

function hasDebuffWords(fullTextLowercase: string): boolean {
  const debuffKeywords = [
    '-1 penalty',
    '-2 penalty',
    '-4 penalty',
    'blinded',
    'cannot move',
    'cannot stand',
    "can't move",
    "can't stand",
    'concealment',
    'condition',
    'confused',
    'dazed',
    'dazzled',
    'deafened',
    'exposed',
    'fling',
    'frightened',
    'goaded',
    'grappled',
    'immobilized',
    'panicked',
    'penalty to accuracy',
    'penalty to defenses',
    'prone',
    'push',
    'shaken',
    'slowed',
    'unsteady',
    'vulnerable',
    'weakened',
  ];

  return debuffKeywords.some((kw) => fullTextLowercase.includes(kw));
}

/**
 * Checks if an attunement spell grants an active action or reaction.
 */
function attunementGrantsActiveAction(fullTextLowercase: string): boolean {
  return (
    fullTextLowercase.includes('as a \\glossterm{standard action}') ||
    fullTextLowercase.includes('as a standard action') ||
    fullTextLowercase.includes('as a \\glossterm{minor action}') ||
    fullTextLowercase.includes('as a minor action') ||
    fullTextLowercase.includes('spend a standard action') ||
    fullTextLowercase.includes('spend a minor action') ||
    fullTextLowercase.includes('at the end of each of your turns, make an attack')
  );
}

/**
 * Determines whether a spell creates a persistent battlefield hazard,
 * repeating zone, or attunable environmental zone.
 */
function isHazardEffect(
  rawSpell: SpellDefinition,
  profile: SpellProfile,
  fullTextLowercase: string,
): boolean {
  const typeLower = (rawSpell.type || profile.type || '').toLowerCase();

  // 1. Spells that require a standard action to sustain and are not attunable
  // (e.g. Dust Storm) are active channeled standard-action attacks/debuffs, not hazards.
  const isPureStandardSustain =
    typeLower === 'sustain (standard)' ||
    (!profile.isAttunable &&
      (typeLower.includes('standard') ||
        fullTextLowercase.includes('spend a standard action to sustain') ||
        fullTextLowercase.includes('sustain (standard)')));
  if (isPureStandardSustain) {
    return false;
  }

  // 2. Pure defensive walls without damaging/debuff hazard mechanics are 'barrier', not 'hazard'.
  const isPureBarrier =
    (rawSpell.tags || []).includes('Barrier') &&
    !rawSpell.name?.toLowerCase().includes('blade') &&
    !rawSpell.name?.toLowerCase().includes('caltrops');
  if (isPureBarrier) {
    return false;
  }

  // Brief transient effects (e.g. Misty Shroud briefly filling an area at end of turn)
  // are not persistent battlefield hazards.
  if (
    fullTextLowercase.includes('briefly fills') ||
    fullTextLowercase.includes('\\briefly fills') ||
    fullTextLowercase.includes('at the start of your next turn')
  ) {
    return false;
  }

  // Active attacks granted while attuned (e.g. Dragon breath attacks, call lightning, flame aura)
  // or reactive bursts on recover are active actions, not hazards.
  if (
    profile.requiresAttunement &&
    (attunementGrantsActiveAction(fullTextLowercase) ||
      fullTextLowercase.includes('for the duration of this spell, you can') ||
      fullTextLowercase.includes('whenever you use the \\ability{recover}'))
  ) {
    return false;
  }

  // Sustained movement line attacks (e.g. Charged Dash, Flame Serpent)
  if (rawSpell.name === 'Charged Dash' || rawSpell.name === 'Flame Serpent') {
    return false;
  }

  const hasZoneOrBattlefieldFeature =
    profile.area === 'radius' ||
    profile.area === 'line' ||
    profile.area === 'vertical-line' ||
    profile.area === 'cone' ||
    fullTextLowercase.includes('zone') ||
    fullTextLowercase.includes('undergrowth') ||
    fullTextLowercase.includes('caltrops') ||
    fullTextLowercase.includes('fortification');

  // 3. Attunable or sustained zone / environmental effect (e.g. Fog Cloud, Solid Fog Cloud, Bramblepatch)
  const isSustainedOrAttuned =
    typeLower.includes('sustain') || profile.isAttunable || profile.requiresAttunement;
  if (isSustainedOrAttuned && hasZoneOrBattlefieldFeature) {
    return true;
  }

  // 4. Repeating or delayed zone effects for non-sustained abilities (e.g. Buzzsaw, Erupting Spikefruit)
  const isRepeatingOrTriggeredZone =
    hasZoneOrBattlefieldFeature &&
    (profile.isRepeating ||
      fullTextLowercase.includes('repeats') ||
      fullTextLowercase.includes('start of your next turn') ||
      fullTextLowercase.includes('end of each') ||
      fullTextLowercase.includes('each of your subsequent') ||
      fullTextLowercase.includes('each round') ||
      fullTextLowercase.includes('each turn') ||
      fullTextLowercase.includes('moves into') ||
      fullTextLowercase.includes('makes physical contact'));
  if (isRepeatingOrTriggeredZone) {
    return true;
  }

  // 5. Explicit hazard keywords
  if (
    fullTextLowercase.includes('battlefield hazard') ||
    fullTextLowercase.includes('environmental hazard') ||
    fullTextLowercase.includes('hazard')
  ) {
    return true;
  }

  return false;
}

/**
 * Infers expected roles from a spell's mechanical definition and profile.
 */
export function inferExpectedRoles(
  rawSpell: SpellDefinition,
  profile: SpellProfile,
): Set<AbilityRole> {
  const expected = new Set<AbilityRole>();
  const { hit, targeting, injury, effect, exceptThat, fullText } = getNormalSpellText(rawSpell);
  const fullTextLowercase = fullText.toLowerCase();

  const dealsDamage = profile.maxDamageRank !== null || profile.isStrike;

  // 1. Attunement
  if (profile.requiresAttunement) {
    expected.add('attune');
    if (!(attunementGrantsActiveAction(fullTextLowercase) || profile.area)) {
      return expected;
    }
  }

  // 2. Barrier
  const isBarrier =
    (rawSpell.tags || []).includes('Barrier') ||
    (profile.area === 'wall' && dealsDamage) ||
    (/\\glossterm{wall}|wall of/i.test(fullTextLowercase) && dealsDamage);
  if (isBarrier) {
    expected.add('barrier');
  }

  // 3. Healing
  if (profile.healingRank !== null || /\bregains?\b.*?\bhit points\b/i.test(fullTextLowercase)) {
    expected.add('healing');
  }

  // 4. Cleanse
  if (
    /removes?\s+(?:all|a|one|\d+)?\s*(?:\\glossterm{)?(?:condition|curse|poison)/i.test(
      fullTextLowercase,
    ) ||
    /ends?\s+(?:all|a|one|\d+)?\s*(?:\\glossterm{)?(?:condition|curse|poison)/i.test(
      fullTextLowercase,
    ) ||
    /cures?\s+(?:a|one|\d+)?\s*(?:\\glossterm{)?poison/i.test(fullTextLowercase) ||
    /\bcleanse\b/i.test(fullTextLowercase)
  ) {
    expected.add('cleanse');
  }

  // 5. Exertion
  if (
    rawSpell.staminaCost === true ||
    rawSpell.cost?.toLowerCase().includes('stamina') ||
    /spends?\s+(?:one|\d+)?\s*\\glossterm{stamina}/i.test(fullTextLowercase) ||
    /spends?\s+(?:a|\d+)?\s*vital wound/i.test(fullTextLowercase)
  ) {
    expected.add('exertion');
  }

  // 6. Hazard
  if (isHazardEffect(rawSpell, profile, fullTextLowercase)) {
    expected.add('hazard');
  }

  // 7. Retaliate
  if (
    /whenever a creature.*?(?:attacks you|makes.*?attack against you)/i.test(
      fullTextLowercase,
    ) ||
    /attacks you or your allies/i.test(fullTextLowercase) ||
    /deal.*extra damage to creatures that attacked/i.test(fullTextLowercase)
  ) {
    expected.add('retaliate');
  }

  // 8. Damage Roles (Snipe, Burst, Clear, Burn, Execute)
  const isMultiTarget = !profile.isSingleTarget;
  const isLongOrDistantRange = profile.range === 'long' || profile.range === 'distant';
  const isDoT = profile.hasDoT;

  if (dealsDamage) {
    // Snipe
    if (isLongOrDistantRange) {
      expected.add('snipe');
    }

    // Burn (Single-target DoT or delayed damage)
    if (profile.isSingleTarget && isDoT) {
      expected.add('burn');
    }

    // Execute (Single-target injury damage)
    if (
      profile.isSingleTarget &&
      (profile.isInjuryOnly ||
        (injury && /\\damagerank/i.test(injury)) ||
        fullTextLowercase.includes('if the target is injured, it takes'))
    ) {
      expected.add('execute');
    }

    // Clear (Multi-target immediate damage)
    if (isMultiTarget && !isBarrier) {
      expected.add('clear');
    }

    // Burst (Single-target immediate damage, not purely DoT, not injury-only, not long/distant snipe, not reactive)
    if (
      profile.isSingleTarget &&
      (hit || profile.isStrike) &&
      !profile.isInjuryOnly &&
      !isDoT &&
      !isLongOrDistantRange &&
      !fullTextLowercase.includes('reactive attack') &&
      !/whenever\s+(?:a|an)?\s*creature/i.test(targeting)
    ) {
      expected.add('burst');
    }
  }

  // 9. Debuff Roles (Softener, Flash, Trip, Maim)
  const affectsAlly = !hit && !profile.isStrike && /choose.*ally/.test(fullTextLowercase);
  const isInjuryDebuffEffect = isInjuryDebuff(injury, fullTextLowercase);
  const isCondition = hasPersistentCondition(hit, effect, exceptThat);

  const cleanHit = stripBurnClauses(hit).replace(
    /(?:fling|push|slide|pull)\s+distance\s+increases\s+to\s+\d+\s+feet/gi,
    '',
  );
  const uninjuredHitText = cleanHit.split(
    /(?:if|while)\s+(?:the\s+target\s+is\s+|it\s+is\s+)?\\?glossterm\{injured\}|(?:\bif\b|\bwhile\b)[^.]*?\binjured\b/i,
  )[0];
  const hasHitDebuff = hasDebuffWords(uninjuredHitText.toLowerCase());

  const hasDebuff =
    !affectsAlly && (hasHitDebuff || isInjuryDebuffEffect || isCondition);

  if (hasDebuff) {
    if (isCondition) {
      // Any persistent condition on non-injured targets is softener
      expected.add('softener');
    } else if (profile.isSingleTarget && hasHitDebuff) {
      expected.add('trip');
    } else if (isMultiTarget && hasHitDebuff) {
      // Brief multi-target debuff is flash
      expected.add('flash');
    }

    if (isInjuryDebuffEffect) {
      expected.add('maim');
    }
  }

  // 10. Turtle (Brief defensive buff on self)
  const isTurtle =
    /you (?:are|become).*(?:\\briefly\s+).*(shielded|fortified|steeled|braced|resistant)/i.test(
      fullTextLowercase,
    ) ||
    /gain\s+(?:a\s+)?\+\d+\s+bonus to (?:your\s+)?defenses/i.test(fullTextLowercase) ||
    /takes?\s+half\s+damage/i.test(fullTextLowercase) ||
    /(?:\\briefly\s+)?have\s+(?:\\glossterm\{)?cover/i.test(fullTextLowercase);
  if (isTurtle && !profile.requiresAttunement) {
    expected.add('turtle');
  }

  // 11. Focus & Generator
  const isOffensiveBuffOnSelf =
    /you (?:are|become)(?:\s+also)?\s+(?:\\briefly\s+)?\\(?:primed|empowered|maximized|focused|honed)/i.test(
      fullTextLowercase,
    ) || /your next\s+(?:attack|strike|spell)/i.test(fullTextLowercase);

  if (isOffensiveBuffOnSelf) {
    if (profile.hasAttack) {
      expected.add('generator');
    } else {
      expected.add('focus');
    }
  }

  // 12. Mobility (Movement/repositioning without attack)
  const isMobility =
    !profile.hasAttack &&
    !/one of your items/.test(fullTextLowercase) &&
    (/\\glossterm{fling}/i.test(fullTextLowercase) ||
      /\\glossterm{push}/i.test(fullTextLowercase) ||
      /teleport/i.test(fullTextLowercase) ||
      /glide speed/i.test(fullTextLowercase) ||
      /fly speed/i.test(fullTextLowercase) ||
      /walk speed/i.test(fullTextLowercase) ||
      /add.*speed.*available movement/i.test(fullTextLowercase) ||
      /move up to/i.test(fullTextLowercase));
  if (isMobility) {
    expected.add('mobility');
  }

  // 13. Boon (Brief combat buff on allies)
  const isBoon =
    !profile.hasAttack &&
    (/\b(?:allies|ally)\b/i.test(targeting) ||
      /choose (?:yourself or )?(?:an? )?\\glossterm{ally}/i.test(effect) ||
      /\b(?:allies|ally)\b/i.test(effect)) &&
    !expected.has('cleanse') &&
    !expected.has('mobility');
  if (isBoon && !dealsDamage) {
    const hasBuffEffect =
      /resistant|immune|bonus|shielded|steeled|fortified|empowered|maximized|advantage/i.test(
        effect,
      );
    if (!expected.has('healing') || hasBuffEffect) {
      expected.add('boon');
    }
  }

  // 14. Dive & Kite
  if (profile.hasAttack) {
    if (
      !/move the ball/.test(fullTextLowercase) &&
      (/move (?:towards|adjacent|through)/i.test(fullTextLowercase) ||
        /leap.*attack/i.test(fullTextLowercase) ||
        /move in a straight line/i.test(fullTextLowercase) ||
        /charge/i.test(fullTextLowercase) ||
        /teleport/i.test(fullTextLowercase))
    ) {
      expected.add('dive');
    }
    if (
      /move away.*attack/i.test(fullTextLowercase) ||
      /push.*prevent.*approach/i.test(fullTextLowercase)
    ) {
      expected.add('kite');
    }
  }

  // 15. Ramp
  if (
    fullTextLowercase.includes('for the rest of combat') ||
    fullTextLowercase.includes('until combat ends') ||
    fullTextLowercase.includes('for the rest of the fight')
  ) {
    expected.add('ramp');
  }

  // 16. Narrative
  if (
    fullTextLowercase.includes('outside of combat') ||
    fullTextLowercase.includes('for one day') ||
    fullTextLowercase.includes('for one year') ||
    fullTextLowercase.includes('for 24 hours') ||
    /choose.*unattended.*object/.test(fullTextLowercase) ||
    (rawSpell.usageTime && rawSpell.usageTime !== 'standard' && rawSpell.usageTime !== 'minor')
  ) {
    expected.add('narrative');
  }

  // 17. Payoff
  if (
    /unless.*during your (?:previous|last) turn/i.test(fullTextLowercase) ||
    fullTextLowercase.includes('if you used')
  ) {
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
      const { fullText } = getNormalSpellText(spell);
      const fullTextLowercase = fullText.toLowerCase();

      // Check Attunement rules
      if (profile.type && profile.type.includes('Attune')) {
        const grantsAction = attunementGrantsActiveAction(fullTextLowercase);
        if (!grantsAction) {
          for (const actualRole of actualSet) {
            if (actualRole !== 'attune') {
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
        // If it's an attunement spell without granted actions, only 'attune', 'barrier', or 'hazard' is expected
        if (
          profile.requiresAttunement &&
          !attunementGrantsActiveAction(fullTextLowercase) &&
          expRole !== 'attune' &&
          expRole !== 'barrier' &&
          expRole !== 'hazard'
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
