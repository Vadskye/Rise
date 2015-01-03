import util
import dice
from strings import *

def get_ability_by_name(ability_name):
    return Ability.all_abilities[ability_name]

class Ability(object):
    all_abilities = dict()
    #Name of the ability, a function that applies the benefits of the ability
    #to a creature, a function that tests whether the creature qualifies
    #for the ability, a value associated with the ability, if appropriate
    #(such as the range of darkvision), and special text for the ability if
    #the name (and value, if present) are not what should be printed when
    #the ability is referenced (primarily with to_latex()) 
    #text can be either a string or a function
    def __init__(self, name, benefit = None, meets_prerequisites = None, 
            tags = None, value = None, text = None):
        self.name = name
        self.tags = set()
        if tags is not None:
            for tag in tags:
                self.tags.add(tag)
        if benefit is None:
            self.benefit = lambda x: False
        else:
            self.benefit = benefit
        if meets_prerequisites is None:
            self.meets_prerequisites = lambda x: True
        else:
            self.meets_prerequisites = meets_prerequisites
        self.value = value
        self.text = text

    def apply_benefit(self, base_creature, check_prerequisites=True):
        if check_prerequisites and not self.meets_prerequisites(base_creature):
            return False
        self.benefit(base_creature)
        return True

    def has_tag(self, tag):
        if self.tags is None:
            return False
        return tag.lower() in self.tags

    def get_text(self, creature = None):
        if self.text is not None:
            #self.text can be either a string or a function
            try:
                return self.text(creature)
            except TypeError:
                return self.text
        if self.value is not None:
            return '%s %s' % (self.name, self.value)
        return self.name

    def __repr__(self):
        return 'Ability({0})'.format(self.name)

    @classmethod
    def create_ability(cls, name, benefit = None, meets_prerequisites = None,
            tags = None, value = None, text = None):
        ability = cls(name, benefit, meets_prerequisites, tags, value, text)
        Ability.all_abilities[name] = ability

    @classmethod
    def create_feat(cls, name, benefit = None, meets_prerequisites = None,
            tags = None, value = None, text = None):
        feat_tags = set()
        feat_tags.add('feat')
        if tags is not None:
            for tag in tags:
                feat_tags.add(tag)
        ability = cls(name, benefit, meets_prerequisites, feat_tags, value, text)
        Ability.all_abilities[name] = ability

####################
#CLASS FEATURES
####################

def barbarian_damage_reduction_benefit(creature):
    creature.damage_reduction = util.DamageReduction(creature.level,
        'physical')
Ability.create_ability('barbarian damage reduction', barbarian_damage_reduction_benefit)
    
def danger_sense_benefit(creature):
    creature.initiative().add_bonus(creature.level/2, 'danger sense')
Ability.create_ability('danger sense', danger_sense_benefit)

def larger_than_life_benefit(creature):
    if creature.primary_weapon is None:
        return False
    creature.primary_weapon.increase_size()
Ability.create_ability('larger than life', larger_than_life_benefit)
Ability.create_ability('larger than belief', larger_than_life_benefit)

def rage_benefit(creature):
    rage_bonus = util.std_scale(creature.level)
    creature.strength.add_bonus(rage_bonus, 'rage')
    creature.charisma.add_bonus(rage_bonus, 'rage')
    creature.armor_class.misc.add_bonus(-2, 'rage')
    creature.get_hit_points().add_bonus(creature.level*rage_bonus, 'rage')
Ability.create_ability('rage', rage_benefit)

def armor_discipline_agility_benefit(creature):
    armor_discipline_count = (creature.level+5)/6
    for i in xrange(1, armor_discipline_count):
        creature.armor.encumbrance = util.lower_encumbrance(
                creature.armor.encumbrance)
Ability.create_ability('armor discipline (agility)', armor_discipline_agility_benefit)

def armor_discipline_resilience_benefit(creature):
    if creature.level > 7:
        creature.damage_reduction = util.DamageReduction(creature.level, 'physical')
    if creature.level > 13:
        constitution = creature.constitution.get_total()
        creature.armor_class.misc.add_bonus(constitution/2, CON)
Ability.create_ability('armor discipline (resilience)', armor_discipline_resilience_benefit)


####################
#FEATS
####################

def overwhelming_force_prerequisites(creature):
    return creature.primary_weapon.encumbrance == 'heavy'
def overwhelming_force_benefit(creature):
    creature.primary_weapon_damage.add_bonus(
                creature.strength.get_total(), STR)
