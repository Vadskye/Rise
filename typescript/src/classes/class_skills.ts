import { Class } from './types';
import { RiseSkill, SKILL_METADATA } from '../core_mechanics/skills';
import { RISE_ATTRIBUTES } from '../core_mechanics/attributes';
import { skillName } from '../latex/format/skill_name';

export function getClassSkills(cls: Class): RiseSkill[] {
  switch (cls) {
    case 'Automaton':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'deduction',
        'devices',
        'disguise',
        'endurance',
        'jump',
        'knowledge_engineering',
        'knowledge_items',
      ];
    case 'Barbarian':
      return [
        'awareness',
        'balance',
        'climb',
        'creature_handling',
        'deception',
        'endurance',
        'flexibility',
        'intimidate',
        'jump',
        'medicine',
        'persuasion',
        'ride',
        'survival',
        'swim',
      ];
    case 'Cleric':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'knowledge_local',
        'knowledge_planes',
        'knowledge_religion',
        'medicine',
        'persuasion',
        'social_insight',
      ];
    case 'Dragon':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
        'endurance',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'medicine',
        'persuasion',
        'social_insight',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Druid':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
        'disguise',
        'endurance',
        'intimidate',
        'jump',
        'knowledge_dungeoneering',
        'knowledge_items',
        'knowledge_nature',
        'persuasion',
        'ride',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Dryad':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'disguise',
        'flexibility',
        'intimidate',
        'jump',
        'knowledge_arcana',
        'knowledge_nature',
        'medicine',
        'perform',
        'persuasion',
        'social_insight',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Fighter':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'deception',
        'endurance',
        'flexibility',
        'intimidate',
        'jump',
        'knowledge_items',
        'medicine',
        'persuasion',
        'ride',
        'swim',
      ];
    case 'Harpy':
      return [
        'awareness',
        'balance',
        'climb',
        'creature_handling',
        'deception',
        'flexibility',
        'intimidate',
        'jump',
        'perform',
        'persuasion',
        'social_insight',
        'stealth',
        'survival',
      ];
    case 'Incarnation':
      return [
        'climb',
        'craft_untrained',
        'jump',
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
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
        'endurance',
        'flexibility',
        'intimidate',
        'jump',
        'medicine',
        'perform',
        'persuasion',
        'ride',
        'social_insight',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Naiad':
      return [
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
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
        'swim',
      ];
    case 'Oozeborn':
      return [
        'awareness',
        'balance',
        'climb',
        'endurance',
        'flexibility',
        'intimidate',
        'knowledge_dungeoneering',
        'sleight_of_hand',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Paladin':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
        'endurance',
        'intimidate',
        'knowledge_local',
        'knowledge_religion',
        'medicine',
        'persuasion',
        'ride',
        'social_insight',
      ];
    case 'Ranger':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
        'endurance',
        'flexibility',
        'intimidate',
        'jump',
        'knowledge_arcana',
        'knowledge_dungeoneering',
        'knowledge_engineering',
        'knowledge_items',
        'knowledge_local',
        'knowledge_nature',
        'knowledge_planes',
        'knowledge_religion',
        'medicine',
        'persuasion',
        'ride',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Rogue':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'deception',
        'deduction',
        'devices',
        'disguise',
        'flexibility',
        'intimidate',
        'jump',
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
        'swim',
      ];
    case 'Sorcerer':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
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
        'survival',
        'swim',
      ];
    case 'Troll':
      return [
        'awareness',
        'climb',
        'endurance',
        'intimidate',
        'jump',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Vampire':
      return [
        'awareness',
        'balance',
        'climb',
        'creature_handling',
        'deception',
        'deduction',
        'disguise',
        'intimidate',
        'jump',
        'knowledge_dungeoneering',
        'knowledge_religion',
        'persuasion',
        'social_insight',
        'stealth',
      ];
    case 'Votive':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
        'disguise',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'knowledge_planes',
        'knowledge_religion',
        'persuasion',
        'ride',
        'social_insight',
      ];
    case 'Wizard':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
        'devices',
        'intimidate',
        'knowledge_arcana',
        'knowledge_dungeoneering',
        'knowledge_engineering',
        'knowledge_items',
        'knowledge_local',
        'knowledge_nature',
        'knowledge_planes',
        'knowledge_religion',
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
      'religion',
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
