import re
import math
import dice
from strings import *
import os.path
import yaml
import copy
from pprint import pprint, PrettyPrinter

d20 = dice.dx(20)

# valid formats:
#   key = the name of the key in data
#   key = "key"/"variant"
def get_creature_data_from_key(key, data):
    classes = data['classes']
    monsters = data['monsters']
    if key in classes:
        return classes[key]
    elif key in monsters:
        return monsters[key]
    else:
        # we probably have a variant class/monster
        key, variant_keys = split_key_and_variant_keys(key)
        if not variant_keys:
            raise Exception("Unable to recognize creature '{0}'".format(key))
        if key in classes:
            base_creature = dict(classes[key])
            apply_variants(base_creature, variant_keys, classes.get('generic_variants'), object_name = key, append_name = True)
            return base_creature
        elif key in monsters:
            base_creature = dict(monsters[key])
            apply_variants(base_creature, variant_keys, monsters.get('generic_variants'), object_name = key, append_name = True)
            return base_creature
        else:
            raise Exception("Unable to recognize creature '{0}/{1}'".format(key, variant))

def split_key_and_variant_keys(key):
    variant_keys = key.split('/')
    key = variant_keys.pop(0)
    return key, variant_keys

def apply_variants(base_object, variant_keys, generic_variants, object_name = 'object', append_name = False):
    base_variants = base_object.get('variants', {})
    for variant_key in variant_keys:
        variant = base_variants.get(variant_key) or generic_variants.get(variant_key)
        if variant is None:
            raise Exception( "'{0}' does not have variant '{1}'. It has the following variants: {2}".format(
                object_name, variant_key, ', '.join(base_object.get('variants', {}).keys())))
        variant_update(base_object, variant)
        if append_name and not 'name' in variant:
            base_object['name'] += '/{0}'.format(variant_key)
    return base_object

def variant_update(base_object, variant):
    for key in variant:
        if key == 'extra_feats':
            if not base_object.get('feats'):
                base_object['feats'] = list()
            base_object['feats'] += variant['extra_feats']
        else:
            base_object[key] = variant[key]

class Modifier(object):

    def __init__(self):
        self.bonuses = {}
        self.die = None
        self.total_bonus = 0

    def add_bonus(self, bonus_value, bonus_type):
        #Overlap with the existing type if there is one 
        try:
            self.bonuses[bonus_type] = max(self.bonuses[bonus_type],
                                           bonus_value)
        except KeyError:
            self.bonuses[bonus_type] = bonus_value
        self._update()

    def remove_bonus(self, bonus_type):
        try:
            self.bonuses[bonus_type] = 0
        except KeyError:
            pass
        self._update()

    def add_enhancement(self, bonus_value):
        self.add_bonus(bonus_value, 'enhancement')

    def _update(self):
        total = 0
        for key in self.bonuses:
            total += self.bonuses[key]
        self.total_bonus = total

    def set_die(self, die):
        #Dice always overlap instead of stacking
        try:
            if die.average > self.die.average:
                self.die=die
        except AttributeError:
            self.die = die

    def get_total(self, roll=False, ignore_die = False):
        #return int if there are no dice
        if self.die is not None and not ignore_die:
            if roll:
                return self.total_bonus + self.die.roll()
            else:
                return self.total_bonus + self.die.average
        return self.total_bonus

    def __str__(self):
        text = 'Modifier(%s = ' % self.get_total()
        for key in self.bonuses:
            text += '%s %s, ' % (key, self.bonuses[key])
        if self.die is not None:
            text += 'die %s' % self.die
        text += ')'
        return text

    def mstr(self):
        return mstr(self.get_total())

class ModifierProgression(Modifier):
    def __init__(self, progression = None, level = None):
        super(ModifierProgression, self).__init__()
        self.progression = progression
        self.level = level
        if self.progression and self.level:
            self._apply_progression(progression, level)

    #To be overridden
    def _apply_progression(progression, level):
        pass

    def set_progression(self, progression):
        self.progression = progression
        if self.progression is not None and self.level is not None:
            self._apply_progression(self.progression, self.level)
            self._update()

    def set_level(self, level):
        self.level = level
        if self.progression is not None and self.level is not None:
            self._apply_progression(self.progression, self.level)
            self._update()

