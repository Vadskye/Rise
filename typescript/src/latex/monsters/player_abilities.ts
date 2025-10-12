import { Creature } from '@src/character_sheet/creature';
import { ActiveAbility, ManeuverDefinition, SpellDefinition, standardizeManeuver, standardizeSpell } from '@src/abilities';
import { convertManeuverToLatex } from '@src/latex/abilities/combat_styles';
import { convertSpellToLatex } from '@src/latex/abilities/mystic_spheres';
import { getWeaponDamageDice, getWeaponTag } from '@src/monsters/weapons';

export function convertManeuverToMonsterAbility(monster: Creature, maneuver: ManeuverDefinition): string {
  const latex = convertManeuverToLatex(reformatAsMonsterAbility(monster, standardizeManeuver(maneuver)), true);
  checkSuccessfullyConverted(latex, monster.name, maneuver.name);
  return latex;
}

export function convertSpellToMonsterAbility(monster: Creature, spell: SpellDefinition): string {
  const latex = convertSpellToLatex(reformatAsMonsterAbility(monster, standardizeSpell(spell)), true);
  checkSuccessfullyConverted(latex, monster.name, spell.name);
  return latex;
}

const makeStrikePattern = /\b[mM]ake a.*strike\b/;

// monsterName and abilityName are only provided to improve the clarity of warnings and
// errors.
function checkSuccessfullyConverted(abilityText: string, monsterName: string, abilityName: string) {
  const warn = (message: string) => {
    console.warn(`Problem reformatting ${monsterName}.${abilityName}: ${message}`);
  };

  if (/\b[yY]our?/.test(abilityText)) {
    warn("Ability still says 'you'");
  }

  // Whenever we deal with an ability's scaling automatically, we clear it so it doesn't
  // show up in the final ability. This means that we didn't handle some scaling value
  // correctly.
  if (/\bfor each rank beyond\b/.test(abilityText)) {
    warn('Ability still has listed scaling');
  }

  if (/\\damagerank/.test(abilityText)) {
    warn('Ability still has listed \\damagerank');
  }

  if (/\\hprank/.test(abilityText)) {
    warn('Ability still has listed \\hprank');
  }

  if (makeStrikePattern.test(abilityText)) {
    warn('Ability still says it makes a strike');
  }
}

// Convert a standard spell or maneuver that appears in the player-facing section of the
// book so it is written as a monster ability. It requires a monster with all of its
// statistics correctly calculated so we can correctly determine the accuracy and damage
// of abilities. Note that we still use placeholders that will be handled separately in
// `replacePlaceholders`. This avoids needing to duplicate some of the formatting logic
// that placeholders can handle, and it allows us to make simplifying assumptions with our
// regex patterns (like checking for "$name" to check if we're repeating the monsters's
// name).
export function reformatAsMonsterAbility(monster: Creature, ability: ActiveAbility): ActiveAbility {
  if (ability.effect && makeStrikePattern.test(ability.effect)) {
    restructureStrikeAbility(monster, ability);
  }

  if (ability.attack) {
    reformatAttackTargeting(monster, ability);
    reformatAttackConsequences(monster, ability);
  }

  return ability;
}

// Normally, abilities that make strikes say "make a strike" in the text of
// `ability.effect`. If we rewrite that to use `ability.attack`, we can use the standard
// attack-parsing logic to format it without duplicating logic between strike-based
// abilities and non-strike abilities. Since strikes don't use standard damage rank
// values, we also have to calculate the exact damage dealt by the strike here.
export function restructureStrikeAbility(monster: Creature, ability: ActiveAbility) {
  if (!ability.weapon) {
    throw new Error(
      `Monster ability ${monster.name}.${ability.name}: Strike ability has no weapon`,
    );
  }
  if (ability.attack) {
    throw new Error(
      `Monster ability ${monster.name}.${ability.name}: Strike ability already makes an explicit attack`,
    );
  }
  const effect = ability.effect!;

  let accuracyModifierText = '';
  const accuracyMatch = effect.match(
    /Make a (\\glossterm{strike}|strike).* with a (\\minus|-|\\plus|\+)(\d+) (\\glossterm{accuracy}|accuracy) (bonus|penalty)/,
  );
  if (accuracyMatch) {
    const modifierSign = standardizeModifierSign(accuracyMatch[2]);
    const modifierValue = Number(accuracyMatch[3]);
    if (!modifierValue) {
      throw new Error(
        `Monster ability ${monster.name}.${ability.name}: Failed to parse strike accuracy modifier '${accuracyMatch[3]}'`,
      );
    }
    accuracyModifierText = `${modifierSign}${modifierValue}`;
  }

  // TODO: we'll need more processing on this.
  const effectWithoutStrike = effect.replace(/Make a (\\glossterm{strike}|strike)[^.]*\./g, '');

  ability.attack = {
    hit: `${calculateStrikeDamage(monster, ability)} damage.${effectWithoutStrike}`,
    targeting: `The $name makes a $accuracy${accuracyModifierText} melee strike vs. Armor with its ${ability.weapon}.`,
  };

  ability.tags = ability.tags || [];
  const weaponTag = getWeaponTag(ability.weapon);
  if (weaponTag) {
    ability.tags.push(weaponTag);
  }
  // TODO: if any monster weapons can sweep, we will need to sum together their sweeping
  // value.
  const sweepingTag = monster.getSizeBasedSweepingTag();
  if (sweepingTag) {
    ability.tags.push(sweepingTag);
  }
}

