import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify, longtablify

# In general, a rank X potion or alchemical item should be one rank behind an
# equivalent spell. They require no attunement and can be used by anyone, so
# it's dangerous to make them too powerful. However, they also have
# poor/nonexistent level scaling, so they also have to be fairly impactful when
# acquired to worth using at all.
def generate_tools():
    tools = []

    tools += [
        MagicItem(
            consumable=True,
            name="Cleansing Potion",
            level=11,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you remove a \\glossterm<condition>.
                This cannot remove a condition applied during the current round.
            """,
            short_description="Removes a condition",
        ),
        MagicItem(
            consumable=True,
            name="Cleansing Potion, Greater",
            level=17,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you remove two \\glossterm<conditions>.
                This cannot remove a condition applied during the current round.
            """,
            short_description="Removes two conditions",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Potion of Wound Closure",
            level=1,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, if you have a \\glossterm<vital wound> with a \\glossterm<vital roll> of 0, you treat that vital roll as a 1 instead (see \\pcref<Vital Wounds>).
            """,
            short_description="Prevents death from barely lethal vital wounds",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Wound Closure, Greater",
            level=7,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, if you have a \\glossterm<vital wound> with a \\glossterm<vital roll> of 0 or -1, you treat that vital roll as a 1 instead (see \\pcref<Vital Wounds>).
            """,
            short_description="Prevents death from vital wounds",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Wound Closure, Supreme",
            level=13,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, if you have a \\glossterm<vital wound> with a \\glossterm<vital roll> of 0, -1, or -2, you treat that vital roll as a 1 instead (see \\pcref<Vital Wounds>).
            """,
            short_description="Prevents death from major vital wounds",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Wound Closure, Epic",
            level=19,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, if you have a \\glossterm<vital wound> with a \\glossterm<vital roll> of 0, -1, -2, or -3, you treat that vital roll as a 1 instead (see \\pcref<Vital Wounds>).
            """,
            short_description="Prevents death from almost any vital wound",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Potion of Healing",
            level=0.5,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you regain 1d8 \\glossterm<hit points>.
            """,
            short_description="Restores 1d6 hit points",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Healing, Greater",
            level=6,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you regain 2d8+3 \\glossterm<hit points>.
            """,
            short_description="Restores 2d6+3 hit points",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Healing, Supreme",
            level=12,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you regain 4d8+6 \\glossterm<hit points>.
            """,
            short_description="Restores 4d6+6 hit points",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Healing, Epic",
            level=18,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you regain 6d10+9 \\glossterm<hit points>.
            """,
            short_description="Restores 5d10+9 hit points",
        ),
    ]

    # Alchemical items

    tools += [
        MagicItem(
            consumable=True,
            name="Alchemist's Fire",
            level=1,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against anything within \\rngshort range.
                On a hit, the subject takes 1d10 fire damage.
            """,
            short_description="Throw to deal 1d10 fire damage",
        ),
        MagicItem(
            consumable=True,
            name="Alchemist's Fire, Greater",
            level=7,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against anything within \\rngshort range.
                On a hit, the subject takes 2d10+3 fire damage.
            """,
            short_description="Throw to deal 2d10+3 fire damage",
        ),
        MagicItem(
            consumable=True,
            name="Alchemist's Fire, Supreme",
            level=13,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against anything within \\rngshort range.
                On a hit, the subject takes 4d10+6 fire damage.
            """,
            short_description="Throw to deal 4d10+6 fire damage",
        ),
        MagicItem(
            consumable=True,
            name="Alchemist's Fire, Epic",
            level=19,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against anything within \\rngshort range.
                On a hit, the subject takes 7d10+9 fire damage.
            """,
            short_description="Throw to deal 7d10+9 fire damage",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Acid Flask",
            level=2,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the subject takes 1d10+1 acid damage.
            """,
            short_description="Throw to deal 1d10+1 acid damage",
        ),
        MagicItem(
            consumable=True,
            name="Acid Flask, Greater",
            level=8,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the subject takes 2d10+4 acid damage.
            """,
            short_description="Throw to deal 2d10+4 acid damage",
        ),
        MagicItem(
            consumable=True,
            name="Acid Flask, Supreme",
            level=14,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the subject takes 4d10+7 acid damage.
            """,
            short_description="Throw to deal 4d10+7 acid damage",
        ),
        MagicItem(
            consumable=True,
            name="Acid Flask, Epic",
            level=20,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the subject takes 7d10+10 acid damage.
            """,
            short_description="Throw to deal 7d10+10 acid damage",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Corrosive Flask",
            level=5,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the subject takes 1d8+1 acid damage.
                If a creature loses \\glossterm<hit points> from this damage, it is \\glossterm<sickened> as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 1d8+1 acid damage and sicken",
        ),
        MagicItem(
            consumable=True,
            name="Corrosive Flask, Greater",
            level=14,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the subject takes 2d8+3 acid damage.
                If a creature loses \\glossterm<hit points> from this damage, it is \\glossterm<nauseated> as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 2d8+3 acid damage and nauseate",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Firebomb",
            level=4,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against everything in a \\smallarea radius within \\rngshort range.
                On a hit, each subject takes 1d10+1 fire damage.
            """,
            short_description="Throw to deal 1d10+1 fire damage in an area",
        ),
        MagicItem(
            consumable=True,
            name="Firebomb, Greater",
            level=10,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against everything in a \\smallarea radius within \\rngshort range.
                On a hit, each subject takes 2d10+2 fire damage.
            """,
            short_description="Throw to deal 2d10+2 fire damage in an area",
        ),
        MagicItem(
            consumable=True,
            name="Firebomb, Supreme",
            level=16,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against everything in a \\smallarea radius within \\rngshort range.
                On a hit, each subject takes 4d10+4 fire damage.
            """,
            short_description="Throw to deal 4d10+4 fire damage in an area",
        ),
    ]

    tools.append(
        MagicItem(
            consumable=True,
            name="Smokestick",
            level=1,
            material_type="Alchemy",
            tags=[],
            description="""
                As a standard action, you can activate this item and optionally throw it anywhere within \\rngshort range.
                When you do, it immediately creates a cloud of smoke in a \\areasmall radius from its location.
                Looking through 10 feet of smoke is enough to completely block line of sight.
                The cloud of smoke dissipates normally after it is created, which generally takes about a minute.
            """,
            short_description="Creates a cloud of smoke",
        )
    )

    tools.append(
        MagicItem(
            consumable=True,
            name="Tindertwig",
            level=0.5,
            material_type="Alchemy",
            tags=[],
            description="""
                As a \\glossterm<minor action>, you can activate this small, wooden stick by striking it against any hard surface.
                When you do, it bursts into flame, allowing you to light other fires with it.
            """,
            short_description="Quickly activated flame",
        )
    )

    tools.append(
        MagicItem(
            consumable=True,
            name="Flash Powder",
            level=0.5,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this powder in the air in your location as a standard action.
                When you do, it emits a burst of \\glossterm<bright illumination> in a 60 foot radius and \\glossterm<shadowy illumination> in a 120 foot radius.
                The light lasts until the end of the round.
            """,
            short_description="Emits burst of bright light",
        )
    )

    tools += [
        MagicItem(
            consumable=True,
            name="Thunderstone",
            level=3,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against everything in a \\tinyarea radius within \\rngshort range.
                On a hit, each subject takes 1d6+1 sonic damage.
                Each creature that loses \\glossterm<hit points> from this damage is \\glossterm<deafened> as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 1d6+1 sonic damage and deafen",
        ),
        MagicItem(
            consumable=True,
            name="Thunderstone, Greater",
            level=9,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against everything in a \\tinyarea radius within \\rngshort range.
                On a hit, each subject takes 1d10+2 sonic damage.
                Each creature that loses \\glossterm<hit points> from this damage is \\glossterm<deafened> and \\glossterm<dazed> as a single \\glossterm<condition>.
            """,
            short_description="Throw to deal 1d10+2 sonic damage, deafen, and daze",
        ),
        MagicItem(
            consumable=True,
            name="Thunderstone, Supreme",
            level=15,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against everything in a \\tinyarea radius within \\rngshort range.
                On a hit, each subject takes 2d8+3 sonic damage.
                Each creature that loses \\glossterm<hit points> from this damage is \\glossterm<deafened> and \\glossterm<stunned> as a single \\glossterm<condition>.
            """,
            short_description="Throw to deal 2d8+3 sonic damage, deafen, and stun",
        )
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Snowball",
            level=4,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the subject takes 1d8+1 cold damage.
                If a creature loses \\glossterm<hit points> from this damage, it is \\glossterm<slowed> as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 1d8+1 cold damage and slow",
        ),
        MagicItem(
            consumable=True,
            name="Snowball, Greater",
            level=13,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the subject takes 2d8+3 cold damage.
                If a creature loses \\glossterm<hit points> from this damage, it is \\glossterm<decelerated> as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 2d8+3 cold damage and decelerate",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Antitoxin Elixir",
            level=3,
            material_type="Alchemy",
            tags=[],
            description="""
                As a standard action, you can drink this elixir.
                When you do, it imbues your body with a resistance to poisons for 5 minutes.
                During that time, you may treat your Fortitude defense as if it was equal to 10 \\add this item's power for the purpose of resisting poisons.
            """,
            short_description="Resists poisons",
        ),
        MagicItem(
            consumable=True,
            name="Antitoxin Elixir, Greater",
            level=9,
            material_type="Alchemy",
            tags=[],
            description="""
                This item functions like an \\mitem<antitoxin elixir>, except that the effect lasts for eight hours.
            """,
            short_description="Resists poisons for 8 hours",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Sunrod",
            level=3,
            material_type="Alchemy",
            tags=[],
            description="""
                As a standard action, you can activate this item.
                When you do, it creates \\glossterm<bright illumination> in a 60 foot radius and \\glossterm<shadowy illumination> in a 120 foot radius for 5 minutes.
            """,
            short_description="Emits bright illumination",
        ),
        MagicItem(
            consumable=True,
            name="Sunrod, Greater",
            level=6,
            material_type="Alchemy",
            tags=[],
            description="""
                This item functions like a \\mitem<sunrod>, except that the effect lasts for 8 hours.
            """,
            short_description="Emits bright illumination for 8 hours",
        )
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Tanglefoot Bag",
            level=1,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against one creature within \\shortrange.
                On a hit, the subject is \\glossterm<slowed> as a \\glossterm<condition>.

                Whenever the target moves using one of its movement speeds, it can make a \\glossterm<difficulty rating> 5 Strength check as part of the movement.
                If it succeeds, the condition is removed after the movement is complete.
            """,
            short_description="Slows a foe, though it is easily removable",
        ),
        MagicItem(
            consumable=True,
            name="Tanglefoot Bag, Greater",
            level=4,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against one creature within \\shortrange.
                On a hit, the subject is \\glossterm<slowed> as a \\glossterm<condition>.
            """,
            short_description="Slows a foe",
        ),
        MagicItem(
            consumable=True,
            name="Tanglefoot Bag, Supreme",
            level=13,
            material_type="Alchemy",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against one creature within \\shortrange.
                On a hit, the subject is \\glossterm<decelerated> as a \\glossterm<condition>.
            """,
            short_description="Decelerates a foe",
        ),
    ]

    tools.append(
        MagicItem(
            consumable=True,
            name="Everburning Torch",
            level=3,
            material_type="Alchemy",
            tags=[],
            description="""
                As a standard action, you can activate this item.
                When you do, it sheds light like a torch for a week.
            """,
            short_description="Emits light like a torch for a week",
        )
    )

    tools += [
        MagicItem(
            consumable=True,
            name="Potion of Strength",
            level=3,
            material_type="Alchemy",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you gain a +3 \\glossterm<magic bonus> to your Strength for the purpose of determining your \\glossterm<carrying capacity> (see \\pcref<Carrying Capacity>).
                This effect lasts for five minutes.
            """,
            short_description="Briefly increases carrying capacity",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Strength, Greater",
            level=9,
            material_type="Alchemy",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you gain a +4 \\glossterm<magic bonus> to your Strength for the purpose of determining your \\glossterm<carrying capacity> (see \\pcref<Carrying Capacity>).
                This effect lasts for one hour.
            """,
            short_description="Increases carrying capacity",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Strength, Supreme",
            level=15,
            material_type="Alchemy",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you gain a +5 \\glossterm<magic bonus> to your Strength for the purpose of determining your \\glossterm<carrying capacity> (see \\pcref<Carrying Capacity>).
                This effect lasts for eight hours.
            """,
            short_description="Increases carrying capacity for an extended time",
        ),
    ]

    tools += [
        MagicItem(
            name="Bag of Shrinking",
            level=6,
            materials="textiles",
            tags=[],
            description="""
                This bag appears to be a common Small cloth sack.
                However, it reduces the size of any \\glossterm<unattended> objects placed inside of it by two size categories, allowing it to hold items of up to Large size.
                This reduction does not affect the weight of those objects.

                If this bag is destroyed, the items within it return to their original size.
            """,
            short_description="Shrinks contained items by two size categories",
        ),
        MagicItem(
            name="Bag of Shrinking, Greater",
            level=12,
            materials="textiles",
            tags=[],
            description="""
                This bag functions like a \\mitem<bag of shrinking>, except that it reduces the size of contained objects by three size categories instead of two.
            """,
            short_description="Shrinks contained items by three size categories",
        ),
        MagicItem(
            name="Bag of Shrinking, Supreme",
            level=18,
            materials="textiles",
            tags=[],
            description="""
                This bag functions like a \\mitem<bag of shrinking>, except that it reduces the size of contained objects by four size categories instead of two.
            """,
            short_description="Shrinks contained items by four size categories",
        ),
    ]

    return tools


def generate_tool_latex(check=False):
    tools = sorted(generate_tools(), key=lambda tools: tools.name)

    texts = []
    for item in tools:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e

    text = "\n".join(texts)
    return latexify(text)


def generate_tool_table():
    tools = sorted(
        sorted(generate_tools(), key=lambda item: item.name),
        key=lambda item: item.level,
    )
    rows = [item.latex_table_row(include_type=False) for item in tools]
    row_text = "\n".join(rows)
    return longtablify(
        f"""
        \\lcaption<Tool Items> \\\\
        \\tb<Name> & \\tb<Item Level (Cost)> & \\tb<Description> & \\tb<Page> \\tableheaderrule
        {row_text}
    """
    )


def write_to_file():
    tool_latex = generate_tool_latex()
    tool_table = generate_tool_table()
    with open(book_path("tools.tex"), "w") as tool_description_file:
        tool_description_file.write(tool_latex)
    with open(book_path("tools_table.tex"), "w") as tool_table_file:
        tool_table_file.write(tool_table)


@click.command()
@click.option("-c", "--check/--no-check", default=False)
@click.option("-o", "--output/--no-output", default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_tool_latex())


if __name__ == "__main__":
    main()
