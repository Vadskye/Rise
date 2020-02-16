import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify


def generate_tools():
    tools = []

    tools.append(MagicItem(
        consumable=True,
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
        consumable=True,
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
        consumable=True,
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
        consumable=True,
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
        consumable=True,
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
        consumable=True,
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
        consumable=True,
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
        consumable=True,
        name="Potion of Healing, Supreme",
        level=15,
        material_type='Potion',
        tags=[],
        description="""
            When you drink this \\glossterm<potion>, you heal three \\glossterm<hit point>.
        """,
        short_description="Restores three hit points",
    ))


    # Alchemical items

    tools.append(MagicItem(
        consumable=True,
        name="Alchemist's Fire",
        level=0.5,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can throw this item at a creature or object within \\rngclose range.
            When you do, make an attack vs. Armor against the target.
            On a hit, the target takes fire \\glossterm<standard damage>.
        """,
        short_description="Throw to deal fire damage",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Smokestick",
        level=1,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can activate this item and optionally throw it anywhere within \\rngclose range.
            When you do, it immediately creates a cloud of smoke in a \\areasmall radius from its location.
            Looking through 10 feet of smoke is enough to completely block line of sight.
            The cloud of smoke dissipates normally after it is created.
        """,
        short_description="Creates a cloud of smoke",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Tindertwig",
        level=0.5,
        material_type='Alchemy',
        tags=[],
        description="""
            As a minor action, you can activate this small, wooden stick by striking it against any hard surface.
            When you do, it bursts into flame, allowing you to light other fires with it.
        """,
        short_description="Quickly activated flame",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Flash Powder",
        level=0.5,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can throw this powder in the air in your location.
            When you do, it emits a brief burst of bright light in a 50 foot radius and shadowy light in a 100 foot radius.
        """,
        short_description="Emits burst of bright light",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Thunderstone",
        level=3,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can throw this item at a creature within \\rngclose range.
            When you do, make an attack vs. Fortitude against the target.
            On a hit, the target is \\glossterm<deafened> as a \\glossterm<condition>.
        """,
        short_description="Deafens a foe",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Snowball",
        level=3,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can throw this item at a creature or object within \\rngclose range.
            When you do, make an attack vs. Fortitude against the target.
            On a hit, the target takes cold \\glossterm<standard damage>.
        """,
        short_description="Throw to deal cold damage",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Antitoxin Elixir",
        level=4,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can drink this elixir.
            When you do, it imbues your body with a resistance to poisons for 5 minutes.
            During that time, you may treat your Fortitude defense as if it was equal to 10 \\add this item's power for the purpose of resisting poisons.
        """,
        short_description="Resists poisons",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Enduring Antitoxin Elixir",
        level=7,
        material_type='Alchemy',
        tags=[],
        description="""
            This item functions like an \\mitem<antitoxin elixir>, except that the effect lasts for 8 hours.
        """,
        short_description="Resists poisons for 8 hours",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Sunrod",
        level=3,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can activate this item.
            When you do, it shines bright light in a 50 foot radius and dim light in a 100 foot radius for 5 minutes.
        """,
        short_description="Emits bright light continuously",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Enduring Sunrod",
        level=6,
        material_type='Alchemy',
        tags=[],
        description="""
            This item functions like a \\mitem<sunrod>, except that the effect lasts for 8 hours.
        """,
        short_description="Emits bright light continuously",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Tanglefoot Bag",
        level=3,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can throw this item at a creature within \\rngclose range.
            When you do, make an attack vs. Reflex against the target.
            On a hit, the target is \\glossterm<slowed> as a \\glossterm<condition>.

            Whenever the target takes a \\glossterm<move action>, it can make a Strength check as part of the movement.
            If it beats a \\glossterm<difficulty rating> equal to 2 \\add this item's power, the condition is removed after the movement is complete.
        """,
        short_description="Slows a foe",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Everburning Torch",
        level=3,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can activate this item.
            When you do, it sheds light like a torch for a week.
        """,
        short_description="Emits light like a torch for a week",
    ))

    tools.append(MagicItem(
        consumable=True,
        name="Acid Flask",
        level=0.5,
        material_type='Alchemy',
        tags=[],
        description="""
            As a standard action, you can throw this item at a creature or object within \\rngclose range.
            When you do, make an attack vs. Armor against the target.
            On a hit, the target takes acid \\glossterm<standard damage>.
        """,
        short_description="Throw to deal acid damage",
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
