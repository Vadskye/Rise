from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects

toxicology=MysticSphere(
    name="Toxicology",
    short_description="Create and manipulate poisons and acids",
    cantrips=[
        Effects('Intensify Poison', 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude with a +4 bonus to \\glossterm<accuracy> against the target.
            If the target is not currently poisoned, this ability has no effect.
            \\hit Choose a poison affecting the target.
            The poison progresses by one stage against the target, which can have varying effects depending on the poison (see \\pcref<Poison>).
            \\crit As above, except that the poison progresses by two stages instead of one.
        """, scaling="accuracy", tags=[]),
        Effects('Neutralize Poison', 'Yourself or one target within \\rngmed range', """
            The target gains an additional success to resist a poison currently affecting it (see \\pcref<Poison>).
        """, scaling="""
            \\rank<3> The number of additional successes increases to two.
            \\rank<5> The number of additional successes increases to three, which is enough to remove most poisons immediately.
            \\rank<7> The target can also gain the same number of successes to remove an additional poison affecting it.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Corrosive Grasp', 1, 'One creature or object within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            Make a melee attack vs. Reflex against the target.
            \\hit The target takes acid damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[], focus=False),
        Spell('Poison -- Asp Venom', 2, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> by the first \\glossterm<poison stage> of asp venom.
            At the end of each subsequent round, you repeat this attack, as normal for poisons (see \\pcref<Poison>).
            A creature poisoned by asp venom becomes \\glossterm<sickened> as long as it is poisoned.
            Reaching the third \\glossterm<poison stage> causes the target to become \\glossterm<nauseated> as long as it is poisoned.
            A third failed attack ends the poison.
            \\crit As above, except that target immediately reaches the second \\glossterm<poison stage>, as normal for poisons.
        """, scaling="accuracy", tags=['Manifestation']),
        Spell('Poison -- Dragon Bile', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> with dragon bile.
            At the end of each subsequent round, you repeat this attack, as normal for poisons.
            For each \\glossterm<poison stage>, including the initial stage, the target takes 1d10 physical damage.
            A third failed attack ends the poison.
            % No \\glance effect
            \\crit As above, except that target immediately reaches the second \\glossterm<poison stage>, as normal for poisons.
        """, scaling="""
            The hit point loss from the poison increases by +1d for each rank beyond 3.
        """, tags=['Manifestation']),
        Spell('Poison Transferance', 2, ['Yourself or an \\glossterm<ally> within \\rngmed range', 'One other living creature within that range'], """
            The primary target must be currently affected by a poison.
            Make an attack vs. Fortitude against the secondary target.
            \\hit The primary target gains an additional success to resist a poison currently affecting it.
            In addition, the secondary target becomes \\glossterm<poisoned> by that same poison, and immediately suffers the effect of the poison's first \\glossterm<poison stage>.
            % No glance effect; weird shenanigans if you autoremove the poison
            \\crit As above, except that the primary target gains two successes to resist its poison.
            In addition, the secondary target immediately reaches the poison's second poison stage.
        """, scaling="accuracy", tags=[]),
        Spell('Poison Immunity', 4, 'Yourself', """
            You become immune to all \\glossterm<poisons>.
            You stop being poisoned by any poisons currently affecting you, and new poisons cannot be applied to you.
        """, scaling="""
            \\rank<6> You can cast this spell as a \\glossterm<minor action>.
        """, tags=['Attune (self)']),
        Spell('Acidic Blood', 3, ['Yourself', 'Everything adjacent to you'], """
            Your blood becomes acidic.
            This does not harm you, but your blood can be dangerous to anything nearby when you bleed.
            At the end of each round, if you lost \\glossterm<hit points> during that round, make an attack vs. Fortitude against everything adjacent to you.
            \\hit Each secondary target takes acid damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Attune (target)']),
        Spell('Sickness', 1, 'One living creature within \\rngshort range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<sickened> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<nauseated> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=[]),
        Spell('Sickening Curse', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<sickened> until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="accuracy", tags=['Curse']),
        Spell('Acid Splash', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes acid damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Acid Arrow', 2, 'One creature or object within \\rnglong range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes acid damage equal to 2d6 plus your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Acid Spray', 1, 'Everything in a \\areasmall cone from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes acid damage equal to 1d8 plus half your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Acid Breath', 3, 'Yourself (see text)', """
            You can cast this spell as a \\glossterm<minor action>.

            As a standard action, you can breathe acid like a dragon.
            When you do, make an attack vs. Fortitude against everything in a \\arealarge cone from you.
            After you use this ability, you cannot use it again until after the end of the next round.

            \\hit Each target takes acid damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Corrosive Splash', 5, 'One creature or object within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes acid damage equal to 4d6 plus your \\glossterm<power>.
            This attack deals double damage to objects.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Acid Rain', 4, 'Everything in a \\areasmall radius, 30 ft.\\ high cylinder within \\rngmed range', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes acid damage equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Acid Orb', 3, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes acid damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Healing Salve', 2, 'Yourself or one \\glossterm<ally> within your \\glossterm<reach>', """
            The target regains \\glossterm<hit points> equal to 1d6 plus half your \\glossterm<power>.
        """, scaling="""
            The healing increases by +1d for each rank beyond 2.
        """, tags=[]),
    ],
    rituals=[
    ],
    category='damage',
)
