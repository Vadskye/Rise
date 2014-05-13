import util

class Ability(object):
    tags = set()
    def __init__(self, apply_benefit, meets_prerequisites = None, tags = None):
        self.tags = tags
        self.apply_benefit = apply_benefit
        if meets_prerequisites is None:
            self.meets_prerequisites = lambda x: True
        else:
            self.meets_prerequisites = meets_prerequisites

    def has_tag(self, tag):
        if self.tags is None:
            return False
        return tag.lower() in self.tags

def barbarian_dr(level, creature):
    dr_value = level
    creature.damage_reduction = util.DamageReduction(dr_value,
            'physical')

def danger_sense(level, creature):
    creature.initiative.add_competence(level/2)

def larger_than_life(creature):
    creature.weapon_damage.die.increase_size(increase_min=True)

def larger_than_belief(creature):
    creature.weapon_damage.die.increase_size(increase_min=True)
    
def rage(level, creature):
    creature.weapon_damage.add_competence(util.std_scale(level))
    creature.armor_class.misc.add_circumstance(-2)
    creature.saves.fortitude.add_competence(util.std_scale(level))
    creature.saves.will.add_competence(util.std_scale(level))
    creature.current_hit_points += level*util.std_scale(level)

def overwhelming_force_prerequisites(creature):
        return creature.attributes.strength.get_total() >=5 and creature.attack_bonus.base_attack_bonus >=8 and creature.weapon.encumbrance == 'heavy'
def overwhelming_force_benefit(creature):
    if creature.weapon.encumbrance == 'heavy':
        creature.weapon_damage.add_inherent(
                (creature.attributes.strength.get_total()+1)/2)
overwhelming_force = Ability(overwhelming_force_prerequisites,
        overwhelming_force_benefit, set(('feat', 'combat', 'power')))

def two_weapon_fighting_benefit(creature):
    if creature.offhand_weapon:
        creature.attack_bonus.add_competence(2)

two_weapon_fighting = Ability(lambda creature: 
        creature.attributes.dexterity.get_total() >=3, 
        two_weapon_fighting_benefit, set(('feat', 'combat', 'finesse')))

def two_weapon_defense_benefit(creature):
    if creature.offhand_weapon:
        creature.armor_class.shield.add_competence(2)

two_weapon_defense = Ability(lambda creature: 
        creature.attributes.dexterity.get_total() >= 3,
        two_weapon_defense_benefit, 
        set(('feat', 'combat', 'defensje', 'finesse')))

def combat_expertise_benefit(creature):
    creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
    creature.armor_class.dodge.add_circumstance(util.bab_scale(creature.level))
combat_expertise = Ability(lambda creature:
        creature.attributes.intelligence.get_total() >= 3,
        combat_expertise_benefit, set(('feat', 'combat', 'defense', 'style')))

def power_attack_benefit(creature):
    creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
    damage_bonus = 2+(creature.attack_bonus.base_attack_bonus/5)*2
    if creature.weapon.encumbrance == 'medium' or creature.weapon.encumbrance == 'heavy':
        creature.weapon_damage.add_circumstance(damage_bonus)
    else:
        creature.weapon_damage.add_circumstance(damage_bonus/2)
    if creature.offhand_weapon:
        creature.offhand_weapon_damage.add_circumstance(damage_bonus/2)
power_attack = Ability(lambda creature:
        creature.attributes.strength.get_total() >= 3,
        power_attack_benefit, set(('feat', 'combat', 'power', 'style')))

def deadly_aim_benefit(creature):
    creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
    damage_bonus = 2+(creature.attack_bonus.base_attack_bonus/5)*2
    creature.weapon_damage.add_circumstance(damage_bonus)
deadly_aim = Ability(lambda creature:
        creature.attributes.dexterity.get_total() >= 3,
        deadly_aim_benefit, set(('feat', 'combat', 'precision', 'style')))
