import math
import classes
import equipment
import util
import combat
import dice
import abilities

class Creature(object):
    def __init__(self, raw_stats, raw_attributes, level, verbose=False):
        #Core variable initializations
        #http://stackoverflow.com/questions/9946736/python-not-creating-a-new-clean-instance
        self.level = level
        self.verbose = verbose

        self._init_core_statistics()

        self._interpret_raw_stats(raw_stats)
        self._interpret_raw_attributes(raw_attributes)
        
        self._set_class_calculator()
        self._calculate_class_stats()

        self._add_level_scaling()
        self._calculate_derived_statistics()

    def _init_core_statistics(self):
        self.attack_bonus = util.AttackBonus(level=self.level)
        self.weapon_damage = util.Modifier()
        self.offhand_weapon_damage = util.Modifier()
        self.weapon_damage_types = ['physical']
        self.offhand_weapon_damage_types = ['physical']
        self.attributes = util.Attributes()
        self.armor_class = util.ArmorClass()
        self.saves = util.SavingThrows(level=self.level)
        self.cmd = util.Modifier()
        self.hit_value = None
        self.max_hit_points = 0
        self.damage_reduction = util.DamageReduction()
        self.initiative = util.Modifier()
        self.feats = set()
        self.abilities = set()
        self.alignment = None
        self.name = None
        self.class_name = None
        self.size = 'medium'
        self.weapon = None
        self.offhand_weapon = None
        self.armor = None
        self.shield = None

    def _interpret_raw_stats(self, raw_stats):
        self.name = raw_stats['name']
        if 'class' in raw_stats.keys():
            self.class_name = raw_stats['class']
        equipment_set = equipment.EquipmentSet.from_raw_stats(raw_stats)
        self.weapon = equipment_set.weapon
        self.offhand_weapon = equipment_set.offhand_weapon
        if self.weapon:
            self.weapon_damage.add_die(self.weapon.damage_die)
        if self.offhand_weapon:
            self.offhand_weapon_damage.add_die(self.offhand_weapon.damage_die)
        self.armor = equipment_set.armor
        self.shield = equipment_set.shield
        if 'size' in raw_stats.keys():
            self.size = raw_stats['size']
        if 'alignment' in raw_stats.keys():
            self.alignment = raw_stats['alignment']

    def _interpret_raw_attributes(self, raw_attributes):
        self.attributes.set_all_dict(raw_attributes)

        #Apply level-based scaling
        self._scale_attributes(raw_attributes)

    def _scale_attributes(self, raw_attributes):
        try:
            main_attribute = raw_attributes['bonus attribute 1']
            main_increases = (2 + self.level)/4
            getattr(self.attributes, main_attribute).add_inherent(
                    main_increases)
        except:
            if self.verbose: print 'Missing bonus attribute 1'
            pass
        try:
            second_attribute = raw_attributes['bonus attribute 2']
            second_increases = (self.level)/4
            getattr(self.attributes, second_attribute).add_inherent(
                    second_increases)
        except:
            if self.verbose: print self.name, 'Missing bonus attribute 2'
            pass
        
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
        self.class_calculator.apply_progressions(self)

        self.max_hit_points = calculate_hit_points(
                self.attributes.constitution.get_total(), 
                self.class_calculator.hit_value, self.level)
        self.current_hit_points = self.max_hit_points

        self.class_calculator.apply_modifications(self)

    def _calculate_derived_statistics(self):
        dexterity_to_ac = self.attributes.dexterity.get_total()
        if self.armor:
            self.armor_class.armor.add_inherent(self.armor.ac_bonus)
            if self.armor.encumbrance=='medium' or self.armor.encumbrance=='heavy':
                dexterity_to_ac /=2
        self.armor_class.dodge.add_inherent(dexterity_to_ac)

        if self.shield:
            self.armor_class.shield.add_inherent(self.shield.ac_bonus)

        self.attack_bonus.add_inherent(self._calculate_attack_attribute_bonus())

        self.weapon_damage.add_inherent(self.attributes.strength.get_total()/2)

        self._add_save_attributes()

        self.armor_class.dodge.add_inherent(
                util.ifloor(self.attack_bonus.base_attack_bonus/2))

        self.cmd.add_inherent(self.armor_class.touch())
        self.cmd.add_inherent(self.attack_bonus.base_attack_bonus/2)
        self.cmd.add_inherent(self.attributes.strength.get_total())

        self.initiative.add_inherent(self.attributes.dexterity.get_total())
        self.initiative.add_inherent(self.attributes.wisdom.get_total()/2)

        #Assume user has basic feats
        self.add_ability(abilities.overwhelming_force)
        self.add_ability(abilities.two_weapon_fighting)
        self.add_ability(abilities.two_weapon_defense)

    #http://stackoverflow.com/questions/141545/overloading-init-in-python
    @classmethod
    def from_creature_name(cls, creature_name, level, verbose=False):
        creature_filename = 'data/'+creature_name+'.txt'
        raw_stats = util.parse_stats_from_file(creature_filename)
        raw_attributes = util.parse_attribute_file(raw_stats)
        return cls(raw_stats, raw_attributes, level, verbose)

    def _add_save_attributes(self):
        self.saves.fortitude.add_inherent(
                self.attributes.constitution.get_total())
        self.saves.fortitude.add_inherent(util.ifloor(
            self.attributes.strength.get_total()/2))
        self.saves.reflex.add_inherent(
                self.attributes.dexterity.get_total())
        self.saves.reflex.add_inherent(util.ifloor(
            self.attributes.wisdom.get_total()/2))
        self.saves.will.add_inherent(
                self.attributes.charisma.get_total())
        self.saves.will.add_inherent(util.ifloor(
            self.attributes.intelligence.get_total()/2))

    def _add_level_scaling(self):
        scale_factor = self.level/4
        #if self.armor:
        #even classes without armor can get armor bonuses from magic robes
        self.armor_class.armor.add_enhancement(scale_factor)
        if self.shield:
            self.armor_class.shield.add_enhancement(scale_factor)
        if self.weapon:
            self.attack_bonus.add_enhancement(scale_factor)
            self.weapon_damage.add_enhancement(scale_factor)
        if self.offhand_weapon:
            #needed when tracking main, offhand attack bonus separately
            #self.attack_bonus.add_enhancement(scale_factor)
            self.offhand_weapon_damage.add_enhancement(scale_factor)
        for save_name in util.SAVE_NAMES:
            getattr(self.saves,save_name).add_enhancement(scale_factor)

    def _calculate_attack_attribute_bonus(self):
        #we are assuming offhand weapon is no heavier than main weapon
        if self.weapon.encumbrance =='light':
            return max(self.attributes.strength.get_total(),
                    self.attributes.dexterity.get_total())
        else:
            return self.attributes.strength.get_total()

    def __str__(self):
        full_string = self.name + ' ' + str(self.level)
        full_string += '\n'+ self._to_string_defenses() 
        full_string += '\n' + self._to_string_attacks() 
        full_string += '\n' + self._to_string_attributes()
        return full_string

    def _to_string_defenses(self):
        defenses = str(self.armor_class)
        defenses += '; CMD '+str(self.cmd.get_total())
        defenses += '\nHP '+str(self.max_hit_points)
        defenses += '; Fort '+util.mstr(self.saves.fortitude.get_total())
        defenses += ', Ref '+util.mstr(self.saves.reflex.get_total())
        defenses += ', Will '+util.mstr(self.saves.will.get_total())
        return defenses

    def _to_string_attacks(self):
        attacks = 'Atk ' + util.mstr(self.attack_bonus.get_total())
        attacks += ' ('+ str(self.weapon_damage.get_total()) + ')'
        return attacks

    def _to_string_attributes(self):
        attributes = 'Attr'
        for attribute_name in util.ATTRIBUTE_NAMES:
            attributes += ' ' + str(getattr(self.attributes, 
                attribute_name).get_total())
        return attributes

    def to_latex(self):
        monster_string=''
        header =  '\\subsection{%s}\n\\begin{mstatblock}\n' % self.name.title()
        monster_string+=header

        types = '\\par {0} {1} {2}'.format(
                self.alignment.title(), self.size, self.creature_type)
        #if self.subtypes:
        #    types +=' {0}'.format()
        types+=' \\textbf{CR} {0}'
        if self.archetype:
            types+=' {0}'.format(self.archetype)
        types+='\n'
        monster_string+=types

        senses = self.get_abilities_with_tag('sense')
        senses_string = '\\par \\textbf{Init} %s; Perception %s' % (
                self.initiative, '+0')
        for sense in senses:
            senses_string += ', Derp'
        senses_string+='\n'
        monster_string += senses_string
        
        """
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
        """

        return monster_string

    def add_ability(self, ability, check_prerequisites = True):
        if check_prerequisites:
            if not ability.meets_prerequisites(self):
                if self.verbose: print 'Ability prerequisites not met'
                return False
        ability.apply_benefit(self)
        if ability.has_tag('feat'):
            self.feats.add(ability)
        else:
            self.abilities.add(ability)

    def has_ability(self, ability):
        return ability in self.abilities

    def get_abilities_with_tag(self, tag):
        return filter(lambda a: a.has_tag(tag), self.abilities)

    def has_feat(self, feat):
        return feat in self.feats

