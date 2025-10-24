import {
  RiseSkill,
  RISE_MOVEMENT_SKILLS,
  RISE_SENSE_SKILLS,
  RISE_SOCIAL_SKILLS,
  RISE_OTHER_SKILLS,
} from '@src/character_sheet/rise_data';
import { Creature } from '@src/character_sheet/creature';
import * as format from '@src/latex/format';
import { caseInsensitiveSort } from '@src/util/sort';

import {
  convertAbilityToMonsterLatex,
  convertPassiveAbilityToMonsterLatex,
} from './player_abilities';
import { replacePlaceholders } from './replace_placeholders';

export function convertMonsterToLatex(monster: Creature, parentGroupName?: string) {
  checkValidMonster(monster);

  const hasParentGroup = Boolean(parentGroupName);
  const pagebreakText = hasParentGroup ? '' : '\\newpage';
  const eliteText = monster.elite ? '[Elite]' : '';
  const knowledgeText = genKnowledgeText(monster);
  const contentBufferText = monster.description || knowledgeText ? '\\vspace{0.5em}' : '';

  // This still has various like $name and $accuracy.
  const latexWithPlaceholders = `
    ${pagebreakText}
    \\par \\noindent
    \\begin{minipage}{\\columnwidth}
        \\monsubsection{${monster.name}}{${monster.level} ${format.uppercaseFirst(monster.base_class)}}${eliteText}
        \\monstersize{${format.uppercaseFirst(monster.size)} ${monster.creature_type}}
        ${genArtText(monster, parentGroupName)}
    \\end{minipage}
    ${monster.description || ''}
    ${contentBufferText}

    \\par \\RaggedRight
    ${genStatisticsText(monster)}
    ${knowledgeText}
    \\monsterabilitiesheader{$Name}
    ${genAbilitiesText(monster)}
  `;

  return format.latexify(replacePlaceholders(monster, latexWithPlaceholders)).trim();
}

function checkValidMonster(monster: Creature) {
  function warn(message: string) {
    console.warn(`${monster.name}: ${message}`);
  }

  if (monster.name !== format.titleCase(monster.name)) {
    warn('Monster name should be title case');
  }
}

function genArtText(monster: Creature, parentGroupName?: string): string {
  if (!monster.has_art) {
    return '';
  }
  const name = monster.name.toLowerCase();
  const path = parentGroupName ? `${parentGroupName} - ${name}` : name;
  return `\\noindent\\includegraphics[width=\\columnwidth]{monsters/${path}}\\vspace{0.5em}`;
}

