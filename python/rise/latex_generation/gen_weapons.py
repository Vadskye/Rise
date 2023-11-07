#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem, Upgrade, generate_table
from rise.latex.util import latexify
from rise.latex.tags import add_attune_tag


def create_weapon(name, rank, description, short_description, tags=None, upgrades=None):
    return MagicItem(
        name=name,
        rank=rank,
        description=description,
        short_description=short_description,
        is_magical=True,
        materials=["as base weapon"],
        tags=add_attune_tag(tags),
        upgrades=upgrades,
    )

# All magic weapon abilities should only affect attacks USING THE WEAPON.
# Otherwise, people are going to run around with magic teeth/claws/boot daggers
# and never actually use them to attack.
def generate_weapons():
    weapons = []

    weapons += [
        create_weapon(
            name="Blade Barrage",
            rank=3,
            # tags=[tag],
            description="""
                As a standard action, you can make a melee \\glossterm<strike> using this weapon that spawns a swarm of blades.
                The strike targets all \\glossterm<enemies> in a \\smallarea cone from you.
                For each previous consecutive round in which you used this ability, you gain a +2 accuracy bonus with the strike, up to a maximum of +4.
                On a miss, you still deal half damage.
            """,
            short_description="Can deal escalating damage in a cone",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        If you used this ability during the previous round, the strike deals double \\glossterm<weapon damage>.
                    """,
                    short_description="Can deal escalating damage in a cone",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The strike always deals double \\glossterm<weapon damage>.
                    """,
                    short_description="Can deal escalating damage in a cone",
                ),
            ]
        ),
    ]

    weapons += [
        create_weapon(
            name="Concussive",
            rank=1,
            # tags=[tag],
            description="""
                This weapon continuously emits a low-pitched rumbling noise and vibrates in the hand.
                All damage dealt with it is bludgeoning damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).
                This can allow you to use maneuvers from the \\textit<blunt force> combat style (see \\pcref<Blunt Force>).
            """,
            short_description="Deals bludgeoning damage",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The weapon also deals +1 damage.
                    """,
                    short_description="Deals +1 bludgeoning damage",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The damage bonus increases to +2d.
                    """,
                    short_description="Deals +2d bludgeoning damage",
                ),
            ]
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
                Each damaged creature burns if your attack result beats its Reflex defense.
                A burning creature takes 2d6 fire damage during your next action.
            """,
            short_description="Deals fire damage and can ignite",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The extra damage increases to 3d10.
                    """,
                    short_description="Deals fire damage and can ignite",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The extra damage increases to 7d10.
                    """,
                    short_description="Deals fire damage and can ignite",
                ),
            ]
        ),
    ]

    weapons += [
        create_weapon(
            name="Arcing",
            rank=3,
            tags=[],
            description="""
                This weapon continuously crackles with electricity.
                All damage dealt with it is electricity damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> using this weapon that is imbued with electrical energy.
                The strike \\glossterm<chains> once.
                Damage dealt to the secondary target is exclusively electricity damage, regardless of the strike's normal damage types.
            """,
            short_description="Deals electricity damage and can chain",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The strike also deals 2d6 \\glossterm<extra damage>.
                    """,
                    short_description="Deals electricity damage and can chain",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The extra damage increases to 4d10.
                    """,
                    short_description="Deals electricity damage and can chain",
                ),
            ]
        ),
    ]

    weapons += [
        create_weapon(
            name="Freezing",
            rank=3,
            tags=[],
            description="""
                This weapon is bitterly cold to the touch.
                All damage dealt with it is cold damage in addition to its normal damage types (see \\pcref<Multiple Damage Types>).

                As a standard action, you can make a \\glossterm<strike> using this weapon that is imbued with frigid energy.
                Each damaged creature is \\slowed as a \\glossterm<condition> if your attack result beats its Fortitude defense.
            """,
            short_description="Deals cold damage and can slow",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        Each creature that loses \\glossterm<hit points> from the strike is \\immobilized instead of slowed if your attack result beats its Fortitude defense.
                        The strike also deals 1d6 \\glossterm<extra damage>.
                    """,
                ),
                Upgrade(
                    rank=7,
                    description="""
                        Creatures damaged by the strike do not have to lose hit points to be immobilized instead of slowed.
                        In addition, the extra damage increases to 2d10.
                    """,
                ),
            ]
        ),
    ]

    weapons += [
        create_weapon(
            name="Mighty",
            rank=3,
            description="""
                If your Strength is at least 3, you gain a +1 damage bonus with strikes using this weapon.
            """,
            short_description="Grants +1 damage if you have 3 Str",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        If your Strength is at least 5, you gain a +2d damage bonus with strikes using this weapon.
                    """,
                    short_description="Grants +2d damage if you have 5 Str",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Studied",
            rank=3,
            description="""
                If your Intelligence is at least 3, you gain a +1 accuracy bonus with strikes using this weapon.
            """,
            short_description="Grants +1 accuracy if you have 3 Int",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        If your Intelligence is at least 5, you gain a +2 accuracy bonus with strikes using this weapon.
                    """,
                    short_description="Grants +2 accuracy if you have 5 Int",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Finesse",
            rank=4,
            description="""
                If your Dexterity is at least 4, you gain a +1 accuracy bonus with strikes using this weapon.
            """,
            short_description="Grants +1 accuracy if you have 4 Dex",
            upgrades=[
                Upgrade(
                    rank=7,
                    description="""
                        If your Dexterity is at least 6, you gain a +2 accuracy bonus with strikes using this weapon.
                    """,
                    short_description="Grants +2 accuracy if you have 6 Dex",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Infused",
            rank=3,
            description="""
                If your Willpower is at least 3, you gain a +1 damage bonus with strikes using this weapon.
            """,
            short_description="Grants +1 damage if you have 3 Wil",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        If your Willpower is at least 5, you gain a +2d damage bonus with strikes using this weapon.
                    """,
                    short_description="Grants +2d damage if you have 5 Wil",
                ),
            ],
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
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The penalty reduction increases to 2.
                    """,
                    short_description="Ignores 2 fatigue with strikes",
                ),
                Upgrade(
                    rank=5,
                    description="""
                        The penalty reduction increases to 3.
                    """,
                    short_description="Ignores 3 fatigue with strikes",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Unbalanced",
            rank=2,
            description="""
                You take a -1 \\glossterm<accuracy> penalty to strikes using this weapon.
                However, your attack rolls with strikes using this weapon \\glossterm<explode> on a 9.
                This does not affect bonus dice rolled for exploding attacks (see \\pcref<Exploding Attacks>).
            """,
            short_description="-1 accuracy, but explode on a 9",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The accuracy penalty increases to -2.
                        However, you also explode on an 8.
                    """,
                    short_description="-2 accuracy, but explode on an 8 or 9",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Bloodfuel",
            rank=4,
            description="""
                As a standard action, you can make a \\glossterm<strike> using this weapon that uses your own blood to fuel its power.
                The strike deals double weapon damage.
                However, you lose 4 \\glossterm<hit points>.
            """,
            short_description="Can spend 4 HP for double damage",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The weapon damage is tripled instead of doubled.
                        However, the hit point loss increases to 8.
                    """,
                    short_description="Can spend 8 HP for triple damage",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Iridescent",
            rank=1,
            tags=[],
            description="""
                This weapon shimmers with a chaotic pattern of colors, shedding multicolored light as a torch.
                As a standard action, you can make a flashy \\glossterm<weak strike> using this weapon that accentuates its bewildering effect.
                Each damaged creature is \\dazzled as a \\glossterm<condition> if your attack result beats its Reflex defense.
            """,
            short_description="Can dazzle",
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                        The strike is not weak.
                    """,
                    short_description="Can dazzle",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        Each creature that loses \\glossterm<hit points> from the strike is \\blinded instead of dazzled if your attack result beats its Reflex defense.
                    """,
                    short_description="Can dazzle and blind",
                ),
            ],
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
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The penalty reduction increases to 2.
                    """,
                    short_description="Reduces longshot penalty by 2",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Ricocheting",
            rank=4,
            description="""
                When you make a ranged \\glossterm<strike> with this weapon, you may also target one additional secondary creature or object.
                Each secondary target must be within 15 feet of a primary target, and must not already be a target of the strike.
                The strike affects each secondary target in the same way as the primary target.
                If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
            """,
            short_description="Hits an extra foe with ranged strikes",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        You can choose two secondary targets instead of only one.
                    """,
                    short_description="Hits two extra foes with ranged strikes",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Onslaught",
            rank=1,
            description="""
                Whenever you \\glossterm<defeat> a creature with a \\glossterm<strike> using this weapon, you gain a +10 foot bonus to your land speed during the next round.
                In addition, if the creature was at least one \\glossterm<size category> larger than you, you \\glossterm<briefly> gain a +1 \\glossterm<accuracy> bonus.
            """,
            short_description="Grants +10 speed, maybe +1 accuracy on kill",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The speed bonus increases to +20 feet, and the accuracy bonus increases to +3.
                    """,
                    short_description="Grants +20 speed, maybe +3 accuracy on kill",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Screaming",
            rank=3,
            description="""
                Whenever you make a creature lose \\glossterm<hit points> with a \\glossterm<strike> using this weapon, it weapon emits a blood-curdling scream.
                This causes you and that creature to become \\frightened by each other as a \\glossterm<condition>.
            """,
            tags=["Attune (deep)", "Emotion"],
            short_description="Screams, frightening you and struck foes",
        ),
    ]

    weapons += [
        create_weapon(
            name="Routing",
            rank=2,
            description="""
                You gain a +1 bonus to \\glossterm<accuracy> with \\glossterm<strikes> using this weapon against creatures that are suffering penalties for being \\frightened or \\panicked.
            """,
            short_description="Grants +1 accuracy vs scared foes",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The accuracy bonus increases to +2.
                    """,
                    short_description="Grants +2 accuracy vs scared foes",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Dimensional Trace",
            rank=2,
            description="""
                As a standard action, you can make a \\glossterm<strike> with using this weapon.
                You can \\glossterm<briefly> apply a dimensional trace on one creature that was dealt damage by that strike.
                As a \\glossterm<free action>, if any creature within \\distrange of you has a dimensional trace active from this weapon, you can \\glossterm<teleport> into the closest unoccupied square adjacent to that creature.
            """,
            short_description="Can briefly teleport next to struck creature",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The dimensional trace is applied even if the strike missed the target's defenses.
                        However, if the strike failed due to a \\glossterm<miss chance> or a \\glossterm<failure chance>, the dimensional trace is not applied.
                    """,
                    short_description="Can briefly teleport next to attacked creature",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Bloodspray",
            rank=2,
            description="""
                Whenever you \\glossterm<defeat> a creature with a \\glossterm<strike> using this weapon, make a \\glossterm<reactive attack> vs. Reflex against all \\glossterm<enemies> adjacent to that creature.
                On a hit, each target is \\glossterm<briefly> \\dazzled.
                You gain a +2 \\glossterm<accuracy> bonus with this secondary attack if the defeated creature was at least one size category larger than you.
            """,
            short_description="Briefly dazzles foes with blood on kill",
            upgrades=[
                Upgrade(
                    rank=4,
                    description="""
                        The area of the attack increases to a \\medarea radius from the defeated creature.
                    """,
                    short_description="Briefly dazzles foes with widely sprayed blood on kill",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The area of the attack increases to a \\medarea radius from the defeated creature.
                        In addition, the dazzling effect becomes a \\glossterm<condition>.
                    """,
                    short_description="Briefly dazzles foes with widely sprayed blood on kill",
                ),
            ],
        ),
    ]

    weapons.append(
        create_weapon(
            name="Boomerang",
            rank=3,
            description="""
                After being thrown, this weapon flies back into your hand immediately after attacking all targets.
                Catching a boomerang weapon when it comes back is a free action.
                If you can't catch it, the weapon drops to the ground in the square from which it was thrown.

                In addition, as a standard action, you can throw this weapon in a spinning arc.
                When you do, make a thrown \\glossterm<strike> against up to two targets within \\shortrange.
                The targets must still be within your \\glossterm<range limits>, and you take any \\glossterm<longshot penalty> as normal.
            """,
            short_description="Can be thrown to strike two nearby foes",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The range increases to \\medrange, and the maximum number of targets increases to three.
                    """,
                    short_description="Can be thrown to strike multiple foes",
                ),
            ],
        )
    )

    weapons += [
        create_weapon(
            name="Hefty",
            rank=3,
            description="""
                This weapon feels heavy in the hand.
                It gains the \\weapontag<Forceful> weapon tag (see \\pcref<Weapon Tags>).
                If it already has that weapon tag, the distance that you can \\glossterm<knockback> the target increases by 10 feet.
            """,
            short_description="Can knockback struck foes",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The maximum size category that you can affect with this weapon's \\glossterm<Forceful> tag also increases by one.
                    """,
                    short_description="Can knockback struck large foes",
                ),
            ],
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
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The bonus increases by +2 with each strike.
                    """,
                    short_description="Grants +2 accuracy bonus against attacked foe",
                ),
            ],
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
            upgrades=[
                Upgrade(
                    rank=3,
                    description="""
                         The weapon can shape into any weapon of your choice that you are proficient with, not just weapons from the same weapon group.
                         This can only change into existing manufactured weapons, not improvised weapons (see \\pcref<Weapons>).
                    """,
                    short_description="Can change into any weapon",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Returning",
            rank=1,
            tags=[],
            description="""
                After being thrown, this weapon flies back into your hand at the end of the current phase as long as it is still \\glossterm<unattended>.
                Catching a returning weapon when it comes back is a free action.
                If you can't catch it, the weapon drops to the ground in the square from which it was thrown.
            """,
            short_description="Flies back to you after being thrown",
        ),
    ]

    weapons += [
        create_weapon(
            name="Jaunting",
            rank=4,
            tags=[],
            description="""
                When you throw this weapon, it teleports directly from your hand to your intended target.
                This allows you to ignore any intervening \\glossterm<cover> with the attack.
                It teleports back into your hand immediately after striking or missing its target.
                Catching a returning weapon when it comes back is a free action.
                If you can't catch it, the weapon drops to the ground in the square from which it was thrown.
            """,
            short_description="Teleports when thrown",
            upgrades=[
                Upgrade(
                    rank=7,
                    description="""
                         You also reduce your \\glossterm<longshot penalty> with the weapon by 2.
                    """,
                    short_description="Teleports long distances when thrown",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Seeking",
            rank=4,
            tags=[],
            description="""
                This weapon automatically veers towards its intended target.
                Any \\glossterm<miss chance> the strike would normally have is reduced.
                A 50\\% miss chance is reduced to a 20\\% miss chance, and a 20\\% miss chance is removed entirely.
            """,
            short_description="Reduces miss chances",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        Any \\glossterm<miss chance> the strike would normally have is removed completely instead of only being reduced.
                    """,
                    short_description="Removes miss chances",
                ),
            ],
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

                As a \\glossterm<minor action>, you can hurt yourself with this weapon to activate it.
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
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The accuracy bonus increases to +4.
                    """,
                    short_description="Grants +4 bonus with \\textit<desperate exertion>",
                ),
            ],
        ),
    ]

    weapons.append(
        create_weapon(
            name="Fated",
            rank=7,
            tags=["Attune (deep)"],
            description="""
                When you miss with an attack using this weapon, you can reroll the attack and take the higher result.
                After you reroll an attack in this way, you \\glossterm<briefly> cannot do so again.
            """,
            short_description="Rolls attacks twice",
        )
    )

    weapons.append(
        create_weapon(
            name="Vorpal",
            rank=7,
            description="""
                As a standard action, you can make a melee \\glossterm<strike> using this weapon that can decapitate enemies.
                The strike deals triple \\glossterm<weapon damage>.
                If you get a critical hit against a creature and it loses hit points, it immediately dies.
                Creatures that do not have a head are immune to this death effect.
            """,
            short_description="Can decapitate foes",
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
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The strike can penetrate through any number of solid objects with a combined thickness of ten feet or less.
                    """,
                    short_description="Can ignore many obstacles when attacking",
                ),
            ],
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
                The condition is infused into this weapon.
                You cannot use this ability while there is a condition infused in the weapon.
                However, you can release the infusion as a separate standard action.

                While this weapon is infused, if you make a creature lose \\glossterm<hit points> with it, the struck creature becomes \\glossterm<briefly> affected by the infused effect.
                This removes the infusion from this weapon, allowing you to activate it again.
            """,
            short_description="Remove a condition to inflict it later",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        You can infuse up to two conditions into the weapon.
                        When you make a creature lose \\glossterm<hit points> with the weapon, it gains the oldest condition infused in the weapon.
                        You cannot inflict a condition with this weapon more than once per round.
                    """,
                    short_description="Remove conditions to inflict them later",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Vampiric",
            rank=4,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with 1d8 \\glossterm<extra damage> using this weapon.
                Damage dealt by the strike is energy damage in addition to its other types.
                If a living creature loses \\glossterm{hit points} from this strike, you can increase your \\glossterm{fatigue level} by one.
                When you do, you regain 3d8 hit points.
            """,
            short_description="Can attack with +1d8 damage and steal HP",
            upgrades=[
                Upgrade(
                    rank=6,
                    description="""
                        The extra damage increases to 3d8, and the healing increases to 6d8.
                    """,
                    short_description="Can attack with +3d8 damage and steal HP",
                ),
            ],
        ),
    ]

    weapons += [
        create_weapon(
            name="Surestrike",
            rank=3,
            tags=[],
            description="""
                As a standard action, you can make a \\glossterm<strike> with a +3 accuracy bonus using this weapon.
            """,
            short_description="Can attack with +3 accuracy",
            upgrades=[
                Upgrade(
                    rank=5,
                    description="""
                        The accuracy bonus increases to +6.
                    """,
                    short_description="Can attack with +6 accuracy",
                ),
                Upgrade(
                    rank=7,
                    description="""
                        The accuracy bonus increases to +10.
                    """,
                    short_description="Can attack with +10 accuracy",
                ),
            ],
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


def write_to_file():
    weapon_latex = generate_weapon_latex()
    weapon_table = generate_table(generate_weapons(), "Magic Weapons", include_type=False)
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
