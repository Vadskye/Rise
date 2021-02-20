# For brevity, return a three-item array instead of a dict.
# The order is [Defense bonus, encumbrance, encumbrance category].
def properties_from_armor_name(name):
    return {
        "breastplate": [3, 3, Armor.MEDIUM],
        "full plate": [5, 5, Armor.HEAVY],
        "hide": [2, 3, Armor.LIGHT],
        "leather": [1, 0, Armor.LIGHT],
        "studded leather": [2, 1, Armor.LIGHT],
    }[name]


class Armor(object):
    LIGHT = "light"
    MEDIUM = "medium"
    HEAVY = "heavy"

    def __init__(self, name):
        self.name = name
        properties = properties_from_armor_name(name)
        self.defense_bonus = properties[0]
        self.encumbrance_penalty = properties[1]
        self.encumbrance_category = properties[2]
