import { Class } from './types';
import { RiseSkill, SKILL_METADATA } from '../core_mechanics/skills';
import { RISE_ATTRIBUTES } from '../core_mechanics/attributes';
import { skillName } from '../latex/format/skill_name';

export function getClassSkills(cls: Class): RiseSkill[] {
  switch (cls) {
    case 'Automaton':
      return [
        'analysis',
        'athletics',
        'awareness',
        'balance',
        'craft_untrained',
        'devices',
        'disguise',
        'endurance',
        'knowledge_engineering',
        'knowledge_items',
      ];
    case 'Barbarian':
      return [
        'athletics',
        'awareness',
        'balance',
        'creature_handling',
        'deception',
        'endurance',
        'flexibility',
        'intimidate',
        'medicine',
        'might',
        'persuasion',
        'ride',
        'survival',
      ];
    case 'Cleric':
      return [
        'analysis',
        'awareness',
        'craft_untrained',
        'deception',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'knowledge_local',
        'knowledge_planes',
        'knowledge_souls',
        'medicine',
        'persuasion',
        'social_insight',
      ];
    case 'Dragon':
      return [
        'analysis',
        'athletics',
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'deception',
        'endurance',
        'intimidate',
        'might',
        'knowledge_arcana',
        'knowledge_items',
        'medicine',
        'persuasion',
        'social_insight',
        'stealth',
        'survival',
      ];
    case 'Druid':
      return [
        'analysis',
        'athletics',
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'deception',
        'disguise',
        'endurance',
        'intimidate',
        'knowledge_dungeoneering',
        'knowledge_items',
        'knowledge_nature',
        'persuasion',
        'ride',
        'stealth',
        'survival',
      ];
    case 'Dryad':
      return [
        'athletics',
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'deception',
        'disguise',
        'flexibility',
        'intimidate',
        'knowledge_arcana',
        'knowledge_nature',
        'medicine',
        'perform',
        'persuasion',
        'social_insight',
        'stealth',
        'survival',
      ];
    case 'Fighter':
      return [
        'athletics',
        'awareness',
        'balance',
        'craft_untrained',
        'deception',
        'endurance',
        'flexibility',
        'intimidate',
        'might',
        'knowledge_items',
        'medicine',
        'persuasion',
        'ride',
      ];
    case 'Harpy':
      return [
        'athletics',
        'awareness',
        'balance',
        'creature_handling',
        'deception',
        'flexibility',
        'intimidate',
        'perform',
        'persuasion',
        'social_insight',
        'stealth',
        'survival',
      ];
    case 'Incarnation':
      return [
        'athletics',
        'craft_untrained',
        'balance',
        'flexibility',
        'endurance',
        'knowledge_arcana',
        'knowledge_nature',
        'knowledge_planes',
        'awareness',
        'intimidate',
      ];
    case 'Monk':
      return [
        'analysis',
        'athletics',
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'deception',
        'endurance',
        'flexibility',
        'intimidate',
        'medicine',
        'might',
        'perform',
        'persuasion',
        'ride',
        'social_insight',
        'stealth',
        'survival',
      ];
    case 'Naiad':
      return [
        'analysis',
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'deception',
        'flexibility',
        'intimidate',
        'knowledge_nature',
        'medicine',
        'perform',
        'persuasion',
        'sleight_of_hand',
        'social_insight',
        'stealth',
        'survival',
      ];
    case 'Oozeborn':
      return [
        'athletics',
        'awareness',
        'balance',
        'endurance',
        'flexibility',
        'intimidate',
        'knowledge_dungeoneering',
        'sleight_of_hand',
        'stealth',
        'survival',
      ];
    case 'Paladin':
      return [
        'analysis',
        'awareness',
        'craft_untrained',
        'deception',
        'endurance',
        'intimidate',
        'knowledge_local',
        'knowledge_souls',
        'medicine',
        'might',
        'persuasion',
        'ride',
        'social_insight',
      ];
    case 'Ranger':
      return [
        'analysis',
        'athletics',
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'deception',
        'endurance',
        'flexibility',
        'intimidate',
        'knowledge_arcana',
        'knowledge_dungeoneering',
        'knowledge_engineering',
        'knowledge_items',
        'knowledge_local',
        'knowledge_nature',
        'knowledge_planes',
        'knowledge_souls',
        'medicine',
        'might',
        'persuasion',
        'ride',
        'stealth',
        'survival',
      ];
    case 'Rogue':
      return [
        'analysis',
        'athletics',
        'awareness',
        'balance',
        'craft_untrained',
        'deception',
        'devices',
        'disguise',
        'flexibility',
        'intimidate',
        'knowledge_dungeoneering',
        'knowledge_engineering',
        'knowledge_items',
        'knowledge_local',
        'perform',
        'persuasion',
        'ride',
        'sleight_of_hand',
        'social_insight',
        'stealth',
      ];
    case 'Sorcerer':
      return [
        'analysis',
        'awareness',
        'craft_untrained',
        'deception',
        'endurance',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'knowledge_planes',
        'persuasion',
      ];
    case 'Treant':
      return [
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'endurance',
        'intimidate',
        'knowledge_nature',
        'might',
        'survival',
      ];
    case 'Troll':
      return ['awareness', 'endurance', 'intimidate', 'might', 'stealth', 'survival'];
    case 'Vampire':
      return [
        'analysis',
        'athletics',
        'awareness',
        'balance',
        'creature_handling',
        'deception',
        'disguise',
        'intimidate',
        'knowledge_dungeoneering',
        'knowledge_souls',
        'persuasion',
        'social_insight',
        'stealth',
      ];
    case 'Votive':
      return [
        'analysis',
        'awareness',
        'craft_untrained',
        'deception',
        'disguise',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'knowledge_planes',
        'knowledge_souls',
        'persuasion',
        'ride',
        'social_insight',
      ];
    case 'Wizard':
      return [
        'analysis',
        'awareness',
        'craft_untrained',
        'deception',
        'devices',
        'intimidate',
        'knowledge_arcana',
        'knowledge_dungeoneering',
        'knowledge_engineering',
        'knowledge_items',
        'knowledge_local',
        'knowledge_nature',
        'knowledge_planes',
        'knowledge_souls',
        'persuasion',
      ];
    default:
      return [];
  }
}

