# For convenience, return a three-item array instead of a dict.
# The order is [Fortitude, Reflex, Mental].
def defense_bonuses_from_race_name(name):
    return {
        # PC races
        'human': [2, 2, 2],
        'dwarf': [3, 1, 2],
        'elf': [1, 3, 2],
        'gnome': [3, 2, 1],
        'half-elf': [2, 2, 2],
        'half-orc': [3, 2, 1],
        'halfling': [2, 3, 1],

        # Monster races
        'aberration': [1, 2, 3],
        'animal': [3, 2, 1],
        'animate': [3, 2, 1],
        'construct': [2, 1, 3],
        'humanoid': [2, 2, 2],
        'magical beast': [3, 2, 1],
        'monstrous humanoid': [2, 2, 2],
        'outsider': [1, 2, 3],
        'undead': [1, 2, 3],
    }[name]

class Race(object):
    def __init__(self, name):
        self.name = name
        defense_bonuses = defense_bonuses_from_race_name(self.name)
        self.fortitude_defense_bonus = defense_bonuses[0]
        self.reflex_defense_bonus = defense_bonuses[1]
        self.mental_defense_bonus = defense_bonuses[2]
