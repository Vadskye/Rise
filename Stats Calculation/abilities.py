import equipment
import util
import dice
from strings import *

def get_all_abilities():
    feats = {
        'deadly aim': {
            'modifiers': [
                {
                    'modifier_type': 'physical_attacks',
                    'value': lambda c: -util.bab_scale(c.level) if c.strength >= 3 else 0,
                },
                {
                    'modifier_type': 'physical_damage',
                    'value': lambda c: util.bab_scale(c.level) if c.dexterity >= 3 else 0,
                },
            ],
        },
        'defensive fighting': {
            'modifiers': [
                {
                    'modifier_type': 'physical_attacks',
                    'value': lambda c: -util.bab_scale(c.level),
                },
                {
                    'modifier_type': 'armor_defense',
                    'value': lambda c: util.bab_scale(c.level),
                },
            ],
        },
        'great fortitude': {
            'modifiers': [
                {
                    'modifier_type': 'fortitude',
                    'value': 2,
                },
            ],
        },
        'iron will': {
            'modifiers': [
                {
                    'modifier_type': 'will',
                    'value': 2,
                },
            ],
        },
        'lightning reflexes': {
            'modifiers': [
                {
                    'modifier_type': 'reflex',
                    'value': 2,
                },
            ],
        },
        'power attack': {
            'modifiers': [
                {
                    'modifier_type': 'physical_attacks',
                    #'value': lambda c: -util.bab_scale(c.level) if c.strength >= 3 else 0,
                    'value': -2,
                },
                {
                    'modifier_type': 'physical_damage',
                    #'value': power_attack_damage_modifier,
                    'value': 2,
                },
            ],
        },
        'shield expertise': {
            'modifiers': [
                {
                    'modifier_type': 'physical_defenses',
                    'value': lambda c: 1 if c.shield is not None else 0,
                },
            ],
        },
        'swift': {
            'modifiers': [
                {
                    'modifier_type': 'land_speed',
                    'value': 5,
                },
            ],
        },
        'toughness': {
            'modifiers': [
                {
                    'modifier_type': 'hit_points',
                    'value': lambda c: max(3, c.level)
                },
            ],
        },
        'two-weapon defense': {
            'modifiers': [
                {
                    'modifier_type': 'physical_defenses',
                    'value': lambda c: 1 if c.dexterity >= 3
                    and c.primary_weapon is not None
                    and c.secondary_weapon is not None
                    else 0
                },
            ],
        },
        'two-weapon fighting': {
            'modifiers': [
                {
                    'modifier_type': 'physical_attacks',
                    'value': lambda c: 2 if c.dexterity >= 3
                        and c.primary_weapon is not None
                        and c.secondary_weapon is not None
                        else 0
                },
            ],
        },
    }

    class_features = {
        'armor discipline (agility)': {
            'functions': [
                armor_discipline_agility_effect
            ],
        },
        'armor discipline (resilience)': {
            'modifiers': [
                {
                    'modifier_type': 'physical_damage_reduction',
                    'value': lambda c: c.level / 2 if c.level > 5 else 0,
                },
                {
                    'modifier_name': 'attribute_or_progression',
                    'modifier_type': 'armor_defense',
                    'value': lambda c: c.constitution if c.level >=13 else 0,
                },
            ],
        },
        'barbarian damage reduction': {
            'modifiers': [
                {
                    'modifier_type': 'physical_damage_reduction',
                    'value': lambda c: c.level / 2,
                },
            ],
            'text': 'damage reduction',
        },
        'bodily perfection': {
            'modifiers': [
                {
                    'modifier_types': ['strength', 'dexterity', 'constitution'],
                    'value': lambda c: (c.level-1)/6,
                },
            ],
        },
        'danger sense': {
            'modifiers': [
                {
                    'modifier_type': 'initiative',
                    'value': lambda c: (c.level+1)/3 + 1,
                },
            ],
        },
        'divine presence': {
            'modifiers': [
                {
                    'modifier_name': 'willpower',
                    'modifier_type': 'physical_defenses',
                    'value': lambda c: c.willpower / 2,
                },
            ],
        },
        'improved combat style': {
            'modifiers': [
                {
                    'modifier_name': 'perception',
                    'modifier_type': 'physical_damage',
                    'value': lambda c: c.perception / 2 if c.level >= 5 else 0,
                },
            ],
        },
        'ki strike': {
            'modifiers': [
                {
                    'modifier_name': 'enhancement',
                    'modifier_types': ['physical_attacks', 'physical_damage'],
                    'value': lambda c: (c.level-1)/3,
                },
            ],
        },
        'larger than life': {
            'modifiers': [
                {
                    'modifier_type': 'weapon_size',
                    'value': 1,
                },
                {
                    'modifier_type': 'maneuver_defense',
                    'value': 4,
                },
            ],
        },
        'larger than belief': {
            'modifiers': [
                {
                    'modifier_type': 'weapon_size',
                    'value': 1,
                },
                {
                    'modifier_type': 'maneuver_defense',
                    'value': 4,
                },
            ],
        },
        'quarry': {
            'modifiers': [
                {
                    'modifier_type': 'physical_attacks',
                    'value': lambda c: util.std_scale(c.level),
                },
                {
                    'modifier_type': 'physical_defenses',
                    'value': lambda c: util.std_scale(c.level) if c.level >= 5 else 0,
                },
            ],
        },
        'rage': {
            'modifiers': [
                {
                    'modifier_types': ['strength', 'willpower'],
                    'value': lambda c: util.std_scale(c.level),
                },
                {
                    'modifier_type': 'hit_points',
                    'value': lambda c: c.level * util.std_scale(c.level),
                },
                {
                    'modifier_type': 'physical_defenses',
                    'value': -2
                },
            ],
        },
        'sneak attack': {
            'modifiers': [
                {
                    'modifier_type': 'physical_damage',
                    'value': lambda c: ((c.level + 1) / 2) * 3.5,
                },
            ],
        },
        'still mind': {
            'modifiers': [
                {
                    'modifier_name': 'intelligence',
                    'modifier_type': 'will',
                    'value': lambda c: c.perception / 2 if c.level >= 5 else 0,
                },
            ],
        },
        'timeless': {
            'modifiers': [
                {
                    'modifier_types': ['intelligence', 'perception', 'willpower'],
                    'value': lambda c: 1 if c.level >= 15 else 0,
                },
            ],
        },
        'unarmed warrior': {
            'modifiers': [
                {
                    'modifier_type': 'weapon_size',
                    'value': lambda c: 2 if c.primary_weapon.name == 'unarmed' else 0,
                },
            ],
        },
        'unfettered defense': {
            'modifiers': [
                {
                    'modifier_name': 'perception',
                    'modifier_types': ['physical_defenses','reflex'],
                    'value': lambda c: c.perception,
                },
            ],
        },
        'weapon discipline': {
            'modifiers': [
                {
                    'modifier_type': 'physical_attacks',
                    'value': 1,
                },
            ],
        },
        'improved weapon discipline': {
            'modifiers': [
                {
                    'modifier_type': 'physical_attacks',
                    'value': 1,
                },
            ],
        },
    }

    monster_abilities = {
        'ideal': {
            'functions': [
                ideal_effect,
            ]
        },
        'regeneration': {
            'modifiers': [
                {
                    'modifier_type': 'regeneration',
                    'value': lambda c: c.level/2,
                },
            ],
        },
    }

    abilities_without_effects = 'darkvision, enslave, low-light vision, mucus cloud, scent, slime'.split(', ')

    # the generic "abilities" is the combination of all feats, class features, etc.
    # we just store those separately for ease of use
    abilities = feats
    abilities.update(class_features)
    abilities.update(monster_abilities)
    for ability_name in abilities_without_effects:
        abilities[ability_name] = {}
    return abilities

