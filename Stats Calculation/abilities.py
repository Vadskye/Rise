import util

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

class Feat(object):

    def has_tag(self, tag):
        return tag in self.tags

    def meets_prerequisites(self, creature):
        return True

    def apply_benefit(self, creature):
        pass

class OverwhelmingForce(Feat):
    tags = ['Combat', 'Power']
    def meets_prerequisites(self, creature):
        return creature.attributes.strength.get_total() >=5 and creature.attack_bonus.base_attack_bonus >=8 and creature.weapon.encumbrance == 'heavy'

    def apply_benefit(self, creature):
        if creature.weapon.encumbrance == 'heavy':
            creature.weapon_damage.add_inherent(
                    (creature.attributes.strength.get_total()+1)/2)

class TwoWeaponFighting(Feat):
    tags = ['Combat', 'Finesse']
    def meets_prerequisites(self, creature):
        return creature.attributes.dexterity.get_total() >= 3

    def apply_benefit(self, creature):
        if creature.offhand_weapon:
            creature.attack_bonus.add_competence(2)

class TwoWeaponDefense(Feat):
    tags = ['Combat', 'Defense', 'Finesse']
    def meets_prerequisites(self, creature):
        #can't currently implement feat prerequisites
        return creature.attributes.dexterity.get_total() >= 3

    def apply_benefit(self, creature):
        if creature.offhand_weapon:
            creature.armor_class.shield.add_competence(2)

class CombatExpertise(Feat):
    tags = ['Combat', 'Defense', 'Style']
    def meets_prerequisites(self, creature):
        return creature.attributes.intelligence.get_total() >= 3
    def apply_benefit(self, creature):
        creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
        creature.armor_class.dodge.add_circumstance(util.bab_scale(creature.level))

class PowerAttack (Feat):
    tags = ['Combat', 'Power', 'Style']
    def meets_prerequisites(self, creature):
        return creature.attributes.strength.get_total() >= 3
    def apply_benefit(self, creature):
        creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
        damage_bonus = 2+(creature.attack_bonus.base_attack_bonus/5)*2
        if creature.weapon.encumbrance == 'medium' or creature.weapon.encumbrance == 'heavy':
            creature.weapon_damage.add_circumstance(damage_bonus)
        else:
            creature.weapon_damage.add_circumstance(damage_bonus/2)
        if creature.offhand_weapon:
            creature.offhand_weapon_damage.add_circumstance(damage_bonus/2)

#Doesn't check to make sure creature uses ranged weapon
class DeadlyAim (Feat):
    tags = ['Combat', 'Precision', 'Style']
    def meets_prerequisites(self, creature):
        return creature.attributes.dexterity.get_total() >= 3
    def apply_benefit(self, creature):
        creature.attack_bonus.add_circumstance(-util.bab_scale(creature.level))
        damage_bonus = 2+(creature.attack_bonus.base_attack_bonus/5)*2
        creature.weapon_damage.add_circumstance(damage_bonus)
