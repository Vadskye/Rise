# For convenience, return a three-item array instead of a dict.
# The order is [Fortitude, Reflex, Mental].
def defense_bonuses_from_race_name(name):
    return {
        # PC species
        "human": [0, 0, 0],
        "dwarf": [0, 0, 0],
        "elf": [0, 0, 0],
        "gnome": [0, 0, 0],
        "half-elf": [0, 0, 0],
        "half-orc": [0, 0, 0],
        "halfling": [0, 0, 0],
        # Monster species
        "aberration": [2, 4, 6],
        "animal": [6, 4, 2],
        "animate": [6, 4, 2],
        "construct": [4, 2, 6],
        "humanoid": [4, 4, 4],
        "magical beast": [4, 4, 4],
        "monstrous humanoid": [4, 4, 4],
        "outsider": [2, 4, 6],
        "undead": [2, 4, 6],
    }[name]


class Species(object):
    def __init__(self, name):
        self.name = name
        defense_bonuses = defense_bonuses_from_race_name(self.name)
        self.fortitude_defense_bonus = defense_bonuses[0]
        self.reflex_defense_bonus = defense_bonuses[1]
        self.mental_defense_bonus = defense_bonuses[2]
