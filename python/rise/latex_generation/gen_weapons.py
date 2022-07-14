#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify, longtablify
from rise.latex.tags import add_attune_tag


def create_weapon(name, rank, description, short_description, tags=None):
    return MagicItem(
        name=name,
        rank=rank,
        description=description,
        short_description=short_description,
        materials=["as base weapon"],
        tags=add_attune_tag(tags),
    )


def generate_weapons():
    weapons = []

    weapons += [
        create_weapon(
            name="Concussive",
            rank=2,
            # tags=[tag],
            description="""
                This weapon continuously emits a low-pitched rumbling noise and vibrates in the hand.
                All damage dealt with it is sonic damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> using this weapon that is imbued with concussive force.
                Damage dealt by that strike is sonic damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
                In addition, each creature that loses \\glossterm<hit points> from the strike is \\deafened as a \\glossterm<condition>.
            """,
            short_description="Deals sonic damage and can deafen",
        ),
        create_weapon(
            name="Concussive, Greater",
            rank=5,
            tags=["Attune (deep)"],
            description="""
                This weapon continuously emits a low-pitched rumbling noise and vibrates in the hand.
                All damage dealt with it is sonic damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
                Whenever you cause a creature to lose \\glossterm<hit points> with a \\glossterm<strike>, that creature becomes \\deafened as a \\glossterm<condition>.
            """,
            short_description="Deals sonic damage and deafens",
        ),
    ]

    weapons += [
        create_weapon(
            name="Flaming",
            rank=3,
            tags=[],
            description="""
                This weapon is on fire.
                It sheds light as a torch, and all damage dealt with it is fire damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> using this weapon that is imbued with fiery energy.
                Each creature that loses \\glossterm<hit points> from the strike takes additional fire damage at the end of the next round equal to your damage dice with that strike.
            """,
            short_description="Deals fire damage and can ignite",
        ),
        create_weapon(
            name="Flaming, Greater",
            rank=6,
            tags=["Attune (deep)"],
            description="""
                This weapon is on fire.
                It sheds light as a torch, and all damage dealt with it is fire damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
                Whenever you cause a creature to lose \\glossterm<hit points> with a \\glossterm<strike>, that creature takes additional fire damage at the end of the next round equal to your damage dice with that strike.
            """,
            short_description="Deals fire damage and ignites",
        ),
    ]

    weapons += [
        create_weapon(
            name="Arcing",
            rank=2,
            tags=[],
            description="""
                This weapon continuously crackles with electricity.
                All damage dealt with it is electricity damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                % TODO: note that it explicitly *does* work if you hit an object like the ground
                As a standard action, you can make a \\glossterm<strike> using this weapon that is imbued with electrical energy.
                The strike also affects one \\glossterm<secondary target> within 15 feet of the strike's \\glossterm<primary target>.
                This effect triggers even if the primary target was an inanimate object, like the ground.
                The secondary target does not have to be within your \\glossterm<reach>.
            """,
            short_description="Deals electicity damage and can arc 15 feet",
        ),
        create_weapon(
            name="Arcing, Greater",
            rank=5,
            tags=["Attune (deep)"],
            description="""
                This weapon continuously crackles with electricity.
                All damage dealt with it is electricity damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
                Whenever you make a strike, the strike can also affect one \\glossterm<secondary target> within 15 feet of the strike's \\glossterm<primary target>.
                This effect triggers even if the primary target was an inanimate object, like the ground.
                The secondary target does not have to be within your \\glossterm<reach>.
            """,
            short_description="Deals electricity damage and arcs 15 feet",
        ),
    ]

    weapons += [
        create_weapon(
            name="Freezing",
            rank=2,
            tags=[],
            description="""
                This weapon is bitterly cold to the touch.
                All damage dealt with it is cold damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> using this weapon that is imbued with frigid energy.
                Each creature that loses \\glossterm<hit points> from the strike is \\glossterm<briefly> \\slowed.
            """,
            short_description="Can deal cold damage and briefly slow",
        ),
        create_weapon(
            name="Freezing, Greater",
            rank=5,
            tags=["Attune (deep)"],
            description="""
                This weapon is bitterly cold to the touch.
                All damage dealt with it is cold damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
                Whenever you cause a creature to lose \\glossterm<hit points> with a \\glossterm<strike>, that creature becomes \\glossterm<briefly> \\slowed.
            """,
            short_description="Deals cold damage and can briefly slow",
        ),
    ]

    weapons += [
        create_weapon(
            name="Potency",
            rank=2,
            description="""
                You gain a +2 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +2 power",
        ),
        create_weapon(
            name="Potency, Greater",
            rank=4,
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +4 power",
        ),
        create_weapon(
            name="Potency, Supreme",
            rank=6,
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +8 power",
        ),
    ]

    weapons += [
        create_weapon(
            name="Studied",
            rank=3,
            description="""
                You gain a \\glossterm<magic bonus> to your \\glossterm<power> equal to your Intelligence.
            """,
            short_description="Grants power equal to Intelligence",
        ),
        create_weapon(
            name="Studied, Greater",
            rank=5,
            description="""
                You gain a \\glossterm<magic bonus> to your \\glossterm<power> equal to twice your Intelligence.
            """,
            short_description="Grants power equal to twice Intelligence",
        ),
        create_weapon(
            name="Studied, Supreme",
            rank=7,
            description="""
                You gain a \\glossterm<magic bonus> to your \\glossterm<power> equal to four times your Intelligence.
            """,
            short_description="Grants power equal to four times Intelligence",
        ),
    ]

    weapons += [
        create_weapon(
            name="Finesse",
            rank=3,
            description="""
                You gain a \\glossterm<magic bonus> to your \\glossterm<power> equal to your Dexterity.
            """,
            short_description="Grants power equal to Dexterity",
        ),
        create_weapon(
            name="Finesse, Greater",
            rank=5,
            description="""
                You gain a \\glossterm<magic bonus> to your \\glossterm<power> equal to twice your Dexterity.
            """,
            short_description="Grants power equal to twice Dexterity",
        ),
        create_weapon(
            name="Finesse, Supreme",
            rank=7,
            description="""
                You gain a \\glossterm<magic bonus> to your \\glossterm<power> equal to four times your Dexterity.
            """,
            short_description="Grants power equal to four times Dexterity",
        ),
    ]

    weapons += [
        create_weapon(
            name="Tireless",
            rank=1,
            description="""
                You reduce your \\glossterm<fatigue penalty> by 1 when determining your \\glossterm<accuracy> with \\glossterm<strikes> using this weapon.
            """,
            short_description="Ignores 1 fatigue with strikes",
        ),
        create_weapon(
            name="Tireless, Greater",
            rank=3,
            description="""
                You reduce your \\glossterm<fatigue penalty> by 2 when determining your \\glossterm<accuracy> with \\glossterm<strikes> using this weapon.
            """,
            short_description="Ignores 2 fatigue with strikes",
        ),
        create_weapon(
            name="Tireless, Supreme",
            rank=5,
            description="""
                You reduce your \\glossterm<fatigue penalty> by 3 when determining your \\glossterm<accuracy> with \\glossterm<strikes> using this weapon.
            """,
            short_description="Ignores 3 fatigue with strikes",
        ),
    ]

    weapons += [
        create_weapon(
            name="Unbalanced",
            rank=3,
            description="""
                You take a -1 \\glossterm<accuracy> penalty to strikes using this weapon.
                However, your attack rolls with strikes using this weapon \\glossterm<explode> on a 9.
                This does not affect bonus dice rolled for exploding attacks (see \\pcref<Exploding Attacks>).
            """,
            short_description="-1 accuracy, but explode on a 9",
        ),
        create_weapon(
            name="Unbalanced, Greater",
            rank=7,
            description="""
                You take a -2 \\glossterm<accuracy> penalty to strikes using this weapon.
                However, your attack rolls with strikes using this weapon \\glossterm<explode> on an 8 or 9.
                This does not affect bonus dice rolled for exploding attacks (see \\pcref<Exploding Attacks>).
            """,
            short_description="-2 accuracy, but explode on an 8 or 9",
        ),
    ]

    weapons += [
        create_weapon(
            name="Honed",
            rank=4,
            description="""
                This weapon has the Keen weapon tag.
                You gain a +2 bonus to \\glossterm<accuracy> with \\glossterm<strikes> using this weapon for the purpose of determining whether you get a \\glossterm<critical hit> (see \\pcref<Weapon Tags>).
                If the weapon already has the Keen weapon tag, this has no effect.
            """,
            short_description="Grants the Keen weapon tag",
        ),
        create_weapon(
            name="Impactful",
            rank=4,
            description="""
                This weapon has the Impact weapon tag.
                When you get a \\glossterm{critical hit} with this weapon, you roll triple damage dice instead of double damage dice.
                If the weapon already has the Impact weapon tag, this has no effect.
            """,
            short_description="Grants the Impact weapon tag",
        ),
    ]

    weapons += [
        create_weapon(
            name="Bloodfuel",
            rank=2,
            description="""
                As a standard action, you can make a \\glossterm<strike> using this weapon that uses your own blood to fuel its power.
                You gain a +4 bonus to \\glossterm<power> with the attack.
                However, you lose 2 \\glossterm<hit points>.
            """,
            short_description="Can spend 2 HP for +4 power",
        ),
        create_weapon(
            name="Bloodfuel, Greater",
            rank=4,
            description="""
                As a standard action, you can make a \\glossterm<strike> using this weapon that uses your own blood to fuel its power.
                You gain a +8 bonus to \\glossterm<power> with the attack.
                However, you lose 4 \\glossterm<hit points>.
            """,
            short_description="Can spend 4 HP for +8 power",
        ),
        create_weapon(
            name="Bloodfuel, Supreme",
            rank=6,
            description="""
                As a standard action, you can make a \\glossterm<strike> using this weapon that uses your own blood to fuel its power.
                You gain a +16 bonus to \\glossterm<power> with the attack.
                However, you lose 8 \\glossterm<hit points>.
            """,
            short_description="Can spend 8 HP for +16 power",
        ),
    ]

    weapons += [
        create_weapon(
            name="Iridescent",
            rank=2,
            tags=[],
            description="""
                This weapon shimmers with a chaotic pattern of colors.
                As a standard action, you can make a flashy \\glossterm<strike> using this weapon that accentuates its bewildering effect.
                Your \\glossterm<power> with the strike is halved.
                Each creature damaged by the strike is \\glossterm<briefly> \\dazzled.
            """,
            short_description="Can briefly dazzle",
        ),
        create_weapon(
            name="Iridescent, Greater",
            rank=4,
            tags=[],
            description="""
                This weapon functions like a \\mitem<iridescent> weapon, except that the dazzling effect becomes a \\glossterm<condition>.
            """,
            short_description="Can dazzle",
        ),
        create_weapon(
            name="Iridescent, Supreme",
            rank=6,
            tags=[],
            description="""
                This weapon functions like a \\mitem<iridescent> weapon, except that the dazzling effect becomes a \\glossterm<condition>.
                In addition, each creature that loses \\glossterm<hit points> from the strike is \\glossterm<briefly> \\blinded.
            """,
            short_description="Can dazzle and briefly blind",
        ),
    ]

    weapons += [
        create_weapon(
            name="Longshot",
            rank=2,
            description="""
                When you make a ranged attack using this weapon, you reduce your \\glossterm<longshot penalty> by 1.
            """,
            short_description="Reduces longshot penalty by 1",
        ),
        create_weapon(
            name="Longshot, Greater",
            rank=5,
            description="""
                When you make a ranged attack using this weapon, you reduce your \\glossterm<longshot penalty> by 2.
            """,
            short_description="Reduces longshot penalty by 2",
        ),
    ]

    weapons += [
        create_weapon(
            name="Ricocheting",
            rank=3,
            description="""
                When you make a \\glossterm<ranged> \\glossterm<strike> with this weapon, you may also target one additional secondary creature or object.
                Each secondary target must be within 10 feet of a primary target, and must not already be a target of the strike.
                The strike affects each secondary target in the same way as the primary target.
            """,
            short_description="Hits an extra foe with ranged strikes",
        ),
        create_weapon(
            name="Ricocheting, Greater",
            rank=5,
            description="""
                This weapon functions like a \\mitem<ricocheting> weapon, except that you can choose two secondary targets instead of only one.
            """,
            short_description="Hits two extra foes with ranged strikes",
        ),
        create_weapon(
            name="Ricocheting, Supreme",
            rank=7,
            description="""
                This weapon functions like a \\mitem<ricocheting> weapon, except that you can choose three secondary targets instead of only one.
                In addition, each secondary target may be up to 15 feet away from a primary target.
            """,
            short_description="Hits three extra foes at a distance with ranged strikes",
        ),
    ]

    weapons += [
        create_weapon(
            name="Onslaught",
            rank=1,
            description="""
                Whenever you \\glossterm<defeat> a creature with a \\glossterm<strike> using this weapon, you gain a +10 foot bonus to your speed with all movement modes during the next round.
                In addition, if the creature was at least one \\glossterm<size category> larger than you, you \\glossterm<briefly> gain a +1 \\glossterm<accuracy> bonus.
            """,
            short_description="Grants +10 speed, maybe +1 accuracy on kill",
        ),
        create_weapon(
            name="Onslaught, Greater",
            rank=3,
            description="""
                Whenever you \\glossterm<defeat> a creature with a \\glossterm<strike> using this weapon, you gain a +15 foot bonus to your speed with all movement modes during the next round.
                In addition, if the creature was at least one \\glossterm<size category> larger than you, you \\glossterm<briefly> gain a +2 \\glossterm<accuracy> bonus.
            """,
            short_description="Grants +15 speed, maybe +2 accuracy on kill",
        ),
        create_weapon(
            name="Onslaught, Supreme",
            rank=5,
            description="""
                Whenever you \\glossterm<defeat> a creature with a \\glossterm<strike> using this weapon, you gain a +20 foot bonus to your speed with all movement modes during the next round.
                In addition, if the creature was at least one \\glossterm<size category> larger than you, you \\glossterm<briefly> gain a +3 \\glossterm<accuracy> bonus.
            """,
            short_description="Grants +20 speed, maybe +3 accuracy on kill",
        ),
    ]

    weapons += [
        create_weapon(
            name="Screaming",
            rank=2,
            description="""
                Whenever you make a creature lose \\glossterm<hit points> with a \\glossterm<strike> using this weapon, this weapons emits a blood-curdling scream.
                This causes you and that creature to \\glossterm<briefly> become \\shaken by each other.
                After a creature stops being shaken in this way, it becomes immune to this effect until it takes a \\glossterm<short rest>.
            """,
            tags=["Attune (deep)", "Emotion"],
            short_description="Screams, making you and struck foes shaken",
        ),
        create_weapon(
            name="Screaming, Greater",
            rank=6,
            description="""
                Whenever you make a creature lose \\glossterm<hit points> with a \\glossterm<strike> using this weapon, this weapons emits a nightmarish scream.
                This causes you and that creature to \\glossterm<briefly> become \\frightened by each other.
                After a creature stops being frightened in this way, it becomes immune to this effect until it takes a \\glossterm<short rest>.
            """,
            tags=["Attune (deep)", "Emotion"],
            short_description="Screams, making you and struck foes frightened",
        ),
    ]

    weapons += [
        create_weapon(
            name="Routing",
            rank=2,
            description="""
                You gain a +1 bonus to \\glossterm<accuracy> with \\glossterm<strikes> using this weapon against creatures that are suffering penalties for being \\shaken, \\frightened, or \\panicked.
            """,
            short_description="Grants +1 accuracy vs scared foes",
        ),
        create_weapon(
            name="Routing, Greater",
            rank=6,
            description="""
                You gain a +2 bonus to \\glossterm<accuracy> with \\glossterm<strikes> using this weapon against creatures that are suffering penalties for being \\shaken, \\frightened, or \\panicked.
            """,
            short_description="Grants +2 accuracy vs scared foes",
        ),
    ]

    weapons += [
        create_weapon(
            name="Dimensional Trace",
            rank=2,
            description="""
                As a standard action, you can make a \\glossterm<strike> with using this weapon.
                You can \\glossterm<briefly> apply a dimensional trace on one creature that was dealt damage by that strike.
                At the start of each \\glossterm<action phase>, if any creature within \\distrange of you has a dimensional trace active from this weapon, you can choose to automatically \\glossterm<teleport> into the closest unoccupied square adjacent to that creature.
            """,
            short_description="Can briefly teleport next to struck creatures",
        ),
        create_weapon(
            name="Dimensional Trace, Greater",
            rank=6,
            description="""
                This weapon functions like a \\mitem<dimensional trace> weapon, except that the dimensional trace becomes a \\glossterm<condition>.
            """,
            short_description="Can teleport next to struck creatures",
        ),
    ]

    weapons += [
        create_weapon(
            name="Bloodspray",
            rank=2,
            description="""
                Whenever you \\glossterm<defeat> a creature with a \\glossterm<strike> using this weapon, make an attack vs. Reflex against all \\glossterm<enemies> adjacent to that creature.
                On a hit, each target is \\glossterm<briefly> \\dazzled.
                You gain a +2 \\glossterm<accuracy> bonus with this secondary attack if the defeated creature was at least one size category larger than you.
            """,
            short_description="Briefly dazzles foes with blood on kill",
        ),
        create_weapon(
            name="Bloodspray, Greater",
            rank=4,
            description="""
                This weapon functions like a \\mitem<bloodspray> weapon, except that the area of the attack increases to a \\medarea radius from the defeated creature.
            """,
            short_description="Briefly dazzles foes with widely sprayed blood on kill",
        ),
        create_weapon(
            name="Bloodspray, Supreme",
            rank=7,
            description="""
                This weapon functions like a \\mitem<bloodspray> weapon, except that the area of the attack increases to a \\medarea radius from the defeated creature.
                In addition, the dazzling effect becomes a \\glossterm<condition>.
            """,
            short_description="Dazzles foes with widely sprayed blood on kill",
        ),
    ]

    weapons.append(
        create_weapon(
            name="Boomerang",
            rank=3,
            description="""
                You can throw this weapon as if it was designed to be thrown.
                In addition, as a standard action, you can throw this weapon in a spinning arc.
                When you do, make a thrown \\glossterm<strike> against up to two targets within \\glossterm<close range>.
                After attacking the last target, the weapon flies back to your hand.
            """,
            short_description="Can be thrown to strike multiple foes",
        )
    )

    weapons += [
        create_weapon(
            name="Hefty",
            rank=3,
            description="""
                This weapon feels heavy in the hand.
                It gains the \\glossterm<Forceful> weapon tag (see \\pcref<Weapon Tags>).
                If it already has that weapon tag, the distance that you can \\glossterm<knockback> the target increases by 10 feet.
            """,
            short_description="Can knockback struck foes",
        ),
        create_weapon(
            name="Hefty, Greater",
            rank=5,
            description="""
                This weapon functions like a \\mitem<hefty> weapon, except that the maximum size category that you can affect with its \\glossterm<Forceful> tag increases by one.
            """,
            short_description="Can knockback struck large foes",
        ),
    ]

    weapons += [
        create_weapon(
            name="Fixating",
            rank=3,
            description="""
                Once per \\glossterm<phase>, when you make a \\glossterm<strike> with this weapon, you gain a +1 accuracy bonus against one target of the strike with future strikes using this weapon.
                If the strike had multiple targets, you choose which target you gain the bonus against.
                This effect lasts until you make a strike with this weapon that does not include that creature as a target.
                It stacks with itself, up to a maximum of a +4 bonus.
            """,
            tags=["Attune (deep)"],
            short_description="Grants +1 accuracy bonus against attacked foe",
        ),
        create_weapon(
            name="Fixating, Greater",
            rank=6,
            description="""
                This weapon functions like a \\mitem<fixating> weapon, except that the bonus increases by +2 with each strike.
            """,
            tags=["Attune (deep)"],
            short_description="Grants +2 accuracy bonus against attacked foe",
        ),
    ]

    weapons.append(
        create_weapon(
            name="Merciful",
            rank=1,
            description="""
                This weapon deals \\glossterm<subdual damage>.
                As a \\glossterm<minor action>, you can toggle this effect on or off, allowing you to deal non-subdual damage with this weapon if you desire.
            """,
            short_description="Deals subdual damage",
        )
    )

    weapons += [
        create_weapon(
            name="Morphing",
            rank=1,
            tags=[],
            description="""
                 As a standard action, you can activate this weapon.
                 If you do, it changes shape into a new weapon of your choice from the same weapon group.
                 If you stop attuning to this weapon, it returns to its original form.
            """,
            short_description="Can change into similar weapon",
        ),
        create_weapon(
            name="Morphing, Greater",
            rank=3,
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
        create_weapon(
            name="Returning",
            rank=1,
            tags=[],
            description="""
                After being thrown, this weapon teleports back into your hand at the end of the current phase.
                Catching a returning weapon when it comes back is a free action.
                If you can't catch it, the weapon drops to the ground in the square from which it was thrown.
            """,
            short_description="Teleports back to you after being thrown",
        ),
    ]

    weapons += [
        create_weapon(
            name="Seeking",
            rank=3,
            tags=[],
            description="""
                This weapon automatically veers towards its intended target.
                Any \\glossterm<miss chance> the strike would normally have is reduced.
                A 50\\% miss chance is reduced to a 25\\% miss chance, and a 25\\% miss chance is removed entirely.
            """,
            short_description="Reduces miss chances",
        ),
        create_weapon(
            name="Seeking, Greater",
            rank=6,
            tags=[],
            description="""
                This weapon automatically veers towards its intended target.
                Any \\glossterm<miss chance> the strike would normally have is removed.
            """,
            short_description="Removes miss chances",
        ),
    ]

    weapons += [
        create_weapon(
            name="Soulreaving",
            rank=6,
            tags=[],
            description="""
                This weapon is transluscent and has no physical presence for anyone except you.
                It has no effect on objects or constructs, and creatures do not feel any pain or even notice attacks from it.
                Attacks with this weapon deal no damage immediately.
                Instead, the damage is delayed.
                Damage that would be dealt by the weapon can be delayed indefinitely.
                While the damage is delayed, it cannot be removed by any means short of the destruction of this weapon or the creature's death.

                As a \\glossterm<minor action>, you can cut yourself with this weapon to activate it.
                This deals a single point of physical damage to you.
                When you do, each creature hit with the weapon takes untyped damage equal to the total delayed damage built up by the weapon for that target.
                Creatures farther than one mile away from the weapon are unaffected by this damage.
                This ability expends all delayed damage built up by the weapon for all targets, including targets farther than one mile from the weapon.
            """,
            short_description="Deals delayed damage",
        ),
    ]

    weapons += [
        create_weapon(
            name="Blessed",
            rank=3,
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> to affect a strike with this weapon, you gain a +2 accuracy bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +2 bonus with \\textit<desperate exertion>",
        ),
        create_weapon(
            name="Blessed, Greater",
            rank=5,
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> to affect a strike with this weapon, you gain a +3 accuracy bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +3 bonus with \\textit<desperate exertion>",
        ),
        create_weapon(
            name="Blessed, Supreme",
            rank=7,
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> to affect a strike with this weapon, you gain a +4 accuracy bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +4 bonus with \\textit<desperate exertion>",
        ),
    ]

    weapons += [
        create_weapon(
            name="Wolfpack",
            rank=5,
            tags=[],
            description="""
                Each creature that is within your \\glossterm<reach> with this weapon and adjacent to one of your \\glossterm<allies> takes a -1 penalty to Armor and Reflex defenses.
            """,
            short_description="Imposes -1 defense penalty with ally's help",
        ),
    ]

    weapons.append(
        create_weapon(
            name="Fated",
            rank=7,
            tags=["Attune (deep)"],
            description="""
                When you miss with a \\glossterm<strike> with this weapon, you can reroll the attack and take the higher result.
                After you reroll an attack in this way, you \\glossterm<briefly> cannot do so again.
            """,
            short_description="Rolls attacks twice",
        )
    )

    weapons += [
        create_weapon(
            name="Thieving",
            rank=2,
            tags=[],
            description="""
                As a \\glossterm<standard action>, you can activate this weapon.
                If you do, make a melee \\glossterm<strike> or use the \\textit<disarm> ability using this weapon.
                If you successfully knock an object loose with the disarm attempt, or if your strike hit an \\glossterm<unattended> object, this weapon can absorb the struck object.
                The object's size category must be no larger than the weapon's size category.

                An absorbed object leaves no trace that it ever existed.
                This weapon can hold no more than three objects at once.
                If you attempt to absorb an object while the weapon is full, the attempt fails.
                As a standard action, you can retrieve the last item absorbed by the weapon.
                The item appears in your hand, or falls to the ground if your hand is occupied.
            """,
            short_description="Can absorb small items",
        ),
        create_weapon(
            name="Thieving, Greater",
            rank=4,
            tags=[],
            description="""
                This weapon functions like a \\mitem<thieving> weapon, except that the maximum size category of object it can absorb is one size category larger than the weapon.
                In addition, you gain a +1 bonus to \\glossterm<accuracy> with the \\textit<disarm> ability using the weapon.
            """,
            short_description="Can absorb large items",
        ),
        create_weapon(
            name="Thieving, Supreme",
            rank=6,
            tags=[],
            description="""
                This weapon functions like a \\mitem<thieving> weapon, except that the maximum size category of object it can absorb is two size categories larger than the weapon.
                In addition, you gain a +2 bonus to \\glossterm<accuracy> with the \\textit<disarm> ability using the weapon.
            """,
            short_description="Can absorb huge items",
        ),
    ]

    weapons.append(
        create_weapon(
            name="Vorpal",
            rank=7,
            description="""
                You gain a +2 bonus to \\glossterm<accuracy> with \\glossterm<strikes> using this weapon for the purpose of determining whether you get a \\glossterm<critical hit> (see \\pcref<Weapon Tags>).
                In addition, critical hits with \\glossterm<strikes> using this weapon deal maximum damage.
            """,
            short_description="Inflicts lethal critical hits",
        )
    )

    weapons += [
        create_weapon(
            name="Phasing",
            rank=3,
            tags=[],
            description="""
                All \\glossterm<strikes> with this weapon, including projectiles fired by this weapon, can pass through a single solid obstacle of up to one feet thick on the way to their target.
                This can allow you to ignore \\glossterm<cover>, or even attack through solid walls.
                It does not allow you to ignore armor, shields, or or similar items used by the target of your attacks.
            """,
            short_description="Can ignore obstacles when attacking",
        ),
        create_weapon(
            name="Phasing, Greater",
            rank=5,
            tags=[],
            description="""
                This weapon functions like a \\mitem<phasing> weapon, except that the strike can penetrate through any number of solid objects with a combined thickness of ten feet or less.
            """,
            short_description="Can ignore many obstacles when attacking",
        ),
    ]

    weapons += [
        create_weapon(
            name="Banechannel",
            rank=4,
            tags=[],
            description="""
                As a standard action, you can activate this weapon.
                When you do, you remove one \\glossterm<condition> affecting you.
                This cannot remove an effect applied during the current round.
                The condition is infused into this weapon.
                You cannot use this ability while there is a condition infused in the weapon.
                However, you can release the infusion as a separate standard action.

                While this weapon is infused, if you make a creature lose \\glossterm<hit points> with it, the struck creature becomes \\glossterm<briefly> affected by the infused effect.
                This removes the infusion from this weapon, allowing you to activate it again.
            """,
            short_description="Remove a condition to inflict it later",
        ),
        create_weapon(
            name="Banechannel, Greater",
            rank=6,
            tags=[],
            description="""
                This weapon functions like a \\textit<banechannel> weapon, except that you can infuse up to two conditions into the weapon.
                When you make a creature lose \\glossterm<hit points> with the weapon, it gains the oldest condition infused in the weapon.
                You cannot inflict a condition with this weapon more than once per round.
            """,
            short_description="Remove conditions to inflict them later",
        ),
    ]

    weapons += [
        create_weapon(
            name="Vampiric",
            rank=4,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +4 damage bonus using this weapon.
                If a living creature loses \\glossterm{hit points} from this strike, you can increase your \\glossterm{fatigue level} by one.
                If you do, you regain 2d10+7 hit points.
            """,
            short_description="Can attack with +4 damage and steal HP",
        ),
        create_weapon(
            name="Vampiric, Greater",
            rank=6,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +8 damage bonus using this weapon.
                If a living creature loses \\glossterm{hit points} from this strike, you can increase your \\glossterm{fatigue level} by one.
                If you do, you regain 4d10+14 hit points.
            """,
            short_description="Can attack with +8 damage and steal HP",
        ),
    ]

    weapons += [
        create_weapon(
            name="Surestrike",
            rank=3,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +2 accuracy bonus using this weapon.
            """,
            short_description="Can attack with +2 accuracy",
        ),
        create_weapon(
            name="Surestrike, Greater",
            rank=5,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +3 accuracy bonus using this weapon.
            """,
            short_description="Can attack with +3 accuracy",
        ),
        create_weapon(
            name="Surestrike, Supreme",
            rank=7,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +4 accuracy bonus using this weapon.
            """,
            short_description="Can attack with +4 accuracy",
        ),
    ]

    weapons += [
        create_weapon(
            name="Powerstrike",
            rank=3,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +4 damage bonus using this weapon.
            """,
            short_description="Can attack with +4 damage",
        ),
        create_weapon(
            name="Powerstrike, Greater",
            rank=5,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +8 damage bonus using this weapon.
            """,
            short_description="Can attack with +8 damage",
        ),
        create_weapon(
            name="Powerstrike, Supreme",
            rank=7,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +16 damage bonus using this weapon.
            """,
            short_description="Can attack with +16 damage",
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

    text = "\n".join(texts)
    return latexify(text)


def generate_weapon_table():
    weapons = sorted(
        sorted(generate_weapons(), key=lambda item: item.name),
        key=lambda item: item.rank,
    )
    rows = [item.latex_table_row(include_type=False) for item in weapons]
    row_text = "\n".join(rows)
    return longtablify(
        f"""
            \\lcaption<Magic Weapons> \\\\
            \\tb<Name> & \\tb<Rank (Cost)> & \\tb<Description> & \\tb<Page> \\tableheaderrule
            {row_text}
        """,
        include_type=False,
    )


def write_to_file():
    weapon_latex = generate_weapon_latex()
    weapon_table = generate_weapon_table()
    with open(book_path("weapons.tex"), "w") as weapon_description_file:
        weapon_description_file.write(weapon_latex)
    with open(book_path("weapons_table.tex"), "w") as weapon_table_file:
        weapon_table_file.write(weapon_table)


@click.command()
@click.option("-c", "--check/--no-check", default=False)
@click.option("-o", "--output/--no-output", default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_weapon_latex())


if __name__ == "__main__":
    main()
