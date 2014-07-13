
STRENGTH = 'strength'
STR = STRENGTH
DEXTERITY = 'dexterity' 
DEX = DEXTERITY
CONSTITUTION = 'constitution'
CON = CONSTITUTION
INTELLIGENCE = 'intelligence'
INT = INTELLIGENCE
WISDOM = 'wisdom'
WIS = WISDOM
CHARISMA = 'charisma'
CHA = CHARISMA
ATTRIBUTE_NAMES = (STRENGTH, DEXTERITY, CONSTITUTION, INTELLIGENCE,
        WISDOM, CHARISMA)
ATTRIBUTES = ATTRIBUTE_NAMES

ARMOR = 'armor'
SHIELD = 'shield'
DODGE = 'dodge'
NATURAL = 'natural armor'
MISC = 'misc'
AC_MODIFIERS = [ARMOR, SHIELD, DODGE, NATURAL, MISC]

AC_NORMAL = 'normal'
AC_TOUCH = 'touch'
AC_FLAT = 'flat-footed'
AC_TYPES = [AC_NORMAL, AC_TOUCH, AC_FLAT]

FORTITUDE = 'fortitude'
FORT = FORTITUDE
REFLEX = 'reflex'
REF = REFLEX
WILL = 'will'
SAVE_NAMES = [FORTITUDE, REFLEX, WILL]
SAVES = SAVE_NAMES

WEAPON_DAMAGE = 'damage'
WEAPON_ENCUMBRANCE = 'encumbrance'
WEAPON_FEATURES = [WEAPON_DAMAGE, WEAPON_ENCUMBRANCE]

ARMOR_BONUS = 'ac bonus'
ARMOR_ENCUMBRANCE = 'encumbrance'
ARMOR_CHECK = 'check penalty'
ARMOR_ASF = 'arcane spell failure'
ARMOR_FEATURES = [ARMOR_BONUS, ARMOR_ENCUMBRANCE, ARMOR_CHECK, ARMOR_ASF]
ARMOR_TYPE_BODY = 'body'
ARMOR_TYPE_SHIELD = 'shield'

ENCUMBRANCE_LIGHT = 'light'
ENCUMBRANCE_MEDIUM = 'medium'
ENCUMBRANCE_HEAVY = 'heavy'
ENCUMBRANCE_DOUBLE = 'double'
ENCUMBRANCE_NONE = 'none'

ATTACK_TYPE_MELEE = 'melee'
ATTACK_TYPE_PROJECTILE = 'projectile'
ATTACK_TYPE_THROWN = 'thrown'
ATTACK_TYPE_SPECIAL = 'special'

GOOD = 'good'
AVERAGE = 'average'
AVG = AVERAGE
POOR = 'poor'

SIZE_FINE = 'fine'
SIZE_DIMINUITIVE = 'diminuitive'
SIZE_TINY = 'tiny'
SIZE_SMALL = 'small'
SIZE_MEDIUM = 'medium'
SIZE_LARGE = 'large'
SIZE_HUGE = 'huge'
SIZE_GARGANTUAN = 'gargantuan'
SIZE_COLOSSAL = 'colossal'
SIZES = [SIZE_FINE, SIZE_DIMINUITIVE, SIZE_TINY, SIZE_MEDIUM, SIZE_LARGE,
        SIZE_HUGE, SIZE_GARGANTUAN, SIZE_COLOSSAL]

DAMAGE_PHYSICAL = 'physical'
DAMAGE_SLASHING = 'slashing'
DAMAGE_PIERCING = 'piercing'
DAMAGE_BLUDGEONING = 'bludgeoning'
DAMAGE_ACID = 'acid'
DAMAGE_COLD = 'cold'
DAMAGE_ELECTRICITY = 'electricity'
DAMAGE_FIRE = 'fire'

ABILITY = 'ability'
ABILITY_TEMPLATE = 'template'
ABILITY_FEAT = 'feat'
ABILITY_TRAIT = 'trait'
ABILITY_TYPES = set((ABILITY, ABILITY_TEMPLATE, ABILITY_FEAT, ABILITY_TRAIT))

WEAPON_PRIMARY = 'primary weapon'
WEAPON_SECONDARY = 'secondary weapon'
WEAPONS = (WEAPON_PRIMARY, WEAPON_SECONDARY)
AC = 'armor class'
MC = 'maneuver class'
NAME = 'name'
CLASS_NAME = 'class name'
ATTACK_BONUS = 'attack bonus'
MANEUVER_BONUS = 'maneuver bonus'
LEVEL = 'level'
LEVEL_PROGRESSION = 'level progression'
ALIGNMENT = 'alignment'
ABILITIES = 'abilities'
HIT_POINTS = 'hit points'
HIT_VALUE = 'hit value'
INITIATIVE = 'initiative'
REACH = 'reach'
SPACE = 'space'
SPEED = 'speed'
SIZE = 'size'
VERBOSE = 'verbose'
DAMAGE_REDUCTION = 'damage reduction'
DR = DAMAGE_REDUCTION
DAMAGE = 'damage'

BARBARIAN = 'barbarian'
CLERIC = 'cleric'
DRUID = 'druid'
FIGHTER = 'fighter'
MONK = 'monk'
PALADIN = 'paladin'
RANGER = 'ranger'
ROGUE = 'rogue'
SPELLWARPED = 'spellwarped'
SORCERER = 'sorcerer'
WIZARD = 'wizard'
PC_CLASSES = (BARBARIAN, CLERIC, DRUID, FIGHTER, MONK, PALADIN, RANGER, ROGUE, SPELLWARPED, SORCERER, WIZARD)
GENERIC = 'generic'
WARRIOR = 'warrior'

ANIMAL = 'animal'
ABERRATION = 'aberration'
CONSTRUCT = 'construct'
DRAGON = 'dragon'
FEY = 'fey'
HUMANOID = 'humanoid'
MAGICAL_BEAST = 'magical beast'
MONSTROUS_HUMANOID = 'monstrous humanoid'
OOZE = 'ooze'
OUTSIDER = 'outsider'
PLANT = 'plant'
UNDEAD = 'undead'

ENDLINE = '\\par\n'
