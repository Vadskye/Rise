from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects

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
terramancy=MysticSphere(
    name="Terramancy",
    short_description="Manipulate earth to crush foes",
    cantrips=[],
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
            You can create any weapon, shield, or body armor that you are proficient with, and which could normally be made entirely from metal, except for heavy armor.
            The body targeted must be at least as large as the item you create.
            The item appears in your hands.

            The item functions like a normal item of its type, except that it is twice as heavy.
            If the item loses all of its hit points, this effect is \\glossterm<dismissed>.

            \\rankline
            \\rank<3> You can also create heavy armor.
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
            This immobilization can be removed by climbing out of the fissure, which requires a \\glossterm<difficulty rating> 10 Climb check as a \\glossterm<move action>.
            Alternately, any creature that can reach the target can make a Strength check against the same \\glossterm<difficulty rating> to pull the target out.
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
)
