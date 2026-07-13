import {
  RISE_MOVEMENT_SKILLS,
  RISE_SENSE_SKILLS,
  RISE_SOCIAL_SKILLS,
  RISE_CRAFT_SKILLS,
  RISE_KNOWLEDGE_SKILLS,
  RISE_OTHER_SKILLS,
} from '@src/core_mechanics/skills';

// Dynamically filter out craft and knowledge skills from the "other" list to form the UI's remaining "Other" category.
const craftSet = new Set<string>(RISE_CRAFT_SKILLS);
const knowledgeSet = new Set<string>(RISE_KNOWLEDGE_SKILLS);
const otherSkillsOnly = RISE_OTHER_SKILLS.filter(
  (skill) => !craftSet.has(skill) && !knowledgeSet.has(skill),
);

export const SKILL_CATEGORIES = {
  Movement: Array.from(RISE_MOVEMENT_SKILLS),
  Senses: Array.from(RISE_SENSE_SKILLS),
  Social: Array.from(RISE_SOCIAL_SKILLS),
  Craft: Array.from(RISE_CRAFT_SKILLS),
  Knowledge: Array.from(RISE_KNOWLEDGE_SKILLS),
  Other: otherSkillsOnly,
};

/**
 * Formats a skill identifier into a human-readable label.
 */
export const formatSkillLabel = (skill: string): string => {
  if (skill.startsWith('craft_')) {
    return skill.slice(6).replace(/_/g, ' ');
  }
  if (skill.startsWith('knowledge_')) {
    return skill.slice(10).replace(/_/g, ' ');
  }
  return skill.replace(/_/g, ' ');
};
