#!/usr/bin/env python3

import click
from rise.latex.monster import get_latex_from_creature
from rise.statistics.armor import Armor
from rise.statistics.character_class import CharacterClass
from rise.statistics.creature import Creature
from rise.statistics.race import Race
from rise.statistics.weapon import Weapon
from rise.latex.util import latexify

def generate_monsters():
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
            immunities=['staggered'],
        ),
    ))

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('behemoth'),
            level=6,
            name='Bear',
            natural_armor=4,
            name_suffix='Brown',
            race=Race('animal'),
            starting_attributes=[3, 1, 2, -7, 1, 0],
            weapons=[Weapon('bite'), Weapon('claw')],
            immunities=['staggered'],
        ),
    ))

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('adept'),
            level=12,
            name='Aboleth',
            natural_armor=6,
            race=Race('aberration'),
            starting_attributes=[2, 0, 3, 2, 1, 3],
            weapons=[Weapon('tentacle')],
        ),
    ))

    monsters.append(get_latex_from_creature(
        Creature(
            armor=[Armor('breastplate')],
            character_class=CharacterClass('adept'),
            level=1,
            name='Cultist',
            race=Race('humanoid'),
            starting_attributes=[0, 0, 0, -1, -1, 3],
            weapons=[Weapon('club')],
        ),
    ))

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('slayer'),
            level=6,
            name='Ankheg',
            natural_armor=6,
            race=Race('magical beast'),
            starting_attributes=[3, 2, 1, -7, 1, 0],
            weapons=[Weapon('club')],
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
            starting_attributes=[2, 3, 2, 0, 1, 0],
            weapons=[Weapon('bite')],
        ),
    ))

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

    return monsters


def sanity_check(monsters):
    pass


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    monsters = generate_monsters()
    if check:
        sanity_check(monsters)
    monster_texts = []
    for monster in monsters:
        try:
            monster_texts.append(monster.to_latex())
        except Exception as e:
            raise Exception(f"Error converting monster '{monster.name}' to LaTeX") from e
    monster_texts = latexify("""
        \\chapter<Monsters>
        \\section<Monster Descriptions>
        {}
    """.format('\n'.join(monster_texts)))
    if output is None:
        print(monster_texts)
    else:
        with open(output, 'w') as of:
            of.write(monster_texts)


if __name__ == "__main__":
    main()
