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
    hit: stripGlossterm(hit).toLowerCase(),
    targeting: stripGlossterm(targeting).toLowerCase(),
    injury: stripGlossterm(injury).toLowerCase(),
    effect: stripGlossterm(effect).toLowerCase(),
    exceptThat: stripGlossterm(exceptThat).toLowerCase(),
    fullText: stripGlossterm(fullText).toLowerCase(),
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

  // If the uninjured part only mentions duration/flavor and the actual debuff is inside "while injured", ignore it
  if (!hasDebuffWords(uninjured)) {
    return false;
  }

  // If the condition is dismissed on its first trigger (like Spellseal) and not overridden with a condition in exceptThat, it is a brief 1-time denial, not persistent softener
  if (
    !exceptThat.includes('as a condition') &&
    (/(?:the first time|when the target fails)[\s\S]*?dismissed/i.test(uninjured) ||
      /after[\s\S]*?dismissed/i.test(uninjured))
  ) {
    return false;
  }

  const untilShortRest =
    /until.*finish.*short rest/.test(uninjured) &&
    !/immune.*until.*finish.*short rest/.test(uninjured);

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
  const match = fullTextLowercase.match(
    /(?:if|while|whenever)[^.]*?\b(?:injured|injures)\b(?:\})?.*/i,
  );
  return Boolean(match && hasDebuffWords(match[0]));
}

function hasDebuffWords(fullTextLowercase: string): boolean {
  const sanitized = fullTextLowercase
    .replace(/you are \\?(?:blinded|dazed|slowed)/g, '')
    .replace(/you take a (?:-\d+|\\?minus\d+)\s+penalty/g, '')
    .replace(/dropping\s+\\?prone\s+as\s+part\s+of\s+this\s+action/g, '');

  const debuffKeywords = [
    '-1 penalty',
    '-2 penalty',
    '-4 penalty',
    'an extra 30 feet to affect it',
    'attack the creature closest',
    'automatically fails',
    'blinded',
    'cannot act',
    'cannot be teleported',
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
    'difficult terrain',
    'doing nothing at all',
    'effect ends completely',
    'emotions calmed',
    'everything outside itself',
    'nothing can pass through',
    'exposed',
    'fling',
    'frightened',
    'frozen in time',
    'goaded',
    'grappled',
    'immobilized',
    'invisible',
    'magic is partially sealed',
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
    'prevents the target from having',
    'prone',
    'push',
    'repeat the same standard action',
    'shaken',
    'sickened',
    'sleepy',
    'slowed',
    'spend its next standard action doing nothing',
    'strike against itself',
    'suppressed',
    'teleport',
    'unable to breathe',
    'unable to move',
    'unable to say things',
    'unable to use',
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
    fullTextLowercase.includes('weight is reduced') ||
    /telekinetically control[^.]+object/.test(fullTextLowercase) ||
    (/choose.*unattended.*object/.test(fullTextLowercase) &&
      !/yourself|ally|allies/i.test(fullTextLowercase)) ||
    /observe your surroundings/.test(fullTextLowercase) ||
    /charmed/.test(fullTextLowercase) ||
    /see and hear (?:out of|from)/.test(fullTextLowercase) ||
    /scrying sensor/.test(fullTextLowercase) ||
    /craft check to create/.test(fullTextLowercase) ||
    /change your appearance or equipment/.test(fullTextLowercase) ||
    /disguise check/.test(fullTextLowercase) ||
    /see out of the target's eyes/.test(fullTextLowercase) ||
    /creates? bright illumination in a radius/.test(fullTextLowercase) ||
    /duplicate copy of that organ/.test(fullTextLowercase) ||
    /absorb a .*?object into your body/.test(fullTextLowercase) ||
    /forced to speak out loud constantly/.test(fullTextLowercase) ||
    /unable to say things it knows to be untrue/.test(fullTextLowercase) ||
    /separate your shadow|viewing through your shadow|see from your shadow/.test(
      fullTextLowercase,
    ) ||
    (rawSpell.usageTime && rawSpell.usageTime !== 'standard' && rawSpell.usageTime !== 'minor'),
  );
}

/**
 * Checks if an attunement spell grants an active action or reaction.
 */
