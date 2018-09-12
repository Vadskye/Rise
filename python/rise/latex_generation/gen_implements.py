#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify

def generate_implements():
    implements = []

    implements.append(MagicItem(
        name="Wand of Sympathetic Shielding",
        level=8,
        material_type='wand',
        tags=['Shielding'],
        description="""
            When you cast a \\glossterm<targeted> \\glossterm<Shielding> spell using this wand,
                if you would be a valid target for the spell,
                you can target yourself in addition to the spell's normal targets.
        """,
        short_description="Shields you when shielding others",
    ))

    implements.append(MagicItem(
        name="Wand of Transit",
        level=6,
        material_type='wand',
        tags=['Teleportation'],
        description="""
            When you cast a \\glossterm<Teleportation> spell using this wand,
                the maximum distance that you can teleport targets with that spell is doubled.
        """,
        short_description="Doubles your teleportation distance",
    ))

    implements.append(MagicItem(
        name="Spellfeeding Staff",
        level=6,
        material_type='staff',
        tags=['Life'],
        description="""
            Once per round, when you cast a spell other than a \\glossterm<cantrip> using this staff,
                you heal hit points equal to your \\glossterm<power> with the spell cast.
        """,
        short_description="Heals you when casting spells",
    ))

    implements.append(MagicItem(
        name="Spellfeeding Staff, Greater",
        level=14,
        material_type='staff',
        tags=['Life'],
        description="""
            Once per round, when you cast a spell other than a \\glossterm<cantrip> using this staff,
                you heal hit points equal to twice your \\glossterm<power> with the spell cast.
        """,
        short_description="Greatly heals you when casting spells",
    ))

    implements.append(MagicItem(
        name="Staff of Concentration",
        level=3,
        material_type='staff',
        description="""
            You gain a +1 bonus to \\glossterm<concentration> on spells you cast using this staff.
        """,
        short_description="Grants +1 \\glossterm<concentration>",
    ))

    implements.append(MagicItem(
        name="Staff of Concentration, Greater",
        level=8,
        material_type='staff',
        description="""
            You gain a +2 bonus to \\glossterm<concentration> on spells you cast using this staff.
        """,
        short_description="Grants +2 \\glossterm<concentration>",
    ))

    implements.append(MagicItem(
        name="Staff of Concentration, Supreme",
        level=13,
        material_type='staff',
        description="""
            You gain a +3 bonus to \\glossterm<concentration> on spells you cast using this staff.
        """,
        short_description="Grants +3 \\glossterm<concentration>",
    ))

    implements.append(MagicItem(
        name="Staff of Spellpower",
        level=8,
        material_type='staff',
        tags=['Mystic'],
        description="""
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<power> with spells you cast using this staff.
        """,
        short_description="Grants +1 power with spells",
    ))

    implements.append(MagicItem(
        name="Staff of Spellpower, Greater",
        level=14,
        material_type='staff',
        tags=['Mystic'],
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with spells you cast using this staff.
        """,
        short_description="Grants +2 power with spells",
    ))

    implements.append(MagicItem(
        name="Staff of Spellpower, Supreme",
        level=20,
        material_type='staff',
        tags=['Mystic'],
        description="""
            You gain a +3 \\glossterm<magic bonus> to \\glossterm<power> with spells you cast using this staff.
        """,
        short_description="Grants +3 power with spells",
    ))

    implements.append(MagicItem(
        name="Staff of Precision",
        level=10,
        material_type='staff',
        tags=['Mystic'],
        description="""
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with spells you cast using this staff.
        """,
        short_description="Grants +1 accuracy with spells",
    ))

    implements.append(MagicItem(
        name="Greater Staff of Precision",
        level=16,
        material_type='staff',
        tags=['Mystic'],
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<accuracy> with spells you cast using this staff.
        """,
        short_description="Grants +2 accuracy with spells",
    ))

    implements.append(MagicItem(
        name="Wand of Precision",
        level=8,
        material_type='wand',
        tags=['Mystic'],
        description="""
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> if you cast a particular spell or any of its subspells using this wand.
            Many \\textit<wands of precision> exist, each for different spells.
        """,
        short_description="Grants +1 accuracy with a single spell",
    ))

    implements.append(MagicItem(
        name="Wand of Precision, Greater",
        level=14,
        material_type='wand',
        tags=['Mystic'],
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<accuracy> if you cast a particular spell or any of its subspells using this wand.
            Many \\textit<greater wands of precision> exist, each for different spells.
        """,
        short_description="Grants +2 accuracy with a single spell",
    ))

    implements.append(MagicItem(
        name="Wand of Precision, Supreme",
        level=20,
        material_type='wand',
        tags=['Mystic'],
        description="""
            You gain a +3 \\glossterm<magic bonus> to \\glossterm<accuracy> if you cast a particular spell or any of its subspells using this wand.
            Many \\textit<supreme wands of precision> exist, each for different spells.
        """,
        short_description="Grants +3 accuracy with a single spell",
    ))

    implements.append(MagicItem(
        name="Wand of Spellpower",
        level=4,
        material_type='wand',
        tags=['Mystic'],
        description="""
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<power> if you cast a particular spell or any of its subspells using this wand.
            Many \\textit<wands of spellpower> exist, each for different spells.
        """,
        short_description="Grants +1 power with a single spell",
    ))

    implements.append(MagicItem(
        name="Wand of Spellpower, Greater",
        level=10,
        material_type='wand',
        tags=['Mystic'],
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> if you cast a particular spell or any of its subspells using this wand.
            Many \\textit<greater wands of spellpower> exist, each for different spells.
        """,
        short_description="Grants +2 power with a single spell",
    ))

    implements.append(MagicItem(
        name="Wand of Spellpower, Supreme",
        level=16,
        material_type='wand',
        tags=['Mystic'],
        description="""
            You gain a +3 \\glossterm<magic bonus> to \\glossterm<power> if you cast a particular spell or any of its subspells using this wand.
            Many \\textit<supreme wands of spellpower> exist, each for different spells.
        """,
        short_description="Grants +3 power with a single spell",
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

def generate_implement_table():
    implements = sorted(
        sorted(generate_implements(), key=lambda item: item.name),
        key=lambda item: item.level
    )
    rows = [
        f"{item.name} & \\nth<{item.level}> & {item.short_description} & \\pageref<item:{item.name}> \\\\"
        for item in implements
    ]
    row_text = '\n'.join(rows)
    return latexify(f"""
        \\begin<longtabuwrapper>
            \\begin<longtabu><l l X l>
                \\lcaption<Implement Items> \\\\
                \\tb<Name> & \\tb<Level> & \\tb<Description> & \\tb<Page> \\\\
                \\bottomrule
                {row_text}
            \\end<longtabu>
        \\end<longtabuwrapper>
    """)


def write_to_file():
    implement_latex = generate_implement_latex()
    implement_table = generate_implement_table()
    with open(book_path('implements.tex'), 'w') as implement_description_file:
        implement_description_file.write(implement_latex)
    with open(book_path('implements_table.tex'), 'w') as implement_table_file:
        implement_table_file.write(implement_table)


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_implement_latex())


if __name__ == "__main__":
    main()
