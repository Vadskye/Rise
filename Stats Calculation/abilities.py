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
            tags = None, value = None, text = None):
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
    creature.weapon_damage.die.increase_size(increase_min=True)
abilities['larger than life'] = Ability('larger than life', larger_than_life_benefit)
abilities['larger than belief'] = Ability('larger than belief', larger_than_life_benefit)

def rage_benefit(level, creature):
    creature.weapon_damage.add_competence(util.std_scale(level))
    creature.armor_class.misc.add_circumstance(-2)
    creature.saves.fortitude.add_competence(util.std_scale(level))
    creature.saves.will.add_competence(util.std_scale(level))
    creature.current_hit_points += level*util.std_scale(level)
abilities['rage'] = Ability('rage', rage_benefit)

####################
#FEATS
####################

def overwhelming_force_benefit(creature):
    if creature.weapon.encumbrance == 'heavy':
        creature.weapon_damage.add_inherent(
                (creature.attributes.strength.get_total()+1)/2)
def overwhelming_force_prerequisites(creature):
        return creature.attributes.strength.get_total() >=5 and creature.attack_bonus.base_attack_bonus >=8 and creature.weapon.encumbrance == 'heavy'
abilities['overwhelming force'] = Ability('overwhelming force', overwhelming_force_benefit,
        overwhelming_force_prerequisites, set(('feat', 'combat', 'power')))

def two_weapon_fighting_benefit(creature):
    if creature.offhand_weapon:
        creature.attack_bonus.add_competence(2)

abilities['two weapon fighting'] = Ability('two-weapon fighting', two_weapon_fighting_benefit,
        lambda creature: creature.attributes.dexterity.get_total() >=3, 
        set(('feat', 'combat', 'finesse')))

def two_weapon_defense_benefit(creature):
    if creature.offhand_weapon:
        creature.armor_class.shield.add_competence(2)
abilities['two weapon defense'] = Ability('two-weapon defense', two_weapon_defense_benefit,
        lambda creature: creature.attributes.dexterity.get_total() >= 3,
        set(('feat', 'combat', 'defensje', 'finesse')))

def combat_expertise_benefit(creature):
    creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
    creature.armor_class.dodge.add_circumstance(util.bab_scale(creature.level))
abilities['combat expertise'] = Ability('combat expertise', combat_expertise_benefit, 
        lambda creature: creature.attributes.intelligence.get_total() >= 3,
        set(('feat', 'combat', 'defense', 'style')))

def power_attack_benefit(creature):
    creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
    damage_bonus = 2+(creature.attack_bonus.base_attack_bonus/5)*2
    if creature.weapon.encumbrance == 'medium' or creature.weapon.encumbrance == 'heavy':
        creature.weapon_damage.add_circumstance(damage_bonus)
    else:
        creature.weapon_damage.add_circumstance(damage_bonus/2)
    if creature.offhand_weapon:
        creature.offhand_weapon_damage.add_circumstance(damage_bonus/2)
abilities['power attack'] = Ability('power attack', power_attack_benefit, lambda creature:
        creature.attributes.strength.get_total() >= 3,
        ['feat', 'combat', 'power', 'style'])

def deadly_aim_benefit(creature):
    creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
    damage_bonus = 2+(creature.attack_bonus.base_attack_bonus/5)*2
    creature.weapon_damage.add_circumstance(damage_bonus)
abilities['deadly aim'] = Ability('deadly aim', deadly_aim_benefit, lambda creature:
        creature.attributes.dexterity.get_total() >= 3,
        set(('feat', 'combat', 'precision', 'style')))

abilities['endurance'] = new_feat('endurance')
abilities['run'] = new_feat('run')
abilities['diehard'] = new_feat('diehard')

####################
#MONSTER TRAITS
####################

abilities['strength'] = Ability('strength', lambda c:
        c.attributes.strength.add_inherent(1))
abilities['dexterity'] = Ability('dexterity', lambda c:
        c.attributes.dexterity.add_inherent(1))
abilities['constitution'] = Ability('constitution', lambda c:
        c.attributes.constitution.add_inherent(1))
abilities['intelligence'] = Ability('intelligence', lambda c:
        c.attributes.intelligence.add_inherent(1))
abilities['wisdom'] = Ability('wisdom', lambda c: 
        c.attributes.wisdom.add_inherent(1))
abilities['charisma'] = Ability('charisma', lambda c:
        c.attributes.charisma.add_inherent(1))

def natural_armor_benefit(creature):
    #Give 2 AC the first time, 1 every additional time
    if creature.has_ability(abilities['natural armor']):
        creature.armor_class.natural_armor.add_inherent(1)
    else:
        creature.armor_class.natural_armor.add_inherent(2)
abilities['natural armor'] = Ability('natural armor', natural_armor_benefit)

abilities['darkvision'] = Ability('darkvision', tags = ['sense'], value = 60,
        text=lambda x: '%s %s ft.' % (x.name, x.value))
abilities['low-light vision'] = Ability('low-light vision', tags = ['sense'])
abilities['scent'] = Ability('scent', tags = ['sense'])

def natural_grab_text(creature):
    return 'Natural grab (%s) %s' % (util.decrease_size(creature.size),
            creature.maneuver_bonus.mstr())
abilities['natural grab'] = Ability('improved grab', text = natural_grab_text,
        tags=['special attack'])

def natural_trip_text(creature):
    return 'Natural trip (%s) %s' % (creature.size,
            creature.maneuver_bonus.mstr())
abilities['natural trip'] = Ability('natural trip', text = natural_trip_text,
        tags=['special attack'])


####################
#MONSTER TEMPLATES
####################

def warrior_benefit(creature):
    util.improve_bab(creature.level_progression)
    util.improve_hv(creature.level_progression)
abilities['warrior'] = Ability('warrior', apply_benefit = warrior_benefit,
        tags=[ABILITY_TEMPLATE])

def brute_benefit(creature):
    util.improve_hv(creature.level_progression)
    util.improve_save(creature.level_progression, FORTITUDE)
abilities['brute'] = Ability('brute', apply_benefit = brute_benefit,
        tags=[ABILITY_TEMPLATE])

def scout_benefit(creature):
    util.improve_save(creature.level_progression, REFLEX)
    creature.speed += min(10, creature.speed)
abilities['scout'] = Ability('scout', apply_benefit = scout_benefit,
        tags=[ABILITY_TEMPLATE])
