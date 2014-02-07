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
        raw_stats = util.parse_stats_from_file(character_file_name)
        self.class_name = raw_stats['class']
        self.level = int(raw_stats['level'])
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
        return math.floor(self.attributes['strength']/2) + util.die_average(self.weapon['damage'])

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
                'Fort '+util.mstr(self.saves['fortitude'])+', Ref '+util.mstr(self.saves['reflex'])+ \
                ', Will '+util.mstr(self.saves['will'])+'\n'

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
                
