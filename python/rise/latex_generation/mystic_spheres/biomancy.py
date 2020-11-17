from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects

biomancy=MysticSphere(
    name="Biomancy",
    short_description="Manipulate the biological nature of creatures",
    cantrips=[
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Poison -- Asp Venom', 2, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> by the first \\glossterm<poison stage> of asp venom.
            At the end of each subsequent round, you repeat this attack, as normal for poisons (see \\pcref<Poison>).
            A creature poisoned by asp venom becomes \\glossterm<sickened> as long as it is poisoned.
            Reaching the third \\glossterm<poison stage> causes the target to become \\glossterm<nauseated> as long as it is poisoned.
            A third failed attack ends the poison.
            \\crit As above, except that target reaches the second \\glossterm<poison stage>, as normal for poisons.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 2.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Poison -- Dragon Bile', 4, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> with dragon bile.
            At the end of each subsequent round, you repeat this attack, as normal for poisons.
            For each \\glossterm<poison stage>, including the initial stage, the target loses \\glossterm<hit points> equal to 1d10 plus half your \\glossterm<power>.
            A third failed attack ends the poison.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 4.
        """, tags=[]),
        Spell('Neutralize Poison', 1, 'Yourself or one target within \\rngmed range', """
            The target gains an additional success to resist a poison currently affecting it (see \\pcref<Poison>).
        """, scaling="""
            \\rank<3> The number of additional successes increases to two.
            \\rank<5> The number of additional successes increases to three, which is enough to remove most poisons immediately.
            \\rank<7> The target can also gain the same number of successes to remove an additional poison affecting it.
        """, tags=[]),
        Spell('Intensify Poison', 2, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude with a +2 bonus to \\glossterm<accuracy> against the target.
            If the target is not currently poisoned, this ability has no effect.
            \\hit Choose a poison affecting the target.
            The poison gains an additional hit against the target, which can have varying effects depending on the poison (see \\pcref<Poison>).
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 2.
        """, tags=[]),
        Spell('Brief Regeneration', 2, 'Yourself or one living \\glossterm<ally> within \\rngclose range', """
            The target regains \\glossterm<hit points> equal to 1d6 plus half your \\glossterm<power>.
        """, scaling="""
            The healing increases by +1d for each rank beyond 2.
        """, tags=[]),
        Spell('Vital Regeneration', 5, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            A the end of each round, the target can remove one of its \\glossterm<vital wounds>.
            If it does, it gains two \\glossterm<fatigue points>.

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            \\rank<7> The target can remove two \\glossterm<vital wounds> instead of one.
            It gains two \\glossterm<fatigue points> per vital wound removed this way.
        """, tags=['Attune (target)']),
        Spell('Regeneration', 4, 'Yourself', """
            At the end of each round, if you did not lose any \\glossterm<hit points> that round, you regain 1d10 \\glossterm<hit points>.

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            The healing increases by +1d for each rank beyond 4.
        """, tags=['Attune (self)']),
        Spell('Swimmer', 2, 'Yourself', """
            The target gains a \\glossterm<swim speed> equal to its \\glossterm<base speed>.
            In addition, it gains a +2 \\glossterm<magic bonus> to Swim checks.

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The bonus increases to +4.
            \\rank<8> The bonus increases to +6.
        """, tags=['Attune (target)']),
        Spell('Climber', 2, 'Yourself', """
            The target gains a \\glossterm<climb speed> equal to its \\glossterm<base speed>.
            In addition, it gains a +2 \\glossterm<magic bonus> to Climb checks.

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The bonus increases to +4.
            \\rank<8> The bonus increases to +6.
        """, tags=['Attune (target)']),
        Spell('Runner', 2, 'Yourself', """
            The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<land speed>.

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The bonus increases to +20 feet.
            \\rank<8> The bonus increases to +30 feet.
        """, tags=['Attune (target)']),
        Spell('Enhanced Muscles', 3, 'Yourself', """
            The target gains a +2 \\glossterm<magic bonus> to Strength-based checks.
        """, scaling="""
            \\rank<5> The bonus increases to +3.
            \\rank<7> The bonus increases to +4.
        """, tags=['Attune (self)']),
        Spell('Longshot', 1, 'Yourself', """
            The target reduces its penalties for \\glossterm<range increments> by 1.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The penalty reduction increases to 2.
            \\rank<7> The penalty reduction increases to 3.
        """, tags=['Attune (target)']),
        Spell('Enhanced Senses', 1, 'Yourself', """
            The target gains a +3 \\glossterm<magic bonus> to the Awareness skill.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +7.
        """, tags=['Attune (target)']),
        Spell('Scent', 3, 'Yourself', """
            You gain the \\glossterm<scent> ability, giving you a +10 bonus to scent-based Awareness checks (see \\pcref<Senses>).

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            \\rank<5> The bonus increases to +15.
            \\rank<7> The bonus increases to +20.
        """, tags=['Attune (self)']),
        Spell('Acidic Blood', 3, ['Yourself', 'Everything adjacent to the primary target'], """
            The primary target's blood becomes acidic.
            This does not harm it, but the blood can be dangerous to anything nearby when it bleeds.
            At the end of each round, if the primary target lost \\glossterm<hit points> during that round, make an attack vs. Fortitude against everything adjacent to the target.
            \\hit Each secondary target takes acid damage equal to 2d6 plus half your \\glossterm<power>.
        """, scaling="""
            \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The damage increases to \\glossterm<standard damage>.
        """, tags=['Attune (target)']),
        Spell('Dragon Breath', 4, 'Yourself (see text)', """
            You gain the ability to breath energy like a dragon.
            When you cast this spell, choose a type of damage: acid, cold, electricity, or fire.
            As a standard action, you can breath a cone of that type of energy.
            When you do, make an attack vs. Reflex against everything within a \\arealarge cone from you.
            % note +1d as part of spell effect as consolation prize for attunement
            \\hit Each target takes damage of the chosen type equal to 2d10 plus half your \\glossterm<power>.

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            The damage increases by +1d for each rank beyond 4.
        """, tags=['Attune (self)']),
        Spell('Withering', 2, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target's body withers.
            It takes a -2 penalty to Fortitude defense.
            Whenever it loses one or more \\glossterm<hit points> from a single attack, this penalty increases by 1.
            This penalty increase stacks, and persists even if the target regains the lost hit points.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 2.
        """, tags=[]),
        Spell('Withering Curse', 4, 'One living creature within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit The target becomes more vulnerable to injury until it takes a short rest.
            It takes a -2 penalty to Fortitude defense.
            Whenever it loses one or more \\glossterm<hit points> from a single attack, this penalty increases by 1.
            This penalty increase stacks, and persists even if the target regains the lost hit points.
            \\crit As above, except that the effect lasts until this curse is removed.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 4.
        """, tags=['Curse']),
        Spell('Sickness', 2, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<sickened> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<nauseated> as a \\glossterm<condition>.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 2.
        """, tags=[]),
        Spell('Curse of Sickness', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<sickened> until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 3.
        """, tags=['Curse']),
        Spell('Eyebite', 4, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 2d6 physical damage.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<blinded> as a \\glossterm<condition>.
        """, scaling="""
            The damage increases by +1d for each rank beyond 1.
        """, tags=[]),
        Spell('Organ Failure', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 1d6 physical damage.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<nauseated> as a \\glossterm<condition>.
        """, scaling="""
            The damage increases by +1d for each rank beyond 1.
        """, tags=[]),
        Spell('Cripple', 7, 'One living creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit The target is \\glossterm<paralyzed> as a \\glossterm<condition>.
        """, tags=[]),
    ],
    rituals=[
        Spell('Awaken', 6, 'One Large or smaller \\glossterm<ally> within \\rngmed range', """
            The target becomes sentient.
            Its Intelligence becomes 1d6 - 5.
            Its type changes from animal to magical beast.
            It gains the ability to speak and understand one language that you know of your choice.
            Its maximum age increases to that of a human (rolled secretly).
            This effect is permanent.

            You can only learn this ritual if you have access to this mystic sphere through the nature \\glossterm<magic source>.
        """, tags=[], ritual_time='24 hours'),
        Spell('Air Breathing', 3, 'One Medium or smaller ritual participant', """
            The target can breathe air as easily as a human breathes air, preventing it from suffocating above water if it can normally only breathe water or some other substance.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Gills', 3, 'One Medium or smaller ritual participant', """
            The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
    ],
    category='damage',
)
