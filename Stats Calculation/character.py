import math
import classes
import util

attribute_titles = ['strength', 'dexterity', 'constitution', 'intelligence', 
        'wisdom', 'charisma']
ac_modifier_titles = ['armor', 'shield', 'dodge', 'natural armor', 'misc']
weapon_titles = ['damage', 'encumbrance']
armor_titles = ['ac bonus', 'encumbrance', 'check penalty', 'arcane spell failure']
save_titles = ['fortitude', 'reflex', 'will']
ac_titles = ['normal', 'touch', 'flat-footed']

class Character:

    def __init__(self, raw_stats, level):
        #Core variable initializations
        #http://stackoverflow.com/questions/9946736/python-not-creating-a-new-clean-instance

        self.base_attack_bonus=0
        self.level=0
        self.attack_bonus=util.Bonuses()
        self.attack_damage=util.Bonuses()
        self.attributes = dict()
        self.ac_modifiers = dict()
        for title in ac_modifier_titles:
            self.ac_modifiers[title] = 0
        self.armor = dict()
        self.shield = dict()
        self.weapon = dict()
        self.saves = dict()
        self.ac = dict()
        self.cmd = 10
        self.hp = 0

        #Take statistics from the given character input file
        self.class_name = raw_stats['class']
        self.level = level
        self.attributes = util.dict_slice(raw_stats, attribute_titles, util.conditional_int)
        self.weapon = util.dict_slice(util.dict_match_prefix(raw_stats, 'weapon '), weapon_titles, util.conditional_int)
        self.armor = util.dict_slice(util.dict_match_prefix(raw_stats, 'armor '), armor_titles, util.conditional_int)
        self.shield = util.dict_slice(util.dict_match_prefix(raw_stats, 'shield '), armor_titles, util.conditional_int)
        if self.armor.has_key('ac bonus'):
            self.ac_modifiers['armor']=self.armor['ac bonus']
        else:
            self.ac_modifiers['armor']=0
        if self.shield.has_key('ac bonus'):
            self.ac_modifiers['shield']=self.shield['ac bonus']
        else:
            self.ac_modifiers['shield']=0

        #Apply level-based scaling
        self.scale_attributes(raw_stats['bonus attribute 1'],
                raw_stats['bonus attribute 2'], int(raw_stats['level']))

        #Calculate statistics based on the given class
        #note that we are hardcoding the call to barbarian
        #This needs to be made automatic later
        self.class_calculator = classes.Barbarian(self.level)
        self.base_attack_bonus=self.class_calculator.calculate_base_attack_bonus()
        for title in save_titles:
            self.saves[title] = self.class_calculator.calc_save(title) 
        self.hp = calculate_hp(self.attributes['constitution'], 
                self.class_calculator.hit_value, self.level)

        #Calculate derived statistics
        self.attack_bonus.add_inherent(self.base_attack_bonus)
        self.attack_bonus.add_inherent(self.calculate_attack_attribute_bonus())
        self.attack_damage.add_inherent(math.floor(self.attributes['strength']/2))
        self.attack_damage.add_die(self.weapon['damage'])
        for title in ac_titles:
            self.ac[title] = calculate_armor_class(self.armor['encumbrance'],
                    self.attributes['dexterity'], self.base_attack_bonus, 
                    self.ac_modifiers, title) 
        self.cmd = calculate_cmd(self.ac['touch'], self.attributes['strength'])

    def scale_attributes(self, main_attribute, second_attribute, raw_level):
        main_increases = (3 + self.level - raw_level)/4
        second_increases = (1 + self.level - raw_level)/4
        if main_increases<0 or second_increases<0:
            print 'ERROR: character level lower than raw level'
        self.attributes[main_attribute]+=main_increases
        self.attributes[second_attribute]+=second_increases

    def calculate_attack_attribute_bonus(self):
        if self.weapon['encumbrance']=='light':
            return max(self.attributes['strength'],self.attributes['dexterity'])
        else:
            return self.attributes['strength']

    def __str__(self):
        full_string = self.to_string_defenses() 
        full_string += '\n' + self.to_string_attacks() 
        full_string += '\n' + self.to_string_attributes()
        return full_string

    def to_string_defenses(self):
        defenses = 'AC ' + str(self.ac['normal'])
        defenses += ', touch ' + str(self.ac['touch'])
        defenses += ', flat-footed ' + str(self.ac['flat-footed'])
        defenses += '; CMD '+str(self.cmd)
        defenses += '\nHP '+str(self.hp)
        defenses += '; Fort '+util.mstr(self.saves['fortitude'])
        defenses += ', Ref '+util.mstr(self.saves['reflex'])
        defenses += ', Will '+util.mstr(self.saves['will'])
        return defenses

    def to_string_attacks(self):
        attacks = 'Atk ' + util.mstr(self.attack_bonus.total())
        attacks += ' ('+ str(self.attack_damage.total()) + ')'
        return attacks

    def to_string_attributes(self):
        attributes = ''
        return attributes


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
                

def calculate_attack_bonus(base_attack_bonus, attribute_bonus):
    return base_attack_bonus + attribute_bonus()

def calculate_attack_damage(strength, weapon_damage_die):
    return  + util.die_average(weapon_damage_die)

def calculate_armor_class(armor_encumbrance, dexterity, base_attack_bonus,
        ac_modifiers, ac_title):
    if armor_encumbrance=='medium' or armor_encumbrance=='heavy':
        dexterity_bonus=dexterity/2
    else:
        dexterity_bonus=dexterity
    
    ac = 10 + dexterity_bonus + base_attack_bonus/2
    for modifier in ac_modifiers.values():
        ac+=modifier
    if ac_title == ac_titles[0]: #normal AC
        #apply all modifiers
        return ac
    elif ac_title == ac_titles[1]: #touch AC
        #apply all except armor, natural armor
        return ac-ac_modifiers['armor']-ac_modifiers['natural armor']
    elif ac_title == ac_titles[2]: #flat-footed AC
        #apply all except shield, dodge, bab
        return ac-ac_modifiers['shield'] - ac_modifiers['dodge']-dexterity_bonus - base_attack_bonus/2

def calculate_cmd(touch_ac, strength):
    return touch_ac + strength

def calculate_hp(constitution, hit_value, level):
    return (constitution + hit_value) * level
