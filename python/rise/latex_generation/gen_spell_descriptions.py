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

                \\rankline
                \\rank<3> The bonus increases to +6.
                \\rank<5> The bonus increases to +8.
                \\rank<7> The bonus increases to +10.
            """, tags=[]),
            Effects('Soften Landing', 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                Until the end of the round, the target treats all falls as if they were 20 feet shorter for the purpose of determining \\glossterm<falling damage>.

                \\rankline
                \\rank<3> The distance reduction increases to 50 feet.
                \\rank<5> The distance reduction increases to 100 feet.
                \\rank<7> The target is immune to \\glossterm<falling damage>.
            """, tags=[]),
        ],
        schools=['Transmutation'],
        lists=['Nature'],
        spells=[
            Spell('Propulsion', 1, 'Yourself or one Large or smaller \\glossterm<ally> in \\rngclose range', """
                You move the target up to 50 feet in any direction.
                You cannot change the direction of the movement partway through.
                Moving the target upwards costs twice the normal movement cost.

                \\rankline
                \\rank<3> The distance increases to 100 feet.
                \\rank<5> The target gains a +2 bonus to Armor defense during the current phase.
                \\rank<7> The distance increases to 300 feet.
            """, tags=['Swift']),
            Spell('Wind Screen', 1, 'Yourself', """
                You gain a +1 \\glossterm<magic bonus> to Armor defense.
                This bonus is increased to +4 against ranged \\glossterm<physical attacks> from weapons or projectiles that are Small or smaller.

                You can cast this spell as a \\glossterm<minor action>.
                Any effect which increases the size of creature this spell can affect also increases the size of ranged weapon it defends against by the same amount.

                \\rankline
                \\rank<3> The bonus against ranged attacks increases to +6.
                \\rank<5> The bonus to Armor defense increases to +2.
                \\rank<7> The bonus against ranged attacks increases to +8.
            """, tags=['Attune (target)']),
            Spell('Windstrike', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=[]),
            Spell('Windsnipe', 3, 'One creature or object within \\rnglong range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<5> The range increases to \\rngext.
                \\rank<7> The range increases to 3,000 feet.
            """, tags=[]),
            Spell('Buffeting Blast', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> -2d and is \\glossterm<pushed> up to 30 feet in any direction.
                Moving the target upwards costs twice the normal movement cost.

                \\rankline
                \\rank<3> On a \\glossterm<critical hit>, the target takes double damage and the distance you can push the target is doubled.
                \\rank<5> The distance you can push the target increases to 60 feet.
                \\rank<7> The distance you can push the target increases to 100 feet.
            """, tags=[]),
            Spell('Gentle Descent', 3, 'Yourself', """
                You gain a 30 foot \\glossterm<glide speed> (see \\pcref<Gliding>).

                \\rankline
                \\rank<5> You are immune to \\glossterm<falling damage> even if you do not glide.
                \\rank<7> You can reduce your \\glossterm<glide speed> to 20 feet or increase it to 60 feet during each phase that you glide.
            """, tags=['Attune (self)']),
            Spell('Flight', 5, 'Yourself', """
                You gain a 30 foot \\glossterm<fly speed> as long as you are no more than 100 feet above solid ground (see \\pcref<Flying>).

                \\rankline
                \\rank<7> The maximum distance above the ground increases to 300 feet.
            """, tags=['Attune (self)']),
            Spell('Gust of Wind', 3, 'Everything in a \\arealarge, 10 ft. wide line from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.

                \\rankline
                % TODO: wording
                \\rank<3> Each struck target is \\glossterm<pushed> 20 feet in the direction the line points away from you.
                    Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
                \\rank<5> The area increases to a \\areahuge, 10 ft. wide line from you.
                \\rank<7> Each struck target is pushed 50 feet instead of 20 feet.
            """, tags=[]),
            Spell('Windblade', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                Melee weapons wielded by the target gain +5 foot \\glossterm<magic bonus> to \\glossterm<reach>.
                Attacks that hit because of this reach deal bludgeoning damage instead of any other damage types.
                This has no effect on ranged attacks the target makes.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<5> The target also gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes>.
                \\rank<7> The bonus to \\glossterm<reach> increases to +10 feet.
            """, tags=['Attune (target)']),
            Spell('Stormlord', 3, 'Yourself', """
                At the end of each phase, make an attack vs. Armor against each creature within \\rngclose range that attacked you during that phase.
                \\hit Each struck target takes bludgeoning \\glossterm<standard damage> -1d.
                Any individual creature can only be dealt damage in this way once per round.

                Any effect which increases this spell's range increases the range of this retaliation by the same amount.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage>.
                \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
            """, tags=['Attune (self)']),
            Spell('Air Walk', 6, 'Yourself', """
                You can walk on air as if it were solid ground as long as you are no more than 50 feet above solid ground.
                The magic only affects your's legs and feet.
                By choosing when to treat the air as solid, you can traverse the air with ease.

                \\rankline
                \\rank<8> The maximum distance above solid ground increases to 300 feet.
            """, tags=['Attune (target)']),
            # Should this be a ritual?
            Spell('Control Weather', 4, None, """
                When you cast this spell, you choose a new weather pattern.
                You can only choose weather which would be reasonably probable in the climate and season of the area you are in.
                For example, you can normally create a thunderstorm, but not if you are in a desert.

                When you complete the spell, the weather begins to take effect in a two mile radius cylinder-shaped \\glossterm<zone> from your location.
                After five minutes, your chosen weather pattern fully takes effect.
                % TODO: define weather intensities
                You cannot change the intensity of the weather beyond what would be possible without magic during this time frame.
                For example, you can change a clear sky into a light thunderstorm, but you cannot create a hurricane or tornado from untroubled air.

                You can control the general tendencies of the weather, such as the direction and intensity of the wind.
                You cannot control specific applications of the weather, such as the location of lightning strikes.
                Contradictory weather conditions are not possible simultaneously.

                After the spell's effect ends, the weather continues on its natural course, which may cause your chosen weather pattern to end.
                % TODO: This should be redundant with generic spell mechanics
                If another ability would magically manipulate the weather in the same area, the most recently used ability takes precedence.

                \\rankline
                \\rank<6> You can shape the weather for up to fifteen minutes before it takes effect, increasing the intensity of the changes you can make.
                \\rank<8> You can cause weather changes that are inappropriate for the climate and season of the area you are in.
                Making a weather change that is inappropriate for the local environment takes twice as long as making an appropriate change.
            """, tags=['Attune (self)']),
            Spell('Cyclone', 3, 'Everything in a \\areasmall radius within \\rngclose range', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
            """, tags=[]),
            Spell('Buffeting Hurricane', 4, '\\glossterm<Enemies> in a \\areamed radius from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage> and is moved 20 feet clockwise around you.
                Each target's final position should be the same distance from you as its starting position.

                \\rankline
                \\rank<6> The area increases to a \\arealarge radius.
                \\rank<8> The area increases to a \\areahuge radius.
            """, tags=[]),
            Spell('Windtheft', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Reflex against the target.
                \\hit The target drops all items it is holding that are not well secured (such as a ring) or held in a hand.
                \\crit As above, except that the target also drops items that are held a hand.

                \\rankline
                \\rank<3> Each dropped item is scattered 30 feet in a random horizontal direction.
                \\rank<5> You can choose for the dropped items to fly towards you instead of being scattered randomly.
                \\rank<7> The distance each dropped item flies increases to 100 feet.
            """, tags=[]),
            Spell('Windseal', 4, 'One Large or smaller creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit As a \\glossterm<condition>, the target is \\glossterm<slowed> by incredibly fast winds that inhibit movement.
                At the end of each phase, if it moved during that phase, it takes bludgeoning \\glossterm<standard damage> -2d.
                \\crit As a \\glossterm<condition>, the target is \\glossterm<immobilized> by incredibly fast winds that inhibit movement.
                At the end of each phase, if it moved during that phase, it takes bludgeoning \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<6> The maximum size increases to Huge.
                \\rank<8> The maximum size increases to Gargantuan.
            """, tags=[]),
        ],
        rituals=[
            Spell('Air Bubble', 3, 'Yourself or one \\glossterm<ally> within \\rngclose range', """
                The target can breathe clear, clean air regardless of its surroundings.
                This can allow it to breathe underwater and avoid air-based poisons.
            """, tags=['Attune (target)']),
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
                You create two gallons of wholesome, drinkable water at the target locations, allowing you to fill multiple small water containers.
                You must create a minimum of one ounce of water in each location.

                \\rankline
                \\rank<3> The volume created increases to five gallons.
                \\rank<5> The volume created increases to ten gallons.
                \\rank<7> The volume created increases to twenty gallons.
            """, tags=['Creation']),
            Effects('Slippery Escape', 'Yourself', """
                You gain a +4 bonus to the Escape Artist skill until the end of the next round.

                \\rankline
                \\rank<3> The bonus increases to +6.
                \\rank<5> The bonus increases to +8.
                \\rank<7> The bonus increases to +10.
            """, tags=['Manifestation']),
        ],
        schools=['Conjuration'],
        lists=['Nature'],
        spells=[
            Spell('Constraining Bubble', 3, 'One Large or smaller creature within \\rngmed range', """
                Make an attack vs. Reflex against the target.
                \\hit As a \\glossterm<condition>, the majority of the target's body is surrounded by a layer of water.
                This does not impede the target's ability to breathe, but it takes penalties as if it was fighting underwater (see \\pcref<Underwater Combat>).

                \\rankline
                \\rank<5> The maximum size increases to Huge.
                \\rank<7> The maximum size increases to Gargantuan.
            """, tags=['Manifestation']),
            Spell('Crushing Wave', 1, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Manifestation']),
            Spell('Great Flood', 3, 'Everything in a \\arealarge, 15 ft.\\ wide line from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.

                \\rankline
                \\rank<5> The area increases to a \\areahuge, 20 ft.\\ wide line from you.
                \\rank<7> The area increases to a \\areaext, 30 ft.\\ wide line from you.
            """, tags=['Manifestation']),
            Spell('Water Jet', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=['Manifestation']),
            Spell('Fountain', 1, '\\glossterm<Enemies> within a \\areasmall radius from you', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Manifestation']),
            Spell('Wall of Water', 4, None, """
                You create a wall of water in a 20 ft.\\ high, \\arealarge line within \\rngmed range.
                The wall is four inches thick, and blocks \\glossterm<line of effect> for abilities.
                Sight through the wall is possible, though distorted.
                The wall provides both \\glossterm<cover> and \\glossterm<concealment> to targets on the opposite side of the wall, for a total of a +4 bonus to Armor defense.
                Creatures can pass through the wall unharmed, though it costs five extra feet of movement to move through the wall.

                Each five-foot square of wall has a \\glossterm<wound resistance> equal to three times your \\glossterm<power> and all of its defenses are 0.

                \\rankline
                \\rank<6> The area of the wall increases to a \\areahuge line.
                \\rank<8> The area of the wall increases to a \\areaext line.
            """, tags=['Sustain (minor)', 'Manifestation']),
            Spell('Underwater Freedom', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target suffers no penalties for acting underwater, except for those relating to using ranged weapons.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<3> The target can also breathe water as if it was air.
                \\rank<5> The target also gains a swim speed equal to half its \\glossterm<base speed>.
                \\rank<7> The swim speed increases to be equal to the target's \\glossterm<base speed>.
            """, tags=['Attune (target)']),
            Spell('Raging River', 3, 'Everything in a \\arealarge, 15 ft. wide line from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d and is \\glossterm<pushed> 20 feet in the direction the line points away from you.
                Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.

                \\rankline
                % TODO: wording
                \\rank<5> The area increases to a \\areahuge, 20 ft. wide line from you.
                \\rank<7> Each struck target is pushed 50 feet instead of 20 feet.
            """, tags=[]),
            Spell('Geyser', 3, 'Everything in a \\arealarge, 5 ft.\\ wide vertical line within \\rngmed range', """
                Make an attack vs. Armor against each target.
                If this spell has its area increased, such as with the Widened \\glossterm<augment>, only the length of the line increases.
                \\hit Each target takes takes bludgeoning \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Manifestation']),
            Spell('Rainstorm', 3, 'Everything in the area (see text)', f"""
                Torrential rain begins falling out of thin air within a \\arealarge radius \\glossterm<zone> from your location.
                The rain extinguishes minor fires such as campfires and torches on contact.
                Everything in the area gain a bonus equal to your \\glossterm<power> to \\glossterm<resistances> against fire damage.

                \\rankline
                \\rank<5> The area increases to a \\areahuge radius \\glossterm<zone>.
                \\rank<7> The area increases to a \\areaext radius \\glossterm<zone>.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Obscuring Mist', 1, None, """
                Fog fills the air within a \\areamed radius \\glossterm<zone> from your location.
                The fog partially obstructs sight, granting \\glossterm<concealment> to anything seen through the fog (see \\pcref<Concealment>).

                \\rankline
                \\rank<3> The area increases to a \\arealarge radius \\glossterm<zone>.
                \\rank<5> You can exclude an inner radius of any size from the area, allowing you to create fog that surrounds you without blocking sight to things adjacent to you.
                \\rank<7> The area increases to a \\areahuge radius \\glossterm<zone>.
            """, tags=['Sustain (minor)']),
            Spell('Misty Shroud', 4, None, """
                Fog fills the air within a \\areamed radius \\glossterm<emanation> from your location.
                The fog partially obstructs sight, granting \\glossterm<concealment> to anything seen through the fog (see \\pcref<Concealment>).

                \\rank<6> You can exclude an inner radius of any size from the area, allowing you to create fog that surrounds you without blocking sight to things adjacent to you.
                \\rank<8> The area increases to a \\arealarge radius \\glossterm<zone>.
            """, tags=['Attune (self)']),
            Spell('Aqueous Tentacles', 3, 'Yourself', """
                Each of your arms with a \\glossterm<free hand> is covered with watery tentacles that you can attack with.
                Each tentacle is a slam \\glossterm<natural weapon> (see \\tref<Natural Weapons>).
                The tentacles have a \\glossterm<reach> of 10 feet, and any strikes with them are \\glossterm<magical strikes>.

                \\rankline
                \\rank<5> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> on attacks using the tentacles.
                \\rank<7> Your \\glossterm<reach> with the tentacles increases to 20 feet.
            """, tags=['Attune (self)']),
            Spell('Dessicate', 4, 'One creature within \\rngclose range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes physical \\glossterm<standard damage> and is \\glossterm<sickened> as a \\glossterm<condition>.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
            """, tags=[]),
        ],
        rituals=[
            Spell('Dampen', 1, 'Up to five ritual participants', """
                Each target gains a \\glossterm<magic bonus> equal to your \\glossterm<power> to \\glossterm<resistances> against fire damage.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (ritual)']),
            Spell('Water Breathing', 3, 'One Medium or smaller ritual participant', """
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

                \\rankline
                \\rank<3> The range increases to \\rngmed.
                \\rank<5> The maximum size of the target increases to Small.
                \\rank<7> The range increases to \\rnglong.
            """, tags=[]),
        ],
        schools=['Conjuration'],
        lists=['Arcane', 'Pact'],
        spells=[
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
                \\hit The target takes \\glossterm<standard damage>.
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
                \\hit The target takes fire \\glossterm<standard damage> -2d and is \\glossterm<ignited> as a \\glossterm<condition>.
                This condition can also be removed if the target makes a \\glossterm<DR> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
                Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
                \\crit As above, except that the target takes double damage and the condition cannot be removed with a \\glossterm<move action>.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> -1d.
                \\rank<8> The damage increases to \\glossterm<standard damage>.
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
            Spell('Blink', 4, 'Yourself', """
                You randomly blink between your current plane and the Astral Plane.
                This blinking stops when you take actions on your current plane.
                In any phase where you do not take any actions, \\glossterm<targeted> \\glossterm<strikes> against you have a 50\\% miss chance.
                You are still affected normally by abilities that affect an area.

                \\rankline
                \\rank<6> This protects you against any \\glossterm<targeted> attacks instead of only from \\glossterm<strikes>.
                    You are still affected normally by abilities that affect an area.
                \\rank<8> \\glossterm<Targeted> attacks against you still have a 20\% miss chance in phases when you take actions.
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
                Each 5-ft.\\ square of wall has a \\glossterm<wound resistance> equal to twice your \\glossterm<power>.

                \\rankline
                \\rank<3> The \\glossterm<wound resistance> of each 5-ft.\\ square increases to be equal to three times your \\glossterm<power>.
                \\rank<5> The area increases to a \\arealarge line.
                \\rank<7> The \\glossterm<wound resistance> of each 5-ft.\\ square increases to be equal to four times your \\glossterm<power>.
            """, tags=['Sustain (minor)']),
            Spell('Invulnerable Mystic Barrier', 6, None, """
                You create a wall of magical energy in a 10 ft.\\ high, \\areamed line within \\rngmed range.
                The wall is visible as a shimmering magical membrane that does not block sight.
                Nothing can pass through the wall until it is destroyed.
                Each 5-ft.\\ square of wall has a \\glossterm<wound resistance> equal to twice your \\glossterm<power>.
                The wall is immune to \\glossterm<physical damage>.

                \\rankline
                \\rank<8> The area increases to a \\arealarge line.
            """, tags=['Sustain (minor)']),
            Spell('Wall of Energy Impedance', 3, None, """
                You create a wall of magical energy in a 10 ft.\\ high, \\areamed line within \\rngmed range.
                The wall is visible as a shimmering magical membrane that does not block sight.
                It does not impede passage for objects or creatures, but any ability that deals \\glossterm<energy damage> treats the wall as an impassable barrier.

                \\rankline
                \\rank<5> The area increases to a \\arealarge line.
                \\rank<7> The height increases to 20 ft.\\ high.
            """, tags=['Sustain (minor)']),
            Spell('Wall of Magic Impedance', 5, None, """
                You create a wall of magical energy in a 10 ft.\\ high, \\areamed line within \\rngmed range.
                The wall is visible as a shimmering magical membrane that does not block sight.
                It does not impede passage for objects or creatures, but any \\glossterm<magical> ability treats the wall as an impassable barrier.

                \\rankline
                \\rank<7> The area increases to a \\arealarge line.
            """, tags=['Sustain (minor)']),
            Spell('Kinetic Shield', 4, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical> damage.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The target also gains a +1 \\glossterm<magic bonus> to \\glossterm<wound rolls> on \\glossterm<vital wounds> from \\glossterm<physical> damage.
                \\rank<8> The bonus increases to be equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Resist Energy', 4, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<energy> damage.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The target also gains a +1 \\glossterm<magic bonus> to \\glossterm<wound rolls> on \\glossterm<vital wounds> from \\glossterm<energy> damage.
                \\rank<8> The bonus increases to be equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Universal Shield', 6, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against all damage.

                \\rankline
                \\rank<8> The target also gains a +1 \\glossterm<magic bonus> to \\glossterm<wound rolls>.
            """, tags=['Attune (target)']),
            Spell('Repulsion Field', 3, 'All \\glossterm<enemies> that enter the area (see text)', """
                This spell creates a repulsive field in a \\areamed radius \\glossterm<zone> from your location.
                When an enemy makes physical contact with the spell's area for the first time, you make an attack vs. Mental against it.
                \\hit The target is unable to enter the spell's area with any part of its body.
                The rest of its movement in the current phase is cancelled.

                Creatures in the area at the time that the spell is cast are unaffected by the spell.

                \\rankline
                \\rank<5> The area increases to a \\arealarge radius.
                \\rank<7> The area increases to a \\areahuge radius.
            """, tags=['Sustain (minor)']),
            Spell('Energetic Immunity', 5, 'Yourself', """
                Choose a subtype of \\glossterm<energy damage>: cold, electricity, or fire.
                You become immune to damage of the chosen type.
                Attacks that deal damage of multiple types still inflict damage normally unless you are immune to all types of damage dealt.

                \\rankline
                \\rank<7> You may attune to this spell any number of times, choosing a different subtype of energy damage each time.
            """, tags=['Attune (self)']),
            Spell('Retributive Shield', 6, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical> damage.
                Whenever an attack that deals \\glossterm<physical damage> fails to beat the target's \\glossterm<damage resistance>, the attacker takes that damage.
                If the attacker is beyond \\rngclose range of the target, this reflection fails.
                Any effect which increases this spell's range increases the range of this effect by the same amount.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<8> The range of the spell and the range of the reflection increase to \\rngmed.
            """, tags=['Attune (target)']),
            Spell('Deflective Shield', 1, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to Armor defense and Reflex defense.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<3> The bonus to Reflex defense increases to +2.
                \\rank<5> The bonus to Armor defense increases to +2.
                \\rank<7> The bonus to Reflex dfense increases to +3.
            """, tags=['Attune (target)']),
            Spell('Antilife Shell', 6, 'All \\glossterm<enemies> that enter the area (see text)', """
                This spell creates a repulsive field in a \\areamed radius \\glossterm<zone> from your location.
                When an enemy makes physical contact with the spell's area for the first time, you make an attack vs. Mental against it.
                You gain a +10 bonus to \\glossterm<accuracy> against living creatures.
                \\hit The target is unable to enter the spell's area with any part of its body.
                The rest of its movement in the current phase is cancelled.

                Creatures in the area at the time that the spell is cast are unaffected by the spell.

                \\rankline
                \\rank<8> The area increases to a \\arealarge radius.
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
            Spell('Mystic Lock', 3, 'One large or smaller closable, nonmagical object within \\rngclose range, such as a door or box', """
                The target object becomes magically locked.
                It can be unlocked with a Devices check against a DR equal to 20 \\add your \\glossterm<power>.
                The DR to break it open forcibly increases by 10.

                You can freely pass your own \\ritual<arcane lock> as if the object were not locked.
                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
            Spell('Resilient Lock', 5, 'One large or smaller closable, nonmagical object within \\rngclose range, such as a door or box', f"""
                This ritual functions like the \\ritual<mystic lock> ritual, except that the DR to unlock the target with a Devices check is instead equal to 30 + your \\glossterm<power>.
                In addition, the DR to break it open increases by 20 instead of by 10.
            """, tags=['Attune (ritual)']),
            Spell('Explosive Runes', 4, 'One Small or smaller unattended object with writing on it within \\rngclose range', """
                % TODO: clarify how to identify that this is Explosive Runes instead of bad handwriting
                The writing on the target is altered by the runes in subtle ways, making it more difficult to read.
                It becomes a \\glossterm<trap>.
                To read the writing, a creature must concentrate on reading it, which requires a standard action.
                If a creature reads the target, the target explodes.
                You make an attack vs. Armor against everything within a \\areamed radius from the target.
                Each struck target takes energy \\glossterm<standard damage> from the explosion.

                After the target object explodes in this way, the ritual is \\glossterm<dismissed>.
                If the target is destroyed or rendered illegible, the ritual is dismissed without exploding.
                This ritual takes one hour to perform.
            """, tags=['Attune (ritual)']),
            Spell('Scryward', 3, None, """
                This ritual creates a ward against scrying in a \\arealarge radius \\glossterm<zone> centered on your location.
                All \\glossterm<Scrying> effects fail to function in the area.
                This effect is permanent.

                This ritual takes 24 hour to perform, and requires 8 action points from its participants.
            """, tags=['AP']),
            Spell('Private Sanctum', 5, None, """
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

                \\rankline
                \\rank<3> The bonus to Mental defense increases to +2.
                \\rank<5> The bonus to Armor defense increases to +2.
                \\rank<7> The bonus to Mental defense increases to +3.
            """, tags=['Attune (target)']),
            Spell('Battle Blessing', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<5> The target also gains a +2 \\glossterm<magic bonus> to \\glossterm<power>.
                \\rank<7> The accuracy increases to +2.
            """, tags=['Attune (target)']),
            Spell('Blessing of Resilience', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                Whenever the target gains a \\glossterm<condition>, it can choose to negate that condition.
                After negating a condition in this way, this spell ends.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<5> The spell can negate two conditions before ending.
                \\rank<7> The spell can negate three conditions before ending.
            """, tags=['Attune (target)']),
            Spell('Cleansing Blessing', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target can remove a \\glossterm<condition>.

                \\rankline
                \\rank<5> The target can remove two conditions.
                \\rank<7> The target can remove three conditions.
            """, tags=[]),
            Spell('Cleansing Benediction', 5, 'You and each of your \\glossterm<allies> within a \\areamed radius from you', """
                Each target can remove one \\glossterm<condition>.

                \\rankline
                \\rank<7> The area increases to a \\arealarge radius.
            """, tags=[]),
            Spell('Blessing of Might', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +4 \\glossterm<magic bonus> to Strength for the purpose of determining its \\glossterm<carrying capacity>.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<5> The bonus increases to +6.
                \\rank<7> The bonus increases to +8.
            """, tags=['Attune (target)']),
            Spell('Blessing of Endurance', 1, 'Yourself or an \\glossterm<ally> wihtin \\rngclose range', """
                The target increases its maximum \\glossterm<hit points> by one and regains one \\glossterm<hit point>.
                When this ability ends, the target loses \\glossterm<hit points> equal to the number of hit points it regained this way and its maximum \\glossterm<hit points> are restored to normal.

                \\rankline
                \\rank<3> The number of additional hit points increases to two.
                \\rank<5> The number of additional hit points increases to three.
                \\rank<7> The number of additional hit points increases to four.
            """, tags=['Attune (target)']),
        ],
        rituals=[
            Spell('Blessing of Fortification', 1, 'One unattended, nonmagical object or part of an object of up to Large size', """
                Unlike most abilities, this ritual can affect individual parts of a whole object.

                % How should this affect Strength break DRs?
                The target gains a +5 \\glossterm<magic bonus> to \\glossterm<resistances>.
                If the target is moved, this effect ends.
                Otherwise, it lasts for one year.

                This ritual takes one hour to perform.
            """, tags=['Attune (ritual)']),
            Spell('Enduring Fortification', 4, 'One unattended, nonmagical object or part of an object of up to Large size', """
                This ritual functions like the \\spell<blessing of fortification> ritual, except that the effect lasts for one hundred years.
            """, tags=['AP']),
            Spell('Greater Enduring Fortification', 5,'Greater Fortification', """
                This ritual functions like the \\spell<greater fortification> ritual, except that the effect lasts for one hundred years.
            """, tags=['AP']),
            Spell('Greater Fortification', 4, 'One unattended, nonmagical object or part of an object of up to Large size', """
                This ritual functions like the \\spell<blessing of fortification> ritual, except that the bonus to \\glossterm<resistances> increases to 10.
            """, tags=['Attune (ritual)']),
            Spell('Supreme Fortification', 7, 'One unattended, nonmagical object or part of an object of up to Large size', """
                This ritual functions like the \\spell<blessing of fortification> ritual, except that the bonus to \\glossterm<resistances> increases to 15.
            """, tags=['Attune (ritual)']),
            Spell('Bless Water', 1, 'One pint of unattended, nonmagical water within \\rngclose range', """
                The target becomes holy water.
                Holy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck undead creature or an evil outsider.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
            Spell('Permanent Bless Water', 3, 'One pint of unattended, nonmagical water within \\rngclose range', """
                This ritual functions like the \\spell<bless water> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
                This ritual takes one hour to perform.
            """, tags=['AP']),
            Spell('Curse Water', 1, 'One pint of unattended, nonmagical water within \\rngclose range', """
                The target becomes unholy water.
                Unholy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck good outsider.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
            Spell('Permanent Curse Water', 3, 'One pint of unattended, nonmagical water within \\rngclose range', """
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
                In either case, you gain the ability to see the auras of other creatures using this spell if they are within \\rngclose range.
                If you see another creature with the same aura as you, this spell grants you the unerring knowledge of that similarity.
                This can allow you to identify other followers of your deity or alignment with certainty.

                \\rankline
                \\rank<3> The range increases to \\rngmed.
                \\rank<5> If you are a cleric, you can also unerringly see an aura around creatures who worship your deity.
                    If you are a paladin, you can also unerringly see an aura around creatures who share your devoted alignment.
                \\rank<7> The range increases to \\rngext.
            """, tags=['Sustain (free)']),
        ],
        schools=['Channeling'],
        lists=['Divine'],
        spells=[
            Spell('Divine Judgment', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target takes energy \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=[]),
            Spell('Word of Faith', 1, '\\glossterm<Enemies> in a \\areasmall radius from you', """
                Make an attack vs. Mental against each target.
                \\hit Each target takes energy \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Proclamation', 3, '\\glossterm<Enemies> in a \\areamed radius from you', """
                Make an attack vs. Mental against each target.
                \\hit Each target takes energy \\glossterm<standard damage>.

                \\rankline
                \\rank<5> The area increases to a \\arealarge radius.
                \\rank<7> The area increases to a \\areahuge radius.
            """, tags=[]),
            Spell('Mantle of Faith', 4, 'Yourself', """
                You gain a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical> damage.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The bonus also applies against \\glossterm<energy> damage.
                \\rank<8> The bonus increases to be equal to your \\glossterm<power>.
            """, tags=['Attune (self)']),
            Spell('Divine Might', 4, 'Yourself', """
                You increase your size by one \\glossterm<size category>.
                This increases your \\glossterm<overwhelm value> and \\glossterm<overwhelm resistance>, and usually increases your \\glossterm<reach> (see \\pcref<Size in Combat>).
                However, your physical form is not altered fully to match its new size, and your Strength and Dexterity are unchanged.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> You also gain a +2 \\glossterm<magic bonus> to Strength.
                \\rank<8> You can increase your size by two size categories instead of one.
            """, tags=['Attune (self)']),
            Spell('Holy Blade', 7, 'Yourself', """
                Whenever you make a \\glossterm<strike> against Armor defense, you can choose to make that strike against Reflex defense instead.
            """, tags=['Attune (self)']),
        ],
        rituals=[
            Spell('Consecrate', 3, None, """
                The area within an \\arealarge radius \\glossterm<zone> from your location becomes sacred to your deity.
                % TODO: what cares about consecration?
                This has no tangible effects by itself, but some special abilities and monsters behave differently in consecrated areas.

                This ritual takes 24 hours to perform and requires 8 action points from its ritual participants.
            """, tags=['Attune (self)']),
            Spell('Divine Transit', 5, 'Up to five Medium or smaller ritual participants', """
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
                You can read at twice your normal speed.
                However, the mental effort imposes a -4 penalty to Mental defense.

                \\rankline
                \\rank<3> You can read at four times your normal speed.
                \\rank<5> You can read at six times your normal speed.
                \\rank<7> You can read at ten times your normal speed.
            """, tags=['Sustain (free)']),
            Effects('Accelerated Search', 'Yourself', """
                Make an Awareness check to notice things in a single 10-ft.\\ squrae within 10 feet of you.
                You gain a +4 bonus to this check.

                \\rankline
                \\rank<3> The bonus increases to +6.
                \\rank<5> The bonus increases to +8.
                \\rank<7> The bonus increases to +10.
            """, tags=[]),
        ],
        schools=['Transmutation'],
        lists=['Arcane', 'Pact'],
        spells=[
            Spell('Slow', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<decelerated> as a \\glossterm<condition>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=[]),
            Spell('Mental Lag', 3, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<slowed> and \\glossterm<dazed> as a single \\glossterm<condition>.

                \\rankline
                \\rank<5> On a \\glossterm<critical hit>, the target is \\glossterm<decelerated> and \\glossterm<stunned> instead of \\glossterm<slowed> and \\glossterm<dazed>.
                \\rank<7> On a hit, the target is decelerated and stunned instead of slowed and dazed.
            """, tags=[]),
            Spell('Haste', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<base speed>, up to a maximum of double its \\glossterm<base speed>.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<3> The speed bonus increases to +15 feet.
                \\rank<5> The speed bonus increases to +20 feet.
                \\rank<7> The speed bonus increases to +30 feet.
            """, tags=['Attune (target)']),
            Spell('Accelerated Strike', 4, 'Yourself', """
                As a \\glossterm<minor action>, you can make a \\glossterm<strike> with a -2 penalty to \\glossterm<accuracy> and a -2d penalty to damage.

                \\rankline
                \\rank<6> The damage penalty is reduced to -1d.
                \\rank<8> The accuracy penalty is reduced to -1.
            """, tags=['Attune (self)']),
            Spell('Temporal Duplicate', 5, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
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

                \\rankline
                \\rank<7> The range increases to \\rnglong.
            """, tags=[]),
            Spell('Time Hop', 3, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngmed range', """
                You send the target into the future, causing it to temporarily cease to exist.
                When you cast this spell, you choose how many rounds the target ceases to exist for, up to a maximum of five rounds.
                At the end of the last round, it reappears in the same location where it disappeared.

                The area the target occupied can be physically crossed, but it is treated as an invalid destination for teleportation and other similar magic.
                When the target reappears, all of its surroundings are adjusted as if the object had retroactively always existed in its space.
                For example, if the location is occupied by a creature that walked into the area, the creature is relocated to the closest unoccupied space along the path it took to reach the target.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<5> The maximum size of the target increases to Large.
                \\rank<7> The maximum size of the target increases to Huge.
            """, tags=[]),
            Spell('Temporal Stasis', 4, 'Yourself or one Medium or smaller \\glossterm<ally> within \\rngmed range', """
                The target is placed into stasis, rendering it unconscious.
                While in stasis, it cannot take any actions and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.

                % TODO: wording
                This effect normally lasts as long as you \\glossterm<attune> to it, and until the end of the round when you release the attunement.
                If you use this ability on yourself, it instead lasts for a number of rounds you choose when you cast the spell, up to a maximum of five rounds.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The maximum size of the target increases to Large.
                \\rank<8> The maximum size of the target increases to Huge.
            """, tags=['Attune (self)']),
            Spell('Time Lock', 5, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                You lock the state of the target's body in time.
                Note the target's \\glossterm<hit points>, \\glossterm<vital wounds> (including \\glossterm<wound roll> results), and \\glossterm<conditions>.
                If the target dies, this effect ends immediately.

                As a \\glossterm<standard action>, you can reach through time to restore the target's state.
                If you do, the target's \\glossterm<hit points>, \\glossterm<vital wounds>, and \\glossterm<conditions> become identical to what they were when you cast this spell.
                This does not affect any other properties of the target, such as any resources expended.
                After you restore the target's state in this way, the spell ends.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<7> The effect is not ended if the target dies, and restoring the target's state can also restore it to life.
                If the target is restored to life in this way, all of its properties not locked by this spell, such as any resources expended, are identical to what they were when the target died.
                You cannot restore yourself to life in this way since you cannot take the action to restore your own state while dead.
            """, tags=['Sustain (minor)']),
            Spell('Time Stop', 8, 'Yourself', """
                You can take two full rounds of actions immediately.
                During this time, all other creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
                You can still affect yourself and create areas or new effects.

                You are still vulnerable to danger, such as from heat or dangerous gases.
                However, you cannot be detected by any means while you travel.

                After casting this spell, you cannot cast it again until you take a \\glossterm<short rest>.
            """, tags=[]),
            Spell('Evasion', 4, 'Yourself', """
                When you are attacked by an ability that affects an area, you can use your Reflex defense in place of any other defenses against that attack.

                \\rankline
                \\rank<6> You also gain a +1 \\glossterm<magic bonus> to Reflex defense.
                \\rank<8> The defense bonus increases to +2.
            """, tags=['Attune (self)']),
        ],
        rituals=[
            Spell('Gentle Repose', 3, 'One unattended, nonmagical object within \\rngclose range', """
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

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Compulsion']),
            Spell('Collapse', 1, '\\glossterm<Enemies> in a \\areamed radius from you', """
                Make an attack vs. Mental against each target.
                \\hit Each target falls \\glossterm<prone>.
                \\crit As above, and as a \\glossterm<condition>, each target is unable to stand up.
                If a target is somehow brought into a standing position, it will immediately fall and become prone again.

                \\rankline
                \\rank<3> The area increases to a \\arealarge radius.
                \\rank<5> The area increases to a \\areahuge radius.
                \\rank<7> The area increases to a \\areaext radius.
            """, tags=['Compulsion']),
            Spell('Stop', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<decelerated> as a \\glossterm<condition>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Compulsion']),
            Spell('Confusion', 5, 'One creature within \\rngclose range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\confused as a \\glossterm<condition>.

                \\rankline
                \\rank<6> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<8> The accuracy bonus increases to +2.
            """, tags=['Compulsion']),
            Spell('Sleep', 7, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\blinded as a \\glossterm<condition>.
                \\crit As above, and the target falls asleep as a \\glossterm<condition>.
                It cannot be awakened while the condition lasts unless it takes a \\glossterm<vital wound>, which causes it to wake up and ends the condition.
                After the condition ends, the target can wake up normally, though it continues to sleep until it would wake up naturally.
            """, tags=['Compulsion']),
            Spell('Discordant Song', 7, '\\glossterm<Enemies> in a \\areasmall radius from you', """
                Make an attack vs. Mental against each target.
                \\hit Each target is \\disoriented as a \\glossterm<condition>.
            """, tags=['Compulsion']),
            Spell('Dominate', 5, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<stunned> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<stunned> and \\glossterm<confused> as a single \\glossterm<condition>.
                As a standard action, you can make an additional attack vs. Mental against the target as long as it remains affected by this condition is within \\rngmed range of you.
                On a hit, the target becomes stunned and confused in the same way as an additional condition, continuing the effect even if the target removed the original condition in the same phase.
                On a critical hit, if the target is humanoid, it becomes \\glossterm<dominated> by you as long as you \\glossterm<attune> to this ability.

                \\rankline
                \\rank<7> You can dominate the target even if it is not humanoid.
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

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Winterwave', 3, 'Everything in a \\arealarge cone from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes cold \\glossterm<standard damage>.

                \\rankline
                \\rank<5> The area increases to a \\areahuge cone.
                \\rank<7> The area increases to a \\areaext cone.
            """, tags=[]),
            Spell('Frostbite', 3, 'One creature or object within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes cold \\glossterm<standard damage> -2d and is \\glossterm<slowed> as a \\glossterm<condition>.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage> -1d.
                \\rank<7> The damage increases to \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Hailstorm', 4, 'Everything in a \\areasmall radius within \\rngclose range', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes cold and bludgeoning \\glossterm<standard damage>.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
            """, tags=[]),
            Spell('Blizzard', 1, '\\glossterm<Enemies> and objects in a \\areasmall radius from you', """
                Make an attack vs. Fortitude against each target.
                \\hit Each target takes cold \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The area increases to a \\areamed radius.
                \\rank<5> The area increases to a \\arealarge radius.
                \\rank<7> The area increases to a \\areahuge radius.
            """, tags=[]),
            Spell('Ray of Frost', 1, 'One creature or object within \\rngclose range', """
                Make an attack vs. Reflex against the target.
                \\hit The target takes cold \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=[]),
            Spell('Icecraft', 1, 'One pool of unattended, nonmagical water within \\rngclose range.', """
                This spell creates an icy weapon or a suit of icy armor from the target pool of water.
                You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made entirely from metal, except for heavy body armor.
                The pool of water targeted must be at least as large as the item you create.

                The item functions like a normal item of its type, except that it is more fragile.
                Its \\glossterm<wound resistance> is equal to twice your \\glossterm<power>, and it is \\glossterm<vulnerable> to fire damage.

                When a creature wearing armor created in this way takes physical damage, cold damage, or fire damage, that damage is also dealt to the armor.
                Likewise, when a creature wielding a weapon created in this way deals damage with the weapon, that damage is also dealt to the weapon.
                If the item becomes \\glossterm<broken>, this effect is \\glossterm<dismissed>.

                \\rankline
                \\rank<3> The \\glossterm<wound resistance> of the item increases to three times your power.
                    In addition, you can also create heavy body armor.
                \\rank<5> The item created is magically enhanced.
                    A weapon grants a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities,
                        and armor grants a +1 \\glossterm<magic bonus> to Armor defense.
                \\rank<7> The \\glossterm<wound resistance> of the item increases to four times your power.
            """, tags=['Sustain (minor)']),
            Spell('Frost Breath', 4, ['Yourself', 'Everything within a \\arealarge cone'], """
                As a standard action, you can breathe cold like a dragon.
                When you do, make an attack vs Armor against each secondary target.
                \\hit Each secondary target takes cold \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Attune (self)']),
            Spell('Frostfall', 4, None, """
                The temperature in a two mile radius cylinder-shaped \\glossterm<zone> from your location decreases rapidly.
                After one minute, the temperature decreases by 50 degrees Fahrenheit, to a minimum of \\minus50 degrees.

                \\rankline
                \\rank<6> The temperature decreases by 100 degrees, to a minimum of \\minus70 degrees.
                \\rank<8> The temperature decreases by 150 degrees, to a minimum of \\minus90 degrees.
            """, tags=['Attune (self)']),
            Spell('Frostburn', 6, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit As a \\glossterm<condition>, the target is seared by painful cold.
                At the end of each round, it takes cold \\glossterm<standard damage> -1d per round since it became affectd by this condition.

                \\rank<8> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=[]),
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

                \\rankline
                \\rank<3> The range increases to \\rngmed.
                \\rank<5> You may target an additional ally within range.
                \\rank<7> The range increases to \\rnglong.
            """, tags=['Emotion', 'Sustain (free)']),
        ],
        schools=['Enchantment'],
        lists=['Arcane', 'Divine', 'Pact'],
        spells=[
            Spell('Terror', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\shaken by you as a \\glossterm<condition>.
                \\crit The target is \\glossterm<panicked> by you as a \\glossterm<condition>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Emotion']),
            Spell('Panic', 6, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\panicked by you as a \\glossterm<condition>.

                \\rankline
                \\rank<8> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=['Emotion']),
            Spell('Fearsome Aura', 3, 'All \\glossterm<enemies> in the area (see text)', """
                You radiate an aura of fear in a \\areamed radius \\glossterm<emanation> from you.
                When you attune to this spell, and at the end of each \\glossterm<action phase> in subsequent rounds, make an attack vs. Mental against each target.
                You cannot make this attack more than once against any individual target during this spell's duration.
                \\hit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.

                \\rankline
                \\rank<5> The area increases to a \\arealarge radius \\glossterm<emanation>.
                \\rank<7> The area increases to a \\areahuge radius \\glossterm<emanation>.
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
                In addition, at the end of each \\glossterm<round>, if the target took damage that round, it takes \\glossterm<standard damage> -3d.
                This damage is of all damage types that the target was damaged by during that round.
            """, tags=['Emotion']),
            Spell('Redirected Terror', 3, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\shaken by an \\glossterm<ally> of your choice within range as a \\glossterm<condition>.
                \\crit As above, except that the target is \\panicked instead of shaken.

                \\rankline
                \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Emotion']),
            Spell('Charm', 3, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\charmed by you.
                Any act by you or by creatures that appear to be your allies that threatens or damages the \\spell<charmed> person breaks the effect.

                \\rankline
                \\rank<5> You may target two creature within range.
                \\rank<7> You may target three creatures within range.
            """, tags=['Sustain (minor)', 'Emotion', 'Subtle']),
            Spell('Amnesiac Charm', 6, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\charmed by you.
                Any act by you or by creatures that appear to be your allies that threatens or damages the \\spell<charmed> person breaks the effect.
                When this effect ends, the target forgets all events that transpired during the spell's duration.
                It becomes aware of its surroundings as if waking up from a daydream.
                The target is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.

                \\rankline
                \\rank<8> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=['Sustain (minor)', 'Emotion', 'Subtle']),
            Spell('Calm Emotions', 3, 'All creatures within a \\arealarge radius from you', """
                Make an attack vs. Mental against each target.
                \\hit Each target has its emotions calmed.
                The effects of all other \\glossterm<Emotion> abilities on that target are \\glossterm<suppressed>.
                It cannot take violent actions (although it can defend itself) or do anything destructive.
                If the target takes damage or feels that it is in danger, this effect is \\glossterm<dismissed>.

                \\rankline
                \\rank<5> The area increases to a \\areahuge radius.
                \\rank<7> The area increases to a \\areaext radius.
            """, tags=['Emotion', 'Sustain (standard)']),
            Spell('Enrage', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
                \\hit As a \\glossterm<condition>, the target is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
                For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon a creature.

                \\rankline
                \\rank<3> The accuracy bonus increases to +3.
                \\rank<5> The accuracy bonus increases to +4.
                \\rank<7> The accuracy bonus increases to +5.
            """, tags=['Emotion']),
            Spell('Mass Enrage', 6, 'All \\glossterm<enemies> in a \\areamed radius within \\rngmed range', """
                Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against each target.
                \\hit As a \\glossterm<condition>, each target is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
                For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon a creature.

                \\rankline
                \\rank<8> The range increases to \\rnglong.
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
            Spell('Lightning Bolt', 1, 'Everything in a \\arealarge, 5 ft.\\ wide line from you', """
                Make an attack vs. Reflex against each target.
                \\hit Each target takes electricity \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The area increases to a \\areahuge, 10 ft.\\ wide line from you
                \\rank<5> The area increases to a \\areaext, 15 ft.\\ wide line.
                \\rank<7> The area increases to a 200 ft.\\ long, 20 ft.\\ wide line.
            """, tags=[]),
            Spell('Lightning Grasp', 1, 'One creature or object you \\glossterm<threaten>', """
                This spell does not have the \\glossterm<Focus> tag.

                Make an attack vs. Reflex against the target.
                \\hit The target takes electricity \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=[], focus=False),
            Spell('Discharge', 1, '\\glossterm<Enemies> and objects in a \\areasmall radius from you', """
                Make an attack vs. Reflex against each target.
                \\hit Each target takes electricity \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Lightning Storm', 3, '\\glossterm<Enemies> and objects in a \\areamed radius from you', """
                Make an attack vs. Reflex against each target.
                \\hit Each target takes electricity \\glossterm<standard damage>.

                \\rankline
                \\rank<5> The area increases to a \\arealarge radius.
                \\rank<7> The area increases to a \\areahuge radius.
            """, tags=[]),
            Spell('Electromagnetic Bolt', 3, 'Everything in a \\arealarge, 5 ft.\\ wide line from you', """
                Make an attack vs. Reflex against each target.
                You gain a +2 bonus to accuracy against each target that is wearing metal armor or otherwise carrying or composed of a significant amount of metal.
                \\hit Each target takes electricity \\glossterm<standard damage>.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
            """, tags=[]),
            Spell('Magnetic Blade', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
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
                \\hit Each target takes takes electricity \\glossterm<standard damage> +1d.


                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Energize', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
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
                When you do, make an attack vs Armor against each secondary target.
                \\hit Each secondary target takes electricity \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Attune (self)']),
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

                \\rankline
                \\rank<3> The maximum size of the object increases to Small.
                \\rank<5> The maximum size of the object increases to Medium.
                \\rank<7> The maximum size of the object increases to Large.
            """, tags=['Attune (self)', 'Manifestation']),
        ],
        schools=['Conjuration'],
        lists=['Arcane', 'Pact'],
        spells=[
            Spell('Acid Orb', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes acid \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=['Manifestation']),
            Spell('Cone of Acid', 1, 'Everything in a \\areamed cone from you', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes acid \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Manifestation']),
            Spell('Acid Breath', 4, ['Yourself', 'Everything within a \\arealarge cone'], """
                As a standard action, you can breathe acid like a dragon.
                When you do, make an attack vs Armor against each secondary target.
                \\hit Each secondary target takes acid \\glossterm<standard damage> +1d.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Attune (self)']),
            Spell('Corrosive Orb', 3, 'One creature or object within \\rngmed range', """
                Make an attack vs. Reflex against the target.
                \\hit The target takes acid \\glossterm<standard damage> +1d.
                This attack deals double damage to objects.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Manifestation']),
            Spell('Acid Rain', 4, 'Everything in a \\areasmall radius within \\rngmed range', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes acid \\glossterm<standard damage>.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
            """, tags=['Manifestation']),
            Spell('Forge', 1, 'One unoccupied square within \\rngclose range', """
                Choose a type of body armor, weapon, or shield that you are proficient with.
                You cannot create heavy body armor.
                You create a normal item of that type at the target location.

                The item cannot be constructed of any magical or extraordinary material.
                % This should allow the Giant augment; is this worded to allow that?
                It is sized appropriately for you, up to a maximum of a Medium size item.

                \\rankline
                \\rank<3> You can also create heavy body armor.
                \\rank<5> The item created is magically enhanced.
                    A weapon grants a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities,
                        and armor grants a +1 \\glossterm<magic bonus> to Armor defense.
                \\rank<7> You can cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (self) tag.
            """, tags=['Attune (self)']),
            Spell('Meteor', 4, 'Special', """
                You create a meteor in midair within \\rngclose range that falls to the ground, crushing foes in its path.
                The meteor takes up a \\areasmall radius, and must be created in unoccupied space.
                After being summoned, it falls up to 100 feet before disappearing.
                Make an attack vs. Armor against everything in its path.
                \\hit Each target takes bludgeoning and fire \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
            """, tags=['Manifestation']),
            Spell('Meteor Swarm', 8, 'Special', f"""
                You create up to five meteors in midair within \\rnglong range that each fall to the ground, crushing foes in their paths.
                Each meteor takes up a \\areasmall radius, and must be created in unoccupied space.
                The areas affected by two different meteors cannot overlap.
                If one of the meteors is created in an invalid area, that meteor is not created, but the others are created and dealt their damage normally.

                After being summoned, each meteor falls up to 100 feet before disappearing.
                Make an attack vs. Armor against everything in the path of any meteor.
                \\hit Each target takes bludgeoning and fire \\glossterm<standard damage>.
            """, tags=['Manifestation']),
            Spell('Web', 3, 'All Large or smaller creatures in the area (see text)', """
                You fill a \\areasmall radius \\glossterm<zone> within \\rngclose range with webs.
                The webs make the area \\glossterm<difficult terrain>.
                Each 5-ft.\\ square of webbing has a \\glossterm<wound resistance> equal to twice your \\glossterm<power> and is \\glossterm<vulnerable> to fire damage.

                In addition, make an attack vs. Reflex against each target.
                \\hit Each secondary target is \\glossterm<immobilized> as long as it has webbing from this ability in its space.

                \\rankline
                \\rank<5> The webs are no longer \\glossterm<vulnerable> to fire damage.
                \\rank<7> The wound resistance of each 5-ft.\\ square of webs increases to three times your \\glossterm<power>.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Poison -- Nitharit', 3, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.

                \\hit The target becomes \\glossterm<poisoned> with nitharit.
                The primary effect causes the target to become \\glossterm<sickened>.
                The secondary effect causes the target to become \\glossterm<nauseated>.

                \\rankline
                \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Manifestation']),
            Spell('Poison -- Dragon Bile', 5, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.

                \\hit The target becomes \\glossterm<poisoned> with dragon bile.
                The primary effect causes the target to become \\glossterm<sickened> and lose a \\glossterm<hit point>.
                The secondary effect causes the target to become \\glossterm<nauseated> and lose two \\glossterm<hit points>.

                \\rankline
                \\rank<7> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=[]),
            Spell('Poison -- Black Lotus', 7, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.

                \\hit The target becomes \\glossterm<poisoned> with black lotus extract.
                The primary effect causes the target to become lose a \\glossterm<hit point> from each successful poison attack, including this attack.
                The secondary effect causes the target to gain a \\glossterm<vital wound>.
            """, tags=['Manifestation']),
        ],
        rituals=[
            Spell('Manifest Object', 3, 'One unoccupied square within \\rngclose range', """
                Make a Craft check to create an object of Small size or smaller.
                The object appears out of thin air in the target location.
                % TODO: add ability to create objects of other sizes/materials
                It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.

                This ritual takes one hour to perform.
            """, tags=['Attune (ritual)', 'Manifestation']),
            Spell('Create Sustenance', 3, 'One unoccupied squre within \\rngclose range', """
                This ritual creates food and drink in that square that is sufficient to sustain two Medium creatures per \\glossterm<power> for 24 hours.
                The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.

                This ritual takes one hour to perform.
            """, tags=['AP', 'Creation']),
            Spell('Copy Writing', 1, ['One Small or smaller written work within \\rngclose range', 'One Small or smaller set of blank pages within \\rngclose range'], """
                You copy the writing from the primary target onto the secondary target.
                The secondary target must have enough room for the writing.
                Copying the writing takes a tenth the time required to copy it by hand and requires no writing materials.
            """, tags=['Sustain (standard)']),
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
            Effects('Beautify', 'Yourself', """
                You alter your appearance in minor ways.
                This functions like the \\textit<disguise creature>  ability with a +4 bonus, except that you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \pcref{Disguise Creature}).
                This ability is commonly used to hide blemishes or to appear younger or older than one's true age.

                \\rankline
                \\rank<3> The bonus increases to +6.
                \\rank<5> The bonus increases to +8.
                \\rank<7> The bonus increases to +10.
            """, tags=['Sustain (free)', 'Sensation', 'Visual']),
        ],
        schools=['Illusion'],
        lists=['Arcane'],
        spells=[
            Spell('Dark Shroud', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target takes a -2 penalty to \\glossterm<accuracy> and visual Awareness checks as a \\glossterm<condition>.
                \\crit The target is \\glossterm<blinded> as a \\glossterm<condition>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Sensation', 'Visual']),
            Spell('Blinding Shroud', 6, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

                \\rankline
                \\rank<8> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=['Sensation', 'Visual']),
            Spell('Blur', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                The target's physical outline is distorted so it appears blurred, shifting, and wavering.
                It gains a +1 \\glossterm<magic bonus> to Armor defense and the Stealth skill.
                This effect provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<3> The bonus to Stealth increases to +2.
                \\rank<5> The bonus to Armor defense increases to +2.
                \\rank<7> The bonus to Stealth increases to +4.
            """, tags=['Attune (target)', 'Sensation', 'Visual']),
            Spell('Hidden Blade', 1, 'Yourself or one \\glossterm<ally> within \\rngclose range', """
                You can only cast this spell during the \\glossterm<action phase>.

                The target's weapons become invisible, and its hands are blurred.
                On the next melee \\glossterm<strike> the target makes,
                    the attack roll automatically \\glossterm<explodes>,
                    as if the target was \\glossterm<unaware> of the attack.
                This effect ends at the end of the current round if the target has not made a strike by that time.
                % TODO: wording
                The target is not actually \\glossterm<unaware> of the attack, and this does not work with abilities that have effects if the target is unaware of attacks.
                If you cast this spell on yourself, it affects the first strike you make until the end of the next round.

                This effect provides no offensive benefit against creatures immune to \\glossterm<Visual> abilities.

                \\rankline
                \\rank<3> The strike gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Sensation', 'Visual']),
            Spell('Suppress Light', 1, 'One Small or smaller unattended object within \\rngclose range', """
                This spell suppresses light in a \\areamed radius \\glossterm<emanation> from the target.
                Light within or passing through the area is dimmed to be no brighter than shadowy illumination.
                Any object or effect which blocks light also blocks this spell's \\glossterm<emanation>.

                \\rankline
                \\rank<3> The area increases to a \\arealarge radius \\glossterm<emanation>.
                \\rank<5> The area increases to a \\areahuge radius \\glossterm<emanation>.
                \\rank<7> The area increases to a \\areaext radius \\glossterm<emanation>.
            """, tags=['Attune (self)', 'Sensation']),
            Spell('Conceal', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +3 \\glossterm<magic bonus> to the Stealth skill.

                \\rankline
                \\rank<3> The bonus increases to +4.
                \\rank<5> The bonus increases to +5.
                \\rank<7> The bonus increases to +6.
            """, tags=['Attune (target)', 'Sensation']),
            Spell('Disguise Image', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                You gain a +4 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
                However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.

                \\rankline
                \\rank<5> The bonus increases to +6.
                \\rank<7> The bonus increases to +8.
            """, tags=['Attune (target)', 'Sensation', 'Visual']),
            Spell('Mirror Image', 3, 'Yourself', """
                Four illusory duplicates appear around you that mirror your every move.
                The duplicates shift chaotically in your space, making it difficult to identify your real location.

                % TODO: remove "physical attacks" wording
                All \\glossterm<targeted> \\glossterm<physical attacks> against you have a 50\\% miss chance.
                When an attack misses in this way, it affects an image, destroying it.
                This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.

                \\rankline
                \\rank<5> At the end of each round, one image destroyed in a previous round reappears, up to a maximum of four images.
                \\rank<7> The number of initial and maximum images increases to five.
            """, tags=['Attune (self)', 'Sensation', 'Visual']),
            Spell('Shadow Mantle', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                The target's physical form becomes blurred and shifts in and out of existence.
                This is not a mere trick of the light, but an alteration of reality to make its existence more ambiguous.
                The target gains a +1 \\glossterm<magic bonus> to all defenses and to the Stealth skill.

                \\rankline
                \\rank<6> The bonus to Armor defense and Stealth increases to +2.
                \\rank<8> The bonus to all defenses increases to +2.
            """, tags=['Attune (target)']),
            Spell('Displacement', 7, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                The target's image appears to be two to three feet from its real location.
                % TODO: remove "physical attacks" wording
                \\glossterm<Targeted> \\glossterm<physical attacks> against the target suffer a 50\\% miss chance.
                This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
            """, tags=['Attune (target)', 'Sensation', 'Visual']),
        ],
        rituals=[
            Spell('Magic Mouth', 1, 'Yourself or one large or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
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
                The maximum \\glossterm<damage resistance> of a material you can affect with this ability is equal to your \\glossterm<power>.

                % too short?
                Each time you use this ability, you can accomplish work that would take up to five minutes with a normal Craft check.
            """, tags=[]),
        ],
        schools=['Transmutation'],
        lists=['Arcane', 'Nature', 'Pact'],
        spells=[
            Spell('Baleful Polymorph', 7, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit As a \\glossterm<condition>, the target shrinks by two \\glossterm<size categories> and is \\glossterm<confused>.
            """, tags=[]),
            Spell('Twist Flesh', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target is \\glossterm<sickened> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<nauseated> as a \\glossterm<condition>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=[]),
            Spell('Shrink', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target's size decreases by one size category, to a minimum of Tiny.
                This increases its Stealth and usually decreases its \\glossterm<overwhelm value>, \\glossterm<overwhelm resistance>, and \\glossterm<reach> (see \\pcref<Size in Combat>).
                However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<3> The minimum size category is reduced to Diminuitive.
                \\rank<5> You can decrease the target's size category by up to two size categories.
                \\rank<7> The minimum size category is reduced to Fine.
            """, tags=['Attune (target)']),
            Spell('Spider Climb', 1, 'Yourself', """
                You gain a \\glossterm<climb speed> equal to your \\glossterm<base speed>.
                You also gain a +2 \\glossterm<magic bonus> to Climb checks.

                \\rankline
                \\rank<3> The bonus increases to +4.
                \\rank<5> The bonus increases to +6.
                \\rank<7> The bonus increases to +8.
            """, tags=['Attune (self)']),
            Spell('Stoneskin', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical damage>.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The target also gains a +1 \\glossterm<magic bonus> to Armor defense.
                \\rank<8> The bonus increases to be equal to your \\glossterm<power>.
            """, tags=['Attune (target)']),
            Spell('Regeneration', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                A the end of each round, the target may gain a +1 bonus to the \\glossterm<wound roll> of its most recent \\glossterm<vital wound>.
                If it does, the \\glossterm<wound roll> for that \\glossterm<vital wound> cannot be modified again.

                \\rankline
                \\rank<3> The bonus increases to +2.
                \\rank<5> The bonus increases to +3.
                \\rank<7> The bonus increases to +4.
            """, tags=['Attune (target)']),
            Spell('Enlarge', 4, 'Yourself or one Large or smaller \\glossterm<ally> within \\rngclose range', """
                The target's size increases by one size category.
                This increases its \\glossterm<overwhelm value>, \\glossterm<overwhelm resistance>, and usually increases its \\glossterm<reach> (see \\pcref<Size in Combat>).
                However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The target also gains a +2 \\glossterm<magic bonus> to Strength.
                \\rank<8> You may increase the target by two size categories instead of one.
            """, tags=['Attune (target)']),
            Spell('Alter Appearance', 3, 'Yourself or one large or smaller \\glossterm<ally> within \\rngclose range', """
                You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                You gain a +4 bonus on the check, and you ignore penalties for changing the target's gender, species, subtype, or age.
                However, this effect is unable to alter the target's clothes or equipment in any way.

                \\rankline
                \\rank<5> The bonus increases to +6.
                \\rank<7> The bonus increases to +8.
            """, tags=['Attune (target)']),
            Spell('Craft Object', 4, 'Any number of unattended, nonmagical objects within \\rngclose range', """
                You make a Craft check to transform the targets into a new item (or items) made of the same materials.
                You require none of the tools or time expenditure that would normally be necessary.
                The total size of all targets combined must be Large size or smaller.

                You can apply the Giant \\glossterm<augment> to this spell.
                If you do, it increases the maximum size of all targets combined.

                \\rankline
                \\rank<6> The maximum combined size is increased to Huge.
                \\rank<8> The maximum combined size is increased to Gargantuan.
            """, tags=[]),
            Spell('Disintegrate', 4, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target takes physical \\glossterm<standard damage> +2d.
                In addition, if the target has no hit points remaining at the end of the current \\glossterm<phase>, it dies.
                Its body is completely disintegrated, leaving behind only a pinch of fine dust.
                Its equipment is unaffected.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=[]),
            Spell('Malleable Body', 4, 'Yourself or one \\glossterm<ally> within \\rngclose range', """
                The target's body and equipment becomes highly flexible and malleable, allowing it to compress its body or contort itself into odd shapes.
                It gains a +8 \\glossterm<magic bonus> to the Escape Artist skill, and it is immune to \\glossterm<critical hits> from \\glossterm<strikes>.

                \\rankline
                \\rank<6> The skill bonus increases to +12.
                \\rank<8> The skill bonus increases to +16.
            """, tags=['Attune (target)']),
            Spell('Scent', 3, 'Yourself', """
                You gain the \\glossterm<scent> ability, giving you a +10 bonus to scent-based Awareness checks (see \\pcref<Senses>).

                \\rankline
                \\rank<5> The bonus increases to +15.
                \\rank<7> The bonus increases to +20.
            """, tags=['Attune (self)']),
            Spell('Spikeform', 4, ['Yourself', '\\glossterm<Enemies> adjacent to you (see text)'], """
                You transform your body to have dangerous spikes.
                As a \\glossterm<minor action>, you can extend the spikes to make an attack vs. Armor against each creature adjacent to you.
                At the end of each round, make an attack vs. Armor against each creature adjacent to you.
                \\hit Each secondary target takes piercing \\glossterm<standard damage> -2d.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> -1d.
                \\rank<8> The damage increases to \\glossterm<standard damage>.
            """, tags=['Attune (self)']),
        ],
        rituals=[
            # Should this also be a spell? Incredibly niche, but golem makers
            # would want it...
            Spell('Mending', 1, 'One \\glossterm<unattended> object within \\rngclose range', """
                The target is regains one \\glossterm<hit point>.

                This ritual takes one minute to perform.
            """, tags=['AP']),
            Spell('Fortify', 1, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
                Unlike most abilities, this ritual can affect individual parts of a whole object.

                % How should this affect Strength break DRs?
                The target gains a +5 \\glossterm<magic bonus> to \\glossterm<resistances>.
                If the target is moved, this effect ends.
                Otherwise, it lasts for one year.

                This ritual takes one hour to perform.
            """, tags=['Attune (ritual)']),
            Spell('Enduring Fortify', 4, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
                This ritual functions like the \\spell<fortify> ritual, except that the effect lasts for one hundred years.
            """, tags=['AP']),
            Spell('Enduring Greater Fortify', 5,'Greater Fortify', """
                This ritual functions like the \\spell<greater fortify> ritual, except that the effect lasts for one hundred years.
            """, tags=['AP']),
            Spell('Greater Fortify', 4, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
                This ritual functions like the \\spell<fortify> ritual, except that the bonus to \\glossterm<resistances> increases to 10.
            """, tags=['Attune (ritual)']),
            Spell('Supreme Fortify', 7, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
                This ritual functions like the \\spell<fortify> ritual, except that the bonus to \\glossterm<resistances> increases to 15.
            """, tags=['Attune (ritual)']),
            Spell('Awaken', 6, 'One large or smaller \\glossterm<ally> within \\rngclose range', """
                The target becomes sentient.
                Its Intelligence becomes 1d6 - 5.
                Its type changes from animal to magical beast.
                It gains the ability to speak and understand one language that you know of your choice.
                Its maximum age increases to that of a human (rolled secretly).
                This effect is permanent.

                This ritual takes 24 hours to perform, and requires 50 action points from its participants.
                It can only be learned with the nature \\glossterm<magic source>.
            """, tags=['AP', ]),
            Spell('Ironwood', 4, 'One Small or smaller unattended, nonmagical wooden object within \\rngclose range', """
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
                It casts bright light in up to a 20 foot radius and dim light in twice that radius.
                This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

                \\rankline
                \\rank<3> The maximum radius of bright light increases to 50 feet.
                \\rank<5> The maximum radius of bright light increases to 100 feet.
                \\rank<7> The maximum radius of bright light increases to 200 feet.
            """, tags=['Sensation', 'Visual']),
        ],
        schools=['Illusion'],
        lists=['Arcane', 'Divine', 'Nature', 'Pact'],
        spells=[
            Spell('Flash', 1, 'One creature within \\rngmed range', """
                A burst of light flashes in front of a creature's eyes.
                Bright light illuminates a 50 foot radius around a location in the target's space until the end of the round.
                In addition, make an attack vs. Fortitude against the target.
                \\hit The target is \\glossterm<dazzled> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<blinded> as a \\glossterm<condition>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Sensation', 'Visual']),
            Spell('Searing Light', 1, 'One creature within \\rngclose range', """
                A ray of light flashes between you and the target.
                Bright light illuminates a 50 foot radius around the path the ray took until the end of the round.
                In addition, make an attack vs. Reflex against the target.
                \\hit The target takes energy \\glossterm<standard damage> +1d.

                % This intentionally gives accuracy instead of the more common damage because photomancy isn't supposed to be
                % a high-damage mystic sphere
                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Sensation', 'Visual']),
            Spell('Solar Ray', 4, 'One creature within \\rngclose range', """
                A ray of light flashes between you and the target.
                Bright light illuminates a 50 foot radius around the path the ray took until the end of the round.
                In addition, make an attack vs. Reflex against the target.
                \\hit The target takes energy \\glossterm<standard damage> +2d.
                In addition, the target suffers consequences as if it had been struck by a beam of true sunlight.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=['Sensation', 'Visual']),
            Spell('Blinding Flash', 6, 'One creature within \\rngclose range', """
                A burst of light flashes in front of a creature's eyes.
                Bright light illuminates a 50 foot radius around a location in the target's space until the end of the round.
                In addition, make an attack vs. Fortitude against the target.
                \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

                \\rankline
                \\rank<8> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=['Sensation', 'Visual']),
            Spell('Lightburst', 4, 'All creatures in the area (see text)', """
                A burst of light light fills a \\areasmall radius \\glossterm<zone> within \\rngmed range of you.
                Bright light illuminates a 100 foot radius around the area until the end of the round.
                In addition, make an attack vs. Fortitude against each target creature.
                \\hit Each target is \\dazzled as a \\glossterm<condition>.

                \\rankline
                \\rank<6> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<8> The accuracy bonus increases to +2.
            """, tags=['Sensation', 'Visual']),
            Spell('Sunburst', 6, 'All creatures in the area (see text)', """
                A burst of light light fills a \\areamed radius \\glossterm<zone> within \\rngmed range of you.
                Bright light illuminates a 100 foot radius around the area until the end of the round.
                In addition, make an attack vs. Fortitude against each target creature.
                \\hit Each target is \\dazzled as a \\glossterm<condition>.
                In addition, each target is affected as if it had entered natural sunlight.

                \\rankline
                \\rank<8> The area increases to a \\arealarge radius.
            """, tags=['Sensation', 'Visual']),
            Spell('Pillars of Light', 8, 'All creatures in the area (see text)', """
                A burst of light light fills up to five \\areasmall radius \\glossterm<zones> within \\rngmed range of you.
                Bright light illuminates a 100 foot radius around each area until the end of the round.
                In addition, make an attack vs. Fortitude against each target creature.
                \\hit Each target is \\dazzled as a \\glossterm<condition>.
            """, tags=['Sensation', 'Visual']),
            Spell('Kaleidoscopic Pattern', 5, 'All creatures in the area (see text)', """
                This spell creates a brilliant, rapidly shifting rainbow of lights in a \\areasmall radius within \\rngmed range of you.
                They illuminate a 100 foot radius around the area with bright light until the end of the round.
                In addition, make an attack vs. Mental against each target creature.
                \\hit Each target is \\dazed as a \\glossterm<condition>.
                \\crit Each target is \\disoriented as a \\glossterm<condition>.

                \\rankline
                \\rank<7> The area increases to a \\areamed radius.
            """, tags=['Compulsion', 'Sensation', 'Visual']),
            Spell('Faerie Fire', 1, 'All creatures in a \\areasmall radius within \\rngmed range of you', """
                Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against each target.
                \\hit As a \\glossterm<condition>, each target radiates bright light in a 5 foot radius, as a candle.
                The lights impose a -10 penalty to the Stealth skill.

                \\rankline
                \\rank<3> The accuracy bonus increases to +3.
                \\rank<5> The accuracy bonus increases to +4.
                \\rank<7> The accuracy bonus increases to +5.
            """, tags=['Sensation', 'Visual']),
            Spell('Darkness', 4, None, """
                All light is suppressed within a \\areamed \\glossterm<zone> within \\rngmed range.
                Abilities that work without light, such as \\glossterm<darkvision>, still function normally in the area.

                \\rankline
                \\rank<6> The area increases to a \\arealarge radius.
                \\rank<8> The area increases to a \\areahuge radius.
            """, tags=['Sensation', 'Visual']),
        ],
        rituals=[
            Spell('Mobile Light', 1, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                The target glows like a torch, shedding bright light in a \\areamed radius (and dim light for an additional 20 feet).

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)', 'Sensation']),
            Spell('Permanent Light', 3, 'One Medium or smaller unattended object within \\rngclose range', """
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

                \\rankline
                \\rank<3> The range increases to \\rngmed.
                \\rank<5> The range increases to \\rnglong.
                \\rank<7> The range increases to \\rngext.
            """, tags=[]),
            Effects('Personal Torch', 'Yourself', """
                You create a flame in your hand.
                You can create it at any intensity, up to a maximum heat equivalent to a burning torch.
                At it most intense, it sheds bright light in a 20 foot radius and dim light in an 40 foot radius.
                If you touch a creature or object with it, the target takes fire \\glossterm<standard damage> -2d.
                This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> -1d.
                \\rank<5> The damage increases to \\glossterm<standard damage>.
                \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
            """, tags=[]),
        ],
        schools=['Evocation'],
        lists=['Arcane', 'Nature', 'Pact'],
        spells=[
            Spell('Fireball', 3, 'Everything in a \\areasmall radius within \\rngclose range', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes fire \\glossterm<standard damage>.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
            """, tags=[]),
            Spell('Firebolt', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes fire \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=[]),
            Spell('Scorching Ray', 1, 'One creature within \\rngclose range', """
                Make an attack vs. Reflex against the target.
                \\hit The target takes fire \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=[]),
            Spell('Burning Hands', 1, 'Everything in a \\areamed cone from you', f"""
                Make an attack vs. Armor against each target.
                \\hit Each target takes fire \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Ignition', 1, 'One creature within \\rngmed range', f"""
                Make an attack vs. Fortitude against the target.
                \\hit The target is \\glossterm<ignited> as a \\glossterm<condition>.
                This condition can be removed if the target makes a \\glossterm<DR> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
                Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
                The flames can also be extinguished if the target is drenched in water, takes at least 5 cold damage, or other similar effects.
                \\crit As above, except that the condition cannot be removed without removing the \\glossterm<condition>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=[]),
            Spell('Immolation', 6, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target is \\glossterm<ignited> as a \\glossterm<condition>.

                \\rank<8> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=[]),
            Spell('Heat Metal', 4, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                This attack automatically misses if the target is not wearing metal armor, wielding a metal weapon, or significantly composed of metal.
                \\hit The target is \\glossterm<ignited> as a \\glossterm<condition>.
                The condition can be removed if the target stops touching or being composed of metal of any kind.

                \\rankline
                \\rank<6> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<8> The accuracy bonus increases to +2.
            """, tags=[]),
            Spell('Flame Breath', 4, ['Yourself', 'Everything within a \\arealarge cone'], """
                As a standard action, you can breathe fire like a dragon.
                When you do, make an attack vs Armor against each secondary target.
                \\hit Each secondary target takes fire \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Attune (self)']),
            # Pyromancy specifically doesn't get "enemies only" self-radius
            # spells like most spheres do.
            Spell('Inferno', 1, 'Everything in a \\areamed radius from you', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes fire \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The area increases to a \\arealarge radius.
                \\rank<5> The area increases to a \\areahuge radius.
                \\rank<7> The area increases to a \\areaext radius.
            """, tags=[]),
            Spell('Flame Serpent', 3, 'Everything in a \\areamed, 5 ft.\\ wide shapeable line within \\rngmed range', f"""
                Make an attack vs. Armor against each target.
                \\hit Each target takes fire \\glossterm<standard damage>.

                \\rankline
                \\rank<5> The area increases to a \\arealarge, 10 ft.\\ wide shapeable line.
                \\rank<7> The range increases to \\rnglong.
            """, tags=[]),
            Spell('Flame Aura', 4, ['Yourself', 'Everything in a \\areasmall radius from you (see text)'], """
                Heat constantly radiates in a \\areasmall radius emanation from you.
                As a \\glossterm<minor action>, you can intensify the flames to make an attack vs. Armor against everything in the area.
                \\hit Each secondary target takes fire \\glossterm<standard damage> -2d.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> -1d.
                \\rank<8> The damage increases to \\glossterm<standard damage>.
            """, tags=['Attune (self)']),
            Spell('Flame Blade', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                All damage the target deals with \\glossterm<strikes> becomes fire damage in addition to the attack's normal damage types.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<6> The target also gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes>.
                % May be too strong
                \\rank<8> The power bonus increases to +4.
            """, tags=['Attune (target)']),
            Spell('Wall of Fire', 4, 'Each creature that moves through the area (see text)', """
                You create a wall of fire in a 10 ft.\\ high, \\arealarge \\glossterm<wall> within \\rngmed range.
                The flames and heat make it diffcult to see through the wall, granting \\glossterm<concealment> to targets on the opposite side of the wall.
                When a creature passes through the wall, you make an attack vs. Armor against that creature.
                You can only make an attack in this way against a given creature once per \\glossterm<phase>.
                \\hit The target takes fire \\glossterm<standard damage>.

                Each five-foot square of wall has hit points equal to twice your \\glossterm<power>, and all of its defenses are 0.
                It is immune to most forms of attack, but it can be destroyed by \\glossterm<cold damage> and similar effects that can destroy water.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
            """, tags=['Sustain (minor)']),
            Spell('Heat Wave', 4, None, """
                The temperature in a two mile radius cylinder-shaped \\glossterm<zone> from your location decreases rapidly.
                After one minute, the temperature increases by 50 degrees Fahrenheit, to a maximum of 140 degrees.

                \\rankline
                \\rank<6> The temperature increases by 100 degrees, to a maximum of 160 degrees.
                \\rank<8> The temperature increases by 150 degrees, to a maximum of 180 degrees.
            """, tags=['Attune (self)']),
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
            Effects('Reveal Sensation', 'Yourself', """
                Choose a sense, such as vision or hearing.
                You gain a +4 bonus to Awareness checks using that sense until the end of the next round.

                \\rankline
                \\rank<3> The bonus increases to +6.
                \\rank<5> The bonus increases to +8.
                \\rank<7> The bonus increases to +10.
            """, tags=[]),
            Effects('Reveal Truth', 'Yourself', """
                You may reroll one Knowledge check you made last round.
                You can only cast this spell once per hour.

                \\rankline
                \\rank<3> You also gain a +2 bonus to the Knowledge check.
                \\rank<5> The bonus increases to +4.
                \\rank<7> The bonus increases to +6.
            """, tags=[]),
            # Effects('Remote Sensing', 'One unoccupied location within \\rngmed range', """
            #     This cantrip functions like the \\spell<arcane eye> spell, except that it gains the \\glossterm<Sustain> (minor) tag in place of the \\glossterm<Attune> (self) tag.",
            #     In addition, the sensor cannot be moved after it is originally created.
            # """, tags=['Scrying', 'Sustain (minor)']),
        ],
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        spells=[
            Spell('Purge Invisibility', 3, 'Everything in a \\arealarge radius \\glossterm<emanation> from you', """
                All invisibility effects are \\glossterm<suppressed> on all targets in the area.

                \\rankline
                \\rank<5> The area increases to a \\areahuge radius \\glossterm<emanation>.
                \\rank<7> The area increases to a \\areaext radius \\glossterm<emanation>.
            """, tags=['Attune (self)']),
            Spell('True Strike', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                If the target makes a \\glossterm<strike> during the current phase,
                    it gains a +4 bonus to \\glossterm<accuracy> and rolls twice and takes the higher result.
                If you cast this spell on yourself, it affects the first strike you make until the end of the next round.

                \\rankline
                \\rank<3> The bonus increases to +5.
                \\rank<5> The bonus increases to +6.
                \\rank<7> The bonus increases to +7.
            """, tags=['Swift']),
            Spell('Precognitive Offense', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<5> The target also gains a +2 \\glossterm<magic bonus> to \\glossterm<initiative>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Attune (target)']),
            Spell('Precognitive Defense', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +1 \\glossterm<magic bonus> to Armor defense and Reflex defense.

                \\rankline
                \\rank<3> The bonus to Reflex defense increases to +2.
                \\rank<5> The bonus to Armor defense increases to +2.
                \\rank<7> The bonus to Reflex defense increases to +3.
            """, tags=['Attune (target)']),
            Spell('Discern Lies', 3, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit When you hear the target deliberately and knowingly speaks a lie, you know that the target was lying.
                This ability does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions.

                \\rankline
                \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Sustain (minor)', 'Detection']),
            Spell('Boon of Mastery', 3, 'Yourself', """
                You gain a +2 \\glossterm<magic bonus> to all skills.

                \\rankline
                \\rank<5> The bonus increases to +3.
                \\rank<7> The bonus increases to +4.
            """, tags=['Attune (self)']),
            Spell('Boon of Many Eyes', 3, 'Yourself', """
                You gain a +1 \\glossterm<magic bonus> to \\glossterm<overwhelm resistance>.

                \\rankline
                \\rank<5> The bonus increases to +2.
                \\rank<7> The bonus increases to +3.
            """, tags=['Attune (self)']),
            Spell('Boon of Knowledge', 4, 'Yourself', """
                You gain a +4 \\glossterm<magic bonus> to all Knowledge skills (see \\pcref<Knowledge>).
                In addition, once per hour you may reroll one Knowledge check you make and take the higher result.

                \\rankline
                \\rank<6> The bonus increases to +6.
                \\rank<8> The bonus increases to +8.
            """, tags=['Attune (target)']),
            Spell('Third Eye', 4, 'Yourself', """
                You gain \\glossterm<blindsight> with a 50 foot range.
                This can allow it to see perfectly without any light, regardless of concealment or invisibility.

                \\rankline
                \\rank<6> The range increases to 100 feet.
                \\rank<8> The range increases to 200 feet.
            """, tags=['Attune (self)']),
            Spell('Reveal Weakness', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target's physical weaknesses are highlighted, and openings in its defenses are revealed to attackers moments before they exist.
                It suffers a -2 penalty to Armor defense as a \\glossterm<condition>.
                \\crit As above, except that the penalty is doubled.

                \\rankline
                \\rank<3> The penalty increases to -3.
                \\rank<5> The penalty increases to -4.
                \\rank<7> The penalty increases to -5.
            """, tags=[]),
            Spell('Reveal Vulnerability', 6, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target's vulnerabilities become clear for all to see.
                Its \\glossterm<resistances> are halved as a \\glossterm<condition>.

                \\rankline
                \\rank<8> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=[]),
            Spell('Myriad Visions', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target sees visions of possible futures that confuse its ability to determine reality.
                It is \\glossterm<dazzled> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<blinded> as a \\glossterm<condition>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=[]),
            Spell('Stunning Truth', 5, 'One creature within \\rngmed range', """
                Choose a fact that you know and make an attack vs. Mental against the target.
                If the target does not already know that fact to be true or false,
                    and the target has sufficient cognitive ability to understand the fact,
                    you gain a +2 bonus to \\glossterm<accuracy>.
                Otherwise, you take a -2 penalty to accuracy.
                The fact does not have to be true to gain this bonus.
                \\hit The target's mind is overwhelmed by a total awareness of your chosen fact.
                It is \\glossterm<stunned> as a \\glossterm<condition>.

                \\rankline
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=[]),
            Spell('Alarm', 1, 'One unoccupied square within \\rngmed range', """
                A \\glossterm<scrying sensor> appears floating in the air in the target location.
                The sensor passively observes its surroundings.
                As with other \\glossterm<Scrying> effects, its visual acuity is the same as yours.
                You can choose the minimum size that the alarm will notify you for when you cast this spell.
                If it sees a creature or object of that size or larger moving within 50 feet of it, it will trigger a mental "ping" that only you can notice.
                You must be within 1 mile of the sensor to receive this mental alarm.
                This mental sensation is strong enough to wake you from normal sleep, but does not otherwise disturb concentration.

                \\rankline
                \\rank<3> The sensor gains a +2 bonus to Awareness.
                \\rank<5> The Awareness bonus increases to +4.
                \\rank<7> The Awareness bonus increases to +6.
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Arcane Eye', 1, 'One unoccupied square within \\rngmed range', """
                A \\glossterm<scrying sensor> appears floating in the air in the target location.
                At the start of each round, you choose whether you see and hear from this sensor or from your body.

                While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
                You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

                If undisturbed, the sensor floats in the air in its position.
                During each \\glossterm<movement phase>, you can move the sensor up to 30 feet in any direction, even vertically.
                At the end of each round, if the sensor is does not have \\glossterm<line of effect> from you, it is destroyed.

                \\rankline
                \\rank<3> The sensor is not destroyed if you do not have \\glossterm<line of effect> to it.
                \\rank<5> You constantly receive sensory input from both your body and the sensor.
                \\rank<7> The range increases to \\rnglong.
            """, tags=['Sustain (minor)', 'Scrying']),
            Spell('Clairvoyance', 5, 'One unoccupied square within \\rngmed range (see text)', """
                You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to target a location.
                You must specify a distance and direction to target a location you cannot see.
                This can allow you to cast the spell beyond walls and similar obstacles.

                A \\glossterm<scrying sensor> appears floating in the air in the target location.
                At the start of each round, you choose whether you see and hear from this sensor or from your body.
                While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
                You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

                If undisturbed, the sensor floats in the air in its position.

                \\rankline
                \\rank<7> You constantly receive sensory input from both your body and the sensor.

                % The use of attune (self) is intentional to make the "scout the dungeon exclusively using clairvoyance" plan improbably difficult to pull off
            """, tags=['Attune (self)', 'Scrying']),
            Spell('Reverse Scrying', 3, 'One magical sensor within \\rngmed range', """
                A \\glossterm<scrying sensor> appears at the location of the source of the the ability that created the target sensor.
                At the start of each round, you choose whether you see and hear from this sensor or from your body.
                While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
                You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

                If undisturbed, the sensor floats in the air in its position.
            """, tags=['Sustain (minor)', 'Scrying']),
            Spell('Sensory Chain', 4, 'One creature within \\rngmed range (see text)', """
                Make an attack vs. Mental against the target.
                Whenever you attack a creature with this spell, any additional attacks from this spell automatically fail until the spell ends.
                \\hit As a \\glossterm<condition>, you can see and hear out of the target's eyes and ears instead of your own.
                If the target stops being within 1 mile from you, regardless of intervening barriers
                Whenever the target touches another creature, you can make an attack against the new creature.
                On a hit, the touched creature becomes the new target of this spell and the condition is transferred to it.
                On a miss, the condition remains on the previous creature.


                \\rankline
                \\rank<6> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<8> The accuracy bonus increases to +2.
            """, tags=['Sustain (standard)']),
            # spell to cast spells from the eye instead of from your body?
        ],
        rituals=[
            Spell('Read Magic', 1, 'Yourself', """
                You gain the ability to decipher magical inscriptions that would otherwise be unintelligible.
                This can allow you to read ritual books and similar objects created by other creatures.
                After you have read an inscription in this way, you are able to read that particular writing without the use of this ritual.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual)']),
            Spell('Discern Location', 5, 'Any creature or object on the same plane as you', """
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
            Spell('Interplanar Discern Location', 7, 'Any creature or object on the same plane as you', """
                This ritual functions like the \\ritual<discern location> ritual, except that the target does not have to be on the same plane as you.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<discern location> ritual.

                This ritual takes 24 hours to perform, and it requires 72 action points from its participants.
            """, tags=['AP']),
            Spell('Sending', 4, 'Any creature on the same plane as you', """
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
            Spell('Interplanar Sending', 7, 'Any creature on the same plane as you', """
                This ritual functions like the \\ritual<sending> ritual, except that the target does not have to be on the same plane as you.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<sending> ritual.
            """, tags=['AP', 'Sustain (standard)']),
            Spell('Telepathic Bond', 4, 'Up to five ritual participants', """
                Each target can communicate mentally through telepathy with each other target.
                This communication is instantaneous, though it cannot reach more than 100 miles or across planes.

                % Is this grammatically correct?
                Each target must attune to this ritual independently.
                If a target breaks its attunement, it stops being able to send and receive mental messages with other targets.
                However, the effect continues as long as at least one target attunes to it.
                If you \\glossterm<dismiss> the ritual, the effect ends for all targets.

                This ritual takes one minute to perform.
            """, tags=['Attune (ritual; see text)']),
            Spell('Long-Distance Bond', 6, 'Up to five ritual participants', """
                This ritual functions like the \\ritual<telepathic bond> ritual, except that the effect works at any distance.
                The communication still does not function across planes.
            """, tags=['Attune (ritual; see text)']),
            Spell('Planar Bond', 8, 'Up to five ritual participants', """
                This ritual functions like the \\ritual<telepathic bond> ritual, except that the effect works at any distance and across planes.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<telepathic bond> ritual.
            """, tags=['Attune (ritual; see text)']),
            Spell('Seek Legacy', 3, 'One ritual participant', """
                The target learns the precise distance and direction to their \\glossterm<legacy item>, if it is on the same plane.

                This ritual takes 24 hours to perform, and requires 8 action points from its ritual participants.
            """, tags=['AP']),
            Spell('Scry Creature', 5, 'One creature on the same plane as you', """
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
            Spell('Interplanar Scry Creature', 8, 'One creature on the same plane as you', """
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
                Regardless of the appearance and size chosen, the creature's statistics use the values below.
                If a summoned creature gains a \\glossterm<vital wound> or has no hit points remaining at the end of a phase, it disappears.

                \\begin<itemize>
                    \\item Its \\glossterm<damage resistance> and \\glossterm<wound resistance> are equal to the base values for your level (see \\pcref<Character Advancement>).
                    \\item Its \\glossterm<hit points> are equal to 6.
                    \\item Each of its \\glossterm<defenses> is equal to 4 \\add your level.
                    \\item Its \\glossterm<accuracy> is equal to the higher of your level and Perception.
                    \\item Its \\glossterm<power> with its attacks is equal to your \\glossterm<power>.
                    \\item Its \\glossterm<land speed> is 30 feet.
                    \\item It has no \\glossterm<action points>.
                \\end<itemize>

                Each round, you can choose the creature's actions by mentally commanding it as a \\glossterm<minor action>.
                There are only two actions it can take.
                As a \\glossterm<move action>, it can move as you direct.
                As a standard action, it can make a melee \\glossterm{strike} against a creature it threatens.
                If it hits, it deals physical \\glossterm<standard damage> -2d.
                The subtypes of damage dealt by this attack depend on the creature's appearance.
                Most animals bite or claw their foes, which deals bludgeoning and slashing damage.

                If you do not command the creature's actions, it will continue to obey its last instructions if possible or do nothing otherwise.
                Summoned creatures have no mind or agency, and will not act on their own even if attacked.

                \\rankline
                \\rank<3> The creature gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Earth Elemental', 4, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be an earth elemental and deals bludgeoning damage.
                It has two additional \\glossterm<hit points>, a bonus to \\glossterm<resistances> against \\glossterm<physical damage> equal to half your \\glossterm<power>, and is immune to electricity damage.

                \\rankline
                \\rank<6> The creature gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<8> The accuracy bonus increases to +2.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Water Elemental', 3, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be an water elemental and deals bludgeoning damage.
                It has a 30 foot \\glossterm<swim speed> and suffer no penalties for fighting underwater (see \\pcref<Underwater Combat>).
                In addition, it is \\glossterm<vulnerable> to electricity damage.

                \\rankline
                \\rank<5> The creature gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Air Elemental', 4, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be an air elemental and deals bludgeoning damage.
                It has a 30 foot \\glossterm<fly speed> with good \\glossterm<maneuverability>.

                \\rankline
                \\rank<6> The creature gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<8> The accuracy bonus increases to +2.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Fire Elemental', 6, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be a fire elemental and deals fire damage.
                When it deals fire damage to a creature, that creature is \\glossterm<ignited> as a \\glossterm<condition>.
                This condition can be removed if the target makes a \\glossterm<DR> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
                Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
                The flames can also be extinguished if the target is drenched in water, takes at least 5 cold damage, or other similar effects.

                In addition, the fire elemental is immune to fire damage.

                \\rankline
                \\rank<8> The creature gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Bear', 3, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that the creature appears to be a Medium bear.
                As a standard action, it can make a \\glossterm<grapple> attack against a creature it threatens.
                While grappling, the manifested creature can either make a strike or attempt to escape the grapple.

                \\rankline
                \\rank<5> The creature gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Mount', 3, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that you must also choose an \\glossterm<ally> within \\rngmed range to ride the summoned creature.
                The summoned creature appears to be either a Large horse or a Medium pony.
                It comes with a bit and bridle and a riding saddle, and will only accept the target as a rider.
                The creature follows its rider's directions to the extent that a well-trained horse would and it cannot attack.

                \\rankline
                \\rank<5> The creature gains a +1 bonus to its maximum \\glossterm<hit points>.
                \\rank<7> The hit point bonus increases to +2.
            """, tags=['Attune (target)', 'Manifestation']),
            Spell('Summon Wolfpack', 5, 'One unoccupied square on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon monster> spell, except that it summons a pack of four wolf-shaped creatures instead of a single creature.
                Each creature has a -2 penalty to \\glossterm<accuracy> and \\glossterm<defenses> compared to a normal summoned creature.
                % TODO: wording?
                You must command the creatures as a group, rather than as individuals.
                Each creature obeys your command to the extent it can.

                \\rankline
                \\rank<7> The creature gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Summon Pegasus', 5, 'One unoccupied location on stable ground within \\rngmed range', """
                This spell functions like the \\spell<summon mount> spell, except that the summoned creature appears to be either a Large or Medium pegasus.
                % TODO: wording of "trained as a mount"?
                It has a 30 foot \\glossterm<fly speed> and is trained as a mount.

                \\rankline
                \\rank<7> The creature gains a +1 bonus to its maximum \\glossterm<hit points>.
            """, tags=['Attune (target)', 'Manifestation']),
        ],
        rituals=[
            # weird to have a spell and a ritual but both are useful
            Spell('Ritual Mount', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
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

                \\rankline
                \\rank<3> You can move the target up to ten feet in any direction.
                \\rank<5> The range increases to \\rngmed.
                \\rank<7> You can move the target up to thirty feet in any direction.
            """, tags=['Sustain (standard)']),
        ],
        schools=['Evocation'],
        lists=['Arcane', 'Pact'],
        spells=[
            Spell('Force Slam', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=[]),
            Spell('Force Lance', 1, 'Everything in a \\areamed, 5 ft.\\ wide line from you', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes piercing \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Force Wave', 1, 'Everything in a \\areamed cone from you', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Force Extension', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                Melee weapons wielded by the target gain +5 foot \\glossterm<magic bonus> to \\glossterm<reach>.
                This has no effect on ranged attacks the target makes.

                You can cast this spell as a \\glossterm<minor action>.

                \\rankline
                \\rank<5> The target also gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes>.
                \\rank<7> The bonus to \\glossterm<reach> increases to +10 feet.
            """, tags=['Attune (target)']),
            Spell('Kinetic Impedance', 1, 'One Large or smaller target within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<decelerated> as a \\glossterm<condition>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=[]),
            Spell('Telekinetic Throw', 1, 'One Medium or smaller creature or object within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit You move the target up to 30 feet in any direction.
                    You can change direction partway through the movement.
                    Moving the target upwards costs twice the normal movement cost.

                \\rankline
                \\rank<3> The distance increases to 60 feet.
                \\rank<5> The distance increases to 100 feet.
                \\rank<7> The distance increases to 200 feet.
            """, tags=[]),
            Spell('Telekinetic Lift', 1, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                The target is reduced to half of its normal weight.
                This gives it a +4 \\glossterm<magic bonus> to the Jump skill, if applicable, and makes it easier to lift and move.

                \\rankline
                \\rank<3> The bonus increases to +6.
                \\rank<5> The target is reduced to a quarter of its normal weight. In addition, the bonus increases to +8.
                \\rank<7> The bonus increases to +10.
            """, tags=['Attune (target)']),
            Spell('Levitate', 5, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
                % TODO: Wording
                As long as the target remains within 50 feet above a surface that could support its weight, it floats in midair, unaffected by gravity.
                During the movement phase, you can move the target up to ten feet in any direction as a \\glossterm<free action>.

                \\rankline
                \\rank<7> The maximum height above the surface increases to 100 feet.
            """, tags=['Attune (self)']),
            Spell('Wall of Force', 5, None, """
                You create a wall of telekinetic force in a 10 ft.\\ high, \\arealarge line within \\rngmed range.
                The wall is transparent, but blocks physical passage and \\glossterm<line of effect>.
                Each five-foot square of wall has a \\glossterm<wound resistance> equal to four times your \\glossterm<power> and all of its defenses are 0.

                \\rankline
                \\rank<7> The area increases to a \\areahuge line.
            """, tags=['Attune (self)']),
            Spell('Forcecage', 8, None, """
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
    # Many terramany effects are limited by the requirement that either you or
    # your target must be near earth.
    # Requiring the caster to be near earth is an easily mitigatable downside,
    # so those spells gain no special bonus.
    # Requiring the target to be near earth is a more significant downside,
    # so those spells gain a bonus - generally increased area or range.
    mystic_spheres.append(MysticSphere(
        name="Terramancy",
        short_description="Manipulate earth to crush foes",
        cantrips=[],
        schools=['Conjuration', 'Transmutation'],
        lists=['Arcane', 'Nature'],
        spells=[
            Spell('Rock Throw', 1, 'One creature or object within \\rngmed range', """
                % TODO: define maximum resistance?
                You extract a Tiny chunk from a body of earth or unworked stone within 5 feet of you and throw it at a foe.
                If no such chunk can be extracted, this spell is \\glossterm<miscast>.
                Otherwise, make an attack vs. Armor against the target.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=['Manifestation']),
            Spell('Shrapnel Blast', 1, 'Everything in a \\areamed cone from you', """
                You extract a Tiny chunk from a body of earth or unworked stone within 5 feet of you and blast it at your foes.
                If no such chunk can be extracted, this spell is \\glossterm<miscast>.
                Otherwise, make an attack vs. Armor against each target.
                \\hit Each target takes bludgeoning and piercing \\glossterm<standard damage>.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=['Manifestation']),
            Spell('Earthcraft', 1, 'One body of earth or unworked stone within 5 feet of you', """
                You create a weapon or suit of armor from the target.
                You can create any weapon, shield, or body armor that you are proficient with, and which could normally be made entirely from metal, except for heavy body armor.
                The body targeted must be at least as large as the item you create.
                The item appears in your hands.

                The item functions like a normal item of its type, except that it is twice as heavy.
                If the item loses all of its hit points, this effect is \\glossterm<dismissed>.

                \\rankline
                \\rank<3> You can also create heavy body armor.
                \\rank<5> The item created is magically enhanced.
                    A weapon grants a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities,
                        and armor grants a +1 \\glossterm<magic bonus> to Armor defense.
                \\rank<7> The item's weight is no greater than a normal item of its type.
            """, tags=['Attune (self)']),
            Spell('Earthspike', 3, 'One creature or object within \\rnglong range', """
                You create a spike of earth from the ground.
                Make an attack vs. Armor against the target.
                The target must be within 5 feet of a Small or larger body of earth or stone.
                \\hit The target takes piercing \\glossterm<standard damage> -2d and is \\glossterm<slowed> as a \\glossterm<condition>.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage> -1d.
                \\rank<7> The damage increases to \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Earthcage', 6, 'One Large or smaller creature or object within \\rnglong range', """
                You create a cage of solid arth from the ground.
                Make an attack vs. Reflex against the target.
                The target must be within 5 feet of a Small or larger body of earth or stone.
                \\hit The target is is \\glossterm<immobilized> as a \\glossterm<condition>.

                \\rankline
                \\rank<8> The maximum size increases to Huge.
            """, tags=[]),
            Spell('Meld into Stone', 3, 'One stone object you can touch that is at least as large as your body', """
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
            # TODO: make tremor/fissure/earthquake targeting consistent
            Spell('Tremor', 1, 'All Large or smaller creatures in a \\areamed radius within \\rngmed range that are standing on earth or unworked stone', """
                You create an highly localized tremor that rips through the ground.
                Make an attack vs. Reflex against each target.
                \\hit Each target is knocked \\glossterm<prone>.

                \\rankline
                \\rank<3> The maximum size is increased to Huge.
                \\rank<5> The maximum size is increased to Gargantuan.
                \\rank<7> The maximum size is removed.
            """, tags=[]),
            Spell('Fissure', 5, 'Everything in a \\areamed radius within \\rngmed range that is standing on earth or unworked stone', """
                You create an intense but highly localized tremor that rips through the ground.
                Make an attack vs. Reflex against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.
                Ecah Large or smaller target is also knocked \\glossterm<prone>.

                \\rankline
                \\rank<7> The damage increases to \\glossterm<standard damage>.
            """, tags=[]),
            Spell('Earthquake', 3, '\\glossterm<Enemies> in a \\areamed radius from you that are standing on earth or unworked stone', """
                Make an attack vs. Reflex against each target.
                \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.
                Ecah Large or smaller target is also knocked \\glossterm<prone>.

                \\rankline
                \\rank<5> The area increases to a \\arealarge radius.
                \\rank<7> The area increases to a \\areahuge radius.
            """, tags=[]),
            Spell('Swallowed by Earth', 6, 'One Large or smaller creature within \\rnglong range that is standing on earth or unworked stone', """
                You open up a rift in the ground that swallows and traps a foe.
                Make an attack vs. Reflex against the target.
                \\hit The target is \\glossterm<immobilized>.
                As long as the target is immobilized in this way,
                    it takes bludgeoning \\glossterm<standard damage> -2d at the end of each round.
                This immobilization can be removed by climbing out of the fissure, which requires a \\glossterm<DR> 10 Climb check as a \\glossterm<move action>.
                Alternately, any creature that can reach the target can make a Strength check against the same DR to pull the target out.
                Special movement abilities such as teleportation can also remove the target from the fissure.

                \\rankline
                \\rank<8> The maximum size increases to Huge.
            """, tags=[]),
            Spell('Earthbind', 3, 'One creature within \\rnglong range that is within 100 feet of the ground', """
                Make an attack vs. Fortitude against the target.
                \\hit As a \\glossterm<condition>, the target is pulled towards the ground with great force, approximately quadrupling the gravity it experiences.
                This imposes a -2 penalty to \\glossterm<accuracy>, physical \\glossterm<checks>, and \\glossterm<defenses>.
                In addition, most flying creatures are unable to fly with this increased gravity and crash to the ground.

                \\rankline
                \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=[]),
            Spell('Quagmire', 4, 'All earth and unworked stone in a \\areamed radius within \\rnglong range', """
                % TODO: wording to allow it to affect smaller parts of larger objects
                % TODO: define maximum resistance
                The targets are softened into a thick sludge, creating a quagmire that is difficult to move through.
                The movement cost required to move out of each affected square within the area is quadrupled.
                This does not affect objects under significant structural stress, such as walls and support columns.

                \\rankline
                \\rank<6> The area increases to a \\arealarge radius.
                \\rank<8> The area increases to a \\areahuge radius.
            """, tags=['Sustain (minor)']),
            Spell('Earthen Fortification', 4, None, """
                You construct a fortification made of packed earth within \\rngmed range.
                This takes the form of up to ten contiguous 5-foot squares, each of which is four inches thick.
                The squares can be placed at any angle and used to form any structure as long as that structure is stable.
                Since the fortifications are made of packed earth, their maximum weight is limited, and structures taller than ten feet high are usually impossible.
                % TODO: define hit points and resistances of earth

                The fortifications form slowly, rather than instantly.
                The structure becomes complete at the end of the action phase in the next round after this spell is cast.
                This makes it difficult to trap creatures within structures formed.

                % TODO: define hit points and resistances of stone and metal
                \\rankline
                \\rank<6> You can also construct fortifications from stone.
                This makes them more resistant to attack and allows the construction of more complex structures.
                \\rank<8> You can also construct fortifications from metal.
            """, tags=['Attune (self)', 'Manifestation']),
            Spell('Earthglide', 5, 'Yourself', """
                You can move through earth and unworked stone at a rate of 5 feet per round.
                This does not allow you to breathe while inside the earth or stone, so your ability to traverse long distances may be limited.

                \\rankline
                \\rank<7> Your speed increases to be equal to half your \\glossterm<base speed>.
            """, tags=['Attune (self)']),
            Spell('Entomb', 8, 'One Large or smaller creature within \\rngmed range that is standing on unworked earth or stone', """
                Make an attack vs. Fortitude against the target.
                \\hit The earth rises up and encases the target in six inches of stone.
                The stone blocks both air and \\glossterm<line of effect> to the target unless it is destroyed.
                In addition, the target is \\glossterm<paralyzed> as a \\glossterm<condition>.
            """, tags=['Manifestation']),
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

                \\rankline
                \\rank<3> The bonus increases to +6.
                \\rank<5> The bonus increases to +8.
                \\rank<7> The bonus increases to +10.
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

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Sustain (standard)']),
            Spell('Alter Magic Aura', 1, 'One Large or smaller magical object in \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit One of the target's magic auras is altered (see \pcref{Spellcraft}).
                You can change the school and descriptors of the aura.
                In addition, you can decrease the \\glossterm<power> of the aura by up to half your power, or increase the power of the aura up to a maximum of your power.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Attune (self)']),
            Spell('Suppress Item', 1, 'One Large or smaller magical object in \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit All magical properties the target has are \\glossterm<suppressed>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=['Sustain (minor)']),
            Spell('Dismissal', 3, 'One creature or object within \\rngmed range', """
                Make an attack against the target.
                If the target is an effect of an ongoing \\glossterm<magical> ability, such as a summoned monster or created object, the DR is equal to the \\glossterm<power> of the ability.
                Otherwise, this spell has no effect.
                \\hit The target is treated as if the ability that created it was \\glossterm<dismissed>.
                This usually causes the target to disappear.
                If an \\glossterm<attuned> effect is \\glossterm<dismissed> in this way,
                    the attuning creature can regain the \\glossterm<action point> spent to attune to the spell when it takes a \\glossterm<short rest>.

                \\rankline
                \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=[]),
            Spell('Deattunement', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target stops being \\glossterm<attuned> to one ability of its choice that it is currently attuned to.
                    This ability does not affect attunement to magic items.
                \\crit The target breaks its attunement to all abilities that it is attuned to other than \\glossterm<magic items>.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=[]),
            Spell('Dispel Magic', 3, 'One creature, object, or magical effect within \\rngmed range', """
                Make an attack against the target.
                If you target a creature or object, the attack result is applied to every \\glossterm<magical> effect on the target.
                % Is this clear enough?
                This does not affect the passive effects of any magic items the target has equipped.
                If you target a magical effect directly, the attack result is applied against the effect itself.
                The DR for each effect is equal to the \\glossterm<power> of that effect.
                \\hit Each effect is \\glossterm<dismissed>
                If an \\glossterm<attuned> effect is \\glossterm<dismissed> in this way,
                    the attuning creature can regain the \\glossterm<action point> spent to attune to the spell when it takes a \\glossterm<short rest>.

                \\rankline
                \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Sustain (standard)']),
            Spell('Malign Transferance', 3, ['Yourself or an \\glossterm<ally> within \\rngmed range', 'One other creature within that range'], """
                The primary target must be currently affected by a \\glossterm<magical> \\glossterm<condition>.
                Make an attack vs. Mental against the secondary target.
                \\hit One magical condition of your choice is removed from the primary target and applied to the secondary target.
                \\crit As above, except that you can transfer any number of magical conditions in this way.

                \\rankline
                \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=[]),
            Spell('Malign Confluence', 6, ['Yourself and each \\glossterm<ally> within \\rngmed range', 'One other creature within that range'], """
                Make an attack vs. Mental against the secondary target.
                \\hit One magical condition of your choice is removed from primary target and applied to the secondary target.
                \\crit As above, except that you can transfer any number of magical conditions from each primary target in this way.

                \\rank<8> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=[]),
            Spell('Spell Absoption', 7, 'Yourself', """
                Whenever you are targeted by a spell cast by another creature, before determining if it hits you, you absorb the spell.
                It has no effect on you.
                You cannot voluntarily allow spells to affect you while this effect lasts.
                After you absorb three spells in this way, this effect ends.
            """, tags=['Attune (self)']),
            Spell('Enhance Magic', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                The target gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with spells.

                \\rankline
                \\rank<5> The bonus applies to all \\glossterm<magical> abilities.
                \\rank<7> The bonus increases to +4.
            """, tags=['Attune (target)']),
            # Is this worth the complexity it adds to the system?
            Spell('Antimagic Field', 8, 'Special', """
                All other magical abilities and objects are \\glossterm<suppressed> within a \\areamed radius \\glossterm<emanation> from you.
                % How much of this is redundant with suppression?
                Creatures within the area cannot activate, sustain, or dismiss magical abilities.
                % TODO: wording
                This does not affect aspects of creatures that cannot be suppressed, such as the knowledge of abilities.
                You cannot exclude yourself from this \\glossterm<emanation>.
                However, this spell does not prevent you from sustaining or dismissing this spell.
            """, tags=['Sustain (minor)']),
            # Does having this be Swift break anything?
            Spell('Dimensional Anchor', 3, 'One creature or object within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit The target is unable to travel extradimensionally.
                This prevents all \\glossterm<Manifestation> effects and effects that teleport the target or move it between planes.

                \\rankline
                \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Swift', 'Sustain (minor)']),
            Spell('Dimensional Lock', 6, None, """
                This spell creates a dimensional lock in a \\arealarge radius \\glossterm<zone> from your location.
                Extraplanar travel into or out of the area is impossible.
                This prevents all \\glossterm<Manifestation> effects and effects teleport targets or move them between planes.

                \\rankline
                \\rank<8> The area increases to a \\areahuge radius \\glossterm<zone>.
            """, tags=['Attune (self)']),
            Spell('Teleportation Ward', 4, 'Everything in a \\arealarge radius \\glossterm<emanation> from you (see text)', """
                Teleportation into and out of the area is impossible.
                Any abilities which would cause creatures to teleport within the area have no effect.

                \\rankline
                \\rank<6> The area increases to a \\areahuge radius \\glossterm<emanation>.
                \\rank<8> The area increases to a \\areaext radius \\glossterm<emanation>.
            """, tags=['Attune (self)']),
            Spell('Augmented Spells', 5, 'Yourself', """
                Choose one \\glossterm<augment> you know with a rank modifier of up to +2.
                You can apply the augment once to spells you cast without increasing the minimum rank of those spells.
                If the augment can be applied multiple times, you can apply it again to the same spell, increasing the spell's minimum rank normally.

                \\rankline
                \\rank<7> You can choose an additional \\glossterm<augment> you know with a rank modifier of up to +2.
                Whenever you cast a spell, you can choose which augment to apply for free.
            """, tags=['Attune (self)']),
            Spell('Disrupt Casting', 4, 'One creature within \\rngmed range', """
                Make an attack vs. Mental against the target.
                \\hit As a \\glossterm<condition>, the target has a 50\\% chance to \\glossterm<miscast> any spell it casts.
                \\crit As a \\glossterm<condition>, the target automatically \\glossterm<miscasts> any spell it casts.
            """, tags=[]),
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
                This condition can be removed if the target or a creature that can reach the target makes a \\glossterm<difficulty rating> 5 Strength check break the target free of the plants.
                The target can make this check as a \\glossterm<move action>, while other creatures can make the check as a standard action.

                \\rankline
                \\rank<3> The \\glossterm<difficulty rating> of the Strength check increases to 10.
                \\rank<5> The condition cannot be removed with a check.
                \\rank<7> The attack gains a +1 bonus to \\glossterm<accuracy>.
            """, tags=[]),
            Spell('Embedded Growth', 1, 'One creature within \\rngclose range', """
                You throw a seed that embeds itself in a foe and grows painfully.
                Make an attack vs. Fortitude against the target.
                \\hit As a \\glossterm<condition>, the target takes physical \\glossterm<standard damage> at the end of each \\glossterm<action phase>.
                This condition can be removed if the target or a creature that can reach the target makes a \\glossterm<DR> 5 Heal check as a standard action to remove the seed.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=[]),
            Spell('Fire Seed', 3, 'One unattended acorn or similar seed structure you touch', """
                % Does "seed structure" make sense?
                You transform an unattended acorn or similar seed structure into a small bomb.
                As a standard action, you or another creature can throw the acorn anywhere within \\rngclose range.
                % More accurate version: the acorn has a range increment of 10 feet to hit its target, but that accuracy roll is completely independent of the explosion.
                % Doesn't seem worth the complexity, and implicitly gives the fire seed surprisingly long range since objects are easy to hit.
                On impact, the acorn detonates, and you make an attack vs. Armor against everything within a \\areasmall radius of the struck creature or object.
                \\hit Each target takes fire \\glossterm<standard damage>.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage> +1d. In addition, you can create up to two seed bombs.
                \\rank<7> The damage increases to \\glossterm<standard damage> +2d. In addition, you can create up to three seed bombs.
            """, tags=['Sustain (free)']),
            Spell('Wall of Thorns', 3, 'Each creature that moves through the area (see text)', """
                You create a wall of thorns in 10 ft.\\ high, \\areamed \\glossterm<wall> within \\rngmed range.
                The base of at least half of the wall must be in arable earth.
                The wall is four inches thick, but permeable.
                It provides \\glossterm<cover> to attacks made through the wall.
                Creatures can pass through the wall, though it costs five extra feet of movement to move through the wall.
                When a creature moves through the wall, make an attack vs. Armor against it.
                You can only make an attack in this way against a given creature once per \\glossterm<phase>.
                \\hit The target takes piercing \\glossterm<standard damage> -1d.

                Each five-foot square of wall has hit points equal to three times your \\glossterm<power>, and all of its defenses are 0.
                It is \\glossterm<vulnerable> to fire damage.

                \\rankline
                \\rank<5> The area increases to a \\arealarge shapeable line.
                \\rank<7> The damage increases to \\glossterm<standard damage>.
            """, tags=['Attune (self)']),
            Spell('Plant Growth', 1, 'All plants and arable earth in a \\areamed radius within \\rngmed range', """
                Choose whether you want plants within the area to grow or diminish.

                If you choose for plants to grow, all arable earth within the area becomes \\glossterm<light undergrowth>.
                Light undergrowth within the area is increased in density to \\glossterm<heavy undergrowth>.
                If you choose for plants to diminish, all \\glossterm<heavy undergrowth> in the area is reduced to \\glossterm<light undergrowth>, and all \\glossterm<light undergrowth> is removed.

                When this spell's duration ends, the plants return to their natural size.

                \\rankline
                \\rank<3> The area increases to a \\arealarge radius.
                \\rank<5> The range increases to \\rnglong.
                \\rank<7> The area increases to a \\areahuge radius.
            """, tags=['Sustain (minor)']),
            Spell('Blight', 1, 'One living creature or plant within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                % TODO: is this the right damage type?
                \\hit The target takes acid \\glossterm<standard damage>.
                This damage is doubled if the target is a plant, including plant creatures.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
            """, tags=[]),
            Spell('Shillelagh', 1, 'One nonmagical stick of wood', """
                You transform the target into a club, greatclub, or quarterstaff, as you choose (see \\pcref<Weapons>).
                You cannot change the target's size by more than one size category.
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> on attacks with it.

                \\rankline
                \\rank<3> You also gain +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with the weapon.
                \\rank<5> The power bonus increases to +4.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Attune (self)']),
            Spell('Natural Camouflage', 1, 'Yourself', """
                You gain a +4 \\glossterm<magic bonus> to the Stealth skill while you have \\glossterm<cover> or \\glossterm<concealment> from plants.

                \\rankline
                \\rank<3> The bonus increases to +6.
                \\rank<5> The bonus increases to +8.
                \\rank<7> The bonus increases to +10.
            """, tags=['Sustain (minor)']),
        ],
        rituals=[
            Spell('Fertility', 3, None, """
                This ritual creates an area of bountiful growth in a one mile radius \\glossterm<zone> from your location.
                Normal plants within the area become twice as productive as normal for the next year.
                This ritual does not stack with itself.
                If the \\ritual<infertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.

                This ritual takes 24 hours to perform, and requires 8 action points from its participants.
            """, tags=['AP']),
            Spell('Infertility', 3, None, """
                This ritual creates an area of death and decay in a one mile radius \\glossterm<zone> from your location.
                Normal plants within the area become half as productive as normal for the next year.
                This ritual does not stack with itself.
                If the \\ritual<fertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.

                This ritual takes 24 hours to perform, and requires 8 action points from its participants.
            """, tags=['AP']),
            Spell('Lifeweb Transit', 5, 'Up to five Medium or smaller ritual participants', """
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
            Effects('Ablate Wound', 'Yourself or a living \\glossterm<ally> within \\rngclose range', """
                The target gains a +1 bonus to the \\glossterm<wound roll> of its most recent \\glossterm<vital wound>, up to a maximum of 0.
                The \\glossterm<wound roll> for that \\glossterm<vital wound> cannot be modified again.
            """, tags=[]),
        ],
        schools=['Vivimancy'],
        lists=['Divine', 'Nature'],
        spells=[
            Spell('Seal Wound', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target gains a +2 bonus to the \\glossterm<wound roll> of its most recent \\glossterm<vital wound>.
                The \\glossterm<wound roll> for that \\glossterm<vital wound> cannot be modified again.

                \\rankline
                \\rank<3> The bonus increases to +3.
                \\rank<5> The bonus increases to +4.
                \\rank<7> The bonus increases to +5.
            """, tags=[]),
            Spell('Lifegift', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target increases its maximum \\glossterm<hit points> by 1 and regains that many hit points.
                When this spell ends, the target loses hit points equal to the hit points it regained this way.

                \\rankline
                \\rank<5> The number of additional hit points increases to 2.
                \\rank<7> The number of additional hit points increases to 3.
            """, tags=['Attune (target)']),
            Spell('Cure Serious Wound', 5, 'Yourself or one living \\glossterm<ally> within \\rngclose range', """
                The target removes one \\glossterm<vital wound>.

                \\rankline
                \\rank<7> The target can remove two \\glossterm<vital wounds>.
            """, tags=['AP']),
            Spell('Drain Life', 3, 'One living creature within \\rngclose range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target loses a \\glossterm<hit point>.

                \\rankline
                \\rank<5> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=[]),
            Spell('Harm', 7, 'One creature within \\rngclose range', """
                Make an attack vs. Fortitude against the target.
                \\hit The target loses two \\glossterm<hit points>.
                \\crit As above, and the target gains a \\glossterm<vital wound>.
            """, tags=[]),
            # TODO: make "Undead Bane" spell after figuring out undead / life
            # damage interaction
            Spell('Vital Persistence', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                The target ignores the vital wound effect of its most recent \\glossterm<vital wound>.

                \\rankline
                \\rank<5> You can cast this spell as a \\glossterm<minor action>.
                \\rank<7> The target can ignore the vital wound effect of its two most recent \\glossterm<vital wounds>.
            """, tags=['Attune (target)']),
            Spell('Death Knell', 1, 'One creature within \\rngmed range', """
                Make an attack vs. Fortitude against the target.
                You gain a +2 bonus to \\glossterm<accuracy> against a creature with 3 or fewer current \\glossterm<hit points>.
                \\hit As a \\glossterm<condition>, the target is marked for death.
                It takes a penalty to its \\glossterm<wound resistance> equal to half your \\glossterm<power> against all types of damage.

                \\rankline
                \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
                \\rank<5> The accuracy bonus increases to +2.
                \\rank<7> The accuracy bonus increases to +3.
            """, tags=[]),
            Spell('Circle of Death', 3, 'Living \\glossterm<enemies> in a \\areasmall radius \\glossterm<zone> from your location', """
                When this spell resolves, and the end of each \\glossterm<action phase> in subsequent rounds, make an attack vs. Fortitude against each target.
                You cannot make this attack more than once against any individual target during this spell's duration.
                \\hit As a \\glossterm<condition>, each target is marked for death.
                It takes a penalty to its \\glossterm<wound resistance> equal to half your \\glossterm<power> against all types of damage.

                \\rankline
                \\rank<5> The area increases to a \\areamed radius \\glossterm<zone>.
                \\rank<7> The area increases to a \\arealarge radius \\glossterm<zone>.
            """, tags=['Attune (self)']),
            Spell('Circle of Life', 3, 'Yourself and each living \\glossterm<ally> in a \\glossterm<areasmall> radius \\glossterm<zone> from your location', """
                When this spell resolves, and the end of each \\glossterm<action phase> in subsequent rounds, each target gains a +2 bonus to the \\glossterm<wound roll> of its most recent \\glossterm<vital wound>.
                The \\glossterm<wound roll> for each \\glossterm<vital wound> modified this way cannot be modified again.

                \\rankline
                \\rank<5> The area increases to a \\areamed radius \\glossterm<zone>.
                \\rank<7> The area increases to a \\arealarge radius \\glossterm<zone>.
            """, tags=['Attune (self)']),
        ],
        rituals=[
            Spell('Remove Disease', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                All diseases affecting the target are removed.
            """, tags=['AP']),
            Spell('Restore Senses', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
                One of the target's physical senses, such as sight or hearing, is restored to full capacity.
                This can heal both magical and mundane effects, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).
            """, tags=['AP']),
            Spell('Reincarnation', 5, 'One Diminuitive or larger piece of a humanoid corpse', """
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
            Spell('Fated Reincarnation', 6, 'One Diminuitive or larger piece of a humanoid corpse', f"""
                This ritual functions like the \\ritual<reincarnation> ritual, except that the target is reincarnated as its original species instead of as a random species.

                This ritual takes 24 hours to perform, and requires 50 action points from its participants.
                It is from the Conjuration school in addition to the Vivimancy school.
                In addition, it can only be learned through the nature \\glossterm<magic source>.
            """, tags=['AP', 'Creation']),
            Spell('Purge Curse', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                All curses affecting the target are removed.
                This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
                However, it can allow the target to remove any cursed items it has equipped.

                This ritual takes 24 hours to perform, and requires 8 action points from its participants.
            """, tags=['AP']),
            Spell('Restoration', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
                All of the target's hit points, \\glossterm<subdual damage>, and \\glossterm<vital damage> are healed.
                In addition, any of the target's severed body parts or missing organs grow back by the end of the next round.

                This ritual takes 24 hours to perform, and requires 18 action points from its participants.
            """, tags=['AP']),
            Spell('Resurrection', 4, 'One intact humanoid corpse within \\rngclose range', """
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
            Spell('Complete Resurrection', 6, 'One Diminuitive or larger piece of a humanoid corpse within \\rngclose range', """
                This ritual functions like the \\ritual<resurrection> ritual, except that it does not have to target a fully intact corpse.
                The target must have been part of the original creature's body at the time of death.
                The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

                This ritual takes 24 hours to perform, and requires 50 action points from its participants.
                It is from the Conjuration school in addition to the Vivimancy school.
                In addition, it can only be learned through the divine \\glossterm<magic source>.
            """, tags=['AP', 'Creation']),
            Spell('True Resurrection', 8, 'Special', """
                This ritual functions like the \\ritual<resurrection> ritual, except that it does not require any piece of the corpse.
                Instead, you must explicitly and unambiguously specify the identity of the creature being resurrected.
                The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

                This ritual takes 24 hours to perform, and requires 98 action points from its participants.
                It is from the Conjuration school in addition to the Vivimancy school.
                In addition, it can only be learned through the divine \\glossterm<magic source>.
            """, tags=['AP', 'Creation']),
            Spell('Soul Bind', 6, 'One intact corpse within \\rngclose range', """
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

                \\rankline
                \\rank<3> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with \\glossterm<strikes> using the weapon.
                \\rank<5> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using the weapon.
                \\rank<7> The bonus to accuracy increases to +2.
            """, tags=['Manifestation']),
        ],
        schools=['Conjuration', 'Transmutation'],
        lists=['Arcane', 'Divine', 'Pact'],
        spells=[
            Spell('Proficiency', 1, 'One weapon within \\rngmed range', """
                You gain \\glossterm<proficiency> with one weapon group the target belongs to.

                \\rankline
                \\rank<3> You also gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with the chosen weapon group.
                \\rank<5> You also gain \\glossterm<exotic proficiency> with the chosen weapon group.
                \\rank<7> The accuracy bonus increases to +2.
            """, tags=['Attune (self)']),
            Spell('Mystic Bow', 1, 'One creature or object within \\rngmed range', """
                Make an attack vs. Armor against the target.
                \\hit The target takes piercing \\glossterm<standard damage> +1d.

                \\rankline
                \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
                \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
                \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
            """, tags=['Manifestation']),
            Spell('Missile Storm', 4, 'Everything in a \\areasmall radius within \\rngmed range', """
                Make an attack vs. Armor against each target.
                \\hit Each target takes piercing \\glossterm<standard damage>.

                \\rankline
                \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
                \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
            """, tags=['Manifestation']),
            Spell('Blade Barrier', 3, 'Each creature that moves through the area (see text)', """
                A wall of whirling blades appears within \\rngmed range.
                The wall takes the form of a 10 ft.\\ high, \\arealarge line.
                The wall provides \\glossterm<cover> against attacks made through it.
                When a creature or object passes through the wall, make an attack vs. Armor against it.
                \\hit The target takes slashing \\glossterm<standard damage> -1d.

                \\rankline
                \\rank<5> The damage increases to \\glossterm<standard damage>.
                \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
            """, tags=['Sustain (minor)']),
            Spell('Blade Perimeter', 4, 'Each creature that moves through the area (see text)', """
                A wall of whirling blades appears within \\rngmed range.
                The wall takes the form of a 10 ft.\\ high, \\areamed radius line.
                The wall provides \\glossterm<cover> against attacks made through it.
                When a creature or object passes through the wall, make an attack vs. Armor against it.
                \\hit The target takes slashing \\glossterm<standard damage> -1d.

                % TODO: Clarify interaction with solid obstacles that block contraction?
                \\rankline
                \\rank<6> The wall's radius shrinks by 5 feet at the end of each round, dealing damage to everything it moves through.
                When the wall shrinks to have no radius, this spell ends.
                \\rank<8> After the wall shrinks to have no radius, it begins expanding again at a rate of 5 feet per round.
                Once it expands back to its maximum radius, it begins shrinking again.
            """, tags=['Sustain (minor)']),
            Spell('Summon Weapon', 1, 'One unoccupied square within \\rngmed range', """
                A melee weapon that you are proficient with appears in the target location.
                The weapon floats about three feet off the ground, and is sized appropriately for a creature of your size.
                The specific weapon you choose affects the type of damage it deals.
                Regardless of the appearance and size chosen, the creature's statistics use the values below.
                \\begin<itemize>
                    \\item Its \\glossterm<damage resistance> and \\glossterm<wound resistance> are equal to the base values for your level (see \\pcref<Character Advancement>).
                    \\item Its \\glossterm<hit points> are equal to 6.
                    \\item Each of its \\glossterm<defenses> is equal to 4 \\add your level.
                    \\item Its \\glossterm<accuracy> is equal to the higher of your level and Perception.
                    \\item Its \\glossterm<power> with its attacks is equal to your \\glossterm<power>.
                    \\item Its \\glossterm<fly speed> is 30 feet, with good \\glossterm<maneuverability>.
                    \\item It has no \\glossterm<action points>.
                \\end<itemize>

                If the weapon has no hit points remaining at the end of a phase, it disappears.

                Each round, the weapon automatically moves towards the creature closest to it during the \\glossterm<movement phase>.
                During the \\glossterm<action phase>, it makes a melee \\glossterm<strike> against a random creature adjacent to it.
                Its accuracy is equal to your \\glossterm<accuracy>.
                If it hits, it deals \\glossterm<standard damage> -1d.

                \\rankline
                \\rank<3> The damage dealt by the weapon increases to \\glossterm<standard damage>.
                \\rank<5> The damage dealt by the weapon increases to \\glossterm<standard damage> +1d.
                \\rank<7> The damage dealt by the weapon increases to \\glossterm<standard damage> +2d.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Aerial Weapon', 3, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that the weapon's maximum height above the ground is increased to 100 feet.
                This allows the weapon to fly up to fight airborne foes.

                \\rankline
                \\rank<5> The damage dealt by the weapon increases to \\glossterm<standard damage>.
                \\rank<7> The weapon has no maximum height above the ground.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Create Ballista', 3, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that it creates a fully functional Large ballista instead of a weapon of your choice.
                The ballista functions like any other weapon, with the following exceptions.

                It cannot move, and makes ranged \\glossterm<strikes> instead of melee strikes.
                Its attacks have a maximum range of 100 feet and deal piercing damage.
                In addition, the ballista attacks the creature farthest from it, instead of the creature closest to it.

                \\rankline
                \\rank<5> The damage dealt by the ballista increases to \\glossterm<standard damage>.
                \\rank<7> The ballista gains a second bolt track, allowing it to fire at two dfiferent targets.
                It canot fire at the same target twice.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Giant Blade', 4, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that the weapon takes the form of a Large greatsword.
                The weapon's attacks hit everything in a \\areasmall cone from it.
                It aims the cone to hit as many creatures as possible.

                \\rankline
                \\rank<6> The damage dealt by the weapon increases to \\glossterm<standard damage>.
                \\rank<8> The damage dealt by the weapon increases to \\glossterm<standard damage> +1d.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Titan Blade', 7, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that the weapon takes the form of a Gargantuan greatsword.
                The weapon's attacks hit everything in a \\areamed cone from it.
                It aims the cone to hit as many creatures as possible.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Paired Weapons', 8, 'One unoccupied square within \\rngmed range', """
                This spell functions like the \\spell<summon weapon> spell, except that you summon two weapons instead of one.
                Each weapon attacks independently.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Spell('Animated Weapon', 4, 'Yourself', """
                As a \\glossterm<minor action>, you can make a \\glossterm<magical strike> with a -2 penalty to \\glossterm<accuracy> and a -2d penalty to damage.

                \\rankline
                \\rank<6> The damage penalty is reduced to -1d.
                \\rank<8> The accuracy penalty is reduced to -1.
            """, tags=['Attune (self)']),
            Spell('Shieldbearer', 1, 'Yourself', """
                You gain a +1 \\glossterm<magic bonus> to Armor defense.

                \\rankline
                \\rank<3> You are not considered \\glossterm<defenseless> as long as you are not \\glossterm<unaware>, even if you are not wielding a weapon or shield.
                \\rank<5> The bonus increases to +2.
                \\rank<7> You are not considered \\glossterm<defenseless> even if you are \\glossterm<unaware>.
            """, tags=['Attune (self)', 'Manifestation']),
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
