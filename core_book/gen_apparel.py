#!/usr/bin/env python3

import click
from generation.magic_item import MagicItem
from generation.util import latexify

def generate_armor():
    apparel = []

    apparel.append(MagicItem(
        name='Shield of Arrow Catching',
        level=5,
        material_type='shield',
        tags=['Telekinesis'],
        description="""
            Whenever a creature within a \\areamed radius emanation from you would be attacked by a ranged weapon, the attack is redirected to target you instead.
            Resolve the attack as if it had initially targeted you, except that the attack is not affected by cover or concealment.
            This item can only affect projectiles and thrown objects that are Small or smaller.
        """,
    ))

    apparel.append(MagicItem(
        name='Shield of Arrow Catching, Greater',
        level=10,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            This item functions like the \\mitem<shield of arrow catching> item, except that it affects a \\arealarge radius from you.
            In addition, you may choose to exclude creature from this item's effect, allowing projectiles to target nearby foes normally.
        """,
    ))

    apparel.append(MagicItem(
        name='Shield of Boulder Catching',
        level=8,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            This item functions like the \\mitem<shield of arrow catching> item, except that it can affect projectile and thrown objects of up to Large size.
        """,
    ))

    apparel.append(MagicItem(
        name="Shield of Arrow Deflection",
        level=2,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            As an \\glossterm<immediate action> when you are attacked by a ranged \\glossterm<strike>, you can use this item.
            If you do, you gain a +5 bonus to Armor defense against the attack.
            You must be aware of the attack to deflect it in this way.
            This item can only affect projectiles and thrown objects that are Small or smaller.
        """,
    ))

    apparel.append(MagicItem(
        name="Shield of Arrow Deflection, Greater",
        level=12,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            This item functions like the \\mitem<shield of arrow deflection> item, except that the defense bonus increases to +10.
        """,
    ))

    apparel.append(MagicItem(
        name="Shield of Boulder Deflection",
        level=6,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            This item functions like the \\mitem<shield of arrow deflection> item, except that it can affect projectiles and thrown objects of up to Large size.
        """,
    ))

    apparel.append(MagicItem(
        name="Shield of Bashing",
        level=2,
        tags=['Enhancement'],
        material_type='shield',
        description="""
            % Should this be strike damage?
            You gain a +2d bonus to damage with physical attacks using this shield.
        """,
    ))

    apparel.append(MagicItem(
        name="Shield of Bashing, Greater",
        level=11,
        tags=['Enhancement'],
        material_type='shield',
        description="""
            This item functions like the \\mitem<shield of bashing> item, except that the damage bonus increases to +3d.
        """,
    ))

    apparel.append(MagicItem(
        name="Armor of Energy Resistance",
        level=4,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            You have \\glossterm<damage reduction> against \\glossterm<energy damage> equal to the item's \\glossterm<power>.
            Whenever you resist energy with this item, it sheds light as a torch until the end of the next round.
            The color of the light depends on the energy damage resisted: blue for cold, yellow for electricity, red for fire, and brown for sonic.
        """,
    ))

    apparel.append(MagicItem(
        name="Armor of Energy Resistance, Greater",
        level=12,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            This item functions like the \\mitem<armor of energy resistance> item, except that the damage reduction is equal to twice the item's \\glossterm<power>.
        """,
    ))

    apparel.append(MagicItem(
        name="Featherlight Armor",
        level=4,
        tags=['Enhancement'],
        material_type='body armor',
        description="""
            This armor's \\glossterm<encumbrance penalty> is reduced by 2.
        """,
    ))

    apparel.append(MagicItem(
        name="Featherlight Armor, Greater",
        level=10,
        tags=['Enhancement'],
        material_type='body armor',
        description="""
            This armor's \\glossterm<encumbrance penalty> is reduced by 4.
        """,
    ))

    apparel.append(MagicItem(
        name="Armor of Fortification",
        level=7,
        tags=['Imbuement'],
        material_type='body armor',
        description="""
            You gain a +5 bonus to defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
        """,
    ))

    apparel.append(MagicItem(
        name="Armor of Fortification, Greater",
        level=15,
        tags=['Imbuement'],
        material_type='body armor',
        description="""
            This item functions like the \\mitem<armor of fortification> item, except that the bonus increases to +10.
        """,
    ))

    apparel.append(MagicItem(
        name="Armor of Fortification, Mystic",
        level=12,
        tags=['Imbuement'],
        material_type='body armor',
        description="""
            This item functions like the \\mitem<armor of fortification> item, except that it applies against all attacks instead of only against; \\glossterm<strikes>.
        """,
    ))

    apparel.append(MagicItem(
        name="Hidden Armor",
        level=4,
        tags=['Glamer'],
        material_type='body armor',
        description="""
             As a standard action, you can use this item.
             If you do, it appears to change shape and form to assume the shape of a normal set of clothing.
             You may choose the design of the clothing.
             The item retains all of its properties, including weight and sound, while disguised in this way.
             Only its visual appearance is altered.

             Alternately, you may return the armor to its original appearance.
        """,
    ))

    apparel.append(MagicItem(
        name="Armor of Invulnerability",
        level=8,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            You have \\glossterm<damage reduction> against \\glossterm<physical> damage equal to this item's \\glossterm<power>.
        """,
    ))

    apparel.append(MagicItem(
        name="Armor of Invulnerability, Greater",
        level=16,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            This item functions like the \\mitem<armor of invulnerability> item, except that the damage reduction is equal to twice the item's \\glossterm<power>.
            You have \\glossterm<damage reduction> against \\glossterm<physical> damage equal to the item's \\glossterm<power>.
        """,
    ))

    apparel.append(MagicItem(
        name="Armor of Magic Resistance",
        level=14,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            You have \\glossterm<magic resistance> equal to 5 + the item's \\glossterm<power>.
        """,
    ))

    apparel.append(MagicItem(
        name="Shield of Mystic Reflection",
        level=12,
        tags=['Thaumaturgy'],
        material_type='shield',
        description="""
            As an \\glossterm<immediate action> when you are targeted by a \\glossterm<targeted> \\glossterm<magical> ability, you can spend an \\glossterm<action point> to use this ability.
            If you do, the ability targets the creature using the ability instead of you.
            Any other targets of the ability are affected normally.
        """,
    ))

    return apparel

