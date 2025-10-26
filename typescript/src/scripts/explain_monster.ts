import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';

function main(monsterNameInput: string) {
  const grimoire = new Grimoire();
  grimoire.addAllMonsters();

  let monster: Creature;
  if (/\./.test(monsterNameInput)) {
    const [groupName, monsterName] = monsterNameInput.split('.');
    monster = grimoire
      .getMonsterGroup(groupName)!
      .monsters.find((monster) => monster.name === monsterName)!;
  } else {
    monster = grimoire.getMonster(monsterNameInput)!;
  }

  console.log('monster.getCommonExplanations()', monster.getCommonExplanations());
}

if (require.main === module) {
  main(process.argv[2]);
}
