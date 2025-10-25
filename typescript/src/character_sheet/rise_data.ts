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

export type RiseCreatureType =
  | 'aberration'
  | 'animate'
  | 'dragon'
  | 'mortal'
  | 'planeforged'
  | 'undead';
export type RiseRole = 'Brute' | 'Skirmisher' | 'Warrior' | 'Sniper' | 'Mystic' | 'Leader';
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
  | 'mystic' // TODO: remove mystic, since it is no longer supported
  | 'skirmisher'
  | 'sniper'
  | 'warrior';

// All lowercase to match the values in creation_page.py
export type RiseSize =
  | 'fine'
  | 'diminuitive'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge'
  | 'gargantuan'
  | 'colossal';

// TODO: list all debuffs if we ever actually care
export type RiseDebuff = 'climbing';

export type RiseAttribute =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'perception'
  | 'willpower';
export type RiseAttributeModifier =
  | 'strength_at_creation'
  | 'strength_level_scaling'
  | 'dexterity_at_creation'
  | 'dexterity_level_scaling'
  | 'constitution_at_creation'
  | 'constitution_level_scaling'
  | 'intelligence_at_creation'
  | 'intelligence_level_scaling'
  | 'perception_at_creation'
  | 'perception_level_scaling'
  | 'willpower_at_creation'
  | 'willpower_level_scaling';
// TODO: make these consistent; it's weird that only armor has the '_defense' suffix
export type RiseDefense = 'armor_defense' | 'brawn' | 'fortitude' | 'reflex' | 'mental';

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

export type RiseSpecialDefense = 'immune' | 'impervious' | 'vulnerable';

// TODO: list them all individually?
export type RiseTag = RiseAbilityTag | RiseWeaponTag;
export type RiseAbilityTag = string;
export type RiseWeaponTag = string;

// We need this to be a list to autodefine the RiseTrait type, but we want to export a Set
// instead of a List.
const RISE_TRAITS_LIST = [
  'amphibious',
  'amorphous',
  'animal',
  'blindsense',
  'blindsight',
  'construct',
  'darkvision',
  'floating',
  'humanoid',
  'impervious',
  'immune',
  'incorporeal',
  'indwelt',
  'intangible',
  'invisible',
  'legless',
  'lifesense',
  'lifesight',
  'low-light vision',
  'mindless',
  'multipedal',
  'nonliving',
  'plant',
  'quadrupedal',
  'scent',
  'sightless',
  'simple-minded',
  'soulless',
  'telepathy',
  'tremorsense',
  'tremorsight',
  'vulnerable',
] as const;
export type RiseTrait = (typeof RISE_TRAITS_LIST)[number];
export const RISE_TRAITS = new Set(RISE_TRAITS_LIST);

export function isTrait(text: string): text is RiseTrait {
  return RISE_TRAITS.has(text as RiseTrait);
}
