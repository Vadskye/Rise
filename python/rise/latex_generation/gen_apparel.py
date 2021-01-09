#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify, longtablify

def generate_armor():
    apparel = []

    apparel += [
        MagicItem(
            name="Protective Armor",
            level=4,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +1 Armor defense",
        ),
        MagicItem(
            name="Protective Armor, Greater",
            level=10,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +2 Armor defense",
        ),
        MagicItem(
            name="Protective Armor, Supreme",
            level=16,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +3 Armor defense",
        ),
        MagicItem(
            name="Protective Shield",
            level=4,
            material_type='Shield',
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +1 Armor defense",
        ),
        MagicItem(
            name="Protective Shield, Greater",
            level=10,
            material_type='Shield',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +2 Armor defense",
        ),
        MagicItem(
            name="Protective Shield, Supreme",
            level=16,
            material_type='Shield',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +3 Armor defense",
        ),
    ]

    apparel += [
        MagicItem(
            name="Ring of Protection",
            level=4,
            material_type='Ring',
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to Fortitude, Reflex, and Mental defense.
            """,
            short_description="Grants +1 non-Armor defenses",
        ),
        MagicItem(
            name="Ring of Protection, Greater",
            level=10,
            material_type='Ring',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Fortitude, Reflex, and Mental defense.
            """,
            short_description="Grants +2 non-Armor defenses",
        ),
        MagicItem(
            name="Ring of Protection, Greater",
            level=16,
            material_type='Ring',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Fortitude, Reflex, and Mental defense.
            """,
            short_description="Grants +3 non-Armor defenses",
        ),
    ]

    apparel += [
        MagicItem(
            name='Shield of Arrow Catching',
            level=5,
            material_type='Shield',
            description="""
                When an \\glossterm<ally> within a \\areasmall radius emanation from you would be attacked by a ranged weapon, the attack is redirected to target you instead.
                Resolve the attack as if it had initially targeted you, except that the attack is not affected by cover or concealment.
                This item can only affect projectiles and thrown objects that are Small or smaller.
            """,
            short_description="Redirects small nearby projectiles to hit you",
        ),
        MagicItem(
            name='Shield of Arrow Catching, Greater',
            level=11,
            material_type='Shield',
            description="""
                This item functions like a \\mitem<shield of arrow catching>, except that it affects a \\arealarge radius from you.
            """,
            short_description="Redirects small projectiles to hit you",
        ),
        MagicItem(
            name='Shield of Boulder Catching',
            level=8,
            material_type='Shield',
            description="""
                This item functions like a \\mitem<shield of arrow catching>, except that it can affect projectile and thrown objects of up to Large size.
            """,
            short_description="Redirects large nearby projectiles to hit you",
        ),
        MagicItem(
            name='Shield of Boulder Catching, Greater',
            level=14,
            material_type='Shield',
            description="""
                This item functions like a \\mitem<greater shield of arrow catching>, except that it can affect projectile and thrown objects of up to Large size.
            """,
            short_description="Redirects large projectiles to hit you",
        ),
    ]

    apparel += [
        MagicItem(
            name="Shield of Arrow Deflection",
            level=5,
            material_type='Shield',
            description="""
                You gain a +2 bonus to defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
            """,
            short_description="Grants +2 defenses vs small projectiles",
        ),
        MagicItem(
            name="Shield of Arrow Deflection, Greater",
            level=11,
            material_type='Shield',
            description="""
                You gain a +4 bonus to defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
            """,
            short_description="Grants +4 defenses vs small projectiles",
        ),
        MagicItem(
            name="Shield of Arrow Deflection, Supreme",
            level=17,
            material_type='Shield',
            description="""
                You gain a +6 bonus to defenses against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
            """,
            short_description="Grants +6 defenses vs small projectiles",
        ),
        MagicItem(
            name="Shield of Boulder Deflection",
            level=8,
            material_type='Shield',
            description="""
                This item functions like a \\mitem<shield of arrow deflection>, except that it can affect weapons and projectiles of up to Large size.
            """,
            short_description="Grants +2 defenses vs projectiles",
        ),
        MagicItem(
            name="Shield of Boulder Deflection, Greater",
            level=14,
            material_type='Shield',
            description="""
                This item functions like a \\mitem<greater shield of arrow deflection>, except that it can affect weapons and projectiles of up to Large size.
            """,
            short_description="Grants +4 defenses vs projectiles",
        ),
    ]

    apparel += [
        MagicItem(
            name="Shield of Bashing",
            # -1 level relative to a potency weapon due to being more limited
            level=3,
            material_type='Shield',
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
            """,
            short_description="Grants +2 power with strikes",
        ),
        MagicItem(
            name="Shield of Bashing, Greater",
            level=9,
            material_type='Shield',
            description="""
                You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
            """,
            short_description="Grants +4 power with strikes",
        ),
        MagicItem(
            name="Shield of Bashing, Supreme",
            level=15,
            material_type='Shield',
            description="""
                You gain a +8 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using this shield.
            """,
            short_description="Grants +8 power with strikes",
        ),
    ]

    apparel += [
        MagicItem(
            name="Armor of Energy Resistance",
            level=4,
            tags=[],
            material_type='Body armor',
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<resistance> against \\glossterm<energy damage>.
                When you resist energy damage, this item sheds light as a torch until the end of the next round.
                The color of the light depends on the energy damage resisted: blue for cold, yellow for electricity, and red for fire.
            """,
            short_description="Grants +4 energy resistance",
        ),
        MagicItem(
            name="Armor of Energy Resistance, Greater",
            level=10,
            tags=[],
            material_type='Body armor',
            description="""
                This item functions like \\mitem<armor of energy resistance>, except that the bonus is equal to +8.
            """,
            short_description="Grants +8 energy resistance",
        ),
        MagicItem(
            name="Armor of Energy Resistance, Supreme",
            level=16,
            tags=[],
            material_type='Body armor',
            description="""
                This item functions like \\mitem<armor of energy resistance>, except that the bonus is equal to +16.
            """,
            short_description="Grants +16 energy resistance",
        ),
        MagicItem(
            name="Ring of Energy Resistance",
            # +2 level since ring is secondary for this effect
            level=6,
            tags=[],
            material_type='Ring',
            description="""
                You gain a +4 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<energy damage>.
                When you resist energy damage, this item sheds light as a torch until the end of the next round.
                The color of the light depends on the energy damage resisted: blue for cold, yellow for electricity, and red for fire.
            """,
            short_description="Grants +4 energy resistance",
        ),
        MagicItem(
            name="Ring of Energy Resistance, Greater",
            level=12,
            tags=[],
            material_type='Ring',
            description="""
                This item functions like a \\mitem<ring of energy resistance>, except that the bonus is equal to +8.
            """,
            short_description="Grants +8 energy resistance",
        ),
        MagicItem(
            name="Ring of Energy Resistance, Supreme",
            level=18,
            tags=[],
            material_type='Ring',
            description="""
                This item functions like a \\mitem<ring of energy resistance>, except that the bonus is equal to +16.
            """,
            short_description="Grants +16 energy resistance",
        ),
    ]

    apparel += [
        MagicItem(
            name="Featherlight Armor",
            level=5,
            material_type='Body armor',
            description="""
                This armor's \\glossterm<encumbrance> is reduced by 1.
            """,
            short_description="Reduces encumbrance by 1",
        ),
        MagicItem(
            name="Featherlight Armor, Greater",
            level=11,
            material_type='Body armor',
            description="""
                This armor's \\glossterm<encumbrance> is reduced by 2.
            """,
            short_description="Reduces encumbrance by 2",
        ),
        MagicItem(
            name="Featherlight Armor, Supreme",
            level=17,
            material_type='Body armor',
            description="""
                This armor's \\glossterm<encumbrance> is reduced by 3.
            """,
            short_description="Reduces encumbrance by 3",
        ),
    ]

    apparel += [
        MagicItem(
            name="Armor of Fortification",
            level=8,
            material_type='Body armor',
            description="""
                You gain a +4 bonus to defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Reduces critical hits from strikes",
        ),
        MagicItem(
            name="Armor of Fortification, Greater",
            level=17,
            material_type='Body armor',
            description="""
                You gain a +8 bonus to defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Drastically reduces critical hits from strikes",
        ),
        MagicItem(
            name="Armor of Fortification, Mystic",
            level=14,
            material_type='Body armor',
            description="""
                You gain a +4 bonus to defenses when determining whether any attack gets a \\glossterm<critical hit> against you instead of a normal hit.
            """,
            short_description="Reduces critical hits from magical attacks",
        ),
    ]

    apparel += [
        MagicItem(
            name="Hidden Armor",
            level=3,
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
        ),
        MagicItem(
            name="Hidden Armor, Greater",
            level=9,
            material_type='Body armor',
            tags=['Sensation'],
            description="""
                This item functions like \\mitem<hidden armor>, except that the item also makes sound appropriate to its disguised form while disguised.
            """,
            short_description="Can look and sound like normal clothing",
        ),
    ]

    apparel += [
        MagicItem(
            name="Armor of Kinetic Absorption",
            level=4,
            tags=[],
            material_type='Body armor',
            description="""
                You gain a +4 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<physical damage>.
            """,
            short_description="Grants +4 physical resistance",
        ),
        MagicItem(
            name="Armor of Kinetic Absorption, Greater",
            level=10,
            tags=[],
            material_type='Body armor',
            description="""
                You gain a +8 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<physical damage>.
            """,
            short_description="Grants +8 physical resistance",
        ),
        MagicItem(
            name="Armor of Kinetic Absorption, Supreme",
            level=16,
            tags=[],
            material_type='Body armor',
            description="""
                You gain a +16 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<physical damage>.
            """,
            short_description="Grants +16 physical resistance",
        ),
        MagicItem(
            name="Amulet of Kinetic Absorption",
            # +2 since amulet is secondary for this effect
            level=6,
            tags=[],
            material_type='Amulet',
            description="""
                You gain a +4 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<physical damage>.
            """,
            short_description="Grants +4 physical resistance",
        ),
        MagicItem(
            name="Amulet of Kinetic Absorption, Greater",
            level=12,
            tags=[],
            material_type='Amulet',
            description="""
                You gain a +8 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<physical damage>.
            """,
            short_description="Grants +8 physical resistance",
        ),
        MagicItem(
            name="Amulet of Kinetic Absorption, Supreme",
            level=18,
            tags=[],
            material_type='Amulet',
            description="""
                You gain a +16 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<physical damage>.
            """,
            short_description="Grants +16 physical resistance",
        ),
    ]

    apparel += [
        MagicItem(
            name="Armor of Invulnerability",
            level=7,
            tags=[],
            material_type='Body armor',
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<resistances> to both \\glossterm<physical damage> and \\glossterm<energy damage>.
            """,
            short_description="Grants +4 universal resistance",
        ),
        MagicItem(
            name="Armor of Invulnerability, Greater",
            level=13,
            tags=[],
            material_type='Body armor',
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<resistances> to both \\glossterm<physical damage> and \\glossterm<energy damage>.
            """,
            short_description="Grants +8 universal resistance",
        ),
        MagicItem(
            name="Armor of Invulnerability, Supreme",
            level=19,
            tags=[],
            material_type='Body armor',
            description="""
                You gain a +16 \\glossterm<magic bonus> to your \\glossterm<resistances> to both \\glossterm<physical damage> and \\glossterm<energy damage>.
            """,
            short_description="Grants +16 universal resistance",
        ),
    ]

    apparel += [
        MagicItem(
            name="Shield of Mystic Reflection",
            level=10,
            tags=[],
            material_type='Shield',
            description="""
                As a standard action, you can activate this shield.
                When you do, any \\glossterm<targeted> \\glossterm<magical> abilities that would target you this round are redirected to target the creature using that ability instead of you.
                Any other targets of the ability are affected normally.
                This is a \\glossterm<Swift> ability, so it affects any abilities targeting you in the phase you activate the item.
            """,
            short_description="React to reflect magical attacks",
        ),
        MagicItem(
            name="Shield of Mystic Reflection, Greater",
            level=19,
            material_type='Shield',
            tags=[],
            description="""
                This item functions like a \\mitem<shield of mystic reflection>, except that it also affects all \\glossterm<allies> in a \\areasmall radius from you.
            """,
            short_description="React to reflect magical attacks against allies",
        ),
    ]

    apparel.append(MagicItem(
        name="Acidic Armor",
        level=7,
        material_type='Body armor',
        tags=[],
        description="""
            At the end of each round, if this armor is making significant contact against a creature or object other than you and your equipment, make an attack vs. Fortitude against it.
            Generally, you can only affect another creature with this armor if you are \\glossterm<grappling> it.
            On a hit, the target takes 2d6 acid damage.
        """,
        short_description="Deals acid damage to anything it touches",
    ))

    apparel += [
        MagicItem(
            name="Agile Boots",
            level=3,
            material_type='Boots',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Reflex defense.
            """,
            short_description="Grants +2 Reflex defense",
        ),
        MagicItem(
            name="Agile Boots, Greater",
            level=9,
            material_type='Boots',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Reflex defense.
            """,
            short_description="Grants +3 Reflex defense",
        ),
        MagicItem(
            name="Agile Boots, Supreme",
            level=15,
            material_type='Boots',
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to Reflex defense.
            """,
            short_description="Grants +4 Reflex defense",
        ),
        MagicItem(
            name="Agile Armor",
            # +2 levels since armor is secondary for this effect
            level=5,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Reflex defense.
            """,
            short_description="Grants +2 Reflex defense",
        ),
        MagicItem(
            name="Agile Armor, Greater",
            level=11,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Reflex defense.
            """,
            short_description="Grants +3 Reflex defense",
        ),
        MagicItem(
            name="Agile Armor, Supreme",
            level=17,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to Reflex defense.
            """,
            short_description="Grants +4 Reflex defense",
        ),
    ]

    apparel += [
        MagicItem(
            name="Fortified Belt",
            level=3,
            material_type='Belt',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Fortitude defense.
            """,
            short_description="Grants +2 Fortitude defense",
        ),
        MagicItem(
            name="Fortified Belt, Greater",
            level=9,
            material_type='Belt',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Fortitude defense.
            """,
            short_description="Grants +3 Fortitude defense",
        ),
        MagicItem(
            name="Fortified Belt, Supreme",
            level=15,
            material_type='Belt',
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to Fortitude defense.
            """,
            short_description="Grants +4 Fortitude defense",
        ),
        MagicItem(
            name="Fortified Armor",
            # +2 levels since armor is secondary for this effect
            level=5,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Fortitude defense.
            """,
            short_description="Grants +2 Fortitude defense",
        ),
        MagicItem(
            name="Fortified Armor, Greater",
            level=11,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Fortitude defense.
            """,
            short_description="Grants +3 Fortitude defense",
        ),
        MagicItem(
            name="Fortified Armor, Supreme",
            level=17,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to Fortitude defense.
            """,
            short_description="Grants +4 Fortitude defense",
        ),
    ]

    apparel += [
        MagicItem(
            name="Willguard Amulet",
            level=3,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Mental defense.
            """,
            short_description="Grants +2 Mental defense",
        ),
        MagicItem(
            name="Willguard Amulet, Greater",
            level=9,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Mental defense.
            """,
            short_description="Grants +3 Mental defense",
        ),
        MagicItem(
            name="Willguard Amulet, Supreme",
            level=15,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to Mental defense.
            """,
            short_description="Grants +4 Mental defense",
        ),
        MagicItem(
            name="Willguard Armor",
            # +2 levels since armor is secondary for this effect
            level=5,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Mental defense.
            """,
            short_description="Grants +2 Mental defense",
        ),
        MagicItem(
            name="Willguard Armor, Greater",
            level=11,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Mental defense.
            """,
            short_description="Grants +3 Mental defense",
        ),
        MagicItem(
            name="Willguard Armor, Supreme",
            level=17,
            material_type='Body armor',
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to Mental defense.
            """,
            short_description="Grants +4 Mental defense",
        ),
    ]

    apparel += [
        MagicItem(
            name="Anchoring Armor",
            # +2 levels since armor is secondary for this effect
            level=7,
            material_type='Body armor',
            tags=[],
            description="""
                You are immune to \\glossterm<knockback> or \\glossterm<push> effects from attacks, unless the effects come from an attack that scores a \\glossterm<critical hit>.
                This does not make you immune to \\glossterm<teleportation>, and does not affect movement effects used by your \\glossterm<allies>.
            """,
            short_description="Protects you from most forced movement attacks",
        ),
        MagicItem(
            name="Anchoring Armor, Greater",
            level=13,
            material_type='Body armor',
            tags=[],
            description="""
                This item functions like \\mitem<anchoring armor>, except that you are also immune to \\glossterm<teleport> effects from attacks that are not critical hits.
            """,
            short_description="Protects you from most forced movement and teleportation attacks",
        ),
        MagicItem(
            name="Anchoring Armor, Supreme",
            level=19,
            material_type='Body armor',
            tags=[],
            description="""
                This item functions like \\mitem<anchoring armor>, except that the immunities apply even against critical hits.
            """,
            short_description="Protects you from all forced movement and teleportation attacks",
        ),
        MagicItem(
            name="Anchoring Boots",
            level=5,
            material_type='Boots',
            tags=[],
            description="""
                You are immune to \\glossterm<knockback> or \\glossterm<push> effects from attacks, unless the effects come from an attack that scores a \\glossterm<critical hit>.
                This does not make you immune to \\glossterm<teleportation>, and does not affect movement effects used by your \\glossterm<allies>.
            """,
            short_description="Protects you from most forced movement attacks",
        ),
        MagicItem(
            name="Anchoring Boots, Greater",
            level=11,
            material_type='Boots',
            tags=[],
            description="""
                These boots function like \\mitem<anchoring boots>, except that you are also immune to \\glossterm<teleport> effects from attacks that are not critical hits.
            """,
            short_description="Protects you from most forced movement and teleportation attacks",
        ),
        MagicItem(
            name="Anchoring Boots, Supreme",
            level=17,
            material_type='Boots',
            tags=[],
            description="""
                These boots function like \\mitem<anchoring boots>, except that the immunities apply even against critical hits.
            """,
            short_description="Protects you from all forced movement and teleportation attacks",
        ),
    ]

    apparel += [
        MagicItem(
            name="Boots of Translocation",
            level=5,
            material_type='Boots',
            tags=[],
            description="""
                As a standard action, you can \\glossterm<teleport> yourself into an unoccupied destination within \\rngshort range.
                If the destination is invalid, this ability has no effect.
            """,
            short_description="Grants ability to teleport up to 30 feet",
        ),
        MagicItem(
            name="Boots of Translocation, Greater",
            level=11,
            material_type='Boots',
            tags=[],
            description="""
                These boots function like \\mitem<boots of translocation>, except that the range increases to \\rngmed.
            """,
            short_description="Grants ability to teleport up to 60 feet",
        ),
        MagicItem(
            name="Boots of Translocation, Supreme",
            level=17,
            material_type='Boots',
            tags=[],
            description="""
                These boots function like \\mitem<boots of translocation>, except that the range increases to \\rnglong.
            """,
            short_description="Grants ability to teleport up to 120 feet",
        ),
        MagicItem(
            name="Armor of Translocation",
            # +2 levels since armor is secondary for this effect
            level=7,
            material_type='Body armor',
            tags=[],
            description="""
                As a standard action, you can \\glossterm<teleport> yourself into an unoccupied destination within \\rngshort range.
                If the destination is invalid, this ability has no effect.
            """,
            short_description="Grants ability to teleport up to 30 feet",
        ),
        MagicItem(
            name="Armor of Translocation, Greater",
            level=13,
            material_type='Body armor',
            tags=[],
            description="""
                This item functions like \\mitem<armor of translocation>, except that the range increases to \\rngmed.
            """,
            short_description="Grants ability to teleport up to 60 feet",
        ),
        MagicItem(
            name="Armor of Translocation, Supreme",
            level=19,
            material_type='Body armor',
            tags=[],
            description="""
                This item functions like \\mitem<armor of translocation>, except that the range increases to \\rnglong.
            """,
            short_description="Grants ability to teleport up to 120 feet",
        ),
    ]

    apparel.append(MagicItem(
        name="Shield of Medusa",
        level=8,
        material_type='Shield',
        tags=['Visual'],
        description="""
            This shield normally has a cloth covering its face.
            As a standard action, you can pull the cloth back and reveal the horrifying face emblazoned on the shield.
            When you do, make an attack vs. Fortitude against each creature within a \\areasmall cone.
            On a hit, each target with no remaining \\glossterm<resistance> to \\glossterm<physical damage> is \\glossterm<nauseated> until the end of the next round.
            On a \\glossterm<critical hit>, each target with no remaining \\glossterm<resistance> to \\glossterm<physical damage> is \\glossterm<paralyzed> until the end of the next round.
            In either case, each target is immune to this ability until it takes a \\glossterm<short rest>.

            If the cloth is prematurely pulled back, allowing creatures to see the shield without a dramatic reveal, the shield has no effect.
        """,
        short_description="Grants ability to briefly nauseate nearby foes",
    ))

    # Other

    return apparel

def generate_worn():
    apparel = []

    # Arm

    apparel += [
        MagicItem(
            name="Mystic Gloves",
            # +2 since gloves are secondary for power
            level=6,
            material_type='Glove',
            description="""
                You gain a +2 \\glossterm<magic bonus> to your \\glossterm<magical> \\glossterm<power>.
            """,
            short_description="Grants +2 \\glossterm<magical> power",
        ),
        MagicItem(
            name="Mystic Gloves, Greater",
            # +2 since gloves are secondary for power
            level=12,
            material_type='Gauntlet',
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<magical> \\glossterm<power>.
            """,
            short_description="Grants +4 \\glossterm<magical> power",
        ),
        MagicItem(
            name="Mystic Gloves, Supreme",
            # +2 since gloves are secondary for power
            level=18,
            material_type='Gauntlet',
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<magical> \\glossterm<power>.
            """,
            short_description="Grants +8 \\glossterm<magical> power",
        ),
    ]

    apparel += [
        MagicItem(
            name="Titan Gauntlets",
            # +2 since gauntlets are secondary for power
            level=6,
            material_type='Gauntlet',
            description="""
                You gain a +2 \\glossterm<magic bonus> to your \\glossterm<mundane> \\glossterm<power>.
            """,
            short_description="Grants +2 \\glossterm<mundane> power",
        ),
        MagicItem(
            name="Titan Gauntlets, Greater",
            # +2 since gauntlets are secondary for power
            level=12,
            material_type='Gauntlet',
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<mundane> \\glossterm<power>.
            """,
            short_description="Grants +4 \\glossterm<mundane> power",
        ),
        MagicItem(
            name="Titan Gauntlets, Supreme",
            # +2 since gauntlets are secondary for power
            level=18,
            material_type='Gauntlet',
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<mundane> \\glossterm<power>.
            """,
            short_description="Grants +8 \\glossterm<mundane> power",
        ),
    ]

    apparel += [
        MagicItem(
            name="Gauntlets of Defense",
            level=7,
            material_type='Gauntlet',
            description="""
                You gain a +1 \\glossterm<magic bonus> to Armor defense.
                In addition, when you would be \\glossterm<defenseless>, these gauntlets manifest a glowing shield that helps protect you from attack.
                This prevents you from ever being \\glossterm<defenseless>.
            """,
            short_description="Grants +1 Armor defense, cannot be defenseless",
        ),
        MagicItem(
            name="Gauntlets of Defense, Greater",
            level=13,
            material_type='Gauntlet',
            description="""
                These gauntlets functions \\mitem<gauntlets of defense>, except that the bonus increases to +2.
            """,
            short_description="Grants +2 Armor defense, cannot be defenseless",
        ),
        MagicItem(
            name="Gauntlets of Defense, Supreme",
            level=19,
            material_type='Gauntlet',
            description="""
                These gauntlets functions \\mitem<gauntlets of defense>, except that the bonus increases to +3.
            """,
            short_description="Grants +3 Armor defense, cannot be defenseless",
        ),
    ]

    apparel += [
        MagicItem(
            name="Bracers of Archery",
            level=1,
            material_type='Bracers',
            description="""
                You are proficient with bows.
            """,
            short_description="Grants bow proficiency",
        ),
        MagicItem(
            name="Bracers of Archery, Greater",
            level=7,
            material_type='Bracers',
            description="""
                You are proficient with bows.
                In addition, you gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with ranged \\glossterm<strikes>.
            """,
            short_description="Grants bow proficiency, +1 ranged accuracy",
        ),
    ]

    apparel += [
        MagicItem(
            name="Bracers of Armor",
            level=2,
            material_type='Bracers',
            tags=[],
            description="""
                You gain a +2 bonus to Armor defense.
                The protection from these bracers is treated as body armor, and it does not stack with any other body armor you wear.
            """,
            short_description="Grants invisible armor",
        ),
    ]

    apparel += [
        MagicItem(
            name="Bracers of Repulsion",
            level=7,
            material_type='Bracers',
            description="""
                As a standard action, you can activate these bracers.
                When you do, they emit a telekinetic burst of force.
                Make an attack vs. Fortitude against everything within a \\areasmall radius burst from you.
                If you use this item during the \\glossterm<delayed action phase>,
                    you gain a +4 bonus to \\glossterm<accuracy> with this attack against any creature that attacked you during the \\glossterm<action phase>.
                On a hit, you \\glossterm<knockback> each target up to 20 feet in a straight line directly away from you.
            """,
            short_description="Can knock nearby creatures back",
        ),
        MagicItem(
            name="Bracers of Repulsion, Greater",
            level=16,
            material_type='Bracers',
            description="""
                These bracers function like \\mitem<bracers of repulsion>, except that it targets your \\glossterm<enemies> within a \\arealarge radius burst.
            """,
            short_description="Can knock enemies back",
        ),
    ]

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

    apparel += [
        MagicItem(
            name="Gauntlets of Improvisation",
            level=3,
            material_type='Gauntlet',
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using \\glossterm<improvised weapons>.
            """,
            short_description="Grants +2 power with improvised weapons",
        ),
        MagicItem(
            name="Gauntlets of Improvisation, Greater",
            level=9,
            material_type='Gauntlet',
            description="""
                You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using \\glossterm<improvised weapons>.
            """,
            short_description="Grants +4 power with improvised weapons",
        ),
        MagicItem(
            name="Gauntlets of Improvisation, Supreme",
            level=15,
            material_type='Gauntlet',
            description="""
                You gain a +8 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using \\glossterm<improvised weapons>.
            """,
            short_description="Grants +8 power with improvised weapons",
        ),
    ]

    apparel += [
        MagicItem(
            name="Gauntlet of the Ram",
            level=6,
            material_type='Gauntlet',
            description="""
                This item has the Forceful \\glossterm<weapon tag> (see \\pcref<Weapon Tags>).
            """,
            short_description="Knocks back foe when used to strike",
        ),
        MagicItem(
            name="Gauntlet of the Ram, Greater",
            level=14,
            material_type='Gauntlet',
            description="""
                This item has the Forceful \\glossterm<weapon tag> (see \\pcref<Weapon Tags>).
                In addition, the \\glossterm<knockback> distance from that tag increases to 30 feet.
            """,
            short_description="Knocks back foe farther when use to strike",
        ),
    ]

    apparel += [
        MagicItem(
            name="Greatreach Bracers",
            level=12,
            material_type='Bracers',
            description="""
                You gain a +5 foot \\glossterm<magic bonus> to your \\glossterm<reach> with melee weapons.
            """,
            short_description="Increases reach by five feet",
        ),
        MagicItem(
            name="Greatreach Bracers, Greater",
            level=20,
            material_type='Bracers',
            description="""
                You gain a +10 foot \\glossterm<magic bonus> to your \\glossterm<reach> with melee weapons.
            """,
            short_description="Increases reach by ten feet",
        ),
    ]

    apparel.append(MagicItem(
        name="Throwing Gloves",
        level=5,
        material_type='Gloves',
        description="""
            % TODO: reference basic "not designed to be thrown" mechanics?
            You can throw any item as if it was designed to be thrown.
            This does not improve your ability to throw items designed to be thrown, such as darts.
        """,
        short_description="Allows throwing any item accurately",
    ))\

    # Head

    apparel += [
        # close range, +1d = rank 2 spell, so this is priced as rank 3
        # This could be med range +0d, but that's weird as a legacy item choice
        MagicItem(
            name="Circlet of Blasting",
            level=7,
            material_type='Circlet',
            tags=[],
            description="""
                As a standard action, you can activate this circlet.
                If you do, make an attack vs. Armor against a creature or object within \\rngshort range.
                \\hit The target takes 2d10+3 fire damage.
                \\glance As above, except that that the target takes half damage.
            """,
            short_description="Can blast foe with fire",
        ),
        # close range, +2d = rank 4 spell, so this is priced as rank 5
        MagicItem(
            name="Circlet of Blasting, Greater",
            level=13,
            material_type='Circlet',
            tags=[],
            description="""
                As a standard action, you can activate this circlet.
                If you do, make an attack vs. Armor against a creature or object within \\rngshort range.
                \\hit The target takes 4d10+6 fire damage.
                \\glance As above, except that that the target takes half damage.
            """,
            short_description="Can blast foe with intense fire",
        ),
        # close range, +3d = rank 6 spell, so this is priced as rank 7
        MagicItem(
            name="Circlet of Blasting, Supreme",
            level=19,
            material_type='Circlet',
            tags=[],
            description="""
                As a standard action, you can activate this circlet.
                If you do, make an attack vs. Armor against a creature or object within \\rngmed range.
                \\hit The target takes 7d10+9 fire damage.
                \\glance As above, except that that the target takes half damage.
            """,
            short_description="Can blast foe with supremely intense fire",
        ),
    ]

    apparel += [
        MagicItem(
            name="Circlet of Persuasion",
            level=1,
            material_type='Circlet',
            description="""
                You gain a +2 \\glossterm<magic bonus> to the Persuasion skill (see \\pcref<Persuasion>).
            """,
            short_description="Grants +2 Persuasion",
        ),
        MagicItem(
            name="Circlet of Persuasion, Greater",
            level=7,
            material_type='Circlet',
            description="""
                You gain a +3 \\glossterm<magic bonus> to the Persuasion skill (see \\pcref<Persuasion>).
            """,
            short_description="Grants +3 Persuasion",
        ),
        MagicItem(
            name="Circlet of Persuasion, Supreme",
            level=13,
            material_type='Circlet',
            description="""
                You gain a +4 \\glossterm<magic bonus> to the Persuasion skill (see \\pcref<Persuasion>).
            """,
            short_description="Grants +4 Persuasion",
        ),
    ]

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
        name="Amulet of Breath",
        level=1,
        material_type='Amulet',
        tags=[],
        description="""
            As a \\glossterm<minor action>, you can spend a \\glossterm<fatigue point> to activate this item.
            When you do, you can breathe in clean, fresh air until the end of the next round, regardless of your environment.
            This can be used in emergencies to save yourself from drowning or other perils.
        """,
        short_description="Allows limited breathing",
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

    apparel += [
        MagicItem(
            name="Crown of Flame",
            level=10,
            material_type='Crown',
            tags=[],
            description="""
                This crown is continuously on fire.
                The flame sheds light as a torch.

                You and your \\glossterm<allies> within a \\areamed radius emanation from you
                    gain a +8 bonus to their \\glossterm<resistance> against cold and fire damage.
            """,
            short_description="Grants nearby alies +8 cold and fire resistance",
        ),
        MagicItem(
            name="Crown of Flame, Greater",
            level=16,
            material_type='Crown',
            tags=[],
            description="""
                This crown is continuously on fire.
                The flame sheds light as a torch.

                You and your \\glossterm<allies> within a \\areamed radius emanation from you
                    gain a +16 bonus to their \\glossterm<resistance> against fire damage.
            """,
            short_description="Grants nearby alies +16 cold and fire resistance",
        )
    ]

    apparel.append(MagicItem(
        name="Crown of Lightning",
        level=7,
        material_type='Crown',
        tags=[],
        description="""
            This crown continuously crackles with electricity.
            The constant sparks shed light as a torch.

            As a standard action, you can intensify the crown's energy to shock nearby enemies.
            When you do, make an attack vs. Fortitude against your \\glossterm<enemies> within a \\areasmall radius from you.
            On a hit, each target takes 2d6+1 electricity damage.
            On a \\glossterm<glancing blow>, each target takes half damage.
        """,
        short_description="Can damage nearby enemies",
    ))

    apparel.append(MagicItem(
        name="Crown of Frost",
        level=13,
        material_type='Crown',
        tags=[],
        description="""
            This crown continuously emits a chilling aura around you.
            You gain a +8 bonus to your \\glossterm<resistance> against fire damage.

            As a standard action, you can intensify the crown's energy to freeze nearby enemies.
            When you do, make an attack vs. Fortitude against all \\glossterm<enemies> within a \\areasmall radius from you.
            On a hit, each target with no remaining \\glossterm<resistance> to cold damage is \\glossterm<immobilized> until the end of the next round.
            On a critical hit, each target with no remaining \\glossterm<resistance> to cold damage is immobilized as a \\glossterm<condition>.
        """,
        short_description="Can freeze nearby enemies",
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
            \\hit Each target takes bludgeoning damage equal to the damage you took from falling.
            \\crit As above, and each target is knocked \\glossterm<prone>.
            This does not deal double damage on a critical hit.
        """,
        short_description="Deals your falling damage to enemies",
    ))

    apparel += [
        MagicItem(
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
        ),
        MagicItem(
            name="Boots of the Skydancer, Greater",
            level=13,
            material_type='Boots',
            tags=['Swift'],
            description="""
                These boots function like \\magicitem<boots of the skydancer>, except that the ability lasts until the end of the round.
                In addition, you can use this item twice before the boots touch the ground.
            """,
            short_description="description",
        ),
    ]

    apparel.append(MagicItem(
        name="Boots of Freedom",
        level=12,
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

    apparel += [
        MagicItem(
            name="Boots of Speed",
            level=7,
            material_type='Boots',
            tags=[],
            description="""
                You gain a +10 foot \\glossterm<magic bonus> to your land speed, up to a maximum of double your normal speed.
            """,
            short_description="Increases speed by ten feet",
        ),
        MagicItem(
            name="Boots of Speed, Greater",
            level=13,
            material_type='Boots',
            tags=[],
            description="""
                You gain a +20 foot \\glossterm<magic bonus> to your land speed, up to a maximum of double your normal speed.
            """,
            short_description="Increases speed by twenty feet",
        ),
        MagicItem(
            name="Boots of Speed, Supreme",
            level=19,
            material_type='Boots',
            tags=[],
            description="""
                You gain a +30 foot \\glossterm<magic bonus> to your land speed, up to a maximum of double your normal speed.
            """,
            short_description="Increases speed by thirty feet",
        ),
    ]

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
            As a standard action, you can activate these boots.
            When you do, you gain a \\glossterm<fatigue point> and teleport horizontally exactly 25 miles in a direction you specify.
            If this would place you within a solid object or otherwise impossible space, the boots will shunt you up to 1,000 feet in any direction to the closest available space.
            If there is no available space within 1,000 feet of your intended destination, the effect fails and you take 4d6 energy damage.
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

    apparel += [
        MagicItem(
            name="Boots of Elvenkind",
            level=1,
            material_type='Boots',
            description="""
                You gain a +2 \\glossterm<magic bonus> to the Stealth skill (see \\pcref<Stealth>).
            """,
            short_description="Grants +2 Stealth",
        ),
        MagicItem(
            name="Boots of Elvenkind, Greater",
            level=7,
            material_type='Boots',
            description="""
                You gain a +3 \\glossterm<magic bonus> to the Stealth skill (see \\pcref<Stealth>).
            """,
            short_description="Grants +3 Stealth",
        ),
        MagicItem(
            name="Boots of Elvenkind, Supreme",
            level=13,
            material_type='Boots',
            description="""
                You gain a +4 \\glossterm<magic bonus> to the Stealth skill (see \\pcref<Stealth>).
            """,
            short_description="Grants +4 Stealth",
        ),
    ]

    # Rings

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


    apparel += [
        MagicItem(
            name="Amulet of the True Form",
            level=3,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +4 bonus to defenses against abilities from the \\sphere<polymorph> sphere.
                This bonus also applies against other attacks that significantly alter your physical form, such as an aboleth's slime.
            """,
            short_description="Grants +4 defenses vs form-altering attacks",
        ),
        MagicItem(
            name="Amulet of the True Form, Greater",
            level=9,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +8 bonus to defenses against abilities from the \\textit<polymorph> sphere.
                This bonus also applies against other attacks that significantly alter your physical form, such as an aboleth's slime.
            """,
            short_description="Grants +8 defenses vs form-altering attacks",
        ),
        MagicItem(
            name="Amulet of the True Form, Supreme",
            level=15,
            material_type='Amulet',
            tags=[],
            description="""
                You are immune to attacks from the \\textit<polymorph> sphere.
                This immunity also applies against other attacks that significantly alter your physical form, such as an aboleth's slime.
            """,
            short_description="Grants immunity to form-altering attacks",
        ),
    ]

    apparel += [
        MagicItem(
            name="Amulet of Honeyed Words",
            level=4,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to the Deception, Intimidate and Persuasion skills.
            """,
            short_description="Grants +2 to social skills",
        ),
        MagicItem(
            name="Amulet of Honeyed Words, Greater",
            level=10,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to the Deception, Intimidate and Persuasion skills.
            """,
            short_description="Grants +3 to social skills",
        ),
        MagicItem(
            name="Amulet of Honeyed Words, Supreme",
            level=16,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to the Deception, Intimidate and Persuasion skills.
            """,
            short_description="Grants +4 to social skills",
        ),
    ]

    apparel += [
        MagicItem(
            name="Periapt of Proof Against Poison",
            level=2,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +4 bonus to defenses against \\glossterm<poisons>.
            """,
            short_description="Grants +4 defenses vs poisons",
        ),
        MagicItem(
            name="Periapt of Proof Against Poison, Greater",
            level=8,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +8 bonus to defenses against \\glossterm<poisons>.
            """,
            short_description="Grants +8 defenses vs poisons",
        ),
        MagicItem(
            name="Periapt of Proof Against Poison, Supreme",
            level=14,
            material_type='Amulet',
            tags=[],
            description="""
                You are immune to \\glossterm<poisons>.
            """,
            short_description="Grants immunity to poisons",
        ),
    ]


    apparel += [
        MagicItem(
            name="Ring of Blessed Protection",
            level=5,
            material_type='Ring',
            tags=[],
            description="""
                Whenever you are hit by a \\glossterm<critical hit> from a \\glossterm<strike>, you may spend two \\glossterm<fatigue points> to activate this item.
                If you do, the attacker rerolls the attack against you, which may prevent the attack from getting a critical hit against you.
                This does not protect any other targets of the attack.
                You can choose to use this item after you learn the effects that the critical hit would have, but you must do so during the phase that the attack was made.
            """,
            short_description="Can protect against critical strikes",
        ),
        MagicItem(
            name="Ring of Blessed Protection, Greater",
            level=11,
            material_type='Ring',
            tags=[],
            description="""
                This item functions like a \\textit<ring of blessed protection>, except that it protects against any \\glossterm<mundane> attack, not just strikes.
            """,
            short_description="Can protect against critical mundane attacks",
        ),
        MagicItem(
            name="Ring of Blessed Protection, Supreme",
            level=17,
            material_type='Ring',
            tags=[],
            description="""
                This item functions like a \\textit<ring of blessed protection>, except that it protects against any attack, not just strikes.
            """,
            short_description="Can protect against critical attacks",
        ),
    ]

    apparel += [
        MagicItem(
            name="Ring of Nourishment",
            level=3,
            material_type='Ring',
            tags=['Creation'],
            description="""
                You continuously gain nourishment, and no longer need to eat or drink.
                This ring must be worn for 24 hours before it begins to work.
            """,
            short_description="Provides food and water",
        ),
        MagicItem(
            name="Ring of Sustenance",
            level=7,
            material_type='Ring',
            tags=['Creation'],
            description="""
                You continuously gain nourishment, and no longer need to eat or drink.
                The ring must be worn for 24 hours before it begins to work.

                In addition, you need only one-quarter your normal amount of sleep (or similar activity, such as elven trance) each day.
                """,
                short_description="Provides food, water, and rest",
        ),
    ]

    apparel.append(MagicItem(
        name="Ring of Regeneration",
        level=15,
        material_type='Ring',
        tags=[],
        description="""
            A the end of each round, you can remove one of your \\glossterm<vital wounds>.
            If you do, you gain two \\glossterm<fatigue points>.
        """,
        short_description="Automatically removes vital wounds",
    ))

    # Amulets

    apparel += [
        MagicItem(
            name="Amulet of Mighty Fists",
            level=4,
            material_type='Amulet',
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using \\glossterm<unarmed attacks> and natural weapons.
            """,
            short_description="Grants +2 power with natural and unarmed attacks",
        ),
        MagicItem(
            name="Amulet of Mighty Fists, Greater",
            level=10,
            material_type='Amulet',
            description="""
                You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using \\glossterm<unarmed attacks> and natural weapons.
            """,
            short_description="Grants +4 power with natural and unarmed attacks",
        ),
        MagicItem(
            name="Amulet of Mighty Fists, Supreme",
            level=16,
            material_type='Amulet',
            description="""
                You gain a +8 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using \\glossterm<unarmed attacks> and natural weapons.
            """,
            short_description="Grants +8 power with natural and unarmed attacks",
        ),
    ]

    apparel += [
        MagicItem(
            # +1 level since max HP has odd level scaling
            name="Amulet of Health",
            level=5,
            material_type='Amulet',
            description="""
                You increase your maximum \\glossterm<hit points> by 8.
                When this item stops affecting you, you lose 8 \\glossterm<hit points>.
            """,
            short_description="Grants 8 additional hit points",
        ),
        MagicItem(
            name="Amulet of Health, Greater",
            level=11,
            material_type='Amulet',
            description="""
                You increase your maximum \\glossterm<hit points> by 16.
                When this item stops affecting you, you lose 16 \\glossterm<hit points>.
            """,
            short_description="Grants 16 additional hit points",
        ),
        MagicItem(
            name="Amulet of Health, Supreme",
            level=17,
            material_type='Amulet',
            description="""
                You increase your maximum \\glossterm<hit points> by 32.
                When this item stops affecting you, you lose 32 \\glossterm<hit points>.
            """,
            short_description="Grants 32 additional hit points",
        ),
    ]

    apparel.append(MagicItem(
        name="Amulet of the Planes",
        level=12,
        material_type='Amulet',
        tags=[],
        description="""
            When you perform the \\ritual<plane shift> ritual, this amulet provides all \\glossterm<fatigue points> required.
            This does not grant you the ability to perform the \\ritual<plane shift> ritual if you could not already.
        """,
        short_description="Aids travel with \\ritual<plane shift>",
    ))

    apparel += [
        MagicItem(
            name="Amulet of Nondetection",
            level=6,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +4 bonus to defenses against abilities with the \\glossterm<Detection> or \\glossterm<Scrying> tags.
            """,
            short_description="Grants +4 to defenses against detection",
        ),
        MagicItem(
            name="Amulet of Nondetection, Greater",
            level=14,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +8 bonus to defenses against abilities with the \\glossterm<Detection> or \\glossterm<Scrying> tags.
            """,
            short_description="Grants +8 to defenses against detection",
        ),
    ]

    # Cloaks

    apparel += [
        MagicItem(
            name="Quilled Cloak",
            level=6,
            material_type='Cloak',
            tags=[],
            description="""
                Whenever a creature grapples you, you immediately deal it 2d6+3 piercing damage.
                This does not affect creatures that you initiate a grapple with.
            """,
            short_description="Deals damage to creatures that grapple you",
        ),
        MagicItem(
            name="Greater Quilled Cloak",
            level=12,
            material_type='Cloak',
            tags=[],
            description="""
                Whenever a creature grapples you, you immediately deal it 4d6+6 piercing damage.
                This does not affect creatures that you initiate a grapple with.
            """,
            short_description="Deals more damage to creatures that grapple you",
        ),
        MagicItem(
            name="Supreme Quilled Cloak",
            level=18,
            material_type='Cloak',
            tags=[],
            description="""
                Whenever a creature grapples you, you immediately deal it 5d10+9 piercing damage.
                This does not affect creatures that you initiate a grapple with.
            """,
            short_description="Deals even more damage to creatures that grapple you",
        ),
    ]

    apparel.append(MagicItem(
        name="Avian Cloak",
        level=9,
        material_type='Cloak',
        tags=[],
        description="""
            You gain a \\glossterm<glide speed> equal to your \\glossterm<base speed>.
        """,
        short_description="Grants a glide speed",
    ))

    apparel += [
        MagicItem(
            name="Assassin's Cloak",
            level=8,
            material_type='Cloak',
            tags=['Sensation'],
            description="""
                At the end of each round, if you took no actions that round, you become \\glossterm<invisible>.
                This invisibility ends after you take any action.
            """,
            short_description="Grants invisibility while inactive",
        ),
        MagicItem(
            name="Assassin's Cloak, Greater",
            level=17,
            material_type='Cloak',
            tags=['Sensation'],
            description="""
                At the end of each round, if you took no actions that round, you become \\glossterm<invisible> until the end of the next round.
            """,
            short_description="Grants longer invisibility while inactive",
        ),
    ]

    apparel += [
        MagicItem(
            name="Cloak of Mist",
            level=8,
            material_type='Cloak',
            tags=['Manifestation'],
            description="""
                Fog constantly fills a \\areamed radius emanation from you.

                If a 5-foot square of fog takes at least 4 fire damage from a single attack, the fog disappears from that area until the end of the next round.
                This fog does not fully block sight, but it provides \\concealment.
            """,
            short_description="Fills nearby area with fog",
        ),
        MagicItem(
            name="Cloak of Mist, Greater",
            level=16,
            material_type='Cloak',
            tags=['Manifestation'],
            description="""
                A thick fog constantly fills a \\areamed radius emanation from you.
                This fog completely blocks sight beyond 10 feet.

                If a 5-foot square of fog takes at least 16 fire damage from a single attack, the fog disappears from that area until the end of the next round.
            """,
            short_description="Fills nearby area with thick fog",
        ),
    ]

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

    apparel += [
        MagicItem(
            # Maybe too strong?
            name="Hexward Amulet",
            level=7,
            material_type='Amulet',
            tags=[],
            description="""
                You gain a +1 bonus to defenses against spells that target you directly.
                This does not protect you from abilities that affect an area.
            """,
            short_description="Grants +1 defenses against targeted spells",
        ),
        MagicItem(
            name="Hexproof Amulet, Greater",
            level=13,
            material_type='Amulet',
            tags=[],
            description="""
                This item functions like a \\mitem<hexward amulet>, except that the bonus increases to +2.
            """,
            short_description="Grants +2 defenses against targeted spells",
        ),
        MagicItem(
            name="Hexproof Amulet, Supreme",
            level=19,
            material_type='Amulet',
            tags=[],
            description="""
                This item functions like a \\mitem<hexward amulet>, except that the bonus increases to +3.
            """,
            short_description="Grants +3 defenses against targeted spells",
        ),
    ]

    # Belts

    apparel += [
        MagicItem(
            name="Belt of Healing",
            level=4,
            material_type='Belt',
            tags=[],
            description="""
                As a standard action, you can use this belt to regain 1d6+1 hit points.
            """,
            short_description="Grants healing",
        ),
        MagicItem(
            name="Belt of Healing, Greater",
            level=10,
            material_type='Belt',
            tags=[],
            description="""
                As a standard action, you can use this belt to regain 2d6+2 hit points.
            """,
            short_description="Grants more healing",
        ),
        MagicItem(
            name="Belt of Healing, Supreme",
            level=16,
            material_type='Belt',
            tags=[],
            description="""
                As a standard action, you can use this belt to regain 4d6+4 hit points.
            """,
            short_description="Grants more healing",
        ),
    ]

    apparel += [
        MagicItem(
            name="Belt of Vital Persistence",
            level=1,
            material_type='Belt',
            tags=[],
            description="""
                When you make a \\glossterm<vital roll>, you can spend a \\glossterm<fatigue point> (see \\pcref<Vital Rolls>).
                If you do, you gain a +1 bonus to the vital roll.
                You can use this ability after you see the result of the vital roll.
            """,
            short_description="Can grant +1 to a vital roll",
        ),
        MagicItem(
            name="Belt of Vital Persistence, Greater",
            level=7,
            material_type='Belt',
            tags=[],
            description="""
                This item functions like a \\textit<belt of vital persistence>, except that the bonus it grants increases to +3.
            """,
            short_description="Can grant +3 to a vital roll",
        ),
        MagicItem(
            name="Belt of Vital Persistence, Supreme",
            level=13,
            material_type='Belt',
            tags=[],
            description="""
                This item functions like a \\textit<belt of vital persistence>, except that the bonus it grants increases to +5.
            """,
            short_description="Can grant +5 to a vital roll",
        ),
    ]

    apparel += [
        MagicItem(
            name="Lifekeeping Belt",
            level=7,
            material_type='Belt',
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
            """,
            short_description="Grants +1 bonus to \\glossterm<vital rolls>",
        ),
        MagicItem(
            name="Lifekeeping Belt, Greater",
            level=13,
            material_type='Belt',
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
            """,
            short_description="Grants +2 bonus to \\glossterm<vital rolls>",
        ),
        MagicItem(
            name="Lifekeeping Belt, Supreme",
            level=19,
            material_type='Belt',
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
            """,
            short_description="Grants +3 bonus to \\glossterm<vital rolls>",
        ),
    ]

    apparel += [
        MagicItem(
            name="Ocular Circlet",
            level=3,
            material_type='Circlet',
            tags=['Scrying'],
            description="""
                As a \\glossterm<standard action>, you can concentrate to use this item.
                If you do, a \\glossterm<scrying sensor> appears floating in the air in an unoccupied square within \\rngshort range.
                As long as you \\glossterm<sustain> the effect as a standard action, you see through the sensor instead of from your body.

                While viewing through the sensor, your visual acuity is the same as your normal body,
                    except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
                You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.
            """,
            short_description="Can allow you to see at a distance",
        ),
        MagicItem(
            name="Ocular Circlet, Greater",
            level=9,
            material_type='Circlet',
            tags=['Scrying'],
            description="""
                This item functions like a \\mitem<ocular circlet>, except that it only takes a \\glossterm<minor action> to activate and sustain the item's effect.
                In addition, the sensor appears anywhere within \\rngmed range.
            """,
            short_description="Can allow you to see at a greater distance",
        ),
    ]

    apparel += [
        MagicItem(
            name="Gloves of Spell Investment",
            level=7,
            material_type='Gloves',
            tags=[],
            description="""
                When you cast a spell that does not have the \\glossterm<Attune> or \\glossterm<Sustain> tags,
                    you can invest the magic of the spell in these gloves.
                If you do, the spell does not have its normal effect.

                As a standard action, you can activate these gloves.
                When you do, you cause the effect of the last spell invested in the gloves.
                This does not require \\glossterm<components> and does not have the \\glossterm<Focus> tag, even if casting the spell normally would have those limitations.
                After you use a spell in this way, the energy in the gloves is spent, and you must invest a new spell to activate the gloves again.

                If you remove either glove from your hand, the magic of the spell invested in the gloves is lost.
            """,
            short_description="Can invest a spell to cast later",
        ),
        MagicItem(
            name="Gloves of Spell Investment, Greater",
            level=13,
            material_type='Gloves',
            tags=[],
            description="""
                This item functions like a \\mitem<gloves of spell investment>, except that you can store up to two spells in the gloves.
                When you activate the gauntlets, you choose which spell to use.
            """,
            short_description="Can invest two spells to cast later",
        ),
    ]


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
