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
 * - Distant and Long range single-target damage spells are 'snipe'.
 * - Attunement spells must have 'attune', and only have secondary roles if they grant active actions/reactions or are narrative.
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
  stripGlossterm,
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
  cost: string;
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

  const fullText = `${hit} ${targeting} ${injury} ${effect} ${exceptThat}`
    .replaceAll('\n', ' ')
    .trim();
  return {
    cost: stripGlossterm((resolved.cost || '').toLowerCase()),
    hit: stripGlossterm(hit),
    targeting: stripGlossterm(targeting),
    injury: stripGlossterm(injury),
    effect: stripGlossterm(effect),
    exceptThat: stripGlossterm(exceptThat),
    fullText: stripGlossterm(fullText),
  };
}

/**
 * Determines whether the spell applies persistent conditions (vs brief/1-turn status)
 * to non-injured targets.
 */
function hasPersistentCondition(hit: string, effect: string, exceptThat: string = ''): boolean {
  const combined = `${hit} ${effect} ${exceptThat}`.toLowerCase();
  // Don't count cleanse effects (removing conditions) as enemy softener
  if (
    /removes?\s+(?:all|a|one|\d+|any)?\s*(?:excess\s+)?(?:condition|curse|poison)/i.test(
      combined,
    ) &&
    !hit
  ) {
    return false;
  }
  // Don't count self-inflicted conditions as enemy softener
  const nonSelf = combined.replace(
    /you (?:are|become) (?:\\briefly\s+)?(?:\\dazed|dazed)\s+as\s+a\s+conditions?/gi,
    '',
  );
  const nonBurn = stripBurnClauses(nonSelf);
  const uninjured = nonBurn.split(
    /(?:if|while)\s+(?:the\s+target\s+is\s+|it\s+is\s+)?injured|(?:\bif\b|\bwhile\b)[^.]*?\binjured\b/i,
  )[0];

  // If the uninjured part only mentions "deteriorates as a condition" and the actual debuff is inside "while injured", ignore it
  if (
    /while (?:the target is|it is|they are)?\s*injured,?\s*(?:the target|it|they)?\s*(?:is|are)/i.test(
      combined,
    ) &&
    !/as a condition[^.]*(?:blinded|dazed|dazzled|deafened|frightened|immobilized|slowed|vulnerable|weakened)/i.test(
      uninjured,
    )
  ) {
    return false;
  }

  const untilShortRest = /until.*finish.*short rest/.test(uninjured) && !/immune.*until.*finish.*short rest/.test(uninjured)

  if (
    untilShortRest ||
    uninjured.includes('as a condition') ||
    uninjured.includes('as a single condition') ||
    uninjured.includes('as conditions') ||
    uninjured.includes('is cursed') ||
    uninjured.includes('are cursed') ||
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
  const sanitized = fullTextLowercase
    .replace(/you are \\?(?:blinded|dazed|slowed)/g, '')
    .replace(/you take a (?:-\d+|\\?minus\d+)\s+penalty/g, '');

  const debuffKeywords = [
    '-1 penalty',
    '-2 penalty',
    '-4 penalty',
    'attack the creature closest',
    'blinded',
    'cannot act',
    'cannot move',
    'cannot stand',
    'cannot take violent actions',
    "can't move",
    "can't stand",
    'charmed',
    'compelled to make a',
    'concealment',
    'confused',
    'dazed',
    'dazzled',
    'deafened',
    'deluded',
    'doing nothing at all',
    'emotions calmed',
    'everything outside itself',
    'exposed',
    'fling',
    'frightened',
    'frozen in time',
    'goaded',
    'grappled',
    'immobilized',
    '\\minus1 penalty',
    'minus1 penalty',
    '\\minus2 penalty',
    'minus2 penalty',
    '\\minus4 penalty',
    'minus4 penalty',
    'panicked',
    'penalty to accuracy',
    'penalty to defenses',
    'penalty to its',
    'prone',
    'push',
    'repeat the same standard action',
    'shaken',
    'slowed',
    'spend its next standard action doing nothing',
    'strike against itself',
    'teleport',
    'unable to breathe',
    'unable to say things',
    'unsteady',
    'vulnerable',
    'weakened',
  ];

  if (debuffKeywords.some((kw) => sanitized.includes(kw))) {
    return true;
  }

  if (
    /flicker/.test(sanitized) &&
    /does not return until|until the end of your next turn|for a number of turns|until your next turn/.test(
      sanitized,
    )
  ) {
    return true;
  }

  return false;
}

function isNarrativeSpell(rawSpell: SpellDefinition, fullTextLowercase: string): boolean {
  return Boolean(
    fullTextLowercase.includes('outside of combat') ||
    fullTextLowercase.includes('for one day') ||
    fullTextLowercase.includes('for one year') ||
    fullTextLowercase.includes('for 24 hours') ||
    (/choose.*unattended.*object/.test(fullTextLowercase) &&
      !/yourself|ally|allies/i.test(fullTextLowercase)) ||
    /observe your surroundings/.test(fullTextLowercase) ||
    /charmed/.test(fullTextLowercase) ||
    /see and hear out of/.test(fullTextLowercase) ||
    /change your appearance or equipment/.test(fullTextLowercase) ||
    /disguise check/.test(fullTextLowercase) ||
    /see out of the target's eyes/.test(fullTextLowercase) ||
    /creates? bright illumination in a radius/.test(fullTextLowercase) ||
    /duplicate copy of that organ/.test(fullTextLowercase) ||
    /absorb a .*?object into your body/.test(fullTextLowercase) ||
    /forced to speak out loud constantly/.test(fullTextLowercase) ||
    /unable to say things it knows to be untrue/.test(fullTextLowercase) ||
    (rawSpell.usageTime && rawSpell.usageTime !== 'standard' && rawSpell.usageTime !== 'minor'),
  );
}

/**
 * Checks if an attunement spell grants an active action or reaction.
 */
function attunementGrantsActiveAbility(fullTextLowercase: string): boolean {
  const requiresStandardAction = (
    fullTextLowercase.includes('as a standard action') ||
    fullTextLowercase.includes('spend a standard action')
  );
  const oneTimeMinorAction = (
    fullTextLowercase.includes('minor action') && /after you[^.]+dismissed/.test(fullTextLowercase));
  return requiresStandardAction || oneTimeMinorAction;
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

  // Portals are mobility infrastructure, not hazards
  if (rawSpell.name?.toLowerCase().includes('portal')) {
    return false;
  }

  // Walls are barriers, not hazards
  if (/create.*wall/.test(fullTextLowercase)) {
    return false;
  }

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

  // Personal attunement emanations/auras or attunements without zones are not battlefield hazards
  if (
    profile.requiresAttunement &&
    (fullTextLowercase.includes('emanation from you') || !fullTextLowercase.includes('zone'))
  ) {
    return false;
  }

  // Active attacks granted while attuned (e.g. Dragon breath attacks, call lightning, flame aura)
  // or reactive bursts on recover are active actions, not hazards.
  if (
    profile.requiresAttunement &&
    (attunementGrantsActiveAbility(fullTextLowercase) ||
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
    fullTextLowercase.includes('zone') ||
    fullTextLowercase.includes('undergrowth') ||
    fullTextLowercase.includes('caltrops') ||
    fullTextLowercase.includes('fortification');

  // 3. Attunable or sustained zone / environmental effect (e.g. Fog Cloud, Solid Fog Cloud, Bramblepatch, Slowtime Field)
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
      fullTextLowercase.includes('moves into') ||
      fullTextLowercase.includes('makes physical contact'));
  if (isRepeatingOrTriggeredZone) {
    return true;
  }

  // 5. Explicit hazard keywords
  if (
    fullTextLowercase.includes('battlefield hazard') ||
    (fullTextLowercase.includes('environmental hazard') &&
      !fullTextLowercase.includes('avoids obvious'))
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
  const resolved = resolveSpell(rawSpell);
  const { cost, hit, targeting, injury, effect, exceptThat, fullText } = getNormalSpellText(rawSpell);
  const fullTextLowercase = fullText.toLowerCase();

  const dealsDamage = profile.maxDamageRank !== null || profile.isStrike;

  // 1. Attunement
  if (profile.requiresAttunement) {
    expected.add('attune');
    if (isHazardEffect(rawSpell, profile, fullTextLowercase)) {
      expected.add('hazard');
    }
    if (!attunementGrantsActiveAbility(fullTextLowercase)) {
      return expected;
    }
  }

  // 2. Barrier
  const isBarrier =
    (rawSpell.tags || []).includes('Barrier') ||
    (profile.area === 'wall' && dealsDamage) ||
    (/\bwall\b/i.test(fullTextLowercase) && dealsDamage);
  if (isBarrier) {
    expected.add('barrier');
  }

  // 3. Healing
  if (
    profile.healingRank !== null ||
    /\bregains?\b.*?\bhit points\b/i.test(fullTextLowercase) ||
    /hit points to become identical to the locked hit points/i.test(fullTextLowercase) ||
    /removes? any excess vital wounds/i.test(fullTextLowercase)
  ) {
    expected.add('healing');
  }

  // 4. Cleanse
  if (
    /removes?\s+(?:all|a|one|\d+|any)?\s*(?:excess\s+)?(?:condition|curse|poison)/i.test(
      fullTextLowercase,
    ) ||
    /ends?\s+(?:all|a|one|\d+)?\s*(?:condition|curse|poison)/i.test(
      fullTextLowercase,
    ) ||
    /cures?\s+(?:a|one|\d+)?\s*poison/i.test(fullTextLowercase) ||
    /\bcleanse\b/i.test(fullTextLowercase) ||
    /effects of all other.*?suppressed/i.test(fullTextLowercase)
  ) {
    expected.add('cleanse');
  }

  const costRequiresStamina = cost.toLowerCase().includes('stamina') && !/you can spend one stamina/.test(cost);

  // 5. Exertion
  if (
    resolved.staminaCost === true ||
    costRequiresStamina ||
    /vital wound/.test(cost) ||
    /spends?\s+(?:one|\d+)?\s*stamina/i.test(fullTextLowercase) ||
    /reduces its stamina/i.test(fullTextLowercase) ||
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
    /whenever a creature.*?(?:attacks you|makes.*?attack against you)/i.test(fullTextLowercase) ||
    /if[^.]+attack(s|ed)[^.]+you or (one of )?your allies/i.test(fullTextLowercase) ||
    /if[^.]+injure[^.]+during this effect/.test(fullTextLowercase) ||
    /deal.*extra damage to creatures that attacked/i.test(fullTextLowercase)
  ) {
    expected.add('retaliate');
  }

  const isDefinitelyNotDive =
    /move the ball/.test(fullTextLowercase) ||
    /unable to move closer to you/.test(fullTextLowercase) ||
    /you\s+teleport\s+the\s+target/i.test(fullTextLowercase) ||
    /teleport\s+it/i.test(fullTextLowercase) ||
    /they each\s+teleport/i.test(fullTextLowercase) ||
    /whenever an enemy teleports/i.test(fullTextLowercase);

  const allowsFreeMovement = /move (?:towards|adjacent|through)/i.test(fullTextLowercase) ||
    /move[^.]+without reducing[^.]+available movement/.test(fullTextLowercase);

  const makesMeleeAttack = /make a[^.]+melee strike/.test(fullTextLowercase);

  const onlyMovesTowardsTarget = /leap.*attack/i.test(fullTextLowercase) ||
    /move in a straight line/i.test(fullTextLowercase) ||
    /(?:you\s+(?:first\s+)?teleport|teleport\s+up\s+to\s+\d+\s+feet\s+to\s+a\s+location\s+adjacent|teleport\s+to\s+an?\s+unoccupied)/i.test(
      fullTextLowercase,
    )

  if (profile.name === 'Quicksilver Ambush') {
    console.log('fullTextLowercase', fullTextLowercase);
  }

  // 8. Dive
  if (profile.hasAttack) {
    if (
      !isDefinitelyNotDive && (
        onlyMovesTowardsTarget || (allowsFreeMovement && makesMeleeAttack))) {
      expected.add('dive');
    }
  }

  // 9. Damage Roles (Snipe, Burst, Clear, Burn, Execute)
  const isMultiTarget = !profile.isSingleTarget;
  const isLongOrDistantRange = profile.range === 'long' || profile.range === 'distant';
  const isDoT = profile.hasDoT;

  if (dealsDamage) {
    // Snipe (Targeted long/distant range damage, not area or dive)
    if (
      isLongOrDistantRange &&
      !isDoT &&
      (profile.area === 'single' || profile.area === 'multi') &&
      !expected.has('dive')
    ) {
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

  // 10. Debuff Roles (Softener, Flash, Trip, Maim)
  const affectsAlly = !hit && !profile.isStrike && /choose.*ally/.test(fullTextLowercase);
  const isInjuryDebuffEffect = isInjuryDebuff(injury, fullTextLowercase);
  const isCondition = hasPersistentCondition(hit, effect, exceptThat);

  const cleanHit = stripBurnClauses(hit).replace(
    /(?:fling|push|slide|pull)\s+distance\s+increases\s+to\s+\d+\s+feet/gi,
    '',
  );
  const uninjuredHitText = cleanHit.split(
    /(?:if|while)\s+(?:the\s+target\s+is\s+|it\s+is\s+)?injured|(?:\bif\b|\bwhile\b)[^.]*?\binjured\b/i,
  )[0];
  const hasHitDebuff = hasDebuffWords(uninjuredHitText.toLowerCase());

  const isNarrativeOnly = isNarrativeSpell(rawSpell, fullTextLowercase);

  const isReactiveRetaliateOnly = expected.has('retaliate') && !profile.type?.includes('Sustain');

  const hasShortTermEffect = /\bbriefly/.test(uninjuredHitText) || /\b(flicker|push|fling|flung|teleport|prone)/.test(uninjuredHitText);

  const hasDebuff =
    !affectsAlly &&
    !isNarrativeOnly &&
    !isReactiveRetaliateOnly &&
    (hasHitDebuff || isInjuryDebuffEffect || isCondition);

  // All of the debuff roles can only apply to spells that make attacks
  if (hit && hasDebuff) {
    if (isCondition) {
      // Persistent condition on non-injured targets is softener
      expected.add('softener');
    } else if (profile.isSingleTarget && hasHitDebuff && hasShortTermEffect) {
      expected.add('trip');
    } else if (isMultiTarget && hasHitDebuff && hasShortTermEffect) {
      // Brief multi-target debuff is flash
      expected.add('flash');
    }

    if (isInjuryDebuffEffect) {
      expected.add('maim');
    }
  }

  const onlyAffectsAllies = (/all allies within.*radius.*you/.test(fullTextLowercase) && !/you and all allies/.test(fullTextLowercase)) || (/choose up to[^.]+allies within/.test(fullTextLowercase));

  // 11. Turtle (Brief defensive buff on self)
  const isTurtle =
    !onlyAffectsAllies &&
    !/creatures.*may have.*cover/.test(fullTextLowercase) && (
      /you (?:are|become).*(?:\\briefly\s+|briefly\s+).*(shielded|fortified|steeled|braced|resistant)/i.test(
        fullTextLowercase,
      ) ||
      /gain[^.]+bonus to[^.]+defense/i.test(fullTextLowercase) ||
      /takes?\s+half\s+damage/i.test(fullTextLowercase) ||
      /(?:\\briefly\s+)?have\s+(?:\\glossterm\{)?cover/i.test(fullTextLowercase) ||
      /failure chance/i.test(fullTextLowercase));
  if (isTurtle && !profile.requiresAttunement) {
    expected.add('turtle');
  }

  // 12. Focus & Generator
  const isOffensiveBuffOnSelf =
    !onlyAffectsAllies && (
      /\byou[^.]+(primed|empowered|maximized|focused|honed)/i.test(
        fullTextLowercase,
      ) ||
      /your next\s+(?:attack|strike|spell)/i.test(fullTextLowercase) ||
      /take (?:two turns of actions|an extra\s+(?:standard|minor) action)/i.test(
        fullTextLowercase,
      ));

  if (isOffensiveBuffOnSelf) {
    const isEmpoweredThisTurn =
      profile.isStrike &&
      /you (?:are|become)\s+\\(?:empowered|maximized)\s+this turn/i.test(fullTextLowercase);

    if (profile.hasAttack && !isEmpoweredThisTurn) {
      expected.add('generator');
    } else if (!profile.hasAttack) {
      expected.add('focus');
    }
  }

  // 13. Mobility (Movement/repositioning without attack)
  const isMobility =
    !profile.hasAttack &&
    !profile.requiresAttunement &&
    !/choose.*unattended object within/.test(fullTextLowercase) &&
    !/one of your items/.test(fullTextLowercase) &&
    (/\bfling\b/i.test(fullTextLowercase) ||
      /\bpush/i.test(fullTextLowercase) ||
      /teleport/i.test(fullTextLowercase) ||
      /glide speed/i.test(fullTextLowercase) ||
      /fly speed/i.test(fullTextLowercase) ||
      /walk speed/i.test(fullTextLowercase) ||
      /add.*speed.*available movement/i.test(fullTextLowercase) ||
      /move up to/i.test(fullTextLowercase) ||
      /causes the creature to disappear from its current location and reappear in the locked location/i.test(
        fullTextLowercase,
      ));
  if (isMobility) {
    expected.add('mobility');
  }

  // 14. Boon (Brief combat buff on allies)
  const isBoon =
    !profile.hasAttack &&
    !expected.has('narrative') &&
    (/\b(?:allies|ally)\b/i.test(targeting) ||
      /\b(?:allies|ally)\b/i.test(effect) ||
      /time lock/i.test(effect)) &&
    (!expected.has('mobility') || fullTextLowercase.includes('time lock'));
  if (isBoon && !dealsDamage) {
    const hasBuffEffect =
      /safe location|resistant|immune|bonus|shielded|steeled|fortified|empowered|maximized|advantage/i.test(
        effect,
      );
    const nonBoonRole = expected.has('healing') || expected.has('cleanse');
    if (!nonBoonRole && (hasBuffEffect || fullTextLowercase.includes('time lock'))) {
      expected.add('boon');
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
  if (!hit && isNarrativeSpell(rawSpell, fullTextLowercase)) {
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

      // Check missing roles
      for (const expRole of expectedSet) {
        // If it's an attunement spell without granted actions, only 'attune', 'barrier', 'hazard', or 'narrative' is expected
        if (
          profile.requiresAttunement &&
          !attunementGrantsActiveAbility(fullTextLowercase) &&
          expRole !== 'attune' &&
          expRole !== 'barrier' &&
          expRole !== 'hazard' &&
          expRole !== 'narrative'
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

          // Special exception: snipe on long/distant range area or multi-target damaging spells
          if (
            actRole === 'snipe' &&
            (profile.range === 'long' || profile.range === 'distant') &&
            (profile.maxDamageRank !== null || profile.isStrike)
          ) {
            continue;
          }

          // Special exception: targeted multi-target debuffs can use trip or flash
          if (
            (actRole === 'trip' || actRole === 'flash') &&
            profile.maxTargets >= 1 &&
            profile.maxTargets <= 2 &&
            (expectedSet.has('trip') || expectedSet.has('flash'))
          ) {
            continue;
          }

          // Special exception: social/narrative spells
          if (
            actRole === 'narrative' &&
            (fullTextLowercase.includes('social') ||
              fullTextLowercase.includes('observe') ||
              fullTextLowercase.includes('appearance') ||
              fullTextLowercase.includes('disguise') ||
              fullTextLowercase.includes('speak') ||
              fullTextLowercase.includes('charmed') ||
              fullTextLowercase.includes('truth') ||
              fullTextLowercase.includes('mood') ||
              fullTextLowercase.includes('eyes') ||
              isNarrativeSpell(spell, fullTextLowercase))
          ) {
            continue;
          }

          // Special exception: decoy/sustain attune
          if (
            actRole === 'attune' &&
            (profile.isAttunable ||
              profile.isSustainedMinor ||
              fullTextLowercase.includes('duplicate'))
          ) {
            continue;
          }

          // Special exception: retaliate spells having trip, softener, or flash
          if (
            (actRole === 'trip' || actRole === 'softener' || actRole === 'flash') &&
            actualSet.has('retaliate')
          ) {
            continue;
          }

          // Special exception: softener for sustained conditions/pacification
          if (
            actRole === 'softener' &&
            (fullTextLowercase.includes('charmed') ||
              fullTextLowercase.includes('emotions calmed') ||
              fullTextLowercase.includes('cannot take violent actions') ||
              hasPersistentCondition('', fullText))
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