class CombatCreature(Creature):
    def __init__(self, raw_stats, raw_attributes, level, verbose = False):
        super(CombatCreature, self).__init__(raw_stats, raw_attributes, level,
                verbose)
        #default to full attack for now
        self.attack_mode = 'full attack'
        #amount creature must hit by to hit with offhand attack
        #Currently assuming that offhand weapon has same attack bonus
        #as main hand weapon, and that offhand weapon is light
        self.offhand_threshold = 5

        self.critical_damage = 0
        self.is_alive = True

    def new_round(self):
        self.damage_reduction.refresh()

    def take_damage(self, damage, damage_types):
        damage = self.damage_reduction.reduce_damage(damage, damage_types)
        if self.current_hit_points>0:
            self.current_hit_points = max(0, self.current_hit_points-damage)
        else:
            self.critical_damage+=damage
            self.is_alive = self._check_if_alive()

    def _check_if_alive(self):
        if self.critical_damage > self.attributes.constitution.get_total():
            return False
        return True

    def default_attack(self, enemy):
        return {
                'full attack': self.full_attack(enemy),
                'damage spell': self.damage_spell(enemy),
                'special attack': self.special_attack(enemy),
                }[self.attack_mode]

    def full_attack(self, enemy, deal_damage = True):
        damage_dealt = 0
        for i in xrange(util.attack_count(self.attack_bonus.base_attack_bonus)):
            damage_dealt += self.single_attack(enemy, self.attack_bonus.get_total() - 5*i, deal_damage)
        return damage_dealt

    def single_attack(self, enemy, attack_bonus = None,
            deal_damage = True):
        damage_dealt = 0
        if attack_bonus is None:
            attack_bonus = self.attack_bonus.get_total()
        is_hit, is_threshold_hit = util.attack_hits(attack_bonus, 
                enemy.armor_class.normal(), threshold=5)
        if is_hit:
            damage_dealt += self.weapon_damage.get_total(roll=True)
        if is_threshold_hit:
            damage_dealt += self.offhand_weapon_damage.get_total(roll=True)
        if deal_damage:
            enemy.take_damage(damage_dealt, self.weapon_damage_types)
        return damage_dealt

    def damage_spell(self, enemy):
        #Use highest-level, no optimization, no save spell
        damage_die = dice.Dice.from_string('{0}d10'.format(max(1,self.level/2)))
        damage_dealt = damage_die.roll()
        enemy.take_damage(damage_dealt, ['spell'])
        return damage_dealt

    def damage_per_round(self, ac):
        return full_weapon_damage_dealt(self.attack_bonus.get_total(),
                ac, self.attack_bonus.base_attack_bonus, self.weapon_damage.get_total())

    def hits_per_round(self, ac):
        return combat.full_attack_hits(self.attack_bonus.get_total(),
                ac, self.attack_bonus.base_attack_bonus)

    def avg_hit_probability(self, ac):
        return combat.avg_hit_probability(self.attack_bonus.get_total(),
                ac, self.attack_bonus.base_attack_bonus)

    def roll_initiative(self):
        return util.d20.roll()+self.initiative.get_total()

    def special_attack(self, enemy):
        pass

class Character(Creature):
    #http://stackoverflow.com/questions/7629556/python-super-and-init-vs-init-self
    def __init__(self, raw_stats, raw_attributes, level, verbose=False):
        super(Character, self).__init__(raw_stats, raw_attributes, level,
                verbose)

def calculate_hit_points(constitution, hit_value, level):
    return (constitution + hit_value) * level

#A creature with "typical" attributes for its level.
def get_generic_creature(level):
    return Creature.from_creature_name('generic-warrior', level)
