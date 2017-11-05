# For brevity, return a three-item array instead of a dict.
# The order is [Defense bonus, encumbrance penalty, encumbrance category].
def properties_from_armor_name(name):
    return {
        'breastplate': [4, 4, 'medium'],
        'full plate': [6, 6, 'heavy'],
        'studded leather': [2, 1, 'light'],
    }[name]

class Armor(object):
    def __init__(self, name):
        self.name = name
        properties = properties_from_armor_name(name)
        self.defense_bonus = properties[0]
        self.encumbrance_penalty = properties[1]
        self.encumbrance_category = properties[2]
