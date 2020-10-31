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
            You gain a bonus to your Jump skill equal to twice your rank until the end of the next round.
        """, tags=[]),
        Effects('Breeze', 'Everything in a \\arealarge radius \\glossterm<emanation> from you', """
            You can increase or decrease the wind speed by up to 10 miles per hour in the area.
            If you decrease the wind's speed to 0, you can increase it again with the remainder of your speed change and choose any direction for it to travel.

            \\rankline
            \\rank<3> The area increases to a \\areahuge radius \\glossterm<emanation>.
            \\rank<5> You can change the wind speed by up to 20 miles per hour.
            \\rank<7> The area increases to an \\areaext radius \\glossterm<emanation>.
        """, tags=['Sustain (free)']),
        Effects('Buffet', 'One creature or object within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes bludgeoning damage equal to 1d6 per rank.
        """, tags=[]),
        Effects('Detect Air', None, """
            You learn the approximate distance and direction to any air within \\rnglong \\glossterm<range> of you.
            This spell can detect air pockets with a minimum size of Fine.

            \\rankline
            \\rank<3> The range increases to \\rngext.
            \\rank<5> The range increases to 2,000 feet.
            \\rank<7> The range increases to 5,000 feet.
        """, tags=['Detection']),
        Effects('Soften Landing', 'Yourself or an \\glossterm<ally> within \\rnglong range', """
            Until the end of the round, the target treats all falls as if they were 20 feet per rank shorter for the purpose of determining \\glossterm<falling damage>.
        """, tags=[]),
    ],
    lists=['Nature'],
    spells=[
        Spell('Curse of Arrow Attraction', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target takes a -2 penalty to defenses against \\glossterm<mundane> ranged attacks from weapons or projectiles that are Small or smaller until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.

            \\rankline
            \\rank<3> The penalty increases to -3.
            \\rank<5> The penalty increases to -4.
            \\rank<7> The penalty increases to -5.
        """, tags=['Curse']),
        Spell('Propulsion', 2, 'Yourself or one Large or smaller \\glossterm<ally> in \\rngmed range', """
            You \\glossterm<push> the target up to 50 feet per rank in any direction.
            You cannot change the direction of the movement partway through.
            Moving the target upwards costs twice the normal movement cost.
        """, tags=['Swift']),
        Spell('Wind Screen', 2, 'Yourself', """
            You gain a +1 \\glossterm<magic bonus> to Armor defense.
            In addition, you gain a +2 bonus to defenses against \\glossterm<mundane> ranged attacks from weapons or projectiles that are Small or smaller.

            You can cast this spell as a \\glossterm<minor action>.
            Any effect which increases the size of creature this spell can affect also increases the size of ranged weapon it defends against by the same amount.

            \\rankline
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The bonus to Armor defense increases to +2.
            \\rank<8> The bonus to Armor defense increases to +3.
        """, tags=['Attune (target)']),
        Spell('Windstrike', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes bludgeoning damage equal to your \\glossterm<power> + 1d10 per rank.
        """, tags=[]),
        Spell('Windsnipe', 2, 'One creature or object within \\rnglong range', """
            Make an attack vs. Armor with an accuracy bonus equal to your rank against the target.
            \\hit The target takes bludgeoning damage equal to half your \\glossterm<power> + 1d6 per rank.
        """, tags=[]),
        Spell('Buffeting Blast', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes bludgeoning damage equal to half your \\glossterm<power> + 1d6 per rank.
            In addition, it is \\glossterm<pushed> up to 20 feet per rank in any direction.
            Moving the target upwards costs twice the normal movement cost.
        """, tags=[]),
        Spell('Gentle Descent', 3, 'Yourself', """
            You gain a 30 foot \\glossterm<glide speed> (see \\pcref<Gliding>).

            \\rankline
            \\rank<5> You are immune to \\glossterm<falling damage> even if you do not glide.
            \\rank<7> You can reduce your \\glossterm<glide speed> to 20 feet or increase it to 60 feet during each phase that you glide.
        """, tags=['Attune (self)']),
        Spell('Flight', 5, 'Yourself', """
            You gain a 30 foot \\glossterm<fly speed> as long as you are no more than 20 feet per rank above solid ground (see \\pcref<Flying>).
            If you are above that height, you gain a 30 foot \\glossterm<glide speed> instead.
        """, tags=['Attune (self)']),
        Spell('Gust of Wind', 2, 'Everything in a 10 ft. wide line from you that extends 20 feet per rank', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes bludgeoning damage equal to 1d6 per rank.
            In addition, each target is \\glossterm<pushed> half the length of the line in the direction the line points away from you.
            Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
        """, tags=[]),
        Spell('Windblade', 3, 'Yourself', """
            Melee weapons wielded by the target gain +5 foot \\glossterm<magic bonus> to \\glossterm<reach>.
            Attacks that hit because of this reach deal bludgeoning damage instead of any other damage types.
            This has no effect on ranged attacks the target makes.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The bonus to \\glossterm<reach> increases to +10 feet.
        """, tags=['Attune (target)']),
        Spell('Retributive Winds', 3, 'Yourself', """
            At the end of each phase, make an attack vs. Armor against each creature within \\rngclose range that attacked you during that phase.
            \\hit Each struck target takes bludgeoning damage equal to half your \\glossterm<power> + 1d6 per rank.
            Any individual creature can only be dealt damage in this way once per round.

            Any effect which increases this spell's range increases the range of this retaliation by the same amount.
        """, tags=['Attune (self)']),
        Spell('Air Walk', 6, 'Yourself', """
            You can walk on air as if it were solid ground as long as you are no more than 20 feet per rank above solid ground.
            The magic only affects your legs and feet.
            By choosing when to treat the air as solid, you can traverse the air with ease.
        """, tags=['Attune (self)']),
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
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes bludgeoning damage equal to half your \\glossterm<power> + 1d6 per rank.
        """, tags=[]),
        Spell('Buffeting Hurricane', 4, '\\glossterm<Enemies> in a \\areamed radius from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes bludgeoning damage equal to 1d8 per rank.
            In addition, each target is moved 20 feet clockwise around you.
            Each target's final position should be the same distance from you as its starting position.

            \\rankline
            \\rank<6> The area increases to a \\arealarge radius.
            \\rank<8> The area increases to a \\areahuge radius.
        """, tags=[]),
        Spell('Windtheft', 2, 'One creature or object within \\rngmed range', """
            Make an attack vs. Reflex against the target.
            \\hit The target drops all items it is holding that are not well secured (such as a ring) or held in a hand.
            \\crit As above, except that the target also drops items that are held a hand.

            \\rankline
            \\rank<4> Each dropped item is scattered 30 feet in a random horizontal direction.
            \\rank<6> You can choose for the dropped items to fly towards you instead of being scattered randomly.
            \\rank<8> The distance each dropped item flies increases to 100 feet.
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
        Spell('Dust Cloud', 2, 'Creatures in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Reflex with an accuracy bonus bonus equal to your rank against each target.
            \\hit Each target is \\glossterm<dazzled> until the end of the next round.
            \\crit Each target is \\glossterm<dazzled> as a \\glossterm<condition>.
        """, tags=[]),
        Spell('Blinding Dust Cloud', 7, 'Creatures in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Reflex against each target.
            \\hit Each target is \\glossterm<blinded> until the end of the next round.
            \\crit Each target is \\glossterm<blinded> as a \\glossterm<condition>.
        """, tags=[]),
        Spell('Dustblind', 5, 'One creature within \\rngmed range', """
            If there is no dirt, dust, or collection of loose objects of similar size within 30 foot \\glossterm<range> of the target's eyes, this spell is \\glossterm<miscast>.
            Make an attack vs. Reflex against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<7> The range increases to \\rnglong.
        """, tags=[]),
        Spell('Piercing Wind', 2, 'One creature or object within \\rngclose range', """
            A rush of wind flows rapidly through the gaps in your foe's armor to pierce its heart.
            Make an attack vs. Reflex against the target.
            \\hit The target takes piercing damage equal to your \\glossterm<power> + 1d10 per rank.
        """, tags=[]),
    ],
    rituals=[
        Spell('Air Bubble', 3, 'One ritual participant', """
            The target can breathe clear, clean air regardless of its surroundings.
            This can allow it to breathe underwater and avoid air-based poisons.
        """, tags=['Attune (target)'], ritual_time='one minute'),
    ],
    category='buff, defense',
)
