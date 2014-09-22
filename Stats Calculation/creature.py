from strings import *
import equipment, util
from abilities import get_ability_by_name

def generate_creature_from_file_name(file_name, level=None, verbose=False):
    file_name = util.fix_creature_file_name(file_name)
    assert file_name
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
    return {
            'barbarian': Barbarian,
            'fighter': Fighter,
            }[class_name](raw_stats, verbose)

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
                DAMAGE: None,
                }
        self.attributes = {}
        for attribute_name in ATTRIBUTE_NAMES:
            self.attributes[attribute_name] = None
        self.core = {
                HIT_POINTS: None,
                INITIATIVE: None,
                REACH: None,
                SIZE: SIZE_MEDIUM,
                SPACE: None,
                SPEEDS: {},
                }
        self.combat = {
                CURRENT_HIT_POINTS: 0,
                CRITICAL_DAMAGE: 0,
                }
        self.defenses = {
                AC: None,
                MC: None,
                FORTITUDE: None,
                REFLEX: None,
                WILL: None,
                DR: None,
                }
        self.progressions = {
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

    def update(self):
        self.reset_objects()
        self.interpret_raw_stats()
        self.apply_class_progression()
        self.calculate_derived_statistics()
        self.reset_combat()

    #a more minimalistic update for combat purposes
    def reset_combat(self):
        self.combat[CURRENT_HIT_POINTS] = self.core[HIT_POINTS].get_total()
        self.combat[CRITICAL_DAMAGE] = 0

    def reset_objects(self):
        self.attacks[ATTACK_BONUS] = util.AttackBonus()
        self.attacks[MANEUVER_BONUS] = util.ManeuverBonus()
        self.attacks[DAMAGE] = {
                WEAPON_PRIMARY: util.Modifier(),
                WEAPON_SECONDARY: util.Modifier()
                }
        for attribute in ATTRIBUTES:
            self.attributes[attribute] = util.Attribute()
        self.defenses[AC] = util.ArmorClass()
        self.defenses[MC] = util.Modifier()
        self.defenses[DR] = util.DamageReduction()
        for save in SAVES:
            self.defenses[save] = util.SavingThrow()
        self.core[HIT_POINTS] = util.Modifier()
        self.core[INITIATIVE] = util.Modifier()
        for ability_type in self.abilities:
            self.abilities[ability_type] = list()

    def interpret_raw_stats(self):
        raw_stats = self.raw_stats
        #set meta
        if LEVEL in raw_stats.keys():
            self.meta[LEVEL] = int(raw_stats['level'])
        if 'alignment' in raw_stats.keys():
            self.meta[ALIGNMENT] = raw_stats['alignment']
        self.meta[NAME] = raw_stats['name']
        if DESCRIPTION in raw_stats.keys():
            self.meta[DESCRIPTION] = raw_stats[DESCRIPTION]
        if COMBAT_DESCRIPTION in raw_stats.keys():
            self.meta[COMBAT_DESCRIPTION] = raw_stats[COMBAT_DESCRIPTION]

        #Add all the abilities to the character
        for ability_type in ABILITY_TYPES:
            if ability_type in raw_stats.keys():
                for ability_name in raw_stats[ability_type]:
                    self.add_ability(ability_name)

        #set core
        if SIZE in raw_stats.keys():
            self.core[SIZE] = raw_stats['size']
        else:
            self.core[SIZE] = SIZE_MEDIUM
        self.core[SPACE], self.core[REACH], self.core[SPEEDS][LAND_SPEED] = \
                util.get_size_statistics(self.core[SIZE])
        #If the creature lists its speeds explicitly, use those instead
        if SPEEDS in raw_stats.keys() or 'speed' in raw_stats.keys():
            #Split the raw speeds into each separate speed
            #Allow either "speed" or "speeds" in creature file
            try:
                speeds = util.split_filtered(raw_stats[SPEEDS], ',')
            except KeyError:
                speeds = util.split_filtered(raw_stats['speed'], ',')
            for speed in speeds:
                speed_mode, speed_value = util.split_descriptor_and_value(
                        speed)
                if speed_mode in SPEED_MODES:
                    self.core[SPEEDS][speed_mode] = speed_value
                elif speed_mode == 'noland':
                    self.core[SPEEDS][LAND_SPEED] = None
                else:
                    self.core[SPEEDS][LAND_SPEED] = speed_value

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
        progression, starting_value = util.split_descriptor_and_value(
                raw_attribute)

        self.attributes[attribute_name].add_bonus(starting_value, BASE)
        self.attributes[attribute_name].set_progression(progression)
        self.attributes[attribute_name].set_level(self.meta[LEVEL])

    def apply_inactive_abilities(self):
        #track abilities to remove from abilities[INACTIVE]
        #since we can't modify the list while iterating over it
        abilities_to_remove = list()
        for ability in self.abilities[INACTIVE]:
            if ability.apply_benefit(self):
                self.abilities[ACTIVE].append(ability)
                abilities_to_remove.append(ability)
            else:
                self.print_verb('Could not apply ability: ' + str(ability))
        for ability in abilities_to_remove:
            self.abilities[INACTIVE].remove(ability)

    def apply_class_progression(self):
        self.create_progressions()
        self.apply_inactive_abilities()
        self.attacks[ATTACK_BONUS].set_progression(
                self.progressions[BAB])
        for save in SAVES:
            self.defenses[save].set_progression(
                    self.progressions[save])
        self.core[HIT_VALUE] = self.progressions[HIT_VALUE]
        if NATURAL_ARMOR in self.progressions:
            self.defenses[AC].natural_armor.set_progression(
                    self.progressions[NATURAL_ARMOR])
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
        self.abilities[INACTIVE].append(ability)
        return True

    def meets_prerequisites(self, ability):
        #TODO: make less confusing
        return ability.meets_prerequisites(self)

    def calculate_derived_statistics(self):
        self.attacks[ATTACK_BONUS].set_level(self.meta[LEVEL])
        self.attacks[MANEUVER_BONUS].set_level(self.meta[LEVEL])
        for save in SAVES:
            self.defenses[save].set_level(self.meta[LEVEL])
        self.defenses[AC].natural_armor.set_level(self.meta[LEVEL])

        self.apply_inactive_abilities()

        dexterity_to_ac = self.attributes[DEX].get_total()
        if self.items[ARMOR] is not None:
            self.defenses[AC].armor.add_bonus(self.items[ARMOR].ac_bonus, BASE)
            if self.items[ARMOR].encumbrance=='medium' or self.items[ARMOR].encumbrance=='heavy':
                dexterity_to_ac /=2
        self.defenses[AC].dodge.add_bonus(dexterity_to_ac, DEX)

        if self.items[SHIELD] is not None:
            self.defenses[AC].shield.add_bonus(
                    self.items[SHIELD].ac_bonus, BASE)

        self.calculate_attack_attribute_bonus()
        self.attacks[MANEUVER_BONUS].set_attributes(self.attributes[STR],
                self.attributes[DEX])

        #apply size modifiers
        size_modifier = util.get_size_modifier(self.core[SIZE])
        special_size_modifier = util.get_size_modifier(self.core[SIZE],
                is_special_size_modifier=True)
        self.attacks[ATTACK_BONUS].add_bonus(size_modifier, SIZE)
        self.attacks[MANEUVER_BONUS].add_bonus(special_size_modifier, SIZE)
        self.defenses[AC].misc.add_bonus(size_modifier, SIZE)
        #stealth will be adjusted here once skills are implemented

        #set damage for each weapon
        for weapon in WEAPONS:
            if self.items[weapon] is not None:
                self.attacks[DAMAGE][weapon].set_die(
                        self.items[weapon].damage_die)
        self.attacks[DAMAGE][WEAPON_PRIMARY].add_bonus(
                self.attributes[STR].get_total()/2, STR)

        self.add_save_attributes()

        self.defenses[AC].dodge.add_bonus(
                util.ifloor(self.attacks[ATTACK_BONUS].base_attack_bonus/2), BAB)

        self.defenses[MC].add_inherent(self.defenses[AC].touch())
        self.defenses[MC].add_inherent(self.attacks[ATTACK_BONUS].base_attack_bonus/2)
        self.defenses[MC].add_inherent(self.attributes[STR].get_total())

        self.core[INITIATIVE].add_bonus(self.attributes[DEX].get_total(), DEX)
        self.core[INITIATIVE].add_bonus(self.attributes[WIS].get_total()/2, WIS)

        self.apply_inactive_abilities()

        self.core[HIT_POINTS].add_bonus(self.core[HIT_VALUE] * self.meta[LEVEL],
                'hit value')
        self.core[HIT_POINTS].add_bonus((self.attributes[CON].get_total()/2) * 
                self.meta[LEVEL], 'con')

    def calculate_attack_attribute_bonus(self):
        #we are assuming offhand weapon is no heavier than main weapon
        if self.items[WEAPON_PRIMARY].encumbrance =='light' and self.attributes[DEX].get_total() >= self.attributes[STR].get_total():
            self.attacks[ATTACK_BONUS].add_bonus(
                    self.attributes[DEX].get_total(), DEX)
        else:
            self.attacks[ATTACK_BONUS].add_bonus(
                    self.attributes[STR].get_total(), STR)


    def add_save_attributes(self):
        self.defenses[FORTITUDE].add_bonus(
                self.attributes[CON].get_total(), CON)
        self.defenses[FORTITUDE].add_bonus(util.ifloor(
            self.attributes[STR].get_total()/2), STR)
        self.defenses[REFLEX].add_bonus(
                self.attributes[DEX].get_total(), DEX)
        self.defenses[REFLEX].add_bonus(util.ifloor(
            self.attributes[WIS].get_total()/2), WIS)
        self.defenses[WILL].add_bonus(
                self.attributes[CHA].get_total(), CHA)
        self.defenses[WILL].add_bonus(util.ifloor(
            self.attributes[INT].get_total()/2), INT)

    def improve_progression(self, progression):
        #make sure we're not altering a non-existent progression
        #(though natural armor is allowed to be None, since it is often unset)
        if self.progressions[progression] is None and not progression == NATURAL_ARMOR:
            return False

        #HIT_VALUE works differently from other progressions
        if progression == HIT_VALUE:
            self.progressions[progression] = util.improved_hit_value(self.progressions[progression])
        else:
            if progression not in self.progressions or self.progressions[progression] is None:
                self.progressions[progression] = POOR
            else:
                self.progressions[progression] = util.improved_progression(self.progressions[progression])
        return True

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
                str(self.meta[LEVEL]))
        full_string += '\n'+ self._to_string_defenses() 
        full_string += '\n' + self._to_string_attacks() 
        full_string += '\n' + self._to_string_attributes()
        full_string += '\n' + self._to_string_core()
        return full_string

    def _to_string_defenses(self):
        defenses = str(self.defenses[AC])
        defenses += '; maneuver_class '+str(
                self.defenses[MC].get_total())
        defenses += '\nHP '+str(self.core[HIT_POINTS].get_total())
        defenses += '; Fort '+util.mstr(self.defenses[FORTITUDE].get_total())
        defenses += ', Ref '+util.mstr(self.defenses[REFLEX].get_total())
        defenses += ', Will '+util.mstr(self.defenses[WILL].get_total())
        return defenses

    def _to_string_attacks(self):
        attacks = 'Atk ' + util.mstr(self.attacks[ATTACK_BONUS].get_total())
        attacks += ' ('+ str(self.attacks[DAMAGE][WEAPON_PRIMARY].get_total()) + ')'
        return attacks

    def _to_string_attributes(self):
        attributes = 'Attr'
        for attribute_name in ATTRIBUTE_NAMES:
            attributes += ' ' + str(self.attributes[attribute_name].get_total())
        return attributes

    def _to_string_core(self):
        core = 'Space %s, Reach %s, Speed: %s' % (self.core[SPACE],
                self.core[REACH], self._to_string_speeds())
        return core

    def _to_string_speeds(self):
        speeds = ['%s %s' % (s, self.core[SPEEDS][s]) for s in self.core[SPEEDS]
                if self.core[SPEEDS][s]]
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
        self.defenses[DR].refresh()

    def is_alive(self):
        if self.combat[CRITICAL_DAMAGE] > self.attributes[CON].get_total():
            return False
        return True

    def attack(self, enemy):
        return self.standard_physical_attack(enemy, 'physical')

    def magic_attack(self, enemy):
        #Use highest-level, no optimization, no save spell
        damage_die = dice.Dice.from_string('{0}d10'.format(max(1,self.meta[LEVEL]/2)))
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
        for i in xrange(util.attack_count(self.attacks[ATTACK_BONUS].base_attack_bonus)):
            attack_bonuses.append(self.attacks[ATTACK_BONUS].get_total()-5*i)
        return attack_bonuses

    #make a single physical attack using the given attack bonus against the enemy
    #usually the attack bonus is generated by get_physical_attack_bonus_progression
    def single_attack(self, enemy, attack_bonus = None, defense_type = None, deal_damage = True, threshold=5):
        #allow "enemy" to be either a Creature or a simple numerical target
        try:
            enemy_defense = enemy.get_defense(defense_type)
        except AttributeError:
            enemy_defense = enemy
        is_hit, is_threshold_hit = util.attack_hits(attack_bonus, enemy_defense, threshold)
        damage = self.get_damage(is_hit, is_threshold_hit)
        damage_types = self.get_damage_types(is_hit, is_threshold_hit)
        if deal_damage:
            enemy.take_damage(damage, damage_types)
        return is_hit, is_threshold_hit, damage

    def get_damage(self, is_hit, is_threshold_hit):
        damage = self.attacks[DAMAGE][WEAPON_PRIMARY].get_total(roll=True)
        if is_threshold_hit and self.attacks[DAMAGE][WEAPON_SECONDARY]:
            damage += self.attacks[DAMAGE][WEAPON_SECONDARY].get_total(roll=True)
        return damage

    def get_damage_types(self, is_hit, is_threshold_hit):
        #TODO: include damage types from secondary weapon
        return self.items[WEAPON_PRIMARY].damage_types

    def get_defense(self, defense_type):
        if defense_type is None:
            return None
        elif defense_type == 'physical':
            return self.defenses[AC].normal()
        elif defense_type == 'touch':
            return self.defenses[AC].touch()
        elif defense_type == 'maneuver':
            return self.defenses[MC].get_total()
        elif defense_type in SAVE_NAMES:
            return self.defenses[defense_type].get_total()
        else:
            raise Exception("Unrecognized defense type: "+defense_type)

    def take_damage(self, damage, damage_types):
        damage = self.defenses[DR].reduce_damage(damage, damage_types)
        if self.combat[CURRENT_HIT_POINTS] > 0:
            self.combat[CURRENT_HIT_POINTS] = max(0, self.combat[CURRENT_HIT_POINTS] -damage)
        else:
            self.combat[CRITICAL_DAMAGE] += damage

    def average_hit_probability(self, enemy, defense_type = None):
        #allow "enemy" to be either a Creature or a simple numerical target
        try:
            enemy_defense = enemy.get_defense(defense_type)
        except AttributeError:
            enemy_defense = enemy
        attack_bonuses = self.get_physical_attack_bonus_progression()
        hit_chance_total = 0
        for attack_bonus in attack_bonuses:
            hit_chance_total += util.hit_probability(attack_bonus, enemy_defense)
        return hit_chance_total / len(attack_bonuses)

    def roll_initiative(self):
        return util.d20.roll()+self.core[INITIATIVE].get_total()

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
                self.meta[NAME], self.meta[LEVEL])
        subheader += ENDLINE
        #if self.subtypes:
        #    types +=' {0}'.format()
        #if self.archetype:
        #    types+=' {0}'.format(self.archetype)
        return header + subheader

    def _latex_senses(self):
        #TODO: add Perception. Requires skills.
        senses = r'\textbf{Init} %s; Perception %s' % (
                self.core[INITIATIVE].mstr(), util.mstr(0))
        senses += self.get_text_of_abilities_by_tag(TAG_SENSE, prefix=', ')
        senses += ENDLINE
        return senses

    #This will be commonly overwritten on a per-monster basis
    #For now, just use the "normal" values for each size
    def _latex_movement(self):
        movement = r'\textbf{Space} %s; \textbf{Reach} %s' % (
                util.value_in_feet(self.core[SPACE]), 
                util.value_in_feet(self.core[REACH]))
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
                self.defenses[AC].normal(), self.defenses[AC].touch(),
                self.defenses[AC].flatfooted())
        defenses += r'; \textbf{MC} %s' % self.defenses[MC].get_total()
        defenses += self.get_text_of_abilities_by_tag(TAG_MOVE,
                prefix = '(', suffix = ')')
        defenses += ENDLINE
        #Should provide detailed explanation of AC sources here
        #defenses += '\par (%s)' % self.armor_class

        #Add HP and damage reduction
        defenses += r'\textbf{HP} %s (%s HV)' % (self.core[HIT_POINTS].get_total(),
                self.meta[LEVEL])
        defenses += self.get_text_of_abilities_by_tag(DR, ', ')
        defenses += ENDLINE

        #Add any immunities
        defenses += self.get_text_of_abilities_by_tag(TAG_IMMUNITY,
                prefix = r'\textbf{Immune} ', suffix = ENDLINE)

        #Add saving throws
        defenses+=r'\textbf{Saves} Fort %s, Ref %s, Will %s' % (
                self.defenses[FORT].mstr(), self.defenses[REF].mstr(),
                self.defenses[WILL].mstr())
        defenses += self.get_text_of_abilities_by_tag(SAVING_THROW,
                prefix = '; ')
        defenses += ENDLINE

        return defenses

    def _latex_attacks(self):
        attacks = ''
        if self.items[WEAPON_PRIMARY] is not None:
            attack_title = r'\textbf{%s}' % self.items[WEAPON_PRIMARY].attack_type.title()
            attack_name = self.items[WEAPON_PRIMARY].name.title()
            attack_bonus = self.attacks[ATTACK_BONUS].mstr()
            attack_damage = util.attack_damage_to_latex(
                    self.items[WEAPON_PRIMARY], self.attacks[DAMAGE][WEAPON_PRIMARY])

            if self.items[WEAPON_SECONDARY] is not None:
                attack_name += '/%s' % self.items[WEAPON_SECONDARY].name
                attack_bonus += '/%s' % (
                        self.attacks[ATTACK_BONUS].get_total_offhand())
                attack_damage += '/%s' % util.attack_damage_to_latex(
                        self.items[WEAPON_SECONDARY], 
                        self.attacks[DAMAGE][WEAPON_SECONDARY])

            attacks += '%s %s %s (%s)' % (attack_title, attack_name, attack_bonus,
                    attack_damage)

            attacks += ENDLINE

        base_maneuver_bonus = self.attacks[ATTACK_BONUS].base_attack_bonus + util.get_size_modifier(self.core[SIZE])
        attacks+= r'\textbf{BAB} %s; \textbf{Maneuvers} %s (Str), %s (Dex)' % (
                self.attacks[ATTACK_BONUS].base_attack_bonus,
                util.mstr(base_maneuver_bonus + self.attributes[STR].get_total()),
                util.mstr(base_maneuver_bonus + self.attributes[DEX].get_total()))
        attacks += ENDLINE

        attacks += self.get_text_of_abilities_by_tag(TAG_ATTACK,
                prefix=r'\textbf{Special} ', suffix=ENDLINE)
        return attacks

    def _latex_attributes(self):
        attributes = r'\textbf{Attributes} '
        attributes += 'Str %s, Dex %s, Con %s, Int %s, Wis %s, Cha %s' % (
                self.attributes[STR].get_total(),
                self.attributes[DEX].get_total(),
                self.attributes[CON].get_total(),
                self.attributes[INT].get_total(),
                self.attributes[WIS].get_total(),
                self.attributes[CHA].get_total())
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
        fluff += r'\parhead{Description} %s' % self.meta[DESCRIPTION]
        fluff += r'\parhead{Combat} %s' % self.meta[COMBAT_DESCRIPTION]
        return fluff

    def has_ability(self, ability):
        return ability in self.abilities

