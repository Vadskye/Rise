from rise.statistics.creature import Creature
from rise.latex_generation.book_path import book_path
from rise.latex.monster import get_latex_from_creature
from rise.latex.ability import active_ability, passive_ability
from rise.statistics.armor import Armor
from rise.statistics.character_class import CharacterClass
from rise.statistics.race import Race
from rise.statistics.shield import Shield
from rise.statistics.size import Size
from rise.statistics.weapon import Weapon
from rise.latex.util import latexify

cache = None

def get_sample_creatures():
    global cache
    if not cache:
        cache = generate_sample_creatures()

    return cache

def generate_sample_creatures():
    global cache

    samples = {}
    samples['aboleth'] = Creature(
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

    cache = samples
    return cache
