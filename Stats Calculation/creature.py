from strings import *
import equipment, util
from abilities import get_ability_by_name

def generate_creature_from_file_name(original_file_name, level=None, verbose=False):
    file_name = util.fix_creature_file_name(original_file_name)
    try:
        assert file_name
    except AssertionError:
        raise Exception("Could not find file for " + original_file_name)
        
    creature_file = open(file_name, 'r')
    raw_stats = util.parse_stats_from_file(creature_file)
    assert raw_stats
    if level is not None:
        raw_stats[LEVEL] = level
    return generate_creature_from_raw_stats(raw_stats, verbose)
    #TODO: handle creature groups

def generate_creature_from_raw_stats(raw_stats, verbose):
    if CLASS in raw_stats:
        return generate_creature_from_class_name(raw_stats[CLASS], raw_stats, verbose)
    if CREATURE_TYPE in raw_stats:
        return generate_creature_from_creature_type(raw_stats[CREATURE_TYPE], raw_stats, verbose)
    raise Exception("Could not generate creature from raw stats")

def generate_creature_from_class_name(class_name, raw_stats, verbose):
    try:
        creature_class = {
                'barbarian': Barbarian,
                'cleric': Cleric,
                'druid': Druid,
                'fighter': Fighter,
                'monk': Monk,
                'paladin': Paladin,
                'ranger': Ranger,
                'rogue': Rogue,
                'spellwarped': Spellwarped,
                'sorcerer': Sorcerer,
                'warrior': Warrior,
                'wizard': Wizard,
                }[class_name]
    except KeyError:
        raise Exception("Class name " + class_name + " not recognized")
    return creature_class(raw_stats, verbose)

def generate_creature_from_creature_type(creature_type, raw_stats, verbose): 
    return {
            ABERRATION: Aberration,
            ANIMAL: Animal,
            CONSTRUCT: Construct,
            FEY: Fey,
            HUMANOID: Humanoid,
            IDEAL: IdealCreature,
            MAGICAL_BEAST: MagicalBeast,
            MONSTROUS_HUMANOID: MonstrousHumanoid,
            OOZE: Ooze,
            OUTSIDER: Outsider,
            PLANT: Plant,
            UNDEAD: Undead,
            }[creature_type](raw_stats, verbose)