def overwhelming_force_prerequisites(creature):
        return creature.strength.get_total() >=5 and creature.attack_bonus.base_attack_bonus >=8 and creature.primary_weapon.encumbrance == 'heavy'
Ability.create_ability('overwhelming force', overwhelming_force_benefit,
        overwhelming_force_prerequisites, set(('feat', 'combat', 'power')))

def two_weapon_fighting_benefit(creature):
    if creature.offhand_weapon:
        creature.attack_bonus.add_competence(2)

Ability.create_ability('two-weapon fighting', two_weapon_fighting_benefit,
        lambda creature: creature.dexterity.get_total() >=3, 
        set(('feat', 'combat', 'finesse')))

def two_weapon_defense_benefit(creature):
    if creature.offhand_weapon:
        creature.armor_class.shield.add_competence(2)
Ability.create_ability('two-weapon defense', two_weapon_defense_benefit,
        lambda creature: creature.dexterity.get_total() >= 3,
        set(('feat', 'combat', 'defense', 'finesse')))

def combat_expertise_benefit(creature):
    creature.attack_bonus.add_bonus(-util.bab_scale(creature.level),
            'combat expertise')
    creature.armor_class.dodge.add_bonus(util.bab_scale(creature.level),
            'combat expertise')
Ability.create_ability('combat expertise', combat_expertise_benefit, 
        lambda creature: creature.attributes.intelligence.get_total() >= 3,
        set(('feat', 'combat', 'defense', 'style')))

def power_attack_benefit(creature):
    creature.attack_bonus.add_bonus(-util.bab_scale(creature.level), 
            'power attack')
    damage_bonus = 2+(creature.attack_bonus.base_attack_bonus/5)*2
    if creature.primary_weapon.encumbrance == 'medium' or creature.primary_weapon.encumbrance == 'heavy':
        creature.primary_weapon_damage.add_bonus(damage_bonus,
                'power attack')
    else:
        creature.primary_weapon_damage.add_bonus(damage_bonus/2, 'power attack')
    if creature.offhand_weapon:
        creature.offhand_weapon_damage.add_bonus(damage_bonus/2, 
                'power attack')
Ability.create_ability('power attack', power_attack_benefit, lambda creature:
        creature.strength.get_total() >= 3,
        ['feat', 'combat', 'power', 'style'])

def deadly_aim_benefit(creature):
    creature.attack_bonus.add_bonus(-util.bab_scale(creature.level), 
            'deadly aim')
    damage_bonus = 2+(creature.attack_bonus.base_attack_bonus/5)*2
    creature.primary_weapon_damage.add_bonus(damage_bonus, 
            'deadly aim')
Ability.create_ability('deadly aim', deadly_aim_benefit, lambda creature:
        creature.dexterity.get_total() >= 3,
        set(('feat', 'combat', 'precision', 'style')))

Ability.create_feat('endurance', tags=[TAG_DEFENSE])
Ability.create_feat('diehard', tags=[TAG_DEFENSE])
Ability.create_feat('track', tags=['skill'])
Ability.create_feat('dodge', tags=[TAG_DEFENSE, 'combat', 
'mobility'])
Ability.create_feat('mobility', tags=[TAG_DEFENSE, 'combat', 
'mobility'])
Ability.create_feat('spring attack', tags=[TAG_DEFENSE,
'combat', 'mobility'])

def great_fortitude_benefit(creature):
    creature.defenses[FORTITUDE].add_bonus(2, 'great fortitude')
Ability.create_feat('great fortitude',
        great_fortitude_benefit, tags=[SAVING_THROW])
def iron_will_benefit(creature):
    creature.will.add_bonus(2, 'iron will')
Ability.create_feat('iron will',
        iron_will_benefit, tags=[SAVING_THROW])
def lightning_reflexes_benefit(creature):
    creature.reflex.add_bonus(2, 'lightning reflexes')
Ability.create_feat('lightning reflexes',
        lightning_reflexes_benefit, tags=[SAVING_THROW], text='1/day reroll Reflex')

def swift_benefit(creature):
    for speed_mode in creature.get_speed_modes():
        creature.modify_speed(speed_mode, 5)
Ability.create_feat('swift', swift_benefit)

Ability.create_feat('overpowering assault', tags=[TAG_POWER, TAG_STYLE])

####################
#MONSTER TRAITS
####################

