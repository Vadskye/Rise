#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem, Upgrade, generate_table
from rise.latex.util import latexify
from rise.latex.tags import add_attune_tag

def create_armor(
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

def generate_armor():
    armor = []

    armor += [
        create_armor(
            name="Lifebond Retribution Armor",
            rank=2,
            material_type="Body armor",
            tags=["Attune (deep)"],
            # d2l
            description="""
                Whenever an \\glossterm<enemy> within a \\medarea radius \\glossterm<emanation> from you causes you to lose \\glossterm<hit points>, make a \\glossterm<reactive attack> vs. Fortitude against them.
                \\hit Each target takes 2d8 energy damage.
            """,
            short_description="Deals 2d8 damage to attackers when you lose HP",
            upgrades=[
                Upgrade(
                    rank=4,
                    # d4l
                    description="""
                        The damage increases to 1d10+2d6.
                    """,
                    short_description="Deals 1d10+2d6 damage to attackers when you lose HP",
                ),
                Upgrade(
                    rank=6,
                    # d6l
                    description="""
                        The damage increases to 7d6.
                    """,
                    short_description="Deals 7d6 damage to attackers when you lose HP",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Armor of Health",
            rank=2,
            material_type="Body armor",
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<hit points>.
            """,
            short_description="Grants +4 hit points",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The bonus increases to +8.
                    """,
                    short_description="Grants +8 hit points",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The bonus increases to +16.
                    """,
                    short_description="Grants +16 hit points",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Shield of Arrow Catching",
            rank=2,
            material_type="Shield",
            description="""
                When an \\glossterm<ally> within a \\areasmall radius emanation from you would be attacked by a ranged \\glossterm<strike>, the attack is redirected to target you instead.
                Resolve the attack as if it had initially targeted you, except that the attack is not affected by cover or concealment.
            """,
            short_description="Redirects nearby projectiles to hit you",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The area increases to a \\largearea radius.
                    """,
                    short_description="Redirects projectiles to hit you",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        You also gain a +2 bonus to all defenses against projectiles redirected in this way.
                        This does not affect projectiles that were originally aimed at you.
                    """,
                    short_description="Redirects projectiles to possibly hit you",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Shield of Arrow Deflection",
            rank=3,
            material_type="Shield",
            description="""
                You gain a +2 bonus to your defenses against ranged \\glossterm<strikes>.
            """,
            short_description="Grants +2 defenses vs ranged strikes",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The defense bonus increases to +3.
                    """,
                    short_description="Grants +3 defenses vs ranged strikes",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The defense bonus increases to +4.
                    """,
                    short_description="Grants +4 defenses vs ranged strikes",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Shield of Arrow Reflection",
            rank=2,
            material_type="Shield",
            description="""
                Whenever a creature within \\longrange of you misses or \\glossterm<glances> you with a ranged \\glossterm<strike>, it treats itself as a target of that attack in addition to any other targets.
            """,
            short_description="Reflects missed ranged strikes",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The attacker takes a -2 penalty to all defenses against attacks reflected in this way.
                    """,
                    short_description="Precisely reflects missed ranged strikes",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The defense penalty improves to -4.
                    """,
                    short_description="Precisely reflects missed long-range strikes",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Covering Shield",
            rank=2,
            material_type="Shield",
            description="""
                When you take the \\textit<total defense> action, you gain a +1 bonus to Armor defense in addition to the normal bonuses from taking that action (see \\pcref<Total Defense>).
                This property cannot be applied to tower shields.
            """,
            short_description="Grants +1 AD during total defense",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The defense bonus increases to +2.
                    """,
                    short_description="Grants +2 AD during total defense",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The defense bonus increases to +3.
                    """,
                    short_description="Grants +3 AD during total defense",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Featherlight Armor",
            rank=2,
            material_type="Body armor",
            description="""
                This armor's \\glossterm<encumbrance> is reduced by 1.
            """,
            short_description="Reduces encumbrance by 1",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The encumbrance reduction improves to 2.
                    """,
                    short_description="Reduces encumbrance by 2",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The encumbrance reduction improves to 3.
                    """,
                    short_description="Reduces encumbrance by 3",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Armor of Retribution",
            rank=4,
            material_type="Body armor",
            tags=["Attune (deep)"],
            # d2
            description="""
                Whenever an adjacent creature deals damage to you, make a \\glossterm<reactive attack> vs. Fortitude against them.
                \\hit Each target takes 1d10+1d6 energy damage.
            """,
            short_description="Deals 1d10+1d6 damage to adjacent attackers",
            upgrades=[
                Upgrade(
                    rank=6,
                    # d4
                    description="""
                        The damage increases to 4d8.
                    """,
                    short_description="Deals 4d8 damage to adjacent attackers",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Armor of Fortification",
            rank=3,
            material_type="Body armor",
            description="""
                You gain a +4 bonus to your defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Reduces critical hits from strikes",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The bonus applies against all attacks, not just strikes.
                    """,
                    short_description="Reduces critical hits",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Hidden Armor",
            rank=1,
            tags=["Sensation"],
            material_type="Body armor",
            description="""
                 As a standard action, you can use this armor.
                 If you do, it appears to change shape and form to assume the shape of a normal set of clothing.
                 You may choose the design of the clothing.
                 The item retains all of its properties, including weight and sound, while disguised in this way.
                 Only its visual appearance is altered.

                 Alternately, you may return the armor to its original appearance.
            """,
            short_description="Can look like normal clothing",
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The armor also makes sound appropriate to its disguised form while disguised.
                    """,
                    short_description="Can look and sound like normal clothing",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Resistant Armor",
            rank=2,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            """,
            short_description="Grants +4 damage resistance",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The bonus increases to +8.
                    """,
                    short_description="Grants +8 damage resistance",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The bonus increases to +16.
                    """,
                    short_description="Grants +16 damage resistance",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Stonebody Armor",
            rank=3,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +1 \\glossterm<magic bonus> to your Armor defense.
                However, you take a -10 foot penalty to your \\glossterm<movement speed> with all movement modes.
            """,
            short_description="Grants +1 AD, but -10 speed",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The defense bonus increases to +2.
                    """,
                    short_description="Grants +2 AD, but -10 speed",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Lithe Armor",
            rank=4,
            tags=[],
            material_type="Body armor",
            description="""
                If your Dexterity is at least 3, you gain a +1 \\glossterm<magic bonus> to your Armor defense.
            """,
            short_description="Grants +1 AD if you have 3 Dex",
            upgrades=[
                Upgrade(
                    rank=7,
                    description="""
                        The defense bonus increases to +2.
                    """,
                    short_description="Grants +2 AD if you have 3 Dex",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Agile Burst Armor",
            rank=1,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                Whenever you use the \\textit<sprint> ability, you gain a +2 bonus to your Reflex defense until the end of the round.
                This effect has the \\abilitytag<Swift> tag, so it affects attacks against you during the current phase.
            """,
            short_description="Grants +2 Reflex whenever you sprint",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The defense bonus increases to +4.
                    """,
                    short_description="Grants +4 Reflex whenever you sprint",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Lifeweave Armor",
            rank=2,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -4 penalty to your \\glossterm<hit points>.
            """,
            short_description="Grants +8 damage resistance, but -4 hit points",
            upgrades = [
                Upgrade(
                    rank=4,
                    description="""
                        The damage resistance bonus increases to +16, but the hit point penalty increases to -8.
                    """,
                    short_description="Grants +16 damage resistance, but -8 hit points",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The damage resistance bonus increases to +32, but the hit point penalty increases to -16.
                    """,
                    short_description="Grants +32 damage resistance, but -16 hit points",
                ),
            ]
        ),
    ]

    armor += [
        create_armor(
            name="Soulweave Armor",
            rank=2,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +6 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -2 penalty to your \\glossterm<power> with all abilities.
            """,
            short_description="Grants +6 damage resistance, but -2 power",
            upgrades = [
                Upgrade(
                    rank=4,
                    description="""
                        The damage resistance bonus increases to +12, but the power penalty increases to -3.
                    """,
                    short_description="Grants +12 damage resistance, but -4 power",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The damage resistance bonus increases to +24, but the power penalty increases to -4.
                    """,
                    short_description="Grants +24 damage resistance, but -8 power",
                ),
            ]
        ),
    ]

    armor += [
        create_armor(
            name="Swiftstep Armor",
            rank=5,
            tags=[],
            material_type="Body armor",
            description="""
                This armor does not penalize your movement speed for being heavy (see \\pcref<Armor Usage Classes>).
                If the armor is not heavy armor, this has no effect.
            """,
            short_description="Removes armor speed penalty",
        ),
    ]

    armor += [
        create_armor(
            name="Crumpling Armor",
            rank=2,
            tags=["Attune (deep)"],
            material_type="Body armor",
            description="""
                Whenever you would take \\glossterm<physical damage>, your armor crumples under the attack, reducing that damage by 5.
                After damage is reduced twice in this way, this has no effect until you finish a \\glossterm<short rest>.
            """,
            short_description="Reduces physical damage from two attacks by 5",
            upgrades = [
                Upgrade(
                    rank=4,
                    description="""
                        The damage reduction improves to 10.
                    """,
                    short_description="Reduces physical damage from two attacks by 10",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The damage reduction improves to 20.
                    """,
                    short_description="Reduces physical damage from two attacks by 20",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Hardblock Shield",
            rank=4,
            tags=[],
            material_type="Shield",
            description="""
                Whenever a creature misses or \\glossterm<glances> you with a melee \\glossterm<strike>, it \\glossterm<briefly> takes a -1 penalty to Armor defense.
                As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
            """,
            short_description="Imposes -1 Armor penalty when creatures miss you",
            upgrades = [
                Upgrade(
                    rank=7,
                    description="""
                        The penalty increases to -2.
                    """,
                    short_description="Imposes -2 Armor penalty when creatures miss you",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Defender's Shield",
            rank=5,
            tags=[],
            material_type="Shield",
            description="""
                You gain a +1 \\glossterm<magic bonus> to your Armor defense.
            """,
            short_description="Grants +1 Armor defense",
        ),
    ]

    armor += [
        create_armor(
            name="Soulguard Shield",
            rank=2,
            tags=[],
            material_type="Shield",
            description="""
                Whenever you would be affected by a \\glossterm<condition>, you have a 25\\% chance to avoid gaining that condition.
                This does not prevent any other effects of the attack.
            """,
            short_description="Grants 25\\% chance to avoid conditions",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The chance increases to 50\\%.
                    """,
                    short_description="Grants 50\\% chance to avoid conditions",
                ),
            ],
        ),
    ]

    armor += [
        create_armor(
            name="Shield of Mystic Reflection",
            rank=4,
            tags=['Swift'],
            material_type="Shield",
            description="""
                Whenever you use the \\ability<total defense> ability, you can activate this shield.
                When you do, any \\glossterm<targeted> \\magical abilities that target you this round also the creature using that ability in addition to you.
                It cannot choose to reduce its accuracy or damage against itself.
                Any other targets of the ability are affected normally.
            """,
            short_description="React to reflect magical attacks",
        ),
    ]

    armor += [
        create_armor(
            name="Armor of Emptiness",
            rank=5,
            tags=[],
            material_type="Body armor",
            description="""
                Your maximum \\glossterm<hit points> are halved.
                However, you are immune to \\glossterm<conditions>.
            """,
            short_description="Immune to conditions, but maximum hit points are halved",
        ),
    ]

    armor += [
        # -1r for immunity
        create_armor(
            name="Shield of Medusa",
            rank=3,
            material_type="Shield",
            tags=["Visual"],
            # d1 in t1 area with t2 debuff if lose HP is base rank 3
            # Increase to t2 area to compensate for one-shot effect
            description="""
                This shield normally has a cloth covering its face.
                As a standard action, you can pull the cloth back and reveal the horrifying face emblazoned on the shield.
                When you do, make an attack vs. Fortitude against all creatures within a \\medarea cone.
                On a hit, each target takes 2d6 physical damage as its body turns to stone.
                Each creature that loses \\glossterm<hit points> from this damage is \\slowed as a \\glossterm<condition>.
                Whether you hit or miss, each creature who can see the face is immune to this ability until it finishes a \\glossterm<short rest>.

                If the cloth is prematurely pulled back, allowing creatures to see the shield without a dramatic reveal, the shield has no effect.
            """,
            short_description="Can deal 2d6 damage and possibly slow nearby foes",
            upgrades=[
                Upgrade(
                    rank=5,
                    # d4
                    description="""
                        The damage increases to 3d8.
                    """,
                    short_description="Can deal 3d8 damage and possibly slow nearby foes",
                ),
                Upgrade(
                    rank=7,
                    # d5
                    description="""
                        The damage increases to 6d6, and each damaged target is slowed regardless of whether it loses hit points.
                    """,
                    short_description="Can deal 6d6 damage and slow nearby foes",
                ),
            ],
        ),
    ]

    # Other

    return armor


def generate_armor_latex(check=False):
    armor = sorted(generate_armor(), key=lambda armor: armor.name)
    if check:
        sanity_check(armor, True)

    texts = []
    for item in armor:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e

    text = "\n".join(texts)
    return latexify(text)


def sanity_check(armor, worn):
    pass


def write_to_file():
    armor_latex = generate_armor_latex()
    armor_table = generate_table(generate_armor(), "Magic Armor", include_type=True)
    with open(book_path("armor.tex"), "w") as armor_description_file:
        armor_description_file.write(armor_latex)
    with open(book_path("armor_table.tex"), "w") as armor_table_file:
        armor_table_file.write(armor_table)


@click.command()
@click.option("-c", "--check/--no-check", default=False)
@click.option("-o", "--output/--no-output", default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_armor_latex())


if __name__ == "__main__":
    main(None, None)
