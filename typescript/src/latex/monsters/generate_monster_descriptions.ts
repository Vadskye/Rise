import { Grimoire, MonsterGroup } from '@src/monsters/grimoire';
import { addAberrations } from '@src/monsters/individual_monsters/aberrations';
import { addAnimates } from '@src/monsters/individual_monsters/animates';
import { addBeasts } from '@src/monsters/individual_monsters/beasts';
import { addHumanoids } from '@src/monsters/individual_monsters/humanoids';
import { addUndead } from '@src/monsters/individual_monsters/undead';
import * as format from '@src/latex/format';
import { convertMonsterToLatex } from './convert_monster_to_latex';

export function generateMonsterDescriptions(): string {
  const grimoire = new Grimoire();
  addAberrations(grimoire);
  addAnimates(grimoire);
  addBeasts(grimoire);
  addHumanoids(grimoire);
  addUndead(grimoire);

  const sectionNames: string[] = [
    ...grimoire.getMonsterNames(),
    ...grimoire.getMonsterGroupNames(),
  ];

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

  const spacingBuffer = group.description || group.knowledge ? '\\vspace{0.5em}' : '';
  const artText = group.hasArt ? `\\noindent\\includegraphics[width=\\columnwidth]{monsters/${group.name}}` : '';

  // TODO: render art, knowledge. See `monster_group.rs`.
  return `
    \\newpage
    \\section{${group.name}}
    ${artText}
    ${group.description || ''}
    ${spacingBuffer}

    ${monsterText}
  `.trim();
}
