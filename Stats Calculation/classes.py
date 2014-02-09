GOOD = 'good'
AVERAGE = 'average'
POOR = 'poor'

class GenericClass:
    
    def __init__(self, character):
        self.level = character.level
        self.attack_bonus=dict()
        self.attack_damage=dict()
        self.armor_class=dict()
        self.saves=dict()

        self.set_attack_bonus()
        self.set_attack_damage()
        self.set_armor_class()
        self.set_saves()

        self._adjust_offense(character)

    def calculate_base_attack_bonus(self):
        if self.base_attack_bonus_progression == GOOD:
            return self.level;
        elif self.base_attack_bonus_progression == AVERAGE:
            return self.level*3/4;
        elif self.base_attack_bonus_progression == POOR:
            return self.level/2;
        else:
            return False

    def calc_save(self, save_type):
        save_progression = self.save_progressions[save_type]
        if save_progression == GOOD:
            return self.level+2;
        elif save_progression == AVERAGE:
            return self.level*3/4+1;
        elif save_progression == POOR:
            return self.level/2;
        else:
            return False 

    #override with specific classes
    def set_attack_bonus(self):
        pass
    def set_attack_damage(self):
        pass
    def set_armor_class(self):
        pass
    def set_saves(self):
        pass

    def _adjust_offense(self, character):
        character.attack_bonus.add_all(self.attack_bonus)
        character.attack_damage.add_all(self.attack_damage)

class Barbarian(GenericClass):

    base_attack_bonus_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':AVERAGE, 'will':POOR}
    hit_value = 7

    def set_attack_damage(self):
        self.attack_damage['competence']=2
