import { Creature } from '@src/character_sheet/creature';
import { Maneuver } from '@src/combat_styles';
import { convertManeuverToLatex } from '@src/latex/combat_styles';
import { convertSpellToLatex } from '@src/latex/mystic_spheres';
import { Spell, StandardAttack, AbilityScaling } from '@src/mystic_spheres';

export function convertManeuverToMonsterAbility(monster: Creature, maneuver: Maneuver): string {
  const latex = convertManeuverToLatex(reformatAsMonsterAbility(monster, maneuver), true);
  checkSuccessfullyConverted(latex, monster.name, maneuver.name);
  return latex;
}

export function convertSpellToMonsterAbility(monster: Creature, spell: Spell): string {
  const latex = convertSpellToLatex(reformatAsMonsterAbility(monster, spell), true);
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
    warn("Ability still has listed scaling");
  }
}

// TODO: Fix type nonsense that makes this necessary
interface PlayerAbility extends Omit<Spell, 'rank'> {
  rank: number;
}

// Convert a standard spell or maneuver that appears in the player-facing section of the
// book so it is written as a monster ability. It requires a monster with all of its
// statistics correctly calculated so we can correctly determine the accuracy and damage
// of abilities. Note that we still use placeholders that will be handled separately in
// `replacePlaceholders`. This avoids needing to duplicate some of the formatting logic
// that placeholders can handle, and it allows us to make simplifying assumptions with our
// regex patterns (like checking for "$name" to check if we're repeating the monsters's
// name).
export function reformatAsMonsterAbility<T extends PlayerAbility>(
  monster: Creature,
  ability: T,
): T {
  if (ability.attack) {
    reformatAttack(monster, ability);
  }

  return ability;
}

// This modifies `attack` in place.
export function reformatAttack(monster: Creature, ability: PlayerAbility) {
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

  // This phrasing is typically seen with fear effects
  attack.hit = attack.hit.replace(/\bby you\b/, 'by the $name');
}