function attunementGrantsActiveAbility(fullTextLowercase: string): boolean {
  const requiresStandardAction =
    fullTextLowercase.includes('as a standard action') ||
    fullTextLowercase.includes('spend a standard action');
  const oneTimeMinorAction =
    fullTextLowercase.includes('minor action') && /after you[^.]+dismissed/.test(fullTextLowercase);
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
    /you create.*attack.*of it/.test(fullTextLowercase) ||
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
  const { cost, hit, targeting, injury, effect, exceptThat, fullText } =
    getNormalSpellText(rawSpell);

  const dealsDamage =
    profile.maxDamageRank !== null ||
    profile.isStrike ||
    /takes?\s+damage\s+equal\s+to/i.test(fullText);

  // 1. Attunement
  if (profile.requiresAttunement) {
    expected.add('attune');
    if (isHazardEffect(rawSpell, profile, fullText)) {
      expected.add('hazard');
    }
    if (!attunementGrantsActiveAbility(fullText)) {
      return expected;
    }
  }

  // 2. Barrier
  const isBarrier =
    (rawSpell.tags || []).includes('Barrier') ||
    (profile.area === 'wall' && dealsDamage) ||
    (/\bwall\b/i.test(fullText) && dealsDamage);
  if (isBarrier) {
    expected.add('barrier');
  }

  // 3. Healing
  if (
    profile.healingRank !== null ||
    /\bregains?\b.*?\bhit points\b/i.test(fullText) ||
    /hit points to become identical to the locked hit points/i.test(fullText) ||
    /remove[^.]+ vital wounds/i.test(fullText)
  ) {
    expected.add('healing');
  }

  // 4. Cleanse
  if (
    /removes?\s+(?:all|a|one|\d+|any)?\s*(?:excess\s+)?(?:condition|curse|poison)/i.test(
      fullText,
    ) ||
    /ends?\s+(?:all|a|one|\d+)?\s*(?:condition|curse|poison)/i.test(fullText) ||
    /cures?\s+(?:a|one|\d+)?\s*poison/i.test(fullText) ||
    /\bcleanse\b/i.test(fullText) ||
    /effects of all other.*?suppressed/i.test(fullText)
  ) {
    expected.add('cleanse');
  }

  const costRequiresStamina =
    cost.toLowerCase().includes('stamina') && !/you can spend one stamina/.test(cost);

  // 5. Exertion
  if (
    resolved.staminaCost === true ||
    costRequiresStamina ||
    /vital wound/.test(cost) ||
    /spends?\s+(?:one|\d+)?\s*stamina/i.test(fullText) ||
    /reduces its stamina/i.test(fullText) ||
    /spends?\s+(?:a|\d+)?\s*vital wound/i.test(fullText)
  ) {
    expected.add('exertion');
  }

  // 6. Hazard
  if (isHazardEffect(rawSpell, profile, fullText)) {
    expected.add('hazard');
  }

  // 7. Retaliate
  if (
    (profile.hasAttack || dealsDamage) &&
    (/whenever a creature.*?(?:attacks you|makes.*?attack against you)/i.test(fullText) ||
      /if[^.]+attack(s|ed)[^.]+you or (one of )?your allies/i.test(fullText) ||
      /if[^.]+injure[^.]+during this effect/.test(fullText) ||
      /deal.*extra damage to creatures that attacked/i.test(fullText))
  ) {
    expected.add('retaliate');
  }

  const isDefinitelyNotDive =
    /move the ball/.test(fullText) ||
    /unable to move closer to you/.test(fullText) ||
    /you\s+teleport\s+the\s+target/i.test(fullText) ||
    /teleport\s+it/i.test(fullText) ||
    /they each\s+teleport/i.test(fullText) ||
    /whenever an enemy teleports/i.test(fullText);

  const allowsFreeMovement =
    /move (?:towards|adjacent|through)/i.test(fullText) ||
    /move[^.]+without reducing[^.]+available movement/.test(fullText);

  const makesMeleeAttack = /make a[^.]+melee strike/.test(fullText);

  const onlyMovesTowardsTarget =
    /leap.*attack/i.test(fullText) ||
    /move in a straight line/i.test(fullText) ||
    /(?:you\s+(?:first\s+)?teleport|teleport\s+up\s+to\s+\d+\s+feet\s+to\s+a\s+location\s+adjacent|teleport\s+to\s+an?\s+unoccupied)/i.test(
      fullText,
    );

  // 8. Dive
  if (profile.hasAttack) {
    if (
      !isDefinitelyNotDive &&
      (onlyMovesTowardsTarget || (allowsFreeMovement && makesMeleeAttack))
    ) {
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
      (profile.area === 'single' || profile.area === 'multi') &&
      !expected.has('dive')
    ) {
      expected.add('snipe');
    }

    // Burn (Single-target DoT or delayed damage)
    if (profile.isSingleTarget && isDoT && !isLongOrDistantRange) {
      expected.add('burn');
    }

    // Execute (Single-target injury damage)
    const isInjuryBleedOrBurn = injury && /bleeds?|burns?/i.test(injury);
    if (
      profile.isSingleTarget &&
      !isInjuryBleedOrBurn &&
      (profile.isInjuryOnly ||
        (injury && /\\damagerank/i.test(injury)) ||
        fullText.includes('if the target is injured, it takes') ||
        /if (?:the target is )?injured.*?(?:takes?|deals?|becomes (?:\\glossterm\{)?poisoned)/i.test(
          fullText,
        ))
    ) {
      expected.add('execute');
    }

    // Clear (Multi-target immediate damage)
    const isPoisonEscalationOnlyDamage =
      /escalation also deals/i.test(fullText) && !/immediately/i.test(fullText);
    if (isMultiTarget && !isBarrier && !isPoisonEscalationOnlyDamage) {
      expected.add('clear');
    }

    // Burst (Single-target immediate damage, not purely DoT, not injury-only, not long/distant snipe, not reactive)
    const isInjuryOnlyDamage =
      profile.isInjuryOnly ||
      /^(?:if\s+(?:the\s+target\s+is\s+|it\s+is\s+)?(?:\\glossterm\{)?injured|while\s+(?:\\glossterm\{)?injured)/i.test(
        hit.trim(),
      );
    if (
      profile.isSingleTarget &&
      (hit || profile.isStrike) &&
      !isInjuryOnlyDamage &&
      !isDoT &&
      !isLongOrDistantRange &&
      !fullText.includes('reactive attack') &&
      !/whenever\s+(?:a|an)?\s*creature/i.test(targeting)
    ) {
      expected.add('burst');
    }
  }

  // 10. Debuff Roles (Softener, Flash, Trip, Maim)
  const affectsAlly = !hit && !profile.isStrike && /choose.*ally/.test(fullText);
  const isInjuryDebuffEffect = isInjuryDebuff(injury, fullText);
  const isCondition = hasPersistentCondition(hit, effect, exceptThat);

  const cleanHit = stripBurnClauses(hit).replace(
    /(?:fling|push|slide|pull)\s+distance\s+increases\s+to\s+\d+\s+feet/gi,
    '',
  );
  const uninjuredHitText = cleanHit.split(
    /(?:if|while)\s+(?:the\s+target\s+is\s+|it\s+is\s+)?injured|(?:\bif\b|\bwhile\b)[^.]*?\binjured\b/i,
  )[0];
  const hasHitDebuff = hasDebuffWords(uninjuredHitText.toLowerCase());

  const isNarrativeOnly = isNarrativeSpell(rawSpell, fullText);

  const isReactiveRetaliateOnly = expected.has('retaliate') && !profile.type?.includes('Sustain');

  const hasShortTermEffect =
    /\bbriefly/.test(uninjuredHitText) ||
    /\b(flicker|repeat the same|push|fling|flung|teleport|prone|automatically fails)/.test(
      uninjuredHitText,
    ) ||
    /first time/i.test(uninjuredHitText);

  const hasDebuff =
    !affectsAlly &&
    !isNarrativeOnly &&
    !isReactiveRetaliateOnly &&
    (hasHitDebuff || isInjuryDebuffEffect || isCondition);

  const isNonAreaSustain =
    ['single', 'multi'].includes(profile.area) && profile.type?.includes('Sustain');

  // All of the debuff roles can only apply to spells that make attacks
  if (profile.hasAttack && hasDebuff) {
    if (isCondition || isNonAreaSustain) {
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

  const isPotionConcoction = /create a potion in an empty vial/i.test(fullText);
  const onlyAffectsAllies =
    ((/all (?:[a-z\\]+\s+)*allies within.*radius.*you/i.test(fullText) &&
      !/you and all (?:[a-z\\]+\s+)*allies/i.test(fullText)) ||
      /choose (?:up to )?(?:one|two|\d+) allies/i.test(fullText)) &&
    !isPotionConcoction;
  const affectsYou = /\b(you|yourself)\b/.test(fullText) || isPotionConcoction;

  const providesDefensiveBuff = hasDefensiveText(targeting) || hasDefensiveText(effect);

  // 11. Turtle (Brief defensive buff on self)
  const isTurtle =
    affectsYou &&
    !/\b(wall|zone)\b/.test(fullText) &&
    !onlyAffectsAllies &&
    !/creatures.*may have.*cover/.test(fullText) &&
    providesDefensiveBuff;

  if (isTurtle && !profile.requiresAttunement) {
    expected.add('turtle');
  }

  const providesOffensiveBuff =
    /(primed|empowered|maximized|focused|honed)/i.test(fullText) ||
    /persists until the end of your turn/.test(fullText) ||
    /your next\s+(?:attack|strike|spell)/i.test(fullText) ||
    /take (?:two turns of actions|an extra\s+(?:standard|minor) action)/i.test(fullText);

  // 12. Focus & Generator
  const isOffensiveBuffOnSelf =
    affectsYou &&
    !onlyAffectsAllies &&
    !/each of your (?:\\glossterm\{)?allies/i.test(fullText) &&
    providesOffensiveBuff;

  if (isOffensiveBuffOnSelf) {
    const isEmpoweredThisTurn =
      profile.isStrike &&
      /you (?:are|become)\s+\\(?:empowered|maximized)\s+this turn/i.test(fullText);

    if (profile.hasAttack && !isEmpoweredThisTurn) {
      expected.add('generator');
    } else if (!profile.hasAttack || isPotionConcoction) {
      expected.add('focus');
    }
  }

  // 13. Mobility (Movement/repositioning without attack)
  const isMobility =
    !profile.hasAttack &&
    !profile.requiresAttunement &&
    !isHazardEffect(rawSpell, profile, fullText) &&
    (!/move your shadow/i.test(fullText) || /teleport/i.test(fullText)) &&
    !/extraplanar travel into or out of the area is impossible/i.test(fullText) &&
    !/prevents? all (?:\\abilitytag\{)?manifestation/i.test(fullText) &&
    !/choose.*unattended object within/.test(fullText) &&
    !/one of your items/.test(fullText) &&
    (/\bfling\b/i.test(fullText) ||
      /\bpush/i.test(fullText) ||
      /teleport/i.test(fullText) ||
      /glide speed/i.test(fullText) ||
      /fly speed/i.test(fullText) ||
      /walk speed/i.test(fullText) ||
      /add.*speed.*available movement/i.test(fullText) ||
      /move up to/i.test(fullText) ||
      /causes the creature to disappear from its current location and reappear in the locked location/i.test(
        fullText,
      ));
  if (isMobility) {
    expected.add('mobility');
  }

  const canAffectAllies = /\b(ally|allies)\b/.test(fullText) || isPotionConcoction;

  // 14. Boon (Brief combat buff on allies)
  const isBoon =
    !expected.has('narrative') &&
    canAffectAllies &&
    (providesDefensiveBuff || providesOffensiveBuff || /time lock/.test(fullText));
  if (isBoon && (!dealsDamage || profile.hasAttack || isPotionConcoction)) {
    const nonBoonRole = expected.has('healing') || expected.has('cleanse');
    if (!nonBoonRole) {
      expected.add('boon');
    }
  }

  // 15. Ramp
  if (
    fullText.includes('for the rest of combat') ||
    fullText.includes('until combat ends') ||
    fullText.includes('for the rest of the fight')
  ) {
    expected.add('ramp');
  }

  // 16. Narrative
  if (!hit && isNarrativeSpell(rawSpell, fullText)) {
    expected.add('narrative');
  }

  // 17. Payoff
  if (
    /unless.*during your (?:previous|last) turn/i.test(fullText) ||
    fullText.includes('if you used') ||
    /choose.*(?:\\glossterm\{)?corpse/i.test(fullText)
  ) {
    expected.add('payoff');
  }

  return expected;
}

function hasDefensiveText(text: string) {
  return (
    /(shielded|fortified|steeled|braced|resistant|safe location|stasis)/i.test(text) ||
    /gain[^.]+bonus to[^.]+defense/i.test(text) ||
    /provide[^.]+cover/.test(text) ||
    /takes?\s+half\s+damage/i.test(text) ||
    /(?:\\briefly\s+)?have\s+(?:\\glossterm\{)?cover/i.test(text) ||
    /failure chance/i.test(text)
  );
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

      // Check missing roles
      for (const expRole of expectedSet) {
        // If it's an attunement spell without granted actions, only 'attune', 'barrier', 'hazard', or 'narrative' is expected
        if (
          profile.requiresAttunement &&
          !attunementGrantsActiveAbility(fullText) &&
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
            (fullText.includes('social') ||
              fullText.includes('observe') ||
              fullText.includes('appearance') ||
              fullText.includes('disguise') ||
              fullText.includes('speak') ||
              fullText.includes('charmed') ||
              fullText.includes('truth') ||
              fullText.includes('mood') ||
              fullText.includes('eyes') ||
              isNarrativeSpell(spell, fullText))
          ) {
            continue;
          }

          // Special exception: decoy/sustain attune
          if (
            actRole === 'attune' &&
            (profile.isAttunable || profile.isSustainedMinor || fullText.includes('duplicate'))
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
            (fullText.includes('charmed') ||
              fullText.includes('emotions calmed') ||
              fullText.includes('cannot take violent actions') ||
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
