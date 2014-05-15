import dice
from strings import *

class Weapon:

    def __init__(self, encumbrance, attack_type, damage_types, damage_die_name):
        self.encumbrance = encumbrance
        self.attack_type = attack_type
        self.damage_types = damage_types
        self.damage_die = dice.Dice.from_string(damage_die_name)

    @classmethod
    def from_weapon_name(cls, weapon_name):
        return {
                'heavy_melee': cls(ENCUMBRANCE_HEAVY, ATTACK_TYPE_MELEE,
                    [DAMAGE_PHYSICAL], 'd10m2'),
                'medium_melee': cls(ENCUMBRANCE_MEDIUM, ATTACK_TYPE_MELEE,
                    [DAMAGE_PHYSICAL], 'd8m1'),
                'light_melee': cls(ENCUMBRANCE_LIGHT, ATTACK_TYPE_MELEE,
                    [DAMAGE_PHYSICAL], 'd6'),
                'projectile': cls(ENCUMBRANCE_HEAVY, ATTACK_TYPE_PROJECTILE,
                    [DAMAGE_PHYSICAL], 'd8m1'),
                'claws': cls(ENCUMBRANCE_MEDIUM, ATTACK_TYPE_MELEE,
                    [DAMAGE_PHYSICAL], 'd8m1'),
                'unarmed': cls(ENCUMBRANCE_LIGHT, ATTACK_TYPE_MELEE,
                    [DAMAGE_PHYSICAL], 'd3'),
                'none': None
                }[weapon_name]

class Armor:
    def __init__(self, ac_bonus, encumbrance, armor_type):
        self.ac_bonus = ac_bonus
        self.encumbrance = encumbrance
        self.armor_type = armor_type

    @classmethod
    def from_armor_name(cls, armor_name):
        return {
                'heavy': cls(8, ENCUMBRANCE_HEAVY, ARMOR_TYPE_BODY),
                'medium': cls(6, ENCUMBRANCE_MEDIUM, ARMOR_TYPE_BODY),
                'light': cls(3, ENCUMBRANCE_LIGHT, ARMOR_TYPE_BODY),
                'none': None,
                }[armor_name]

    @classmethod
    def from_shield_name(cls, shield_name):
        return {
                'tower': Armor(4, ENCUMBRANCE_MEDIUM, ARMOR_TYPE_SHIELD),
                'heavy': Armor(2, ENCUMBRANCE_NONE, ARMOR_TYPE_SHIELD),
                'light': Armor(1, ENCUMBRANCE_NONE, ARMOR_TYPE_SHIELD),
                'none': None
                }[shield_name]

class EquipmentSet:
    def __init__(self, weapon_name, offhand_weapon_name, armor_name, shield_name):
        self.weapon = Weapon.from_weapon_name(weapon_name)
        self.offhand_weapon = Weapon.from_weapon_name(offhand_weapon_name)
        self.armor = Armor.from_armor_name(armor_name)
        self.shield = Armor.from_shield_name(shield_name)

    @classmethod
    def from_raw_stats(cls, raw_stats):
        keys = raw_stats.keys()
        if 'weapon' in keys:
            weapon = raw_stats['weapon']
        else:
            weapon = 'none'
        if 'offhand weapon' in keys:
            offhand_weapon = raw_stats['offhand weapon']
        else:
            offhand_weapon = 'none'
        if 'armor' in keys:
            armor = raw_stats['armor']
        else:
            armor = 'none'
        if 'shield' in keys:
            shield = raw_stats['shield']
        else:
            shield = 'none'
        return cls(weapon, offhand_weapon, armor, shield)
