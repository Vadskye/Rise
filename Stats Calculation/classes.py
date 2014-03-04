import util
from util import GOOD, AVERAGE, POOR
import abilities

class CharacterClass:
    
    def __init__(self, level):
        self.level = level

    def apply_progressions(self, base_creature):
        base_creature.attack_bonus.set_progression(self.bab_progression)
        base_creature.saves.set_progressions_dict(self.save_progressions)
        base_creature.hit_value = self.hit_value

    #Inherited classes overwrite
    def apply_modifications(self, base_creature):
        pass

class Average(CharacterClass):
        bab_progression = AVERAGE
        save_progressions = {'fortitude': AVERAGE, 'reflex': AVERAGE, 'will': AVERAGE}
        hit_value = 5
    
class Barbarian(CharacterClass):

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

        abilities.danger_sense(self.level, base_creature)

class Bard(CharacterClass):
    bab_progression = AVERAGE
    save_progressions = {'fortitude':AVERAGE, 'reflex':AVERAGE, 'will':AVERAGE}
    hit_value = 6

class Cleric(CharacterClass):
    bab_progression = AVERAGE
    save_progressions = {'fortitude':AVERAGE, 'reflex':POOR, 'will':GOOD}
    hit_value = 5

    def apply_modifications(self, base_creature):
        base_creature.attack_mode='damage spell'

class Druid(CharacterClass):
    bab_progression = AVERAGE
    save_progressions = {'fortitude':GOOD, 'reflex':POOR, 'will':AVERAGE}
    hit_value = 5

class Fighter(CharacterClass):
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

class Monk(CharacterClass):
    bab_progression = AVERAGE
    save_progressions = {'fortitude':AVERAGE, 'reflex':GOOD, 'will':GOOD}
    hit_value = 5

class Paladin(CharacterClass):
    bab_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':POOR, 'will':GOOD}
    hit_value = 6

class Ranger(CharacterClass):
    bab_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':AVERAGE, 'will':AVERAGE}
    hit_value = 6

class Rogue(CharacterClass):
    bab_progression = AVERAGE
    save_progressions = {'fortitude':POOR, 'reflex':GOOD, 'will':POOR}
    hit_value = 5

class Sorcerer(CharacterClass):
    bab_progression = POOR
    save_progressions = {'fortitude':POOR, 'reflex':POOR, 'will':GOOD}
    hit_value = 4

class Wizard(CharacterClass):
    bab_progression = POOR
    save_progressions = {'fortitude':POOR, 'reflex':POOR, 'will':GOOD}
    hit_value = 4

    def apply_modifications(self, base_creature):
        base_creature.attack_mode='damage spell'

class Warrior(CharacterClass):
    bab_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':POOR, 'will':POOR}
    hit_value = 6
