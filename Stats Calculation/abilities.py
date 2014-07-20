import util
from strings import * 

class Ability(object):
    #Name of the ability, a function that applies the benefits of the ability
    #to a creature, a function that tests whether the creature qualifies
    #for the ability, a value associated with the ability, if appropriate
    #(such as the range of darkvision), and special text for the ability if
    #the name (and value, if present) are not what should be printed when
    #the ability is referenced (primarily with to_latex()) 
    #text can be either a string or a function
    def __init__(self, name, apply_benefit = None, meets_prerequisites = None, 
            tags = None, value = None, text = None, points=0):
        self.name = name
        self.tags = set()
        if tags is not None:
            for tag in tags:
                self.tags.add(tag)
        if apply_benefit is None:
            self.apply_benefit = lambda x: True
        else:
            self.apply_benefit = apply_benefit
        if meets_prerequisites is None:
            self.meets_prerequisites = lambda x: True
        else:
            self.meets_prerequisites = meets_prerequisites
        self.value = value
        self.text = text
        self.points = points

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

def new_feat(name, apply_benefit = None, meets_prerequisites = None, tags = None,
        value = None, text = None):
    feat_tags = set()
    feat_tags.add('feat')
    if tags is not None:
        for tag in tags:
            feat_tags.add(tag)
    return Ability(name, apply_benefit, meets_prerequisites, feat_tags, value,
            text)

abilities = dict()

####################
#CLASS FEATURES
####################

def barbarian_damage_reduction_benefit(creature):
    creature.damage_reduction = util.DamageReduction(creature.level,
        'physical')
abilities['barbarian damage reduction'] = Ability('damage reduction',
        barbarian_damage_reduction_benefit)
    
def danger_sense_benefit(creature):
    creature.initiative.add_competence(level/2)
abilities['danger sense'] = Ability('danger sense', danger_sense_benefit)

def larger_than_life_benefit(creature):
    creature.items[WEAPON_PRIMARY].die.increase_size(increase_min=True)
abilities['larger than life'] = Ability('larger than life', larger_than_life_benefit)
abilities['larger than belief'] = Ability('larger than belief', larger_than_life_benefit)

def rage_benefit(level, creature):
    creature.attacks[DAMAGE][WEAPON_PRIMARY].add_competence(util.std_scale(level))
    creature.defenses[AC].misc.add_bonus(-2, 'rage')
    creature.saves.fortitude.add_competence(util.std_scale(level))
    creature.saves.will.add_competence(util.std_scale(level))
    creature.current_hit_points += level*util.std_scale(level)
abilities['rage'] = Ability('rage', rage_benefit)

####################
#FEATS
####################

def overwhelming_force_benefit(creature):
    if creature.items[WEAPON_PRIMARY].encumbrance == 'heavy':
        creature.attacks[DAMAGE][WEAPON_PRIMARY].bonus(
                creature.attributes[STR].get_total(), STR)
def overwhelming_force_prerequisites(creature):
        return creature.attributes[STR].get_total() >=5 and creature.attacks[ATTACK_BONUS].base_attack_bonus >=8 and creature.items[WEAPON_PRIMARY].encumbrance == 'heavy'
abilities['overwhelming force'] = Ability('overwhelming force', overwhelming_force_benefit,
        overwhelming_force_prerequisites, set(('feat', 'combat', 'power')))

def two_weapon_fighting_benefit(creature):
    if creature.offhand_weapon:
        creature.attacks[ATTACK_BONUS].add_competence(2)

abilities['two weapon fighting'] = Ability('two-weapon fighting', two_weapon_fighting_benefit,
        lambda creature: creature.attributes[DEX].get_total() >=3, 
        set(('feat', 'combat', 'finesse')))

def two_weapon_defense_benefit(creature):
    if creature.offhand_weapon:
        creature.defenses[AC].shield.add_competence(2)
abilities['two weapon defense'] = Ability('two-weapon defense', two_weapon_defense_benefit,
        lambda creature: creature.attributes[DEX].get_total() >= 3,
        set(('feat', 'combat', 'defensje', 'finesse')))

def combat_expertise_benefit(creature):
    creature.attacks[ATTACK_BONUS].add_bonus(-util.bab_scale(creature.level),
            'combat expertise')
    creature.defenses[AC].dodge.add_bonus(util.bab_scale(creature.level),
            'combat expertise')
abilities['combat expertise'] = Ability('combat expertise', combat_expertise_benefit, 
        lambda creature: creature.attributes.intelligence.get_total() >= 3,
        set(('feat', 'combat', 'defense', 'style')))

