#!/usr/bin/env python3

import click
from generation.magic_item import MagicItem
from generation.util import latexify

def generate_apparel():
    apparel = []

    apparel.append(MagicItem(
        name='Arrow Catching',
        level=5,
        materials=['as armor'],
        tags=['Telekinesis'],
        armor_type='shield',
        effect="""
            Whenever a creature within a \\areamed radius emanation from you would be attacked by a ranged weapon, the attack is redirected to target you instead.
            Resolve the attack as if it had initially targeted you, except that the attack is not affected by cover or concealment.
            This ability can only affect projectiles and thrown objects that are Small or smaller.
        """,
    ))

    apparel.append(MagicItem(
        name='Arrow Catching, Greater',
        level=10,
        materials=['as armor'],
        tags=['Telekinesis'],
        armor_type='shield',
        effect="""
            This ability functions like the \\mitem<arrow catching> ability, except that it affects a \\arealarge radius from you.
            In addition, you may choose to exclude creature from this ability's effect, allowing projectiles to target nearby foes normally.
        """,
    ))

    apparel.append(MagicItem(
        name='Boulder Catching',
        level=8,
        materials=['as armor'],
        tags=['Telekinesis'],
        armor_type='shield',
        effect="""
            This ability functions like the \\mitem<arrow catching> ability, except that it can affect projectile and thrown objects of up to Large size.
        """,
    ))

    apparel.append(MagicItem(
        name="Arrow Deflection",
        level=2,
        materials=["as armor"],
        tags=['Telekinesis'],
        armor_type='shield',
        effect="""
            As an \\glossterm<immediate action> when you are attacked by a ranged \\glossterm<strike>, you can spend an \\glossterm<action point> to deflect the attack.
            If you do, you gain a +5 bonus to Armor defense against the attack.
            You must be aware of the attack to deflect it in this way.
            This ability can only affect projectiles and thrown objects that are Small or smaller.
        """,
    ))

    apparel.append(MagicItem(
        name="Arrow Deflection, Greater",
        level=12,
        materials=["as armor"],
        tags=['Telekinesis'],
        armor_type='shield',
        effect="""
            This ability functions like the \\mitem<arrow deflection> ability, except that the defense bonus increases to +10.
        """,
    ))

    apparel.append(MagicItem(
        name="Arrow Deflection, Greater",
        level=6,
        materials=["as armor"],
        tags=['Telekinesis'],
        armor_type='shield',
        effect="""
            This ability functions like the \\mitem<arrow deflection> ability, except that it can affect projectiles and thrown objects of up to Large size.
        """,
    ))

    apparel.append(MagicItem(
        name="Bashing",
        level=2,
        materials=["as armor"],
        tags=['Enhancement'],
        armor_type='shield',
        effect="""
            % Should this be strike damage?
            You gain a +2d bonus to damage with physical attacks using this shield.
        """,
    ))

    apparel.append(MagicItem(
        name="Bashing, Greater",
        level=11,
        materials=["as armor"],
        tags=['Enhancement'],
        armor_type='shield',
        effect="""
            This ability functions like the \\mitem<bashing> ability, except that the damage bonus increases to +3.
        """,
    ))

    apparel.append(MagicItem(
        name="Energy Resistant",
        level=4,
        materials=["as armor"],
        tags=['Shielding'],
        armor_type='body',
        effect="""
            You have \\glossterm<damage reduction> against \\glossterm<energy damage> equal to the item's \\glossterm<power>.
            Whenever you resist energy with this ability, the armor sheds light as a torch until the end of the next round.
            The color of the light depends on the energy damage resisted: blue for cold, yellow for electricity, red for fire, and brown for sonic.
        """,
    ))

    apparel.append(MagicItem(
        name="Energy Resistant, Greater",
        level=14,
        materials=["as armor"],
        tags=['Shielding'],
        armor_type='body',
        effect="""
            This ability functions like the \\mitem<energy resistant> ability, except that the damage reduction is equal to twice the item's \\glossterm<power>.
        """,
    ))

    apparel.append(MagicItem(
        name="Feather",
        level=4,
        materials=["as armor"],
        tags=['Enhancement'],
        armor_type='any',
        effect="""
            This armor's \\glossterm<encumbrance penalty> is reduced by 2.
        """,
    ))

    apparel.append(MagicItem(
        name="Feather, Greater",
        level=10,
        materials=["as armor"],
        tags=['Enhancement'],
        armor_type='any',
        effect="""
            This armor's \\glossterm<encumbrance penalty> is reduced by 4.
        """,
    ))

    apparel.append(MagicItem(
        name="Fortification",
        level=7,
        materials=["as armor"],
        tags=['Imbuement'],
        armor_type='body',
        effect="""
            You gain a +5 bonus to defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
        """,
    ))

    apparel.append(MagicItem(
        name="Fortification, Greater",
        level=15,
        materials=["as armor"],
        tags=['Imbuement'],
        armor_type='body',
        effect="""
            This ability functions like the \\mitem<fortification> ability, except that the bonus increases to +10.
        """,
    ))

    apparel.append(MagicItem(
        name="Fortification, Mystic",
        level=12,
        materials=["as armor"],
        tags=['Imbuement'],
        armor_type='body',
        effect="""
            This ability functions like the \\mitem<fortification> ability, except that it applies against all attacks instead of only against \\glossterm<strikes>.
        """,
    ))

    return apparel

def sanity_check(apparel):
    pass

@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    apparel = generate_apparel()
    if check:
        sanity_check(apparel)
    texts = []
    for item in apparel:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e
    text = latexify('\n'.join(texts))
    if output is None:
        print(text)
    else:
        with open(output, 'w') as of:
            of.write(text)


if __name__ == "__main__":
    main()
