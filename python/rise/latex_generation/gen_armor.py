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
            level=4,
            material_type="Body armor",
            tags=[],
            description="""
                At the end of each round, make an attack vs. Fortitude against each creature within a \\smallarea radius from you that caused you to lose \\glossterm<hit points> that round.
                \\hit Each target takes 2d6 energy damage.
            """,
            short_description="Damages adjacent attackers when you lose HP",
        ),
        MagicItem(
            name="Lifebond Retribution Armor, Greater",
            level=10,
            material_type="Body armor",
            tags=[],
            description="""
                At the end of each round, make an attack vs. Fortitude against each creature within a \\smallarea radius from you that caused you to lose \\glossterm<hit points> that round.
                \\hit Each target takes 4d6 energy damage.
                \\glance Half damage.
            """,
            short_description="Damages nearby attackers when you lose HP",
        ),
        MagicItem(
            name="Lifebond Retribution Armor, Supreme",
            level=16,
            material_type="Body armor",
            tags=[],
            description="""
                At the end of each round, make an attack vs. Fortitude against each creature within a \\smallarea radius from you that caused you to lose \\glossterm<hit points> that round.
                \\hit Each target takes 5d10 energy damage.
                \\glance Half damage.
            """,
            short_description="Damages attackers when you lose HP",
        ),
    ]

    armor += [
        MagicItem(
            name="Shield of Arrow Catching",
            level=5,
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
            level=11,
            material_type="Shield",
            description="""
                This item functions like a \\mitem<shield of arrow catching>, except that it affects a \\arealarge radius from you.
            """,
            short_description="Redirects small projectiles to hit you",
        ),
        MagicItem(
            name="Shield of Boulder Catching",
            level=8,
            material_type="Shield",
            description="""
                This item functions like a \\mitem<shield of arrow catching>, except that it can affect projectile and thrown objects of up to Large size.
            """,
            short_description="Redirects large nearby projectiles to hit you",
        ),
        MagicItem(
            name="Shield of Boulder Catching, Greater",
            level=14,
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
            level=5,
            material_type="Shield",
            description="""
                You gain a +2 bonus to defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
            """,
            short_description="Grants +2 defenses vs small projectiles",
        ),
        MagicItem(
            name="Shield of Arrow Deflection, Greater",
            level=11,
            material_type="Shield",
            description="""
                You gain a +4 bonus to defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
            """,
            short_description="Grants +4 defenses vs small projectiles",
        ),
        MagicItem(
            name="Shield of Arrow Deflection, Supreme",
            level=17,
            material_type="Shield",
            description="""
                You gain a +6 bonus to defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
            """,
            short_description="Grants +6 defenses vs small projectiles",
        ),
        MagicItem(
            name="Shield of Boulder Deflection",
            level=8,
            material_type="Shield",
            description="""
                This item functions like a \\mitem<shield of arrow deflection>, except that it can affect weapons and projectiles of up to Large size.
            """,
            short_description="Grants +2 defenses vs projectiles",
        ),
        MagicItem(
            name="Shield of Boulder Deflection, Greater",
            level=14,
            material_type="Shield",
            description="""
                This item functions like a \\mitem<greater shield of arrow deflection>, except that it can affect weapons and projectiles of up to Large size.
            """,
            short_description="Grants +4 defenses vs projectiles",
        ),
    ]

    armor += [
        MagicItem(
            name="Shield of Bashing",
            # -1 level relative to a potency weapon due to being more limited
            level=3,
            material_type="Shield",
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
            """,
            short_description="Grants +2 power with strikes",
        ),
        MagicItem(
            name="Shield of Bashing, Greater",
            level=9,
            material_type="Shield",
            description="""
                You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
            """,
            short_description="Grants +4 power with strikes",
        ),
        MagicItem(
            name="Shield of Bashing, Supreme",
            level=15,
            material_type="Shield",
            description="""
                You gain a +8 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
            """,
            short_description="Grants +8 power with strikes",
        ),
    ]

    armor += [
        MagicItem(
            name="Covering Shield",
            level=4,
            material_type="Shield",
            description="""
                When you take the \\textit<total defense> action with this shield, you gain a +3 bonus to Armor defense in addition to the normal bonuses from taking that action (see \\pcref<Total Defense>).
                This property cannot be applied to tower shields.
            """,
            short_description="Grants +3 Armor defense during total defense",
        ),
        MagicItem(
            name="Covering Shield, Greater",
            level=10,
            material_type="Shield",
            description="""
                This shield functions like a \\mitem<covering shield>, except that the defense bonus increases to +4.
                This property cannot be applied to tower shields.
            """,
            short_description="Grants +4 Armor defense during total defense",
        ),
        MagicItem(
            name="Covering Shield, Supreme",
            level=16,
            material_type="Shield",
            description="""
                This shield functions like a \\mitem<covering shield>, except that the defense bonus increases to +5.
                This property cannot be applied to tower shields.
            """,
            short_description="Grants +5 Armor defense during total defense",
        ),
    ]

    armor += [
        MagicItem(
            name="Featherlight Armor",
            level=5,
            material_type="Body armor",
            description="""
                This armor's \\glossterm<encumbrance> is reduced by 1.
            """,
            short_description="Reduces encumbrance by 1",
        ),
        MagicItem(
            name="Featherlight Armor, Greater",
            level=11,
            material_type="Body armor",
            description="""
                This armor's \\glossterm<encumbrance> is reduced by 2.
            """,
            short_description="Reduces encumbrance by 2",
        ),
        MagicItem(
            name="Featherlight Armor, Supreme",
            level=17,
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
            level=10,
            material_type="Body armor",
            description="""
                At the end of each round, make an attack vs. Fortitude against each creature adjacent to you that attacked you that round.
                \\hit Each target takes 2d6 energy damage.
                \\glance Half damage.
            """,
            short_description="Damages adjacent attackers",
        ),
        MagicItem(
            name="Armor of Retribution, Supreme",
            level=16,
            material_type="Body armor",
            description="""
                At the end of each round, make an attack vs. Fortitude against each creature within a \\areamed radius \\glossterm<emanation> from you that attacked you that round.
                \\hit Each target takes 2d10 energy damage.
                \\glance Half damage.
            """,
            short_description="Damages nearby attackers",
        ),
    ]

    armor += [
        MagicItem(
            name="Armor of Fortification",
            level=8,
            material_type="Body armor",
            description="""
                You gain a +4 bonus to defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Reduces critical hits from strikes",
        ),
        MagicItem(
            name="Armor of Fortification, Greater",
            level=17,
            material_type="Body armor",
            description="""
                You gain a +8 bonus to defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Drastically reduces critical hits from strikes",
        ),
        MagicItem(
            name="Armor of Fortification, Mystic",
            level=14,
            material_type="Body armor",
            description="""
                You gain a +4 bonus to defenses when determining whether any attack gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Reduces critical hits from magical attacks",
        ),
    ]

    armor += [
        MagicItem(
            name="Hidden Armor",
            level=3,
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
            level=9,
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
            level=4,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            """,
            short_description="Grants +4 damage resistance",
        ),
        MagicItem(
            name="Resistant Armor, Greater",
            level=10,
            tags=[],
            material_type="Body armor",
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            """,
            short_description="Grants +8 damage resistance",
        ),
        MagicItem(
            name="Resistant Armor, Supreme",
            level=16,
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
            name="Crumpling Armor",
            level=7,
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
            level=13,
            tags=[],
            material_type="Body armor",
            description="""
                This armor functions like \\mitem<crumpling armor>, except that you can use it twice between short rests.
            """,
            short_description="Halves damage from two attacks",
        ),
        MagicItem(
            name="Crumpling Armor, Supreme",
            level=19,
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
            level=10,
            tags=[],
            material_type="Body armor",
            description="""
                Whenever a creature misses you with a melee \\glossterm<strike>, it \\glossterm<briefly> takes a -1 penalty to Armor defense.
                As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
            """,
            short_description="Imposes -1 Armor penalty when creatures miss you",
        ),
        MagicItem(
            name="Greater Hardblock Shield",
            level=16,
            tags=[],
            material_type="Body armor",
            description="""
                This shield functions like a \\mitem<hardblock shield>, except that the penalty increases to -2.
            """,
            short_description="Imposes -2 Armor penalty when creatures miss you",
        ),
    ]

    armor += [
        MagicItem(
            name="Shield of Mystic Reflection",
            level=16,
            tags=[],
            material_type="Shield",
            description="""
                Whenever you use the \\textit<total defense> action, any \\glossterm<targeted> \\glossterm<magical> abilities that would target you until the end of the round are redirected to target the creature using that ability instead of you.
                It cannot choose to reduce its accuracy or damage against itself.
                Any other targets of the ability are affected normally.

                This is a \\glossterm<Swift> ability, so it affects any abilities targeting you in the phase you take the total defense action.
            """,
            short_description="React to reflect magical attacks",
        ),
    ]

    armor.append(
        MagicItem(
            name="Acidic Armor",
            level=7,
            material_type="Body armor",
            tags=[],
            description="""
            At the end of each round, if this armor is making significant contact against a creature or object other than you and your equipment, make an attack vs. Fortitude against it.
            Generally, you can only affect another creature with this armor if you are \\grappled by it.
            On a hit, the target takes 2d6 acid damage.
        """,
            short_description="Deals acid damage to anything it touches",
        )
    )

    armor.append(
        MagicItem(
            name="Shield of Medusa",
            level=8,
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
        key=lambda item: item.level,
    )
    rows = [item.latex_table_row() for item in armor]
    row_text = "\n".join(rows)
    return longtablify(
        f"""
        \\lcaption<Armor Items> \\\\
        \\tb<Name> & \\tb<Item Level (Cost)> & \\tb<Type> & \\tb<Description> & \\tb<Page> \\tableheaderrule
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
