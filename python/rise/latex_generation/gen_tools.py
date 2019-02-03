import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify


def generate_tools():
    tools = []

    tools.append(MagicItem(
        name="Potion (1st)",
        level=0.5,
        material_type='potion',
        tags=[],
        description="""
            This potion contains the power of a 1st level \\glossterm<targeted> spell that does not have the \\glossterm<Attune> or \\glossterm<Sustain> tags.
            As a \\glossterm<standard action>, you can spend an \\glossterm<action point> to drink this potion.
            When you do, if your \\glossterm<power> is at least as high as this item's \\glossterm<power>, the spell takes effect on you.
            You are the only target of the spell.
            If your \\glossterm<power> is less than the item's \\glossterm<power>, the overwhelming magical energy instead deals \\glossterm<standard damage> -1d to you.

            After this potion has been used, its magic is expended.
        """,
        short_description="Casts a 1st level spell on you",
    ))

    tools.append(MagicItem(
        name="Potion (2nd)",
        level=1,
        material_type='potion',
        tags=[],
        description="""
            This item functions like a 1st level potion, except that it contains a 2nd level spell.
        """,
        short_description="Casts a 2nd level spell on you",
    ))

    tools.append(MagicItem(
        name="Potion (3rd)",
        level=4,
        material_type='potion',
        tags=[],
        description="""
            This item functions like a 1st level potion, except that it contains a 3rd level spell.
        """,
        short_description="Casts a 3rd level spell on you",
    ))

    tools.append(MagicItem(
        name="Potion (4th)",
        level=7,
        material_type='potion',
        tags=[],
        description="""
            This item functions like a 1st level potion, except that it contains a 4th level spell.
        """,
        short_description="Casts a 4th level spell on you",
    ))

    tools.append(MagicItem(
        name="Potion (5th)",
        level=10,
        material_type='potion',
        tags=[],
        description="""
            This item functions like a 1st level potion, except that it contains a 5th level spell.
        """,
        short_description="Casts a 5th level spell on you",
    ))

    tools.append(MagicItem(
        name="Potion (6th)",
        level=13,
        material_type='potion',
        tags=[],
        description="""
            This item functions like a 1st level potion, except that it contains a 6th level spell.
        """,
        short_description="Casts a 6th level spell on you",
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
                \\lcaption<tool Items> \\\\
                \\tb<Name> & \\tb<Level> & \\tb<Typical Price> & \\tb<Description> & \\tb<Page> \\\\
                \\bottomrule
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
