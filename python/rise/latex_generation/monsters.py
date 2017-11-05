#!/usr/bin/env python3

import click
from rise.latex.monster import Monster
from rise.statistics.character_class import CharacterClass
from rise.statistics.creature import Creature
from rise.statistics.race import Race
from rise.statistics.weapon import Weapon
from rise.latex.util import latexify

def generate_monsters():
    creatures = []
    creatures.append(Creature(
        character_class=CharacterClass('behemoth'),
        level=3,
        name='Bear',
        name_suffix='Black',
        natural_armor=4,
        race=Race('animal'),
        starting_attributes=[3, 1, 2, -7, 1, 0],
        weapons=[Weapon('bite'), Weapon('claw')],
    ))

    monsters = []
    for creature in creatures:
        monsters.append(Monster.from_creature(creature))

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
