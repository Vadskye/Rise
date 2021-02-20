from rise.statistics.armor import Armor
from rise.statistics.attack import Attack
from rise.statistics.dice_pool import DicePool, standard_damage
from rise.statistics.size import Size
from rise.statistics.weapon import Weapon
import rise.statistics.rise_data as rise_data


def calculate_attribute(starting_value, level):
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
        species,
        # For brevity, take an array of starting attributes as ints.
        # The order is str, dex, con, int, per, wil
        starting_attributes,
        weapons,  # Array of Weapon objects
        armor=None,
        challenge_rating=1,
        name_suffix=None,
        natural_armor=0,
        shield=None,
        size=None,
        accuracy_modifier=0,
        active_abilities=None,
        attuned_ability_count=0,
        weapon_damage_modifier=0,
    ):
        self.character_class = character_class
        self.level = level
        self.name = name
        self.species = species
        self.starting_strength = starting_attributes[0]
        self.starting_dexterity = starting_attributes[1]
        self.starting_constitution = starting_attributes[2]
        self.starting_intelligence = starting_attributes[3]
        self.starting_perception = starting_attributes[4]
        self.starting_willpower = starting_attributes[5]
        self.weapons = weapons

        self.armor = armor
        self.challenge_rating = challenge_rating
        self.name_suffix = name_suffix
        self.natural_armor = natural_armor
        self.shield = shield
        self.size = size or Size(Size.MEDIUM)
        self.accuracy_modifier = accuracy_modifier
        self.active_abilities = active_abilities or []
        self.attuned_ability_count = attuned_ability_count
        self.weapon_damage_modifier = weapon_damage_modifier

        self.fortitude_defense_misc = 0
        self.reflex_defense_misc = 0
        self.mental_defense_misc = 0

        self.reset_combat()

    def reset_combat(self):
        self.is_conscious = True
        self.fatigue = 0
        self.spent_action_points = 0
        self.vital_wounds = 0

    def __copy__(self):
        return Creature(
            character_class=self.character_class,
            level=self.level,
            name=self.name,
            species=self.species,
            starting_attributes=[
                self.starting_strength,
                self.starting_dexterity,
                self.starting_constitution,
                self.starting_intelligence,
                self.starting_perception,
                self.starting_willpower,
            ],
            weapons=self.weapons,
            armor=self.armor,
            challenge_rating=self.challenge_rating,
            name_suffix=self.name_suffix,
            natural_armor=self.natural_armor,
            shield=self.shield,
            size=self.size,
            accuracy_modifier=self.accuracy_modifier,
            active_abilities=self.active_abilities,
            attuned_ability_count=self.attuned_ability_count,
            weapon_damage_modifier=self.weapon_damage_modifier,
        )

    def is_character(self):
        return self.character_class.class_type == "character"

    @property
    def magical_power(self):
        return max(self.level, self.willpower)

    @property
    def mundane_power(self):
        return max(self.level, self.strength)

    @property
    def armor_defense(self):
        return sum(
            [
                self.armor.defense_bonus if self.armor else 0,
                self.shield.defense_bonus if self.shield else 0,
                self.starting_dexterity,
                self.natural_armor,
                self.cr_mod,
            ]
        )

    @property
    def special_attacks(self):
        return [
            Attack(
                accuracy=self.accuracy(),
                action_point=ability.action_point,
                damage=self.active_ability_damage(ability),
                defense=ability.defense,
                name=ability.name,
            )
            for ability in self.active_abilities
        ]

    @property
    def attacks(self):
        return self.strikes + self.special_attacks

    @property
    def constitution(self):
        return calculate_attribute(self.starting_constitution, self.level)

    @property
    def cr_mod(self):
        return max(0, self.challenge_rating - 1)

    @property
    def dexterity(self):
        dex = calculate_attribute(self.starting_dexterity, self.level)
        if self.armor and self.armor.encumbrance_category == Armor.HEAVY:
            dex = dex // 2
        return dex

    @property
    def fortitude_defense(self):
        return sum(
            [
                self.fortitude_defense_misc,
                self.starting_constitution,
                max(self.level, self.constitution),
                self.character_class.fortitude_defense_bonus,
                self.species.fortitude_defense_bonus,
                self.cr_mod,
            ]
        )

    @property
    def fatigue_threshold(self):
        return max(self.level, self.constitution)

    @property
    def wound_threshold(self):
        return (self.level + 1) * 5

    @property
    def current_wound_threshold(self):
        return self.wound_threshold - self.level * self.fatigue

    @property
    def intelligence(self):
        return calculate_attribute(self.starting_intelligence, self.level)

    @property
    def mental_defense(self):
        return sum(
            [
                self.mental_defense_misc,
                self.starting_willpower,
                max(self.level, self.willpower),
                self.character_class.mental_defense_bonus,
                self.species.mental_defense_bonus,
                self.cr_mod,
            ]
        )

    @property
    def perception(self):
        return calculate_attribute(self.starting_perception, self.level)

    @property
    def reach(self):
        return self.size.reach

    @property
    def reflex_defense(self):
        return sum(
            [
                self.reflex_defense_misc,
                self.starting_dexterity,
                max(self.level, self.dexterity),
                self.character_class.reflex_defense_bonus,
                self.species.reflex_defense_bonus,
                self.size.reflex_defense_modifier,
                self.cr_mod,
            ]
        )

    @property
    def strength(self):
        return calculate_attribute(self.starting_strength, self.level)

    @property
    def strikes(self):
        strikes = []
        for weapon in self.weapons:
            strikes.append(
                Attack(
                    accuracy=self.weapon_accuracy(weapon),
                    damage=self.weapon_damage(weapon),
                    defense=weapon.defense,
                    name=weapon.name,
                )
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

    def take_wound(self):
        self.vital_wounds += 1
        wound_roll = (
            DicePool(10).roll() - self.vital_wounds + self.starting_constitution
        )
        self.is_conscious = self.is_conscious and wound_roll >= 2

    def take_damage(self, damage):
        if damage >= self.current_wound_threshold:
            self.take_wound()
        elif damage >= self.fatigue_threshold:
            self.fatigue += 1
            if self.current_wound_threshold == 0:
                self.take_wound()

    def accuracy(self, attribute=None):
        # Perception is normally used except in unusual situations
        return sum(
            [
                max(
                    self.level,
                    getattr(self, attribute or "perception"),
                ),
                self.accuracy_modifier,
                self.cr_mod,
            ]
        )

    def weapon_accuracy(self, weapon):
        """Return the accuracy with the given weapon"""
        return sum(
            [
                max(
                    self.level,
                    self.perception,
                    self.dexterity
                    if weapon.encumbrance_category == Weapon.LIGHT
                    else 0,
                ),
                self.shield.accuracy_modifier if self.shield else 0,
                self.accuracy_modifier,
                self.cr_mod,
            ]
        )

    def weapon_damage(self, weapon):
        """Return the DicePool for damage with the given Weapon"""
        power = max(
            self.level,
            self.willpower if weapon.damage_type == "magical" else self.strength,
        )
        standard = standard_damage(power)
        standard += sum(
            [
                weapon.damage_modifier,
                self.weapon_damage_modifier,
            ]
        )
        return standard

    def active_ability_damage(self, active_ability):
        """Return the DicePool for damage with the given ActiveAbility"""
        if active_ability.damage_type == "strike":
            # Default to the first weapon, assuming that it is the primary weapon
            weapon = active_ability.weapon or self.weapons[0]
            damage_modifier = (
                active_ability.damage_modifier
                if isinstance(active_ability.damage_modifier, int)
                else active_ability.damage_modifier(self)
            )
            return self.weapon_damage(weapon) + damage_modifier

        standard = DicePool(8)
        standard += sum(
            [
                max(
                    self.level,
                    self.willpower
                    if active_ability.damage_type == "magical"
                    else self.strength,
                )
                // 2,
                active_ability.damage_modifier,
                self.cr_mod,
            ]
        )
        return standard

    def standard_damage(self, ability_type="physical"):
        attribute = {
            "magical": self.willpower,
            "physical": self.strength,
        }[ability_type]
        return (
            standard_damage(
                max(self.level, attribute),
            )
            + self.cr_mod
        )

    def expected_monster_points(self):
        # Having a high CR gives static benefits, but it also allows more
        # extreme specific attributes
        return 8 + self.level * 2 + self.cr_mod * 5

    def monster_point_total(self):
        points = 0
        # Add points from starting attributes; same as PC calcs
        for attribute_name in rise_data.attributes:
            attribute_value = getattr(self, "starting_" + attribute_name)
            if attribute_value > 1:
                points += attribute_value * 2 - 1
            elif attribute_value == 1:
                points += 1

        # Add points from natural armor; up to 3 is free, 2 per armor above that
        if self.natural_armor > 3:
            points += (self.natural_armor - 3) * 2
        # having armor and natural armor is significant; worth about 3 natural armor
        if self.natural_armor and self.armor:
            points += 6
        if self.natural_armor and self.shield:
            points += 2

        # Add points from size; +4 per size above Medium, +2 per size below Small
        large_sizes = ["large", "huge", "gargantuan", "colossal"]
        if self.size.name in large_sizes:
            points += 4 * (large_sizes.index(self.size.name) + 1)
        small_sizes = ["tiny", "diminuitive", "fine"]
        if self.size.name in small_sizes:
            points += 2 * (small_sizes.index(self.size.name) + 1)

        return points

    def __str__(self):
        return "{0} {1} {2}\n{3}\n{4}{5}\n{6}\n{7}".format(
            self.species.name if self.species else self.monster_type.name,
            self.name,
            self.level,
            self._to_string_defenses(),
            self._to_string_strikes(),
            self._to_string_special_attacks(),
            self._to_string_attributes(),
            self._to_string_core(),
        )

    def _to_string_levels(self):
        text = ", ".join(
            sorted(
                [
                    "{} {}".format(
                        name.capitalize() if name == self.class_name else name, level
                    )
                    for name, level in self.levels.items()
                ]
            )
        )
        if self.challenge_rating != 1:
            text += f" [CR {self.challenge_rating}]"
        return text

    def _to_string_defenses(self):
        text = "; ".join(
            [
                f"[FT] {self.fatigue_threshold}, [WT] {self.wound_threshold}",
                f"[Defs] {self.armor_defense}/{self.fortitude_defense}/{self.reflex_defense}/{self.mental_defense}",
                f"[AP] {self.recovery_action_points}/{self.reserve_action_points}",
            ]
        )
        return text

    def _to_string_strikes(self):
        text = "[Atk] " + "; ".join(
            "{0}: +{1} vs {2} ({3})".format(
                strike.name.title(),
                strike.accuracy,
                strike.defense[0],
                strike.damage,
            )
            for strike in self.strikes
        )
        return text

    def _to_string_special_attacks(self):
        if len(self.active_abilities) == 0:
            return ""
        text = "\n  " + "; ".join(
            "{0}: +{1} vs {2} ({3})".format(
                attack.name.title(),
                attack.accuracy,
                attack.defense[0],
                attack.damage,
            )
            for attack in self.special_attacks
        )
        return text

    def _to_string_attributes(self):
        text = "[Attr]"
        for attribute in rise_data.attributes:
            text += " " + str(getattr(self, attribute))
        return text

    def _to_string_core(self):
        return "[Space] {0}, [Reach] {1}, [Speed] {2}".format(
            self.space,
            self.reach,
            self.speed,
        )
