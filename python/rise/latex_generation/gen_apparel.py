#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem, Upgrade, generate_table
from rise.latex.util import latexify
from rise.latex.tags import add_attune_tag


def create_apparel(
    name, rank, material_type, description, short_description, tags=None, upgrades=None
):
    return MagicItem(
        name=name,
        rank=rank,
        material_type=material_type,
        description=description,
        short_description=short_description,
        is_magical=True,
        tags=add_attune_tag(tags),
        upgrades=upgrades,
    )


def generate_apparel():
    apparel = []

    apparel += [
        create_apparel(
            name="Blind Seer's Circlet",
            rank=3,
            material_type="Circlet",
            tags=[],
            description="""
                If you have \\trait<blindsense>, you increase its range by 30 feet.
                If you have \\trait<blindsight>, you increase its range by 15 feet.
            """,
            short_description="Increases range of blindsense and blindsight",
            upgrades=[
                Upgrade(
                    description="Your blindsense increases by 60 feet, and your blindsight increases to 30 feet.",
                    rank=5,
                ),
                Upgrade(
                    description="Your blindsense increases by 120 feet, and your blindsight increases to 60 feet.",
                    rank=7,
                ),
            ],
        ),
    ]

    # Arm

    apparel += [
        create_apparel(
            name="Ambidextrous Gloves",
            rank=2,
            material_type="Glove",
            description="""
                You can \\glossterm<dual wield> regardless of your Dexterity (see \\pcref{Dual Wielding}).
            """,
            short_description="Allows dual wielding without Dexterity",
        ),
    ]

    apparel += [
        create_apparel(
            name="Bracers of Archery",
            rank=1,
            material_type="Bracers",
            description="""
                You are proficient with bows.
            """,
            short_description="Grants bow proficiency",
            upgrades=[
                Upgrade(
                    description="You are also proficient with exotic bows (see \\pcref<Exotic Weapons>)",
                    rank=3,
                    short_description="Grants exotic bow proficiency",
                ),
            ]
        ),
    ]

    apparel += [
        create_apparel(
            name="Bracers of Armor",
            rank=2,
            material_type="Bracers",
            tags=[],
            description="""
                You have a translucent suit of magical armor on your body and over your hands.
                This functions like body armor that provides a +3 bonus to Armor defense and has no \\glossterm<encumbrance>.
                It also provides a +6 bonus to your \\glossterm{damage resistance}.

                As long as you have a free hand, the barrier also manifests as a shield that provides a +1 bonus to Armor defense.
                This bonus is considered to come from a shield, and does not stack with the benefits of using any other shield.

                The armor and shield provided from this ability are dismissed if you have other body armor of any kind.
            """,
            short_description="Grants encumbrance-free medium armor",
            upgrades=[
                Upgrade(
                    description="The damage resistance bonus increases to +12.",
                    rank=4,
                    short_description="Grants encumbrance-free medium armor",
                ),
                Upgrade(
                    description="The damage resistance bonus increases to +24.",
                    rank=6,
                    short_description="Grants encumbrance-free medium armor",
                ),
            ],
        ),
    ]

    apparel += [
        create_apparel(
            name="Shieldburst Bracers",
            rank=1,
            material_type="Bracers",
            tags=["Swift"],
            description="""
                As a \\glossterm<free action>, you activate these bracers.
                When you do, you increase your \\glossterm<fatigue level> by one and gain a +2 bonus to your Armor defense this round.
            """,
            short_description="Can exert to gain instant +2 Armor defense",
            upgrades=[
                Upgrade(
                    description="The defense bonus increases to +3.",
                    rank=3,
                    short_description="Can exert to gain instant +3 Armor defense",
                ),
                Upgrade(
                    description="The defense bonus increases to +4.",
                    rank=5,
                    short_description="Can exert to gain instant +4 Armor defense",
                ),
            ],
        ),
    ]

    # TODO: Figure out correct rank and scaling
    apparel += [
        create_apparel(
            name="Bracers of Repulsion",
            rank=3,
            material_type="Bracers",
            description="""
                As a standard action, you can activate these bracers.
                When you do, they emit a telekinetic burst of force.
                Make an attack vs. Fortitude against everything within a \\areasmall radius burst from you.
                On a hit, you \\glossterm<knockback> each target up to 15 feet in a straight line directly away from you.
            """,
            short_description="Can knock nearby creatures back",
            upgrades=[
                Upgrade(
                    description="The area increases to a \\arealarge radius that only affects your enemies, and the knockback distance increases to 30 feet.",
                    rank=6,
                    short_description="Can knock enemies back",
                ),
            ],
        ),
    ]

    apparel.append(
        create_apparel(
            name="Torchlight Gloves",
            rank=1,
            material_type="Gloves",
            tags=[],
            description="""
                These gloves shed light as a torch.
                As a \\glossterm<standard action>, you may snap your fingers to suppress or resume the light from either or both gloves.
            """,
            short_description="Sheds light as a torch",
        )
    )

    apparel += [
        create_apparel(
            name="Gauntlets of Improvisation",
            rank=2,
            material_type="Gauntlet",
            description="""
                You are \\glossterm<proficient> with \\glossterm<improvised weapons> (see \\pcref<Weapon Proficiency>).
            """,
            short_description="Grants proficiency with improvised weapons",
        ),
    ]

    apparel += [
        create_apparel(
            name="Gauntlet of the Ram",
            rank=2,
            material_type="Gauntlet",
            description="""
                Your punch/kick \\glossterm<natural weapon> gains the Forceful \\glossterm<weapon tag> (see \\pcref<Weapon Tags>).
            """,
            short_description="Knocks back punched enemies",
        ),
        create_apparel(
            name="Gauntlet of the Ram, Greater",
            rank=5,
            material_type="Gauntlet",
            description="""
                Your punch/kick \\glossterm<natural weapon> gains the Forceful \\glossterm<weapon tag> (see \\pcref<Weapon Tags>).
                In addition, the \\glossterm<knockback> distance from that tag increases to 30 feet.
            """,
            short_description="Knocks back punched enemies a great distance",
        ),
    ]

    apparel += [
        create_apparel(
            name="Greatreach Bracers",
            rank=4,
            material_type="Bracers",
            description="""
                Your melee \\glossterm{strikes} gain the \\weapontag{Long} weapon tag, allowing you to attack targets up to 10 feet away from you (see \\pcref{Weapon Tags}).
            """,
            short_description="Allows attacking non-adjacent foes",
        ),
    ]

    apparel += [
        create_apparel(
            name="Throwing Gloves",
            rank=2,
            material_type="Gloves",
            description="""
                You can throw any item as if it had the Thrown (30/60) \\glossterm<weapon tag> (see \\pcref<Weapon Tags>).
                The item must be at least one size category smaller than you, and you must be able to pick it up within your \\glossterm<weight limits>.
            """,
            short_description="Allows throwing objects up to 60 feet",
        ),
        create_apparel(
            name="Throwing Gloves, Greater",
            rank=6,
            material_type="Gloves",
            description="""
                You can throw any item as if it had the Thrown (60/120) \\glossterm<weapon tag> (see \\pcref<Weapon Tags>).
                The item must be at least one size category smaller than you, and you must be able to pick it up within your \\glossterm<weight limits>.
            """,
            short_description="Allows throwing objects up to 120 feet",
        ),
    ]

    apparel += [
        create_apparel(
            name="Gloves of Telekinetic Propulsion",
            rank=2,
            material_type="Gloves",
            description="""
                When you make a \\glossterm<thrown> \\glossterm<strike>, you reduce your \\glossterm<longshot penalty> by 1.
            """,
            short_description="Reduces thrown longshot penalty by 1",
        ),
        create_apparel(
            name="Gloves of Telekinetic Propulsion, Greater",
            rank=5,
            material_type="Gloves",
            description="""
                When you make a \\glossterm<thrown> \\glossterm<strike>, you reduce your \\glossterm<longshot penalty> by 2.
            """,
            short_description="Reduces thrown longshot penalty by 1",
        ),
    ]
    # Head

    apparel += [
        # close range, +1d = rank 2 spell
        create_apparel(
            name="Circlet of Blasting",
            rank=2,
            material_type="Circlet",
            tags=[],
            description="""
                As a standard action, you can activate this circlet.
                When you do, make an attack vs. Armor against a creature or object within \\rngshort range.
                \\hit The target takes 2d8+4 fire damage.
            """,
            short_description="Can blast foe with fire",
        ),
        # close range, +2d = rank 4 spell
        create_apparel(
            name="Circlet of Blasting, Greater",
            rank=4,
            material_type="Circlet",
            tags=[],
            description="""
                As a standard action, you can activate this circlet.
                When you do, make an attack vs. Armor against a creature or object within \\rngshort range.
                \\hit The target takes 4d8+7 fire damage.
            """,
            short_description="Can blast foe with intense fire",
        ),
        # close range, +3d = rank 6 spell, so this is priced as rank 7
        create_apparel(
            name="Circlet of Blasting, Supreme",
            rank=6,
            material_type="Circlet",
            tags=[],
            description="""
                As a standard action, you can activate this circlet.
                When you do, make an attack vs. Armor against a creature or object within \\rngshort range.
                \\hit The target takes 6d10+14 fire damage.
            """,
            short_description="Can blast foe with supremely intense fire",
        ),
    ]

    apparel += [
        create_apparel(
            name="Circlet of Persuasion",
            rank=1,
            material_type="Circlet",
            description="""
                You gain a +2 \\glossterm<magic bonus> to the Persuasion skill (see \\pcref<Persuasion>).
            """,
            short_description="Grants +2 Persuasion",
        ),
        create_apparel(
            name="Circlet of Persuasion, Greater",
            rank=3,
            material_type="Circlet",
            description="""
                You gain a +3 \\glossterm<magic bonus> to the Persuasion skill (see \\pcref<Persuasion>).
            """,
            short_description="Grants +3 Persuasion",
        ),
        create_apparel(
            name="Circlet of Persuasion, Supreme",
            rank=5,
            material_type="Circlet",
            description="""
                You gain a +4 \\glossterm<magic bonus> to the Persuasion skill (see \\pcref<Persuasion>).
            """,
            short_description="Grants +4 Persuasion",
        ),
    ]

    apparel.append(
        create_apparel(
            name="Mask of Water Breathing",
            rank=2,
            material_type="Mask",
            description="""
            You can breathe water through this mask as easily as a human breathes air.
            This does not grant you the ability to breathe other liquids.
        """,
            short_description="Allows breathing water like air",
        )
    )

    apparel.append(
        create_apparel(
            name="Ring of Breath",
            rank=1,
            material_type="Ring",
            tags=[],
            description="""
                As a \\glossterm<free action>, you can activate this item.
                When you do, you increase your \\glossterm<fatigue level> by one, and you can \\glossterm<briefly> breathe in clean, fresh air regardless of your environment.
                This can be used in emergencies to save yourself from drowning or other perils.
            """,
            short_description="Can exert to breathe briefly",
        )
    )

    apparel.append(
        create_apparel(
            name="Mask of Air",
            rank=3,
            material_type="Mask",
            description="""
            If you breathe through this mask, you breathe in clean, fresh air, regardless of your environment.
            This can protect you from inhaled poisons and similar effects.
        """,
            short_description="Allows breathing in any environment",
        )
    )

    apparel += [
        create_apparel(
            name="Crown of Lightning",
            rank=2,
            material_type="Crown",
            tags=[],
            description="""
                This crown continuously crackles with electricity.
                The constant sparks shed light as a torch.

                As a standard action, you can intensify the crown's energy to shock nearby enemies.
                When you do, make an attack vs. Fortitude against your \\glossterm<enemies> within a \\areasmall radius from you.
                On a hit, each target takes 1d10+2 electricity damage.
            """,
            short_description="Can deal 1d10+2 damage to nearby foes",
        ),
        create_apparel(
            name="Crown of Lightning, Greater",
            rank=5,
            material_type="Crown",
            tags=[],
            description="""
                This crown continuously crackles with electricity.
                The constant sparks shed light as a torch.

                As a standard action, you can intensify the crown's energy to shock nearby enemies.
                When you do, make an attack vs. Fortitude against your \\glossterm<enemies> within a \\areamed radius from you.
                On a hit, each target takes 4d6+5 electricity damage.
            """,
            short_description="Can deal 4d6+5 damage to nearby foes",
        ),
    ]

    apparel.append(
        create_apparel(
            name="Crown of Thunder",
            rank=5,
            material_type="Crown",
            tags=[],
            description="""
                The crown constantly emits a low-pitched rumbling.
                To you and your \\glossterm<allies>, the sound is barely perceptible.
                However, all other creatures within a \\medarea radius \\glossterm<emanation> from you hear the sound as a deafening, continuous roll of thunder.
                The noise blocks out all other sounds quieter than thunder, causing them to be \\deafened while they remain in the area.
            """,
            short_description="Continously deafens nearby enemies",
        )
    )

    # Legs

    apparel.append(
        create_apparel(
            name="Crater Boots",
            rank=4,
            material_type="Boots",
            description="""
                % This only works if you only take falling damage during the movement phase, which seems possible?
                When you take \\glossterm<falling damage>, make an attack vs Reflex against everything within a \\areasmall radius from you.
                \\hit Each target takes bludgeoning damage equal to half the damage you took from falling.
                \\crit As above, and each target is knocked \\prone.
                This attack does not deal extra damage on a critical hit.
            """,
            short_description="Deals your falling damage to enemies",
        )
    )

    apparel += [
        create_apparel(
            name="Phasestep Boots",
            rank=2,
            material_type="Boots",
            tags=[],
            description="""
                As a \\glossterm<free action>, you can activate these boots.
                When you do, you increase your \\glossterm<fatigue level> by one, and you may move through creatures freely when you move using one of your movement speeds this round.
                This does not allow you to move through inanimate objects.
                If you end your movement in spaces occupied by other creatures, both of you are still \\squeezing.
                If you are not able to move normally, such as if you are \\grappled, these boots do not help you.
            """,
            short_description="Can exert to briefly move through creatures",
        ),
        create_apparel(
            name="Phasestep Boots, Greater",
            rank=4,
            material_type="Boots",
            tags=[],
            description="""
                These boots function like \\mitem<phasestep boots>, except that their effect is always active.
            """,
            short_description="Can move through creatures",
        ),
        create_apparel(
            name="Phasestep Boots, Supreme",
            rank=6,
            material_type="Boots",
            tags=[],
            description="""
                These boots function like \\mitem<phasestep boots>, except that their effect is always active.
                In addition, you ignore all sources of \\glossterm<difficult terrain>.
            """,
            short_description="Can move through creatures and some terrain",
        ),
    ]

    apparel += [
        create_apparel(
            name="Boots of the Skydancer",
            rank=3,
            material_type="Boots",
            tags=[],
            description="""
                As a \\glossterm<free action>, you can activate these boots.
                When you do, you may treat air as if it were solid ground to your feet for the rest of the current phase.
                You may selectively choose when to treat the air as solid ground, allowing you to walk or jump on air freely.
                These boots cannot be activated again until you land on a solid surface capable of supporting your weight.
            """,
            short_description="Can very briefly walk on air",
        ),
        create_apparel(
            name="Boots of the Skydancer, Greater",
            rank=5,
            material_type="Boots",
            tags=[],
            description="""
                These boots function like \\magicitem<boots of the skydancer>, except that the ability lasts \\glossterm<briefly>.
            """,
            short_description="Can briefly walk on air",
        ),
    ]

    apparel += [
        create_apparel(
            name="Boots of Freedom",
            rank=4,
            material_type="Boots",
            description="""
                You are immune to being \\slowed, \\immobilized, and \\paralyzed.
            """,
            short_description="Grants immunity to common mobility restrictions",
        ),
        create_apparel(
            name="Boots of Freedom, Greater",
            rank=7,
            material_type="Boots",
            description="""
                You are immune to being \\slowed, \\immobilized, and \\paralyzed.
                In addition, you are unaffected by \\glossterm<difficult terrain> and immune to being \\grappled or knocked \\prone.
            """,
            short_description="Grants immunity to almost all mobility restrictions",
        ),
    ]

    apparel += [
        create_apparel(
            name="Boots of Gravitation",
            rank=3,
            material_type="Boots",
            description="""
                Once per phase, while you are within 5 feet of an \\glossterm<unattended> object at least one size category larger than you, you can take a \\glossterm<free action> to adjust your personal gravity.
                When you do, gravity pulls you towards that surface instead of in the normal direction.
                This allows you to walk normally on walls or even ceilings.

                Whenever you change the direction that gravity pulls you, you must make a \\glossterm<difficulty value> 10 Balance check to keep your feet.
                Failure means you fall \\prone and your movement for that phase ends.
            """,
            short_description="Redirects personal gravity to adjacent objects",
        ),
        create_apparel(
            name="Boots of Gravitation, Greater",
            rank=5,
            material_type="Boots",
            description="""
                These boots function like \\mitem<boots of gravitation>, except that the maximum distance increases to 15 feet.
                This can allow you to pull yourself towards distant objects, though you may take falling damage if you fall too far.
            """,
            short_description="Redirects personal gravity to nearby objects",
        ),
        create_apparel(
            name="Boots of Gravitation, Supreme",
            rank=7,
            material_type="Boots",
            description="""
                These boots function like \\mitem<boots of gravitation>, except that the maximum distance increases to 30 feet.
                This can allow you to pull yourself towards distant objects, though you may take falling damage if you fall too far.
            """,
            short_description="Redirects personal gravity to distant objects",
        ),
    ]

    apparel += [
        create_apparel(
            name="Boots of Speed",
            rank=5,
            material_type="Boots",
            tags=[],
            description="""
                You gain a +10 foot \\glossterm<magic bonus> to your land speed.
            """,
            short_description="Increases speed by 10 feet",
        ),
    ]

    apparel += [
        create_apparel(
            name="Boots of the Fearful",
            rank=1,
            material_type="Boots",
            tags=[],
            description="""
                Whenever you become \\shaken, \\frightened, or \\panicked, if you were not already suffering any of those effects, you \\glossterm<briefly> gain a +2 bonus to your Armor defense and Reflex defense, as well as a +10 foot bonus to your land speed.
            """,
            short_description="Helps you survive when you become afraid",
        ),
        create_apparel(
            name="Boots of the Fearful, Greater",
            rank=5,
            material_type="Boots",
            tags=[],
            description="""
                Whenever you become \\shaken, \\frightened, or \\panicked, if you were not already suffering any of those effects, you \\glossterm<briefly> gain a +4 bonus to your Armor defense and Reflex defense, as well as a +20 foot bonus to your land speed.
            """,
            short_description="Drastically helps you survive when you become afraid",
        ),
    ]

    apparel += [
        create_apparel(
            name="Belt of Scuttling",
            rank=2,
            material_type="Belt",
            tags=[],
            description="""
                Being \\prone does not reduce your movement speed.
            """,
            short_description="Move at full speed while prone",
        ),
        create_apparel(
            name="Belt of Scuttling, Greater",
            rank=4,
            material_type="Belt",
            tags=[],
            description="""
                Being \\prone does not reduce your movement speed or your defenses.
            """,
            short_description="Move at full speed and defend normally while prone",
        ),
    ]

    apparel += [
        create_apparel(
            name="Lifesaver Ring",
            rank=2,
            material_type="Ring",
            tags=[],
            description="""
                At the end of each round, if you are below half your maximum \\glossterm<hit points>, you regain 1d6 hit points.
                This effect cannot heal you above half your maximum hit points.
            """,
            short_description="Regains 1d6 hit points while below half hit points",
        ),
        create_apparel(
            name="Lifesaver Ring, Greater",
            rank=4,
            material_type="Ring",
            tags=[],
            description="""
                At the end of each round, if you are below half your maximum \\glossterm<hit points>, you regain 2d6 hit points.
                This effect cannot heal you above half your maximum hit points.
            """,
            short_description="Regains 2d6 hit points while below half hit points",
        ),
        create_apparel(
            name="Lifesaver Ring, Supreme",
            rank=6,
            material_type="Ring",
            tags=[],
            description="""
                At the end of each round, if you are below half your maximum \\glossterm<hit points>, you regain 4d6 hit points.
                This effect cannot heal you above half your maximum hit points.
            """,
            short_description="Regains 4d6 hit points while below half hit points",
        ),
    ]

    apparel += [
        create_apparel(
            name="Dazeshare Ring",
            rank=2,
            material_type="Ring",
            tags=[],
            description="""
                Whenever you become \\dazed, \\stunned, or \\confused, make a \\glossterm<reactive attack> vs. Mental against all \\glossterm<enemies> adjacent to you.
                On a hit, each target becomes \\glossterm<briefly> dazed.
            """,
            short_description="Dazes enemies when you are dazed or worse",
        ),
        create_apparel(
            name="Stunshare Ring",
            rank=6,
            material_type="Ring",
            tags=[],
            description="""
                Whenever you become \\dazed, \\stunned, or \\confused, make a \\glossterm<reactive attack> vs. Mental against all \\glossterm<enemies> adjacent to you.
                On a hit, each target becomes \\glossterm<briefly> stunned.
            """,
            short_description="Stuns enemies when you are dazed or worse",
        ),
    ]

    apparel.append(
        create_apparel(
            name="Astral Boots",
            rank=6,
            material_type="Boots",
            tags=[],
            description="""
                When you move using one of your movement speeds, you can teleport the same distance instead.
                This does not change the total distance you can move, but you can teleport in any direction, even vertically.
                You must teleport into an unoccupied location onto a stable surface that can support your weight.
                You cannot teleport to locations you do not have \\glossterm<line of sight> and \\glossterm<line of effect> to.
            """,
            short_description="Allows teleporting instead of moving",
        )
    )

    apparel.append(
        create_apparel(
            name="Boots of Water Walking",
            rank=3,
            material_type="Boots",
            description="""
                You treat the surface of all liquids as if they were firm ground.
                Your feet hover about an inch above the liquid's surface, allowing you to traverse dangerous liquids without harm as long as the surface is calm.

                If you are below the surface of the liquid, you rise towards the surface at a rate of 60 feet per round.
                Thick liquids, such as mud and lava, may cause you to rise more slowly.
            """,
            short_description="Allows walking on liquids",
        )
    )

    apparel.append(
        create_apparel(
            name="Boots of the Winterlands",
            rank=1,
            material_type="Boots",
            description="""
                You can travel across snow and ice without slipping or suffering movement penalties for the terrain.
                % TODO: degree symbol?
                In addition, the boots keep you warm, protecting you in environments as cold as -50 degrees Fahrenheit.
            """,
            short_description="Eases travel in cold areas",
        )
    )

    apparel += [
        create_apparel(
            name="Cloak of the Noble Rider",
            rank=2,
            material_type="Cloak",
            description="""
                Whenever a mount that you are riding would gain a \\glossterm<vital wound>, you may activate this cloak.
                When you do, the mount does not gain a vital wound.
                However, it immediately falls unconscious until it finishes a \\glossterm<short rest>, and you increase your \\glossterm<fatigue level> by one.
            """,
            short_description="Can exert to save your mount from a vital wound",
        ),
        create_apparel(
            name="Cloak of the Noble Rider, Greater",
            rank=4,
            material_type="Cloak",
            description="""
                Whenever a mount that you are riding would gain a \\glossterm<vital wound>, you may activate this cloak.
                When you do, the mount does not gain a vital wound.
                However, it immediately falls unconscious until it finishes a \\glossterm<short rest>.
            """,
            short_description="Can save your mount from vital wounds",
        ),
    ]

    apparel += [
        create_apparel(
            name="Ghost Shroud",
            rank=2,
            material_type="Cloak",
            description="""
                Creatures that are \\glossterm<incorporeal> are only \\glossterm<impervious> to physical damage you inflict instead of being immmune to it.
            """,
            short_description="Grants limited ability to hit incorporeal creatures",
        ),
        create_apparel(
            name="Ghost Shroud, Greater",
            rank=4,
            material_type="Cloak",
            description="""
                Creatures that are \\glossterm<incorporeal> are not immune to physical damage you inflict.
            """,
            short_description="Grants ability to hit incorporeal creatures",
        ),
        create_apparel(
            name="Ghost Shroud, Supreme",
            rank=6,
            material_type="Cloak",
            description="""
                Creatures that are \\glossterm<incorporeal> are \\glossterm<vulnerable> to physical damage you inflict instead of being immune.
            """,
            short_description="Grants ability to hit incorporeal creatures with ease",
        ),
    ]

    apparel.append(
        create_apparel(
            name="Cloak of the Unseen Hunter",
            rank=6,
            material_type="Cloak",
            description="""
                You gain a +1 \\glossterm<accuracy> bonus against creatures that you have \\glossterm<concealment> from.
            """,
            short_description="Grants +1 accuracy while you have concealment",
        ),
    )

    apparel.append(
        create_apparel(
            name="Boots of the Desertlands",
            rank=1,
            material_type="Boots",
            description="""
            You can travel across sand, including quicksand, without slipping or suffering movement penalties for the terrain.
            % TODO: degree symbol?
            In addition, the boots keep you cool, protecting you in environments as warm as 100 degrees Fahrenheit.
        """,
            short_description="Eases travel in deserts",
        )
    )

    apparel.append(
        create_apparel(
            name="Seven League Boots",
            rank=4,
            material_type="Boots",
            tags=[],
            description="""
                As a standard action, you can activate these boots.
                When you do, you increase your \\glossterm<fatigue level> by one and teleport horizontally exactly 25 miles in a direction you specify.
                If this would place you within a solid object or otherwise impossible space, the boots will shunt you up to 1,000 feet in any direction to the closest available space.
                If there is no available space within 1,000 feet of your intended destination, the effect fails and you take 4d6 energy damage.
            """,
            short_description="Can exert to teleport seven leagues",
        )
    )

    apparel += [
        create_apparel(
            name="Winged Boots",
            rank=5,
            material_type="Boots",
            description="""
                You gain a \\glossterm<fly speed> equal to the \\glossterm<base speed> for your size with a maximum height of 15 feet (see \\pcref<Flying>).
            """,
            short_description="Grants flight up to 15 feet high",
        ),
        create_apparel(
            name="Winged Boots, Greater",
            rank=7,
            material_type="Boots",
            description="""
                These boots function like \\mitem<winged boots>, except that the \\glossterm<height limit> increases to 30 feet.
            """,
            short_description="Grants flight up to 30 feet high",
        ),
    ]

    apparel += [
        create_apparel(
            name="Boots of Elvenkind",
            rank=1,
            material_type="Boots",
            description="""
                You gain a +2 \\glossterm<magic bonus> to the Stealth skill (see \\pcref<Stealth>).
            """,
            short_description="Grants +2 Stealth",
        ),
        create_apparel(
            name="Boots of Elvenkind, Greater",
            rank=3,
            material_type="Boots",
            description="""
                You gain a +3 \\glossterm<magic bonus> to the Stealth skill (see \\pcref<Stealth>).
            """,
            short_description="Grants +3 Stealth",
        ),
        create_apparel(
            name="Boots of Elvenkind, Supreme",
            rank=5,
            material_type="Boots",
            description="""
                You gain a +4 \\glossterm<magic bonus> to the Stealth skill (see \\pcref<Stealth>).
            """,
            short_description="Grants +4 Stealth",
        ),
    ]

    # Rings

    apparel.append(
        create_apparel(
            name="Ring of Elemental Endurance",
            rank=1,
            material_type="Ring",
            tags=[],
            description="""
            You can exist comfortably in conditions between -50 and 140 degrees Fahrenheit without any ill effects.
            You suffer the normal penalties in temperatures outside of that range.
        """,
            short_description="Grants tolerance of temperature extremes",
        )
    )

    apparel += [
        create_apparel(
            name="Cloak of Death's Door",
            rank=2,
            material_type="Cloak",
            tags=[],
            description="""
                While you are at or below half your maximum \\glossterm<hit points>, you gain a +1 bonus to your Armor defense.
            """,
            short_description="Grants +1 Armor at low health",
        ),
        create_apparel(
            name="Cloak of Death's Door, Greater",
            rank=5,
            material_type="Cloak",
            tags=[],
            description="""
                While you are at or below half your maximum \\glossterm<hit points>, you gain a +1 bonus to all defenses.
            """,
            short_description="Grants +1 defenses at low health",
        ),
    ]

    apparel += [
        create_apparel(
            name="Enraging Cloak",
            rank=4,
            material_type="Cloak",
            tags=[],
            description="""
                You gain a +1 accuracy bonus against creatures adjacent to you.
                However, you also take a -1 penalty to all defenses against creatures adjacent to you.
            """,
            short_description="Grants +1 accuracy and -1 defenses against adjacent creatures",
        ),
        create_apparel(
            name="Enraging Cloak, Greater",
            rank=7,
            material_type="Cloak",
            tags=[],
            description="""
                You gain a +2 accuracy bonus against creatures adjacent to you.
                However, you also take a -2 penalty to all defenses against creatures adjacent to you.
            """,
            short_description="Grants +2 accuracy and -2 defenses against adjacent creatures",
        ),
    ]

    apparel += [
        create_apparel(
            name="Ring of the True Form",
            rank=1,
            material_type="Ring",
            tags=[],
            description="""
                You gain a +4 bonus to your defenses against attacks from the \\sphere<polymorph> sphere.
                This bonus also applies against other attacks that significantly alter your physical form, such as an aboleth's slime.
            """,
            short_description="Grants +4 defenses vs form-altering attacks",
        ),
        create_apparel(
            name="Ring of the True Form, Greater",
            rank=3,
            material_type="Ring",
            tags=[],
            description="""
                You gain a +8 bonus to your defenses against attacks from the \\sphere<polymorph> sphere.
                This bonus also applies against other attacks that significantly alter your physical form, such as an aboleth's slime.
            """,
            short_description="Grants +8 defenses vs form-altering attacks",
        ),
        create_apparel(
            name="Ring of the True Form, Supreme",
            rank=5,
            material_type="Ring",
            tags=[],
            description="""
                You are immune to attacks from the \\sphere<polymorph> sphere.
                This immunity also applies against other attacks that significantly alter your physical form, such as an aboleth's slime.
            """,
            short_description="Grants immunity to form-altering attacks",
        ),
    ]

    apparel += [
        create_apparel(
            name="Ring of Honeyed Words",
            rank=2,
            material_type="Ring",
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to the Deception, Intimidate and Persuasion skills.
            """,
            short_description="Grants +2 to social skills",
        ),
        create_apparel(
            name="Ring of Honeyed Words, Greater",
            rank=4,
            material_type="Ring",
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to the Deception, Intimidate and Persuasion skills.
            """,
            short_description="Grants +3 to social skills",
        ),
        create_apparel(
            name="Ring of Honeyed Words, Supreme",
            rank=6,
            material_type="Ring",
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to the Deception, Intimidate and Persuasion skills.
            """,
            short_description="Grants +4 to social skills",
        ),
    ]

    apparel += [
        create_apparel(
            name="Poisonbane Ring",
            rank=2,
            material_type="Ring",
            tags=[],
            description="""
                You are \\glossterm<impervious> to \\glossterm<poisons>.
            """,
            short_description="Impervious to poisons",
        ),
        create_apparel(
            name="Poisonbane Ring, Supreme",
            rank=5,
            material_type="Ring",
            tags=[],
            description="""
                You are immune to \\glossterm<poisons>.
                You stop being poisoned by any poisons currently affecting you, and new poisons cannot be applied to you.
            """,
            short_description="Grants immunity to poisons",
        ),
    ]

    apparel += [
        create_apparel(
            name="Ring of Blessed Protection",
            rank=2,
            material_type="Ring",
            tags=['Attune (deep)'],
            description="""
                Whenever you are hit by a \\glossterm<critical hit> from a \\glossterm<strike>, this item automatically activates.
                When it does, the attacker rerolls the attack against you, which may prevent the attack from getting a critical hit against you.
                This does not protect any other targets of the attack.
                You stop being attuned to this item when it activates in this way, and you must attune to it again to gain its effects.
            """,
            short_description="Can protect against one critical strike",
        ),
        create_apparel(
            name="Ring of Blessed Protection, Greater",
            rank=5,
            material_type="Ring",
            tags=['Attune (deep)'],
            description="""
                This item functions like a \\textit<ring of blessed protection>, except that it protects against any attack, not just strikes.
            """,
            short_description="Can protect against one critical attack",
        ),
    ]

    apparel += [
        create_apparel(
            name="Ring of Nourishment",
            rank=1,
            material_type="Ring",
            tags=["Creation"],
            description="""
                You continuously gain nourishment, and no longer need to eat or drink.
                This ring must be worn for 24 hours before it begins to work.
            """,
            short_description="Provides food and water",
        ),
        create_apparel(
            name="Ring of Sustenance",
            rank=3,
            material_type="Ring",
            tags=["Creation"],
            description="""
                You continuously gain nourishment, and no longer need to eat or drink.
                The ring must be worn for 24 hours before it begins to work.

                In addition, you need only one-quarter your normal amount of sleep (or similar activity, such as elven trance) each day.
            """,
            short_description="Provides food, water, and rest",
        ),
    ]

    apparel.append(
        create_apparel(
            name="Ring of Vital Regeneration",
            rank=5,
            material_type="Ring",
            tags=[],
            description="""
                At the end of each round, if you are not \\glossterm<unconscious> due to \\glossterm<fatigue>, you automatically remove one of your \\glossterm<vital wounds>.
                You can choose to stop this regeneration if you are conscious, but it happens automatically if you are unconscious due to vital wounds.
                When you remove a vital wound in this way, you increase your \\glossterm<fatigue level> by three.
            """,
            short_description="Automatically exert to remove vital wounds",
        )
    )

    apparel += [
        create_apparel(
            name="Bracers of Mighty Fists",
            rank=4,
            material_type="Bracers",
            description="""
                Your \\glossterm<natural weapons> gain the \\weapontag<Impact> \\glossterm<weapon tag>.
                When you get a \\glossterm{critical hit} with natural weapons, you roll triple damage dice instead of double damage dice.
                If the natural weapon already has the Impact weapon tag, this has no effect.
            """,
            short_description="Grants Impact weapon tag with natural weapons",
        ),
    ]

    apparel += [
        create_apparel(
            name="Belt of Health",
            rank=2,
            material_type="Belt",
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<hit points>.
            """,
            short_description="Grants +4 hit points",
        ),
        create_apparel(
            name="Belt of Health, Greater",
            rank=4,
            material_type="Belt",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<hit points>.
            """,
            short_description="Grants +8 hit points",
        ),
        create_apparel(
            name="Belt of Health, Supreme",
            rank=6,
            material_type="Belt",
            description="""
                You gain a +16 \\glossterm<magic bonus> to your \\glossterm<hit points>.
            """,
            short_description="Grants +16 hit points",
        ),
    ]

    apparel.append(
        create_apparel(
            name="Ring of the Planes",
            rank=4,
            material_type="Ring",
            tags=[],
            description="""
                When you perform the \\ritual<plane shift> ritual, this ring provides all \\glossterm<fatigue levels> required.
                This does not grant you the ability to perform the \\ritual<plane shift> ritual if you could not already.
            """,
            short_description="Aids travel with \\ritual<plane shift>",
        )
    )

    apparel += [
        create_apparel(
            name="Cloak of Nondetection",
            rank=2,
            material_type="Cloak",
            tags=[],
            description="""
                You gain a +4 bonus to your defenses against attacks with the \\abilitytag<Detection> or \\abilitytag<Scrying> tags.
            """,
            short_description="Grants +4 to defenses against detection",
        ),
        create_apparel(
            name="Cloak of Nondetection, Greater",
            rank=5,
            material_type="Cloak",
            tags=[],
            description="""
                You gain a +8 bonus to your defenses against attacks with the \\abilitytag<Detection> or \\abilitytag<Scrying> tags.
            """,
            short_description="Grants +8 to defenses against detection",
        ),
    ]

    apparel += [
        create_apparel(
            name="Challenger's Cloak",
            rank=5,
            material_type="Cloak",
            tags=[],
            description="""
                Each creature suffering penalties for being \\goaded by you takes an additional -1 \\glossterm<accuracy> penalty against creatures other than you.
            """,
            short_description="Increases accuracy penalty on goaded foes by 1",
        ),
        create_apparel(
            name="Challenger's Cloak, Greater",
            rank=7,
            material_type="Cloak",
            tags=[],
            description="""
                Each creature suffering penalties for being \\goaded by you takes an additional -2 \\glossterm<accuracy> penalty against creatures other than you.
            """,
            short_description="Increases accuracy penalty on goaded foes by 2",
        ),
    ]

    # Cloaks

    apparel += [
        create_apparel(
            name="Quilled Cloak",
            rank=2,
            material_type="Cloak",
            tags=[],
            description="""
                Whenever a creature grapples you, you immediately deal it 2d6+4 piercing damage.
                This does not affect creatures that you initiate a grapple with.
            """,
            short_description="Deals damage to creatures that grapple you",
        ),
        create_apparel(
            name="Quilled Cloak, Greater",
            rank=4,
            material_type="Cloak",
            tags=[],
            description="""
                Whenever a creature grapples you, you immediately deal it 4d6+7 piercing damage.
                This does not affect creatures that you initiate a grapple with.
            """,
            short_description="Deals more damage to creatures that grapple you",
        ),
        create_apparel(
            name="Quilled Cloak, Supreme",
            rank=6,
            material_type="Cloak",
            tags=[],
            description="""
                Whenever a creature grapples you, you immediately deal it 5d10+14 piercing damage.
                This does not affect creatures that you initiate a grapple with.
            """,
            short_description="Deals even more damage to creatures that grapple you",
        ),
    ]

    apparel.append(
        create_apparel(
            name="Avian Cloak",
            rank=3,
            material_type="Cloak",
            tags=[],
            description="""
            You gain a \\glossterm<glide speed> equal to the \\glossterm<base speed> for your size.
        """,
            short_description="Grants a glide speed",
        )
    )

    apparel += [
        create_apparel(
            name="Assassin's Cloak",
            rank=3,
            material_type="Cloak",
            tags=["Sensation"],
            description="""
                At the end of each round, if you took no actions that round, you become \\trait<invisible> (see \\pcref<Invisible>).
                This invisibility ends after you take any action.
            """,
            short_description="Grants invisibility while inactive",
        ),
        create_apparel(
            name="Assassin's Cloak, Greater",
            rank=5,
            material_type="Cloak",
            tags=["Sensation"],
            description="""
                At the end of each round, if you took no actions during the \\glossterm<action phase> of that round, you become \\trait<invisible> (see \\pcref<Invisible>).
                This invisibility ends after you take any action during the action phase.
            """,
            short_description="Grants invisibility while mostly inactive",
        ),
        create_apparel(
            name="Assassin's Cloak, Supreme",
            rank=7,
            material_type="Cloak",
            tags=["Sensation"],
            description="""
                At the end of each round, if you took no \\glossterm<standard actions> during that round, you become \\trait<invisible> (see \\pcref<Invisible>).
                This invisibility ends after you take a standard action.
            """,
            short_description="Grants invisibility while slightly active",
        ),
    ]

    apparel += [
        create_apparel(
            name="Cloak of Mist",
            rank=4,
            material_type="Cloak",
            tags=["Manifestation"],
            description="""
                At the end of each round, fog \\glossterm<briefly> fills a \\smallarea radius zone from you.
                This fog does not fully block sight, but it provides \\glossterm<concealment>.
                There is no time gap between the disappearance of the old fog and the appearance of the new fog, so you can keep continuous fog cover by staying in the same place or moving slowly.
            """,
            short_description="Fills nearby area with fog",
        ),
        create_apparel(
            name="Cloak of Mist, Greater",
            rank=7,
            material_type="Cloak",
            tags=["Manifestation"],
            description="""
                This cloak functions like a \\mitem<cloak of mist>, except that the fog fills a \\largearea radius.
            """,
            short_description="Fills a large area with fog",
        ),
    ]

    apparel += [
        create_apparel(
            name="Vanishing Cloak",
            rank=5,
            material_type="Cloak",
            tags=["Sensation"],
            description="""
                As a standard action, you can activate this cloak.
                When you do, you \\glossterm<teleport> to an unoccupied location within \\rngmed range of your original location.
                As normal for teleportation, you can immediately hide when you reach your destination (see \\pcref<Hide>).
                Unlike most teleportation, this teleportation does not make any noise.
            """,
            short_description="Can teleport silently",
        ),
        create_apparel(
            name="Vanishing Cloak, Greater",
            rank=7,
            material_type="Cloak",
            tags=["Sensation"],
            description="""
                This cloak functions like a \\mitem<vanishing cloak>, except that you also \\glossterm{briefly} become \\trait<invisible> (see \\pcref<Invisible>).
                This invisibility ends after you take any action.

                If your intended destination is invalid, or if your teleportation otherwise fails, you still become invisible.
            """,
            short_description="Can teleport silently and grant brief invisibility",
        ),
    ]

    apparel += [
        create_apparel(
            name="Hexward Ring",
            rank=4,
            material_type="Ring",
            tags=[],
            description="""
                You gain a +1 bonus to your defenses against spells that target you directly.
                This does not protect you from abilities that affect an area, or from magical abilities that are not spells.
            """,
            short_description="Grants +1 defenses against targeted spells",
        ),
        create_apparel(
            name="Hexward Ring, Greater",
            rank=7,
            material_type="Ring",
            tags=[],
            description="""
                You gain a +2 bonus to your defenses against spells that target you directly.
                This does not protect you from abilities that affect an area, or from magical abilities that are not spells.
            """,
            short_description="Grants +2 defenses against targeted spells",
        ),
    ]

    # Belts

    apparel += [
        create_apparel(
            name="Belt of Healing",
            rank=2,
            material_type="Belt",
            tags=['Swift'],
            description="""
                As a standard action, you can use this belt to regain 1d10+4 hit points.
                When you do, you increase your \\glossterm<fatigue level> by one.
            """,
            short_description="Exert to heal 1d10+4 hit points",
        ),
        create_apparel(
            name="Belt of Healing, Greater",
            rank=4,
            material_type="Belt",
            tags=['Swift'],
            description="""
                As a standard action, you can use this belt to regain 2d10+7 hit points.
                When you do, you increase your \\glossterm<fatigue level> by one.
            """,
            short_description="Exert to heal 2d10+7 hit points",
        ),
        create_apparel(
            name="Belt of Healing, Supreme",
            rank=6,
            material_type="Belt",
            tags=['Swift'],
            description="""
                As a standard action, you can use this belt to regain 4d10+14 hit points.
                When you do, you increase your \\glossterm<fatigue level> by one.
            """,
            short_description="Exert to heal 4d10+14 hit points",
        ),
    ]

    apparel += [
        create_apparel(
            name="Enlarging Belt",
            rank=4,
            material_type="Belt",
            tags=[],
            description="""
                As a standard action, you can activate this belt.
                When you do, your size increases by one \\glossterm<size category>, to a maximum of Huge.
                This effect lasts until you activate the belt again, which returns you to your original size.

                Increasing your size gives you a +1 bonus to Strength for the purpose of determining your \\glossterm<weight limits>, a -1 penalty to your Reflex defense, and a -5 penalty to Stealth.
                It also increases your \\glossterm<base speed> (see \\pcref<Size Categories>).
                This item makes you slightly clumsy in your new size.
                You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
            """,
            short_description="Increases your size",
        ),
    ]

    apparel += [
        create_apparel(
            name="Shrinking Belt",
            rank=3,
            material_type="Belt",
            tags=[],
            description="""
                As a standard action, you can activate this belt.
                When you do, your size decreases by one \\glossterm<size category>, to a minimum of Tiny.
                This effect lasts until you activate the belt again, which returns you to your original size.

                Reducing your size gives you a -1 penalty to Strength for the purpose of determining your \\glossterm<weight limits>, a +1 bonus to your Reflex defense, and a +5 bonus to Stealth.
                It also reduces your \\glossterm<base speed> (see \\pcref<Size Categories>).
            """,
            short_description="Reduces your size",
        ),
        create_apparel(
            name="Shrinking Belt, Greater",
            rank=5,
            material_type="Belt",
            tags=[],
            description="""
                This belt functions like a \\mitem<shrinking belt>, except that you also gain a +1 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, offsetting the penalty from reducing your size.
            """,
            short_description="Reduces your size without reducing weight limits",
        ),
        create_apparel(
            name="Shrinking Belt, Supreme",
            rank=7,
            material_type="Belt",
            tags=[],
            description="""
                This belt functions like a \\mitem<greater shrinking belt>, except that you can choose to decrease your size by either one size category or two size categories.
            """,
            short_description="Greatly reduces your size",
        ),
    ]

    apparel += [
        create_apparel(
            name="Utility Belt",
            rank=2,
            material_type="Belt",
            tags=[],
            description="""
                This belt contains five pockets, each of which is larger on the inside than the outside.
                The inside of each pocket is a six inch cube.
                You can put anything you want in each pocket, but you still carry the weight of anything in the pockets.
                If you put reactive objects in a pocket, such as acid or burning alchemist's fire, it may destroy the pocket until the belt is repaired.

                As long as each pocket is no more than half full, or is full of completely interchangeable items, you can reach into any pocket just as easily as you can reach into a nonmagical pocket.
                Overstuffed pockets may take more time to sift through to find the specific item you want, just like rummaging through a backpack.

                If you take off this belt or stop attuning to it, the items in the belt become inaccessible.
                If this belt is destroyed, the items within it become lost in the Astral Plane.
            """,
            short_description="Contains five large pockets",
        ),
        create_apparel(
            name="Utility Belt, Greater",
            rank=5,
            material_type="Belt",
            tags=[],
            description="""
                This belt functions like a \\mitem<utility belt>, except that the belt has ten pockets, each of which is a one foot cube on the inside.
            """,
            short_description="Contains ten very large pockets",
        ),
    ]

    apparel += [
        create_apparel(
            name="Thieving Gloves",
            rank=2,
            material_type="Gloves",
            tags=[],
            description="""
                As a \\glossterm<standard action>, you can activate these gloves.
                When you do, the gloves absorb one Small or smaller object you are touching with them.

                An absorbed object leaves no trace that it ever existed.
                This weapon can hold no more than three objects at once.
                If you attempt to absorb an object while gloves are full, the attempt fails.

                As a free action, you can retrieve the last item absorbed by the gloves.
                The item appears in your hand, or falls to the ground if your hand is occupied.
                The item similarly reappears if you stop attuning to these gloves or take them off.
            """,
            short_description="Can absorb a small item",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The maximum size category that the gloves can absorb increases to Medium.
                    """,
                    short_description="Can absorb an item",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The maximum size category that the gloves can absorb increases to Large.
                    """,
                    short_description="Can absorb a large item",
                ),
            ],
        ),
    ]

    apparel += [
        create_apparel(
            name="Frenzied Gloves",
            rank=6,
            material_type="Gloves",
            tags=[],
            description="""
                Whenever you make a \\glossterm<strike>, you \\glossterm<briefly> gain a +1 bonus to \\glossterm<accuracy> with \\glossterm<strikes>.
                As normal, this bonus does not stack with itself.
            """,
            short_description="Grants +1 accuracy to continuous strikes",
        ),
    ]

    apparel += [
        create_apparel(
            name="Gloves of Infused Force",
            rank=2,
            material_type="Gloves",
            tags=[],
            description="""
                As a standard action, you can activate these gloves to infuse them with power.
                When you hit with a \\glossterm<strike> while these gloves are infused, you gain a +4 bonus to \\glossterm<power> with the strike and the gloves stop being infused.
            """,
            short_description="Grants +4 power to next strike",
        ),
        create_apparel(
            name="Gloves of Infused Force, Greater",
            rank=4,
            material_type="Gloves",
            tags=[],
            description="""
                These gloves function like \\mitem<gloves of infused force>, except that the power bonus increases to +8.
            """,
            short_description="Grants +8 power to next strike",
        ),
        create_apparel(
            name="Gloves of Infused Force, Supreme",
            rank=6,
            material_type="Gloves",
            tags=[],
            description="""
                These gloves function like \\mitem<gloves of infused force>, except that the power bonus increases to +16.
            """,
            short_description="Grants +16 power to next strike",
        ),
    ]

    apparel += [
        # standard tiny cone
        create_apparel(
            name="Pyromancer's Glove",
            rank=1,
            material_type="Glove",
            tags=[],
            description="""
                As a standard action, you can activate this glove.
                When you do, make an attack vs. Reflex against everything within a \\smallarea cone.
                \\hit Each target takes 1d8+1 fire damage.
            """,
            short_description="Deals 1d8+1 damage in a cone",
        ),
        create_apparel(
            name="Pyromancer's Glove, Greater",
            rank=4,
            material_type="Glove",
            tags=[],
            description="""
                As a standard action, you can activate this glove.
                When you do, make an attack vs. Reflex against everything within a \\medarea cone.
                \\hit Each target takes 2d10+3 fire damage.
            """,
            short_description="Deals 2d10+3 damage in a cone",
        ),
        create_apparel(
            name="Pyromancer's Glove, Supreme",
            rank=7,
            material_type="Glove",
            tags=[],
            description="""
                As a standard action, you can activate this glove.
                When you do, make an attack vs. Reflex against everything within a \\largearea cone.
                \\hit Each target takes 5d10+10 fire damage.
            """,
            short_description="Deals 5d10+10 damage in a cone",
        ),
    ]

    apparel += [
        create_apparel(
            name="Belt of Vital Persistence",
            rank=1,
            material_type="Belt",
            tags=[],
            description="""
                When you make a \\glossterm<vital roll>, you can activate this item.
                When you do, you increase your \\glossterm<fatigue level> by one, and you gain a +1 bonus to the vital roll.
                You can use this ability after you see the result of the vital roll.
            """,
            short_description="Can exert for +1 to a vital roll",
        ),
        create_apparel(
            name="Belt of Vital Persistence, Greater",
            rank=3,
            material_type="Belt",
            tags=[],
            description="""
                This item functions like a \\textit<belt of vital persistence>, except that the bonus it grants increases to +2.
            """,
            short_description="Can exert for +2 to a vital roll",
        ),
        create_apparel(
            name="Belt of Vital Persistence, Supreme",
            rank=5,
            material_type="Belt",
            tags=[],
            description="""
                This item functions like a \\textit<belt of vital persistence>, except that the bonus it grants increases to +3.
            """,
            short_description="Can exert for +3 to a vital roll",
        ),
    ]

    apparel += [
        create_apparel(
            name="Lifekeeping Belt",
            rank=3,
            material_type="Belt",
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
            """,
            short_description="Grants +1 bonus to vital rolls",
        ),
        create_apparel(
            name="Lifekeeping Belt, Greater",
            rank=5,
            material_type="Belt",
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
            """,
            short_description="Grants +2 bonus to vital rolls",
        ),
        create_apparel(
            name="Lifekeeping Belt, Supreme",
            rank=7,
            material_type="Belt",
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
            """,
            short_description="Grants +3 bonus to vital rolls",
        ),
    ]

    apparel += [
        create_apparel(
            name="Ocular Circlet",
            rank=1,
            material_type="Circlet",
            tags=["Scrying"],
            description="""
                As a \\glossterm<standard action>, you can concentrate to use this item.
                When you do, a \\glossterm<scrying sensor> appears floating in the air in an unoccupied square within \\rngshort range.
                As long as you \\glossterm<sustain> the effect as a standard action, you see through the sensor instead of from your body.

                While viewing through the sensor, your visual acuity is the same as your normal body,
                    except that it does not share the benefits of any \\magical effects that improve your vision.
                You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.
            """,
            short_description="Can allow you to see at a distance",
        ),
        create_apparel(
            name="Ocular Circlet, Greater",
            rank=3,
            material_type="Circlet",
            tags=["Scrying"],
            description="""
                This item functions like a \\mitem<ocular circlet>, except that it only takes a \\glossterm<minor action> to activate and sustain the item's effect.
                In addition, the sensor appears anywhere within \\rngmed range.
            """,
            short_description="Can allow you to see at a greater distance",
        ),
    ]

    apparel += [
        create_apparel(
            name="Ring of Spell Investment",
            rank=2,
            material_type="Ring",
            tags=[],
            description="""
                When you or an adjacent \\glossterm<ally> casts a spell that does not have the \\abilitytag<Attune> or \\abilitytag<Sustain> tags,
                    you can invest the magic of the spell in the ring.
                If you do, the spell does not have its normal effect.
                All decisions about the spell's effect must be made at the time that the spell is invested in this way.
                Only one spell can be stored this way.

                As a standard action, you can activate this ring.
                When you do, you cause the effect of the last spell invested in the ring.
                This does not require \\glossterm<casting components>, even if they would normally be required to cast the spell.
                The spell's effect is determined based on the \\glossterm<power> and other abilities of the original caster who invested the spell into the ring, not yours.
                You do not have to have the ability to cast the spell to activate a spell in this way.
                The \\textit<desperate exertion> ability cannot be used to affect the spell, either at the time it is invested or when it is activated.
                After you use a spell in this way, the energy in the ring is spent, and you must invest a new spell to activate the ring again.
            """,
            short_description="Can invest a spell to gain its effect later",
        ),
        create_apparel(
            name="Ring of Spell Investment, Greater",
            rank=4,
            material_type="Ring",
            tags=[],
            description="""
                This item functions like a \\mitem<ring of spell investment>, except that you can store up to three spells in the gloves.
                When you activate the ring, you choose which spell to use.
            """,
            short_description="Can invest three spells to gain their effects later",
        ),
    ]

    apparel += [
        create_apparel(
            name="Belt of Hill Giant's Strength",
            rank=3,
            material_type="Belt",
            tags=[],
            description="""
                You gain a +1 bonus to Strength-based \\glossterm<checks>, and you gain a +1 bonus to Strength for the purpose of determining your \\glossterm<weight limits> (see \\pcref<Weight Limits>).
                In addition, you reduce your \\glossterm<encumbrance> by 1.
            """,
            short_description="Grants +1 Strength for specific purposes",
        ),
        create_apparel(
            name="Belt of Stone Giant's Strength",
            rank=5,
            material_type="Belt",
            tags=[],
            description="""
                You gain a +2 bonus to Strength-based \\glossterm<checks>, and you gain a +2 bonus to Strength for the purpose of determining your \\glossterm<weight limits> (see \\pcref<Weight Limits>).
                In addition, you reduce your \\glossterm<encumbrance> by 2.
            """,
            short_description="Grants +2 Strength for specific purposes",
        ),
        create_apparel(
            name="Belt of Storm Giant's Strength",
            rank=7,
            material_type="Belt",
            tags=[],
            description="""
                You gain a +3 bonus to Strength-based \\glossterm<checks>, and you gain a +3 bonus to Strength for the purpose of determining your \\glossterm<weight limits> (see \\pcref<Weight Limits>).
                In addition, you reduce your \\glossterm<encumbrance> by 3.
            """,
            short_description="Grants +3 Strength for specific purposes",
        ),
    ]

    apparel += [
        create_apparel(
            name="Cloak of Translocation",
            rank=2,
            material_type="Cloak",
            tags=[],
            description="""
                As a standard action, you can \\glossterm<teleport> yourself into an unoccupied location within \\rngshort range on a stable surface that can support your weight.
                If the destination is invalid, this ability has no effect.
            """,
            short_description="Can teleport up to 30 feet",
        ),
        create_apparel(
            name="Cloak of Translocation, Greater",
            rank=4,
            material_type="Cloak",
            tags=[],
            description="""
                This cloak functions like a \\mitem<cloak of translocation>, except that the range increases to \\rngmed.
            """,
            short_description="Can teleport up to 60 feet",
        ),
        create_apparel(
            name="Cloak of Translocation, Supreme",
            rank=6,
            material_type="Cloak",
            tags=[],
            description="""
                This cloak functions like a \\mitem<cloak of translocation>, except that the range increases to \\rnglong.
            """,
            short_description="Can teleport up to 120 feet",
        ),
    ]

    apparel += [
        create_apparel(
            name="Boots of Reliable Motion",
            rank=1,
            material_type="Boots",
            tags=[],
            description="""
                Whenever you roll a 1 on an attack or check using the Balance, Climb, Jump, or Swim skills, you may reroll and take the higher result.
                You can only reroll any individual roll once in this way.
            """,
            short_description="Can reroll 1s with movement-based skills",
        ),
        create_apparel(
            name="Boots of Reliable Motion, Greater",
            rank=3,
            material_type="Boots",
            tags=[],
            description="""
                Whenever you roll a 1 on an attack or check using the Balance, Climb, Jump, or Swim skills, you may reroll and take the higher result.
                You can only reroll any individual roll once in this way.
                In addition, using the \\textit<desperate exertion> ability to affect those skills only causes you to increase your \\glossterm<fatigue level> by one instead of two (see \\pcref<desperate exertion>).
            """,
            short_description="Can reroll 1s and exert more easily with movement-based skills",
        ),
        create_apparel(
            name="Boots of Reliable Motion, Supreme",
            rank=5,
            material_type="Boots",
            tags=[],
            description="""
                Whenever you roll a 1 or 2 on an attack or check using the Balance, Climb, Jump, or Swim skills, you may reroll and take the higher result.
                You can only reroll any individual roll once in this way.
                In addition, using the \\textit<desperate exertion> ability to affect those skills only causes you to increase your \\glossterm<fatigue level> by one instead of two (see \\pcref<desperate exertion>).
            """,
            short_description="Can reroll 1s and 2s and exert more easily with movement-based skills",
        ),
        create_apparel(
            name="Gloves of Reliable Finesse",
            rank=1,
            material_type="Gloves",
            tags=[],
            description="""
                Whenever you roll a 1 on an attack or check using the Craft, Devices, Flexibility, or Sleight of Hand skills, you may reroll and take the higher result.
                You can only reroll any individual roll once in this way.
            """,
            short_description="Can reroll 1s with finesse-based skills",
        ),
        create_apparel(
            name="Gloves of Reliable Finesse, Greater",
            rank=3,
            material_type="Gloves",
            tags=[],
            description="""
                Whenever you roll a 1 on an attack or check using the Craft, Devices, Flexibility, or Sleight of Hand skills, you may reroll and take the higher result.
                You can only reroll any individual roll once in this way.
                In addition, using the \\textit<desperate exertion> ability to affect those skills only causes you to increase your \\glossterm<fatigue level> by one instead of two (see \\pcref<desperate exertion>).
            """,
            short_description="Can reroll 1s and exert more easily with finesse-based skills",
        ),
        create_apparel(
            name="Gloves of Reliable Finesse, Supreme",
            rank=5,
            material_type="Gloves",
            tags=[],
            description="""
                Whenever you roll a 1 or 2 on an attack or check using the Craft, Devices, Medicine, or Sleight of Hand skills, you may reroll and take the higher result.
                You can only reroll any individual roll once in this way.
                In addition, using the \\textit<desperate exertion> ability to affect those skills only causes you to increase your \\glossterm<fatigue level> by one instead of two (see \\pcref<desperate exertion>).
            """,
            short_description="Can reroll 1s and 2s and exert more easily with finesse-based skills",
        ),
        create_apparel(
            name="Circlet of Reliable Observation",
            rank=1,
            material_type="Circlet",
            tags=[],
            description="""
                Whenever you roll a 1 on an attack or check using the Awareness, Deduction, Social Insight, or Survival skills, you may reroll and take the higher result.
                You can only reroll any individual roll once in this way.
            """,
            short_description="Can reroll 1s with observation-based skills",
        ),
        create_apparel(
            name="Circlet of Reliable Observation, Greater",
            rank=3,
            material_type="Circlet",
            tags=[],
            description="""
                Whenever you roll a 1 on an attack or check using the Awareness, Deduction, Social Insight, or Survival skills, you may reroll and take the higher result.
                You can only reroll any individual roll once in this way.
                In addition, using the \\textit<desperate exertion> ability to affect those skills only causes you to increase your \\glossterm<fatigue level> by one instead of two (see \\pcref<desperate exertion>).
            """,
            short_description="Can reroll 1s and exert more easily with observation-based skills",
        ),
        create_apparel(
            name="Circlet of Reliable Observation, Supreme",
            rank=5,
            material_type="Circlet",
            tags=[],
            description="""
                Whenever you roll a 1 or 2 on an attack or check using the Awareness, Deduction, Social Insight, or Survival skills, you may reroll and take the higher result.
                You can only reroll any individual roll once in this way.
                In addition, using the \\textit<desperate exertion> ability to affect those skills only causes you to increase your \\glossterm<fatigue level> by one instead of two (see \\pcref<desperate exertion>).
            """,
            short_description="Can reroll 1s and 2s and exert more easily with observation-based skills",
        ),
    ]

    apparel += [
        create_apparel(
            name="Boots of Levitation",
            rank=2,
            material_type="Boots",
            tags=[],
            description="""
                Whenever you make a Jump check, you can activate these boots.
                When you do, you increase your \\glossterm<fatigue level> by one.
                In addition, you double your maximum vertical height from the jump, and you can land in midair at any point during your jump this round.
                You can \\glossterm<briefly> levitate in that location as if you were standing on solid ground.
                These boots cannot be activated again until you land on a solid surface capable of supporting your weight.
            """,
            short_description="Can exert to briefly levitate in midair",
        ),
        create_apparel(
            name="Boots of Levitation, Greater",
            rank=4,
            material_type="Boots",
            tags=[],
            description="""
                These boots function like \\mitem<boots of levitation>, except that you do not increase your fatigue level when you activate them.
            """,
            short_description="Can briefly levitate in midair",
        ),
        create_apparel(
            name="Boots of Levitation, Supreme",
            rank=6,
            material_type="Boots",
            tags=[],
            description="""
                These boots function like \\mitem<boots of levitation>, except that you do not increase your fatigue level when you activate them.
                In addition, you can activate them twice before you land on a solid surface capable of supporting your weight.
            """,
            short_description="Can briefly levitate twice in midair",
        ),
    ]

    apparel += [
        create_apparel(
            name="Blindfold of the Third Eye",
            # Blindsight is a rank 3 self-only spell, so this would be level 10
            # if it followed that model normally. It gets +3 levels for also
            # granting blindsense, -5 levels for requiring blindness
            rank=3,
            material_type="Fabric",
            tags=[],
            description="""
                While you wear this blindfold covering your eyes, you gain \\trait<blindsight> with a 15 foot range and \\trait<blindsense> with a 60 foot range.
                You are also blind, as normal for wearing a blindfold.
                Shifting this blindfold to cover or stop covering your eyes is a \\glossterm<free action> that requires a \\glossterm<free hand>.
            """,
            short_description="Grants blindsight, blindsense, and blindness",
        ),
        create_apparel(
            name="Blindfold of the Third Eye, Greater",
            rank=5,
            material_type="Fabric",
            tags=[],
            description="""
                This blindfold functions like the \\mitem<blindfold of the third eye>, except that the range of the blindsight increases to 30 feet and the range of the blindsense increases to 120 feet.
            """,
            short_description="Grants distant blindsight, blindsense, and blindness",
        ),
        create_apparel(
            name="Blindfold of the Third Eye, Supreme",
            rank=7,
            material_type="Fabric",
            tags=[],
            description="""
                This blindfold functions like the \\mitem<blindfold of the third eye>, except that the range of the blindsight increases to 60 feet and the range of the blindsense increases to 240 feet.
            """,
            short_description="Grants very distant blindsight, blindsense, and blindness",
        ),
    ]

    apparel += [
        create_apparel(
            name="Charging Boots",
            rank=2,
            material_type="Boots",
            tags=[],
            description="""
                You reduce your defense penalties from using the \\ability<charge> action by 1.
            """,
            short_description="Reduces penalties for charging by 1",
        ),
        create_apparel(
            name="Charging Boots, Greater",
            rank=4,
            material_type="Boots",
            tags=[],
            description="""
                You do not take defense penalties from using the \\ability<charge> action.
            """,
            short_description="Removes penalties for charging",
        ),
    ]

    apparel += [
        create_apparel(
            name="Cleansing Belt",
            rank=2,
            material_type="Belt",
            tags=[],
            description="""
                As a standard action, you can activate this belt.
                When you do, you remove one \\glossterm<condition> affecting you.

                After you use this ability, you increase your \\glossterm<fatigue level> by one.
            """,
            short_description="Can exert to remove a condition",
        ),
        create_apparel(
            name="Cleansing Belt, Greater",
            rank=4,
            material_type="Belt",
            tags=[],
            description="""
                As a standard action, you can activate this belt.
                When you do, you remove one \\glossterm<condition> affecting you.
            """,
            short_description="Can remove a condition",
        ),
        create_apparel(
            name="Cleansing Belt, Supreme",
            rank=6,
            material_type="Belt",
            tags=[],
            description="""
                As a standard action, you can activate this belt.
                When you do, you remove up to two \\glossterm<conditions> affecting you.
            """,
            short_description="Can remove two conditions",
        ),
    ]

    apparel += [
        create_apparel(
            name="Quickcleanse Belt",
            rank=5,
            material_type="Belt",
            tags=[],
            description="""
                As a \\glossterm<minor action>, you can activate this belt.
                When you do, you remove one \\glossterm<condition> affecting you.

                After you use this belt, you increase your \\glossterm<fatigue level> by two.
            """,
            short_description="Can exert to quickly remove a condition",
        ),
        create_apparel(
            name="Quickcleanse Belt, Greater",
            rank=7,
            material_type="Belt",
            tags=[],
            description="""
                This belt functions like a \\mitem<quickcleanse belt>, except that you only increase your \\glossterm<fatigue level> by one instead of two.
            """,
            short_description="Can exert more easily to remove a condition",
        ),
    ]

    apparel += [
        create_apparel(
            name="Sprinting Boots",
            rank=5,
            material_type="Boots",
            tags=[],
            description="""
                You can use these boots when you take the \\textit<sprint> action during the \\glossterm<movement phase> to avoid increasing your\\glossterm<fatigue level> (see \\pcref<Sprint>).
                After you use this boots in this way, you \\glossterm{briefly} cannot use them again.
            """,
            short_description="Can sprint without exertion",
        ),
    ]

    apparel += [
        create_apparel(
            name="Boots of Desperate Flight",
            rank=2,
            material_type="Boots",
            tags=[],
            description="""
                When you use the \\textit<recover> action, you can also move up to your normal movement speed.
            """,
            short_description="Can move when you recover",
        ),
        create_apparel(
            name="Boots of Desperate Flight, Greater",
            rank=4,
            material_type="Boots",
            tags=[],
            description="""
                When you use the \\textit<recover> action, you can also move up to twice your normal movement speed.
            """,
            short_description="Can sprint when you recover",
        ),
    ]

    apparel += [
        create_apparel(
            name="Indomitable Ring",
            rank=3,
            material_type="Ring",
            tags=["Attune (deep)"],
            description="""
                You gain a +6 \\glossterm<magic bonus> to \\glossterm<hit points> and \\glossterm<damage resistance>.
                In addition, you gain a \\plus2 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
            """,
            short_description="Grants many small bonuses",
            upgrades=[
                Upgrade(
                    description="The hit point and damage resistance bonuses increase to +12, and the vital roll bonus increases to +3.",
                    rank=5,
                    short_description="Grants many bonuses",
                ),
                Upgrade(
                    description="The hit point and damage resistance bonuses increase to +24, and the vital roll bonus increases to +4.",
                    rank=7,
                    short_description="Grants many large bonuses",
                ),
            ],
        ),
    ]

    apparel += [
        create_apparel(
            name="Ring of Protection",
            rank=2,
            tags=[],
            material_type="Ring",
            description="""
                You gain a +4 \\glossterm<magic bonus> to \\glossterm<damage resistance>.
            """,
            short_description="Grants +4 damage resistance",
        ),
        create_apparel(
            name="Ring of Protection, Greater",
            rank=4,
            tags=[],
            material_type="Ring",
            description="""
                You gain a +8 \\glossterm<magic bonus> to \\glossterm<damage resistance>.
            """,
            short_description="Grants +8 damage resistance",
        ),
        create_apparel(
            name="Ring of Protection, Supreme",
            rank=6,
            tags=[],
            material_type="Ring",
            description="""
                You gain a +16 \\glossterm<magic bonus> to \\glossterm<damage resistance>.
            """,
            short_description="Grants +16 damage resistance",
        ),
    ]

    apparel += [
        create_apparel(
            name="Anchoring Belt",
            rank=2,
            material_type="Belt",
            tags=[],
            description="""
                You are immune to \\glossterm<knockback> or \\glossterm<push> effects from attacks, unless the effects come from an attack that scores a \\glossterm<critical hit>.
                This does not make you immune to \\glossterm<teleportation>, and does not affect movement effects used by your \\glossterm<allies>.
            """,
            short_description="Protects you from most forced movement attacks",
        ),
        create_apparel(
            name="Anchoring Belt, Greater",
            rank=4,
            material_type="Belt",
            tags=[],
            description="""
                This belt functions like an \\mitem<anchoring belt>, except that you are also immune to \\glossterm<teleport> effects from attacks that are not critical hits.
            """,
            short_description="Protects you from most forced movement and teleportation attacks",
        ),
        create_apparel(
            name="Anchoring Belt, Supreme",
            rank=6,
            material_type="Belt",
            tags=[],
            description="""
                This belt functions like an \\mitem<anchoring belt>, except that the immunities apply even against critical hits.
            """,
            short_description="Protects you from all forced movement and teleportation attacks",
        ),
    ]

    apparel += [
        create_apparel(
            name="Gauntlet of Blades",
            rank=1,
            material_type="Gauntlet",
            tags=["Manifestation"],
            description="""
                You can activate this gauntlet as a \\glossterm<free action>.
                When you do, a dagger \\glossterm<briefly> appears in one of your free hands.
                The dagger disappears when this effect ends.
            """,
            short_description="Can summon daggers",
        ),
        create_apparel(
            name="Gauntlet of Blades, Greater",
            rank=4,
            material_type="Gauntlet",
            tags=[],
            description="""
                This item functions like a \\mitem<gauntlet of blades>, except that the daggers can have special materials.
                When you use its ability, you chooose whether the dagger is diamondsteel, mithral, or silvered (see \\pcref<Weapon Special Materials>).
            """,
            short_description="Can summon daggers with special materials",
        ),
        create_apparel(
            name="Gauntlet of Blades, Supreme",
            rank=7,
            material_type="Gauntlet",
            tags=[],
            description="""
                This item functions like a \\mitem<gauntlet of blades>, except that the daggers can have almost any special material.
                When you use its ability, you can choose to create a dagger made from any special material other than cold iron (see \\pcref<Weapon Special Materials>).
            """,
            short_description="Can summon daggers of any material",
        ),
    ]

    apparel += [
        create_apparel(
            name="Ghoultouch Gauntlet",
            rank=5,
            material_type="Gauntlet",
            tags=[],
            description="""
                As a standard action, you can make an attack vs. Fortitude against an adjacent living creature.
                On a hit, the target takes 2d8 physical damage.
                If it loses \\glossterm<hit points> from this damage, it is \\glossterm<briefly> \\paralyzed.
                Whether the attack hits or misses, the target is immune to this ability until it takes a \\glossterm<short rest>.
            """,
            short_description="Grants a paralyzing touch",
        ),
    ]

    # Class ability buffs - all amulets!

    apparel += [
        create_apparel(
            name="Amulet of Undead Turning",
            rank=3,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<turn undead> cleric ability, its area increases to a \\largearea radius.
            """,
            short_description="Increases area of \\ability<turn undead>",
        ),
        create_apparel(
            name="Amulet of Undead Turning, Greater",
            rank=5,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<turn undead> cleric ability, its area increases to a \\hugearea radius.
            """,
            short_description="Greatly increases area of \\ability<turn undead>",
        ),
        create_apparel(
            name="Amulet of Undead Turning, Supreme",
            rank=7,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<turn undead> cleric ability, its area increases to a \\gargarea radius.
            """,
            short_description="Massively increases area of \\ability<turn undead>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Agile Rage",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<rage> barbarian ability, its penalties to Armor and Reflex defense are reduced by 1.
            """,
            short_description="Reduces defense penalties from \\textit<rage>",
            upgrades=[
                Upgrade(
                    description="The defense penalties are entirely removed.",
                    rank=7,
                    short_description="Removes defense penalties from \\textit<rage>",
                ),
            ],
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Divine Healing",
            rank=2,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<divine aid> cleric ability or the \\ability<lay on hands> paladin ability, you gain a +2 bonus to your \\glossterm<power>.
            """,
            short_description="Grants +2 power with \\ability<divine aid> and \\ability<lay on hands>",
            upgrades=[
                Upgrade(
                    description="The bonus increases to +4.",
                    rank=4,
                    short_description="Grants +4 power with \\ability<divine aid> and \\ability<lay on hands>",
                ),
                Upgrade(
                    description="The bonus increases to +8.",
                    rank=6,
                    short_description="Grants +8 power with \\ability<divine aid> and \\ability<lay on hands>",
                ),
            ],
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Divine Vitality",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<vital restoration> cleric ability or the \\ability<lay on hands> paladin ability to remove a vital wound, you only increase your \\glossterm<fatigue level> by two instead of by three.
            """,
            short_description="Reduces fatigue required to use \\ability<divine healing> and \\ability<lay on hands>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Revivification",
            rank=7,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<revivify> cleric ability, you only increase your \\glossterm<fatigue level> by three instead of by four.
            """,
            short_description="Reduces fatigue required to use \\ability<revivify>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Quickshift Amulet",
            rank=5,
            material_type="Amulet",
            tags=[],
            description="""
                If you have the \\ability<shifting defense> druid ability, you can use it as a \\glossterm<minor action> instead of as a standard action.
            """,
            short_description="Allows using \\ability<shifting defense> more quickly",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Shared Discipline",
            rank=4,
            material_type="Amulet",
            tags=['Swift'],
            description="""
                Whenever you use the \\ability<cleansing discipline> fighter ability, one \\glossterm<ally> adjacent to you can also remove a \\glossterm<condition>.
            """,
            short_description="Using \\abilitytag<cleansing discipline> also helps an adjacent ally",
        ),
        create_apparel(
            name="Amulet of Shared Discipline, Greater",
            rank=6,
            material_type="Amulet",
            tags=['Swift'],
            description="""
                This item functions like a \\textit<amulet of shared discipline>, except that the range increases to \\medrange.
            """,
            short_description="Using the \\abilitytag<cleansing discipline> ability also helps a nearby ally",
        ),
    ]

    apparel += [
        create_apparel(
            name="Guardian's Amulet",
            rank=3,
            material_type="Amulet",
            tags=[],
            description="""
                You gain a +1 \\glossterm<accuracy> bonus with the \\ability<guarding strike> fighter ability.
            """,
            short_description="Grants +1 accuracy with \\ability<guarding strike>",
        ),
        create_apparel(
            name="Guardian's Amulet, Greater",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                You gain a +2 \\glossterm<accuracy> bonus with the \\ability<guarding strike> fighter ability.
            """,
            short_description="Grants +2 accuracy with \\ability<guarding strike>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Protector's Amulet",
            rank=2,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<protect> fighter ability, you can target an ally within \\shortrange of you.
            """,
            short_description="Increases range of the \\ability<protect> ability",
        ),
        create_apparel(
            name="Protector's Amulet, Greater",
            rank=5,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<protect> fighter ability, you can target an ally within \\longrange of you.
            """,
            short_description="Greatly increases range of the \\ability<protect> ability",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Sturdy Companionship",
            rank=2,
            material_type="Amulet",
            tags=[],
            description="""
                Each creature you command with the \\ability<natural servant> druid ability or the \\ability<animal companion> ranger ability gains a +8 \\glossterm<magic bonus> to its \\glossterm<damage resistance>.
            """,
            short_description="Grants +8 damage resistance to animal allies",
        ),
        create_apparel(
            name="Amulet of Sturdy Companionship, Greater",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                Each creature you command with the \\ability<natural servant> druid ability or the \\ability<animal companion> ranger ability gains a +16 \\glossterm<magic bonus> to its \\glossterm<damage resistance>.
            """,
            short_description="Grants +16 damage resistance to animal allies",
        ),
        create_apparel(
            name="Amulet of Sturdy Companionship, Supreme",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                Each creature you command with the \\ability<natural servant> druid ability or the \\ability<animal companion> ranger ability gains a +32 \\glossterm<magic bonus> to its \\glossterm<damage resistance>.
            """,
            short_description="Grants +32 damage resistance to animal allies",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Equality and Perfection",
            rank=5,
            material_type="Amulet",
            tags=["Attune (deep)"],
            description="""
                If you have the \\ability<perfect body> ability, you gain a +1 bonus to your lowest physical attribute.
            """,
            short_description="Improves \\ability<perfect body> on your lowest attribute",
        ),
    ]

    apparel += [
        create_apparel(
            name="Belt of Epic Constitution",
            rank=6,
            material_type="Belt",
            tags=["Attune (deep)"],
            description="""
                You gain a +1 \\glossterm<magic bonus> to your Constitution.
            """,
            short_description="Grants +1 Constitution",
        ),
    ]

    apparel += [
        create_apparel(
            name="Cloak of Epic Dexterity",
            rank=6,
            material_type="Cloak",
            tags=["Attune (deep)"],
            description="""
                You gain a +1 \\glossterm<magic bonus> to your Dexterity.
            """,
            short_description="Grants +1 Dexterity",
        ),
    ]

    apparel += [
        create_apparel(
            name="Bracers of Epic Strength",
            rank=6,
            material_type="Bracers",
            tags=["Attune (deep)"],
            description="""
                You gain a +1 \\glossterm<magic bonus> to your Strength.
            """,
            short_description="Grants +1 Strength",
        ),
    ]

    apparel += [
        create_apparel(
            name="Glasses of Epic Perception",
            rank=6,
            material_type="Glasses",
            tags=["Attune (deep)"],
            description="""
                You gain a +1 \\glossterm<magic bonus> to your Perception.
            """,
            short_description="Grants +1 Perception",
        ),
    ]

    apparel += [
        create_apparel(
            name="Circlet of Epic Willpower",
            rank=6,
            material_type="Circlet",
            tags=["Attune (deep)"],
            description="""
                You gain a +1 \\glossterm<magic bonus> to your Willpower.
            """,
            short_description="Grants +1 Willpower",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of the Avenger",
            rank=3,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<smite> paladin ability, you gain a +1 \\glossterm<accuracy> bonus against each creature that dealt damage to one of your \\glossterm<allies> during the previous round.
            """,
            short_description="Grants +1 accuracy with \\ability<smite> when avenging allies",
        ),
        create_apparel(
            name="Amulet of the Avenger, Greater",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<smite> paladin ability, you gain a +2 \\glossterm<accuracy> bonus against each creature that dealt damage to one of your \\glossterm<allies> during the previous round.
            """,
            short_description="Grants +2 accuracy with \\ability<smite> when avenging allies",
        ),
    ]

    apparel += [
        create_apparel(
            name="Swarmhunter Amulet",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<quarry> ranger ability, you may target an additional creature.
            """,
            short_description="Adds an additional target with \\ability<quarry>",
        ),
        create_apparel(
            name="Swarmhunter Amulet, Greater",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<quarry> ranger ability, you may target two additional creatures.
            """,
            short_description="Adds two additional targets with \\ability<quarry>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Distant Stealth",
            rank=2,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<sneak attack> rogue ability, you may target a creature within \\medrange instead of \\shortrange.
            """,
            short_description="Increases range with \\ability<sneak attack>",
        ),
        create_apparel(
            name="Amulet of Distant Stealth, Greater",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<sneak attack> rogue ability, you may target a creature within \\longrange instead of \\shortrange.
            """,
            short_description="Greatly increases range with \\ability<sneak attack>",
        ),
        create_apparel(
            name="Amulet of Distant Stealth, Supreme",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<sneak attack> rogue ability, you may target a creature within \\distrange instead of \\shortrange.
            """,
            short_description="Drastically increases range with \\ability<sneak attack>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Mighty Stealth",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                You can use the \\ability<sneak attack> rogue ability with medium weapons.
            """,
            short_description="Can \\ability<sneak attack> with medium weapons",
            upgrades=[
                Upgrade(
                    description="You can also \\ability<sneak attack> with heavy weapons.",
                    rank=6,
                    short_description="Can \\ability<sneak attack> with heavy weapons",
                ),
            ],
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Distant Blood",
            rank=2,
            material_type="Amulet",
            tags=[],
            description="""
                If you have the shark \\textit<totem animal> barbarian ability, you gain its accuracy bonus against creatures within \\medrange instead of \\shortrange.
            """,
            short_description="Increases range with shark \\ability<totem animal>",
        ),
        create_apparel(
            name="Amulet of Distant Blood, Greater",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                If you have the shark \\textit<totem animal> barbarian ability, you gain its accuracy bonus against creatures within \\longrange instead of \\shortrange.
            """,
            short_description="Greatly increases range with shark \\ability<totem animal>",
        ),
        create_apparel(
            name="Amulet of Distant Blood, Supreme",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                If you have the shark \\textit<totem animal> barbarian ability, you gain its accuracy bonus against creatures within \\distrange instead of \\shortrange.
            """,
            short_description="Drastically increases range with shark \\ability<totem animal>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Darkstalker's Amulet",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<darkstalker> rogue ability, you may choose an additional sense group to hide from.
            """,
            short_description="Hide from more senses with \\ability<darkstalker>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Exemplar's Amulet",
            rank=2,
            material_type="Amulet",
            tags=[],
            description="""
                If you have the \\ability<skill exemplar> ability, you gain a +1 \\glossterm<magic bonus> to all \\glossterm<untrained> skills.
            """,
            short_description="Increase bonus from \\ability<skill exemplar> to untrained skills by 1",
        ),
        create_apparel(
            name="Exemplar's Amulet, Greater",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                If you have the \\ability<skill exemplar> ability, you gain a +2 \\glossterm<magic bonus> to all \\glossterm<untrained> skills.
            """,
            short_description="Increase bonus from \\ability<skill exemplar> to untrained skills by 2",
        ),
        create_apparel(
            name="Exemplar's Amulet, Supreme",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                If you have the \\ability<skill exemplar> ability, you gain a +3 \\glossterm<magic bonus> to all \\glossterm<untrained> skills.
            """,
            short_description="Increase bonus from \\ability<skill exemplar> to untrained skills by 3",
        ),
    ]

    apparel += [
        create_apparel(
            name="Spellfeeding Amulet",
            rank=2,
            material_type="Amulet",
            tags=[],
            description="""
                Once per round, when you absorb a spell with the \\ability<spell absorption> sorcerer ability, you may regain 2d6+4 \\glossterm<hit points>.
                When you do, you increase your \\glossterm<fatigue level> by one.
                This ability does not have the \\abilitytag<Swift> tag, so it resolves after incoming attacks during the current phase.
            """,
            short_description="Exert to heal 2d6+4 with \\ability<spell absorption>",
        ),
        create_apparel(
            name="Spellfeeding Amulet, Greater",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                Once per round, when you absorb a spell with the \\ability<spell absorption> sorcerer ability, you may regain 4d6+7 \\glossterm<hit points>.
                When you do, you increase your \\glossterm<fatigue level> by one.
                This ability does not have the \\abilitytag<Swift> tag, so it resolves after incoming attacks during the current phase.
            """,
            short_description="Exert to heal 4d6+7 with \\ability<spell absorption>",
        ),
        create_apparel(
            name="Spellfeeding Amulet, Supreme",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                Once per round, when you absorb a spell with the \\ability<spell absorption> sorcerer ability, you may regain 5d10+14 \\glossterm<hit points>.
                When you do, you increase your \\glossterm<fatigue level> by one.
                This ability does not have the \\abilitytag<Swift> tag, so it resolves after incoming attacks during the current phase.
            """,
            short_description="Exert to heal 5d10+14 with \\ability<spell absorption>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Wild Control",
            rank=2,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<wild magic> sorcerer ability and roll a 1 for its wildspell effect, you can treat the result as a 2 instead.
            """,
            short_description="Mitigates total failure with \\ability<wild magic>",
        ),
        create_apparel(
            name="Amulet of Wild Control, Greater",
            rank=5,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<wild magic> sorcerer ability and roll a 1 for its wildspell effect, you can treat the result as a 4 instead.
            """,
            short_description="Prevents total failure with \\ability<wild magic>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Abyssal Reach",
            rank=3,
            material_type="Amulet",
            tags=[],
            description="""
                Your range with the \\ability<abyssal blast> warlock ability is increased to \\longrange.
            """,
            short_description="Increases range with \\ability<abyssal blast>",
        ),
        create_apparel(
            name="Amulet of Abyssal Rebuke, Greater",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                Your range with the \\ability<abyssal blast> warlock ability is increased to \\distrange.
            """,
            short_description="Greatly increases range with \\ability<abyssal blast>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of the Frozen Abyss",
            rank=1,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<abyssal blast> warlock ability, you may choose to convert all damage dealt by that ability to cold damage instead of fire damage.
            """,
            short_description="Changes \\ability<abyssal blast> to deal cold damage",
        ),
        create_apparel(
            name="Amulet of the Frozen Abyss, Greater",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<abyssal blast> warlock ability, you may choose to convert all damage dealt by that ability to cold damage instead of fire damage.
                In addition, if you have the \\ability<hellfire> or \\ability<greater hellfire> warlock abilities, you can use them to affect abilities that deal cold damage in addition to fire damage.
            """,
            short_description="Changes \\ability<abyssal blast> and \\ability<hellfire> to deal cold damage",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Possession",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<possession> warlock ability, its penalties to Fortitude and Mental defense are reduced by 1.
            """,
            short_description="Reduces defense penalties from \\ability<possession>",
        ),
        create_apparel(
            name="Amulet of Possession, Greater",
            rank=7,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<possession> warlock ability, its penalties to Fortitude and Mental defense are removed.
            """,
            short_description="Removes defense penalties from \\ability<possession>",
        ),
    ]

    apparel += [
        create_apparel(
            name="Amulet of Blessed Oration",
            rank=2,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<denounce the heathens> cleric ability, its area is doubled.
            """,
            short_description="Doubles area of \\ability<denounce the heathens>",
        ),
        create_apparel(
            name="Amulet of Blessed Oration, Greater",
            rank=4,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<denounce the heathens> or \\ability<bless the worthy> cleric abilities, their area is tripled.
            """,
            short_description="Triples area of \\ability<denounce the heathens> and \\ability<bless the worthy>",
        ),
        create_apparel(
            name="Amulet of Blessed Oration, Supreme",
            rank=6,
            material_type="Amulet",
            tags=[],
            description="""
                When you use the \\ability<denounce the heathens>, \\ability<condemn the fearful>, or \\ability<condemn the fearful> cleric abilities, their area is quadrupled.
            """,
            short_description="Quadruples area of preacher abilities",
        ),
    ]

    return apparel


def generate_apparel_latex(check=False):
    apparel = sorted(generate_apparel(), key=lambda apparel: apparel.name)
    if check:
        sanity_check(apparel)

    texts = []
    for item in apparel:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e

    text = "\n".join(texts)
    return latexify(text)


def sanity_check(armor):
    pass


def write_to_file():
    apparel_latex = generate_apparel_latex()
    apparel_table = generate_table(generate_apparel(), "Magic Apparel", include_type=True)
    with open(book_path("apparel.tex"), "w") as apparel_description_file:
        apparel_description_file.write(apparel_latex)
    with open(book_path("apparel_table.tex"), "w") as apparel_table_file:
        apparel_table_file.write(apparel_table)


@click.command()
@click.option("-c", "--check/--no-check", default=False)
@click.option("-o", "--output/--no-output", default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_apparel_latex())


if __name__ == "__main__":
    main(None, None)