class Character(Creature):
    def update(self):
        super(Character, self).update()
        self.add_automatic_scaling_bonuses()

    def add_automatic_scaling_bonuses(self):
        scale_factor = self.meta[LEVEL]/4
        self.defenses[AC].armor.add_enhancement(scale_factor)
        if self.items[SHIELD]:
            self.defenses[AC].shield.add_enhancement(scale_factor)
        if self.items[WEAPON_PRIMARY]:
            self.attacks[ATTACK_BONUS].add_enhancement(scale_factor)
            for weapon in WEAPONS:
                self.attacks[DAMAGE][weapon].add_enhancement(scale_factor)
        for save in SAVES:
            self.defenses[save].add_enhancement(scale_factor)

class Barbarian(Character):
    def create_progressions(self):
        self.progressions[BAB] = GOOD
        self.progressions[FORT] = GOOD
        self.progressions[REF] = AVERAGE
        self.progressions[WILL] = POOR
        self.progressions[HIT_VALUE] = 7

    def apply_class_modifications(self):
        self.add_ability('rage')
        self.add_ability('barbarian damage reduction')
        if self.meta[LEVEL]>=2:
            self.add_ability('danger sense')
        if self.meta[LEVEL]>=7:
            self.add_ability('larger than life')
        if self.meta[LEVEL]>=17:
            self.add_ability('larger than belief')

