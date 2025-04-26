import { Grimoire } from '@src/monsters/grimoire';
import { RiseSkill, RiseKnowledgeSkill, RISE_MOVEMENT_SKILLS, RISE_SENSE_SKILLS, RISE_SOCIAL_SKILLS, RISE_OTHER_SKILLS } from '@src/character_sheet/rise_data';
import { Creature } from '@src/character_sheet/creature';
import { addAberrations } from '@src/monsters/individual_monsters/aberrations';
import * as format from "@src/latex/format";
import { caseInsensitiveSort } from '@src/util/sort';

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
    \\begin{minipage}{\\columnwidth}
        \\${sectionName}{${monster.name}}{${monster.level} ${monster.role}}${eliteText}
        \\monstersize${sizeStarText}{${monster.size} ${monster.creature_type}}
        ${genArtText(monster)}
    \\end{minipage}
    ${monster.description || ""}
    ${knowledgeText}
    ${contentBufferText}

    \\par \\RaggedRight
    ${genStatisticsText(monster)}
    \\monsterabilitiesheader{$Name}
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
  return `\\noindent\\includegraphics[width=\\columnwidth]{monsters/${path}}\\vspace{0.5em}`;
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
      ${genSpaceAndReachText()}
      ${genSensesText(monster)}
      ${genSocialText(monster)}
      ${genOtherSkillsText(monster)}
      \\rankline
      \\pari \\textbf{Attributes} ${genAttributesText(monster)}
      \\pari \\textbf{Power} ${monster.magical_power}\\sparkle \\monsep ${monster.mundane_power}
      \\pari \\textbf{Alignment} ${format.uppercaseFirst(monster.alignment)}
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
  return [
      ["Immune", monster.immune],
      ["Impervious", monster.impervious], 
      ["Vulnerable", monster.vulnerable]
  ].filter((sd) => sd[1]).map(([header, defenseText]) => {
    return `\\pari \\textbf{${header}} ${defenseText}`;
  }).join("\n")
}

function genMovementText(monster: Creature) {
  const landSpeedText = `Land ${monster.land_speed}`;
  const jumpText = monster.hasTrainedSkill("jump") ? `Jump ${monster.horizontal_jump_distance}` : "";
  const movementDistances = [
    landSpeedText,
    ...monster.getCustomMovementSpeeds().sort(caseInsensitiveSort),
    jumpText,
  ].filter(Boolean);


  const movementText = [
    ...movementDistances,
    ...formatSkillList(monster, RISE_MOVEMENT_SKILLS),
  ].join("\\monsep ");
  // TODO
  return `\\pari \\textbf{Movement} ${movementText}`;
}

function genSpaceAndReachText() {
  // TODO: only display for monsters with nonstandard space/reach for their size
  return "";
}

function genSensesText(monster: Creature) {
  const customSenses = monster.getCustomSenses().sort(caseInsensitiveSort);

  const senseText = [
    ...customSenses,
    ...formatSkillList(monster, RISE_SENSE_SKILLS),
  ].join("\\monsep ");

  if (senseText.length > 0) {
    return `\\pari \\textbf{Senses} ${senseText}`;
  } else {
    return "";
  }
}

function formatSkillList<T extends RiseSkill>(monster: Creature, skillNames: readonly T[]): string[] {
  const skillModifiers = monster.getPropertyValues(skillNames);
  return skillNames.map((skillName) => {
    if (monster.hasTrainedSkill(skillName)) {
      return `${format.skillName(skillName)} ${format.modifier(Number(skillModifiers[skillName]))}`;
    } else {
      return '';
    }
  }).filter(Boolean).sort(caseInsensitiveSort);
}

function genSocialText(monster: Creature) {
  const socialSkillText = formatSkillList(monster, RISE_SOCIAL_SKILLS).join("\\monsep ");
  if (socialSkillText.length > 0) {
    return `\\pari \\textbf{Social} ${socialSkillText}`;
  } else {
    return "";
  }
}

function genOtherSkillsText(monster: Creature) {
  const otherSkillText = formatSkillList(monster, RISE_OTHER_SKILLS).join("\\monsep ");
  if (otherSkillText.length > 0) {
    return `\\pari \\textbf{Other skills} ${otherSkillText}`;
  } else {
    return "";
  }
}

function genAttributesText(monster: Creature): string {
  const formatAttribute = (val: number): string => {
    return val > -10 ? `${val}` : "\\tdash";
  };

  return [
    monster.strength,
    monster.dexterity,
    monster.constitution,
    monster.intelligence,
    monster.perception,
    monster.willpower,
  ].map(formatAttribute).join(', ');
}

function genAbilitiesText(monster: Creature): string {
  // TODO
  return "";
}
