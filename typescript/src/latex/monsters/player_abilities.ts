import { Creature } from '@src/character_sheet/creature';
import { convertAbilityToLatex } from '@src/latex/convert_ability_to_latex';
import {
  ActiveAbility,
  ManeuverDefinition,
  PassiveAbility,
  SpellDefinition,
  standardizeManeuver,
  standardizeSpell,
} from '@src/abilities';
import {
  getWeaponDamageDice,
  getWeaponTag,
  getWeaponAccuracy,
  getWeaponPowerMultiplier,
  MonsterWeapon,
} from '@src/monsters/weapons';

// It's the same except that `effect` and `weapon` are mandatory.
export interface StrikeActiveAbility extends Omit<ActiveAbility, 'effect' | 'weapon'> {
  effect: string;
  weapon: MonsterWeapon;
}

export function convertManeuverToMonsterLatex(
  monster: Creature,
  maneuver: ManeuverDefinition,
): string {
  return convertAbilityToMonsterLatex(monster, standardizeManeuver(maneuver));
}

export function convertSpellToMonsterLatex(monster: Creature, spell: SpellDefinition): string {
  return convertAbilityToMonsterLatex(monster, standardizeSpell(spell));
}

export function convertAbilityToMonsterLatex(monster: Creature, ability: ActiveAbility): string {
  let latex = convertAbilityToLatex(
    reformatAsMonsterAbility(monster, ability),
    true,
  );
  latex = replaceGenericTerms(monster, ability, latex);
  checkSuccessfullyConverted(latex, monster.name, ability.name);
  return latex;
}

