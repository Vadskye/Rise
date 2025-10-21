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
  sectionNames.sort();

  const latexSections = sectionNames.map((sectionName) => {
    const monster = grimoire.getMonster(sectionName);
    if (monster) {
      return convertMonsterToLatex(monster);
    }
    const monsterGroup = grimoire.getMonsterGroup(sectionName);
    if (monsterGroup) {
      return convertMonsterGroupToLatex(monsterGroup);
    }

    throw new Error(`Could not find monster by name: '${sectionName}'`);
  });

  return format.latexify(latexSections.map((section) => section.trim()).join('\n'));
}

export function convertMonsterGroupToLatex(group: MonsterGroup): string {
  const monsterText = group.monsters
    .map((monster) => convertMonsterToLatex(monster, group.name))
    .join('\n\\vspace{1em}\n');

  const spacingBuffer = group.description || group.knowledge ? '\\vspace{0.5em}' : '';

  // TODO: render art, knowledge. See `monster_group.rs`.
  return `
    \\newpage
    \\subsection*{${group.name}}

    ${group.description || ''}
    ${spacingBuffer}

    ${monsterText}
  `;
}