export function getClassTrainedSkills(cls: Class): number {
  switch (cls) {
    case 'Automaton':
    case 'Dragon':
    case 'Druid':
    case 'Dryad':
    case 'Incarnation':
    case 'Oozeborn':
    case 'Vampire':
      return 4;
    case 'Barbarian':
    case 'Cleric':
    case 'Fighter':
    case 'Paladin':
    case 'Sorcerer':
    case 'Treant':
    case 'Troll':
    case 'Votive':
    case 'Wizard':
      return 3;
    case 'Harpy':
    case 'Monk':
    case 'Naiad':
    case 'Ranger':
      return 5;
    case 'Rogue':
      return 6;
    default:
      return 0;
  }
}

export function latexClassSkills(cls: Class, classShorthand: string): string {
  const skills = getClassSkills(cls);
  const attributeTexts: string[] = [];

  for (const attr of RISE_ATTRIBUTES) {
    const skillsForAttr = skills.filter((s) => SKILL_METADATA[s].attribute === attr);
    if (skillsForAttr.length > 0) {
      attributeTexts.push(
        `\\item \\subparhead{${attr.charAt(0).toUpperCase() + attr.slice(1)}} ${formatSkillList(skillsForAttr)}.`,
      );
    }
  }

  const skillsWithoutAttr = skills.filter((s) => SKILL_METADATA[s].attribute === null);
  if (skillsWithoutAttr.length > 0) {
    attributeTexts.push(`\\item \\subparhead{Other} ${formatSkillList(skillsWithoutAttr)}.`);
  }

  return `
        \\cf{${classShorthand}}{Class Skills}
        You have the following \\glossterm{class skills}:

        \\begin{raggeditemize}
            ${attributeTexts.join('\n            ')}
        \\end{raggeditemize}
    `;
}

function formatSkillList(skills: RiseSkill[]): string {
  const knowledgeSkills = skills.filter((s) => s.startsWith('knowledge_'));
  const otherSkills = skills.filter((s) => !s.startsWith('knowledge_'));

  const formatted: string[] = otherSkills.map(formatSkillName);

  if (knowledgeSkills.length > 0) {
    const subskills = knowledgeSkills
      .map((s) => s.replace('knowledge_', '').replace(/_/g, ' '))
      .sort();

    const rustAllSubskills = [
      'arcana',
      'dungeoneering',
      'engineering',
      'items',
      'local',
      'nature',
      'planes',
      'souls',
    ];
    const isRustAll =
      rustAllSubskills.length === subskills.length &&
      rustAllSubskills.every((s) => subskills.includes(s));

    if (isRustAll) {
      formatted.push('Knowledge (all kinds, taken individually)');
    } else {
      formatted.push(`Knowledge (${subskills.join(', ')})`);
    }
  }

  return formatted.sort().join(', ');
}

function formatSkillName(skill: RiseSkill): string {
  return skillName(skill);
}
