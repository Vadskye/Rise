import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';
import { ActiveAbility } from '@src/abilities';
import {
  convertLatexToWebText,
  reformatAsMonsterAbility,
  replacePowerScalingDamage,
} from '@src/latex/monsters/player_abilities';
import { replaceAbilityPlaceholders, replaceNames } from '@src/latex/monsters/replace_placeholders';
import {
  getWeaponAccuracy,
  getWeaponDamageDice,
  getWeaponPowerMultiplier,
} from '@src/monsters/weapons';
import { parseDamageRank, DamageRank } from '@src/core_mechanics/damage_calculation';
import { DamageScaling } from '@src/core_mechanics/damage_scaling';

export function explainMonsterAttacks(monster: Creature) {
  for (const ability of monster.getActiveAbilities()) {
    const clone: ActiveAbility = {
      ...ability,
      tags: ability.tags ? [...ability.tags] : undefined,
      attack: ability.attack ? { ...ability.attack } : undefined,
    };

    try {
      reformatAsMonsterAbility(monster, clone);
    } catch {
      continue;
    }

    const rawTargeting = clone.attack?.targeting || clone.effect || '';
    if (!/\$(?:brawling)?(?:consumable)?accuracy/.test(rawTargeting)) {
      continue;
    }

    const replaced = replaceNames(
      replaceAbilityPlaceholders(monster, rawTargeting, {
        isMagical: clone.isMagical,
        weapon: clone.weapon,
      }),
      monster.name,
    );
    const rendered = convertLatexToWebText(replaced).trim().replace(/\s+/g, ' ');

    let weaponAccuracy: number | undefined;
    if (clone.weapon) {
      try {
        weaponAccuracy = getWeaponAccuracy(clone.weapon);
      } catch {
        weaponAccuracy = 0;
      }
    }

    const isBrawling = /\$brawlingaccuracy/.test(rawTargeting);
    const baseAccuracy = isBrawling ? monster.brawling_accuracy : monster.accuracy;

    console.log(
      `\n  * ${ability.name} (${ability.kind || 'ability'}, rank ${ability.rank ?? 'none'})`,
    );
    if (ability.scaling) {
      console.log(
        `    Scaling       : ${ability.scaling} (monster rank: ${monster.calculateRank()})`,
      );
    }
    if (clone.weapon) {
      console.log(`    Weapon        : ${clone.weapon} (weapon accuracy: ${weaponAccuracy})`);
    }
    console.log(`    Base Accuracy : ${baseAccuracy} (${isBrawling ? 'brawling' : 'standard'})`);
    console.log(`    Raw Template  : ${rawTargeting.trim().replace(/\s+/g, ' ')}`);
    console.log(`    Rendered      : ${rendered}`);

    // --- Damage Explanation ---
    const rawHit = clone.attack?.hit || '';
    let replacedHit = replaceNames(
      replaceAbilityPlaceholders(monster, rawHit, {
        isMagical: clone.isMagical,
        weapon: clone.weapon,
      }),
      monster.name,
    );
    replacedHit = convertLatexToWebText(replacedHit).trim().replace(/\s+/g, ' ');

    const damageMatch = replacedHit.match(
      /\b(?:\d+d\d+|\d+)(?:\s*\+\s*(?:\d+d\d+|\d+))*\s+damage\b/i,
    );
    if (damageMatch) {
      explainAbilityDamage(monster, ability, clone, damageMatch[0]);
    }
  }
}

export function explainAbilityDamage(
  monster: Creature,
  ability: ActiveAbility,
  clone: ActiveAbility,
  damageStr: string,
) {
  console.log(`    Damage        : ${damageStr}`);

  const isStrike = Boolean(
    (ability.effect && /\b[mM]ake a.*(strike\b|\\glossterm{strike})/.test(ability.effect)) ||
    (ability.weapon && !ability.attack),
  );

  const rawHitOrEffect = ability.attack?.hit || ability.effect || '';
  const drMatch = rawHitOrEffect.match(/\\(damage|hp)rank(\w+)|\$dr(\d+)(l)?/);

  if (isStrike && clone.weapon) {
    explainStrikeDamage(monster, ability, clone);
  } else if (drMatch) {
    explainDamageRankDamage(monster, ability, clone, drMatch);
  } else {
    console.log(`    Damage Details: Flat / consumable damage`);
  }
}

