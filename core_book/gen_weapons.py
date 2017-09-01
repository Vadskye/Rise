#!/usr/bin/env python3

import click
from generation.magic_item import MagicItem
from generation.util import latexify

def generate_weapons():
    weapons = []

    weapons.append(MagicItem(
        name="Flaming",
        level=8,
        material_type='weapon',
        tags=['Fire'],
        description="""
            This weapon is on fire.
            It sheds light as a torch, and all damage dealt with it is fire damage in addition to its other types.
            You gain a +1d bonus to \\glossterm<strike damage> with this weapon.
        """,
    ))

    weapons.append(MagicItem(
        name="Shocking",
        level=6,
        material_type='weapon',
        tags=['Electricity'],
        description="""
            This weapon continuously crackles with electricity.
            The constant sparks shed light as a torch, and all damage dealt with it is electricity damage in addition to its other types.
            When you make a successful \\glossterm<strike> with this weapon, you can activate it as an \\glossterm<immediate action>.
            If you do, the target takes a -5 penalty to concentration checks until the end of the round (see \\pcref<Concentration>).
        """,
    ))

    weapons.append(MagicItem(
        name="Freezing",
        level=10,
        material_type='weapon',
        tags=['Cold'],
        description="""
            This weapon is bitterly cold, and all damage dealt with it is cold damage in addition to its other types.
            When you make a successful \\glossterm<strike> with this weapon, you can activate it as an \\glossterm<immediate action>.
            If you do, and your attack result beats the target's Fortitude defense, it is \\fatigued as a \\glossterm<condition>.
        """,
    ))

    weapons.append(MagicItem(
        name="Thundering",
        level=12,
        material_type='weapon',
        tags=['Sonic'],
        description="""
            This weapon constantly emits a low-pitched rumbling noise and vibrates slightly in your hand.
            All damage dealt with it is sonic damage in addition to its other types.
            When you make a successful \\glossterm<strike> with this weapon, you can activate it as an \\glossterm<immediate action>.
            If you do, and your attack result beats the target's Fortitude defense, it is \\deafened as a \\glossterm<condition>.
        """,
    ))

    weapons.append(MagicItem(
        name="Defending",
        level=9,
        material_type='weapon',
        tags=['Shielding'],
        description="""
            You gain a +1 bonus to Armor defense.
        """,
    ))

    weapons.append(MagicItem(
        name="Disorienting",
        level=14,
        material_type='weapon',
        tags=['Compulsion', 'Mind'],
        description="""
            When you make a successful \\glossterm<strike> with this weapon, you can activate it as an \\glossterm<immediate action>.
            If you do, and your attack result beats the target's Mental defense, it is \\disoriented as a \\glossterm<condition>.
        """,
    ))

    weapons.append(MagicItem(
        name="Longshot",
        level=4,
        material_type='weapon',
        tags=['Enhancement'],
        description="""
            Ranged attacks with this weapon have twice the normal \\glossterm<range increment>.
        """,
    ))

    weapons.append(MagicItem(
        name="Forceful",
        level=6,
        material_type='weapon',
        tags=['Telekinesis'],
        description="""
            When you make a successful \\glossterm<strike> with this weapon, you can activate it as an \\glossterm<immediate action>.
            If you do, you also use your attack result as a \\glossterm<shove> attack against the target.
            You do not need to move with your foe to move it the full distance of the shove.
        """,
    ))

    weapons.append(MagicItem(
        name="Fixating",
        level=8,
        material_type='weapon',
        tags=['Enhancement'],
        description="""
            When you make a successful \\glossterm<strike> with this weapon, you can activate it as an \\glossterm<immediate action>.
            If you do, you gain a +1 bonus to accuracy against the target until you use this ability on a different target.
            This bonus can stack with itself, up to a maximum of +5.
        """,
    ))

    weapons.append(MagicItem(
        name="Merciful",
        level=3,
        material_type='weapon',
        tags=['Imbuement'],
        description="""
            This weapon deals \\glossterm<nonlethal damage> instead of lethal damage.
        """,
    ))

    weapons.append(MagicItem(
        name="Morphing",
        level=2,
        material_type='weapon',
        tags=['Shaping'],
        description="""
             As a standard action, you can activate this item.
             If you do, it changes shape into a new weapon of your choice from the same weapon group.
        """,
    ))

    weapons.append(MagicItem(
        name="Morphing, Greater",
        level=6,
        material_type='weapon',
        tags=['Shaping'],
        description="""
             As a standard action, you can activate this item.
             If you do, it changes shape into a new weapon of your choice.
             This can only change into existing manufactured weapons, not improvised weapons (see \\pcref<Weapons>).
        """,
    ))

    weapons.append(MagicItem(
        name="Returning",
        level=2,
        material_type='weapon',
        tags=['Teleportation'],
        description="""
            After being thrown, a rebounding weapon teleports back into your hand at the end of the round.
            Catching a rebounding weapon when it comes back is a free action.
            If you can't catch it, the weapon drops to the ground in the square from which it was thrown.
        """,
    ))

    weapons.append(MagicItem(
        name="Seeking",
        level=7,
        material_type='weapon',
        tags=['Knowledge'],
        description="""
            This weapon automatically veers towards its intended target.
            \\glossterm<Strikes> with this weapon that would suffer a 50\\% miss chance instead suffer a 20\\% miss chance.
            In addition, attacks that would otherwise suffer a 20\\% miss chance instead suffer no miss chance.
        """,
    ))

    weapons.append(MagicItem(
        name="Soulreaving",
        level=13,
        tags=[],
        material_type='weapon',
        description="""
            This weapon is transluscent and has no physical presence for anyone except you.
            It has no effect on objects or constructs, and creatures do not feel any pain or even notice attacks from it.
            Attacks with this weapon ignore all damage reduction and hardness, but the damage is delayed instead of being dealt immediately.
            Damage that would be dealt by the weapon can be delayed indefinitely.
            While the damage is delayed, it cannot be removed by any means short of the destruction of this weapon or the creature's death.

            As a \\glossterm<minor action>, you can cut yourself with this weapon to activate it.
            This deals no damage to you.
            If you do, all delayed damage dealt by this weapon is converted into real damage.
            Any such damage dealt in excess of a creature's hit points is dealt immediately as \\glossterm<vital damage>.
        """,
    ))

    weapons.append(MagicItem(
        name="Surestrike",
        level=4,
        material_type='weapon',
        tags=['Knowledge'],
        description="""
            When you miss a \\glossterm<strike> with this weapon, you can activate it as an \\glossterm<immediate action>.
            If you do, you can reroll the attack roll.
            You must take the second result.
        """,
    ))

    weapons.append(MagicItem(
        name="Heartseeker",
        level=17,
        material_type='weapon',
        tags=['Knowledge'],
        description="""
            Whenever you make a \\glossterm<strike> with this weapon, you can roll twice and take the higher result.
        """,
    ))

    weapons.append(MagicItem(
        name="Thieving",
        level=7,
        material_type='weapon',
        tags=['Shaping'],
        description="""
            When you make a successful \\glossterm<strike> with this weapon against an unattended object, you can activate it as an \\glossterm<immediate action>.
            Alternately, when you make a successful \\glossterm<disarm> attack with this weapon, you can activate it as an \\glossterm<immediate action>.
            If you do, and the struck object is at least one size category smaller than the weapon, it is absorbed into the weapon, leaving no trace.

            This weapon can hold no more than three objects at once.
            If you attempt to absorb an object while the weapon is full, the attempt fails.

            As a standard action, you can retrieve the last item absorbed by the weapon.
            The item appears in your hand, or falls to the ground if your hand is occupied.
        """,
    ))

    weapons.append(MagicItem(
        name="Vampiric",
        level=6,
        material_type='weapon',
        tags=['Life'],
        description="""
            When you deal damage to a living creature with a \\glossterm<strike> with this weapon, you heal hit points equal to your level.
        """,
    ))

    weapons.append(MagicItem(
        name="Vampiric, Greater",
        level=14,
        material_type='weapon',
        tags=['Life'],
        description="""
            When you deal damage to a living creature with a \\glossterm<strike> with this weapon, you heal hit points equal to twice your level.
        """,
    ))

    weapons.append(MagicItem(
        name="Vorpal",
        level=12,
        material_type='weapon',
        tags=['Enhancement'],
        description="""
            Critical hits on \\glossterm<strikes> with this weapon deal maximum damage.
        """,
    ))

    weapons.append(MagicItem(
        name="Phasing",
        level=9,
        material_type='weapon',
        tags=['Planar'],
        description="""
            \\glossterm<Strikes> with this weapon can pass through a single solid obstacle of up to five feet thick on the way to their target.
            This can allow you to ignore \\glossterm<cover>, or even attack through solid walls.
            It does not allow you to ignore armor, shields, or or similar items used by the target of your attacks.
        """,
    ))

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

@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    text = generate_weapon_latex()
    if output is None:
        print(text)
    else:
        with open(output, 'w') as of:
            of.write(text)


if __name__ == "__main__":
    main()