class Creature(object):
    def __init__(self, raw_stats, verbose):
        self.attacks = {
                ATTACK_BONUS: None,
                MANEUVER_BONUS: None,
                DAMAGE: {
                    WEAPON_PRIMARY: None,
                    WEAPON_SECONDARY: None,
                    },
                }
        self.attributes = {}
        for attribute_name in ATTRIBUTE_NAMES:
            self.attributes[attribute_name] = None
        self._core = {
                HIT_POINTS: None,
                INITIATIVE: None,
                REACH: None,
                SIZE: SIZE_MEDIUM,
                SPACE: None,
                SPEEDS: {},
                }
        self._combat = {
                CURRENT_HIT_POINTS: 0,
                CRITICAL_DAMAGE: 0,
                }
        self._defenses = {
                AC: None,
                MC: None,
                FORTITUDE: None,
                REFLEX: None,
                WILL: None,
                DR: None,
                SPECIAL: None,
                }
        self._progressions = {
                BAB: None,
                FORT: None,
                REF: None,
                WILL: None,
                HIT_VALUE: None,
                NATURAL_ARMOR: None,
                }
        self.meta = {
                ALIGNMENT: 'Neutral',
                COMBAT_DESCRIPTION: None,
                DESCRIPTION: None,
                LEVEL: 1,
                NAME: None,
                USE_MAGIC_BONUSES: False,
                VERBOSE: verbose,
                }
        self.items = {
                ARMOR: None,
                SHIELD: None,
                WEAPON_PRIMARY: None,
                WEAPON_SECONDARY: None,
                }
        self.skills = dict()

        self.abilities = {
                ACTIVE: list(),
                INACTIVE: list(),
                }
        self.raw_stats = raw_stats

        self.update()

    @property
    def active_abilities(self):
        return self.abilities[ACTIVE]

    @active_abilities.setter
    def active_abilities(self, value):
        self.abilities[ACTIVE] = value

    @property
    def inactive_abilities(self):
        return self.abilities[INACTIVE]

    @inactive_abilities.setter
    def inactive_abilities(self, value):
        self.abilities[INACTIVE] = value

    @property
    def attack_bonus(self):
        return self.attacks[ATTACK_BONUS]

    @attack_bonus.setter
    def attack_bonus(self, value):
        self.attacks[ATTACK_BONUS] = value

    @property
    def maneuver_bonus(self):
        return self.attacks[MANEUVER_BONUS]

    @maneuver_bonus.setter
    def maneuver_bonus(self, value):
        self.attacks[MANEUVER_BONUS] = value

    @property
    def primary_weapon_damage(self):
        return self.attacks[DAMAGE][WEAPON_PRIMARY]

    @primary_weapon_damage.setter
    def primary_weapon_damage(self, value):
        self.attacks[DAMAGE][WEAPON_PRIMARY] = value

    @property
    def secondary_weapon_damage(self):
        return self.attacks[DAMAGE][WEAPON_SECONDARY]

    @secondary_weapon_damage.setter
    def secondary_weapon_damage(self, value):
        self.attacks[DAMAGE][WEAPON_SECONDARY] = value

    @property
    def strength(self):
        return self.attributes[STRENGTH]

    @strength.setter
    def strength(self, value):
        self.attributes[STRENGTH] = value

    @property
    def dexterity(self):
        return self.attributes[DEXTERITY]

    @dexterity.setter
    def dexterity(self, value):
        self.attributes[DEXTERITY] = value

    @property
    def constitution(self):
        return self.attributes[CONSTITUTION]

    @constitution.setter
    def constitution(self, value):
        self.attributes[CONSTITUTION] = value

    @property
    def intelligence(self):
        return self.attributes[INTELLIGENCE]

    @intelligence.setter
    def intelligence(self, value):
        self.attributes[INTELLIGENCE] = value

    @property
    def wisdom(self):
        return self.attributes[WISDOM]

    @wisdom.setter
    def wisdom(self, value):
        self.attributes[WISDOM] = value

    @property
    def charisma(self):
        return self.attributes[CHARISMA]

    @charisma.setter
    def charisma(self, value):
        self.attributes[CHARISMA] = value

    def get_attribute(self, attribute_name):
        try:
            return self.attributes[attribute_name]
        except KeyError:
            raise Exception("Unrecognized attribute name: " + str(attribute_name))

    @property
    def space(self):
        return self._core[SPACE]

    @space.setter
    def space(self, value):
        self._core[SPACE] = value

    @property
    def reach(self):
        return self._core[REACH]

    @reach.setter
    def reach(self, value):
        self._core[REACH] = value

    @property
    def hit_points(self):
        return self._core[HIT_POINTS]

    @hit_points.setter
    def hit_points(self, value):
        self._core[HIT_POINTS] = value

    @property
    def current_hit_points(self):
        return self._combat[CURRENT_HIT_POINTS]

    @current_hit_points.setter
    def current_hit_points(self, value):
        self._combat[CURRENT_HIT_POINTS] = value

    @property
    def critical_damage(self):
        return self._combat[CRITICAL_DAMAGE]

    @critical_damage.setter
    def critical_damage(self, value):
        self._combat[CRITICAL_DAMAGE] = value

    @property
    def initiative(self):
        return self._core[INITIATIVE]

    @initiative.setter
    def initiative(self, value):
        self._core[INITIATIVE] = value

    @property
    def size(self):
        return self._core[SIZE]

    @size.setter
    def size(self, value):
        self._core[SIZE] = value

    @property
    def armor_class(self):
        return self._defenses[AC]

    @armor_class.setter
    def armor_class(self, value):
        self._defenses[AC] = value

    @property
    def maneuver_defense(self):
        return self._defenses[MC]

    @maneuver_defense.setter
    def maneuver_defense(self, value):
        self._defenses[MC] = value

    @property
    def damage_reduction(self):
        return self._defenses[DR]

    @damage_reduction.setter
    def damage_reduction(self, value):
        self._defenses[DR] = value

    @property
    def special_defenses(self):
        return self._defenses[SPECIAL]

    @special_defenses.setter
    def special_defenses(self, value):
        self._defenses[SPECIAL] = value

    @property
    def fortitude(self):
        return self._defenses[FORTITUDE]

    @fortitude.setter
    def fortitude(self, value):
        self._defenses[FORTITUDE] = value

    @property
    def reflex(self):
        return self._defenses[REFLEX]

    @reflex.setter
    def reflex(self, value):
        self._defenses[REFLEX] = value

    @property
    def will(self):
        return self._defenses[WILL]

    @will.setter
    def will(self, value):
        self._defenses[WILL] = value

    def get_defense(self, defense_type):
        if defense_type in ['physical', 'touch', 'flat-footed']:
            return self.armor_class
        elif defense_type == 'maneuver':
            return self.maneuver
        elif defense_type == FORTITUDE:
            return self.fortitude
        elif defense_type == REFLEX:
            return self.reflex
        elif defense_type == WILL:
            return self.will
        else:
            raise Exception("Unrecognized defense type: " + defense_type)

    def get_defense_total(self, defense_type):
        defense = self.get_defense(defense_type)
        if defense_type == 'physical':
            return defense.normal()
        elif defense_type == 'touch':
            return defense.touch()
        elif defense_type == 'flat-footed':
            return defense.flatfooted()
        else:
            return defense.get_total()

    def get_size_modifier(self, is_special_size_modifier = False):
        return util.get_size_modifier(self.size, is_special_size_modifier)

    def get_special_size_modifier(self):
        return self.get_size_modifier(is_special_size_modifier = True)

    @property
    def speeds(self):
        return self._core[SPEEDS]

    @speeds.setter
    def speeds(self, value):
        self._core[SPEEDS] = value

    @property
    def land_speed(self):
        return self._core[SPEEDS][LAND_SPEED]

    @land_speed.setter
    def land_speed(self, value):
        self._core[SPEEDS][LAND_SPEED] = value

    @property
    def speed_modes(self):
        return self._core[SPEEDS].keys()

    def get_speed(self, speed_mode):
        try:
            return self._core[SPEEDS][speed_mode]
        except KeyError:
            raise Exception("Unrecognized speed mode " + speed_mode)

    def set_speed(self, speed_mode, speed_value):
        try:
            self._core[SPEEDS][speed_mode] = speed_value
        except KeyError:
            raise Exception("Unrecognized speed mode " + speed_mode)

    def modify_speed(self, speed_mode, speed_modifier):
        try:
            self._core[SPEEDS][speed_mode] += speed_modifier
        except KeyError:
            raise Exception("Unrecognized speed mode " + speed_mode)

    @property
    def armor(self):
        return self.items[ARMOR]

    @armor.setter
    def armor(self, value):
        self.items[ARMOR] = value

    @property
    def primary_weapon(self):
        return self.items[WEAPON_PRIMARY]

    @primary_weapon.setter
    def primary_weapon(self, value):
        self.items[WEAPON_PRIMARY] = value

    @property
    def secondary_weapon(self):
        return self.items[WEAPON_SECONDARY]

    @secondary_weapon.setter
    def secondary_weapon(self, value):
        self.items[WEAPON_SECONDARY] = value

    @property
    def weapons(self):
        return [self.primary_weapon, self.secondary_weapon]

    @property
    def shield(self):
        return self.items[SHIELD]

    @shield.setter
    def shield(self, value):
        self.items[SHIELD] = value

    @property
    def alignment(self):
        return self.meta[ALIGNMENT]

    @alignment.setter
    def alignment(self, value):
        self.meta[ALIGNMENT] = value

    @property
    def class_progression(self):
        return self.meta[CLASS_PROGRESSION]

    @class_progression.setter
    def class_progression(self, value):
        self.meta[CLASS_PROGRESSION] = value

    @property
    def combat_description(self):
        return self.meta[COMBAT_DESCRIPTION]

    @combat_description.setter
    def combat_description(self, value):
        self.meta[COMBAT_DESCRIPTION] = value

    @property
    def description(self):
        return self.meta[DESCRIPTION]

    @description.setter
    def description(self, value):
        self.meta[DESCRIPTION] = value

    @property
    def level(self):
        return self.meta[LEVEL]

    @level.setter
    def level(self, value):
        self.meta[LEVEL] = value

    @property
    def name(self):
        return self.meta[NAME]

    @name.setter
    def name(self, value):
        self.meta[NAME] = value

    def get_progression(self, progression_type):
        try:
            return self._progressions[progression_type]
        except KeyError:
            raise Exception("Unrecognized progression type " + progression_type)

    def set_progression(self, progression_type, value):
        if progression_type not in (BAB, FORT, REF, WILL, HIT_VALUE, NATURAL_ARMOR):
            raise Exception("Invalid progression type: " + str(progession_type))
        self._progressions[progression_type] = value

    @property
    def hit_value(self):
        return self._progressions[HIT_VALUE]

    @hit_value.setter
    def hit_value(self, value):
        self._progressions[HIT_VALUE] = value

    @name.setter
    def name(self, value):
        self.meta[NAME] = value

    def update(self):
        self.reset_objects()
        self.interpret_raw_stats()
        self.apply_class_progression()
        self.calculate_derived_statistics()
        self.reset_combat()

    #a more minimalistic update for combat purposes
    def reset_combat(self):
        self.current_hit_points = self.hit_points.get_total()
        self.critical_damage = 0
        for attribute in self.attributes:
            self.attributes[attribute].reset_damage()

    def reset_objects(self):
        self.attack_bonus = util.AttackBonus()
        self.maneuver_bonus = util.ManeuverBonus()
        self.primary_weapon_damage = util.Modifier()
        self.secondary_weapon_damage = util.Modifier()
        for attribute_name in ATTRIBUTES:
            self.attributes[attribute_name] = util.Attribute()
        self.armor_class = util.ArmorClass()
        self.maneuver_defense = util.Modifier()
        self.damage_reduction = util.DamageReduction()
        self.special_defenses = list()
        self.fortitude = util.SavingThrow()
        self.reflex = util.SavingThrow()
        self.will = util.SavingThrow()
        self.hit_points = util.Modifier()
        self.initiative = util.Modifier()
        self.active_abilities = list()
        self.inactive_abilities = list()

    def interpret_raw_stats(self):
        raw_stats = self.raw_stats
        #set meta
        if LEVEL in raw_stats.keys():
            self.level = int(raw_stats['level'])
        if 'alignment' in raw_stats.keys():
            self.alignment = raw_stats['alignment']
        self.name = raw_stats['name']
        if DESCRIPTION in raw_stats.keys():
            self.description = raw_stats[DESCRIPTION]
        if COMBAT_DESCRIPTION in raw_stats.keys():
            self.combat_description = raw_stats[COMBAT_DESCRIPTION]

        #Add all the abilities to the character
        for ability_type in ABILITY_TYPES:
            if ability_type in raw_stats.keys():
                for ability_name in raw_stats[ability_type]:
                    self.add_ability(ability_name)

        #set core
        if SIZE in raw_stats.keys():
            self.size = raw_stats['size']
        else:
            self.size = SIZE_MEDIUM
        self.space, self.reach, self.land_speed = \
                util.get_size_statistics(self.size)
        #If the creature lists its speeds explicitly, use those instead
        if SPEEDS in raw_stats.keys() or 'speed' in raw_stats.keys():
            #Split the raw speeds into each separate speed
            #Allow either "speed" or "speeds" in creature file
            try:
                speeds = util.split_filtered(raw_stats[SPEEDS], ',')
            except KeyError:
                speeds = util.split_filtered(raw_stats['speed'], ',')
            for speed in speeds:
                speed_mode, speed_value = util.split_descriptor_and_value(speed)
                if speed_mode in SPEED_MODES:
                    self.speeds[speed_mode] = speed_value
                elif speed_mode == 'noland':
                    self.land_speed = None
                else:
                    self.land_speed = speed_value

        #set items
        equipment_set = equipment.EquipmentSet.from_raw_stats(
                raw_stats)
        self.primary_weapon = equipment_set.weapon
        if self.primary_weapon is not None:
            self.primary_weapon.set_size(self.size)
        self.secondary_weapon = equipment_set.offhand_weapon
        if self.secondary_weapon is not None:
            self.secondary_weapon.set_size(self.size)
        self.armor = equipment_set.armor
        self.shield = equipment_set.shield

        #Add attributes
        for attribute_name in ATTRIBUTE_NAMES:
            #use try/except to allow missing attributes
            try:
                self.parse_attribute(attribute_name,
                        raw_stats[attribute_name])
            except KeyError:
                self.print_verb('missing attribute: '+attribute_name)

        self.apply_inactive_abilities()

    #parse an attribute from raw_stats
    def parse_attribute(self, attribute_name, raw_attribute):
        progression, starting_value = util.split_descriptor_and_value(raw_attribute)

        attribute = self.get_attribute(attribute_name)

        attribute.add_bonus(starting_value, BASE)
        attribute.set_progression(progression)
        attribute.set_level(self.level)

    def apply_inactive_abilities(self):
        #track abilities to remove from inactive_abilities
        #since we can't modify the list while iterating over it
        abilities_to_remove = list()
        for ability in self.inactive_abilities:
            if ability.apply_benefit(self):
                self.active_abilities.append(ability)
                abilities_to_remove.append(ability)
            else:
                self.print_verb('Could not apply ability: ' + str(ability))
        for ability in abilities_to_remove:
            self.inactive_abilities.remove(ability)

    def apply_class_progression(self):
        self.create_progressions()
        self.apply_inactive_abilities()
        self.attack_bonus.set_progression(
                self.get_progression(BAB))
        for defense_name in SAVES:
            self.get_defense(defense_name).set_progression(
                    self.get_progression(defense_name))
        if NATURAL_ARMOR in self._progressions:
            self.armor_class.natural_armor.set_progression(
                    self.get_progression(NATURAL_ARMOR))
        self.apply_class_modifications()

    #This must be overridden
    def create_progressions(self):
        raise Exception("No class progression available!");

    #This can optionally be overridden
    def apply_class_modifications(self):
        pass

    def add_ability(self, ability, check_prerequisites = False, by_object = False):
        #abilities are normally added by name, but they can be added as an object instead
        if not by_object:
            ability = get_ability_by_name(ability)
        if check_prerequisites and not self.meets_prerequisites(ability):
            self.print_verb('Ability prerequisites not met')
            return False
        self.inactive_abilities.append(ability)
        return True

    def add_special_defense(self, special_defense):
        self.special_defenses.append(special_defense)

    def meets_prerequisites(self, ability):
        #TODO: make less confusing
        return ability.meets_prerequisites(self)

    def calculate_derived_statistics(self):
        self.attack_bonus.set_level(self.level)
        self.maneuver_bonus.set_level(self.level)
        for save in SAVES:
            self.get_defense(save).set_level(self.level)
        self.armor_class.natural_armor.set_level(self.level)

        self.apply_inactive_abilities()

        dexterity_to_ac = self.dexterity.get_total()
        if self.armor is not None:
            self.armor_class.armor.add_bonus(self.armor.ac_bonus, BASE)
            if self.armor.encumbrance=='medium' or self.armor.encumbrance=='heavy':
                dexterity_to_ac /=2
        self.armor_class.dodge.add_bonus(dexterity_to_ac, DEX)

        if self.shield is not None:
            self.armor_class.shield.add_bonus(
                    self.shield.ac_bonus, BASE)

        self.calculate_attack_attribute_bonus()
        self.maneuver_bonus.set_attributes(self.strength,
                self.dexterity)

        #apply size modifiers
        size_modifier = self.get_size_modifier()
        special_size_modifier = self.get_special_size_modifier()
        self.attack_bonus.add_bonus(size_modifier, SIZE)
        self.maneuver_bonus.add_bonus(special_size_modifier, SIZE)
        self.armor_class.misc.add_bonus(size_modifier, SIZE)
        #stealth will be adjusted here once skills are implemented

        #set damage for each weapon
        if self.primary_weapon is not None:
            self.primary_weapon_damage.set_die(self.primary_weapon.damage_die)
        if self.secondary_weapon is not None:
            self.secondary_weapon_damage.set_die(self.secondary_weapon.damage_die)
        self.primary_weapon_damage.add_bonus(
                self.strength.get_total()/2, STR)

        self.add_save_attributes()

        self.armor_class.dodge.add_bonus(
                util.ifloor(self.attack_bonus.base_attack_bonus/2), BAB)

        self.maneuver_defense.add_inherent(self.armor_class.touch())
        self.maneuver_defense.add_inherent(self.attack_bonus.base_attack_bonus/2)
        self.maneuver_defense.add_inherent(self.strength.get_total())

        self.initiative.add_bonus(self.dexterity.get_total(), DEX)
        self.initiative.add_bonus(self.wisdom.get_total()/2, WIS)

        self.apply_inactive_abilities()

        self.hit_points.add_bonus(self.hit_value * self.level,
                'hit value')
        self.hit_points.add_bonus((self.constitution.get_total()/2) * 
                self.level, 'con')

    def calculate_attack_attribute_bonus(self):
        #we are assuming offhand weapon is no heavier than main weapon
        if self.primary_weapon.encumbrance =='light' and self.dexterity.get_total() >= self.strength.get_total():
            self.attack_bonus.add_bonus(
                    self.dexterity.get_total(), DEX)
        else:
            self.attack_bonus.add_bonus(
                    self.strength.get_total(), STR)

    def add_save_attributes(self):
        self.fortitude.add_bonus(
                self.constitution.get_total(), CON)
        self.fortitude.add_bonus(util.ifloor(
            self.strength.get_total()/2), STR)
        self.reflex.add_bonus(
                self.dexterity.get_total(), DEX)
        self.reflex.add_bonus(util.ifloor(
            self.wisdom.get_total()/2), WIS)
        self.will.add_bonus(
                self.charisma.get_total(), CHA)
        self.will.add_bonus(util.ifloor(
            self.intelligence.get_total()/2), INT)

    def improve_progression(self, progression):
        self.change_progression(progression, 1)

    def reduce_progression(self, progression):
        self.change_progression(progression, -1)

    def change_progression(self, progression_name, steps_to_change, allow_extreme = False):
        #make sure we're not altering a non-existent progression
        #(though natural armor is allowed to be None, since it is often unset)
        if self.progressions[progression_name] is None and not progression_name == NATURAL_ARMOR:
            raise Exception("progression "+progression_name+" does not exist, so it can't be altered")

        #HIT_VALUE works differently from other progressions
        if progression_name == HIT_VALUE:
            self.progressions[progression_name] = util.change_hit_value(self.progressions[progression_name], steps_to_change, allow_extreme)
        else:
            self.progressions[progression_name] = util.change_progression(self.progressions[progression_name], steps_to_change, allow_extreme)

    @classmethod
    def from_creature_name(cls, creature_name, level, verbose=False):
        try:
            creature_filename = 'data/'+creature_name+'.txt'
            creature_file = open(creature_filename, 'r')
        except IOError:
            creature_filename = 'data/monsters/'+creature_name+'.txt'
            creature_file = open(creature_filename, 'r')

        raw_stats = util.parse_stats_from_file(creature_file)
        #If the creature is part of a creature group, add the stats for the
        #creature group to the stats for the creature
        #but allow the specific creature to take precedence
        if 'group' in raw_stats.keys():
            group_file = open('data/monsters/%s.txt' % (''.join(raw_stats['group'])))
            group_raw_stats = util.parse_stats_from_file(group_file)
            for key in group_raw_stats.keys():
                if key not in raw_stats.keys():
                    raw_stats[key] = group_raw_stats[key]
        return cls(raw_stats, level, verbose)

    def print_verb(self, message):
        if self.meta[VERBOSE]:
            print message

    def __str__(self):
        full_string = '%s %s' % (self.meta[NAME],
                str(self.level))
        full_string += '\n'+ self._to_string_defenses() 
        full_string += '\n' + self._to_string_attacks() 
        full_string += '\n' + self._to_string_attributes()
        full_string += '\n' + self._to_string_core()
        return full_string

    def _to_string_defenses(self):
        defenses = str(self.armor_class)
        defenses += '; maneuver_class '+str(
                self.maneuver_defense.get_total())
        defenses += '\nHP '+str(self.hit_points.get_total())
        defenses += '; Fort '+util.mstr(self.fortitude.get_total())
        defenses += ', Ref '+util.mstr(self.reflex.get_total())
        defenses += ', Will '+util.mstr(self.will.get_total())
        return defenses

    def _to_string_attacks(self):
        attacks = 'Atk ' + util.mstr(self.attack_bonus.get_total())
        attacks += ' ('+ str(self.primary_weapon_damage.get_total()) + ')'
        return attacks

    def _to_string_attributes(self):
        attributes = 'Attr'
        for attribute_name in ATTRIBUTE_NAMES:
            attributes += ' ' + str(self.attributes[attribute_name].get_total())
        return attributes

    def _to_string_core(self):
        core = 'Space %s, Reach %s, Speed: %s' % (self.space,
                self.reach, self._to_string_speeds())
        return core

    def _to_string_speeds(self):
        speeds = ['%s %s' % (s, self.speeds[s]) for s in self.speeds
                if self.speeds[s]]
        return ', '.join(speeds)

    def get_text_of_abilities_by_tag(self, tag, prefix = None, joiner = ', ',
            suffix = None):
        text = ''
        abilities_with_tag = self.get_abilities_by_tag(tag)
        if abilities_with_tag:
            if prefix is not None: text += prefix
            text += joiner.join([ability.get_text(self)
                for ability in abilities_with_tag])
            if suffix is not None: text += suffix
        return text

    #Get abilities either with or without a given tag
    def get_abilities_by_tag(self, tag, with_tag = True):
        if with_tag:
            return filter(lambda a: a.has_tag(tag), self.abilities)
        else:
            return filter(lambda a: not a.has_tag(tag), self.abilities)

    def new_round(self):
        self.damage_reduction.refresh()

    def is_alive(self):
        if self.critical_damage > self.constitution.get_total():
            return False
        for attribute in ATTRIBUTES:
            if self.attributes[attribute].get_total() <= -10:
                return False
        return True

    def attack(self, enemy):
        defense_type = self.primary_weapon.defense_type
        return self.standard_physical_attack(enemy, defense_type)

    def magic_attack(self, enemy):
        #Use highest-level, no optimization, no save spell
        damage_die = dice.Dice.from_string('{0}d10'.format(max(1,self.level/2)))
        damage_dealt = damage_die.roll()
        enemy.take_damage(damage_dealt, ['spell'])
        return damage_dealt

    #make a standard attack against a foe
    def standard_physical_attack(self, enemy, defense_type, deal_damage = True):
        damage_dealt_total = 0
        hit_count = 0
        for attack_bonus in self.get_physical_attack_bonus_progression():
            is_hit, is_threshold_hit, damage_dealt = self.single_attack(enemy, attack_bonus, defense_type, deal_damage)
            if is_hit:
                hit_count += 1
            if damage_dealt:
                damage_dealt_total += damage_dealt
        return hit_count, damage_dealt

    #get a list containing the attack bonuses used in a standard physical attack progression
    def get_physical_attack_bonus_progression(self):
        attack_bonuses = list()
        for i in xrange(util.attack_count(self.attack_bonus.base_attack_bonus)):
            attack_bonuses.append(self.attack_bonus.get_total()-5*i)
        return attack_bonuses

    #make a single physical attack using the given attack bonus against the enemy
    #usually the attack bonus is generated by get_physical_attack_bonus_progression
    def single_attack(self, enemy, attack_bonus = None, defense_type = None, deal_damage = True, threshold=5):
        #allow "enemy" to be either a Creature or a simple numerical target
        try:
            is_hit, is_threshold_hit = enemy.attack_hits(attack_bonus, defense_type, threshold)
        except AttributeError:
            is_hit, is_threshold_hit = util.attack_hits(attack_bonus, enemy, threshold)
        damage = self.get_damage(is_hit, is_threshold_hit)
        damage_types = self.get_damage_types(is_hit, is_threshold_hit)
        if deal_damage:
            enemy.take_damage(damage, damage_types)
        return is_hit, is_threshold_hit, damage

    #allow special defenses and overriding in subclasses?
    def attack_hits(self, attack_bonus, defense_type, threshold):
        return util.attack_hits(attack_bonus, self.get_defense_total(defense_type), threshold)

    def get_damage(self, is_hit, is_threshold_hit):
        damage = 0
        if is_hit:
            damage += self.primary_weapon_damage.get_total(roll=True)
        if is_threshold_hit and self.items[WEAPON_SECONDARY]:
            damage += self.attacks[DAMAGE][WEAPON_SECONDARY].get_total(roll=True)
        return damage

    def get_damage_types(self, is_hit, is_threshold_hit):
        #TODO: include damage types from secondary weapon
        return self.primary_weapon.damage_types

    def take_damage(self, damage, damage_types):
        damage = self.damage_reduction.reduce_damage(damage, damage_types)
        for special_defense in self.special_defenses:
            damage = special_defense(damage, damage_types)
        if damage is None:
            return
        if DAMAGE_PHYSICAL in damage_types:
            if self.current_hit_points > 0:
                self.current_hit_points = max(0, self.current_hit_points - damage)
            else:
                self.critical_damage += damage
        #Are we taking attribute damage?
        elif any(damage_type in ATTRIBUTES for damage_type in damage_types):
            for damage_type in [d for d in damage_types if d in ATTRIBUTES]:
                #in this case the attribute name is passed alone without other types
                damaged_attribute = damage_type
                self.attributes[damage_type].take_damage(damage)

    def average_hit_probability(self, enemy, defense_type = None):
        if defense_type is None:
            defense_type = self.primary_weapon.defense_type
        #allow "enemy" to be either a Creature or a simple numerical target
        try:
            enemy_defense = enemy.get_defense_total(defense_type)
        except AttributeError:
            enemy_defense = enemy
        attack_bonuses = self.get_physical_attack_bonus_progression()
        hit_chance_total = 0
        for attack_bonus in attack_bonuses:
            hit_chance_total += util.hit_probability(attack_bonus, enemy_defense)
        return hit_chance_total / len(attack_bonuses)

    def roll_initiative(self):
        return util.d20.roll()+self.initiative.get_total()

    #to be overridden
    def special_attack(self, enemy):
        raise Exception("no special attack defined")

    def to_latex(self):
        monster_string=''
        #The string is constructed from a series of function calls
        #Each call constructs one or more thematically related lines
        #Each call should end with ENDLINE, so we always start on a new line 
        horizontal_rule = '\\monlinerule\n'
        monster_string += self._latex_headers()
        monster_string += self._latex_senses()
        monster_string += self._latex_movement()
        monster_string += horizontal_rule
        
        monster_string += self._latex_defenses()
        monster_string += horizontal_rule

        monster_string += self._latex_attacks()
        monster_string += horizontal_rule

        monster_string += self._latex_attributes()
        monster_string += self._latex_feats()
        monster_string += self._latex_skills()
        monster_string += horizontal_rule

        monster_string += self._latex_fluff()

        """
        if self.skills['Sense Motive'] is not None:
            senses += ', Sense Motive {0}'.format(
                    self.skills['Sense Motive'])
        if self.skills['Spellcraft'] is not None:
            senses += ', Spellcraft {0}'.format(self.skills['Spellcraft'])

        if self.abilities['aura']:
            monster_string+='\\par \\textbf{Aura} {0}\n'.format(
                    self.abilities['aura'])

        if self.languages:
            monster_string+='\\par \\textbf{Languages} {0}\n'.format(
                    self.languages)
        """
        monster_string += '\\end{mstatblock}\n'

        return monster_string

    def _latex_headers(self):
        #Don't use ENDLINE here because LaTeX doesn't like \\ with just \begin
        header =  '\\subsection{%s}\n\\begin{mstatblock}\n' % self.meta[NAME].title()

        subheader = r'%s %s %s \hfill \textbf{CR} %s' % (
                self.meta[ALIGNMENT].title(), self.core[SIZE].title(),
                self.meta[NAME], self.level)
        subheader += ENDLINE
        #if self.subtypes:
        #    types +=' {0}'.format()
        #if self.archetype:
        #    types+=' {0}'.format(self.archetype)
        return header + subheader

    def _latex_senses(self):
        #TODO: add Perception. Requires skills.
        senses = r'\textbf{Init} %s; Perception %s' % (
                self.initiative.mstr(), util.mstr(0))
        senses += self.get_text_of_abilities_by_tag(TAG_SENSE, prefix=', ')
        senses += ENDLINE
        return senses

    #This will be commonly overwritten on a per-monster basis
    #For now, just use the "normal" values for each size
    def _latex_movement(self):
        movement = r'\textbf{Space} %s; \textbf{Reach} %s' % (
                util.value_in_feet(self.space), 
                util.value_in_feet(self.reach))
        movement += r'; \textbf{Speed} '
        movement += self._to_string_speeds()
        movement += ENDLINE
        senses = self.get_text_of_abilities_by_tag(TAG_SENSE, prefix = ', ')
        if senses:
            movement += senses
            movement += ENDLINE
        return movement

    def _latex_defenses(self):
        defenses = r'\textbf{AC} %s, touch %s, flat-footed %s' % (
                self.armor_class.normal(), self.armor_class.touch(),
                self.armor_class.flatfooted())
        defenses += r'; \textbf{MC} %s' % self.maneuver_defense.get_total()
        defenses += self.get_text_of_abilities_by_tag(TAG_MOVE,
                prefix = '(', suffix = ')')
        defenses += ENDLINE
        #Should provide detailed explanation of AC sources here
        #defenses += '\par (%s)' % self.armor_class

        #Add HP and damage reduction
        defenses += r'\textbf{HP} %s (%s HV)' % (self.hit_points.get_total(),
                self.level)
        defenses += self.get_text_of_abilities_by_tag(DR, ', ')
        defenses += ENDLINE

        #Add any immunities
        defenses += self.get_text_of_abilities_by_tag(TAG_IMMUNITY,
                prefix = r'\textbf{Immune} ', suffix = ENDLINE)

        #Add saving throws
        defenses+=r'\textbf{Saves} Fort %s, Ref %s, Will %s' % (
                self.fortitude.mstr(), self.reflex.mstr(),
                self.will.mstr())
        defenses += self.get_text_of_abilities_by_tag(SAVING_THROW,
                prefix = '; ')
        defenses += ENDLINE

        return defenses

    def _latex_attacks(self):
        attacks = ''
        if self.primary_weapon is not None:
            attack_title = r'\textbf{%s}' % self.primary_weapon.attack_range.title()
            attack_name = self.primary_weapon.name.title()
            attack_bonus = self.attack_bonus.mstr()
            attack_damage = util.attack_damage_to_latex(
                    self.primary_weapon, self.primary_weapon_damage)

            if self.items[WEAPON_SECONDARY] is not None:
                attack_name += '/%s' % self.items[WEAPON_SECONDARY].name
                attack_bonus += '/%s' % (
                        self.attack_bonus.get_total_offhand())
                attack_damage += '/%s' % util.attack_damage_to_latex(
                        self.items[WEAPON_SECONDARY], 
                        self.attacks[DAMAGE][WEAPON_SECONDARY])

            attacks += '%s %s %s (%s)' % (attack_title, attack_name, attack_bonus,
                    attack_damage)

            attacks += ENDLINE

        base_maneuver_bonus = self.attack_bonus.base_attack_bonus + util.get_size_modifier(self.core[SIZE])
        attacks+= r'\textbf{BAB} %s; \textbf{Maneuvers} %s (Str), %s (Dex)' % (
                self.attack_bonus.base_attack_bonus,
                util.mstr(base_maneuver_bonus + self.strength.get_total()),
                util.mstr(base_maneuver_bonus + self.dexterity.get_total()))
        attacks += ENDLINE

        attacks += self.get_text_of_abilities_by_tag(TAG_ATTACK,
                prefix=r'\textbf{Special} ', suffix=ENDLINE)
        return attacks

    def _latex_attributes(self):
        attributes = r'\textbf{Attributes} '
        attributes += 'Str %s, Dex %s, Con %s, Int %s, Wis %s, Cha %s' % (
                self.strength.get_total(),
                self.dexterity.get_total(),
                self.constitution.get_total(),
                self.intelligence.get_total(),
                self.wisdom.get_total(),
                self.charisma.get_total())
        attributes += ENDLINE
        return attributes

    def _latex_feats(self):
        feats_string = ''
        feats = self.get_abilities_by_tag('feat')
        #sort feats by their name
        feats = sorted(feats, key=lambda x:x.name)
        if feats:
            feats_string += r'\textbf{Feats} '
            feats_string += ', '.join([feat.name.title()
                for feat in feats])
            feats_string += ENDLINE
        return feats_string

    #TODO
    def _latex_skills(self):
        return ''

    def _latex_fluff(self):
        fluff = ''
        fluff += r'\parhead{Description} %s' % self.description
        fluff += r'\parhead{Combat} %s' % self.combat_description
        return fluff

    def has_ability(self, ability, by_object = False):
        if not by_object:
            ability = get_ability_by_name(ability)
        return ability in self.abilities

