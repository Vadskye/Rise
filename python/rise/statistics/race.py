# For convenience, return a three-item array instead of a dict.
# The order is [Fortitude, Reflex, Mental].
def defense_bonuses_from_race_name(name):
    return {
        # PC races
        'human': [0, 0, 0],
        'dwarf': [0, 0, 0],
        'elf': [0, 0, 0],
        'gnome': [0, 0, 0],
        'half-elf': [0, 0, 0],
        'half-orc': [0, 0, 0],
        'halfling': [0, 0, 0],

        # Monster races
        'aberration': [3, 4, 5],
        'animal': [5, 4, 3],
        'animate': [5, 4, 3],
        'construct': [4, 3, 5],
        'humanoid': [4, 4, 4],
        'magical beast': [5, 4, 3],
        'monstrous humanoid': [4, 4, 4],
        'outsider': [3, 4, 5],
        'undead': [3, 4, 5],
    }[name]

class Race(object):
    def __init__(self, name):
        self.name = name
        defense_bonuses = defense_bonuses_from_race_name(self.name)
        self.fortitude_defense_bonus = defense_bonuses[0]
        self.reflex_defense_bonus = defense_bonuses[1]
        self.mental_defense_bonus = defense_bonuses[2]
