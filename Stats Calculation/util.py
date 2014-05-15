import re
import math
import dice
from strings import *

d20 = dice.dx(20)

class Modifier(object):

    def __init__(self):
        self.inherent=0
        self.enhancement=0
        self.competence=0
        self.circumstance=0
        self.die=None
        self.raw_total = 0

    def add_inherent(self, bonus):
        self.inherent+=bonus
        self._update()

    def add_enhancement(self, bonus):
        self.enhancement = max(self.enhancement, bonus)
        self._update()

    def add_competence(self, bonus):
        self.competence += bonus
        self._update()

    def add_circumstance(self, bonus):
        self.circumstance+=bonus
        self._update()

    def add_all(self, bonus_dict):
        keys = bonus_dict.keys()
        if 'inherent' in keys:
            self.add_inherent(bonus_dict['inherent'])
        if 'enhancement' in keys:
            self.add_enhancement(bonus_dict['enhancement'])
        if 'competence' in keys:
            self.add_competence(bonus_dict['competence'])
        if 'circumstance' in keys:
            self.add_circumstance(bonus_dict['circumstance'])
        self._update()

    def _update(self):
        self.raw_total = sum([self.inherent, self.enhancement, self.competence,
            self.circumstance])

    def add_die(self, die):
        try:
            if die.average > self.die.average:
                self.die=die
        except:
            self.die = die

    def get_total(self, roll=False):
        #return int if there are no dice
        if self.die:
            if roll:
                return self.raw_total + self.die.roll()
            else:
                return self.raw_total + self.die.average
        return self.raw_total

    def __str__(self):
        return 'Modifier({0} = inh {1}, comp {2}, enh {3}, circ {4}, die {5})'.format(
                self.get_total(), self.inherent, self.competence,
                self.enhancement, self.circumstance, self.die)

    def mstr(self):
        return mstr(self.get_total())

class ModifierProgression(Modifier):
    def __init__(self, progression = None, level = None):
        self.inherent=0
        self.enhancement=0
        self.competence=0
        self.circumstance=0
        self.die=None
        self.progression = progression
        self.level = level
        if self.progression and self.level:
            self._apply_progression(progression, level)

    #To be overridden
    def _apply_progression(progression, level):
        pass

    def set_progression(self, progression):
        self.progression = progression
        if self.progression and self.level:
            self._apply_progression(self.progression, self.level)
        self._update()

    def set_level(self, level):
        self.level = level
        if self.progression and self.level:
            self._apply_progression(self.progression, self.level)

class SavingThrow(ModifierProgression):
    def _apply_progression(self, progression, level):
        base_save_bonus = {
            'poor': level/2,
            'average': (level*3)/4+1,
            'good': level+2,
            }[progression]
        self.inherent = self.base_bonus

class SavingThrows():
    def __init__(self, level = None):
        self.fortitude = SavingThrow(level)
        self.reflex = SavingThrow(level)
        self.will = SavingThrow(level)

    def set_progressions_dict(self, progressions):
        for save in SAVE_NAMES:
            getattr(self, save).set_progression(progressions[save])

class AttackBonus(ModifierProgression):
    def __init__(self, progression = None, level = None):
        super(AttackBonus, self).__init__(progression, level)
        self.base_attack_bonus = 0
        self.offhand_penalty = 5
        self.enhancement_offhand = 0

    def set_base_attack_bonus(self, base_attack_bonus):
        difference = base_attack_bonus - self.base_attack_bonus
        self.base_attack_bonus = base_attack_bonus
        self.add_inherent(difference)
        self._update()

    def _apply_progression(self, progression, level):
        base_attack_bonus = {
            'poor': level/2,
            'average': (level*3)/4,
            'good': level,
            }[progression]
        self.set_base_attack_bonus(base_attack_bonus)

    def _adjust_offhand_penalty(self, bonus, for_main_hand, for_offhand):
        if not for_offhand:
            self.offhand_penalty += bonus
        if not for_main_hand:
            self.offhand_penalty -= bonus

    def add_inherent(self, bonus, for_main_hand = True, for_offhand = True):
        super(AttackBonus, self).add_inherent(bonus)
        self._adjust_offhand_penalty(bonus, for_main_hand, for_offhand)

    def add_enhancement(self, bonus, for_main_hand = True, for_offhand = True):
        #First, adjust the penalties if necessary
        if not for_main_hand:
            bonus_relative_to_offhand = max(0, bonus - self.enhancement_offhand)
            self.offhand_penalty -= bonus_relative_to_offhand
        if not for_offhand:
            bonus_relative_to_main_hand = max(0, bonus - self.enhancement)
            self.offhand_penalty += bonus_relative_to_main_hand
        #Then apply the bonus
        if for_main_hand:
            self.enhancement = max(self.enhancement, bonus)
        if for_offhand:
            self.enhancement_offhand = max(self.enhancement_offhand, bonus)
        self._update()

    def add_competence(self, bonus, for_main_hand = True, for_offhand = True):
        super(AttackBonus, self).add_competence(bonus)
        self._adjust_offhand_penalty(bonus, for_main_hand, for_offhand)

    def add_circumstance(self, bonus, for_main_hand = True, for_offhand = True):
        super(AttackBonus, self).add_circumstance(bonus)
        self._adjust_offhand_penalty(bonus, for_main_hand, for_offhand)

    def get_total_offhand(self, roll=False):
        #return int if there are no dice
        if self.die:
            if roll:
                return self.raw_total - self.offhand_penalty + self.die.roll()
            else:
                return self.raw_total - self.offhand_penalty + self.die.average
        return self.raw_total - self.offhand_penalty

    def mstr_offhand(self):
        return mstr(self.get_total_offhand())
        