class Character(Creature):
    def update(self):
        super(Character, self).update()
        self.add_automatic_scaling_bonuses()

    def add_automatic_scaling_bonuses(self):
        scale_factor = self.level/4
        self.armor_class.armor.add_enhancement(scale_factor)
        if self.shield:
            self.armor_class.shield.add_enhancement(scale_factor)
        if self.primary_weapon:
            self.attack_bonus.add_enhancement(scale_factor)
            for weapon in WEAPONS:
                self.attacks[DAMAGE][weapon].add_enhancement(scale_factor)
        for save in SAVES:
            self.get_defense(save).add_enhancement(scale_factor)

class Barbarian(Character):
    def create_progressions(self):
        self.set_progression(BAB, GOOD)
        self.set_progression(FORT, GOOD)
        self.set_progression(REF, AVERAGE)
        self.set_progression(WILL, POOR)
        self.set_progression(HIT_VALUE, 7)

    def apply_class_modifications(self):
        self.add_ability('rage')
        self.add_ability('barbarian damage reduction')
        if self.level>=2:
            self.add_ability('danger sense')
        if self.level>=7:
            self.add_ability('larger than life')
        if self.level>=17:
            self.add_ability('larger than belief')

class Cleric(Character):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, GOOD)
        self.set_progression(HIT_VALUE, 5)

