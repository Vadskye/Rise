import { Grimoire } from '@src/monsters/grimoire';
import { Creature, RiseKnowledgeSkill } from '@src/character_sheet/creature';
import { addAberrations } from '@src/monsters/individual_monsters/aberrations';
import * as format from "@src/latex/format";

export function generateMonsterDescriptions(): string {
  const grimoire = new Grimoire();
  addAberrations(grimoire);

  const monsterSections: Record<string, string> = {};
  for (const monsterName of grimoire.getMonsterNames()) {
    monsterSections[monsterName] = convertMonsterToLatex(grimoire.getMonster(monsterName));
  }

  for (const monsterGroupName of grimoire.getMonsterGroupNames()) {
    monsterSections[monsterGroupName] = convertMonsterGroupToLatex(
      monsterGroupName, grimoire.getMonsterGroup(monsterGroupName)
    );
  }

  // TODO: sort the sections
  return format.latexify(Object.keys(monsterSections).map((sectionName) => monsterSections[sectionName]).join("\n"));
}

export function convertMonsterToLatex(monster: Creature, parentGroupName?: string) {
  const hasParentGroup = Boolean(parentGroupName);
  const sectionName = hasParentGroup ? "monsubsubsection" : "monsubsection";
  const pagebreakText = hasParentGroup ? "" : "\\newpage";
  const eliteText = monster.challenge_rating === 4 ? "[Elite]" : "";
  const sizeStarText = hasParentGroup ? "*" : "";
  const knowledgeText = genKnowledgeText(monster);
  const contentBufferText = (monster.description || knowledgeText) ? "\\vspace{0.5em}" : "";
  return `
    ${pagebreakText}
    \\par \\noindent
    \\begin<minipage><\\columnwidth>
        \\${sectionName}<${monster.name}><${monster.level} ${monster.role}>${eliteText}
        \\monstersize${sizeStarText}<${monster.size} ${monster.creature_type}>
        ${genArtText(monster)}
    \\end<minipage>
    ${monster.description || ""}
    ${knowledgeText}
    ${contentBufferText}

    \\par \\RaggedRight
    ${genStatisticsText(monster)}
    \\monsterabilitiesheader<$Name>
    ${genAbilitiesText(monster)}
  `;
}

export function convertMonsterGroupToLatex(monsterGroupName: string, monsters: Creature[]): string {
  const monsterText = monsters.map((monster) => convertMonsterToLatex(monster, monsterGroupName)).join("\n");

  return `
    \\monsection{${monsterGroupName}}

    ${monsterText}
  `;
}

function genArtText(monster: Creature, parentGroupName?: string): string {
  if (!monster.has_art) {
    return "";
  }
  const name = monster.name.toLowerCase();
  const path = parentGroupName ? `${parentGroupName} - ${name}` : name;
  return `\\noindent\\includegraphics[width=\\columnwidth]<monsters/${path}>\\vspace<0.5em>`;
}

export function genKnowledgeText(monster: Creature): string {
  const difficultyMap: Record<string, string> = {};
  const baseDifficulty = Math.floor(monster.level / 2) + 5;
  if (monster.knowledge_result_easy) {
    difficultyMap[baseDifficulty-5] = monster.knowledge_result_easy;
  }
  if (monster.knowledge_result_normal) {
    difficultyMap[baseDifficulty] = monster.knowledge_result_normal;
  }
  if (monster.knowledge_result_hard) {
    difficultyMap[baseDifficulty + 5] = monster.knowledge_result_hard;
  }
  if (monster.knowledge_result_legendary) {
    difficultyMap[baseDifficulty + 10] = monster.knowledge_result_legendary;
  }
  const difficulties: string[] = Object.keys(difficultyMap).sort((a, b) => Number(a) - Number(b));

  if (difficulties.length > 0) {
    const relevantKnowledge = monster.getRelevantKnowledge();
    return difficulties.map(
      (difficulty) => `\\par Knowledge (${formatKnowledgeSubskill(relevantKnowledge)}) ${difficulty}: ${difficultyMap[difficulty]}`
    ).join("\n");
  } else {
    return "";
  }
}

// This is currently a one-liner, but it's possible that future developments could cause
// some subskills to need more translation effort later.
function formatKnowledgeSubskill(knowledge: RiseKnowledgeSkill): string {
  return knowledge.replace("knowledge_", "");
}

function genStatisticsText(monster: Creature): string {
  return `
    \\begin{monsterstatistics}
      ${genDefensiveStatisticsText(monster)}
      ${genSpecialDefenseModifiersText(monster)}
      ${genMovementText(monster)}
      ${genSpaceAndReachText(monster)}
      ${genSensesText(monster)}
      ${genSensesText(monster)}
      ${genSocialText(monster)}
      ${genOtherSkillsText(monster)}
    \\end{monsterstatistics}
  `;
}

function genDefensiveStatisticsText(monster: Creature): string {
  const mentalText = monster.hasModifier("mindless") ? "" : `\\monsep Ment ${monster.mental}`;

  return `
    \\pari \\textbf{HP} ${monster.hit_points}
      \\monsep \\textbf{DR} ${monster.damage_resistance}
    \\pari \\textbf{Defenses}
      Armor ${monster.armor_defense}
      \\monsep Fort ${monster.fortitude}
      \\monsep Ref ${monster.reflex}
      ${mentalText}
  `;
}

function genSpecialDefenseModifiersText(monster: Creature) {
  // TODO
  return "";
}

function genMovementText(monster: Creature) {
  // TODO
  return "";
}

function genSpaceAndReachText(monster: Creature) {
  // TODO
  return "";
}

function genSensesText(monster: Creature) {
  // TODO
  return "";
}

function genSocialText(monster: Creature) {
  // TODO
  return "";
}

function genOtherSkillsText(monster: Creature) {
  // TODO
  return "";
}

function genAbilitiesText(monster: Creature): string {
  // TODO
  return "";
}
