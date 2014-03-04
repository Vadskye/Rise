import util

def barbarian_dr(level, creature):
    dr_value = level
    creature.damage_reduction = util.DamageReduction(dr_value,
            'physical')

def danger_sense(level, creature):
    creature.initiative.add_competence(level/2)

def larger_than_life(creature):
    creature.attack_damage.die.increase_size(increase_min=True)

def larger_than_belief(creature):
    creature.attack_damage.die.increase_size(increase_min=True)
    
def rage(level, creature):
    creature.attack_damage.add_competence(util.std_scale(level))
    creature.armor_class.misc.add_circumstance(-2)
    creature.saves.fortitude.add_competence(util.std_scale(level))
    creature.saves.will.add_competence(util.std_scale(level))


