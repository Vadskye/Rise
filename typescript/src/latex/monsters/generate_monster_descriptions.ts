import { Grimoire, MonsterGroup } from '@src/monsters/grimoire';
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

  const withSectionBookmarks: string[] = [];
  for (const letter of orderedLetters) {
    withSectionBookmarks.push(`\\clearpage\\phantomsection\\addcontentsline{toc}{section}{${letter}}`);
    for (const sectionName of sectionNames.filter((sectionName) => sectionName.startsWith(letter))) {
      const monster = grimoire.getMonster(sectionName);
      const monsterGroup = grimoire.getMonsterGroup(sectionName);
      if (monster) {
        withSectionBookmarks.push(convertMonsterToLatex(monster));
      } else if (monsterGroup) {
        withSectionBookmarks.push(convertMonsterGroupToLatex(monsterGroup));
      } else {
        throw new Error(`Could not find monster by name: '${sectionName}'`);
      }
    }
  }

  return format.latexify(withSectionBookmarks.join('\n'));
}

export function convertMonsterGroupToLatex(group: MonsterGroup): string {
  const monsterText = group.monsters
    .map((monster) => convertMonsterToLatex(monster, group.name))
    .join('\n\\vspace{1em}\n');

  const spacingBuffer = group.description || group.knowledge ? '\\vspace{0.5em}' : '\\vspace{0.25em}';
  const artText = group.hasArt ? `\\noindent\\includegraphics[width=\\columnwidth]{monsters/${group.name}}` : '';

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
