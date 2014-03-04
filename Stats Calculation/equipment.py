import dice

class Weapon:

    def __init__(self, encumbrance, weapon_type, damage_die_name, min_damage):
        self.encumbrance = encumbrance
        self.weapon_type = weapon_type
        self.damage_die = dice.Dice.from_string(damage_die_name)

    @classmethod
    def from_weapon_name(cls, weapon_name):
        return {
                'heavy_melee': cls('heavy', 'melee', 'd10m2', 2),
                'medium_melee': cls('medium', 'melee', 'd8m1', 1),
                'light_melee': cls('light', 'melee', 'd6', 0),
                'projectile': cls('heavy', 'projectile', 'd8m1', 1),
                'claws': cls('medium', 'melee', 'd8m1', 0),
                'none': None
                }[weapon_name]

class Armor:
    def __init__(self, ac_bonus, encumbrance, armor_type):
        self.ac_bonus = ac_bonus
        self.encumbrance = encumbrance
        self.armor_type = armor_type

class EquipmentSet:
    def __init__(self, weapon_name, armor_name, shield_name):
        self.weapon = Weapon.from_weapon_name(weapon_name)
        self.armor = {
                'heavy': Armor(8, 'heavy', 'body'),
                'medium': Armor(6, 'medium', 'body'),
                'light': Armor(3, 'light', 'body'),
                'none': None,
                }[armor_name]
        self.shield = {
                'tower': Armor(4, 'medium', 'shield'),
                'heavy': Armor(2, 'none', 'shield'),
                'light': Armor(1, 'none', 'shield'),
                'none': None
                }[shield_name]

    @classmethod
    def from_raw_stats(cls, raw_stats):
        keys = raw_stats.keys()
        if 'weapon' in keys:
            weapon = raw_stats['weapon']
        else:
            weapon = 'none'
        if 'armor' in keys:
            armor = raw_stats['armor']
        else:
            armor = 'none'
        if 'shield' in keys:
            shield = raw_stats['shield']
        else:
            shield = 'none'
        return cls(weapon, armor, shield)



        

