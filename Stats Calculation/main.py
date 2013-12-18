import argparse
import math
import re
import classes

attribute_titles = ['strength', 'dexterity', 'constitution', 'intelligence', 
        'wisdom', 'charisma']
ac_modifier_titles = ['armor', 'shield', 'dodge', 'natural armor', 'misc']
weapon_titles = ['damage', 'encumbrance']
armor_titles = ['ac bonus', 'encumbrance', 'check penalty', 'arcane spell failure']
save_titles = ['fortitude', 'reflex', 'will']

class character:
    base_attack_bonus=0
    level=0
    attack_bonus=0
    attack_damage=0
    armor_class=10
    attributes = dict()
    ac_modifiers = dict()
    for stat in ac_modifier_titles:
        ac_modifiers[stat] = 0
    armor = dict()
    weapon = dict()
    saves = dict()

    def __init__(self, character_file_name):
        raw_stats = parse_stats_from_file(character_file_name)
        self.class_name = raw_stats['class']
        self.level = int(raw_stats['level'])
        #note that we are hardcoding the call to barbarian
        #This needs to be made automatic later
        self.class_calculator = classes.barbarian(self.level)

        self.attributes = dict_slice(raw_stats, attribute_titles, conditional_int)
        self.weapon = dict_slice(dict_match_prefix(raw_stats, 'weapon '), weapon_titles, conditional_int)
        self.armor = dict_slice(dict_match_prefix(raw_titles, 'armor '), armor_titles, conditional_int)

        self.base_attack_bonus=self.class_calculator.calculate_base_attack_bonus()
        self.attack_bonus = self.calculate_attack_bonus()
        self.attack_damage = self.calculate_attack_damage()

    def calculate_attack_bonus(self):
        return self.base_attack_bonus+ self.calculate_attack_attribute_bonus()

    def calculate_attack_damage(self):
        return math.floor(self.attributes['strength']/2) + die_average(self.weapon['damage'])

    def calculate_armor_class(self):
        if self.armor_encumbrance=='medium' or self.armor_encumbrance=='heavy':
            dexterity_bonus=math.floor(self.attributes['dexterity']/2)
        else:
            dexterity_bonus=self.attributes['dexterity']
        return 10 + dexterity_bonus + self.armor_modifier + \
                self.shield_modifier + self.natural_armor_modifier + \
                self.dodge_modifier
        
    def calculate_attack_attribute_bonus(self):
        if self.weapon['encumbrance']=='light':
            return max(self.attributes['strength'],self.attributes['dexterity'])
        else:
            return self.attributes['strength']

    def __str__(self):
        return ' AC '+self.ac['normal']+', touch '+self.ac['touch']+\
                ', flat-footed '+self.ac['flat-footed']+'; CMD '+self.cmd+'\n'+ \
                'HP '+self.hp+'\n'+ \
                'Fort '+self.saves['Fortitude']+', Ref '+self.saves['Reflex']+ \
                'Will '+self.saves['Will']+'\n'

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

#Return a new dict that contains a selection of items from
#the original dict
#Perform the function f on all elements
def dict_slice(input_dict, key_list, f=lambda x:x):
    output = dict()
    for key in key_list:
        if input_dict.has_key(key):
            output[key] = f(input_dict[key])
        else:
            output[key] = None
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

def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-c', dest='character_class', help='the character class', default='brb-heavy')
    return vars(parser.parse_args())

#Input: string representing die, such as 'd10' or '2d6'
def die_average(die):
    die=die.split('d')
    if die[0]!='':
        die_count=int(die[0])
    else:
        die_count=1
    die_size=int(die[1])
    return die_count*(die_size+1.0)/2.0

if __name__ == "__main__":
    args = initialize_argument_parser()
    file_input = 'data/'+args["character_class"]+'.txt'
    barbarian = character(file_input)
    print barbarian.attack_bonus, barbarian.attack_damage
    #print barbarian.base_attack_bonus
    #print barbarian