class Cleric(Character):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = POOR
        self.progressions[WILL] = GOOD
        self.progressions[HIT_VALUE] = 5

class Druid(Character):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = GOOD
        self.progressions[REF] = POOR
        self.progressions[WILL] = AVERAGE
        self.progressions[HIT_VALUE] = 5

class Fighter(Character):
    def create_progressions(self):
        self.progressions[BAB] = GOOD
        self.progressions[FORT] = GOOD
        self.progressions[REF] = POOR
        self.progressions[WILL] = AVERAGE
        self.progressions[HIT_VALUE] = 6

    def apply_class_modifications(self):
        #armor discipline
        armor_discipline_count = (self.meta[LEVEL]+5)/6
        self.defenses[AC].dodge.add_competence(
                armor_discipline_count)
        for i in xrange(1, armor_discipline_count):
            self.items[ARMOR].encumbrance = util.lower_encumbrance(
                    self.items[ARMOR].encumbrance)
        #weapon discipline
        ab = 0
        ab += 1 if self.meta[LEVEL]>=3 else 0
        ab += 1 if self.meta[LEVEL]>=9 else 0
        self.attacks[ATTACK_BONUS].add_competence(ab)
        if self.meta[LEVEL]>=15:
            pass
            #add critical changes

class Monk(Character):
    def create_progressions(self):
        self.progressions[BAB] = GOOD
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = AVERAGE
        self.progressions[WILL] = GOOD
        self.progressions[HIT_VALUE] = 5

    def apply_class_modifications(self):
        #wisdom is used often, so make it quick to access
        wisdom = self.attributes[WIS].get_total()

        #enlightened defense
        if self.items[ARMOR] is None:
            self.defenses[AC].misc.add_inherent(wisdom)
        else:
            self.printverb('Monk is wearing armor? %s' %
                    self.items[ARMOR])

        #unarmed strike
        if self.items[WEAPON_PRIMARY] is None:
            unarmed_weapon = equipment.Weapon.from_weapon_name('unarmed')
            #make the weapon deal monk damage
            for i in xrange(2):
                unarmed_weapon.damage_die.increase_size(increase_min=True)
            self.items[WEAPON_PRIMARY] = unarmed_weapon
            self.attacks[WEAPON_DAMAGE_PRIMARY].add_die(
                    unarmed_weapon)

        #wholeness of body

        #improved ki strike
        if self.meta[LEVEL]>=10:
            self.attacks[DAMAGE][WEAPON_PRIMARY].add_inherent(wisdom/2)

