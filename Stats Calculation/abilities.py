import util

class Ability(object):
    #Name of the ability, a function that applies the benefits of the ability
    #to a creature, a function that tests whether the creature qualifies
    #for the ability, and a value associated with the ability, if appropriate
    #(such as the range of darkvision)
    def __init__(self, name, apply_benefit = None, meets_prerequisites = None, 
            tags = None, value = None):
        self.name = name
        self.tags = tags
        if apply_benefit is None:
            self.apply_benefit = lambda x: True
        else:
            self.apply_benefit = apply_benefit
        if meets_prerequisites is None:
            self.meets_prerequisites = lambda x: True
        else:
            self.meets_prerequisites = meets_prerequisites
        self.value = None

    def has_tag(self, tag):
        if self.tags is None:
            return False
        return tag.lower() in self.tags

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
        set(('feat', 'combat', 'power', 'style')))

def deadly_aim_benefit(creature):
    creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
    damage_bonus = 2+(creature.attack_bonus.base_attack_bonus/5)*2
    creature.weapon_damage.add_circumstance(damage_bonus)
abilities['deadly aim'] = Ability('deadly aim', deadly_aim_benefit, lambda creature:
        creature.attributes.dexterity.get_total() >= 3,
        set(('feat', 'combat', 'precision', 'style')))

####################
#MONSTER TRAITS
####################

abilities['attribute strength'] = Ability('attribute: strength', lambda c:
        c.attribute.strength.add_inherent(1))
abilities['attribute dexterity'] = Ability('attribute: dexterity', lambda c:
        c.attribute.dexterity.add_inherent(1))
abilities['attribute constitution'] = Ability('attribute: constitution', lambda c:
        c.attribute.constitution.add_inherent(1))
abilities['attribute intelligence'] = Ability('attribute: intelligence', lambda c:
        c.attribute.intelligence.add_inherent(1))
abilities['attribute wisdom'] = Ability('attribute: wisdom', lambda c: 
        c.attribute.wisdom.add_inherent(1))
abilities['attribute charisma'] = Ability('attribute: charisma', lambda c:
        c.attribute.charisma.add_inherent(1))

def natural_armor_benefit(creature):
    #Give 2 AC the first time, 1 every additional time
    if creature.has_ability(natural_armor):
        creature.armor_class.natural_armor.add_inherent(1)
    else:
        creature.armor_class.natural_armor.add_inherent(2)
abilities['natural armor'] = Ability('natural armor', natural_armor_benefit)

abilities['darkvision'] = Ability('darkvision', tags = set('sense'), value = 60)
abilities['low-light vision'] = Ability('low-light vision', tags = set('sense'))
abilities['scent'] = Ability('scent', tags = set('sense'), value = 30)