class Attribute(ModifierProgression):

    def __init__(self):
        super(Attribute, self).__init__()
        self.damage = 0

    def _apply_progression(self, progression, level):
        bonus = {
            None: 0,
            #primary and secondary are for PCs
            'primary': (level+2)/4,
            'secondary': level/4,
            #progressions are for monsters
            POOR: level/4+1,
            AVERAGE: level/3+2,
            GOOD: level/2+3,
            EXTREME: (level*3)/4+4,
        }[progression]
        self.add_bonus(bonus, 'progression')

    def set_inapplicable(self):
        self.get_total = lambda : 0

    def take_damage(self, damage):
        self.damage += damage
        self._update()

    def _update(self):
        super(Attribute, self)._update()
        self.total_bonus -= self.damage

    def reset_damage(self):
        self.damage = 0
        self._update()

    def __str__(self):
        text = 'Attribute(%s = ' % self.get_total()
        for key in self.bonuses:
            text += '%s %s, ' % (key, self.bonuses[key])
        text += '%s %s' % ('damage', self.damage)
        if self.die is not None:
            raise Exception("Attributes shouldn't have dice")
        text += ')'
        return text

class ArmorDefense(ModifierProgression):
    def _apply_progression(self, progression, level):
        bonus = {
            None: 0,
            POOR: level/4+2,
            AVERAGE: level/3+4,
            GOOD: level/2+6,
        }[progression]
        self.add_bonus(bonus, 'progression')

class SpecialDefense(ModifierProgression):
    def _apply_progression(self, progression, level):
        bonus = {
            'poor': level/2,
            'average': (level*3)/4+1,
            'good': level+2,
        }[progression]
        self.add_bonus(bonus, 'progression')

class AttackBonus(ModifierProgression):
    def __init__(self, progression = None, level = None):
        super(AttackBonus, self).__init__(progression, level)
        self.base_attack_bonus = 0
        self.offhand_penalty = 5

    def _apply_progression(self, progression, level):
        base_attack_bonus = {
            'poor': level/2,
            'average': (level*3)/4,
            'good': level,
        }[progression]
        self.base_attack_bonus = max(self.base_attack_bonus, base_attack_bonus)
        self.add_bonus(base_attack_bonus, 'base attack bonus')

    def _adjust_offhand_penalty(self, bonus_value, for_main_hand, for_offhand):
        if not for_offhand:
            self.offhand_penalty += bonus_value
        if not for_main_hand:
            self.offhand_penalty -= bonus_value

    def add_bonus(self, bonus_value, bonus_type, for_main_hand = True,
                  for_offhand = True):
        super(AttackBonus, self).add_bonus(bonus_value, bonus_type)
        self._adjust_offhand_penalty(bonus_value, for_main_hand, for_offhand)

    def get_total_offhand(self, roll=False, ignore_die=False):
        return self.get_total(roll, ignore_die) - self.offhand_penalty

    def mstr_offhand(self):
        return mstr(self.get_total_offhand())

class ManeuverBonus(ModifierProgression):

    def _apply_progression(self, progression, level):
        base_attack_bonus = {
            'poor': level/2,
            'average': (level*3)/4,
            'good': level,
        }[progression]
        self.add_bonus(base_attack_bonus, 'base attack bonus')

    def set_attributes(self, strength, dexterity):
        self.strength = strength
        self.dexterity = dexterity

    def get_total(self, use_strength=True, roll=False, ignore_die = False):
        total = super(ManeuverBonus, self).get_total(roll, ignore_die)
        if use_strength:
            return total + self.strength.get_total()
        else:
            return total + self.dexterity.get_total()

    def mstr(self, use_strength = True):
        return mstr(self.get_total(use_strength = use_strength))

