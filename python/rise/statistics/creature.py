def calculate_attribute(starting_value, level):
    if (starting_value > 0):
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
            # For brevity, take an array of starting attributes.
            # The order is str, dex, con, int, per, wil
            starting_attributes,
            armor=None,
            name_suffix=None,
            natural_armor=0,
            shield=None,
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

        self.armor = armor
        self.name_suffix = name_suffix
        self.natural_armor = natural_armor
        self.shield = shield

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
        if (self.armor and self.armor.encumbrance_category == 'heavy'):
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
    def reflex_defense(self):
        return sum([
            self.starting_dexterity,
            max(self.level, self.dexterity, self.perception),
            self.character_class.reflex_defense_bonus,
            self.race.reflex_defense_bonus,
        ])

    @property
    def strength(self):
        return calculate_attribute(self.starting_strength, self.level)

    @property
    def willpower(self):
        return calculate_attribute(self.starting_willpower, self.level)
