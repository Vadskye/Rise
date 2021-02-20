from copy import copy
from rise.statistics.active_ability import ActiveAbility
from rise.statistics.creature import Creature
from rise.statistics.character_class import CharacterClass
from rise.statistics.size import Size
from rise.statistics.species import Species
from rise.statistics.weapon import Weapon
from rise.statistics.armor import Armor
from rise.statistics.shield import Shield

cache = None


def get_sample_creatures():
    global cache
    if not cache:
        cache = generate_sample_creatures()

    return cache


def parse_creature(sample_info, creature_text):
    tokens = creature_text.split(" ")
    name = tokens[0]
    creature = copy(
        sample_info["characters"].get(name) or sample_info["monsters"].get(name)
    )
    for modifier_name in tokens[1:]:
        sample_info["modifiers"][modifier_name](creature)
    return creature


def generate_sample_creatures():
    global cache

    samples = {
        "characters": generate_sample_characters(),
        "modifiers": generate_modifiers(),
        "monsters": generate_sample_monsters(),
    }

    cache = samples
    return cache


def generate_modifiers():
    modifiers = {}

    def barrier(c):
        c.attuned_ability_count += 1
        c.damage_reduction += c.level + 1

    modifiers["barrier"] = barrier

    def bless(c):
        c.attuned_ability_count += 1
        c.weapon_damage_modifier += 1

    modifiers["bless"] = bless

    def greatsword(c):
        c.weapons = [Weapon("greatsword"), Weapon("longsword")]
        c.shield = None

    modifiers["greatsword"] = greatsword

    def power_attack(c):
        c.active_abilities.append(ActiveAbility("power strike"))

    modifiers["power_attack"] = power_attack
    # Shorthand
    modifiers["pa"] = power_attack

    def precognitive_defense(c):
        c.natural_armor += 1
        c.attuned_ability_count += 1

    modifiers["precognitive_defense"] = precognitive_defense

    def rage(c):
        c.attuned_ability_count += 1
        c.weapon_damage_modifier += 2 if c.level >= 14 else 1

    modifiers["rage"] = rage

    def revelation(c):
        c.accuracy_modifier += 1
        c.attuned_ability_count += 1

    modifiers["revelation"] = revelation

    def blessing_of_might(c):
        c.weapon_damage_modifier += 1
        c.attuned_ability_count += 1

    modifiers["blessing_of_might"] = blessing_of_might

    def firebolt(c):
        c.active_abilities = c.active_abilities or []
        c.active_abilities.append(ActiveAbility("firebolt"))

    modifiers["firebolt"] = firebolt

    def inflict(c):
        c.active_abilities = c.active_abilities or []
        c.active_abilities.append(ActiveAbility("inflict wounds"))

    modifiers["inflict"] = inflict

    def make_attribute_mod(attribute, i):
        return lambda c: setattr(c, f"starting_{attribute}", i)

    for i in range(-2, 5):
        for attribute in [
            "strength",
            "dexterity",
            "constitution",
            "intelligence",
            "perception",
            "willpower",
        ]:
            modifiers[f"{attribute[:3]}{i}"] = make_attribute_mod(attribute, i)

    def make_level_mod(i):
        return lambda c: setattr(c, "level", i)

    for i in range(1, 21):
        key = f"l{i}"  # if i > 10 else f"l0{i}"
        modifiers[key] = make_level_mod(i)

    return modifiers


def generate_sample_characters():
    tests = {}

    tests["fighter"] = Creature(
        character_class=CharacterClass("fighter"),
        level=1,
        name="Fighter",
        species=Species("human"),
        starting_attributes=[2, 0, 2, 0, 2, 0],
        armor=Armor("breastplate"),
        weapons=[Weapon("longsword")],
        shield=Shield("heavy"),
    )

    tests["sorcerer"] = Creature(
        character_class=CharacterClass("mage"),
        level=1,
        name="Mage",
        species=Species("human"),
        starting_attributes=[0, 0, 2, 0, 2, 2],
        armor=Armor("studded leather"),
        weapons=[Weapon("club")],
    )

    tests["warrior"] = Creature(
        character_class=CharacterClass("fighter"),
        level=1,
        name="Warrior",
        species=Species("human"),
        starting_attributes=[0, 0, 0, 0, 0, 0],
        armor=Armor("breastplate"),
        weapons=[Weapon("longsword")],
        shield=Shield("heavy"),
    )

    return tests


