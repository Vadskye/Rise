import { Attribute } from './attributes';

export enum SkillCategory {
  Movement = 'movement',
  Other = 'other',
  Senses = 'senses',
  Social = 'social',
}

export const RISE_MOVEMENT_SKILLS = [
  'climb',
  'jump',
  'swim',
  'balance',
  'flexibility',
  'ride',
  'stealth',
] as const;
export type RiseMovementSkill = (typeof RISE_MOVEMENT_SKILLS)[number];

export const RISE_SENSE_SKILLS = ['awareness', 'deduction'] as const;
export type RiseSenseSkill = (typeof RISE_SENSE_SKILLS)[number];

export const RISE_SOCIAL_SKILLS = [
  'deception',
  'disguise',
  'intimidate',
  'perform',
  'social_insight',
  'persuasion',
] as const;
export type RiseSocialSkill = (typeof RISE_SOCIAL_SKILLS)[number];

export const RISE_CRAFT_SKILLS = [
  'craft_alchemy',
  'craft_bone',
  'craft_ceramics',
  'craft_leather',
  'craft_manuscripts',
  'craft_metal',
  'craft_poison',
  'craft_stone',
  'craft_textiles',
  'craft_traps',
  'craft_wood',
  'craft_untrained',
] as const;
export type RiseCraftSkill = (typeof RISE_CRAFT_SKILLS)[number];

export const RISE_KNOWLEDGE_SKILLS = [
  'knowledge_arcana',
  'knowledge_dungeoneering',
  'knowledge_engineering',
  'knowledge_items',
  'knowledge_local',
  'knowledge_nature',
  'knowledge_planes',
  'knowledge_religion',
  'knowledge_souls',
  'knowledge_untrained',
] as const;
export type RiseKnowledgeSkill = (typeof RISE_KNOWLEDGE_SKILLS)[number];

export const RISE_OTHER_SKILLS = [
  ...RISE_CRAFT_SKILLS,
  ...RISE_KNOWLEDGE_SKILLS,
  'creature_handling',
  'devices',
  'endurance',
  'medicine',
  'sleight_of_hand',
  'survival',
  'profession',
] as const;
export type RiseOtherSkill = (typeof RISE_OTHER_SKILLS)[number];

export const RISE_SKILLS = [
  ...RISE_MOVEMENT_SKILLS,
  ...RISE_SENSE_SKILLS,
  ...RISE_SOCIAL_SKILLS,
  ...RISE_OTHER_SKILLS,
] as const;
export type RiseSkill = (typeof RISE_SKILLS)[number];

export type RiseJumpDistance =
  | 'combined_jump_distance'
  | 'horizontal_jump_distance'
  | 'vertical_jump_distance';

// Alias for backward compatibility/clarity
export type Skill = RiseSkill;
export type KnowledgeSubskill = RiseKnowledgeSkill;

export interface SkillMetadata {
  attribute: Attribute | null;
  category: SkillCategory;
}

export const SKILL_METADATA: Record<Skill, SkillMetadata> = {
  awareness: { attribute: 'perception', category: SkillCategory.Senses },
  balance: { attribute: 'dexterity', category: SkillCategory.Movement },
  climb: { attribute: 'strength', category: SkillCategory.Movement },
  craft_alchemy: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_bone: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_ceramics: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_leather: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_manuscripts: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_metal: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_poison: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_stone: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_textiles: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_traps: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_wood: { attribute: 'intelligence', category: SkillCategory.Other },
  craft_untrained: { attribute: 'intelligence', category: SkillCategory.Other },
  creature_handling: { attribute: 'perception', category: SkillCategory.Other },
  deception: { attribute: 'perception', category: SkillCategory.Social },
  deduction: { attribute: 'intelligence', category: SkillCategory.Other },
  devices: { attribute: 'intelligence', category: SkillCategory.Other },
  disguise: { attribute: 'intelligence', category: SkillCategory.Social },
  endurance: { attribute: 'constitution', category: SkillCategory.Other },
  flexibility: { attribute: 'dexterity', category: SkillCategory.Movement },
  intimidate: { attribute: null, category: SkillCategory.Social },
  jump: { attribute: 'strength', category: SkillCategory.Movement },
  knowledge_arcana: { attribute: 'intelligence', category: SkillCategory.Other },
  knowledge_dungeoneering: { attribute: 'intelligence', category: SkillCategory.Other },
  knowledge_engineering: { attribute: 'intelligence', category: SkillCategory.Other },
  knowledge_items: { attribute: 'intelligence', category: SkillCategory.Other },
  knowledge_local: { attribute: 'intelligence', category: SkillCategory.Other },
  knowledge_nature: { attribute: 'intelligence', category: SkillCategory.Other },
  knowledge_planes: { attribute: 'intelligence', category: SkillCategory.Other },
  knowledge_religion: { attribute: 'intelligence', category: SkillCategory.Other },
  knowledge_souls: { attribute: 'intelligence', category: SkillCategory.Other },
  knowledge_untrained: { attribute: 'intelligence', category: SkillCategory.Other },
  medicine: { attribute: 'intelligence', category: SkillCategory.Other },
  perform: { attribute: 'dexterity', category: SkillCategory.Social },
  persuasion: { attribute: 'perception', category: SkillCategory.Social },
  profession: { attribute: null, category: SkillCategory.Other },
  ride: { attribute: 'dexterity', category: SkillCategory.Movement },
  sleight_of_hand: { attribute: 'dexterity', category: SkillCategory.Other },
  social_insight: { attribute: 'perception', category: SkillCategory.Social },
  stealth: { attribute: 'dexterity', category: SkillCategory.Movement },
  survival: { attribute: 'perception', category: SkillCategory.Other },
  swim: { attribute: 'strength', category: SkillCategory.Movement },
};

export function isSkill(text: string): text is RiseSkill {
  return (RISE_SKILLS as readonly string[]).includes(text);
}

export function getSkillAttribute(skill: RiseSkill): Attribute | null {
  return SKILL_METADATA[skill].attribute;
}

export function getSkillCategory(skill: RiseSkill): SkillCategory {
  return SKILL_METADATA[skill].category;
}
