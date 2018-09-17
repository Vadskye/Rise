from rise.statistics.creature import Creature
from rise.statistics.character_class import CharacterClass
from rise.statistics.race import Race
from rise.statistics.size import Size
from rise.statistics.weapon import Weapon

cache = None

def get_sample_creatures():
    global cache
    if not cache:
        cache = generate_sample_creatures()

    return cache

def generate_sample_creatures():
    global cache

    samples = {
        'monsters': generate_sample_monsters(),
    }

    cache = samples
    return cache

def generate_sample_monsters():
    monsters = {}

    monsters['aboleth'] = Creature(
        challenge_rating=4,
        character_class=CharacterClass('adept'),
        level=12,
        key_attribute='willpower',
        name='Aboleth',
        natural_armor=6,
        race=Race('aberration'),
        size=Size('huge'),
        starting_attributes=[2, 0, 2, 2, 1, 4],
        weapons=[Weapon('tentacle')],
    )

    return monsters
