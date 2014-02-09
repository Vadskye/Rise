import util

GOOD = 'good'
AVERAGE = 'average'
POOR = 'poor'

class GenericClass:
    
    def __init__(self, character):
        self.level = character.level
        self.attack_bonus=dict()
        self.attack_damage=dict()
        self.armor_class=dict()
        for title in util.ac_modifier_titles:
            self.armor_class[title]=dict()
        self.saves=dict()
        for title in util.save_titles:
            self.saves[title]=dict()

        self.set_attack_bonus()
        self.set_attack_damage()
        self.set_armor_class()
        self.set_saves()

        self._adjust_stats(character)

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

    def _adjust_stats(self, character):
        character.attack_bonus.add_all(self.attack_bonus)
        character.attack_damage.add_all(self.attack_damage)
        character.armor_class.add_all(self.armor_class)
        for key in self.saves.keys():
            character.saves[key].add_all(self.saves[key])

class Barbarian(GenericClass):

    base_attack_bonus_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':AVERAGE, 'will':POOR}
    hit_value = 7

    def set_attack_damage(self):
        self.attack_damage['competence']=std_scale(self.level)

    def set_armor_class(self):
        self.armor_class['misc']['inherent']=-2

    def set_saves(self):
        self.saves['fortitude']['competence']=std_scale(self.level)
        self.saves['will']['competence']=std_scale(self.level)

#+2, +3 at 8th, +4 at 14th, +5 at 20th
def std_scale(level):
    return (level+10)/6