class Druid(Character):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, GOOD)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 5)

class Fighter(Character):
    def create_progressions(self):
        self.set_progression(BAB, GOOD)
        self.set_progression(FORT, GOOD)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 6)

    def apply_class_modifications(self):
        #armor discipline is tracked by a separate ability because it requires a choice. we just set a default value for that choice here
        if not (self.has_ability('armor discipline (agility)') or self.has_ability('armor discipline (resilience)')):
            self.add_ability('armor discipline (agility)')
        #weapon discipline
        ab = 0
        ab += 1 if self.level>=3 else 0
        ab += 1 if self.level>=9 else 0
        self.attack_bonus.add_competence(ab)
        if self.level>=15:
            pass
            #add critical changes

class Monk(Character):
    def create_progressions(self):
        self.set_progression(BAB, GOOD)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, AVERAGE)
        self.set_progression(WILL, GOOD)
        self.set_progression(HIT_VALUE, 5)

    def apply_class_modifications(self):
        #wisdom is used often, so make it quick to access
        wisdom = self.wisdom.get_total()

        #enlightened defense
        if self.armor is None:
            self.armor_class.misc.add_inherent(wisdom)
        else:
            self.printverb('Monk is wearing armor? %s' %
                    self.armor)

        #unarmed strike
        if self.primary_weapon is None:
            unarmed_weapon = equipment.Weapon.from_weapon_name('unarmed')
            #make the weapon deal monk damage
            for i in xrange(2):
                unarmed_weapon.damage_die.increase_size()
            self.primary_weapon = unarmed_weapon

        #wholeness of body

        #improved ki strike
        if self.level>=10:
            self.primary_weapon_damage.add_inherent(wisdom/2)

