import { Grimoire } from '@src/monsters/grimoire';
import { checkValidMonster } from '@src/monsters/monster_validation';

function main() {
  console.log('Running Monster Validation on all monsters in Grimoire...');

  const grimoire = new Grimoire();
  try {
    grimoire.addAllMonsters();
  } catch (err) {
    console.error('Fatal: Failed to add monsters to Grimoire:', err);
    process.exit(1);
  }

  const sectionNames: string[] = [
    ...grimoire.getMonsterNames(),
    ...grimoire.getMonsterGroupNames(),
  ];
  sectionNames.sort();

  const errors: { name: string; error: unknown }[] = [];
  let totalWarningsCount = 0;
  let validatedMonstersCount = 0;

  for (const sectionName of sectionNames) {
    try {
      const monster = grimoire.getMonster(sectionName);
      const monsterGroup = grimoire.getMonsterGroup(sectionName);

      if (monster) {
        validatedMonstersCount++;
        const warnings = checkValidMonster(monster);
        if (warnings.length > 0) {
          totalWarningsCount += warnings.length;
          console.warn(`[Validation Warning] Monster "${monster.name}" has validation warnings:`);
          for (const warning of warnings) {
            console.warn(`  - ${warning}`);
          }
        }
      } else if (monsterGroup) {
        for (const gm of monsterGroup.monsters) {
          validatedMonstersCount++;
          const warnings = checkValidMonster(gm, undefined, monsterGroup);
          if (warnings.length > 0) {
            totalWarningsCount += warnings.length;
            console.warn(
              `[Validation Warning] Monster "${monsterGroup.name}.${gm.name}" has validation warnings:`,
            );
            for (const warning of warnings) {
              console.warn(`  - ${warning}`);
            }
          }
        }
      } else {
        throw new Error(`Could not find monster or monster group by name: '${sectionName}'`);
      }
    } catch (err) {
      errors.push({ name: sectionName, error: err });
    }
  }

  if (errors.length > 0) {
    console.error('==================================================');
    console.error(
      `MONSTER VALIDATION FAILED with ${errors.length} fatal initialization/loading error(s):`,
    );
    console.error('==================================================');
    for (const { name, error } of errors) {
      console.error(`Error in monster/group: ${name}`);
      if (error instanceof Error) {
        console.error(error.stack || error.message);
      } else {
        console.error(error);
      }
      console.error('--------------------------------------------------');
    }
    process.exit(1);
  }

  console.log('==================================================');
  console.log(`Validation complete: validated ${validatedMonstersCount} monster(s).`);
  if (totalWarningsCount > 0) {
    console.log(`Found ${totalWarningsCount} validation warning(s).`);
  } else {
    console.log('No validation warnings found.');
  }
  console.log('==================================================');
  process.exit(0);
}

main();