class DamageReduction(object):
    def __init__(self, value = None, type_resisted = None, type_vulnerable=None):
        self.base_reduction = value
        self.remaining_reduction = self.base_reduction
        self.type_resisted = type_resisted
        self.type_vulnerable = type_vulnerable

    def reduce_damage(self, damage, damage_types):
        #vulnerable typing shuts off DR
        if self.type_vulnerable in damage_types:
            self.remaining_reduction = 0
            return damage
        #apply DR if it is relevant
        if self.type_resisted in damage_types:
            damage_resisted = min(damage, self.remaining_reduction)
            self.remaining_reduction -= damage_resisted
            return damage - damage_resisted
        #Just return the damage
        return damage

    #Damage reduction refreshes at the beginning of each round
    def refresh(self):
        self.remaining_reduction = self.base_reduction

def ifloor(num):
    return int(math.floor(num))

def sum_armor(armor, natural_armor):
    if not natural_armor:
        return armor
    if not armor:
        return natural_armor
    if armor >= natural_armor:
        return armor + ifloor(natural_armor/2)
    else:
        return natural_armor + ifloor(armor/2)

def import_data():
    with open('attributes.yaml', 'r') as attributesfile:
        attributes = yaml.load(attributesfile)
    with open('classes.yaml', 'r') as classesfile:
        classes = yaml.load(classesfile)
    with open('equipment.yaml', 'r') as equipmentfile:
        equipment = yaml.load(equipmentfile)
    with open('monsters.yaml', 'r') as monstersfile:
        monsters = yaml.load(monstersfile)
    return {
        'attributes': attributes,
        'classes': classes,
        'equipment': equipment,
        'monsters': monsters,
    }

def parse_creature_data(key, data):
    creature_data = copy.deepcopy(get_creature_data_from_key(key, data))
    if not creature_data:
        return False
    # apply creature type-based effects
    if 'creature_type' in creature_data:
        creature_type = creature_data['creature_type']
        safe_update(creature_data, data['monsters']['creature_types'][creature_type], append_arrays = True)
    #If the attributes are referenced in an external file, add them
    #to the raw creature_data referenced here.
    #Otherwise, assume the attributes are present in the original file
    if 'attributes' in creature_data:
        creature_attributes = data['attributes'][creature_data['attributes']]
        creature_data.update(creature_attributes)
    # equipment can also be referenced from an external file
    if 'equipment' in creature_data:
        key = creature_data['equipment']
        if key in data['equipment']:
            creature_equipment = data['equipment'][key]
        else:
            key, variant_keys = split_key_and_variant_keys(key)
            if not variant_keys:
                raise Exception("Unable to recognize equipment '{0}'".format(key))
            if key in creature_data['equipment']:
                creature_equipment = dict(creature_data['equipment'][key])
                apply_variants(creature_equipment, variant_keys, object_name = key)
            else:
                raise Exception("Unable to recognize equipment '{0}/{1}'".format(key, variant))

        #Add the equipment to the stats to be returned
        for key in creature_equipment:
            # values from creature_data directly should override imported values
            if not key in creature_data:
                creature_data[key] = creature_equipment[key]
    return creature_data

# in the YAML file, the attribute could simply be a value, simply be a
# progression, or be a dictionary containing both a progression and a value
# Return a dictionary in the format
# {
#     'strength': {
#         'progression': strength_progression or None
#         'value': strength_value or 0
#     },
#     ...
# }
def parse_attribute_data(creature_data):
    attributes = dict()
    for attribute_name in 'strength dexterity constitution intelligence perception willpower'.split():
        # normally, if an attribute is missing, it means it is 0
        attribute_data = creature_data.get(attribute_name, 'attribute not found')
        if attribute_data == 'attribute not found':
            progression = None
            value = 0
        # if the attribute is explicitly stated to be None, the creature does
        # not have the attribute, such as a construct
        elif attribute_data is None:
            progression = None
            value = None
        elif isinstance(attribute_data, dict):
            # we need to figure out whether we have a 
            progression = attribute_data.get('progression')
            value = attribute_data.get('value')
        else:
            # we have a single value, and we need to figure out whether it is a
            # string (meaning a progression) or an int (meaning a value)
            try:
                progression = None
                value = int(attribute_data)
            except ValueError:
                progression = attribute_data
                value = 0
        attributes[attribute_name] = {
            'progression': progression,
            'value': value,
        }
    return attributes

