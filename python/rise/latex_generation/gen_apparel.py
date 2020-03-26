#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify, longtablify

def generate_armor():
    apparel = []

    apparel.append(MagicItem(
        name="Protective Armor",
        level=5,
        material_type='Body armor',
        tags=[],
        description="""
            You gain a +1 \\glossterm<magic bonus> to Armor defense.
        """,
        short_description="Grants +1 Armor defense",
    ))

    apparel.append(MagicItem(
        name="Protective Armor, Greater",
        level=14,
        material_type='Body armor',
        tags=[],
        description="""
            You gain a +2 \\glossterm<magic bonus> to Armor defense.
        """,
        short_description="Grants +2 Armor defense",
    ))

    apparel.append(MagicItem(
        name="Protective Shield",
        level=5,
        material_type='Shield',
        tags=[],
        description="""
            You gain a +1 \\glossterm<magic bonus> to Armor defense.
        """,
        short_description="Grants +1 Armor defense",
    ))

    apparel.append(MagicItem(
        name="Protective Shield, Greater",
        level=14,
        material_type='Shield',
        tags=[],
        description="""
            You gain a +2 \\glossterm<magic bonus> to Armor defense.
        """,
        short_description="Grants +2 Armor defense",
    ))

    apparel.append(MagicItem(
        name='Shield of Arrow Catching',
        level=5,
        material_type='Shield',
        description="""
            When a creature within a \\areamed radius emanation from you would be attacked by a ranged weapon, the attack is redirected to target you instead.
            Resolve the attack as if it had initially targeted you, except that the attack is not affected by cover or concealment.
            This item can only affect projectiles and thrown objects that are Small or smaller.
        """,
        short_description="Redirects small nearby projectiles to hit you",
    ))

    apparel.append(MagicItem(
        name='Shield of Arrow Catching, Greater',
        level=11,
        material_type='Shield',
        description="""
            This item functions like the \\mitem<shield of arrow catching> item, except that it affects a \\arealarge radius from you.
            In addition, you may choose to exclude creature from this item's effect, allowing projectiles to target nearby foes normally.
        """,
        short_description="Selectively redirects small nearby projectiles to hit you",
    ))

    apparel.append(MagicItem(
        name='Shield of Boulder Catching',
        level=8,
        material_type='Shield',
        description="""
            This item functions like the \\mitem<shield of arrow catching> item, except that it can affect projectile and thrown objects of up to Large size.
        """,
        short_description="Redirects large nearby projectiles to hit you",
    ))

    apparel.append(MagicItem(
        name="Shield of Arrow Deflection",
        level=5,
        material_type='Shield',
        description="""
            You gain a +2 \\glossterm<magic bonus> to Armor defense against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
        """,
        short_description="Blocks small projectiles",
    ))

    apparel.append(MagicItem(
        name="Shield of Arrow Deflection, Greater",
        level=14,
        material_type='Shield',
        description="""
            You gain a +4 \\glossterm<magic bonus> to Armor defense against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
        """,
        short_description="Blocks small projectiles",
    ))

    apparel.append(MagicItem(
        name="Shield of Boulder Deflection",
        level=8,
        material_type='Shield',
        description="""
            This item functions like the \\mitem<shield of arrow deflection> item, except that it can affect weapons and projectiles of up to Large size.
        """,
        short_description="Can block large projectiles",
    ))

    apparel.append(MagicItem(
        name="Shield of Boulder Deflection, Greater",
        level=17,
        material_type='Shield',
        description="""
            This item functions like the \\mitem<greater shield of arrow deflection> item, except that it can affect weapons and projectiles of up to Large size.
        """,
        short_description="Blocks large projectiles",
    ))

    apparel.append(MagicItem(
        name="Shield of Bashing",
        level=2,
        material_type='Shield',
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
        """,
        short_description="Deals +1d damage",
    ))

    apparel.append(MagicItem(
        name="Shield of Bashing, Greater",
        level=11,
        material_type='Shield',
        description="""
            You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
        """,
        short_description="Deals +2d damage",
    ))

    apparel.append(MagicItem(
        name="Shield of Bashing, Supreme",
        level=20,
        material_type='Shield',
        description="""
            You gain a +6 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
        """,
        short_description="Deals +3d damage",
    ))

    apparel.append(MagicItem(
        name="Armor of Energy Resistance",
        level=11,
        tags=[],
        material_type='Body armor',
        description="""
            You gain a \\glossterm<magic bonus> equal to half the item's \\glossterm<power> to \\glossterm<resistances> against \\glossterm<energy damage>.
            When you resist energy damage, it sheds light as a torch until the end of the next round.
            The color of the light depends on the energy damage resisted: blue for cold, yellow for electricity, and red for fire.
        """,
        short_description="Reduces energy damage",
    ))

    apparel.append(MagicItem(
        name="Armor of Energy Resistance, Greater",
        level=20,
        tags=[],
        material_type='Body armor',
        description="""
            This item functions like the \\mitem<armor of energy resistance> item, except that the bonus is equal to the item's \\glossterm<power>.
        """,
        short_description="Drastically reduces energy damage",
    ))

    apparel.append(MagicItem(
        name="Featherlight Armor",
        level=6,
        material_type='Body armor',
        description="""
            This armor's \\glossterm<encumbrance> is reduced by 1.
        """,
        short_description="Reduces encumbrance by 1",
    ))

    apparel.append(MagicItem(
        name="Featherlight Armor, Greater",
        level=12,
        material_type='Body armor',
        description="""
            This armor's \\glossterm<encumbrance> is reduced by 2.
        """,
        short_description="Reduces encumbrance by 2",
    ))

    apparel.append(MagicItem(
        name="Featherlight Armor, Supreme",
        level=18,
        material_type='Body armor',
        description="""
            This armor's \\glossterm<encumbrance> is reduced by 3.
        """,
        short_description="Reduces encumbrance by 2",
    ))

    apparel.append(MagicItem(
        name="Armor of Fortification",
        level=7,
        material_type='Body armor',
        description="""
            You gain a +5 bonus to defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
        """,
        short_description="Reduces critical hits from strikes",
    ))

    apparel.append(MagicItem(
        name="Armor of Fortification, Greater",
        level=15,
        material_type='Body armor',
        description="""
            This item functions like the \\mitem<armor of fortification> item, except that the bonus increases to +10.
        """,
        short_description="Drastically reduces critical hits from strikes",
    ))

    apparel.append(MagicItem(
        name="Armor of Fortification, Mystic",
        level=12,
        material_type='Body armor',
        description="""
            This item functions like the \\mitem<armor of fortification> item, except that it applies against all attacks instead of only against \\glossterm<strikes>.
        """,
        short_description="Reduces critical hits from all attacks",
    ))

    apparel.append(MagicItem(
        name="Hidden Armor",
        level=5,
        tags=['Sensation'],
        material_type='Body armor',
        description="""
             As a standard action, you can use this item.
             If you do, it appears to change shape and form to assume the shape of a normal set of clothing.
             You may choose the design of the clothing.
             The item retains all of its properties, including weight and sound, while disguised in this way.
             Only its visual appearance is altered.

             Alternately, you may return the armor to its original appearance.
        """,
        short_description="Can look like normal clothing",
    ))

    apparel.append(MagicItem(
        name="Hidden Armor, Greater",
        level=9,
        material_type='Body armor',
        tags=['Sensation'],
        description="""
            This item functions like the \\mitem<hidden armor> item, except that the item also makes sound appropriate to its disguised form while disguised.
        """,
        short_description="Can look and sound like normal clothing",
    ))

    apparel.append(MagicItem(
        name="Armor of Invulnerability",
        level=11,
        tags=[],
        material_type='Body armor',
        description="""
            You gain a \\glossterm<magic bonus> equal to half the item's \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical damage>.
        """,
        short_description="Reduces physical damage",
    ))

    apparel.append(MagicItem(
        name="Armor of Invulnerability, Greater",
        level=20,
        tags=[],
        material_type='Body armor',
        description="""
            You gain a \\glossterm<magic bonus> equal to the item's \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical damage>.
        """,
        short_description="Greatly reduces physical damage",
    ))

    apparel.append(MagicItem(
        name="Shield of Mystic Reflection",
        level=12,
        tags=[],
        material_type='Shield',
        description="""
            As a standard action, you can activate this shield.
            When you do, any \\glossterm<targeted> \\glossterm<magical> abilities that would target you this round are redirected to target the creature using that ability instead of you.
            Any other targets of the ability are affected normally.
            This is a \\glossterm<Swift> ability, so it affects any abilities targeting you in the phase you activate the item.
        """,
        short_description="React to reflect magical attacks",
    ))

    return apparel

def generate_worn():
    apparel = []

    # Arm

    apparel.append(MagicItem(
        name="Titan Gauntlets",
        level=10,
        material_type='Gauntlet',
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities.
        """,
        short_description="Grants +2 \\glossterm<mundane> power",
    ))

    apparel.append(MagicItem(
        name="Titan Gauntlets, Greater",
        level=19,
        material_type='Gauntlet',
        description="""
            You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities.
        """,
        short_description="Grants +4 \\glossterm<mundane> power",
    ))

    apparel.append(MagicItem(
        name="Bracers of Archery",
        level=1,
        material_type='Bracers',
        description="""
            You are proficient with bows.
        """,
        short_description="Grants bow proficiency",
    ))

    apparel.append(MagicItem(
        name="Bracers of Archery, Greater",
        level=7,
        material_type='Bracers',
        description="""
            You are proficient with bows.
            In addition, you gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with ranged \\glossterm<strikes>.
        """,
        short_description="Grants bow proficiency, +1 ranged accuracy",
    ))

    apparel.append(MagicItem(
        name="Bracers of Armor",
        level=2,
        material_type='Bracers',
        tags=[],
        description="""
            You gain a +2 bonus to Armor defense.
            The protection from these bracers is treated as body armor, and it does not stack with any other body armor you wear.
        """,
        short_description="Grants invisible armor",
    ))

    apparel.append(MagicItem(
        name="Bracers of Repulsion",
        level=7,
        material_type='Bracers',
        description="""
            As a standard action, you can activate these bracers.
            When you do, they emit a telekinetic burst of force.
            Make an attack vs. Fortitude against everything within a \\areasmall radius burst from you.
            If you use this item during the \\glossterm<delayed action phase>,
                you gain a +4 bonus to \\glossterm<accuracy> with this attack against any creature that attacked you during the \\glossterm<action phase>.
            On a hit, you \\glossterm<knockback> each target up to 20 feet.
        """,
        short_description="Can knock nearby creatures back",
    ))

    apparel.append(MagicItem(
        name="Bracers of Repulsion, Greater",
        level=15,
        material_type='Bracers',
        description="""
            This item functions like the \\mitem<bracers of repulsion> item, except that it targets everything within a \\arealarge radius burst.
        """,
        short_description="Can knock many nearby creatures back",
    ))

    apparel.append(MagicItem(
        name="Torchlight Gloves",
        level=2,
        material_type='Gloves',
        tags=[],
        description="""
            These gloves shed light as a torch.
            As a \\glossterm<standard action>, you may snap your fingers to suppress or resume the light from either or both gloves.
        """,
        short_description="Sheds light as a torch",
    ))

    apparel.append(MagicItem(
        name="Gauntlets of Improvisation",
        level=2,
        material_type='Gauntlet',
        description="""
            You gain a +1d \\glossterm<magic bonus> to damage with \\glossterm<improvised weapons>.
        """,
        short_description="Grants +1d damage with improvised weapons",
    ))

    apparel.append(MagicItem(
        name="Gauntlets of Improvisation, Greater",
        level=7,
        material_type='Gauntlet',
        description="""
            This item functions like the \\mitem<gauntlets of improvisation>, except that the damage bonus is increased to +2d.
        """,
        short_description="Grants +2d damage with improvised weapons",
    ))

    apparel.append(MagicItem(
        name="Gauntlet of the Ram",
        level=4,
        material_type='Gauntlet',
        description="""
            When you make a \\glossterm<strike> with this gauntlet, you also compare the attack result to the target's Fortitude defense.
            On a hit, you \\glossterm<knockback> the target up to 10 feet.
            Making a strike with this gauntlet is equivalent to an \\glossterm<unarmed attack>.
        """,
        short_description="Knocks back foe when used to strike",
    ))

    apparel.append(MagicItem(
        name="Gauntlet of the Ram, Greater",
        level=7,
        material_type='Gauntlet',
        description="""
            This item functions like the \\mitem<gauntlet of the ram>, except that you \\glossterm<knockback> the target up to 30 feet.
        """,
        short_description="Knocks back foe farther when use to strike",
    ))

    apparel.append(MagicItem(
        name="Greatreach Bracers",
        level=9,
        material_type='Bracers',
        description="""
            Your \\glossterm<reach> is increased by 5 feet.
        """,
        short_description="Increases reach by five feet",
    ))

    apparel.append(MagicItem(
        name="Greatreach Bracers, Greater",
        level=17,
        material_type='Bracers',
        description="""
            Your \\glossterm<reach> is increased by 10 feet.
        """,
        short_description="Increases reach by ten feet",
    ))

    apparel.append(MagicItem(
        name="Throwing Gloves",
        level=4,
        material_type='Gloves',
        description="""
            % TODO: reference basic "not designed to be thrown" mechanics?
            You can throw any item as if it was designed to be thrown.
            This does not improve your ability to throw items designed to be thrown, such as darts.
        """,
        short_description="Allows throwing any item accurately",
    ))

    # Head

    apparel.append(MagicItem(
        name="Circlet of Blasting",
        level=5,
        material_type='Circlet',
        tags=[],
        description="""
            As a standard action, you can activate this circlet.
            If you do, make an attack vs. Armor against a creature or object within \\rngmed range.
            \\hit The target takes fire \\glossterm<standard damage>.
        """,
        short_description="Can blast foe with fire",
    ))

    apparel.append(MagicItem(
        name="Circlet of Blasting, Greater",
        level=10,
        material_type='Circlet',
        tags=[],
        description="""
            This item functions like the \\textit<circlet of blasting>, except that it gains a +1d bonus to damage.
        """,
        short_description="Can blast foe with intense fire",
    ))

    apparel.append(MagicItem(
        name="Circlet of Blasting, Supreme",
        level=16,
        material_type='Circlet',
        tags=[],
        description="""
            This item functions like the \\textit<circlet of blasting>, except that it gains a +2d bonus to damage.
        """,
        short_description="Can blast foe with supremely intense fire",
    ))

    apparel.append(MagicItem(
        name="Circlet of Persuasion",
        level=4,
        material_type='Circlet',
        description="""
            You gain a +2 \\glossterm<magic bonus> to the Persuasion skill (see \\pcref<Persuasion>).
        """,
        short_description="Grants +2 Persuasion",
    ))

    apparel.append(MagicItem(
        name="Mask of Water Breathing",
        level=4,
        material_type='Mask',
        description="""
            You can breathe water through this mask as easily as a human breaths air.
            This does not grant you the ability to breathe other liquids.
        """,
        short_description="Allows breathing water like air",
    ))

    apparel.append(MagicItem(
        name="Mask of Air",
        level=9,
        material_type='Mask',
        description="""
            If you breathe through this mask, you breathe in clean, fresh air, regardless of your environment.
            This can protect you from inhaled poisons and similar effects.
        """,
        short_description="Allows breathing in any environment",
    ))

    apparel.append(MagicItem(
        name="Crown of Flame",
        level=9,
        material_type='Crown',
        tags=[],
        description="""
            This crown is continuously on fire.
            The flame sheds light as a torch.

            You and your \\glossterm<allies> within a \\arealarge radius emanation from you
                gain a \\glossterm<magic bonus> equal to this item's \\glossterm<power> to \\glossterm<resistances> against fire damage.
        """,
        short_description="Grants nearby allies immunity to fire damage",
    ))

    apparel.append(MagicItem(
        name="Crown of Lightning",
        level=7,
        material_type='Crown',
        tags=[],
        description="""
            This crown continuously crackles with electricity.
            The constant sparks shed light as a torch.

            During each \\glossterm<action phase>, you make an attack vs. Fortitude against all \\glossterm<enemies> within a \\areasmall radius emanation from you.
            A hit deals electricity \\glossterm<standard damage> -3d.
        """,
        short_description="Continuously damages nearby enemies",
    ))

    apparel.append(MagicItem(
        name="Crown of Frost",
        level=13,
        material_type='Crown',
        tags=[],
        description="""
            During each \\glossterm<action phase>, you make an attack vs. Fortitude against all enemies within a \\areasmall radius emanation from you.
            At hit deals cold \\glossterm<standard damage> -2d.
        """,
        short_description="Continuously damages nearby enemies",
    ))

    apparel.append(MagicItem(
        name="Crown of Thunder",
        level=11,
        material_type='Crown',
        tags=[],
        description="""
            The crown constantly emits a low-pitched rumbling.
            To you and your \\glossterm<allies>, the sound is barely perceptible.
            However, all other creatures within a \\arealarge radius emanation from you hear the sound as a deafening, continuous roll of thunder.
            The noise blocks out all other sounds quieter than thunder, causing them to be \\deafened while they remain in the area.
        """,
        short_description="Continously deafens nearby enemies",
    ))

    # Legs

    apparel.append(MagicItem(
        name="Crater Boots",
        level=10,
        material_type='Boots',
        description="""
            % This only works if you only take falling damage during the movement phase, which seems possible?
            When you take \\glossterm<falling damage>, make an attack vs Reflex against everything within a \\areasmall radius from you.
            \\hit Each target takes damage as if they had fallen the same distance that you fell.
            This roll is made separately from the damage roll to determine your falling damage.
            \\crit As above, and each target is knocked \\glossterm<prone>.
            This does not deal double damage on a critical hit.
        """,
        short_description="Deals your falling damage to enemies",
    ))

    apparel.append(MagicItem(
        name="Boots of the Skydancer",
        level=7,
        material_type='Boots',
        tags=['Swift'],
        description="""
            As a \\glossterm<free action>, you can activate these boots.
            When you do, you may treat air as if it were solid ground to your feet for the rest of the current phase.
            You may selectively choose when to treat the air as solid ground, allowing you to walk or jump on air freely.
            After using this ability, you cannot use it again until these boots touch the ground.
        """,
        short_description="Can walk on air",
    ))

    apparel.append(MagicItem(
        name="Boots of the Skydancer, Greater",
        level=13,
        material_type='Boots',
        tags=['Swift'],
        description="""
            This item functions like the \\magicitem<boots of the skydancer>, except that the ability lasts until the end of the round.
            In addition, you can use this item twice before the boots touch the ground.
        """,
        short_description="description",
    ))

    apparel.append(MagicItem(
        name="Boots of Earth's Embrace",
        level=4,
        material_type='Boots',
        tags=[],
        description="""
            While you are standing on solid ground, you are immune to effects that would force you to move.
            This does not protect you from other effects of those attacks, such as damage.
        """,
        short_description="Grants immunity to forced movement",
    ))

    apparel.append(MagicItem(
        name="Boots of Freedom",
        level=3,
        material_type='Boots',
        description="""
            You are immune to magical effects that restrict your mobility.
            This does not prevent physical obstacles from affecting you, such as \\glossterm<difficult terrain>.
        """,
        short_description="Grants immunity to magical mobility restrictions",
    ))

    apparel.append(MagicItem(
        name="Boots of Freedom, Greater",
        level=9,
        material_type='Boots',
        description="""
            You are immune to all effects that restrict your mobility, including nonmagical effects such as \\glossterm<difficult terrain>.
            This removes all penalties you would suffer for acting underwater, except for those relating to using ranged weapons.
            This does not prevent you from being \\grappled, but you gain a +10 bonus to defenses against the \\textit<grapple> ability (see \\pcref<Grapple>).
        """,
        short_description="Grants immunity to almost all mobility restrictions",
    ))

    apparel.append(MagicItem(
        name="Boots of Gravitation",
        level=8,
        material_type='Boots',
        description="""
            While these boots are within 5 feet of a solid surface, gravity pulls you towards the solid surface closest to your boots rather than in the normal direction.
            This can allow you to walk easily on walls or even ceilings.
        """,
        short_description="Redirects personal gravity",
    ))

    apparel.append(MagicItem(
        name="Boots of Speed",
        level=6,
        material_type='Boots',
        tags=[],
        description="""
            You gain a +10 foot \\glossterm<magic bonus> to your land speed, up to a maximum of double your normal speed.
        """,
        short_description="Increases speed by ten feet",
    ))

    apparel.append(MagicItem(
        name="Boots of Speed, Greater",
        level=10,
        material_type='Boots',
        tags=[],
        description="""
            You gain a +20 foot \\glossterm<magic bonus> to your land speed, up to a maximum of double your normal speed.
        """,
        short_description="Increases speed by twenty feet",
    ))

    apparel.append(MagicItem(
        name="Boots of Speed, Supreme",
        level=14,
        material_type='Boots',
        tags=[],
        description="""
            You gain a +30 foot \\glossterm<magic bonus> to your land speed, up to a maximum of double your normal speed.
        """,
        short_description="Increases speed by thirty feet",
    ))

    apparel.append(MagicItem(
        name="Astral Boots",
        level=16,
        material_type='Boots',
        tags=[],
        description="""
            When you move, you can teleport the same distance instead.
            This does not change the total distance you can move, but you can teleport in any direction, even vertically.
            You cannot teleport to locations you do not have \\glossterm<line of sight> and \\glossterm<line of effect> to.
        """,
        short_description="Allows teleporting instead of moving",
    ))

    apparel.append(MagicItem(
        name="Boots of Water Walking",
        level=7,
        material_type='Boots',
        description="""
            You treat the surface of all liquids as if they were firm ground.
            Your feet hover about an inch above the liquid's surface, allowing you to traverse dangerous liquids without harm as long as the surface is calm.

            If you are below the surface of the liquid, you rise towards the surface at a rate of 60 feet per round.
            Thick liquids, such as mud and lava, may cause you to rise more slowly.
        """,
        short_description="Allows walking on liquids",
    ))

    apparel.append(MagicItem(
        name="Boots of the Winterlands",
        level=2,
        material_type='Boots',
        description="""
            You can travel across snow and ice without slipping or suffering movement penalties for the terrain.
            % TODO: degree symbol?
            In addition, the boots keep you warn, protecting you in environments as cold as -50 Fahrenheit.
        """,
        short_description="Eases travel in cold areas",
    ))

    apparel.append(MagicItem(
        name="Seven League Boots",
        level=12,
        material_type='Boots',
        tags=[],
        description="""
            As a standard action, you can spend an \\glossterm<action point> to activate these boots.
            If you do, you teleport exactly 25 miles in a direction you specify.
            If this would place you within a solid object or otherwise impossible space, the boots will shunt you up to 1,000 feet in any direction to the closest available space.
            If there is no available space within 1,000 feet of your intended destination, the effect fails and you take \\glossterm<standard damage> -1d.
        """,
        short_description="Teleport seven leages with a step",
    ))

    apparel.append(MagicItem(
        name="Winged Boots",
        level=10,
        material_type='Boots',
        description="""
            You gain a \\glossterm<fly speed> equal to your \\glossterm<base speed>.
            However, the boots are not strong enough to keep you aloft indefinitely.
            At the end of each round, if you are not standing on solid ground, the magic of the boots fails and you fall normally.
            The boots begin working again at the end of the next round, even if you have not yet hit the ground.
        """,
        short_description="Grants limited flight",
    ))

    apparel.append(MagicItem(
        name="Boots of Elvenkind",
        level=4,
        material_type='Boots',
        description="""
            You gain a +2 \\glossterm<magic bonus> to the Stealth skill (see \\pcref<Stealth>).
        """,
        short_description="Grants +2 Stealth",
    ))

    # Rings

    apparel.append(MagicItem(
        name="Ring of Protection",
        level=8,
        material_type='Ring',
        tags=[],
        description="""
            This ring creates a transluscent shield-like barrier that floats in front of you, deflecting enemy attacks.
            You gain a +1 \\glossterm<magic bonus> to Armor and Reflex defenses.
            This does not stack with the defense bonus from any shields you use.
        """,
        short_description="Grants +1 to Armor and Reflex defenses",
    ))

    apparel.append(MagicItem(
        name="Ring of Protection, Greater",
        level=16,
        material_type='Ring',
        tags=[],
        description="""
            This item functions like the \\magicitem<ring of protection>, except that the bonus increases to +2.
        """,
        short_description="Grants +2 to Armor and Reflex defenses",
    ))

    apparel.append(MagicItem(
        name="Ring of Energy Resistance",
        level=12,
        material_type='Ring',
        tags=[],
        description="""
            You gain a \\glossterm<magic bonus> equal to half this item's \\glossterm<power> to \\glossterm<resistances> against \\glossterm<energy damage>.
            When you resist energy with this ability, the ring sheds light as a torch until the end of the next round.
            The color of the light depends on the energy damage resisted: blue for cold, yellow for electricity, and red for fire.
        """,
        short_description="Reduces energy damage",
    ))

    apparel.append(MagicItem(
        name="Ring of Elemental Endurance",
        level=2,
        material_type='Ring',
        tags=[],
        description="""
            You can exist comfortably in conditions between -50 and 140 degrees Fahrenheit without any ill effects.
            You suffer the normal penalties in temperatures outside of that range.
        """,
        short_description="Grants tolerance of temperature extremes",
    ))

    apparel.append(MagicItem(
        name="Ring of Nourishment",
        level=3,
        material_type='Ring',
        tags=['Creation'],
        description="""
            You continuously gain nourishment, and no longer need to eat or drink.
            This ring must be worn for 24 hours before it begins to work.
        """,
        short_description="Provides food and water",
    ))

    apparel.append(MagicItem(
        name="Ring of Sustenance",
        level=7,
        material_type='Ring',
        tags=['Creation'],
        description="""
            You continuously gain nourishment, and no longer need to eat or drink.
            In addition, you need only one-quarter your normal amount of sleep (or similar activity, such as elven trance) each day.

            The ring must be worn for 24 hours before it begins to work.
        """,
        short_description="Provides food, water, and rest",
    ))

    apparel.append(MagicItem(
        name="Ring of Regeneration",
        level=10,
        material_type='Ring',
        tags=[],
        description="""
            A the end of each round, you gain a +2 \\glossterm<vitality bonus> to one of your \\glossterm<vital rolls>.
        """,
        short_description="Reduce the severity of vital wounds",
    ))

    apparel.append(MagicItem(
        name="Ring of Regeneration, Greater",
        level=16,
        material_type='Ring',
        tags=[],
        description="""
            This item functions like the \\mitem<ring of regeneration> item, except that the bonus increases to +3.
        """,
        short_description="Greatly reduces the severity of vital wounds",
    ))

    # Amulets

    apparel.append(MagicItem(
        name="Amulet of Mighty Fists",
        level=8,
        material_type='Amulet',
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<unarmed attacks> and natural weapons.
        """,
        short_description="Grants +2 power with natural and unarmed attacks",
    ))

    apparel.append(MagicItem(
        name="Amulet of Mighty Fists, Greater",
        level=16,
        material_type='Amulet',
        description="""
            You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<unarmed attacks> and natural weapons.
        """,
        short_description="Grants +4 power with natural and unarmed attacks",
    ))

    apparel.append(MagicItem(
        name="Amulet of Health",
        level=6,
        material_type='Amulet',
        description="""
            You gain a +1 bonus to maximum \\glossterm<hit points>.
        """,
        short_description="Grants a +1 bonus to \\glossterm<vital rolls>",
    ))

    apparel.append(MagicItem(
        name="Amulet of Health, Greater",
        level=15,
        material_type='Amulet',
        description="""
            This item functions like the \\mitem<amulet of health>, except that the bonus increases to +2.
        """,
        short_description="Grants a +2 bonus to \\glossterm<vital rolls>",
    ))

    apparel.append(MagicItem(
        name="Amulet of the Planes",
        level=12,
        material_type='Amulet',
        tags=[],
        description="""
            When you perform the \\ritual<plane shift> ritual, this amulet provides all action points required.
            This does not grant you the ability to perform the \\ritual<plane shift> ritual if you could not already.
        """,
        short_description="Aids travel with \\ritual<plane shift>",
    ))

    apparel.append(MagicItem(
        name="Amulet of Nondetection",
        level=6,
        material_type='Amulet',
        tags=[],
        description="""
            You gain a +4 bonus to defenses against abilities with the \\glossterm<Detection> or \\glossterm<Scrying> tags.
        """,
        short_description="Grants +4 to defenses against detection",
    ))

    apparel.append(MagicItem(
        name="Amulet of Nondetection, Greater",
        level=14,
        material_type='Amulet',
        tags=[],
        description="""
            You gain a +8 bonus to defenses against abilities with the \\glossterm<Detection> or \\glossterm<Scrying> tags.
        """,
        short_description="Grants +8 to defenses against detection",
    ))

    # Cloaks

    apparel.append(MagicItem(
        name="Quilled Cloak",
        level=6,
        material_type='Cloak',
        tags=[],
        description="""
            Whenever a creature grapples you, you immediately deal it piercing \\glossterm<standard damage>.
            This does not affect creatures that you initiate a grapple with.
        """,
        short_description="Deals damage to creatures that grapple you",
    ))

    apparel.append(MagicItem(
        name="Greater Quilled Cloak",
        level=12,
        material_type='Cloak',
        tags=[],
        description="""
            This item functions like the \\textit<quilled cloak>, except that the damage increases to \\glossterm<standard damage> +1d.
        """,
        short_description="Deals more damage to creatures that grapple you",
    ))

    apparel.append(MagicItem(
        name="Supreme Quilled Cloak",
        level=18,
        material_type='Cloak',
        tags=[],
        description="""
            This item functions like the \\textit<quilled cloak>, except that the damage increases to \\glossterm<standard damage> +2d.
        """,
        short_description="Deals even more damage to creatures that grapple you",
    ))

    apparel.append(MagicItem(
        name="Avian Cloak",
        level=8,
        material_type='Cloak',
        tags=[],
        description="""
            You gain a \\glossterm<glide speed> equal to your \\glossterm<base speed>.
        """,
        short_description="Grants a glide speed",
    ))

    apparel.append(MagicItem(
        name="Assassin's Cloak",
        level=7,
        material_type='Cloak',
        tags=['Sensation'],
        description="""
            At the end of each round, if you took no actions that round, you become \\glossterm<invisible> until after you take an action.
        """,
        short_description="Grants invisibility while inactive",
    ))

    apparel.append(MagicItem(
        name="Assassin's Cloak, Greater",
        level=13,
        material_type='Cloak',
        tags=['Sensation'],
        description="""
            At the end of each round, if you took no actions that round, you become \\glossterm<invisible> until the end of the next round.
        """,
        short_description="Grants longer invisibility while inactive",
    ))

    apparel.append(MagicItem(
        name="Cloak of Mist",
        level=8,
        material_type='Cloak',
        tags=['Manifestation'],
        description="""
            Fog constantly fills a \\areamed radius emanation from you.
            This fog does not fully block sight, but it provides \\concealment.

            If a 5-foot square of fog takes fire damage equal to half this item's \\glossterm<power>, the fog disappears from that area until the end of the next round.
        """,
        short_description="Fills nearby area with fog",
    ))

    apparel.append(MagicItem(
        name="Cloak of Mist, Greater",
        level=16,
        material_type='Cloak',
        tags=['Manifestation'],
        description="""
            A thick fog constantly fills a \\areamed radius emanation from you.
            This fog completely blocks sight beyond 10 feet.
            Within that range, it still provides \\concealment.

            If a 5-foot square of fog takes fire damage equal to this item's \\glossterm<power>, the fog disappears from that area until the end of the next round.
        """,
        short_description="Fills nearby area with thick fog",
    ))

    apparel.append(MagicItem(
        name="Vanishing Cloak",
        level=13,
        material_type='Cloak',
        tags=['Sensation'],
        description="""
            As a standard action, you can activate this cloak.
            When you do, you teleport to an unoccupied location within \\rngmed range of your original location.
            In addition, you become \\glossterm<invisible> until the end of the next round.

            If your intended destination is invalid, or if your teleportation otherwise fails, you still become invisible.
        """,
        short_description="Can teleport a short distance and grant invisibility",
    ))

    # Maybe too strong?
    apparel.append(MagicItem(
        name="Hexward Amulet",
        level=7,
        material_type='Amulet',
        tags=[],
        description="""
            You gain a +1 bonus to defenses against \\glossterm<magical> abilities that target you directly.
            This does not protect you from abilities that affect an area.
        """,
        short_description="Grants +1 defenses against targeted magical attacks",
    ))

    apparel.append(MagicItem(
        name="Hexproof Amulet, Greater",
        level=13,
        material_type='Amulet',
        tags=[],
        description="""
            This item functions like the \\mitem<hexward amulet> item, except that the bonus increases to +2.
        """,
        short_description="Grants +2 defenses against targeted magical attacks",
    ))

    apparel.append(MagicItem(
        name="Hexproof Amulet, Supreme",
        level=19,
        material_type='Amulet',
        tags=[],
        description="""
            This item functions like the \\mitem<hexward amulet> item, except that the bonus increases to +3.
        """,
        short_description="Grants +3 defenses against targeted magical attacks",
    ))

    # Belts

    apparel.append(MagicItem(
        name="Belt of Healing",
        level=2,
        material_type='Belt',
        tags=[],
        description="""
            As a standard action, you can use this belt to gain a +1 \\glossterm<vitality bonus> to one of your \\glossterm<vital rolls> (see \\pcref<Vital Rolls>).
        """,
        short_description="Grants healing",
    ))

    apparel.append(MagicItem(
        name="Belt of Healing, Greater",
        level=8,
        material_type='Belt',
        tags=[],
        description="""
            This item functions like the \\textit<belt of healing>, except that the bonus increases to +2.
        """,
        short_description="Grants more healing",
    ))

    apparel.append(MagicItem(
        name="Belt of Healing, Supreme",
        level=14,
        material_type='Belt',
        tags=[],
        description="""
            This item functions like the \\textit<belt of healing>, except that the bonus increases to +3.
        """,
        short_description="Grants more healing",
    ))

    apparel.append(MagicItem(
        name="Lifekeeping Belt",
        level=7,
        material_type='Belt',
        tags=[],
        description="""
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
        """,
        short_description="Grants +1 bonus to \\glossterm<vital rolls>",
    ))

    apparel.append(MagicItem(
        name="Lifekeeping Belt, Greater",
        level=13,
        material_type='Belt',
        tags=[],
        description="""
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
        """,
        short_description="Grants +2 bonus to \\glossterm<vital rolls>",
    ))

    apparel.append(MagicItem(
        name="Lifekeeping Belt, Supreme",
        level=19,
        material_type='Belt',
        tags=[],
        description="""
            You gain a +3 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
        """,
        short_description="Grants +3 bonus to \\glossterm<vital rolls>",
    ))

    apparel.append(MagicItem(
        name="Ocular Circlet",
        level=3,
        material_type='Circlet',
        tags=['Scrying'],
        description="""
            As a \\glossterm<standard action>, you can concentrate to use this item.
            If you do, a \\glossterm<scrying sensor> appears floating in the air in an unoccupied square within \\rngclose range.
            As long as you \\glossterm<sustain> the effect as a standard action, you see through the sensor instead of from your body.

            While viewing through the sensor, your visual acuity is the same as your normal body,
                except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
            You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.
        """,
        short_description="Can allow you to see at a distance",
    ))

    apparel.append(MagicItem(
        name="Ocular Circlet, Greater",
        level=9,
        material_type='Circlet',
        tags=['Scrying'],
        description="""
            This item functions like the \\mitem<ocular circlet>, except that it only takes a \\glossterm<minor action> to activate and sustain the item's effect.
            In addition, the sensor appears anywhere within \\rngmed range.
        """,
        short_description="Can allow you to see at a greater distance",
    ))

    apparel.append(MagicItem(
        name="Gloves of Spell Investment",
        level=7,
        material_type='Gloves',
        tags=[],
        description="""
            When you cast a spell that does not have the \\glossterm<AP>, \\glossterm<Attune>, \\glossterm<Sustain> tags,
                you can invest the magic of the spell in these gloves.
            If you do, the spell does not have its normal effect.

            As a standard action, you can activate these gloves.
            When you do, you cause the effect of the last spell invested in the gloves.
            This does not require \\glossterm<components>.
            After you use a spell in this way, the energy in the gloves is spent, and you must invest a new spell to activate the gloves again.

            If you remove either glove from your hand, the magic of the spell invested in the gloves is lost.
        """,
        short_description="Can invest a spell to cast later",
    ))

    apparel.append(MagicItem(
        name="Gloves of Spell Investment, Greater",
        level=13,
        material_type='Gloves',
        tags=[],
        description="""
            This item functions like the \\mitem<gloves of spell investment>, except that you can store up to two spells in the gloves.
            When you activate the gauntlets, you choose which spell to use.
        """,
        short_description="Can invest two spells to cast later",
    ))

    apparel.append(MagicItem(
        name="Ring of Angel's Grace",
        level=9,
        material_type='Ring',
        tags=[],
        description="""
            You gain +2 \\glossterm<magic bonus> to Mental defense.
            In addition, if you fall at least 20 feet, ephemeral angel wings spring from your back.
            The wings slow your fall to a rate of 60 feet per round, preventing you from taking \\glossterm<falling damage>.
        """,
        short_description="Grants +2 Mental and slows falls",
    ))

    # Other

    return apparel


def generate_apparel():
    return generate_armor() + generate_worn()


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

    text = '\n'.join(texts)
    return latexify(text)


def generate_apparel_table():
    apparel = sorted(
        sorted(generate_apparel(), key=lambda item: item.name),
        key=lambda item: item.level
    )
    rows = [item.latex_table_row() for item in apparel]
    row_text = '\n'.join(rows)
    return longtablify(f"""
        \\lcaption<Apparel Items> \\\\
        \\tb<Name> & \\tb<Level> & \\tb<Typical Price> & \\tb<Description> & \\tb<Page> \\tableheaderrule
        {row_text}
    """)


def sanity_check(armor, worn):
    pass


def write_to_file():
    apparel_latex = generate_apparel_latex()
    apparel_table = generate_apparel_table()
    with open(book_path('apparel.tex'), 'w') as apparel_description_file:
        apparel_description_file.write(apparel_latex)
    with open(book_path('apparel_table.tex'), 'w') as apparel_table_file:
        apparel_table_file.write(apparel_table)


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_apparel_latex())


if __name__ == "__main__":
    main()
