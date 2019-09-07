#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.maneuver import Maneuver
from rise.latex.util import latexify
from rise.statistics.rise_data import maneuver_sources

def generate_maneuvers():
    maneuvers = []

    maneuvers.append(Maneuver(
        name='Battle Cry',
        short_description='Inspire allies',
        effect_text="""
            Each \\glossterm<ally> that can hear you gains a +1 bonus to \\glossterm<accuracy> with \\glossterm<physical attacks> until the end of the next round.
            This does not affect attacks during the current phase.
        """,
        rank_upgrades={
            '3': 'The ability also affects you.',
            '5': 'Each target also gains a +2 bonus to Mental defense.',
            '7': 'The accuracy bonus increases to +2.',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Brace for Impact',
        short_description='Take half damage',
        effect_text="""
                You take half damage from all attacks this round.
                This halving is applied before \\glossterm<resistances> and similar abilities.
        """,
        rank_upgrades={
            # Alternate idea: bonuses against attackers
            '3': 'You can also negate a condition that would be applied to you while this ability lasts.',
            '5': 'This ability lasts until the end of the next round.',
            '7': 'You are also immune to conditions while this ability lastss.',
        },
        tags=['Swift'],
        lists=['Martial', 'Primal', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Certain Strike',
        short_description='Make a strike with +1 accuracy',
        effect_text="""
                Make a \\glossterm<strike> with a +1 bonus to accuracy.
        """,
        rank_upgrades={
            '3': 'The accuracy bonus increases to +2.',
            '5': 'You also reroll any \\glossterm<miss chances>, such as when attacking \\glossterm<invisible> creatures, and take the better result.',
            '7': 'The accuracy bonus increases to +4.',
        },
        tags=[],
        lists=['Martial', 'Primal', 'Trick', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Counterattack',
        short_description='Make a strike with bonuses if attacked',
        effect_text="""
                Make a \\glossterm<strike>.
                If the target attacked you earlier in the current round, you gain a +1 bonus to \\glossterm<accuracy> and a +1d bonus to damage with the strike.
        """,
        rank_upgrades={
            '3': 'The damage bonus increases to +2d.',
            '5': 'You also gain the bonuses if the target attacked you in the previous round.',
            '7': 'The damage bonus increases to +4d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Daunting Blow',
        short_description='Make a strike that inflicts fear',
        effect_text="""
                Make a \\glossterm<strike> with a -2d penalty to damage.
                If the attack result hits the target's Mental defense,
                    it is \\glossterm<shaken> by you as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '3': 'On a \\glossterm<critical hit>, the target is \\glossterm<panicked> instead of shaken.',
            '5': 'The target is \\glossterm<frightened> instead of shaken.',
            '7': 'The target is panicked instead of frightened.',
        },
        tags=['Emotion'],
        lists=['Primal', 'Martial', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Demoralizing Shout',
        short_description='Inflict fear on nearby enemies',
        effect_text="""
                Make an attack vs. Mental against all enemies within a \\areasmall radius from you.
                \\hit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '3': 'The area increases to a \\areamed radius from you.',
            '5': 'Each target is \\glossterm<frightened> instead of shaken.',
            '7': 'The area increases to a \\areahuge radius from you.',
        },
        tags=['Emotion'],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Ground Pound',
        short_description='Knock foes prone and make a strike',
        effect_text="""
                You can only use this ability while standing on solid ground.
                Make an attack vs. Reflex against all enemies within a \\areasmall radius from you who are no more than one size category larger than you and standing on solid ground.
                If you use this ability during the \\glossterm<action phase>, you can also make a \\glossterm<strike> during the \\glossterm<delayed action phase>.
                \\hit Each target is knocked \\prone.
        """,
        rank_upgrades={
            '3': 'You gain a +1d bonus to damage with the strike.',
            '5': 'The area increases to a \\arealarge radius from you.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Leaping Strike',
        short_description='Jump and make a strike',
        effect_text="""
                You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to your \\glossterm<base speed> (see \\pcref<Leap>).
                You can make a melee \\glossterm<strike> from any location you occupy during the leap.
        """,
        rank_upgrades={
            '3': "You gain a +1d bonus to damage with the strike if you attack while above the target's space.",
            '5': 'If you hit another creature with the strike that is of your size category or larger, you take no falling damage from the leap.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Liver Shot',
        short_description='Make a strike that sickens',
        effect_text="""
            Make a \\glossterm<strike> with a -2d penalty to damage.
            If the attack result hits the target's Fortitude defense,
                it is \\glossterm<sickened> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '3': 'On a \\glossterm<critical hit>, the target is is \\glossterm<paralyzed> instead of sickened.',
            '5': 'The target is \\glossterm<nauseated> instead of sickened.',
            '7': 'The target is \\glossterm<paralyzed> instead of nauseated.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Power Attack',
        short_description='Make a strike with +1d damage',
        effect_text="""
                Make a \\glossterm<strike> with a +1d bonus to damage.
        """,
        rank_upgrades={
            '3': 'The damage bonus increases to +2d.',
            '5': 'The damage bonus increases to +3d.',
            '7': 'The damage bonus increases to +4d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Pulverizing Smash',
        short_description='Make a strike against Fortitude defense',
        effect_text="""
                Make a \\glossterm<strike>.
                The attack is made against the target's Fortitude defense instead of its Armor defense.
        """,
        rank_upgrades={
            '3': 'You gain a +1d bonus to damage with the strike.',
            '5': 'If the strike deals damage, the target takes a -2 penalty to Fortitude defense as a \\glossterm<condition>.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Rapid Assault',
        short_description='Make two strikes',
        effect_text="""
                Make two \\glossterm<strikes> divided as you choose among up to two targets.
                You take a -2 penalty to accuracy and a -2d penalty to damage on both strikes.
        """,
        rank_upgrades={
            '3': 'The accuracy penalty is reduced to -1.',
            '5': 'The damage penalty is reduced to -1d.',
            '7': 'The accuracy and damage penalties are removed.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Reaping Charge',
        short_description='Make strikes while moving in a line',
        effect_text="""
                Move up to your movement speed in a straight line.
                You can make a melee \\glossterm<strike> with a slashing or bludgeoning weapon.
                The strike targets any number of creatures and objects that you \\glossterm<threaten> at any point during your movement, except for the space you start in and the space you end in.
                You take a -1 penalty to \\glossterm<accuracy> on the strike.
        """,
        rank_upgrades={
            '3': 'You gain a +1d bonus to damage with the strike.',
            '5': 'You can move in any direction during the movement instead of only in a straight line.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Strip the Flesh',
        short_description='Make a weak strike that is extremely painful',
        effect_text="""
            Make a \\glossterm<strike> using a slashing weapon with a -2d penalty to damage.
            If the strike deals damage, the target loses an additional \\glossterm<hit point>.
        """,
        rank_upgrades={
            '3': 'You gain a +1 bonus to \\glossterm<accuracy> with the strike.',
            '5': 'If the strike deals damage, the target is also \\glossterm<sickened> as a \\glossterm<condition>.',
            '7': 'The accuracy bonus increases to +3.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Sweeping Strike',
        short_description='Make strikes against three foes',
        effect_text="""
                Make a melee \\glossterm<strike> with a slashing or bludgeoning weapon.
                The strike targets each of up to two creatures or objects you \\glossterm<threaten>.
        """,
        rank_upgrades={
            '3': 'You gain a +1d bonus to damage with the strike.',
            '5': 'You can target a third creature with the strike.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Thunderous Shout',
        short_description='Deal damage in a cone',
        effect_text="""
            Make an attack vs. Fortitude against everything in a \\areamed cone-shaped burst from you.
            You take a -1 penalty to \\glossterm<accuracy> with the attack.
            \\hit Each target takes energy \\glossterm<standard damage>.
        """,
        rank_upgrades={
            '3': 'You gain a +1d bonus to damage with the shout.',
            '5': 'The area increases to \\arealarge.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Whirlwind Spin',
        short_description='Make strikes against all threatened foes',
        effect_text="""
                Make a melee \\glossterm<strike> with a slashing weapon.
                The strike targets any number of creatures you \\glossterm<threaten>.
                You take a -1 penalty to \\glossterm<accuracy> with the strike.
        """,
        rank_upgrades={
            '3': 'You gain a +1d bonus to damage with the strike.',
            '5': """
                You can move up to 5 feet when you use this ability.
                The strike targets all creatures you threaten at any point in your movement.
            """,
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Challenge',
        short_description='Make a strike and draw attention',
        effect_text="""
            Make a melee \\glossterm<strike>.
            If the strike beats the target's Mental defense, it takes a -2 penalty to \\glossterm<accuracy> with \\glossterm<strikes> against creatures other than you as a \\glossterm<condition>.
            This condition is removed if another creature applies this condition to the same target.
        """,
        rank_upgrades={
            '3': 'The penalty increases to -3.',
            '5': 'As part of the same condition, target also moves at half speed while you \\glossterm<threaten> it.',
            '7': 'The penalty increases to -5.',
        },
        tags=[],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Penetrating Strike',
        short_description='Make a strike against Reflex defense',
        effect_text="""
            Make a \\glossterm<strike> with a piercing weapon.
            The attack is made against the target's Reflex defense instead of its Armor defense.
        """,
        rank_upgrades={
            '3': 'You gain a +1d bonus to damage with the strike.',
            '5': 'If you deal damage with the strike, the target takes a -2 penalty to Armor defense as a \\glossterm<condition>.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Martial', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Rally the Troops',
        short_description='Suppress conditions on allies',
        effect_text="""
            You and your \\glossterm<allies> within a \\areamed radius from you are immune to \\glossterm<conditions> this round.
            In addition, each target suffers no penalties from any conditions it currently has this round.
        """,
        rank_upgrades={
            '3': 'One target can also remove a \\glossterm<condition>.',
            '5': 'The area increases to a \\arealarge radius from you.',
            '7': 'Each target can also remove a \\glossterm<condition> instead of only one target.',
        },
        tags=['Swift'],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Hamstring',
        short_description='Make a strike that slows',
        effect_text="""
            Make a \\glossterm<strike> with a -2d penalty to damage.
            If the attack result hits the target's Fortitude defense,
                it is \\glossterm<slowed> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '3': 'The target is \\glossterm<decelerated> instead of slowed.',
            '5': 'The target is \\glossterm<immobilized> instead of decelerated.',
            '7': 'The damage penalty is removed.',
        },
        tags=[],
        lists=['Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Hunting Strike',
        short_description='Make a strike and gain an accuracy bonus against the target',
        effect_text="""
            Make a \\glossterm<strike> against a creature.
            After making the strike, you gain a +1 bonus to \\glossterm<accuracy> against the target with all attacks.
            This effect stacks with itself, up to a maximum of a +4 bonus.
            It lasts until you take a \\glossterm<short rest> or use this ability on a different creature.
        """,
        rank_upgrades={
            '3': 'The first time you hit a target with this ability, it provides a +2 bonus instead of a +1 bonus.',
            '5': 'The maximum accuracy bonus increases to +6.',
            '7': 'The first time you hit a target with this ability, it provides a +3 bonus instead of a +2 bonus.',
        },
        tags=[],
        lists=['Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Head Shot',
        short_description='Make a strike that dazes',
        effect_text="""
            Make a \\glossterm<strike> with a -2d penalty to damage.
            If the attack result hits the target's Mental defense,
                it is \\glossterm<dazed> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '3': 'On a \\glossterm<critical hit>, the target is also \\glossterm<confused>.',
            '5': 'The target is \\glossterm<confused> and dazed as part of the same condition.',
            '7': 'The target is \\glossterm<stunned> instead of dazed and confused.',
        },
        tags=['Emotion'],
        lists=['Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Second Wind',
        short_description='Recover hit points',
        effect_text="""
            You regain a \\glossterm<hit point>.
            You can only use this ability once between \\glossterm<short rests>.
        """,
        rank_upgrades={
            '3': 'If you have a \\glossterm<vital wound>, you regain two \\glossterm<hit points> instead of one.',
            '5': 'You can use the ability twice between \\glossterm<short rests>.',
            '7': 'You remove two \\glossterm<hit points> regardless of whether you have a \\glossterm<vital wound>.',
        },
        tags=[],
        lists=['Esoteric', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Distant Shot',
        short_description='Make a long-ranged strike',
        effect_text="""
            Make a ranged \\glossterm<strike>.
            You reduce your penalties for \\glossterm<range increments> with the strike by 2.
        """,
        rank_upgrades={
            '3': 'You gain a +1d bonus to damage with the strike.',
            '5': 'The penalty reduction increases to 4.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Agonizing Strike',
        short_description='Make a strike that sickens with pain',
        effect_text="""
            Make a \\glossterm<strike> with a -2d penalty to damage.
            If the attack result hits the target's Mental defense,
                it is \\glossterm<sickened> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '3': 'On a \\glossterm<critical hit>, the target is is \\glossterm<paralyzed> instead of sickened.',
            '5': 'The target is \\glossterm<nauseated> instead of sickened.',
            '7': 'The target is \\glossterm<paralyzed> instead of nauseated.',
        },
        tags=['Emotion'],
        lists=['Martial', 'Primal', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Deattunement Strike',
        short_description="Make a strike to break a target's \\glossterm<attunement>",
        effect_text="""
            Make a \\glossterm<strike>.
            If the attack result hits the target's Mental defense,
                it stops being \\glossterm<attuned> to one effect of its choice.
            This functions as if the target had used the \\textit<release attunement> ability,
                including allowing the target to regain its \\glossterm<action point> when it takes a \\glossterm<short rest>.
        """,
        rank_upgrades={
            '3': 'You gain a +1 bonus to \\glossterm<accuracy> with the strike.',
            '5': 'The target stops being \\glossterm<attuned> to two effects instead of one.',
            '7': 'The accuracy bonus increases to +3.',
        },
        tags=[],
        lists=['Esoteric', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Spring Attack',
        short_description='Make a strike and continue moving',
        effect_text="""
            Move up to your movement speed and make a melee \\glossterm<strike> with a -1d penalty to damage.
            If you use this ability during the \\glossterm<action phase>, you may continue moving during the \\glossterm<delayed action phase> if you have remaining movement available.
        """,
        rank_upgrades={
            '3': """
                If you have movement remaining after using this ability during the \\glossterm<action phase>,
                you gain a +2 bonus to Armor and Reflex defenses in the \\glossterm<delayed action phase>.
            """,
            '5': 'The damage penalty is removed.',
            '7': 'The bonus to defenses increases to +4.',
        },
        tags=[],
        lists=['Esoteric', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name="Wanderer's Strike",
        short_description='Make a strike and move',
        effect_text="""
            You can either move up to half your speed or make a \\glossterm<strike>.
            %TODO: wording
            During the \\glossterm<delayed action phase>, you can take the action you did not take during the \\glossterm<action phase>.
        """,
        rank_upgrades={
            '3': 'You gain a +1d bonus to damage with the strike.',
            '5': 'The distance you can move increases to to your full speed.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Shield Slam',
        short_description='Make a dazing strike with a shield',
        effect_text="""
            Make a strike using a shield.
            If the attack result hits the target's Fortitude defense,
                it is \\glossterm<dazed> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '3': 'On a \\glossterm<critical hit>, the target is also \\glossterm<confused>.',
            '5': 'The target is \\glossterm<confused> and dazed as part of the same condition.',
            '7': 'The target is \\glossterm<stunned> instead of dazed and confused.',
        },
        tags=[],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Quivering Palm',
        short_description='Make a nauseating strike with an unarmed attack',
        effect_text="""
            Make a strike using an \\glossterm<unarmed attack>.
            If the attack result hits the target's Fortitude defense,
                it is \\glossterm<sickened> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '3': 'On a \\glossterm<critical hit>, the target is is \\glossterm<paralyzed> instead of sickened.',
            '5': 'The target is \\glossterm<nauseated> instead of sickened.',
            '7': 'The target is \\glossterm<paralyzed> instead of nauseated.',
        },
        tags=[],
        lists=['Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Feint',
        short_description='Make a weak attack to take an opponent off guard',
        effect_text="""
            Make a melee \\glossterm<strike> with a +2 bonus to \\glossterm<accuracy> and a -2d penalty to damage.
            If you hit, the target takes a -2 penalty to Armor defense until the end of the next round.
        """,
        rank_upgrades={
            '3': 'The penalty increases to -3.',
            '5': 'The accuracy bonus increases to +3.',
            '7': 'The penalty increases to -4.',
        },
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Reckless Strike',
        short_description='Lower defenses to make a powerful strike',
        effect_text="""
            Make a melee \\glossterm<strike> with a +1 bonus to \\glossterm<accuracy> and a +1d bonus to damage.
            Until the end of the next round, you take a -2 penalty to all defenses.
        """,
        rank_upgrades={
            '3': 'The damage bonus increases to +2d.',
            '5': 'The accuracy bonus increases to +2.',
            '7': 'The damage bonus increases to +4d.',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Knockdown',
        short_description='Knock a foe prone with brute force',
        effect_text="""
            Make a melee \\glossterm<strike> using a bludgeoning weapon with a -1d penalty to damage.
            If the attack result hits the target's Fortitude defense,
                it falls \\glossterm<prone>.
        """,
        rank_upgrades={
            '3': """
                On a critical hit, the target is unable to stand up on its own until the end of the next round.
                If it is somehow brought into a standing position, it will immediately fall and become prone again.
            """,
            '5': 'The damage penalty is removed.',
            '7': 'The target is unable to stand on its own after a normal hit.',
        },
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Defensive Strike',
        short_description='Make a careful strike without lowering your defenses',
        effect_text="""
            Make a melee \\glossterm<strike> with a -2d penalty to damage.
            You gain a +2 bonus to Armor defense until the end of the round.
            This defense bonus takes effect immediately, so it protects you from attacks in the current phase.
            The strike happens simultaneously with other actions.
        """,
        rank_upgrades={
            '3': 'The defense bonus increases to +3.',
            '5': 'The damage penalty is reduced to -1d.',
            '7': 'The defense bonus increases to +4.',
        },
        tags=['Swift (see text)'],
        lists=['Esoteric', 'Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Quickdraw',
        short_description='Rapidly draw a new weapon and attack with it',
        effect_text="""
            Sheathe one of your weapons and draw another weapon.
            You must be able to wield both weapons with only one hand.
            Make a \\glossterm<strike> using the new weapon.
        """,
        rank_upgrades={
            '3': 'You gain a +1 bonus to accuracy with the strike.',
            '5': 'You gain a +1d bonus to damage with the strike.',
            '7': """
                You may use another \\glossterm<maneuver> instead of making the strike.
                That maneuver must make a strike using the new weapon.
            """,
        },
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Distracting Strike',
        short_description='Attack vulnerabilities in focusing foes',
        effect_text="""
            Make a melee \\glossterm<strike> with a -1d penalty to damage.
            If the target is using a \\glossterm<Focus> ability, the strike deals double damage.
        """,
        rank_upgrades={
            '3': 'You gain a +1 bonus to \\glossterm<accuracy> with the strike.',
            '5': 'The damage penalty is removed.',
            '7': 'The accuracy bonus increases to +3.',
        },
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Focused Strike',
        short_description='You concentrate to strike a critical blow.',
        effect_text="""
            Make a melee \\glossterm<strike>.
            The attack roll \\glossterm<explodes> regardless of what you roll.
        """,
        rank_upgrades={
            '3': 'You also gain a +1d bonus to damage with the \\glossterm<strike>.',
            '5': 'The damage bonus increaseses to +2d.',
            '7': 'The damage bonus increases to +3d.',
        },
        tags=['Focus'],
        lists=['Esoteric', 'Martial'],
    ))

    return maneuvers

def generate_maneuver_latex():
    maneuvers = sorted(generate_maneuvers(), key=lambda m: m.name)
    maneuver_texts = []
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
            for source in maneuver_sources
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
    for maneuver in sorted(maneuvers, key=lambda m: m.name):
        maneuver_headers.append(f"\\maneuverhead<{maneuver.name}> {maneuver.short_description}.")

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