def power_attack_benefit(creature):
    creature.attacks[ATTACK_BONUS].add_bonus(-util.bab_scale(creature.level), 
            'power attack')
    damage_bonus = 2+(creature.attacks[ATTACK_BONUS].base_attack_bonus/5)*2
    if creature.items[WEAPON_PRIMARY].encumbrance == 'medium' or creature.items[WEAPON_PRIMARY].encumbrance == 'heavy':
        creature.attacks[DAMAGE][WEAPON_PRIMARY].add_bonus(damage_bonus,
                'power attack')
    else:
        creature.attacks[DAMAGE][WEAPON_PRIMARY].add_bonus(damage_bonus/2, 'power attack')
    if creature.offhand_weapon:
        creature.offhand_weapon_damage.add_bonus(damage_bonus/2, 
                'power attack')
abilities['power attack'] = Ability('power attack', power_attack_benefit, lambda creature:
        creature.attributes[STR].get_total() >= 3,
        ['feat', 'combat', 'power', 'style'])

def deadly_aim_benefit(creature):
    creature.attacks[ATTACK_BONUS].add_bonus(-util.bab_scale(creature.level), 
            'deadly aim')
    damage_bonus = 2+(creature.attacks[ATTACK_BONUS].base_attack_bonus/5)*2
    creature.attacks[DAMAGE][WEAPON_PRIMARY].add_bonus(damage_bonus, 
            'deadly aim')
abilities['deadly aim'] = Ability('deadly aim', deadly_aim_benefit, lambda creature:
        creature.attributes[DEX].get_total() >= 3,
        set(('feat', 'combat', 'precision', 'style')))

abilities['endurance'] = new_feat('endurance')
abilities['run'] = new_feat('run')
abilities['diehard'] = new_feat('diehard')
abilities['track'] = new_feat('track')

####################
#MONSTER TRAITS
####################

abilities['darkvision'] = Ability('darkvision', tags = ['sense'], value = 60,
        text=lambda x: '%s %s ft.' % (x.name, x.value))
abilities['low-light vision'] = Ability('low-light vision', tags = ['sense'])
abilities['scent'] = Ability('scent', tags = ['sense'])

def natural_grab_text(creature):
    return 'Natural grab (%s) %s' % (util.decrease_size(creature.core[SIZE]).title(),
            creature.attacks[MANEUVER_BONUS].mstr())
abilities['natural grab'] = Ability('improved grab', text = natural_grab_text,
        tags=['special attack'])

def natural_trip_text(creature):
    return 'Natural trip (%s) %s' % (util.increase_size(creature.core[SIZE]).title(),
            creature.attacks[MANEUVER_BONUS].mstr())
abilities['natural trip'] = Ability('natural trip', text = natural_trip_text,
        tags=['special attack'])

def natural_weapon_benefit(creature):
    creature.items[WEAPON_PRIMARY].increase_size()
abilities['improved natural weapon'] = Ability('improved natural weapon',
        apply_benefit = natural_weapon_benefit, points=1)

abilities['enslave'] = Ability('enslave', text = 'enslave', points=4)
abilities['slime'] = Ability('slime', text = 'slime', points=3)
abilities['carapace'] = Ability('carapace', 
        apply_benefit = lambda c: c.meta[LEVEL_PROGRESSION].improve_progression(
            'natural_armor_progression'), points=1)

####################
#MONSTER TEMPLATES
####################

def warrior_benefit(creature):
    util.improve_bab(creature.level_progression)
    util.improve_hv(creature.level_progression)
abilities['warrior'] = Ability('warrior', apply_benefit = warrior_benefit,
        tags=[ABILITY_TEMPLATE])

def brute_benefit(creature):
    util.improve_hv(creature.meta[LEVEL_PROGRESSION])
    util.improve_save(creature.meta[LEVEL_PROGRESSION], FORTITUDE)
abilities['brute'] = Ability('brute', apply_benefit = brute_benefit,
        tags=[ABILITY_TEMPLATE])

def scout_benefit(creature):
    util.improve_save(creature.meta[LEVEL_PROGRESSION], REFLEX)
    creature.speed += min(10, creature.core[SPEED])
abilities['scout'] = Ability('scout', apply_benefit = scout_benefit,
        tags=[ABILITY_TEMPLATE])

####################
#MONSTER TYPES
####################

abilities['construct'] = Ability('construct', text='construct traits')
abilities['ooze'] = Ability('ooze', text='ooze traits')
abilities['plant'] = Ability('plant', text='plant traits')
abilities['undead'] = Ability('undead', text='undead traits')