function replaceGenericTerms(monster: Creature, ability: ActiveAbility, abilityPart: string): string {

  function replace(pattern: RegExp, replacement: string | ((substring: string, ...args: any[]) => string)) {
    abilityPart = abilityPart.replace(pattern, replacement as any);
  }

  // Assume monsters always pay the fatigue and don't track it. Cheating!
  // This is made a bit more complicated because the original latex could have line
  // breaks, since we're joining multiple sentences together.
  replace(/\bYou can increase your (fatigue level|\\glossterm{fatigue level}) by one\.\n? +If you do, you/g, "You");

  replace(/\byour next action\b/g, "its next action");
  replace(/\byour attack result\b/g, "the attack result");
  replace(/\byou (touch\b|\\glossterm{touch})/g, "it \\glossterm{touches}");
  replace(/\byou are\b/g, "it is");
  replace(/\bYou are\b/g, "The $name is");
  replace(/\bYou and the\b/g, "The $name and the");
  replace(/\bYou also control\b/g, "The $name also controls");
  replace(/\bYou become\b/g, "The $name becomes");
  replace(/\b, you become\b/g, ", it becomes");
  replace(/\bYou must have\b/g, "The $name must have");
  replace(/\byour speed\b/g, "its speed");
  replace(/\byour attack\b/g, "its attack");
  replace(/\bwhether you get\b/g, "whether it gets");
  replace(/\byou cannot get\b/g, "it cannot get");
  replace(/\bthat you missed\b/g, "that it missed");
  // TODO: standardize on "protects you" vs "affects attacks against you"
  replace(/\bprotects you\b\b/g, "protects the $name");
  replace(/\battacks against you\b\b/g, "attacks against the $name");
  replace(/\byour subsequent\b/g, "the $name's subsequent");
  replace(/\bYou can\b/g, "The $name can");
  replace(/\\empowered\b/g, `\\buff{empowered} \\reminder{\\plus${monster.calculateRank()} damage}`);
  replace(/\bWhen you cast this spell, you create\b/g, "When the $name casts this spell, it creates");
  replace(/\bYou create\b/g, "The $name creates");
  replace(/\bYou regain\b/g, "The $name regains");
  replace(/\bYou gain\b/g, "The $name gains");
  // This is overly specific since we might want to use "it" for some uses of "you
  // regain".
  replace(/\bIn addition, you regain\b/g, "In addition, the $name regains");
  replace(/\bYou take\b/g, "The $name takes");
  replace(/\bYou inscribe\b/g, "The $name inscribes");
  replace(/\bYou (\\glossterm{briefly}|briefly) cannot use\b/g, "The $name \\glossterm{briefly} cannot use");
  replace(/\bif you take\b/g, "if the $name takes");
  replace(/\bact by you\b/g, "act by the $name");
  replace(/goaded by you\b/g, "goaded by the $name");
  replace(/\bto you\b/g, "to it");
  replace(/\byour space\b/g, "its space");
  replace(/\bYou (fling\b|\\glossterm{fling})/g, "The $name \\glossterm{flings}");
  replace(/\baway from you\b/g, "away from it");
  replace(/(\bemanation|\\glossterm{emanation}) from you\b/g, "\\glossterm{emanation} from the $name");
  replace(/\bfrom your location\b/g, "from its location");
  replace(/\bChoose yourself or\b/g, "The $name chooses itself or");
  replace(/\byour (allies\b|\\glossterm{allies})/g, "its allies");
  replace(/\$name(.*?)the \$name\b/g, (_, mid) => `$name${mid}it`);
  replace(/\bYou must be (alive|\\glossterm{alive}) to (cast this spell|use this ability)\./g, "");
  replace(/\bthe \$name, the \$name\b/g, 'the $name, it');
  replace(/\bAfter you attack\b/g, 'After the $name attacks');
  replace(/\byou lose\b/g, 'it loses');
  replace(/, if you lost\b/g, ', if the $name lost');
  // Elite monsters cheat this kind of cost.
  const halfHpCost = monster.elite ? Math.floor(monster.hit_points / 4) : Math.floor(monster.hit_points / 2);
  replace(/\bto be equal to half your maximum (hit points|\\glossterm{hit points})\b/g, `to ${halfHpCost} \\glossterm{hit points}`);
  replace(/\bIf you do\b/g, "If it does");
  replace(/, you gain/g, ", it gains");
  replace(/\blife becomes linked to yours\b/g, "life becomes linked to the $name's life");

  // "from you" is tricky. We want to replace "attack from you" with "attack from the
  // $name", but every variant of "area from you" with "area from itself".
  replace(/\battack from you\b/g, 'attack from the $name');
  replace(/(\bradius|\bcone|\\glossterm{cone}|\bline|\\glossterm{line}|\bzone|\\glossterm{zone}|\bemanation|\\glossterm{emanation}) from you\b/g, (_, area) => `${area} from itself`);

  // This is lazy; we should support other extra damage variants, like 2x power or damage
  // dice.
  const fullPower = monster.getRelevantPower(ability.isMagical);
  const halfPower = Math.floor(fullPower / 2);
  replace(/(extra damage|\\glossterm{extra damage}) equal to half your (\\glossterm{power}|power)/g, `${halfPower} \\glossterm{extra damage}`);
  replace(/\bdamage equal to half your (\\glossterm{power}|power)/g, `${halfPower} damage`);
  replace(/(extra damage|\\glossterm{extra damage}) equal to your (\\glossterm{power}|power)/g, `${fullPower} \\glossterm{extra damage}`);
  replace(/\bdamage equal to your (\\glossterm{power}|power)/g, `${fullPower} damage`);

  replace(
    /(hit points|\\glossterm{hit points}) equal to (\w+)?( times)? your (power|\\glossterm{power})/,
    (_, __, multiplier) => {
      const numericMultiplier = {
        half: 0.5,
        twice: 2,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
      }[multiplier as string] || 1;

      const hitPoints = Math.floor(monster.getRelevantPower(ability.isMagical) * numericMultiplier);

      return `${hitPoints} \\glossterm{hit points}`;
    }
  );

  return abilityPart;
}

const makeStrikePattern = /\b[mM]ake a.*(strike\b|\\glossterm{strike})/;
const brawlingAttackPattern = /\b[mM]ake a (brawling attack\b|\\glossterm{brawling attack})/;