export function genKnowledgeText(monster: Creature): string {
  const difficultyMap: Record<string, string> = {};
  const baseDifficulty = Math.floor(monster.level / 2) + 5;
  if (monster.knowledge_result_easy) {
    difficultyMap[baseDifficulty - 5] = monster.knowledge_result_easy;
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
    const difficultiesText = difficulties
      .map(
        (difficulty) =>
          `\\par ${format.sentenceCase(relevantKnowledge.replace('knowledge_', ''))} DV ${difficulty}: ${difficultyMap[difficulty]}`,
      )
      .join('\n');

    return `
      \\monsterknowledgeheader{$Name}
      ${difficultiesText}
    `;
  } else {
    return '';
  }
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
      \\spelltwocol{\\pari \\textbf{Attributes} ${genAttributesText(monster)}}{\\textbf{Alignment} ${format.uppercaseFirst(monster.alignment)}}
      \\spelltwocol{\\pari \\textbf{Accuracy} ${format.modifier(monster.accuracy)}; Brawling ${format.modifier(monster.brawling_accuracy)}}{\\textbf{Power} ${monster.mundane_power}; ${monster.magical_power}\\sparkle}
      ${genEquipmentText(monster)}
      ${genTraitsText(monster)}
    \\end{monsterstatistics}
  `;
}

function genDefensiveStatisticsText(monster: Creature): string {
  const mentalText = monster.hasTrait('mindless') ? '' : `\n\\monsep Ment ${monster.mental}`;

  return `
    \\pari \\textbf{HP} ${monster.hit_points}
      \\monsep \\textbf{IP} ${monster.injury_point}
    \\pari \\textbf{Defenses}
      Armor ${monster.armor_defense}
      \\monsep Brawn ${monster.brawn}
      \\monsep Fort ${monster.fortitude}${mentalText}
      \\monsep Ref ${monster.reflex}
  `;
}

function genSpecialDefenseModifiersText(monster: Creature) {
  return [
    ['Immune', monster.immune],
    ['Impervious', monster.impervious],
    ['Vulnerable', monster.vulnerable],
  ]
    .filter((sd) => sd[1])
    .map(([header, defenseText]) => {
      return `\\pari \\textbf{${header}} ${defenseText}`;
    })
    .join('\n');
}

function genMovementText(monster: Creature) {
  const jumpText = monster.hasTrainedSkill('jump')
    ? `Jump ${monster.horizontal_jump_distance}`
    : '';
  const movementDistances = [
    ...monster.getCustomMovementSpeeds().sort(caseInsensitiveSort),
    jumpText,
  ].filter(Boolean);

  // TODO: A creature with a swim speed and that is trained with the Swim skill will
  // display "Swim" twice here. What's the correct formatting?
  const movementComponents = [
    ...movementDistances,
    ...formatSkillList(monster, RISE_MOVEMENT_SKILLS),
  ].join('\\monsep ');

  const movementText = movementComponents ? `; ${movementComponents}` : '';
  // TODO: Formatting is awkward
  return `\\pari \\textbf{Movement} ${monster.speed} ft.${movementText}`;
}

function genSpaceAndReachText() {
  // TODO: only display for monsters with nonstandard space/reach for their size
  return '';
}

function genSensesText(monster: Creature) {
  const customSenses = monster.getCustomSenses().sort(caseInsensitiveSort);

  const senseText = [...customSenses, ...formatSkillList(monster, RISE_SENSE_SKILLS)].join(
    '\\monsep ',
  );

  if (senseText.length > 0) {
    return `\\pari \\textbf{Senses} ${senseText}`;
  } else {
    return '';
  }
}

function formatSkillList<T extends RiseSkill>(
  monster: Creature,
  skillNames: readonly T[],
): string[] {
  const skillModifiers = monster.getPropertyValues(skillNames);
  return skillNames
    .map((skillName) => {
      if (monster.hasTrainedSkill(skillName)) {
        return `${format.skillName(skillName)} ${format.modifier(Number(skillModifiers[skillName]))}`;
      } else {
        return '';
      }
    })
    .filter(Boolean)
    .sort(caseInsensitiveSort);
}

function genSocialText(monster: Creature) {
  const socialSkillText = formatSkillList(monster, RISE_SOCIAL_SKILLS).join('\\monsep ');
  if (socialSkillText.length > 0) {
    return `\\pari \\textbf{Social} ${socialSkillText}`;
  } else {
    return '';
  }
}

function genOtherSkillsText(monster: Creature) {
  const otherSkillText = formatSkillList(monster, RISE_OTHER_SKILLS).join('\\monsep ');
  if (otherSkillText.length > 0) {
    return `\\pari \\textbf{Other skills} ${otherSkillText}`;
  } else {
    return '';
  }
}

function genAttributesText(monster: Creature): string {
  const formatAttribute = (val: number): string => {
    return val > -10 ? `${val}` : '\\tdash';
  };

  return [
    formatAttribute(monster.strength),
    formatAttribute(monster.dexterity),
    formatAttribute(monster.constitution),
    monster.hasTrait('mindless') ? '---' : formatAttribute(monster.intelligence),
    formatAttribute(monster.perception),
    monster.hasTrait('mindless') ? '---' : formatAttribute(monster.willpower),
  ].join(', ');
}

function genAbilitiesText(monster: Creature): string {

  const activeAbilities = monster.getActiveAbilities();
  // Secondary sort is by name
  activeAbilities.sort((a, b) => a.name.localeCompare(b.name));
  // Primary sort is by usage time
  activeAbilities.sort((a, b) => {
    return (a.usageTime || 'standard').localeCompare(b.usageTime || 'standard')
  });

  const activeAbilityLatex = activeAbilities.map((ability) => convertAbilityToMonsterLatex(monster, ability)).join('\n');

  const passiveAbilities = monster.getPassiveAbilities();
  // Only sort is by name
  passiveAbilities.sort((a, b) => a.name.localeCompare(b.name));
  const passiveAbilityLatex = passiveAbilities.map(convertPassiveAbilityToMonsterLatex).join('\n');

  return `
    ${passiveAbilityLatex}

    ${activeAbilityLatex}
  `;
}

function genEquipmentText(monster: Creature): string {
  const equippedItems = monster.getEquipment();
  if (equippedItems.length === 0) {
    return '';
  }

  const equippedItemsText = format.sentenceCase(equippedItems.map((item) => item).join(', '));

  return `\\pari \\textbf{Equipment} ${equippedItemsText}`;
}

function genTraitsText(monster: Creature): string {
  const traits = monster.getStandardTraits();
  if (traits.length === 0) {
    return '';
  }

  const traitsText = traits
    .map((trait) => `\\trait{${format.sentenceCase(trait)}}`)
    .join('\\monsep ');

  return `\\pari \\textbf{Traits} ${traitsText}`;
}
