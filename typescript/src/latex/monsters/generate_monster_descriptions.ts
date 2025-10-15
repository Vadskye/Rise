import { Grimoire, MonsterGroup } from '@src/monsters/grimoire';
import { addAberrations } from '@src/monsters/individual_monsters/aberrations';
import { addMagicalBeasts } from '@src/monsters/individual_monsters/magical_beasts';
import { addUndead } from '@src/monsters/individual_monsters/undead';
import * as format from '@src/latex/format';
import { convertMonsterToLatex } from './convert_monster_to_latex';

export function generateMonsterDescriptions(): string {
  const grimoire = new Grimoire();
  addAberrations(grimoire);
  addMagicalBeasts(grimoire);
  addUndead(grimoire);

  const monsterSections: Record<string, string> = {};
  for (const monsterName of grimoire.getMonsterNames()) {
    monsterSections[monsterName] = convertMonsterToLatex(grimoire.getMonster(monsterName));
  }

  for (const monsterGroupName of grimoire.getMonsterGroupNames()) {
    monsterSections[monsterGroupName] = convertMonsterGroupToLatex(
      grimoire.getMonsterGroup(monsterGroupName),
    );
  }

  // TODO: sort the sections
  return format.latexify(
    Object.keys(monsterSections)
      .map((sectionName) => monsterSections[sectionName])
      .join('\n'),
  );
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