// TODO: calculate weapon damage differently from generic double damage
export function calculateStrikeDamage(monster: Creature, ability: ActiveAbility): string {
  const effect = ability.effect!;
  const weapon = ability.weapon!;
  let damageMultiplier = 1;
  let multiplierMatch = effect.match(
    /deals (double|triple|quadruple) (\\glossterm{weapon damage}|weapon damage|damage)/,
  );
  if (multiplierMatch) {
    damageMultiplier =
      {
        double: 2,
        triple: 3,
        quadruple: 4,
      }[multiplierMatch[1]] || 0;
    if (!damageMultiplier) {
      throw new Error(`Ability ${monster.name}.${ability.name}: Unable to parse damage multiplier`);
    }
  }

  const damageDice = getWeaponDamageDice(weapon);
  if (!damageDice) {
    throw new Error(`Ability ${monster.name}.${ability.name}: Invalid weapon '${weapon}'`);
  }
  const damageFromPower =
    Math.floor(monster.getRelevantPower(ability.isMagical) / 2) * damageMultiplier;
  let damageFromPowerText = '';
  if (damageFromPower > 0) {
    damageFromPowerText = `+${damageFromPower}`;
  } else if (damageFromPower < 0) {
    damageFromPowerText = `${damageFromPower}`;
  }

  return `${damageDice.count * damageMultiplier}d${damageDice.size}${damageFromPowerText}`;
}

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

// This modifies `ability` in place.
export function reformatAttackTargeting(monster: Creature, ability: ActiveAbility) {
  // For convenience
  const attack = ability.attack!;

  let scalingAccuracyModifier = 0;
  if (ability.scaling === 'accuracy') {
    scalingAccuracyModifier = Math.max(0, monster.calculateRank() - ability.rank);
    // This marks that we've dealt with the scaling
    ability.scaling = undefined;
  } else if (ability.scaling === 'double_accuracy') {
    scalingAccuracyModifier = Math.max(0, monster.calculateRank() - ability.rank) * 2;
    ability.scaling = undefined;
  }

  // Accuracy-modified attack
  attack.targeting = attack.targeting.replace(
    /\bMake an attack vs(.+) with a (\\plus|\\minus|-|\+)(\d+) (\\glossterm{)?accuracy}? (bonus|penalty)\b/g,
    (_, defense, modifierSign, modifierValue) => {
      modifierSign = standardizeModifierSign(modifierSign);
      const withSign = modifierSign === '+' ? Number(modifierValue) : Number(modifierValue) * -1;
      const withScaling = withSign + scalingAccuracyModifier;
      modifierSign = withScaling >= 0 ? '+' : '-';
      const withoutSign = Math.abs(withScaling);
      return `The $name makes a $accuracy${modifierSign}${withoutSign} attack vs${defense}`;
    },
  );

  const scalingAccuracyModifierText =
    scalingAccuracyModifier > 0 ? `+${scalingAccuracyModifier}` : '';
  // Baseline accuracy attack
  attack.targeting = attack.targeting.replace(
    'Make an attack',
    `The $name makes a $accuracy${scalingAccuracyModifierText} attack`,
  );

  // If we said $name already, replace 'from you' (usually in area descriptors) with
  // "itself" instead of using "$name" again to avoid repetition.
  attack.targeting = attack.targeting.replace(
    /(\$name.*)from you\b/gs,
    (_, preface) => `${preface}from itself`,
  );

  // If we said $name already, replace 'You gain' with 'It gains' to avoid repetition.
  attack.targeting = attack.targeting.replace(
    /(\$name.*)You gain\b/gs,
    (_, preface) => `${preface}It gains`,
  );
}