class Paladin(Character):
    def create_progressions(self):
        self.set_progression(BAB, GOOD)
        self.set_progression(FORT, GOOD)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, GOOD)
        self.set_progression(HIT_VALUE, 6)

    def apply_class_modifications(self):
        if self.level>=5:
            self.armor_class.misc.add_bonus(self.charisma.get_total()/2, CHA)

    #assume smite
    def standard_physical_attack(self, enemy, defense_type, deal_damage = True):
        damage_dealt_total = 0
        hit_count = 0
        for i, attack_bonus in enumerate(self.get_physical_attack_bonus_progression()):
            #smite on the first attack
            if i==0:
                attack_bonus += self.charisma.get_total()
            is_hit, is_threshold_hit, damage_dealt = self.single_attack(enemy, attack_bonus, defense_type, deal_damage)
            if is_hit:
                hit_count += 1
            if damage_dealt:
                if i==0:
                    damage_dealt += self.level
                damage_dealt_total += damage_dealt
        return hit_count, damage_dealt

class Ranger(Character):
    def create_progressions(self):
        self.set_progression(BAB, GOOD)
        self.set_progression(FORT, GOOD)
        self.set_progression(REF, AVERAGE)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 6)

class Rogue(Character):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, POOR)
        self.set_progression(REF, GOOD)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 5)

    def apply_class_modifications(self):
        self.add_ability('danger sense')

