import math
from pprint import pprint, PrettyPrinter
from abilities import get_ability_by_name, get_fundamental_progression_ability_names
import equipment
from dice import Dice
import util
from util import d20
import random

modifier_type_mappings = {
    'physical_defenses': ['armor_defense', 'maneuver_defense', 'reflex'],
    'special_defenses': ['fortitude', 'will'],
    'physical_attacks': ['first_physical_attack_bonus', 'second_physical_attack_bonus', 'third_physical_attack_bonus', 'fourth_physical_attack_bonus', 'extra_physical_attack_bonus'],
    'physical_damage': ['primary_weapon_damage', 'secondary_weapon_damage'],
    'weapon_size': ['primary_weapon_size', 'secondary_weapon_size'],
}

valid_modifier_types = set(
    '''armor_defense
    maneuver_defense
    reflex
    fortitude
    will
    hit_points
    strength
    dexterity
    constitution
    intelligence
    wisdom
    charisma
    base_attack_bonus
    special_attack_bonus
    spell_attack_bonus
    caster_level
    first_physical_attack_bonus
    second_physical_attack_bonus
    third_physical_attack_bonus
    fourth_physical_attack_bonus
    extra_physical_attack_bonus
    primary_weapon_damage
    secondary_weapon_damage
    primary_weapon_size
    secondary_weapon_size
    extra_attacks
    physical_damage_reduction
    initiative
'''.split())

def add_base_modifier(key, value, modifiers):
    if key not in modifiers:
        modifiers[key] = dict()
    modifiers[key]['base'] = value

def set_progression_modifier(key, value, modifiers):
    if key not in modifiers:
        modifiers[key] = dict()
    modifiers[key]['progression'] = value

def get_base_progression_modifiers(
    level, base_attack_bonus_progression,
    fortitude_progression, reflex_progression, will_progression,
    hit_value, natural_armor_progression,
    strength_progression, dexterity_progression, constitution_progression,
    intelligence_progression, wisdom_progression, charisma_progression,
):
    return {
        'base_attack_bonus': get_base_attack_bonus_progression_modifier(
            base_attack_bonus_progression, level
        ),
        'fortitude': get_special_defense_progression_modifier(
            fortitude_progression, level
        ),
        'reflex': get_special_defense_progression_modifier(
            reflex_progression, level
        ),
        'will': get_special_defense_progression_modifier(
            will_progression, level
        ),
        'hit_points': level * int(hit_value),
        'natural_armor': get_natural_armor_progression(natural_armor_progression, level),
        'strength': get_attribute_progression(strength_progression, level),
        'dexterity': get_attribute_progression(dexterity_progression, level),
        'constitution': get_attribute_progression(constitution_progression, level),
        'intelligence': get_attribute_progression(intelligence_progression, level),
        'wisdom': get_attribute_progression(wisdom_progression, level),
        'charisma': get_attribute_progression(charisma_progression, level),
    }

def get_base_attack_bonus_progression_modifier(progression_type, level):
    if progression_type == 'good':
        return level
    elif progression_type == 'average':
        return (level * 3) / 4
    elif progression_type == 'poor':
        return level / 2
    else:
        raise Exception("Unrecognized progression type {0}".format(progression_type))

def get_special_defense_progression_modifier(progression_type, level):
    if progression_type == 'good':
        return level + 2
    elif progression_type == 'average':
        return (level * 3) / 4 + 1
    elif progression_type == 'poor':
        return level / 2
    else:
        raise Exception("Unrecognized progression type {0}".format(progression_type))

def get_natural_armor_progression(progression_type, level):
    if progression_type == 'good':
        return level / 2 + 6
    elif progression_type == 'average':
        return level / 3 + 4
    elif progression_type == 'poor':
        return level / 4 + 2
    elif progression_type is None:
        return 0
    else:
        raise Exception("Unrecognized progression type {0}".format(progression_type))

def get_attribute_progression(progression_type, level):
    if progression_type == 'primary':
        return (level+2) / 4
    elif progression_type == 'secondary':
        return level / 4
    elif progression_type == 'extreme':
        return (level * 3) / 4 + 4
    elif progression_type == 'good':
        return level / 2 + 3
    elif progression_type == 'average':
        return level / 3 + 2
    elif progression_type == 'poor':
        return level / 4 + 1
    elif progression_type is None:
        return 0
    else:
        raise Exception("Unrecognized progression type {0}".format(progression_type))

