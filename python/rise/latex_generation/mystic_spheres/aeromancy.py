from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects

# Primary: damage
# Secondary: utility
# Tertiary: buff
# None: debuff
aeromancy = MysticSphere(
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
    lists=['Nature'],
    spells=[
        Spell('Curse of Arrow Attraction', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental agains the target.
            \\hit The target takes a -2 penalty to defenses against \\glossterm<mundane> ranged attacks from weapons or projectiles that are Small or smaller until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.

            \\rankline
            \\rank<3> The penalty increases to -3.
            \\rank<5> The penalty increases to -4.
            \\rank<7> The penalty increases to -5.
        """, tags=['Curse']),
        Spell('Propulsion', 1, 'Yourself or one Large or smaller \\glossterm<ally> in \\rngmed range', """
            You \\glossterm<push> the target up to 50 feet in any direction.
            You cannot change the direction of the movement partway through.
            Moving the target upwards costs twice the normal movement cost.

            \\rankline
            \\rank<3> The distance increases to 100 feet.
            \\rank<5> The target gains a +2 bonus to Armor defense during the current phase.
            \\rank<7> The distance increases to 300 feet.
        """, tags=['Swift']),
        Spell('Wind Screen', 1, 'Yourself', """
            You gain a +1 \\glossterm<magic bonus> to Armor defense.
            This bonus is increased to +4 against \\glossterm<mundane> ranged attacks from weapons or projectiles that are Small or smaller.

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
            \\hit Each target takes bludgeoning \\glossterm<standard damage> -2d and is \\glossterm<pushed> 20 feet in the direction the line points away from you.
            Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.

            \\rankline
            \\rank<5> The area increases to a \\areahuge, 10 ft. wide line from you.
            \\rank<7> Each struck target is pushed 50 feet instead of 20 feet.
        """, tags=[]),
        Spell('Windblade', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            Melee weapons wielded by the target gain +5 foot \\glossterm<magic bonus> to \\glossterm<reach>.
            Attacks that hit because of this reach deal bludgeoning damage instead of any other damage types.
            This has no effect on ranged attacks the target makes.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> The target also gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities.
            \\rank<7> The bonus to \\glossterm<reach> increases to +10 feet.
        """, tags=['Attune (target)']),
        Spell('Retributive Winds', 3, 'Yourself', """
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
        Spell('Cyclone', 3, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=[]),
        Spell('Buffeting Hurricane', 4, '\\glossterm<Enemies> in a \\areamed radius from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d and is moved 20 feet clockwise around you.
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
        Spell('Dustblind', 5, 'One creature within \\rngclose range', """
            If there is no dirt, dust, or collection of loose objects of similar size within 30 feet of the target's eyes, this spell is \\glossterm<miscast>.
            Make an attack vs. Reflex against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<7> The range increases to \\rnglong.
        """, tags=[]),
        Spell('Piercing Wind', 1, 'One creature or object within \\rngclose range', """
            A rush of wind flows rapidly through the gaps in your foe's armor to pierce its heart.
            Make an attack vs. Reflex against the target.
            \\hit The target takes piercing \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
    ],
    rituals=[
        Spell('Air Bubble', 3, 'One ritual participant', """
            The target can breathe clear, clean air regardless of its surroundings.
            This can allow it to breathe underwater and avoid air-based poisons.

            This ritual takes one minute to perform.
        """, tags=['Attune (target)']),
    ],
    category='buff, defense',
)
