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

export * from '../core_mechanics/skills';

export type RiseSpecialDefense = 'immune' | 'resistant' | 'vulnerable';

export type RiseTag = RiseAbilityTag | RiseWeaponTag;
export type RiseAbilityTag =
  | 'Acid'
  | 'Air'
  | 'Attune'
  | 'Attune (deep)'
  | 'Auditory'
  | 'Barrier'
  | 'Blood'
  | 'Brawling'
  | 'Cold'
  | 'Compulsion'
  | 'Creation'
  | 'Curse'
  | 'Detection'
  | 'Earth'
  | 'Electricity'
  | 'Emotion'
  | 'Fire'
  | 'Impact'
  | 'Keen'
  | 'Life'
  | 'Manifestation'
  | 'Physical'
  | 'Poison'
  | 'Ritual'
  | 'Scrying'
  | 'Size-Based'
  | 'Soul'
  | 'Speech'
  | 'Spell'
  | 'Subdual'
  | 'Subtle'
  | 'Sustain (attunable, minor)'
  | 'Sustain (attunable, standard)'
  | 'Sustain (minor)'
  | 'Sustain (standard)'
  | 'Sweeping (1)'
  | 'Sweeping (2)'
  | 'Sweeping (3)'
  | 'Sweeping (4)'
  | 'Sweeping (5)'
  | 'Sweeping (6)'
  | 'Sweeping (7)'
  | 'Trap'
  | 'Visual'
  | 'Water';

export type RiseWeaponTag =
  | 'Ammunition'
  | 'Bow'
  | 'Clinch'
  | 'Compact'
  | 'Heavy'
  | 'Impact'
  | 'Keen'
  | 'Light'
  | 'Long'
  | 'Maneuverable'
  | 'Mounted'
  | 'Parrying'
  | 'Projectile (90/270)'
  | 'Resonating'
  | 'Subdual'
  | 'Sweeping (1)'
  | 'Sweeping (2)'
  | 'Sweeping (3)'
  | 'Sweeping (4)'
  | 'Sweeping (5)'
  | 'Sweeping (6)'
  | 'Sweeping (7)'
  | 'Thrown (30/60)'
  | 'Thrown (60/120)'
  | 'Thrown (90/180)'
  | 'Versatile Grip'
  | 'Versatile Stance';

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
