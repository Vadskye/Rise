import { Creature } from '@src/character_sheet/creature';
import { ActiveAbility } from '@src/abilities';
import { getWeaponDamageDice, getWeaponPowerMultiplier } from '@src/monsters/weapons';

// LaTeX can represent modifier signs with '\\minus' or '\\plus' instead of '-' or '+'.
export function standardizeModifierSign(latexModifierSign: string): '-' | '+' {
  if (latexModifierSign === '\\minus' || latexModifierSign === '-') {
    return '-';
  } else if (latexModifierSign === '\\plus' || latexModifierSign === '+') {
    return '+';
  } else {
    throw new Error(`Unable to parse LaTeX modifier sign '${latexModifierSign}'`);
  }
}

// We need an explicit `isMagical` here because some magical abilities make mundane
// strikes.
export function calculateStrikeDamage(
  monster: Creature,
  ability: ActiveAbility,
  isMagical: boolean,
): string {
  const weapon = ability.weapon!;

  // We only check the sentence of the strike to avoid catching conditional clauses.
  const strikeSentenceMatch = ability.effect?.match(/([mM]ake[^.]+strike[^.]*\.)/);
  if (!strikeSentenceMatch) {
    throw new Error(
      `${monster.id}.${ability.name}: Cannot calculate strike damage for an ability that does not make a strike`,
    );
  }
  const strikeSentence: string = strikeSentenceMatch[1];

  let globalDamageMultiplier = 1;
  let globalMultiplierMatch = strikeSentence.match(/deals (double|triple|quadruple) damage/);
  if (globalMultiplierMatch) {
    globalDamageMultiplier =
      {
        double: 2,
        triple: 3,
        quadruple: 4,
      }[globalMultiplierMatch[1]] || 0;
    if (!globalDamageMultiplier) {
      throw new Error(
        `Ability ${monster.id}.${ability.name}: Unable to parse global damage multiplier`,
      );
    }
  }

  let weaponDamageMultiplier = 1;
  let weaponMultiplierMatch = strikeSentence.match(
    /deals (double|triple|quadruple|five times|six times|seven times|eight times) (\\glossterm{weapon damage}|weapon damage)/,
  );
  if (weaponMultiplierMatch) {
    weaponDamageMultiplier =
      {
        double: 2,
        triple: 3,
        quadruple: 4,
        'five times': 5,
        'six times': 6,
        'seven times': 7,
        'eight times': 8,
      }[weaponMultiplierMatch[1]] || 0;
    if (!weaponDamageMultiplier) {
      throw new Error(
        `Ability ${monster.id}.${ability.name}: Unable to parse weapon damage multiplier`,
      );
    }
  }

  const damageDice = getWeaponDamageDice(weapon);
  if (!damageDice) {
    throw new Error(`Ability ${monster.id}.${ability.name}: Invalid weapon '${weapon}'`);
  }
  damageDice.count = damageDice.count * weaponDamageMultiplier;

  const powerMultiplier = getWeaponPowerMultiplier(weapon);
  let extraFlatDamage = 0;
  // TODO: handle extra damage dice.
  // We rely on `replaceGenericTerms` to make sure that flat damage is pre-converted into
  // numbers instead of a scaling expression.
  const extraDamageDiceMatch = ability.effect?.match(
    /\b(\d+)d(\d+) (extra damage|\\glossterm{extra damage})/,
  );
  if (extraDamageDiceMatch) {
    // Conditional extra damage is fine, and we don't need to warn about it; we can't
    // incorporate it into the main effect anyway.
    const conditionalExtraDamage = /extra damage}? if/;
    if (!conditionalExtraDamage) {
      console.warn('TODO: Unable to parse extra damage dice');
    }
  }

  const extraFlatDamageMatch = ability.effect?.match(
    / (\d+) (extra damage|\\glossterm{extra damage})/,
  );
  if (extraFlatDamageMatch) {
    extraFlatDamage = Number(extraFlatDamageMatch[1]);
  }

  let relevantPower = monster.getRelevantPower(isMagical);
  if (ability.effect && /higher of.*mundane.*magical/.test(ability.effect)) {
    relevantPower = Math.max(monster.getRelevantPower(true), monster.getRelevantPower(false));
  }

  const damageFromPower =
    globalDamageMultiplier * (Math.floor(relevantPower * powerMultiplier) + extraFlatDamage);
  let damageFromPowerText = '';
  if (damageFromPower > 0) {
    damageFromPowerText = `+${damageFromPower}`;
  } else if (damageFromPower < 0) {
    damageFromPowerText = `${damageFromPower}`;
  }

  return `${damageDice.count * globalDamageMultiplier}d${damageDice.size}${damageFromPowerText}`;
}