def generate_sample_monsters():
    monsters = {}

    # Animals
    monsters["aboleth"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("adept"),
        level=12,
        name="Aboleth",
        natural_armor=6,
        species=Species("aberration"),
        size=Size("huge"),
        starting_attributes=[2, 0, 3, 4, 3, 5],
        weapons=[Weapon("tentacle")],
    )
    monsters["eel"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("slayer"),
        level=6,
        name="Eel",
        natural_armor=6,
        species=Species("animal"),
        size=Size("large"),
        starting_attributes=[2, 3, 2, -8, 3, 0],
        weapons=[Weapon("bite")],
    )
    monsters["black_bear"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("behemoth"),
        level=2,
        name="Bear",
        name_suffix="Black",
        natural_armor=4,
        species=Species("animal"),
        starting_attributes=[4, 1, 4, -7, 1, 0],
        weapons=[Weapon("bite"), Weapon("claw")],
    )
    monsters["brown_bear"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("behemoth"),
        level=4,
        name="Bear",
        natural_armor=4,
        name_suffix="Brown",
        species=Species("animal"),
        size=Size("large"),
        starting_attributes=[4, 1, 4, -7, 1, 0],
        weapons=[Weapon("bite"), Weapon("claw")],
    )
    monsters["dire_wolf"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("slayer"),
        level=5,
        name="Dire Wolf",
        natural_armor=4,
        species=Species("animal"),
        size=Size("large"),
        starting_attributes=[3, 3, 2, -6, 3, 0],
        weapons=[Weapon("bite")],
    )
    monsters["ferret"] = Creature(
        character_class=CharacterClass("slayer"),
        level=1,
        name="Ferret",
        natural_armor=2,
        species=Species("animal"),
        size=Size("tiny"),
        starting_attributes=[-6, 4, -4, -7, 1, -2],
        weapons=[Weapon("bite")],
    )
    monsters["pony"] = Creature(
        character_class=CharacterClass("behemoth"),
        level=2,
        name="Pony",
        natural_armor=4,
        species=Species("animal"),
        size=Size("medium"),
        starting_attributes=[1, 1, 3, -7, 1, 0],
        weapons=[Weapon("bite")],
    )
    monsters["raven"] = Creature(
        character_class=CharacterClass("slayer"),
        level=1,
        name="Raven",
        natural_armor=2,
        species=Species("animal"),
        size=Size("tiny"),
        starting_attributes=[-9, 3, -4, -6, 2, 0],
        weapons=[Weapon("talon")],
    )
    monsters["roc"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("behemoth"),
        level=9,
        name="Roc",
        natural_armor=6,
        species=Species("animal"),
        size=Size("gargantuan"),
        starting_attributes=[6, 2, 2, -7, 3, 0],
        weapons=[Weapon("talon")],
    )
    monsters["wasp"] = Creature(
        character_class=CharacterClass("slayer"),
        level=6,
        name="Wasp",
        name_suffix="Giant",
        natural_armor=6,
        species=Species("animal"),
        size=Size("large"),
        starting_attributes=[1, 3, 0, -8, 2, -1],
        weapons=[Weapon("bite")],
    )
    monsters["wolf"] = Creature(
        character_class=CharacterClass("slayer"),
        level=1,
        name="Wolf",
        natural_armor=3,
        species=Species("animal"),
        starting_attributes=[1, 3, 1, -6, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["dire_beetle"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("behemoth"),
        level=7,
        name="Beetle",
        name_suffix="Dire",
        natural_armor=6,
        species=Species("animal"),
        size=Size("large"),
        starting_attributes=[4, 0, 4, -9, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["huge_centipede"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("behemoth"),
        level=8,
        name="Centipede",
        name_suffix="Huge",
        natural_armor=6,
        species=Species("animal"),
        size=Size("huge"),
        starting_attributes=[4, 1, 5, -9, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["spider_large"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("slayer"),
        level=3,
        name="Spider",
        name_suffix="Large",
        natural_armor=6,
        species=Species("animal"),
        size=Size("large"),
        starting_attributes=[2, 4, 1, -9, 3, 0],
        weapons=[Weapon("bite")],
    )
    monsters["spider_huge"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("slayer"),
        level=6,
        name="Spider",
        name_suffix="Huge",
        natural_armor=6,
        species=Species("animal"),
        size=Size("huge"),
        starting_attributes=[2, 4, 1, -9, 3, 0],
        weapons=[Weapon("bite")],
    )
    monsters["spider_gargantuan"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("slayer"),
        level=9,
        name="Spider",
        name_suffix="Gargantuan",
        natural_armor=6,
        species=Species("animal"),
        size=Size("gargantuan"),
        starting_attributes=[3, 4, 1, -9, 3, 0],
        weapons=[Weapon("bite")],
    )
    monsters["spider_colossal"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("slayer"),
        level=12,
        name="Spider",
        name_suffix="Colossal",
        natural_armor=6,
        species=Species("animal"),
        size=Size("colossal"),
        starting_attributes=[4, 4, 1, -9, 3, 0],
        weapons=[Weapon("bite")],
    )

    # Animates
    monsters["elemental_air"] = Creature(
        challenge_rating=1,
        character_class=CharacterClass("slayer"),
        level=10,
        name="Elemental",
        name_suffix="Air",
        natural_armor=4,
        species=Species("animate"),
        size=Size("large"),
        starting_attributes=[2, 6, 2, 0, 3, 0],
        weapons=[Weapon("slam")],
    )
    monsters["ram_animus"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("behemoth"),
        level=6,
        name="Animus",
        name_suffix="Ram",
        natural_armor=6,
        species=Species("animate"),
        size=Size("huge"),
        starting_attributes=[4, 2, 4, 0, 2, 0],
        weapons=[Weapon("slam"), Weapon("hoof")],
    )
    monsters["earth_elemental_elder"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("behemoth"),
        level=12,
        name="Earth Elemental",
        name_suffix="Elder",
        natural_armor=6,
        species=Species("animate"),
        size=Size("huge"),
        starting_attributes=[4, 0, 5, 1, 3, 3],
        weapons=[Weapon("slam")],
    )

    # Humanoids
    monsters["cultist"] = Creature(
        armor=Armor("breastplate"),
        character_class=CharacterClass("adept"),
        level=1,
        name="Cultist",
        species=Species("humanoid"),
        starting_attributes=[0, 0, 0, -1, 1, 3],
        weapons=[Weapon("club")],
    )
    monsters["goblin_shouter"] = Creature(
        armor=Armor("hide"),
        challenge_rating=2,
        character_class=CharacterClass("slayer"),
        level=2,
        name="Goblin Shouter",
        natural_armor=0,
        species=Species("humanoid"),
        size=Size("small"),
        starting_attributes=[1, 2, 1, -2, 2, 3],
        weapons=[Weapon("club"), Weapon("sling")],
    )
    monsters["goblin_stabber"] = Creature(
        armor=Armor("hide"),
        character_class=CharacterClass("slayer"),
        level=1,
        name="Goblin Stabber",
        natural_armor=0,
        species=Species("humanoid"),
        size=Size("small"),
        starting_attributes=[0, 3, -1, -2, 2, 0],
        weapons=[Weapon("shortsword"), Weapon("sling")],
    )
    monsters["orc_chieftain"] = Creature(
        armor=Armor("breastplate"),
        challenge_rating=3,
        character_class=CharacterClass("slayer"),
        level=5,
        name="Orc Chieftain",
        species=Species("humanoid"),
        size=Size("medium"),
        starting_attributes=[6, 2, 3, 0, 2, 3],
        weapons=[Weapon("greataxe")],
    )
    monsters["orc_grunt"] = Creature(
        armor=Armor("breastplate"),
        character_class=CharacterClass("slayer"),
        level=2,
        name="Orc Grunt",
        species=Species("humanoid"),
        size=Size("medium"),
        starting_attributes=[5, 0, 1, -1, 0, 0],
        weapons=[Weapon("greataxe")],
    )
    monsters["orc_loudmouth"] = Creature(
        armor=Armor("breastplate"),
        challenge_rating=2,
        character_class=CharacterClass("slayer"),
        level=3,
        name="Orc Loudmouth",
        species=Species("humanoid"),
        size=Size("medium"),
        starting_attributes=[4, 2, 1, -1, 2, 2],
        weapons=[Weapon("greataxe")],
    )
    monsters["orc_shaman"] = Creature(
        armor=Armor("breastplate"),
        challenge_rating=2,
        character_class=CharacterClass("adept"),
        level=3,
        name="Orc Shaman",
        species=Species("humanoid"),
        size=Size("medium"),
        starting_attributes=[4, 2, 2, -1, 0, 3],
        weapons=[Weapon("greatstaff")],
    )
    monsters["orc_savage"] = Creature(
        armor=Armor("breastplate"),
        character_class=CharacterClass("slayer"),
        level=4,
        name="Orc Savage",
        species=Species("humanoid"),
        size=Size("medium"),
        starting_attributes=[6, 2, 1, -1, 0, 0],
        weapons=[Weapon("greataxe")],
    )

    # Magical beasts
    monsters["medium_red_dragon"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("behemoth"),
        level=3,
        name="Dragon",
        name_suffix="Medium Red",
        natural_armor=6,
        species=Species("magical beast"),
        size=Size("medium"),
        starting_attributes=[2, 0, 3, 3, 3, 3],
        weapons=[Weapon("bite")],
    )
    monsters["large_red_dragon"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("behemoth"),
        level=6,
        name="Dragon",
        name_suffix="Large Red",
        natural_armor=7,
        species=Species("magical beast"),
        size=Size("large"),
        starting_attributes=[2, 0, 3, 3, 3, 3],
        weapons=[Weapon("bite")],
    )
    monsters["huge_red_dragon"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("behemoth"),
        level=10,
        name="Dragon",
        name_suffix="Huge Red",
        natural_armor=8,
        species=Species("magical beast"),
        size=Size("huge"),
        starting_attributes=[2, 0, 3, 3, 3, 3],
        weapons=[Weapon("bite")],
    )
    monsters["gargantuan_red_dragon"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("behemoth"),
        level=14,
        name="Dragon",
        name_suffix="Huge Red",
        natural_armor=8,
        species=Species("magical beast"),
        size=Size("gargantuan"),
        starting_attributes=[2, 0, 4, 4, 4, 4],
        weapons=[Weapon("bite")],
    )
    monsters["colossal_red_dragon"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("behemoth"),
        level=18,
        name="Dragon",
        name_suffix="Colossal Red",
        natural_armor=9,
        species=Species("magical beast"),
        size=Size("colossal"),
        starting_attributes=[2, 0, 4, 4, 4, 4],
        weapons=[Weapon("bite")],
    )
    monsters["wyvern"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("slayer"),
        level=5,
        name="Wyvern",
        natural_armor=6,
        species=Species("magical beast"),
        size=Size("large"),
        starting_attributes=[4, 1, 3, -7, 2, 0],
        weapons=[Weapon("sting"), Weapon("bite")],
    )
    monsters["ankheg"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("slayer"),
        level=7,
        name="Ankheg",
        natural_armor=6,
        species=Species("magical beast"),
        size=Size("large"),
        starting_attributes=[4, 1, 3, -7, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["aranea"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("adept"),
        level=5,
        name="Aranea",
        natural_armor=4,
        species=Species("magical beast"),
        starting_attributes=[1, 2, 1, 2, 3, 3],
        weapons=[Weapon("bite")],
    )
    monsters["basilisk"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("behemoth"),
        level=5,
        name="Basilisk",
        natural_armor=6,
        species=Species("magical beast"),
        size=Size("medium"),
        starting_attributes=[2, -1, 3, -6, 3, 0],
        weapons=[Weapon("bite")],
    )
    monsters["behir"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("behemoth"),
        level=8,
        name="Behir",
        natural_armor=6,
        species=Species("magical beast"),
        size=Size("huge"),
        starting_attributes=[5, 1, 4, -3, 1, 0],
        weapons=[Weapon("bite"), Weapon("claw")],
    )
    monsters["blink_dog"] = Creature(
        character_class=CharacterClass("slayer"),
        level=3,
        name="Blink Dog",
        natural_armor=4,
        species=Species("magical beast"),
        size=Size("medium"),
        starting_attributes=[2, 3, 0, 0, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["centaur"] = Creature(
        challenge_rating=2,
        armor=Armor("leather"),
        character_class=CharacterClass("slayer"),
        level=3,
        name="Centaur",
        natural_armor=3,
        species=Species("magical beast"),
        size=Size("large"),
        starting_attributes=[1, 2, 2, 0, 2, 1],
        weapons=[Weapon("longsword"), Weapon("longbow"), Weapon("hoof")],
    )
    monsters["cockatrice"] = Creature(
        character_class=CharacterClass("adept"),
        level=3,
        name="Cockatrice",
        natural_armor=4,
        species=Species("magical beast"),
        size=Size("small"),
        starting_attributes=[-2, 3, 0, -8, 2, 2],
        weapons=[Weapon("bite")],
    )
    monsters["darkmantle"] = Creature(
        character_class=CharacterClass("slayer"),
        level=1,
        name="Darkmantle",
        natural_armor=4,
        species=Species("magical beast"),
        size=Size("small"),
        starting_attributes=[3, 0, 1, -8, 0, 0],
        weapons=[Weapon("slam")],
    )
    monsters["frost_worm"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("behemoth"),
        level=12,
        name="Frost Worm",
        natural_armor=6,
        species=Species("magical beast"),
        size=Size("gargantuan"),
        starting_attributes=[5, 0, 5, -8, 2, 0],
        weapons=[Weapon("bite"), Weapon("slam")],
    )
    monsters["girallon"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("slayer"),
        level=5,
        name="Girallon",
        natural_armor=4,
        species=Species("magical beast"),
        size=Size("large"),
        starting_attributes=[3, 4, 1, -8, 2, -1],
        weapons=[Weapon("claw")],
    )
    monsters["griffin"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("slayer"),
        level=4,
        name="Griffon",
        natural_armor=4,
        species=Species("magical beast"),
        size=Size("large"),
        starting_attributes=[2, 4, 1, -4, 2, 0],
        weapons=[Weapon("talon")],
    )
    monsters["hydra5"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("behemoth"),
        level=5,
        name="Hydra, 5 Headed",
        natural_armor=4,
        species=Species("magical beast"),
        size=Size("huge"),
        starting_attributes=[4, 0, 4, -8, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["hydra6"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("behemoth"),
        level=6,
        name="Hydra, 6 Headed",
        natural_armor=4,
        species=Species("magical beast"),
        size=Size("huge"),
        starting_attributes=[4, 0, 4, -8, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["minotaur"] = Creature(
        character_class=CharacterClass("slayer"),
        level=4,
        name="Minotaur",
        natural_armor=4,
        species=Species("magical beast"),
        size=Size("large"),
        starting_attributes=[3, 1, 1, -2, 2, 0],
        weapons=[Weapon("greataxe"), Weapon("gore")],
    )
    monsters["thaumavore"] = Creature(
        character_class=CharacterClass("slayer"),
        level=3,
        name="Thaumavore",
        natural_armor=6,
        species=Species("magical beast"),
        size=Size("small"),
        starting_attributes=[2, 3, 0, -7, 0, 0],
        weapons=[Weapon("bite")],
    )
    monsters["banehound"] = Creature(
        challenge_rating=4,
        character_class=CharacterClass("slayer"),
        level=5,
        name="Banehound",
        natural_armor=6,
        species=Species("magical beast"),
        size=Size("huge"),
        starting_attributes=[2, 4, 0, 1, 3, 0],
        weapons=[Weapon("bite")],
    )
    monsters["fleshfeeder"] = Creature(
        challenge_rating=1,
        character_class=CharacterClass("slayer"),
        level=4,
        name="Fleshfeeder",
        natural_armor=4,
        species=Species("magical beast"),
        size=Size("medium"),
        starting_attributes=[2, 3, 2, 0, 2, 0],
        weapons=[Weapon("bite")],
    )

    # Monstrous humanoids
    monsters["banshee"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("adept"),
        level=3,
        name="Banshee",
        natural_armor=4,
        species=Species("monstrous humanoid"),
        size=Size("medium"),
        starting_attributes=[2, 2, 0, 0, 2, 4],
        weapons=[Weapon("claw")],
    )
    monsters["hill_giant"] = Creature(
        armor=Armor("breastplate"),
        character_class=CharacterClass("behemoth"),
        level=6,
        name="Giant",
        name_suffix="Hill",
        natural_armor=2,
        species=Species("monstrous humanoid"),
        size=Size("large"),
        starting_attributes=[4, -1, 2, -2, 0, 0],
        weapons=[Weapon("greatclub"), Weapon("boulder")],
    )
    monsters["stone_giant"] = Creature(
        armor=Armor("breastplate"),
        character_class=CharacterClass("behemoth"),
        level=9,
        name="Giant",
        name_suffix="Stone",
        natural_armor=4,
        species=Species("monstrous humanoid"),
        size=Size("huge"),
        starting_attributes=[4, -1, 2, -1, 1, 0],
        weapons=[Weapon("greatclub"), Weapon("boulder")],
    )
    monsters["storm_giant"] = Creature(
        armor=Armor("breastplate"),
        character_class=CharacterClass("slayer"),
        level=15,
        name="Giant",
        name_suffix="Storm",
        natural_armor=4,
        species=Species("monstrous humanoid"),
        size=Size("gargantuan"),
        starting_attributes=[5, 0, 2, 1, 2, 2],
        weapons=[Weapon("greatsword")],
    )
    monsters["green_hag"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("adept"),
        level=5,
        name="Hag",
        name_suffix="Green",
        natural_armor=4,
        species=Species("monstrous humanoid"),
        size=Size("medium"),
        starting_attributes=[0, 2, 2, 2, 3, 2],
        weapons=[Weapon("claw")],
    )
    monsters["medusa"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("adept"),
        level=7,
        name="Medusa",
        natural_armor=4,
        species=Species("monstrous humanoid"),
        size=Size("medium"),
        starting_attributes=[0, 1, 0, 1, 3, 2],
        weapons=[Weapon("longbow"), Weapon("snakes")],
    )
    monsters["harpy_archer"] = Creature(
        challenge_rating=1,
        character_class=CharacterClass("slayer"),
        level=12,
        name="Harpy",
        name_suffix="Harpy Archer",
        natural_armor=4,
        species=Species("monstrous humanoid"),
        armor=Armor("studded leather"),
        size=Size("medium"),
        starting_attributes=[2, 4, 1, 1, 4, 3],
        weapons=[Weapon("longbow")],
    )

    # Outsiders
    monsters["astral_deva"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("adept"),
        level=14,
        name="Angel",
        name_suffix="Astral Deva",
        natural_armor=6,
        species=Species("outsider"),
        shield=Shield("heavy"),
        starting_attributes=[3, 3, 3, 3, 3, 3],
        weapons=[Weapon("mace")],
    )
    monsters["arrowhawk"] = Creature(
        character_class=CharacterClass("slayer"),
        level=3,
        name="Arrowhawk",
        natural_armor=4,
        species=Species("outsider"),
        starting_attributes=[1, 4, -1, 0, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["bebelith"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("slayer"),
        level=11,
        name="Demon",
        name_suffix="Bebelith",
        natural_armor=6,
        species=Species("outsider"),
        size=Size("huge"),
        starting_attributes=[2, 3, 2, 0, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["hell_hound"] = Creature(
        character_class=CharacterClass("slayer"),
        level=4,
        name="Hell Hound",
        natural_armor=4,
        species=Species("outsider"),
        size=Size("medium"),
        starting_attributes=[1, 3, 0, -3, 2, 0],
        weapons=[Weapon("bite")],
    )
    monsters["flamebrother_salamander"] = Creature(
        character_class=CharacterClass("slayer"),
        level=4,
        name="Salamander",
        name_suffix="Flamebrother",
        natural_armor=6,
        species=Species("outsider"),
        size=Size("medium"),
        starting_attributes=[4, 2, 0, 1, 1, 0],
        # TODO: weapons deal fire damage, and its strength is lower
        weapons=[Weapon("spear"), Weapon("tail slam")],
    )
    monsters["janni"] = Creature(
        armor=Armor("studded leather"),
        character_class=CharacterClass("adept"),
        level=7,
        name="Janni",
        natural_armor=6,
        species=Species("outsider"),
        size=Size("medium"),
        starting_attributes=[2, 3, 0, 1, 2, 1],
        weapons=[Weapon("shortsword")],
    )
    monsters["salamander_battlemaster"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("slayer"),
        level=5,
        name="Salamander",
        name_suffix="Battlemaster",
        natural_armor=6,
        species=Species("outsider"),
        size=Size("medium"),
        starting_attributes=[4, 2, 0, 1, 2, 1],
        # TODO: weapons deal fire damage, and its strength is lower
        weapons=[Weapon("spear"), Weapon("tail slam")],
    )

    # Undead
    monsters["allip"] = Creature(
        character_class=CharacterClass("adept"),
        level=4,
        name="Allip",
        natural_armor=4,  # How does this interact with being incorporeal?
        species=Species("undead"),
        starting_attributes=[0, 3, 0, 0, 0, 3],
        weapons=[Weapon("draining touch")],
    )
    monsters["spectre"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("adept"),
        level=7,
        name="Spectre",
        natural_armor=4,  # How does this interact with being incorporeal?
        species=Species("undead"),
        starting_attributes=[0, 4, 0, 0, 2, 4],
        weapons=[Weapon("draining touch")],
    )
    monsters["dirgewalker"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("adept"),
        level=4,
        name="Dirgewalker",
        natural_armor=6,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[0, 4, 0, 1, 3, 3],
        weapons=[Weapon("claw")],
    )
    monsters["skeleton"] = Creature(
        character_class=CharacterClass("slayer"),
        level=1,
        name="Skeleton",
        natural_armor=5,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[2, 2, 0, 0, 0, 0],
        weapons=[Weapon("claw")],
    )
    monsters["skeleton_warrior"] = Creature(
        character_class=CharacterClass("slayer"),
        level=4,
        name="Skeleton",
        name_suffix="Warrior",
        natural_armor=5,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[2, 3, 0, 0, 0, 0],
        weapons=[Weapon("longsword")],
    )
    monsters["skeleton_mage"] = Creature(
        character_class=CharacterClass("adept"),
        level=4,
        name="Skeleton",
        name_suffix="Mage",
        natural_armor=5,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[0, 3, 0, 0, 0, 3],
        weapons=[Weapon("claw")],
    )
    monsters["skeleton_champion"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("slayer"),
        level=4,
        name="Skeleton",
        name_suffix="Warrior",
        natural_armor=5,
        species=Species("undead"),
        size=Size("large"),
        starting_attributes=[3, 4, 1, 0, 0, 0],
        weapons=[Weapon("greatsword")],
    )
    monsters["zombie"] = Creature(
        character_class=CharacterClass("behemoth"),
        level=1,
        name="Zombie",
        natural_armor=3,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[1, 0, 3, 0, 0, 0],
        weapons=[Weapon("slam")],
    )
    monsters["zombie_warrior"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("behemoth"),
        level=2,
        name="Zombie",
        name_suffix="Warrior",
        natural_armor=3,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[3, 0, 4, 0, 0, 0],
        weapons=[Weapon("slam")],
    )
    monsters["unliving_mother"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("adept"),
        level=2,
        name="Unliving Mother",
        natural_armor=3,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[3, 0, 3, 0, 0, 2],
        weapons=[Weapon("bite")],
    )
    monsters["unliving_queen"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("adept"),
        level=2,
        name="Unliving Mother",
        natural_armor=4,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[3, 2, 3, 0, 3, 0],
        weapons=[Weapon("bite")],
    )
    monsters["zombie_captain"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("behemoth"),
        level=3,
        name="Zombie",
        name_suffix="Captain",
        natural_armor=3,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[4, 0, 4, 0, 0, 0],
        weapons=[Weapon("slam")],
    )
    monsters["zombie_hulking"] = Creature(
        challenge_rating=2,
        character_class=CharacterClass("behemoth"),
        level=3,
        name="Zombie",
        name_suffix="Hulking",
        natural_armor=4,
        species=Species("undead"),
        size=Size("large"),
        starting_attributes=[2, 0, 4, 0, 0, 0],
        weapons=[Weapon("slam")],
    )
    monsters["zombie_elite"] = Creature(
        character_class=CharacterClass("behemoth"),
        level=4,
        name="Zombie",
        name_suffix="Elite",
        natural_armor=4,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[3, 0, 5, 0, 0, 0],
        weapons=[Weapon("slam")],
    )
    monsters["corrupted_mage"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("adept"),
        level=4,
        name="Corrupted",
        name_suffix="Mage",
        natural_armor=4,
        species=Species("undead"),
        size=Size("medium"),
        starting_attributes=[2, 0, 3, 0, 3, 4],
        weapons=[Weapon("slam")],
    )

    monsters["unliving_amalgamation"] = Creature(
        challenge_rating=3,
        character_class=CharacterClass("behemoth"),
        level=4,
        name="Unliving Amalgamation",
        natural_armor=4,
        species=Species("undead"),
        size=Size("huge"),
        starting_attributes=[2, 0, 4, 0, 3, 0],
        weapons=[Weapon("slam")],
    )

    return monsters
