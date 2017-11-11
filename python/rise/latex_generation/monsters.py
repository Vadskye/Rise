#!/usr/bin/env python3

import click
from rise.latex.monster import get_latex_from_creature
from rise.statistics.armor import Armor
from rise.statistics.character_class import CharacterClass
from rise.statistics.creature import Creature
from rise.statistics.race import Race
from rise.statistics.size import Size
from rise.statistics.weapon import Weapon
from rise.latex.util import latexify


def aberrations():
    monsters = []

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('adept'),
            level=12,
            name='Aboleth',
            natural_armor=6,
            race=Race('aberration'),
            size=Size('huge'),
            starting_attributes=[2, 0, 3, 2, 1, 3],
            weapons=[Weapon('tentacle')],
        ),
    ))

    return '\n\n'.join(monsters)


def animals():
    monsters = []

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('behemoth'),
            level=3,
            name='Bear',
            name_suffix='Black',
            natural_armor=4,
            race=Race('animal'),
            starting_attributes=[3, 1, 2, -7, 1, 0],
            weapons=[Weapon('bite'), Weapon('claw')],
        ),
        immunities=['staggered'],
    ))

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('behemoth'),
            level=6,
            name='Bear',
            natural_armor=4,
            name_suffix='Brown',
            race=Race('animal'),
            size=Size('large'),
            starting_attributes=[3, 1, 2, -7, 1, 0],
            weapons=[Weapon('bite'), Weapon('claw')],
        ),
        immunities=['staggered'],
    ))

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('slayer'),
            level=5,
            name='Dire Wolf',
            natural_armor=4,
            race=Race('animal'),
            size=Size('large'),
            starting_attributes=[3, 3, 1, -6, 2, 0],
            weapons=[Weapon('bite')],
        ),
    ))

    return '\n\n'.join(monsters)


def humanoids():
    monsters = []

    monsters.append(get_latex_from_creature(
        Creature(
            armor=Armor('breastplate'),
            character_class=CharacterClass('adept'),
            level=1,
            name='Cultist',
            race=Race('humanoid'),
            starting_attributes=[0, 0, 0, -1, -1, 3],
            weapons=[Weapon('club')],
        ),
    ))

    return '\n\n'.join(monsters)


def magical_beasts():
    monsters = []

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('slayer'),
            level=6,
            name='Ankheg',
            natural_armor=6,
            race=Race('magical beast'),
            size=Size('large'),
            starting_attributes=[3, 2, 1, -7, 1, 0],
            weapons=[Weapon('bite')],
        ),
    ))

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('adept'),
            level=5,
            name='Aranea',
            natural_armor=4,
            race=Race('magical beast'),
            starting_attributes=[0, 2, 0, 2, 1, 3],
            weapons=[Weapon('bite')],
        ),
    ))

    return '\n\n'.join(monsters)


def monstrous_humanoids():
    monsters = []

    monsters.append(get_latex_from_creature(
        Creature(
            armor=Armor('breastplate'),
            character_class=CharacterClass('slayer'),
            level=15,
            name='Giant',
            name_suffix='Storm',
            natural_armor=4,
            race=Race('monstrous humanoid'),
            size=Size('gargantuan'),
            starting_attributes=[3, 0, 2, 1, 2, 1],
            weapons=[Weapon('greatsword')],
        ),
    ))

    return '\n\n'.join(monsters)


def outsiders():
    monsters = []

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('adept'),
            level=14,
            name='Angel',
            name_suffix='Astral Deva',
            natural_armor=6,
            race=Race('outsider'),
            starting_attributes=[2, 2, 2, 2, 2, 2],
            weapons=[Weapon('greatsword')],
        ),
    ))

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('slayer'),
            level=3,
            name='Arrowhawk',
            natural_armor=4,
            race=Race('outsider'),
            starting_attributes=[1, 4, -1, 0, 3, 0],
            weapons=[Weapon('bite')],
        ),
    ))

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('slayer'),
            level=11,
            name='Demon',
            name_suffix='Bebelith',
            natural_armor=6,
            race=Race('outsider'),
            size=Size('huge'),
            starting_attributes=[2, 3, 2, 0, 1, 0],
            weapons=[Weapon('bite')],
        ),
    ))

    return '\n\n'.join(monsters)


def undead():
    monsters = []

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('adept'),
            level=4,
            name='Allip',
            natural_armor=4,  # How does this interact with being incorporeal?
            race=Race('undead'),
            starting_attributes=[0, 3, 0, 0, 0, 3],
            weapons=[Weapon('draining touch')],
        ),
    ))

    return '\n\n'.join(monsters)


def generate_monsters():
    monsters = f"""
        \\section<Aberrations>
        {aberrations()}


        \\section<Animals>
        {animals()}

        \\section<Humanoids>
        {humanoids()}

        \\section<Magical Beasts>
        {magical_beasts()}

        \\section<Monstrous Humanoids>
        {monstrous_humanoids()}

        \\section<Outsiders>
        {outsiders()}

        \\section<Undead>
        {undead()}
    """

    return monsters


def sanity_check(monsters):
    pass


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    monster_text = generate_monsters()
    text = latexify(f"""
        \\chapter<Monsters>
        {monster_text}
    """)
    if output is None:
        print(text)
    else:
        with open(output, 'w') as of:
            of.write(text)


if __name__ == "__main__":
    main()