// monsterName and abilityName are only provided to improve the clarity of warnings and
// errors.
function checkSuccessfullyConverted(abilityText: string, monsterName: string, abilityName: string) {
  const warn = (message: string) => {
    console.warn(`Problem reformatting ${monsterName}.${abilityName}: ${message}`);
  };

  // Ignore the name of the ability when testing; it's fine if an ability's name includes
  // "you", for example.
  abilityText = abilityText.replace(/ability}{[^}]+}/g, '').replace(/hypertargetraised{[^}]+}/g, '')

  if (/\$[nN]ame.*\$[nN]ame/.test(abilityText)) {
    warn("Ability repeats '$name' in the same line");
  }

  if (/\\hit.*\\hit/s.test(abilityText)) {
    warn("Ability has two '\\hit' sections");
  }

  if (/\b[yY]our?/.test(abilityText)) {
    warn("Ability still says 'you'");
  }

  // Whenever we deal with an ability's scaling automatically, we clear it so it doesn't
  // show up in the final ability. This means that we didn't handle some scaling value
  // correctly.
  if (/\b[fF]or each rank beyond\b/.test(abilityText)) {
    warn('Ability still has listed scaling');
  }

  if (/\\damagerank/.test(abilityText)) {
    warn('Ability still has listed \\damagerank');
  }

  if (/\\hprank/.test(abilityText)) {
    warn('Ability still has listed \\hprank');
  }

  if (/\\hprank/.test(abilityText)) {
    warn('Ability still has listed \\hprank');
  }

  if (makeStrikePattern.test(abilityText)) {
    warn('Ability still says it makes a strike');
  }

  if (/defense[^.]+instead of[^.]+defense/.test(abilityText)) {
    warn('Ability still says it uses one defense instead of another');
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
  // Monster abilities shouldn't show the normal player-facing narrative text
  delete ability.narrative;

  reformatAbilityScaling(ability);

  // Ignore attunement tags, since monsters don't attune.
  if (ability.type && /Attune/.test(ability.type)) {
    delete ability.type;
  }

  if (ability.effect && makeStrikePattern.test(ability.effect)) {
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
    // It's weird we have to cast here, because we have `if` statements that check both
    // parts of the changes individually. Seems like Typescript doesn't maintain that
    // context long enough, though.
    restructureStrikeAbility(monster, ability as StrikeActiveAbility);
  }

  if (ability.effect && brawlingAttackPattern.test(ability.effect)) {
    restructureBrawlingAbility(monster, ability);
  }

  if (ability.attack) {
    for (const key of ['crit', 'hit', 'injury', 'miss', 'targeting'] as const) {
      if (ability.attack[key]) {
        ability.attack[key] = replaceGenericTerms(monster, ability, ability.attack[key]);
      }
    }

    reformatAttackTargeting(monster, ability);
    reformatAttackConsequences(monster, ability);
  }

  if (ability.effect) {
    ability.effect = replaceDamageText(monster, ability, ability.effect);
    if (ability.scaling === 'healing') {
      // This should have been handled by `replaceDamageText`.
      delete ability.scaling;
    }
  }

  reformatAbilityCost(ability);

  return ability;
}

function reformatAbilityScaling(ability: ActiveAbility) {
  const specialScaling: string = ability.scaling && (ability.scaling as any).special;
  // We can automatically handle this kind of simple scaling
  if (specialScaling && /\bBoth instances of damage\b/.test(specialScaling)) {
    ability.scaling = 'damage';
  }
  if (specialScaling && /\bdamage increases.*healing increases\b/.test(specialScaling)) {
    ability.scaling = 'damage';
  }
}