def get_magic_item_modifiers():
    return {
        'physical_attacks': lambda c: min(5, c.level/3),
        'physical_damage': lambda c: min(5, c.level/3),
        'physical_defenses': lambda c: min(5, c.level/3),
    }

class Creature(object):
    def __init__(self,
                 fundamental_progression,
                 race,
                 # meta
                 combat_description = None,
                 description = None,
                 level = None,
                 name = 'Unnamed',
                 # progressions
                 base_attack_bonus_progression = None,
                 fortitude_progression = None,
                 reflex_progression = None,
                 will_progression = None,
                 hit_value = None,
                 natural_armor_progression = None,
                 strength_progression = None,
                 dexterity_progression = None,
                 constitution_progression = None,
                 intelligence_progression = None,
                 wisdom_progression = None,
                 charisma_progression = None,
                 # items
                 primary_weapon = None,
                 secondary_weapon = None,
                 armor = None,
                 shield = None,
                 # attributes
                 strength = None,
                 dexterity = None,
                 constitution = None,
                 intelligence = None,
                 wisdom = None,
                 charisma = None,
                 casting_attribute = None,
                 special_attack_attribute = None,
                 # core
                 size = None,
                 space = None,
                 reach = None,
                 speeds = None,
                 # abilities
                 abilities = None,
                 templates = None,
                 feats = None,
                 traits = None,
                 ):

        self.fundamental_progression = fundamental_progression
        self.race = race

        # base modifiers and progressions
        self._modifiers = dict()
        self.set_default_modifiers()

        self.base_attack_bonus_progression = base_attack_bonus_progression
        self.fortitude_progression = fortitude_progression
        self.reflex_progression = reflex_progression
        self.will_progression = will_progression
        self.hit_value = hit_value
        self.natural_armor_progression = natural_armor_progression
        self.strength_progression = strength_progression
        self.dexterity_progression = dexterity_progression
        self.constitution_progression = constitution_progression
        self.intelligence_progression = intelligence_progression
        self.wisdom_progression = wisdom_progression
        self.charisma_progression = charisma_progression

        # meta 
        self.combat_description = combat_description
        self.description = description
        self.level = level
        self.name = name

        # equipment
        self.primary_weapon = primary_weapon
        self.secondary_weapon = secondary_weapon
        self.armor = armor
        self.shield = shield

        # attributes
        self.add_modifier('strength', 'points', strength)
        self.add_modifier('dexterity', 'points', dexterity)
        self.add_modifier('constitution', 'points', constitution)
        self.add_modifier('intelligence', 'points', intelligence)
        self.add_modifier('wisdom', 'points', wisdom)
        self.add_modifier('charisma', 'points', charisma)
        self.casting_attribute = casting_attribute
        self.special_attack_attribute = special_attack_attribute

        # core
        self.size = size or 'medium'
        self.space = space
        self.reach = reach
        self.speeds = speeds

        # abilities
        self._abilities = dict()
        for ability_name in get_fundamental_progression_ability_names(fundamental_progression, level):
            self.add_ability(ability_name)
        if abilities is not None:
            for ability in abilities:
                self.add_ability(ability)
        if feats is not None:
            for feat in feats:
                self.add_ability(feat)
        if traits is not None:
            for trait in traits:
                self.add_ability(trait)
        if templates is not None:
            for template in templates:
                self.add_ability(template)

        # combat stuff
        self.reset_damage()
        self.used_physical_damage_reduction = 0

        # stuff with dependencies
        self.reset_progression_modifiers()

        #self.abilities = abilities
        #self.feats = feats
        #self.templates = templates
        #self.traits = traits

    def set_default_modifiers(self):
        self.set_modifier('second_physical_attack_bonus', 'base', -5)
        self.set_modifier('third_physical_attack_bonus', 'base', -10)
        self.set_modifier('fourth_physical_attack_bonus', 'base', -15)
        self.set_modifier('fourth_physical_attack_bonus', 'base', -15)

        self.set_modifier(['physical_defenses', 'special_defenses'], 'base', 10)

        self.add_modifier('fortitude', 'constitution', lambda c: c.constitution)
        self.add_modifier('fortitude', 'strength', lambda c: c.strength / 2)
        self.add_modifier('reflex', 'dexterity', lambda c: c.dexterity)
        self.add_modifier('reflex', 'wisdom', lambda c: c.wisdom / 2)
        self.add_modifier('will', 'charisma', lambda c: c.charisma)
        self.add_modifier('will', 'intelligence', lambda c: c.intelligence / 2)

        magic_item_modifiers = get_magic_item_modifiers()
        for modifier_type, value in magic_item_modifiers.items():
            self.set_modifier(modifier_type, 'enhancement', value)

        self.set_modifier('physical_defenses', 'dexterity', lambda c: c.dexterity)
        self.set_modifier('physical_defenses', 'shield', lambda c: c.shield_bonus)
        self.set_modifier('armor_defense', 'base attack bonus', lambda c: c.base_attack_bonus/2)
        self.set_modifier('armor_defense', 'armor', lambda c: c.armor_bonus)
        self.set_modifier('armor_defense', 'size', lambda c: c.size_modifier)
        self.set_modifier('maneuver_defense', 'base attack bonus', lambda c: c.base_attack_bonus)
        self.set_modifier('maneuver_defense', 'strength', lambda c: c.strength)
        self.set_modifier('maneuver_defense', 'size', lambda c: c.special_size_modifier)

        self.set_modifier('physical_defenses', 'overwhelm', -2)

    def add_modifier(self, modifier_types, name, value, is_penalty = False, replace_existing = False):
        modifier_types = util.ensure_list(modifier_types)
        for modifier_type in modifier_types:
            # recurse if handling mapped modifiers
            if modifier_type in modifier_type_mappings:
                self.add_modifier(modifier_type_mappings[modifier_type], name, value)
            else:
                if modifier_type not in valid_modifier_types:
                    raise Exception("Can't add invalid modifier type {0}".format(modifier_type))
                self._modifiers[modifier_type] = self._modifiers.get(modifier_type) or dict()
                
                # check to see how to combine multiple modifier types
                if name in self._modifiers[modifier_type] and not replace_existing:
                    try:
                        # if the value is simply a number, we can use max to keep the
                        # higher value
                        value = int(value)
                        if is_penalty:
                            self._modifiers[modifier_type][name] = min(value, self._modifiers[modifier_type][name])
                        else:
                            self._modifiers[modifier_type][name] = max(value, self._modifiers[modifier_type][name])
                    except TypeError:
                        # if the value is a function, which is common for abilities,
                        # it should replace any non-function values
                        self._modifiers[modifier_type][name] = value
                else:
                    self._modifiers[modifier_type][name] = value

    def set_modifier(self, modifier_types, name, value):
        self.add_modifier(modifier_types, name, value, replace_existing = True)

    def get_modifiers(self, modifier_type, as_dict = False):
        if modifier_type not in valid_modifier_types:
            raise Exception("Can't get invalid modifier type {0}".format(modifier_type))
        modifier = 0
        relevant_modifiers = self._modifiers.get(modifier_type, {})
        if as_dict:
            dict_of_stuff = dict()
            for name in relevant_modifiers:
                try:
                    dict_of_stuff[name] = int(relevant_modifiers[name])
                except TypeError:
                    dict_of_stuff[name] = relevant_modifiers[name](self)
            return dict_of_stuff
        else:
            for name in relevant_modifiers:
                try:
                    modifier += relevant_modifiers[name]
                except TypeError:
                    modifier += relevant_modifiers[name](self)
            return modifier

    def add_ability(self, ability_name):
        # make sure "ability" is actually the Ability object
        ability = get_ability_by_name(ability_name)
        self._abilities[ability_name] = ability
        for modifier in ability.get('modifiers', []):
            self.add_modifier(
                modifier.get('modifier_type') or modifier.get('modifier_types'),
                modifier.get('modifier_name') or ability_name,
                modifier['value'],
            )
        for function in ability.get('functions', []):
            function(self)

    def get_ability(self, ability_name):
        return self._abilities.get(ability_name)

    def get_ability_names_by_tag(self, tag):
        ability_names = list()
        for ability in self.abilities:
            if ability.has_tag(tag):
                ability_names.append(ability)
        return ability_names

    @property
    def abilities(self):
        return self._abilities

    @property
    def ability_names(self):
        return [self.get_ability(name).get('text') or name for name in self._abilities.keys()]

    @property
    def feat_names(self):
        return self.get_ability_names_by_tag('feat')

    @property
    def trait_names(self):
        return self.get_ability_names_by_tag('trait')

    @property
    def level(self):
        return self._level

    # when we change level, all the default progressions change
    @level.setter
    def level(self, value):
        self._level = value
        self.reset_progression_modifiers()

    @property
    def caster_level(self):
        return self.get_modifiers('caster_level') + self.level

    def reset_progression_modifiers(self):
        base_progression_modifiers = get_base_progression_modifiers(
            self.level, self.base_attack_bonus_progression, self.fortitude_progression,
            self.reflex_progression, self.will_progression, self.hit_value, self.natural_armor_progression,
            self.strength_progression, self.dexterity_progression, self.constitution_progression,
            self.intelligence_progression, self.wisdom_progression, self.charisma_progression,
        )
        for progression_type, value in base_progression_modifiers.items():
            # natural armor is just a particular name of a bonus to armor_defense
            if progression_type == 'natural_armor':
                self.set_modifier('armor_defense', progression_type, value)
            else:
                self.set_modifier(progression_type, 'progression', value)

    @property
    def hit_points(self):
        return self.get_modifiers('hit_points') + ((self.constitution / 2) * self.level)

    @property
    def current_hit_points(self):
        return self.hit_points - self.damage

    def reset_damage(self):
        self.damage = 0
        self.critical_damage = 0

    @property
    def is_active(self):
        return self.current_hit_points > 0

    @property
    def base_attack_bonus(self):
        return self.get_modifiers('base_attack_bonus')

    @property
    def attacks_per_round(self):
        return sum([
            1,
            max(0, (self.base_attack_bonus - 1) / 5),
            self.get_modifiers('extra_attacks')
        ])

    @property
    def special_attack_bonus(self):
        return sum([
            self.get_modifiers('special_attack_bonus'),
            self.level,
            self.special_attack_attribute,
        ])

    @property
    def spell_attack_bonus(self):
        return sum([
            self.get_modifiers('spell_attack_bonus'),
            self.caster_level / 2,
            self.casting_attribute,
        ])

    @property
    def attack_bonus(self):
        return self.get_physical_attack_bonus('first')

    def get_physical_attack_bonus(self, attack_number):
        return sum([
            self.base_attack_bonus,
            self.attack_attribute,
            self.get_modifiers(attack_number + '_physical_attack_bonus'),
            self.size_modifier,
        ])

    @property
    def physical_attack_progression(self):
        attack_bonuses = list()
        attacks_from_bab = 1 + max(0, (self.base_attack_bonus - 1) / 5)  
        attack_bonuses.append(self.get_physical_attack_bonus('first'))
        if attacks_from_bab > 1:
            attack_bonuses.append(self.get_physical_attack_bonus('second'))
        if attacks_from_bab > 2:
            third = attack_bonuses.append(self.get_physical_attack_bonus('third'))
        if attacks_from_bab > 3:
            fourth = attack_bonuses.append(self.get_physical_attack_bonus('fourth'))
        for i in xrange(self.get_modifiers('extra_attacks')):
            attack_bonuses.append(self.get_physical_attack_bonus('extra'))
        return attack_bonuses

    @property
    def attack_attribute(self):
        if self.primary_weapon is None or self.primary_weapon.encumbrance == 'light':
            return max(self.strength, self.dexterity)
        elif self.primary_weapon.encumbrance in ('medium', 'heavy'):
            return self.strength
        else:
            raise Exception("Unable to identify attack attribute")

    @property
    def primary_weapon_damage_bonus(self):
        if self.primary_weapon is None:
            return None
        return self.get_modifiers('primary_weapon_damage') + self.strength / 2

    @property
    def primary_weapon_damage_die(self):
        if self.primary_weapon is None:
            return None
        return self.primary_weapon.damage_die + self.get_modifiers('primary_weapon_size')

    @property
    def secondary_weapon_damage_bonus(self):
        if self.secondary_weapon is None:
            return None
        return self.get_modifiers('secondary_weapon_damage') + self.strength / 2

    @property
    def secondary_weapon_damage_die(self):
        if self.secondary_weapon is None:
            return None
        return self.secondary_weapon.damage_die + self.get_modifiers('secondary_weapon_size')

    @property
    def physical_attack_damage(self):
        if self.primary_weapon is not None:
            primary_damage = self.primary_weapon_damage_die.roll() + self.primary_weapon_damage_bonus
        else:
            primary_damage = 0
        if self.secondary_weapon is not None:
            secondary_damage = self.secondary_weapon_damage_die.roll() + self.secondary_weapon_damage_bonus
        else:
            secondary_damage = 0
        return max(primary_damage, secondary_damage)

    @property
    def encumbrance(self):
        if self.armor is None:
            return None
        else:
            return self.armor.encumbrance

    @property
    def armor_bonus(self):
        if self.armor is None:
            return 0
        else:
            return self.armor.ac_bonus

    @property
    def shield_bonus(self):
        if self.shield is None:
            return 0
        else:
            return self.shield.ac_bonus

    @property
    def armor_defense(self):
        return self.get_modifiers('armor_defense')

    @property
    def maneuver_defense(self):
        return self.get_modifiers('maneuver_defense')

    @property
    def fortitude(self):
        return self.get_modifiers('fortitude')

    @property
    def reflex(self):
        return self.get_modifiers('reflex')

    @property
    def will(self):
        return self.get_modifiers('will')

    @property
    def attributes(self):
        return [
            self.strength,
            self.dexterity,
            self.constitution,
            self.intelligence,
            self.wisdom,
            self.charisma
        ]

    @property
    def strength(self):
        return self.get_modifiers('strength')

    @property
    def dexterity(self):
        base_dexterity = self.get_modifiers('dexterity')
        if self.encumbrance in ('medium', 'heavy'):
            return base_dexterity / 2
        else:
            return base_dexterity

    @property
    def constitution(self):
        return self.get_modifiers('constitution')

    @property
    def intelligence(self):
        return self.get_modifiers('intelligence')

    @property
    def wisdom(self):
        return self.get_modifiers('wisdom')

    @property
    def charisma(self):
        return self.get_modifiers('charisma')

    @property
    def casting_attribute(self):
        if self._casting_attribute_name is None:
            return None
        else:
            return getattr(self, self._casting_attribute_name)

    @casting_attribute.setter
    def casting_attribute(self, value):
        self._casting_attribute_name = value

    @property
    def special_attack_attribute(self):
        if self._special_attack_attribute_name is None:
            return None
        else:
            return getattr(self, self._special_attack_attribute_name)

    @special_attack_attribute.setter
    def special_attack_attribute(self, value):
        self._special_attack_attribute_name = value

    @property
    def size(self):
        return self._size

    @size.setter
    def size(self, value):
        self._size = value
        if self.primary_weapon is not None:
            self.primary_weapon.set_size(value)
        if self.secondary_weapon is not None:
            self.secondary_weapon.set_size(value)

    @property
    def size_modifier(self):
        return {
            'fine': 8,
            'diminuitive': 4,
            'tiny': 2,
            'small': 1,
            'medium': 0,
            'large': -1,
            'huge': -2,
            'gargantuan': -4,
            'colossal': -8,
        }[self.size]

    @property
    def special_size_modifier(self):
        return {
            'fine': -16,
            'diminuitive': -12,
            'tiny': -8,
            'small': -4,
            'medium': 0,
            'large': 4,
            'huge': 8,
            'gargantuan': 12,
            'colossal': 16,
        }[self.size]

    @property
    def space(self):
        if self._space is None:
            return util.default_space(self.size)
        else:
            return self._space

    @space.setter
    def space(self, value):
        self._space = value

    @property
    def reach(self):
        if self._reach is None:
            return util.default_reach(self.size)
        else:
            return self._reach

    @reach.setter
    def reach(self, value):
        self._reach = value

    @property
    def speeds(self):
        if self._speeds is None:
            return {
                'land': util.default_land_speed(self.size)
            }
        else:
            return self._speeds

    @speeds.setter
    def speeds(self, value):
        self._speeds = value

    @property
    def has_special_attacks(self):
        return self.special_attack_attribute is not None

    @property
    def has_spells(self):
        return self.casting_attribute is not None

    @property
    def initiative(self):
        return self.get_modifiers('initiative')

    @property
    def physical_damage_reduction(self):
        return self.get_modifiers('physical_damage_reduction')

    def apply_damage_reduction(self, damage, damage_type):
        if damage_type == 'physical':
            reduction_amount = min(damage, self.physical_damage_reduction - self.used_physical_damage_reduction)
            damage -= reduction_amount
            self.used_physical_damage_reduction += reduction_amount
        return damage

    # define actions the creature can take

    @property
    def attack_mode(self):
        return 'physical'

    def attack(self, creature):
        if self.attack_mode == 'physical':
            attack_type = 'physical'
            for attack_bonus in self.physical_attack_progression:
                attack_result = d20.roll() + attack_bonus
                if creature.is_hit(attack_result, attack_type):
                    creature.take_damage(self.physical_attack_damage, attack_type)
        else:
            raise Exception("Creature {0} does not have attack mode {1}".format(self.name, self.attack_mode))
                    
    def is_hit(self, attack_result, attack_type):
        return attack_result >= self.get_defense_against_attack(attack_type)

    def get_defense_against_attack(self, attack_type):
        if attack_type == 'physical':
            return self.armor_defense
        elif attack_type == 'maneuver':
            return self.maneuver_defense
        else:
            raise Exception("Creature {0} does not have defense against attack type {1}".format(self.name, attack_type))

    def take_damage(self, damage, damage_type):
        damage = self.apply_damage_reduction(damage, damage_type)
        self.damage += damage

    # some effects trigger or reset at the end of a round
    def end_round(self):
        self.used_physical_damage_reduction = 0

    def __str__(self):
        return '{0} {1}\n{2}\n{3}\n{4}\n{5}\n{6}'.format(
            self.name,
            self.level,
            self._to_string_defenses(),
            self._to_string_attacks(),
            self._to_string_attributes(),
            self._to_string_core(),
            self._to_string_abilities(),
        )

    def _to_string_defenses(self):
        text = "[HP] {0}; [Defs] AD {1}, MD {2}; Fort {3}, Ref {4}, Will {5}".format(
            self.hit_points,
            self.armor_defense,
            self.maneuver_defense,
            self.fortitude,
            self.reflex,
            self.will,
        )
        # special defensive abilities
        if self.physical_damage_reduction is not 0:
            text += '\n    [DR] {0}'.format(
                self.physical_damage_reduction
            )
        return text

    def _to_string_attacks(self):
        attack_progression = ', '.join([util.mstr(x) for x in self.physical_attack_progression])
        text = '[Atk] {0}: {1}'.format(
            attack_progression,
            self._to_string_weapon_damage()
        )
        if self.has_special_attacks:
            text += "\n    Special: {0}".format(util.mstr(self.special_attack_bonus))
        if self.has_spells:
            text += "\n    Spells: {0}".format(util.mstr(self.spell_attack_bonus))
        return text

    def _to_string_weapon_damage(self):
        text = ''
        if self.primary_weapon:
            text += '{0}{1}'.format(
                self.primary_weapon_damage_die,
                util.mstr(self.primary_weapon_damage_bonus) or '+0'
            )
        if self.secondary_weapon:
            text += '/{0}{1}'.format(
                self.primary_weapon_damage_die,
                util.mstr(self.primary_weapon_damage_bonus) or '+0'
            )
        return text

    def _to_string_attributes(self):
        text = '[Attr]'
        for attribute in self.attributes:
            text += ' ' + str(attribute)
        return text

    def _to_string_core(self):
        return '[Space] {0}, [Reach] {1}, [Speed] {2}'.format(
            self.space,
            self.reach,
            self._to_string_speeds()
        )

    def _to_string_speeds(self):
        if self.speeds is None:
            return ''
        speed_list = ['%s %s' % (s, self.speeds[s]) for s in self.speeds
                  if self.speeds[s]]
        return ', '.join(speed_list)

    def _to_string_abilities(self):
        text = '[Abil] ' + ', '.join([name.title() for name in sorted(self.ability_names)])
        return text

    @classmethod
    def from_raw_stats(cls, raw_stats, creature_key, stats_override = None):
        if stats_override is not None:
            raw_stats.update(stats_override)

        creature_data = util.parse_creature_data(creature_key, raw_stats)
        try:
            assert creature_data
        except AssertionError:
            raise Exception("Could not find data for " + key)
        equipment_set = equipment.EquipmentSet.from_raw_stats(creature_data)

        attributes = util.parse_attribute_data(creature_data)

        return cls(
            fundamental_progression = creature_data.get('class') or creature_data.get('creature_type'),
            race = creature_data.get('race'),
            # meta
            name = creature_data.get('name'),
            level = int(raw_stats.get('level') or creature_data.get('level') or 1),
            description = creature_data.get('description'),
            combat_description = creature_data.get('combat_description'),
            # progressions
            base_attack_bonus_progression = creature_data.get('bab'),
            fortitude_progression = creature_data.get('fortitude'),
            reflex_progression = creature_data.get('reflex'),
            will_progression = creature_data.get('will'),
            hit_value = creature_data.get('hit_value'),
            natural_armor_progression = creature_data.get('natural_armor'),
            strength_progression = attributes.get('strength').get('progression'),
            dexterity_progression = attributes.get('dexterity').get('progression'),
            constitution_progression = attributes.get('constitution').get('progression'),
            intelligence_progression = attributes.get('intelligence').get('progression'),
            wisdom_progression = attributes.get('wisdom').get('progression'),
            charisma_progression = attributes.get('charisma').get('progression'),
            # items
            primary_weapon = equipment_set.weapon,
            secondary_weapon = equipment_set.offhand_weapon,
            armor = equipment_set.armor,
            shield = equipment_set.shield,
            # attributes
            strength = attributes.get('strength').get('value'),
            dexterity = attributes.get('dexterity').get('value'),
            constitution = attributes.get('constitution').get('value'),
            intelligence = attributes.get('intelligence').get('value'),
            wisdom = attributes.get('wisdom').get('value'),
            charisma = attributes.get('charisma').get('value'),
            casting_attribute = creature_data.get('casting_attribute'),
            special_attack_attribute = creature_data.get('special_attack_attribute'),
            # core
            size = creature_data.get('size'),
            space = creature_data.get('space'),
            reach = creature_data.get('reach'),
            speeds = creature_data.get('speeds'),
            # abilities
            abilities = creature_data.get('abilities'),
            feats = creature_data.get('feats'),
            templates = creature_data.get('templates'),
            traits = creature_data.get('traits'),
        )

