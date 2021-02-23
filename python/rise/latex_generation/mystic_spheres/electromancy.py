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
electromancy = MysticSphere(
    name="Electromancy",
    short_description="Create electricity to injure and stun foes",
    cantrips=[
        Effects(
            "Spark",
            "One creature or object within \\rngshort range",
            """
        Make an attack vs. Reflex against the target.
        \\hit The target takes 2 electricity damage.
    """,
            scaling="""
        \\rank<2> The damage increases to 5.
        \\rank<4> The damage increases to 10.
        \\rank<6> The damage increases to 20.
    """,
            tags=[],
        ),
        Effects(
            "Magnetize",
            "One Tiny or smaller unattended metal object within \\rngmed range",
            """
        The target pulls itself toward metal objects within 1 foot of it.
        Smaller objects are typically pulled towards the target, while it moves itself towards larger objects.
        Once it becomes affixed to another metal object, it takes a \\glossterm<difficulty rating> 10 Strength check to separate the two objects.
    """,
            scaling="""
        \\rank<2> The maximum size increases to Small.
        \\rank<4> The maximum size increases to Medium.
        \\rank<6> The maximum size increases to Large.
    """,
            tags=["Sustain (minor)"],
        ),
    ],
    lists=["Arcane", "Nature", "Pact"],
    spells=[
        Spell(
            "Lightning Bolt",
            3,
            "Everything in a \\arealarge, 10 ft.\\ wide line from you",
            """
        Make an attack vs. Reflex against each target.
        \\hit Each target takes electricity damage equal to 2d6 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Shocking Grasp",
            1,
            "One creature or object within your \\glossterm<reach>",
            """
        This spell does not have the \\glossterm<Focus> tag.
        You must have a \\glossterm<free hand> to cast this spell.

        Make a melee attack vs. Reflex against the target.
        \\hit The target takes electricity damage equal to 1d10 plus your \\glossterm<power>.
    """,
            scaling="damage",
            tags=[],
            focus=False,
        ),
        Spell(
            "Discharge",
            1,
            "Everything in a \\areasmall radius from you",
            """
        Make an attack vs. Reflex against each target.
        \\hit Each target takes electricity damage equal to 1d8 plus half your \\glossterm<power>.
    """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Stunning Discharge",
            3,
            "\\glossterm<Enemies> in a \\areamed radius from you",
            """
        Make an attack vs. Fortitude against each target.
        \\hit Each target that has no remaining \\glossterm<resistance> to electricity damage is \\glossterm<stunned> as a \\glossterm<condition>.
        \\glance As above, except that the condition is removed at the end of the next round.
        \\crit As above, except that the condition must be removed twice before the effect ends.
    """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Lightning Storm",
            4,
            "\\glossterm<Enemies> and objects in a \\arealarge radius from  you",
            """
        Make an attack vs. Reflex against each target.
        \\hit Each target takes electricity damage equal to 2d8 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Shock and Awe",
            4,
            "Creatures in a \\areasmall radius within \\rngmed range",
            """
         Make an attack vs. Fortitude against each target.
         \\hit Each target is \\glossterm<dazed> and \\glossterm<disoriented> until the end of the next round.
         \\crit Each target is \\glossterm<dazed> and \\glossterm<disoriented> as a single \\glossterm<condition>.
        """,
            scaling="accuracy",
            tags=[],
        ),
        # +2 levels for metal accuracy
        Spell(
            "Electromagnetic Bolt",
            4,
            "Everything in a \\areamed, 10 ft.\\ wide line from you",
            """
        Make an attack vs. Reflex against each target.
        You gain a +2 bonus to accuracy against each target that is wearing metal armor or otherwise carrying or composed of a significant amount of metal.
        \\hit Each target takes electricity damage equal to 2d8 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Magnetic Blade",
            3,
            "Yourself",
            """
        You can cast this spell as a \\glossterm<minor action>.

        Metal weapons wielded by the target gain a +1 bonus to \\glossterm<accuracy> against targets wearing metal armor or otherwise carrying or composed of a significant amount of metal.
    """,
            scaling="""
        \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
        \\rank<7> The accuracy bonus increases to +2.
    """,
            tags=["Attune (target)"],
        ),
        Spell(
            "Chain Lightning",
            5,
            [
                "One creature or object within \\rngmed range",
                "\\glossterm<Enemies> within a \\areasmall radius from the primary target",
            ],
            """
        Make an attack vs. Fortitude against the target.
        \\hit The primary target takes electricity damage equal to 4d6 plus your \\glossterm<power>.
        \\glance As above, except that that the target takes half damage.

        In addition, regardless of whether you hit the primary target, make an attack vs. Reflex against each secondary target.
        \\hit Each secondary target takes electricity damage equal to 2d10 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="""
        The damage to both the primary and secondary targets increases by +1d for each rank beyond 5.
    """,
            tags=[],
        ),
        Spell(
            "Electric Jolt",
            1,
            "One creature or object within \\rngmed range",
            """
        Make an attack vs. Fortitude against the target.
        \\hit The target takes electricity damage equal to 1d10 plus your \\glossterm<power>.
    """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Electroshock",
            1,
            "One creature within \\rngmed range",
            """
        Make an attack vs. Fortitude against the target.
        \\hit The target takes 1d6 electricity damage.
        If it loses \\glossterm<hit points> from this damage, it is \\glossterm<stunned> as a \\glossterm<condition>.
    """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Disorienting Electroshock",
            4,
            "target",
            """
        Make an attack vs. Fortitude against the target.
        \\hit The target takes 2d6 electricity damage.
        If it loses \\glossterm<hit points> from this damage, it is \\glossterm<disoriented> as a \\glossterm<condition>.
        \\glance As above, except that that the target takes half damage.
    """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Call Lightning",
            3,
            "Everything in a \\areamed, 5 ft.\\ wide vertical line within \\rngmed range",
            """
        Make an attack vs. Reflex against each target.
        If you are outdoors in cloudy or stormy weather, you gain a +2 bonus to \\glossterm<accuracy> with the attack.
        If this spell has its area increased, only the length of the line increases.
        % Normal dice, but half power due to vertical line
        \\hit Each target takes takes bludgeoning damage equal to 2d8 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Energize",
            2,
            "Yourself",
            """
        You can cast this spell as a \\glossterm<minor action>.

        The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<base speed>, up to a maximum of double its \\glossterm<base speed>.
    """,
            scaling="""
        \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
        \\rank<6> The speed bonus increases to +20 feet.
    """,
            tags=["Attune (target)"],
        ),
        Spell(
            "Lightning Breath",
            3,
            "Yourself (see text)",
            """
        You can cast this spell as a \\glossterm<minor action>.

        As a standard action, you can breathe electricity like a dragon.
        When you do, make an attack vs. Reflex against everything within a \\arealarge cone.
        After you use this ability, you cannot use it again until after the end of the next round.

        \\hit Each target takes electricity damage equal to 2d6 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="damage",
            tags=["Attune (self)"],
        ),
        Spell(
            "Ball Lightning",
            4,
            "See text",
            """
        You create a Medium ball of lightning in one space within \\rngmed range.
        The ball of lightning does not occupy space or block movement, and can move through creatures (but not solid objects) freely.
        As a \\glossterm<move action>, you can move the ball up to 30 feet in any direction, even vertically.
        At the end of each round, if the ball is more than 100 feet from you, it disappears and this effect ends.
        Otherwise, make an attack vs. Reflex with a -2 penalty to accuracy against everything in its space.
        \\hit Each target in the ball's space takes 2d8 electricity damage.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="damage",
            tags=["Sustain (minor)"],
        ),
        Spell(
            "Personal Conduction",
            3,
            ["Yourself", "See text"],
            """
        You can cast this spell as a \\glossterm<minor action>.

        You conduct electricity through your body.
        At the end of each round, make an attack vs. Fortitude against each creature that either is \\glossterm<grappling> with you or that attacked you with a metal melee weapon that round.
        % full dice, but half power
        \\hit Each secondary target takes electricity damage equal to 2d8 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="damage",
            tags=["Attune (self)"],
        ),
        Spell(
            "Electrocute",
            5,
            "One creature within \\rngmed range",
            """
        Make an attack vs. Fortitude against the target.
        % +2d from level, add trivial extra benefit for fun
        \\hit The target takes electricity damage equal to 4d10 plus your \\glossterm<power>.
        If this damage would inflict a \\glossterm<vital wound>, it inflicts an additional \\glossterm<vital wound>.
        \\glance As above, except that that the target takes half damage.
    """,
            scaling="damage",
            tags=[],
        ),
        # like an automatic end of round damage condition, but +3 levels for more
        # damage and a minor action requirement
        Spell(
            "Lightning Rod",
            4,
            "One creature or object within \\rngmed range",
            """
        Make an attack vs. Reflex against the target.
        \\hit As a \\glossterm<condition>, the target attracts lightning.
        As a \\glossterm<minor action>, you can call a bolt of lightning to strike the target.
        When you do, the target takes electricity damage equal to 2d8 plus half your \\glossterm<power>.
        \\glance As above, except that the condition is removed at the end of the next round.
        \\crit As above, except that each bolt deals double damage.
    """,
            scaling="damage",
            tags=["Attune (self)"],
        ),
        Spell(
            "Thunderdash",
            3,
            "Everything in the area (see text)",
            """
        You teleport into an unoccupied destination on a stable surface within \\rngshort range.
        Both your departure and arrival with this spell sound like a clap of thunder.
        In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        \\hit Each target takes electricity damage equal to 2d6 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Greater Thunderdash",
            6,
            "Everything in the area (see text)",
            """
        You teleport into an unoccupied destination on a stable surface within \\rngdist range.
        Both your departure and arrival with this spell sound like a clap of thunder.
        In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
        \\hit Each target takes electricity damage equal to 4d6 plus half your \\glossterm<power>.
        \\glance As above, except that that each target takes half damage.
    """,
            scaling="damage",
            tags=[],
        ),
    ],
    category="damage",
)
