import { Grimoire } from '../monsters/grimoire';
import { checkValidMonster } from '../monsters/monster_validation';

function main() {
  const grimoire = new Grimoire();
  grimoire.addAllMonsters();

  const names = [...grimoire.getMonsterNames(), ...grimoire.getMonsterGroupNames()].sort();
  let totalViolations = 0;

  for (const name of names) {
    const m = grimoire.getMonster(name);
    const mg = grimoire.getMonsterGroup(name);
    if (m) {
      const { requirements } = checkValidMonster(m);
      if (requirements.length > 0) {
        totalViolations++;
        console.log(`[Monster] ${m.name}:`);
        requirements.forEach((r) => console.log(`  - ${r}`));
      }
    } else if (mg) {
      for (const gm of mg.monsters) {
        const { requirements } = checkValidMonster(gm, mg);
        if (requirements.length > 0) {
          totalViolations++;
          console.log(`[Group Monster] ${mg.name}.${gm.name}:`);
          requirements.forEach((r) => console.log(`  - ${r}`));
        }
      }
    }
  }

  console.log(`\nTotal requirement violations: ${totalViolations}`);
}

main();
