import math
import classes
import equipment
import util
import combat

class Creature:

    def __init__(self, raw_stats, attributes, level):
        #Core variable initializations
        #http://stackoverflow.com/questions/9946736/python-not-creating-a-new-clean-instance

        self.level = level

        self._init_core_statistics()

        self._interpret_raw_stats(raw_stats)
        self._interpret_attributes(attributes)
        
        self._set_class_calculator()
        self._calculate_class_stats()

        self._add_level_scaling()
        self._calculate_derived_statistics()

    def _init_core_statistics(self):
        self.attack_bonus = util.AttackBonus()
        self.attack_damage = util.Modifier()
        self.attributes = util.Attributes()
        self.armor_class = util.ArmorClass()
        self.saves = util.SavingThrows()
        self.cmd = util.Modifier()

    def _interpret_raw_stats(self, raw_stats):
        self.name = raw_stats['name']
        if 'class' in raw_stats.keys():
            self.class_name = raw_stats['class']
        equipment_set = equipment.EquipmentSet.from_raw_stats(raw_stats)
        self.weapon = equipment_set.weapon
        self.armor = equipment_set.armor
        self.shield = equipment_set.shield
        if 'size' in raw_stats.keys():
            self.size = raw_stats['size']

    def _interpret_attributes(self, attributes):
        raw_attributes = dict()
        raw_attributes = util.dict_slice(attributes, util.attribute_titles, 
                util.conditional_int)
        for attribute_name in raw_attributes.keys():
            getattr(self.attributes, attribute_name).add_inherent(
                    raw_attributes[attribute_name])

        #Apply level-based scaling
        self._scale_attributes(attributes)
        
    #http://stackoverflow.com/questions/60208/replacements-for-switch-statement-in-python
    def _set_class_calculator(self):
        self.class_calculator = {
                'barbarian': classes.Barbarian,
                'bard': classes.Bard,
                'cleric': classes.Cleric,
                'druid': classes.Druid,
                'fighter': classes.Fighter,
                'monk': classes.Monk,
                'paladin': classes.Paladin,
                'ranger': classes.Ranger,
                'rogue': classes.Rogue,
                'sorcerer': classes.Sorcerer,
                'wizard': classes.Wizard,
                'warrior': classes.Warrior
                }[self.class_name](self.level)

    def _calculate_class_stats(self):
        #Calculate statistics based on the given class
        #note that we are hardcoding the call to barbarian
        #This needs to be made automatic later

        self.base_attack_bonus=self.class_calculator.calculate_base_attack_bonus()

        for title in util.save_titles:
            self.saves[title].add_inherent(self.class_calculator.calc_save(title))

        self.hp = calculate_hp(self.attributes['constitution'].total(), 
                self.class_calculator.hit_value, self.level)

        self.attack_bonus.add_all(self.class_calculator.attack_bonus)
        self.attack_damage.add_all(self.class_calculator.attack_damage)
        self.armor_class.add_all(self.class_calculator.armor_class)
        for key in self.class_calculator.saves.keys():
            self.saves[key].add_all(self.class_calculator.saves[key])

    def _calculate_derived_statistics(self):
        self.attack_damage.add_die(self.weapon.damage_die)
        if self.armor:
            self.armor_class.armor.add_inherent(self.armor.ac_bonus)
            if self.armor.encumbrance=='medium' or self.armor.encumbrance=='heavy':
                self.armor_class.dodge.add_inherent(util.ifloor(
                    self.attributes['dexterity'].total()/2))
        else:
            self.armor_class.dodge.add_inherent(
                    self.attributes['dexterity'].total())
        if self.shield:
            self.armor_class.shield.add_inherent(self.shield.ac_bonus)

        self.attack_bonus.add_inherent(self.base_attack_bonus)
        self.attack_bonus.add_inherent(self._calculate_attack_attribute_bonus())
        self.attack_damage.add_inherent(util.ifloor(
            self.attributes['strength'].total()/2))
        self._add_save_attributes()

        self.armor_class.dodge.add_inherent(util.ifloor(self.base_attack_bonus/2))

        self.cmd.add_inherent(self.armor_class.get_touch())
        self.cmd.add_inherent((self.base_attack_bonus+1)/2)
        self.cmd.add_inherent(self.attributes['strength'].total())

    #http://stackoverflow.com/questions/141545/overloading-init-in-python
    @classmethod
    def from_creature_name(cls, creature_name, level):
        creature_filename = 'data/'+creature_name+'.txt'
        raw_stats = util.parse_stats_from_file(creature_filename)
        attributes = util.parse_attribute_file(raw_stats)
        return cls(raw_stats, attributes, level)

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
        if self.armor:
            self.armor_class.armor.add_enhancement(scale_factor)
        if self.shield:
            self.armor_class.shield.add_enhancement(scale_factor)
        if self.weapon:
            self.attack_bonus.add_enhancement(scale_factor)
            self.attack_damage.add_enhancement(scale_factor)
        for save_title in self.saves.keys():
            self.saves[save_title].add_enhancement(scale_factor)

    def _scale_attributes(self, attributes):
        if 'bonus attribute 1' in attributes.keys():
            main_attribute = attributes['bonus attribute 1']
            main_increases = (2 + self.level)/4
            self.attributes[main_attribute].add_inherent(main_increases)
        if 'bonus attribute 2' in attributes.keys():
            second_attribute = attributes['bonus attribute 2']
            second_increases = (self.level)/4
            self.attributes[second_attribute].add_inherent(second_increases)

    def _calculate_attack_attribute_bonus(self):
        if self.weapon.encumbrance =='light':
            return max(self.attributes['strength'].total(),
                    self.attributes['dexterity'].total())
        else:
            return self.attributes['strength'].total()

    def __str__(self):
        full_string = self.name + ' ' + str(self.level)
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

    def dpr(self, ac):
        return combat.full_attack_damage_dealt(self.attack_bonus.total(),
                ac, self.base_attack_bonus, self.attack_damage.total())

    def hits_per_round(self, ac):
        return combat.full_attack_hits(self.attack_bonus.total(),
                ac, self.base_attack_bonus)

    def avg_hit_probability(self, ac):
        return combat.avg_hit_probability(self.attack_bonus.total(),
                ac, self.base_attack_bonus)

                
def calculate_hp(constitution, hit_value, level):
    return (constitution + hit_value) * level
