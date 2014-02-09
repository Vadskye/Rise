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
        self.armor_class = util.ArmorClass()
        self.armor = dict()
        self.shield = dict()
        self.weapon = dict()
        self.saves = dict()
        for title in save_titles:
            self.saves[title] = util.Bonuses()
        self.cmd = util.Bonuses()
        self.hp = 0

        #Take statistics from the given character input file
        self.class_name = raw_stats['class']
        self.level = level
        self.attributes = util.dict_slice(raw_stats, attribute_titles, util.conditional_int)
        self.weapon = util.dict_slice(util.dict_match_prefix(raw_stats, 'weapon '), weapon_titles, util.conditional_int)
        self.armor = util.dict_slice(util.dict_match_prefix(raw_stats, 'armor '), armor_titles, util.conditional_int)
        self.shield = util.dict_slice(util.dict_match_prefix(raw_stats, 'shield '), armor_titles, util.conditional_int)
        if self.armor.has_key('ac bonus'):
            self.armor_class.armor.add_inherent(self.armor['ac bonus'])
        if self.shield.has_key('ac bonus'):
            self.armor_class.shield.add_inherent(self.shield['ac bonus'])

        #Apply level-based scaling
        self.scale_attributes(raw_stats['bonus attribute 1'],
                raw_stats['bonus attribute 2'], int(raw_stats['level']))

        #Calculate statistics based on the given class
        #note that we are hardcoding the call to barbarian
        #This needs to be made automatic later

        self.class_calculator = classes.Barbarian(self.level)
        self.base_attack_bonus=self.class_calculator.calculate_base_attack_bonus()

        for title in save_titles:
            self.saves[title].add_inherent(self.class_calculator.calc_save(title))

        self.hp = calculate_hp(self.attributes['constitution'], 
                self.class_calculator.hit_value, self.level)

        #Calculate derived statistics
        self.attack_bonus.add_inherent(self.base_attack_bonus)
        self.attack_bonus.add_inherent(self.calculate_attack_attribute_bonus())
        self.attack_damage.add_inherent(util.ifloor(self.attributes['strength']/2))
        self.attack_damage.add_die(self.weapon['damage'])

        if self.armor['encumbrance']=='medium' or self.armor['encumbrance']=='heavy':
            self.armor_class.dodge.add_inherent(util.ifloor(self.attributes['dexterity']/2))
        else:
            self.armor_class.dodge.add_inherent(self.attributes['dexterity'])
        self.armor_class.dodge.add_inherent(util.ifloor(self.base_attack_bonus/2))

        self.cmd.add_inherent(self.armor_class.get_touch())
        self.cmd.add_inherent(self.attributes['strength'])

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
        defenses = str(self.armor_class)
        defenses += '; CMD '+str(self.cmd.total())
        defenses += '\nHP '+str(self.hp)
        defenses += '; Fort '+util.mstr(self.saves['fortitude'].total())
        defenses += ', Ref '+util.mstr(self.saves['reflex'].total())
        defenses += ', Will '+util.mstr(self.saves['will'].total())
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
                
def calculate_hp(constitution, hit_value, level):
    return (constitution + hit_value) * level
