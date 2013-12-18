GOOD = 'good'
AVERAGE = 'average'
POOR = 'poor'

class barbarian:
    base_attack_bonus_progression = GOOD
    save_progressions = {'Fortitude':GOOD, 'Reflex':AVERAGE, 'Will':POOR}
    level = 0

    def __init__(self, level):
        self.level = level

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
            return level+2;
        elif save_progression == AVERAGE:
            return level*3/4+1;
        elif save_progression == POOR:
            return level/2;
        else:
            return False