class Paladin(Character):
    def create_progressions(self):
        self.progressions[BAB] = GOOD
        self.progressions[FORT] = GOOD
        self.progressions[REF] = POOR
        self.progressions[WILL] = GOOD
        self.progressions[HIT_VALUE] = 6

class Rogue(Character):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = POOR
        self.progressions[REF] = GOOD
        self.progressions[WILL] = AVERAGE
        self.progressions[HIT_VALUE] = 5

    def apply_class_modifications(self):
        self.add_ability('danger sense')

class Spellwarped(Character):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = AVERAGE
        self.progressions[WILL] = AVERAGE
        self.progressions[HIT_VALUE] = 5

class Sorcerer(Character):
    def create_progressions(self):
        self.progressions[BAB] = POOR
        self.progressions[FORT] = POOR
        self.progressions[REF] = POOR
        self.progressions[WILL] = GOOD
        self.progressions[HIT_VALUE] = 4

class Wizard(Character):
    def create_progressions(self):
        self.progressions[BAB] = POOR
        self.progressions[FORT] = POOR
        self.progressions[REF] = POOR
        self.progressions[WILL] = GOOD
        self.progressions[HIT_VALUE] = 4

class Monster(Creature):
    pass

class Aberration(Monster):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = POOR
        self.progressions[WILL] = AVERAGE
        self.progressions[HIT_VALUE] = 5
        self.progressions[NATURAL_ARMOR] = POOR

    def apply_class_modifications(self):
        self.add_ability('darkvision')

