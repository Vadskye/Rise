#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.effects import Effects
from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.util import latexify
import rise.statistics.rise_data as rise_data
from logging import getLogger, WARNING
# from pprint import pformat
logger = getLogger(__name__)
def log(*args):
    logger.log(*args)
def warn(*args):
    logger.log(WARNING, *args)

def generate_mystic_spheres():
    mystic_spheres = []

    # Primary: damage
    # Secondary: utility
    # Tertiary: buff
    # None: debuff
    mystic_spheres.append(MysticSphere(
        name='Aeromancy',
        short_description="Command air to protect allies and blast foes",
        cantrips=[
            Effects('Airborne Leap', 'Yourself', """
                You gain a +4 bonus to the Jump skill until the end of the next round.
            """, tags=[]),
            Effects('Soften Landing', 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                Until the end of the round, the target treats all falls as if they were 5 feet shorter per \\glossterm<power> for the purpose of determining \\glossterm<falling damage>.
            """, tags=[]),
        ],
        schools=['Transmutation'],
        lists=['Nature'],
        rituals=[
        ],
        spells=[
            Spell('Propulsion', 1, 'One Large or smaller \\glossterm<ally> in \\rngclose range', """
                You move the target up to 50 feet in any direction.
                You cannot change direction the direction of the movement partway through.
                Moving the target upwards cost twice the normal movement cost.
            """, tags=['Swift']),
            Spell('Wind Screen', 1, 'Yourself', """
                You gain a +1 \\glossterm<magic bonus> to Armor defense.
                This bonus is increased to +4 against ranged \\glossterm<physical attacks> from weapons or projectiles that are Small or smaller.

                You can cast this spell as a \\glossterm<minor action>.
                Any effect which increases the size of creature this spell can affect also increases the size of ranged weapon it defends against by the same amount.
            """, tags=['Attune (target)']),
            Spell('Greater Wind Screen', 4, 'Yourself', """
                This spell functions like the \\spell<wind screen> spell, except that the Armor defense bonus increases to +2 and the defense bonus against ranged attacks increases to +8.
            """, tags=['Attune (target)']),
            Spell('Windstrike', 1, 'One creature or object within \\rnglong range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Distant Windstrike', 3, 'One creature or object within 2,000 foot range', """
                This spell functions like the \\spell<windstrike> spell, except that it can affect a more distant target.
            """, tags=[]),
            Spell('Forceful Windstrike', 4, 'One creature or object within \\rnglong range', """
                This spell functions like the \\spell<windstrike> spell, except that you gain a +1d bonus to damage.
                In addition, if your attack result beats the target's Fortitude defense, you move it up to 30 feet in any direction.
                Moving the target upwards cost twice the normal movement cost.
            """, tags=[]),
            Spell('Greater Propulsion', 2, 'One Large or smaller \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<propulsion> spell, except that the distance you can move the target is increased to 100 feet.
                In addition, the target gains a +1 bonus to Armor defense during the current phase.
            """, tags=['Swift']),
            Spell('Supreme Propulsion', 4, 'One Large or smaller \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<propulsion> spell, except that the distance you can move the target is increased to 300 feet.
                In addition, the target gains a +2 bonus to Armor defense during the current phase.
            """, tags=['Swift']),
            Spell('Gentle Descent', 1, 'One Large or smaller \\glossterm<ally> in \\rngclose range', """
                The target gains a 30 foot \\glossterm<glide speed> (see \\pcref<Gliding>).
            """, tags=['Attune (target)']),
            Spell('Flight', 4, 'One large or smaller \\glossterm<ally> in \\rngclose range', """
                The target gains a 30 foot \\glossterm<fly speed> as long as it is no more than 50 feet above solid ground (see \\pcref<Flying>).
            """, tags=['Attune (target)']),
            Spell('Greater Flight', 7, 'One large or smaller \\glossterm<ally> in \\rngclose range', """
                The target gains a 30 foot \\glossterm<fly speed> with good \\glossterm<maneuverability> (see \pcref<Flying>).
            """, tags=['Attune (target)']),
            Spell('Buffeting Gale', 2, 'Everything in a \\arealarge, 10 ft. wide line from you', """
                Make an attack vs. Fortitude against each target.
                % TODO: wording
                \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d and is moved 20 feet in the direction the line points away from you.
                Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
            """, tags=[]),
            Spell('Greater Buffeting Gale', 4, 'Everything in a \\areahuge, 10 ft. wide line from you', """
                This spell functions like the \\spell<buffeting gale> spell, except that it affects more targets and targets are moved 50 feet instead of 20 feet.
            """, tags=[]),
            Spell('Windblade', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                Melee weapons wielded by the target gain an additional five feet of \\glossterm<reach>.
                This has no effect on ranged attacks the target makes.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Windblade', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                Melee weapons wielded by the target gain an additional ten feet of \\glossterm<reach>.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Stormlord', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<wind screen> spell, except that the air also retaliates against creatures that attack the target.
                When a creature within \\rngclose range of the target attacks it, make an attack vs. Armor against the attacking creature.
                A hit deals bludgeoning \\glossterm<standard damage> -1d.
                Any individual creature can only be dealt damage in this way once per round.

                Any effect which increases this spell's range increases the range of this retaliation by the same amount.
            """, tags=['Attune (target)']),
            Spell('Greater Stormlord', 6, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<stormlord> spell, except that the damage increases to \\glossterm<standard damage> +1d.
            """, tags=['Attune (target)']),
            Spell('Air Walk', 5, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                The target can walk on air as if it were solid ground as long as it is no more than 50 feet above solid ground.
                The magic only affects the target's legs and feet.
                By choosing when to treat the air as solid, it can traverse the air with ease.
            """, tags=['Attune (target)']),
            Spell('Control Weather', 4, None, """
                When you cast this spell, you choose a new weather pattern.
                You can only choose weather which would be possible in the climate and season of the area you are in.
                For example, you can normally create a thunderstorm, but not if you are in a desert.

                When you complete the spell, the weather begins to take effect in a two mile radius cylinder-shaped \\glossterm<zone> from your location.
                After five minutes, your chosen weather pattern fully takes effect.

                You can control the general tendencies of the weather, such as the direction and intensity of the wind.
                You cannot control specific applications of the weather -- where lightning strikes, for example, or the exact path of a tornado.
                Contradictory weather conditions are not possible simultaneously.

                After the spell's effect ends, the weather continues on its natural course, which may cause your chosen weather pattern to end.
                % TODO: This should be redundant with generic spell mechanics
                If another ability would magically manipulate the weather in the same area, the most recently used ability takes precedence.
            """, tags=['Attune (self)']),
            Spell('Cyclone', 2, 'Everything in a \\areasmall radius within \\rngclose range', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Greater Cyclone', 5, 'Everything in a \\areamed radius within \\rngmed range', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Hurricane', 4, 'Enemies in a \\arealarge radius from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d and is moved 20 feet clockwise around you.
                Each target's final position should be the same distance from you as its starting position.
            """, tags=[]),
            Spell('Greater Hurricane', 6, 'Enemies in a \\arealarge radius from you', """
                This spell functions like the \\spell<hurricane> spell, except that it deals \\glossterm<standard damage> and targets are moved 50 feet instead of 20 feet.
            """, tags=[]),
            Spell('Stripping Windstrike', 2, 'One creature or object within \\rnglong range', """
                This spell functions like the \\spell<windstrike> spell, except that the attack result is also compared to the target's Reflex defense.
                % Clarify: this can hit even if the damaging effect misses
                \\hit The target drops all items it is holding that are not well secured (such as a ring) or held in two hands.
            """, tags=[]),
            Spell('Stripping Gale', 3, 'Everything in a \\arealarge, 10 ft. wide line from you', """
                This spell functions like the \\spell<buffeting gale> spell, except that the attack result is also compared to each target's Reflex defense.
                \\hit Each target drops all items it is holding that are not well secured (such as a ring) or held in two hands.
            """, tags=[]),
            Spell('Stripping Cyclone', 3, 'Everything in a \\areasmall radius within \\rngclose range', """
                This spell functions like the \\spell<cyclone> spell, except that the attack result is also compared to each target's Reflex defense.
                \\hit Each target drops all items it is holding that are not well secured (such as a ring) or held in two hands.
            """, tags=[]),
        ],
        category='buff, defense',
    ))

    # Primary: buff
    # Secondary: damage
    # Tertiary: debuff
    # None: utility
    mystic_spheres.append(MysticSphere(
        name="Aquamancy",
        short_description="Command water to crush and drown foes",
        cantrips=[
            Effects('Create Water', 'Any number of locations within \\rngclose range', """
                You create up to one gallon per \\glossterm<power> of wholesome, drinkable water at the target locations, allowing you to fill multiple small water containers.
                You must create a minimum of one ounce of water in each location.
            """, tags=['Creation']),
            Effects('Slippery Escape', 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +4 bonus to the Escape Artist skill until the end of the next round.
            """, tags=['Manifestation']),
        ],
        schools=['Conjuration'],
        lists=['Nature'],
        spells=[
            Spell('Constraining Bubble', 3, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit As a \\glossterm<condition>, the majority of the target's body is surrounded by a layer of water.
                This does not impede the target's ability to breathe, but it takes penalties as if it was fighting underwater (see \\pcref<Underwater Combat>).
                In addition, it gains a bonus equal to twice your \\glossterm<power> to \\glossterm<resistances> against fire damage.
            """, tags=['Manifestation']),
            Spell('Crushing Wave', 1, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.
            """, tags=['Manifestation']),
            Spell('Greater Crushing Wave', 3, 'Everything in a \\arealarge, 15 ft.\\ wide line from you', """
                This spell functions like the \\spell<crushing wave> spell, except that it affects more targets.
            """, tags=['Manifestation']),
            Spell('Great Flood', 6, 'Everything in a 200 ft.\\ long, 30 ft.\\ wide line from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.
            """, tags=['Manifestation']),
            Spell('Water Jet', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.
            """, tags=['Manifestation']),
            Spell('Fountain', 2, '\\glossterm<Enemies> within a \\areamed radius from you', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.
            """, tags=['Manifestation']),
            Spell('Greater Fountain', 4, '\\glossterm<Enemies> within a \\arealarge radius from you', """
                This spell functions like the \\spell<fountain> spell, except that it affects more targets.
            """, tags=['Manifestation']),
            Spell('Wall of Water', 3, None, """
                You create a wall of water in a 20 ft.\\ high, \\arealarge line within \\rngmed range.
                The wall is four inches thick, and blocks \\glossterm<line of effect> for abilities.
                Sight through the wall is possible, though distorted.
                The wall provides both \\glossterm<passive cover> and \\glossterm<concealment> to targets on the opposite side of the wall, for a total of a +4 bonus to Armor defense.
                Creatures can pass through the wall unharmed, though it costs five extra feet of movement to move through the wall.

                Each five-foot square of wall has a \\glossterm<wound threshold> equal to four times your \\glossterm<power>, and all of its defenses are 0.
                It is immune to most forms of attack, but it can be destroyed by \\glossterm<fire damage> and similar effects that can destroy water.
            """, tags=['Sustain (minor)', 'Manifestation']),
            Spell('Underwater Freedom', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target suffers no penalties for acting underwater, except for those relating to using ranged weapons.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Underwater Freedom', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<underwater freedom> spell, except that the target can also breathe water as if it was air.
            """, tags=['Attune (target)']),
            Spell('Raging River', 3, 'Everything in a \\areamed, 10 ft.\\ wide line from you (see text)', """
                This spell functions like the \\spell<crushing wave> spell, except that it gains the \\glossterm<Sustain> (standard) tag.
                The area affected by the spell becomes a \\glossterm<zone> that is continuously filled with rushing water.
                Each struck target in the area suffers penalties appropriate for fighting underwater, and may be unable to breathe.
                In addition, at the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """, tags=['Manifestation']),
            Spell('Greater Raging River', 5, 'Everything in a \\areamed, 10 ft.\\ wide line from you (see text)', f"""
                This spell functions like the \\spell<raging river> spell, except that the spell gains the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Sustain> (standard) tag.
            """, tags=['Manifestation']),
            Spell('Geyser', 2, 'Everything in a \\arealarge, 5 ft.\\ wide vertical line within \\rngmed range', """
                Make an attack vs. Armor against each target.
                If this spell has its area increased, such as with the Widened \\glossterm<augment>, only the length of the line increases.
                \\hit Each target takes takes bludgeoning \\glossterm<standard damage> +1d.
            """, tags=['Manifestation']),
            Spell('Greater Geyser', 4, 'Everything in a \\areahuge, 10 ft.\\ wide vertical line within \\rngmed range', """
                This spell functions like the \\spell<geyser> spell, except that it affects more targets.
            """, tags=['Manifestation']),
            Spell('Rainstorm', 2, 'Everything in the area (see text)', f"""
                Torrential rain begins falling out of thin air within a \\arealarge radius \\glossterm<zone> from your location.
                The rain extinguishes minor fires such as campfires and torches on contact.
                Everything in the area gain a bonus equal to your \\glossterm<power> to \\glossterm<resistances> against fire damage.
                \\glossterm<Water> abilities gain a +1 bonus to \\glossterm<accuracy> against targets in the area.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Overpowering Wave', 2, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
                This spell functions like the \\spell<crushing wave> spell, except that it attacks Reflex defense instead of Fortitude defense.
                In addition, it only affects creatures of Large size or smaller.
            """, tags=['Manifestation']),
            Spell('Obscuring Mist', 1, None, """
                Fog fills the air within a \\areamed radius \\glossterm<zone> from your location.
                The fog partially obstructs sight, granting \\glossterm<concealment> to anything seen through the fog (see \\pcref<Concealment>).
            """, tags=['Sustain (minor)']),
            Spell('Greater Obscuring Mist', 3, None, """
                This spell functions like the \\spell<obscuring mist> spell, except that the area increases to an \\arealarge radius \\glossterm<zone> from your location.
            """, tags=['Sustain (minor)']),
            Spell('Misty Shroud', 4, None, """
                This spell functions like the \\spell<obscuring mist> spell, except that the area becomes an \\glossterm<emanation> from you.
            """, tags=['Attune (self)']),
            Spell('Aqueous Tentacles', 2, 'Yourself', """
                Each of your arms with a \\glossterm<free hand> is covered with watery tentacles that you can attack with.
                Each tentacle is a slam \\glossterm<natural weapon> (see \\tref<Natural Weapons>).
                The tentacles have a \\glossterm<reach> of 10 feet, and any strikes with them are \\glossterm<magical strikes>.
            """, tags=['Attune (self)']),
            Spell('Greater Aqueous Tentacles', 4, 'Yourself', """
                This spell functions like the \\spell<aqueous tentacles> spell, except that the tentacles have a \\glossterm<reach> of 20 feet.
            """, tags=['Attune (self)']),
            Spell('Supreme Aqueous Tentacles', 6, 'Yourself', """
                This spell functions like the \\spell<aqueous tentacles> spell, except that the tentacles have a \\glossterm<reach> of 50 feet.
            """, tags=['Attune (self)']),
        ],
        rituals=[
            Spell('Dampen', 1, 'Up to five ritual participants', """
                Each target gains a \\glossterm<magic bonus> equal to your \\glossterm<power> to \\glossterm<resistances> against fire damage.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (ritual)']),
            Spell('Water Breathing', 2, 'One Medium or smaller ritual participant', """
                The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
        ],
        category='damage',
    ))

    # Primary: damage
    # Secondary: debuff
    # Tertiary: utility
    # None: buff
    mystic_spheres.append(MysticSphere(
        name="Astromancy",
        short_description="Transport creatures and objects instantly through space",
        cantrips=[
            Effects('Minor Translocation', 'Tiny or smaller unattended object within \\rngclose range', """
                The target teleports into an unoccupied location on a stable surface within range that can support the weight of the target.
                If the destination is invalid, the ability fails without effect.
            """, tags=[]),
        ],
        schools=['Conjuration'],
        lists=['Arcane', 'Pact'],
        spells=[
            Spell('Dimensional Jaunt', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target takes \\glossterm<standard damage>.
            """, tags=['Planar']),
            Spell('Teleport', 1, 'One Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                The target teleports into an unoccupied destination within range.
                If the destination is invalid, this spell is \\glossterm<miscast>.
            """, tags=[]),
            Spell('Greater Teleport', 3,'One Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                This spell functions like the \\spell<teleport> spell, except that the range is increased to \\rnglong.
            """, tags=[]),
            Spell('Banishment', 2, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<dimensional jaunt> spell, except that it gains a +2 bonus to \\glossterm<accuracy> against \\glossterm<outsiders> not on their home planes and creatures created by \\glossterm<Manifestation> abilities.
                \\crit The target takes double damage.
                In addition, if it is an outsider not on its home plane, it is teleported to a random location on its home plane.
                If it is a creature created by a \\glossterm<Manifestation> ability, it immediately disappears.
            """, tags=['Planar']),
            Spell('Dimension Door', 3, 'Yourself', """
                You teleport to a location within \\rngext range of you.
                You must clearly visualize the destination's appearance, but you do not need \\glossterm<line of sight> or \\glossterm<line of effect> to your destination.
            """, tags=[]),
            Spell('Dimensional Jaunt -- Plane of Earth', 2, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<dimensional jaunt> spell, except that the target is partially teleported into the Plane of Earth.
                The damage dealt changes to bludgeoning \\glossterm<standard damage> -1d, and a struck target is \\glossterm<slowed> as a \\glossterm<condition>.
            """, tags=['Planar']),
            Spell('Dimensional Jaunt -- Plane of Fire', 3,  'One creature within \\rngmed range', """
                This spell functions like the \\spell<dimensional jaunt> spell, except that the target is partially teleported into the Plane of Fire.
                The damage dealt changes to fire \\glossterm<standard damage>.
                In addition, a struck target is \\glossterm<ignited> until it puts out the fire.
                This condition can also be removed if the target makes a \\glossterm<DR> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
                Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
            """, tags=['Planar']),
            Spell('Dimensional Jitter', 4, 'Yourself', """
                At the end of each \\glossterm<action phase>, you may teleport 10 feet in any direction.
                If your \\glossterm<line of effect> to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are.
            """, tags=['Attune (self)']),
            Spell('Greater Dimensional Jitter', 7, 'Yourself', """
                This spell functions like the \\spell<dimensional jitter> spell, except that the distance you can teleport is increased to 30 feet.
            """, tags=['Attune (self)']),
            Spell('Dimensional Jaunt -- Myriad', 5, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<dimensional jaunt> spell, except that the target is partially teleported through a number of planes in sequence.
                The damage dealt increases to \\glossterm<standard damage> +3d and becomes damage of all types.
            """, tags=['Planar']),
            Spell('Dimensional Jaunt -- Deep Astral Plane', 7, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<dimensional jaunt> spell, except that the target is partially teleported into the deep Astral Plane.
                A struck target is \\glossterm<confused> as a \\glossterm<condition>.
            """, tags=['Planar']),
            # TODO: target wording
            Spell('Dimensional Shuffle', 2, 'Up to five targets within \\rngmed range from among you and your \\glossterm<allies>', """
                Each target teleports into the location of a different target.
            """, tags=[]),
            Spell('Dimension Walk', 3, 'Yourself', """
                You can teleport horizontally instead of moving normally.
                Teleporting a given distance costs movement equal to that distance.
                If your \\glossterm<line of effect> to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are that phase.
            """, tags=['Attune (self)']),
            Spell('Blink', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target randomly blinks between its current plane and the Astral Plane.
                This blinking stops if the target takes actions on its current plane.
                In any phase where it does not take any actions, \\glossterm<targeted> attacks against the target have a 50\\% miss chance.
                It is still affected normally by abilities that affect an area.
            """, tags=['Attune (target)', 'Planar']),
            Spell('Greater Blink', 6, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<blink> spell, except that the target also has a 20\% chance to completely ignore any effect that targets it directly during phases where it takes an action.
            """, tags=['Attune (target)', 'Planar']),
        ],
        rituals=[
            Spell('Gate', 7, 'Special', """
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
            """, tags=['AP', 'Planar', 'Sustain (standard)']),
            Spell('Plane Shift', 3, ['Up to five Large or smaller ritual participants', 'One \\glossterm<planar rift> within \\rngmed range'], """
                The target creatures teleport to the unoccupied spaces closest to the other side of the target planar rift.
                For details about \\glossterm<planar rifts>, see \\pcref<Planar Rifts>.

                % TODO: Is this planar cosmology correct?
                The Astral Plane connects to every plane, but transit from other planes is usually more limited.
                From the Material Plane, you can only reach the Astral Plane.

                This ritual takes 24 hours to perform, and requires 18 action points from its participants.
            """, tags=['AP', 'Planar']),
            Spell('Astral Projection', 4, 'Up to five Large or smaller ritual participants', """
                The targets teleport to a random location within the Inner Astral Plane (see \\pcref<The Astral Plane>).

                In addition, a localized \\glossterm<planar rift> appears at the destination area on the Astral Plane which leads back to the location where this ritual was performed.
                The rift can only be passed through by the targets of this effect.
                It lasts for one week before disappearing permanently, potentially stranding the targets in the Astral Plane if they have not yet returned.

                This ritual takes 24 hours to perform, and requires 32 action points from its participants.
            """, tags=['AP', 'Planar']),
            Spell('Homeward Shift', 5, 'Up to five Large or smaller ritual participants', """
                This ritual can only be performed on the Astral Plane.
                The targets teleport to the last spaces they occupied on their home planes.

                This ritual takes 24 hours to perform, and requires 50 action points from its participants.
            """, tags=['AP', 'Planar']),
            Spell('Overland Teleportation', 4, 'Up to five Medium or smaller ritual participants', """
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
            Spell('Retrieve Legacy', 3, 'One ritual participant', """
                If the target's \\glossterm<legacy item> is on the same plane and \\glossterm<unattended>, it is teleported into the target's hand.

                This ritual takes 24 hours to perform, and requires 18 action points from its ritual participants.
            """, tags=['AP']),
        ],
        category='damage',
    ))

    # Primary: buff
    # Secondary: utility
    # None: damage, debuff
    mystic_spheres.append(MysticSphere(
        name='Barrier',
        short_description="Shield allies and areas from hostile forces",
        cantrips=[
        ],
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        spells=[
            Spell('Mystic Barrier', 1, None, """
                You create a wall of magical energy in a 10 ft.\\ high, \\areamed line within \\rngmed range.
                The wall is visible as a shimmering magical membrane that does not block sight.
                Nothing can pass through the wall until it is destroyed.
                Each 5-ft.\\ square of wall has hit points equal to your \\glossterm<power>.
            """, tags=['Sustain (minor)']),
            Spell('Fortified Mystic Barrier', 3, None, """
                This spell functions like the \\spell<mystic barrier> spell, except that each 5-ft.\\ square of wall has hit points equal to four times your \\glossterm<power>.
            """, tags=['Sustain (minor)']),
            Spell('Expanded Mystic Barrier', 2, None, """
                This spell functions like the \\spell<mystic barrier> spell, except that the wall fills a 10 ft.\\ high, \\arealarge line.
            """, tags=['Sustain (minor)']),
            Spell('Impervious Mystic Barrier', 5, None, """
                This spell functions like the \\spell<mystic barrier> spell, except that the wall is immune to all damage except sonic damage and thaumatic damage.
            """, tags=['Sustain (minor)']),
            Spell('Wall of Energy Impedance', 2, None, """
                You create a wall of magical energy in a 10 ft.\\ high, \\areamed line within \\rngmed range.
                The wall is visible as a shimmering magical membrane that does not block sight.
                It does not impede passage for objects or creatures, but any ability that deals \\glossterm<energy damage> treats the wall as an impassable barrier.
            """, tags=['Sustain (minor)']),
            Spell('Wall of Magic Impedance', 4, None, """
                You create a wall of magical energy in a 10 ft.\\ high, \\areamed line within \\rngmed range.
                The wall is visible as a shimmering magical membrane that does not block sight.
                It does not impede passage for objects or creatures, but any \\glossterm<magical> ability treats the wall as an impassable barrier.
            """, tags=['Sustain (minor)']),
            Spell('Kinetic Shield', 1, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical> damage (minimum 1).

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Kinetic Shield', 4, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<kinetic shield> spell, except that the bonus increases to be equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Supreme Kinetic Shield', 7, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<kinetic shield> spell, except that the bonus increases to be equal to twice your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Resist Energy', 1, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<energy damage>.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Resist Energy', 4, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<resist energy> spell, except that the bonus is equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Complete Shield', 3, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<kinetic shield> spell, except that the bonus applies against all damage.
            """, tags=['Attune (target)']),
            Spell('Greater Complete Shield', 6, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<kinetic shield> spell, except that the bonus applies against all damage and is increased to be equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Repulsion Field', 2, 'All \\glossterm<enemies> that enter the area (see text)', """
                This spell creates a repulsive field in a \\areamed radius \\glossterm<zone> from your location.
                When an enemy makes physical contact with the spell's area for the first time, you make an attack vs. Mental against it.
                \\hit The target is unable to enter the spell's area with any part of its body.
                The rest of its movement in the current phase is cancelled.

                Creatures in the area at the time that the spell is cast are unaffected by the spell.
            """, tags=['Sustain (minor)']),
            Spell('Immunity', 3, 'Yourself', """
                Choose a type of damage that is not a type of physical damage (see \\pcref<Damage Types>).
                The target becomes immune to damage of the chosen type.
                Attacks that deal damage of multiple types still inflict damage normally unless the target is immune to all types of damage dealt.
            """, tags=['Attune (self)']),
            Spell('Retributive Shield', 3, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<kinetic shield> spell, except that damage resisted by this spell is dealt back to the attacker as life damage.
                If the attacker is beyond \\rngclose range of the target, this reflection fails.

                Any effect which increases this spell's range increases the range of this effect by the same amount.
                This spell is from both the Abjuration and Vivimancy schools and gains the \\glossterm<Life> tag in addition to the tags from the \\spell<kinetic shield> spell.
            """, tags=['Attune (target)']),
            Spell('Greater Kinetic Shield', 4, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<kinetic shield> spell, except that the bonus is equal to twice your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Deflective Shield', 1, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to Armor defense.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Deflective Shield', 4, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                This spell functions like the \\spell<deflective shield> spell, except that the bonus is increased to +2.
            """, tags=['Attune (target)']),
            Spell('Antilife Shell', 5, 'All \\glossterm<enemies> that enter the area (see text)', """
                This effect functions like the \\spell<repulsion field> spell, except that you gain a +10 bonus to accuracy with the attack against living creatures.
            """, tags=['Sustain (minor)']),
        ],
        rituals=[
            Spell('Endure Elements', 1, 'Yourself or an \\glossterm<ally> or unattended object within \\rngclose range', """
                The target suffers no harm from being in a hot or cold environment.
                It can exist comfortably in conditions between \minus50 and 140 degrees Fahrenheit.
                Its equipment, if any, is also protected.
                This does not protect the target from fire or cold damage.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
            Spell('Mystic Lock', 2, 'One large or smaller closable, nonmagical object within \\rngclose range, such as a door or box', """
                The target object becomes magically locked.
                It can be unlocked with a Devices check against a DR equal to 20 \\add your \\glossterm<power>.
                The DR to break it open forcibly increases by 10.

                You can freely pass your own \\ritual<arcane lock> as if the object were not locked.
                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
            Spell('Resilient Lock', 4, 'One large or smaller closable, nonmagical object within \\rngclose range, such as a door or box', f"""
                This ritual functions like the \\ritual<mystic lock> ritual, except that the DR to unlock the target with a Devices check is instead equal to 30 + your \\glossterm<power>.
                In addition, the DR to break it open increases by 20 instead of by 10.
            """, tags=['Attune (ritual)']),
            Spell('Explosive Runes', 3, 'One Small or smaller unattended object with writing on it within \\rngclose range', """
                % TODO: clarify how to identify that this is Explosive Runes instead of bad handwriting
                The writing on the target is altered by the runes in subtle ways, making it more difficult to read.
                To read the writing, a creature must concentrate on reading it, which requires a standard action.
                If a creature reads the target, the target explodes.
                You make an attack vs. Armor against everything within a \\areamed radius from the target.
                Each struck target takes energy \\glossterm<standard damage> from the explosion.

                After the target object explodes in this way, the ritual is \\glossterm<dismissed>.
                If the target is destroyed or rendered illegible, the ritual is dismissed without exploding.
                This ritual takes one hour to perform.
            """, tags=['Attune (ritual)', 'Trap']),
            Spell('Scryward', 2, None, """
                This ritual creates a ward against scrying in a \\arealarge radius \\glossterm<zone> centered on your location.
                All \\glossterm<Scrying> effects fail to function in the area.
                This effect is permanent.

                This ritual takes 24 hour to perform, and requires 8 action points from its participants.
            """, tags=['AP']),
            Spell('Private Sanctum', 4, None, """
                This ritual creates a ward against any external perception in a \\arealarge radius \\glossterm<zone> centered on your location.
                This effect is permanent.
                Everything in the area is completely imperceptible from outside the area.
                Anyone observing the area from outside sees only a dark, silent void, regardless of darkvision and similar abilities.
                In addition, all \\glossterm<Scrying> effects fail to function in the area.
                Creatures inside the area can see within the area and outside of it without any difficulty.

                This ritual takes 24 hours to perform, and requires 32 action points from its participants.
            """, tags=['AP']),
        ],
        category='buff, defense',
    ))

    # Primary: buff
    # None: debuff, utility, damage
    mystic_spheres.append(MysticSphere(
        name='Bless',
        short_description="Grant divine blessings to aid allies and improve combat prowess",
        cantrips=[
        ],
        schools=['Channeling'],
        lists=['Divine'],
        spells=[
            Spell('Blessing of Protection', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to Armor defense and Mental defense.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Blessing of Protection', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<blessing of protection> spell, except that bonus increases to +2.
            """, tags=['Attune (target)']),
            Spell('Supreme Blessing of Protection', 7, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<blessing of protection> spell, except that bonus increases to +3.
            """, tags=['Attune (target)']),
            Spell('Battle Blessing', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Battle Blessing', 5, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<battle blessing> spell, except that the bonus increases to +2.
            """, tags=['Attune (target)']),
            Spell('Blessing of Resilience', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                Whenever the target gains a \\glossterm<condition>, it can choose to negate that condition.
                After negating a condition in this way, this spell ends.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Blessing of Resilience', 6,  'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<blessing of resilience> spell, except that the spell does not end until it resists two \\glossterm<conditions>.
            """, tags=['Attune (target)']),
            Spell('Blessing of Supremacy', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> and a +2 \\glossterm<magic bonus> to \\glossterm<power>.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Blessing of Supremacy', 7, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +2 \\glossterm<magic bonus> to \\glossterm<accuracy> and a +4 \\glossterm<magic bonus> to \\glossterm<power>.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Cleansing Blessing', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target can remove a \\glossterm<condition>.
            """, tags=[]),
            Spell('Greater Cleansing Blessing', 5, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<cleansing blessing> spell, except that the target can remove two conditions instead of one.
            """, tags=[]),
            Spell('Cleansing Benediction', 4, 'You and each of your \\glossterm<allies> within a \\areamed radius from you', """
                Each target can remove one \\glossterm<condition>.
            """, tags=[]),
            Spell('Greater Benediction', 7, 'You and each of your \\glossterm<allies> within a \\areamed radius from you', """
                This spell functions like the \\spell<cleansing benediction> spell, except that each target can remove two conditions instead of one.
            """, tags=[]),
            Spell('Blessing of Might', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Blessing of Might', 5, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<blessing of might> spell, except that the power bonus increases to +4.
            """, tags=['Attune (target)']),
        ],
        rituals=[
            Spell('Blessing of Fortification', 1, 'One unattended, nonmagical object or part of an object of up to Large size', """
                Unlike most abilities, this ritual can affect individual parts of a whole object.

                % How should this affect Strength break DRs?
                The target gains a +5 \\glossterm<magic bonus> to \\glossterm<hardness>.
                If the target is moved, this effect ends.
                Otherwise, it lasts for one year.

                This ritual takes one hour to perform.
            """, tags=['Attune (ritual)']),
            Spell('Enduring Fortification', 3, 'One unattended, nonmagical object or part of an object of up to Large size', """
                This ritual functions like the \\spell<blessing of fortification> ritual, except that the effect lasts for one hundred years.
            """, tags=['AP']),
            Spell('Greater Enduring Fortification', 5,'Greater Fortification', """
                This ritual functions like the \\spell<greater fortification> ritual, except that the effect lasts for one hundred years.
            """, tags=['AP']),
            Spell('Greater Fortification', 3, 'One unattended, nonmagical object or part of an object of up to Large size', """
                This ritual functions like the \\spell<blessing of fortification> ritual, except that the \\glossterm<hardness> bonus increases to 10.
            """, tags=['Attune (ritual)']),
            Spell('Supreme Fortification', 6, 'One unattended, nonmagical object or part of an object of up to Large size', """
                This ritual functions like the \\spell<blessing of fortification> ritual, except that the \\glossterm<hardness> bonus increases to 15.
            """, tags=['Attune (ritual)']),
            Spell('Bless Water', 1, 'One pint of unattended, nonmagical water within \\rngclose range', """
                The target becomes holy water.
                Holy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck undead creature or an evil outsider.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
            Spell('Permanent Bless Water', 2, 'One pint of unattended, nonmagical water within \\rngclose range', """
                This ritual functions like the \\spell<bless water> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
                This ritual takes one hour to perform.
            """, tags=['AP']),
            Spell('Curse Water', 1, 'One pint of unattended, nonmagical water within \\rngclose range', """
                The target becomes unholy water.
                Unholy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck good outsider.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
            Spell('Permanent Curse Water', 2, 'One pint of unattended, nonmagical water within \\rngclose range', """
                This ritual functions like the \\spell<curse water> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
                This ritual takes one hour to perform.
            """, tags=['AP']),
            Spell('Blessing of Purification', 1, 'All food and water in a single square within \\rngclose range', """
                The targets are purified.
                Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
                This does not prevent subsequent natural decay or spoiling.

                This ritual takes one hour to perform.
            """, tags=['AP']),
        ],
        category='buff, offense',
    ))

    # This spell is problematic
    # Primary: damage
    # None: buff, debuff, utility
    mystic_spheres.append(MysticSphere(
        name="Channel Divinity",
        short_description="Invoke divine power to smite foes and gain power",
        cantrips=[
            Effects('Testament', 'Yourself', """
                The magical essence of your deity or alignment is overlayed on your body as an aura.
                This channels your deity if you are a cleric, or your alignment if you are a paladin.
                In either case, you gain the ability to see the auras of other creatures using this spell.
                If you see another creature with the same aura as you, this spell grants you the unerring knowledge of that similarity.
                This can allow you to identify other followers of your deity or alignment with certainty.
            """, tags=['Sustain (free)']),
        ],
        schools=['Channeling'],
        lists=['Divine'],
        spells=[
            Spell('Divine Judgment', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target takes \\glossterm<standard damage> +1d.
            """, tags=[]),
            Spell('Greater Divine Judgment', 4, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<divine judgment> spell, except that that damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Word of Faith', 2, '\\glossterm<Enemies> in a \\areamed radius from you', """
                Make an attack vs. Mental against each target.
                \\hit Each target takes \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Greater Word of Faith', 5, '\\glossterm<Enemies> in a \\arealarge radius from you', """
                This spell functions like the \\spell<word of faith> spell, except that it affects more targets and the damage increases to \\glossterm<standard damage> +1d.
            """, tags=[]),
            Spell('Mantle of Faith', 1, 'Yourself', """
                You gain a \\glossterm<magic bonus> to equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical> damage.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (self)']),
            Spell('Greater Mantle of Faith', 4, 'Yourself', """
                This spell functions like the \\spell<mantle of faith> spell, except that the bonus is equal to your \\glossterm<power>.
            """, tags=['Attune (self)']),
            Spell('Supreme Mantle Of Faith', 7, 'Yourself', """
                This spell functions like the \\spell<mantle of faith> spell, except that the bonus is equal to twice your \\glossterm<power>.
            """, tags=['Attune (self)']),
            Spell('Complete Mantle of Faith', 3, 'Yourself', """
                You gain a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against all damage.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (self)']),
            Spell('Greater Complete Mantle of Faith', 6, 'Yourself', """
                This spell functions like the \\spell<complete mantle of faith> spell, except that the bonus is equal to your \\glossterm<power>.
            """, tags=['Attune (self)']),
            Spell('Divine Might', 3, 'Yourself', """
                You increase your size by one \\glossterm<size category>.
                This increases your \\glossterm<overwhelm value> and \\glossterm<overwhelm resistance>, and usually increases your \\glossterm<reach> (see \\pcref<Size in Combat>).
                However, your physical form is not altered fully to match its new size, and your Strength and Dexterity are unchanged.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (self)']),
            Spell('Divine Might, Greater', 5, 'Yourself', """
                This spell functions like the \\spell<divine might> spell, except that you also gain a +2 \\glossterm<magic bonus> to Strength.
            """, tags=['Attune (self)']),
            Spell('Divine Might, Supreme', 7, 'Yourself', """
                This spell functions like the \\spell<divine might> spell, except that your size is increased by two size categories.
                You gain a +2 \\glossterm<magic bonus> to Strength to partially match your new size.
            """, tags=['Attune (self)']),
        ],
        rituals=[
            Spell('Consecrate', 2, None, """
                The area within an \\arealarge radius \\glossterm<zone> from your location becomes sacred to your deity.
                % TODO: what cares about consecration?
                This has no tangible effects by itself, but some special abilities and monsters behave differently in consecrated areas.

                This ritual takes 24 hours to perform and requires 8 action points from its ritual participants.
            """, tags=['Attune (self)']),
            Spell('Divine Transit', 4, 'Up to five Medium or smaller ritual participants', """
                Choose a destination up to 100 miles away from you on your current plane.
                Each target is teleported to the temple or equivalent holy site to your deity that is closest to the chosen destination.

                You must specify the destination with a precise mental image of its appearance.
                The image does not have to be perfect, but it must unambiguously identify the destination.
                If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
                The new destination will be one that more closely resembles your mental image.
                If no such area exists, the ritual simply fails.
                % TODO: does this need more clarity about what teleportation works?

                This ritual takes 24 hours to perform and requires 32 action points from its ritual participants.
                It is from the Conjuration school in addition to the Channeling school.
            """, tags=['AP']),
        ],
        category='damage',
    ))

    # Primary: debuff
    # Secondary: buff
    # Tertiary: utility
    # None: damage
    mystic_spheres.append(MysticSphere(
        name="Chronomancy",
        short_description="Manipulate the passage of time to inhibit foes and aid allies",
        cantrips=[
            Effects('Accelerated Reading', 'Yourself', """
                You can read at five times your normal speed.
                However, the mental effort imposes a -4 penalty to Mental defense.
            """, tags=['Sustain (free)']),
            Effects('Accelerated Search', 'Yourself', """
                Make an Awareness check to notice things in a single 10-ft.\\ squrae within 10 feet of you.
                You gain a +5 bonus to this check.
            """, tags=[]),
        ],
        schools=['Transmutation'],
        lists=['Arcane', 'Pact'],
        spells=[
            Spell('Slow', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
                \\crit The target is also \\glossterm<decelerated> as a separate \\glossterm<condition>.
            """, tags=[]),
            Spell('Decelerate', 2, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<decelerated> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Mental Lag', 3, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<immobilized> and \\glossterm<dazed> as a single \\glossterm<condition>.
            """, tags=[]),
            Spell('Haste', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<base speed>, up to a maximum of double its \\glossterm<base speed>.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Haste', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                This spell functions like the \\textit<haste> spell, except that the speed bonus increases to +20 feet.
            """, tags=['Attune (target)']),
            Spell('Supreme Haste', 5, 'Yourself or an \\glossterm<ally> with in \\rngmed range', """
                This spell functions like the \\textit<haste> spell, except that the speed bonus increases to +30 feet.
            """, tags=['Attune (target)']),
            Spell('Temporal Duplicate', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                You reach into a possible future and create a duplicate of the target.
                The duplicate is identical in all ways to the target when the spell resolves.
                The target and its duplicate can act during the next round.
                At the end of that round, the target and its duplicate cease to exist.
                At the end of the following round, the target reappears in the place where it ceased to exist.
                If that space is occupied, it appears in the closest unoccupied space.

                When the target reappears, its condition is unchanged from when it left, except that it loses \\glossterm<action points> equal to the amount used by its duplicate.
                Its \\glossterm<hit points>, conditions, and all other statistics are unaffected, regardless of any damage or other negative effects suffered by the duplicate.
                If this would reduce any of the target's resources below 0, it takes \\glossterm<standard damage> +4d from the paradox and becomes \\glossterm<stunned> as a \\glossterm<condition>.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=[]),
            Spell('Greater Temporal Duplicate', 7, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                This spell functions like the \\spell<temporal duplicate> spell, except that you can reach up to five minutes into the future to summon the duplicate.
                When you cast the spell, you choose the length of time before the target disappears.
                The duplicate still only exists for a single round.
            """, tags=[]),
            Spell('Time Hop', 2, 'One Medium or smaller \\glossterm<ally> or unattended object within \\rngmed range', """
                You send the target into the future, causing it to temporarily cease to exist.
                When you cast this spell, you choose how many rounds the target ceases to exist for, up to a maximum of five rounds.
                At the end of the last round, it reappears in the same location where it disappeared.

                The area the target occupied can be physically crossed, but it is treated as an invalid destination for teleportation and other similar magic.
                When the target reappears, all of its surroundings are adjusted as if the object had retroactively always existed in its space.
                For example, if the location is occupied by a creature that walked into the area, the creature is relocated to the closest unoccupied space along the path it took to reach the target.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=[]),
            Spell('Temporal Stasis', 3, 'One Medium or smaller \\glossterm<ally> within \\rngmed range', """
                The target is placed into stasis, rendering it unconscious.
                While in stasis, it cannot take any actions and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.

                % TODO: wording
                This effect normally lasts as long as you \\glossterm<attune> to it, and until the end of the round when you release the attunement.
                If you use this ability on yourself, it instead lasts for a number of rounds you choose when you cast the spell, up to a maximum of five rounds.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (self)']),
            Spell('Delay Damage', 3, 'Yourself', """
                When you take damage, half of the damage (rounded down) is not dealt to you immediately.
                This damage is tracked separately.
                When the ends, you take all of the delayed damage at once.
                This damage has no type, and ignores all effects that reduce or negate damage.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Sustain (minor)']),
            Spell('Time Lock', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                You lock the state of the target's body in time.
                Note the target's \\glossterm<hit points>, \\glossterm<exhaustion>, \\glossterm<vital wounds> (including \\glossterm<wound roll> results), and active conditions.
                If the target dies, this effect ends immediately.

                As a \\glossterm<standard action>, you can reach through time to restore the target's state.
                If you do, the target's \\glossterm<hit points>, \\glossterm<exhaustion>, \\glossterm<vital wounds>, and active conditions become identical to what they were when you cast this spell.
                This does not affect any other properties of the target, such as any resources expended.
                After you restore the target's state in this way, the spell ends.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Sustain (minor)']),
            Spell('Greater Time Lock', 7, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                This spell functions like the \\spell<time lock> spell, except that the effect is not ended if the target dies, and restoring the target's state can also restore it to life.
                If the target is restored to life in this way, all of its properties not locked by this spell, such as any resources expended, are identical to what they were when the target died.
                In addition, this spell has the \\glossterm<Attune> (self) tag instead of the \\glossterm<Sustain> (minor) tag.
            """, tags=['Attune (self)']),
            Spell('Time Stop', 7, 'Yourself', """
                You can take two full rounds of actions immediately.
                During this time, all other creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
                You can still affect yourself and create areas or new effects.

                You are still vulnerable to danger, such as from heat or dangerous gases.
                However, you cannot be detected by any means while you travel.

                After casting this spell, you cannot cast it again until you take a \\glossterm<short rest>.
            """, tags=[]),
        ],
        rituals=[
            Spell('Gentle Repose', 2, 'One unattended, nonmagical object within \\rngclose range', """
                Time does not pass for the target, preventing it from decaying or spoiling.
                This can extend the time a poison or similar item lasts before becoming inert.
                % What effects have an explicit time limit?
                If used on a corpse, this effectively extends the time limit for effects that require a fresh or intact body.
                Additionally, this can make transporting a fallen comrade more pleasant.

                % Does this need to explicitly clarify that it doesn't stop time from passing for the creature's soul?

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
        ],
        category='debuff, combat',
    ))

    # This spell seems problematic
    # Primary: debuff
    # None: damage, utility, buff
    mystic_spheres.append(MysticSphere(
        name="Compel",
        short_description="Bend creatures to your will by controlling their actions",
        cantrips=[
        ],
        schools=['Enchantment'],
        lists=['Arcane', 'Divine', 'Pact'],
        spells=[
            Spell('Dance', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit As a \\glossterm<condition>, the target is compelled to dance.
                It can spend a \\glossterm<move action> to dance, if it is physically capable of dancing.
                At the end of each round, if the target did not dance during that round, it takes a -2 penalty to \\glossterm<accuracy> and Mental defense as the compulsion intensifies.
                This penalty stacks each round until the target dances, which resets the penalties to 0.
                \\crit As above, except that the target must dance as a \\glossterm<standard action> to reset the penalties, instead of as a move action.
            """, tags=['Compulsion']),
            Spell('Collapse', 1, '\\glossterm<Enemies> in a \\areamed radius from you', """
                Make an attack vs. Mental against each target.
                \\hit Each target falls \\glossterm<prone>.
                \\crit As above, and as a \\glossterm<condition>, each target is unable to stand up.
                If a target is somehow brought into a standing position, it will immediately fall and become prone again.
            """, tags=['Compulsion']),
            Spell('Stay', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target falls \\glossterm<prone> immediately. In addition, it is \\glossterm<slowed> as a \\glossterm<condition>.
                \\crit The target falls prone immediately. In addition, it is \\glossterm<decelerated> as a \\glossterm<condition>.
            """, tags=['Compulsion']),
            Spell('Confusion', 3, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\confused as a \\glossterm<condition>.
            """, tags=['Compulsion']),
            Spell('Sleep', 3, 'One creature within \\rngclose range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\blinded as a \\glossterm<condition>.
                \\crit The target falls asleep.
                It cannot be awakened by any means while the spell lasts.
                After that time, it can wake up normally, though it continues to sleep until it would wake up naturally.
                % Awkward to sustain without the Sustain tag
                This effect lasts as long as you \\glossterm<sustain> it as a \\glossterm<minor action>.
                However, it is a \\glossterm<condition>, and can be removed by effects which remove conditions.
            """, tags=['Compulsion']),
            Spell('Discordant Song', 5, '\\glossterm<Enemies> in a \\areamed radius from you', """
                Make an attack vs. Mental against each target.
                \\hit Each target is \\disoriented as a \\glossterm<condition>.
            """, tags=['Compulsion']),
            Spell('Irresistible Dance', 6, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<dance> spell, except that you gain a +4 bonus to accuracy on the attack.
            """, tags=['Compulsion']),
            Spell('Dominate', 4, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<confused> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<stunned> as a \\glossterm<condition>.
                As a standard action, you can make an additional attack vs. Mental against the target as long as it remains stunned in this way and is within \\rngmed range of you.
                On a hit, the target becomes stunned in the same way as an additional condition, continuing the effect even if the target removed the original condition in the same phase.
                On a critical hit, the target becomes \\glossterm<dominated> by you as long as you \\glossterm<attune> to this ability.
            """, tags=['Compulsion']),
        ],
        category='debuff, combat',
    ))

    # Primary: debuff
    # Secondary: damage
    # None: buff, utility
    mystic_spheres.append(MysticSphere(
        name="Corruption",
        short_description="Weaken the life force of foes, reducing their combat prowess",
        cantrips=[],
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine', 'Nature', 'Pact'],
        spells=[
            Spell('Sickening Decay', 1, 'One living creature within \\rngclose range', """
                Make an attack vs. Fortitude against the target.
                \\hit As a \\glossterm<condition>, the target is \\glossterm<sickened>.
                At the end of each \\glossterm<phase>, it takes \\glossterm<standard damage> -3d if it took a \\glossterm<standard action> during that phase.
                It can only take damage in this way once per round.
            """, tags=[]),
            Spell('Corruption of Blood and Bone', 3, 'One living creature within \\rngclose range', """
                This spell functions like the \\spell<sickening decay> spell, except that the damage increases to \\glossterm<standard damage> -1d.
                In addition, damage from the spell reduces the target's maximum hit points by the same amount.
                This hit point reduction is part of the same \\glossterm<condition> as the spell's other effects.
                When the condition is removed, the target's maximum hit points are restored.
            """, tags=[]),
            Spell('Curse of Decay', 4, 'One living creature within \\rngclose range', """
                This spell functions like the \\spell<sickening decay> spell, except that the attack is made against Mental defense instead of Fortitude defense.
                In addition, if the attack critically hits, the spell's effect becomes a permanent curse.
                It is no longer a \\glossterm<condition>, and cannot be removed by abilities that remove conditions.
                It can be removed by abilities that can remove curses.
            """, tags=['Curse']),
            Spell('Miasma', 2, '\\glossterm<Enemies> within an \\areamed radius from you', """
                Make an attack vs. Fortitude against living each target.
                \\hit Each target is \\glossterm<sickened> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Pernicious Sickness', 2, 'One living creature within \\rngclose range', """
                Make an attack vs. Fortitude with a +2 bonus to \\glossterm<accuracy> against the target.
                \\hit The target is \\glossterm<sickened> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Greater Pernicious Sickness', 5, 'One living creature within \\rngclose range', """
                This spell functions like the \\spell<pernicious sickness> spell, except that the accuracy bonus is increased to +4.
            """, tags=[]),
            Spell('Greater Miasma', 5, '\\glossterm<Enemies> within an \\areamed radius from you', """
                Make an attack vs. Fortitude against living each target.
                \\hit Each target is \\glossterm<nauseated> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Eyebite', 3, 'One living creature within \\rngclose range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Bleed', 4, 'One living creature within \\rngclose range', """
                This spell functions like the \\spell<sickening decay> spell, except that a struck target also begins bleeding as an additional \\glossterm<condition>.
                At the end of every \\glossterm<action phase> in subsequent rounds, the target takes \\glossterm<standard damage> -3d.
            """, tags=[]),
            Spell('Crippling Decay', 5, 'One living creature within \\rngclose range', """
                This spell functions like the \\spell<sickening decay> spell, except that a struck target is also \\glossterm<immobilized> as an additional \\glossterm<condition>.
            """, tags=[]),
        ],
        rituals=[
            Spell('Animate Dead', 2, 'Any number of corpses within \\rngclose range', """
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
    ))

    # Primary: damage
    # Secondary: debuff
    # Tertiary: buff
    # None: utility
    mystic_spheres.append(MysticSphere(
        name='Cryomancy',
        short_description='Drain heat to injure and freeze foes',
        cantrips=[
        ],
        schools=['Evocation'],
        lists=['Arcane', 'Nature', 'Pact'],
        spells=[
            Spell('Cone of Cold', 1, 'Everything in a \\areamed cone from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes cold \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Greater Cone of Cold', 3, 'Everything in a \\areamed cone from you', """
                This spell functions like the \\spell<cone of cold> spell, except it affects everything in a \\arealarge cone from you.
            """, tags=[]),
            Spell('Supreme Cone of Cold', 5, 'Everything in a \\areamed cone from you', """
                This spell functions like the \\spell<cone of cold> spell, except it affects everything in a \\areahuge cone from you.
            """, tags=[]),
            Spell('Frostbite', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes cold \\glossterm<standard damage> -2d and is \\glossterm<slowed> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Greater Frostbite', 5, 'One creature or object within \\rngmed range', """
                This spell functions like the \\spell<frostbite> spell, except that the target is \\glossterm<decelerated> instead of \\glossterm<slowed>.
            """, tags=[]),
            Spell('Cold Snap', 2, 'Everything in a \\areamed cone from you (see text)', """
                This spell functions like the \\spell<cone of cold> spell, except that it gains the \\glossterm<Sustain> (standard) tag.
                The area affected by the spell becomes a \\glossterm<zone> that is supernaturally cold.
                At the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """, tags=[]),
            Spell('Greater Cold Snap', 3, 'Everything in a \\areamed cone from you (see text)', f"""
                This spell functions like the \\spell<cold snap> spell, except that the spell gains the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Sustain> (standard) tag.
            """, tags=[]),
            Spell('Freezing Cone', 4, 'Everything in a \\areamed cone from you', """
                This spell functions like the \\spell<cone of cold> spell, except that each struck target is also \\glossterm<slowed> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Blizzard', 2, '\\glossterm<Enemies> and objects in a \\areasmall radius within \\rngclose range', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes cold \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Greater Blizzard', 5, '\\glossterm<Enemies> and objects in a \\areamed radius within \\rngmed range', """
                This spell functions like the \\spell<blizzard> spell, except that it affects more targets.
            """, tags=[]),
            Spell('Deep Freeze', 3, 'Everything in a \\areamed cone from you', """
                This spell functions like the \\spell<cone of cold> spell, except that it attacks Reflex defense instead of Fortitude defense.
                In addition, it only affects creatures of Large size or smaller.
            """, tags=[]),
            Spell('Icecraft', 1, 'One pool of unattended, nonmagical water within \\rngclose range.', """
                This spell creates an icy weapon or a suit of icy armor from the target pool of water.
                You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made entirely from metal, except for heavy body armor.
                The pool of water targeted must be at least as large as the item you create.

                The item functions like a normal item of its type, except that it is more fragile.
                Its \\glossterm<wound threshold> is equal to twice your \\glossterm<power>, it does not have any \\glossterm<hardness>, and it is \\glossterm<vulnerable> to fire damage.
                If the item would take cold damage, it instead regains a \\glossterm<hit point>.

                When a creature wearing armor created in this way takes physical damage, cold damage, or fire damage, that damage is also dealt to the armor.
                Likewise, when a creature wielding a weapon created in this way deals damage with the weapon, that damage is also dealt to the weapon.
                If the item becomes \\glossterm<broken>, this effect is \\glossterm<dismissed>.
            """, tags=['Attune (self)']),
            Spell('Sturdy Icecraft', 2, 'One pool of unattended, nonmagical water within \\rngclose range.', """
                This spell functions like the \\spell<icecraft> spell, except that the item created has hit points equal to four times your \\glossterm<power>.
                In addition, you can create heavy body armor.
            """, tags=['Attune (self)']),
            Spell('Enhanced Icecraft', 4, 'One pool of unattended, nonmagical water within \\rngclose range.', """
                This spell functions like the \\spell<sturdy icecraft> spell, except that the item created is magically enhanced.
                A weapon gains a +1d \\glossterm<magic bonus> to damage with \\glossterm<strikes>, and armor grants a +1 \\glossterm<magic bonus> to the defenses it improves.
            """, tags=['Attune (self)']),
        ],
        category='damage',
    ))

    # Primary: debuff
    # Secondary: damage
    # Tertiary: utility
    # None: buff
    mystic_spheres.append(MysticSphere(
        name="Delusion",
        short_description="Instill false emotions to influence creatures",
        cantrips=[
            Effects('Cheer', 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target's mood improves and it feels more cheerful.
            """, tags=['Emotion', 'Sustain (free)']),
        ],
        schools=['Enchantment'],
        lists=['Arcane', 'Divine', 'Pact'],
        spells=[
            Spell('Terror', 1, 'One creature within \\rngclose range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\frightened by you as a \\glossterm<condition>.
            """, tags=['Emotion']),
            Spell('Greater Terror', 5, 'One creature within \\rngclose range', """
                This spell functions like the \\spell<terror> spell, except that the target is \\glossterm<panicked> instead of \\glossterm<frightened>.
            """, tags=['Emotion']),
            Spell('Fearsome Aura', 2, 'All \\glossterm<enemies> in the area (see text)', """
                You radiate an aura of fear in a \\areamed radius \\glossterm<emanation> from you.
                When you attune to this spell, and at the end of each \\glossterm<action phase> in subsequent rounds, make an attack vs. Mental against each target.
                \\hit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.
            """, tags=['Attune (self)', 'Emotion']),
            Spell('Greater Fearsome Aura', 4, 'All creatures within a \\areamed radius \\glossterm<emanation> from you', """
                This spell functions like the \\spell<fearsome aura> spell, except that a struck target is \\glossterm<frightened> instead of \\glossterm<shaken>.
            """, tags=['Attune (self)', 'Emotion']),
            Spell('Supreme Fearsome Aura', 6, 'All creatures within a \\arealarge radius \\glossterm<emanation> from you', """
                This spell functions like the \\spell<greater fearsome aura> spell, except that it affects more targets.
            """, tags=['Attune (self)', 'Emotion']),
            # Math: at 1st level, power is probably ~2, so standard damage is probably 2d6.
            # Casting this spell and then two standard damage spells deals 4d6+2d8 = 23 damage
            # casting three standard damage spells deals 6d6 = 21 damage
            # So when fighting alone, this takes 3 rounds of effectiveness to be equal
            # in power to a simple damage spell.

            # At 20th level, power is ~22, so standard damage is 9d10
            # Casting this spell and then two standard damage spells deals 18d10+7d10=25d10
            # Casting three standard damage spells deals 27d10
            Spell('Agony', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is inflicted with agonizing pain as a \\glossterm<condition>.
                It takes a -2 penalty to Mental defense.
                % Does this need to clarify that it takes effect in the round the spell was cast?
                In addition, at the end of each \\glossterm<delayed action phase>, if the target took damage that round, it takes \\glossterm<standard damage> -1d.
                This damage is of all damage types that the target was damaged by during that round.
            """, tags=['Emotion']),
            Spell('Redirected Terror', 2, 'One creature within \\rngclose range', """
                This spell functions like the \\spell<terror> spell, except that you also choose an \\glossterm<ally> within the spell's range.
                The target is afraid of the chosen ally instead of being afraid of you.
            """, tags=['Emotion']),
            Spell('Charm', 2, 'One creature within \\rnglong range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\charmed by you.
                Any act by you or by creatures that appear to be your allies that threatens or damages the \\spell<charmed> person breaks the effect.
                This effect is automatically \\glossterm<dismissed> after one hour.
                \\crit As above, except that the effect is not automatically dismissed after one hour.
            """, tags=['Attune (self)', 'Emotion', 'Subtle']),
            Spell('Amnesiac Charm', 5, 'One creature within \\rnglong range', """
                This spell functions like the \\spell<charm> spell, except that when the spell ends, an affected target forgets all events that transpired during the spell's duration.
                It becomes aware of its surroundings as if waking up from a daydream.
                The target is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.
            """, tags=['Attune (self)', 'Emotion', 'Subtle']),
            Spell('Calm Emotions', 3, 'All creatures within a \\arealarge radius from you', """
                Make an attack vs. Mental against each target.
                \\hit Each target has its emotions calmed.
                The effects of all other \\glossterm<Emotion> abilities on that target are \\glossterm<suppressed>.
                It cannot take violent actions (although it can defend itself) or do anything destructive.
                If the target takes damage or feels that it is in danger, this effect is \\glossterm<dismissed>.
            """, tags=['Emotion', 'Sustain (standard)']),
            Spell('Enrage', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
                \\hit As a \\glossterm<condition>, the target is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
                For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon a creature.
            """, tags=['Emotion']),
            Spell('Mass Enrage', 5, 'All \\glossterm<enemies> in a \\areamed radius within \\rngmed range', """
                This spell functions like the \\spell<enrage> spell, except that it affects multiple enemies.
            """, tags=['Emotion']),
            Spell('Inevitable Doom', 4, 'One creature within \\rngclose range', """
                This spell functions like the \\spell<terror> spell, except that you gain a +2 bonus to \\glossterm<accuracy>.
            """, tags=['Emotion']),
        ],
        category='debuff, combat',
    ))

    # Primary: damage
    # Secondary: debuff
    # Tertiary: buff
    # None: utility
    mystic_spheres.append(MysticSphere(
        name="Electromancy",
        short_description='Create electricity to injure and stun foes',
        cantrips=[],
        schools=['Evocation'],
        lists=['Arcane', 'Nature', 'Pact'],
        spells=[
            Spell('Lightning Bolt', 1, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes electricity \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Greater Lightning Bolt', 3, 'Everything in a \\arealarge, 15 ft.\\ wide line from you', """
                This spell functions like the \\spell<lightning bolt> spell, except that it affects more targets.
            """, tags=[]),
            # A little weird that "Shocking" Grasp doesn't daze
            Spell('Shocking Grasp', 1, 'One creature or object you \\glossterm<threaten>', """
                Make an attack vs. Fortitude against the target.
                You gain a +4 bonus to \\glossterm<concentration> checks to cast this spell.
                \\hit The target takes electricity \\glossterm<standard damage> +1d.
            """, tags=[]),
            Spell('Discharge', 2, '\\glossterm<Enemies> and objects in a \\areamed radius from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes electricity \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Magnetic Bolt', 3, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
                This spell functions like the \\spell<lightning bolt> spell, except that you gain a +2 bonus to accuracy against targets wearing metal armor or otherwise carrying or composed of a significant amount of metal.
            """, tags=[]),
            Spell('Magnetic Blade', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                Metal weapons wielded by the target gain a +2 \\glossterm<magic bonus> to \\glossterm<accuracy> against targets wearing metal armor or otherwise carrying or composed of a significant amount of metal.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Magnetic Blade', 6, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<magnetic blade> spell, except that the bonus is increased to +3.
            """, tags=['Attune (self)']),
            Spell('Dynamo', 2, 'Everything in a \\areamed, 10 ft.\\ wide line from you (see text)', """
                This spell functions like the \\spell<lightning bolt> spell, except that it gains the \\glossterm<Sustain> (standard) tag.
                The area affected by the spell becomes a \\glossterm<zone> that is continuously filled with electrical pulses.
                At the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """, tags=[]),
            Spell('Greater Dynamo', 3, 'Everything in a \\areamed, 10 ft.\\ wide line from you (see text)', f"""
                This spell functions like the \\spell<dynamo> spell, except that the spell gains the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Sustain> (standard) tag.
            """, tags=[]),
            Spell('Chain Lightning', 4, 'One creature or object within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes electricity \\glossterm<standard damage> +2d.
                In addition, make an additional attack vs. Fortitude against any number of creatures in a \\areasmall radius from the struck target.
                \\hit Each secondary target takes electricity \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Forked Lightning',3, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
                This spell functions like the \\spell<lightning bolt> spell, except that you gain a +1d bonus to damage.
                In addition, you create two separate line-shaped areas instead of one.
                The two areas can overlap, but targets in the overlapping area are only affected once.
            """, tags=[]),
            Spell('Shocking Bolt', 4, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
                This spell functions like the \\spell<lightning bolt> spell, except that each struck target is also \\glossterm<dazed> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Call Lightning', 2, 'Everything in a \\arealarge, 5 ft.\\ wide vertical line within \\rngmed range', """
                Make an attack vs. Fortitude against each target.
                If you are outdoors in cloudy or stormy weather, you gain a +2 bonus to \\glossterm<accuracy> with the attack.
                If this spell has its area increased, such as with the Widened \\glossterm<augment>, only the length of the line increases.
                \\hit Each target takes takes electricity \\glossterm<standard damage> +1d.
            """, tags=[]),
        ],
        category='damage',
    ))

    # To restrict the narrative scope of Fabrication, it should be able to
    # create any kind of object, but it can't manipulate objects in specific
    # ways after their creation.

    # Primary: damage
    # Secondary: utility
    # Tertiary: debuff
    # None: buff
    mystic_spheres.append(MysticSphere(
        name='Fabrication',
        short_description="Create objects to damage and impair foes",
        # TODO: Narrative implications of at-will acid are annoying
        cantrips=[
            Effects('Fabricate Trinket', 'Yourself', """
                You make a Craft check to create an object of Tiny size or smaller.
                The object appears in your hand or at your feet.
                It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.
            """, tags=['Attune (self)', 'Manifestation']),
        ],
        schools=['Conjuration'],
        lists=['Arcane', 'Pact'],
        spells=[
            Spell('Acid Orb', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes acid \\glossterm<standard damage> +1d.
            """, tags=['Manifestation']),
            Spell('Forge', 1, 'One unoccupied square within \\rngclose range', """
                Choose a type of weapon or shield that you are proficient with.
                You create a normal item of that type at the target location.

                The item cannot be constructed of any magical or extraordinary material.
                % This should allow the Giant augment; is this worded to allow that?
                It is sized appropriately for you, up to a maximum of a Medium size item.
            """, tags=['Attune (self)']),
            Spell('Greater Forge', 2, 'One unoccupied square within \\rngclose range', """
                This spell functions like the \\spell<forge> spell, except that you can also create any type of body armor you are proficient with.
                If you create body armor, you can create it already equipped to an \\glossterm<ally> within range.
            """, tags=['Attune (self)']),
            Spell('Corrosive Orb', 3, 'One creature or object within \\rngmed range', """
                This spell functions like the \\spell<acid orb> spell, except that the damage increases to \\glossterm<standard damage> +2d and it deals double damage to objects.
            """, tags=['Manifestation']),
            Spell('Meteor', 3, 'Special', """
                You create a meteor in midair within \\rngmed range that falls to the ground, crushing foes in its path.
                The meteor takes up a \\areasmall radius, and must be created in unoccupied space.
                After being summoned, it falls up to 100 feet before disappearing.
                Make an attack vs. Armor against everything in its path.
                \\hit Each target takes bludgeoning and fire \\glossterm<standard damage>.
            """, tags=['Manifestation']),
            Spell('Meteor Storm', 6, 'Special', f"""
                This spell functions like the \\spell<meteor> spell, except that you can create up to five different meteors within \\rnglong range.
                The areas affected by two different meteors cannot overlap.
                If one of the meteors is created in an invalid area, that meteor is not created, but the others are created and dealt their damage normally.
            """, tags=['Manifestation']),
            Spell('Lingering Acid Orb', 3, 'One creature or object within \\rngmed range', f"""
                This spell functions like the \\spell<acid orb> spell, except that the acid lingers on a struck target.
                At the end of each \\glossterm<action phase> in subsequent rounds, the target takes physical \\glossterm<standard damage> -1d.
                This is a \\glossterm<condition>, and lasts until removed.
            """, tags=['Manifestation']),
            Spell('Web', 2, 'All Large or smaller creatures in the area (see text)', """
                You fill a \\areasmall radius \\glossterm<zone> within \\rngclose range with webs.
                The webs make the area \\glossterm<difficult terrain>.
                Each 5-ft.\\ square of webbing has a \\glossterm<wound threshold> equal to your \\glossterm<power>, and is \\glossterm<vulnerable> to fire.

                In addition, make an attack vs. Reflex against each target.
                \\hit Each secondary target is \\glossterm<immobilized> as long as it has webbing from this ability in its space.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Reinforced Webbing', 3, 'All Large or smaller creatures in the area (see text)', f"""
                This spell functions like the \\spell<web> spell, except that each 5-ft.\\ square of webbing gains additional hit points equal to your \\glossterm<power>.
                In addition, the webs are no longer \\glossterm<vulnerable> to fire damage.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Poison', 2, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.

                \\hit The target takes \\glossterm<standard damage> -1d and is poisoned as a \\glossterm<condition>.
                If the target is poisoned, repeat this attack at the end of each \\glossterm<action phase> after the first round.
                On the second hit, the target takes \\glossterm<standard damage> -1d and becomes \\glossterm<sickened>.
                On the third hit, the target takes \\glossterm<standard damage> +2d and becomes \\glossterm<nauseated> instead of sickened.
                After the third hit, no further attacks are made, but the target remains nauseated until the condition is removed.
            """, tags=['Manifestation']),
        ],
        rituals=[
            Spell('Manifest Object', 2, 'One unoccupied square within \\rngclose range', """
                Make a Craft check to create an object of Small size or smaller.
                The object appears out of thin air in the target location.
                % TODO: add ability to create objects of other sizes/materials
                It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.

                This ritual takes one hour to perform.
            """, tags=['Attune (ritual)', 'Manifestation']),
            Spell('Create Sustenance', 2, 'One unoccupied squre within \\rngclose range', """
                This ritual creates food and drink in that square that is sufficient to sustain two Medium creatures per \\glossterm<power> for 24 hours.
                The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.

                This ritual takes one hour to perform.
            """, tags=['AP', 'Creation']),
        ],
        category='damage',
    ))

    # Primary: buff
    # Secondary: utility
    # None: damage, debuff
    mystic_spheres.append(MysticSphere(
        name="Glamer",
        short_description="Change how creatures and objects are perceived",
        cantrips=[
            Effects('Assist Disguise', 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                % TODO: wording?
                If the target is disguised as another creature, it gains a +2 \\glossterm<magic bonus> to the result of the disguise.
            """, tags=['Attune (self)', 'Sensation', 'Visual']),
        ],
        schools=['Illusion'],
        lists=['Arcane'],
        spells=[
            Spell('Blur', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                The target's physical outline is distorted so it appears blurred, shifting, and wavering.
                It gains a +1 \\glossterm<magic bonus> to Armor defense and Stealth (see \\pcref<Stealth>).
                This effect provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)', 'Sensation', 'Visual']),
            Spell('Hidden Blade', 1, 'One \\glossterm<ally> within \\rngclose range', """
                You can only cast this spell during the \\glossterm<action phase>.

                The target's weapons become invisible, and its hands are blurred.
                On the next melee \\glossterm<strike> the target makes,
                    the attack roll automatically \\glossterm<explodes>,
                    as if the target was \\glossterm<unaware> of the attack.
                This effect ends at the end of the current round if the target has not made a strike by that time.
                % TODO: wording
                The target is not actually \\glossterm<unaware> of the attack, and this does not work with abilities that have effects if the target is unaware of attacks.

                This effect provides no offensive benefit against creatures immune to \\glossterm<Visual> abilities.
            """, tags=['Sensation', 'Visual']),
            Spell('Suppress Light', 1, 'One Small or smaller unattended object within \\rngclose range', """
                This spell suppresses light in a \\areamed radius \\glossterm<emanation> from the target.
                Light within or passing through the area is dimmed to be no brighter than shadowy illumination.
                Any object or effect which blocks light also blocks this spell's \\glossterm<emanation>.
            """, tags=['Attune (self)', 'Sensation']),
            Spell('Disguise Image', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                You gain a +5 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
                However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.
            """, tags=['Attune (target)', 'Sensation', 'Visual']),
            Spell('Mirror Image', 2, 'Yourself', """
                Four illusory duplicates appear around you that mirror your every move.
                The duplicates shift chaotically in your space, making it difficult to identify your real location.

                All \\glossterm<targeted> \\glossterm<physical attacks> against you have a 50\\% miss chance.
                When an attack misses in this way, it affects an image, destroying it.
                This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
            """, tags=['Attune (self)', 'Sensation', 'Visual']),
            Spell('Greater Mirror Image', 4, 'Yourself', """
                This spell functions like the \\spell<mirror image> spell, except that destroyed images can reappear.
                At the end of each \\glossterm<action phase>, one destroyed image reappears, to a maximum of four images.
            """, tags=['Attune (self)', 'Sensation', 'Visual']),
            Spell('Shadow Mantle', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                This spell functions like the \\spell<blur> spell, except that the spell's deceptive nature extends beyond altering light to affect the nature of reality itself.
                The defense bonus it provides applies to all defenses.
                In addition, the spell loses the \\glossterm<Visual> tag, and can protect against attacks from creatures immune to Visual abilities.
            """, tags=['Attune (target)', 'Sensation', 'Visual']),
            Spell('Displacement', 6, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                The target's image appears to be two to three feet from its real location.
                \\glossterm<Targeted> \\glossterm<physical attacks> against the target suffer a 50\\% miss chance.
                This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
            """, tags=['Attune (target)', 'Sensation', 'Visual']),
        ],
        rituals=[
            Spell('Magic Mouth', 1, 'One large or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                Choose a triggering condition and a message of twenty-five words or less.
                The condition must be something that a typical human in the target's place could detect.

                When the triggering condition occurs, the target appears to grow a magically animated mouth.
                The mouth speaks the chosen message aloud.
                After the message is spoken, this effect is \\glossterm<dismissed>.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)', 'Sensation']),
        ],
        category='buff, defense',
    ))

    # Primary: damage
    # Secondary: buff
    # Tertiary: utility
    # None: debuff
    mystic_spheres.append(MysticSphere(
        name="Polymorph",
        short_description="Change the physical forms of objects and creatures",
        cantrips=[
            Effects('Alter Object', 'Unattended, nonmagical object you can touch', """
                You make a Craft check to alter the target (see \\pcref<Craft>), except that you do not need any special tools to make the check (such as an anvil and furnace).
                The maximum hardness of a material you can affect with this ability is equal to your \\glossterm<power>.

                % too short?
                Each time you use this ability, you can accomplish work that would take up to five minutes with a normal Craft check.
            """, tags=[]),
        ],
        schools=['Transmutation'],
        lists=['Arcane', 'Nature', 'Pact'],
        spells=[
            Spell('Baleful Polymorph', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Greater Baleful Polymorph', 4, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<baleful polymorph> spell, except that a struck target is \\glossterm<sickened> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Supreme Baleful Polymorph', 6, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<baleful polymorph> spell, except that a struck target is \\glossterm<nauseated> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Shrink', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target's size decreases by one size category, to a minimum of Tiny.
                This decreases its \\glossterm<overwhelm value> and \\glossterm<overwhelm resistance>, and usually decreases its \\glossterm<reach> (see \\pcref<Size in Combat>).
                However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Shrink', 5, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<shrink> spell, except that the target's size decreases by two size categories, to a minimum of Diminuitive.
            """, tags=['Attune (target)']),
            Spell('Spider Climb', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a \\glossterm<climb speed> equal to its \\glossterm<base speed>.
                It also gains a +4 \\glossterm<magic bonus> to Climb checks.
                This bonus is increased to +8 when you climb on ceilings and similar surfaces.
            """, tags=['Attune (target)']),
            Spell('Barkskin', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical damage> (minimum 1).
                In addition, it is \\glossterm<vulnerable> to fire damage.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Barkskin', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<barkskin> spell, except that the bonus is equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Supreme Barkskin', 7, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<barkskin> spell, except that stuff the bonus is equal to twice your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Regeneration', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                A the end of each round, the target heals hit points equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Greater Regeneration', 7, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<regeneration> spell, except that the healing is equal to twice your \\glossterm<power>.
            """, tags=['Attune (target)']),
            # Should this also/instead be under Terramancy?
            Spell('Stoneskin', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a \\glossterm<magic bonus> equal to your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical damage>.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Stoneskin', 5, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<stoneskin> spell, except that the bonus is equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Enlarge', 3, 'One large or smaller \\glossterm<ally> within \\rngclose range', """
                The target's size increases by one size category.
                This increases its \\glossterm<overwhelm value>, \\glossterm<overwhelm resistance>, and usually increases its \\glossterm<reach> (see \\pcref<Size in Combat>).
                However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Enlarge, Greater', 5, 'One large or smaller \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<enlarge> spell, except that the target also gains a +2 \\glossterm<magic bonus> to Strength.
            """, tags=['Attune (target)']),
            Spell('Enlarge, Supreme', 7, 'One large or smaller \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<enlarge> spell, except that the target's size is increased by two size categories.
                It gains a +2 \\glossterm<magic bonus> to Strength to partially match its new size.
            """, tags=['Attune (target)']),
            Spell('Alter Appearance', 2, 'One large or smaller \\glossterm<ally> within \\rngclose range', """
                You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                You gain a +5 bonus on the check, and you ignore penalties for changing the target's gender, species, subtype, or age.
                However, this effect is unable to alter the target's clothes or equipment in any way.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Craft Object', 3, 'Any number of unattended, nonmagical objects within \\rngclose range', """
                You make a Craft check to transform the targets into a new item (or items) made of the same materials.
                You require none of the tools or time expenditure that would normally be necessary.
                The total size of all targets combined must be Large size or smaller.

                You can apply the Giant \\glossterm<augment> to this spell.
                If you do, it increases the maximum size of all targets combined.
            """, tags=[]),
            Spell('Disintegrate', 5, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes \\glossterm<standard damage> +2d.
                In addition, if the target has no hit points remaining, it dies.
                Its body is completely disintegrated, leaving behind only a pinch of fine dust.
                Its equipment is unaffected.
            """, tags=[]),
        ],
        rituals=[
            # Should this also be a spell? Incredibly niche, but golem makers
            # would want it...
            Spell('Mending', 1, 'One \\glossterm<unattended> object within \\rngclose range', """
                The target is healed for hit points equal to \\glossterm<standard damage> +2d.

                This ritual takes one minute to perform.
            """, tags=['AP']),
            Spell('Fortify', 1, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
                Unlike most abilities, this ritual can affect individual parts of a whole object.

                % How should this affect Strength break DRs?
                The target gains a +5 \\glossterm<magic bonus> to \\glossterm<hardness>.
                If the target is moved, this effect ends.
                Otherwise, it lasts for one year.

                This ritual takes one hour to perform.
            """, tags=['Attune (ritual)']),
            Spell('Enduring Fortify', 3, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
                This ritual functions like the \\spell<fortify> ritual, except that the effect lasts for one hundred years.
            """, tags=['AP']),
            Spell('Enduring Greater Fortify', 5,'Greater Fortify', """
                This ritual functions like the \\spell<greater fortify> ritual, except that the effect lasts for one hundred years.
            """, tags=['AP']),
            Spell('Greater Fortify', 3, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
                This ritual functions like the \\spell<fortify> ritual, except that the \\glossterm<hardness> bonus increases to 10.
            """, tags=['Attune (ritual)']),
            Spell('Supreme Fortify', 6, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
                This ritual functions like the \\spell<fortify> ritual, except that the \\glossterm<hardness> bonus increases to 15.
            """, tags=['Attune (ritual)']),
            Spell('Awaken', 5, 'One large or smaller \\glossterm<ally> within \\rngclose range', """
                The target becomes sentient.
                Its Intelligence becomes 1d6 - 5.
                Its type changes from animal to magical beast.
                It gains the ability to speak and understand one language that you know of your choice.
                Its maximum age increases to that of a human (rolled secretly).
                This effect is permanent.

                This ritual takes 24 hours to perform, and requires 50 action points from its participants.
                It can only be learned with the nature \\glossterm<magic source>.
            """, tags=['AP', ]),
            Spell('Ironwood', 3, 'One Small or smaller unattended, nonmagical wooden object within \\rngclose range', """
                The target is transformed into ironwood.
                While remaining natural wood in almost every way, ironwood is as strong, heavy, and resistant to fire as iron.
                Metallic armor and weapons, such as full plate, can be crafted from ironwood.

                % Should this have an action point cost? May be too rare...
                This ritual takes 24 hours to perform.
            """, tags=['AP']),
            Spell('Purify Sustenance', 1, 'All food and water in a single square within \\rngclose range', """
                The targets are purified.
                Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
                This does not prevent subsequent natural decay or spoiling.

                This ritual takes one hour to perform.
            """, tags=['AP']),
        ],
        category='damage',
    ))

    # Too narrow?
    # Primary: debuff
    # Secondary: utility
    # None: buff, damage
    mystic_spheres.append(MysticSphere(
        name="Photomancy",
        short_description="Create bright light to blind foes and illuminate your surroundings",
        cantrips=[
            Effects('Illuminate', 'One location within \\rngmed range', """
                A glowing light appears in midair in the target location.
                It casts bright light in a 20 foot radius and dim light in a 40 foot radius.
                This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
            """, tags=['Sensation', 'Visual']),
        ],
        schools=['Illusion'],
        lists=['Arcane', 'Divine', 'Nature', 'Pact'],
        spells=[
            Spell('Flare', 1, 'All creatures in the area (see text)', """
                A burst of light light fills a \\areasmall radius \\glossterm<zone> within \\rngmed range of you.
                Bright light illuminates a 100 foot radius around the area until the end of the next round.
                In addition, make an attack vs. Fortitude against each target creature.
                \\hit Each target is \\dazzled as a \\glossterm<condition>.
            """, tags=['Sensation', 'Visual']),
            Spell('Kaleidoscopic Pattern', 4, 'All creatures in the area (see text)', """
                This spell creates a brilliant, rapidly shifting rainbow of lights in a \\areasmall radius within \\rngmed range of you.
                They illuminate a 100 foot radius around the area with bright light until the end of the round.
                In addition, make an attack vs. Mental against each target creature.
                \\hit Each target is \\dazed as a \\glossterm<condition>.
                \\crit Each target is \\disoriented as a \\glossterm<condition>.
            """, tags=['Compulsion', 'Sensation', 'Visual']),
            Spell('Faerie Fire', 2, 'One \\areasmall radius within \\rngmed range of you, and all creatures in the area', """
                This spell functions like the \\spell<flare> spell, except that each struck target is surrounded with a pale glow made of hundreds of ephemeral points of light.
                This causes the struck target to radiate bright light in a 5 foot radius, as a candle.
                The lights impose a -10 penalty to the Stealth skill.
                In addition, they reveal the outline of the creatures if they become \\glossterm<invisible>.
                This allows observers to see their location, though not to see them perfectly.
                This effect is part of the same \\glossterm<condition> as the effect of the \\textit<flare>.
            """, tags=['Sensation', 'Visual']),
            Spell('Illuminating', 2, 'All creatures in the area (see text)', """
                This spell functions like the \\spell<flare> spell, except that it gains the \\glossterm<Sustain> (minor) tag.
                The area affected by the spell becomes an illuminated \\glossterm<zone>.
                At the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """, tags=['Sensation', 'Visual']),
            Spell('Flashbang', 3, 'One \\areasmall radius within \\rngmed range of you, and all creatures in the area', """
                This spell functions like the \\spell<flare> spell, except that an intense sound accompanies the flash of light caused by the spell.
                Each struck target is also \\glossterm<deafened> as part of the same \\glossterm<condition>.
                This spell gains the \\glossterm<Auditory> tag in addition to the tags from the \\spell<flare> spell.
            """, tags=['Sensation', 'Visual']),
            Spell('Blinding Flare', 6, 'One \\areasmall radius within \\rngmed range of you, and all creatures in the area', """
                This spell functions like the \\spell<flare> spell, except that each struck target is \\glossterm<blinded> instead of \\glossterm<dazzled>.
            """, tags=['Sensation', 'Visual']),
            Spell('Pillars of Light', 3, 'All creatures in the area (see text)', """
                This spell functions like the \\spell<flare> spell, except that the area increases to up to five different \\areasmall radius, 50 ft. tall cylinders within range.
                The areas can overlap, but targets in the overlapping area are only affected once.
            """, tags=['Sensation', 'Visual']),
            Spell('Solar Flare', 4, 'One \\areasmall radius within \\rngmed range of you, and all creatures in the area', """
                This spell functions like the \\spell<flare> spell, except that you gain a +2 bonus to \\glossterm<accuracy>.
                In addition, the light is treated as being natural sunlight for the purpose of abilities.
                This can allow it to destroy vampires and have similar effects.
            """, tags=['Sensation', 'Visual']),
            Spell('Greater Solar Flare', 7, 'One \\areasmall radius within \\rngmed range of you, and all creatures in the area', """
                This spell functions like the \\spell<solar flare> spell, except that the accuracy bonus is increased to +4.
            """, tags=['Sensation', 'Visual']),
        ],
        rituals=[
            Spell('Mobile Light', 1, 'One Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                The target glows like a torch, shedding bright light in a \\areamed radius (and dim light for an additional 20 feet).

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)', 'Sensation']),
            Spell('Permanent Light', 2, 'One Medium or smaller unattended object within \\rngclose range', """
                This ritual functions like the \\spell<mobile light> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
                In addition, it can only target objects.
                This ritual takes 24 hours to perform, and it requires 8 action points from its participants.
            """, tags=['AP', 'Sensation']),
        ],
        category='debuff, combat',
    ))

    # Primary: damage
    # Tertiary: buff, debuff
    # None: utility
    mystic_spheres.append(MysticSphere(
        name='Pyromancy',
        short_description="Create fire to incinerate foes",
        cantrips=[
            Effects('Kindle', 'Object within \\rngclose range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes fire damage equal to your \\glossterm<power>.
                If the target is highly flammable, such as a torch or campfire, it ignites.
            """, tags=[]),
            Effects('Personal Torch', 'Yourself', """
                You create a flame in your hand.
                You can create it at any intensity, up to a maximum heat equivalent to a burning torch.
                At it most intense, it sheds bright light in a 20 foot radius and dim light in an 40 foot radius.
                If you touch a creature or object with it, the target takes fire \\glossterm<standard damage> -2d.
                This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
            """, tags=[]),
        ],
        schools=['Evocation'],
        lists=['Arcane', 'Nature', 'Pact'],
        spells=[
            Spell('Fireball', 2, 'Everything in a \\areasmall radius within \\rngclose range', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes fire \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Greater Fireball', 5, 'Everything in a \\areamed radius within \\rngmed range', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes fire \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Firebolt', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes fire \\glossterm<standard damage> +1d.
            """, tags=[]),
            Spell('Burning Hands', 1, 'Everything in a \\areamed cone from you', f"""
                Make an attack vs. Armor against each target.
                \\hit Each target takes fire \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Blast Furnace', 3, 'Everything in a \\areasmall radius within \\rngclose range (see text)', f"""
                This spell functions like the \\spell<fireball> spell, except that it gains the \\glossterm<Sustain> (standard) tag.
                The area affected by the spell becomes a \\glossterm<zone> that is continuously engulfed in flames.
                At the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """, tags=[]),
            Spell('Greater Blast Furnace', 4, 'Everything in a \\areasmall radius within \\rngclose range (see text)', f"""
                This spell functions like the \\spell<blast furnace> spell, except that the spell gains the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Sustain> (standard) tag.
            """, tags=[]),
            Spell('Ignition', 1, 'One creature within \\rngmed range', f"""
                Make an attack vs. Fortitude against the target.
                \\hit The target is \\glossterm<ignited> as a \\glossterm<condition>.
                This condition can be removed if the target makes a \\glossterm<DR> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
                Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
                The flames can also be extinguished if the target is drenched in water, takes at least 5 cold damage, or other similar effects.
                \\crit As above, except that the condition cannot be removed by putting out the flames.
                In addition, the ignited effect deals fire \\glossterm<standard damage> -2d instead of the normal 1d6 fire damage each round.
            """, tags=[]),
            Spell('Heat Metal', 3, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<ignition> spell, except that you gain a +2 bonus to \\glossterm<accuracy> against a target wearing metal armor, wielding a metal weapon, or significantly composed of metal.
            """, tags=[]),
            Spell('Mass Ignition', 4, 'All creatures in a \\areasmall radius within \\rngmed range', """
                This spell functions like the \\spell<ignition> spell, except that it affects more targets.
            """, tags=[]),
            # Pyromancy specifically doesn't get "enemies only" self-radius
            # spells like most spheres do.
            Spell('Inferno', 3, 'Everything in a \\arealarge radius from you', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes fire \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Greater Inferno', 5, 'Everything in a \\areahuge radius from you', """
                This spell functions like the \\spell<inferno> spell, except that it affects more targets.
            """, tags=[]),
            Spell('Fearsome Fireball', 5, 'Everything in a \\areasmall radius within \\rngclose range', f"""
                This spell functions like the \\spell<fireball> spell, except that the attack result is also compared to each target's Mental defense.
                \\hit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.
            """, tags=['Emotion']),
            Spell('Flame Serpent', 2, 'Everything in a \\areamed, 5 ft.\\ wide shapeable line within \\rngmed range', f"""
                Make an attack vs. Armor against each target.
                \\hit Each target takes fire \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Greater Flame Serpent', 5, 'Everything in a \\arealarge, 10 ft.\\ wide shapeable line within \\rngmed range', """
                This spell functions like the \\spell<flame serpent> spell, except that it affects more targets.
            """, tags=[]),
            Spell('Flame Aura', 4, ['Yourself or an \\glossterm<ally> within \\rngclose range', 'Everything in the area (see text)'], """
                Heat constantly radiates in a \\areasmall radius emanation from the primary target.
                At the end of each \\glossterm<action phase>, make an attack vs. Armor against each secondary target.
                \\hit Each secondary target takes fire \\glossterm<standard damage> -2d.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Flame Aura', 6, 'Everything in a \\areamed radius emanation from the primary target', """
                This spell functions like the \\spell<flame aura> spell, except that affects more targets.
            """, tags=['Attune (target)']),
            Spell('Flame Blade', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                % Is this clear enough at not stacking with magic bonuses intrinsic to the creature?
                Weapons wielded by the target gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes>.
                In addition, all damage dealt with strikes using its weapons becomes fire damage in addition to the attack's normal damage types.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Wall of Fire', 3, 'Each creature that moves through the area (see text)', """
                You create a wall of fire in a 10 ft.\\ high, \\arealarge \\glossterm<wall> within \\rngmed range.
                The flames and heat make it diffcult to see through the wall, granting \\glossterm<concealment> to targets on the opposite side of the wall.
                When a creature passes through the wall, you make an attack vs. Armor against that creature.
                You can only make an attack in this way against a given creature once per \\glossterm<phase>.
                \\hit The target takes fire \\glossterm<standard damage>.

                Each five-foot square of wall has hit points equal to twice your \\glossterm<power>, and all of its defenses are 0.
                It is immune to most forms of attack, but it can be destroyed by \\glossterm<cold damage> and similar effects that can destroy water.
            """, tags=['Sustain (minor)']),
        ],
        category='damage',
    ))

    # Primary: buff
    # Secondary: utility
    # None: damage, debuff
    mystic_spheres.append(MysticSphere(
        name="Revelation",
        short_description="Share visions of the present and future, granting insight or combat prowess",
        cantrips=[
            Effects('Reveal Truth', 'Yourself', """
                You may reroll one Knowledge check you made last round.
                You can only cast this spell once per hour.
            """, tags=[]),
            Effects('Remote Sensing', 'One unoccupied location within \\rngmed range', """
                This cantrip functions like the \\spell<arcane eye> spell, except that it gains the \\glossterm<Sustain> (minor) tag in place of the \\glossterm<Attune> (self) tag.",
                In addition, the sensor cannot be moved after it is originally created.
            """, tags=['Scrying', 'Sustain (minor)']),
        ],
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        spells=[
            Spell('Purge Invisibility', 2, 'Everything in a \\arealarge radius \\glossterm<emanation> from you', """
                All invisibility effects are \\glossterm<suppressed> on all targets in the area.
            """, tags=['Attune (self)']),
            Spell('Greater Purge Invisibility', 5, 'Everything in 200 ft.\\ radius \\glossterm<emanation> from you', """
                This spell functions like the \\spell<purge invisibility> spell, except that it affects more targets.
            """, tags=['Attune (self)']),
            Spell('True Strike', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                If the target makes a \\glossterm<strike> during the current phase,
                    it gains a +4 bonus to \\glossterm<accuracy> and rolls twice and takes the higher result.
                If you cast this spell on yourself, it affects the first strike you make until the end of the next round.
            """, tags=['Swift']),
            Spell('Greater True Strike', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<true strike> spell, except that the bonus is increased to +6.
            """, tags=[]),
            Spell('Supreme True Strike', 5, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<true strike> spell, except that the bonus is increased to +8.
            """, tags=[]),
            Spell('Precognitive Offense', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Precognitive Offense', 5, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<precognitive offense> spell, except that the bonus is increased to +2.
            """, tags=['Attune (target)']),
            Spell('Precognitive Defense', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to Armor defense and Reflex defense.
            """, tags=['Attune (target)']),
            Spell('Greater Precognitive Defense', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<precognitive defense> spell, except that the bonus is increased to +2.
            """, tags=['Attune (target)']),
            Spell('Supreme Precognitive Defense', 7, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<precognitive defense> spell, except that bonus is increased to +3.
            """, tags=['Attune (target)']),
            Spell('Discern Lies', 2, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit When you hear the target deliberately and knowingly speaks a lie, you know that the target was lying.
                This ability does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions.
            """, tags=['Attune (self)', 'Detection']),
            Spell('Boon of Mastery', 2, 'Yourself', """
                You gain a +2 \\glossterm<magic bonus> to all skills.
            """, tags=['Attune (self)']),
            Spell('Greater Boon of Mastery', 4, 'Yourself', """
                This spell functions like the \\spell<boon of mastery> spell, except that the bonus is increased to +4.
            """, tags=['Attune (self)']),
            Spell('Boon of Many Eyes', 2, 'Yourself', """
                You gain a +1 \\glossterm<magic bonus> to \\glossterm<overwhelm resistance>.
            """, tags=['Attune (self)']),
            Spell('Boon of Knowledge', 3, 'Yourself', """
                You gain a +4 \\glossterm<magic bonus> to all Knowledge skills (see \\pcref<Knowledge>).
                In addition, once per hour you may reroll one Knowledge check you make and take the higher result.
            """, tags=['Attune (target)']),
            Spell('Third Eye', 3, 'Yourself', """
                You gain \\glossterm<blindsight> with a 50 foot range.
                This can allow it to see perfectly without any light, regardless of concealment or invisibility.
            """, tags=['Attune (self)']),
            Spell('Reveal Vulnerability', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target's physical vulnerabilities are highlighted, and openings in its defenses are revealed to attackers moments before they exist.
                It suffers a -2 penalty to Armor defense as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Greater Reveal Vulnerability', 3, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<reveal vulnerability> spell, except that the penalty increases to -4.
            """, tags=[]),
            Spell('Myriad Visions', 2, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target sees visions of possible futures that confuse its ability to determine reality.
                It suffers a -2 penalty to \\glossterm<accuracy> and Awareness as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Greater Myriad Visions', 4, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<myriad visions> spell, except that the penalties increase to -4.
            """, tags=[]),
            Spell('One Truth', 7, 'One creature within \\rngmed range', """
                Choose a fact that you know and make an attack vs. Mental against the target.
                If the fact is true and the target does not already know that fact, you gain a +2 bonus to \\glossterm<accuracy>.
                Otherwise, you take a -2 penalty to accuracy.
                \\hit The target's mind is overwhelmed by a total awareness of your chosen fact.
                It is \\glossterm<stunned> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Alarm', 1, 'One unoccupied square within \\rngmed range', """
                A \\glossterm<scrying sensor> appears floating in the air in the target location.
                The sensor passively observes its surroundings.
                If it sees a creature or object of Tiny size or larger moving within 50 feet of it, it will trigger a mental "ping" that only you can notice.
                You must be within 1 mile of the sensor to receive this mental alarm.
                This mental sensation is strong enough to wake you from normal sleep, but does not otherwise disturb concentration.
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Arcane Eye', 1, 'One unoccupied square within \\rngmed range', """
                A \\glossterm<scrying sensor> appears floating in the air in the target location.
                At the start of each round, you choose whether you see from this sensor or from your body.

                While viewing through the sensor, your visual acuity is the same as your normal body, except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
                You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

                If undisturbed, the sensor floats in the air in its position.
                As a \\glossterm<minor action>, you can concentrate to move the sensor up to 30 feet in any direction, even vertically.
                At the end of each round, if the sensor is does not have \\glossterm<line of effect> from you, it is destroyed.
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Greater Alarm', 2, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<alarm> spell, except that the sensor gains 100 ft.\\ \\glossterm<darkvision> and its Awareness bonus is equal to your \\glossterm<power>.
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Auditory Eye', 2, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<arcane eye> spell, except that you can you can also hear through the sensor.
                At the start of each round, you can choose whether you hear from the sensor or from your body.
                This choice is made independently from your sight.
                The sensor's auditory acuity is the same as your own, except that it does not share the benefits of any \\glossterm<magical> effects that improve your hearing.
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Accelerated Eye', 2, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<arcane eye> spell, except that the sensor moves up to 100 feet when moved instead of up to 30 feet.
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Autonomous Eye', 3, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<arcane eye> spell, except that the sensor is not destroyed when it loses \\glossterm<line of effect> to you.
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Penetrating Eye', 4, 'One unoccupied square within \\rngmed range (see text)', """
                This spell functions like the \\spell<autonomous eye> spell, except that you do not need \\glossterm<line of sight> or \\glossterm<line of effect> to target a location.
                You must specify a distance and direction to target a location you cannot see.
                This can allow you to cast the spell beyond walls and similar obstacles.
                As normal, if the intended location is occupied or otherwise impossible, the spell is \\glossterm<miscast>.
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Twin Eye', 3, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<arcane eye> spell, except that you constantly receive sensory input from both your body and the sensor.
                This allows you to see simultaneously from your body and from the sensor.
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Reverse Scrying', 2, 'One magical sensor within \\rngmed range', """
                A new scrying sensor appears at the location of the source of the the ability that created the target sensor.
                This sensor functions like the sensor created by the \\spell<autonomous eye> spell, except that the sensor cannot move.
            """, tags=['Attune (self)', 'Scrying']),
            # spell to cast spells from the eye instead of from your body?
        ],
        rituals=[
            Spell('Read Magic', 1, 'Yourself', """
                You gain the ability to decipher magical inscriptions that would otherwise be unintelligible.
                This can allow you to read ritual books and similar objects created by other creatures.
                After you have read an inscription in this way, you are able to read that particular writing without the use of this ritual.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
            Spell('Discern Location', 4, 'Any creature or object on the same plane as you', """
                You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to the target.
                However, you must specify your target with a precise mental image of its appearance.
                The image does not have to be perfect, but it must unambiguously identify the target.
                If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the ritual may simply fail.

                You learn the location (place, name, business name, or the like), community, country, and continent where the target lies.
                % Wording?
                If there is no corresponding information about an aspect of the target's location, such as if the target is in a location which is not part of a recognized country,
                    you learn only that that that aspect of the information is missing.

                This ritual takes 24 hours to perform, and it requires 32 action points from its participants.
            """, tags=['AP']),
            Spell('Interplanar Discern Location', 6, 'Any creature or object on the same plane as you', """
                This ritual functions like the \\ritual<discern location> ritual, except that the target does not have to be on the same plane as you.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<discern location> ritual.

                This ritual takes 24 hours to perform, and it requires 72 action points from its participants.
            """, tags=['AP']),
            Spell('Sending', 3, 'Any creature on the same plane as you', """
                You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to the target.
                However,  must specify your target with a precise mental image of its appearance.
                The image does not have to be perfect, but it must unambiguously identify the target.
                If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the ritual may simply fail.

                You send the target a short verbal message.
                The message must be twenty-five words or less, and speaking the message must not take longer than five rounds.

                After the the target receives the message, it may reply with a message of the same length as long as the ritual's effect continues.
                Once it speaks twenty-five words, or you stop sustaining the effect, the ritual is \\glossterm<dismissed>.

                This ritual takes one hour to perform.
            """, tags=['AP', 'Sustain (standard)']),
            Spell('Interplanar Sending', 6, 'Any creature on the same plane as you', """
                This ritual functions like the \\ritual<sending> ritual, except that the target does not have to be on the same plane as you.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<sending> ritual.
            """, tags=['AP', 'Sustain (standard)']),
            Spell('Telepathic Bond', 3, 'Up to five ritual participants', """
                Each target can communicate mentally through telepathy with each other target.
                This communication is instantaneous, though it cannot reach more than 100 miles or across planes.

                % Is this grammatically correct?
                Each target must attune to this ritual independently.
                If a target breaks its attunement, it stops being able to send and receive mental messages with other targets.
                However, the effect continues as long as at least one target attunes to it.
                If you \\glossterm<dismiss> the ritual, the effect ends for all targets.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual; see text)']),
            Spell('Long-Distance Bond', 5, 'Up to five ritual participants', """
                This ritual functions like the \\ritual<telepathic bond> ritual, except that the effect works at any distance.
                The communication still does not function across planes.
            """, tags=['Attune (ritual; see text)']),
            Spell('Planar Bond', 7, 'Up to five ritual participants', """
                This ritual functions like the \\ritual<telepathic bond> ritual, except that the effect works at any distance and across planes.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<telepathic bond> ritual.
            """, tags=['Attune (ritual; see text)']),
            Spell('Seek Legacy', 2, 'One ritual participant', """
                The target learns the precise distance and direction to their \\glossterm<legacy item>, if it is on the same plane.

                This ritual takes 24 hours to perform, and requires 8 action points from its ritual participants.
            """, tags=['AP']),
            Spell('Scry Creature', 4, 'One creature on the same plane as you', """
                Make an attack vs. Mental against the target.
                You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to the target.
                However,  must specify your target with a precise mental image of its appearance.
                The image does not have to be perfect, but it must unambiguously identify the target.
                If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the spell may simply be \\glossterm<miscast>.
                This attack roll cannot \\glossterm<explode>.
                \\hit A scrying sensor appears in the target's space.
                This sensor functions like the sensor created by the \\spell<arcane eye> spell, except that you cannot move the sensor manually.
                Instead, it automatically tries to follow the target to stay in its space.
                At the end of each phase, if the sensor is not in the target's space, this effect is \\glossterm<dismissed>.

                This ritual takes one hour to perform.
            """, tags=['AP', 'Scrying']),
            Spell('Interplanar Scry Creature', 7, 'One creature on the same plane as you', """
                This ritual functions like the \\ritual<scry creature> ritual, except that the target does not have to be on the same plane as you.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<scry creature> ritual.
            """, tags=['AP', 'Scrying']),
        ],
        category='buff, offense',
    ))

    # This seems weird?
    # Secondary: buff, damage, debuff, utility
    mystic_spheres.append(MysticSphere(
        name="Summon",
        short_description="Summon creatures to fight with you",
        cantrips=[
        ],
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        spells=[
            # TODO: this needs more spell
            Spell('Summon Monster', 1, 'One unoccupied square on stable ground within \\rngmed range', """
                You summon a creature in the target location.
                It visually appears to be a common Small or Medium animal of your choice, though in reality it is a manifestation of magical energy.
                Regardless of the appearance and size chosen, the creature's statistics are unchanged.
                It has hit points equal to twice your \\glossterm<power>.
                % Has to be level instead of power because power can't scale directly with d10s ever
                All of its defenses are equal to your 4 \\add your level, and its \\glossterm<land speed> is equal to 30 feet.
                It does not have any \\glossterm<action points>.
                If a summoned creature has no hit points remaining at the end of a phase, it disappears.

                Each round, you can choose the creature's actions by mentally commanding it as a \\glossterm<minor action>.
                There are only two actions it can take.
                As a \\glossterm<move action>, it can move as you direct.
                As a standard action, it can make a melee \\glossterm{strike} against a creature it threatens.
                Its accuracy is equal to your \\glossterm<accuracy>.
                If it hits, it deals \\glossterm<standard damage> -2d.
                The type of damage dealt by this attack depends on the creature's appearance.
                Most animals bite or claw their foes, which deals bludgeoning and slashing damage.

                If you do not command the creature's actions, it will continue to obey its last instructions if possible or do nothing otherwise.
                Summoned creatures have no mind or agency, and will not act on their own even if attacked.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Earth Elemental', 3, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be an earth elemental and deals bludgeoning damage.
                In addition, it gains a +1 bonus to Armor and Fortitude defenses and a bonus to hit points equal to your \\glossterm<power>.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Water Elemental', 2, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be an water elemental and deals bludgeoning damage.
                In addition, it has a 30 foot \\glossterm<swim speed> and suffer no penalties for fighting underwater (see \\pcref<Underwater Combat>).
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Air Elemental', 3, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be an air elemental and deals bludgeoning damage.
                In addition, it has a 30 foot \\glossterm<fly speed> with good \\glossterm<maneuverability>
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Fire Elemental', 5, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be a fire elemental and deals fire damage.
                In addition, when it deals fire damage to a creature, that creature is \\glossterm<ignited> as a \\glossterm<condition>.
                This condition can be removed if the target makes a \\glossterm<DR> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
                Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
                The flames can also be extinguished if the target is drenched in water, takes at least 5 cold damage, or other similar effects.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Bear', 2, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the creature appears to be a Medium bear.
                As a standard action, it can make a \\glossterm<grapple> attack against a creature it threatens.
                Its accuracy is the same as its accuracy with \\glossterm<strikes>.
                While grappling, the manifested creature can either make a strike or attempt to escape the grapple.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Mount', 2, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that you must also choose an \\glossterm<ally> within \\rngmed range to ride the summoned creature.
                In addition, the summoned creature appears to be either a Large horse or a Medium pony.
                It comes with a bit and bridle and a riding saddle, and will only accept the target as a rider.
                It has the same statistics as a creature from the \\spell<summon monster> spell, except that it follows its rider's directions to the extent that a well-trained horse would and it cannot attack.
            """, tags=['Attune (target)', 'Manifestation']),
            Spell('Summon Wolfpack', 4, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that it summons a pack of four wolf-shaped creatures instead of a single creature.
                Each creature has a -2 penalty to \\glossterm<accuracy> and \\glossterm<defenses> compared to a normal summoned creature.
                % TODO: wording?
                You must command the creatures as a group, rather than as individuals.
                Each creature obeys your command to the extent it can.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Pegasus', 4, 'One unoccupied location on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon mount> spell, except that the summoned creature appears to be either a Large or Medium pegasus.
                % TODO: wording of "trained as a mount"?
                It has a 30 foot \\glossterm<fly speed> and is trained as a mount.
            """, tags=['Attune (target)', 'Manifestation']),
        ],
        rituals=[
            # weird to have a spell and a ritual but both are useful
            Spell('Ritual Mount', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This ritual summons your choice of a Large light horse or a Medium pony to serve as a mount.
                The creature appears in an unoccupied location within \\rngclose range.
                It comes with a bit and bridle and a riding saddle, and will only accept the target as a rider.
                It has the same statistics as a creature from the \\spell<summon monster> spell, except that it follows its rider's directions to the extent that a well-trained horse would and it cannot attack.
            """, tags=['Attune (ritual)', 'Manifestation']),
        ],
        # What category does this belong to?
        category='buff, offense',
    ))

    # Primary: damage
    # Secondary: utility
    # Tertiary: debuff
    # None: buff
    mystic_spheres.append(MysticSphere(
        name="Telekinesis",
        short_description="Manipulate kinetic energy at a distance",
        cantrips=[
            Effects('Distant Hand', 'Medium or smaller unattended object within \\rngclose range', """
                You can move the target up to five feet in any direction within range, using your \\glossterm<power> instead of your Strength to determine your maximum carrying capacity.

                In addition, you can manipulate the target as if you were holding it in your hands.
                Any attacks you make with the object or checks you make to manipulate the object have a maximum bonus equal to your \\glossterm<power>.
            """, tags=['Sustain (standard)']),
        ],
        schools=['Evocation'],
        lists=['Arcane', 'Pact'],
        spells=[
            Spell('Force Slam', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.
            """, tags=[]),
            Spell('Force Lance', 2, 'Everything in a \\areamed, 5 ft.\\ wide line from you', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes piercing \\glossterm<standard damage> +1d.
            """, tags=[]),
            Spell('Force Wave', 3, 'Everything in a \\areamed cone from you', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage> +1d.
            """, tags=[]),
            Spell('Greater Force Lance', 4, 'Everything in a \\arealarge, 10 ft.\\ wide line from you', """
                This spell functions like the \\spell<force lance> spell, except that affects more targets.
            """, tags=[]),
            Spell('Greater Force Wave', 5, 'Everything in a \\arealarge cone from you', """
                This spell functions like the \\spell<force wave> spell, except that it affects more targets.
            """, tags=[]),
            Spell('Force Crush', 6, 'One creature or object within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +4d.
            """, tags=[]),
            Spell('Force Extension', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                Melee weapons wielded by the target gain an additional five feet of \\glossterm<reach>.
                This has no effect on ranged attacks the target makes.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Greater Force Extension', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                Melee weapons wielded by the target gain an additional ten feet of \\glossterm<reach>.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (target)']),
            Spell('Kinetic Impedance', 1, 'One Large or smaller target within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Telekinetic Throw', 1, 'One Medium or smaller creature or object within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit You move the target up to 30 feet in any direction.
                    You can change direction partway through the movement.
                    Moving the target upwards costs twice the normal movement cost.
            """, tags=[]),
            Spell('Telekinetic Lift', 1, 'One Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                The target is reduced to half of its normal weight.
                This gives it a +4 bonus to the Jump skill, if applicable, and makes it easier to lift and move.
            """, tags=['Attune (target)']),
            Spell('Greater Telekinetic Lift', 3, 'One Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                This spell functions like the \\spell<telekinetic lift> spell, except that the target is reduced to one quarter of its normal weight.
                This increases the Jump bonus to +8.
            """, tags=['Attune (target)']),
            Spell('Levitate', 4, 'One Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                % TODO: Wording
                As long as the target remains within 50 feet above a surface that could support its weight, it floats in midair, unaffected by gravity.
                During the movement phase, you can move the target up to ten feet in any direction as a \\glossterm<free action>.
            """, tags=['Attune (self)']),
            Spell('Wall of Force', 4, None, """
                You create a wall of telekinetic force in a 10 ft.\\ high, \\arealarge line within \\rngmed range.
                The wall is transparent, but blocks physical passage and \\glossterm<line of effect>.
                Each five-foot square of wall has hit points equal to twice your \\glossterm<power>, and all of its defenses are 0.
            """, tags=['Attune (self)']),
            Spell('Forcecage', 7, None, """
                You create a 10 ft.\\ cube of telekinetic force within \\rngmed range.
                You can create the cube around a sufficiently small creature to trap it inside.
                Each wall is transparent, but blocks physical passage and \\glossterm<line of effect>.
                Each five-foot square of wall has hit points equal to twice your \\glossterm<power>, and all of its defenses are 0.
            """, tags=['Attune (self)']),
        ],
        category='debuff, combat',
    ))

    # Primary: damage
    # Secondary: utility
    # Tertiary: debuff
    # None: buff
    mystic_spheres.append(MysticSphere(
        name="Terramancy",
        short_description="Manipulate earth to crush foes",
        cantrips=[],
        schools=['Conjuration', 'Transmutation'],
        lists=['Arcane', 'Nature'],
        spells=[
            Spell('Rock Throw', 1, 'One creature or object within \\rngmed range', """
                % TODO: define maximum hardness?
                You extract a Tiny chunk from a body of earth or unworked stone within 5 feet of you and throw it at a foe.
                If no such chunk can be extracted, this spell is \\glossterm<miscast>.
                Otherwise, make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.
            """, tags=['Physical']),
            Spell('Shrapnel Blast', 3, 'Everything in a \\arealarge cone from you', """
                You extract a Tiny chunk from a body of earth or unworked stone within 5 feet of you and blast it at your foes.
                If no such chunk can be extracted, this spell is \\glossterm<miscast>.
                Otherwise, make an attack vs. Armor against each target.
                \\hit Each target takes bludgeoning and piercing \\glossterm<standard damage>.
            """, tags=['Physical']),
            Spell('Earthcraft', 1, 'One body of earth or unworked stone within 5 feet of you', """
                You create a weapon or suit of armor from the target.
                You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made entirely from metal, except for heavy body armor.
                The body targeted must be at least as large as the item you create.
                The item appears in your hands.

                The item functions like a normal item of its type, except that it is twice as heavy.
                If the item loses all of its hit points, this effect is \\glossterm<dismissed>.
            """, tags=['Attune (self)']),
            Spell('Reinforced Earthcraft', 2, 'One unoccupied square within 5 feet of you', """
                This spell functions like the \\spell<earthcraft> spell, except that the item is the same weight as a normal item of its type.
                In addition, you can create heavy body armor.
            """, tags=['Attune (self)']),
            Spell('Earthspike', 1, 'One creature or object within \\rngmed range', """
                You create a spike of earth from the ground.
                Make an attack vs. Armor against the target.
                The target must be within 5 feet of a Small or larger body of earth or stone.
                \\hit The target takes piercing \\glossterm<standard damage> -2d and is \\glossterm<slowed> as a \\glossterm<condition>.
            """, tags=['Physical']),
            Spell('Impaling Earthspike', 4, 'One creature or object within \\rngmed range', """
                This spell functions like the \\spell<earthspike> spell, except that a struck target is \\glossterm<immobilized> instead of \\glossterm<slowed>.
            """, tags=['Physical']),
            Spell('Meld into Stone', 2, 'One stone object you can touch that is at least as large as your body', """
                You and up to 100 pounds of nonliving equipment meld into the stone.
                If you try to bring excess equipment into the stone, the spell is \\glossterm<miscast>.

                As long as the spell lasts, you can move within the stone as if it was thick water.
                However, at least part of you must remain within one foot of the place you originally melded with the stone.
                You gain no special ability to breathe or see while embedded the stone, and you cannot speak if your mouth is within the stone.
                The stone muffles sound, but very loud noises may reach your ears within it.
                If you fully exit the stone, this spell ends.

                If this spell ends before you exit the stone, or if the stone stops being a valid target for the spell (such as if it is broken into pieces), you are forcibly expelled from the stone.
                When you are forcibly expelled from the stone, you take 4d10 bludgeoning damage and become \\glossterm<nauseated> as a \\glossterm<condition>.
            """, tags=['Attune (self)']),
            Spell('Tremor', 1, 'All Large or smaller creatures in a \\areasmall radius within \\rngmed range', """
                You create an highly localized tremor that rips through the ground.
                Make an attack vs. Reflex against each target.
                \\hit Each target is knocked \\glossterm<prone>.
            """, tags=['Physical']),
            Spell('Greater Tremor', 3, 'All Large or smaller creatures in a \\areamed radius within \\rngmed range', """
                This spell functions like the \\spell<tremor> spell, except that it affects more targets.
            """, tags=['Physical']),
            Spell('Earthquake', 6, 'All creaturesin a \\areamed radius within \\rngmed range', """
                You create an intense but highly localized tremor that rips through the ground.
                Make an attack vs. Reflex against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.
                If that target is Huge or smaller, it is also knocked \\glossterm<prone>.
            """, tags=['Physical']),
            Spell('Fissure', 4, 'One Large or smaller creature within \\rngmed range that is standing on earth or unworked stone', """
                You open up a rift in the ground that swallows and traps a foe.
                Make an attack vs. Reflex against the target.
                \\hit The target is \\glossterm<immobilized>.
                As long as the target is immobilized in this way,
                    it takes bludgeoning \\glossterm<standard damage> -2d at the end of each \\glossterm<action phase> in subsequent rounds.
                This immobilization can be removed by climbing out of the fissure, which requires a \\glossterm<DR> 10 Climb check as a \\glossterm<move action>.
                Alternately, any creature that can reach the target can make a Strength check against the same DR to pull the target out.
                Special movement abilities such as teleportation can also remove the target from the fissure.
            """, tags=['Physical']),
            Spell('Fissure Swarm', 7, 'All enemies that are standing on earth or unworked stone in a \\areamed radius within \\rngmed range', """
                This spell functions like the \\spell<fissure> spell, except that it affects more targets.
            """, tags=['Physical']),
            Spell('Earthbind', 2, 'One creature within \\rngmed range that is within 50 feet of the ground', """
                Make an attack vs. Fortitude against the target.
                \\hit As a \\glossterm<condition>, the target is pulled towards the ground with great force, approximately quadrupling the gravity it experiences.
                This imposes a -2 penalty to \\glossterm<accuracy>, physical \\glossterm<checks>, and \\glossterm<defenses>.
                In addition, most flying creatures are unable to fly with this increased gravity and crash to the ground.
            """, tags=[]),
            Spell('Quagmire', 3, 'All earth and unworked stone in a \\areamed radius within \\rngmed range', """
                % TODO: wording to allow it to affect smaller parts of larger objects
                % TODO: define maximum hardness
                The targets are softened into a thick sludge, creating a quagmire that is difficult to move through.
                The movement cost required to move out of each affected square within the area is quadrupled.
                This does not affect objects under significant structural stress, such as walls and support columns.
            """, tags=['Attune (self)', 'Physical']),
            Spell('Earthen Fortification', 3, None, """
                You construct a fortification made of packed earth within \\rngmed range.
                This takes the form of up to ten contiguous 5-foot squares, each of which is four inches thick.
                The squares can be placed at any angle and used to form any structure as long as that structure is stable.
                Since the fortifications are made of packed earth, their maximum weight is limited, and structures taller than ten feet high are usually impossible.
                % TODO: define hit points and hardness of earth

                The fortifications form slowly, rather than instantly.
                The structure becomes complete at the end of the action phase in the next round after this spell is cast.
                This makes it difficult to trap creatures within structures formed.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Stone Fortification', 4,'Earthen Fortification', """
                This spell functions like the \\spell<earthen fortification> spell, except that the fortifications are made of stone instead of earth.
                This makes them more resistant to attack and allows the construction of more complex structures.
                % TODO: define hit points and hardness of stone
            """, tags=['Attune (self)', 'Manifestation']),
        ],
        rituals=[
        ],
    ))

    # Primary: utility
    # Secondary: debuff
    # Tertiary: buff
    # None: damage
    mystic_spheres.append(MysticSphere(
        name='Thaumaturgy',
        short_description="Suppress and manipulate magical effects",
        cantrips=[
            Effects('Sense Magic', 'Yourself', """
                You gain a +4 bonus to the Spellcraft skill until the end of the next round.
            """, tags=[]),
        ],
        schools=['Abjuration'],
        lists=['Arcane', 'Divine'],
        spells=[
            Spell('Suppress Magic', 1, 'One creature, object, or magical effect within \\rngmed range', """
                Make an attack against the target.
                If you target a creature or object, the attack result is applied to every \\glossterm<magical> effect on the target.
                % Is this clear enough?
                This does not affect the passive effects of any magic items the target has equipped.
                If you target a magical effect directly, the attack result is applied against the effect itself.
                The DR for each effect is equal to the \\glossterm<power> of that effect.
                \\hit Each effect is \\glossterm<suppressed>.
            """, tags=['Sustain (standard)']),
            Spell('Alter Magic Aura', 1, 'One Large or smaller magical object in \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit One of the target's magic auras is altered (see \pcref{Spellcraft}).
                You can change the school and descriptors of the aura.
                In addition, you can decrease the \\glossterm<power> of the aura by up to half your power, or increase the power of the aura up to a maximum of your power.
            """, tags=['Attune (self)']),
            Spell('Suppress Item', 1, 'One Large or smaller magical object in \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit All magical properties the target has are \\glossterm<suppressed>.
            """, tags=['Sustain (minor)']),
            Spell('Dismissal', 2, 'One creature or object within \\rngmed range', """
                Make an attack against the target.
                If the target is an effect of an ongoing \\glossterm<magical> ability, such as a summoned monster or created object, the DR is equal to the \\glossterm<power> of the ability.
                Otherwise, this spell has no effect.
                \\hit The target is treated as if the ability that created it was \\glossterm<dismissed>.
                This usually causes the target to disappear.
                If an \\glossterm<attuned> effect is \\glossterm<dismissed> in this way,
                    the attuning creature can regain the \\glossterm<action point> spent to attune to the spell when it takes a \\glossterm<short rest>.
            """, tags=[]),
            Spell('Dispel Magic', 2, 'One creature, object, or magical effect within \\rngmed range', """
                This spell functions like the \\spell<suppress magic> spell, except that a hit against an effect causes it to be \\glossterm<dismissed> instead of suppressed.
                If an \\glossterm<attuned> effect is \\glossterm<dismissed> in this way,
                    the attuning creature can regain the \\glossterm<action point> spent to attune to the spell when it takes a \\glossterm<short rest>.
            """, tags=['Sustain (standard)']),
            Spell('Malign Transferance', 2, ['Yourself or an \\glossterm<ally> within \\rngmed range', 'One other creature within that range'], """
                The primary target must be currently affected by a \\glossterm<magical> \\glossterm<condition>.
                Make an attack vs. Mental against the secondary target.
                \\hit One magical condition of your choice is removed from the primary target and applied to the secondary target.
                \\crit As above, except that you can transfer any number of magical conditions in this way.
            """, tags=[]),
            Spell('Greater Malign Transferance', 5, ['Yourself and each \\glossterm<ally> within \\rngmed range', 'One other creature within that range'], """
                Make an attack vs. Mental against the secondary target.
                \\hit One magical condition of your choice is removed from primary target and applied to the secondary target.
                \\crit As above, except that you can transfer any number of magical conditions from each primary target in this way.
            """, tags=[]),
            Spell('Enhance Magic', 2, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                The target gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with spells.
            """, tags=['Attune (target)']),
            Spell('Greater Enhance Magic', 5, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                This spell functions like the \\spell<enhance magic> spell, except that the bonus is increased to +4.
            """, tags=['Attune (target)']),
            # Is this worth the complexity it adds to the system?
            Spell('Antimagic Field', 7, 'Special', """
                All other magical abilities and objects are \\glossterm<suppressed> within a \\areamed radius \\glossterm<emanation> from you.
                % How much of this is redundant with suppression?
                Creatures within the area cannot activate, sustain, or dismiss magical abilities.
                % TODO: wording
                This does not affect aspects of creatures that cannot be suppressed, such as the knowledge of abilities.
                You cannot exclude yourself from this \\glossterm<emanation>.
                However, this spell does not prevent you from sustaining or dismissing this spell.
            """, tags=['Sustain (minor)']),
            # Does having this be Swift break anything?
            Spell('Dimensional Anchor', 2, 'One creature or object within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is unable to travel extradimensionally.
                This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Teleportation> effects.
            """, tags=['Swift', 'Sustain (minor)']),
            Spell('Dimensional Lock', 4, None, """
                This spell creates a dimensional lock in a \\arealarge radius \\glossterm<zone> from your location.
                Extraplanar travel into or out of the area is impossible.
                This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Teleportation> effects.
            """, tags=['Attune (self)']),
        ],
        category='debuff, combat',
    ))

    # Primary: debuff
    # Secondary: utility
    # Tertiary: damage
    # None: buff
    mystic_spheres.append(MysticSphere(
        name="Verdamancy",
        short_description="Animate and manipulate plants",
        cantrips=[
            Effects('Rapid Growth', 'Small or smaller inanimate plant within \\rngclose range', """
                The target grows as if a month of time had passed.
                When this spell ends, the plant returns to its original state.
            """, tags=['Sustain (minor)']),
        ],
        schools=['Transmutation'],
        lists=['Nature'],
        spells=[
            Spell('Entangle', 1, 'One Large or smaller creature within \\rngclose range', """
                You cause plants to grow and trap a foe.
                Make an attack vs. Reflex against the target.
                The target must be within 5 feet of earth or plants.
                You gain a +2 bonus to \\glossterm<accuracy> with this attack if the target is in standing in \\glossterm<undergrowth>.
                \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
                This condition can be removed if the target or a creature that can reach the target makes a \\glossterm<DR> 5 Strength check break the target free of the plants.
                The target can make this check as a \\glossterm<move action>, while other creatures can make the check as a standard action.
            """, tags=[]),
            Spell('Greater Entangle', 4, 'One Large or smaller creature within \\rngclose range', """
                This spell functions like the \\spell<entangle> spell, except that the \\glossterm<condition> is harder to remove.
                The target or any other creature that can reach the target can remove the condition with a \\glossterm<DR> 10 Strength check as a standard action.
            """, tags=[]),
            Spell('Embedded Growth', 1, 'One creature within \\rngclose range', """
                You throw a seed that embeds itself in a foe and grows painfully.
                Make an attack vs. Armor against the target.
                \\hit As a \\glossterm<condition>, the target takes physical \\glossterm<standard damage> at the end of each \\glossterm<action phase>.
                This condition can be removed if the target or a creature that can reach the target makes a \\glossterm<DR> 5 Heal check as a standard action to remove the seed.
            """, tags=[]),
            Spell('Fire Seed', 2, 'One unattended acorn or similar seed structure you touch', """
                % Does "seed structure" make sense?
                You transform an unattended acorn or similar seed structure into a small bomb.
                As a standard action, you or another creature can throw the acorn anywhere within \\rngclose range.
                % More accurate version: the acorn has a range increment of 10 feet to hit its target, but that accuracy roll is completely independent of the explosion.
                % Doesn't seem worth the complexity, and implicitly gives the fire seed surprisingly long range since objects are easy to hit.
                On impact, the acorn detonates, and you make an attack vs. Armor against everything within a \\areasmall radius of the struck creature or object.
                \\hit Each target takes fire \\glossterm<standard damage>.
            """, tags=['Attune (self)']),
            Spell('Greater Fire Seed', 4, 'One unattended acorn or similar seed structure you touch', """
                This spell functions like the \\spell<fire seed> spell, except that you can transform up to four bombs.
                In addition, the detonation affects a \\areamed radius instead of an \\areasmall radius.
            """, tags=['Attune (self)']),
            Spell('Wall of Thorns', 2, 'Each creature that moves through the area (see text)', """
                You create a wall of thorns in 10 ft.\\ high, \\areamed \\glossterm<wall> within \\rngmed range.
                The base of at least half of the wall must be in arable earth.
                The wall is four inches thick, but permeable.
                It provides \\glossterm<passive cover> to attacks made through the wall.
                Creatures can pass through the wall, though it costs five extra feet of movement to move through the wall.
                When a creature moves through the wall, make an attack vs. Armor against it.
                You can only make an attack in this way against a given creature once per \\glossterm<phase>.
                \\hit The target takes piercing \\glossterm<standard damage> -1d.

                Each five-foot square of wall has hit points equal to three times your \\glossterm<power>, and all of its defenses are 0.
                It is \\glossterm<vulnerable> to fire damage.
            """, tags=['Attune (self)']),
            Spell('Greater Wall of Thorns', 4,'Each creature that moves through the area (see text)', """
                This spell functions like the \\spell<wall of thorns> spell, except that the wall is an \\arealarge shapeable line.
            """, tags=['Attune (self)']),
            Spell('Plant Growth', 1, 'All plants and arable earth in a \\areamed radius within \\rngmed range', """
                Choose whether you want plants within the area to grow or diminish.

                If you choose for plants to grow, all arable earth within the area becomes \\glossterm<light undergrowth>.
                Light undergrowth within the area is increased in density to \\glossterm<heavy undergrowth>.
                If you choose for plants to diminish, all \\glossterm<heavy undergrowth> in the area is reduced to \\glossterm<light undergrowth>, and all \\glossterm<light undergrowth> is removed.

                When this spell's duration ends, the plants return to their natural size.
            """, tags=['Sustain (minor)']),
            Spell('Greater Plant Growth', 5, 'All plants and arable earth in a \\arealarge radius within \\rnglong range', """
                This spell functions like the \\spell<plant growth> spell, except that it affects more targets at a greater range.
            """, tags=['Sustain (minor)']),
            Spell('Blight', 2, 'One living creature or plant within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes \\glossterm<standard damage>.
                This damage is doubled if the target is a plant, including plant creatures.
            """, tags=[]),
        ],
        rituals=[
            Spell('Fertility', 2, None, """
                This ritual creates an area of bountiful growth in a one mile radius \\glossterm<zone> from your location.
                Normal plants within the area become twice as productive as normal for the next year.
                This ritual does not stack with itself.
                If the \\ritual<infertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.

                This ritual takes 24 hours to perform, and requires 8 action points from its participants.
            """, tags=['AP']),
            Spell('Infertility', 2, None, """
                This ritual creates an area of death and decay in a one mile radius \\glossterm<zone> from your location.
                Normal plants within the area become half as productive as normal for the next year.
                This ritual does not stack with itself.
                If the \\ritual<fertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.

                This ritual takes 24 hours to perform, and requires 8 action points from its participants.
            """, tags=['AP']),
            Spell('Lifeweb Transit', 4, 'Up to five Medium or smaller ritual participants', """
                Choose up a living plant that all ritual participants touch during the ritual.
                The plant must be at least one size category larger than the largest target.
                In addition, choose a destination up to 100 miles away from you on your current plane.
                By walking through the chosen plant, each target is teleported to the closest plant to the destination that is at least one size category larger than the largest target.

                You must specify the destination with a precise mental image of its appearance.
                The image does not have to be perfect, but it must unambiguously identify the destination.
                If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
                The new destination will be one that more closely resembles your mental image.
                If no such area exists, the ritual simply fails.
                % TODO: does this need more clarity about what teleportation works?

                This ritual takes 24 hours to perform and requires 32 action points from its ritual participants.
                It is from from the Conjuration school in addition to the Transmutation school.
            """, tags=['AP']),
        ],
    ))

    # Primary: damage
    # Secondary: buff (healing)
    # Tertiary: debuff, utility
    mystic_spheres.append(MysticSphere(
        name="Vital Surge",
        short_description="Alter life energy to cure or inflict wounds",
        cantrips=[
            Effects('Cure Minor Wounds', 'Yourself or a living \\glossterm<ally> within \\rngclose range', """
                The target heals hit points equal to your \\glossterm<power>.
            """, tags=[]),
        ],
        schools=['Vivimancy'],
        lists=['Divine', 'Nature'],
        spells=[
            Spell('Cure Wounds', 1, 'One living \\glossterm<ally> within \\rngmed range', """
                The target heals hit points equal to \\glossterm<standard damage> +1d.
            """, tags=[]),
            Spell('Inflict Wounds', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Inflict Debilitating Wounds', 3, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<inflict wounds> spell, except that a struck target also takes a -2 penalty to Fortitude defense as a \\glossterm<condition>.
            """, tags=[]),
            Spell('Greater Inflict Wounds', 4, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<inflict wounds> spell, except that the damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Supreme Inflict Wounds', 7, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<inflict wounds> spell, except that the damage increases to \\glossterm<standard damage> +5d.
            """, tags=[]),
            Spell('Greater Cure Wounds', 3, 'One living \\glossterm<ally> within \\rngmed range', """
                This spell functions like the \\spell<cure wounds> spell, except that the healing increases to \\glossterm<standard damage> +2d.
                In addition, for every 5 points of healing you provide, you can instead heal one point of \\glossterm<vital damage>.
            """, tags=[]),
            Spell('Heal', 5, 'One living \\glossterm<ally> within \\rngmed range', """
                This spell functions like the \\spell<cure wounds> spell, except that you gain a +2d bonus to healing.
                In addition, it heals \\glossterm<vital damage> as easily as it heals hit points.
            """, tags=[]),
            # TODO: make "Undead Bane" spell after figuring out undead / life
            # damage interaction
            Spell('Drain Life', 3, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<inflict wounds> spell, except that the damage increases to \\glossterm<standard damage> +2d.
                In addition, you heal hit points equal to your \\glossterm<power> if you deal damage.
            """, tags=[]),
            Spell('Greater Drain Life', 5, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<inflict wounds> spell, except that the damage increases to \\glossterm<standard damage> +3d.
                In addition, you heal hit points equal to twice your \\glossterm<power> if you deal damage.
            """, tags=[]),
            Spell('Vital Persistence', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target reduces its \\glossterm<vital damage penalties> by an amount equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Greater Vital Persistence', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                This spell functions like the \\spell<vital persistence> spell, except that the penalty reduction increases to be equal to twice your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Life Exchange', 4, ['One living \\glossterm<ally> within \\rngmed range', 'One other creature within that range'], """
                Make an attack vs. Fortitude against the secondary target.
                \\hit The secondary target takes damage equal to \\glossterm<standard damage> +1d.
                In addition, the primary target heals hit points equal to the damage dealt in this way.
                \\crit This spell does not deal additional damage on a critical hit.
            """, tags=[]),
            Spell('Death Knell', 3, 'One creature within \\rngmed range', """
                This spell functions like the \\spell<inflict wounds> spell, except that a struck target suffers a death knell as a \\glossterm<condition>.
                At the end of each round, if the target has 0 hit points, it immediately dies.

                % TODO: wording
                If the target dies while the condition is active, you heal hit points equal to twice your \\glossterm<power>.
            """, tags=[]),
            Spell('Circle of Death', 4, ['Yourself', 'Living \\glossterm<enemies> in the area (see text)'], """
                You are surrounded by an aura of death in a \\areamed radius \\glossterm<enamation> from you.
                When this spell resolves, and the end of each \\glossterm<action phase> in subsequent rounds, make an attack vs. Fortitude against each secondary target.
                \\hit Each target takes \\glossterm<standard damage> -3d.
            """, tags=['Attune (self)']),
            Spell('Circle of Healing', 4, ['Yourself', 'You and each living \\glossterm<ally> in the area (see text)'], """
                You are surrounded by an aura of healing in a \\areamed radius \\glossterm<emanation> from you.
                When this spell resolves, and the end of each \\glossterm<action phase> in subsequent rounds, each secondary target heals hit points equal to half your \\glossterm<power>.
            """, tags=['Attune (self)']),
            Spell('Finger of Death', 5, 'One living creature within \\rngclose range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes \\glossterm<standard damage> +2d.
                \\crit The target immediately dies.
            """, tags=[]),
        ],
        rituals=[
            Spell('Remove Disease', 2, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                All diseases affecting the target are removed.
            """, tags=['AP']),
            Spell('Restore Senses', 2, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                One of the target's physical senses, such as sight or hearing, is restored to full capacity.
                This can heal both magical and mundane effects, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).
            """, tags=['AP']),
            Spell('Reincarnation', 4, 'One Diminuitive or larger piece of a humanoid corpse', """
                The target must have been part of the original creature's body at the time of death.
                The creature the target corpse belongs to returns to life in a new body.
                It must not have died due to old age.

                This ritual creates an entirely new body for the creature's soul to inhabit from the natural elements at hand.
                During the ritual, the body ages to match the age of the original creature at the time it died.
                The creature has 0 hit points when it returns to life.

                A reincarnated creature is identical to the original creature in all respects, except for its species.
                The creature's species is replaced with a random species from \\tref<Humanoid Reincarnations>.
                Its appearance changes as necessary to match its new species, though it retains the general shape and distinguishing features of its original appearance.
                The creature loses all attribute modifiers and abilities from its old species, and gains those of its new species.
                However, its languages are unchanged.

                Coming back from the dead is an ordeal.
                All of the creature's action points and other daily abilities are expended when it returns to life.
                In addition, its maximum action points are reduced by 1.
                This penalty lasts for thirty days, or until the creature gains a level.
                If this would reduce a creature's maximum action points below 0, the creature cannot be resurrected.

                This ritual takes 24 hours to perform, and requires 32 action points from its participants.
                It is from the Conjuration school in addition to the Vivimancy school.
                In addition, it can only be learned through the nature \\glossterm<magic source>.
            """, tags=['AP', 'Creation'], extra_text="""
                \\begin{dtable}
                    \\lcaption{Humanoid Reincarnations}
                    \\begin{dtabularx}{\\columnwidth}{l X}
                        \\tb{d\\%} & \\tb{Incarnation} \\tableheaderrule
                        01--13 & Dwarf \\\\
                        14--26 & Elf \\\\
                        27--40 & Gnome \\\\
                        41--52 & Half-elf \\\\
                        53--62 & Half-orc \\\\
                        63--74 & Halfling \\\\
                        75--100 & Human \\\\
                    \\end{dtabularx}
                \\end{dtable}
            """),
            Spell('Fated Reincarnation', 5, 'One Diminuitive or larger piece of a humanoid corpse', f"""
                This ritual functions like the \\ritual<reincarnation> ritual, except that the target is reincarnated as its original species instead of as a random species.

                This ritual takes 24 hours to perform, and requires 50 action points from its participants.
                It is from the Conjuration school in addition to the Vivimancy school.
                In addition, it can only be learned through the nature \\glossterm<magic source>.
            """, tags=['AP', 'Creation']),
            Spell('Purge Curse', 2, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                All curses affecting the target are removed.
                This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
                However, it can allow the target to remove any cursed items it has equipped.

                This ritual takes 24 hours to perform, and requires 8 action points from its participants.
            """, tags=['AP']),
            Spell('Restoration', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                All of the target's hit points, \\glossterm<subdual damage>, and \\glossterm<vital damage> are healed.
                In addition, any of the target's severed body parts or missing organs grow back by the end of the next round.

                This ritual takes 24 hours to perform, and requires 18 action points from its participants.
            """, tags=['AP']),
            Spell('Resurrection', 3, 'One intact humanoid corpse within \\rngclose range', """
                The target returns to life.
                It must not have died due to old age.

                The creature has 0 hit points when it returns to life.
                It is cured of all \\glossterm<vital damage> and other negative effects, but the body's shape is unchanged.
                Any missing or irreparably damaged limbs or organs remain missing or damaged.
                The creature may therefore die shortly after being resurrected if its body is excessively damaged.

                Coming back from the dead is an ordeal.
                All of the creature's action points and other daily abilities are expended when it returns to life.
                In addition, its maximum action points are reduced by 1.
                This penalty lasts for thirty days, or until the creature gains a level.
                If this would reduce a creature's maximum action points below 0, the creature cannot be resurrected.

                This ritual takes 24 hours to perform, and requires 18 action points from its participants.
                It is from the Conjuration school in addition to the Vivimancy school.
                In addition, it can only be learned through the divine \\glossterm<magic source>.
            """, tags=['AP']),
            Spell('Complete Resurrection', 5, 'One Diminuitive or larger piece of a humanoid corpse within \\rngclose range', """
                This ritual functions like the \\ritual<resurrection> ritual, except that it does not have to target a fully intact corpse.
                The target must have been part of the original creature's body at the time of death.
                The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

                This ritual takes 24 hours to perform, and requires 50 action points from its participants.
                It is from the Conjuration school in addition to the Vivimancy school.
                In addition, it can only be learned through the divine \\glossterm<magic source>.
            """, tags=['AP', 'Creation']),
            Spell('True Resurrection', 7, 'Special', """
                This ritual functions like the \\ritual<resurrection> ritual, except that it does not require any piece of the corpse.
                Instead, you must explicitly and unambiguously specify the identity of the creature being resurrected.
                The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

                This ritual takes 24 hours to perform, and requires 98 action points from its participants.
                It is from the Conjuration school in addition to the Vivimancy school.
                In addition, it can only be learned through the divine \\glossterm<magic source>.
            """, tags=['AP', 'Creation']),
            Spell('Soul Bind', 5, 'One intact corpse within \\rngclose range', """
                % Is this clear enough that you can't use the same gem for this ritual twice?
                Choose a nonmagical gem you hold that is worth at least 1,000 gp.
                A fragment of the soul of the creature that the target corpse belongs to is imprisoned in the chosen gem.
                This does not remove the creature from its intended afterlife.
                However, it prevents the creature from being resurrected, and prevents the corpse from being used to create undead creatures, as long as the gem is intact.
                A creature holding the gem may still resurrect or reanimate the creature.
                If the gem is shattered, the fragment of the creature's soul returns to its body.

                This ritual takes one hour to perform.
            """, tags=['AP']),
        ],
        category='damage',
    ))

    # Weaponcraft can create and manipulate weapons of all varieties; all of its
    # spells should involve a mixture of creating a weapon and manipulating
    # it after it is created.

    # Primary: damage
    # Secondary: utility
    # None: buff, debuff
    mystic_spheres.append(MysticSphere(
        name="Weaponcraft",
        short_description="Create and manipulate weapons to attack foes",
        cantrips=[
            Effects('Personal Weapon', 'Yourself', """
                Choose a type of weapon that you are proficient with.
                You create a normal item of that type in your hand.
                If the item stops touching you, it disappears, and this effect ends.

                If you create a projectile weapon, you can fire it without ammunition by creating projectiles as you fire.
                The projectiles disappear after the attack is complete.

                % Strange duration for a cantrip
                This spell lasts until you use it again, or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
            """, tags=['Manifestation']),
        ],
        schools=['Conjuration', 'Transmutation'],
        lists=['Arcane', 'Divine', 'Pact'],
        spells=[
            Spell('Mystic Bow', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes piercing \\glossterm<standard damage> +1d.
            """, tags=['Manifestation']),
            Spell('Blade Barrier', 1, 'Each creature that moves through the area (see text)', """
                A wall of whirling blades appears within \\rngmed range.
                The wall takes the form of a 10 ft.\\ high, \\arealarge line.
                The wall provides \\glossterm<active cover> (20\\% miss chance) against attacks made through it.
                Attacks that miss in this way harmlessly strike the wall.
                When a creature or object passes through the wall, make an attack vs. Armor against it.
                \\hit The target takes slashing \\glossterm<standard damage> -1d.
            """, tags=['Sustain (minor)']),
            Spell('Summon Weapon', 1, 'One unoccupied square within \\rngmed range', """
                A melee weapon that you are proficient with appears in the target location.
                The weapon floats about three feet off the ground, and is sized appropriately for a creature of your size.
                The specific weapon you choose affects the type of damage it deals.
                Regardless of the weapon chosen, it has hit points equal to twice your \\glossterm<power>.
                All of its defenses are equal to 3 \\add your level, and it has a 30 foot fly speed with good maneuverability, though it cannot travel farther than five feet above the ground.
                If the weapon has no hit points remaining at the end of a phase, it disappears.

                Each round, the weapon automatically moves towards the creature closest to it during the \\glossterm<movement phase>.
                During the \\glossterm<action phase>, it makes a melee \\glossterm<strike> against a random creature adjacent to it.
                Its accuracy is equal to your \\glossterm<accuracy>.
                If it hits, it deals \\glossterm<standard damage> -1d.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Blade Perimeter', 2, 'Each creature that moves through the area (see text)', """
                This spell functions like the \\spell<blade barrier> spell, except that the wall is an 20 ft.\\ high, \\areamed radius circle.
            """, tags=['Sustain (minor)']),
            Spell('Contracting Blade Perimeter', 3, 'Each creature that moves through the area (see text)', """
                This spell functions like the \\spell<blade perimeter> spell, except that the wall's radius shrinks by 5 feet at the end of every \\glossterm<action phase>, dealing damage to everything it moves through.
                % Clarify interaction with solid obstacles that block contraction?
            """, tags=['Sustain (minor)']),
            Spell('Aerial Weapon', 2, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that the weapon's height above the ground is not limited.
                This allows the weapon to fly up to fight airborne foes.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Blade Barrier, Dual', 3, 'Each creature that moves through the area (see text)', """
                This spell functions like the \\spell<blade barrier> spell, except that the spell creates two parallel walls of the same length, five feet apart.
            """, tags=['Sustain (minor)']),
            Spell('Create Ballista', 2, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that it creates a fully functional Large ballista instead of a weapon of your choice.
                The ballista functions like any other weapon, with the following exceptions.

                It cannot move, and makes ranged \\glossterm<strikes> instead of melee strikes.
                Its attacks have a maximum range of 100 feet.
                Its attacks deal piercing damage, and its hit points are equal to three times your \\glossterm<power>.
                In addition, the ballista attacks the creature farthest from it, instead of the creature closest to it.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Create Ballista, Dual Track', 4, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<create ballista> spell, except that the ballista is created with two separate bolt tracks.
                This allows it to fire at two different targets in the same round when you command it to fire.
                It cannot fire at the same target twice.
                Each round, it attacks the two creatures farthest from it.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Giant Blade', 3, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that the weapon takes the form of a Large greatsword.
                The weapon's attacks hit everything in a \\areasmall cone from it.
                It aims the cone to hit as many creatures as possible.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Titan Blade', 6, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that the weapon takes the form of a Gargantuan greatsword.
                The weapon's attacks hit everything in a \\areamed cone from it.
                It aims the cone to hit as many creatures as possible.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Paired Weapons', 7, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that you summon two weapons instead of one.
                Each weapon attacks independently.
            """, tags=['Manifestation', 'Sustain (minor)']),
        ],
        category='buff, offense',
    ))

    return sorted(mystic_spheres, key=lambda m: m.name)


def sanity_check(spells):
    # Make sure that the right kinds of spells exist

    # Every spell source should have one spell of each category
    for category in rise_data.categories:
        has_spell = {source: False for source in rise_data.spell_sources}
        for spell in spells:
            if spell.category == category:
                for source in spell.lists:
                    if source in has_spell:
                        has_spell[source] = True
        for source in rise_data.spell_sources:
            if not has_spell[source]:
                warn(f"Source {source} has no spell for {category}")

    # Every spell source should have both single target and multi damage spells
    # that target every defense
    for defense in rise_data.defenses:
        has_damage = {source: False for source in rise_data.spell_sources}
        # Every source should also have debuffs against every defense
        has_debuff = {source: False for source in rise_data.spell_sources}
        for spell in spells:
            if spell.effects.attack and spell.effects.attack.defense == defense:
                if spell.category == 'damage':
                    for source in spell.lists:
                        if source in rise_data.spell_sources:
                            has_damage[source] = True
                elif spell.category[:6] == 'debuff':
                    for source in spell.lists:
                        if source in rise_data.spell_sources:
                            has_debuff[source] = True

        for source in rise_data.spell_sources:
            if not has_damage[source]:
                warn(f"Source {source} has no damage spell against {defense}")
            if not has_debuff[source]:
                warn(f"Source {source} has no debuff spell against {defense}")

    # Every spell school should have at least two unique categories of
    # spells
    categories_in_school = {school: {} for school in rise_data.schools}
    for spell in spells:
        for school in spell.schools:
            categories_in_school[school][spell.category] = True
    for school in rise_data.schools:
        if len(categories_in_school[school]) < 2:
            warn(f"School {school} has only {len(categories_in_school[school])} spell categories")


def generate_mystic_sphere_latex(check=False):
    mystic_spheres = generate_mystic_spheres()
    if check:
        sanity_check(mystic_spheres)
    mystic_sphere_texts = []
    for mystic_sphere in mystic_spheres:
        try:
            mystic_sphere_texts.append(mystic_sphere.to_latex())
        except Exception as e:
            raise Exception(f"Error converting mystic sphere '{mystic_sphere.name}' to LaTeX") from e
    return latexify('\n\\newpage'.join(mystic_sphere_texts))


def write_to_file(check=None):
    mystic_sphere_latex = generate_mystic_sphere_latex(check)
    with open(book_path('mystic_sphere_descriptions.tex'), 'w') as mystic_sphere_descriptions_file:
        mystic_sphere_descriptions_file.write(mystic_sphere_latex)


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    if output:
        write_to_file(check)
    else:
        print(generate_mystic_sphere_latex(check))

if __name__ == "__main__":
    main()
