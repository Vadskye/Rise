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
        short_description='Heal nearby allies',
        effect_text="""
            You and any number of willing creatures within a \\arealarge radius burst from you
                heal hit points equal to \\glossterm<standard damage>.
        """,
        rank_upgrades={
            '4': 'You gain a +1d bonus to the amount healed',
            '6': 'The healing bonus increases to +2d',
            '8': 'The healing bonus increases to +3d',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Brace for Impact',
        short_description='Take half damage',
        effect_text="""
                You take half damage from all attacks.
                This halving is applied before \\glossterm<damage reduction> and similar abilities.
                This ability lasts until the end of the round.
        """,
        rank_upgrades={
            '4': 'You also gain a +1 bonus to all defenses.',
            '6': 'The defense bonus increases to +2.',
            '8': 'The defense bonus increases to +3.',
        },
        ap_cost=False,
        tags=['Swift'],
        lists=['Martial', 'Primal', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Certain Strike',
        short_description='Make a strike with +3 accuracy',
        effect_text="""
                Make a \\glossterm<strike> with a +3 bonus to accuracy.
        """,
        rank_upgrades={
            '4': 'The accuracy bonus increases to +4.',
            '6': 'The accuracy bonus increases to +5.',
            '8': 'The accuracy bonus increases to +6.',
        },
        tags=[],
        lists=['Martial', 'Primal', 'Trick', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Counterattack',
        short_description='Make a strike with bonuses if attacked',
        effect_text="""
                Make a \\glossterm<strike>.
                If the target attacked you earlier in the current round, you gain a +1 bonus to accuracy and a +2d bonus to damage with the strike.
        """,
        rank_upgrades={
            '4': 'The damage bonus increases to +3d.',
            '6': 'The damage bonus increases to +4d.',
            '8': 'The damage bonus increases to +5d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Daunting Blow',
        short_description='Make a strike that inflicts fear',
        effect_text="""
                Make a \\glossterm<strike> with a +1 bonus to \\glossterm<accuracy>.
                If the attack result hits the target's Mental defense,
                    it is \\glossterm<shaken> by you as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'The accuracy bonus increases to +2.',
            '6': 'The target is \\glossterm<frightened> instead of shaken.',
            '8': 'The accuracy bonus increases to +3.',
        },
        tags=['Emotion'],
        lists=['Primal', 'Martial', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Demoralizing Shout',
        short_description='Inflict fear on nearby enemies',
        effect_text="""
                Make an attack vs. Mental against all enemies within a \\arealarge radius burst from you.
                \\hit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'You gain a +1 bonus to \\glossterm<accuracy> with the attack.',
            '6': 'The accuracy bonus increases to +2.',
            '8': 'The accuracy bonus increases to +3.',
        },
        tags=['Emotion'],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Ground Pound',
        short_description='Knock foes prone and make a strike',
        effect_text="""
                You can only use this ability while standing on solid ground.
                Make an attack vs. Reflex against all enemies standing on solid ground adjacent to you.
                If you use this ability during the \\glossterm<action phase>, you can also make a \\glossterm<strike> during the \\glossterm<delayed action phase>.
                \\hit Each target is knocked \\prone.
        """,
        rank_upgrades={
            '4': 'The area increases to a \\areamed radius burst.',
            '6': 'The area increases to a \\arealarge radius burst.',
            '8': 'The area increases to a \\areahuge radius burst.',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Leaping Strike',
        short_description='Jump and make a strike',
        effect_text="""
                You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to your \\glossterm<base speed> (see \\pcref<Leap>).
                You can make a \\glossterm<strike> with a +1d bonus to damage from any location you occupy during the leap.
        """,
        rank_upgrades={
            '4': 'The damage bonus increases to +2d.',
            '6': 'The damage bonus increases to +3d.',
            '8': 'The damage bonus increases to +4d.',
        },
        tags=[],
        lists=['Primal', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Liver Shot',
        short_description='Make a strike that sickens',
        effect_text="""
            Make a \\glossterm<strike> with a +1d bonus to damage.
            If the attack result hits the target's Fortitude defense,
                it is \\glossterm<sickened> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'The damage bonus increases to +2d.',
            '6': 'The target is \\glossterm<nauseated> instead of sickened.',
            '8': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Power Attack',
        short_description='Make a strike with +2d damage',
        effect_text="""
                Make a \\glossterm<strike> with a +2d bonus to damage.
        """,
        rank_upgrades={
            '4': 'The damage bonus increases to +3d.',
            '6': 'The damage bonus increases to +4d.',
            '8': 'The damage bonus increases to +5d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Pulverizing Smash',
        short_description='Make a strike against Fortitude defense',
        effect_text="""
                Make a \\glossterm<strike> with a piercing weapon.
                The attack is made against the target's Fortitude defense instead of its Armor defense.
        """,
        rank_upgrades={
            '4': 'You gain a +1d bonus to damage with the strike.',
            '6': 'The damage bonus increases to +2d.',
            '8': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Rapid Assault',
        short_description='Make two strikes',
        effect_text="""
                Make a \\glossterm<strike> against a creature.
                If you use this ability during the \\glossterm<action phase>, you can make another strike during the \\glossterm<delayed action phase>.
                You take a -2 penalty to accuracy on both strikes.
        """,
        rank_upgrades={
            '4': 'The accuracy penalty is reduced to -1.',
            '6': 'The accuracy penalty is removed.',
            '8': 'You gain a +1 bonus to accuracy with both strikes.',
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
                You take a -2 penalty to \\glossterm<accuracy> on the strike.
        """,
        rank_upgrades={
            '4': 'You gain a +1d bonus to damage with the strike.',
            '6': 'The damage bonus increases to +2d.',
            '8': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Strip the Flesh',
        short_description='Make a strike with bonus damage against unbloodied foes',
        effect_text="""
                Make a \\glossterm<strike> with a slashing weapon.
                At the end of the \\glossterm<action phase> of the next round,
                    if you hit with the strike and the target is not \\glossterm<bloodied>,
                    it takes additional damage equal to the damage you dealt with the strike.
        """,
        rank_upgrades={
            '4': """
                If you hit with the strike, the target continues taking the same damage
                at the end of each \\glossterm<action phase> until it becomes \\glossterm<bloodied>.
                This is a \\glossterm<condition>, and can be removed by abilities that remove conditions.
            """,
            '6': 'You gain a +1d bonus to damage with the strike.',
            '8': 'The damage bonus increases to +2d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Sweeping Strike',
        short_description='Make strikes against three foes',
        effect_text="""
                Make a melee \\glossterm<strike> with a slashing or bludgeoning weapon.
                The strike targets each of up to three creatures or objects you \\glossterm<threaten>.
        """,
        rank_upgrades={
            '4': 'You gain a +1d bonus to damage with the strike.',
            '6': 'The damage bonus increases to +2d.',
            '8': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Thunderous Shout',
        short_description='Deal sonic damage in a cone',
        effect_text="""
                Make an attack vs. Fortitude against all creatures and objects in a \\areamed cone-shaped burst from you.
                \\hit Each target takes sonic \\glossterm<standard damage> and is \\glossterm<deafened> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'You gain a +1d bonus to damage with the attack.',
            '6': 'The area increases to \\arealarge.',
            '8': 'The damage bonus increases to +2d.',
        },
        tags=['Sonic'],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Whirlwind Spin',
        short_description='Make strikes against all threatened foes',
        effect_text="""
                Make a melee \\glossterm<strike> with a slashing weapon.
                The strike targets all creatures you \\glossterm<threaten>.
                You take a -1 penalty to \\glossterm<accuracy> with the strike.
        """,
        rank_upgrades={
            '4': 'You gain a +1d bonus to damage with the strike.',
            '6': 'The damage bonus increases to +2d.',
            '8': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Challenge',
        short_description='Make a strike and increase your threat',
        effect_text="""
            Make a melee \\glossterm<strike>.
            If the strike hits, you gain a +4 bonus to \\glossterm<threat> against the struck creature.
            This effect lasts until you take a \\glossterm<short rest> or until you use this ability on a different creature.
        """,
        rank_upgrades={
            '4': 'The threat bonus increases to +6.',
            '6': 'The threat bonus increases to +8.',
            '8': 'The threat bonus increases to +10.',
        },
        ap_cost=False,
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
            '4': 'You gain a +1d bonus to damage with the strike.',
            '6': 'The damage bonus increases to +2d.',
            '8': 'The damage bonus increases to +3d.',
        },
        tags=[],
        lists=['Martial', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Rally the Troops',
        short_description='Remove conditions from allies',
        effect_text="""
            You and any number of willing creatures within a \\areamed radius from you
            can each remove one \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'The area increases to \\arealarge.',
            '6': 'The area increases to \\areahuge.',
            '8': 'Each target can instead remove two conditions.',
        },
        tags=[],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Hamstring',
        short_description='Make a strike that slows',
        effect_text="""
            Make a \\glossterm<strike> with a +1 bonus to \\glossterm<accuracy>.
            If the attack result hits the target's Fortitude defense,
                it is \\glossterm<slowed> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'The accuracy bonus increases to +2.',
            '6': 'The target is \\glossterm<immobilized> instead of slowed.',
            '8': 'The accuracy bonus increases to +3.',
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
            '4': 'If you hit the target, the accuracy bonus increases by +2 instead of +1.',
            '6': 'The maximum accuracy bonus is increased to +5.',
            '8': 'The maximum accuracy bonus is increased to +6.',
        },
        tags=[],
        lists=['Wild'],
        ap_cost=False,
    ))

    maneuvers.append(Maneuver(
        name='Head Shot',
        short_description='Make a strike that dazes',
        effect_text="""
            Make a \\glossterm<strike> with a +1d bonus to damage.
            If the attack result hits the target's Mental defense,
                it is \\glossterm<dazed> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'On a \\glossterm<critical hit>, the target is \\glossterm<stunned> instead of dazed.',
            '6': 'The damage bonus increases to +2d.',
            '8': 'On a normal hit, the target is stunned instead of dazed.',
        },
        tags=['Emotion'],
        lists=['Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Defensive Recovery',
        short_description='Recover a spent \\glossterm<action point> and gain +1 Armor defense',
        effect_text="""
            You gain a +1 bonus to Armor defense until the end of the round.
            At the end of the round, you regain a spent \\glossterm<recovery action point>.
        """,
        rank_upgrades={
            '4': 'The defense bonus increases to +2.',
            '6': 'The defense bonus increases to +3.',
            '8': 'The defense bonus increases to +4.',
        },
        tags=['Swift'],
        lists=['Martial'],
        ap_cost=False,
    ))

    maneuvers.append(Maneuver(
        name='Recovering Strike',
        short_description='Make a strike at a creature to regain an \\glossterm<action point>',
        effect_text="""
            Make a \\glossterm<strike> with a -2d penalty to damage.
            If you hit a creature, you regain a spent \\glossterm<recovery action point> at the end of the round.
        """,
        rank_upgrades={
            '4': 'The damage penalty is decreased to -1d.',
            '6': 'The damage penalty is removed.',
            '8': 'You regain the action point even if you miss.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick', 'Esoteric'],
        ap_cost=False,
    ))

    maneuvers.append(Maneuver(
        name='Retributive Recovery',
        short_description='Regain an \\glossterm<action point> and gain bonuses against attackers',
        effect_text="""
            At the end of the round, you regain a spent \\glossterm<recovery action point>.
            Each time a creature attacks you this round, you gain
                a +1 bonus to \\glossterm<accuracy> against that creature during the next round.
        """,
        rank_upgrades={
            '4': 'The accuracy bonus increases to +2.',
            '6': 'The accuracy bonus increases to +3.',
            '8': 'The accuracy bonus increases to +4.',
        },
        tags=[],
        lists=['Trick', 'Primal', 'Martial'],
        ap_cost=False,
    ))

    maneuvers.append(Maneuver(
        name='Revitalizing Strike',
        short_description='Make a melee strike against a creature to heal',
        effect_text="""
            Make a melee \\glossterm<strike>.
            If you hit a creature with the strike, you regain hit points equal to \\glossterm<standard damage>.
        """,
        rank_upgrades={
            '4': 'You gain a +1d bonus to the amount healed.',
            '6': 'The healing bonus increases to +2d.',
            '8': 'The healing bonus increases to +3d.',
        },
        tags=['Life'],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Distant Shot',
        short_description='Make a long-ranged strike',
        effect_text="""
            Make a ranged \\glossterm<strike> with a +1d bonus to damage.
            You reduce your penalties for \\glossterm<range increments> with the strike by 2.
        """,
        rank_upgrades={
            '4': 'The damage bonus increases to +2d.',
            '6': 'The damage bonus increases to +3d.',
            '8': 'The damage bonus increases to +4d.',
        },
        tags=[],
        lists=['Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Agonizing Strike',
        short_description='Make a strike that sickens with pain',
        effect_text="""
            Make a \\glossterm<strike> with a +1 bonus to \\glossterm<accuracy>.
            If the attack result hits the target's Mental defense,
                it is \\glossterm<sickened> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'The accuracy bonus increases to +2.',
            '6': 'The target is \\glossterm<nauseated> instead of sickened.',
            '8': 'The accuracy bonus increases to +3.',
        },
        tags=['Emotion'],
        lists=['Martial', 'Primal', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Draining Strike',
        short_description='Make a strike to drain an \\glossterm<action point>',
        effect_text="""
            Make a \\glossterm<strike> with a +1 bonus to \\glossterm<accuracy>.
            If the attack result hits the target's Mental defense,
                it spends one \\glossterm<recovery action point>, if it has any.
        """,
        rank_upgrades={
            '4': 'The accuracy bonus increases to +2.',
            '6': 'The target spends two \\glossterm<recovery action points> instead of one.',
            '8': 'The accuracy bonus increases to +3.',
        },
        tags=[],
        lists=['Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Stabilizing Recovery',
        short_description='Recover a spent \\glossterm<action point> and gain +2 Fortitude defense',
        effect_text="""
            You gain a +2 bonus to Fortitude defense until the end of the round.
            At the end of the round, you regain a spent \\glossterm<recovery action point>.
        """,
        rank_upgrades={
            '4': 'The defense bonus increases to +3.',
            '6': 'The defense bonus increases to +4.',
            '8': 'The defense bonus increases to +5.',
        },
        tags=['Swift'],
        lists=['Primal', 'Martial', 'Wild'],
        ap_cost=False,
    ))

    maneuvers.append(Maneuver(
        name='Focusing Recovery',
        short_description='Recover a spent \\glossterm<action point> and gain +2 Mental defense',
        effect_text="""
            You gain a +2 bonus to Mental defense until the end of the round.
            At the end of the round, you regain a spent \\glossterm<recovery action point>.
        """,
        rank_upgrades={
            '4': 'The defense bonus increases to +3.',
            '6': 'The defense bonus increases to +4.',
            '8': 'The defense bonus increases to +5.',
        },
        tags=['Swift'],
        lists=['Martial', 'Trick', 'Wild', 'Esoteric'],
        ap_cost=False,
    ))

    maneuvers.append(Maneuver(
        name='Hidden Recovery',
        short_description='Hide and recover a spent \\glossterm<action point>',
        effect_text="""
            You can move up to half your speed and make a Stealth check to hide (see \\pcref<Stealth>).
            % TODO: define unobserved better?
            At the end of the round, if you are unobserved, you regain a spent \\glossterm<recovery action point>.
        """,
        rank_upgrades={
            '4': 'You gain a +1 bonus to the Stealth check.',
            '6': 'The Stealth bonus increases to +2.',
            '8': 'The distance you can move increases to your full speed.',
        },
        tags=[],
        lists=['Trick', 'Wild', 'Esoteric'],
        ap_cost=False,
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
            '4': 'You gain a +1d bonus to damage with the strike.',
            '6': 'The distance you can move increases to to your full speed.',
            '8': 'The damage bonus increases to +2d.',
        },
        tags=[],
        lists=['Primal', 'Wild', 'Esoteric'],
        ap_cost=False,
    ))

    maneuvers.append(Maneuver(
        name='Shield Slam',
        short_description='Make a stunning strike with a shield',
        effect_text="""
            Make a strike using a shield.
            If the attack result hits the target's Fortitude defense,
                it is \\glossterm<stunned> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'You gain a +1 bonus to accuracy with the strike.',
            '6': 'The target is stunned twice as two separate conditions.',
            '8': 'The accuracy bonus increases to +2.',
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
                it is \\glossterm<nauseated> as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '4': 'You gain a +1 bonus to \\glossterm<accuracy> with the strike.',
            '6': 'The target is nauseated twice as two seperate conditions.',
            '8': 'The accuracy bonus increases to +2.',
        },
        tags=[],
        lists=['Esoteric'],
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
