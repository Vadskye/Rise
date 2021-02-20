# For brevity, return a three-item array instead of a dict.
# The order is [Defense bonus, encumbrance, accuracy modifier].
def properties_from_armor_name(name):
    return {
        "light": [1, 0, 0],
        "heavy": [2, 0, 0],
        "tower": [3, 2, -2],
    }[name]


class Shield(object):
    def __init__(self, name):
        self.name = name
        properties = properties_from_armor_name(name)
        self.defense_bonus = properties[0]
        self.encumbrance_penalty = properties[1]
        self.accuracy_modifier = properties[2]
