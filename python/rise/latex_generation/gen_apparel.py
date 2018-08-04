#!/usr/bin/env python3

import click
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify

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
        short_description="Redirects small nearby projectiles to hit you",
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
        short_description="Selectively redirects small nearby projectiles to hit you",
    ))

    apparel.append(MagicItem(
        name='Shield of Boulder Catching',
        level=8,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            This item functions like the \\mitem<shield of arrow catching> item, except that it can affect projectile and thrown objects of up to Large size.
        """,
        short_description="Redirects large nearby projectiles to hit you",
    ))

    apparel.append(MagicItem(
        name="Shield of Arrow Deflection",
        level=2,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            As a \\glossterm<minor action>, you can activate this shield.
            If you do, you gain a +5 \\glossterm<magic bonus> to Armor defense against ranged \\glossterm<physical attacks> from weapons or projectiles that are Small or smaller.
            This is a \\glossterm<swift ability>, and it lasts until the end of the round.
        """,
        short_description="Can block small projectiles",
    ))

    apparel.append(MagicItem(
        name="Shield of Arrow Deflection, Greater",
        level=8,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            You gain a +5 \\glossterm<magic bonus> to Armor defense against ranged \\glossterm<physical attacks> from weapons or projectiles that are Small or smaller.
        """,
        short_description="Blocks small projectiles",
    ))

    apparel.append(MagicItem(
        name="Shield of Boulder Deflection",
        level=6,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            This item functions like the \\mitem<shield of arrow deflection> item, except that it can affect weapons and projectiles of up to Large size.
        """,
        short_description="Can block large projectiles",
    ))

    apparel.append(MagicItem(
        name="Shield of Boulder Deflection, Greater",
        level=12,
        tags=['Telekinesis'],
        material_type='shield',
        description="""
            This item functions like the \\mitem<greater shield of arrow deflection> item, except that it can affect weapons and projectiles of up to Large size.
        """,
        short_description="Blocks large projectiles",
    ))

    apparel.append(MagicItem(
        name="Shield of Bashing",
        level=2,
        material_type='shield',
        description="""
            You gain a +1d \\glossterm<magic bonus> to \\glossterm<strike damage> with this shield.
        """,
        short_description="Deals +1d damage",
    ))

    apparel.append(MagicItem(
        name="Shield of Bashing, Greater",
        level=12,
        material_type='shield',
        description="""
            You gain a +2d \\glossterm<magic bonus> to \\glossterm<strike damage> with this shield.
        """,
        short_description="Deals +2d damage",
    ))

    apparel.append(MagicItem(
        name="Armor of Energy Resistance",
        level=4,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            You have \\glossterm<damage reduction> equal to the item's \\glossterm<power> against \\glossterm<energy damage>.
            Whenever you resist energy with this item, it sheds light as a torch until the end of the next round.
            The color of the light depends on the energy damage resisted: blue for cold, yellow for electricity, red for fire, and brown for sonic.
        """,
        short_description="Reduces energy damage",
    ))

    apparel.append(MagicItem(
        name="Armor of Energy Resistance, Greater",
        level=12,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            This item functions like the \\mitem<armor of energy resistance> item, except that the damage reduction is equal to twice the item's \\glossterm<power>.
        """,
        short_description="Drastically reduces energy damage",
    ))

    apparel.append(MagicItem(
        name="Featherlight Armor",
        level=4,
        material_type='body armor',
        description="""
            This armor's \\glossterm<encumbrance> is reduced by 1.
        """,
        short_description="Reduces encumbrance by 1",
    ))

    apparel.append(MagicItem(
        name="Featherlight Armor, Greater",
        level=10,
        material_type='body armor',
        description="""
            This armor's \\glossterm<encumbrance> is reduced by 2.
        """,
        short_description="Reduces encumbrance by 2",
    ))

    apparel.append(MagicItem(
        name="Armor of Fortification",
        level=7,
        material_type='body armor',
        description="""
            You gain a +5 bonus to defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
        """,
        short_description="Reduces critical hits from strikes",
    ))

    apparel.append(MagicItem(
        name="Armor of Fortification, Greater",
        level=15,
        material_type='body armor',
        description="""
            This item functions like the \\mitem<armor of fortification> item, except that the bonus increases to +10.
        """,
        short_description="Drastically reduces critical hits from strikes",
    ))

    apparel.append(MagicItem(
        name="Armor of Fortification, Mystic",
        level=12,
        material_type='body armor',
        description="""
            This item functions like the \\mitem<armor of fortification> item, except that it applies against all attacks instead of only against; \\glossterm<strikes>.
        """,
        short_description="Reduces critical hits from all attacks",
    ))

    apparel.append(MagicItem(
        name="Hidden Armor",
        level=4,
        tags=['Sensation'],
        material_type='body armor',
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
        material_type='body armor',
        tags=['Alteration'],
        description="""
            This item functions like the \\mitem<hidden armor> item, except that the item also makes sound appropriate to its disguised form while disguised.
        """,
        short_description="Can look and sound like normal clothing",
    ))

    apparel.append(MagicItem(
        name="Armor of Invulnerability",
        level=8,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            You have \\glossterm<damage reduction> equal to this item's \\glossterm<power> against damage from \\glossterm<physical attacks>.
        """,
        short_description="Reduces damage from physical attacks",
    ))

    apparel.append(MagicItem(
        name="Armor of Invulnerability, Greater",
        level=16,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            This item functions like the \\mitem<armor of invulnerability> item, except that the damage reduction is equal to twice the item's \\glossterm<power>.
            You have \\glossterm<damage reduction> equal to the item's \\glossterm<power> against damage from \\glossterm<physical attacks>.
        """,
        short_description="Drastically reduces damage from physical attacks",
    ))

    apparel.append(MagicItem(
        name="Armor of Magic Resistance",
        level=14,
        tags=['Shielding'],
        material_type='body armor',
        description="""
            You have \\glossterm<magic resistance> equal to 5 + the item's \\glossterm<power>.
        """,
        short_description="Provides magic resistance",
    ))

    apparel.append(MagicItem(
        name="Shield of Mystic Reflection",
        level=12,
        tags=['Mystic'],
        material_type='shield',
        description="""
            As a \\glossterm<minor action>, you can spend an \\glossterm<action point> to activate this item.
            If you do, any \\glossterm<targeted> \\glossterm<magical> abilities that would target you are redirected to target the creature using that ability instead of you.
            Any other targets of the ability are affected normally.
            This is a \\glossterm<swift ability>, and it lasts until the end of the round.
        """,
        short_description="React to reflect magical attacks",
    ))

    return apparel