class Spellwarped(Character):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, AVERAGE)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 5)

class Sorcerer(Character):
    def create_progressions(self):
        self.set_progression(BAB, POOR)
        self.set_progression(FORT, POOR)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, GOOD)
        self.set_progression(HIT_VALUE, 4)

class Warrior(Character):
    def create_progressions(self):
        self.set_progression(BAB, GOOD)
        self.set_progression(FORT, GOOD)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, POOR)
        self.set_progression(HIT_VALUE, 6)

class Wizard(Character):
    def create_progressions(self):
        self.set_progression(BAB, POOR)
        self.set_progression(FORT, POOR)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, GOOD)
        self.set_progression(HIT_VALUE, 4)

class Monster(Creature):
    pass

class Aberration(Monster):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 5)
        self.set_progression(NATURAL_ARMOR, POOR)

    def apply_class_modifications(self):
        self.add_ability('darkvision')

class Animal(Monster):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 5)
        self.set_progression(NATURAL_ARMOR, POOR)

    def apply_class_modifications(self):
        self.intelligence.add_inherent(-8)
        self.add_abilities(('low-light vision', 'scent'))

class Construct(Monster):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, POOR)
        self.set_progression(HIT_VALUE, 5)
        self.set_progression(NATURAL_ARMOR, AVERAGE)

    def apply_class_modifications(self):
        self.add_abilities(('construct', 'darkvision'))