function explainStrikeDamage(monster: Creature, ability: ActiveAbility, clone: ActiveAbility) {
  const weapon = clone.weapon!;
  const diceIncrement = monster.weapon_dice_increment || 0;
  const baseDice = getWeaponDamageDice(weapon, 0);
  const incrementedDice = getWeaponDamageDice(weapon, diceIncrement);

  let weaponMult = 1;
  const sentences = (ability.effect || '').split(/[.\n]/);
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    const match = trimmed.match(
      /deals (double|triple|quadruple|five times|six times|seven times|eight times) (\\glossterm{weapon damage}|weapon damage)/,
    );
    if (match) {
      weaponMult =
        {
          double: 2,
          triple: 3,
          quadruple: 4,
          'five times': 5,
          'six times': 6,
          'seven times': 7,
          'eight times': 8,
        }[match[1]] || 1;
    }
  }

  let globalMult = 1;
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (
      /deals (double|triple|quadruple) (\\glossterm{weapon damage}|weapon damage)/.test(trimmed)
    ) {
      continue;
    }
    const match = trimmed.match(/deals (double|triple|quadruple) damage/);
    if (match) {
      globalMult =
        {
          double: 2,
          triple: 3,
          quadruple: 4,
        }[match[1]] || 1;
      break;
    }
  }

  let strikeIsMagical = ability.isMagical;
  const strikeMatch = ability.effect?.match(
    /(?:make a|makes a)( mundane| \\glossterm{mundane}| magical| \\glossterm{magical})? (strike|\\glossterm{strike})/i,
  );
  if (strikeMatch && strikeMatch[1]) {
    if (/mundane/.test(strikeMatch[1])) {
      strikeIsMagical = false;
    } else if (/magical/.test(strikeMatch[1])) {
      strikeIsMagical = true;
    }
  }

  const powerMultiplier = getWeaponPowerMultiplier(weapon);
  let relevantPower = monster.getRelevantPower(strikeIsMagical);
  if (ability.effect && /higher of.*mundane.*magical/.test(ability.effect)) {
    relevantPower = Math.max(monster.getRelevantPower(true), monster.getRelevantPower(false));
  }

  let extraFlatDamage = 0;
  const normalizedEffect = replacePowerScalingDamage(monster, ability, ability.effect || '');
  const extraFlatDamageMatch = normalizedEffect.match(
    / (\d+) (extra damage|\\glossterm{extra damage})/,
  );
  if (extraFlatDamageMatch) {
    extraFlatDamage = Number(extraFlatDamageMatch[1]);
  }

  const powerBonus = Math.floor(relevantPower * powerMultiplier);
  const totalFlat = globalMult * (powerBonus + extraFlatDamage);

  const diceParts = [];
  if (diceIncrement > 0) {
    diceParts.push(
      `base ${baseDice.count}d${baseDice.size} + ${diceIncrement} increment -> ${incrementedDice.count}d${incrementedDice.size}`,
    );
  } else {
    diceParts.push(`base ${baseDice.count}d${baseDice.size}`);
  }
  if (weaponMult > 1) {
    diceParts.push(
      `${weaponMult}x weapon damage -> ${incrementedDice.count * weaponMult}d${incrementedDice.size}`,
    );
  }
  if (globalMult > 1) {
    diceParts.push(
      `${globalMult}x global damage -> ${incrementedDice.count * weaponMult * globalMult}d${incrementedDice.size}`,
    );
  }

  const powerType = strikeIsMagical ? 'magical' : 'mundane';
  console.log(`    Damage Details: Strike with ${weapon}`);
  console.log(`      Dice        : ${diceParts.join(', ')}`);

  const powerCalcParts = [`${powerType} power ${relevantPower} * ${powerMultiplier} power mult`];
  if (extraFlatDamage > 0) {
    powerCalcParts.push(`+ ${extraFlatDamage} extra flat`);
  }
  if (globalMult > 1) {
    powerCalcParts.push(`* ${globalMult} global mult`);
  }
  console.log(`      Power Added : +${totalFlat} (${powerCalcParts.join(' ')})`);
}

