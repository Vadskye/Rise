import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify


def generate_tools():
    tools = []

    tools.append(MagicItem(
        name="Cleansing Potion",
        level=11,
        material_type='Potion',
        tags=[],
        description="""
            When you drink this \\glossterm<potion>, you remove your most recent \\glossterm<condition>.
            This cannot remove a condition applied during the current round.
        """,
        short_description="Removes a condition",
    ))

    tools.append(MagicItem(
        name="Cleansing Potion, Greater",
        level=17,
        material_type='Potion',
        tags=[],
        description="""
            When you drink this \\glossterm<potion>, you remove your two most recent \\glossterm<conditions>.
            This cannot remove a condition applied during the current round.
        """,
        short_description="Removes two conditions",
    ))

    tools.append(MagicItem(
        name="Potion of Wound Closure",
        level=1,
        material_type='Potion',
        tags=[],
        description="""
            When you drink this \\glossterm<potion>, you gain a +1 bonus to the \\glossterm<wound roll> of your most recent \\glossterm<vital wound>.
            The \\glossterm<wound roll> for that \\glossterm<vital wound> cannot be modified again.
        """,
        short_description="Grants +1 bonus to a \\glossterm<wound roll>",
    ))

    tools.append(MagicItem(
        name="Potion of Wound Closure, Greater",
        level=7,
        material_type='Potion',
        tags=[],
        description="""
            When you drink this \\glossterm<potion>, you gain a +2 bonus to the \\glossterm<wound roll> of your most recent \\glossterm<vital wound>.
            The \\glossterm<wound roll> for that \\glossterm<vital wound> cannot be modified again.
        """,
        short_description="Grants +2 bonus to a \\glossterm<wound roll>",
    ))

    tools.append(MagicItem(
        name="Potion of Wound Closure, Supreme",
        level=13,
        material_type='Potion',
        tags=[],
        description="""
            When you drink this \\glossterm<potion>, you gain a +3 bonus to the \\glossterm<wound roll> of your most recent \\glossterm<vital wound>.
            The \\glossterm<wound roll> for that \\glossterm<vital wound> cannot be modified again.
        """,
        short_description="Grants +3 bonus to a \\glossterm<wound roll>",
    ))

    tools.append(MagicItem(
        name="Potion of Healing",
        level=3,
        material_type='Potion',
        tags=[],
        description="""
            When you drink this \\glossterm<potion>, you heal one \\glossterm<hit point>.
        """,
        short_description="Restores one hit point",
    ))

    tools.append(MagicItem(
        name="Potion of Healing, Greater",
        level=9,
        material_type='Potion',
        tags=[],
        description="""
            When you drink this \\glossterm<potion>, you heal two \\glossterm<hit points>.
        """,
        short_description="Restores two hit points",
    ))

    tools.append(MagicItem(
        name="Potion of Healing, Supreme",
        level=15,
        material_type='Potion',
        tags=[],
        description="""
            When you drink this \\glossterm<potion>, you heal three \\glossterm<hit point>.
        """,
        short_description="Restores three hit points",
    ))

    return tools

def generate_tool_latex(check=False):
    tools = sorted(generate_tools(), key=lambda tools: tools.name)

    texts = []
    for item in tools:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e

    text = '\n'.join(texts)
    return latexify(text)

def generate_tool_table():
    tools = sorted(
        sorted(generate_tools(), key=lambda item: item.name),
        key=lambda item: item.level
    )
    rows = [item.latex_table_row() for item in tools]
    row_text = '\n'.join(rows)
    return latexify(f"""
        \\begin<longtabuwrapper>
            \\begin<longtabu><l l l X l>
                \\lcaption<Tool Items> \\\\
                \\tb<Name> & \\tb<Level> & \\tb<Typical Price> & \\tb<Description> & \\tb<Page> \\tableheaderrule
                {row_text}
            \\end<longtabu>
        \\end<longtabuwrapper>
    """)


def write_to_file():
    tool_latex = generate_tool_latex()
    tool_table = generate_tool_table()
    with open(book_path('tools.tex'), 'w') as tool_description_file:
        tool_description_file.write(tool_latex)
    with open(book_path('tools_table.tex'), 'w') as tool_table_file:
        tool_table_file.write(tool_table)


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_tool_latex())


if __name__ == "__main__":
    main()
