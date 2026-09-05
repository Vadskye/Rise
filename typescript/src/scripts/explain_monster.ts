import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

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

  console.log('monster.getCommonExplanations()', monster.getCommonExplanations());
}

if (require.main === module) {
  main(process.argv[2]);
}
