import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';
import { addAberrations } from '@src/monsters/individual_monsters/aberrations';
import * as format from '@src/latex/format';
import { convertMonsterToLatex } from './convert_monster_to_latex';

export function generateMonsterDescriptions(): string {
  const grimoire = new Grimoire();
  addAberrations(grimoire);

  const monsterSections: Record<string, string> = {};
  for (const monsterName of grimoire.getMonsterNames()) {
    monsterSections[monsterName] = convertMonsterToLatex(grimoire.getMonster(monsterName));
  }

  for (const monsterGroupName of grimoire.getMonsterGroupNames()) {
    monsterSections[monsterGroupName] = convertMonsterGroupToLatex(
      monsterGroupName,
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

export function convertMonsterGroupToLatex(monsterGroupName: string, monsters: Creature[]): string {
  const monsterText = monsters
    .map((monster) => convertMonsterToLatex(monster, monsterGroupName))
    .join('\n');

  return `
    \\monsection{${monsterGroupName}}

    ${monsterText}
  `;
}