// Normally, abilities that make strikes say "make a strike" in the text of
// `ability.effect`. If we rewrite that to use `ability.attack`, we can use the standard
// attack-parsing logic to format it without duplicating logic between strike-based
// abilities and non-strike abilities. Since strikes don't use standard damage rank
// values, we also have to calculate the exact damage dealt by the strike here.
export function restructureStrikeAbility(monster: Creature, ability: StrikeActiveAbility) {
  // Although we do call `replaceGenericTerms` at the end, calling it on `effect`
  // *before* processing it makes some of our processing easier. For example, we can
  // reliably use `$name` in regex rather than something like `(you|$name)`.
  ability.effect = replaceGenericTerms(monster, ability, ability.effect);

  // Perform generic replacements that matter regardless of which hit/injury/targeting
  // segment they correspond to.
  // We don't care if the strike was originally restricted to melee-only.
  ability.effect = ability.effect.replace(/(\\glossterm{melee}|melee) (\\glossterm{strike}|strike)/g, (...match) => match[2]);

  let defense = 'Armor';
  // Use the correct alternate defense and strip the whole sentence, since we've
  // incorporated it into the effect.
  ability.effect = ability.effect.replace(/The attack is made against the target's (.*?) defense instead of its Armor defense./, (_, altDefense) => {
    defense = altDefense;
    return '';
  });

  // TODO: we currently don't handle the case where a maneuver leads into "make a strike"
  // in a continuous sentence, like "move up to your speed, then make a strike".
  const preStrikeSentenceMatch = ability.effect.match(/(.*)\. Make a (\\glossterm{strike}|strike)/s);
  const preStrikeContinuousMatch = ability.effect.match(/(.*) make a (\\glossterm{strike}|strike)/s);
  let preStrikeText = 'The $name makes a ';
  if (preStrikeSentenceMatch) {
    preStrikeText = `${preStrikeSentenceMatch[1]}. The $name makes a `;
  } else if (preStrikeContinuousMatch) {
    if (/\$[nN]ame/.test(preStrikeContinuousMatch[1])) {
      preStrikeText = `${preStrikeContinuousMatch[1]} it makes a `;
    } else {
      preStrikeText = `${preStrikeContinuousMatch[1]} the $name makes a `;
    }
  }
  const postStrikeMatch = ability.effect.match(/[mM]ake a (\\glossterm{strike}|strike)[^.]*\.(.*?)(\\hit|\\injury|\\miss|$)/s)
  const postStrikeText = postStrikeMatch ? postStrikeMatch[2] : '';
  const hitMatch = ability.effect.match(/\\hit(.*?)(\\crit|\\injury|\\miss|$)/s);
  const hitText = hitMatch ? hitMatch[1] : '';
  const injuryMatch = ability.effect.match(/\\injury(.*?)(\\crit|\\miss|$)/s);
  const injuryText = injuryMatch ? injuryMatch[1] : undefined;
  const critMatch = ability.effect.match(/\\crit(.*?)(\\injury|\\miss|$)/s);
  const critText = critMatch ? critMatch[1] : undefined;
  const missMatch = ability.effect.match(/\\miss(.*)/s);
  const missText = missMatch ? missMatch[1] : undefined;

  const accuracyModifierText = calculateStrikeAccuracyText(monster, ability);
  let strikeRange = ' melee';
  const tag = getWeaponTag(ability.weapon) || '';
  if (/Projectile/.test(tag)) {
    strikeRange = ' ranged';
  } else if (/Thrown/.test(tag)) {
    // Assume thrown weapons can be used at any range.
    strikeRange = '';
  }

  ability.attack = {
    crit: critText,
    hit: `${calculateStrikeDamage(monster, ability)} damage.${hitText}`,
    miss: missText,
    injury: injuryText,
    // TODO: if we support non-melee monster weapons, this would have to check the weapon
    // to determine melee vs ranged.
    targeting: `${preStrikeText}$accuracy${accuracyModifierText}${strikeRange} strike vs. ${defense} with its ${ability.weapon}.${postStrikeText}`.trim(),
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

  // All of the information from the effect should be contained in `ability.attack`, and
  // it's not well defined how to display an ability with both an `effect` and `attack`.
  // We technically shouldn't have access to the 'effect' key here so we have to cheat the
  // types a bit.
  delete (ability as ActiveAbility).effect;
}

export function restructureBrawlingAbility(monster: Creature, ability: ActiveAbility) {
  ability.effect = replaceGenericTerms(monster, ability, ability.effect!);

  // TODO: handle brawling attacks with local accuracy modifiers
  ability.effect = ability.effect.replace(/([mM])ake a (brawling attack|\\glossterm{brawling attack})/, (_, maybeCapital) => {
    const theText = maybeCapital === 'M' ? 'The' : 'the';
    return `${theText} $name makes a $brawlingaccuracy attack`;
  });
}

function calculateStrikeAccuracyText(monster: Creature, ability: StrikeActiveAbility): string {
  let accuracyModifierText = '';
  const accuracyMatch = ability.effect.match(
    /Make a (\\glossterm{strike}|strike).* with a (\\minus|-|\\plus|\+)(\d+) (\\glossterm{accuracy}|accuracy) (bonus|penalty)/,
  );

  let accuracyModifier = getWeaponAccuracy(ability.weapon);
  if (accuracyMatch) {
    const modifierSign = standardizeModifierSign(accuracyMatch[2]);
    if (!accuracyMatch[3]) {
      throw new Error(
        `Monster ability ${monster.name}.${ability.name}: Failed to parse strike accuracy modifier '${accuracyMatch[3]}'`,
      );
    }
    if (modifierSign === '-') {
      accuracyModifier -= Number(accuracyMatch[3]);
    } else {
      accuracyModifier += Number(accuracyMatch[3]);
    }
  }

  if (accuracyModifier > 0) {
    accuracyModifierText = `+${accuracyModifier}`;
  } else if (accuracyModifier < 0) {
    accuracyModifierText = `${accuracyModifier}`;
  }

  return accuracyModifierText;
}

