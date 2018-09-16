#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.effects import Effects
from rise.latex.header import Header
from rise.latex.spell import Spell
from rise.latex.subspell import Subspell
from rise.latex.util import latexify

def generate_rituals():
    rituals = []

    # rituals.append(Spell(
    #     name="Binding",
    #     base_level=2,
    #     # header=Header("description"),
    #     effects=Effects('Binding', """
    #         This ritual creates a \\areasmall radius zone.
    #         The outlines of the zone are denoted by a magic circle physically inscribed on the ground during the ritual.
    #         The circle is obvious, but a DR 16 Perception or Spellcraft check is required to verify that the circle belongs to a \\ritual<binding> ritual.
    #         If the circle's perimeter is broken by any means, the ritual's effects end immediately.
    #         When a creature enters the area, you make an attack vs. Mental against it.
    #         \\hit The target is unable to escape the ritual's area physically or alter the circle in any way.
    #         It treats the edge of the area as an impassable barrier, preventing the effects of any of its abilities from extending outside that area.
    #         This ritual takes one hour to perform.
    #     """, tags=['Attune (ritual)']),
    #     schools=['Abjuration'],
    #     lists=['Arcane', 'Divine'],
    #     subspells=[
    #         Subspell("Dimension Lock", 5, f"""
    #             This subritual functions like the \\ritual<binding> ritual, except that a struck creature also cannot travel extradimensionally.
    #             This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Teleportation> effects.
    #         """),
    #     ],
    # ))

    # rituals.append(Spell(
    #     name="Nondetection",
    #     base_level=3,
    #     # header=Header("description"),
    #     targeting=Targeting(
    #         target="One creature or object",
    #         time="One hour",
    #         rng='close',
    #     ),
    #     effects=Effects(
    #         effect="""
    #             The target gains \\glossterm<magic resistance> against Awareness and Scrying abilities equal to 5 + your \\glossterm<power>.
    #             In addition, Awareness and Scrying abilities that do not directly affect the target simply treat it as if it did not exist.
    #
    #             This effect lasts as long as you \\glossterm<attune> to it.
    #             If you use this ability multiple times, you can attune to it each time.
    #         """,
    #         tags=['Mystic'],
    #     ),
    #     schools=['Abjuration'],
    #     lists=['Arcane', 'Divine'],
    # ))

    return sorted(rituals, key=lambda ritual: ritual.name)


def generate_ritual_latex():
    rituals = generate_rituals()
    ritual_texts = []
    for ritual in rituals:
        try:
            ritual_texts.append(ritual.to_latex())
        except Exception as e:
            raise Exception(f"Error converting ritual '{ritual.name}' to LaTeX") from e
    return latexify('\n'.join(ritual_texts))


def write_to_file():
    ritual_latex = generate_ritual_latex()
    with open(book_path('ritual_descriptions.tex'), 'w') as ritual_descriptions_file:
        ritual_descriptions_file.write(ritual_latex)


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_ritual_latex())

if __name__ == "__main__":
    main()