Ability.create_ability('darkvision', tags = ['sense'], value = 60,
        text='Darkvision %s ft.')
Ability.create_ability('low-light vision', tags = ['sense'])
Ability.create_ability('scent', tags = ['sense'])

def natural_grab_text(creature):
    return 'Natural grab (%s) %s' % (util.decrease_size(creature.size).title(),
            creature.maneuver_bonus.mstr())
Ability.create_ability('improved grab', text = natural_grab_text,
        tags=['special attack'])

def natural_trip_text(creature):
    return 'Natural trip (%s) %s' % (util.increase_size(creature.size).title(),
            creature.maneuver_bonus.mstr())
Ability.create_ability('natural trip', text = natural_trip_text,
        tags=['special attack'])

def natural_weapon_benefit(creature):
    creature.primary_weapon.increase_size()
Ability.create_ability('improved natural weapon',
        benefit = natural_weapon_benefit)

Ability.create_ability('enslave', tags=[TAG_ATTACK], text = 'enslave')
Ability.create_ability('slime', tags=[TAG_ATTACK], text = 'slime')
def carapace_benefit(creature):
    return creature.improve_progression(NATURAL_ARMOR)
Ability.create_ability('carapace', tags=[TAG_DEFENSE], benefit = carapace_benefit)
Ability.create_ability('mucus cloud', tags=[TAG_AURA])
Ability.create_ability('black cloud', tags=[TAG_ATTACK])
Ability.create_ability('babble', tags=[TAG_ATTACK])
Ability.create_ability('madness', tags=[TAG_DEFENSE])
Ability.create_ability('wisdom drain', tags=[TAG_ATTACK])
Ability.create_ability('mindless', tags=[TAG_DEFENSE])
Ability.create_ability('regeneration', tags=[TAG_DEFENSE])

####################
#MONSTER TEMPLATES
####################

def warrior_prerequisites(creature):
    return creature.progressions[BAB] is not None and creature.progressions[HIT_VALUE] is not None
def warrior_benefit(creature):
    creature.improve_progression(BAB)
    creature.improve_progression(HIT_VALUE)
Ability.create_ability('warrior', benefit = warrior_benefit,
        meets_prerequisites = warrior_prerequisites, tags=[ABILITY_TEMPLATE])

def antiwarrior_prerequisites(creature):
    return creature.progressions[BAB] is not None and creature.progressions[HIT_VALUE] is not None
def antiwarrior_benefit(creature):
    creature.reduce_progression(BAB)
    creature.reduce_progression(HIT_VALUE)
Ability.create_ability('antiwarrior', benefit = antiwarrior_benefit,
        meets_prerequisites = antiwarrior_prerequisites, tags=[ABILITY_TEMPLATE])

def brute_prerequisites(creature):
    return creature.progressions[FORT] is not None and creature.progressions[HIT_VALUE] is not None
def brute_benefit(creature):
    util.improve_hv(creature.get_class_progression())
    util.improve_save(creature.get_class_progression(), FORTITUDE)
Ability.create_ability('brute', benefit = brute_benefit,
        meets_prerequisites = brute_prerequisites, tags=[ABILITY_TEMPLATE])

def scout_prerequisites(creature):
    return creature.progressions[REFLEX] is not None and creature.get_all_speeds() is not None
def scout_benefit(creature):
    util.improve_save(creature.get_class_progression(), REFLEX)
    for speed_mode in creature.get_speed_modes():
        creture.modify_speed(speed_mode, min(10, creature.get_land_speed()))
Ability.create_ability('scout', benefit = scout_benefit,
        meets_prerequisites = scout_prerequisites, tags=[ABILITY_TEMPLATE])

def incorporeal_benefit(creature):
    #add Cha to hit points
    creature.hit_points().add_bonus(creature.level *
            creature.charisma.get_total()/2, 'cha')
    creature.strength.set_inapplicable()
    creature.constitution.set_inapplicable()
    def incorporeal_defense(damage, damage_types):
        d2 = dice.dx(2)
        if d2.roll() == 1:
            return None
        else:
            return damage
    creature.add_special_defense(incorporeal_defense)
Ability.create_ability('incorporeal', benefit = incorporeal_benefit,
        tags=[ABILITY_TEMPLATE])

####################
#MONSTER TYPES
####################

Ability.create_ability('construct', text='construct traits')
Ability.create_ability('ooze', text='ooze traits')
Ability.create_ability('plant', text='plant traits')
Ability.create_ability('undead', text='undead traits')
