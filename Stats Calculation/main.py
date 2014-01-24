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
ac_titles = ['normal', 'touch', 'flat-footed']

class character:
    base_attack_bonus=0
    level=0
    attack_bonus=0
    attack_damage=0
    attributes = dict()
    ac_modifiers = dict()
    for title in ac_modifier_titles:
        ac_modifiers[title] = 0
    armor = dict()
    shield = dict()
    weapon = dict()
    saves = dict()
    ac = dict()
    cmd = 10
    hp = 0

    def __init__(self, character_file_name):
        #Take statistics from the given character input file
        raw_stats = parse_stats_from_file(character_file_name)
        self.class_name = raw_stats['class']
        self.level = int(raw_stats['level'])
        self.attributes = dict_slice(raw_stats, attribute_titles, conditional_int)
        self.weapon = dict_slice(dict_match_prefix(raw_stats, 'weapon '), weapon_titles, conditional_int)
        self.armor = dict_slice(dict_match_prefix(raw_stats, 'armor '), armor_titles, conditional_int)
        self.shield = dict_slice(dict_match_prefix(raw_stats, 'shield '), armor_titles, conditional_int)
        if self.armor.has_key('ac bonus'):
            self.ac_modifiers['armor']=self.armor['ac bonus']
        else:
            self.ac_modifiers['armor']=0
        if self.shield.has_key('ac bonus'):
            self.ac_modifiers['shield']=self.shield['ac bonus']
        else:
            self.ac_modifiers['shield']=0

        #Calculate statistics based on the given class
        #note that we are hardcoding the call to barbarian
        #This needs to be made automatic later
        self.class_calculator = classes.barbarian(self.level)
        self.base_attack_bonus=self.class_calculator.calculate_base_attack_bonus()
        for title in save_titles:
            self.saves[title] = self.class_calculator.calc_save(title) 
        self.hp = self.calculate_hp()

        #Calculate derived statistics
        self.attack_bonus = self.calculate_attack_bonus()
        self.attack_damage = self.calculate_attack_damage()
        for title in ac_titles:
            self.ac[title] = self.calculate_armor_class(title) 
        self.cmd = self.calculate_cmd()

    def calculate_attack_bonus(self):
        return self.base_attack_bonus+ self.calculate_attack_attribute_bonus()

    def calculate_attack_damage(self):
        return math.floor(self.attributes['strength']/2) + die_average(self.weapon['damage'])

    def calculate_armor_class(self, ac_title):
        if self.armor['encumbrance']=='medium' or self.armor['encumbrance']=='heavy':
            dexterity_bonus=self.attributes['dexterity']/2
        else:
            dexterity_bonus=self.attributes['dexterity']
        
        ac = 10 + dexterity_bonus
        for modifier in self.ac_modifiers.values():
            ac+=modifier
        if ac_title == ac_titles[0]: #normal AC
            #apply all modifiers
            return ac
        elif ac_title == ac_titles[1]: #touch AC
            #apply all except armor, natural armor
            return ac-self.ac_modifiers['armor']-self.ac_modifiers['natural armor']
        elif ac_title == ac_titles[2]: #flat-footed AC
            #apply all except shield, dodge
            return ac-self.ac_modifiers['shield']-self.ac_modifiers['dodge']-dexterity_bonus

    def calculate_cmd(self):
        return self.ac['touch'] + self.attributes['strength']

    def calculate_hp(self):
        return (self.attributes['constitution'] + self.class_calculator.hit_value) * self.level

    def calculate_attack_attribute_bonus(self):
        if self.weapon['encumbrance']=='light':
            return max(self.attributes['strength'],self.attributes['dexterity'])
        else:
            return self.attributes['strength']

    def __str__(self):
        return 'AC '+str(self.ac['normal'])+', touch '+str(self.ac['touch'])+ \
                ', flat-footed '+str(self.ac['flat-footed'])+'; CMD '+str(self.cmd)+'\n'+ \
                'HP '+str(self.hp)+'\n'+ \
                'Fort '+mstr(self.saves['fortitude'])+', Ref '+mstr(self.saves['reflex'])+ \
                ', Will '+mstr(self.saves['will'])+'\n'

    def to_monster(self):
        monster_string=''
        header =  '\\subsection{{0}}\n\\begin{mstatblock}\n'.format(self.name)
        monster_string+=header

        types = '\\par {0} {1} {2}'.format(
                self.alignment, self.size, self.creature_type)
        if self.subtypes:
            types +=' {0}'.format(self.subtypes)
        types+=' \\textbf{CR} {0}'
        if self.archetypes:
            types+=' {0}'.format(self.archetypes)
        types+='\n'
        monster_string+=types

        senses = '\\par \textbf{Init} {0}; Perception {1}'.format(
                self.initiative, self.skills['Perception'])
        if self.skills['Sense Motive'] is not None:
            senses += ', Sense Motive {0}'.format(
                    self.skills['Sense Motive'])
        if self.skills['Spellcraft'] is not None:
            senses += ', Spellcraft {0}'.format(self.skills['Spellcraft'])
        if self.abilities['senses']:
            senses += '; \\textbf{Senses} {0}'.format(
                    self.abilities['senses'])
        senses+='\n'
        monster_string+=senses

        if self.abilities['aura']:
            monster_string+='\\par \\textbf{Aura} {0}\n'.format(
                    self.abilities['aura'])

        if self.languages:
            monster_string+='\\par \\textbf{Languages} {0}\n'.format(
                    self.languages)

        return monster_string
                
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
            print 'warning: key', key, 'not found'
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

#Convert a modifier to a string with + or - in front, as appropriate
def mstr(text):
    if is_number(text):
        modifier=int(text)
        if modifier<0:
            return '-'+str(modifier)
        else:
            return '+'+str(modifier)
    else:
        print 'not a modifier:', text
        return str(text)


if __name__ == "__main__":
    args = initialize_argument_parser()
    file_input = 'data/'+args["character_class"]+'.txt'
    barbarian = character(file_input)
    print barbarian
