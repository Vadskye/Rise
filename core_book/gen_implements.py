#!/usr/bin/env python3

import click
from generation.magic_item import MagicItem
from generation.util import latexify

def generate_implements():
    implements = []

    implements.append(MagicItem(
        name="Staff of Sympathetic Shielding",
        level=8,
        material_type='staff',
        tags=['Shielding'],
        description="""
            Whenever you cast a \\glossterm<Shielding> spell that targets creatures, you may also target yourself.
        """,
    ))

    implements.append(MagicItem(
        name="Staff of Transit",
        level=5,
        material_type='staff',
        tags=['Teleportation'],
        description="""
            The maximum distance you can teleport with your \\glossterm<Teleportation> spells is doubled.
        """,
    ))

    implements.append(MagicItem(
        name="Spellfeeding Staff",
        level=6,
        material_type='staff',
        tags=['Life'],
        description="""
            Whenever you cast a spell other than a \\glossterm<cantrip>, you heal hit points equal to your level.
        """,
    ))

    implements.append(MagicItem(
        name="Spellfeeding Staff, Greater",
        level=14,
        material_type='staff',
        tags=['Life'],
        description="""
            Whenever you cast a spell other than a \\glossterm<cantrip>, you heal hit points equal to twice your level.
        """,
    ))

    implements.append(MagicItem(
        name="Wand of Spell Focus",
        level=4,
        material_type='wand',
        tags=['Thaumaturgy'],
        description="""
            You gain a +1 bonus to spellpower with a particular spell.
            Many \\textit<wands of spell focus> exist, each for different spells.
        """,
    ))

    implements.append(MagicItem(
        name="Wand of Spell Focus, Greater",
        level=12,
        material_type='wand',
        tags=['Thaumaturgy'],
        description="""
            You gain a +2 bonus to spellpower with a particular spell.
            Many \\textit<greater wands of spell focus> exist, each for different spells.
        """,
    ))

    return implements

def sanity_check(implements):
    pass

def generate_implement_latex(check=False):
    implements = sorted(generate_implements(), key=lambda implements: implements.name)
    if check:
        sanity_check(implements)

    texts = []
    for item in implements:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e

    text = '\n'.join(texts)
    return latexify(text)

@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    text = generate_implement_latex()
    if output is None:
        print(text)
    else:
        with open(output, 'w') as of:
            of.write(text)


if __name__ == "__main__":
    main()
