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
        """, scaling="""
            \\rank<2> The bonus increases to +6.
            \\rank<4> The bonus increases to +8.
            \\rank<6> The bonus increases to +10.
        """, tags=[]),
        Effects('Manipulate Air', None, """
            You can manipulate air within \\rngshort range of you.
            This allows you to increase or decrease the air speed by up to 10 miles per hour in any contiguous area within that range.
            If you decrease the wind's speed to 0, you can increase it again with the remainder of your speed change and choose any direction for it to travel.
        """, scaling="""
            \\rank<2> The range increases to \\rngmed, and the maximum speed change increases to 20 miles per hour.
            \\rank<4> The range increases to \\rnglong, and the maximum speed change increases to 40 miles per hour.
            \\rank<6> The range increases to \\rngdist, and the maximum speed change increases to 80 miles per hour.
        """, tags=['Sustain (minor)']),
        Effects('Soften Landing', 'Yourself or an \\glossterm<ally> within \\rnglong range', """
            Until the end of the round, the target treats all falls as if they were 20 feet shorter for the purpose of determining \\glossterm<falling damage>.
        """, scaling="""
            \\rank<2> The distance reduction increases to 50 feet.
            \\rank<4> The distance reduction increases to 100 feet.
            \\rank<6> The distance reduction increases to 200 feet.
        """, tags=[]),
    ],
    lists=['Nature'],
    spells=[
        Spell('Curse of Arrow Attraction', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target takes a -2 penalty to defenses against \\glossterm<mundane> ranged attacks from weapons or projectiles that are Small or smaller until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.
        """, scaling="accuracy", tags=['Curse']),
        Spell('Propulsion', 1, 'Yourself or one Large or smaller \\glossterm<ally> in \\rngmed range', """
            You \\glossterm<push> the target up to 100 feet in any direction.
            You cannot change the direction of the movement partway through.
            Moving the target upwards costs twice the normal movement cost.
        """, scaling="""
            \\rank<3> The distance increases to 200 feet.
            \\rank<5> The distance increases to 300 feet.
            \\rank<7> The distance increases to 500 feet.
        """, tags=[]),
        Spell('Wind Screen', 1, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            You gain a +1 \\glossterm<magic bonus> to Armor defense.
            In addition, you gain a +2 bonus to defenses against \\glossterm<mundane> ranged attacks from weapons or projectiles that are Small or smaller.
            Any effect which increases the size of creature this spell can affect also increases the size of ranged weapon it defends against by the same amount.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonus to Armor defense increases to +2.
            \\rank<7> The bonus to Armor defense increases to +3.
        """, tags=['Attune (target)']),
        Spell('Windstrike', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes bludgeoning damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        Spell('Windsnipe', 3, 'One creature or object within \\rngdist range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes bludgeoning damage equal to 2d8 plus your \\glossterm<power>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Buffet', 2, 'One Large or smaller creature or object within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            % This is +1d over the normal damage to help split the difference since the effect isn't consistently t2 worthy.
            % Making this spell 2nd level also helps with the Dimensional Jaunt -- Plane of Air mirroring.
            \\hit The target takes 1d10 bludgeoning damage.
            If it loses \\glossterm<hit points> from this damage, you \\glossterm<knockback> it up to 50 feet in any direction (see \\pcref<Knockback Effects>).
            Moving the target upwards costs twice the normal movement cost.
        """, scaling="damage", tags=[]),
        Spell('Buffeting Blast', 5, 'One creature or object within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes bludgeoning damage equal to 2d10 plus half your \\glossterm<power>.
            If it loses \\glossterm<hit points> from this damage, you \\glossterm<knockback> it up to 100 feet in any direction (see \\pcref<Knockback Effects>).
            Moving the target upwards costs twice the normal movement cost.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Gentle Descent', 3, 'Yourself', """
            You gain a 30 foot \\glossterm<glide speed> (see \\pcref<Gliding>).
        """, scaling="""
            \\rank<5> You are immune to \\glossterm<falling damage> even if you do not glide.
            \\rank<7> You can reduce your \\glossterm<glide speed> to 20 feet or increase it to 60 feet during each phase that you glide.
        """, tags=['Attune (self)']),
        Spell('Flight', 5, 'Yourself', """
            You gain a 30 foot \\glossterm<fly speed> with a maximum height of 60 feet (see \\pcref<Flying>).
            If you are above that height, you gain a 30 foot \\glossterm<glide speed> instead.
        """, scaling="""
            \\rank<7> The maximum distance above the ground increases to 120 feet.
        """, tags=['Attune (self)']),
        # no level diff for lower damage + push
        Spell('Gust of Wind', 3, 'Everything in a \\arealarge, 10 ft. wide line from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes 1d10 bludgeoning damage.
            In addition, each target is \\glossterm<pushed> 20 feet in the direction the line points away from you.
            Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        # +1 level for farther push
        Spell('Blast of Wind', 5, 'Everything in a \\areahuge, 10 ft. wide line from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes 2d10 bludgeoning damage.
            In addition, each target is \\glossterm<pushed> 50 feet in the direction the line points away from you.
            Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Windblade', 3, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            Melee weapons wielded by the target gain +5 foot \\glossterm<magic bonus> to \\glossterm<reach>.
            Attacks that hit because of this reach deal bludgeoning damage instead of any other damage types.
            This has no effect on ranged attacks the target makes.
        """, scaling="""
            \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The bonus to \\glossterm<reach> increases to +10 feet.
        """, tags=['Attune (target)']),
        Spell('Retributive Winds', 3, 'Yourself', """
            At the end of each phase, make an attack vs. Armor against each creature within \\rngshort range that attacked you during that phase.
            Any effect which increases this spell's range increases the range of this retaliation by the same amount.
            \\hit Each struck target takes bludgeoning damage equal to 2d6 plus half your \\glossterm<power>.
            Any individual creature can only be dealt damage in this way once per round.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Air Walk', 6, 'Yourself', """
            You can walk on air as if it were solid ground as long as you are no more than 120 feet above solid ground.
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
        """, scaling="""
            \\rank<6> You can shape the weather for up to fifteen minutes before it takes effect, increasing the intensity of the changes you can make.
        """, tags=['Attune (self)']),
        Spell('Cyclone', 3, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes bludgeoning damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        # +2 levels for push
        Spell('Hurricane', 5, '\\glossterm<Enemies> in a \\areamed radius from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes bludgeoning damage equal to 2d8 half plus your \\glossterm<power>.
            In addition, each target is \\glossterm<pushed> 20 feet clockwise around you.
            Each target's final position should be the same distance from you as its starting position.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Windtheft', 2, 'One creature or object within \\rngmed range', """
            Make an attack vs. Reflex with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit The target drops all items it has that are not well secured (such as a ring) or held in a hand.
            \\crit As above, except that the target also drops items that are held in a single hand.
        """, scaling="accuracy", tags=[]),
        # +1 levels for avoidable damage plus size limit
        Spell('Windseal', 3, 'One Large or smaller creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, the target is \\glossterm<slowed> by incredibly fast winds that inhibit movement.
            At the end of each phase, if it moved during that phase, it takes bludgeoning damage equal to 2d8 plus half your \\glossterm<power>.
            \\crit As above, except that that the target takes double damage.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Dust Cloud', 1, 'Creatures in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Reflex against each target.
            \\hit Each target is \\glossterm<dazzled> until the end of the next round.
            \\crit Each target is \\glossterm<dazzled> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=[]),
        Spell('Duststorm', 4, 'Creatures in a \\arealarge radius within \\rnglong range', """
            Make an attack vs. Reflex against each target.
            \\hit Each target is \\glossterm<dazzled> until the end of the next round.
            \\crit Each target is \\glossterm<dazzled> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=[]),
        Spell('Blinding Dust Cloud', 7, 'Creatures in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Reflex against each target.
            \\hit Each target is \\glossterm<blinded> until the end of the next round.
            \\crit Each target is \\glossterm<blinded> as a \\glossterm<condition>.
        """, tags=[]),
        Spell('Dustblind', 6, 'One creature within \\rngshort range', """
            If there is no dirt, dust, or collection of loose objects of similar size within 30 foot \\glossterm<range> of the target's eyes, this spell is \\glossterm<miscast>.
            Make an attack vs. Reflex against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the condition must be removed twice before the effect ends.
        """, scaling="accuracy", tags=[]),
        # +2 levels for single-target Reflex defense, which is unusual
        Spell('Piercing Wind', 3, 'One creature or object within \\rngmed range', """
            A rush of wind flows rapidly through the gaps in your foe's armor to pierce its heart.
            Make an attack vs. Reflex against the target.
            \\hit The target takes piercing damage equal to 2d8 plus your \\glossterm<power>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        # +1 level since it's stronger than a typical rank 1 debuff
        Spell('Downdraft', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, air buffets the target downward, pushing it towards the ground with great force.
            This approximately doubling the gravity it experiences, which imposes a -2 penalty to \\glossterm<accuracy>, physical \\glossterm<checks>, and \\glossterm<defenses>.
            In addition, most flying creatures are unable to fly under the onslaught of wind and crash to the ground.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the effective force of gravity is increased by approximately four times instead.
            This increases the penalties to -4.
        """, scaling='accuracy', tags=[]),
    ],
    rituals=[
        Spell('Air Bubble', 3, 'One ritual participant', """
            The target can breathe clear, clean air regardless of its surroundings.
            This can allow it to breathe underwater and avoid air-based poisons.
        """, tags=['Attune (target)'], ritual_time='one minute'),
        Spell('Detect Air', 1, None, """
            You learn the approximate distance and direction to any air within \\rnglong \\glossterm<range> of you.
            Since this is a \\glossterm<Detection> ability, its range can penetrate some solid objects (see \\pcref<Detection>).
            This ritual can detect air pockets with a minimum size of Fine.
        """, tags=['Detection'], ritual_time='one minute'),
        Spell('Greater Detect Air', 3, None, """
            This ritual functions like the \\spell<detect air> ritual, except that the range increases to \\rngext.
        """, tags=['Detection'], ritual_time='one minute'),
        Spell('Supreme Detect Air', 5, None, """
            This ritual functions like the \\spell<detect air> ritual, except that the range increases to 2,000 feet.
        """, tags=['Detection'], ritual_time='one minute'),
    ],
    category='buff, defense',
)
