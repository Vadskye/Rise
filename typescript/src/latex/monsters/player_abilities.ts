import { Creature, ActiveAbility } from '@src/character_sheet/creature';
import { Maneuver } from '@src/combat_styles';
import { convertManeuverToLatex } from '@src/latex/combat_styles';
import { convertSpellToLatex } from '@src/latex/mystic_spheres';
import { Spell } from '@src/mystic_spheres';

export function convertManeuverToMonsterAbility(monster: Creature, maneuver: Maneuver): string {
  const ability: ActiveAbility = {
    ...maneuver,
    isMagical: false,
  };
  const latex = convertManeuverToLatex(reformatAsMonsterAbility(monster, ability), true);
  checkSuccessfullyConverted(latex, monster.name, maneuver.name);
  return latex;
}

export function convertSpellToMonsterAbility(monster: Creature, spell: Spell): string {
  const ability: ActiveAbility = {
    ...spell,
    isMagical: true,
  };
  const latex = convertSpellToLatex(reformatAsMonsterAbility(monster, ability), true);
  checkSuccessfullyConverted(latex, monster.name, spell.name);
  return latex;
}

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
  if (ability.attack) {
    reformatAttackTargeting(monster, ability);
    reformatAttackConsequences(monster, ability);
  }

  return ability;
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
      if (modifierSign === '\\minus') {
        modifierSign = '-';
      } else if (modifierSign === '\\plus') {
        modifierSign = '+';
      }
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
// damage values listed. This doesn't modify in place.
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
  const relevantMonsterPower = ability.isMagical ? monster.magical_power : monster.mundane_power;

  if (lowPowerScaling) {
    console.warn("Damage calculation for low power scaling is not implemented yet.");
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
    const effectivePower = relevantMonsterPower + excessRank * bonusPowerPerExcessRank;

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