export function calculateStrikeDamage(monster: Creature, ability: ActiveAbility): string {
  const effect = ability.effect!;
  const weapon = ability.weapon!;

  let globalDamageMultiplier = 1;
  let globalMultiplierMatch = effect.match(/deals (double|triple|quadruple) damage/);
  if (globalMultiplierMatch) {
    globalDamageMultiplier =
      {
        double: 2,
        triple: 3,
        quadruple: 4,
      }[globalMultiplierMatch[1]] || 0;
    if (!globalDamageMultiplier) {
      throw new Error(
        `Ability ${monster.name}.${ability.name}: Unable to parse global damage multiplier`,
      );
    }
  }

  let weaponDamageMultiplier = 1;
  let weaponMultiplierMatch = effect.match(
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
        `Ability ${monster.name}.${ability.name}: Unable to parse weapon damage multiplier`,
      );
    }
  }

  const damageDice = getWeaponDamageDice(weapon);
  if (!damageDice) {
    throw new Error(`Ability ${monster.name}.${ability.name}: Invalid weapon '${weapon}'`);
  }
  damageDice.count = damageDice.count * weaponDamageMultiplier;

  const powerMultiplier = getWeaponPowerMultiplier(weapon);
  let extraFlatDamage = 0;
  // TODO: handle extra damage dice.
  // We rely on `replaceGenericTerms` to make sure that flat damage is pre-converted into
  // numbers instead of a scaling expression.
  const extraDamageDiceMatch = effect.match(/\b(\d+)d(\d+) (extra damage|\\glossterm{extra damage})/);
  if (extraDamageDiceMatch) {
    // Conditional extra damage is fine, and we don't need to warn about it; we can't
    // incorporate it into the main effect anyway.
    const conditionalExtraDamage = /extra damage}? if/
    if (!conditionalExtraDamage) {
      console.warn("TODO: Unable to parse extra damage dice");
    }
  }

  const extraFlatDamageMatch = effect.match(/ (\d+) (extra damage|\\glossterm{extra damage})/);
  if (extraFlatDamageMatch) {
    extraFlatDamage = Number(extraFlatDamageMatch[1]);
  }

  const damageFromPower =
    globalDamageMultiplier *
    (Math.floor(monster.getRelevantPower(ability.isMagical) * powerMultiplier) + extraFlatDamage);
  let damageFromPowerText = '';
  if (damageFromPower > 0) {
    damageFromPowerText = `+${damageFromPower}`;
  } else if (damageFromPower < 0) {
    damageFromPowerText = `${damageFromPower}`;
  }

  return `${damageDice.count * globalDamageMultiplier}d${damageDice.size}${damageFromPowerText}`;
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

  // Accuracy-modified attack.
  // Note that we technically handle brawling accuracy here, but it should be extremely
  // rare for a *strike* to use brawling accuracy, and maybe impossible. Normal brawling
  // attacks are handled with `restructureBrawlingAbility`.
  attack.targeting = attack.targeting.replace(
    /\b([mM])ake (an attack|a reactive attack|a \\glossterm{reactive attack}|a brawling attack|a \\glossterm{brawling attack}) vs(.+) with a (\\plus|\\minus|-|\+)(\d+) (\\glossterm{)?accuracy}? (bonus|penalty)\b/g,
    (_, maybeCapital, attackType, defense, modifierSign, modifierValue) => {
      modifierSign = standardizeModifierSign(modifierSign);
      const withSign = modifierSign === '+' ? Number(modifierValue) : Number(modifierValue) * -1;
      const withScaling = withSign + scalingAccuracyModifier;
      modifierSign = withScaling >= 0 ? '+' : '-';
      const withoutSign = Math.abs(withScaling);

      const accuracyText = /brawling/.test(attackType) ? '$brawlingaccuracy' : '$accuracy';
      const attackText = /reactive/.test(attackType) ? '\\glossterm{reactive attack}' : 'attack';
      const theText = maybeCapital === 'M' ? 'The' : 'the';
      return `${theText} $name makes a ${accuracyText}${modifierSign}${withoutSign} ${attackText} vs${defense}`;
    },
  );

  const scalingAccuracyModifierText =
    scalingAccuracyModifier > 0 ? `+${scalingAccuracyModifier}` : '';
  // Baseline accuracy attack
  attack.targeting = attack.targeting.replace(
    /\b([mM])ake (an attack|a reactive attack|a \\glossterm{reactive attack}|a brawling attack|a \\glossterm{brawling attack})/g,
    (_, maybeCapital, attackType) => {
      const accuracyText = /brawling/.test(attackType) ? '$brawlingaccuracy' : '$accuracy';
      const attackText = /reactive/.test(attackType) ? '\\glossterm{reactive attack}' : 'attack';
      const theText = maybeCapital === 'M' ? 'The' : 'the';
      return `${theText} $name makes a ${accuracyText}${scalingAccuracyModifierText} ${attackText}`
    },
  );
}

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
    delete ability.scaling;
  }
}

