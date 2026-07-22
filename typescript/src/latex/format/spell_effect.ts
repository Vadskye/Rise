import { Ritual } from '@src/abilities';
import { ActiveAbility, ActiveAbilityAttack, FunctionsLike } from '@src/abilities/active_abilities';

export function assertEndsWithPeriod(text: string | null | undefined, effectName: string): void {
  if (text && !(text.trim().endsWith('.') || text.trim().endsWith('end{mdframeditemize}'))) {
    console.error(`Text from ${effectName} should end with period: ${text}`);
  }
}

export function assertStartsWithLowercase(
  text: string | null | undefined,
  effectName: string,
): void {
  if (text && !text.trim().match(/^[a-z]/)) {
    console.error(`Text from ${effectName} should start with lowercase: ${text}`);
  }
}

// TODO: add checking for nonsensical crit effects
function assertHasCorrectCrit(attack: ActiveAbilityAttack, effectName: string): void {
  const dealsRepeatDamage = /damage.*immediately.*again/.test(attack.hit);
  if (dealsRepeatDamage && attack.crit === undefined) {
    console.error(
      `Attack from ${effectName} should have explicit crit effect for a multi-hit attack`,
    );
  }

  // Very rough estimate
  const inflictsDebuff = /(briefly|condition)/.test(attack.hit);
  const dealsDamage = /(\\damage|damage equal to)/.test(attack.hit);
  const grantsImmunity = /immun.*short rest/.test(attack.hit);
  const inflictsCritCondition = attack.crit && /condition/.test(attack.crit);
  if (attack.crit === undefined) {
    if (!dealsDamage) {
      const requiresInjury = /[iI]f.*injured/.test(attack.hit);
      const isBrief = /briefly/.test(attack.hit);
      if (requiresInjury) {
        console.warn(`Attack from ${effectName} should use INJURY_CRIT`);
      } else if (isBrief && !grantsImmunity) {
        console.warn(`Attack from ${effectName} should use CRIT_BECOMES_CONDITION`);
      } else {
        console.warn(`Attack from ${effectName} is missing a crit effect.`);
      }
    } else if (dealsDamage && inflictsDebuff) {
      console.warn(`Attack from ${effectName} is missing a crit effect.`);
    } else if (dealsDamage && inflictsCritCondition) {
      // The actual guideline is that abilities should have a crit effect if they pay a
      // rank cost for their debuff, but pure damage abilities that get a weak injury-only
      // effect for free should not have special crit text. That's hard to filter for
      // here, so this is an underestimate of the number of spells that should have crit
      // effects.
      console.warn(`Attack from ${effectName} is should use DAMAGING_INJURY_CRIT.`);
    }
  } else if (grantsImmunity && attack.crit?.includes('condition')) {
    console.warn(`Attack from ${effectName} should not inflict a condition since it grants immunity.`);
  }
}

function assertDoesNotUseEachTarget(attack: ActiveAbilityAttack, effectName: string): void {
  const hasEachTarget = /ach target/.test(attack.hit);
  // Some spells, like Buffet, have more specific wording that does explicitly apply to
  // each target of the spell, even if its baseline effects correctly use "the target".
  const hasEachTargetOfThisSpell = /ach target of this spell/.test(attack.hit);
  if (hasEachTarget && !hasEachTargetOfThisSpell) {
    console.error(`Hit effect from ${effectName} should use 'the target' instead of 'each target'`);
  }
}

function assertHasCorrectHalfDamage(attack: ActiveAbilityAttack, effectName: string) {
  const isArea = /(\bwall\b|against all|ach target|verything|and all)/.test(attack.targeting);
  const dealsDamage = /damagerank/.test(attack.hit);
  // We check for undefined to ignore cases where we explicitly defined halfOnMiss to be
  // false, which probably means the omission is intentional.
  if (isArea && dealsDamage && attack.halfOnMiss === undefined && attack.miss === undefined) {
    console.warn(`Attack from ${effectName} should probably have halfOnMiss = true`);
  } else if (attack.halfOnMiss && dealsDamage && !isArea) {
    console.warn(`Attack from ${effectName} should probably have halfOnMiss = false`);
  }
}

export function validateActiveAbility(ability: ActiveAbility): void {
  if (ability.attack) {
    assertEndsWithPeriod(ability.attack.targeting, ability.name);
    assertEndsWithPeriod(ability.attack.hit, ability.name);
    assertEndsWithPeriod(ability.attack.injury, ability.name);
    assertEndsWithPeriod(ability.attack.crit, ability.name);
    assertHasCorrectHalfDamage(ability.attack, ability.name);
    assertHasCorrectCrit(ability.attack, ability.name);
    assertDoesNotUseEachTarget(ability.attack, ability.name);
  } else if (ability.functionsLike) {
    const exceptThat = deriveExceptThat(ability.functionsLike);
    assertEndsWithPeriod(exceptThat, ability.name);
    assertStartsWithLowercase(exceptThat, ability.name);
  }
}

export function validateRitual(ritual: Ritual): void {
  validateActiveAbility(ritual);
  if (ritual.sphereEffects) {
    for (const effect of Object.values(ritual.sphereEffects)) {
      assertEndsWithPeriod(effect, ritual.name);
    }
  }
}

export function spellEffect(spell: ActiveAbility | Ritual): string | null {
  try {
    if (spell.attack) {
      // The terminal % prevents a double-space in weird edge cases
      return `
        ${spell.attack.targeting.trim()}%
        \\vspace{0.25em}
        \\hit ${spell.attack.hit.trim()}
        ${spell.attack.injury ? `\\injury ${spell.attack.injury.trim()}` : ''}
        ${spell.attack.crit ? `\\crit ${spell.attack.crit.trim()}` : ''}
        ${spell.attack.halfOnMiss ? '\\miss Half damage.' : ''}
        ${spell.attack.miss ? `\\miss ${spell.attack.miss}` : ''}
      `;
    } else if (spell.effect) {
      return spell.effect.trim();
    } else if (spell.functionsLike) {
      const exceptThat = deriveExceptThat(spell.functionsLike);
      const referencedCategory = spell.functionsLike.abilityType || spell.kind;

      return `
        This ${spell.kind} functions like the \\${referencedCategory}{${spell.functionsLike.name.toLowerCase()}} ${referencedCategory}, except that ${exceptThat.trim()}
      `.trim();
    } else {
      return null;
    }
  } catch (err) {
    if (err instanceof Error) {
      err.message += `Error converting spell ${spell.name} to LaTeX: ${err.message}`;
    }
    throw err;
  }
}

export function ritualSpheres(ritual: Ritual): string | null {
  const effects = ritual.sphereEffects
    ? `
      \\noindent Mystic sphere effects:
      \\begin{raggeditemize}
        ${Object.entries(ritual.sphereEffects)
      .map(([sphereName, effect]) => `\\item ${sphereName}: ${effect}`)
      .join('\n')}
      \\end{raggeditemize}
    `
    : '';

  const sphereNames = [...ritual.spheres];
  sphereNames.sort();

  return `
      Mystic spheres: ${sphereNames.join(', ')}

      ${effects}
    `.trim();
}

function deriveExceptThat(functionsLike: FunctionsLike) {
  if (functionsLike.mass) {
    return 'it affects up to five creatures of your choice from among yourself and your \\glossterm{allies} within \\medrange.';
  } else if (functionsLike.oneYear) {
    return 'the effect lasts for one year.';
  } else if (functionsLike.exceptThat) {
    return functionsLike.exceptThat;
  } else {
    throw new Error(`Cannot derive exceptThat from functionsLike: ${functionsLike}`);
  }
}
