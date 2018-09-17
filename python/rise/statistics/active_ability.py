# For brevity, return a three-item array instead of a dict.
# The order is [Damage die modifier, damage type, defense, action point?, weapon].
# Damage type is either "magical", "mundane", or "strike".
# If Armor defense is used, "defense" is None or "Armor".
# If an action point is required, "action point" is True
# If the attack uses a particular weapon, "weapon" is a Weapon.
def properties_from_ability_name(name):
    return {
        'firebolt': [2, 'magical', 'Armor', True],
        'inflict wounds': [2, 'magical', 'Fortitude', True],
        'power attack': [2, 'strike', 'Armor'],
        'pyromancy': [0, 'magical', 'Armor'],
        'vivimancy': [0, 'magical', 'Fortitude'],
    }[name]

class ActiveAbility(object):
    LIGHT = 'light'
    MEDIUM = 'medium'
    HEAVY = 'heavy'

    def __init__(self, name):
        self.name = name
        properties = properties_from_ability_name(name)
        self.damage_modifier = properties[0]
        self.damage_type = properties[1]
        self.defense = properties[2] if len(properties) >= 3 else None
        self.action_point = properties[3] if len(properties) >= 4 else None
        self.weapon = properties[4] if len(properties) >= 5 else None
