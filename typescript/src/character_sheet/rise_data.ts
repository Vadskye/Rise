export type RiseAlignment =
  | 'lawful good'
  | 'neutral good'
  | 'chaotic good'
  | 'lawful neutral'
  | 'neutral'
  | 'chaotic neutral'
  | 'lawful evil'
  | 'neutral evil'
  | 'chaotic evil';

export type RiseCreatureOrigin = 'artificial' | 'natural' | 'undead';
export type RiseCreatureType =
  | 'aberration'
  | 'animal'
  | 'beast'
  | 'construct'
  | 'dragon'
  | 'fey'
  | 'ghost'
  | 'humanoid'
  | 'indwelt'
  | 'insect'
  | 'ooze'
  | 'plant'
  | 'soulforged';
export type RiseRole = 'Brute' | 'Skirmisher' | 'Warrior' | 'Sniper' | 'Leader';
export type RiseBaseClass =
  | 'barbarian'
  | 'cleric'
  | 'druid'
  | 'fighter'
  | 'monk'
  | 'paladin'
  | 'ranger'
  | 'rogue'
  | 'sorcerer'
  | 'votive'
  | 'wizard'
  | 'hybrid'
  | 'automaton'
  | 'awakened'
  | 'changeling'
  | 'dragon'
  | 'drow'
  | 'dryad'
  | 'eladrin'
  | 'harpy'
  | 'incarnation'
  | 'kit'
  | 'naiad'
  | 'oozeborn'
  | 'orc'
  | 'tiefling'
  | 'treant'
  | 'troll'
  | 'vampire'
  | 'brute'
  | 'leader'
  | 'skirmisher'
  | 'sniper'
  | 'warrior';

// All lowercase to match the values in creation_page.py
export type RiseSize =
  | 'fine'
  | 'diminutive'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge'
  | 'gargantuan'
  | 'colossal';

// TODO: list all debuffs if we ever actually care
export type RiseDebuff = 'climbing';

export * from '../core_mechanics/attributes';

export type RiseJumpDistance =
  | 'combined_jump_distance'
  | 'horizontal_jump_distance'
  | 'vertical_jump_distance';

export type RiseMovementSkill = (typeof RISE_MOVEMENT_SKILLS)[number];
export const RISE_MOVEMENT_SKILLS = [
  'climb',
  'jump',
  'swim',
  'balance',
  'flexibility',
  'ride',
  'stealth',
] as const;

export type RiseSenseSkill = (typeof RISE_SENSE_SKILLS)[number];
export const RISE_SENSE_SKILLS = ['awareness', 'deduction'] as const;

export type RiseSocialSkill = (typeof RISE_SOCIAL_SKILLS)[number];
export const RISE_SOCIAL_SKILLS = [
  'deception',
  'disguise',
  'intimidate',
  'perform',
  'social_insight',
  'persuasion',
] as const;

export type RiseCraftSkill = (typeof RISE_CRAFT_SKILLS)[number];
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

export type RiseKnowledgeSkill = (typeof RISE_KNOWLEDGE_SKILLS)[number];
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

// TODO: add perform subskills; they aren't supported properly on the sheet either
export type RiseOtherSkill = (typeof RISE_OTHER_SKILLS)[number];
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

export type RiseSkill = (typeof RISE_SKILLS)[number];
export const RISE_SKILLS = [
  ...RISE_MOVEMENT_SKILLS,
  ...RISE_SENSE_SKILLS,
  ...RISE_SOCIAL_SKILLS,
  ...RISE_OTHER_SKILLS,
] as const;

export type RiseSpecialDefense = 'immune' | 'resistant' | 'vulnerable';

// TODO: list them all individually?
export type RiseTag = RiseAbilityTag | RiseWeaponTag;
export type RiseAbilityTag = string;
export type RiseWeaponTag = string;

// We need this to be a list to autodefine the RiseTrait type, but we want to export a Set
// instead of a List.
const RISE_TRAITS_LIST = [
  'amphibious',
  'blooded',
  'bloodless',
  'corporeal',
  'dynamic',
  'ensouled',
  'floating',
  'immortal',
  'incorporeal',
  'invisible',
  'legless',
  'living',
  'mindless',
  'mortal',
  'multipedal',
  'nonliving',
  'quadrupedal',
  'scent',
  'sighted',
  'sightless',
  'simple-minded',
  'soulless',
  'static',
  'swarm',
  'telepathy',
] as const;
export type RiseTrait = (typeof RISE_TRAITS_LIST)[number];
export const RISE_TRAITS = new Set(RISE_TRAITS_LIST);

export function isTrait(text: string): text is RiseTrait {
  return RISE_TRAITS.has(text as RiseTrait);
}
