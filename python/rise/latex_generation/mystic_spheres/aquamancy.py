from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: buff
# Secondary: damage
# Tertiary: debuff
# None: utility
aquamancy=MysticSphere(
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
        Effects('Detect Water', None, """
            You learn the approximate distance and direction to any bodies of water within \\rnglong \\glossterm<range> of you.
            This spell can detect bodies of water with a minimum size of Fine.

            \\rankline
            \\rank<3> The range increases to \\rngext.
            \\rank<5> The range increases to 2,000 feet.
            \\rank<7> The range increases to 5,000 feet.
        """, tags=['Detection']),
        Effects('Purify Water', 'Up to five gallons of water within \\rngclose range', """
            You can separate out dirt, sand, and minor pollutants from the target water, moving the waste material to the edge of the water so falls out or can be easily removed.
            This does not remove poisons, magical effects, or contaminants heavier than half a pound.
            Using this on a very large body of water is difficult, since the waste material can easily mix with the water unaffected by a single casting of this spell.

            \\rankline
            \\rank<3> The volume affected increases to ten gallons.
            \\rank<5> The volume affected increases to twenty gallons.
            \\rank<7> The volume affected increases to fifty gallons.
        """, tags=['Manifestation']),
        Effects('Slippery Escape', 'Yourself', """
            You gain a +4 bonus to the Flexibility skill until the end of the next round.

            \\rankline
            \\rank<3> The bonus increases to +6.
            \\rank<5> The bonus increases to +8.
            \\rank<7> The bonus increases to +10.
        """, tags=['Manifestation']),
    ],
    lists=['Nature'],
    spells=[
        Spell('Dessicating Curse', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental agains the target.
            \\hit Until it takes a \\glossterm<short rest>, the target is \\glossterm<sickened>.
            If the target immerses itself in or drinks a body of water of minimum size equal to two size categories smaller than the target,
                it stops being sickened for 10 minutes.
            \\crit As above, except that the effect lasts until this curse is removed.

            \\rankline
            \\rank<5> On a \\glossterm<critical hit>, the target is \\glossterm<nauseated> instead of \\glossterm<sickened>.
            \\rank<7> The target is nauseated instead of sickened.
        """, tags=['Curse']),
        Spell('Sphere of Constraint', 5, 'All Huge or smaller \\glossterm<enemies> completely within a \\areamed radius within \\rngmed range', """
            You create a sphere of water that contracts to stick to enemies in the area.
            Unlike most abilities, this ability only affects creatures whose entire space is within the area.
            Make an attack vs. Reflex against each target.
            \\hit Until the end of the next round, the majority of the target's body is surrounded by a layer of water.
            This does not impede the target's ability to breathe, but it takes penalties as if it was fighting underwater (see \\pcref<Underwater Combat>).
            \\crit As above, except that the effect is a \\glossterm<condition> instead of lasting until the end of the next round.

            \\rankline
            \\rank<7> The maximum size increases to Gargantuan.
        """, tags=['Manifestation']),
        Spell('Constraining Bubble', 3, 'One Large or smaller creature within \\rngmed range', """
            Make an attack vs. Reflex against the target.
            \\hit As a \\glossterm<condition>, the majority of the target's body is surrounded by a layer of water.
            This does not impede the target's ability to breathe, but it takes penalties as if it was fighting underwater (see \\pcref<Underwater Combat>).

            \\rankline
            \\rank<5> The maximum size increases to Huge.
            \\rank<7> The maximum size increases to Gargantuan.
        """, tags=['Manifestation']),
        Spell('Crushing Wave', 1, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Manifestation']),
        Spell('Great Flood', 3, 'Everything in a \\arealarge, 10 ft.\\ wide line from you', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The area increases to a \\areahuge, 10 ft.\\ wide line from you.
            \\rank<7> The area increases to a \\areahuge, 20 ft.\\ wide line from you.
        """, tags=['Manifestation']),
        Spell('Water Jet', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            You may move up to 20 feet away from the target as the water propels you backwards.
            Moving yourself upwards costs twice the normal movement cost.
            \\hit The target takes bludgeoning \\glossterm<standard damage>.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
        """, tags=['Manifestation']),
        Spell('Fountain', 1, '\\glossterm<Enemies> within a \\areasmall radius from you', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Manifestation']),
        Spell('Wall of Water', 4, None, """
            You create a wall of water in a 20 ft.\\ high, \\arealarge line within \\rngmed range.
            The wall is four inches thick, and blocks \\glossterm<line of effect> for abilities.
            Sight through the wall is possible, though distorted.
            The wall provides both \\glossterm<cover> and \\glossterm<concealment> to targets on the opposite side of the wall, for a total of a +4 bonus to Armor defense.
            Creatures can pass through the wall unharmed, though it costs five extra feet of movement to move through the wall.

            Each five-foot square of wall has a \\glossterm<vital resistance> equal to three times your \\glossterm<power> and all of its defenses are 0.

            \\rankline
            \\rank<6> The area of the wall increases to a \\areahuge line.
            \\rank<8> The area of the wall increases to a \\areaext line.
        """, tags=['Sustain (minor)', 'Manifestation']),
        Spell('Underwater Freedom', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target suffers no penalties for acting underwater, except for those relating to using ranged weapons.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The target can also breathe water as if it was air.
            \\rank<5> The target also gains a swim speed equal to half its \\glossterm<base speed>.
            \\rank<7> The swim speed increases to be equal to the target's \\glossterm<base speed>.
        """, tags=['Attune (target)']),
        Spell('Raging River', 3, 'Everything in a \\arealarge, 10 ft. wide line from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes bludgeoning \\glossterm<standard damage> -2d and is \\glossterm<pushed> 20 feet in the direction the line points away from you.
            Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.

            \\rankline
            % TODO: wording
            \\rank<5> The area increases to a \\areahuge, 20 ft. wide line from you.
            \\rank<7> Each struck target is pushed 50 feet instead of 20 feet.
        """, tags=[]),
        Spell('Geyser', 3, 'Everything in a \\arealarge, 5 ft.\\ wide vertical line within \\rngmed range', """
            Make an attack vs. Armor against each target.
            If this spell has its area increased, such as with the Widened \\glossterm<augment>, only the length of the line increases.
            \\hit Each target takes takes bludgeoning \\glossterm<standard damage>.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
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

            \\rankline
            \\rank<6> You can exclude an inner radius of any size from the area, allowing you to create fog that surrounds you without blocking sight to things adjacent to you.
            \\rank<8> The area increases to a \\arealarge radius \\glossterm<zone>.
        """, tags=['Attune (self)']),
        Spell('Octopus Tentacles', 5, 'Yourself', """
            This spell functions like the \\textit<aqueous tentacles> spell, except that you create eight tentacles.
            Whenever you make a \\glossterm<strike> with the tentacles, you can attack with all of the tentacles at once, with each tentacle attacking a different target.
            This functions as if your attacks had the \\glossterm<Sweeping> (7) tag, with no limit on how far each secondary target must be from the primary target (see \\pcref<Sweeping>).

            \\rankline
            \\rank<7> You gain a +5 bonus to \\glossterm<reach> with attacks using the tentacles.
        """, tags=['Attune (self)']),
        Spell('Aqueous Tentacles', 1, 'Yourself', """
            You grow watery tentacles from your body.
            The tentacles grant you a slam \\glossterm<natural weapon> (see \\tref<Natural Weapons>).
            The natural weapon deals +2d damage, as normal for a slam natural weapon.
            In addition, it has the Reach \\glossterm<weapon tag> and does not require a \\glossterm<free hand> to use (see \\pcref<Weapon Tags>).
            Strikes using the tentacles are considered \\glossterm<magical> abilities, which means you use your \\glossterm<power> with \\glossterm<magical> abilities to determine their damage.

            \\rankline
            \\rank<3> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with attacks using the tentacles.
            \\rank<5> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with attacks using the tentacles.
            \\rank<7> You gain a +5 bonus to \\glossterm<reach> with attacks using the tentacles.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Dessicate', 4, 'One creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes physical \\glossterm<standard damage> and is \\glossterm<sickened> as a \\glossterm<condition>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=[]),
        Spell('Aqueous Form', 4, 'Yourself', """
            You transform your body and equipment into water, allowing you to compress your body or contort yourself into odd shapes.
            This has the following effects:
            \\begin<itemize>
                \\item You gain a \\glossterm<swim speed> equal to your \\glossterm<base speed>
                \\item You gain a +8 \\glossterm<magic bonus> to the Flexibility skill
                \\item You are immune to \\glossterm<critical hits> from \\glossterm<strikes>
                \\item Your \\glossterm<wound resistance> against \\glossterm<physical damage> is halved.
            \\end<itemize>

            \\rankline
            \\rank<6> The skill bonus increases to +12.
            \\rank<8> The skill bonus increases to +16.
        """, tags=['Attune (self)']),
        Spell('Aquatic Propulsion', 1, 'Yourself', """
            You release a blast of water away from you, throwing you in the other direction.
            You \\glossterm<push> yourself up to 50 feet in any direction.
            You cannot change the direction of the movement partway through.
            Moving yourself upwards costs twice the normal movement cost.
            This movement is doubled underwater instead of being dramatically slowed like normal for forced movement.

            \\rankline
            \\rank<3> The distance increases to 100 feet.
            \\rank<5> You gain a +2 bonus to Armor defense during the current phase.
            \\rank<7> The distance increases to 300 feet.
        """, tags=[]),
        Spell('Fog Cloud', 3, 'Everything in a \\areamed radius within \\rngmed range', """
            A cloud of fog appears in the area.
            All sight through the area is partially obscured, granting \\glossterm<concealment> to anything in the area and anything viewed through the area (see \\pcref<Concealment>).

            \\rankline
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The range increases to \\rnglong.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Fog Wall', 1, None, """
            You create a wall of fog in a 20 ft.\\ high, \\arealarge \\glossterm<wall> within \\rngmed range.
            The fog makes it difficult to see through the wall, granting \\glossterm<concealment> to anything viewed through the wall (see \\pcref<Concealment>).

            \\rankline
            \\rank<3> The area increases to a \\arealarge line.
            \\rank<5> The area increases to a \\areahuge line.
            \\rank<7> The area increases to a \\areaext line.
        """, tags=['Manifestation', 'Sustain (minor)']),
    ],
    rituals=[
        Spell('Dampen', 1, 'Up to five ritual participants', """
            Each target gains a \\glossterm<magic bonus> equal to your \\glossterm<power> to \\glossterm<resistances> against fire damage.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
        Spell('Water Breathing', 3, 'One Medium or smaller ritual participant', """
            The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
    ],
    category='damage',
)
