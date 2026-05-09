import { Creature } from '@src/character_sheet/creature';
import {
  MonsterWeapon,
  getWeaponDamageDice,
  getWeaponPowerMultiplier,
  getWeaponAccuracy as getWeaponAccuracyFromWeapons,
} from '@src/monsters/weapons';
import { DamageScaling } from '@src/core_mechanics/damage_scaling';
import { DicePool } from '@src/core_mechanics/dice_pool';

export interface ReplacementContext {
  isMagical?: boolean;
  weapon?: MonsterWeapon;
}

export function replacePlaceholders(
  monster: Creature,
  latex: string,
  context: ReplacementContext = {},
) {
  // Use a specialized pass for ability-specific context, and a general pass for monster-wide terms.
  // We keep them separate so that individual ability conversion (used in tests) can choose
  // whether to resolve monster-wide terms like $name.
  latex = replaceAbilityPlaceholders(monster, latex, context);
  latex = replaceMonsterPlaceholders(monster, latex);

  if (latex.includes('$') && !latex.includes('\\$')) {
    const contextMatch = latex.match(/(.{0,10}\$.{0,10})/);
    const contextStr = contextMatch ? contextMatch[1] : 'Unclear context';
    console.warn(
      `replace_placeholders.ts: Unable to replace all placeholder text for ${monster.name}: '${contextStr}'`,
    );
  }

  return latex;
}

export function replaceAbilityPlaceholders(
  monster: Creature,
  latex: string,
  context: ReplacementContext,
) {
  const isMagical = context.isMagical ?? false;

  latex = replacePowerTerms(latex, monster, isMagical);
  latex = replaceDamageRankTerms(latex, monster, isMagical);
  latex = replaceScalingDamageTerms(latex, monster, isMagical);
  latex = replaceDamageTerms(latex, monster, isMagical, context.weapon);
  latex = replaceAccuracyTerms(latex, monster, getWeaponAccuracy(context.weapon));

  return latex;
}

export function replaceMonsterPlaceholders(monster: Creature, latex: string) {
  latex = replaceNames(latex, monster.name);
  latex = replaceFullWeaponDamageTerms(latex);
  latex = replaceAccuracyTerms(latex, monster);
  latex = replaceConsumableAccuracyTerms(latex, monster);
  latex = replacePowerTerms(latex, monster);
  return latex;
}

// Internal helper for replaceAccuracyTerms to handle weapon accuracy
function getWeaponAccuracy(weapon?: MonsterWeapon): number {
  if (!weapon) return 0;
  try {
    // We need to import this from weapons.ts
    return getWeaponAccuracyFromWeapons(weapon);
  } catch (_e) {
    return 0;
  }
}

function replaceFullWeaponDamageTerms(latex: string): string {
  return latex.replaceAll('$fullweapondamage', '$damage damage');
}

export function replaceDamageRankTerms(
  latex: string,
  creature: Creature,
  isMagical: boolean,
): string {
  const drPattern = /\$dr(\d+)(l)?\b/g;
  return latex.replaceAll(drPattern, (_, rank, low) => {
    try {
      const scaling = low ? DamageScaling.drl(Number(rank)) : DamageScaling.dr(Number(rank));
      return creature.calcDamageDice(scaling, isMagical, false).toString();
    } catch (_e) {
      return `$dr${rank}${low || ''}`;
    }
  });
}

export function replaceScalingDamageTerms(
  latex: string,
  creature: Creature,
  isMagical: boolean,
): string {
  const scalingPattern = /\$d(\d+)p(\d+)/g;
  return latex.replaceAll(scalingPattern, (_, dieSize, perPower) => {
    const scaling = new DamageScaling(DicePool.empty(), [
      {
        dice: DicePool.xdy(1, Number(dieSize)),
        powerPerDice: Number(perPower),
        powerPerPlus1Modifier: 0,
      },
    ]);
    return creature.calcDamageDice(scaling, isMagical, false).toString();
  });
}

