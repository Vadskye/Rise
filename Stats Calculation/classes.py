import util

GOOD = 'good'
AVERAGE = 'average'
POOR = 'poor'

class GenericClass:
    
    def __init__(self, level):
        self.level = level
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

class Fighter(GenericClass):
    base_attack_bonus_progression = GOOD
    save_progressions = {'fortitude':GOOD, 'reflex':POOR, 'will':AVERAGE}
    hit_value = 6

    def set_armor_class(self):
        self.armor_class['dodge']['competence']=(self.level+5)/6

    def set_attack_bonus(self):
        #weapon focus + weapon disciplines
        ab=1+(self.level+3)/6
        if self.level>=8:
            ab+=1
        self.attack_bonus['competence']=ab

#+2, +3 at 8th, +4 at 14th, +5 at 20th
def std_scale(level):
    return (level+10)/6
