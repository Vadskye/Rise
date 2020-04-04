from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: damage
# Secondary: debuff
# Tertiary: utility
# None: buff
astromancy=MysticSphere(
    name="Astromancy",
    short_description="Transport creatures and objects instantly through space",
    cantrips=[
        Effects('Minor Translocation', 'Tiny or smaller unattended object within \\rngclose range', """
            The target teleports into an unoccupied location on a stable surface within range that can support the weight of the target.
            If the destination is invalid, the ability fails without effect.

            \\rankline
            \\rank<3> The range increases to \\rngmed.
            \\rank<5> The maximum size of the target increases to Small.
            \\rank<7> The range increases to \\rnglong.
        """, tags=[]),
    ],
    lists=['Arcane', 'Pact'],
    spells=[
        Spell('Dimensional Grasp', 1, 'One creature or object you \\glossterm<threaten>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            You partially teleport a touched target into the Astral Plane.
            Make a \\glossterm<physical attack> vs. Reflex against the target.
            \\hit The target takes energy \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[], focus=False),
        Spell('Jittering Curse', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit At the end of each \\glossterm<movement phase>, the target teleports 10 feet in a random direction.
            This effect lasts until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until the curse is removed.

            \\rankline
            \\rank<8> The distance teleported increases to 20 feet.
        """, tags=['Curse']),
        Spell('Curse of Stagnancy', 8, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit At the end of each round, the target teleports back to the location it was in
            when this spell was cast.
            This effect lasts until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until the curse is removed.
        """, tags=['Curse']),
        Spell('Dimensional Jaunt', 1, 'One creature within \\rngmed range', """
            You partially teleport the target into the Astral Plane.
            Make an attack vs. Mental against the target.
            \\hit The target takes energy \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        # TODO: target wording is awkward
        Spell('Teleport', 1, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
            The target teleports into an unoccupied destination within range.
            If the destination is invalid, this spell is \\glossterm<miscast>.

            \\rankline
            \\rank<3> The range increases to \\rngmed.
            \\rank<5> The range increases to \\rnglong.
            \\rank<7> The range increases to \\rngext.
        """, tags=[]),
        Spell('Banishment', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            You gain a +2 bonus to \\glossterm<accuracy> against \\glossterm<outsiders> not on their home planes and creatures created by \\glossterm<Manifestation> abilities.
            \\hit The target takes energy \\glossterm<standard damage>.
            \\crit The target takes double damage.
            In addition, if it is an outsider not on its home plane, it is teleported to a random location on its home plane.
            If it is a creature created by a \\glossterm<Manifestation> ability, it immediately disappears.

            \\rankline
            \\rank<5> The selective accuracy bonus increases to +4.
            \\rank<7> The selective accuracy bonus increases to +6.
        """, tags=[]),
        Spell('Dimension Door', 4, 'Yourself', """
            You teleport to a location within \\rnglong range of you.
            You must clearly visualize the destination's appearance, but you do not need \\glossterm<line of sight> or \\glossterm<line of effect> to your destination.

            \\rankline
            \\rank<6> The range increases to \\rngext feet.
            \\rank<8> The range increases to 3,000 feet.
        """, tags=[]),
        Spell('Dimensional Jaunt -- Plane of Earth', 3, 'One creature within \\rngmed range', """
            You partially teleport the target into the Plane of Earth.
            Make an attack vs. Mental against the target.
            \\hit The target takes bludgeoning \\glossterm<standard damage> -2d and is \\glossterm<slowed> as a \\glossterm<condition>.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage> -1d.
            \\rank<7> The damage increases to \\glossterm<standard damage>.
        """, tags=[]),
        Spell('Dimensional Jaunt -- Plane of Fire', 4,  'One creature within \\rngmed range', """
            You partially teleport the target into the Plane of Fire.
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<ignited>.
            This condition can also be removed if the target makes a \\glossterm<difficulty rating> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
            Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
            \\crit As above, except that the condition cannot be removed with a \\glossterm<move action>.

            \\rankline
            \\rank<6> The condition cannot be removed with a \\glossterm<move action>.
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=[]),
        Spell('Dimensional Jitter', 5, 'Yourself', """
            At the end of each \\glossterm<phase>, you may choose to teleport 10 feet in a random direction.
            If your \\glossterm<line of effect> to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are.

            \\rankline
            \\rank<7> You can choose the direction of the teleportation.
        """, tags=['Attune (self)']),
        Spell('Dimensional Jaunt -- Myriad', 5, 'One creature within \\rngmed range', """
            You partially teleport the target through a number of planes in sequence.
            Make an attack vs. Mental against the target.
            \\hit The target takes \\glossterm<standard damage> +3d of all damage types.

            \\rankline
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Dimensional Jaunt -- Deep Astral Plane', 8, 'One creature within \\rngmed range', """
            You partially teleport the target into the Deep Astral Plane.
            Make an attack vs. Mental against the target.
            \\hit The target takes energy \\glossterm<standard damage> -2d and is \\glossterm<confused> as a \\glossterm<condition>.
        """, tags=[]),
        # TODO: target wording
        Spell('Dimensional Shuffle', 3, 'Up to five targets within \\rngmed range from among you and your \\glossterm<allies>', """
            Each target teleports into the location of a different target.

            \\rankline
            \\rank<5> The range increases to \\rnglong.
            \\rank<7> The range increases to \\rngext.
        """, tags=[]),
        Spell('Dimension Walk', 4, 'Yourself', """
            You can teleport horizontally instead of moving normally.
            Teleporting a given distance costs movement equal to that distance.
            If your \\glossterm<line of effect> to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are that phase.
            You must be able to move to teleport in this way, so effects like being \\glossterm<immobilized> prevent this movement.

            \\rankline
            \\rank<6> You can also teleport vertically or diagonally in addition to horizontally.
            \\rank<8> You can teleport in this way even if you are unable to move, such as if you are \\glossterm<immobilized> or \\glossterm<paralyzed>.
        """, tags=['Attune (self)']),
        Spell('Blink', 1, 'Yourself', """
            You randomly blink between your current plane and the Astral Plane.
            \\glossterm<Targeted> \\glossterm<strikes> against you have a 20\\% failure chance as you happen to be in the Astral Plane when the attack would hit.
            However, all of your attacks also have the same failure chance.

            \\rankline
            \\rank<3> The failure chance increases to 30\\%.
            \\rank<5> The failure chance increases to 40\\%.
            \\rank<7> The failure chance increases to 50\\%.
        """, tags=['Attune (self)']),
        Spell('Controlled Blink', 4, 'Yourself', """
            You randomly blink between your current plane and the Astral Plane.
            This blinking stops when you take actions on your current plane.
            In any phase where you do not take any actions, \\glossterm<targeted> \\glossterm<strikes> against you have a 50\\% failure chance as you happen to be in the Astral Plane when the attack would hit.
            You are still affected normally by abilities that affect an area.

            \\rankline
            \\rank<6> This protects you against \\glossterm<mundane> \\glossterm<targeted> attacks instead of only from \\glossterm<strikes>.
            \\rank<8> This protects you against all \\glossterm<targeted> attacks.
        """, tags=['Attune (self)']),
        Spell('Transposition', 3, 'Two Large or smaller creatures within \\rngmed range', """
            Make an attack vs. Mental against each target.
            If you hit both targets, they each teleport into each other's locations.

            \\rankline
            \\rank<5> The maximum size increases to Huge.
            \\rank<7> The maximum size increases to Gargantuan.
        """, tags=[]),
    ],

    rituals=[
        Spell('Gate', 8, 'Special', """
            Choose a plane that connects to your current plane, and a location within that plane.
            This ritual creates an interdimensional connection between your current plane and the location you choose, allowing travel between those two planes in either direction.
            The gate takes the form of a \\areasmall radius circular disk, oriented a direction you choose (typically vertical).
            It is a two-dimensional window looking into the plane you specified when casting the spell, and anyone or anything that moves through it is shunted instantly to the other location.
            The gate cannot be \\glossterm<sustained> for more than 5 rounds, and is automatically dismissed at the end of that time.

            You must specify the gate's destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the location.
            Incomplete or incorrect mental images may result in the ritual leading to an unintended destination within the same plane, or simply failing entirely.

            % TODO: Is this planar cosmology correct?
            The Astral Plane connects to every plane, but transit from other planes is usually more limited.
            From the Material Plane, you can only reach the Astral Plane.

            This ritual takes one week to perform, and requires 98 action points from its participants.
        """, tags=['AP', 'Sustain (standard)']),
        Spell('Plane Shift', 4, ['Up to five Large or smaller ritual participants', 'One \\glossterm<planar rift> within \\rngmed range'], """
            The target creatures teleport to the unoccupied spaces closest to the other side of the target planar rift.
            For details about \\glossterm<planar rifts>, see \\pcref<Planar Rifts>.

            % TODO: Is this planar cosmology correct?
            The Astral Plane connects to every plane, but transit from other planes is usually more limited.
            From the Material Plane, you can only reach the Astral Plane.

            This ritual takes 24 hours to perform, and requires 18 action points from its participants.
        """, tags=['AP']),
        Spell('Astral Projection', 5, 'Up to five Large or smaller ritual participants', """
            The targets teleport to a random location within the Inner Astral Plane (see \\pcref<The Astral Plane>).

            In addition, a localized \\glossterm<planar rift> appears at the destination area on the Astral Plane which leads back to the location where this ritual was performed.
            The rift can only be passed through by the targets of this effect.
            It lasts for one week before disappearing permanently, potentially stranding the targets in the Astral Plane if they have not yet returned.

            This ritual takes 24 hours to perform, and requires 32 action points from its participants.
        """, tags=['AP']),
        Spell('Homeward Shift', 6, 'Up to five Large or smaller ritual participants', """
            This ritual can only be performed on the Astral Plane.
            The targets teleport to the last spaces they occupied on their home planes.

            This ritual takes 24 hours to perform, and requires 50 action points from its participants.
        """, tags=['AP']),
        Spell('Overland Teleportation', 5, 'Up to five Medium or smaller ritual participants', """
            Choose a destination up to 100 miles away from you on your current plane.
            Each target is teleported to the chosen destination.

            You must specify the destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the destination.
            If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
            The new destination will be one that more closely resembles your mental image.
            If no such area exists, the ritual simply fails.
            % TODO: does this need more clarity about what teleportation works?

            This ritual takes 24 hours to perform and requires 32 action points from its ritual participants.
        """, tags=['AP']),
        Spell('Retrieve Legacy', 4, 'One ritual participant', """
            If the target's \\glossterm<legacy item> is on the same plane and \\glossterm<unattended>, it is teleported into the target's hand.

            This ritual takes 24 hours to perform, and requires 18 action points from its ritual participants.
        """, tags=['AP']),
    ],
    category='damage',
)
