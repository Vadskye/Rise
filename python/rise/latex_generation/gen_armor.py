#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify, longtablify


def generate_armor():
    armor = []

    armor += [
        MagicItem(
            name="Lifebond Retribution Armor",
            rank=2,
            material_type="Body armor",
            tags=[],
            description="""
                At the end of each phase, make an attack vs. Fortitude against each creature within a \\smallarea radius from you that caused you to lose \\glossterm<hit points> during that phase.
                \\hit Each target takes 2d6 energy damage.
            """,
            short_description="Damages adjacent attackers when you lose HP",
        ),
        MagicItem(
            name="Lifebond Retribution Armor, Greater",
            rank=4,
            material_type="Body armor",
            tags=[],
            description="""
                At the end of each phase, make an attack vs. Fortitude against each creature within a \\smallarea radius from you that caused you to lose \\glossterm<hit points> during that phase.
                \\hit Each target takes 4d6 energy damage.
                \\glance Half damage.
            """,
            short_description="Damages nearby attackers when you lose HP",
        ),
        MagicItem(
            name="Lifebond Retribution Armor, Supreme",
            rank=6,
            material_type="Body armor",
            tags=[],
            description="""
                At the end of each phase, make an attack vs. Fortitude against each creature within a \\smallarea radius from you that caused you to lose \\glossterm<hit points> during that phase.
                \\hit Each target takes 5d10 energy damage.
                \\glance Half damage.
            """,
            short_description="Damages attackers when you lose HP",
        ),
    ]

    armor += [
        MagicItem(
            name="Armor of Health",
            rank=2,
            material_type="Body armor",
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<hit points>.
            """,
            short_description="Grants +4 hit points",
        ),
        MagicItem(
            name="Armor of Health, Greater",
            rank=4,
            material_type="Body armor",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<hit points>.
            """,
            short_description="Grants +8 hit points",
        ),
        MagicItem(
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
        MagicItem(
            name="Shield of Arrow Catching",
            rank=2,
            material_type="Shield",
            description="""
                When an \\glossterm<ally> within a \\areasmall radius emanation from you would be attacked by a ranged weapon, the attack is redirected to target you instead.
                Resolve the attack as if it had initially targeted you, except that the attack is not affected by cover or concealment.
                This item can only affect projectiles and thrown objects that are Small or smaller.
            """,
            short_description="Redirects small nearby projectiles to hit you",
        ),
        MagicItem(
            name="Shield of Arrow Catching, Greater",
            rank=4,
            material_type="Shield",
            description="""
                This item functions like a \\mitem<shield of arrow catching>, except that it affects a \\arealarge radius from you.
            """,
            short_description="Redirects small projectiles to hit you",
        ),
        MagicItem(
            name="Shield of Boulder Catching",
            rank=3,
            material_type="Shield",
            description="""
                This item functions like a \\mitem<shield of arrow catching>, except that it can affect projectile and thrown objects of up to Large size.
            """,
            short_description="Redirects large nearby projectiles to hit you",
        ),
        MagicItem(
            name="Shield of Boulder Catching, Greater",
            rank=5,
            material_type="Shield",
            description="""
                This item functions like a \\mitem<greater shield of arrow catching>, except that it can affect projectile and thrown objects of up to Large size.
            """,
            short_description="Redirects large projectiles to hit you",
        ),
    ]

    armor += [
        MagicItem(
            name="Shield of Arrow Deflection",
            rank=2,
            material_type="Shield",
            description="""
                You gain a +2 bonus to your defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
            """,
            short_description="Grants +2 defenses vs small projectiles",
        ),
        MagicItem(
            name="Shield of Arrow Deflection, Greater",
            rank=4,
            material_type="Shield",
            description="""
                You gain a +3 bonus to your defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
            """,
            short_description="Grants +3 defenses vs small projectiles",
        ),
        MagicItem(
            name="Shield of Arrow Deflection, Supreme",
            rank=6,
            material_type="Shield",
            description="""
                You gain a +4 bonus to your defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
            """,
            short_description="Grants +4 defenses vs small projectiles",
        ),
        MagicItem(
            name="Shield of Boulder Deflection",
            rank=3,
            material_type="Shield",
            description="""
                You gain a +2 bonus to your defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Large or smaller.
            """,
            short_description="Grants +2 defenses vs projectiles",
        ),
        MagicItem(
            name="Shield of Boulder Deflection, Greater",
            rank=5,
            material_type="Shield",
            description="""
                You gain a +3 bonus to your defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Large or smaller.
            """,
            short_description="Grants +3 defenses vs projectiles",
        ),
        MagicItem(
            name="Shield of Boulder Deflection, Supreme",
            rank=7,
            material_type="Shield",
            description="""
                You gain a +4 bonus to your defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Large or smaller.
            """,
            short_description="Grants +4 defenses vs projectiles",
        ),
    ]

    armor += [
        MagicItem(
            name="Shield of Bashing",
            rank=2,
            material_type="Shield",
            description="""
                You gain a +3 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
            """,
            short_description="Grants +3 power with strikes",
        ),
        MagicItem(
            name="Shield of Bashing, Greater",
            rank=4,
            material_type="Shield",
            description="""
                You gain a +6 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
            """,
            short_description="Grants +6 power with strikes",
        ),
        MagicItem(
            name="Shield of Bashing, Supreme",
            rank=6,
            material_type="Shield",
            description="""
                You gain a +12 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
            """,
            short_description="Grants +12 power with strikes",
        ),
    ]

    armor += [
        MagicItem(
            name="Covering Shield",
            rank=2,
            material_type="Shield",
            description="""
                When you take the \\textit<total defense> action with this shield, you gain a +2 bonus to Armor defense in addition to the normal bonuses from taking that action (see \\pcref<Total Defense>).
                This property cannot be applied to tower shields.
            """,
            short_description="Grants +2 Armor defense during total defense",
        ),
        MagicItem(
            name="Covering Shield, Greater",
            rank=4,
            material_type="Shield",
            description="""
                This shield functions like a \\mitem<covering shield>, except that the defense bonus increases to +3.
                This property cannot be applied to tower shields.
            """,
            short_description="Grants +3 Armor defense during total defense",
        ),
        MagicItem(
            name="Covering Shield, Supreme",
            rank=6,
            material_type="Shield",
            description="""
                This shield functions like a \\mitem<covering shield>, except that the defense bonus increases to +4.
                This property cannot be applied to tower shields.
            """,
            short_description="Grants +4 Armor defense during total defense",
        ),
    ]

    armor += [
        MagicItem(
            name="Featherlight Armor",
            rank=2,
            material_type="Body armor",
            description="""
                This armor's \\glossterm<encumbrance> is reduced by 1.
            """,
            short_description="Reduces encumbrance by 1",
        ),
        MagicItem(
            name="Featherlight Armor, Greater",
            rank=4,
            material_type="Body armor",
            description="""
                This armor's \\glossterm<encumbrance> is reduced by 2.
            """,
            short_description="Reduces encumbrance by 2",
        ),
        MagicItem(
            name="Featherlight Armor, Supreme",
            rank=6,
            material_type="Body armor",
            description="""
                This armor's \\glossterm<encumbrance> is reduced by 3.
            """,
            short_description="Reduces encumbrance by 3",
        ),
    ]

    armor += [
        MagicItem(
            name="Armor of Retribution",
            rank=4,
            material_type="Body armor",
            description="""
                At the end of each phase, make an attack vs. Fortitude against each creature adjacent to you that attacked you during that phase.
                \\hit Each target takes 2d6 energy damage.
                \\glance Half damage.
            """,
            short_description="Damages adjacent attackers",
        ),
        MagicItem(
            name="Armor of Retribution, Supreme",
            rank=6,
            material_type="Body armor",
            description="""
                At the end of each phase, make an attack vs. Fortitude against each creature adjacent to you that attacked you during that phase.
                \\hit Each target takes 4d6 energy damage.
                \\glance Half damage.
            """,
            short_description="Damages nearby attackers",
        ),
    ]

    armor += [
        MagicItem(
            name="Armor of Fortification",
            rank=3,
            material_type="Body armor",
            description="""
                You gain a +4 bonus to your defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Reduces critical hits from strikes",
        ),
        MagicItem(
            name="Armor of Fortification, Greater",
            rank=6,
            material_type="Body armor",
            description="""
                You gain a +8 bonus to your defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Drastically reduces critical hits from strikes",
        ),
        MagicItem(
            name="Armor of Fortification, Mystic",
            rank=5,
            material_type="Body armor",
            description="""
                You gain a +4 bonus to your defenses when determining whether any attack gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Reduces critical hits from magical attacks",
        ),
    ]

    armor += [
        MagicItem(
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
        MagicItem(
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
        MagicItem(
            name="Resistant Armor",
            rank=2,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            """,
            short_description="Grants +4 damage resistance",
        ),
        MagicItem(
            name="Resistant Armor, Greater",
            rank=4,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            """,
            short_description="Grants +8 damage resistance",
        ),
        MagicItem(
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
        MagicItem(
            name="Stonebody Armor",
            rank=2,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<hit points> and \\glossterm<damage resistance>.
                However, you take a -5 foot penalty to your \\glossterm<movement speed> with all movement modes.
            """,
            short_description="Grants +4 hit points and damage resistance, but -5 speed",
        ),
        MagicItem(
            name="Stonebody Armor, Greater",
            rank=4,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<hit points> and \\glossterm<damage resistance>.
                However, you take a -5 foot penalty to your \\glossterm<movement speed> with all movement modes.
            """,
            short_description="Grants +8 hit points and damage resistance, but -5 speed",
        ),
        MagicItem(
            name="Stonebody Armor, Supreme",
            rank=6,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +16 \\glossterm<magic bonus> to your \\glossterm<hit points> and \\glossterm<damage resistance>.
                However, you take a -5 foot penalty to your \\glossterm<movement speed> with all movement modes.
            """,
            short_description="Grants +16 hit points and damage resistance, but -5 speed",
        ),
    ]

    armor += [
        MagicItem(
            name="Lithe Armor",
            rank=4,
            tags=[],
            material_type="Body armor",
            description="""
                If your base Dexterity is at least 3, you gain a +1 bonus to Armor defense.
            """,
            short_description="Grants +1 Armor if you have 3 base Dex",
        ),
        MagicItem(
            name="Lithe Armor, Greater",
            rank=7,
            tags=[],
            material_type="Body armor",
            description="""
                If your base Dexterity is at least 3, you gain a +2 bonus to Armor defense.
            """,
            short_description="Grants +2 Armor if you have 3 base Dex",
        ),
    ]

    armor += [
        MagicItem(
            name="Agile Burst Armor",
            rank=2,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                Whenever you use the \\textit<sprint> ability, you gain a +1 bonus to Reflex defense until the end of the round.
                This effect has the \\abilitytag<Swift> tag, so it affects attacks against you during the current phase.
            """,
            short_description="Grants +1 Reflex whenever you sprint",
        ),
        MagicItem(
            name="Agile Burst Armor, Greater",
            rank=5,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                This armor functions like \\mitem<agile burst armor>, except that the bonus also applies to Armor defense.
            """,
            short_description="Grants +1 Armor and Reflex whenever you sprint",
        ),
    ]

    armor += [
        MagicItem(
            name="Lifeweave Armor",
            rank=2,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -4 penalty to your \\glossterm<hit points>.
            """,
            short_description="Grants +8 damage resistance, but -4 hit points",
        ),
        MagicItem(
            name="Lifeweave Armor, Greater",
            rank=4,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                You gain a +16 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -8 penalty to your \\glossterm<hit points>.
            """,
            short_description="Grants +16 damage resistance, but -8 hit points",
        ),
        MagicItem(
            name="Lifeweave Armor, Supreme",
            rank=6,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                You gain a +32 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -16 penalty to your \\glossterm<hit points>.
            """,
            short_description="Grants +32 damage resistance, but -16 hit points",
        ),
    ]

    armor += [
        MagicItem(
            name="Soulweave Armor",
            rank=2,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                You gain a +6 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -2 penalty to your \\glossterm<power>.
            """,
            short_description="Grants +6 damage resistance, but -2 power",
        ),
        MagicItem(
            name="Soulweave Armor, Greater",
            rank=4,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                You gain a +12 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -4 penalty to your \\glossterm<power>.
            """,
            short_description="Grants +12 damage resistance, but -4 power",
        ),
        MagicItem(
            name="Soulweave Armor, Supreme",
            rank=6,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                You gain a +24 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
                However, you take a -8 penalty to your \\glossterm<power>.
            """,
            short_description="Grants +24 damage resistance, but -8 power",
        ),
    ]

    armor += [
        MagicItem(
            name="Swiftstep Armor",
            rank=3,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                The penalty to your speed from this armor is reduced by 5 feet.
                If the armor does not reduce your speed, this has no effect.
            """,
            short_description="Reduces armor speed penalty by 5 feet",
        ),
        MagicItem(
            name="Swiftstep Armor, Greater",
            rank=5,
            tags=["Swift"],
            material_type="Body armor",
            description="""
                The penalty to your speed from this armor is reduced by 10 feet.
                If the armor does not reduce your speed, this has no effect.
            """,
            short_description="Reduces armor speed penalty by 10 feet",
        ),
    ]

    armor += [
        MagicItem(
            name="Crumpling Armor",
            rank=3,
            tags=[],
            material_type="Body armor",
            description="""
                Whenever you take damage, you can choose to have your armor crumple under the attack, cushioning the blow.
                If you do, you only take half of that damage.
                You can learn the amount of damage that you would take from all attacks in a given phase before you decide whether to apply this effect.
                After you reduce damage in this way, you cannot do so again until you take a \\glossterm<short rest>.
            """,
            short_description="Halves damage from a single attack",
        ),
        MagicItem(
            name="Crumpling Armor, Greater",
            rank=5,
            tags=[],
            material_type="Body armor",
            description="""
                This armor functions like \\mitem<crumpling armor>, except that you can use it twice between short rests.
            """,
            short_description="Halves damage from two attacks",
        ),
        MagicItem(
            name="Crumpling Armor, Supreme",
            rank=7,
            tags=[],
            material_type="Body armor",
            description="""
                This armor functions like \\mitem<crumpling armor>, except that you can use it three times between short rests.
            """,
            short_description="Halves damage from three attacks",
        ),
    ]

    armor += [
        MagicItem(
            name="Hardblock Shield",
            rank=4,
            tags=[],
            material_type="Shield",
            description="""
                Whenever a creature misses you with a melee \\glossterm<strike>, it \\glossterm<briefly> takes a -1 penalty to Armor defense.
                As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
            """,
            short_description="Imposes -1 Armor penalty when creatures miss you",
        ),
        MagicItem(
            name="Hardblock Shield, Greater",
            rank=6,
            tags=[],
            material_type="Shield",
            description="""
                This shield functions like a \\mitem<hardblock shield>, except that the penalty increases to -2.
            """,
            short_description="Imposes -2 Armor penalty when creatures miss you",
        ),
    ]

    armor += [
        MagicItem(
            name="Shield of Mystic Reflection",
            rank=6,
            tags=[],
            material_type="Shield",
            description="""
                Whenever you use the \\ability<total defense> ability, any \\glossterm<targeted> \\glossterm<magical> abilities that would target you until the end of the round are redirected to target the creature using that ability instead of you.
                It cannot choose to reduce its accuracy or damage against itself.
                Any other targets of the ability are affected normally.

                This is a \\glossterm<Swift> ability, so it affects any abilities targeting you in the phase you take the total defense action.
            """,
            short_description="React to reflect magical attacks",
        ),
    ]

    armor += [
        MagicItem(
            name="Armor of Emptiness",
            rank=6,
            tags=[],
            material_type="Body armor",
            description="""
                Your maximum \\glossterm<hit points> are halved.
                However, you are immune to \\glossterm<conditions>.
            """,
            short_description="Immune to conditions, but maximum hit points are halved",
        ),
    ]

    armor.append(
        MagicItem(
            name="Shield of Medusa",
            rank=3,
            material_type="Shield",
            tags=["Visual"],
            description="""
            This shield normally has a cloth covering its face.
            As a standard action, you can pull the cloth back and reveal the horrifying face emblazoned on the shield.
            When you do, make an attack vs. Fortitude against each creature within a \\areasmall cone.
            On a hit, each target with no remaining \\glossterm<damage resistance> is \\glossterm{briefly} \\nauseated.
            On a \\glossterm<critical hit>, each target with no remaining \\glossterm<damage resistance> is \\glossterm{briefly} \\glossterm<paralyzed>.
            In either case, each target is immune to this ability until it takes a \\glossterm<short rest>.

            If the cloth is prematurely pulled back, allowing creatures to see the shield without a dramatic reveal, the shield has no effect.
        """,
            short_description="Can briefly nauseate nearby foes",
        )
    )

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
    rows = [item.latex_table_row() for item in armor]
    row_text = "\n".join(rows)
    return longtablify(
        f"""
        \\lcaption<Armor Items> \\\\
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