class Fey(Monster):
    def create_progressions(self):
        self.set_progression(BAB, POOR)
        self.set_progression(FORT, POOR)
        self.set_progression(REF, AVERAGE)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 4)
        self.set_progression(NATURAL_ARMOR, POOR)

class Humanoid(Monster):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, POOR)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, POOR)
        self.set_progression(HIT_VALUE, 4)

class MagicalBeast(Monster):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, AVERAGE)
        self.set_progression(WILL, POOR)
        self.set_progression(HIT_VALUE, 5)
        self.set_progression(NATURAL_ARMOR, POOR)

    def apply_class_modifications(self):
        self.add_ability('low-light vision')

class MonstrousHumanoid(Monster):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, AVERAGE)
        self.set_progression(WILL, POOR)
        self.set_progression(HIT_VALUE, 5)
        self.set_progression(NATURAL_ARMOR, POOR)

class Ooze(Monster):
    def create_progressions(self):
        self.set_progression(BAB, POOR)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, POOR)
        self.set_progression(HIT_VALUE, 6)

    def apply_class_modifications(self):
        self.add_ability('ooze')

class Outsider(Monster):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, AVERAGE)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 5)
        self.set_progression(NATURAL_ARMOR, POOR)

    def apply_class_modifications(self):
        self.add_ability('low-light vision')

