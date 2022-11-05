#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem, Upgrade
from rise.latex.util import latexify, longtablify
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
            description="""
                Whenever an \\glossterm<enemy> within a \\medarea radius \\glossterm<emanation> from you causes you to lose \\glossterm<hit points>, make a \\glossterm<reactive attack> vs. Fortitude against them.
                \\hit Each target takes 2d6 energy damage.
            """,
            short_description="Deals 2d6 damage to attackers when you lose HP",
        ),
        create_armor(
            name="Lifebond Retribution Armor, Greater",
            rank=4,
            material_type="Body armor",
            tags=["Attune (deep)"],
            description="""
                Whenever an \\glossterm<enemy> within a \\medarea radius \\glossterm<emanation> from you causes you to lose \\glossterm<hit points>, make a \\glossterm<reactive attack> vs. Fortitude against them.
                \\hit Each target takes 4d6 energy damage.
            """,
            short_description="Deals 4d6 damage to attackers when you lose HP",
        ),
        create_armor(
            name="Lifebond Retribution Armor, Supreme",
            rank=6,
            material_type="Body armor",
            tags=["Attune (deep)"],
            description="""
                Whenever an \\glossterm<enemy> within a \\medarea radius \\glossterm<emanation> from you causes you to lose \\glossterm<hit points>, make a \\glossterm<reactive attack> vs. Fortitude against them.
                \\hit Each target takes 5d10 energy damage.
            """,
            short_description="Deals 5d10 damage to attackers when you lose HP",
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
        ),
        create_armor(
            name="Armor of Health, Greater",
            rank=4,
            material_type="Body armor",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<hit points>.
            """,
            short_description="Grants +8 hit points",
        ),
        create_armor(
            name="Armor of Health, Supreme",
            rank=6,
            material_type="Body armor",
            description="""
                You gain a +16 \\glossterm<magic bonus> to your \\glossterm<hit points>.
            """,
            short_description="Grants +16 hit points",
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
        ),
        create_armor(
            name="Shield of Arrow Catching, Greater",
            rank=4,
            material_type="Shield",
            description="""
                This item functions like a \\mitem<shield of arrow catching>, except that it affects a \\arealarge radius from you.
            """,
            short_description="Redirects projectiles to hit you",
        ),
        create_armor(
            name="Shield of Arrow Catching, Supreme",
            rank=6,
            material_type="Shield",
            description="""
                This item functions like a \\mitem<shield of arrow catching>, except that it affects a \\arealarge radius from you.
                In addition, you gain a +2 bonus to all defenses against strikes redirected in this way.
            """,
            short_description="Redirects projectiles to possibly hit you",
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
        ),
        create_armor(
            name="Shield of Arrow Deflection, Greater",
            rank=5,
            material_type="Shield",
            description="""
                You gain a +3 bonus to your defenses against ranged \\glossterm<strikes>.
            """,
            short_description="Grants +3 defenses vs ranged strikes",
        ),
        create_armor(
            name="Shield of Arrow Deflection, Supreme",
            rank=7,
            material_type="Shield",
            description="""
                You gain a +4 bonus to your defenses against ranged \\glossterm<strikes>.
            """,
            short_description="Grants +4 defenses vs ranged strikes",
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
            short_description="Reflects missed ranged attacks",
        ),
        create_armor(
            name="Shield of Arrow Reflection, Greater",
            rank=4,
            material_type="Shield",
            description="""
                Whenever a creature within \\distrange of you misses or \\glossterm<glances> you with a ranged \\glossterm<strike>, it treats itself as a target of that attack in addition to any other targets.
                It takes a -2 penalty to defenses against attacks reflected in this way.
            """,
            short_description="Precisely reflects missed ranged attacks",
        ),
        create_armor(
            name="Shield of Arrow Reflection, Supreme",
            rank=6,
            material_type="Shield",
            description="""
                Whenever a creature within \\extrange of you misses or \\glossterm<glances> you with a ranged \\glossterm<strike>, it treats itself as a target of that attack in addition to any other targets.
                It takes a -4 penalty to defenses against attacks reflected in this way.
            """,
            short_description="Reflects missed ranged attacks with incredible precision",
        ),
    ]

    armor += [
        create_armor(
            name="Shield of Bashing",
            rank=2,
            material_type="Shield",
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +4 damage bonus using this shield.
            """,
            short_description="Can attack with +4 damage",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The damage bonus increases to +8.
                    """,
                    short_description="Can attack with +8 damage",
                ),
                Upgrade(
                    rank=6,
                    description="""
                        The damage bonus increases to +16.
                    """,
                    short_description="Can attack with +16 damage",
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
            description="""
                Whenever an adjacent creature attacks you, make a \\glossterm<reactive attack> vs. Fortitude against them.
                \\hit Each target takes 2d8 energy damage.
            """,
            short_description="Deals 2d8 damage to adjacent attackers",
        ),
        create_armor(
            name="Armor of Retribution, Greater",
            rank=6,
            material_type="Body armor",
            tags=["Attune (deep)"],
            description="""
                Whenever an adjacent creature attacks you, make a \\glossterm<reactive attack> vs. Fortitude against them.
                \\hit Each target takes 4d8 energy damage.
            """,
            short_description="Deals 4d8 damage to adjacent attackers",
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
        ),
        create_armor(
            name="Armor of Fortification, Greater",
            rank=6,
            material_type="Body armor",
            description="""
                You gain a +8 bonus to your defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Drastically reduces critical hits from strikes",
        ),
        create_armor(
            name="Armor of Mystic Fortification",
            rank=5,
            material_type="Body armor",
            description="""
                You gain a +4 bonus to your defenses when determining whether any attack gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Reduces critical hits from magical attacks",
        ),
    ]

    armor += [
        create_armor(
            name="Hidden Armor",
            rank=1,
            tags=["Sensation"],
            material_type="Body armor",
            description="""
                 As a standard action, you can use this item.
                 If you do, it appears to change shape and form to assume the shape of a normal set of clothing.
                 You may choose the design of the clothing.
                 The item retains all of its properties, including weight and sound, while disguised in this way.
                 Only its visual appearance is altered.

                 Alternately, you may return the armor to its original appearance.
            """,
            short_description="Can look like normal clothing",
        ),
        create_armor(
            name="Hidden Armor, Greater",
            rank=3,
            material_type="Body armor",
            tags=["Sensation"],
            description="""
                This item functions like \\mitem<hidden armor>, except that the item also makes sound appropriate to its disguised form while disguised.
            """,
            short_description="Can look and sound like normal clothing",
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
        ),
        create_armor(
            name="Resistant Armor, Greater",
            rank=4,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            """,
            short_description="Grants +8 damage resistance",
        ),
        create_armor(
            name="Resistant Armor, Supreme",
            rank=6,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +16 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            """,
            short_description="Grants +16 damage resistance",
        ),
    ]

    armor += [
        create_armor(
            name="Stonebody Armor",
            rank=3,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<hit points> and \\glossterm<damage resistance>.
                However, you take a -10 foot penalty to your \\glossterm<movement speed> with all movement modes.
            """,
            short_description="Grants +8 hit points and damage resistance, but -10 speed",
        ),
        create_armor(
            name="Stonebody Armor, Greater",
            rank=5,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +16 \\glossterm<magic bonus> to your \\glossterm<hit points> and \\glossterm<damage resistance>.
                However, you take a -10 foot penalty to your \\glossterm<movement speed> with all movement modes.
            """,
            short_description="Grants +16 hit points and damage resistance, but -10 speed",
        ),
        create_armor(
            name="Stonebody Armor, Supreme",
            rank=7,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +32 \\glossterm<magic bonus> to your \\glossterm<hit points> and \\glossterm<damage resistance>.
                However, you take a -10 foot penalty to your \\glossterm<movement speed> with all movement modes.
            """,
            short_description="Grants +32 hit points and damage resistance, but -10 speed",
        ),
    ]

    armor += [
        create_armor(
            name="Lithe Armor",
            rank=4,
            tags=[],
            material_type="Body armor",
            description="""
                If your Dexterity is at least 3, you gain a +1 bonus to your Armor defense.
            """,
            short_description="Grants +1 Armor if you have 3 Dex",
        ),
        create_armor(
            name="Lithe Armor, Greater",
            rank=7,
            tags=[],
            material_type="Body armor",
            description="""
                If your Dexterity is at least 3, you gain a +2 bonus to your Armor defense.
            """,
            short_description="Grants +2 Armor if you have 3 Dex",
        ),
    ]

    armor += [
        create_armor(
            name="Agile Burst Armor",
            rank=1,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                Whenever you use the \\textit<sprint> ability, you gain a +1 bonus to your Reflex defense until the end of the round.
                This effect has the \\abilitytag<Swift> tag, so it affects attacks against you during the current phase.
            """,
            short_description="Grants +1 Reflex whenever you sprint",
        ),
        create_armor(
            name="Agile Burst Armor, Greater",
            rank=4,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                Whenever you use the \\textit<sprint> ability, you gain a +1 bonus to your Armor and Reflex defenses until the end of the round.
                This effect has the \\abilitytag<Swift> tag, so it affects attacks against you during the current phase.
            """,
            short_description="Grants +1 Armor and Reflex whenever you sprint",
        ),
        create_armor(
            name="Agile Burst Armor, Supreme",
            rank=7,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                Whenever you use the \\textit<sprint> ability, you gain a +2 bonus to your Armor and Reflex defenses until the end of the round.
                This effect has the \\abilitytag<Swift> tag, so it affects attacks against you during the current phase.
            """,
            short_description="Grants +2 Armor and Reflex whenever you sprint",
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
        ),
        create_armor(
            name="Lifeweave Armor, Greater",
            rank=4,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +16 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -8 penalty to your \\glossterm<hit points>.
            """,
            short_description="Grants +16 damage resistance, but -8 hit points",
        ),
        create_armor(
            name="Lifeweave Armor, Supreme",
            rank=6,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +32 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -16 penalty to your \\glossterm<hit points>.
            """,
            short_description="Grants +32 damage resistance, but -16 hit points",
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
                However, you take a -2 penalty to your \\glossterm<power>.
            """,
            short_description="Grants +6 damage resistance, but -2 power",
        ),
        create_armor(
            name="Soulweave Armor, Greater",
            rank=4,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +12 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -4 penalty to your \\glossterm<power>.
            """,
            short_description="Grants +12 damage resistance, but -4 power",
        ),
        create_armor(
            name="Soulweave Armor, Supreme",
            rank=6,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +24 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -8 penalty to your \\glossterm<power>.
            """,
            short_description="Grants +24 damage resistance, but -8 power",
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
                After damage is reduced twice in this way, this has no effect until you take a \\glossterm<short rest>.
            """,
            short_description="Reduces physical damage from two attacks by 5",
        ),
        create_armor(
            name="Crumpling Armor, Greater",
            rank=4,
            tags=["Attune (deep)"],
            material_type="Body armor",
            description="""
                This armor functions like \\mitem<crumpling armor>, except that the damage reduction increases to 10.
            """,
            short_description="Reduces physical damage from two attacks by 10",
        ),
        create_armor(
            name="Crumpling Armor, Supreme",
            rank=6,
            tags=["Attune (deep)"],
            material_type="Body armor",
            description="""
                This armor functions like \\mitem<crumpling armor>, except that the damage reduction increases to 20.
            """,
            short_description="Reduces physical damage from two attacks by 20",
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
        ),
        create_armor(
            name="Hardblock Shield, Greater",
            rank=7,
            tags=[],
            material_type="Shield",
            description="""
                This shield functions like a \\mitem<hardblock shield>, except that the penalty increases to -2.
            """,
            short_description="Imposes -2 Armor penalty when creatures miss you",
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
        ),
        create_armor(
            name="Soulguard Shield, Greater",
            rank=6,
            tags=[],
            material_type="Shield",
            description="""
                Whenever you would be affected by a \\glossterm<condition>, you have a 50\\% chance to avoid gaining that condition.
                This does not prevent any other effects of the attack.
            """,
            short_description="Grants 50\\% chance to avoid conditions",
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
                When you do, any \\glossterm<targeted> \\glossterm<magical> abilities that target you this round also the creature using that ability in addition to you.
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
        # Paralyzed is t4, but this has an immunity, so call this rank 4
        create_armor(
            name="Shield of Medusa",
            rank=4,
            material_type="Shield",
            tags=["Visual"],
            description="""
                This shield normally has a cloth covering its face.
                As a standard action, you can pull the cloth back and reveal the horrifying face emblazoned on the shield.
                When you do, make an attack vs. Fortitude against all creatures within a \\areasmall cone.
                On a hit, each target with no remaining \\glossterm<damage resistance> is \\glossterm<briefly> \\paralyzed.
                Each target is immune to this ability until it takes a \\glossterm<short rest>.

                If the cloth is prematurely pulled back, allowing creatures to see the shield without a dramatic reveal, the shield has no effect.
            """,
            short_description="Can briefly paralyze nearby foes",
        ),
        create_armor(
            name="Shield of Medusa, Greater",
            rank=7,
            material_type="Shield",
            tags=["Visual"],
            description="""
                This shield functions like a \\mitem<shield of medusa>, except that the attack affects all creatures within a \\largearea cone.
            """,
            short_description="Can briefly paralyze foes",
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


def generate_armor_table():
    armor = sorted(
        sorted(generate_armor(), key=lambda item: item.name),
        key=lambda item: item.rank,
    )
    rows = []
    for item in armor:
        rows += item.latex_table_rows(include_type=True)
    row_text = "\n".join(rows)
    return longtablify(
        f"""
        \\lcaption<Magic Armor> \\\\
        \\tb<Name> & \\tb<Rank (Cost)> & \\tb<Type> & \\tb<Description> & \\tb<Page> \\tableheaderrule
        {row_text}
    """
    )


def sanity_check(armor, worn):
    pass


def write_to_file():
    armor_latex = generate_armor_latex()
    armor_table = generate_armor_table()
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