#Return a new dict that contains a selection of items from
#the original dict
#Perform the function f on all elements
def dict_slice(input_dict, key_list, f=lambda x:x):
    output = dict()
    for key in key_list:
        if input_dict.has_key(key):
            output[key] = f(input_dict[key])
        else:
            #print 'warning: key', key, 'not found'
            output[key] = 0
    return output

def conditional_int(text):
    if is_number(text):
        return int(text)
    else:
        return text

def is_number(text):
    try:
        temp = int(text)
        return True
    except:
        return False

def avg(numbers):
    if numbers is None:
        return None
    return float(sum(numbers))/len(numbers)

#Input: string representing die, such as 'd10' or '2d6'
def die_average(die):
    if not die:
        return 0
    die=die.split('d')
    if die[0]!='':
        die_count=int(die[0])
    else:
        die_count=1
    die_size=int(die[1])
    return die_count*(die_size+1.0)/2.0

#Convert a modifier to a string with + or - in front, as appropriate
def mstr(text, ignore_zero = False):
    if is_number(text):
        modifier=int(text)
        if ignore_zero and modifier==0:
            return ''
        if modifier<0:
            return str(modifier)
        else:
            return '+'+str(modifier)
    else:
        print 'not a modifier:', text
        return str(text)

#Given a dict and a prefix, return a new dict with the key/value pairs 
#from the original dict where each key matches the prefix
#The prefix is stripped from the key names in the resulting dict 
def dict_match_prefix(input_dict, prefix):
    pattern = re.compile(prefix)
    keys = input_dict.keys()
    output_dict = dict()
    for key in keys:
        if pattern.match(key):
            key_without_prefix = pattern.sub('', key, count=1)
            output_dict[key_without_prefix] = input_dict[key]
    return output_dict

def attack_hits(attack_bonus, defense):
    if attack_bonus is None:
        return False
    elif defense is None:
        return True
    attack_result = d20.roll() + attack_bonus
    return attack_result >= defense

#return number of attacks this base attack bonus grants
def attack_count(base_attack_bonus):
    return 1 + max(0,(base_attack_bonus-1)/5)

#+2, +3 at 8th, +4 at 14th, +5 at 20th
def std_scale(level):
    return max(2,(level+10)/6)

#+2, +3 at 5th, +4 at 10th, +5 at 15th, +6 at 20th
def bab_scale(base_attack_bonus):
    return 2+base_attack_bonus/4

def default_space(size, in_feet = False):
    space, reach, land_speed = get_size_statistics(size, in_feet)
    return space

def default_reach(size, in_feet = False):
    space, reach, land_speed = get_size_statistics(size, in_feet)
    return reach

def default_land_speed(size, in_feet = False):
    space, reach, land_speed = get_size_statistics(size, in_feet)
    return land_speed

def get_size_statistics(size, in_feet = False):
    space, reach, land_speed = {
        SIZE_FINE: (0.5, 0, 5),
        SIZE_DIMINUITIVE: (1, 0, 10),
        SIZE_TINY: (2.5, 0, 15),
        SIZE_SMALL: (5, 5, 20),
        SIZE_MEDIUM: (5, 5, 30),
        SIZE_LARGE: (10, 10, 40),
        SIZE_HUGE: (15, 15, 50),
        SIZE_GARGANTUAN: (20, 20, 60),
        SIZE_COLOSSAL: (30, 30, 70),
    }[size]
    if in_feet:
        space = value_in_feet(space)
        reach = value_in_feet(reach)
        land_speed = value_in_feet(land_speed)
    return space, reach, land_speed