class Animal(Monster):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = POOR
        self.progressions[WILL] = AVERAGE
        self.progressions[HIT_VALUE] = 5
        self.progressions[NATURAL_ARMOR] = POOR

    def apply_class_modifications(self):
        self.attributes[INT].add_inherent(-8)
        self.add_abilities(('low-light vision', 'scent'))

class Construct(Monster):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = POOR
        self.progressions[WILL] = POOR
        self.progressions[HIT_VALUE] = 5
        self.progressions[NATURAL_ARMOR] = AVERAGE

    def apply_class_modifications(self):
        self.add_abilities(('construct', 'darkvision'))

class Fey(Monster):
    def create_progressions(self):
        self.progressions[BAB] = POOR
        self.progressions[FORT] = POOR
        self.progressions[REF] = AVERAGE
        self.progressions[WILL] = AVERAGE
        self.progressions[HIT_VALUE] = 4
        self.progressions[NATURAL_ARMOR] = POOR

class Humanoid(Monster):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = POOR
        self.progressions[REF] = POOR
        self.progressions[WILL] = POOR
        self.progressions[HIT_VALUE] = 4

class MagicalBeast(Monster):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = AVERAGE
        self.progressions[WILL] = POOR
        self.progressions[HIT_VALUE] = 5
        self.progressions[NATURAL_ARMOR] = POOR

    def apply_class_modifications(self):
        self.add_ability('low-light vision')

