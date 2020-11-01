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
        target="All \\glossterm<allies> that can hear you",
        effect_text="""
            Each target gains a +1 bonus to \\glossterm<accuracy> until the end of the next round.
            This does not affect attacks during the current phase.
        """,
        rank=2,
        rank_upgrades={
            '4': 'Each target also gains a +2 bonus to Mental defense.',
            '6': 'The accuracy bonus increases to +2.',
            '8': 'The Mental defense bonus increases to +4.',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Brace for Impact',
        short_description='Take half physical damage',
        target="Yourself",
        effect_text="""
            You take half damage from \\glossterm<physical> damage this round.
            This halving is applied before \\glossterm<resistances> and similar abilities.
            Because this is a \\glossterm<Swift> ability, it affects damage you take during the current phase.
        """,
        rank_upgrades={
            # Alternate idea: bonuses against attackers or ignore conditions
            '3': 'You also gain a +1 bonus to all defenses.',
            '5': 'You also take half damage from \\glossterm<energy> damage this round.',
            '7': 'The defense bonus increases to +2.',
        },
        tags=['Swift'],
        lists=['Martial', 'Primal', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Certain Strike',
        short_description='Make a strike that trades damage for accuracy',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> with an accuracy bonus equal to your rank.
            You do not add your \\glossterm<power> to the strike's damage.
        """,
        tags=[],
        lists=['Martial', 'Primal', 'Trick', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Unerring Strike',
        short_description='Make a strike that mitigates miss chances',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> with a +1 bonus to \\glossterm<accuracy>.
            You can reroll any \\glossterm<miss chances>, such as when attacking \\glossterm<invisible> creatures, and take the better result.
        """,
        rank=3,
        rank_upgrades={
            '5': 'You ignore any 20\% miss chance effects with the strike.',
            '7': 'You ignore all miss chance effects with the strike.',
        },
        tags=[],
        lists=['Martial', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Counterattack',
        short_description='Make a strike with bonuses if attacked',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            You can only use this ability during the \\glossterm<action phase>.
            During that phase, you prepare to retaliate against any incoming attacks.

            During the \\glossterm<delayed action phase>, make a melee \\glossterm<strike>.
            If the target of that strike attacked you during the action phase of this round,
                you gain an accuracy bonus with the strike equal to your rank.
        """,
        rank=2,
        tags=[],
        lists=['Primal', 'Martial', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Followup Strike',
        target="As chosen \\glossterm<strike>",
        short_description='Make a strike with bonuses if you previously missed',
        effect_text="""
            Make a \\glossterm<strike>.
            If you missed the target with a \\glossterm<strike> last round, you gain a bonus to \\glossterm<accuracy> with the strike equal to your rank.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Fearsome Blow',
        short_description='Make a strike that inflicts fear',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike>.
            You do not add your \\glossterm<power> to the strike's damage.
            If the target takes damage from the strike, it is \\glossterm<shaken> by you as a \\glossterm<condition>.
        """,
        rank=3,
        rank_upgrades={
            '5': 'On a \\glossterm<critical hit>, the target is \\glossterm<panicked> instead of shaken.',
            '7': 'On a hit, the target is \\glossterm<frightened> instead of shaken.',
        },
        tags=['Emotion'],
        lists=['Primal', 'Martial', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Demoralizing Shout',
        short_description='Inflict fear on nearby enemies',
        target="\\glossterm<Enemies> in a \\areamed radius from you.",
        effect_text="""
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<shaken> by you until the end of the next round.
            \\crit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.
        """,
        rank_upgrades={
            '3': 'The area increases to a \\arealarge radius.',
            '5': 'The area increases to a \\areahuge radius.',
            '7': 'The area increases to a \\areaext radius.',
        },
        tags=['Emotion'],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Ground Stomp',
        short_description='Knock foes prone and make a strike',
        target='All Large or smaller creatures in a \\areasmall radius from you that are standing on earth or unworked stone',
        effect_text="""
            Make an attack vs. Reflex against each target.
            If you use this ability during the \\glossterm<action phase>, you can also make a \\glossterm<strike> during the \\glossterm<delayed action phase>.
            \\hit Each target is knocked \\prone.
        """,
        rank=2,
        rank_upgrades={
            '4': 'The maximum size increases to Huge.',
            '6': 'The maximum size increases to Gargantuan.',
            '8': 'The maximum size increases to Colossal.',
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Leaping Strike',
        short_description='Jump and make a strike',
        target="One creature or object within \\glossterm<reach> during movement (see text)",
        effect_text="""
            You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to your \\glossterm<base speed> (see \\pcref<Leap>).
            You can make a melee \\glossterm<strike> against the target from any location you occupy during the leap.
        """,
        rank=3,
        tags=[],
        lists=['Primal', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Liver Shot',
        short_description='Make a strike that sickens',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike>.
            You do not add your \\glossterm<power> to the strike's damage.
            If the target takes damage from the strike, it is \\glossterm<sickened> as a \\glossterm<condition>.
        """,
        rank=3,
        rank_upgrades={
            '5': 'On a \\glossterm<critical hit>, the target is is \\glossterm<paralyzed> instead of sickened.',
            '7': 'On a hit, the target is \\glossterm<nauseated> instead of sickened.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Power Strike',
        short_description='Make a strike that trades accuracy for damage',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> with a -2 penalty to \\glossterm<accuracy>.
            The strike gains bonus damage dice equal to your weapon's damage dice.
        """,
        rank=2,
        rank_upgrades={
            '4': "The bonus increases to twice your weapon's damage dice.",
            '6': "The bonus increases to three times your weapon's damage dice.",
            '8': "The bonus increases to four times your weapon's damage dice.",
        },
        tags=[],
        lists=['Esoteric', 'Primal', 'Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Pulverizing Smash',
        short_description='Make a strike against Fortitude defense',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            The attack is made against the target's Fortitude defense instead of its Armor defense.
        """,
        tags=[],
        lists=['Primal', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Rapid Assault',
        short_description='Make two strikes',
        target="As chosen \\glossterm<strikes> (see text)",
        effect_text="""
            Make two melee \\glossterm<strikes>.
            You take a -2 penalty to accuracy on both strikes, and you do not add your \\glossterm<power> to damage with either strike.
        """,
        rank=3,
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Reaping Charge',
        short_description='Make strikes while moving in a line',
        target="See text",
        effect_text="""
            Move up to half your movement speed in a straight line.
            You can make a melee \\glossterm<strike> with a slashing or bludgeoning weapon.
            The strike targets any number of creatures and objects within your \\glossterm<reach> at any point during your movement, except for the space you start in and the space you end in.
            You add half your \\glossterm<power> to damage with the strike instead of your full power.
        """,
        rank=2,
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Strip the Flesh',
        short_description='Make a weak strike that is extremely painful',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> using a slashing weapon.
            The strike deals half damage to creatures with a \\glossterm<resistance> to it, and double damage to creatures without a resistance to it.
        """,
        rank=2,
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Sweeping Strike',
        short_description='Make strikes against nearby foes',
        target="Up to three creatures or objects within \\glossterm<reach> (see text)",
        effect_text="""
            Make a melee \\glossterm<strike> using a slashing or bludgeoning weapon against each target.
            You add half your \\glossterm<power> to damage with the strike instead of your full power.
        """,
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Thunderous Shout',
        short_description='Deal damage in a cone',
        target="Everything in a \\areamed cone from you",
        effect_text="""
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes energy damage equal to half your \\glossterm<power> + 1d6 per rank.
        """,
        rank=3,
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Whirlwind',
        short_description='Make strikes against all nearby foes',
        target="All \\glossterm<enemies> within \\glossterm<reach>",
        effect_text="""
            Make a melee \\glossterm<strike> using a slashing weapon against each target.
            You do not add your \\glossterm<power> to damage with the strike.
        """,
        rank_upgrades={
            '3': """
                You can move up to 5 feet when you use this ability.
                The strike targets all creatures within your \\glossterm<reach> at any point in your movement.
            """,
            '5': 'The distance you can move increases to be equal to half your movement speed.',
            '7': 'The distance you can move increases to be equal to your movement speed.',
        },
        tags=[],
        lists=['Primal', 'Martial', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Challenging Strike',
        short_description='Make a strike and draw attention',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike>.
            You do not add your \\glossterm<power> to the strike's damage.
            If the target takes damage from the strike, it takes a penalty equal to your rank to \\glossterm<accuracy> against creatures other than you as a \\glossterm<condition>.
            This condition is removed if another creature applies this condition to the same target.
        """,
        rank=2,
        tags=[],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Penetrating Strike',
        short_description='Make a strike against Reflex defense',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> using a piercing weapon.
            The attack is made against the target's Reflex defense instead of its Armor defense.
        """,
        tags=[],
        lists=['Martial', 'Wild', 'Trick', 'Esoteric'],
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
            '8': 'The area increases to a \\areaext radius from you.',
        },
        tags=['Swift'],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Brow Gash',
        short_description="Make a strike that bleeds into the target's eyes",
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> using a slashing weapon.
            You do not add your \\glossterm<power> to the strike's damage.
            If the target takes damage from the strike, it is \\glossterm<dazzled> as a \\glossterm<condition>.
        """,
        rank=3,
        rank_upgrades={
            '5': 'On a \\glossterm<critical hit>, the target is \\glossterm<blinded> instead of dazzled.',
            '7': 'On a hit, the target is \\glossterm<dazed> in addition to being dazzled.',
        },
        tags=[],
        lists=['Trick', 'Esoteric', 'Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Hamstring',
        short_description='Make a strike that slows',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> using a slashing weapon.
            You do not add your \\glossterm<power> to the strike's damage.
            If the target takes damage from the strike, it is \\glossterm<slowed> as a \\glossterm<condition>.
        """,
        rank=3,
        rank_upgrades={
            '5': 'On a \\glossterm<critical hit>, the target is \\glossterm<immobilized> instead of slowed.',
            '7': 'On a hit, the target is \\glossterm<decelerated> instead of slowed.',
        },
        tags=[],
        lists=['Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Hunting Strike',
        short_description='Make a strike and gain an accuracy bonus against the target',
        target="As chosen \\glossterm<strike>",
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
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            You do not add your \\glossterm<power> to the strike's damage.
            If the target takes damage from the strike, it is \\glossterm<dazed> as a \\glossterm<condition>.
        """,
        rank=3,
        rank_upgrades={
            '5': 'On a \\glossterm<critical hit>, the target is \\glossterm<confused> instead of slowed.',
            '7': 'On a hit, the target is \\glossterm<stunned> instead of dazed.',
        },
        tags=['Emotion'],
        lists=['Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Second Wind',
        short_description='Recover hit points',
        target='Yourself',
        effect_text="""
            When you use this ability, you gain two \\glossterm<fatigue points>.

            You regain half of your maximum \\glossterm<hit points> (rounded down).
            If your new hit point total is at least half your maximum hit points, you immediately stop being \\glossterm<bloodied>.
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
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a ranged \\glossterm<strike>.
            You reduce your penalties for \\glossterm<range increments> with the strike by an amount equal to your rank.
        """,
        rank=2,
        tags=[],
        lists=['Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Agonizing Strike',
        short_description='Make a strike that briefly sickens with pain',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike>.
            If the target takes damage from the strike, it is \\glossterm<sickened> until the end of the next round.
        """,
        rank=3,
        rank_upgrades={
            '5': 'On a \\glossterm<critical hit>, the target is is \\glossterm<paralyzed> instead of sickened.',
            '7': 'On a hit, the target is \\glossterm<nauseated> instead of sickened.',
        },
        tags=[],
        lists=['Martial', 'Primal', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Deattunement Strike',
        short_description="Make a strike to break a target's \\glossterm<attunement>",
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike>.
            You do not add your \\glossterm<power> to the strike's damage.
            If the target takes damage from the strike, it stops being \\glossterm<attuned> to a number of effects equal to your rank.
            It can freely choose which effects it releases its attunement to.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Spring Attack',
        short_description='Make a strike and continue moving',
        target="As chosen \\glossterm<strike> (see text)",
        effect_text="""
            Move up to half your movement speed and make a melee \\glossterm<strike>.
            You add half your \\glossterm<power> to damage with the strike instead of your full power.
            If you use this ability during the \\glossterm<action phase>, you may use the other half of your movement during the \\glossterm<delayed action phase>.',
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name="Wanderer's Strike",
        short_description='Make a strike and move',
        target="As chosen \\glossterm<strike> (see text)",
        effect_text="""
            You can either move up to half your speed or make a \\glossterm<strike>.
            %TODO: wording
            During the \\glossterm<delayed action phase>, you can take the action you did not take during the \\glossterm<action phase>.
        """,
        rank=2,
        tags=[],
        lists=['Primal', 'Wild', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Shield Slam',
        short_description='Make a dazing strike with a shield',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> using a shield.
            If the target takes damage from the strike, it is \\glossterm<dazed> as a \\glossterm<condition>.
        """,
        rank=3,
        rank_upgrades={
            '5': 'On a \\glossterm<critical hit>, the target is also \\glossterm<confused> as part of the same \\glossterm<condition>.',
            '7': 'On a hit, the target is \\glossterm<stunned> instead of dazed.',
        },
        tags=[],
        lists=['Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Quivering Palm',
        short_description='Make a sickening strike with an unarmed attack',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a strike using an \\glossterm<unarmed attack>.
            If the target takes damage from the strike, it is \\glossterm<sickened> as a \\glossterm<condition>.
        """,
        rank=3,
        rank_upgrades={
            '5': 'On a \\glossterm<critical hit>, the target is is \\glossterm<paralyzed> instead of sickened.',
            '7': 'On a hit, the target is \\glossterm<nauseated> instead of sickened.',
        },
        tags=[],
        lists=['Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Feint',
        short_description='Make a weak attack to take an opponent off guard',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a melee \\glossterm<strike>.
            You do not add your \\glossterm<power> to damage with the strike.
            If you hit the target, it takes a -2 penalty to Armor defense until the end of the next round.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick'],
    ))

    maneuvers.append(Maneuver(
        name='Reckless Strike',
        short_description='Sacrifice defenses to make a powerful strike',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a melee \\glossterm<strike>.
            The strike gains bonus damage dice equal to your weapon's damage dice.
            During the next round, you take a -2 penalty to all defenses.
        """,
        rank=2,
        rank_upgrades={
            '4': "The bonus increases to twice your weapon's damage dice.",
            '6': "The bonus increases to three times your weapon's damage dice.",
            '8': "The bonus increases to four times your weapon's damage dice.",
        },
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Knockdown',
        short_description='Knock a foe prone with brute force',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> using a bludgeoning weapon.
            You add half your \\glossterm<power> to damage with the strike instead of your full power.
            If the attack result hits the target's Fortitude defense,
                it falls \\glossterm<prone>.
        """,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Defensive Strike',
        short_description='Make a careful strike without lowering your defenses',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a melee \\glossterm<strike>.
            You do not add your \\glossterm<power> to the strike's damage.
            In exchange, you gain a bonus equal to your rank to Armor and Reflex defenses until the end of the round.
            The defense bonus is a \\glossterm<Swift> effect, so it protects you from attacks in the current phase.
        """,
        rank=2,
        tags=['Swift (see text)'],
        lists=['Esoteric', 'Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Quickdraw',
        short_description='Rapidly draw a new weapon and attack with it',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            You draw a weapon into a single \\glossterm<free hand> and make a \\glossterm<strike> with the weapon.
        """,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Spellbane Strike',
        short_description='Attack vulnerabilities in focusing foes',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a melee \\glossterm<strike>.
            If the target is using a \\glossterm<Focus> ability during the current phase, you gain a bonus to \\glossterm<accuracy> with the strike equal to your rank.
        """,
        rank=2,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Focused Strike',
        short_description='You concentrate to strike a critical blow',
        target="One creature within \\rngclose range",
        effect_text="""
            You can only use this ability during the \\glossterm<action phase>.
            During that phase, you concentrate on your target.
            You only suffer a \\glossterm<focus penalty> for this attack during the action phase.

            During the \\glossterm<delayed action phase>, you can a melee \\glossterm<strike> against the target.
            You add half your \\glossterm<power> to damage with the strike instead of your full power.
            The attack roll \\glossterm<explodes> regardless of what you roll.
        """,
        tags=['Focus'],
        lists=['Esoteric', 'Martial'],
    ))

    maneuvers.append(Maneuver(
        name='Superior Strike',
        short_description='Make a strike with bonuses to accuracy and damage',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> with a +2 bonus to \\glossterm<accuracy>.
            The strike gains bonus damage dice equal to your weapon's damage dice.
        """,
        rank=5,
        rank_upgrades={
            '7': "The bonus increases to twice your weapon's damage dice.",
        },
        tags=[],
        lists=['Esoteric', 'Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Leap Slam',
        short_description='Jump and slam into the ground',
        target="Everything within a \\areasmall radius from you that is on earth or unworked stone (see text)",
        rank=3,
        effect_text="""
            You make a Jump check to leap and move as normal for the leap, up to a maximum distance equal to your \\glossterm<base speed> (see \\pcref<Leap>).
            When you land, if the vertical distance in feet between the highest point of your leap and your landing point was at least ten feet, make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning damage equal to half your \\glossterm<power> + 1d6 per rank.
        """,
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Frenzied Strike',
        short_description='Make a melee strike that becomes stronger when repeated',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a melee \\glossterm<strike>.
            For each previous consecutive round that you used this ability, the strike gains bonus damage dice equal to your weapon's damage dice, up to a maximum of triple your weapon's damage dice.
        """,
        tags=[],
        lists=['Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Retreating Strike',
        short_description='Make a strike and back away from your target',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> and move up to half your movement speed in a straight line away from the target.
        """,
        tags=[],
        lists=['Esoteric', 'Martial', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Barrage',
        short_description='Make rapid ranged strikes while staying in place',
        target="As chosen \\glossterm<strikes> (see text)",
        effect_text="""
            Make two ranged \\glossterm<strikes>.
            You take a -4 penalty to accuracy on both strikes.
            In addition, you add half your \\glossterm<power> to damage with the strikes instead of your full power.
            For each previous round that you used this ability without moving, you reduce the accuracy penalty by 1.
        """,
        rank=4,
        tags=[],
        lists=['Martial', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Point Blank Shot',
        short_description='Make a projectile strike in melee range',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a ranged \\glossterm<strike> using a \\glossterm<projectile> weapon against a creature adjacent to you.
            You are not \\glossterm<defenseless> against that creature during the current phase.
        """,
        rank=2,
        tags=[],
        lists=['Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Ricochet',
        short_description='Make a thrown strike that hits multiple targets',
        target="Up to three creatures or objects in a \\areasmall radius within \\rngclose range (see text)",
        effect_text="""
            Make a thrown \\glossterm<strike> using a single weapon that deals slashing or bludgeoning damage against each target.
            You add half your \\glossterm<power> to damage with the strike instead of your full power.
            If you choose yourself as one of the targets, you can catch the weapon instead of taking damage from it.
        """,
        rank=3,
        tags=[],
        lists=['Martial', 'Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Deathblow',
        short_description='Make a powerful strike to finish off bloodied foes',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike>.
            If the target is \\glossterm<bloodied>, this strike deals double damage.
        """,
        rank=4,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Lunge',
        short_description='Strike foes in a line',
        target="\\glossterm<Enemies> in a \\areasmall, 5 ft.\\ wide line from you",
        effect_text="""
            Make a melee \\glossterm<strike> using a piercing weapon against each target.
        """,
        rank=2,
        tags=[],
        lists=['Martial', 'Primal', 'Wild', 'Trick', 'Esoteric'],
    ))

    maneuvers.append(Maneuver(
        name='Volley Fire',
        short_description='Fire a flurry of projectiles to blanket an area',
        target="Each creature in a \\areasmall radius within \\rngmed range.",
        effect_text="""
            Make a ranged \\glossterm<strike> using a projectile weapon against each target.
            You do not add your \\glossterm<power> to the strike's damage.
            This strike costs one projectile per target.
        """,
        rank=3,
        tags=[],
        lists=['Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Arrowstorm',
        short_description='Fire a flurry of projectiles to blanket a large area',
        target='Everything in a \\areamed radius within \\rngmed range.',
        rank=5,
        effect_text="""
            Make a ranged \\glossterm<strike> using a projectile weapon against each target.
            You do not add your \\glossterm<power> to the strike's damage.
            This strike costs one projectile per target.
        """,
        tags=[],
        lists=['Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Penetrating Shot',
        short_description='Fire a powerful projectile in a line',
        target='Everything in a \\arealarge, 5 ft.\\ wide line from you',
        rank=4,
        effect_text="""
            Make a ranged \\glossterm<strike> against each target.
            You add half your \\glossterm<power> to damage with the strike instead of your full power.
        """,
        tags=[],
        lists=['Martial', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Slipstrike',
        short_description='Make an enthusiastic melee strike and fall prone',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a melee \\glossterm<strike>.
            The strike gains bonus damage dice equal to your weapon's damage dice.
            After making the strike, you fall \\glossterm<prone>.
            % TODO: This is obviously a hack
            If you use this ability during the \\glossterm<delayed action phase>, you cannot move during the \\glossterm<movement phase> of the following round.
        """,
        rank=2,
        rank_upgrades={
            '4': "The bonus increases to twice your weapon's damage dice.",
            '6': "The bonus increases to three times your weapon's damage dice.",
            '8': "The bonus increases to four times your weapon's damage dice.",
        },
        tags=[],
        lists=['Primal', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Titanic Slam',
        short_description='Slam your weapon into the ground to deal damage in a line',
        target='Everything on the ground in a \\areamed, 10 ft. wide line from you',
        effect_text="""
            Make a melee \\glossterm<strike> using a bludgeoning weapon against each target.
            You add half your \\glossterm<power> to damage with the strike instead of your full power.
            All damage dealt by this attack is bludgeoning damage instead of its normal types.
        """,
        rank=3,
        tags=[],
        lists=['Martial', 'Primal'],
    ))

    maneuvers.append(Maneuver(
        name='Injection',
        short_description='Make a strike that excels at injecting poison',
        target="As chosen \\glossterm<strike>",
        effect_text="""
            Make a \\glossterm<strike> using a piercing weapon.
            If the target takes damage from the strike, you gain an accuracy bonus equal to your rank with injury-based poisons delivered with the strike.
        """,
        rank=3,
        tags=[],
        lists=['Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Multistrike',
        short_description='Make three strikes',
        target="As chosen \\glossterm<strikes> (see text)",
        effect_text="""
            Make three melee \\glossterm<strikes> with a -3 penalty to accuracy.
            You do not add your \\glossterm<power> to each strike's damage.
        """,
        rank=8,
        tags=[],
        rank_upgrades={},
        lists=['Esoteric', 'Martial'],
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
            You can make a melee \\glossterm<strike> from any location you occupy during the leap.
        """,
        rank=2,
        rank_upgrades={
            '4': 'The maximum size category of the target increases to two size categories larger than you',
            '6': 'The maximum size category of the target increases to three size categories larger than you',
            '8': 'The maximum size category of the target increases to four size categories larger than you',
        },
        tags=[],
        lists=['Esoteric', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Strangle',
        target="One creature within your \\glossterm<reach> with a free hand",
        short_description='Grapple a creature by the throat',
        effect_text="""
            % Flipped defense order because it reads weirdly otherwise
            Make an melee attack with a free hand against the target's Fortitude and Reflex defenses.
            On a hit against both defenses, the target takes bludgeoning \\glossterm<standard damage> and you and the target are \\glossterm<grappled> by each other.
            For details, see \\pcref<Grappling>.
        """,
        tags=[],
        lists=['Esoteric', 'Martial', 'Primal', 'Trick', 'Wild'],
    ))

    maneuvers.append(Maneuver(
        name='Meteor Smash',
        target="As chosen \\glossterm<strike> (see text)",
        short_description='Make a strike with extra momentum from movement',
        effect_text="""
            Make a melee \\glossterm<strike> using a bludgeoning or piercing weapon.
            If your movement during the \\glossterm<movement phase> consisted entirely of moving at least 20 feet in a straight line towards your target, the strike gains bonus damage dice equal to your weapon's damage dice.
        """,
        rank=3,
        rank_upgrades={
            '5': "The bonus increases to twice your weapon's damage dice.",
            '7': "The bonus increases to three times your weapon's damage dice.",
        },
        tags=[],
        lists=['Primal', 'Wild'],
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
