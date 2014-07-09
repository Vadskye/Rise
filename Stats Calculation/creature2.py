from strings import *

class Creature(object):
    def __init__(self):
        self.attacks = {
                ATTACK_BONUS = None,
                WEAPON_DAMAGE_PRIMARY = None,
                WEAPON_DAMAGE_SECONDARY = None,
                MANUEVER_BONUS = None,
                WEAPON_DAMAGES = (self.attacks[WEAPON_DAMAGE_PRIMARY],
                    self.attacks[WEAPON_DAMAGE_SECONDARY])
                }
        self.attributes = {}
        for attribute_name in ATTRIBUTE_NAMES:
            self.attributes[attribute_name] = None
        self.core = {
                HIT_POINTS = 0,
                HIT_VALUE = None,
                INITIATIVE = None,
                REACH = None,
                SIZE = None,
                SPACE = None,
                SPEED = None,
                }
        self.defenses = {
                AC = None,
                MC = None,
                FORTITUDE = None,
                REFLEX = None,
                WILL = None,
                SAVES = (self.defenses[FORTITUDE],
                    self.defenses[REFLEX], self.defenses[WILL])
                }
        self.meta = {
                ALIGNMENT = None
                LEVEL = None,
                LEVEL_PROGRESSION = None,
                NAME = None,
                }
        self.items = {
                ARMOR = None,
                SHIELD = None,
                WEAPON_PRIMARY = None,
                WEAPON_SECONDARY = None,
                WEAPONS = (self.items[WEAPON_PRIMARY],
                    self.items[WEAPON_SECONDARY]),
                }

        self.abilities = set()
        self.attributes = None

    def _update(self):
        self.core[HIT_POINTS] = (self.attributes[CON].get_total()/2 +
                self.meta[HIT_VALUE] * self.meta[LEVEL]
        self._update_level_scaling()

    def _interpret_raw_stats(self, raw_stats):
        #set meta
        self.meta[LEVEL] = int(raw_stats['level'])
        if 'alignment' in raw_stats.keys():
            self.meta[ALIGNMENT] = raw_stats['alignment']
        self.meta[NAME] = raw_stats['name']
        if 'class' in raw_stats.keys():
            self.meta[LEVEL_PROGRESSION] = \
                    classes.get_level_progression_by_name(
                            raw_stats['class'])(self.meta[LEVEL]) 

        #set core
        if 'size' in raw_stats.keys():
            self.core[SIZE] = raw_stats['size']
        else:
            self.core[SIZE] = SIZE_MEDIUM
        self.core[SPACE], self.core[REACH], self.core[SPEED] = util.get_size_statistics(self.size)

        #set items
        equipment_set = equipment.EquipmentSet.from_raw_stats(
                raw_stats)
        self.items[WEAPON_PRIMARY] = equipment_set.weapon
        self.items[WEAPON_SECONDARY] = equipment_set.offhand_weapon
        self.items[ARMOR] = equipment_set.armor
        self.items[SHIELD] = equipment_set.shield
        for weapon in self.items[WEAPONS]:
            weapon.set_size(self.core[SIZE])

        #Add all the abilities to the character
        for ability_type in ABILITY_TYPES:
            if ability_type in raw_stats.keys():
                for ability_name in raw_stats[ability_type]:
                    self.add_ability(abilities[ability_name])

    def _interpret_raw_attributes(self, raw_attributes):
        for attribute_name in ATTRIBUTE_NAMES:
            #use try/except to allow missing attributes
            try:
                getattr(self, attribute_name).add_inherent(
                    conditional_int(raw_attributes[attribute_name]))
            except:
                self.print_verb('missing attribute')

        #Apply level-based scaling
        self._scale_attributes_by_level(raw_attributes)

    def _scale_attributes_by_level(self, raw_attributes):
        try:
            main_attribute = raw_attributes['bonus attribute 1']
            main_increases = (2 + self.level)/4
            self.attributes[main_attribute].add_inherent(
                    main_increases)
        except:
            self.print_verb('Missing bonus attribute 1')
        try:
            second_attribute = raw_attributes['bonus attribute 2']
            second_increases = (self.level)/4
            self.attributes[second_attribute.add_inherent(
                    second_increases)
        except:
            self.print_verb('%s missing bonus attribute 2' % 
                    self.meta[NAME])

    def _update_level_scaling(self):
        scale_factor = self.level/4
        self.defenses[AC].armor.add_enhancement(scale_factor)
        if self.shield:
            self.defenses[AC].shield.add_enhancement(scale_factor)
        if self.weapon:
            self.attacks[ATTACK_BONUS].add_enhancement(scale_factor)
            for weapon_damage in self.attacks[WEAPON_DAMAGES]:
                weapon_damage.add_enhancement(scale_factor)
        for save in self.defenses[SAVES]:
            save.add_enhancement(scale_factor)

    def add_ability(self, ability, check_prerequisites = True):
        if check_prerequisites:
            if not ability.meets_prerequisites(self):
                self.printverb('Ability prerequisites not met')
                return False
        #Templates must be applied later
        if not ability.has_tag(ABILITY_TEMPLATE):
            ability.apply_benefit(self)
        self.abilities.add(ability)
        return True
        
    @classmethod
    def from__creature_name(cls, creature_name, level):
        creature_filename = 'data/'+creature_name+'.txt'
        raw_stats = util.parse_stats_from_file(creature_filename)
        raw_attributes = util.parse_attribute_file(raw_stats)
        self._interpret_raw_stats(raw_stats)
        self._interpret_raw_attributes(raw_attributes)
        self.meta[LEVEL_PROGRESSION].apply_progressions(self)
        self.meta[LEVEL_PROGRESSION].apply_modifications(self)

    def print_verb(self, message):
        if self.meta[VERBOSE]:
            print message
