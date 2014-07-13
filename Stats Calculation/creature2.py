from strings import *
import equipment, util
from abilities import abilities
from level_progressions import classes

class Creature(object):
    def __init__(self, raw_stats, raw_attributes, level=None,
            verbose=False):
        self.attacks = {
                ATTACK_BONUS: None,
                MANEUVER_BONUS: None,
                WEAPON_DAMAGE_PRIMARY: None,
                WEAPON_DAMAGE_SECONDARY: None,
                }
        self.attributes = {}
        for attribute_name in ATTRIBUTE_NAMES:
            self.attributes[attribute_name] = None
        self.core = {
                HIT_POINTS: 0,
                HIT_VALUE: None,
                INITIATIVE: None,
                REACH: None,
                SIZE: None,
                SPACE: None,
                SPEED: None,
                }
        self.defenses = {
                AC: None,
                MC: None,
                FORTITUDE: None,
                REFLEX: None,
                WILL: None,
                DR: None,
                }
        self.meta = {
                ALIGNMENT: None,
                LEVEL: level,
                LEVEL_PROGRESSION: None,
                NAME: None,
                VERBOSE: verbose,
                }
        self.items = {
                ARMOR: None,
                SHIELD: None,
                WEAPON_PRIMARY: None,
                WEAPON_SECONDARY: None,
                }

        self.abilities = set()
        self.raw_stats = raw_stats
        self.raw_attributes = raw_attributes

        self._update()

    def _update(self):
        self._init_objects()
        self._interpret_raw_stats()
        self._interpret_raw_attributes()
        self._apply_level_progression()

        self._calculate_derived_statistics()
        self.core[HIT_POINTS] = (self.attributes[CON].get_total()/2 +
                self.core[HIT_VALUE] * self.meta[LEVEL])
        self._update_level_scaling()

    def _init_objects(self):
        self.attacks[ATTACK_BONUS] = util.AttackBonus()
        self.attacks[MANEUVER_BONUS] = util.ManeuverBonus()
        self.attacks[WEAPON_DAMAGE_PRIMARY] = util.Modifier()
        self.attacks[WEAPON_DAMAGE_SECONDARY] = util.Modifier()
        for attribute in ATTRIBUTES:
            self.attributes[attribute] = util.Modifier()
        self.defenses[AC] = util.ArmorClass()
        self.defenses[MC] = util.Modifier()
        self.defenses[DR] = util.DamageReduction()
        for save in SAVES:
            self.defenses[save] = util.SavingThrow()
        self.core[INITIATIVE] = util.Modifier()

    def _interpret_raw_stats(self):
        raw_stats = self.raw_stats
        #set meta
        if self.meta[LEVEL] is None:
            self.meta[LEVEL] = int(raw_stats['level'])
        if 'alignment' in raw_stats.keys():
            self.meta[ALIGNMENT] = raw_stats['alignment']
        self.meta[NAME] = raw_stats['name']
        if 'class' in raw_stats.keys():
            self.meta[LEVEL_PROGRESSION] = classes[
                    raw_stats['class']]

        #set core
        if 'size' in raw_stats.keys():
            self.core[SIZE] = raw_stats['size']
        else:
            self.core[SIZE] = SIZE_MEDIUM
        self.core[SPACE], self.core[REACH], self.core[SPEED] = util.get_size_statistics(self.core[SIZE])

        #set items
        equipment_set = equipment.EquipmentSet.from_raw_stats(
                raw_stats)
        self.items[WEAPON_PRIMARY] = equipment_set.weapon
        self.items[WEAPON_SECONDARY] = equipment_set.offhand_weapon
        self.items[ARMOR] = equipment_set.armor
        self.items[SHIELD] = equipment_set.shield
        for weapon in WEAPONS:
            if self.items[weapon] is not None:
                self.items[weapon].set_size(self.core[SIZE])

        #Add all the abilities to the character
        for ability_type in ABILITY_TYPES:
            if ability_type in raw_stats.keys():
                for ability_name in raw_stats[ability_type]:
                    self.add_ability(abilities[ability_name])

    def _interpret_raw_attributes(self):
        raw_attributes = self.raw_attributes
        for attribute_name in ATTRIBUTE_NAMES:
            #use try/except to allow missing attributes
            try:
                self.attributes[attribute_name].add_inherent(
                    util.conditional_int(raw_attributes[attribute_name]))
            except ValueError:
                self.print_verb('missing attribute')

        #Apply level-based scaling
        self._scale_attributes_by_level(raw_attributes)

    def _scale_attributes_by_level(self, raw_attributes):
        try:
            main_attribute = raw_attributes['bonus attribute 1']
            main_increases = (2 + self.meta[LEVEL])/4
            self.attributes[main_attribute].add_inherent(
                    main_increases)
        except ValueError:
            self.print_verb('Missing bonus attribute 1')
        try:
            second_attribute = raw_attributes['bonus attribute 2']
            second_increases = (self.meta[LEVEL])/4
            self.attributes[second_attribute].add_inherent(
                    second_increases)
        except ValueError:
            self.print_verb('%s missing bonus attribute 2' % 
                    self.meta[NAME])

    def _update_level_scaling(self):
        scale_factor = self.meta[LEVEL]/4
        self.defenses[AC].armor.add_enhancement(scale_factor)
        if self.items[SHIELD]:
            self.defenses[AC].shield.add_enhancement(scale_factor)
        if self.items[WEAPON_PRIMARY]:
            self.attacks[ATTACK_BONUS].add_enhancement(scale_factor)
            for weapon_damage in WEAPON_DAMAGES:
                self.attacks[weapon_damage].add_enhancement(scale_factor)
        for save in SAVES:
            self.defenses[save].add_enhancement(scale_factor)

    def _apply_level_progression(self):
        self.attacks[ATTACK_BONUS].set_progression(
                self.meta[LEVEL_PROGRESSION].bab_progression)
        for save in SAVES:
            self.defenses[save].set_progression(
                    self.meta[LEVEL_PROGRESSION].save_progressions[save])
        self.core[HIT_VALUE] = self.meta[LEVEL_PROGRESSION].hit_value
        self.meta[LEVEL_PROGRESSION].apply_modifications(self)

    def add_ability(self, ability, check_prerequisites = True):
        if check_prerequisites:
            if not ability.meets_prerequisites(self):
                self.print_verb('Ability prerequisites not met')
                return False
        #Templates must be applied later
        if not ability.has_tag(ABILITY_TEMPLATE):
            ability.apply_benefit(self)
        self.abilities.add(ability)
        return True

    def _calculate_derived_statistics(self):
        self.attacks[ATTACK_BONUS].set_level(self.meta[LEVEL])
        self.attacks[MANEUVER_BONUS].set_level(self.meta[LEVEL])
        for save in SAVES:
            self.defenses[save].set_level(self.meta[LEVEL])

        dexterity_to_ac = self.attributes[DEX].get_total()
        if self.items[ARMOR] is not None:
            self.defenses[AC].armor.add_inherent(self.items[ARMOR].ac_bonus)
            if self.items[ARMOR].encumbrance=='medium' or self.items[ARMOR].encumbrance=='heavy':
                dexterity_to_ac /=2
        self.defenses[AC].dodge.add_inherent(dexterity_to_ac)

        if self.items[SHIELD] is not None:
            self.defenses[AC].shield.add_inherent(
                    self.items[SHIELD].ac_bonus)

        self.attacks[ATTACK_BONUS].add_inherent(self._calculate_attack_attribute_bonus())
        self.attacks[ATTACK_BONUS].add_inherent(util.get_size_modifier(self.core[SIZE]))
        self.attacks[MANEUVER_BONUS].set_attributes(self.attributes[STR],
                self.attributes[DEX])
        self.attacks[MANEUVER_BONUS].add_inherent(util.get_size_modifier(
            self.core[SIZE], is_special_size_modifier=True))

        self.attacks[WEAPON_DAMAGE_PRIMARY].add_inherent(
                self.attributes[STR].get_total()/2)

        self._add_save_attributes()

        self.defenses[AC].dodge.add_inherent(
                util.ifloor(self.attacks[ATTACK_BONUS].base_attack_bonus/2))

        self.defenses[MC].add_inherent(self.defenses[AC].touch())
        self.defenses[MC].add_inherent(self.attacks[ATTACK_BONUS].base_attack_bonus/2)
        self.defenses[MC].add_inherent(self.attributes[STR].get_total())

        self.core[INITIATIVE].add_inherent(self.attributes[DEX].get_total())
        self.core[INITIATIVE].add_inherent(self.attributes[WIS].get_total()/2)

        #Assume user has basic feats
        self.add_ability(abilities['overwhelming force'])
        self.add_ability(abilities['two weapon fighting'])
        self.add_ability(abilities['two weapon defense'])

    def _calculate_attack_attribute_bonus(self):
        #we are assuming offhand weapon is no heavier than main weapon
        if self.items[WEAPON_PRIMARY].encumbrance =='light':
            return max(self.attributes[STR].get_total(),
                    self.attributes[DEX].get_total())
        else:
            return self.attributes[STR].get_total()


    def _add_save_attributes(self):
        self.defenses[FORTITUDE].add_inherent(
                self.attributes[CON].get_total())
        self.defenses[FORTITUDE].add_inherent(util.ifloor(
            self.attributes[STR].get_total()/2))
        self.defenses[REFLEX].add_inherent(
                self.attributes[DEX].get_total())
        self.defenses[REFLEX].add_inherent(util.ifloor(
            self.attributes[WIS].get_total()/2))
        self.defenses[WILL].add_inherent(
                self.attributes[CHA].get_total())
        self.defenses[WILL].add_inherent(util.ifloor(
            self.attributes[INT].get_total()/2))
        
    @classmethod
    def from_creature_name(cls, creature_name, level, verbose=False):
        creature_filename = 'data/'+creature_name+'.txt'
        raw_stats = util.parse_stats_from_file(creature_filename)
        raw_attributes = util.parse_attribute_file(raw_stats)
        return cls(raw_stats, raw_attributes, level, verbose)

    def print_verb(self, message):
        if self.meta[VERBOSE]:
            print message

    def __str__(self):
        full_string = '%s %s' % (self.meta[NAME],
                str(self.meta[LEVEL]))
        full_string += '\n'+ self._to_string_defenses() 
        full_string += '\n' + self._to_string_attacks() 
        full_string += '\n' + self._to_string_attributes()
        return full_string

    def _to_string_defenses(self):
        defenses = str(self.defenses[AC])
        defenses += '; maneuver_class '+str(
                self.defenses[MC].get_total())
        defenses += '\nHP '+str(self.core[HIT_POINTS])
        defenses += '; Fort '+util.mstr(self.defenses[FORTITUDE].get_total())
        defenses += ', Ref '+util.mstr(self.defenses[REFLEX].get_total())
        defenses += ', Will '+util.mstr(self.defenses[WILL].get_total())
        return defenses

    def _to_string_attacks(self):
        attacks = 'Atk ' + util.mstr(self.attacks[ATTACK_BONUS].get_total())
        attacks += ' ('+ str(self.attacks[WEAPON_DAMAGE_PRIMARY].get_total()) + ')'
        return attacks

    def _to_string_attributes(self):
        attributes = 'Attr'
        for attribute_name in ATTRIBUTE_NAMES:
            attributes += ' ' + str(self.attributes[attribute_name].get_total())
        return attributes
