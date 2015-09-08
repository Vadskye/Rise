import dice, util
from strings import *

class Weapon(object):

    def __init__(self, name, encumbrance, attack_range, damage_types,
            damage_die_name, defense_type='physical', deals_damage = True):
        self.name = name
        self.encumbrance = encumbrance
        self.attack_range = attack_range
        self.defense_type = defense_type
        self.damage_types = damage_types
        self.damage_die = dice.Dice.from_string(damage_die_name)
        self.size = SIZE_MEDIUM
        self.deals_damage = deals_damage

    def set_size(self, size):
        difference_from_current_size = SIZES.index(size) - SIZES.index(self.size)
        for i in xrange(abs(difference_from_current_size)):
            if difference_from_current_size>0:
                self.damage_die.increase_size()
            else:
                self.damage_die.decrease_size()
        self.size = size

    def increase_size(self):
        self.set_size(util.increase_size(self.size))

    def __str__(self):
        return self.name

    @classmethod
    def from_weapon_name(cls, weapon_name):
        if weapon_name is None:
            return None
        return {
                'heavy_melee': cls('heavy melee', ENCUMBRANCE_HEAVY,
                    ATTACK_TYPE_MELEE, [DAMAGE_PHYSICAL], 'd10'),
                'medium_melee': cls('medium melee', ENCUMBRANCE_MEDIUM,
                    ATTACK_TYPE_MELEE, [DAMAGE_PHYSICAL], 'd8'),
                'light_melee': cls('light melee', ENCUMBRANCE_LIGHT,
                    ATTACK_TYPE_MELEE, [DAMAGE_PHYSICAL], 'd6'),
                'projectile': cls('projectile', ENCUMBRANCE_HEAVY,
                    ATTACK_TYPE_PROJECTILE, [DAMAGE_PHYSICAL], 'd8'),
                'claws': cls('claws', ENCUMBRANCE_LIGHT, ATTACK_TYPE_MELEE,
                    [DAMAGE_PHYSICAL, DAMAGE_PIERCING, DAMAGE_SLASHING], 'd6'),
                'bite': cls('bite', ENCUMBRANCE_MEDIUM, ATTACK_TYPE_MELEE,
                    [DAMAGE_PHYSICAL, DAMAGE_PIERCING, DAMAGE_SLASHING], 'd8'),
                'tentacles': cls('tentacles', ENCUMBRANCE_LIGHT,
                    ATTACK_TYPE_MELEE, (DAMAGE_PHYSICAL, DAMAGE_BLUDGEONING),
                    'd8'),
                'slam': cls('slam', ENCUMBRANCE_MEDIUM,
                    ATTACK_TYPE_MELEE, (DAMAGE_PHYSICAL, DAMAGE_BLUDGEONING),
                    'd8'),
                'unarmed': cls('unarmed', ENCUMBRANCE_LIGHT, ATTACK_TYPE_MELEE,
                    [DAMAGE_PHYSICAL], 'd3'),
                'perception drain': cls('perception drain', ENCUMBRANCE_LIGHT,
                    ATTACK_TYPE_MELEE, ['perception'], 'd4', defense_type = 'touch'), 'none': None,
                'swordfish': cls('swordfish', ENCUMBRANCE_MEDIUM,
                    ATTACK_TYPE_MELEE, [DAMAGE_PHYSICAL, DAMAGE_BLUDGEONING, 'fish'], 'd6'),
                }[weapon_name]

class Armor:
    def __init__(self, ac_bonus, encumbrance, armor_type):
        self.ac_bonus = ac_bonus
        self.encumbrance = encumbrance
        self.armor_type = armor_type

    def __str__(self):
        return "Armor: " + self.encumbrance

    @classmethod
    def from_armor_name(cls, armor_name):
        if armor_name is None:
            return None
        return {
                'heavy': cls(8, ENCUMBRANCE_HEAVY, ARMOR_TYPE_BODY),
                'medium': cls(6, ENCUMBRANCE_MEDIUM, ARMOR_TYPE_BODY),
                'light': cls(3, ENCUMBRANCE_LIGHT, ARMOR_TYPE_BODY),
                'none': None,
                }[armor_name]

    @classmethod
    def from_shield_name(cls, shield_name):
        if shield_name is None:
            return None
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
        primary_weapon = raw_stats.get('weapons', {}).get('primary')
        secondary_weapon = raw_stats.get('weapons',{}).get('secondary')
        armor = raw_stats.get('armor')
        shield = raw_stats.get('shield')
        return cls(primary_weapon, secondary_weapon, armor, shield)
