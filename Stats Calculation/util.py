import re
import math
import dice

attribute_titles = ['strength', 'dexterity', 'constitution', 'intelligence', 
        'wisdom', 'charisma']
ac_modifier_titles = ['armor', 'shield', 'dodge', 'natural armor', 'misc']
equipment_weapon_titles = ['damage', 'encumbrance']
equipment_armor_titles = ['ac bonus', 'encumbrance', 'check penalty', 'arcane spell failure']
save_titles = ['fortitude', 'reflex', 'will']
ac_titles = ['normal', 'touch', 'flat-footed']

GOOD = 'good'
AVERAGE = 'average'
POOR = 'poor'

class Modifier:

    def __init__(self):
        self.inherent=0
        self.enhancement=0
        self.competence=0
        self.circumstance=0
        self.die=None

    def add_inherent(self, bonus):
        self.inherent+=bonus

    def add_enhancement(self, bonus):
        self.enhancement = max(self.enhancement, bonus)

    def add_competence(self, bonus):
        self.competence = max(self.competence, bonus)

    def add_circumstance(self, bonus):
        self.circumstance+=bonus

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

    def add_die(self, die):
        try:
            if die.average > self.die.average:
                self.die=die
        except:
            self.die = die

    def total(self, roll=False):
        total = sum([self.inherent, self.enhancement, self.competence,
            self.circumstance])
        #return int if there are no dice
        if roll:
            return total + self.die.roll()
        else:
            #If there is a die, add the average
            try:
                return total + self.die.average()
            except:
                return total

class ModifierProgression(Modifier):
    def __init__(self, progression = None, level = None):
        self.base_bonus = 0
        self.inherent=0
        self.enhancement=0
        self.competence=0
        self.circumstance=0
        self.die=None
        if progression and level:
            self._apply_progression(progression, level)

    #To be overridden
    def _apply_progression(progression, level):
        pass

    def set_progression(self, progression):
        self.__init__(progression=progression)

    def set_level(self, level):
        self.__init__(level=level)

class SavingThrow(ModifierProgression):
    def _apply_progression(self, progression, level):
        self.base_bonus = {
            'poor': level/2,
            'average': (level*3)/4+1,
            'good': level+2,
            }[progression]
        self.add_inherent(self.base_bonus)

class SavingThrows():
    def __init__(self, level = None):
        self.fortitude = SavingThrow(level)
        self.reflex = SavingThrow(level)
        self.will = SavingThrow(level)

    def set_progressions_dict(self, progressions):
        for save in save_titles:
            getattr(self, save).set_progression(progressions[save])

class AttackBonus(ModifierProgression):
    def _apply_progression(self, progression, level):
        self.base_bonus = {
            'poor': level/2,
            'average': (level*3)/4+1,
            'good': level+2,
            }[progression]
        self.add_inherent(self.base_bonus)

class Attributes:
    def __init__(self):
        self.strength = Modifier()
        self.dexterity = Modifier()
        self.constitution = Modifier()
        self.intelligence = Modifier()
        self.wisdom = Modifier()
        self.charisma = Modifier()

    def set_all_dict(self, raw_attributes):
        for attribute_name in attribute_titles:
            #use try/except to allow missing attributes
            try:
                getattr(self, attribute_name).add_inherent(
                    conditional_int(raw_attributes[attribute_name]))
            except:
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
        normal = sum([self.misc.total(), self.shield.total(), self.dodge.total()])
        normal += sum_armor(self.armor.total(), self.natural_armor.total())
        return normal

    def touch(self):
        return sum([self.misc.total(), self.shield.total(), self.dodge.total()])

    def flatfooted(self):
        flatfooted = self.misc.total()
        flatfooted += sum_armor(self.armor.total(), self.natural_armor.total())
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
        self.remaining_reduction = base_reduction
        self.type_resisted = type_resisted
        self.type_vulnerable = type_vulnerable

    def reduce_damage(self, damage, damage_types):
        #vulnerable typing shuts off DR
        if type_vulnerable in damage_types:
            remaining_reduction = 0
            return damage
        #apply DR if it is relevant
        if type_resisted in damage_types:
            damage_resisted = min(damage, remaining_reduction)
            remaining_reduction -= damage_resisted
            return damage - damage_resisted
        #Just return the damage
        return damage

    #Damage reduction refreshes at the beginning of each round
    def refresh(self):
        self.remaining_reduction = base_reduction

def ifloor(num):
    return int(math.floor(num))

def sum_armor(armor, natural_armor):
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
        #The first item with the same name is "key".
        #The second is "key1". The third is "key2". etc...
        while stats.has_key(key):
            key=line[0]+str(i)
            i+=1
        stats[key]=val
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
