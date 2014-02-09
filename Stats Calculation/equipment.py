
class Weapon:

    def __init__(self, encumbrance, weapon_type, damage_die, min_damage):
        self.encumbrance = encumbrance
        self.weapon_type = weapon_type
        self.damage_die = damage_die
        self.min_damage = min_damage

class Armor:
    def __init__(self, ac_bonus, encumbrance, armor_type):
        self.ac_bonus = ac_bonus
        self.encumbrance = encumbrance
        self.armor_type = armor_type

class EquipmentSet:
    def __init__(self, armor_name, shield_name, weapon_name):
        self.armor = {
                'heavy': Armor(8, 'heavy', 'body')
                'medium': Armor(6, 'medium', 'body')
                'light': Armor(3, 'light', 'body')
                'none': None
                }[self.armor_name]
        self.shield = {
                'tower': Armor(4, 'medium', 'shield')
                'heavy': Armor(2, 'none', 'shield')
                'light': Armor(1, 'none', 'shield')
                'none': None
                }[self.shield_name]
        self.weapon = {
                'heavy_melee': Weapon('heavy', 'melee', 'd10', 2)
                'medium_melee': Weapon('medium', 'melee', 'd8', 1)
                'light_melee': Weapon('light', 'melee', 'd6', 0)
                'projectile': Weapon('heavy', 'projectile', 'd8', 1)
                }[self.weapon_name]