function explainDamageRankDamage(
  monster: Creature,
  ability: ActiveAbility,
  clone: ActiveAbility,
  drMatch: RegExpMatchArray,
) {
  let damageRank: DamageRank;
  let lowPowerScaling = false;

  if (drMatch[1]) {
    const rankAndMaybeLow = drMatch[2];
    const damageRankText = rankAndMaybeLow.replace('low', '');
    lowPowerScaling = /low/.test(rankAndMaybeLow);
    damageRank = parseDamageRank(damageRankText);
  } else {
    damageRank = Number(drMatch[3]) as DamageRank;
    lowPowerScaling = Boolean(drMatch[4]);
  }

  const scaling = lowPowerScaling ? DamageScaling.drl(damageRank) : DamageScaling.dr(damageRank);
  const baseDice = scaling.baseDice;
  const abilityRank = ability.rank ?? 0;
  const monsterRank = monster.calculateRank();
  const excessRank = Math.max(0, monsterRank - abilityRank);

  const powerType = clone.isMagical ? 'magical' : 'mundane';
  const relevantPower = monster.getRelevantPower(clone.isMagical);

  console.log(
    `    Damage Details: Damage Rank ${damageRank}${lowPowerScaling ? ' (low power scaling)' : ''}`,
  );
  console.log(`      Base Dice   : ${baseDice.toString()}`);

  if (excessRank > 0 && scaling.excessRankScaling) {
    const parts = [];
    if (scaling.excessRankScaling.dicePerRank) {
      const dice = scaling.excessRankScaling.dicePerRank.dice;
      parts.push(
        `+${excessRank * dice.length}d${dice[0].size} (${excessRank} excess ranks * ${scaling.excessRankScaling.dicePerRank.toString()})`,
      );
    }
    if (scaling.excessRankScaling.flatDamagePerRank) {
      parts.push(
        `+${excessRank * scaling.excessRankScaling.flatDamagePerRank} flat (${excessRank} excess ranks * ${scaling.excessRankScaling.flatDamagePerRank})`,
      );
    }
    console.log(`      Excess Rank : ${parts.join(', ')}`);
  }

  if (scaling.powerScalings && scaling.powerScalings.length > 0) {
    const pScale = scaling.powerScalings[0];
    if (pScale.powerPerDice > 0 && pScale.dice) {
      const numDice = Math.floor(relevantPower / pScale.powerPerDice);
      const dieSize = pScale.dice.dice[0].size;
      console.log(
        `      Power Added : +${numDice}d${dieSize} (${powerType} power ${relevantPower}, 1d${dieSize} per ${pScale.powerPerDice} power)`,
      );
    } else if (pScale.powerPerPlus1Modifier > 0) {
      const mod = Math.floor(relevantPower / pScale.powerPerPlus1Modifier);
      console.log(
        `      Power Added : +${mod} (${powerType} power ${relevantPower}, +1 per ${pScale.powerPerPlus1Modifier} power)`,
      );
    }
  } else {
    console.log(`      Power Added : None (fixed scaling)`);
  }
}

export function explainMonster(monster: Creature) {
  console.log('='.repeat(80));
  console.log(
    ` Monster: ${monster.name} (Level ${monster.level}${monster.elite ? ' Elite' : ''} ${monster.base_class}, ${monster.size} ${monster.creature_origin})`,
  );
  console.log('='.repeat(80));

  console.log('\n--- Defenses & Speed ---');
  const common = monster.getCommonExplanations();
  for (const [key, value] of Object.entries(common)) {
    console.log(`  ${key.padEnd(10)}: ${value}`);
  }

  console.log('\n--- Core Accuracy & Power ---');
  console.log(`  Base Accuracy      : ${monster.explainProperty('accuracy')}`);
  console.log(`  Brawling Accuracy  : ${monster.explainProperty('brawling_accuracy')}`);
  console.log(`  Mundane Power      : ${monster.explainProperty('mundane_power')}`);
  console.log(`  Magical Power      : ${monster.explainProperty('magical_power')}`);
  console.log(`  Dice Increment     : ${monster.explainProperty('weapon_dice_increment')}`);
  console.log(`  Monster Rank       : ${monster.calculateRank()}`);

  console.log('\n--- Attack Accuracy & Damage ---');
  explainMonsterAttacks(monster);
  console.log('='.repeat(80) + '\n');
}

function main(monsterNameInput: string) {
  if (!monsterNameInput) {
    console.error('Please specify a monster name.');
    process.exit(1);
  }

  const grimoire = new Grimoire();
  grimoire.addAllMonsters();

  let monster: Creature | undefined;
  if (/\./.test(monsterNameInput)) {
    const [groupName, monsterName] = monsterNameInput.split('.');
    monster = grimoire.getMonsterGroup(groupName)?.monsters.find((m) => m.name === monsterName);
  } else {
    monster = grimoire.getMonster(monsterNameInput) ?? undefined;
    if (!monster) {
      for (const groupName of grimoire.getMonsterGroupNames()) {
        const found = grimoire
          .getMonsterGroup(groupName)
          ?.monsters.find((m) => m.name === monsterNameInput);
        if (found) {
          monster = found;
          break;
        }
      }
    }
  }

  if (!monster) {
    console.error(`Monster "${monsterNameInput}" not found.`);
    process.exit(1);
  }

  explainMonster(monster);
}

if (require.main === module) {
  main(process.argv[2]);
}
