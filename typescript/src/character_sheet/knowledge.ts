import {
  RiseCreatureOrigin,
  RiseCreatureType,
  RiseKnowledgeSkill,
  RiseTrait,
} from '@src/character_sheet/rise_data';

export const KNOWLEDGE_BY_ORIGIN: Record<RiseCreatureOrigin, RiseKnowledgeSkill> = {
  artificial: 'knowledge_arcana',
  natural: 'knowledge_nature',
  undead: 'knowledge_souls',
};

export const KNOWLEDGE_BY_TYPE: Record<RiseCreatureType, RiseKnowledgeSkill> = {
  aberration: 'knowledge_souls',
  animal: 'knowledge_nature',
  beast: 'knowledge_nature',
  construct: 'knowledge_arcana',
  dragon: 'knowledge_arcana',
  fey: 'knowledge_nature',
  ghost: 'knowledge_souls',
  humanoid: 'knowledge_local',
  indwelt: 'knowledge_souls',
  insect: 'knowledge_nature',
  ooze: 'knowledge_dungeoneering',
  plant: 'knowledge_nature',
  soulforged: 'knowledge_souls',
};
