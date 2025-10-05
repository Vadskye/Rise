import { Creature } from '@src/character_sheet/creature';

export function replacePlaceholders(monster: Creature, latex: string) {
  latex = replaceNames(latex, monster.name);
  latex = replaceAccuracyTerms(latex, monster.accuracy);

  if (latex.includes('$')) {
    const contextMatch = latex.match(/(.{10}\$.{10})/);
    const context = contextMatch ? contextMatch[1] : 'Unclear context';
    console.warn(`Unable to replace all placeholder text for ${monster.name}: '${context}'`);
  }

  return latex;
}

function replaceNames(monsterLatex: string, monsterName: string): string {
  const lowercaseName = monsterName.toLowerCase();
  if (monsterName === lowercaseName) {
    throw new Error(`Monster ${monsterName} has lowercase name, but should be title case`);
  }
  return monsterLatex.replaceAll('$Name', monsterName).replaceAll('$name', lowercaseName);
}

export function addAccuracyToEffect(modifier: number, effect: string, name: string): string {
  let replacedEffect = effect.toString();
  let replacedAccuracy = false;

  const accuracyPattern = /\$(brawlingaccuracy|accuracy)([+-]?)(\d*)\b/g;
  for (const match of replacedEffect.matchAll(accuracyPattern)) {
    const accuracyType = match[1];
    const modifierSign = match[2];
    const existingModifier = match[3];

    const existingModifierAbs = parseInt(existingModifier) || 0;
    const existingModifierValue = modifierSign === '-' ? -existingModifierAbs : existingModifierAbs;

    const newModifierValue = existingModifierValue + modifier;
    const newModifierSign = newModifierValue > 0 ? '+' : '';
    const newModifierText = newModifierValue === 0 ? '' : newModifierValue.toString();

    replacedEffect = replacedEffect.replace(
      match[0],
      `$${accuracyType}${newModifierSign}${newModifierText}`,
    );

    if (replacedAccuracy) {
      throw new Error(`Cannot add accuracy to ability ${name}: more than one $accuracy present`);
    } else {
      replacedAccuracy = true;
    }
  }
  // If there was no accuracy to replace, something has gone wrong.
  if (!replacedAccuracy) {
    throw new Error(`Cannot add accuracy to ability ${name}: no $accuracy to replace`);
  }
  return replacedEffect;
}

export function replaceAccuracyTerms(
  latex: string,
  creatureAccuracy: number,
  weaponAccuracy?: number,
): string {
  // Find each block of "$accuracy", including any local accuracy modifiers.
  // The regex captures:
  //   Group 1: "$accuracy" (the base term)
  //   Group 2: "+" or "-" (the sign of the local modifier)
  //   Group 3: "2" (the value of the local modifier, if present)
  const accuracyPattern = /\$accuracy([+-]?)(\d*)\b/g;

  return latex.replaceAll(accuracyPattern, (_, modifierSign, modifierValueStr) => {
    const modifierValue = modifierValueStr ? Number(modifierValueStr) : 0;
    // p1 is "$accuracy", p2 is the sign, p3 is the modifier value string
    return parseAccuracyMatch(creatureAccuracy, modifierSign, modifierValue, weaponAccuracy);
  });
}

// For a given accuracy block, such as "$accuracy" or "$accuracy+2", return the specific text that
// should replace it, such as "+5".
function parseAccuracyMatch(
  creatureAccuracy: number,
  modifierSign: string, // e.g., "+" or "-"
  modifierValue: number, // e.g., "2" or ""
  weaponAccuracy?: number,
): string {
  let currentAccuracy = creatureAccuracy;

  // Handle local accuracy modifiers
  if (modifierValue) {
    if (modifierSign === '+') {
      currentAccuracy += modifierValue;
    } else {
      currentAccuracy -= modifierValue;
    }
  }

  // Handle weapon modifiers
  if (weaponAccuracy) {
    currentAccuracy += weaponAccuracy;
  }

  // Format the output: "+5" for positive, "-5" for negative.
  const accuracySign = currentAccuracy >= 0 ? '+' : '';
  return `${accuracySign}${currentAccuracy}`;
}
