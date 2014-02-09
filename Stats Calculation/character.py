import math
import classes
import util

class Character:

    def __init__(self, raw_stats, level):
        #Core variable initializations
        #http://stackoverflow.com/questions/9946736/python-not-creating-a-new-clean-instance

        self.base_attack_bonus=0
        self.level = level
        self.attack_bonus=util.Modifier()
        self.attack_damage=util.Modifier()
        self.attributes = dict()
        for title in util.attribute_titles:
            self.attributes[title] = util.Modifier()
        self.armor_class = util.ArmorClass()
        self.has_armor = False
        self.has_shield = False
        self.has_weapon = False
        self.encumbrance = {'armor':None, 'weapon':None}
        self.saves = dict()
        for title in util.save_titles:
            self.saves[title] = util.Modifier()
        self.cmd = util.Modifier()
        self.hp = 0

        self._interpret_raw_stats(raw_stats)
        
        self._calculate_class_stats()

        #Calculate derived statistics
        self.attack_bonus.add_inherent(self.base_attack_bonus)
        self.attack_bonus.add_inherent(self.calculate_attack_attribute_bonus())
        self.attack_damage.add_inherent(util.ifloor(
            self.attributes['strength'].total()/2))
        self._add_save_attributes()
        self._add_level_scaling()

        if self.encumbrance['armor']=='medium' or self.encumbrance['armor']=='heavy':
            self.armor_class.dodge.add_inherent(util.ifloor(
                self.attributes['dexterity'].total()/2))
        else:
            self.armor_class.dodge.add_inherent(
                    self.attributes['dexterity'].total())
        self.armor_class.dodge.add_inherent(util.ifloor(self.base_attack_bonus/2))

        self.cmd.add_inherent(self.armor_class.get_touch())
        self.cmd.add_inherent(self.attributes['strength'].total())

    def _interpret_raw_stats(self, raw_stats):
        #Take statistics from the given character input file
        self.class_name = raw_stats['class']
        raw_attributes = dict()
        raw_attributes = util.dict_slice(raw_stats, util.attribute_titles, 
                util.conditional_int)
        for attribute in raw_attributes.keys():
            self.attributes[attribute].add_inherent(raw_attributes[attribute])

        #interpret items
        weapon = util.dict_slice(util.dict_match_prefix(raw_stats, 'weapon '), util.equipment_weapon_titles, util.conditional_int)
        armor = util.dict_slice(util.dict_match_prefix(raw_stats, 'armor '), util.equipment_armor_titles, util.conditional_int)
        shield = util.dict_slice(util.dict_match_prefix(raw_stats, 'shield '), util.equipment_armor_titles, util.conditional_int)

        self.has_armor = bool(armor)
        self.has_shield = bool(shield)
        self.has_weapon = bool(weapon)

        self.encumbrance['weapon'] = weapon['encumbrance']
        self.encumbrance['armor'] = armor['encumbrance']

        self.attack_damage.add_die(weapon['damage'])
        if armor.has_key('ac bonus'):
            self.armor_class.armor.add_inherent(armor['ac bonus'])
        if shield.has_key('ac bonus'):
            self.armor_class.shield.add_inherent(shield['ac bonus'])

        #Apply level-based scaling
        self.scale_attributes(raw_stats['bonus attribute 1'],
                raw_stats['bonus attribute 2'], int(raw_stats['level']))

    def _calculate_class_stats(self):
        #Calculate statistics based on the given class
        #note that we are hardcoding the call to barbarian
        #This needs to be made automatic later

        self.class_calculator = classes.Barbarian(self)
        self.base_attack_bonus=self.class_calculator.calculate_base_attack_bonus()

        for title in util.save_titles:
            self.saves[title].add_inherent(self.class_calculator.calc_save(title))

        self.hp = calculate_hp(self.attributes['constitution'].total(), 
                self.class_calculator.hit_value, self.level)

    def _add_save_attributes(self):
        self.saves['fortitude'].add_inherent(
                self.attributes['constitution'].total())
        self.saves['fortitude'].add_inherent(util.ifloor(
            self.attributes['strength'].total()/2))
        self.saves['reflex'].add_inherent(
                self.attributes['dexterity'].total())
        self.saves['reflex'].add_inherent(util.ifloor(
            self.attributes['wisdom'].total()/2))
        self.saves['will'].add_inherent(
                self.attributes['charisma'].total())
        self.saves['will'].add_inherent(util.ifloor(
            self.attributes['intelligence'].total()/2))

    def _add_level_scaling(self):
        scale_factor = self.level/4
        if self.has_armor:
            self.armor_class.armor.add_enhancement(scale_factor)
        if self.has_shield:
            self.armor_class.shield.add_enhancement(scale_factor)
        if self.has_weapon:
            self.attack_bonus.add_enhancement(scale_factor)
            self.attack_damage.add_enhancement(scale_factor)
        for save_title in self.saves.keys():
            self.saves[save_title].add_enhancement(scale_factor)

    def scale_attributes(self, main_attribute, second_attribute, raw_level):
        main_increases = (3 + self.level - raw_level)/4
        second_increases = (1 + self.level - raw_level)/4
        if main_increases<0 or second_increases<0:
            print 'ERROR: character level lower than raw level'
        self.attributes[main_attribute].add_inherent(main_increases)
        self.attributes[second_attribute].add_inherent(second_increases)

    def calculate_attack_attribute_bonus(self):
        if self.encumbrance['weapon']=='light':
            return max(self.attributes['strength'].total(),
                    self.attributes['dexterity'].total())
        else:
            return self.attributes['strength'].total()

    def __str__(self):
        full_string = self.class_name + ' ' + str(self.level)
        full_string += '\n'+ self._to_string_defenses() 
        full_string += '\n' + self._to_string_attacks() 
        full_string += '\n' + self._to_string_attributes()
        return full_string

    def _to_string_defenses(self):
        defenses = str(self.armor_class)
        defenses += '; CMD '+str(self.cmd.total())
        defenses += '\nHP '+str(self.hp)
        defenses += '; Fort '+util.mstr(self.saves['fortitude'].total())
        defenses += ', Ref '+util.mstr(self.saves['reflex'].total())
        defenses += ', Will '+util.mstr(self.saves['will'].total())
        return defenses

    def _to_string_attacks(self):
        attacks = 'Atk ' + util.mstr(self.attack_bonus.total())
        attacks += ' ('+ str(self.attack_damage.total()) + ')'
        return attacks

    def _to_string_attributes(self):
        attributes = 'Attr'
        for title in util.attribute_titles:
            attributes += ' ' + str(self.attributes[title].total())
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
