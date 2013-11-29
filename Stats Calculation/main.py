import argparse
import math

class character:
    level=None
    raw_stats=dict()
    base_attack_bonus=None
    attack_bonus=None

    def __init__(self, character_file_name):
        character_file = open(character_file_name,'r')
        for line in character_file:
            #ignore comments
            line = line.strip()
            line = line.split('#',1)[0]
            #Separate data from data label
            line = line.split('=',1)
            self.raw_stats[line[0]]=line[1]
        self.set_level(1)
        self.bab = raw_stats['bab']
        self.armor_class = raw_stats['armor_class']
        self.attack_bonus = raw_stats['attack_bonus']
        self.attack_damage = raw_stats['attack_damage']
        self.strength = raw_stats['strength']
        self.dexterity = raw_stats['dexterity']
        self.constitution = raw_stats['constitution']
        self.intelligence = raw_stats['intelligence']
        self.wisdom = raw_stats['wisdom']
        self.charisma = raw_stats['charisma']

    def set_level(self, level):
        self.level=level
        self.base_attack_bonus=self.calculate_base_attack_bonus()
        self.attack_bonus = self.calculate_attack_bonus()

    def calculate_base_attack_bonus(self):
        bab_prog = self.raw_stats["bab"]
        if bab_prog=='good':
            return self.level
        elif bab_prog=='average':
            return (self.level*3)/4
        else:
            return self.level/2
    
    def calculate_attack_bonus(self):
        return self.base_attack_bonus+self.attack_attribute_bonus;
        
    def calculate_attack_attribute_bonus(self):
        if self.raw_stats['weapon encumbrance']=='light':
            return max(self.strength,self.dexterity)
        else:
            return self.strength


def initialize_argument_parser():
    parser = argparse.ArgumentParser(description='Calculate combat statistics for Rise characters')
    parser.add_argument('-c', dest='character_class', help='the character class', default='brb-heavy')
    return vars(parser.parse_args())

if __name__ == "__main__":
    args = initialize_argument_parser()
    class_file = 'data/'+args["character_class"]+'.txt'
    barbarian = character(class_file)
    print barbarian.base_attack_bonus