class CreatureGroup(object):
    def __init__(self, creatures):
        self.creatures = creatures
        self.active_creatures = creatures
        self.automatically_update_active_creatures = False
        self.target_mode = None

    def __iter__(self):
        return iter(self.creatures)

    @property
    def is_active(self):
        return len(self.active_creatures) > 0

    @property
    def active_creatures(self):
        if self.automatically_update_active_creatures:
            self.active_creatures = self.updated_active_creatures()
        return self._active_creatures

    @active_creatures.setter
    def active_creatures(self, value):
        self._active_creatures = value

    def updated_active_creatures(self):
        return [creature for creature in self.creatures if creature.is_active]

    def end_round(self):
        for creature in self.creatures:
            creature.end_round()
        self.active_creatures = self.updated_active_creatures()

    @property
    def current_hit_points(self):
        return sum([creature.current_hit_points for creature in self.active_creatures])

    def get_active_creature(self, target_mode):
        active_creatures = self.active_creatures
        if len(active_creatures) == 0:
            return None
        elif len(active_creatures) == 1:
            return active_creatures[0]
        elif target_mode is None or target_mode == 'random':
            return random.choice(self.active_creatures)
        elif target_mode == 'weakest':
            return sorted(active_creatures, key = lambda c: c.current_hit_points)[0]
        elif target_mode == 'strongest':
            return sorted(active_creatures, key = lambda c: c.current_hit_points)[-1]
        else:
            raise Exception("Unrecognized target mode {0}".format(target_mode))

    def attack(self, creature_group):
        for creature in self.active_creatures:
            target = creature_group.get_active_creature(self.target_mode)
            if target is not None:
                creature.attack(target)

    def reset_damage(self):
        for creature in self.creatures:
            creature.reset_damage()
        self.active_creatures = self.updated_active_creatures()
