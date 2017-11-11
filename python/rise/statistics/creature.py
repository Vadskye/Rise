from rise.statistics.armor import Armor
from rise.statistics.dice_pool import DicePool
from rise.statistics.size import Size
from rise.statistics.strike import Strike
from rise.statistics.weapon import Weapon

def calculate_attribute(starting_value, level):
    # Doesn't match PC growth, but looks better and shouldn't matter
    if starting_value == 1:
        return level // 2 + 1
    elif starting_value > 0:
        return starting_value + (level - 1)
    else:
        return starting_value

class Creature(object):
    def __init__(
            self,
            character_class,
            level,
            name,
            race,
            # For brevity, take an array of starting attributes as ints.
            # The order is str, dex, con, int, per, wil
            starting_attributes,
            weapons,  # Array of Weapon objects
            armor=None,
            name_suffix=None,
            natural_armor=0,
            shield=None,
            size=None,
    ):
        self.character_class = character_class
        self.level = level
        self.name = name
        self.race = race
        self.starting_strength = starting_attributes[0]
        self.starting_dexterity = starting_attributes[1]
        self.starting_constitution = starting_attributes[2]
        self.starting_intelligence = starting_attributes[3]
        self.starting_perception = starting_attributes[4]
        self.starting_willpower = starting_attributes[5]
        self.weapons = weapons

        self.armor = armor
        self.name_suffix = name_suffix
        self.natural_armor = natural_armor
        self.shield = shield
        self.size = size or Size(Size.MEDIUM)

    @property
    def armor_defense(self):
        return sum([
            self.armor.defense_bonus if self.armor else 0,
            self.shield.defense_bonus if self.shield else 0,
            max(self.level, self.dexterity),
            self.natural_armor,
        ])

    @property
    def constitution(self):
        return calculate_attribute(self.starting_constitution, self.level)

    @property
    def dexterity(self):
        dex = calculate_attribute(self.starting_dexterity, self.level)
        if (self.armor and self.armor.encumbrance_category == Armor.HEAVY):
            dex = dex // 2
        return dex

    @property
    def fortitude_defense(self):
        return sum([
            self.starting_constitution,
            max(self.level, self.strength, self.constitution),
            self.character_class.fortitude_defense_bonus,
            self.race.fortitude_defense_bonus,
        ])

    @property
    def hit_points(self):
        return (self.level + 1) * (5 + self.starting_constitution)

    @property
    def intelligence(self):
        return calculate_attribute(self.starting_intelligence, self.level)

    @property
    def mental_defense(self):
        return sum([
            self.starting_willpower,
            max(self.level, self.intelligence, self.willpower),
            self.character_class.mental_defense_bonus,
            self.race.mental_defense_bonus,
        ])

    @property
    def perception(self):
        return calculate_attribute(self.starting_perception, self.level)

    @property
    def reach(self):
        return self.size.reach

    @property
    def reflex_defense(self):
        return sum([
            self.starting_dexterity,
            max(self.level, self.dexterity, self.perception),
            self.character_class.reflex_defense_bonus,
            self.race.reflex_defense_bonus,
            self.size.reflex_defense_modifier,
        ])

    @property
    def strength(self):
        return calculate_attribute(self.starting_strength, self.level)

    @property
    def strikes(self):
        strikes = {}
        for weapon in self.weapons:
            strikes[weapon.name] = Strike(
                name=weapon.name,
                accuracy=self.calculate_accuracy(weapon),
                damage=self.calculate_damage(weapon),
            )
        return strikes

    @property
    def space(self):
        return self.size.space

    @property
    def speed(self):
        return self.size.speed

    @property
    def willpower(self):
        return calculate_attribute(self.starting_willpower, self.level)

    def calculate_accuracy(self, weapon):
        """Return the accuracy with the given weapon"""
        return max(
            self.level,
            self.perception,
            self.dexterity if weapon.encumbrance_category == Weapon.LIGHT else 0,
            getattr(self, weapon.attribute) if weapon.attribute else 0,
        )

    def calculate_damage(self, weapon):
        """Return the DicePool for damage with the given weapon"""
        standard = DicePool(8)
        standard += sum([
            max(
                self.level,
                self.strength,
                getattr(self, weapon.attribute) if weapon.attribute else 0,
            ) // 2,
            weapon.damage_modifier,
            self.size.damage_modifier,
        ])
        return standard
