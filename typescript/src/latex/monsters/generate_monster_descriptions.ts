import { Grimoire, MonsterGroup } from '@src/monsters/grimoire';
import { checkValidMonster } from '@src/monsters/monster_validation';
import * as format from '@src/latex/format';
import { convertMonsterToLatex, genKnowledgeText } from './convert_monster_to_latex';

export function generateMonsterDescriptions(): string {
  const grimoire = new Grimoire();
  grimoire.addAllMonsters();

  const sectionNames: string[] = [
    ...grimoire.getMonsterNames(),
    ...grimoire.getMonsterGroupNames(),
  ];
  sectionNames.sort();

  const letters: Set<string> = new Set();
  for (const sectionName of sectionNames) {
    letters.add(sectionName[0]);
  }
  const orderedLetters = [...letters];
  orderedLetters.sort();

  const errors: { name: string; error: unknown }[] = [];

  const withSectionBookmarks: string[] = [];
  for (const letter of orderedLetters) {
    withSectionBookmarks.push(
      `\\clearpage\\phantomsection\\addcontentsline{toc}{section}{${letter}}`,
    );
    for (const sectionName of sectionNames.filter((sectionName) =>
      sectionName.startsWith(letter),
    )) {
      try {
        const monster = grimoire.getMonster(sectionName);
        const monsterGroup = grimoire.getMonsterGroup(sectionName);
        if (monster) {
          const { requirements, guidelines } = checkValidMonster(monster);
          if (requirements.length > 0 || guidelines.length > 0) {
            console.warn(`[Validation Warning] Monster "${monster.name}" has validation warnings:`);
            for (const req of requirements) {
              console.warn(`  - [Requirement] ${req}`);
            }
            for (const guide of guidelines) {
              console.warn(`  - [Guideline] ${guide}`);
            }
          }
          withSectionBookmarks.push(convertMonsterToLatex(monster));
        } else if (monsterGroup) {
          for (const gm of monsterGroup.monsters) {
            const { requirements, guidelines } = checkValidMonster(gm, undefined, monsterGroup);
            if (requirements.length > 0 || guidelines.length > 0) {
              console.warn(
                `[Validation Warning] Monster "${monsterGroup.name}.${gm.name}" has validation warnings:`,
              );
              for (const req of requirements) {
                console.warn(`  - [Requirement] ${req}`);
              }
              for (const guide of guidelines) {
                console.warn(`  - [Guideline] ${guide}`);
              }
            }
          }
          withSectionBookmarks.push(convertMonsterGroupToLatex(monsterGroup, errors));
        } else {
          throw new Error(`Could not find monster by name: '${sectionName}'`);
        }
      } catch (err) {
        errors.push({ name: sectionName, error: err });
      }
    }
  }

  if (errors.length > 0) {
    console.error('==================================================');
    console.error(`MONSTER GENERATION FAILED with ${errors.length} error(s):`);
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
    throw new Error(
      `Failed to generate monster descriptions. ${errors.length} monster/group(s) had errors.`,
    );
  }

  return format.latexify(withSectionBookmarks.join('\n'));
}

export function convertMonsterGroupToLatex(
  group: MonsterGroup,
  errors?: { name: string; error: unknown }[],
): string {
  const monsterTexts: string[] = [];
  for (const monster of group.monsters) {
    try {
      monsterTexts.push(convertMonsterToLatex(monster, group.name));
    } catch (err) {
      if (errors) {
        errors.push({ name: `${group.name} -> ${monster.name}`, error: err });
      } else {
        throw err;
      }
    }
  }
  const monsterText = monsterTexts.join('\n\\vspace{1em}\n');

  const spacingBuffer =
    group.description || group.knowledge ? '\\vspace{0.5em}' : '\\vspace{0.25em}';
  const artText = group.hasArt
    ? `\\noindent\\includegraphics[width=\\columnwidth]{monsters/${group.name}}`
    : '';

  return `
    \\newpage
    \\section{${group.name}}
    ${artText}
    ${group.description || ''}
    ${genGroupKnowledgeText(group)}
    ${spacingBuffer}

    ${monsterText}
  `.trim();
}

function genGroupKnowledgeText(group: MonsterGroup): string {
  if (!group.knowledge) {
    return '';
  }

  // For now, assume that the first monster is representative of all monsters in the
  // group.
  const exampleMonster = group.monsters[0];

  return genKnowledgeText({
    ...group.knowledge,
    monsterLevel: exampleMonster.level,
    monsterName: group.name,
    relevantKnowledges: [exampleMonster.getRelevantKnowledge()],
  });
}