class MonstrousHumanoid(Monster):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = AVERAGE
        self.progressions[WILL] = POOR
        self.progressions[HIT_VALUE] = 5
        self.progressions[NATURAL_ARMOR] = POOR

class Ooze(Monster):
    def create_progressions(self):
        self.progressions[BAB] = POOR
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = POOR
        self.progressions[WILL] = POOR
        self.progressions[HIT_VALUE] = 6

    def apply_class_modifications(self):
        self.add_ability('ooze')

class Outsider(Monster):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = AVERAGE
        self.progressions[WILL] = AVERAGE
        self.progressions[HIT_VALUE] = 5
        self.progressions[NATURAL_ARMOR] = POOR

    def apply_class_modifications(self):
        self.add_ability('low-light vision')

class Plant(Monster):
    def create_progressions(self):
        self.progressions[BAB] = POOR
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = POOR
        self.progressions[WILL] = POOR
        self.progressions[HIT_VALUE] = 5
        self.progressions[NATURAL_ARMOR] = POOR

    def apply_class_modifications(self):
        self.add_ability('plant')

class Undead(Monster):
    def create_progressions(self):
        self.progressions[BAB] = AVERAGE
        self.progressions[FORT] = AVERAGE
        self.progressions[REF] = POOR
        self.progressions[WILL] = AVERAGE
        self.progressions[HIT_VALUE] = 5
        self.progressions[NATURAL_ARMOR] = POOR

    def apply_class_modifications(self):
        self.add_ability('undead')

class IdealCreature(Creature):
    def create_progressions(self):
        self.progressions[BAB] = GOOD
        self.progressions[FORT] = POOR
        self.progressions[REF] = POOR
        self.progressions[WILL] = POOR
        self.progressions[HIT_VALUE] = 5

    def apply_class_modifications(self):
        #compensate for AC bonus from BAB
        self.defenses[AC].dodge.add_bonus(-(self.meta[LEVEL]/2),
                'babfix')
        #compensate for AC bonus from Dex
        self.defenses[AC].dodge.add_bonus(
                -(self.attributes[DEX].get_total()), 'dexfix')
        #this overrides the base 10 because it has the same type
        self.defenses[AC].misc.add_bonus(self.meta[LEVEL]+15,
                BASE)
