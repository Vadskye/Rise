import { RiseSkill, RiseKnowledgeSkill } from '../character_sheet/rise_data';
import { Attribute } from './core';

export type Skill = RiseSkill;

export enum SkillCategory {
  Movement = 'movement',
  Other = 'other',
  Senses = 'senses',
  Social = 'social',
}

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
