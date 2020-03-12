from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects



# Primary: debuff
# Secondary: damage
# None: buff, utility
corruption=MysticSphere(
    name="Corruption",
    short_description="Weaken the life force of foes, reducing their combat prowess",
    cantrips=[],
    lists=['Arcane', 'Divine', 'Nature', 'Pact'],
    spells=[
        Spell('Malaise', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<sickened> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<nauseated> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Curse of Malaise', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<sickened> until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.

            \\rankline
            \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Curse']),
        Spell('Decay', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, the target becomes more vulnerable to injury.
            Whenever it loses a \\glossterm<hit point>, it reduces its maximum \\glossterm<hit points> by 1.
            When this condition is removed, the target's maximum \\glossterm<hit points> are restored.
            \\crit As above, except that the target also takes a -2 penalty to \\glossterm<wound rolls>.

            \\rankline
            \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Curse of Decay', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target becomes more vulnerable to injury until it takes a short rest.
            Whenever it loses a \\glossterm<hit point>, it reduces its maximum \\glossterm<hit points> by 1.
            This cannot reduce the target's maximum \\glossterm<hit points> below 1.
            When this effect is removed, the target's maximum \\glossterm<hit points> are restored.
            \\crit As above, except that the effect lasts until this curse is removed.

            \\rankline
            \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Curse']),
        Spell('Miasma', 3, '\\glossterm<Enemies> within an \\areamed radius from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target is \\glossterm<sickened> as a \\glossterm<condition>.

            \\rankline
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The area increases to a \\areahuge radius.
        """, tags=[]),
        Spell('Eyebite', 5, 'One living creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<6> The attack gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Eyebite Curse', 8, 'One living creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<blinded> until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.
        """, tags=['Curse']),
        Spell('Bleed', 4, 'One living creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, the target begins bleeding.
            At the end of each round, it takes physical \\glossterm<standard damage> -1d.
            This damage cannot inflict a \\glossterm<vital wound>, even if the target has no \\glossterm<hit points> remaining.
            \\crit As above, except that the damage can inflict a \\glossterm<vital wound>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage>.
            \\rank<8> The damage increases to \\glossterm<standard damage> +1.
        """, tags=[]),
        Spell('Curse of Blood', 6, 'One living creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The target begins bleeding until it takes a \\glossterm<short rest>.
            At the end of each round, it takes physical \\glossterm<standard damage> -1d.
            This damage cannot inflict a \\glossterm<vital wound>, even if the target has no \\glossterm<hit points> remaining.
            \\crit As above, except that the effect lasts until this curse is removed.

            \\rankline
            \\rank<8> The damage increases to \\glossterm<standard damage>.
        """, tags=['Curse']),
        Spell('Cripple', 6, 'One living creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<paralyzed> as a \\glossterm<condition>.

            \\rankline
            \\rank<8> The attack gains a +1 bonus to \\glossterm<accuracy>.
        """, tags=[]),
        Spell('Crippling Curse', 8, 'One living creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<immobilized> until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.
        """, tags=['Curse']),
    ],
    rituals=[
        Spell('Animate Dead', 3, 'Any number of corpses within \\rngclose range', """
            The combined levels of all targets cannot exceed your \\glossterm<power>.
            The target becomes an undead creature that obeys your spoken commands.
            You choose whether to create a skeleton or a zombie.
            Creating a zombie require a mostly intact corpse, including most of the flesh.
            Creating a skeleton only requires a mostly intact skeleton.
            If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.

            This ritual takes one hour to perform.
        """, tags=['Attune (ritual)']),
    ],
    category='debuff, combat',
)
