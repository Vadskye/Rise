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
        effect_text=r"""
            You and any number of willing creatures within a \\arealarge radius burst from you
                heal hit points equal to \\glossterm<standard damage>.
        """,
        rank_upgrades={
            '4': r'You gain a +1d bonus to the amount healed',
            '6': r'The healing bonus increases to +2d',
            '8': r'The healing bonus increases to +3d',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Brace for Impact',
        short_description='Take half damage',
        effect_text=r"""
                You take half damage from all attacks.
                This halving is applied before \glossterm{damage reduction} and similar abilities.
                This ability lasts until the end of the round.
        """,
        rank_upgrades={
            '4': r'You also gain a \plus1 bonus to all defenses.',
            '6': r'The defense bonus increases to \plus2.',
            '8': r'The defense bonus increases to \plus3.',
        },
        ap_cost=False,
        tags=['Swift'],
        lists=['Martial', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Certain Strike',
        short_description='Make a strike with +3 accuracy',
        effect_text=r"""
                Make a \glossterm{strike} with a \plus3 bonus to accuracy.
        """,
        rank_upgrades={
            '4': r'The accuracy bonus increases to \plus4.',
            '6': r'The accuracy bonus increases to \plus5.',
            '8': r'The accuracy bonus increases to \plus6.',
        },
        tags=[],
        lists=['Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Counterattack',
        short_description='Make a strike with bonuses if attacked',
        effect_text=r"""
                Make a \glossterm{strike}.
                If the target attacked you in the same phase, you gain a \plus2 bonus to accuracy and a \plus2d bonus to damage.
                Otherwise, you regain the action point spent to use this ability.
        """,
        rank_upgrades={
            '4': r'The damage bonus increases to \plus3d.',
            '6': r'The damage bonus increases to \plus4d.',
            '8': r'The damage bonus increases to \plus5d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Daunting Blow',
        short_description='Make a strike that inflicts fear',
        effect_text=r"""
                Make a melee \glossterm{strike}.
                If the target takes damage from the strike, it is \glossterm{shaken} by you as a \glossterm{condition}.
                Otherwise, you regain the \glossterm{action point} spent to use this ability.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1 bonus to accuracy on the strike.',
            '6': r'The accuracy bonus increases to \plus2.',
            '8': r'The accuracy bonus increases to \plus3.',
        },
        tags=['Mind'],
        lists=['Primal', 'Martial', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Demoralizing Shout',
        short_description='Inflict fear on nearby enemies',
        effect_text=r"""
                Make an attack vs. Mental against all enemies within a \arealarge radius burst from you.
                \hit Each target is \glossterm{shaken} by you as a \glossterm{condition}.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1 bonus to \glossterm{accuracy} with the attack.',
            '6': r'The accuracy bonus increases to \plus2.',
            '8': r'The accuracy bonus increases to \plus3.',
        },
        tags=['Mind'],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Ground Pound',
        short_description='Knock foes prone and make a strike',
        effect_text=r"""
                You can only use this ability while standing on solid ground.
                Make an attack vs. Reflex against all enemies standing on solid ground adjacent to you.
                If you use this ability during the \glossterm{action phase}, you can also make a \glossterm{strike} during the \glossterm{delayed action phase}.
                \hit Each target is knocked \prone.
        """,
        rank_upgrades={
            '4': r'The area increases to a \areamed radius burst.',
            '6': r'The area increases to a \arealarge radius burst.',
            '8': r'The area increases to a \areahuge radius burst.',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Leaping Strike',
        short_description='Jump and make a strike',
        effect_text=r"""
                You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to your \glossterm{base speed} (see \pcref{Leap}).
                You can make a \glossterm{strike} with a \plus1d bonus to damage from any location you occupy during the leap.
        """,
        rank_upgrades={
            '4': r'The damage bonus increases to \plus2d.',
            '6': r'The damage bonus increases to \plus3d.',
            '8': r'The damage bonus increases to \plus4d.',
        },
        tags=[],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Liver Shot',
        short_description='Make a strike that sickens',
        effect_text=r"""
                Make a \glossterm{strike} with a bludgeoning weapon.
                If the target takes damage from the strike, it is \sickened as a \glossterm{condition}.
                Otherwise, you regain the \glossterm{action point} spent to use this ability.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1 bonus to \glossterm{accuracy} with the strike.',
            '6': r'The accuracy bonus increases to \plus2.',
            '8': r'The accuracy bonus increases to \plus3.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Power Attack',
        short_description='Make a strike with +2d damage',
        effect_text=r"""
                Make a \glossterm{strike} with a \plus2d bonus to damage.
        """,
        rank_upgrades={
            '4': r'The damage bonus increases to \plus3d.',
            '6': r'The damage bonus increases to \plus4d.',
            '8': r'The damage bonus increases to \plus5d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Pulverizing Smash',
        short_description='Make a strike against Fortitude defense',
        effect_text=r"""
                Make a \glossterm{strike} with a piercing weapon.
                The attack is made against the target's Fortitude defense instead of its Armor defense.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1d bonus to damage with the strike.',
            '6': r'The damage bonus increases to \plus2d.',
            '8': r'The damage bonus increases to \plus3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Rapid Assault',
        short_description='Make two strikes',
        effect_text=r"""
                Make a \glossterm{strike} against a creature.
                If you use this ability during the \glossterm{action phase}, you can make another strike during the \glossterm{delayed action phase}.
                You take a \minus2 penalty to accuracy on both strikes.
        """,
        rank_upgrades={
            '4': r'The accuracy penalty is reduced to \minus1.',
            '6': r'The accuracy penalty is removed.',
            '8': r'You gain a \plus1 bonus to accuracy with both strikes.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Reaping Charge',
        short_description='Make strikes while moving in a line',
        effect_text=r"""
                Move up to your movement speed in a straight line.
                You can make a melee \glossterm{strike} with a slashing or bludgeoning weapon.
                The strike targets any number of creatures and objects that you \glossterm{threaten} at any point during your movement, except for the space you start in and the space you end in.
                You take a \minus2 penalty to \glossterm{accuracy} on the strike.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1d bonus to damage with the strike.',
            '6': r'The damage bonus increases to \plus2d.',
            '8': r'The damage bonus increases to \plus3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Strip the Flesh',
        short_description='Make a strike with bonus damage against unbloodied foes',
        effect_text=r"""
                Make a \glossterm{strike} with a slashing weapon.
                At the end of the \glossterm{action phase} of the next round,
                    if you hit with the strike and the target is not \glossterm{bloodied},
                    it takes additional damage equal to the damage you dealt with the strike.
        """,
        rank_upgrades={
            '4': r"""
                If you hit with the strike, the target continues taking the same damage
                at the end of each \glossterm{action phase} until it becomes \glossterm{bloodied}.
                This is a \glossterm{condition}, and can be removed by abilities that remove conditions.
            """,
            '6': r'You gain a \plus1d bonus to damage with the strike.',
            '8': r'The damage bonus increases to +2d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Sweeping Strike',
        short_description='Make strikes against three foes',
        effect_text=r"""
                Make a melee \glossterm{strike} with a slashing or bludgeoning weapon.
                The strike targets each of up to three creatures or objects you \glossterm{threaten}.
                You take a \minus1 penalty to \glossterm{accuracy} with the strike.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1d bonus to damage with the strike.',
            '6': r'The damage bonus increases to \plus2d.',
            '8': r'The damage bonus increases to \plus3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Thunderous Shout',
        short_description='Deal sonic damage in a cone',
        effect_text=r"""
                Make an attack vs. Fortitude against all creatures and objects in a \areamed cone-shaped burst from you.
                \hit Each target takes sonic \glossterm{standard damage} and is \glossterm{deafened} as a \glossterm{condition}.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1d bonus to damage with the attack.',
            '6': r'The area increases to \arealarge.',
            '8': r'The damage bonus increases to \plus2d.',
        },
        tags=['Sonic'],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Whirlwind Spin',
        short_description='Make strikes against all threatened foes',
        effect_text=r"""
                Make a melee \glossterm{strike} with a slashing weapon.
                The strike targets all creatures you \glossterm{threaten}.
                You take a \minus2 penalty to \glossterm{accuracy} with the strike.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1d bonus to damage with the strike.',
            '6': r'The damage bonus increases to \plus2d.',
            '8': r'The damage bonus increases to \plus3d.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Challenge',
        short_description='Make a strike and increase your threat',
        effect_text=r"""
            Make a melee \glossterm{strike}.
            If the strike hits, you gain a \plus4 bonus to \glossterm{threat} against the struck creature.
            This effect lasts until you take a \glossterm{short rest} or until you use this ability on a different creature.
        """,
        rank_upgrades={
            '4': 'The threat bonus increases to \plus6.',
            '6': 'The threat bonus increases to \plus8.',
            '8': 'The threat bonus increases to \plus10.',
        },
        ap_cost=False,
        tags=[],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Penetrating Strike',
        short_description='Make a strike against Reflex defense',
        effect_text=r"""
            Make a \glossterm{strike} with a piercing weapon.
            The attack is made against the target's Reflex defense instead of its Armor defense.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1d bonus to damage with the strike.',
            '6': r'The damage bonus increases to \plus2d.',
            '8': r'The damage bonus increases to \plus3d.',
        },
        tags=[],
        lists=['Martial', 'Wild', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Rally the Troops',
        short_description='Remove conditions from allies',
        effect_text=r"""
            You and any number of willing creatures within a \areamed radius from you
            can each remove one \glossterm{condition}.
        """,
        rank_upgrades={
            '4': r'The area increases to \arealarge.',
            '6': r'Each target can instead remove two conditions.',
            '8': r'Each target can instead remove three conditions.',
        },
        tags=[],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Hamstring',
        short_description='Make a strike that slows',
        effect_text=r"""
            Make a \glossterm{strike} with a slashing or piercing weapon.
            If the target takes damage from the strike, it is \glossterm{slowed} as a \glossterm{condition}.
            Otherwise, you regain the \glossterm{action point} spent to use this ability.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1 bonus to accuracy on the strike.',
            '6': r'The accuracy bonus increases to \plus2.',
            '8': r'The accuracy bonus increases to \plus3.',
        },
        tags=[],
        lists=['Wild', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Hunting Strike',
        short_description='Make a strike and gain an accuracy bonus against the target',
        effect_text=r"""
            Make a \glossterm{strike} against a creature.
            After making the strike, you gain a \plus1 bonus to \glossterm{accuracy} against the target with all attacks.
            This effect stacks with itself, up to a maximum of a \plus4 bonus.
            It lasts until you take a \glossterm{short rest} or use this ability on a different creature.
        """,
        rank_upgrades={
            '4': r'The accuracy bonus increases by \plus2 per strike instead of \plus1.',
            '6': r'The maximum accuracy bonus is increased to \plus6.',
            '8': r'The maximum accuracy bonus is increased to \plus8.',
        },
        tags=[],
        lists=['Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Head Shot',
        short_description='Make a strike that dazes',
        effect_text=r"""
            Make a \glossterm{strike} with a bludgeoning weapon.
            If the target takes damage from the strike, it is \glossterm{dazed} as a \glossterm{condition}.
            Otherwise, you regain the \glossterm{action point} spent to use this ability.
        """,
        rank_upgrades={
            '4': r'You gain a \plus1 bonus to accuracy on the strike.',
            '6': r'The accuracy bonus increases to \plus2.',
            '8': r'The accuracy bonus increases to \plus3.',
        },
        tags=['Mind'],
        lists=['Trick'],
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
        maneuver_headers.append(f"\\spellhead<{maneuver.name}> {maneuver.short_description}.")

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
