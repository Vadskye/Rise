import util
from util import GOOD, AVERAGE, POOR
import abilities
import equipment

class CreatureProgression:
    
    def __init__(self, level):
        self.level = level

    def apply_progressions(self, base_creature):
        base_creature.attack_bonus.set_progression(self.bab_progression)
        base_creature.saves.set_progressions_dict(self.save_progressions)
        base_creature.hit_value = self.hit_value

    #Inherited classes overwrite
    def apply_modifications(self, base_creature):
        pass

class Average(CreatureProgression):
        bab_progression = AVERAGE
        save_progressions = {'fortitude': AVERAGE, 'reflex': AVERAGE, 'will': AVERAGE}
        hit_value = 5
    
class Barbarian(CreatureProgression):

    bab_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':AVERAGE, 'will':POOR}
    hit_value = 7

    def apply_modifications(self, base_creature):
        abilities.danger_sense(self.level, base_creature)
        abilities.rage(self.level, base_creature)
        abilities.barbarian_dr(self.level, base_creature)

        #Larger than Life/Belief
        if self.level>=7:
            abilities.larger_than_life(base_creature)
            if self.level>=17:
                abilities.larger_than_belief(base_creature)

class Bard(CreatureProgression):
    bab_progression = AVERAGE
    save_progressions = {'fortitude':AVERAGE, 'reflex':AVERAGE, 'will':AVERAGE}
    hit_value = 6

class Cleric(CreatureProgression):
    bab_progression = AVERAGE
    save_progressions = {'fortitude':AVERAGE, 'reflex':POOR, 'will':GOOD}
    hit_value = 5

    def apply_modifications(self, base_creature):
        base_creature.attack_mode='damage spell'

class Druid(CreatureProgression):
    bab_progression = AVERAGE
    save_progressions = {'fortitude':GOOD, 'reflex':POOR, 'will':AVERAGE}
    hit_value = 5

class Fighter(CreatureProgression):
    bab_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':POOR, 'will':AVERAGE}
    hit_value = 6

    def apply_modifications(self, base_creature):
        #armor discipline
        armor_discipline_count = (self.level+5)/6
        base_creature.armor_class.dodge.add_competence(armor_discipline_count)
        for i in xrange(1,armor_discipline_count):
            base_creature.armor.encumbrance = self._lower_armor_encumbrance(
                    base_creature.armor.encumbrance)

        #weapon discipline
        if self.level>=3:
            ab=1
            if self.level>=9:
                ab+=1
            base_creature.attack_bonus.add_competence(ab)
            if self.level>=15:
                pass
                #add critical changes

    def _lower_armor_encumbrance(self, encumbrance):
        return {
                'heavy': 'medium',
                'medium': 'light',
                'light': 'none',
                'none': 'none'}[encumbrance]

class Monk(CreatureProgression):
    bab_progression = GOOD
    save_progressions = {'fortitude':AVERAGE, 'reflex':GOOD, 'will':GOOD}
    hit_value = 6

    def apply_modifications(self, base_creature):
        #wisdom is used often, so make it quick to access
        wisdom = base_creature.attributes.wisdom.get_total()

        #enlightened defense
        if base_creature.armor is None:
            base_creature.armor_class.misc.add_inherent(wisdom)
        else:
            print 'Monk is wearing armor?', base_creature.armor

        #unarmed strike
        if base_creature.weapon is None:
            unarmed_weapon = equipment.Weapon.from_weapon_name('unarmed')
            #make the weapon deal monk damage
            for i in xrange(2):
                unarmed_weapon.damage_die.increase_size(increase_min=True)
            base_creature.weapon = unarmed_weapon
            base_creature.weapon_damage.add_die(base_creature.weapon.damage_die)

        #wholeness of body
        if self.level>=4:
            base_creature.current_hit_points+= self.level*wisdom

        #improved ki strike
        if self.level>=10:
            base_creature.weapon_damage.add_inherent(wisdom/2)
        

class Paladin(CreatureProgression):
    bab_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':POOR, 'will':GOOD}
    hit_value = 6

class Ranger(CreatureProgression):
    bab_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':AVERAGE, 'will':AVERAGE}
    hit_value = 6

class Rogue(CreatureProgression):
    bab_progression = AVERAGE
    save_progressions = {'fortitude':POOR, 'reflex':GOOD, 'will':POOR}
    hit_value = 5

    def apply_modifications(self, base_creature):
        abilities.danger_sense(self.level, base_creature)

class Sorcerer(CreatureProgression):
    bab_progression = POOR
    save_progressions = {'fortitude':POOR, 'reflex':POOR, 'will':GOOD}
    hit_value = 4

class Wizard(CreatureProgression):
    bab_progression = POOR
    save_progressions = {'fortitude':POOR, 'reflex':POOR, 'will':GOOD}
    hit_value = 4

    def apply_modifications(self, base_creature):
        base_creature.attack_mode='damage spell'

class Warrior(CreatureProgression):
    bab_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':POOR, 'will':POOR}
    hit_value = 6
