import re
import math

class Bonuses:

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

    def add_die(self, die):
        if die_average(die)>die_average(self.die):
            self.die=die

    def total(self):
        total = sum([self.inherent, self.enhancement, self.competence,
            self.circumstance])
        print type(total)
        #return int if there are no dice
        if self.die:
            return die_average(self.die) + total
        else:
            return total

class ArmorClass:
    def __init__(self):
        self.misc = Bonuses()
        self.armor = Bonuses()
        self.shield = Bonuses()
        self.dodge = Bonuses()
        self.natural_armor = Bonuses()
        self.misc.add_inherent(10)

    def get_normal(self):
        normal = sum([self.misc.total(), self.shield.total(), self.dodge.total()])
        normal += sum_armor(self.armor.total(), self.natural_armor.total())
        return normal

    def get_touch(self):
        return sum([self.misc.total(), self.shield.total(), self.dodge.total()])

    def get_flatfooted(self):
        flatfooted = self.misc.total()
        flatfooted += sum_armor(self.armor.total(), self.natural_armor.total())
        return flatfooted

    def __str__(self):
        ac = 'AC ' + str(self.get_normal())
        ac += ', touch ' + str(self.get_touch())
        ac += ', flat-footed ' + str(self.get_flatfooted())
        return ac

def sum_armor(armor, natural_armor):
    if armor >= natural_armor:
        return armor + math.floor(natural_armor/2)
    else:
        return natural_armor + math.floor(armor/2)

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
            return '-'+str(modifier)
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
