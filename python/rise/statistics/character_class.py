# For brevity, return a three-item array instead of a dict.
# The order is [Fortitude, Reflex, Mental].
def defense_bonuses_from_class_name(name):
    return {
        # PC classes
        'barbarian': [5, 4, 3],
        'cleric': [4, 3, 5],
        'druid': [5, 3, 4],
        'fighter': [5, 3, 4],
        'mage': [3, 4, 5],
        'monk': [3, 5, 4],
        'paladin': [5, 3, 4],
        'ranger': [4, 5, 3],
        'rogue': [3, 5, 4],

        # Monster classes
        'adept': [0, 0, 0],
        'behemoth': [0, 0, 0],
        'horde': [0, 0, 0],
        'slayer': [0, 0, 0],
    }[name]

class CharacterClass(object):
    def __init__(self, name):
        self.name = name
        defense_bonuses = defense_bonuses_from_class_name(self.name)
        self.fortitude_defense_bonus = defense_bonuses[0]
        self.reflex_defense_bonus = defense_bonuses[1]
        self.mental_defense_bonus = defense_bonuses[2]
