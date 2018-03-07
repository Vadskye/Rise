# For brevity, return a three-item array instead of a dict.
# The order is [Damage die modifier, encumbrance category, attribute, defense].
# If the weapon has no encumbrance, "encumbrance category" is None.
# If no special attribute is used, "attribute" is None.
# If Armor defense is used, "defense" is None.
def properties_from_weapon_name(name):
    return {
        # Manufactured weapons
        'club': [-1, Weapon.MEDIUM],
        'draining touch': [0, Weapon.LIGHT, 'willpower', 'reflex'],
        'greataxe': [1, Weapon.HEAVY],
        'greatclub': [1, Weapon.HEAVY],
        'greatstaff': [0, Weapon.HEAVY],
        'greatsword': [1, Weapon.HEAVY],
        'longbow': [0, Weapon.MEDIUM],
        'longsword': [0, Weapon.MEDIUM],
        'mace': [0, Weapon.MEDIUM],
        'shortsword': [-1, Weapon.LIGHT],
        # Is 'medium' the correct category for a sling?
        'sling': [-1, Weapon.MEDIUM],
        'spear': [0, Weapon.MEDIUM],

        # Natural weapons
        'bite': [0, Weapon.MEDIUM],
        'claw': [-1, Weapon.LIGHT],
        'gore': [0, Weapon.HEAVY],
        'hoof': [-1, Weapon.LIGHT],
        'snakes': [-1, Weapon.LIGHT],
        'tail slam': [0, Weapon.HEAVY],
        'talon': [-1, Weapon.LIGHT],
        'tentacle': [0, Weapon.MEDIUM],
        'slam': [0, Weapon.HEAVY],

        # Special "weapons"
        'boulder': [0, Weapon.HEAVY],
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
        self.attribute = properties[2] if len(properties) >= 3 else None
        self.defense = properties[3] if len(properties) >= 4 else None
