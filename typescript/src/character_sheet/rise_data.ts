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
  | 'animate'
  | 'beast'
  | 'dragon'
  | 'humanoid'
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
  | 'mystic'
  | 'skirmisher'
  | 'sniper'
  | 'warrior';
// First letter is capitalized; this is a value, not a key
export type RiseSize =
  | 'Fine'
  | 'Diminuitive'
  | 'Tiny'
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'Huge'
  | 'Gargantuan'
  | 'Colossal';

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
export type RiseDefense = 'armor_defense' | 'fortitude' | 'reflex' | 'mental';

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