// This can be run for attack.hit, attack.crit, and attack.injury, since they all can have
// damage values listed. This doesn't modify in place. It also doesn't generally calculate
// strike-based damage, which is handled by `restructureStrikeAbility`.
function replaceDamageText(monster: Creature, ability: ActiveAbility, effectText: string): string {
  effectText = effectText.replace(/\\(damage|hp)rank(\w+)/g, (_, hpOrDamage, rankAndMaybeLow) => {
    const damageRank = rankAndMaybeLow.replace('low', '');
    const lowPowerScaling = /low/.test(rankAndMaybeLow);
    const calculatedDamage = calculateDamage(monster, ability, parseDamageRank(damageRank), lowPowerScaling);
    const hpOrDamageText = hpOrDamage === 'hp' ? '\\glossterm{hit points}' : 'damage';
    return `${calculatedDamage} ${hpOrDamageText}`;
  });

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
// Despite the name, the exact same calculations are used for both HP and damage, so this
// handles both.
export function calculateDamage(
  monster: Creature,
  ability: ActiveAbility,
  damageRank: DamageRank,
  lowPowerScaling: boolean,
): string {
  const excessRank = Math.max(0, monster.calculateRank() - ability.rank);

  if (lowPowerScaling) {
    const damageDice = {
      0: '1d6',
      1: '1d10',
      2: `1d8+${1 + excessRank}d6`,
      3: `${2 + excessRank}d10`,
      4: `${3 + excessRank}d10`,
      5: `${5 + 2 * excessRank}d8`,
      6: `${7 + 3 * excessRank}d8`,
      7: `${8 + 3 * excessRank}d10`,
      8: `${11 + 5 * excessRank}d10`,
      9: `${16 + 6 * excessRank}d10`,
      10: `${22 + 8 * excessRank}d10`,
    }[damageRank];

    const flatDamage = {
      0: excessRank,
      1: 2 * excessRank,
    }[damageRank as number] || 0;

    if (flatDamage) {
      return `${damageDice}\\plus${flatDamage}`;
    } else {
      return `${damageDice}`;
    }
  } else {
    // Normally, you'd calculate the "base" damage dice first, then add on the extra dice
    // from rank scaling. But we don't want to do dice pool math here. Instead, we can
    // calculate the effective power that each excess rank provides.
    //
    // In the special case of ranks 2 and 3, this doesn't work, since those add dice that
    // aren't normally part of the power scaling.
    const bonusPowerPerExcessRank = {
      0: 2,
      1: 4,
      2: 0,
      3: 0,
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
      2: excessRank ? `1d10\\plus${excessRank}d6` : '1d10',
      3: excessRank ? `1d8\\plus${excessRank}d6` : '1d8',
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
        2: Math.floor(effectivePower / 2),
        3: effectivePower,
      }[damageRank as number] || 0;

    if (flatDamage) {
      return `${damageDice}\\plus${flatDamage}`;
    } else {
      return `${damageDice}`;
    }
  }
}

function reformatAbilityCost(ability: Pick<ActiveAbility, 'cost'>) {
  if (!ability.cost) {
    return;
  }

  ability.cost = ability.cost.replace(/You (\\glossterm{briefly}|briefly)/, (...match) => `The $name ${match[1]}`);

  if (ability.cost === 'One optional \\glossterm{fatigue level} (see text).') {
    delete ability.cost;
  }
}

export function convertPassiveAbilityToMonsterLatex(ability: PassiveAbility): string {
  const magicalText = ability.isMagical ? '\\sparkle' : '';
  return `
    \\parhead{${ability.name}${magicalText}} ${ability.effect}
  `;
}
