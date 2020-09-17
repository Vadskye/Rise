#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify, longtablify

def generate_implements():
    implements = []

    implements += [
        MagicItem(
            name="Spell Wand, 1st",
            level=5,
            material_type='Wand',
            tags=[],
            description="""
                This wand grants you knowledge of a single rank 1 spell.
                You must have access to the \\glossterm<mystic sphere> that spell belongs to.
            """,
            short_description="Grants knowledge of a rank 1 spell",
        ),
        MagicItem(
            name="Spell Wand, 2nd",
            level=8,
            material_type='Wand',
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 2 spell.
            """,
            short_description="Grants knowledge of a rank 2 spell",
        ),
        MagicItem(
            name="Spell Wand, 3rd",
            level=11,
            material_type='Wand',
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 3 spell.
            """,
            short_description="Grants knowledge of a rank 3 spell",
        ),
        MagicItem(
            name="Spell Wand, 4th",
            level=14,
            material_type='Wand',
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 4 spell.
            """,
            short_description="Grants knowledge of a rank 4 spell",
        ),
        MagicItem(
            name="Spell Wand, 5th",
            level=17,
            material_type='Wand',
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 5 spell.
            """,
            short_description="Grants knowledge of a rank 5 spell",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of Transit",
            level=6,
            material_type='Staff',
            tags=[],
            description="""
                Your \\glossterm<magical> abilities have the maximum distance they can \\glossterm<teleport> targets doubled.
            """,
            short_description="Doubles your teleportation distance",
        ),
        MagicItem(
            name="Staff of Transit, Greater",
            level=12,
            material_type='Staff',
            tags=[],
            description="""
                Your \\glossterm<magical> abilities have the maximum distance they can \\glossterm<teleport> targets tripled.
            """,
            short_description="Triples your teleportation distance",
        ),
        MagicItem(
            name="Staff of Transit, Supreme",
            level=18,
            material_type='Staff',
            tags=[],
            description="""
                Your \\glossterm<magical> abilities have the maximum distance they can \\glossterm<teleport> targets quadrupled.
            """,
            short_description="Quadruples your teleportation distance",
        )
    ]

    implements += [
        MagicItem(
            name="Extending Staff",
            level=9,
            material_type='Staff',
            description="""
                You double the range of your \\glossterm<magical> abilities.
            """,
            short_description="Doubles range",
        ),
        MagicItem(
            name="Extending Staff, Greater",
            level=15,
            material_type='Staff',
            description="""
                You triple the range of your \\glossterm<magical> abilities.
            """,
            short_description="Triples range",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of Giants",
            level=6,
            material_type='Staff',
            description="""
                Whenever you use a \\glossterm<magical> ability that has a maximum size category for its targets or any objects it creates, you increase that maximum by one size category, to a maximum of Colossal.
                This does not affect abilities that create creatures of a particular size.
            """,
            short_description="Increases maximum size category of abilities",
        ),
        MagicItem(
            name="Staff of Giants, Greater",
            level=12,
            material_type='Staff',
            description="""
                This implement functions like a \\mitem<staff of giants> implement, except that the maximum size category increases by two size categories.
            """,
            short_description="Significantly increaases maximum size category of abilities",
        ),
        MagicItem(
            name="Staff of Giants, Supreme",
            level=18,
            material_type='Staff',
            description="""
                This implement functions like a \\mitem<staff of giants> implement, except that the maximum size category increases by three size categories.
            """,
            short_description="Drastically increaases maximum size category of abilities",
        ),
    ]

    implements += [
        MagicItem(
            name="Selective Staff",
            level=9,
            material_type='Staff',
            tags=[],
            description="""
                Whenever you use a \\glossterm<magical> ability that affects an area and does not have the \\glossterm<Sustain> or \\glossterm<Attune> tags, you can freely exclude any areas from the ability's effect.
                All squares in the final area of the spell must be contiguous.
                You cannot create split a spell's area into multiple completely separate areas.
            """,
            short_description="Allows excluding areas",
        ),
        MagicItem(
            name="Selective Staff, Greater",
            level=15,
            material_type='Staff',
            tags=[],
            description="""
                This implement functions like a \\mitem<selective staff> implement, except that you can split the spell's area into two completely separate areas.
                If you do, each of those two areas must be independently contiguous.
            """,
            short_description="Allows excluding and splitting areas",
        )
    ]

    implements += [
        MagicItem(
            name="Staff of Silence",
            level=9,
            material_type='Staff',
            tags=[],
            description="""
                You can cast spells without using \\glossterm<verbal components>.
            """,
            short_description="Allows casting spells without verbal components",
        ),
        MagicItem(
            name="Staff of Stillness",
            level=9,
            material_type='Staff',
            tags=[],
            description="""
                You can cast spells without using \\glossterm<somatic components>.
            """,
            short_description="Allows casting spells without somatic components",
        ),
        MagicItem(
            name="Staff of Tranquility",
            level=15,
            material_type='Staff',
            tags=[],
            description="""
                You can cast spells without using \\glossterm<verbal components> or \\glossterm<somatic components>.
            """,
            short_description="Allows casting spells without components",
        ),
    ]

    implements += [
        MagicItem(
            name="Reaching Staff",
            level=12,
            material_type='Staff',
            description="""
                Whenever you use a \\glossterm<magical> ability that does not have the \\glossterm<Sustain> or \\glossterm<Attune> tags, you may choose a location within \\rngclose range.
                The ability takes effect as if you were in the chosen location.
                This affects your \\glossterm<line of effect> for the ability, but not your \\glossterm<line of sight> (since you still see from your normal location).
                % Wording?
                Since an ability's range is measured from your location, this item can allow you to affect targets outside your normal range.
                For example, a cone that normally bursts out from you would instead originate from your chosen location, potentially avoiding an obstacle between you and your target.
            """,
            short_description="Allows ability use from a short distance away",
        ),
        MagicItem(
            name="Reaching Staff, Greater",
            level=18,
            material_type='Staff',
            description="""
                This implement functions like a \\textit<reaching staff> implement, except that the range increases to \\rngmed range.
            """,
            short_description="Allows ability use from a distance away",
        ),
    ]


    implements.append(MagicItem(
        name="Cryptic Staff",
        level=8,
        material_type='Staff',
        tags=[],
        description="""
            Whenever you cast a spell, you may choose a different spell you know.
            If you do, the visual effects and magical aura of the spell you are casting change to match your chosen spell.
            This affects inspection of the spell itself by any means, such as with the Spellsense skill (see \\pcref<Spellsense>).
            However, it does not alter the mechanical effects of the spell in any way.

            An observer can make a Spellsense check with a \\glossterm<difficulty rating> of 15 \\add your magical \\glossterm<power> to identify the spell's true nature, with a minimum \\glossterm<difficulty rating> of 23.
            If the spell's effects depend on visual components, the spell may fail to work if you alter the spell's visuals too much.
        """,
        short_description="Makes spells hard to identify",
    ))

    implements += [
        MagicItem(
            name="Protective Staff",
            # +2 level since staff is secondary for this effect
            level=7,
            material_type='Staff',
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +1 Armor defense",
        ),
        MagicItem(
            name="Protective Staff, Greater",
            level=13,
            material_type='Staff',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +2 Armor defense",
        ),
        MagicItem(
            name="Protective Staff, Supreme",
            level=19,
            material_type='Staff',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +3 Armor defense",
        ),
    ]

    implements += [
        MagicItem(
            name="Widening Staff",
            level=12,
            material_type='Staff',
            tags=[],
            description="""
                Whenever you use a \\glossterm<magical> ability that affects an area and does not have the \\glossterm<Attune> or \\glossterm<Sustain> tags, you may double its area.
            """,
            short_description="Doubles area size",
        ),
        MagicItem(
            name="Widening Staff, Greater",
            level=18,
            material_type='Staff',
            tags=[],
            description="""
                This implement functions like a \\textit<widening staff> implement, except that it triples the area instead of doubling it.
            """,
            short_description="Triples area size",
        ),
    ]

    implements.append(MagicItem(
        name="Staff of Focus",
        level=5,
        material_type='Staff',
        description="""
            You reduce your \\glossterm<focus penalty> by 1.
        """,
        short_description="Reduces \\glossterm<focus penalty> by 1",
    ))

    implements += [
        MagicItem(
            name="Staff of Power",
            level=8,
            material_type='Staff',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<magical> abilities.
            """,
            short_description="Grants +2 \\glossterm<magical> power",
        ),
        MagicItem(
            name="Staff of Power, Greater",
            level=14,
            material_type='Staff',
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<magical> abilities.
            """,
            short_description="Grants +4 \\glossterm<magical> power",
        ),
        MagicItem(
            name="Staff of Power, Supreme",
            level=20,
            material_type='Staff',
            tags=[],
            description="""
                You gain a +6 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<magical> abilities.
            """,
            short_description="Grants +6 \\glossterm<magical> power",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of Precision",
            level=8,
            material_type='Staff',
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy>.
            """,
            short_description="Grants +1 accuracy",
        ),
        MagicItem(
            name="Staff of Precision, Greater",
            level=14,
            material_type='Staff',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<accuracy>.
            """,
            short_description="Grants +2 accuracy",
        ),
        MagicItem(
            name="Staff of Precision, Supreme",
            level=20,
            material_type='Staff',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to \\glossterm<accuracy>.
            """,
            short_description="Grants +3 accuracy",
        ),
    ]

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
    return longtablify(f"""
        \\lcaption<Implement Items> \\\\
        \\tb<Name> & \\tb<Level> & \\tb<Typical Price> & \\tb<Description> & \\tb<Page> \\tableheaderrule
        {row_text}
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
