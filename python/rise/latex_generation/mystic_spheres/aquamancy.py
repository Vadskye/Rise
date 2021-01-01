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
        Effects('Create Water', 'Any number of locations within \\rngshort range', """
            You create up to two gallons of wholesome, drinkable water at the target locations, allowing you to fill multiple small water containers.
            You must create a minimum of one ounce of water in each location.
        """, scaling="""
            \\rank<2> The volume created increases to five gallons.
            \\rank<4> The volume created increases to ten gallons.
            \\rank<6> The volume created increases to twenty gallons.
        """, tags=['Creation']),
        Effects('Manipulate Water', None, """
            You can manipulate water within \\rngshort range of you.
            This allows you to increase or decrease the speed it travels by up to 5 miles per hour in any contiguous area within that range.
            If you decrease the water's speed to 0, you can increase it again with the remainder of your speed change and choose any direction for it to travel.

            In addition to allowing you to change the direction of currents within large bodies of water, you can also use this to propel water across surfaces.
            Generally, moving water uphill requires at least 5 miles per hour of speed for every foot of elevation that you are trying to climb, which can limit your ability to move water up large distances.
        """, scaling="""
            \\rank<2> The range increases to \\rngmed, and the maximum speed change increases to 10 miles per hour.
            \\rank<4> The range increases to \\rnglong, and the maximum speed change increases to 20 miles per hour.
            \\rank<6> The range increases to \\rngdist, and the maximum speed change increases to 40 miles per hour.
        """, tags=['Sustain (minor)']),
        Effects('Purify Water', 'Up to five gallons of water within \\rngshort range', """
            You can separate out dirt, sand, and minor pollutants from the target water, moving the waste material to the edge of the water so falls out or can be easily removed.
            This does not remove poisons, magical effects, or contaminants heavier than half a pound.
            Using this on a very large body of water is difficult, since the waste material can easily mix with the water unaffected by a single casting of this spell.
        """, scaling="""
            \\rank<2> The volume affected increases to ten gallons.
            \\rank<4> The volume affected increases to twenty gallons.
            \\rank<6> The volume affected increases to fifty gallons.
        """, tags=['Manifestation']),
        Effects('Slippery Escape', 'Yourself', """
            You gain a +4 bonus to the Flexibility skill until the end of the next round.
        """, scaling="""
            \\rank<2> The bonus increases to +6.
            \\rank<4> The bonus increases to +8.
            \\rank<6> The bonus increases to +10.
        """, tags=['Manifestation']),
    ],
    lists=['Nature'],
    spells=[
        Spell('Desiccating Curse', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit Until it takes a \\glossterm<short rest>, the target is \\glossterm<sickened>.
            If the target immerses itself in or drinks a body of water of minimum size equal to two size categories smaller than the target,
                it stops being sickened for 10 minutes.
            \\crit As above, except that the effect lasts until this curse is removed.
            \\glance As above, except that the effect is removed at the end of the next round.
        """, scaling="accuracy", tags=['Curse']),
        Spell('Sphere of Constraint', 5, 'All creatures completely within a \\areasmall radius within \\rngmed range', """
            You create a sphere of water that contracts to stick to enemies in the area.
            Unlike most abilities, this ability only affects creatures whose entire space is within the area.
            Make an attack vs. Reflex against each target.
            \\hit Until the end of the next round, the majority of the target's body is surrounded by a layer of water.
            This does not impede the target's ability to breathe, but it takes penalties as if it was fighting underwater (see \\pcref<Underwater Combat>).
            \\crit As above, except that the effect is a \\glossterm<condition> instead of lasting until the end of the next round.
        """, scaling="accuracy", tags=['Manifestation']),
        # fighting underwater is slightly more detrimental than the standard
        # rank 2 condition, but Large or smaller is a significant restriction
        # and the crit effect is irrelevant in many fights, so this stays +0
        Spell('Constraining Bubble', 4, 'One Large or smaller creature within \\rngmed range', """
            Make an attack vs. Reflex against the target.
            \\hit As a \\glossterm<condition>, the majority of the target's body is surrounded by a layer of water.
            This does not impede the target's ability to breathe, but it takes penalties as if it was fighting underwater (see \\pcref<Underwater Combat>).
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the water also covers the target's face.
            This does not meaningfully impede its sight, but it prevents it from breathing anything other than the water.
        """, scaling="accuracy", tags=['Manifestation']),
        Spell('Crushing Wave', 1, 'Everything in a \\areasmall, 10 ft.\\ wide line from you', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning damage equal to 1d8 plus half your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Crushing Tide', 3, 'Everything in a \\arealarge, 10 ft.\\ wide line from you', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Water Jet', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            You may move up to 20 feet away from the target as the water propels you backwards.
            Moving yourself upwards costs twice the normal movement cost.
            \\hit The target takes bludgeoning damage equal to 1d8 plus your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Aquajet Blast', 3, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            You may move up to 50 feet away from the target as the water propels you backwards.
            Moving yourself upwards costs twice the normal movement cost.
            \\hit The target takes bludgeoning damage equal to 2d6 plus your \\glossterm<power>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Fountain', 1, 'Everything within a \\areasmall radius from you', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes bludgeoning damage equal to 1d8 plus half your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Great Fountain', 3, '\\glossterm<Enemies> within a \\areamed radius from you', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes bludgeoning damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Wall of Water', 3, None, """
            You create a wall of water in a 15 ft.\\ high, \\areamed line within \\rngmed range.
            The wall is four inches thick, and blocks \\glossterm<line of effect> for abilities.
            Sight through the wall is possible, though distorted.
            The wall provides both \\glossterm<cover> and \\glossterm<concealment> to targets on the opposite side of the wall, for a total of a +4 bonus to Armor defense.
            Creatures can pass through the wall unharmed, though it costs five extra feet of movement to move through the wall.

            Each five-foot square of wall has \\glossterm<hit points> equal to three times your \\glossterm<power> and all of its defenses are 0.
        """, scaling="""
            \\rank<5> The area of the wall increases to a \\arealarge line.
            \\rank<7> The area of the wall increases to a \\areahuge line.
        """, tags=['Sustain (minor)', 'Manifestation']),
        Spell('Underwater Freedom', 2, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target suffers no penalties for acting underwater, except for those relating to using ranged weapons.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The target also gains a swim speed equal to half its \\glossterm<base speed>.
        """, tags=['Attune (target)']),
        # +2 levels for push
        Spell('Raging River', 4, 'Everything in a \\areamed, 10 ft. wide line from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes 2d8 bludgeoning damage.
            In addition, each target is \\glossterm<pushed> 20 feet in the direction the line points away from you.
            Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        # +3 levels for push
        Spell('Raging Flood', 7, 'Everything in a \\arealarge, 15 ft. wide line from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes 4d8 bludgeoning damage.
            In addition, each target is \\glossterm<pushed> 50 feet in the direction the line points away from you.
            Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
            \\glance As above, except that that each target takes half damage.
        """, tags=['Manifestation']),
        Spell('Geyser', 3, 'Everything in a \\areamed, 5 ft.\\ wide vertical line within \\rngmed range', """
            Make an attack vs. Armor against each target.
            If this spell has its area increased, only the length of the line increases.
            % Normal dice, but half power due to vertical line
            \\hit Each target takes takes bludgeoning damage equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Rainstorm', 2, 'Everything in the area (see text)', f"""
            Torrential rain begins falling out of thin air within a \\areamed radius \\glossterm<zone> from your location.
            The rain extinguishes minor fires such as campfires and torches on contact.
            Everything in the area gain a bonus equal to your \\glossterm<power> to \\glossterm<resistances> against fire damage.
        """, scaling="""
            \\rank<4> The area increases to a \\arealarge radius \\glossterm<zone>.
            \\rank<6> The area increases to a \\areahuge radius \\glossterm<zone>.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Obscuring Mist', 2, None, """
            Fog fills the air within a \\areasmall radius \\glossterm<zone> from your location.
            The fog partially obstructs sight, granting \\glossterm<concealment> to anything seen through the fog (see \\pcref<Concealment>).
        """, scaling="""
            \\rank<4> The area increases to a \\areamed radius \\glossterm<zone>.
            \\rank<6> The area increases to a \\arealarge radius \\glossterm<zone>.
        """, tags=['Sustain (minor)']),
        Spell('Ring of Mist', 6, None, """
            Fog fills the air within a \\areamed radius \\glossterm<zone> from your location.
            The fog partially obstructs sight, granting \\glossterm<concealment> to anything seen through the fog (see \\pcref<Concealment>).
            You can exclude an inner radius of any size from the area, allowing you to create fog that surrounds your location without blocking sight to things near to you.
        """, tags=['Sustain (minor)']),
        Spell('Misty Shroud', 4, None, """
            Fog fills the air within a \\areasmall radius \\glossterm<emanation> from your location.
            The fog partially obstructs sight, granting \\glossterm<concealment> to anything seen through the fog (see \\pcref<Concealment>).
        """, scaling="""
            \\rank<6> The area increases to a \\areamed radius \\glossterm<emanation>.
        """, tags=['Attune (self)']),
        Spell('Octopus Tentacles', 5, 'Yourself', """
            This spell functions like the \\textit<aqueous tentacles> spell, except that you create eight tentacles that extend from your body.
            Whenever you make a \\glossterm<strike> with the tentacles, you can attack with all of the tentacles at once, with each tentacle attacking a different target.
            This functions as if your attacks had the \\glossterm<Sweeping> (7) tag, with no limit on how far each secondary target must be from the primary target (see \\pcref<Sweeping>).
        """, scaling="""
            \\rank<7> You gain a +5 bonus to \\glossterm<reach> with attacks using the tentacles.
        """, tags=['Attune (self)']),
        Spell('Aqueous Tentacle', 2, 'Yourself', """
            You grow a massive watery tentacle that extends from your body.
            The tentacle grants you a slam \\glossterm<natural weapon> (see \\tref<Natural Weapons>).
            The natural weapon deals 1d10 damage, as normal for a slam natural weapon.
            In addition, it has the Reach \\glossterm<weapon tag> (see \\pcref<Weapon Tags>).
            Strikes using the tentacle are considered \\glossterm<magical> abilities, which means you use your \\glossterm<magical> \\glossterm<power> to determine their damage.
        """, scaling="""
            \\rank<4> You gain a +5 foot bonus to \\glossterm<reach> with attacks using the tentacle.
            \\rank<6> The bonus to reach increases to 10 feet.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Dehydrate', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 1d6 physical damage.
            If it loses hit points from this damage, it is \\glossterm<nauseated> as a \\glossterm<condition>.
        """, scaling="damage", tags=[]),
        Spell('Wave of Dehydration', 3, 'Creatures in a \\arealarge, 10 ft. wide line from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target that has no remaining \\glossterm<resistance> to physical damage is \\glossterm<nauseated> as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="accuracy", tags=[]),
        Spell('Desiccate', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes physical damage equal to 2d8 plus half your \\glossterm<power>.
            If it loses hit points from this damage, it is \\glossterm<nauseated> as a \\glossterm<condition>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Excsiccate', 7, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes physical damage equal to 4d10 plus your \\glossterm<power>.
            If it loses hit points from this damage, it is \\glossterm<nauseated> as a \\glossterm<condition>.
            \\glance As above, except that that the target takes half damage.
        """, tags=[]),
        Spell('Aqueous Form', 4, 'Yourself', """
            You transform your body and equipment into water, allowing you to compress your body or contort yourself into odd shapes.
            This has the following effects:
            \\begin<itemize>
                \\item You gain a \\glossterm<swim speed> equal to your \\glossterm<base speed>.
                \\item You gain a +8 \\glossterm<magic bonus> to the Flexibility skill. In addition, the minimum size you can squeeze down to is reduced to one inch, which can dramatically improve your ability to squeeze through tight spaces.
                \\item You are immune to \\glossterm<critical hits> from \\glossterm<strikes>.
                \\item Your \\glossterm<resistance> to \\glossterm<physical damage> is reduced to 0.
            \\end<itemize>
        """, scaling="""
            \\rank<6> The bonus to Flexibility increases to +12.
        """, tags=['Attune (self)']),
        Spell('Aquatic Propulsion', 1, 'Yourself', """
            You release a blast of water away from you, throwing you in the other direction.
            You \\glossterm<push> yourself up to 50 feet in any direction.
            You cannot change the direction of the movement partway through.
            Moving yourself upwards costs twice the normal movement cost.
            This movement is doubled underwater instead of being dramatically slowed like normal for forced movement.
        """, scaling="""
            \\rank<3> The distance increases to 100 feet.
            \\rank<5> The distance increases to 200 feet.
            \\rank<7> The distance increases to 300 feet.
        """, tags=[]),
        Spell('Fog Cloud', 3, 'Everything in a \\areamed radius within \\rnglong range', """
            A cloud of fog appears in the area.
            All sight through the area is partially obscured, granting \\glossterm<concealment> to anything in the area and anything viewed through the area (see \\pcref<Concealment>).
        """, scaling="""
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The area increases to a \\areahuge radius.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Fog Wall', 1, None, """
            You create a wall of fog in a 15 ft.\\ high, \\areamed \\glossterm<wall> within \\rngmed range.
            The fog makes it difficult to see through the wall, granting \\glossterm<concealment> to anything viewed through the wall (see \\pcref<Concealment>).
        """, scaling="""
            \\rank<3> The area increases to a 30 foot high, \\arealarge line.
            \\rank<5> The area increases to a 60 foot high, \\areahuge line.
            \\rank<7> The area increases to a 120 foot high, 240 foot line.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Fluid Motion', 5, 'Yourself', """
            When you move, you can transform yourself into a rushing flow of water with a volume roughly equal to your normal volume until your movement is complete.
            You can only transform into water in this way once during your movement, and you regain your normal form at the end of the movement.
            In this form, you may move wherever water could go, you cannot take other actions, such as jumping, attacking, or casting spells.
            You may move through squares occupied by enemies without penalty.
            Being \\glossterm<grappled> or otherwise physically constrained does not prevent you from transforming into water in this way.

            Your speed is halved when moving uphill and doubled when moving downhill.
            Unusually steep inclines may cause greater movement differences while in this form.

            If the water is split, you may reform from anywhere the water has reached, to as little as a single ounce of water.
            If not even an ounce of water exists contiguously, your body reforms from all of the largest available sections of water, cut into pieces of appropriate size.
            This usually causes you to die.
        """, scaling="""
            \\rank<7> You can transform to and from water any number of times during a single movement.
            You must still regain your normal form at the end of the movement.
        """, tags=['Attune (self)']),
    ],
    rituals=[
        Spell('Dampen', 1, 'Up to five ritual participants', """
            Each target gains a bonus equal to your rank to their \\glossterm<resistance> to fire damage.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Water Breathing', 3, 'One ritual participant', """
            The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Detect Water', 1, None, """
            You learn the approximate distance and direction to any bodies of water within \\rnglong \\glossterm<range> of you.
            Since this is a \\glossterm<Detection> ability, its range can penetrate some solid objects (see \\pcref<Detection>).
            This spell can detect bodies of water with a minimum size of Fine.
        """, tags=['Detection'], ritual_time='one minuate'),
        Spell('Greater Detect Water', 3, None, """
            This ritual functions like the \\spell<detect water> ritual, except that the range increases to \\rngext.
        """, tags=['Detection'], ritual_time='one minute'),
        Spell('Supreme Detect Water', 5, None, """
            This ritual functions like the \\spell<detect water> ritual, except that the range increases to 2,000 feet.
        """, tags=['Detection'], ritual_time='one minute'),
    ],
    category='damage',
)
