from strings import *
import re
import equipment, util
from abilities import abilities
from level_progressions import classes, monster_types

class Creature(object):
    def __init__(self, raw_stats, level=None,
            verbose=False):
        self.attacks = {
                ATTACK_BONUS: None,
                MANEUVER_BONUS: None,
                DAMAGE: None,
                }
        self.attributes = {}
        for attribute_name in ATTRIBUTE_NAMES:
            self.attributes[attribute_name] = None
        self.core = {
                HIT_POINTS: 0,
                HIT_VALUE: None,
                INITIATIVE: None,
                REACH: None,
                SIZE: SIZE_MEDIUM,
                SPACE: None,
                SPEEDS: {},
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
                ALIGNMENT: 'Neutral',
                COMBAT_DESCRIPTION: None,
                DESCRIPTION: None,
                LEVEL: level,
                LEVEL_PROGRESSION: None,
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

        self.abilities = set()
        self.raw_stats = raw_stats

        self._update()

    def _update(self):
        self._init_objects()
        self._interpret_raw_stats()
        self._apply_level_progression()

        self._calculate_derived_statistics()
        self.core[HIT_POINTS] = (self.attributes[CON].get_total()/2 +
                self.core[HIT_VALUE]) * self.meta[LEVEL]
        if self.meta[USE_MAGIC_BONUSES]:
            self._update_level_scaling()

    def _init_objects(self):
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
        self.core[INITIATIVE] = util.Modifier()

    def _interpret_raw_stats(self):
        raw_stats = self.raw_stats
        #set meta
        if self.meta[LEVEL] is None:
            if LEVEL in raw_stats.keys():
                self.meta[LEVEL] = int(raw_stats['level'])
        if 'alignment' in raw_stats.keys():
            self.meta[ALIGNMENT] = raw_stats['alignment']
        self.meta[NAME] = raw_stats['name']
        if 'class' in raw_stats.keys():
            self.meta[LEVEL_PROGRESSION] = classes[
                    raw_stats['class']]
            self.meta[USE_MAGIC_BONUSES] = True
        elif 'creature type' in raw_stats.keys():
            self.meta[LEVEL_PROGRESSION] = monster_types[
                    raw_stats['creature type']]
            self.meta[USE_MAGIC_BONUSES] = False
        if DESCRIPTION in raw_stats.keys():
            self.meta[DESCRIPTION] = raw_stats[DESCRIPTION]
        if COMBAT_DESCRIPTION in raw_stats.keys():
            self.meta[COMBAT_DESCRIPTION] = raw_stats[COMBAT_DESCRIPTION]

        #Add all the abilities to the character
        for ability_type in ABILITY_TYPES:
            if ability_type in raw_stats.keys():
                for ability_name in raw_stats[ability_type]:
                    self.add_ability(abilities[ability_name])
        #Now that we have the abilities, we can calculate the level if necessary
        if self.meta[LEVEL] is None:
            self.meta[LEVEL] = self._calc_minimum_level()

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
                self._parse_attribute(attribute_name,
                        raw_stats[attribute_name])
            except KeyError:
                self.print_verb('missing attribute: '+attribute_name)

        #apply effects of abilities, now that we have the core mechanics
        for ability in self.abilities:
            ability.apply_benefit(self)

    def _calc_minimum_level(self):
        return max(1, sum([ability.points for ability in self.abilities]))

    def _update_level_scaling(self):
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

    #parse an attribute from raw_stats
    def _parse_attribute(self, attribute_name, raw_attribute):
        progression, starting_value = util.split_descriptor_and_value(
                raw_attribute)

        self.attributes[attribute_name].add_bonus(starting_value, BASE)
        self.attributes[attribute_name].set_progression(progression)
        self.attributes[attribute_name].set_level(self.meta[LEVEL])

    def _apply_level_progression(self):
        self.attacks[ATTACK_BONUS].set_progression(
                self.meta[LEVEL_PROGRESSION].bab_progression)
        for save in SAVES:
            self.defenses[save].set_progression(
                    self.meta[LEVEL_PROGRESSION].save_progressions[save])
        self.core[HIT_VALUE] = self.meta[LEVEL_PROGRESSION].hit_value
        self.defenses[AC].natural_armor.set_progression(
                self.meta[LEVEL_PROGRESSION].natural_armor_progression)
        self.meta[LEVEL_PROGRESSION].apply_modifications(self)

    def add_ability(self, ability, check_prerequisites = True, by_name = False):
        #abilities can be added by name instead of as an ability object
        #but they have to be sourced properly in that case
        if by_name:
            ability = abilities[ability]
        if check_prerequisites:
            if not ability.meets_prerequisites(self):
                self.print_verb('Ability prerequisites not met')
                return False
        self.abilities.add(ability)
        return True

    def add_abilities(self, abilities, by_name = False):
        for ability in abilities:
            self.add_ability(ability, by_name = by_name)

    def _calculate_derived_statistics(self):
        self.attacks[ATTACK_BONUS].set_level(self.meta[LEVEL])
        self.attacks[MANEUVER_BONUS].set_level(self.meta[LEVEL])
        for save in SAVES:
            self.defenses[save].set_level(self.meta[LEVEL])
        self.defenses[AC].natural_armor.set_level(self.meta[LEVEL])
        derp = self.defenses[AC].natural_armor

        dexterity_to_ac = self.attributes[DEX].get_total()
        if self.items[ARMOR] is not None:
            self.defenses[AC].armor.add_bonus(self.items[ARMOR].ac_bonus, BASE)
            if self.items[ARMOR].encumbrance=='medium' or self.items[ARMOR].encumbrance=='heavy':
                dexterity_to_ac /=2
        self.defenses[AC].dodge.add_bonus(dexterity_to_ac, DEX)

        if self.items[SHIELD] is not None:
            self.defenses[AC].shield.add_bonus(
                    self.items[SHIELD].ac_bonus, BASE)

        self._calculate_attack_attribute_bonus()
        self.attacks[ATTACK_BONUS].add_bonus(util.get_size_modifier(self.core[SIZE]), SIZE)
        self.attacks[MANEUVER_BONUS].set_attributes(self.attributes[STR],
                self.attributes[DEX])
        self.attacks[MANEUVER_BONUS].add_bonus(util.get_size_modifier(
            self.core[SIZE], is_special_size_modifier=True), SIZE)

        #set damage for each weapon
        for weapon in WEAPONS:
            if self.items[weapon] is not None:
                self.attacks[DAMAGE][weapon].set_die(
                        self.items[weapon].damage_die)
        self.attacks[DAMAGE][WEAPON_PRIMARY].add_bonus(
                self.attributes[STR].get_total()/2, STR)

        self._add_save_attributes()

        self.defenses[AC].dodge.add_bonus(
                util.ifloor(self.attacks[ATTACK_BONUS].base_attack_bonus/2), BAB)

        self.defenses[MC].add_inherent(self.defenses[AC].touch())
        self.defenses[MC].add_inherent(self.attacks[ATTACK_BONUS].base_attack_bonus/2)
        self.defenses[MC].add_inherent(self.attributes[STR].get_total())

        self.core[INITIATIVE].add_bonus(self.attributes[DEX].get_total(), DEX)
        self.core[INITIATIVE].add_bonus(self.attributes[WIS].get_total()/2, WIS)

    def _calculate_attack_attribute_bonus(self):
        #we are assuming offhand weapon is no heavier than main weapon
        if self.items[WEAPON_PRIMARY].encumbrance =='light' and self.attributes[DEX].get_total() >= self.attributes[STR].get_total():
            self.attacks[ATTACK_BONUS].add_bonus(
                    self.attributes[DEX].get_total(), DEX)
        else:
            self.attacks[ATTACK_BONUS].add_bonus(
                    self.attributes[STR].get_total(), STR)


    def _add_save_attributes(self):
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
            group_raw_stats = util.parse_stats_from_file(
                    'data/monsters/%s.txt' % (''.join(raw_stats['group'])))
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
        defenses += '\nHP '+str(self.core[HIT_POINTS])
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
                self.meta[LEVEL_PROGRESSION].name, self.meta[LEVEL])
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
        defenses += r'\textbf{HP} %s (%s HV)' % (self.core[HIT_POINTS],
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
