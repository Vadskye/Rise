import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem, Upgrade, generate_table
from rise.latex.util import latexify

# In general, a rank X potion or alchemical item should be one rank behind an
# equivalent spell. They require no attunement and can be used by anyone, so
# it's dangerous to make them too powerful. However, they also have
# poor/nonexistent level scaling, so they also have to be fairly impactful when
# acquired to worth using at all.
def generate_tools():
    tools = []

    tools += [
        MagicItem(
            is_magical=True,
            consumable=True,
            name="Cleansing Potion",
            rank=4,
            material_type="Alchemical",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you remove a \\glossterm<condition> affecting you.
            """,
            short_description="Removes a condition",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        You remove two conditions instead of only one.
                    """,
                    short_description="Removes two conditions",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
            consumable=True,
            name="Telepath's Bane",
            rank=2,
            material_type="Alchemical",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, you take a -2 penalty to your Intelligence as a \\glossterm<condition>.
            """,
            short_description="Imposes -2 Intelligence penalty",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The Intelligence penalty increases to -4.
                    """,
                    short_description="Imposes -4 Inteligence penalty",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
            consumable=True,
            name="Potion of Wound Closure",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, if you have a \\glossterm<vital wound> with a \\glossterm<vital roll> of 0, you treat that vital roll as a 1 instead (see \\pcref<Vital Wounds>).
            """,
            short_description="Prevents death from barely lethal vital wounds",
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The potion can also affect vital wounds with a vital roll of -1.
                    """,
                    short_description="Prevents death from vital wounds",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The potion can also affect vital wounds with a vital roll of -1 or -2.
                    """,
                    short_description="Prevents death from major vital wounds",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The potion can also affect vital wounds with a vital roll of -1, -2, or -3.
                    """,
                    short_description="Prevents death from almost any vital wound",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
            consumable=True,
            name="Potion of Regeneration",
            rank=3,
            material_type="Alchemical",
            tags=[],
            description="""
                When you drink this \\glossterm<potion>, your body's natural healing process is accelerated.
                The next time you take a \\glossterm<long rest>, you can remove an additional \\glossterm<vital wound>.
                If you drink multiple potions of regeneration, their effects do not stack.
            """,
            short_description="Remove vital wound after long rest",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        You remove two additional vital wounds instead of only one.
                    """,
                    short_description="Remove two vital wounds after long rest",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
            consumable=True,
            name="Potion of Healing",
            rank=1,
            tags=["Swift"],
            material_type="Alchemical",
            description="""
                When you drink this \\glossterm<potion>, you regain 1d6+1 \\glossterm<hit points>.
                % This should make it unreasonably time-inefficient to chug potions instead of just resting
                After you drink this item, you \\glossterm<briefly> gain no benefit from any \\mitem<potion of healing> items.
            """,
            short_description="Restores 1d6+1 hit points",
            upgrades=[
                Upgrade(
                    rank=2,
                    description="""
                        The healing increases to 2d6+4.
                    """,
                    short_description="Restores 2d6+4 hit points",
                ),
                Upgrade(
                    rank=4,
                    description="""
                        The healing increases to 4d6+7.
                    """,
                    short_description="Restores 4d6+7 hit points",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The healing increases to 5d10+14.
                    """,
                    short_description="Restores 5d10+14 hit points",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
            consumable=True,
            name="Elixir of Resilience",
            rank=1,
            tags=["Attune"],
            material_type="Alchemical",
            description="""
                When you drink this \\glossterm<potion>, if you \\glossterm<attune> to its effects, you gain a +4 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                The effects expire after 10 minutes.
            """,
            short_description="Grants +4 damage resistance",
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The damage resistance bonus increases to +8.
                    """,
                    short_description="Grants +8 damage resistance",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The damage resistance bonus increases to +16.
                    """,
                    short_description="Grants +16 damage resistance",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The damage resistance bonus increases to +32.
                    """,
                    short_description="Grants +32 damage resistance",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
            consumable=True,
            name="Elixir of Hardiness",
            rank=1,
            tags=["Attune"],
            material_type="Alchemical",
            description="""
                When you drink this \\glossterm<potion>, if you \\glossterm<attune> to its effects, you gain a +2 \\glossterm<magic bonus> to your \\glossterm<vital rolls>.
                The effects expire after 10 minutes.
            """,
            short_description="Grants +2 to vital rolls",
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The bonus increases to +3.
                    """,
                    short_description="Grants +3 to vital rolls",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The bonus increases to +4.
                    """,
                    short_description="Grants +4 to vital rolls",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The bonus increases to +5.
                    """,
                    short_description="Grants +5 to vital rolls",
                ),
            ],
        ),
    ]

    # Alchemical items

    tools += [
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Alchemist's Fire",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Armor against anything within \\rngshort range.
                On a hit, the target takes 1d10+3 fire damage.
            """,
            short_description="Throw to deal 1d10+3 fire damage",
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The damage increases to 2d10+5.
                    """,
                    short_description="Throw to deal 2d10+5 fire damage",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The damage increases to 4d10+10.
                    """,
                    short_description="Throw to deal 4d10+10 fire damage",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The damage increases to 7d10+20.
                    """,
                    short_description="Throw to deal 7d10+20 fire damage",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Acid Flask",
            rank=2,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against anything within \\shortrange.
                On a hit, the target takes 2d6+4 acid damage.
            """,
            short_description="Throw to deal 2d6+4 acid damage",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The damage increases to 4d6+7.
                    """,
                    short_description="Throw to deal 4d6+7 acid damage",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The damage increases to 5d10+14.
                    """,
                    short_description="Throw to deal 5d10+14 acid damage",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
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
            upgrades=[
                Upgrade(
                    rank=4,
                    # this should be +3 by the standard progression, but that makes it
                    # weirdly bad compared to Supreme, so round to +4
                    description="""
                        The damage increases to 2d10+4.
                    """,
                    short_description="Throw to deal 2d10+4 fire damage in an area",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The damage increases to 4d8+14.
                    """,
                    short_description="Throw to deal 4d8+14 fire damage in an area",
                ),
            ],
        ),
    ]

    tools.append(
        MagicItem(
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
            consumable=True,
            name="Flash Powder",
            rank=0,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this powder in the air in your location as a standard action.
                When you do, it \\glossterm<briefly> emits a burst of \\glossterm<bright illumination> in a 60 foot radius and \\glossterm<shadowy illumination> in a 120 foot radius.
            """,
            short_description="Emits burst of bright light",
        )
    )

    tools += [
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Thunderstone",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Fortitude against everything in a \\tinyarea radius within \\rngshort range.
                On a hit, each target takes 1d6+1 bludgeoning damage.
                Each creature that loses \\glossterm<hit points> from this damage is \\deafened as a \\glossterm<condition>.
            """,
            short_description="Throw to deal 1d6+1 bludgeoning damage and deafen",
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The damage increases to 1d10+2.
                        In addition, each creature that loses hit points from the damage is also \\dazed as part of the same condition.
                    """,
                    short_description="Throw to deal 1d10+2 bludgeoning damage, deafen, and daze",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The damage increases to 2d8+5.
                        In addition, each creature that loses hit points from the damage is also \\stunned as part of the same condition.
                    """,
                    short_description="Throw to deal 2d8+5 bludgeoning damage, deafen, and stun",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
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
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The damage increases to 2d8+5, and the condition must be removed twice before the effect ends.
                    """,
                    short_description="Throw to deal 2d8+5 cold damage and persistently slow",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
            consumable=True,
            name="Antitoxin Elixir",
            rank=1,
            material_type="Alchemical",
            tags=["Attune"],
            description="""
                When you drink this \\glossterm<potion>, if you \\glossterm<attune> to its effects, you gain a +4 bonus to your defenses against poisons.
                The effects expire after 10 minutes.
            """,
            short_description="Grants +4 defenses against poisons",
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The defense bonus increases to +8.
                    """,
                    short_description="Grants +8 defenses against poisons",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        You become immune to poison instead of gaining a defense bonus.
                    """,
                    short_description="Grants immunity to poisons",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
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
            upgrades=[
                Upgrade(
                    rank=2,
                    description="""
                        The effect lasts for 8 hours.
                    """,
                    short_description="Emits bright illumination for 8 hours",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Tanglefoot Bag",
            rank=2,
            material_type="Alchemical",
            tags=[],
            description="""
                You can throw this item as a standard action.
                When you do, make an attack vs. Reflex against one creature within \\shortrange.
                On a hit, the target is \\slowed as a \\glossterm<condition>.

                Whenever the target moves using one of its movement speeds, it can make a \\glossterm<difficulty value> 5 Strength check as part of the movement.
                If it succeeds, the condition is removed after the movement is complete.
            """,
            short_description="Slows a foe, though it is easily removable",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The condition cannot be removed with a Strength check.
                    """,
                    short_description="Slows a foe",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Torch",
            rank=0,
            material_type="Alchemical",
            tags=[],
            description="""
                \\label<Torch>
                As a standard action, you can light a torch if you have flint and steel or another source of flame handy.
                When you do, it sheds \\glossterm<bright illumination> in a \\smallarea radius, and \\glossterm<shadowy illumination> in a \\medarea radius.
                A torch burns for eight hours before it is destroyed.
            """,
            short_description="Emits light",
        ),
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Everburning Torch",
            rank=1,
            material_type="Alchemical",
            tags=[],
            description="""
                This item functions like a \\mitem<torch>, except that it burns for a week before it is destroyed.
            """,
            short_description="Emits light for a week",
        ),
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Brilliant Torch",
            rank=2,
            material_type="Alchemical",
            tags=[],
            description="""
                As a standard action, you can light a brilliant torch if you have flint and steel or another source of flame handy.
                When you do, it sheds \\glossterm<brilliant illumination> in a \\smallarea radius, \\glossterm<bright illumination> in a \\medarea radius, and \\glossterm<shadowy illumination> in a \\largearea radius.
                A brilliant torch burns for five minutes before it is destroyed.
            """,
            short_description="Emits brilliant light",
        ),
        MagicItem(
            is_magical=False,
            consumable=False,
            name="Belt Lantern",
            rank=1,
            materials=["Metal"],
            tags=[],
            description="""
                This item functions like a \\mitem<torch>, except that you can hang it from a belt, allowing you to shed light without holding an item in your hand.
                However, it is fragile, so clever attackers might smash it easily.
                A belt lantern can burn for one hour before its fuel is expended, and more oil must be added.
            """,
            short_description="Emits light without being held",
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
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
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The Strength bonus increases to +2, and the effect lasts for one hour.
                    """,
                    short_description="Increases weight limits",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The Strength bonus increases to +3, and the effect lasts for eight hours.
                    """,
                    short_description="Increases weight limits",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
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
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The bag reduces the size of contained objects by two size categories instead of one.
                    """,
                    short_description="Shrinks items by two size categories",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The bag reduces the size of contained objects by three size categories instead of one.
                    """,
                    short_description="Shrinks items by three size categories",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
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
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The bag reduces the size and weight of contained objects by two size categories instead of one.
                    """,
                    short_description="Shrinks items by two size and weight categories",
                ),
            ],
        ),
    ]

    # TRAPS
    # Trap accuracy: as elite monster with 4 per, so +2 over base elite monster
    # Trap effect: as rank-appropriate spell with power = half level
    # Trap level: relevant rank - 2 for single-square since it's hard to
    # activate, rank + 1 for easier triggers
    # awareness DR = 9 + level

    tools += [
        MagicItem(
            is_magical=False,
            name="Bear Trap",
            rank=1,
            materials=["metal"],
            tags=[],
            description="""
                As a standard action, you can deploy this trap on a space on the ground adjacent to you.
                While this trap is deployed, a creature can notice it with a \\glossterm<difficulty value> 11 Awareness check.

                The first time a creature walks through that space, the trap makes a +3 attack vs. Armor against it.
                After the trap triggers, it must be manually deployed again.
                On a hit, the creature takes 1d8 damage.
                If it loses \\glossterm<hit points> from this damage, it is \\glossterm<briefly> \\immobilized.
            """,
            short_description="Damages and briefly immobilizes",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The accuracy increases to +8 and the damage increases to 2d8.
                        In addition, the effect becomes a \\glossterm<condition>.
                    """,
                    short_description="Damages and immobilizes",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=True,
            name="Fireburst Trap",
            rank=2,
            materials=["metal"],
            tags=[],
            description="""
                As a standard action, you can deploy this trap on a space on the ground adjacent to you.
                While this trap is deployed, a creature can notice it with a \\glossterm<difficulty value> 14 Awareness check.

                The first time a creature walks through that space, the trap makes a +5 attack vs. Reflex against everything within a \\smallarea radius of it.
                After the trap triggers, it must be manually deployed again.
                On a hit, each target takes 1d10+2 damage.
            """,
            short_description="Deals 1d10+2 fire damage in a small area",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The accuracy increases to +8 and the damage increases to 2d10+4.
                    """,
                    short_description="Deals 2d10+4 fire damage in a small area",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The accuracy increases to +12 and the damage increases to 4d10+7.
                        In addition, the area increases to a \\largearea radius.
                    """,
                    short_description="Deals 4d10+7 fire damage in a large area",
                ),
            ],
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
            name="Artisan's Tools",
            rank=0,
            materials=["metal"],
            tags=[],
            description="""
                These are Small tools that are appropriate to a particular Craft skill other than Craft (alchemy).
                It is very difficult to create items using the Craft skill without this item (see \\pcref<Craft>).
            """,
            short_description="Required for some Craft checks",
        ),
        MagicItem(
            is_magical=False,
            name="Alchemist's Lab",
            rank=2,
            materials=["Alchemy"],
            tags=[],
            description="""
                This is a Medium workstation that contains a wide variety of compounds and reagents.
                It is very difficult to create items using the Craft (alchemy) skill without this item (see \\pcref<Craft>).
            """,
            short_description="Required for some Craft (alchemy) checks",
        ),
        MagicItem(
            is_magical=False,
            name="Disguise Kit",
            rank=1,
            materials=["Alchemy", "Textiles"],
            tags=[],
            description="""
                This is a Small kit that contains a wide variety of fabrics, makeup, and other useful tools for disguising your appearance.
                It is very difficult to create disguises using the Disguise skill without this item (see \\pcref<Disguise>).
            """,
            short_description="Required for some Disguise checks",
        ),
        MagicItem(
            is_magical=False,
            name="Medical Kit",
            rank=1,
            materials=["Textiles"],
            tags=[],
            description="""
                This is a Small kit that contains a wide variety of bandages, salves, and other useful tools for treating wounds.
                It is very difficult to treat wounds using the Medicine skill without this item (see \\pcref<Medicine>).
            """,
            short_description="Required for some Medicine checks",
        ),
        MagicItem(
            is_magical=False,
            name="Thieves' Tools",
            rank=1,
            materials=["Metal", "Textiles"],
            tags=[],
            description="""
                This is a Small kit that contains a wide variety of lockpicks and device-manipulation tools.
                It is very difficult to manipulate devices using the Devices skill without this item (see \\pcref<Devices>).
            """,
            short_description="Required for some Devices checks",
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
            name="Lock, simple",
            rank=0,
            materials=["Metal"],
            tags=[],
            description="""
                This is a lock.
                Opening the lock without the appropriate key requires a \\glossterm<difficulty value> 15 Devices check (see \\pcref<Devices>).
            """,
            short_description="Devices difficulty value of 15 to unlock",
        ),
        MagicItem(
            is_magical=False,
            name="Lock, quality",
            rank=1,
            materials=["Metal"],
            tags=[],
            description="""
                This is a lock.
                Opening the lock without the appropriate key requires a \\glossterm<difficulty value> 20 Devices check (see \\pcref<Devices>).
            """,
            short_description="Devices difficulty value of 20 to unlock",
        ),
        MagicItem(
            is_magical=False,
            name="Lock, masterwork",
            rank=2,
            materials=["Metal"],
            tags=[],
            description="""
                This is a lock.
                Opening the lock without the appropriate key requires a \\glossterm<difficulty value> 25 Devices check (see \\pcref<Devices>).
            """,
            short_description="Devices difficulty value of 25 to unlock",
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
            name="Manacles, simple",
            rank=0,
            materials=["Metal"],
            tags=[],
            description="""
                This is a set of manacles designed for Medium humanoid creatures.
                Escaping the manacles while they are being worn requires a \\glossterm<difficulty value> 15 Flexibility check (see \\pcref<Flexibility>).
            """,
            short_description="Flexibility difficulty value of 15 to escape",
        ),
        MagicItem(
            is_magical=False,
            name="Manacles, quality",
            rank=1,
            materials=["Metal"],
            tags=[],
            description="""
                This is a set of manacles designed for Medium humanoid creatures.
                Escaping the manacles while they are being worn requires a \\glossterm<difficulty value> 25 Flexibility check (see \\pcref<Flexibility>).
            """,
            short_description="Flexibility difficulty value of 20 to escape",
        ),
        MagicItem(
            is_magical=False,
            name="Manacles, masterwork",
            rank=2,
            materials=["Metal"],
            tags=[],
            description="""
                This is a set of manacles designed for Medium humanoid creatures.
                Escaping the manacles while they are being worn requires a \\glossterm<difficulty value> 25 Flexibility check (see \\pcref<Flexibility>).
            """,
            short_description="Flexibility difficulty value of 25 to escape",
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
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
            is_magical=False,
            name="Caltrops",
            rank=0,
            materials=["Wood"],
            tags=[],
            description="""
                A caltrop is a four-pronged iron spike crafted so that one prong faces up no matter how the caltrop comes to rest.
                You scatter caltrops on the ground in the hope that your enemies step on them or are at least forced to slow down to avoid them.
                One 2-pound bag of caltrops covers a 5-foot square.

                Whenever a creature moves into the area, unless the creature moves at one quarter speed to avoid the danger, the caltrops make a \\glossterm<reactive attack> vs. Armor against the creature.
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
            is_magical=False,
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
            is_magical=False,
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
            is_magical=False,
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

    # POISONS - non-injury
    # Poison accuracy: (level / 2) + 2
    # TODO: define poison ranks properly, especially for damage over time
    # For now, treat poison DOT ending on stage 3 as a rank 3 effect; it's
    # halfway between Ignition and Greater Ignition
    # Stage 3 effects get to be rank+4, since they are slow and rare
    tools += [
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Nitharit",
            rank=1,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based powder poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus2.
                Its stage 1 effect makes the target \\dazed while the poison lasts.
                Its stage 3 effect makes the target \\stunned while the poison lasts.
            """,
            short_description="Dazes and eventually stuns",
        ),
        # -2 ranks for -1d
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Sassone Leaf",
            rank=1,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based powder poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus2.
                Its stage 1 effect inflicts 1d6+1 damage each time the poison's attack succeeds.
                Its stage 3 effect also ends the poison.
            """,
            short_description="Deals 1d6+1 damage per stage",
        ),
        # -2 ranks for -1d
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Jellyfish Extract",
            rank=1,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus2.
                Its stage 1 effect inflicts 1d6+1 damage each time the poison's attack succeeds.
                Its stage 3 effect also ends the poison.
            """,
            short_description="Deals 1d6+1 damage per stage",
        ),
        # +1 rank for +1 accuracy
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Bloodroot",
            rank=2,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus5.
                Its stage 1 effect makes the target \\dazed while the poison lasts.
                Its stage 3 effect makes the target \\stunned while the poison lasts.
            """,
            short_description="Dazes and eventually stuns",
        ),
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Arsenic",
            rank=3,
            material_type="Poison",
            tags=[],
            description="""
                This is an ingestion-based powder poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus5.
                Its stage 1 effect inflicts 2d6+2 damage each time the poison's attack succeeds.
                Its stage 3 effect also ends the poison.
            """,
            short_description="Deals 2d6+2 damage",
        ),
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Dragon Bile",
            rank=5,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus8.
                Its stage 1 effect inflicts 2d10+5 damage each time the poison's attack succeeds.
            """,
            short_description="Deals 2d10+5 damage endlessly",
        ),
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Insanity Mist",
            rank=5,
            material_type="Poison",
            tags=[],
            description="""
                This is an ingestion-based gas poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus8.
                Its stage 1 effect makes the target \\stunned while the poison lasts.
                Its stage 3 effect makes the target \\confused while the poison lasts.
            """,
            short_description="Stuns and eventually confuses",
        ),
        # +1 rank for +1 accuracy
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Black Lotus",
            rank=6,
            material_type="Poison",
            tags=[],
            description="""
                This is a contact-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus11.
                The target takes 4d6+7 damage each time the poison's attack succeeds.
            """,
            short_description="Deals 4d6+7 damage endlessly",
        ),
    ]

    # Injury-based poisons
    # Accuracy: (level / 2) + 2
    # Effect: as hp-only effect, so generally rank + 4
    # Damage over time is underwhelming as a HP-only effect, so damage over time
    # works as if it was 2 ranks higher
    tools += [
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Asp Venom",
            rank=1,
            material_type="Poison",
            tags=[],
            description="""
                This is an injury-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus2.
                Its stage 1 effect makes the target \\stunned while the poison lasts.
                Its stage 3 effect makes the target \\blinded while the poison lasts.
            """,
            short_description="Stuns and eventually blinds",
        ),
        # +1 rank for +1 accuracy
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Giant Wasp Venom",
            rank=1,
            material_type="Poison",
            tags=[],
            description="""
                This is a injury-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus3.
                Its stage 1 effect makes the target \\slowed while the poison lasts.
                Its stage 3 effect makes the target \\immobilized while the poison lasts.
            """,
            short_description="Slows, eventually immobilizes",
        ),
        # +1 rank for +1 accuracy
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Black Adder Venom",
            rank=2,
            material_type="Poison",
            tags=[],
            description="""
                This is a injury-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus4.
                Its stage 1 effect inflicts 2d8+3 damage each time the poison's attack succeeds.
            """,
            short_description="Deals 2d8+3 damage endlessly",
        ),
        # +2 ranks for full power
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Wyvern Venom",
            rank=3,
            material_type="Poison",
            tags=[],
            description="""
                This is a injury-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus5.
                Its stage 1 effect inflicts 2d10+5 damage each time the poison's attack succeeds.
            """,
            short_description="Deals 2d10+5 damage endlessly",
        ),
        # +1 rank for +1 accuracy, +2 ranks for full power
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Purple Worm Venom",
            rank=4,
            material_type="Poison",
            tags=[],
            description="""
                This is a injury-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus8.
                Its stage 1 effect inflicts 4d6+7 damage each time the poison's attack succeeds.
            """,
            short_description="Deals 4d6+7 damage endlessly",
        ),
        MagicItem(
            is_magical=True,
            consumable=True,
            name="Poison, Cockatrice Venom",
            rank=5,
            material_type="Poison",
            tags=[],
            description="""
                This is a injury-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus8.
                Its stage 1 effect makes the target \\slowed and \\stunned while the poison lasts.
                Its stage 3 effect makes the target \\petrified while the poison lasts.
            """,
            short_description="Slows and stuns, eventually petrifies",
        ),
        MagicItem(
            is_magical=False,
            consumable=True,
            name="Poison, Blood Leech Venom",
            rank=5,
            material_type="Poison",
            tags=[],
            description="""
                This is a injury-based liquid poison (see \\pcref<Poison>).
                The poison's accuracy is \\plus8.
                Its stage 1 effect makes the target \\vulnerable to all damage while the poison lasts.
            """,
            short_description="Inflicts damage vulnerability",
        ),
    ]

    tools += [
        MagicItem(
            is_magical=False,
            name="Universal Artisan's Tools",
            rank=1,
            materials=["metal"],
            tags=[],
            description="""
                This item can serve as artisan's tools for any Craft check except for Craft (alchemy).
            """,
            short_description="Use to craft almost item",
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The tools also grant a +2 \\glossterm<magic bonus> to the Craft skill when using this item to create an item.
                        This provides no benefit when using the Craft skill for other purposes, such as to appraise an item.
                    """,
                    short_description="Use to craft any item with +2 bonus",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The magic bonus increases to +4.
                    """,
                    short_description="Use to craft any item with +4 bonus",
                ),
            ],
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
    tools = generate_tools()
    consumable_tools = list(filter(lambda t: t.consumable, tools))
    permanent_tools = list(filter(lambda t: not t.consumable, tools))

    return generate_table(
        consumable_tools,
        "Consumable Tools",
        include_type=True,
        wrapper_text=r"\tablebookmark<Consumable Tools><consumabletools>",
    ) + generate_table(
        permanent_tools,
        "Permanent Tools, Goods, and Mounts",
        include_type=False,
        wrapper_text=r"\tablebookmark<Permanent Tools, Goods, and Mounts><permanenttools>",
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
