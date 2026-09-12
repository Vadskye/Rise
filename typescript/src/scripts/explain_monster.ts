import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';
import { ActiveAbility } from '@src/abilities';
import {
  convertLatexToWebText,
  reformatAsMonsterAbility,
} from '@src/latex/monsters/player_abilities';
import { replaceAbilityPlaceholders, replaceNames } from '@src/latex/monsters/replace_placeholders';
import { getWeaponAccuracy } from '@src/monsters/weapons';

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

  console.log('\n--- Core Accuracy ---');
  console.log(`  Base Accuracy      : ${monster.explainProperty('accuracy')}`);
  console.log(`  Brawling Accuracy  : ${monster.explainProperty('brawling_accuracy')}`);
  console.log(`  Monster Rank       : ${monster.calculateRank()}`);

  console.log('\n--- Attack Accuracy ---');
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