class Plant(Monster):
    def create_progressions(self):
        self.set_progression(BAB, POOR)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, POOR)
        self.set_progression(HIT_VALUE, 5)
        self.set_progression(NATURAL_ARMOR, POOR)

    def apply_class_modifications(self):
        self.add_ability('plant')

class Undead(Monster):
    def create_progressions(self):
        self.set_progression(BAB, AVERAGE)
        self.set_progression(FORT, AVERAGE)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, AVERAGE)
        self.set_progression(HIT_VALUE, 5)
        self.set_progression(NATURAL_ARMOR, POOR)

    def apply_class_modifications(self):
        self.add_ability('undead')

class IdealCreature(Creature):
    def create_progressions(self):
        self.set_progression(BAB, GOOD)
        self.set_progression(FORT, POOR)
        self.set_progression(REF, POOR)
        self.set_progression(WILL, POOR)
        self.set_progression(HIT_VALUE, 5)

    def apply_class_modifications(self):
        #compensate for AC bonus from BAB
        self.armor_class.dodge.add_bonus(-(self.level/2),
                'babfix')
        #compensate for AC bonus from Dex
        self.armor_class.dodge.add_bonus(
                -(self.dexterity.get_total()), 'dexfix')
        #this overrides the base 10 because it has the same type
        self.armor_class.misc.add_bonus(self.level+15,
                BASE)