def get_ability_by_name(ability_name):
    try:
        return abilities[ability_name]
    except:
        raise Exception("Could not recognize ability {0}.".format(ability_name))

def get_fundamental_progression_ability_names(name, level):
    ability_names = list()
    if name == 'barbarian':
        ability_names += (
            'barbarian damage reduction',
            'rage',
            'danger sense' if level >= 2 else None,
            'larger than life' if level >= 7 else None,
            'larger than belief' if level >= 17 else None,
        )
    elif name == 'fighter':
        ability_names += (
            'weapon discipline' if level >= 3 else None,
            'improved weapon discipline' if level >=9 else None,
        )
    elif name == 'monk':
        ability_names += (
            'unfettered defense',
            'unarmed warrior',
            'ki strike' if level >= 3 else None,
            'still mind' if level >= 5 else None,
            'bodily perfection' if level >= 7 else None,
            'timeless' if level >= 15 else None,
        )
    elif name == 'paladin':
        ability_names += (
            'divine presence' if level >= 5 else None,
        )
    elif name == 'ranger':
        ability_names += (
            'quarry',
            'improved combat style' if level >= 6 else None,
        )
    elif name == 'rogue':
        ability_names += (
            'sneak attack',
        )
    elif name == 'ideal':
        ability_names += (
            'ideal',
        )
    return [name for name in ability_names if name is not None]

