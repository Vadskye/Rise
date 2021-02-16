#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify, longtablify

def generate_weapons():
    weapons = []

    weapons += [
        MagicItem(
            name="Concussive",
            level=5,
            material_type='Weapon',
            # tags=[tag],
            description="""
                This weapon vibrates slightly in the hand.
                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with concussive force.
                Damage dealt by that strike is sonic damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
            """,
            short_description="Can deal sonic damage",
        ),
        MagicItem(
            name="Concussive, Greater",
            level=11,
            material_type='Weapon',
            # tags=[tag],
            description="""
                This weapon continuously emits a low-pitched rumbling noise and vibrates in the hand.
                All damage dealt with it is sonic damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with concussive force.
                If a creature loses \\glossterm<hit points> from that strike, it is \\glossterm<sickened> as a \\glossterm<condition>.
            """,
            short_description="Deals sonic damage, can sicken",
        ),
        MagicItem(
            name="Concussive, Greater",
            level=17,
            material_type='Weapon',
            # tags=[tag],
            description="""
                This weapon continuously emits a deep rumbling noise and vibrates in the hand.
                All damage dealt with it is sonic damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with concussive force.
                If a creature loses \\glossterm<hit points> from that strike, it is \\glossterm<nauseated> as a \\glossterm<condition>.
            """,
            short_description="Deals sonic damage, can nauseate",
        ),
    ]

    weapons += [
        MagicItem(
            name="Flaming",
            level=5,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon smolders visibly and sheds light as a torch.
                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with fiery energy.
                Damage dealt by that strike is fire damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
            """,
            short_description="Can deal fire damage",
        ),
        MagicItem(
            name="Flaming, Greater",
            level=11,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon is on fire.
                It sheds light as a torch, and all damage dealt with it is fire damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with fiery energy.
                You gain a +1d bonus to damage with the strike.
            """,
            short_description="Deals fire damage",
        ),
        MagicItem(
            name="Flaming, Supreme",
            level=17,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon is on fire.
                It sheds light as a torch, and all damage dealt with it is fire damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with fiery energy.
                You gain a +2d bonus to damage with the strike.
            """,
            short_description="Deals major fire damage",
        ),
    ]

    weapons += [
        MagicItem(
            name="Shocking",
            level=5,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon subtly crackles with electricity.
                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with electrical energy.
                Damage dealt by that strike is electricity damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
            """,
            short_description="Can deal electicity damage",
        ),
        MagicItem(
            name="Shocking, Greater",
            level=11,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon continuously crackles with electricity.
                All damage dealt with it is electricity damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with electrical energy.
                If a creature loses \\glossterm<hit points> from that strike, it is \\glossterm<dazed> as a \\glossterm<condition>.
            """,
            short_description="Deals electricity damage, can daze",
        ),
        MagicItem(
            name="Shocking, Supreme",
            level=17,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon continuously crackles with powerful electricity.
                All damage dealt with it is electricity damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with electrical energy.
                If a creature loses \\glossterm<hit points> from that strike, it is \\glossterm<stunned> as a \\glossterm<condition>.
            """,
            short_description="Deals electicity damage, can stun",
        ),
    ]

    weapons += [
        MagicItem(
            name="Freezing",
            level=5,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon is frigid to the touch.
                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with cold energy.
                Damage dealt by that strike is cold damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
            """,
            short_description="Can deal cold damage",
        ),
        MagicItem(
            name="Freezing, Greater",
            level=11,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon is bitterly cold to the touch.
                All damage dealt with it is cold damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with cold energy.
                If a creature loses \\glossterm<hit points> from that strike, it is \\glossterm<slowed> as a \\glossterm<condition>.
            """,
            short_description="Deals cold damage, can chill",
        ),
        MagicItem(
            name="Freezing, Supreme",
            level=17,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon radiates an aura of bitter cold.
                All damage dealt with it is cold damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> with this weapon that is imbued with cold energy.
                You gain a +1d bonus to damage with the strike.
                If a creature loses \\glossterm<hit points> from that strike, it is \\glossterm<slowed> as a \\glossterm<condition>.
            """,
            short_description="Deals cold damage, can powerfully chill",
        ),
    ]

    weapons += [
        MagicItem(
            name="Potency",
            level=4,
            material_type='Weapon',
            description="""
                You gain a +2 \\glossterm<magic bonus> to your \\glossterm<mundane> \\glossterm<power>.
            """,
            short_description="Grants +2 \\glossterm<mundane> power",
        ),
        MagicItem(
            name="Potency, Greater",
            level=10,
            material_type='Weapon',
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<mundane> \\glossterm<power>.
            """,
            short_description="Grants +4 \\glossterm<mundane> power",
        ),
        MagicItem(
            name="Potency, Supreme",
            level=16,
            material_type='Weapon',
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<mundane> \\glossterm<power>.
            """,
            short_description="Grants +8 \\glossterm<mundane> power",
        ),
    ]

    weapons += [
        MagicItem(
            name="Protective",
            # +2 level since weapon is secondary for this effect
            level=9,
            material_type='Weapon',
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +1 Armor defense",
        ),
        MagicItem(
            name="Protective, Greater",
            level=15,
            material_type='Weapon',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +2 Armor defense",
        ),
    ]

    weapons += [
        MagicItem(
            name="Iridescent",
            level=4,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon shimmers with a chaotic pattern of colors.
                As a standard action, you can make a flashy \\glossterm<strike> with this weapon that accentuates its bewildering effect.
                You take a -2d penalty to damage with the strike.
                If a creature loses a \\glossterm<hit point> from this strike, it is \\glossterm<dazzled> as a \\glossterm<condition>.
            """,
            short_description="Can dazzle struck foes",
        ),
        MagicItem(
            name="Iridescent, Greater",
            level=19,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon shimmers with a blindingly chaotic pattern of colors.
                As a standard action, you can make a flashy \\glossterm<strike> with this weapon that accentuates its bewildering effect.
                You take a -2d penalty to damage with the strike.
                If a creature loses a \\glossterm<hit point> from this strike, it is \\glossterm<blinded> as a \\glossterm<condition>.
            """,
            short_description="Disorients struck foes",
        ),
    ]

    weapons += [
        MagicItem(
            name="Longshot",
            level=2,
            material_type='Weapon',
            description="""
                When you make a ranged attack with this weapon, you reduce your penalties for \\glossterm<range increments> by 1.
            """,
            short_description="Ignores one range increment",
        ),
        MagicItem(
            name="Longshot, Greater",
            level=8,
            material_type='Weapon',
            description="""
                When you make a ranged attack with this weapon, you reduce your penalties for \\glossterm<range increments> by 2.
            """,
            short_description="Ignores two range increments",
        ),
        MagicItem(
            name="Longshot, Supreme",
            level=14,
            material_type='Weapon',
            description="""
                When you make a ranged attack with this weapon, you reduce your penalties for \\glossterm<range increments> by 3.
            """,
            short_description="Ignores three range increments",
        ),
    ]

    weapons.append(MagicItem(
        name="Boomerang",
        level=9,
        material_type='Weapon',
        description="""
            You can throw this weapon as if it was designed to be thrown.
            In addition, as a standard action, you can throw this weapon in a spinning arc.
            When you do, make a thrown \\glossterm<strike> against up to three targets within two \\glossterm<range increments>.
            After attacking the last target, the weapon flies back to your hand.
        """,
        short_description="Can be thrown to strike multiple foes",
    ))

    weapons += [
        MagicItem(
            name="Hefty",
            level=7,
            material_type='Weapon',
            description="""
                This weapon feels heavy in the hand.
                It gains the \\glossterm<Forceful> weapon tag (see \\pcref<Weapon Tags>).
                If it already has that weapon tag, the distance that you can \\glossterm<knockback> the target increases to 20 feet.
            """,
            short_description="Can knockback struck foes",
        ),
    ]

    weapons.append(MagicItem(
        name="Fixating",
        level=12,
        material_type='Weapon',
        description="""
            When you make a \\glossterm<strike> with this weapon, you gain a +1 bonus to accuracy against one target of the strike with all future attacks.
            If the strike had multiple targets, you choose which target you gain the bonus against.
            This bonus lasts until you make a strike with this weapon against a different target.
            This bonus can stack with itself, up to a maximum of +4.
            The bonus cannot increase more than once per \\glossterm<phase>.
        """,
        short_description="Grants accuracy bonus against attacked foe",
    ))

    weapons.append(MagicItem(
        name="Merciful",
        level=3,
        material_type='Weapon',
        description="""
            This weapon deals \\glossterm<subdual damage>.
            As a \\glossterm<minor action>, you can toggle this effect on or off, allowing you to deal non-subdual damage with this weapon if you desire.
        """,
        short_description="Deals subdual damage",
    ))

    weapons += [
        MagicItem(
            name="Morphing",
            level=2,
            material_type='Weapon',
            tags=[],
            description="""
                 As a standard action, you can activate this weapon.
                 If you do, it changes shape into a new weapon of your choice from the same weapon group.
                 If you stop attuning to this weapon, it returns to its original form.
            """,
            short_description="Can change into similar weapon",
        ),
        MagicItem(
            name="Morphing, Greater",
            level=8,
            material_type='Weapon',
            tags=[],
            description="""
                 As a standard action, you can activate this weapon.
                 If you do, it changes shape into a new weapon of your choice that you are proficient with.
                 This can only change into existing manufactured weapons, not improvised weapons (see \\pcref<Weapons>).
                 If you stop attuning to this weapon, it returns to its original form.
            """,
            short_description="Can change into any weapon",
        ),
    ]

    weapons += [
        MagicItem(
            name="Returning",
            level=3,
            material_type='Weapon',
            tags=[],
            description="""
                After being thrown, this weapon teleports back into your hand at the end of the current phase.
                Catching a returning weapon when it comes back is a free action.
                If you can't catch it, the weapon drops to the ground in the square from which it was thrown.
            """,
            short_description="Teleports back to you after being thrown",
        ),
    ]

    weapons.append(MagicItem(
        name="Seeking",
        level=7,
        material_type='Weapon',
        tags=[],
        description="""
            This weapon automatically veers towards its intended target.
            \\glossterm<Strikes> with this weapon ignore \\glossterm<concealment>.
            In addition, any miss chance the strike would normally have is reduced.
            A 50\\% miss chance is reduced to a 20\\% miss chance, and a 20\\% miss chance is removed entirely.
        """,
        short_description="Reduces miss chances",
    ))

    weapons += [
        MagicItem(
            name="Soulreaving",
            level=9,
            tags=[],
            material_type='Weapon',
            description="""
                This weapon is transluscent and has no physical presence for anyone except you.
                It has no effect on objects or constructs, and creatures do not feel any pain or even notice attacks from it.
                Attacks with this weapon ignore all \\glossterm<resistances>, but the damage is delayed instead of being dealt immediately.
                Damage that would be dealt by the weapon can be delayed indefinitely.
                While the damage is delayed, it cannot be removed by any means short of the destruction of this weapon or the creature's death.

                As a \\glossterm<standard action>, you can cut yourself with this weapon to activate it.
                This deals no damage to you.
                When you do, each creature hit with the weapon loses \\glossterm<hit points> equal to the total delayed damage built up by the weapon for that target.
                Creatures farther than one mile away from the weapon are unaffected by this damage.
                This ability expends all delayed damage built up by the weapon for all targets, including targets farther than one mile from the weapon.
            """,
            short_description="Deals delayed damage",
        ),
        MagicItem(
            name="Soulreaving, Greater",
            level=15,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon functions like the \\mitem<soulreaving> weapon, except that you can activate the weapon as a \\glossterm<minor action> instead of as a \\glossterm<standard action>.
            """,
            short_description="Deals delayed damage that can be quickly converted",
        ),
    ]

    weapons += [
        MagicItem(
            name="Surestrike",
            level=4,
            material_type='Weapon',
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to accuracy.
            """,
            short_description="Grants +1 accuracy bonus",
        ),
        MagicItem(
            name="Surestrike, Greater",
            level=10,
            material_type='Weapon',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to accuracy.
            """,
            short_description="Grants +2 accuracy bonus",
        ),
        MagicItem(
            name="Surestrike, Supreme",
            level=16,
            material_type='Weapon',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to accuracy.
            """,
            short_description="Grants +3 accuracy bonus",
        ),
    ]

    weapons += [
        MagicItem(
            name="Blessed",
            level=3,
            material_type='Weapon',
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> to affect a strike with this weapon, you gain a +3 bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +3 bonus with \\textit<desperate exertion>",
        ),
        MagicItem(
            name="Blessed, Greater",
            level=9,
            material_type='Weapon',
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> to affect a strike with this weapon, you gain a +5 bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +5 bonus with \\textit<desperate exertion>",
        ),
        MagicItem(
            name="Blessed, Supreme",
            level=15,
            material_type='Weapon',
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> to affect a strike with this weapon, you gain a +7 bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +7 bonus with \\textit<desperate exertion>",
        ),
    ]

    weapons += [
        MagicItem(
            name="Wolfpack",
            level=6,
            material_type='Weapon',
            tags=[],
            description="""
                At the start of each phase, each \\glossterm<surrounded> creature that you \\glossterm<threaten> with this weapon takes a -1 penalty to Armor and Reflex defenses during that phase.
            """,
            short_description="Imposes -1 defense penalty on surrounded creatures",
        ),
        MagicItem(
            name="Wolfpack, Greater",
            level=15,
            material_type='Weapon',
            tags=[],
            description="""
                At the start of each phase, each \\glossterm<surrounded> creature that you \\glossterm<threaten> with this weapon takes a -2 penalty to Armor and Reflex defenses during that phase.
            """,
            short_description="Imposes -2 defense penalty on surrounded creatures",
        ),
    ]

    weapons.append(MagicItem(
        name="Heartseeker",
        level=20,
        material_type='Weapon',
        tags=[],
        description="""
            The first time you you make a \\glossterm<strike> with this weapon each round, you can roll twice and take the higher result.
        """,
        short_description="Rolls attacks twice",
    ))

    weapons += [
        MagicItem(
            name="Thieving",
            level=7,
            material_type='Weapon',
            tags=[],
            description="""
                As a \\glossterm<standard action>, you can activate this weapon.
                If you do, make a \\glossterm<strike> or a \\glossterm<disarm> attack.
                If your disarm succeeds, or if your strike hit an unattended object, this weapon can absorb the struck object.
                The object must be at least one size category smaller than the weapon.

                An absorbed object leaves no trace that it ever existed
                This weapon can hold no more than three objects at once.
                If you attempt to absorb an object while the weapon is full, the attempt fails.
                As a standard action, you can retrieve the last item absorbed by the weapon.
                The item appears in your hand, or falls to the ground if your hand is occupied.
            """,
            short_description="Can absorb small items",
        ),
        MagicItem(
            name="Thieving, Greater",
            level=13,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon functions like a \\mitem<thieving> weapon, except that the maximum size category of object it can absorb is one size category larger than the weapon.
            """,
            short_description="Can absorb large items",
        ),
    ]

    weapons.append(MagicItem(
        name="Vorpal",
        level=20,
        material_type='Weapon',
        description="""
            Critical hits on \\glossterm<strikes> with this weapon deal maximum damage.
        """,
        short_description="Inflicts lethal critical hits",
    ))

    weapons += [
        MagicItem(
            name="Phasing",
            level=8,
            material_type='Weapon',
            tags=[],
            description="""
                \\glossterm<Strikes> with this weapon, including projectiles fired by this weapon, can pass through a single solid obstacle of up to one feet thick on the way to their target.
                This can allow you to ignore \\glossterm<cover>, or even attack through solid walls.
                It does not allow you to ignore armor, shields, or or similar items used by the target of your attacks.
            """,
            short_description="Can ignore obstacles when attacking",
        ),
        MagicItem(
            name="Phasing, Greater",
            level=14,
            material_type='Weapon',
            tags=[],
            description="""
                This weapon functions like a \\mitem<phasing> weapon, except that the strike can penetrate through any number of solid objects with a combined thickness of ten feet or less.
            """,
            short_description="Can ignore many obstacles when attacking",
        ),
    ]

    return weapons

def sanity_check(weapons):
    pass

def generate_weapon_latex(check=False):
    weapons = sorted(generate_weapons(), key=lambda weapons: weapons.name)
    if check:
        sanity_check(weapons)

    texts = []
    for item in weapons:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e

    text = '\n'.join(texts)
    return latexify(text)

def generate_weapon_table():
    weapons = sorted(
        sorted(generate_weapons(), key=lambda item: item.name),
        key=lambda item: item.level
    )
    rows = [item.latex_table_row() for item in weapons]
    row_text = '\n'.join(rows)
    return longtablify(f"""
        \\lcaption<Weapon Items> \\\\
        \\tb<Name> & \\tb<Level> & \\tb<Typical Price> & \\tb<Description> & \\tb<Page> \\tableheaderrule
        {row_text}
    """)


def write_to_file():
    weapon_latex = generate_weapon_latex()
    weapon_table = generate_weapon_table()
    with open(book_path('weapons.tex'), 'w') as weapon_description_file:
        weapon_description_file.write(weapon_latex)
    with open(book_path('weapons_table.tex'), 'w') as weapon_table_file:
        weapon_table_file.write(weapon_table)


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_weapon_latex())


if __name__ == "__main__":
    main()
