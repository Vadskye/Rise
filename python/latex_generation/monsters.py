#!/usr/bin/env python3

import click
from latex.monster import Monster
from latex.util import latexify

def generate_monsters():
    monsters = []
    monsters.append(Monster(
        name='Bear',
        level=3,
        name_suffix='Black',
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
