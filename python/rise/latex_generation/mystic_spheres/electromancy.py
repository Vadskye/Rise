from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects

from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: damage
# Secondary: debuff
# Tertiary: buff
# None: utility
electromancy=MysticSphere(
name="Electromancy",
short_description='Create electricity to injure and stun foes',
cantrips=[
    Effects('Spark', 'One creature or object within \\rngclose range', """
        Make an attack vs. Reflex against the target.
        \\hit The target takes 2 electricity damage.
    """, scaling="""
        \\rank<3> The damage increases to 5.
        \\rank<5> The damage increases to 10.
        \\rank<7> The damage increases to 20.
    """, tags=[]),
],
lists=['Arcane', 'Nature', 'Pact'],
spells=[
    Spell('Lightning Bolt', 3, 'Everything in a \\arealarge, 10 ft.\\ wide line from you', """
        Make an attack vs. Reflex against each target.
        \\hit Each target takes electricity damage equal to 2d6 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """, scaling="damage", tags=[]),
    Spell('Shocking Grasp', 1, 'One creature or object within your \\glossterm<reach>', """
        This spell does not have the \\glossterm<Focus> tag.
        You must have a \\glossterm<free hand> to cast this spell.

        Make a melee attack vs. Reflex against the target.
        \\hit The target takes electricity damage equal to 1d10 plus your \\glossterm<power>.
    """, scaling="damage", tags=[], focus=False),
    Spell('Discharge', 1, '\\glossterm<Enemies> and objects in a \\areasmall radius from you', """
        Make an attack vs. Reflex against each target.
        \\hit Each target takes electricity damage equal to 1d8 plus half your \\glossterm<power>.
    """, scaling="damage", tags=[]),
    Spell('Stunning Discharge', 3, '\\glossterm<Enemies> in a \\areamed radius from you', """
        Make an attack vs. Fortitude against each target.
        \\hit Each target that has no remaining \\glossterm<resistance> to electricity damage is \\glossterm<stunned> as a \\glossterm<condition>.
        \\glance As above, except that the condition is removed at the end of the next round.
    """, scaling="accuracy", tags=[]),
    Spell('Lightning Storm', 5, '\\glossterm<Enemies> and objects in a \\arealarge radius from  you', """
        Make an attack vs. Reflex against each target.
        \\hit Each target takes electricity damage equal to 2d10 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """, scaling="damage", tags=[]),
    Spell('Shock and Awe', 6, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
         Make an attack vs. Fortitude against each target.
         \\hit Each target is \\glossterm<dazed> and \\glossterm<disoriented> until the end of the next round.
         \\crit Each target is \\glossterm<dazed> and \\glossterm<disoriented> as a single \\glossterm<condition>.
        """, scaling="accuracy", tags=[]),
    Spell('Electromagnetic Bolt', 4, 'Everything in a \\arealarge, 10 ft.\\ wide line from you', """
        Make an attack vs. Reflex against each target.
        You gain a +2 bonus to accuracy against each target that is wearing metal armor or otherwise carrying or composed of a significant amount of metal.
        \\hit Each target takes electricity damage equal to 2d8 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """, scaling="damage", tags=[]),
    Spell('Magnetic Blade', 3, 'Yourself', """
        Metal weapons wielded by the target gain a +1 bonus to \\glossterm<accuracy> against targets wearing metal armor or otherwise carrying or composed of a significant amount of metal.

        You can cast this spell as a \\glossterm<minor action>.
    """, scaling="""
        \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
        \\rank<7> The accuracy bonus increases to +2.
    """, tags=['Attune (target)']),
    Spell('Chain Lightning', 5,
          ['One creature or object within \\rngmed range', '\\glossterm<Enemies> within a \\areasmall radius from the primary target'], """
        Make an attack vs. Fortitude against the target.
        \\hit The primary target takes electricity damage equal to 4d6 plus your \\glossterm<power>.
        \\glance As above, except that that the target takes half damage.

        In addition, regardless of whether you hit the primary target, make an attack vs. Reflex against each secondary target.
        \\hit Each secondary target takes electricity damage equal to 2d10 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """, scaling="""
        The damage to both the primary and secondary targets increases by +1d for each rank beyond 5.
    """, tags=[]),
    Spell('Electric Jolt', 1, 'One creature or object within \\rngmed range', """
        Make an attack vs. Fortitude against the target.
        \\hit The target takes electricity damage equal to 1d10 plus your \\glossterm<power>.
    """, scaling="damage", tags=[]),
    Spell('Electroshock', 1, 'One creature within \\rngmed range', """
        Make an attack vs. Fortitude against the target.
        \\hit The target takes 1d6 electricity damage.
        If it loses \\glossterm<hit points> from this damage, it is \\glossterm<stunned> as a \\glossterm<condition>.
    """, scaling="damage", tags=[]),
    Spell('Disorienting Electroshock', 4, 'target', """
        Make an attack vs. Fortitude against the target.
        \\hit The target takes 2d6 electricity damage.
        If it loses \\glossterm<hit points> from this damage, it is \\glossterm<disoriented> as a \\glossterm<condition>.
        \\glance As above, except that that the target takes half damage.
    """, scaling="damage", tags=[]),
    Spell('Call Lightning', 3, 'Everything in a \\arealarge, 5 ft.\\ wide vertical line within \\rngmed range', """
        Make an attack vs. Reflex against each target.
        If you are outdoors in cloudy or stormy weather, you gain a +2 bonus to \\glossterm<accuracy> with the attack.
        If this spell has its area increased, only the length of the line increases.
        % Normal dice, but half power due to vertical line
        \\hit Each target takes takes bludgeoning damage equal to 2d8 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """, scaling="damage", tags=[]),
    Spell('Energize', 2, 'Yourself', """
        The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<base speed>, up to a maximum of double its \\glossterm<base speed>.

        You can cast this spell as a \\glossterm<minor action>.
    """, scaling="""
        \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
        \\rank<6> The speed bonus increases to +20 feet.
        \\rank<8> The speed bonus increases to +30 feet.
    """, tags=['Attune (target)']),
    Spell('Lightning Breath', 4, 'Yourself (see text)', """
        As a standard action, you can breathe electricity like a dragon.
        When you do, make an attack vs. Reflex against everything within a \\arealarge cone.
        \\hit Each target takes electricity damage equal to 2d8 plus half your \\glossterm<power>.

        You can cast this spell as a \\glossterm<minor action>.
    """, scaling="damage", tags=['Attune (self)']),
    Spell('Ball Lightning', 4, 'See text', """
        You create a Medium ball of lightning in one space within \\rngmed range.
        The ball of lightning does not occupy space or block movement, and can move through creatures (but not solid objects) freely.
        As a \\glossterm<move action>, you can move the ball up to 30 feet in any direction, even vertically.
        At the end of each round, if the ball is more than 100 feet from you, it disappears and this effect ends.
        Otherwise, make an attack vs. Reflex with a -2 penalty to accuracy against everything in its space.
        \\hit Each target in the ball's space takes 2d8 electricity damage.
        \\glance As above, except that that each target takes half damage.
    """, scaling="damage", tags=['Sustain (minor)']),
    Spell('Personal Conduction', 3, ['Yourself', 'See text'], """
        You conduct electricity through your body.
        At the end of each round, make an attack vs. Fortitude against each creature that either is \\glossterm<grappling> with you or that attacked you with a metal melee weapon that round.
        % full dice, but half power
        \\hit Each secondary target takes electricity damage equal to 2d8 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """, scaling="damage", tags=['Attune (self)']),
    Spell('Electrocute', 5, 'One creature within \\rngmed range', """
        Make an attack vs. Fortitude against the target.
        % +2d from level, add trivial extra benefit for fun
        \\hit The target takes electricity damage equal to 4d10 plus your \\glossterm<power>.
        If this damage would inflict a \\glossterm<vital wound>, it inflicts an additional \\glossterm<vital wound>.
        \\glance As above, except that that the target takes half damage.
    """, scaling="damage", tags=[]),
],
category='damage',
)
