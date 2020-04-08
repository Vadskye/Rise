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
cantrips=[],
lists=['Arcane', 'Nature', 'Pact'],
spells=[
    Spell('Spark', 1, 'One creature within \\rngmed range', """
        Make an attack vs. Reflex against the target.
        \\hit The target takes electricity \\glossterm<standard damage> +1d.

        \\rankline
        \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
        \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
        \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
    """, tags=[]),
    Spell('Lightning Bolt', 1, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
        Make an attack vs. Reflex against each target.
        \\hit Each target takes electricity \\glossterm<standard damage> -1d.

        \\rankline
        \\rank<3> The area increases to a \\arealarge, 10 ft.\\ wide line from you
        \\rank<5> The area increases to a \\areahuge, 10 ft.\\ wide line.
        \\rank<7> The area increases to a \\areaext, 10 ft.\\ wide line.
    """, tags=[]),
    Spell('Shocking Grasp', 1, 'One creature or object you \\glossterm<threaten>', """
        This spell does not have the \\glossterm<Focus> tag.
        You must have a \\glossterm<free hand> to cast this spell.

        Make a melee attack vs. Reflex against the target.
        \\hit The target takes electricity \\glossterm<standard damage> +1d.

        \\rankline
        \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
        \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
        \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
    """, tags=[], focus=False),
    Spell('Discharge', 1, '\\glossterm<Enemies> and objects in a \\areasmall radius from you', """
        Make an attack vs. Reflex against each target.
        \\hit Each target takes electricity \\glossterm<standard damage> -1d.

        \\rankline
        \\rank<3> The damage increases to \\glossterm<standard damage>.
        \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
        \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
    """, tags=[]),
    Spell('Lightning Storm', 3, '\\glossterm<Enemies> and objects in a \\areamed radius from you', """
        Make an attack vs. Reflex against each target.
        \\hit Each target takes electricity \\glossterm<standard damage> -1d.

        \\rankline
        \\rank<5> The area increases to a \\arealarge radius.
        \\rank<7> The area increases to a \\areahuge radius.
    """, tags=[]),
    Spell('Electromagnetic Bolt', 4, 'Everything in a \\arealarge, 10 ft.\\ wide line from you', """
        Make an attack vs. Reflex against each target.
        You gain a +2 bonus to accuracy against each target that is wearing metal armor or otherwise carrying or composed of a significant amount of metal.
        \\hit Each target takes electricity \\glossterm<standard damage> -1d.

        \\rankline
        \\rank<5> The damage increases to \\glossterm<standard damage>.
        \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
    """, tags=[]),
    Spell('Magnetic Blade', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
        Metal weapons wielded by the target gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> against targets wearing metal armor or otherwise carrying or composed of a significant amount of metal.

        You can cast this spell as a \\glossterm<minor action>.

        \\rankline
        \\rank<5> The accuracy bonus increases to +2.
        \\rank<7> The accuracy bonus increases to +3.
    """, tags=['Attune (target)']),
    Spell('Chain Lightning', 5,
          ['One creature or object within \\rngmed range', '\\glossterm<Enemies> within a \\areasmall radius from the primary target'], """
        Make an attack vs. Fortitude against the target.
        \\hit The primary target takes electricity \\glossterm<standard damage> +2d.

        In addition, regardless of whether you hit the primary target, make an attack vs. Reflex against each secondary target.
        \\hit Each secondary target takes electricity \\glossterm<standard damage>.

        \\rankline
        \\rank<7> The damage to the primary target increases to \\glossterm<standard damage> +3d, and the damage to each secondary target increases to \\glossterm<standard damage> +1d.
    """, tags=[]),
    Spell('Electroshock', 3, 'One creature or object within \\rngmed range', """
        Make an attack vs. Fortitude against the target.

        \\hit The target takes electricity \\glossterm<standard damage> -2d and is \\glossterm<dazed> as a \\glossterm<condition>.

        \\rankline
        \\rank<5> The damage increases to \\glossterm<standard damage> -1d.
        \\rank<7> The damage increases to \\glossterm<standard damage>.
    """, tags=[]),
    Spell('Call Lightning', 3, 'Everything in a \\arealarge, 5 ft.\\ wide vertical line within \\rngmed range', """
        Make an attack vs. Reflex against each target.
        If you are outdoors in cloudy or stormy weather, you gain a +2 bonus to \\glossterm<accuracy> with the attack.
        If this spell has its area increased, such as with the Widened \\glossterm<augment>, only the length of the line increases.
        \\hit Each target takes takes electricity \\glossterm<standard damage>.


        \\rankline
        \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
        \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
    """, tags=[]),
    Spell('Energize', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
        The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<base speed>, up to a maximum of double its \\glossterm<base speed>.
        When this effect ends, the target becomes \\glossterm<fatigued> as a \\glossterm<condition>.
        You can cast this spell as a \\glossterm<minor action>.

        \\rankline
        \\rank<3> The speed bonus increases to +15 feet.
        \\rank<5> The speed bonus increases to +20 feet.
        \\rank<7> The speed bonus increases to +30 feet.
    """, tags=['Attune (target)']),
    Spell('Lightning Breath', 4, ['Yourself', 'Everything within a \\arealarge cone'], """
        As a standard action, you can breathe electricity like a dragon.
        When you do, make an attack vs Reflex against each secondary target.
        \\hit Each secondary target takes electricity \\glossterm<standard damage> +1d.

        \\rankline
        \\rank<6> The damage increases to \\glossterm<standard damage> +2d.
        \\rank<8> The damage increases to \\glossterm<standard damage> +3d.
    """, tags=['Attune (self)']),
    Spell('Ball Lightning', 4, 'See text', """
        You create a Medium ball of lightning in one space within \\rngmed range.
        The ball of lightning does not occupy space or block movement, and can move through creatures (but not solid objects) freely.
        As a \\glossterm<move action>, you can move the ball up to 30 feet in any direction, even vertically.
        At the end of each round, if the ball is more than 100 feet from you, it disappears and this effect ends.
        Otherwise, make an attack vs. Reflex with a -2 penalty to accuracy against everything in its space.
        \\hit Each target in the ball's space takes electricity \\glossterm<standard damage> -2d.

        \\rankline
        \\rank<6> The damage increases to \\glossterm<standard damage> -1d.
        \\rank<8> The damage increases to \\glossterm<standard damage>.
    """, tags=['Sustain (minor)']),
    Spell('Personal Conduction', 3, ['Yourself', 'See text'], """
        You conduct electricity through your body.
        At the end of each round, make an attack vs. Fortitude against each creature that either is \\glossterm<grappling> with you or that attacked you with a metal melee weapon that round.
        \\hit Each secondary target takes electricity \\glossterm<standard damage>.

        \\rankline
        \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
        \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
    """, tags=['Attune (self)']),
],
category='damage',
)
