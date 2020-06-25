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
        Spell('Poison -- Asp Venom', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> with asp venom.
            At the end of each subsequent round, you repeat this attack, as normal for poisons.
            A creature poisoned by asp venom becomes \\glossterm<sickened> as long as it is poisoned.
            A third successful attack inflicts a \\glossterm<vital wound> and ends the poison.
            A third failed attack ends the poison.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Poison -- Dragon Bile', 3, 'One living creature within \\rngmed range', """
            This spell functions like this \\spell<poison -- nitharit> spell, except that the target becomes poisoned with sassone leaf instead (see \\pcref<Poisons>).
            A creature poisoned by sassone leaf immediately loses a \\glossterm<hit point> and is \\glossterm<sickened> as long as it is poisoned.
            A third successful attack causes the target to lose two \\glossterm<hit points> and become \\glossterm<nauseated> as long as it is poisoned.
            A third failed attack ends the poison.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Neutralize Poison', 1, 'Yourself or one target within \\rngmed range', """
            The target gains an additional success to resist a poison currently affecting it (see \\pcref<Poisons>).

            \\rankline
            \\rank<3> The number of additional successes increases to two.
            \\rank<5> The number of additional successes increases to three, which is enough to remove most poisons immediately.
            \\rank<7> The target can also gain the same number of successes to remove an additional poison affecting it.
        """, tags=[]),
        Spell('Intensify Poison', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude with a +2 bonus to \\glossterm<accuracy> against the target.
            If the target is not currently poisoned, this ability has no effect.
            \\hit Choose a poison affecting the target.
            The poison gains an additional hit against the target, which can have varying effects depending on the poison (see \\pcref<Poisons>).

            \\rankline
            \\rank<5> The accuracy bonus increases to +3.
            \\rank<7> The accuracy bonus increases to +4.
        """, tags=[]),
        Spell('Brief Regeneration', 1, 'Yourself or one living \\glossterm<ally> within \\rngclose range', """
            The target regains one lost \\glossterm<hit point>.

            \\rankline
            \\rank<3> If the target is \\glossterm<bloodied>, it regains two hit points instead of one.
            \\rank<5> The number of hit points regained increases to two.
            \\rank<7> If the target is \\glossterm<bloodied>, it regains three hit points instead of two.
        """, tags=[]),
        Spell('Vital Regeneration', 5, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            A the end of each round, the target can spend an \\glossterm<action point>.
            If it does, it removes one of its \\glossterm<vital wounds>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<7> The target can remove up to two \\glossterm<vital wounds> for each action point spent instead of only one.
        """, tags=['Attune (target)']),
        Spell('Regeneration', 4, 'Yourself', """
            At the end of each round, if you did not lose a \\glossterm<hit point> that round, you regain a lost hit point.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> You also gain a +1 \\glossterm<magic bonus> to \\glossterm<vital rolls>.
            \\rank<8> You regain two hit points instead of one.
        """, tags=['Attune (self)']),
        Spell('Swimmer', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a \\glossterm<swim speed> equal to its \\glossterm<base speed>.
            In addition, it gains a +2 \\glossterm<magic bonus> to Swim checks.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +8.
        """, tags=['Attune (target)']),
        Spell('Climber', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a \\glossterm<climb speed> equal to its \\glossterm<base speed>.
            In addition, it gains a +2 \\glossterm<magic bonus> to Climb checks.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +8.
        """, tags=['Attune (target)']),
        Spell('Runner', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<land speed>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus increases to +15 feet.
            \\rank<5> The bonus increases to +20 feet.
            \\rank<7> The bonus increases to +30 feet.
        """, tags=['Attune (target)']),
        Spell('Enhanced Muscles', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a +2 \\glossterm<magic bonus> to Strength-based checks.

            \\rankline
            \\rank<5> The bonus increases to +3.
            \\rank<7> The bonus increases to +4.
        """, tags=['Attune (self)']),
        Spell('Enhanced Senses', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a +3 \\glossterm<magic bonus> to the Awareness skill.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (target)']),
        Spell('Scent', 3, 'Yourself', """
            You gain the \\glossterm<scent> ability, giving you a +10 bonus to scent-based Awareness checks (see \\pcref<Senses>).

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> The bonus increases to +15.
            \\rank<7> The bonus increases to +20.
        """, tags=['Attune (self)']),
        Spell('Acidic Blood', 3, ['Yourself or one \\glossterm<ally> within \\rngmed range', 'Everything adjacent to the primary target'], """
            The primary target's blood becomes acidic.
            This does not harm it, but the blood can be dangerous to anything nearby when it bleeds.
            At the end of each round, if the primary target was \\glossterm<wounded> during that round, make an attack vs. Armor against everything adjacent to the target.
            \\hit Each secondary target takes acid \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=['Attune (target)']),
        Spell('Dragon Breath', 4, 'Yourself (see text)', """
            You gain the ability to breath energy like a dragon.
            When you cast this spell, choose a type of damage: acid, cold, electricity, or fire.
            As a standard action, you can breath a cone of that type of energy.
            When you do, make an attack vs. Armor against everything within a \\arealarge cone from you.
            \\hit Each target takes \\glossterm<standard damage> +1d of the chosen type.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +3d.
        """, tags=['Attune (self)']),
        Spell('Withering', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target becomes more vulnerable to injury.
            It takes a -2 penalty to Fortitude defense.
            In addition, whenever it loses a \\glossterm<hit point>, it reduces its maximum \\glossterm<hit points> by 1.
            When this condition is removed, the target's maximum \\glossterm<hit points> are restored.
            \\crit As above, except that the penalty increases to -4.

            \\rankline
            \\rank<5> The accuracy bonus increases to +3.
            \\rank<5> The accuracy bonus increases to +4.
            \\rank<7> The accuracy bonus increases to +5.
        """, tags=[]),
        Spell('Withering Curse', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target becomes more vulnerable to injury until it takes a short rest.
            Whenever it loses a \\glossterm<hit point>, it reduces its maximum \\glossterm<hit points> by 1.
            This cannot reduce the target's maximum \\glossterm<hit points> below 1.
            When this effect is removed, the target's maximum \\glossterm<hit points> are restored.
            \\crit As above, except that the effect lasts until this curse is removed.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Curse']),
        Spell('Sickness', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<sickened> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<nauseated> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Curse of Sickness', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<sickened> until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Curse']),
        Spell('Eyebite', 5, 'One living creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Eyebite Curse', 8, 'One living creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<blinded> until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.
        """, tags=['Curse']),
        Spell('Cripple', 6, 'One living creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<paralyzed> as a \\glossterm<condition>.

            \\rankline
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=[]),
        Spell('Crippling Curse', 8, 'One living creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<immobilized> until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.
        """, tags=['Curse']),
    ],
    rituals=[
        Spell('Awaken', 6, 'One Large or smaller \\glossterm<ally> within \\rngmed range', """
            The target becomes sentient.
            Its Intelligence becomes 1d6 - 5.
            Its type changes from animal to magical beast.
            It gains the ability to speak and understand one language that you know of your choice.
            Its maximum age increases to that of a human (rolled secretly).
            This effect is permanent.

            This ritual takes 24 hours to perform, and requires 50 action points from its participants.
            You can only learn this ritual if you know this mystic sphere through the nature \\glossterm<magic source>.
        """, tags=['AP', ]),
        Spell('Air Breathing', 3, 'One Medium or smaller ritual participant', """
            The target can breathe air as easily as a human breathes air, preventing it from suffocating above water if it can normally only breathe water or some other substance.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
        Spell('Water Breathing', 3, 'One Medium or smaller ritual participant', """
            The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
    ],
    category='damage',
)
