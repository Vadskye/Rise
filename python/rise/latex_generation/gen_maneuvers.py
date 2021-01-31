#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.maneuver import Maneuver
from rise.latex.util import latexify
from rise.statistics.rise_data import maneuver_sources

def generate_maneuvers():
    maneuvers = []

    maneuvers.append(Maneuver(
        name='Boastful Battlecry',
        short_description='Gain brief accuracy bonus',
        target="\\glossterm<Enemies> within a \\arealarge range from you",
        effect_text="""
            During the next round, you gain a +4 bonus to \\glossterm<accuracy> with \\glossterm<strikes> against each target.
        """,
        rank=1,
        rank_upgrades={
            '3': 'The bonus increases to +5.',
            '5': 'The bonus increases to +6.',
            '7': 'The bonus increases to +7.',
        },
        tags=[],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Brace for Impact',
        short_description='Take half physical damage',
        target="Yourself",
        effect_text="""
            You take half damage from \\glossterm<physical damage> this round.
            This halving is applied before \\glossterm<resistances> and similar abilities.
            Because this is a \\glossterm<Swift> ability, it affects damage you take during the current phase.
        """,
        rank=2,
        rank_upgrades={
            # Alternate ideas: bonuses against attackers or defense bonuses
            '4': 'You also take half damage from \\glossterm<energy> damage this round.',
            '6': 'You also negate any \\glossterm<conditions> that you would gain this round.',
        },
        tags=['Swift'],
        lists=['Esoteric', 'Martial', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Certain Strike',
        short_description='Make a strike that trades damage for accuracy',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a +2 accuracy bonus.
            You take a -2d penalty to damage with the strike.
        """,
        rank=1,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Greater Certain Strike',
        short_description='Make a strike that trades damage for more accuracy',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a +4 accuracy bonus.
            You take a -2d penalty to damage with the strike.
        """,
        rank=5,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Superior Strike',
        short_description='Make a strike with bonuses to accuracy and damage',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a +1 bonus to \\glossterm<accuracy> and a +1d bonus to damage.
        """,
        rank=5,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Infallible Blow',
        short_description='Make a strike with a large accuracy bonus',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a +3 bonus to \\glossterm<accuracy>.
        """,
        rank=7,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Unstoppable Blow',
        short_description='Make a strike with a large damage bonus',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a +3d bonus to damage.
        """,
        rank=7,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Seeking Strike',
        short_description='Make a strike that mitigates miss chances',
        target=None,
        effect_text="""
            Make a \\glossterm<strike>.
            You can reroll any \\glossterm<miss chances>, such as when attacking \\glossterm<invisible> creatures, and take the better result.
        """,
        rank=1,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Unerring Strike',
        short_description='Make a strike that ignores miss chances',
        target=None,
        effect_text="""
            Make a \\glossterm<strike>.
            You ignore all miss chance effects with the strike.
        """,
        rank=4,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Counterstrike',
        short_description='Make a strike with bonuses if attacked',
        target=None,
        effect_text="""
            You can only use this ability during the \\glossterm<action phase>.
            During that phase, you prepare to retaliate against any incoming attacks.

            During the \\glossterm<delayed action phase>, make a melee \\glossterm<strike>.
            You gain a +2 bonus to \\glossterm<accuracy> with the strike against each creature that attacked you during the action phase of this round.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Counter Sweep',
        short_description='Make a strike against everyone who attacked you',
        target=None,
        effect_text="""
            You can only use this ability during the \\glossterm<action phase>.
            During that phase, you prepare to retaliate against any incoming attacks.

            During the \\glossterm<delayed action phase>, make a melee \\glossterm<strike> with a slashing or bludgeoning weapon.
            The strike targets one creature or object of your choice,
                plus each creature within your weapon's \\glossterm<reach> that attacked you during the action phase of this round.
        """,
        rank=4,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Counter Flurry',
        short_description='Make two strikes with bonuses if attacked',
        target=None,
        effect_text="""
            You can only use this ability during the \\glossterm<action phase>.
            During that phase, you prepare to retaliate against any incoming attacks.

            During the \\glossterm<delayed action phase>, make two melee \\glossterm<strikes>.
            Your \\glossterm<power> with both strikes is halved.
            You take a -4 penalty to \\glossterm<accuracy> with the strikes against any target that did not attack you during the action phase of this round.
        """,
        rank=6,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Followup Strike',
        target=None,
        short_description='Make a strike with bonuses if you previously missed',
        effect_text="""
            Make a \\glossterm<strike>.
            You gain a +2 bonus to \\glossterm<accuracy> with the strike against each target that you missed with a \\glossterm<strike> last round.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Followup Flurry',
        short_description='Make two strikes with bonuses if you previously missed',
        target=None,
        effect_text="""
            Make two \\glossterm<strikes>.
            Your \\glossterm<power> with both strikes is halved.
            You take a -4 penalty to accuracy with the strikes against all targets except creatures that you missed with a \\glossterm<strike> last round.
        """,
        rank=6,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Fearsome Blow',
        short_description='Make a strike that inflicts fear',
        target=None,
        effect_text="""
            Make a \\glossterm<strike>.
            You take a -2d penalty to damage with the strike.
            Each creature that loses \\glossterm<hit points> from the strike is \\glossterm<shaken> by you as a \\glossterm<condition>.
        """,
        rank=2,
        tags=['Emotion'],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Frightening Blow',
        short_description='Make a strike that inflicts fear',
        target=None,
        effect_text="""
            Make a \\glossterm<strike>.
            You take a -2d penalty to damage with the strike.
            Each creature that loses hit points from the strike is \\glossterm<frightened> by you as a \\glossterm<condition>.
        """,
        rank=5,
        tags=['Emotion'],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Terrifying Blow',
        short_description='Make a strike that inflicts fear',
        target=None,
        effect_text="""
            Make a \\glossterm<strike>.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            Each creature that loses hit points from the strike is \\glossterm<panicked> by you as a \\glossterm<condition>.
        """,
        rank=6,
        tags=['Emotion'],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Demoralizing Battlecry',
        short_description='Lower morale of nearby enemies',
        target="\\glossterm<Enemies> in a \\areasmall radius from you.",
        effect_text="""
            Make an attack vs. Mental against each target.
            \\hit Each target takes a -2 penalty to defenses until the end of the next round.
            \\crit Each target takes a -2 penalty to defenses as a \\glossterm<condition>.

            \\rankline
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 3.
        """,
        rank=3,
        tags=[],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Fearsome Battlecry',
        short_description='Inflict fear on nearby enemies',
        target="\\glossterm<Enemies> in a \\areasmall radius from you.",
        effect_text="""
            Make an attack vs. Mental against each target.
            \\hit Each target that has no remaining \\glossterm<resistance> to sonic damage is \\glossterm<shaken> by you as a \\glossterm<condition>.
            \\crit Each target that has no remaining \\glossterm<resistance> to sonic damage is \\glossterm<frightened> by you as a \\glossterm<condition>.

            \\rankline
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """,
        rank=1,
        tags=['Emotion'],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Frightening Battlecry',
        short_description='Inflict fear on nearby enemies',
        target="\\glossterm<Enemies> in a \\areasmall radius from you.",
        effect_text="""
            Make an attack vs. Mental against each target.
            \\hit Each target that has no remaining \\glossterm<resistance> to sonic damage is \\glossterm<frightened> by you as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit Each target that has no remaining \\glossterm<resistance> to sonic damage is \\glossterm<panicked> by you as a \\glossterm<condition>.

            \\rankline
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 4.
        """,
        rank=4,
        tags=['Emotion'],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Thunderous Shout',
        short_description='Deal damage in a cone',
        target="Everything in a \\areasmall cone from you",
        effect_text="""
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes sonic damage equal to 2d6 plus half your \\glossterm<power>.

            \\rankline
            The damage increases by +1d for each rank beyond 3.
        """,
        rank=3,
        tags=[],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Thunderous Bellow',
        short_description='Deal damage in a cone',
        target="Everything in a \\areahuge cone from you",
        effect_text="""
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes sonic damage equal to 4d6 plus half your \\glossterm<power>.
        """,
        rank=6,
        tags=[],
        lists=['Primal', 'Wild'],
    ))

    # +1 level for prone
    maneuvers.append(Maneuver(
        name='Ground Stomp',
        short_description='Stomp the ground to knock down nearby creatures',
        target='Everything adjacent to you that is on solid ground',
        effect_text="""
            Make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning damage equal to 2d6 plus half your \\glossterm<power>.
            Each Large or smaller creature that loses \\glossterm<hit points> from this damage is knocked \\glossterm<prone>.
            \\glance As above, except that that each target takes half damage.

            \\rankline
            The damage increases by +1d for each rank beyond 3.
        """,
        rank=3,
        tags=[],
        lists=['Martial', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Earthshatter Stomp',
        short_description='Stomp the ground to knock down your foes',
        target="Everything in a \\areamed radius from you that is on solid ground",
        effect_text="""
            Make an attack vs. Reflex against each target.
            You take a -4 penalty to accuracy with this attack against your \\glossterm<allies>.
            \\hit Each target takes bludgeoning damage equal to 4d6 plus half your \\glossterm<power>.
            Each Large or smaller creature that loses \\glossterm<hit points> from this damage is knocked \\glossterm<prone>.
            \\glance As above, except that that each target takes half damage.
        """,
        rank=6,
        tags=[],
        lists=['Martial', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Leaping Strike',
        short_description='Jump and make a strike',
        target=None,
        effect_text="""
            You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to half your \\glossterm<base speed> (see \\pcref<Leap>).
            You can make a melee \\glossterm<strike> from any location you occupy during the motion, including both your initial leap and your fall afterwards (if any).
        """,
        rank=3,
        tags=[],
        lists=['Esoteric', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Leaping Impact Strike',
        short_description='Jump and make a strike that shares falling damage',
        target=None,
        effect_text="""
            You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to half your \\glossterm<base speed> (see \\pcref<Leap>).
            You can make a melee \\glossterm<strike> from any location you occupy during the motion, including both your initial leap and your fall afterwards (if any).
            If you hit with the strike, the target takes half of the \\glossterm<falling damage> that you would normally take based on the height of the jump, ignoring any of your abilities that reduce that damage.
        """,
        rank=6,
        tags=[],
        lists=['Esoteric', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Liver Shot',
        short_description='Make a weak strike vs. Fortitude that nauseates',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            The attack is made against each target's Fortitude defense instead of its Armor defense.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            Each creature that loses hit points from the strike is \\glossterm<sickened> as a \\glossterm<condition>.
        """,
        rank=1,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Nauseating Liver Shot',
        short_description='Make a weak strike vs. Fortitude that nauseates',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            The attack is made against each target's Fortitude defense instead of its Armor defense.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            Each creature that loses hit points from the strike is \\glossterm<nauseated> as a \\glossterm<condition>.
        """,
        rank=3,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Nauseating Liver Crush',
        short_description='Make a strike that paralyzes',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            The attack is made against each target's Fortitude defense instead of its Armor defense.
            Your \\glossterm<power> with the strike is halved.
            Each creature that loses hit points from the strike is \\glossterm<nauseated> as a \\glossterm<condition>.
        """,
        rank=6,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Power Strike',
        short_description='Make a strike that trades accuracy for damage',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a -2 penalty to \\glossterm<accuracy>.
            You gain a +2d bonus to damage with the strike.
        """,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Greater Power Strike',
        short_description='Make a strike that trades accuracy for more damage',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a -2 penalty to \\glossterm<accuracy>.
            You gain a +4d bonus to damage with the strike.
        """,
        rank=5,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Pulverizing Smash',
        short_description='Make a strike against Fortitude defense',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            The attack is made against each target's Fortitude defense instead of its Armor defense.
            You take -1d penalty to damage with the strike.
        """,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Pulverizing Power Smash',
        short_description='Make a powerful strike against Fortitude defense',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon with a -2 penalty to accuracy.
            The attack is made against each target's Fortitude defense instead of its Armor defense.
            You gain a +1d bonus to damage with the strike.
        """,
        rank=3,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Rapid Flurry',
        short_description='Make two strikes',
        target=None,
        effect_text="""
            Make two melee \\glossterm<strikes> with a -2 penalty to \\glossterm<accuracy>.
            You take a -2d penalty to damage with both strikes, and your \\glossterm<power> is \\glossterm<halved>.
        """,
        rank=3,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Power Flurry',
        short_description='Make two powerful strikes with low accuracy',
        target=None,
        effect_text="""
            Make two \\glossterm<strikes> with a -4 penalty to \\glossterm<accuracy>.
        """,
        rank=5,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Triple Flurry',
        short_description='Make three strikes',
        target=None,
        effect_text="""
            Make three melee \\glossterm<strikes> with a -3 penalty to \\glossterm<accuracy>.
            You take a -2d penalty to damage with all strikes, and your \\glossterm<power> is \\glossterm<halved>.
        """,
        rank=7,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Reaping Charge',
        short_description='Make strikes while moving in a line',
        target="See text",
        effect_text="""
            Move up to half your movement speed in a straight line.
            You can make a melee \\glossterm<strike> using a slashing or bludgeoning weapon.
            Your \\glossterm<power> with the strike is halved.
            The strike targets any number of creatures and objects within your \\glossterm<reach> at any point during your movement, except for the space you start in and the space you end in.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Reaping Harvest',
        short_description='Make strikes while moving',
        target=None,
        effect_text="""
            Move up to your movement speed.
            You can make a melee \\glossterm<strike> using a slashing or bludgeoning weapon.
            Your \\glossterm<power> with the strike is halved.
            The strike targets any number of creatures and objects within your \\glossterm<reach> at any point during your movement, except for the space you start in and the space you end in.
        """,
        rank=6,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Strip the Flesh',
        short_description='Make a strike that is exposes weaknesses',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a slashing weapon.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            Each creature that loses hit points from the strike becomes \\glossterm<vulnerable> to slashing damage as a \\glossterm<condition>.
        """,
        rank=1,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Fleshripping Slash',
        short_description='Make a strike that exposes more weaknesses',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a slashing weapon.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            Each creature that loses hit points from the strike becomes \\glossterm<vulnerable> to \\glossterm<physical damage> as a \\glossterm<condition>.
        """,
        rank=3,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Armorbreak Strike',
        short_description='Make a strike that strips away resistances',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a +2 bonus to \\glossterm<accuracy>.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            Each creature that resists all damage from the strike takes the damage from this strike again.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Sweeping Strike',
        short_description='Make weak strikes against nearby foes',
        target="Up to three creatures or objects within your weapon's \\glossterm<reach> (see text)",
        effect_text="""
            Make a melee \\glossterm<strike> using a slashing or bludgeoning weapon against each target.
            Your \\glossterm<power> with the strike is halved.
        """,
        rank=2,
        tags=[],
        lists=['Martial', 'Primal', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Sweeping Smash',
        short_description='Make strikes against nearby foes',
        target="Up to three creatures or objects within your weapon's \\glossterm<reach> (see text)",
        effect_text="""
            Make a melee \\glossterm<strike> using a slashing or bludgeoning weapon against each target.
        """,
        rank=5,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Whirlwind',
        short_description='Make strikes against all nearby foes',
        target="All \\glossterm<enemies> within your weapon's \\glossterm<reach>",
        effect_text="""
            Make a melee \\glossterm<strike> using a light or medium slashing weapon against each target.
            Your \\glossterm<power> with the strike is halved.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Whirlwind Flurry',
        short_description='Make strikes against all nearby foes',
        target="All \\glossterm<enemies> within your weapon's \\glossterm<reach>",
        effect_text="""
            Make two melee \\glossterm<strikes> with a -2 penalty to \\glossterm<accuracy> using a light or medium slashing weapon against each target.
            You take a -2d penalty to damage with both strikes, and your \\glossterm<power> is halved.
        """,
        rank=7,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Challenging Strike',
        short_description='Make a strike and draw attention',
        target=None,
        effect_text="""
            Make a \\glossterm<strike>.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            Each creature that takes damage from the strike takes a -2 penalty to \\glossterm<accuracy> against creatures other than you as a \\glossterm<condition>.
            This condition is removed if another creature applies this condition to the same target.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Penetrating Strike',
        short_description='Make a strike against Reflex defense',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a piercing weapon.
            The attack is made against each target's Reflex defense instead of its Armor defense.
            You take a -1d penalty to damage with the strike.
        """,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Precise Penetrating Strike',
        short_description='Make an accurate strike against Reflex defense',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a +2 bonus to \\glossterm<accuracy> using a piercing weapon.
            The attack is made against each target's Reflex defense instead of its Armor defense.
            You take a -1d penalty to damage with the strike.
        """,
        rank=5,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Rally the Troops',
        short_description='Suppress conditions on allies',
        target="You and your \\glossterm<allies> within a \\areamed radius from you",
        effect_text="""
            Each target can ignore any effects from one \\glossterm<condition> it is already affected by until the end of the next round.
            Because this ability has the \\glossterm<Swift> tag, it allows your allies to ignore conditions they would be affected by during the current phase.
        """,
        rank=2,
        rank_upgrades={
            '4': 'The area increases to a \\arealarge radius from you.',
            '6': 'The area increases to a \\areahuge radius from you.',
        },
        tags=['Swift'],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Brow Gash',
        short_description="Make a strike that bleeds into the target's eyes",
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a slashing weapon.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            If a creature loses hit points from the strike, it is \\glossterm<blinded> as a \\glossterm<condition>.
        """,
        rank=6,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Hamstring',
        short_description='Make a strike that slows',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a slashing weapon.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            If a creature loses hit points from the strike, it is \\glossterm<slowed> as a \\glossterm<condition>.
        """,
        rank=1,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Greater Hamstring',
        short_description='Make a strike that slows',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a slashing weapon.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            If a creature loses hit points from the strike, it is \\glossterm<immobilized> as a \\glossterm<condition>.
        """,
        rank=6,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Hunting Strike',
        short_description='Make a strike and gain an accuracy bonus against the target',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> against a creature.
            After making the strike, you gain a +1 bonus to \\glossterm<accuracy> against one target of the strike with all future attacks.
            If the strike had multiple targets, you choose which target you gain the bonus against.
            This effect stacks with itself, up to a maximum of a +4 bonus.
            It lasts until you take a \\glossterm<short rest> or use this ability on a different creature.
        """,
        tags=[],
        lists=['Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Headshot',
        short_description='Make a strike that stuns',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            If a creature loses hit points from the strike, it is \\glossterm<dazed> as a \\glossterm<condition>.
        """,
        rank=1,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Stunning Headshot',
        short_description='Make a strike that stuns',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            If a creature loses hit points from the strike, it is \\glossterm<stunned> as a \\glossterm<condition>.
        """,
        rank=3,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Confusing Headshot',
        short_description='Make a strike that confuses',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            If a creature loses hit points from the strike, it is \\glossterm<confused> as a \\glossterm<condition>.
        """,
        rank=6,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Second Wind',
        short_description='Recover hit points',
        target='Yourself',
        effect_text="""
            When you use this ability, you gain one \\glossterm<fatigue point>.

            You regain hit points equal to your maximum \\glossterm<hit points>.
            After you use this ability, you cannot use it again until you take a \\glossterm<short rest>.

            Because this is a \\glossterm<Swift> ability, this healing happens before you suffer the effects of attacks in the current phase.
        """,
        rank=4,
        tags=['Swift'],
        lists=['Esoteric', 'Martial', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Distant Shot',
        short_description='Make a long-ranged strike',
        target=None,
        effect_text="""
            Make a ranged \\glossterm<strike>.
            You reduce your penalties for \\glossterm<range increments> by 2.
        """,
        rank=2,
        tags=[],
        lists=['Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Deattunement Strike',
        short_description="Make a strike to break a target's \\glossterm<attunement>",
        target=None,
        effect_text="""
            Make a \\glossterm<strike>.
            You take a -2d penalty to damage with the strike.
            If a creature loses hit points from the strike, it stops being \\glossterm<attuned> to two effects.
            It can freely choose which effects it releases its attunement to.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Spellbreaker Strike',
        short_description="Make a strike to break a strong target's \\glossterm<attunement>",
        target=None,
        effect_text="""
            Make a \\glossterm<strike>.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
            If a creature takes damage from the strike, it stops being \\glossterm<attuned> to one effect.
            It can freely choose which effect it releases its attunement to.
        """,
        rank=5,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Spring Attack',
        short_description='Make a strike and continue moving',
        target=None,
        effect_text="""
            Move up to half your movement speed and make a melee \\glossterm<strike>.
            Your \\glossterm<power> with the strike is halved.
            If you use this ability during the \\glossterm<action phase>, you may use the other half of your movement during the \\glossterm<delayed action phase>.
        """,
        rank=3,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name="Wanderer's Strike",
        short_description='Make a strike and move',
        target=None,
        effect_text="""
            You can either move up to half your speed or make a \\glossterm<strike>.
            Your \\glossterm<power> with the strike is halved.
            %TODO: wording
            During the \\glossterm<delayed action phase>, you can take the action you did not take during the \\glossterm<action phase>.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Shield Slam',
        short_description='Make a dazing strike with a shield',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a shield.
            Your \\glossterm<power> with the strike is halved.
            If a creature loses hit points from the strike, it is \\glossterm<sickened> as a \\glossterm<condition>.
        """,
        rank=1,
        tags=[],
        lists=['Martial', 'Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Nauseating Shield Slam',
        short_description='Make a dazing strike with a shield',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a shield.
            Your \\glossterm<power> with the strike is halved.
            If a creature loses hit points from the strike, it is \\glossterm<nauseated> as a \\glossterm<condition>.
        """,
        rank=3,
        tags=[],
        lists=['Martial', 'Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Dazing Fist',
        short_description='Make a sickening strike with an unarmed attack',
        target=None,
        effect_text="""
            Make a strike using an \\glossterm<unarmed attack>.
            Your \\glossterm<power> with the strike is halved.
            If a creature loses hit points from the strike, it is \\glossterm<dazed> as a \\glossterm<condition>.
        """,
        rank=1,
        tags=[],
        lists=['Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Stunning Fist',
        short_description='Make a sickening strike with an unarmed attack',
        target=None,
        effect_text="""
            Make a strike using an \\glossterm<unarmed attack>.
            Your \\glossterm<power> with the strike is halved.
            If a creature loses hit points from the strike, it is \\glossterm<stunned> as a \\glossterm<condition>.
        """,
        rank=3,
        tags=[],
        lists=['Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Quivering Palm',
        short_description='Make a devastating strike with an unarmed attack',
        target=None,
        effect_text="""
            Make a strike using an \\glossterm<unarmed attack>.
            Your \\glossterm<power> with the strike is halved.
            If a creature loses hit points from the strike, it loses additional hit points equal to half its maximum hit points.
        """,
        rank=7,
        tags=[],
        lists=['Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Feint',
        short_description='Fake an attack to take an opponent off guard',
        target=None,
        effect_text="""
            Make a melee \\glossterm<strike> with a +2 bonus to \\glossterm<accuracy>.
            The attack is made against each target's Reflex defense instead of its Armor defense.
            The strike deals minimum damage, and your \\glossterm<power> is halved.
            If a creature takes damage from the strike, it takes a -2 penalty to Armor defense until the end of the next round.
        """,
        rank=1,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Reckless Strike',
        short_description='Sacrifice defenses to make a powerful strike',
        target=None,
        effect_text="""
            Make a melee \\glossterm<strike>.
            You gain a +1d bonus to damage with the strike.
            During the next round, you take a -2 penalty to all defenses.
        """,
        rank=2,
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Reckless Flurry',
        short_description='Sacrifices defenses to make two strike',
        target=None,
        effect_text="""
            Make two melee \\glossterm<strikes>.
            You take a -2d penalty to damage with both strikes, and your \\glossterm<power> is \\glossterm<halved>.
            During the next round, you take a -2 penalty to all defenses.
        """,
        rank=5,
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Knockdown',
        short_description='Knock a foe prone with brute force',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            The attack is made against each target's Fortitude defense instead of its Armor defense.
            Your \\glossterm<power> with the strike is halved.
            If a creature loses hit points from the strike, it falls \\glossterm<prone>.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Defensive Strike',
        short_description='Make a careful strike without lowering your defenses',
        target=None,
        effect_text="""
            Make a melee \\glossterm<strike>.
            Your \\glossterm<power> with the strike is halved.
            In exchange, you gain a +2 bonus to Armor and Reflex defenses until the end of the round.
            The defense bonus is a \\glossterm<Swift> effect, so it protects you from attacks in the current phase.
        """,
        rank=2,
        tags=['Swift (see text)'],
        lists=['Esoteric', 'Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Quickdraw',
        short_description='Rapidly draw a new weapon and attack with it',
        target=None,
        effect_text="""
            You draw one or two weapons into your \\glossterm<free hands>.
            Then, you can make a \\glossterm<strike>.
        """,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Spellbane Strike',
        short_description='Attack vulnerabilities in focusing foes',
        target=None,
        effect_text="""
            Make a melee \\glossterm<strike>.
            You gain a +2 bonus to \\glossterm<accuracy> with the strike against each creature that is using a \\glossterm<Focus> ability during the current phase.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Spellbane Flurry',
        short_description='Make two strikes that exploit vulnerabilities in focusing foes',
        target=None,
        effect_text="""
            Make two melee \\glossterm<strikes>.
            Your \\glossterm<power> with both strikes is halved.
            You take a -4 penalty to \\glossterm<accuracy> with the strikes against any target that is not using a \\glossterm<Focus> ability during the current phase.
        """,
        rank=6,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Focused Strike',
        short_description='You concentrate to strike a critical blow',
        target="One creature within \\rngshort range",
        effect_text="""
            You can only use this ability during the \\glossterm<action phase>.
            During that phase, you concentrate on your target.
            You only suffer a \\glossterm<focus penalty> for this attack during the action phase.

            During the \\glossterm<delayed action phase>, you can make a melee \\glossterm<strike> against the target.
            Your \\glossterm<power> with the strike is halved.
            The attack roll \\glossterm<explodes> regardless of what you roll.
        """,
        rank=2,
        tags=['Focus'],
        lists=['Esoteric', 'Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Leap Slam',
        short_description='Jump and slam into the ground',
        target="Everything adjacent to you that is on earth or unworked stone (see text)",
        effect_text="""
            You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to your \\glossterm<base speed> (see \\pcref<Leap>).
            When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning damage equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.

            \\rankline
            The damage increases by +1d for each rank beyond 4.
        """,
        rank=4,
        tags=[],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Frenzied Strike',
        short_description='Make a melee strike that becomes stronger when repeated',
        target=None,
        effect_text="""
            Make a melee \\glossterm<strike>.
            % This would be easier to write as +1d up to +3d, but that is very
            % annoying to track in practice due to the different dice for each stage.
            % A static damage bonus is more complex to write down, but much easier
            % to actually make attacks with.
            For each previous consecutive round that you used this ability, you gain a +1 bonus to damage with the strike, up to a maximum of +3.

            \\rankline
            The damage bonus for each consecutive round increases by 1 for each rank beyond 1.
            In addition, the maximum damage bonus increases by 3 for each rank beyond 1.
        """,
        tags=[],
        lists=['Martial', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Retreating Strike',
        short_description='Make a strike and back away from your target',
        target=None,
        effect_text="""
            Make a melee \\glossterm<strike> and move up to half your movement speed in a straight line away from one target of the strike.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Barrage',
        short_description='Make rapid ranged strikes while staying in place',
        target=None,
        effect_text="""
            Make two ranged \\glossterm<strikes> with a -4 penalty to \\glossterm<accuracy>.
            Your \\glossterm<power> with the both strikes is halved.
            For each previous round that you used this ability without moving, you reduce the accuracy penalty by 1.
        """,
        rank=4,
        tags=[],
        lists=['Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Point Blank Shot',
        short_description='Make a projectile strike in melee range',
        target=None,
        effect_text="""
            Make a ranged \\glossterm<strike> using a \\glossterm<projectile> weapon against a creature adjacent to you.
            You are not \\glossterm<defenseless> against that creature during the current phase.
        """,
        rank=2,
        tags=[],
        lists=['Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Ricochet',
        short_description='Make a thrown strike that hits multiple targets',
        target="Up to three creatures or objects in a \\areasmall radius within \\rngshort range (see text)",
        effect_text="""
            Make a thrown \\glossterm<strike> using a single weapon that deals slashing or bludgeoning damage against each target.
            Your \\glossterm<power> with the strike is halved.
            If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Deathblow',
        short_description='Make a powerful strike to finish off weak foes',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> with a +2d bonus to damage.
            If a target has any \\glossterm<resistance> against the strike, this strike deals no damage to that target.
        """,
        rank=3,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Lunge',
        short_description='Strike foes in a line',
        target="\\glossterm<Enemies> in a 10 ft. long, 5 ft.\\ wide line from you",
        effect_text="""
            The line for this effect must point directly away from you.
            Only one of the spaces in the line can be adjacent to you.

            Make a melee \\glossterm<strike> using a piercing weapon against each target.
            Your \\glossterm<power> with the strike is halved.
        """,
        rank=1,
        tags=[],
        lists=['Martial', 'Primal', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Volley Fire',
        short_description='Fire a flurry of projectiles to blanket an area',
        target="Each creature in a \\areasmall radius within \\rngmed range.",
        effect_text="""
            Make a ranged \\glossterm<strike> using a projectile weapon against each target.
            Your \\glossterm<power> with the strike is halved.
            This strike costs one projectile per target.
        """,
        rank=5,
        tags=[],
        lists=['Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Arrowstorm',
        short_description='Fire a flurry of projectiles to blanket a large area',
        target='Each creature in a \\areamed radius within \\rnglong range.',
        rank=7,
        effect_text="""
            Make a ranged \\glossterm<strike> using a projectile weapon against each target.
            Your \\glossterm<power> with the strike is halved.
            This strike costs one projectile per target.
        """,
        tags=[],
        lists=['Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Penetrating Shot',
        short_description='Fire a powerful projectile in a line',
        target='Everything in a \\areamed, 5 ft.\\ wide line from you',
        effect_text="""
            Make a ranged \\glossterm<strike> against each target.
            Your \\glossterm<power> with the strike is halved.
        """,
        rank=3,
        tags=[],
        lists=['Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Slipstrike',
        short_description='Make an enthusiastic melee strike and fall prone',
        target=None,
        effect_text="""
            Make a melee \\glossterm<strike> with a +1d bonus to damage.
            After making the strike, you fall \\glossterm<prone>.
            % TODO: This is obviously a hack
            If you use this ability during the \\glossterm<delayed action phase>, you cannot move during the \\glossterm<movement phase> of the following round.
        """,
        rank=2,
        tags=[],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Ground Slam',
        short_description='Slam your weapon into the ground to deal damage in a line',
        target='Everything on the ground in a \\areasmall, 10 ft. wide line from you',
        effect_text="""
            Make a melee \\glossterm<strike> using a bludgeoning weapon against each target.
            Your \\glossterm<power> with the strike is halved.
            All damage dealt by this attack is bludgeoning damage instead of its normal types.
        """,
        rank=3,
        tags=[],
        lists=['Martial', 'Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Titanic Slam',
        short_description='Slam your weapon into the ground to deal damage in a line',
        target='Everything on the ground in a \\arealarge, 10 ft. wide line from you',
        effect_text="""
            Make a melee \\glossterm<strike> using a bludgeoning weapon against each target.
            Your \\glossterm<power> with the strike is halved.
            All damage dealt by this attack is bludgeoning damage instead of its normal types.
        """,
        rank=5,
        tags=[],
        lists=['Martial', 'Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Injection',
        short_description='Make a strike that excels at injecting poison',
        target=None,
        effect_text="""
            Make a \\glossterm<strike> using a piercing weapon.
            If a creature loses hit points from the strike, you gain a +4 accuracy bonus with injury-based poisons delivered with the strike.
        """,
        rank=2,
        tags=[],
        lists=['Trick', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Vault Over',
        short_description='Leap around a foe and make a strike',
        target="One creature adjacent to you no more than one size category larger than you",
        effect_text="""
            Make a Jump attack against the target's Reflex defense.
            If you hit, you leap up over its body, using its body as a springboard if necessary, and land in any space adjacent to it.
            % TODO: wording
            Your final destination cannot be more distant from your starting location than your \\glossterm<land speed>.
            You can make a \\glossterm<strike> from any location you occupy during the leap.
        """,
        rank=4,
        tags=[],
        lists=['Esoteric', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Strangle',
        short_description='Grapple a creature by the throat',
        target="One creature within your \\glossterm<reach>",
        effect_text="""
            % Flipped defense order because it reads weirdly otherwise
            Make an melee attack with a free hand against the target's Fortitude and Reflex defenses.
            On a hit against both defenses, the target takes bludgeoning damage equal to 1d10 plus your \\glossterm<power>.
            In addition, you and the target are \\glossterm<grappled> by each other.
            For details, see \\pcref<Grappling>.

            \\rankline
            The damage increases by +1d for each rank beyond 2.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Momentum Smash',
        target=None,
        short_description='Make a strike with extra power from your movement',
        effect_text="""
            Make a melee \\glossterm<strike> using a bludgeoning or piercing weapon.
            If your movement during the \\glossterm<movement phase> consisted entirely of moving at least 20 feet in a straight line towards your target, you gain a +1d bonus to damage with the strike.
        """,
        rank=1,
        tags=[],
        lists=['Primal', 'Martial', 'Esoteric', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Meteor Smash',
        target=None,
        short_description='Make a strike with extra power from your movement',
        effect_text="""
            Make a melee \\glossterm<strike> using a bludgeoning or piercing weapon.
            If your movement during the \\glossterm<movement phase> consisted entirely of moving at least 20 feet in a straight line towards your target, you gain a +3d bonus to damage with the strike.
        """,
        rank=5,
        tags=[],
        lists=['Primal', 'Martial', 'Esoteric', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Flash Strike',
        target=None,
        short_description='Move impossibly fast and make a strike',
        effect_text="""
            You \\glossterm<teleport> into an unoccupied destination on a stable surface within \\rngshort range.
            In addition, you can make a melee \\glossterm<strike> against any single creature within a 5 ft.\\ wide line between your starting location and your ending location.
        """,
        rank=5,
        tags=[],
        lists=['Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Two-Weapon Rend',
        short_description='Make a strike with bonus damage if you hit with two weapons',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a melee strike.
            Each target that you hit during this phase with both that strike and the \\textit<offhand strike> ability takes slashing damage equal to your \\glossterm<power>.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Flintspark Strike',
        short_description='Make a strike that deals fire damage to armored foes',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a strike using a slashing weapon.
            If the target is wearing metal armor or is significantly composed of metal, damage dealt by the strike is fire damage in addition to its normal damage types.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Resonating Strike',
        short_description='Make a strike that deals sonic damage',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a strike using a bludgeoning weapon.
            Damage dealt by the strike is sonic damage in addition to its normal damage types.
        """,
        rank=3,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Resonating Crush',
        short_description='Make a strike vs. Fortitude that deals sonic damage',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a strike using a bludgeoning weapon.
            The attack is made against each target's Fortitude defense instead of its Armor defense.
            You take -1d penalty to damage with the strike.
            Damage dealt by the strike is sonic damage in addition to its normal damage types.
        """,
        rank=4,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    return maneuvers

def generate_maneuver_latex():
    maneuvers_by_rank = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
    }
    for maneuver in generate_maneuvers():
        maneuvers_by_rank[maneuver.rank].append(maneuver)

    maneuver_texts = []
    for rank in maneuvers_by_rank.keys():
        maneuvers = sorted(maneuvers_by_rank[rank], key=lambda m: m.name)
        maneuver_texts.append(f"\\subsection<Rank {rank} Maneuvers>")
        for maneuver in maneuvers:
            try:
                maneuver_texts.append(maneuver.to_latex())
            except Exception as e:
                raise Exception(f"Error converting maneuver '{maneuver.name}' to LaTeX") from e
    return latexify('\n'.join(maneuver_texts))


def generate_maneuver_list_latex():
    maneuvers_by_source = group_by_source(generate_maneuvers())
    return latexify(
        "\n\n".join([
            latex_for_source(source, maneuvers_by_source[source])
            for source in sorted(maneuver_sources)
        ])
    )

def group_by_source(maneuvers):
    by_source = {source: [] for source in maneuver_sources}
    for maneuver in maneuvers:
        for source in maneuver_sources:
            if source in maneuver.lists:
                by_source[source].append(maneuver)
    return by_source

def latex_for_source(source, maneuvers):
    maneuver_headers = []
    for maneuver in sorted(maneuvers, key=lambda m: str(m.rank) + m.name):
        maneuver_headers.append(f"\\maneuverhead[{maneuver.rank}]<{maneuver.name}> {maneuver.short_description}.")

    maneuver_list = "\n".join(maneuver_headers)
    return f"""
        \\small
        \\subsection<{source} Maneuvers>\\label<{source} Maneuvers>
            \\begin<spelllist>
                {maneuver_list}
            \\end<spelllist>
    """

def write_to_file():
    maneuver_latex = generate_maneuver_latex()
    maneuver_list_latex = generate_maneuver_list_latex()

    with open(book_path('maneuver_descriptions.tex'), 'w') as maneuver_descriptions_file:
        maneuver_descriptions_file.write(maneuver_latex)
    with open(book_path('maneuver_lists.tex'), 'w') as maneuver_lists_file:
        maneuver_lists_file.write(maneuver_list_latex)

@click.command()
@click.option('-o', '--output/--no-output', default=False)
def main(output):
    if output:
        write_to_file()
    else:
        print(generate_maneuver_latex())

if __name__ == "__main__":
    main()