def generate_worn():
    apparel = []

    # Arm

    apparel.append(MagicItem(
        name="Titan Gauntlets",
        level=13,
        material_type='gauntlet',
        description="""
            You gain a +1d \\glossterm<magic bonus> to \\glossterm<strike damage>.
        """,
        short_description="Grants +1d strike damage",
    ))

    apparel.append(MagicItem(
        name="Bracers of Archery",
        level=1,
        material_type='bracer',
        description="""
            You are proficient with bows.
        """,
        short_description="Grants bow proficiency",
    ))

    apparel.append(MagicItem(
        name="Bracers of Archery, Greater",
        level=7,
        material_type='bracer',
        description="""
            You are proficient with bows.
            In addition, you gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with ranged \\glossterm<strikes>.
        """,
        short_description="Grants bow proficiency, +1 ranged accuracy",
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
        short_description="Grants invisible armor",
    ))

    apparel.append(MagicItem(
        name="Bracers of Repulsion",
        level=4,
        material_type='bracer',
        tags=['Telekinesis'],
        description="""
            As a standard action during the \\glossterm<action phase>, you can spend an \\glossterm<action point> to activate these bracers.
            If you do, they emit a telekinetic burst of force during the \\glossterm<delayed action phase> that targets objects and enemies within a \\areamed radius burst from you.
            You make a \\glossterm<shove> attack against all targets to push them away from you, using this item's \\glossterm<power> in place of your Strength.
            You gain a +5 bonus to this attack against any creature that attacked you during the action phase,
                and an additional +5 bonus against any creature that damaged you during the action phase.
            You do not have to move with any targets to push them the full distance of the shove.
        """,
        short_description="Can shove nearby creatures back",
    ))

    apparel.append(MagicItem(
        name="Bracers of Repulsion, Greater",
        level=8,
        material_type='bracer',
        tags=['Telekinesis'],
        description="""
            This item functions like the \\mitem<bracers of repulsion> item, except that it targets everything within a \\arealarge radius burst.
        """,
        short_description="Can shove foes back",
    ))

    apparel.append(MagicItem(
        name="Torchlight Gloves",
        level=2,
        material_type='glove',
        tags=['Light'],
        description="""
            These gloves shed light as a torch.
            As a \\glossterm<standard action>, you may snap your fingers to suppress or resume the light from either or both gloves.
        """,
        short_description="Sheds light as a torch",
    ))

    apparel.append(MagicItem(
        name="Gauntlets of Improvisation",
        level=2,
        material_type='gauntlet',
        description="""
            You gain a +1d \\glossterm<magic bonus> to damage with \\glossterm<improvised weapons>.
        """,
        short_description="Grants +1d damage with improvised weapons",
    ))

    apparel.append(MagicItem(
        name="Gauntlets of Improvisation, Greater",
        level=7,
        material_type='gauntlet',
        description="""
            This item functions like the \\mitem<gauntlets of improvisation>, except that the damage bonus is increased to +2d.
        """,
        short_description="Grants +2d damage with improvised weapons",
    ))

    apparel.append(MagicItem(
        name="Gauntlet of the Ram",
        level=2,
        material_type='gauntlet',
        tags=['Telekinesis'],
        description="""
            If you hit on a \\glossterm<strike> with this gauntlet during the \\glossterm<action phse>, you can attempt to \\glossterm<shove> your foe during the \\glossterm<delayed action phase>.
            Making a strike with this gauntlet is equivalent to an \\glossterm<unarmed attack>.
            You do not need to move with your foe to push it back the full distance.
        """,
        short_description="Shoves foe when used to strike",
    ))

    apparel.append(MagicItem(
        name="Gauntlet of the Ram, Greater",
        level=7,
        material_type='gauntlet',
        tags=['Telekinesis'],
        description="""
            This item functions like the \\mitem<gauntlet of the ram>, except that you gain a bonus to the \\glossterm<shove> attack equal to the damage you dealt with the \\glossterm<strike>.
        """,
        short_description="Shoves foe hard when use to strike",
    ))

    apparel.append(MagicItem(
        name="Greatreach Bracers",
        level=9,
        material_type='bracer',
        description="""
            Your \\glossterm<reach> is increased by 5 feet.
        """,
        short_description="Increases reach by five feet",
    ))

    apparel.append(MagicItem(
        name="Greatreach Bracers, Greater",
        level=17,
        material_type='bracer',
        description="""
            Your \\glossterm<reach> is increased by 10 feet.
        """,
        short_description="Increases reach by ten feet",
    ))

    apparel.append(MagicItem(
        name="Throwing Gloves",
        level=4,
        material_type='glove',
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
        level=4,
        material_type='circlet',
        tags=['Fire'],
        description="""
            As a standard action, you can spend an \\glossterm<action point> to use this item.
            If you do, make an attack vs. Reflex against a creature or object within \\rngmed range.
            \\hit The target takes fire \\glossterm<standard damage> +1d.
        """,
        short_description="Can blast foe with fire",
    ))

    apparel.append(MagicItem(
        name="Circlet of Blasting, Greater",
        level=10,
        material_type='circlet',
        tags=['Fire'],
        description="""
            This item functions like the \\textit<circlet of blasting>, except that it gains a +1d bonus to damage.
        """,
        short_description="Can blast foe with intense fire",
    ))

    apparel.append(MagicItem(
        name="Circlet of Blasting, Supreme",
        level=16,
        material_type='circlet',
        tags=['Fire'],
        description="""
            This item functions like the \\textit<circlet of blasting>, except that it gains a +2d bonus to damage.
        """,
        short_description="Can blast foe with supremely intense fire",
    ))

    apparel.append(MagicItem(
        name="Circlet of Persuasion",
        level=4,
        material_type='circlet',
        description="""
            You gain a +2 \\glossterm<magic bonus> to the Persuasion skill (see \\pcref<Persuasion>).
        """,
        short_description="Grants +2 Persuasion",
    ))

    apparel.append(MagicItem(
        name="Mask of Water Breathing",
        level=4,
        material_type='mask',
        description="""
            You can breathe water through this mask as easily as a human breaths air.
            This does not grant you the ability to breathe other liquids.
        """,
        short_description="Allows breathing water like air",
    ))

    apparel.append(MagicItem(
        name="Mask of Air",
        level=9,
        material_type='mask',
        description="""
            If you breathe through this mask, you breathe in clean, fresh air, regardless of your environment.
            This can protect you from inhaled poisons and similar effects.
        """,
        short_description="Allows breathing in any environment",
    ))

    apparel.append(MagicItem(
        name="Crown of Flame",
        level=5,
        material_type='crown',
        tags=['Fire'],
        description="""
            This crown is continuously on fire.
            The flame sheds light as a torch.

            You and all allies within a \\arealarge radius emanation from you are immune to fire damage.
        """,
        short_description="Grants nearby allies immunity to fire damage",
    ))

    apparel.append(MagicItem(
        name="Crown of Lightning",
        level=7,
        material_type='crown',
        tags=['Electricity'],
        description="""
            This crown continuously crackles with electricity.
            The constant sparks shed light as a torch.

            At the end of each \\glossterm<action phase>, you make an attack vs. Reflex against all enemies within a \\areamed radius emanation from you.
            A hit deals electricity \\glossterm<standard damage> -3d.
        """,
        short_description="Continuously damages nearby enemies",
    ))

    apparel.append(MagicItem(
        name="Crown of Frost",
        level=11,
        material_type='crown',
        tags=['Cold'],
        description="""
            At the end of each \\glossterm<action phase>, you make an attack vs. Fortitude against all enemies within a \\areamed radius emanation from you.
            A hit deals cold \\glossterm<standard damage> -3d.
            Each creature that takes damage in this way is \\fatigued until the end of the next round.
        """,
        short_description="Continuously damages and fatigues nearby enemies",
    ))

    apparel.append(MagicItem(
        name="Crown of Thunder",
        level=9,
        material_type='crown',
        tags=['Sonic'],
        description="""
            The crown constantly emits a low-pitched rumbling.
            To you and your allies, the sound is barely perceptible.
            However, all enemies within a \\arealarge radius emanation from you hear the sound as a deafening, continuous roll of thunder.
            The noise blocks out all other sounds quieter than thunder, causing them to be \\deafened while they remain in the area and until the end of the next round after they leave.
        """,
        short_description="Continously deafens nearby enemies",
    ))

    # Legs

    apparel.append(MagicItem(
        name="Crater Boots",
        level=10,
        material_type='boot',
        description="""
            % This only works if you only take falling damage during the movement phase, which seems possible?
            Whenever you take \\glossterm<falling damage>, make an attack vs Reflex against everything within a \\areasmall radius from you.
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
        material_type='boot',
        tags=['Air', 'Swift'],
        description="""
            As a \\glossterm<free action>, you can spend an \\glossterm<action point> to use this item.
            If you do, you may treat air as if it were solid ground to your feet for the rest of the current phase.
            You may selectively choose when to treat the air as solid ground, allowing you to walk or jump on air freely.
        """,
        short_description="Can walk on air",
    ))

    apparel.append(MagicItem(
        name="Boots of Earth's Embrace",
        level=4,
        material_type='boot',
        tags=['Earth'],
        description="""
            While you are standing on solid ground, you are immune to effects that would force you to move.
            This does not protect you from other effects of those attacks, such as damage.
        """,
        short_description="Grants immunity to forced movement",
    ))

    apparel.append(MagicItem(
        name="Boots of Freedom",
        level=3,
        material_type='boot',
        description="""
            You are immune to magical effects that restrict your mobility.
            This does not prevent physical obstacles from affecting you, such as \\glossterm<difficult terrain>.
        """,
        short_description="Grants immunity to magical mobility restrictions",
    ))

    apparel.append(MagicItem(
        name="Boots of Freedom, Greater",
        level=9,
        material_type='boot',
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
        material_type='boot',
        description="""
            While these boots are within 5 feet of a solid surface, gravity pulls you towards the solid surface closest to your boots rather than in the normal direction.
            This can allow you to walk easily on walls or even ceilings.
        """,
        short_description="Redirects personal gravity",
    ))

    apparel.append(MagicItem(
        name="Boots of Speed",
        level=5,
        material_type='boot',
        tags=['Temporal'],
        description="""
            You gain a +10 foot \\glossterm<magic bonus> to your land speed, up to a maximum of double your normal speed.
        """,
        short_description="Increases speed by ten feet",
    ))

    apparel.append(MagicItem(
        name="Boots of Speed, Greater",
        level=13,
        material_type='boot',
        tags=['Temporal'],
        description="""
            You gain a +30 foot \\glossterm<magic bonus> to your land speed, up to a maximum of double your normal speed.
        """,
        short_description="Increases speed by thirty feet",
    ))

    apparel.append(MagicItem(
        name="Astral Boots",
        level=16,
        material_type='boot',
        tags=['Teleportation'],
        description="""
            Whenever you move, you can teleport the same distance instead.
            This does not change the total distance you can move, but you can teleport in any direction, even vertically.
            You cannot teleport to locations you do not have \\glossterm<line of sight> and \\glossterm<line of effect> to.
        """,
        short_description="Allows teleporting instead of moving",
    ))

    apparel.append(MagicItem(
        name="Boots of Water Walking",
        level=7,
        material_type='boot',
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
        material_type='boot',
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
        material_type='boot',
        tags=['Teleportation'],
        description="""
            As a standard action, you can spend an \\glossterm<action point> to use this item.
            If you do, you teleport exactly 25 miles in a direction you specify.
            If this would place you within a solid object or otherwise impossible space, the boots will shunt you up to 1,000 feet in any direction to the closest available space.
            If there is no available space within 1,000 feet of your intended destination, the effect fails and you take \\glossterm<standard damage> -1d.
        """,
        short_description="Teleport seven leages with a step",
    ))

    apparel.append(MagicItem(
        name="Winged Boots",
        level=10,
        material_type='boot',
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
        material_type='boot',
        description="""
            You gain a +2 \\glossterm<magic bonus> to the Stealth skill (see \\pcref<Stealth>).
        """,
        short_description="Grants +2 Stealth",
    ))

    # Rings

    apparel.append(MagicItem(
        name="Ring of Protection",
        level=8,
        material_type='ring',
        tags=['Shielding'],
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
        material_type='ring',
        tags=['Shielding'],
        description="""
            This item functions like the \\magicitem<ring of protection>, except that the bonus increases to +2.
        """,
        short_description="Grants +2 to Armor and Reflex defenses",
    ))

    apparel.append(MagicItem(
        name="Ring of Energy Resistance",
        level=5,
        material_type='ring',
        tags=['Shielding'],
        description="""
            You have \\glossterm<damage reduction> equal to the ring's \\glossterm<power> against \\glossterm<energy damage>.
            Whenever you resist energy with this ability, the ring sheds light as a torch until the end of the next round.
            The color of the light depends on the energy damage resisted: blue for cold, yellow for electricity, red for fire, and brown for sonic.
        """,
        short_description="Reduces energy damage",
    ))

    apparel.append(MagicItem(
        name="Ring of Energy Resistance, Greater",
        level=13,
        material_type='ring',
        tags=['Shielding'],
        description="""
            This item functions like the \\mitem<ring of energy resistance>, except that the damage reduction is equal to twice the item's \\glossterm<power>.
        """,
        short_description="Drastically reduces energy damage",
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
        short_description="Grants tolerance of temperature extremes",
    ))

    apparel.append(MagicItem(
        name="Ring of Nourishment",
        level=3,
        material_type='ring',
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
        material_type='ring',
        tags=['Creation', 'Temporal'],
        description="""
            You continuously gain nourishment, and no longer need to eat or drink.
            In addition, you need only one-quarter your normal amount of sleep (or similar activity, such as elven trance) each day.

            The ring must be worn for 24 hours before it begins to work.
        """,
        short_description="Provides food, water, and rest",
    ))

    apparel.append(MagicItem(
        name="Ring of Regeneration",
        level=11,
        material_type='ring',
        tags=['Life'],
        description="""
            At the end of each \\glossterm<action phase>, you heal hit points equal to this item's \\glossterm<power>.
            Only damage taken while wearing the ring can be healed in this way.
        """,
        short_description="Grants fast healing",
    ))

    # Amulets

    apparel.append(MagicItem(
        name="Amulet of Mighty Fists",
        level=6,
        material_type='amulet',
        description="""
            You gain a +1d \\glossterm<magic bonus> to \\glossterm<strike damage> with \\glossterm<unarmed attacks> and natural weapons.
        """,
        short_description="Grants +1d damage with your body",
    ))

    apparel.append(MagicItem(
        name="Amulet of Mighty Fists, Greater",
        level=14,
        material_type='amulet',
        description="""
            You gain a +2d \\glossterm<magic bonus> to \\glossterm<strike damage> with \\glossterm<unarmed attacks> and natural weapons.
        """,
        short_description="Grants +2d damage with your body",
    ))

    apparel.append(MagicItem(
        name="Amulet of Health",
        level=2,
        material_type='amulet',
        description="""
            You increase your maximum hit points by an amount equal to this item's \\glossterm<power>.
        """,
        short_description="Increases your hit points",
    ))

    apparel.append(MagicItem(
        name="Amulet of Health, Greater",
        level=10,
        material_type='amulet',
        description="""
            You increase your maximum hit points by an amount equal to twice this item's \\glossterm<power>.
        """,
        short_description="Greatly increases your hit points",
    ))

    apparel.append(MagicItem(
        name="Amulet of the Planes",
        level=12,
        material_type='amulet',
        tags=['Teleportation'],
        description="""
            When you perform the \\ritual<plane shift> ritual, this amulet provides all action points required.
            This does not grant you the ability to perform the \\ritual<plane shift> ritual if you could not already.
            It also does not provide any action points for subrituals of the \\ritual<plane shift> ritual.
        """,
        short_description="Aids travel with \\ritual<plane shift>",
    ))

    apparel.append(MagicItem(
        name="Amulet of the Planes, Greater",
        level=19,
        material_type='amulet',
        tags=['Teleportation'],
        description="""
            This item functions like the \\magicitem<amulet of the planes> item, except that it also provides action points for all subrituals of the \\ritual<plane shift> ritual.
        """,
        short_description="Aid travel with \\ritual<plane shift> subrituals",
    ))

    apparel.append(MagicItem(
        name="Amulet of Nondetection",
        level=6,
        material_type='amulet',
        tags=['Mystic'],
        description="""
            You gain a +5 bonus to defenses against abilities with the \\glossterm<Scrying> tag.
        """,
        short_description="Grants +5 to defenses against scrying",
    ))

    apparel.append(MagicItem(
        name="Amulet of Nondetection, Greater",
        level=14,
        material_type='amulet',
        tags=['Mystic'],
        description="""
            You gain a +10 bonus to defenses against abilities with the \\glossterm<Scrying> tag.
        """,
        short_description="Grants +10 to defenses against scrying",
    ))

    # Cloaks

    apparel.append(MagicItem(
        name="Assassin's Cloak",
        level=7,
        material_type='cloak',
        tags=['Sensation'],
        description="""
            At the end of each round, if you took no actions that round, you become \\glossterm<invisible> until the end of the next round.
        """,
        short_description="Grants invisibility while inactive",
    ))

    apparel.append(MagicItem(
        name="Assassin's Cloak, Greater",
        level=17,
        material_type='cloak',
        tags=['Sensation'],
        description="""
            At the end of each round, if you did not attack a creature that round, you become \\glossterm<invisible> until the end of the next round.
        """,
        short_description="Grants invisibility while not attacking",
    ))

    apparel.append(MagicItem(
        name="Cloak of Mist",
        level=8,
        material_type='cloak',
        tags=['Fog', 'Manifestation'],
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
        material_type='cloak',
        tags=['Fog', 'Manifestation'],
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
        level=8,
        material_type='cloak',
        tags=['Sensation', 'Teleportation'],
        description="""
            As a standard action, you can spend an \\glossterm<action point> to use this item.
            If you do, you teleport to an unoccupied location within \\rngmed range of your original location.
            In addition, you become \\glossterm<invisible> unitl the end of the next round.

            If your intended destination is invalid, or if your teleportation otherwise fails, you still become invisible.
        """,
        short_description="Can teleport a short distance and grant invisibility",
    ))

    apparel.append(MagicItem(
        name="Hexward Cloak",
        level=10,
        material_type='cloak',
        tags=['Mystic'],
        description="""
            You gain a +4 bonus to defenses against \\glossterm<magical> abilities that target you directly.
            This does not protect you from abilities that affect an area.
        """,
        short_description="Grants +4 defenses against targeted magical attacks",
    ))

    apparel.append(MagicItem(
        name="Hexproof Cloak, Greater",
        level=18,
        material_type='cloak',
        tags=['Mystic'],
        description="""
            You gain a +8 bonus to defenses against \\glossterm<magical> abilities that target you directly.
            This does not protect you from abilities that affect an area.
        """,
        short_description="Grants +8 defenses against targeted magical attacks",
    ))

    # Belts

    apparel.append(MagicItem(
        name="Belt of Healing",
        level=1,
        material_type='belt',
        tags=['Life'],
        description="""
            When you use the \\textit<recover> ability, you heal +1d hit points.
        """,
        short_description="Grants +1d healing from the \\textit<recover> action",
    ))

    apparel.append(MagicItem(
        name="Belt of Healing, Greater",
        level=8,
        material_type='belt',
        tags=['Life'],
        description="""
            When you use the \\textit<recover> ability, you heal +2d hit points.
        """,
        short_description="Grants +2d healing from the \\textit<recover> action",
    ))

    apparel.append(MagicItem(
        name="Lifekeeping Belt",
        level=4,
        material_type='belt',
        tags=['Life'],
        description="""
            You reduce your \\glossterm<vital damage penalties> by 2.
        """,
        short_description="Reduces vital damage penalties by 2",
    ))

    apparel.append(MagicItem(
        name="Lifekeeping Belt, Greater",
        level=8,
        material_type='belt',
        tags=['Life'],
        description="""
            You reduce your \\glossterm<vital damage penalties> by 4.
        """,
        short_description="Reduces vital damage penalties by 4",
    ))

    apparel.append(MagicItem(
        name="Lifekeeping Belt, Supreme",
        level=12,
        material_type='belt',
        tags=['Life'],
        description="""
            You reduce your \\glossterm<vital damage penalties> by 6.
        """,
        short_description="Reduces vital damage penalties by 6",
    ))

    apparel.append(MagicItem(
        name="Ocular Circlet",
        level=3,
        material_type='circlet',
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
        material_type='circlet',
        tags=['Scrying'],
        description="""
            This item functions like the \\mitem<ocular circlet>, except that it only takes a \\glossterm<minor action> to activate and sustain the item's effect.
            In addition, the sensor appears anywhere within \\rngmed range.
        """,
        short_description="description",
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
    rows = [
        f"{item.name} & \\nth<{item.level}> & {item.short_description} & \\pageref<item:{item.name}> \\\\"
        for item in apparel
    ]
    row_text = '\n'.join(rows)
    return latexify(f"""
        \\begin<longtabuwrapper>
            \\begin<longtabu><l l X l>
                \\lcaption<Apparel Items> \\\\
                \\tb<Name> & \\tb<Level> & \\tb<Description> & \\tb<Page> \\\\
                \\bottomrule
                {row_text}
            \\end<longtabu>
        \\end<longtabuwrapper>
    """)


def sanity_check(armor, worn):
    pass

@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    apparel_latex = generate_apparel_latex()
    if output is None:
        print(apparel_latex)
    else:
        with open('../../core_book/apparel.tex', 'w') as apparel_description_file:
            apparel_description_file.write(apparel_latex)
        with open('../../core_book/apparel_table.tex', 'w') as apparel_table_file:
            apparel_table_file.write(generate_apparel_table())


if __name__ == "__main__":
    main()
