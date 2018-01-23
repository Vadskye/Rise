# For brevity, return a three-item array instead of a dict.
# The order is [Fortitude, Reflex, Mental].
def defense_bonuses_from_class_name(name):
    return {
        # PC classes
        'barbarian': [3, 2, 1],
        'cleric': [2, 1, 3],
        'druid': [3, 1, 2],
        'fighter': [3, 1, 2],
        'mage': [1, 2, 3],
        'monk': [1, 3, 2],
        'paladin': [3, 1, 2],
        'ranger': [2, 3, 1],
        'rogue': [1, 3, 2],

        # Monster classes
        'adept': [2, 2, 2],
        'behemoth': [2, 2, 2],
        'horde': [0, 0, 0],
        'slayer': [2, 2, 2],
    }[name]

class CharacterClass(object):
    def __init__(self, name):
        self.name = name
        defense_bonuses = defense_bonuses_from_class_name(self.name)
        self.fortitude_defense_bonus = defense_bonuses[0]
        self.reflex_defense_bonus = defense_bonuses[1]
        self.mental_defense_bonus = defense_bonuses[2]
