GOOD = 'good'
AVERAGE = 'average'
POOR = 'poor'

class barbarian:
    base_attack_bonus_prog = GOOD
    fortitude_prog = GOOD
    reflex_prog = AVERAGE
    will_prog = POOR

    def __init__(self, level):
        pass


def calc_bab(level, progression):
    if progression == GOOD:
        return level;
    elif progression == AVERAGE:
        return level*3/4;
    elif progression == POOR:
        return level/2;
    else:
        return False

def calc_save(level, progression):
    if progression == GOOD:
        return level+2;
    elif progression == AVERAGE:
        return level*3/4+1;
    elif progression == POOR:
        return level/2;
    else:
        return False