const damageRankPattern = /\\damagerank(\w+)(low)?/;

// This modifies `ability` in place
export function reformatAttackConsequences(monster: Creature, ability: ActiveAbility) {
  // For convenience
  const attack = ability.attack!;

  // This phrasing is typically seen with fear effects
  attack.hit = attack.hit.replace(/\bby you\b/, 'by the $name');

  attack.hit = replaceDamageText(monster, ability, attack.hit);
  if (attack.crit) {
    attack.crit = replaceDamageText(monster, ability, attack.crit);
  }
  if (attack.injury) {
    attack.injury = replaceDamageText(monster, ability, attack.injury);
  }

  // We should have applied all damage scaling values, so we can safely remove this to
  // mark our handling of the scaling complete.
  if (ability.scaling === 'damage') {
    ability.scaling = undefined;
  }
}

// This can be run for attack.hit, attack.crit, and attack.injury, since they all can have
// damage values listed. This doesn't modify in place. It also doesn't generally calculate
// strike-based damage, which is handled by `restructureStrikeAbility`.
function replaceDamageText(monster: Creature, ability: ActiveAbility, effectText: string): string {
  effectText = effectText.replace(damageRankPattern, (_, damageRank, lowPowerScaling) =>
    calculateDamage(monster, ability, parseDamageRank(damageRank), Boolean(lowPowerScaling)),
  );

  // For now, we just ignore this, since monsters never have extra damage.
  effectText = effectText.replace(/, and any (\\glossterm{)?extra damage}? is doubled/g, '');

  return effectText;
}

type DamageRank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

function parseDamageRank(rankText: string): DamageRank {
  // Don't laugh at me
  const rank = {
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
  }[rankText];
  if (!rank) {
    throw new Error(`Unable to parse rank '${rankText}'`);
  }

  return rank as DamageRank;
}

// This can be applied to attack.hit, attack.crit, or attack.injury, since all of those
// could have damage terms. We use the full `ability` to calculate damage scaling from
// rank.
export function calculateDamage(
  monster: Creature,
  ability: ActiveAbility,
  damageRank: DamageRank,
  lowPowerScaling: boolean,
): string {
  const excessRank = Math.max(0, monster.calculateRank() - ability.rank);

  if (lowPowerScaling) {
    console.warn('Damage calculation for low power scaling is not implemented yet.');
    // TODO
    return '';
  } else {
    // Normally, you'd calculate the "base" damage dice first, then add on the extra dice
    // from rank scaling. But we don't want to do dice pool math here. Instead, we can
    // calculate the effective power that each excess rank provides.
    const bonusPowerPerExcessRank = {
      0: 2,
      1: 2,
      2: 2,
      3: 3,
      4: 2,
      5: 2,
      6: 4,
      7: 4,
      8: 4,
      9: 4,
      10: 4,
    }[damageRank];
    const effectivePower =
      monster.getRelevantPower(ability.isMagical) + excessRank * bonusPowerPerExcessRank;

    const damageDice = {
      0: '1d4',
      1: '1d6',
      2: '1d4',
      3: '1d8',
      4: `${Math.floor(effectivePower / 2)}d6`,
      5: `${Math.floor(effectivePower / 2 + 1)}d6`,
      6: `${Math.floor(effectivePower / 2 + 1)}d8`,
      7: `${Math.floor(effectivePower / 2 + 1)}d10`,
      8: `${Math.floor(effectivePower + 1)}d6`,
      9: `${Math.floor(effectivePower + 2)}d8`,
      10: `${Math.floor(effectivePower + 2)}d10`,
    }[damageRank];

    const flatDamage =
      {
        0: Math.floor(effectivePower / 2),
        1: Math.floor(effectivePower / 2),
        2: effectivePower,
        3: effectivePower,
      }[damageRank as number] || 0;

    if (flatDamage) {
      return `${damageDice}\\plus${flatDamage} damage`;
    } else {
      return `${damageDice} damage`;
    }
  }
}