def armor_discipline_agility_effect(creature):
    # adjust armor worn to ensure dex bonus
    if creature.level <= 6 and (
            creature.armor.encumbrance == ENCUMBRANCE_HEAVY
            or creature.armor.encumbrance == ENCUMBRANCE_MEDIUM):
        creature.armor = equipment.Armor.from_armor_name('light')
    if creature.level <= 12 and creature.armor.encumbrance == ENCUMBRANCE_HEAVY:
        creature.armor = equipment.Armor.from_armor_name('medium')

    armor_discipline_count = (creature.level+5)/6
    for i in xrange(1, armor_discipline_count):
        creature.armor.encumbrance = util.lower_encumbrance(
            creature.armor.encumbrance)

####################
#FEATS
####################

def power_attack_damage_modifier(creature):
    if creature.strength < 3:
        return 0
    elif creature.primary_weapon.encumbrance == 'light':
        return util.bab_scale(creature.level) / 2
    else:
        return util.bab_scale(creature.level)

####################
#MONSTER TRAITS
####################

def ideal_effect(creature):
    creature.armor_defense = lambda c: c.level + 17
    creature.remove_modifiers('enhancement')

def natural_grab_text(creature):
    return 'Natural grab (%s) %s' % (util.decrease_size(creature.size).title(),
                                     creature.maneuver_bonus.mstr())

def natural_trip_text(creature):
    return 'Natural trip (%s) %s' % (util.increase_size(creature.size).title(),
                                     creature.maneuver_bonus.mstr())

def natural_weapon_effect(creature):
    creature.primary_weapon.increase_size()

####################
#MONSTER TEMPLATES
####################

def warrior_prerequisites(creature):
    return creature.base_attack_bonus is not None and creature.hit_value is not None
def warrior_effect(creature):
    creature.improve_progression(BAB)
    creature.improve_progression(HIT_VALUE)

def antiwarrior_prerequisites(creature):
    return creature.base_attack_bonus is not None and creature.hit_value is not None
def antiwarrior_effect(creature):
    creature.reduce_progression(BAB)
    creature.reduce_progression(HIT_VALUE)

def brute_prerequisites(creature):
    return creature.fortitude is not None and creature.hit_value is not None
def brute_effect(creature):
    util.improve_hv(creature.get_class_progression())
    util.improve_save(creature.get_class_progression(), FORTITUDE)

def scout_prerequisites(creature):
    return creature.reflex is not None and creature.get_all_speeds() is not None
def scout_effect(creature):
    util.improve_save(creature.get_class_progression(), REFLEX)
    for speed_mode in creature.speed_modes:
        creture.modify_speed(speed_mode, min(10, creature.get_land_speed()))

def incorporeal_effect(creature):
    #add Cha to hit points
    creature.hit_points().add_bonus(creature.level *
                                    creature.willpower, 'cha')
    creature.strength.set_inapplicable()
    creature.constitution.set_inapplicable()
    def incorporeal_defense(damage, damage_types):
        d2 = dice.dx(2)
        if d2.roll() == 1:
            return None
        else:
            return damage
    creature.add_special_defense(incorporeal_defense)

####################
#MONSTER TYPES
####################

abilities = get_all_abilities()
