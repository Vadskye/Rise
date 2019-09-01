#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify

def generate_implements():
    implements = []

    implements.append(MagicItem(
        name="Spell Wand, 1st",
        level=5,
        material_type='Wand',
        tags=[],
        description="""
            This wand grants you knowledge of a single 1st level spell.
            You must have access to the \\glossterm<mystic sphere> that spell belongs to.
        """,
        short_description="Grants knowledge of a 1st level spell",
    ))

    implements.append(MagicItem(
        name="Spell Wand, 2nd",
        level=9,
        material_type='Wand',
        tags=[],
        description="""
            This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single 2nd level spell.
        """,
        short_description="Grants knowledge of a 2nd level spell",
    ))

    implements.append(MagicItem(
        name="Spell Wand, 3rd",
        level=13,
        material_type='Wand',
        tags=[],
        description="""
            This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single 3rd level spell.
        """,
        short_description="Grants knowledge of a 3rd level spell",
    ))

    implements.append(MagicItem(
        name="Spell Wand, 4th",
        level=17,
        material_type='Wand',
        tags=[],
        description="""
            This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single 4th level spell.
        """,
        short_description="Grants knowledge of a 4th level spell",
    ))

    implements.append(MagicItem(
        name="Staff of Transit",
        level=6,
        material_type='Staff',
        tags=[],
        description="""
            Your \\glossterm<magical> abilities have the maximum distance they can \\glossterm<teleport> targets doubled.
        """,
        short_description="Doubles your teleportation distance",
    ))

    implements.append(MagicItem(
        name="Extending Staff",
        level=10,
        material_type='Staff',
        description="""
            You double the range of your \\glossterm<magical> abilities.
        """,
        short_description="Doubles range",
    ))

    implements.append(MagicItem(
        name="Extending Staff, Greater",
        level=19,
        material_type='Staff',
        description="""
            You triple the range of your \\glossterm<magical> abilities.
        """,
        short_description="Triples range",
    ))

    implements.append(MagicItem(
        name="Reaching Staff",
        level=12,
        material_type='Staff',
        description="""
            Spells you cast with this staff automatically have the benefits of the Reach augment, if applicable (see \\pcref<Augment Descriptions>).
        """,
        short_description="Allows casting from a short distance away",
    ))

    implements.append(MagicItem(
        name="Protective Staff",
        level=5,
        material_type='Staff',
        tags=[],
        description="""
            You gain a +1 \\glossterm<magic bonus> to Armor defense.
        """,
        short_description="Grants +1 Armor defense",
    ))

    implements.append(MagicItem(
        name="Protective Staff, Greater",
        level=14,
        material_type='Staff',
        tags=[],
        description="""
            You gain a +2 \\glossterm<magic bonus> to Armor defense.
        """,
        short_description="Grants +2 Armor defense",
    ))

    implements.append(MagicItem(
        name="Staff of Expansion",
        level=7,
        material_type='Staff',
        tags=[],
        description="""
            When you use a \\glossterm<magical> ability that creates a \\glossterm<zone> or \\glossterm<emanation>, you can increase the size of the area by one size category, up to a maximum of \\areahuge.
            You can only increase the area of one ability at a time in this way.
            If you increase the area of another ability or lose this staff, the area of the original ability returns to its normal size.
        """,
        short_description="Increases area of emanations",
    ))

    implements.append(MagicItem(
        name="Staff of Expansion, Greater",
        level=16,
        material_type='Staff',
        tags=[],
        description="""
            This item functions like a \\textit<staff of expansion>, except that it increases the area by two size categories.
            In addition, the maximum area is a 200 foot radius, which is one size category larger than \\areahuge.
        """,
        short_description="Greatly increases area of emanations",
    ))

    implements.append(MagicItem(
        name="Staff of Focus",
        level=6,
        material_type='Staff',
        description="""
            You reduce your \\glossterm<focus penalties> by 1.
        """,
        short_description="Reduces \\glossterm<focus penalties> by 1",
    ))

    implements.append(MagicItem(
        name="Staff of Focus, Greater",
        level=15,
        material_type='Staff',
        description="""
            You reduce your \\glossterm<focus penalties> by 2.
        """,
        short_description="Reduces \\glossterm<focus penalties> by 2.",
    ))

    implements.append(MagicItem(
        name="Staff of Power",
        level=8,
        material_type='Staff',
        tags=[],
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<magical> abilities.
        """,
        short_description="Grants +2 \\glossterm<magical> power",
    ))

    implements.append(MagicItem(
        name="Staff of Power, Greater",
        level=17,
        material_type='Staff',
        tags=[],
        description="""
            You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<magical> abilities.
        """,
        short_description="Grants +4 \\glossterm<magical> power",
    ))

    implements.append(MagicItem(
        name="Staff of Precision",
        level=8,
        material_type='Staff',
        tags=[],
        description="""
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy>.
        """,
        short_description="Grants +1 accuracy",
    ))

    implements.append(MagicItem(
        name="Staff of Precision, Greater",
        level=17,
        material_type='Staff',
        tags=[],
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<accuracy>.
        """,
        short_description="Grants +2 accuracy",
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
    rows = [item.latex_table_row() for item in implements]
    row_text = '\n'.join(rows)
    return latexify(f"""
        \\begin<longtabuwrapper>
            \\begin<longtabu><l l l X l>
                \\lcaption<Implement Items> \\\\
                \\tb<Name> & \\tb<Level> & \\tb<Typical Price> & \\tb<Description> & \\tb<Page> \\tableheaderrule
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