def get_size_modifier(size, is_special_size_modifier = False):
    if is_special_size_modifier:
        return {
            SIZE_FINE: -16,
            SIZE_DIMINUITIVE: -12,
            SIZE_TINY: -8,
            SIZE_SMALL: -4,
            SIZE_MEDIUM: 0,
            SIZE_LARGE: 4,
            SIZE_HUGE: 8,
            SIZE_GARGANTUAN: 12,
            SIZE_COLOSSAL: 16,
        }[size]
    return {
        SIZE_FINE: 8,
        SIZE_DIMINUITIVE: 4,
        SIZE_TINY: 2,
        SIZE_SMALL: 1,
        SIZE_MEDIUM: 0,
        SIZE_LARGE: -1,
        SIZE_HUGE: -2,
        SIZE_GARGANTUAN: -4,
        SIZE_COLOSSAL: -8,
    }[size]

def value_in_feet(value):
    if value == 0.5:
        value = '1/2'
    elif value == 2.5:
        value = '2-1/2'
    return '%s ft.' % value

def change_size(size, size_difference):
    new_index = SIZES.index(size) + size_difference
    new_index = max(new_index, 0)
    new_index = min(new_index, len(SIZES)-1)
    return SIZES[new_index]

def increase_size(size):
    return change_size(size, 1)

def decrease_size(size):
    return change_size(size, -1)

def attack_damage_to_latex(weapon, weapon_damage):
    #These damage types are too common and verbose to include
    ignored_damage_types = [DAMAGE_PHYSICAL, DAMAGE_SLASHING, DAMAGE_PIERCING,
                            DAMAGE_BLUDGEONING]
    damage_types_without_physical = [t for t in weapon.damage_types
                                     if not t in ignored_damage_types]
    damage_string = '%s%s %s' % (weapon_damage.die,
                                 mstr(weapon_damage.get_total(ignore_die = True), ignore_zero = True),
                                 ' '.join(damage_types_without_physical))
    if weapon.deals_damage:
        damage_string += ' damage'
    return damage_string

def change_progression(progression, steps_to_change, allow_extreme = False):
    new_index = PROGRESSIONS.index(progression) + steps_to_change
    new_index = max(new_index, 0)
    #normally we prohibit the "extreme" progression, since it is rarely used
    if allow_extreme:
        max_index = 4
    else:
        max_index = 3
    new_index = min(new_index, max_index)
    return PROGRESSIONS[new_index]

def change_hit_value(hit_value, steps_to_change, allow_extreme = False):
    hit_value += steps_to_change
    #normally, HV has a min of 4 and a max of 7
    if allow_extreme:
        return hit_value
    else:
        hit_value = min(7, hit_value)
        hit_value = max(4, hit_value)
        return hit_value

def lower_encumbrance(encumbrance):
    if encumbrance is None: return False
    return {
        'heavy': 'medium',
        'medium': 'light',
        'light': 'none',
        'none': 'none',
    }[encumbrance]

def split_filtered(text, split_on = ' '):
    # filter None rmoves all elements that evaluate to False
    return filter(None, re.split(split_on, text))

#return probability that attack hits
def hit_probability(attack_bonus, ac):
    probability = (21+attack_bonus-ac)/20.0
    return min(0.95, max(0.05, probability))

# convert a string or list to make sure it becomes a list
def ensure_list(string_or_list):
    if isinstance(string_or_list, basestring):
        return (string_or_list,)
    else:
        return string_or_list

def safe_update(original_dict, additional_dict, append_arrays = False):
    for key in additional_dict:
        if key not in original_dict:
            original_dict[key] = additional_dict[key]
        elif append_arrays:
            # try to append arrays
            try:
                for value in additional_dict[key]:
                    original_dict[key].append(value)
            except (TypeError, AttributeError):
                pass
