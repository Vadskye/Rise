# For brevity, return a four-item array instead of a dict.
# The order is [Damage die modifier, encumbrance category, damage_type, defense].
# If the weapon has no encumbrance, "encumbrance category" is None.
# Damage type is either "magical" or "mundane", defaulting to "mundane".
# If Armor defense is used, "defense" is None or "Armor".
def properties_from_weapon_name(name):
    return {
        # Manufactured weapons
        "club": [-1, Weapon.MEDIUM],
        "greataxe": [1, Weapon.HEAVY],
        "greatclub": [1, Weapon.HEAVY],
        "greatstaff": [0, Weapon.HEAVY],
        "greatsword": [1, Weapon.HEAVY],
        "longbow": [0, Weapon.MEDIUM],
        "longsword": [0, Weapon.MEDIUM],
        "mace": [0, Weapon.MEDIUM],
        "shortsword": [-1, Weapon.LIGHT],
        # Is 'medium' the correct category for a sling?
        "sling": [-1, Weapon.MEDIUM],
        "spear": [0, Weapon.MEDIUM],
        # Natural weapons
        "bite": [0, Weapon.MEDIUM],
        "claw": [-1, Weapon.LIGHT],
        "gore": [0, Weapon.HEAVY],
        "hoof": [-1, Weapon.LIGHT],
        "snakes": [-1, Weapon.LIGHT],
        "tail slam": [0, Weapon.HEAVY],
        "talon": [-1, Weapon.LIGHT],
        "tentacle": [0, Weapon.MEDIUM],
        "slam": [0, Weapon.HEAVY],
        "sting": [1, Weapon.HEAVY],
        # Special "weapons"
        "boulder": [0, Weapon.HEAVY],
        "draining touch": [0, Weapon.LIGHT, "magical", "Reflex"],
    }[name]


class Weapon(object):
    LIGHT = "light"
    MEDIUM = "medium"
    HEAVY = "heavy"

    def __init__(self, name):
        self.name = name
        properties = properties_from_weapon_name(name)
        self.damage_modifier = properties[0]
        self.encumbrance_category = properties[1]
        self.damage_type = properties[2] if len(properties) >= 3 else "mundane"
        self.defense = properties[3] if len(properties) >= 4 else None
