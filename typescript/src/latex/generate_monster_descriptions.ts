import { Grimoire } from '@src/monsters/grimoire';
import { Creature } from '@src/character_sheet/creature';
import { addAberrations } from '@src/monsters/individual_monsters/aberrations';

export function generateMonsterDescriptions(): string {
  const grimoire = new Grimoire();
  addAberrations(grimoire);

  const monsterSections: Record<string, string> = {};
  for (const monsterName of grimoire.getMonsterNames()) {
    generateMonsterSection(monsterSections, grimoire.getMonster(monsterName))
  }

  for (const monsterGroupName of grimoire.getMonsterGroupNames()) {
    generateMonsterGroupSection(monsterSections, grimoire.getMonsterGroup(monsterGroupName))
  }

  // TODO: sort the sections
  return Object.keys(monsterSections).map((sectionName) => monsterSections[sectionName]).join("\n");
}

function generateMonsterSection(monsterSections: Record<string, string>, monster: Creature) {
  monster.getProperties(["name"], ({ name }) => {
    monsterSections[name] = `\\monsubsection{${name}}`;
  });
}

function generateMonsterGroupSection(monsterSections: Record<string, string>, monsters: Creature[]) {
  const subsections = [];
  for (const monster of monsters) {
    monster.getProperties(["name"], ({ name }) => {
      subsections.push(`\\monsubsection{${name}}`);
    });
  }
}
