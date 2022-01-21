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
            rank=3,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you remove a \\glossterm<brief> effect or \\glossterm<condition> affecting you.
                This cannot remove an effect applied during the current round.
            """,
            short_description="Removes a brief effect or condition",
        ),
        MagicItem(
            consumable=True,
            name="Cleansing Potion, Greater",
            rank=5,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you remove two \\glossterm<brief> effects or \\glossterm<conditions> affecting you.
                This cannot remove effects applied during the current round.
            """,
            short_description="Removes two brief effects or conditions",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Telepath's Bane",
            rank=2,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you take a -2 penalty to your Intelligence as a \\glossterm<condition>.
            """,
            short_description="Imposes -2 Intelligence penalty",
        ),
        MagicItem(
            consumable=True,
            name="Telepath's Bane, Greater",
            rank=5,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you take a -4 penalty to your Intelligence as a \\glossterm<condition>.
            """,
            short_description="Imposes -4 Inteligence penalty",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Potion of Wound Closure",
            rank=1,
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
            rank=3,
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
            rank=5,
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
            rank=7,
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
            rank=1,
            material_type="Potion",
            # This seems like it should be Healing-tagged, but it's not really
            # an ability? It's not obvious how the cooldown should interact with
            # it.
            tags=["Healing"],
            description="""
                When you drink this \\glossterm<potion>, you regain 1d8 \\glossterm<hit points>.
                After you drink this item, you \\glossterm<briefly> gain no benefit from it or any other \\abilitytag<Healing> effect.
            """,
            short_description="Restores 1d8 hit points",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Healing, Greater",
            rank=2,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you regain 2d8+4 \\glossterm<hit points>.
                After you drink this item, you \\glossterm<briefly> gain no benefit from it or any other \\abilitytag<Healing> effect.
            """,
            short_description="Restores 2d8+4 hit points",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Healing, Supreme",
            rank=4,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you regain 4d8+7 \\glossterm<hit points>.
                After you drink this item, you \\glossterm<briefly> gain no benefit from it or any other \\abilitytag<Healing> effect.
            """,
            short_description="Restores 4d8+7 hit points",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Healing, Epic",
            rank=6,
            material_type="Potion",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you regain 6d10+14 \\glossterm<hit points>.
                After you drink this item, you \\glossterm<briefly> gain no benefit from it or any other \\abilitytag<Healing> effect.
            """,
            short_description="Restores 6d10+14 hit points",
        ),
    ]

    # Alchemical items

    tools += [
        MagicItem(
            consumable=True,
            name="Alchemist's Fire",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against anything within \\rngshort range.
                On a hit, the target takes 1d10 fire damage.
            """,
            short_description="Throw to deal 1d10 fire damage",
        ),
        MagicItem(
            consumable=True,
            name="Alchemist's Fire, Greater",
            rank=3,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against anything within \\rngshort range.
                On a hit, the target takes 2d10+5 fire damage.
            """,
            short_description="Throw to deal 2d10+5 fire damage",
        ),
        MagicItem(
            consumable=True,
            name="Alchemist's Fire, Supreme",
            rank=5,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against anything within \\rngshort range.
                On a hit, the target takes 4d10+10 fire damage.
            """,
            short_description="Throw to deal 4d10+10 fire damage",
        ),
        MagicItem(
            consumable=True,
            name="Alchemist's Fire, Epic",
            rank=7,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against anything within \\rngshort range.
                On a hit, the target takes 7d10+20 fire damage.
            """,
            short_description="Throw to deal 7d10+20 fire damage",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Acid Flask",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the target takes 1d10+3 acid damage.
            """,
            short_description="Throw to deal 1d10+3 acid damage",
        ),
        MagicItem(
            consumable=True,
            name="Acid Flask, Greater",
            rank=3,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the target takes 2d10+5 acid damage.
            """,
            short_description="Throw to deal 2d10+5 acid damage",
        ),
        MagicItem(
            consumable=True,
            name="Acid Flask, Supreme",
            rank=5,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the target takes 4d10+10 acid damage.
            """,
            short_description="Throw to deal 4d10+10 acid damage",
        ),
        MagicItem(
            consumable=True,
            name="Acid Flask, Epic",
            rank=7,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the target takes 7d10+20 acid damage.
            """,
            short_description="Throw to deal 7d10+20 acid damage",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Corrosive Flask",
            rank=2,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the target takes 1d8+2 acid damage.
                If a creature loses \\glossterm<hit points> from this damage, it is \\dazed as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 1d8+2 acid damage and daze",
        ),
        MagicItem(
            consumable=True,
            name="Corrosive Flask, Greater",
            rank=5,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the target takes 2d8+5 acid damage.
                Each creature that loses \\glossterm<hit points> from this damage becomes \\stunned as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 2d8+5 acid damage and stun",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Firebomb",
            rank=2,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against everything in a \\smallarea radius within \\rngshort range.
                On a hit, each target takes 1d10+2 fire damage.
            """,
            short_description="Throw to deal 1d10+2 fire damage in an area",
        ),
        MagicItem(
            consumable=True,
            name="Firebomb, Greater",
            rank=4,
            material_type="Alchemical",
            tags=[],
            # this should be +3 by the standard progression, but that makes it
            # weirdly bad compared to Supreme, so round to +4
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against everything in a \\smallarea radius within \\rngshort range.
                On a hit, each target takes 2d10+4 fire damage.
            """,
            short_description="Throw to deal 2d10+4 fire damage in an area",
        ),
        MagicItem(
            consumable=True,
            name="Firebomb, Supreme",
            rank=6,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against everything in a \\smallarea radius within \\rngshort range.
                On a hit, each target takes 4d8+14 fire damage.
            """,
            short_description="Throw to deal 4d8+14 fire damage in an area",
        ),
    ]

    tools.append(
        MagicItem(
            consumable=True,
            name="Smokestick",
            rank=1,
            material_type="Alchemical",
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
            rank=0,
            material_type="Alchemical",
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
            rank=0,
            material_type="Alchemical",
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
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against everything in a \\tinyarea radius within \\rngshort range.
                On a hit, each target takes 1d6+1 sonic damage.
                Each creature that loses \\glossterm<hit points> from this damage is \\glossterm<deafened> as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 1d6+1 sonic damage and deafen",
        ),
        MagicItem(
            consumable=True,
            name="Thunderstone, Greater",
            rank=3,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against everything in a \\tinyarea radius within \\rngshort range.
                On a hit, each target takes 1d10+2 sonic damage.
                Each creature that loses \\glossterm<hit points> from this damage is \\deafened and \\dazed as a single \\glossterm<condition>.
            """,
            short_description="Throw to deal 1d10+2 sonic damage, deafen, and daze",
        ),
        MagicItem(
            consumable=True,
            name="Thunderstone, Supreme",
            rank=5,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against everything in a \\tinyarea radius within \\rngshort range.
                On a hit, each target takes 2d8+5 sonic damage.
                Each creature that loses \\glossterm<hit points> from this damage is \\deafened and \\stunned as a single \\glossterm<condition>.
            """,
            short_description="Throw to deal 2d8+5 sonic damage, deafen, and stun",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Snowball",
            rank=2,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the target takes 1d8+2 cold damage.
                If a creature loses \\glossterm<hit points> from this damage, it is \\slowed as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 1d8+2 cold damage and slow",
        ),
        MagicItem(
            consumable=True,
            name="Snowball, Greater",
            rank=5,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the target takes 2d8+5 cold damage.
                If a creature loses \\glossterm<hit points> from this damage, it is \\slowed as a \\glossterm<condition>.
                This condition must be removed twice before the effect ends.
            """,
            short_description="Throw to deal 2d8+5 cold damage and extensively slow",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Antitoxin Elixir",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                As a standard action, you can drink this elixir.
                When you do, it imbues your body with a resistance to poisons for 5 minutes.
                During that time, you gain a +2 bonus to Fortitude defense against attacks from poisons.
            """,
            short_description="Grants +2 defenses against poisons",
        ),
        MagicItem(
            consumable=True,
            name="Antitoxin Elixir, Greater",
            rank=3,
            material_type="Alchemical",
            tags=[],
            description="""
                This item functions like an \\mitem<antitoxin elixir>, except that the bonus increases to +4.
            """,
            short_description="Grants +4 defenses against poisons",
        ),
        MagicItem(
            consumable=True,
            name="Antitoxin Elixir, Supreme",
            rank=5,
            material_type="Alchemical",
            tags=[],
            description="""
                This item functions like an \\mitem<antitoxin elixir>, except that the bonus increases to +6.
            """,
            short_description="Grants +6 defenses against poisons",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Sunrod",
            rank=1,
            material_type="Alchemical",
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
            rank=2,
            material_type="Alchemical",
            tags=[],
            description="""
                This item functions like a \\mitem<sunrod>, except that the effect lasts for 8 hours.
            """,
            short_description="Emits bright illumination for 8 hours",
        ),
    ]

    tools += [
        MagicItem(
            consumable=True,
            name="Tanglefoot Bag",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against one creature within \\shortrange.
                On a hit, the target is \\glossterm<slowed> as a \\glossterm<condition>.

                Whenever the target moves using one of its movement speeds, it can make a \\glossterm<difficulty value> 5 Strength check as part of the movement.
                If it succeeds, the condition is removed after the movement is complete.
            """,
            short_description="Slows a foe, though it is easily removable",
        ),
        MagicItem(
            consumable=True,
            name="Tanglefoot Bag, Greater",
            rank=2,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against one creature within \\shortrange.
                On a hit, the target is \\glossterm<slowed> as a \\glossterm<condition>.
            """,
            short_description="Slows a foe",
        ),
        MagicItem(
            consumable=True,
            name="Tanglefoot Bag, Supreme",
            rank=5,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against one creature within \\shortrange.
                On a hit, the target is \\glossterm<slowed> as a \\glossterm<condition>.
                This condition must be removed twice before the effect ends.
            """,
            short_description="Extensively slows a foe",
        ),
    ]

    tools.append(
        MagicItem(
            consumable=True,
            name="Everburning Torch",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                As a standard action, you can activate this item.
                When you do, it sheds light like a torch for a week (see \\pcref<Torch>).
            """,
            short_description="Emits light like a torch for a week",
        )
    )

    tools.append(
        MagicItem(
            consumable=True,
            name="Torch",
            rank=0,
            material_type="Alchemical",
            tags=[],
            description="""
                \\label<Torch>
                As a standard action, you can light a torch if you have flint and steel or another source of flame handy.
                When you do, it sheds \\glossterm<bright illumination> in a \\smallarea radius, and \\glossterm<shadowy illumination> in a \\medarea radius.
            """,
            short_description="Emits light",
        )
    )

    tools += [
        MagicItem(
            consumable=True,
            name="Potion of Strength",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you gain a +1 \\glossterm<magic bonus> to your Strength for the purpose of determining your \\glossterm<weight limits> (see \\pcref<Weight Limits>).
                This effect lasts for five minutes.
            """,
            short_description="Briefly increases weight limits",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Strength, Greater",
            rank=3,
            material_type="Alchemical",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you gain a +2 \\glossterm<magic bonus> to your Strength for the purpose of determining your \\glossterm<weight limits> (see \\pcref<Weight Limits>).
                This effect lasts for one hour.
            """,
            short_description="Increases weight limits",
        ),
        MagicItem(
            consumable=True,
            name="Potion of Strength, Supreme",
            rank=5,
            material_type="Alchemical",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you gain a +3 \\glossterm<magic bonus> to your Strength for the purpose of determining your \\glossterm<weight limits> (see \\pcref<Weight Limits>).
                This effect lasts for eight hours.
            """,
            short_description="Increases weight limits for an extended time",
        ),
    ]

    tools += [
        MagicItem(
            name="Bag of Shrinking",
            rank=1,
            materials=["textiles"],
            tags=[],
            description="""
                This bag appears to be a common Small cloth sack.
                However, it reduces the size of any \\glossterm<unattended>, nonmagical objects placed inside of it by one size category, allowing it to hold items of up to Medim size.
                This reduction does not affect the weight of those objects.

                If this bag is destroyed, the items within it return to their original size.
            """,
            short_description="Shrinks items by one size category",
        ),
        MagicItem(
            name="Bag of Shrinking, Greater",
            rank=3,
            materials=["textiles"],
            tags=[],
            description="""
                This bag functions like a \\mitem<bag of shrinking>, except that it reduces the size of contained objects by two size categories instead of one.
            """,
            short_description="Shrinks items by two size categories",
        ),
        MagicItem(
            name="Bag of Shrinking, Supreme",
            rank=5,
            materials=["textiles"],
            tags=[],
            description="""
                This bag functions like a \\mitem<bag of shrinking>, except that it reduces the size of contained objects by three size categories instead of one.
            """,
            short_description="Shrinks items by three size categories",
        ),
    ]

    tools += [
        MagicItem(
            name="Bag of Holding",
            rank=4,
            materials=["textiles"],
            tags=[],
            description="""
                This bag appears to be a bulky Medium cloth sack.
                However, it reduces the size of any \\glossterm<unattended>, nonmagical objects placed inside of it by one size category, allowing it to hold items of up to Large size.
                This reduction also affects the weight of those objects.

                If this bag is destroyed, the items within it return to their original size.
            """,
            short_description="Shrinks items by one size and weight category",
        ),
        MagicItem(
            name="Bag of Holding, Greater",
            rank=6,
            materials=["textiles"],
            tags=[],
            description="""
                This bag functions like a \\mitem<bag of holding>, except that it reduces the size and weight of contained objects by two size categories instead of one.
            """,
            short_description="Shrinks items by two size and weight categories",
        ),
    ]

    # TRAPS
    # Trap accuracy: as CR 3 monster, so level + ((level + 1) / 6) + 2
    # Trap effect: as rank-appropriate spell with power = half level
    # Trap level: relevant rank - 2 for single-square since it's hard to
    # activate, rank + 1 for easier triggers
    # awareness DR = 9 + level

    tools += [
        MagicItem(
            name="Bear Trap",
            rank=1,
            materials=["metal"],
            tags=[],
            description="""
                As a standard action, you can deploy this trap on a space on the ground adjacent to you.
                While this trap is deployed, a creature can notice it with a \\glossterm<difficulty value> 11 Awareness check.

                The first time a creature walks through that space, the trap makes a +4 attack vs. Armor against it.
                After the trap triggers, it must be manually deployed again.
                On a hit, the creature takes 1d8 damage.
                If it loses \\glossterm<hit points> from this damage, it is \\glossterm<briefly> \\immobilized.
            """,
            short_description="Damages and briefly immobilizes",
        ),
        MagicItem(
            name="Bear Trap, Greater",
            rank=4,
            materials=["metal"],
            tags=[],
            description="""
                As a standard action, you can deploy this trap on a space on the ground adjacent to you.
                While this trap is deployed, a creature can notice it with a \\glossterm<difficulty value> 20 Awareness check.

                The first time a creature walks through that space, the trap makes a +16 attack vs. Armor against it.
                After the trap triggers, it must be manually deployed again.
                On a hit, the creature takes 2d8 damage.
                If it loses \\glossterm<hit points> from this damage, it is \\immobilized as a \\glossterm<condition>.
            """,
            short_description="Damages and immobilizes",
        ),
    ]

    tools += [
        MagicItem(
            name="Fireburst Trap",
            rank=2,
            materials=["metal"],
            tags=[],
            description="""
                As a standard action, you can deploy this trap on a space on the ground adjacent to you.
                While this trap is deployed, a creature can notice it with a \\glossterm<difficulty value> 14 Awareness check.

                The first time a creature walks through that space, the trap makes a +8 attack vs. Reflex against everything within a \\smallarea radius of it.
                After the trap triggers, it must be manually deployed again.
                On a hit, each target takes 1d10+2 damage.
            """,
            short_description="Deals fire damage in a small area",
        ),
        MagicItem(
            name="Fireburst Trap, Greater",
            rank=4,
            materials=["metal"],
            tags=[],
            description="""
                As a standard action, you can deploy this trap on a space on the ground adjacent to you.
                While this trap is deployed, a creature can notice it with a \\glossterm<difficulty value> 20 Awareness check.

                The first time a creature walks through that space, the trap makes a +15 attack vs. Reflex against everything within a \\largearea radius of it.
                After the trap triggers, it must be manually deployed again.
                On a hit, each target takes 2d8+3 damage.
            """,
            short_description="Deals fire damage in a large area",
        ),
        MagicItem(
            name="Fireburst Trap, Supreme",
            rank=6,
            materials=["metal"],
            tags=[],
            description="""
                As a standard action, you can deploy this trap on a space on the ground adjacent to you.
                While this trap is deployed, a creature can notice it with a \\glossterm<difficulty value> 26 Awareness check.

                The first time a creature walks through that space, the trap makes a +22 attack vs. Reflex against everything within a \\largearea radius of it.
                After the trap triggers, it must be manually deployed again.
                On a hit, each target takes 4d8+7 damage.
            """,
            short_description="Deals massive fire damage in a large area",
        ),
    ]

    tools += [
        MagicItem(
            name="Artisan's Tools",
            rank=0,
            materials=["metal"],
            tags=[],
            description="""
                These are Small tools that are appropriate to a particular Craft skill other than Craft (alchemy).
                It is very difficult to create items with the Craft skill without this item (see \\pcref<Craft>).
            """,
            short_description="Required for Craft checks",
        ),
        MagicItem(
            name="Alchemist's Lab",
            rank=2,
            materials=["Alchemy"],
            tags=[],
            description="""
                This is a Medium workstation that contains a wide variety of compounds and reagents.
                It is very difficult to create items with the Craft (alchemy) skill without this item (see \\pcref<Craft>).
            """,
            short_description="Required for Craft (alchemy) checks",
        ),
        MagicItem(
            name="Disguise Kit",
            rank=1,
            materials=["Alchemy", "Textiles"],
            tags=[],
            description="""
                This is a Small kit that contains a wide variety of fabrics, makeup, and other useful tools for disguising your appearance.
                It is very difficult to create disguises with the Disguise skill without this item (see \\pcref<Disguise>).
            """,
            short_description="Required for Disguise checks",
        ),
        MagicItem(
            name="Thieves' Tools",
            rank=1,
            materials=["Metal", "Textiles"],
            tags=[],
            description="""
                This is a Small kit that contains a wide variety of lockpicks and device-manipulation tools.
                It is very difficult to manipulate devices with the Devices skill without this item (see \\pcref<Devices>).
            """,
            short_description="Required for Devices checks",
        ),
    ]

    tools += [
        MagicItem(
            name="Chain, 5 ft.",
            rank=0,
            materials=["Metal"],
            tags=[],
            # TODO: define specific HP / DR
            description="""
                This is a five-foot chain of metal links.
            """,
            short_description="Heavy iron chain that is difficult to break",
        ),
    ]

    tools += [
        MagicItem(
            name="Carriage",
            rank=1,
            materials=["Textiles", "Wood"],
            tags=[],
            description="""
                This four-wheeled vehicle can transport as many as four people within an enclosed cab, plus two drivers.
                In general, two horses (or other beasts of burden) draw it.
                A carriage comes with the harness needed to pull it.
            """,
            short_description="Fancy carriage that carries up to four people",
        ),
        MagicItem(
            name="Rowboat",
            rank=1,
            materials=["Wood"],
            tags=[],
            description="""
                This 8- to 12 foot long boat holds two or three Medium passengers.
                It moves about one and a half miles per hour.
            """,
            short_description="Simple boat for short journeys",
        ),
        MagicItem(
            name="Ship, Galley",
            rank=5,
            materials=["Metal", "Textiles", "Wood"],
            tags=[],
            description="""
                This three-masted ship has seventy oars on either side and requires a total crew of 200.
                A typical galley is 130 feet long and 20 feet wide, and it can carry 150 tons of cargo or 250 soldiers.
                Some rare galleys are fitted with a ram and castles with firing platforms fore, aft, and amidships.
                This ship cannot make sea voyages and sticks to the coast. It moves about 4 miles per hour when being rowed or under sail.
            """,
            short_description="Massive, fast-moving boat with 200 crew",
        ),
        MagicItem(
            name="Ship, Keelboat",
            rank=3,
            materials=["Metal", "Textiles", "Wood"],
            tags=[],
            description="""
                This 50 to 75 foot long ship is 15 to 20 feet wide and has a few oars to supplement its single mast with a square sail. It requires a total crew of 15 and can carry 40 to 50 tons of cargo or 100 soldiers. It can make sea voyages, as well as sail down rivers (thanks to its flat bottom). It moves about 1 mile per hour.
            """,
            short_description="Slow-moving, seaworthy ship with 15 crew",
        ),
        MagicItem(
            name="Ship, Longship",
            rank=4,
            materials=["Metal", "Textiles", "Wood"],
            tags=[],
            description="""
                This 75 foot long ship with forty oars requires a total crew of 50. It has a single mast and a square sail, and it can carry 50 tons of cargo or 120 soldiers. A longship can make sea voyages. It moves about 3 miles per hour when being rowed or under sail.
            """,
            short_description="Long, seaworthy ship with 50 crew",
        ),
        MagicItem(
            name="Wagon",
            rank=1,
            materials=["Wood"],
            tags=[],
            description="""
                This is a four-wheeled, open vehicle for transporting heavy loads. In general, two horses (or other beasts of burden) draw it. A wagon comes with the harness needed to pull it.
            """,
            short_description="Simple wagon for transporting heavy loads",
        ),
    ]

    tools += [
        MagicItem(
            name="Dog, Guard",
            rank=1,
            materials=["none"],
            tags=[],
            description="""
                This is a Small dog that knows the Guard and Heel tricks (see \\pcref<Creature Handling>).
                It is not trained to be effective in battle.
                You can use this price for any Small cat or dog trained for other tricks.
            """,
            short_description="Small dog trained to guard areas",
        ),
        MagicItem(
            name="Dog, Riding",
            rank=1,
            materials=["none"],
            tags=[],
            description="""
                This is a Medium dog that knows the Guard and Heel tricks (see \\pcref<Creature Handling>).
                It is trained to be effective in battle, and is a suitable mount for creatures with the \\textit<short stature> ability, such as gnomes and halflings.
            """,
            short_description="Medium dog trained for battle",
        ),
        MagicItem(
            name="Horse",
            rank=1,
            materials=["none"],
            tags=[],
            description="""
                This is a Large horse.
                It is not trained to be effectively ridden in battle.
            """,
            short_description="Large horse not trained for battle",
        ),
        MagicItem(
            name="Warhorse",
            rank=2,
            materials=["none"],
            tags=[],
            description="""
                This is a Large horse.
                It is trained to be effectively ridden in battle.
            """,
            short_description="Large horse trained for battle",
        ),
        MagicItem(
            name="Pony",
            rank=1,
            materials=["none"],
            tags=[],
            description="""
                This is a Medium horse.
                It is not trained to be effectively ridden in battle.
                However, it is an appropriate mount outside of battle for creatures with the \\textit<short stature> ability, such as gnomes and halflings.
            """,
            short_description="Medium pony not trained for battle",
        ),
        MagicItem(
            name="Warpony",
            rank=1,
            materials=["none"],
            tags=[],
            description="""
                This is a Medium horse.
                It is trained to be effectively ridden in battle, and it is an appropriate mount for creatures with the \\textit<short stature> ability, such as gnomes and halflings.
            """,
            short_description="Medium pony trained for battle",
        ),
    ]

    tools += [
        MagicItem(
            name="Lock, simple",
            rank=0,
            materials=["Metal"],
            tags=[],
            description="""
                This is a lock.
                Opening the lock without the appropriate key requires a \\glossterm<difficulty value> 15 Devices check (see \\pcref<Devices>).
            """,
            short_description="Devices \\glossterm<difficulty value> of 15 to unlock",
        ),
        MagicItem(
            name="Lock, quality",
            rank=1,
            materials=["Metal"],
            tags=[],
            description="""
                This is a lock.
                Opening the lock without the appropriate key requires a \\glossterm<difficulty value> 20 Devices check (see \\pcref<Devices>).
            """,
            short_description="Devices \\glossterm<difficulty value> of 20 to unlock",
        ),
        MagicItem(
            name="Lock, masterwork",
            rank=2,
            materials=["Metal"],
            tags=[],
            description="""
                This is a lock.
                Opening the lock without the appropriate key requires a \\glossterm<difficulty value> 25 Devices check (see \\pcref<Devices>).
            """,
            short_description="Devices \\glossterm<difficulty value> of 25 to unlock",
        ),
    ]

    tools += [
        MagicItem(
            name="Manacles, simple",
            rank=0,
            materials=["Metal"],
            tags=[],
            description="""
                This is a set of manacles designed for Medium humanoid creatures.
                Escaping the manacles while they are being worn requires a \\glossterm<difficulty value> 15 Flexibility check (see \\pcref<Flexibility>).
            """,
            short_description="Flexibility \\glossterm<difficulty value> of 15 to escape",
        ),
        MagicItem(
            name="Manacles, quality",
            rank=1,
            materials=["Metal"],
            tags=[],
            description="""
                This is a set of manacles designed for Medium humanoid creatures.
                Escaping the manacles while they are being worn requires a \\glossterm<difficulty value> 25 Flexibility check (see \\pcref<Flexibility>).
            """,
            short_description="Flexibility \\glossterm<difficulty value> of 20 to escape",
        ),
        MagicItem(
            name="Manacles, masterwork",
            rank=2,
            materials=["Metal"],
            tags=[],
            description="""
                This is a set of manacles designed for Medium humanoid creatures.
                Escaping the manacles while they are being worn requires a \\glossterm<difficulty value> 25 Flexibility check (see \\pcref<Flexibility>).
            """,
            short_description="Flexibility \\glossterm<difficulty value> of 25 to escape",
        ),
    ]

    tools += [
        MagicItem(
            name="Battering Ram, Portable",
            rank=0,
            materials=["Wood"],
            tags=[],
            # TODO: define specific HP / DR
            description="""
                If you use this portable battering ram with two hands while trying to break down a door or similar object, you gain a \\plus2 bonus to your Strength check.
            """,
            short_description="Grants \\plus2 bonus to Strength checks to break objects",
        ),
    ]

    tools += [
        MagicItem(
            name="Caltrops",
            rank=0,
            materials=["Wood"],
            tags=[],
            description="""
                A caltrop is a four-pronged iron spike crafted so that one prong faces up no matter how the caltrop comes to rest.
                You scatter caltrops on the ground in the hope that your enemies step on them or are at least forced to slow down to avoid them.
                One 2-pound bag of caltrops covers a 5-foot square.

                Whenever a creature moves into the area, unless the creature moves at one quarter speed to avoid the danger, the caltrops make an attack vs. the creature's Armor defense.
                Unlike most attacks, this attack can happen during the \\glossterm<movement phase>.
                The accuracy of the caltrops is \\plus0.
                On a hit, the caltrops deal 1d6 piercing damage.

                Caltrops may not be effective against creatures with an unusual anatomy.
                Multiple applications of caltrops in the same area have no additional effect.
            """,
            short_description="Deals 1d6 damage when walked on",
        ),
    ]

    tools += [
        MagicItem(
            name="Outfit, Courtier's",
            rank=1,
            materials=["Jewelry", "Textiles"],
            tags=[],
            description="""
                This outfit includes fancy, tailored clothes in whatever fashion happens to be the current style in the courts of the nobles.
                It also includes appropriate jewelry.
            """,
            short_description="Typical attire for courtiers in noble society",
        ),
        MagicItem(
            name="Outfit, Noble's",
            rank=2,
            materials=["Jewelry", "Textiles"],
            tags=[],
            description="""
                This set of clothes is designed specifically to be expensive and to show it.
                Precious metals and gems are worked into the clothing.
            """,
            short_description="Typical attire for nobility",
        ),
        MagicItem(
            name="Outfit, Royal",
            rank=3,
            materials=["Jewelry", "Textiles"],
            tags=[],
            description="""
                Royal clothes are ostentatious, with gems, gold, silk, and fur in abundance.
            """,
            short_description="Typical attire for royalty",
        ),
    ]

    # POISONS
    # Poison accuracy: as CR 3 monster, so level + ((level + 1) / 6) + 2
    tools += [
        MagicItem(
            consumable=True,
            name="Poison, Nitharit",
            rank=1,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based powder poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus4.
                Its stage 1 effect makes the target \\dazed while the poison lasts.
                Its stage 3 effect makes the target \\stunned while the poison lasts.
            """,
            short_description="Dazes and eventually stuns",
        ),
        MagicItem(
            consumable=True,
            name="Poison, Sassone Leaf",
            rank=2,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based powder poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus6.
                The target takes 1d8 physical damage each time the poison's attack succeeds.
                Its stage 3 effect ends the poison.
            """,
            short_description="Deals 1d8 damage per stage",
        ),
        MagicItem(
            consumable=True,
            name="Poison, Asp Venom",
            rank=2,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus8.
                Its stage 1 effect makes the target \\dazed while the poison lasts.
                Its stage 3 effect makes the target \\stunned while the poison lasts.
            """,
            short_description="Dazes and eventually stuns",
        ),
        MagicItem(
            consumable=True,
            name="Poison, Arsenic",
            rank=3,
            material_type="Poison",
            tags=[],
            description="""
                This is an ingestion-based powder poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus11.
                The target takes 2d6 physical damage each time the poison's attack succeeds.
                Its stage 3 effect inflicts a \\glossterm<vital wound> on the target and ends the poison.
            """,
            short_description="Deals 2d6 damage per stage, can vitally wound",
        ),
        MagicItem(
            consumable=True,
            name="Poison, Dragon Bile",
            rank=4,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus13.
                The target takes 2d8 physical damage each time the poison's attack succeeds.
            """,
            short_description="Deals 2d8 damage per stage endlessly",
        ),
        MagicItem(
            consumable=True,
            name="Poison, Insanity Mist",
            rank=5,
            material_type="Poison",
            tags=[],
            description="""
                This is an ingestion-based gas poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus18.
                Its stage 1 effect makes the target \\stunned while the poison lasts.
                Its stage 3 effect makes the target \\confused while the poison lasts.
            """,
            short_description="Stuns and eventually confuses",
        ),
        MagicItem(
            consumable=True,
            name="Poison, Black Lotus",
            rank=5,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus18.
                The target takes 2d10+10 physical damage each time the poison's attack succeeds.
            """,
            short_description="Deals 2d10+10 damage per stage endlessly",
        ),
    ]

    tools += [
        MagicItem(
            name="Universal Artisan's Tools",
            rank=1,
            materials=["metal"],
            tags=[],
            description="""
                This item can serve as artisan's tools for any Craft check except for Craft (alchemy).
            """,
            short_description="Use to craft almost item",
        ),
        MagicItem(
            name="Universal Artisan's Tools, Greater",
            rank=3,
            materials=["metal"],
            tags=[],
            description="""
                This item can serve as artisan's tools for any Craft check.
                In addition, you gain a +2 \\glossterm<magic bonus> to the Craft skill when using this item to create an item.
                This provides no benefit when using the Craft skill for other purposes, such as to appraise an item.
            """,
            short_description="Use to craft any item with +2 bonus",
        ),
        MagicItem(
            name="Universal Artisan's Tools, Supreme",
            rank=5,
            materials=["metal"],
            tags=[],
            description="""
                This item can serve as artisan's tools for any Craft check.
                In addition, you gain a +3 \\glossterm<magic bonus> to the Craft skill when using this item to create an item.
                This provides no benefit when using the Craft skill for other purposes, such as to appraise an item.
            """,
            short_description="Use to craft any item with +3 bonus",
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
        key=lambda item: item.rank,
    )
    consumable_tools = list(filter(lambda t: t.consumable, tools))
    permanent_tools = list(filter(lambda t: not t.consumable, tools))

    consumable_rows = "\n".join(
        [item.latex_table_row(True) for item in consumable_tools]
    )
    permanent_rows = "\n".join(
        [item.latex_table_row(False) for item in permanent_tools]
    )
    return longtablify(
        f"""
            \\lcaption<Consumable Tools> \\\\
            \\tb<Name> & \\tb<Rank (Cost)> & \\tb<Type> & \\tb<Description> & \\tb<Page> \\tableheaderrule
            {consumable_rows}
        """
    ) + longtablify(
        f"""
            \\lcaption<Permanent Tools, Goods, and Mounts> \\\\
            \\tb<Name> & \\tb<Rank (Cost)> & \\tb<Description> & \\tb<Page> \\tableheaderrule
            {permanent_rows}
        """,
        False,
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
