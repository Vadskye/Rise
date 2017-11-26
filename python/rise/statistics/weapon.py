# For brevity, return a three-item array instead of a dict.
# The order is [Damage die modifier, encumbrance category, attribute].
# If the weapon has no encumbrance, "encumbrance category" is None.
# If no special attribute is used, "attribute" is None.
def properties_from_weapon_name(name):
    return {
        # Manufactured weapons
        'club': [-1, Weapon.MEDIUM, None],
        'draining touch': [-1, Weapon.LIGHT, None],
        'greataxe': [1, Weapon.HEAVY, None],
        'greatclub': [1, Weapon.HEAVY, None],
        'greatstaff': [0, Weapon.HEAVY, None],
        'greatsword': [1, Weapon.HEAVY, None],
        'longbow': [0, Weapon.MEDIUM, None],
        'longsword': [0, Weapon.MEDIUM, None],
        'mace': [0, Weapon.MEDIUM, None],
        'shortsword': [-1, Weapon.LIGHT, None],
        # Is 'medium' the correct category for a sling?
        'sling': [-1, Weapon.MEDIUM, None],
        'spear': [0, Weapon.MEDIUM, None],

        # Natural weapons
        'bite': [0, Weapon.MEDIUM, None],
        'claw': [-1, Weapon.LIGHT, None],
        'hoof': [-1, Weapon.LIGHT, None],
        'snakes': [-1, Weapon.LIGHT, None],
        'tail slam': [0, Weapon.HEAVY, None],
        'talon': [-1, Weapon.LIGHT, None],
        'tentacle': [0, Weapon.MEDIUM, None],
        'slam': [0, Weapon.HEAVY, None],

        # Special "weapons"
        'boulder': [0, Weapon.HEAVY, None],
    }[name]

class Weapon(object):
    LIGHT = 'light'
    MEDIUM = 'medium'
    HEAVY = 'heavy'

    def __init__(self, name):
        self.name = name
        properties = properties_from_weapon_name(name)
        self.damage_modifier = properties[0]
        self.encumbrance_category = properties[1]
        self.attribute = properties[2]