def generate_worn():
    apparel = []

    apparel.append(MagicItem(
        name="Bracers of Archery",
        level=1,
        material_type='bracer',
        tags=['Enhancement'],
        description="""
            You are proficient with bows.
        """,
    ))

    apparel.append(MagicItem(
        name="Bracers of Armor",
        level=2,
        material_type='bracer',
        tags=['Shielding'],
        description="""
            You gain a +2 bonus to Armor defense.
            The protection from these bracers is treated as body armor, and it does not stack with any other body armor you wear.
        """,
    ))

    apparel.append(MagicItem(
        name="Bracers of Repulsion",
        level=4,
        material_type='bracer',
        tags=['Telekinesis'],
        description="""
            Whenever a creature hits you with a melee \\glossterm<strike>, you gain a +5 bonus to \\glossterm<shove> attacks against that creature until the end of the next round.
        """,
    ))

    apparel.append(MagicItem(
        name="Torchlight Gloves",
        level=2,
        material_type='glove',
        tags=['Figment', 'Light'],
        description="""
            These gloves shed light as a torch.
            As a \\glossterm<standard action>, you may choose to suppress or resume the light from either or both gloves.
        """,
    ))

    apparel.append(MagicItem(
        name="Gauntlets of Improvisation",
        level=2,
        material_type='gauntlet',
        tags=['Enhancement'],
        description="""
            You gain a +1d bonus to damage with \\glossterm<improvised weapons>.
        """,
    ))

    apparel.append(MagicItem(
        name="Gauntlets of Improvisation, Greater",
        level=7,
        material_type='gauntlet',
        tags=['Enhancement'],
        description="""
            This item functions like the \\mitem<gauntlets of improvisation>, except that the damage bonus is increased to +2d.
        """,
    ))

    apparel.append(MagicItem(
        name="Gauntlet of the Ram",
        level=2,
        material_type='gauntlet',
        tags=['Telekinesis'],
        description="""
            If you hit on an \\glossterm<unarmed> \\glossterm<strike> with this gauntlet, you can attempt to \\glossterm<shove> your foe during the \\glossterm<delayed action phase>.
        """,
    ))

    apparel.append(MagicItem(
        name="Gauntlet of the Ram, Greater",
        level=6,
        material_type='gauntlet',
        tags=['Telekinesis'],
        description="""
            This item functions like the \\mitem<gauntlet of the ram>, except that you gain a bonus to the \\glossterm<shove> attack equal to the damage you dealt with the \\glossterm<strike>.
        """,
    ))

    apparel.append(MagicItem(
        name="Greatreach Bracers",
        level=9,
        material_type='bracer',
        tags=['Imbuement'],
        description="""
            Your \\glossterm<reach> is increased by 5 feet.
        """,
    ))

    apparel.append(MagicItem(
        name="Throwing Gloves",
        level=4,
        material_type='glove',
        tags=['Enhancement'],
        description="""
            % TODO: reference basic "not designed to be thrown" mechanics?
            You can throw any item as if it was designed to be thrown.
            This does not improve your ability to throw items designed to be thrown, such as darts.
        """,
    ))

    apparel.append(MagicItem(
        name="Mask of Water Breathing",
        level=4,
        material_type='mask',
        tags=['Imbuement'],
        description="""
            You can breathe water through this mask as easily as a human breaths air.
            This does not grant you the ability to breathe other liquids.
        """,
    ))

    apparel.append(MagicItem(
        name="Mask of Air",
        level=9,
        material_type='mask',
        tags=['Imbuement'],
        description="""
            If you breathe through this mask, you breathe in clean, fresh air, regardless of your environment.
            This can protect you from inhaled poisons and similar effects.
        """,
    ))

    apparel.append(MagicItem(
        name="Crown of Flame",
        level=5,
        material_type='crown',
        tags=['Fire'],
        description="""
            This crown is continuously on fire.
            The flame sheds light as a torch.

            You and all allies within an \\arealarge radius emanation from you are immune to fire damage.
        """,
    ))

    apparel.append(MagicItem(
        name="Crown of Lightning",
        level=7,
        material_type='crown',
        tags=['Electricity'],
        description="""
            This crown continuously crackles with electricity.
            The constant sparks shed light as a torch.

            At the end of each round, all enemies within an \\areamed radius emanation from you take electricity damage equal to the item's \\glossterm<power>.
        """,
    ))

    apparel.append(MagicItem(
        name="Crown of Frost",
        level=11,
        material_type='crown',
        tags=['Cold'],
        description="""
            At the end of each round, all enemies within an \\areamed radius emanation from you take cold damage equal to the item's \\glossterm<power>.
            % TODO: wording
            Each creature that takes damage in this way is \\fatigued until the end of the next round.
        """,
    ))

    apparel.append(MagicItem(
        name="Crown of Thunder",
        level=9,
        material_type='crown',
        tags=['Sonic'],
        description="""
            The crown constantly emits a low-pitched rumbling.
            To you and your allies, the sound is barely perceptible.
            However, all enemies within an \\arealarge radius emanation from you hear the sound as a deafening, continuous roll of thunder.
            The noise blocks out all other sounds quieter than thunder, causing them to be \\deafened while they remain in the area and until the end of the next round after they leave.
        """,
    ))

    apparel.append(MagicItem(
        name="Boots of Earth's Embrace",
        level=4,
        material_type='boot',
        tags=['Earth', 'Enhancement'],
        description="""
            While you are standing on solid ground, you are immune to effects that would force you to move.
            This does not protect you from other effects of those attacks, such as damage.
        """,
    ))

    apparel.append(MagicItem(
        name="Boots of Freedom",
        level=6,
        material_type='boot',
        tags=['Imbuement'],
        description="""
            You are immune to effects that restrict your mobility.
            This removes all penalties you would suffer for acting underwater, except for those relating to using ranged weapons.
            This does not prevent you from being \\grappled, but you gain a +10 bonus to your defense against \\glossterm<grapple> attacks.
        """,
    ))

    apparel.append(MagicItem(
        name="Boots of Freedom, Greater",
        level=12,
        material_type='boot',
        tags=['Imbuement'],
        description="""
            These boots function like \\mitem<boots of freedom>, except that you are also immune to being \\grappled.
        """,
    ))

    apparel.append(MagicItem(
        name="Boots of Gravitation",
        level=8,
        material_type='boot',
        tags=['Imbuement'],
        description="""
            While these boots are within 5 feet of a solid surface, gravity pulls you towards the solid surface closest to your boots rather than in the normal direction.
            This can allow you to walk easily on walls or even ceilings.
        """,
    ))

    apparel.append(MagicItem(
        name="Boots of Speed",
        level=7,
        material_type='boot',
        tags=['Temporal'],
        description="""
            You gain a +30 foot bonus to your speed in all your movement modes, up to a maximum of double your normal speed.
        """,
    ))

    apparel.append(MagicItem(
        name="Astral Boots",
        level=16,
        material_type='boot',
        tags=['Translocation'],
        description="""
            Whenever you move, you can teleport the same distance instead.
            This does not change the total distance you can move, but you can teleport in any direction, even vertically.
            You cannot teleport to locations you do not have \\glossterm<line of sight> and \\glossterm<line of effect> to.
        """,
    ))

    apparel.append(MagicItem(
        name="Boots of Water Walking",
        level=7,
        material_type='boot',
        tags=['Imbuement'],
        description="""
            You treat the surface of all liquids as if they were firm ground.
            Your feet hover about an inch above the liquid's surface, allowing you to traverse dangerous liquids without harm as long as the surface is calm.

            If you are below the surface of the liquid, you rise towards the surface at a rate of 60 feet per round.
            Thick liquids, such as mud and lava, may cause you to rise more slowly.
        """,
    ))

    apparel.append(MagicItem(
        name="Boots of the Winterlands",
        level=2,
        material_type='boot',
        tags=['Enhancement'],
        description="""
            You can travel across snow and ice without slipping or suffering movement penalties for the terrain.
            % TODO: degree symbol?
            In addition, the boots keep you warn, protecting you in environments as cold as -50 Fahrenheit.
        """,
    ))

    apparel.append(MagicItem(
        name="Seven League Boots",
        level=12,
        material_type='boot',
        tags=['Translocation'],
        description="""
            As a standard action, you can spend an \glossterm{action point} to use this item.
            If you do, you teleport exactly 25 miles in a direction you specify.
            If this would place you within a solid object or otherwise impossible space, the boots will shunt you up to 1,000 feet in any direction to the closest available space.
            If there is no available space within 1,000 feet of your intended destination, the effect fails and you take 1d4 damage +1d per two \\glossterm<power> of the item.
        """,
    ))

    apparel.append(MagicItem(
        name="Winged Boots",
        level=10,
        material_type='boot',
        tags=['Imbuement'],
        description="""
            You gain a \\glossterm<fly speed> equal to your land speed.
            However, the boots are not strong enough to keep you aloft indefinitely.
            At the end of each round, if you are not standing on solid ground, the magic of the boots fails and you fall normally.
            The boots begin working again at the end of the next round, even if you have not yet hit the ground.
        """,
    ))

    apparel.append(MagicItem(
        name="Ring of Energy Resistance",
        level=6,
        material_type='ring',
        tags=['Shielding'],
        description="""
            You have \\glossterm<damage reduction> against \\glossterm<energy damage> equal to the ring's \\glossterm<power>.
            Whenever you resist energy with this ability, the ring sheds light as a torch until the end of the next round.
            The color of the light depends on the energy damage resisted: blue for cold, yellow for electricity, red for fire, and brown for sonic.
        """,
    ))

    apparel.append(MagicItem(
        name="Ring of Energy Resistance, Greater",
        level=14,
        material_type='ring',
        tags=['Shielding'],
        description="""
            This item functions like the \\mitem<ring of energy resistance>, except that the damage reduction is equal to twice the item's \\glossterm<power>.
        """,
    ))

    apparel.append(MagicItem(
        name="Ring of Elemental Endurance",
        level=2,
        material_type='ring',
        tags=['Shielding'],
        description="""
            You can exist comfortably in conditions between -50 and 140 degrees Fahrenheit without any ill effects.
            You suffer the normal penalties in temperatures outside of that range.
        """,
    ))

    apparel.append(MagicItem(
        name="Ring of Nourishment",
        level=2,
        material_type='ring',
        tags=['Creation'],
        description="""
            You continuously gain nourishment, and no longer need to eat or drink.
            This ring must be worn for 24 hours before it begins to work.
        """,
    ))

    apparel.append(MagicItem(
        name="Ring of Sustenance",
        level=7,
        material_type='ring',
        tags=['Creation', 'Temporal'],
        description="""
            You continuously gain nourishment, and no longer need to eat or drink.
            In addition, you need only one-quarter your normal amount of sleep (or similar activity, such as elven trance) each day.

            The ring must be worn for 24 hours before it begins to work.
        """,
    ))

    apparel.append(MagicItem(
        name="Ring of Protection",
        level=8,
        material_type='ring',
        tags=['Shielding'],
        description="""
            You gain a +1 bonus to Armor defense.
        """,
    ))

    apparel.append(MagicItem(
        name="Ring of Regeneration",
        level=11,
        material_type='ring',
        tags=['Life'],
        description="""
            At the end of each round, you heal hit points equal to this item's \\glossterm<power>.
            Only damage taken while wearing the ring can be healed in this way.
        """,
    ))

    apparel.append(MagicItem(
        name="Amulet of Mighty Fists",
        level=6,
        material_type='amulet',
        tags=['Enhancement'],
        description="""
            You gain a +1d bonus to \\glossterm<strike damage> with unarmed attacks and natural weapons.
        """,
    ))

    apparel.append(MagicItem(
        name="Amulet of Mighty Fists, Greater",
        level=14,
        material_type='amulet',
        tags=['Enhancement'],
        description="""
            You gain a +2d bonus to \\glossterm<strike damage> with unarmed attacks and natural weapons.
        """,
    ))

    apparel.append(MagicItem(
        name="Assassin's Cloak",
        level=7,
        material_type='cloak',
        tags=['Glamer'],
        description="""
            At the end of each round, if you took no actions that round, you become \\glossterm<invisible> until the end of the next round.
        """,
    ))

    apparel.append(MagicItem(
        name="Assassin's Cloak, Greater",
        level=17,
        material_type='cloak',
        tags=['Glamer'],
        description="""
            At the end of each round, if you did not attack a creature that round, you become \\glossterm<invisible> until the end of the next round.
        """,
    ))

    apparel.append(MagicItem(
        name="Belt of Healing",
        level=1,
        material_type='belt',
        tags=['Life'],
        description="""
            When you use the \\textit<recover> action, you heal +1d hit points.
        """,
    ))

    apparel.append(MagicItem(
        name="Belt of Healing, Greater",
        level=8,
        material_type='belt',
        tags=['Life'],
        description="""
            When you use the \\textit<recover> action, you heal +2d hit points.
        """,
    ))

    apparel.append(MagicItem(
        name="Belt of Heroic Recovery",
        level=6,
        material_type='belt',
        tags=['Life'],
        description="""
            % TODO: timing?
            As an \\glossterm<immediate action> when you get a \\glossterm<critical hit>, you can take the \\textit<recover> action.
        """,
    ))

    apparel.append(MagicItem(
        name="Cloak of Mist",
        level=8,
        material_type='cloak',
        tags=['Fog', 'Manifestation'],
        description="""
            Fog constantly fills an \\areamed radius emanation from you.
            This fog does not fully block sight, but it provides \\concealment.

            If a 5-foot square of fog takes fire damage equal to half this item's \\glossterm<power>, the fog disappears from that area until the end of the next round.
        """,
    ))

    apparel.append(MagicItem(
        name="Cloak of Mist, Greater",
        level=16,
        material_type='cloak',
        tags=['Fog', 'Manifestation'],
        description="""
            A thick fog constantly fills an \\areamed radius emanation from you.
            This fog completely blocks sight beyond 10 feet.
            Within that range, it still provides \\concealment.

            If a 5-foot square of fog takes fire damage equal to this item's \\glossterm<power>, the fog disappears from that area until the end of the next round.
        """,
    ))

    apparel.append(MagicItem(
        name="Vanishing Cloak",
        level=8,
        material_type='cloak',
        tags=['Glamer', 'Teleportation'],
        description="""
            As a standard action, you can spend an \glossterm{action point} to use this item.
            If you do, you teleport to an unoccupied location within \\rngmed range of your original location.
            In addition, you become \\glossterm<invisible> unitl the end of the next round.

            If your intended destination is invalid, or if your teleportation otherwise fails, you still become invisible.
        """,
    ))

    apparel.append(MagicItem(
        name="Hexward Cloak",
        level=10,
        material_type='cloak',
        tags=['Thaumaturgy'],
        description="""
            You gain a +5 bonus to defenses against \\glossterm<magical> abilities that target you directly.
            This does not protect you from abilities that affect an area.
        """,
    ))

    apparel.append(MagicItem(
        name="Hexproof Cloak",
        level=18,
        material_type='cloak',
        tags=['Thaumaturgy'],
        description="""
            All \\glossterm<magical> abilities that target you directly fail to affect you.
            This does not protect you from abilities that affect an area.
        """,
    ))

    return apparel


def generate_apparel(check=False):
    apparel = sorted(generate_armor() + generate_worn(), key=lambda apparel: apparel.name)
    if check:
        sanity_check(apparel)

    texts = []
    for item in apparel:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e

    text = '\n'.join(texts)
    return latexify(text)

def sanity_check(armor, worn):
    pass

@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    text = generate_apparel()
    if output is None:
        print(text)
    else:
        with open(output, 'w') as of:
            of.write(text)


if __name__ == "__main__":
    main()