class Attributes:
    def __init__(self):
        self.strength = Modifier()
        self.dexterity = Modifier()
        self.constitution = Modifier()
        self.intelligence = Modifier()
        self.wisdom = Modifier()
        self.charisma = Modifier()

    def set_all_dict(self, raw_attributes):
        for attribute_name in ATTRIBUTE_NAMES:
            #use try/except to allow missing attributes
            try:
                getattr(self, attribute_name).add_inherent(
                    conditional_int(raw_attributes[attribute_name]))
            except:
                print 'missing attribute'
                pass

class ArmorClass:
    def __init__(self):
        self.misc = Modifier()
        self.armor = Modifier()
        self.shield = Modifier()
        self.dodge = Modifier()
        self.natural_armor = Modifier()
        self.misc.add_inherent(10)

    def normal(self):
        normal = sum([self.misc.get_total(), self.shield.get_total(), self.dodge.get_total()])
        normal += sum_armor(self.armor.get_total(), self.natural_armor.get_total())
        return normal

    def touch(self):
        return sum([self.misc.get_total(), self.shield.get_total(), self.dodge.get_total()])

    def flatfooted(self):
        flatfooted = self.misc.get_total()
        flatfooted += sum_armor(self.armor.get_total(), self.natural_armor.get_total())
        return flatfooted

    def add_all(self, ac_modifiers):
        keys = ac_modifiers.keys()
        if 'misc' in keys:
            self.misc.add_all(ac_modifiers['misc'])
        if 'armor' in keys:
            self.armor.add_all(ac_modifiers['armor'])
        if 'shield' in keys:
            self.shield.add_all(ac_modifiers['shield'])
        if 'dodge' in keys:
            self.dodge.add_all(ac_modifiers['dodge'])
        if 'natural_armor' in keys:
            self.natural_armor.add_all(ac_modifiers['natural_armor'])

    def __str__(self):
        ac = 'AC ' + str(self.normal())
        ac += ', touch ' + str(self.touch())
        ac += ', flat-footed ' + str(self.flatfooted())
        return ac

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

def parse_stats_from_file(input_file_name):
    input_file = open(input_file_name,'r')
    stats=dict()
    for line in input_file:
        #ignore comments
        line = line.strip()
        line = line.split('#',1)[0]
        #Separate data from data label
        line = line.split('=',1)
        #add the key, avoiding key overlap
        key = line[0]
        val = line[1]
        i=1
        #abilities can appear multiple times and are always stored as a list
        if key == 'ability':
            try:
                stats[key].append(val)
            except:
                stats[key] = list()
                stats[key].append(val)
        #Normal values are stored singularly, and should error on duplicates
        else:
            if stats.has_key(key):
                raise Exception('Multiple keys: '+key)
            else:
                stats[key] = val
    return stats

def parse_attribute_file(raw_stats):
    attribute_file_name = 'data/attributes/'+raw_stats['attributes']+'.txt'
    return parse_stats_from_file(attribute_file_name)


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
def mstr(text):
    if is_number(text):
        modifier=int(text)
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

def attack_hits(attack_bonus, ac, threshold = None):
    attack_result = d20.roll() + attack_bonus
    if threshold:
        return attack_result >= ac, attack_result-threshold >= ac
    else:
        return attack_result >= ac

#return number of attacks this base attack bonus grants
def attack_count(base_attack_bonus):
    return 1 + max(0,(base_attack_bonus-1)/5)

#+2, +3 at 8th, +4 at 14th, +5 at 20th
def std_scale(level):
    return (level+10)/6

#+2, +3 at 5th, +4 at 10th, +5 at 15th, +6 at 20th
def bab_scale(base_attack_bonus):
    return 2+base_attack_bonus/5

def get_size_statistics(size, in_feet = False):
    space, reach, movement = {
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
        movement = value_in_feet(movement)
    return space, reach, movement

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
