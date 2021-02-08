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
        Effects('Dimension Hop', 'Yourself', """
            You teleport into an unoccupied destination within 5 foot \\glossterm<range>.
            If the destination is invalid, this spell is \\glossterm<miscast>.
        """, scaling="""
            \\rank<2> The range increases to 15 feet.
            \\rank<4> The range increases to \\rngshort.
            \\rank<6> The range increases to \\rngmed.
        """, tags=[]),
        Effects('Translocate Object', 'One Tiny or smaller unattended object within \\rngshort range', """
            The target teleports into an unoccupied location within range on a stable surface that can support its weight.
            If the destination is invalid, the ability fails without effect.
        """, scaling="""
            \\rank<2> The range increases to \\rngmed.
            \\rank<4> The maximum size of the target increases to Small.
            \\rank<6> The range increases to \\rnglong.
        """, tags=[]),
    ],
    lists=['Arcane', 'Pact'],
    spells=[
        Spell('Dimensional Grasp', 1, 'One creature or object within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            You partially teleport a touched target into the Astral Plane.
            Make a melee attack vs. Reflex against the target.
            \\hit The target takes energy damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[], focus=False),
        Spell('Banishing Grasp', 4, 'One creature or object within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            You partially teleport a touched target into the Astral Plane.
            Make a melee attack vs. Reflex against the target.
            \\hit The target takes energy damage equal to 2d10 plus your \\glossterm<power>.
            \\glance As above, except that that the target takes half damage.
            \\crit As above, except that that the target takes double damage.
            In addition, if it is a \\glossterm<planeforged> not on its home plane, it is teleported to a random location on its home plane.
            If it is a creature created by a \\glossterm<Manifestation> ability, it immediately disappears.
        """, scaling="damage", tags=[], focus=False),
        Spell('Banishment', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit The target takes energy damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that the target takes half damage.
            \\crit As above, except that that the target takes double damage.
            In addition, if it is a \\glossterm<planeforged> not on its home plane, it is teleported to a random location on its home plane.
            If it is a creature created by a \\glossterm<Manifestation> ability, it immediately disappears.
        """, scaling="damage", tags=[]),
        Spell('Jittering Curse', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit At the end of each \\glossterm<movement phase>, the target teleports 10 feet in a random direction.
            This effect lasts until it takes a \\glossterm<short rest>.
            \\glance As above, except that the effect is removed at the end of the next round.
            \\crit As above, except that the effect lasts until the curse is removed.
        """, tags=['Curse']),
        # treat this as r2; it's similar to immobilized, but harder to cheese
        Spell('Curse of Stagnancy', 7, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit At the end of each round, the target teleports back to the location it was in
            when this spell was cast.
            This effect lasts until it takes a \\glossterm<short rest>.
            \\glance As above, except that the effect is removed at the end of the next round.
            \\crit As above, except that the effect lasts until the curse is removed.
        """, tags=['Curse']),
        Spell('Dimensional Jaunt', 1, 'One creature within \\rngmed range', """
            You partially teleport the target into the Astral Plane.
            Make an attack vs. Mental against the target.
            \\hit The target takes energy damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        # TODO: target wording is awkward
        Spell('Translocation', 1, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngshort range', """
            The target \\glossterm<teleports> into an unoccupied location within range on a stable surface that can support its weight.
            If the destination is invalid, this spell is \\glossterm<miscast>.
        """, scaling="""
            \\rank<3> The range increases to \\rngmed.
            \\rank<5> The range increases to \\rnglong.
            \\rank<7> The range increases to \\rngdist.
        """, tags=[]),
        Spell('Silent Translocation', 3, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngshort range', """
            This spell functions like the \\textit<translocation> spell, except that the target's departure and arrival with this spell are silent.
        """, scaling="""
            \\rank<5> The range increases to \\rngmed.
            \\rank<7> The range increases to \\rnglong.
        """, tags=[]),
        Spell('Dimension Door', 4, 'Yourself', """
            You teleport to an unoccupied destination on a stable surfce within \\rngdist range of you.
            You must clearly visualize the destination's appearance and have an approximate knowledge of its direction and distance from you.
            However, you do not need \\glossterm<line of sight> or \\glossterm<line of effect> to your destination.
        """, scaling="""
            \\rank<6> The range increases to \\rngext feet.
        """, tags=[]),
        Spell('Dimensional Jaunt -- Plane of Earth', 4, 'One creature within \\rngmed range', """
            You partially teleport the target into the Plane of Earth.
            Make an attack vs. Mental against the target.
            \\hit The target takes 2d6 bludgeoning damage.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<immobilized> as a \\glossterm<condition>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Dimensional Jaunt -- Plane of Air', 2, 'One creature or object within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 1d10 bludgeoning damage.
            If it loses \\glossterm<hit points> from this damage, you \\glossterm<knockback> it up to 50 feet in any direction (see \\pcref<Knockback Effects>).
            Moving the target upwards costs twice the normal movement cost.
        """, scaling="damage", tags=[]),
        # +2 levels for +1d
        Spell('Dimensional Jaunt -- Plane of Fire', 6,  'One creature within \\rngmed range', """
            You partially teleport the target into the Plane of Fire.
            Make an attack vs. Mental against the target.
            \\hit The target takes fire damage equal to 4d8 plus half your \\glossterm<power>.
            If it loses \\glossterm<hit points> from this damage, it catches on fire as a \\glossterm<condition>.
            At the end of each subsequent round, it takes 4d6 fire damage.

            If the the target gains a \\glossterm<vital wound> from this damage, the condition ends.
            This condition can be removed if the target makes a \\glossterm<difficulty rating> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
            Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
            \\glance As above, except that that the target takes half damage.
        """, scaling="""
            The damage of both the initial hit and the subsequent condition increases by +1d for each rank beyond 6.
        """, tags=[]),
        # +2 levels for mixed damage types, +2 levels for +1d
        Spell('Dimensional Jaunt -- Myriad', 5, 'One creature within \\rngmed range', """
            You partially teleport the target through a number of planes in sequence.
            Make an attack vs. Mental against the target.
            % note: +1d as part of the definition of this spell
            \\hit The target takes damage of all damage types equal to 4d8 plus your \\glossterm<power>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Dimensional Jaunt -- Deep Astral Plane', 7, 'One creature within \\rngmed range', """
            You partially teleport the target into the Deep Astral Plane.
            Make an attack vs. Mental against the target.
            \\hit The target takes 4d6 energy damage.
            In addition, it is \\glossterm<stunned> as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, tags=[]),
        Spell('Dimensional Jitter', 5, 'Yourself', """
            At the end of each \\glossterm<phase>, you may choose to \\glossterm<teleport> 10 feet horizontally in a random direction.
            If your \\glossterm<line of effect> to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are.
        """, scaling="""
            \\rank<7> You can choose the direction of the teleportation.
        """, tags=['Attune (self)']),
        # TODO: target wording
        Spell('Dimensional Shuffle', 2, 'Up to five targets within \\rngmed range from among you and your \\glossterm<allies>', """
            Each target \\glossterm<teleports> into the location of a different target.
        """, scaling="""
            \\rank<4> The range increases to \\rnglong.
            \\rank<6> The maximum number of targets increases to ten.
        """, tags=[]),
        Spell('Dimension Walk', 4, 'Yourself', """
            Once per round, you can teleport horizontally instead of moving normally.
            Teleporting a given distance costs movement equal to that distance.
            If your \\glossterm<line of effect> to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are that phase.
            You must be able to move to teleport in this way, so effects like being \\glossterm<immobilized> prevent this movement.
        """, scaling="""
            \\rank<6> You can teleport in this way any number of times each round, allowing you to break up your teleportation between movements.
        """, tags=['Attune (self)']),
        Spell('Flicker', 2, 'Yourself', """
            You randomly flicker between your current plane and the Astral Plane.
            \\glossterm<Targeted> \\glossterm<strikes> against you have a 20\\% failure chance as you happen to be in the Astral Plane when the attack would hit.
            However, all of your attacks also have the same failure chance.
        """, scaling="""
            \\rank<4> The failure chance increases to 30\\%.
            \\rank<6> The failure chance increases to 40\\%.
        """, tags=['Attune (self)']),
        Spell('Controlled Flicker', 4, 'Yourself', """
            This spell functions like the \\textit<flicker> spell, except that you can choose at the start of each round to stop flickering for that round.
            If you do, your attacks do not have a failure chance, and attacks against you also do not have a failure chance.
        """, scaling="""
            \\rank<6> The failure chance increases to 30\\%.
        """, tags=['Attune (self)']),
        Spell('Astral Instability', 3, 'Yourself', """
            At the start of each phase, you may \\glossterm<teleport> into a random location in the Astral Plane.
            At the end of the round, you reappear in the location where you disappeared.
            If that space is occupied, you reappear in the closest available space.
        """, scaling="""
            \\rank<5> When you disappear, you can choose where you reappear.
            You can choose any unoccupied location within \\rngshort range from the location where you disappeared.
            \\rank<7> The distance you can reappear at increases to \\rngmed range.
        """, tags=['Attune (self)']),
        Spell('Transposition', 3, 'Two Large or smaller creatures within \\rngmed range', """
            Make an attack vs. Mental against each target.
            If either target is not standing on solid ground, this spell fails.
            If you hit both targets, they each teleport into each other's locations.
            % No \\crit effect
            % No \\glance effect
        """, scaling="accuracy", tags=[]),
        Spell('Massive Transposition', 5, 'Two Gargantuan or smaller creatures within \\rngmed range', """
            This spell functions like the \\textit<transposition> spell, except that it can affect creatures with a maximum size of Gargantuan.
        """, scaling="accuracy", tags=[]),
        Spell('Phasing Blade', 3, 'Yourself', """
            Whenever the target makes a \\glossterm<strike>, its weapon or projectile can pass through a single physical obstacle up to one foot thick on its way to the strike's target.
            This can allow the target to ignore \\glossterm<cover>, or even attack through solid walls.
            It does not allow the target to ignore armor, shields, or or similar items used by the target of its attacks.
        """, scaling="""
            \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The strike can penetrate through any number of physical obstacles with a combined thickness of ten feet or less.
        """, tags=[]),
        Spell('Phasing Spells', 4, 'Yourself', """
            When determining whether you have \\glossterm<line of effect> to a particular location with spells, you can ignore a single physical obstacle up to one foot thick.
            This can allow you to cast spells through solid walls, though it does not grant you the ability to see through the wall.
        """, scaling="""
            \\rank<6> The maximum thickness you can ignore increases to 5 feet.
        """, tags=['Attune (self)']),
        Spell('Phasestep', 3, 'Yourself', """
            The target can move through creatures freely.
            This does not allow it to move through inanimate objects.
        """, scaling="""
            \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The target also ignores all sources of \\glossterm<difficult terrain>.
        """, tags=['Attune (target)']),
    ],

    rituals=[
        Spell('Gate', 7, 'Special', """
            Choose a plane that connects to your current plane, and a location within that plane.
            This ritual creates an interdimensional connection between your current plane and the location you choose, allowing travel between those two planes in either direction.
            The gate takes the form of a \\areatiny radius circular disk, oriented a direction you choose (typically vertical).
            It is a two-dimensional window looking into the plane you specified when casting the spell, and anyone or anything that moves through it is shunted instantly to the other location.
            The gate cannot be \\glossterm<sustained> for more than 5 rounds, and is automatically dismissed at the end of that time.

            You must specify the gate's destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the location.
            Incomplete or incorrect mental images may result in the ritual leading to an unintended destination within the same plane, or simply failing entirely.

            % TODO: Is this planar cosmology correct?
            The Astral Plane connects to every plane, but transit from other planes is usually more limited.
            From the Material Plane, you can only reach the Astral Plane.
        """, tags=['Sustain (standard)'], ritual_time='one week'),
        Spell('Plane Shift', 4, ['Up to five Large or smaller ritual participants', 'One \\glossterm<planar rift> within \\rngmed range'], """
            The target creatures teleport to the unoccupied spaces closest to the other side of the target planar rift.
            For details about \\glossterm<planar rifts>, see \\pcref<Planar Rifts>.

            % TODO: Is this planar cosmology correct?
            The Astral Plane connects to every plane, but transit from other planes is usually more limited.
            From the Material Plane, you can only reach the Astral Plane.
        """, tags=[], ritual_time='1 hour'),
        Spell('Astral Projection', 5, 'Up to five Large or smaller ritual participants', """
            The targets teleport to a single random location within the Inner Astral Plane (see \\pcref<The Astral Plane>).

            In addition, a localized \\glossterm<planar rift> appears at the destination area on the Astral Plane which leads back to the location where this ritual was performed.
            The rift can only be passed through by the targets of this effect.
            It lasts for one week before disappearing permanently, potentially stranding the targets in the Astral Plane if they have not yet returned.
        """, tags=[], ritual_time='24 hours'),
        Spell('Homeward Shift', 4, 'Up to five Large or smaller ritual participants', """
            This ritual can only be performed on the Astral Plane.
            The targets teleport to the last spaces they occupied on their home planes.
        """, tags=[], ritual_time='24 hours'),
        Spell('Overland Teleportation', 5, 'Up to five Medium or smaller ritual participants', """
            Choose a destination up to 100 miles away from you on your current plane.
            Each target is teleported to the chosen destination.

            You must specify the destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the destination.
            If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
            The new destination will be one that more closely resembles your mental image.
            If no such area exists, the ritual simply fails.
            % TODO: does this need more clarity about what teleportation works?
        """, tags=[], ritual_time='24 hours'),
        Spell('Distant Overland Teleportation', 7, None, """
            This ritual functions like the \\ritual<overland teleportation> ritual, except that there is no distance limitation.
            The dstination must simply be on the same plane as you.
        """, tags=[], ritual_time='24 hours'),
        Spell('Retrieve Legacy', 3, 'One ritual participant', """
            If the target's \\glossterm<legacy item> is on the same plane and \\glossterm<unattended>, it is teleported into the target's hand.
        """, tags=[], ritual_time='24 hours'),
    ],
    category='damage',
)
