# For brevity, return a three-item array instead of a dict.
# The order is [Fortitude, Reflex, Mental, class_type].
def defense_bonuses_from_class_name(name):
    return {
        # PC classes
        "barbarian": [5, 4, 3, "character"],
        "cleric": [4, 3, 5, "character"],
        "druid": [5, 3, 4, "character"],
        "fighter": [5, 3, 4, "character"],
        "mage": [3, 4, 5, "character"],
        "monk": [3, 5, 4, "character"],
        "paladin": [5, 3, 4, "character"],
        "ranger": [4, 5, 3, "character"],
        "rogue": [3, 5, 4, "character"],
        # Monster classes
        "adept": [0, 0, 0, "monster"],
        "behemoth": [0, 0, 0, "monster"],
        "horde": [0, 0, 0, "monster"],
        "slayer": [0, 0, 0, "monster"],
    }[name]


class CharacterClass(object):
    def __init__(self, name):
        self.name = name
        defense_bonuses = defense_bonuses_from_class_name(self.name)
        self.fortitude_defense_bonus = defense_bonuses[0]
        self.reflex_defense_bonus = defense_bonuses[1]
        self.mental_defense_bonus = defense_bonuses[2]
        self.class_type = defense_bonuses[3]