export function replaceDamageTerms(
  latex: string,
  creature: Creature,
  isMagical: boolean,
  weapon?: MonsterWeapon,
): string {
  const damagePattern = /\$damage(\*\d+)?\b/g;
  return latex.replaceAll(damagePattern, (match, multiplierStr) => {
    if (!weapon) return match;
    const multiplier = multiplierStr ? Number(multiplierStr.substring(1)) : 1;

    const baseDice = getWeaponDamageDice(weapon);
    const powerMultiplier = getWeaponPowerMultiplier(weapon);
    const relevantPower = creature.getRelevantPower(isMagical);

    // Create a DicePool from the weapon's base stats
    const dice = [];
    for (let i = 0; i < baseDice.count; i++) {
      dice.push({ size: baseDice.size });
    }
    const pool = new DicePool(dice)
      .addModifier(Math.floor(relevantPower * powerMultiplier))
      .multiply(multiplier);

    return pool.toString();
  });
}

function replaceNames(monsterLatex: string, monsterName: string): string {
  if (monsterName === monsterName.toLowerCase()) {
    throw new Error(`Monster ${monsterName} has lowercase name, but should be title case`);
  }

  // Some monsters have a comma that indicates a title (e.g., "Seraph, Ophan").
  // In that case, we use the base name (everything before the comma).
  const isTitle = monsterName.includes(',');
  const displayName = monsterName.split(',')[0];
  const lowercaseDisplayName = displayName.toLowerCase();

  let result = monsterLatex.replaceAll('$Name', displayName);

  if (isTitle) {
    // For titled monsters, we remove the article: "The $name" -> "DisplayName"
    result = result.replaceAll(/the \$name/gi, (match) => {
      return match.startsWith('T') ? displayName : lowercaseDisplayName;
    });
  }

  return result.replaceAll('$name', lowercaseDisplayName);
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
  creature: Creature,
  weaponAccuracy?: number,
): string {
  // Find each block of "$accuracy", including any local accuracy modifiers.
  // The regex captures:
  //   Group 1: "$accuracy" (the base term)
  //   Group 2: "+" or "-" (the sign of the local modifier)
  //   Group 3: "2" (the value of the local modifier, if present)
  const accuracyPattern = /\$(brawling)?accuracy([+-]?)(\d*)\b/g;

  return latex.replaceAll(accuracyPattern, (_, maybeBrawling, modifierSign, modifierValueStr) => {
    const modifierValue = modifierValueStr ? Number(modifierValueStr) : 0;
    // p1 is "$accuracy", p2 is the sign, p3 is the modifier value string
    return parseAccuracyMatch({
      creatureAccuracy: maybeBrawling ? creature.brawling_accuracy : creature.accuracy,
      modifierSign,
      modifierValue,
      weaponAccuracy,
    });
  });
}

// For a given accuracy block, such as "$accuracy" or "$accuracy+2", return the specific text that
// should replace it, such as "+5".
function parseAccuracyMatch({
  creatureAccuracy,
  modifierSign,
  modifierValue,
  weaponAccuracy,
}: {
  creatureAccuracy: number;
  modifierSign: string; // e.g., "+" or "-"
  modifierValue: number; // e.g., "2" or ""
  weaponAccuracy?: number;
}): string {
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

export function replaceConsumableAccuracyTerms(latex: string, creature: Creature): string {
  const consumableAccuracyPattern = /\$consumableaccuracy([+-]?)(\d*)\b/g;

  return latex.replaceAll(consumableAccuracyPattern, (_, modifierSign, modifierValueStr) => {
    const modifierValue = modifierValueStr ? Number(modifierValueStr) : 0;
    // Consumables always get a +3 accuracy bonus in addition to creature's base accuracy
    return parseAccuracyMatch({
      creatureAccuracy: creature.accuracy + 3,
      modifierSign,
      modifierValue,
    });
  });
}

export function replacePowerTerms(latex: string, creature: Creature, isMagical?: boolean): string {
  if (isMagical === undefined) {
    if (latex.includes('$power')) {
      console.warn(`Unable to parse ambiguous $power term for ${creature.name}`);
    }
  } else {
    const power = isMagical ? creature.magical_power : creature.mundane_power;
    latex = latex.replaceAll('$power', power.toString());
  }
  return latex
    .replaceAll('$mundanepower', creature.mundane_power.toString())
    .replaceAll('$magicalpower', creature.magical_power.toString());
}
